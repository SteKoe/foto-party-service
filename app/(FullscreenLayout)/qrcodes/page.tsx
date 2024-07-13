import QRCode from "qrcode";
import prisma from "@/app/prisma";
import { encryptSymmetric } from "@/utils/crypto";
import { groupBy } from "ramda";
import { Link } from "@nextui-org/react";
import classNames from "classnames";

export default async function Page() {
  const groupByInvitationKey = groupBy<any>(
    (invitation) => invitation.invitation_key,
  );

  const invitations = await prisma.invitation.findMany({
    include: {
      Guest: {
        include: {
          GuestChoice: true,
        },
      },
    },
    orderBy: [{ invitation_key: "asc" }, { order: "asc" }],
  });
  const groupedInvitations = groupByInvitationKey(invitations);

  const map = Object.keys(groupedInvitations).map(async (invitation_key) => {
    const encrypted = await encryptSymmetric(
      JSON.stringify({ invitationKey: invitation_key }),
      process.env.CRYPTO_SECRET!,
    );
    const token = Buffer.from(JSON.stringify(encrypted)).toString("base64");

    const link = `https://kiste-hochzeit.vercel.app?token=${token}`;
    const dataUrl = await QRCode.toDataURL(link);

    const guests = groupedInvitations[invitation_key]?.flatMap(
      (invitation) => invitation.Guest,
    );

    const kommt = guests
      ?.flatMap((g) => g.GuestChoice)
      .filter((o) => o.option_id === "fe90f5fb-a98d-4088-aa36-0c20ad044e07");

    return (
      <div
        key={invitation_key}
        className={
          "break-inside-avoid grid-cols-1 rounded bg-white p-2 text-center text-black print:border-1"
        }
      >
        <div className="truncate rounded bg-gray-200 p-2">
          {guests?.map((g) => (
            <span
              key={g.guest_id}
              className={classNames({
                "m-1 rounded-full bg-green-500 p-1 text-white":
                  kommt?.find((k) => k.guest_id === g.guest_id)?.value ===
                  "true",
              })}
            >
              {g.name}
            </span>
          ))}
        </div>
        <img className={"mx-auto my-0"} src={dataUrl} alt={""} />
        <div className="mb-2 mt-0 print:hidden">
          <Link isBlock showAnchorIcon href={link} target="_blank">
            Öffnen
          </Link>
        </div>
      </div>
    );
  });

  return (
    <div
      className={
        "m-4 grid grid-cols-1 gap-4 print:grid-cols-3 md:grid-cols-3 xl:grid-cols-6"
      }
    >
      {map}
    </div>
  );
}
