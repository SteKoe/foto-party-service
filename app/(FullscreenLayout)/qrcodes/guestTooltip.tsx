'use client';

import {Button, Tooltip} from "@nextui-org/react";
import {WeddingGuest} from "@/prisma/generated/client";
import React from "react";

export function GuestTooltip({guest}: { guest: WeddingGuest }) {
    return (
        <Tooltip content={guest.name}>
            <Button>{guest.name}</Button>
        </Tooltip>
    );
}