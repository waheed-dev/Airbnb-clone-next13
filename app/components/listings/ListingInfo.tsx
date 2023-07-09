import {User} from "@prisma/client";
import {IconType} from "react-icons";
import React from "react";
import useCountries from "@/app/hooks/useCountries";
import Avatar from "@/app/components/Avatar";
import ListingCategory from "@/app/components/listings/ListingCategory";
import dynamic from "next/dynamic";
const Map = dynamic(() => import('../Map'),{
    ssr : false
})
interface LisitingInfoProps {
    user : User
    description : string
    roomCount : number
    guestCount : number
    bathroomCount : number
    category : {
        label : string
        icon : IconType
        description : string
    } | undefined
    locationValue : string
}

const ListingInfo : React.FC<LisitingInfoProps> = ({roomCount,guestCount,bathroomCount,description,locationValue,user,category}) => {
    const {getByValue} = useCountries()
    const coordinates = getByValue(locationValue)?.latLng

    return (
        <div className={'col-span-4 flex flex-col gap-8 '}>
            <div className={'flex flex-col gap-2 '}>
                <div className={'text-xl font-semibold flex flex-row items-center gap-2 '}>
                    <div>Hosted by {user?.name}</div>
                    <Avatar src={user?.image}/>
                </div>
                <div className={'flex flex-row items-center gap-4 font-light text-neutral-500'}>
                <div>{guestCount} guests</div>
                <div>{roomCount} room</div>
                <div>{bathroomCount} bathrooms</div>
                </div>
            </div>
                <hr/>

            {category && (
                // @ts-ignore
                <ListingCategory icon={category.icon} description={category.description} label={category.label}/>
            )}
            <hr/>
            <div className={'text-lg font-light text-neutral-500'}>
                {description}
            </div>
            <hr/>
            <Map center={coordinates}/>
        </div>
    )
}

export default ListingInfo