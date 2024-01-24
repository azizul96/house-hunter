import { FaBath, FaBed, FaBuilding, FaCalendar, FaPhone } from "react-icons/fa";

const HouseCard = ({ house }) => {
    console.log(house);


    return (
        <div className="w-full overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <img className="object-cover object-center w-full h-56" src={house.image} alt="avatar"/>

            <div className="flex items-center px-6 py-3 bg-gray-900">
                <svg aria-label="headphones icon" className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    
                </svg>

                <h1 className="mx-3 text-lg font-semibold text-white">Rent - ${house.rent}</h1>
            </div>

            <div className="px-6 py-4">
                <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{house.name}</h1>

                <p className="py-2 text-gray-700 dark:text-gray-400">{house.description.slice(0, 30)}...</p>

                <div className="flex items-center mt-3 text-gray-700 dark:text-gray-200">
                    <p><FaBed/></p>

                    <h1 className="px-2 text-sm">Bedrooms: {house.bedrooms}</h1>
                </div>

                <div className="flex items-center mt-3 text-gray-700 dark:text-gray-200">
                    <p><FaBath/></p>
                    <h1 className="px-2 text-sm">Bathroom: {house.bathroom}</h1>
                </div>

                <div className="flex items-center mt-3 text-gray-700 dark:text-gray-200">
                    <p><FaBuilding/></p>

                    <h1 className="px-2 text-sm">Size: {house.size} Sq.Ft.</h1>
                </div>
                <div className="flex items-center mt-3 text-gray-700 dark:text-gray-200">
                    <p><FaPhone/></p>

                    <h1 className="px-2 text-sm">Phone: {house.phoneNumber} </h1>
                </div>
                <div className="flex items-center mt-3 text-gray-700 dark:text-gray-200">
                    <p><FaCalendar/></p>

                    <h1 className="px-2 text-sm">Available: {house.date} </h1>
                </div>
                <div className="flex justify-center items-center mt-4">
                    <button className="btn btn-success btn-sm rounded-full text-white ">Book Now</button>
                </div>
            </div>
        </div>
    );
};

export default HouseCard;