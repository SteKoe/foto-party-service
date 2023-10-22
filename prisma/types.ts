import {Prisma} from "@/prisma/generated/client";

const invitationWithGuestChoice = Prisma.validator<Prisma.InvitationDefaultArgs>()({
    include: {
        Guest: {
            include: {
                GuestChoice: true
            }
        }
    }
});
export type InvitationWithGuestChoice = Prisma.InvitationGetPayload<typeof invitationWithGuestChoice>

const invitationWithGuest = Prisma.validator<Prisma.InvitationDefaultArgs>()({
    include: {
        Guest: true
    }
});
export type InvitationWithGuest = Prisma.InvitationGetPayload<typeof invitationWithGuest>
