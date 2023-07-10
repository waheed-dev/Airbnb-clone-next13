import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";
import React, { useCallback, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface IUseFavourite {
  listingId: string;
  currentUser?: User | null;
}

const useFavourite = ({ listingId, currentUser }: IUseFavourite) => {
  const router = useRouter();
  const loginModel = useLoginModal();
  const hasFavorited = useMemo(() => {
    const list = currentUser?.favouriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModel.onOpen();
      }

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favourites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favourites/${listingId}`);
        }
        await request();
        router.refresh();
        toast.success("Success");
      } catch (error: any) {
        console.log(error);
        toast.error(error);
      }
    },
    [currentUser, hasFavorited, listingId, router]
  );
  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavourite;
