import { useState } from "react";
import Navbar from "../components/Navbar";
import HouseCard from "../components/HouseCard";


const Home = () => {

    const [price, setPrice] = useState('')
    if(price === "desc"){
        // allRooms.sort((a,b)=>b.price-a.price)
    }
    else if(price === "asc"){
        // allRooms.sort((a,b)=>a.price-b.price)
    }

    return (
        <div >
            <Navbar></Navbar>
            <div>
                <div className="flex justify-between items-center p-5 border-2 border-[#00917c] rounded-lg gap-1">
                    <div>
                    <input type="text" placeholder="Search here..." className="input input-bordered input-info w-full max-w-xs" />
                    </div>
                    <div className="form-control">
                        <select className="select select-info w-full max-w-xs"
                        onChange={(e)=> setPrice(e.target.value)}>
                            <option disabled selected>Price Range</option>
                            <option value="desc">High To Low</option>
                            <option value="asc">Low To High</option>
                        </select> 
                    </div>
                </div>
            </div>
            <div className="mt-10">
                <HouseCard></HouseCard>
            </div>
        </div>
    );
};

export default Home;