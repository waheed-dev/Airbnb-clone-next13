import prismaDb from "@/app/libs/prismaDb";

export interface IListingsParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}
export default async function getListings (params : IListingsParams) {
    try {
        const { userId,
            roomCount,
            guestCount,
            bathroomCount,
            locationValue,
            startDate,
            endDate,
            category,} = params
        let query : any = {}
        if (userId) {
            query.userId = userId
        }
        if (category) {
            query.category = category;
        }

        if (roomCount) {
            query.roomCount = {
                gte: +roomCount
            }
        }

        if (guestCount) {
            query.guestCount = {
                gte: +guestCount
            }
        }

        if (bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount
            }
        }

        if (locationValue) {
            query.locationValue = locationValue;
        }
        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: startDate }
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: endDate }
                            }
                        ]
                    }
                }
            }
        }
        return await prismaDb.listing.findMany({
            where : query,
            orderBy: {
                createdAt: 'desc'
            }
        })
    } catch (e : any) {
        throw new Error(e)
    }
}