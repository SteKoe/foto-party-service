import React from 'react';
import { Metadata } from 'next';
import { TimelinePageContent } from '@/app/(ContainerLayout)/story/TimelinePageContent';

export const metadata: Metadata = {
    title: 'Kim & Stephan | Story',
};

export default function Page() {
    return <TimelinePageContent />;
}
