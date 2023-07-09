import {User} from "@prisma/client";
import React from "react";
import useCountries from "@/app/hooks/useCountries";
import Heading from "@/app/Heading";
import Image from 'next/image'
import HeartButton from "@/app/components/HeartButton";
interface ListingHeadProps {
    title  : string
    locationValue : string
    imageSrc : string
    id : string
    currentUser : User | null
}

const ListingHead : React.FC<ListingHeadProps> = ({currentUser,id,title,imageSrc,locationValue}) => {
   const {getByValue} = useCountries()
    const location = getByValue(locationValue)
    return (
        <>
        <Heading title={title} subtitle={`${location?.region},${location?.label}`}/>
            <div className={'w-full h-[60vh] overflow-hidden rounded-xl relative'}>
            <Image alt={title} src={imageSrc} fill className={'object-cover w-full'}/>
                <div className={'absolute top-5 right-5'}>
                    <HeartButton listingId={id} currentUser={currentUser}/>
                </div>
            </div>
        </>
    )
}
export default ListingHead