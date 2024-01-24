// import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const BookingCard = ({booking, handleDelete}) => {
    return (
        <div className="flex  overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <div className="w-1/3 " >
                <img src={booking.image} alt="" className="object-cover w-full h-full" />
            </div>

            <div className="w-2/3 p-4 md:p-4">
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">{booking.name}</h1>
                
                <p className="mt-2 text-sm font-semibold text-gray-600 dark:text-gray-400">Per Month: ${booking.rent}</p>
                <p className="mt-2 text-sm font-semibold text-gray-600 dark:text-gray-400">Available: {booking.date}</p>
                

                <div className=" mt-3 ">
                    {/* <Link to={`/updateDate/${_id}`}>
                    <button className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-[#00917c] rounded-md focus:outline-none">Update Date</button>
                    </Link> */}
                </div>
  
            </div>
                <button onClick={()=> handleDelete(booking._id)} className=" px-3 py-1 text-lg font-semibold text-white uppercase bg-red-500  focus:outline-none"> <FaTrash/></button>
        </div>
    );
};

export default BookingCard;