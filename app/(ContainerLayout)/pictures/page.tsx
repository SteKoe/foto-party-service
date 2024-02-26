import React from 'react';
import ContainerLayout from '@/app/ContainerLayout';
import PicturesPageComponent from '@/components/PicturesPageComponent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Kim & Stephan | Fotos',
};

export default async function Page() {
    return (
        <ContainerLayout size={'max-w-5xl w-full'}>
            <PicturesPageComponent />
        </ContainerLayout>
    );
}
