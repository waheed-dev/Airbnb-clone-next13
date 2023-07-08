import getCurrentUser from "@/app/actions/getCurrentUser";
import EmptyState from "@/app/components/EmptyState";
import getReservations from "@/app/actions/getReservations";
import ReservationsClient from "@/app/reservations/ReservationsClient";

const ReservationsPage = async () => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return (
            <div>
                <EmptyState title={'Unauthorized'} subtitle={'Please login'}/>
            </div>
        )
    }
    const reservations = await getReservations({
        userId : currentUser.id
    })
    console.log(reservations)
    if (reservations.length === 0) {
        return (
            <div>
                <EmptyState title={'No reservations found'} subtitle={'Looks like you have no reservations on your properties'}/>
            </div>
        )
    }
    return (
        <ReservationsClient reservations={reservations} currentUser={currentUser}/>
    )
}

export default ReservationsPage