import {Prisma} from ".prisma/client";

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