"use client";

import { InvitationGuestOption } from "@/prisma/generated/client";
import { Switch } from "@nextui-org/react";
import { YesIcon } from "@/components/form/YesIcon";
import { NoIcon } from "@/components/form/NoIcon";

type Props = {
  guestId: string;
  fieldDefinition: InvitationGuestOption;
  value: boolean;
  onChange: (
    e: InvitationGuestOption & {
      value: boolean;
    },
  ) => void;
};

export function BooleanField({ fieldDefinition, value, onChange }: Props) {
  const onValueChange = (value: boolean) => {
    onChange({
      ...fieldDefinition,
      value,
    });
  };

  return (
    <div className="col-span-12">
      <Switch
        color="secondary"
        isSelected={value}
        onValueChange={onValueChange}
        thumbIcon={({ isSelected, className }) =>
          isSelected ? (
            <NoIcon className={className} />
          ) : (
            <YesIcon className={className} />
          )
        }
      >
        <div className="flex flex-col gap-1">
          <p className="text-white">{fieldDefinition.name}</p>
        </div>
      </Switch>
    </div>
  );
}
