// eslint-disable

'use client';

import React, { useState } from 'react';

export default function ToggleFullscreenButton() {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const onClick = () => {
        if (
            !document.fullscreenElement &&
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            !document.mozFullScreenElement &&
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            !document.webkitFullscreenElement
        ) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
            } else if (document.documentElement.mozRequestFullScreen) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                document.documentElement.mozRequestFullScreen();
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
            } else if (document.documentElement.webkitRequestFullscreen) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error

                document.documentElement.webkitRequestFullscreen(
                    // @ts-ignore
                    Element.ALLOW_KEYBOARD_INPUT,
                );
            }
            setIsFullscreen(true);
        } else {
            // @ts-ignore
            if (document.cancelFullScreen) {
                // @ts-ignore
                document.cancelFullScreen();
                // @ts-ignore
            } else if (document.mozCancelFullScreen) {
                // @ts-ignore
                document.mozCancelFullScreen();
                // @ts-ignore
            } else if (document.webkitCancelFullScreen) {
                // @ts-ignore
                document.webkitCancelFullScreen();
            }
            setIsFullscreen(false);
        }
    };

    return (
        <button
            onClick={onClick}
            className={
                'h-7 w-7 rounded bg-white bg-opacity-50 text-xs md:h-10 md:w-10 md:text-base'
            }
        >
            {isFullscreen ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                    viewBox="0 0 512 512"
                    className={'m-2 md:m-3'}
                >
                    <path d="M439 7c9.4-9.4 24.6-9.4 33.9 0l32 32c9.4 9.4 9.4 24.6 0 33.9l-87 87 39 39c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H296c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2l39 39L439 7zM72 272H216c13.3 0 24 10.7 24 24V440c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-39-39L73 505c-9.4 9.4-24.6 9.4-33.9 0L7 473c-9.4-9.4-9.4-24.6 0-33.9l87-87L55 313c-6.9-6.9-8.9-17.2-5.2-26.2s12.5-14.8 22.2-14.8z" />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                    viewBox="0 0 512 512"
                    className={'m-2 md:m-3'}
                >
                    <path d="M344 0H488c13.3 0 24 10.7 24 24V168c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-39-39-87 87c-9.4 9.4-24.6 9.4-33.9 0l-32-32c-9.4-9.4-9.4-24.6 0-33.9l87-87L327 41c-6.9-6.9-8.9-17.2-5.2-26.2S334.3 0 344 0zM168 512H24c-13.3 0-24-10.7-24-24V344c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2l39 39 87-87c9.4-9.4 24.6-9.4 33.9 0l32 32c9.4 9.4 9.4 24.6 0 33.9l-87 87 39 39c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8z" />
                </svg>
            )}
        </button>
    );
}
