"use client";

import { BooleanField } from "@/components/form/BooleanField";
import { InvitationGuestOption } from "@/prisma/generated/client";
import { Textarea } from "@nextui-org/react";

type FieldProps = {
  option: InvitationGuestOption;
  guestId: string;
  value: unknown;
  onChange: (e: InvitationGuestOption & { value: unknown }) => void;
};

export function Field(props: FieldProps) {
  switch (props.option.type) {
    case "boolean":
      return (
        <BooleanField
          guestId={props.guestId}
          fieldDefinition={props.option}
          value={props.value as boolean}
          onChange={props.onChange}
        />
      );
    case "text":
      return (
        <Textarea
          label={props.option.name}
          color="secondary"
          className="col-span-12"
          value={(props.value ?? "") as string}
          onValueChange={(value) => {
            props.onChange({
              ...props.option,
              value: value,
            });
          }}
        ></Textarea>
      );
  }
}
