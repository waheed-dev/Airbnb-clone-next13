'use client'
import Image from "next/image";
import React from "react";

interface AvatarProps {
  src? :string | null
}

const Avatar : React.FC<AvatarProps> = ({src}) => {
  return (
      <Image src={src? src : '/images/placeholder.jpg'} alt={'avatar'} className={'rounded-full'} width={'30'} height={'30'} />
  )
}

export default Avatar