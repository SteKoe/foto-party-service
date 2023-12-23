import React from 'react';
import ContainerLayout from '@/app/ContainerLayout';
import { Metadata } from 'next';
import { InvitationPageComponent } from '@/components/InvitationPageComponent';
import { cookies } from 'next/headers';
import { TOKEN_PARAM_NAME } from '@/middleware';
import { decryptToken } from '@/utils/crypto';
import prisma from '@/app/prisma';

export const metadata: Metadata = {
    title: 'Kim & Stephan | RSVP',
};

export default async function Page() {
    const tokenFromCookie = cookies().get(TOKEN_PARAM_NAME)?.value;
    const token = await decryptToken(tokenFromCookie ?? '');

    if (!token?.invitationKey) {
        return <>{}</>;
    }

    const invitations = await prisma.invitation.findMany({
        where: {
            invitation_key: token.invitationKey,
        },
        orderBy: {
            order: 'asc',
        },
        include: {
            Guest: {
                include: {
                    GuestChoice: true,
                },
            },
        },
    });

    const wedding = await prisma.wedding.findFirst({
        where: {
            wedding_id: invitations[0].wedding_id,
        },
        include: {
            InvitationGuestOption: {
                orderBy: {
                    order: 'asc',
                },
            },
        },
    });

    return (
        <ContainerLayout>
            <InvitationPageComponent
                invitations={invitations}
                wedding={wedding!}
            />
        </ContainerLayout>
    );
}
