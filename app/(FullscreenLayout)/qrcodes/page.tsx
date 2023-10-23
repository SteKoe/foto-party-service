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
        orderBy: [
            {invitation_key: "asc"},
            {order: "asc"}
        ]
    });
    const groupedInvitations = groupByInvitationKey(invitations);

    const map = Object.keys(groupedInvitations).map(async (invitation_key) => {
        const encrypted = await encryptSymmetric(JSON.stringify({"invitationKey": invitation_key}), process.env.CRYPTO_SECRET!);
        const token = Buffer.from(JSON.stringify(encrypted)).toString('base64');

        const link = `https://kiste-hochzeit.vercel.app?token=${token}`;
        const dataUrl = await QRCode.toDataURL(link);

        const guests = groupedInvitations[invitation_key]?.flatMap((invitation) => invitation.Guest);

        return (
            <div className={"grid-cols-1 rounded bg-white p-2 text-black text-center"}>
                <div className="bg-gray-200 rounded p-2 truncate">
                    {guests?.map(g => g.name).join(", ")}
                </div>
                <img className={"mx-auto my-0"} src={dataUrl} alt={""}/>
                <div className="mt-0 mb-2">
                    <Link isBlock showAnchorIcon href={link} target="_blank">Öffnen</Link>
                </div>
            </div>
        )
    });


    return (
        <div className={"grid-cols-1 md:grid-cols-3 xl:grid-cols-6 grid gap-4 m-4"}>
            {map}
        </div>
    )
}