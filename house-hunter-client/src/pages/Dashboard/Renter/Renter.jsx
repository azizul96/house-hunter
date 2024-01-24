import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import BookingCard from "../../../components/BookingCard";
import Swal from "sweetalert2";


const Renter = () => {

    const axiosPublic = useAxiosPublic()
    const {data: allBooking =[], refetch} = useQuery({
        queryKey: ['bookings'],
        queryFn: async()=>{
            const res = await axiosPublic.get(`/bookings`)
            return res.data
        }
    })
    const handleDelete = (id) =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You want to Delete!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete!"
          }).then((result) => {
            if (result.isConfirmed) {

            axiosPublic.delete(`/bookings/${id}`)
            .then(res =>{
                console.log(res.data);
                if(res.data.deletedCount > 0){
                    Swal.fire({
                        title: "Deleted!",
                        text: "Booking has been Deleted.",
                        icon: "success"
                    });
                    refetch()
                }
                
            })
            }
          });
    }
    
    return (
        <div>
            <h1 className="text-2xl text-center font-bold p-4 bg-rose-600 text-white rounded-md mb-1">All Bookings </h1>
            <div className="grid grid-cols-1  gap-4 mt-10">
                {
                    allBooking.map(booking => <BookingCard key={booking._id} booking={booking} handleDelete={handleDelete}></BookingCard>)
                }
            </div>
        </div>
    );
};

export default Renter;