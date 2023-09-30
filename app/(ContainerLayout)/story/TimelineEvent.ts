export type TimelineEvent = {
    datum?: string,
    beschreibung?: string,
    bild?: string,
    movie?: string,
    position?: TimelineEventPosition,
    icon?: React.JSX.Element
}

export type TimelineEventPosition = 'left' | 'right' | 'center'