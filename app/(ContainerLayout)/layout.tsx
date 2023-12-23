import '../globals.css';
import '../overrides.css';
import React from 'react';
import { Metadata, Viewport } from 'next';
import AnimatedStarfield from '@/components/starfield/AnimatedStarfieldComponent';
import { Shootingstar } from '@/components/shootingstar/Shootingstar';
import Navigation from '@/app/(ContainerLayout)/Navigation';
import Script from 'next/script';

export const metadata: Metadata = {
    title: 'Kim & Stephan | Hochzeit unter Sternen',
    description: 'Wir heiraten dann wohl!',
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1.0,
    themeColor: '#2C305A',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="de" className={'h-full'}>
            <head>
                <title>Kim & Stephan | Hochzeit unter Sternen</title>
                <link href="/videojs.css" rel="stylesheet" />
                <Script src="/video.js"></Script>
            </head>
            <body className={'flex min-h-full flex-col justify-between'}>
                <Navigation />
                <AnimatedStarfield />
                <Shootingstar />
                {children}
                <footer className="footer">
                    Created with ❤️
                    <br />
                    by Kim & Stephan
                </footer>
            </body>
        </html>
    );
}
