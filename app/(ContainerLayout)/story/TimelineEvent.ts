export type TimelineEvent = {
    datum: string,
    beschreibung: string,
    bild?: string,
    position?: 'left' | 'right' | 'center',
    icon?: React.JSX.Element
}