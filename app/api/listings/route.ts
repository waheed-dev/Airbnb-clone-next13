import getCurrentUser from "@/app/actions/getCurrentUser";
import {NextResponse} from "next/server";
import prismaDb from "@/app/libs/prismaDb";


export async function POST (request : Request) {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        NextResponse.error()
    }
    const body = await request.json()
    const {title, category,
        location,
        guestCount,
        roomCount,
        bathroomCount,
        imageSrc,
        price,
        description} = body

    const listing = await prismaDb.listing.create({
        data : {
            title, category,
            locationValue:location.value,
            guestCount,
            roomCount,
            bathroomCount,
            imageSrc,
            price : parseInt(price,10),
            description,
            userId : currentUser!.id
        }
    })
    return NextResponse.json(listing)
}