import '../globals.css';
import '../overrides.css';
import React from 'react';
import {Metadata} from 'next';
import AnimatedStarfield from '@/components/starfield/AnimatedStarfieldComponent';
import {Shootingstar} from '@/components/shootingstar/Shootingstar';
import Navigation from '@/app/(ContainerLayout)/Navigation';

export const metadata: Metadata = {
    title: 'Kim & Stephan | Hochzeit unter Sternen',
    description: 'Wir heiraten dann wohl!',
    viewport: 'width=device-width, initial-scale=1.0',
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
            <link href="/videojs.css" rel="stylesheet"/>
            <script src="/video.js"></script>
        </head>
        <body className={'min-h-full flex flex-col justify-between'}>
        <Navigation/>
        <AnimatedStarfield/>
        <Shootingstar/>
        {children}
        <footer className="footer">
            Created with ❤️
            <br/>
            by Kim & Stephan
        </footer>
        </body>
        </html>
    );
}
