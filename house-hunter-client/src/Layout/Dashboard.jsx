import { Link, Outlet } from "react-router-dom";
import { FaTasks } from "react-icons/fa";
import { AiFillDashboard } from 'react-icons/ai'
// import { FiLogOut } from "react-icons/fi";
import Navbar from "../components/Navbar";
import useOwner from "../Hooks/useOwner";
import useRenter from "../Hooks/useRenter";

const Dashboard = () => {
    const [isOwner] = useOwner()
    const [isRenter] = useRenter()

    return (
        <div className="">
            <Navbar></Navbar>
            <div className="flex flex-col md:flex-row container mx-auto gap-2">
                <div className=" min-h-[84vh] md:w-56   bg-[#2a9d8f] rounded-md">
                    <div className='flex justify-center mt-5'>
                        <img className="object-cover w-20 h-20 border-2 border-[#8a50fb] rounded-full "src={`/user.png`} alt="avatar" />
                        
                    </div>
                    <p className="font-semibold text-white text-xl text-center mb-10"> Hello </p>
                    <div className='px-4 mb-4 '>
                        { isOwner && 
                            <>
                            <Link to="/dashboard/owner">
                                <button className='btn btn-md bg-[#395775] hover:bg-[#395775] w-full text-white mb-2  border-none'><AiFillDashboard /> Owner </button>
                            </Link>
                            <Link to="add-house">
                                <button className='btn btn-md bg-[#fb8500] hover:bg-[#fb8500] w-full text-white mb-2 border-none'><FaTasks /> Add House </button>
                            </Link>
                            </>
                        }
                        { isRenter && 
                            <>
                            <Link to="/dashboard/renter">
                                <button className='btn btn-md bg-[#395775] hover:bg-[#395775] w-full text-white mb-2  border-none'><AiFillDashboard /> Renter </button>
                            </Link>
                            <Link to="/dashboard/renter">
                                <button className='btn btn-md bg-[#fb8500] hover:bg-[#fb8500] w-full text-white mb-2 border-none'><FaTasks /> Booked House </button>
                            </Link>
                            </>
                        }
                    </div>
                    
                    
                    {/* <div className='px-5 text-center py-3'>
                        <button  className='btn btn-md btn-error  text-white'><FiLogOut/>Logout</button>
                    </div> */}
                </div>
                <div className="flex-1">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;