import QRCode from "qrcode";
import prisma from "@/app/prisma";
import {encryptSymmetric} from "@/utils/crypto";
import {groupBy} from "ramda";
import {Link} from "@nextui-org/react";

export default async function Page() {
    const groupByInvitationKey = groupBy<any>((invitation) => invitation.invitation_key);

    const invitations = await prisma.invitation.findMany({
        include: {
            Guest: true
        },
        orderBy: {
            order: "asc"
        }
    });
    const groupedInvitations = groupByInvitationKey(invitations);

    const map = Object.keys(groupedInvitations).map(async (invitation_key) => {
        const encrypted = await encryptSymmetric(JSON.stringify({"invitationKey": invitation_key}), process.env.CRYPTO_SECRET!);
        const token = Buffer.from(JSON.stringify(encrypted)).toString('base64');

        const link = `https://kiste-hochzeit.vercel.app?token=${token}`;
        const dataUrl = await QRCode.toDataURL(link);

        const guests = groupedInvitations[invitation_key]?.flatMap((invitation) => invitation.Guest);

        return (
            <div className={"grid-cols-1 rounded bg-white p-2 pb-4 text-black text-center"}>
                <img className={"mx-auto"} src={dataUrl} alt={""}/>
                <div className={""}>
                    <Link isBlock showAnchorIcon href={link}>Öffnen</Link>
                </div>
                <div>
                    {guests?.map(g => g.name).join(", ")}
                </div>
            </div>
        )
    });


    return (
        <div className={"grid-cols-6 grid gap-4 m-4"}>
            {map}
        </div>
    )
}