"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "@/app/components/Avatar";
import React, { useCallback, useState } from "react";
import MenuItem from "@/app/components/navbar/MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import rentModal from "@/app/components/modals/RentModal";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: User | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerUser = useRegisterModal();
  const loginUser = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen((value) => !value);
  };
  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginUser.onOpen();
    }
    rentModal.onOpen();
  }, [currentUser, loginUser, rentModal]);
  return (
    <div className={"relative"}>
      <div className={"flex flex-row items-center gap-3"}>
        <div
          onClick={onRent}
          className={
            "hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          }
        >
          Air bnb your home
        </div>
        <div
          onClick={toggle}
          className={
            "p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          }
        >
          <AiOutlineMenu />
          <div className={"hidden md:block"}>
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className={
            "absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm"
          }
        >
          <div className={"flex flex-col cursor-pointer"}>
            <>
              {currentUser ? (
                <>
                  <MenuItem
                    onClick={() => router.push("/trips")}
                    label={"My trips"}
                  />
                  <MenuItem
                    onClick={() => {
                      router.push("/reservations");
                    }}
                    label={"My reservations"}
                  />
                  <MenuItem
                    onClick={() => {
                      router.push("/properties");
                    }}
                    label={"My properties"}
                  />
                  <MenuItem
                    onClick={() => {
                      rentModal.onOpen();
                    }}
                    label={"Airbnb my home"}
                  />
                  <hr />
                  <MenuItem onClick={signOut} label={"Logout"} />
                </>
              ) : (
                <>
                  {" "}
                  <MenuItem onClick={loginUser.onOpen} label={"login"} />
                  <MenuItem onClick={registerUser.onOpen} label={"Sign up"} />
                </>
              )}
            </>
          </div>
        </div>
      )}
    </div>
  );
};
export default UserMenu