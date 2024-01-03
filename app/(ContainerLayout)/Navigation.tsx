import { NavigationComponent } from '@/components/NavigationComponent';
import { cookies } from 'next/headers';
import { TOKEN_PARAM_NAME } from '@/middleware';
import { DateTime } from 'luxon';
import { decryptToken } from '@/utils/crypto';

type Links = {
    name: string;
    href: string;
    filterFn?: (params: any) => boolean;
};

const links: Links[] = [
    { name: 'Start', href: '/' },
    {
        name: 'Wann & Wo',
        href: '/location',
        filterFn: ({ token }) => token !== null,
    },
    {
        name: 'Geschenke?',
        href: '/gifts',
        filterFn: ({ token }) => token !== null,
    },
    { name: 'Story', href: '/story', filterFn: ({ token }) => token !== null },
    {
        name: 'Galerie',
        href: '/pictures',
        filterFn: ({ token }) => {
            return (
                token !== true &&
                DateTime.now() >= DateTime.fromISO(process.env.MARRIAGE_DATE!)
            );
        },
    },
    {
        name: 'Einladung',
        href: '/invitation',
        filterFn: ({ token }) => token !== null && token.invitation_id !== null,
    },
];

export default async function Navigation() {
    const tokenFromCookie = cookies().get(TOKEN_PARAM_NAME)?.value;
    const token = await decryptToken(tokenFromCookie ?? '');
    const filteredLinks = links
        .filter((l) => l.filterFn?.({ token }) ?? true)
        .map((l) => ({ ...l, filterFn: undefined }));

    return <NavigationComponent links={filteredLinks} />;
}
