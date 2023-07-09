import getCurrentUser from "@/app/actions/getCurrentUser";
import EmptyState from "@/app/components/EmptyState";
import getReservations from "@/app/actions/getReservations";
import TripsClient from "@/app/trips/TripsClient";
import getListings from "@/app/actions/getListings";
import PropertiesClient from "@/app/properties/PropertiesClient";


const PropertiesPage = async () => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return (
            <EmptyState title={'Unauthorized'} subtitle={'please login'}/>
        )
    }
    const listings = await getListings({userId : currentUser.id})
    if (listings.length === 0) {
        return (
            <EmptyState title={'No properties found'} subtitle={'looks like you have no properties'}/>
    )
    }
    return (
        <PropertiesClient listings={listings} currentUser={currentUser}/>
    )
}
export default PropertiesPage