import prismaDb from "@/app/libs/prismaDb";

export default async function getListings () {
    try {
        return await prismaDb.listing.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
    } catch (e : any) {
        throw new Error(e)
    }
}