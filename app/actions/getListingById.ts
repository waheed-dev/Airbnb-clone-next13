import prisma from '@/app/libs/prismaDb'

export interface IListingsParams {
    listingId?:string
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}
export default async function getListings(
    params: IListingsParams
) {
    try {
        const {
            listingId,
        } = params
        const listing = await prisma.listing.findUnique({
            where : {
                id : listingId
            },
            include : {
                user : true
            }
        })
        if (!listing) {
            return null
        }
        return listing
    } catch (e : any) {
        throw new Error(e)
    }}