import getListings from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ListingClient from "@/app/listings/[listingId]/ListingClient";
import getReservations from "@/app/actions/getReservations";

interface IParams {
    listingId? : string
}

const ListingPage = async ({params} : {params : IParams}) => {
    const listing = await  getListings(params)
    const reservations = await getReservations(params)
    const currentUser = await getCurrentUser()
    if (!listing) {
        return <div>
            <EmptyState />
        </div>
    }
    return (
        <div>
            <ListingClient listing={listing} reservations={reservations} currentUser={currentUser}/>
        </div>
    )
}

export default ListingPage