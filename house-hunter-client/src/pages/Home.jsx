import { useState } from "react";
import Navbar from "../components/Navbar";
import HouseCard from "../components/HouseCard";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const Home = () => {

    const axiosPublic = useAxiosPublic()
    const {data: allHouse =[], } = useQuery({
        queryKey: ['users'],
        queryFn: async()=>{
            const res = await axiosPublic.get(`/house`)
            return res.data
        }
    })

    const [rent, setRent] = useState('')
    if(rent === "desc"){
        allHouse.sort((a,b)=>b.rent-a.rent)
    }
    else if(rent === "asc"){
        allHouse.sort((a,b)=>a.rent-b.rent)
    }

    return (
        <div >
            <Navbar></Navbar>
            <div className="hero h-[500px] rounded-md" style={{backgroundImage: 'url(/banner.jpg)'}}>
                <div className="hero-overlay bg-opacity-60 rounded-md"></div>
                    <div className=" text-center text-neutral-content">
                    <h1 className="mb-5 text-5xl font-bold text-rose-600">House Hunter</h1>
                    <p className="mb-5">Best Solution For Your House</p>
                    </div>
            </div>
            <div className="mt-4">
                <div className="flex justify-between items-center p-4 border-2 border-[#00917c] rounded-lg gap-1">
                    <div>
                    <input type="text" placeholder="Search here..." className="input input-bordered input-info w-full max-w-xs" />
                    </div>
                    <div className="form-control">
                        <select className="select select-info w-full max-w-xs"
                        onChange={(e)=> setRent(e.target.value)}>
                            <option disabled selected>Rent Range</option>
                            <option value="desc">High To Low</option>
                            <option value="asc">Low To High</option>
                        </select> 
                    </div>
                </div>
            </div>
            <div className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                   allHouse.map(house => <HouseCard key={house._id} house={house}></HouseCard>) 
                }
                
            </div>
        </div>
    );
};

export default Home;