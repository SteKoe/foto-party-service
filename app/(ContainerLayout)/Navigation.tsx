import { NavigationComponent } from '@/components/NavigationComponent';
import { cookies } from 'next/headers';
import { TOKEN_PARAM_NAME } from '@/middleware';
import { DateTime } from 'luxon';
import { AuthToken, decryptToken } from '@/utils/crypto';

type Links = {
    name: string;
    href: string;
    filterFn?: (params: FilterFnProps) => boolean;
};

type FilterFnProps = {
    token?: AuthToken | null;
};

const links: Links[] = [
    { name: 'Start', href: '/' },
    {
        name: 'Wann & Wo',
        href: '/location',
        filterFn: ({ token }: FilterFnProps) =>
            token?.invitationKey !== undefined,
    },
    {
        name: 'Geschenke?',
        href: '/gifts',
        filterFn: ({ token }: FilterFnProps) =>
            token?.invitationKey !== undefined,
    },
    {
        name: 'Story',
        href: '/story',
        filterFn: ({ token }: FilterFnProps) => {
            return token?.invitationKey !== undefined;
        },
    },
    {
        name: 'Galerie',
        href: '/pictures',
        filterFn: ({ token }: FilterFnProps) => {
            return (
                token?.invitationKey !== undefined &&
                DateTime.now() >= DateTime.fromISO(process.env.MARRIAGE_DATE!)
            );
        },
    },
    {
        name: 'Einladung',
        href: '/invitation',
        filterFn: ({ token }) =>
            token !== null && token?.invitationKey !== undefined,
    },
];

export default async function Navigation() {
    const tokenFromCookie = cookies().get(TOKEN_PARAM_NAME)?.value;
    const token = await decryptToken(tokenFromCookie ?? '');
    const filteredLinks = links
        .filter((l) => l.filterFn?.({ token: token }) ?? true)
        .map((l) => ({ ...l, filterFn: undefined }));

    return <NavigationComponent links={filteredLinks} />;
}
