import getCurrentUser from "@/app/actions/getCurrentUser";
import EmptyState from "@/app/components/EmptyState";
import getFavoriteListings from "@/app/actions/getFavouritesListings";
import FavouritesClient from "@/app/favourites/FavouritesClient";
const ListingPage = async () => {
    const currentUser = await getCurrentUser();
    const listings = await getFavoriteListings()
        if (listings.length === 0) {
            return (
                <EmptyState
                    title="No favorites found"
                    subtitle="Looks like you have no favorite listings."
                />

            );
        }
        return (
            <FavouritesClient listings={listings} currentUser={currentUser}/>
        )
}

export default ListingPage
