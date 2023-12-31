"use client";
import { Listing, Reservation, User } from "@prisma/client";
import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import { format } from "date-fns";
import Image from "next/image";
import Button from "@/app/components/Button";

interface ListingsCardProps {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionId?: string;
  actionLabel?: string;
  currentUser: User | null;
}

const ListingsCard: React.FC<ListingsCardProps> = ({
  actionId = "",
  onAction,
  actionLabel,
  data,
  reservation,
  currentUser,
  disabled,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);
  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }
      onAction?.(actionId);
    },
    [actionId, disabled, onAction]
  );
  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [data.price, reservation]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      className={"col-span-1 cursor-pointer group"}
      onClick={() => router.push(`/listings/${data.id}`)}
    >
      <div className={"flex flex-col gap-2 w-full"}>
        <div
          className={"aspect-square w-full relative overflow-hidden rounded-xl"}
        >
          <Image
            fill
            src={data.imageSrc}
            alt={"Listings"}
            className={
              "object-cover h-full w-full group-hover:scale-110 transition"
            }
          />
        </div>
        <div className={"font-semibold text-lg"}>
          {location?.region}, {location?.label}
        </div>
        <div className={"font-light text-neutral-500"}>
          {reservationDate || data.category}
        </div>
        <div className={"flex flex-row items-center gap-1"}>
          <div className={"font-semibold"}>$ {price}</div>
          {!reservation && <div className={"font-light"}>night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingsCard;
