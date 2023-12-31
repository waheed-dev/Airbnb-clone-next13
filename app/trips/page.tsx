import getCurrentUser from "@/app/actions/getCurrentUser";
import EmptyState from "@/app/components/EmptyState";
import getReservations from "@/app/actions/getReservations";
import TripsClient from "@/app/trips/TripsClient";


const TripsPage = async () => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return (
            <EmptyState title={'Unauthorized'} subtitle={'please login'}/>
        )
    }
    const reservations = await getReservations({userId : currentUser.id})
    if (reservations.length === 0) {
        return (
            <EmptyState title={'No trips found'} subtitle={'looks like you havent reserved any trips'}/>
    )
    }
    return (
        <TripsClient reservations={reservations} currentUser={currentUser}/>
    )
}
export default TripsPage