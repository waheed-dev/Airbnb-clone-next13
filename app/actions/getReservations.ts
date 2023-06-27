import prisma from "@/app/libs/prismaDb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(
    params: IParams
) {
    try {
        const { listingId, userId, authorId } = params;

        const query: any = {};

        if (listingId) {
            query.listingId = listingId;
        };

        if (userId) {
            query.userId = userId;
        }

        if (authorId) {
            query.listing = { userId: authorId };
        }
        return await prisma.reservation.findMany({
          where: query,
          include: {
            listing: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
    }catch (err : any) {
       throw new Error(err)
    }
}