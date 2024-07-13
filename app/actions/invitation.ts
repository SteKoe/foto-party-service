"use server";

import prisma from "@/app/prisma";
import { revalidatePath } from "next/cache";

type Props = {
  wedding_id: string;
  guest_id: string;
  choices: {
    [key: string]: any;
  };
};

export async function saveGuestChoices({
  guest_id,
  wedding_id,
  choices,
}: Props) {
  for (const option_id in choices) {
    if (choices[option_id] !== null) {
      const value = String(choices[option_id]);
      try {
        await prisma.guestChoice.upsert({
          where: {
            wedding_id_option_id_guest_id: {
              wedding_id,
              option_id,
              guest_id,
            },
          },
          update: {
            value,
          },
          create: {
            wedding_id,
            option_id,
            guest_id,
            value,
          },
        });

        revalidatePath("/");
      } catch (e) {
        console.log(
          `Error saving ${JSON.stringify({
            wedding_id,
            option_id,
            guest_id,
            value,
          })}`,
          e,
        );
      }
    }
  }
}
