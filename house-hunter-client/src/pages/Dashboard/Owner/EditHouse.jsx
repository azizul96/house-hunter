
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import toast from "react-hot-toast";


const EditHouse = () => {
    const {user} = useContext(AuthContext)
    const { id } = useParams()
    const axiosSecure = useAxiosSecure()
    const {data: home = {}, } = useQuery({
        queryKey: ['house'],
        queryFn: async() =>{
            const res = await axiosSecure.get(`house/${id}`)
            console.log(res.data);
            return res.data
        }
    })
    

    const handleSubmit = e =>{
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const description = form.description.value;
        const city = form.city.value;
        const image = form.image.value;
        const bedrooms = parseInt(form.bedrooms.value);
        const bathroom = parseInt(form.bathroom.value);
        const size = parseFloat(form.size.value);
        const rent = parseFloat(form.rent.value);
        const phoneNumber = form.phoneNumber.value;
        const date = form.date.value;

        const houseInfo = {
            name,
            description,
            city,
            image,
            bedrooms,
            bathroom,
            size,
            rent,
            phoneNumber,
            date,
            email: user.email
        }
        axiosSecure.patch(`/house/${home._id}`, houseInfo)
        .then(res =>{
            if(res.data.modifiedCount > 0){
                toast.success('Updated successfully');
            }
        })
        .catch(error =>{
            toast.error(error.message);
        })
    }
    return (
        <div>
            <h1 className="text-2xl text-center font-bold p-4 bg-rose-600 text-white rounded-md mb-1">Update House Details </h1>
            <div className=" bg-[#335c67] p-5 rounded-md">
            <form onSubmit={handleSubmit}>
                <div className="from-control w-full ">
                    <label className="label">
                        <span className="label-text font-semibold text-white">Name</span>
                    </label>
                    <input type="text" placeholder="Name" name="name" defaultValue={home.name} className="input input-bordered input-primary w-full " required />
                </div>
                <div className="from-control w-full my-4">
                    <label className="label">
                        <span className="label-text font-semibold text-white">Description</span>
                    </label>
                    <textarea className="textarea textarea-primary w-full" placeholder="Description" name="description" defaultValue={home.description}></textarea>
                </div>
                <div className="flex flex-col md:flex-row gap-x-5">
                    <div className="from-control w-full ">
                        <label className="label">
                            <span className="label-text font-semibold text-white">City</span>
                        </label>
                        <input type="text" placeholder="City" name="city" defaultValue={home.city} className="input input-bordered input-primary w-full " required />
                    </div>
                    <div className="from-control w-full ">
                        <label className="label">
                            <span className="label-text font-semibold text-white">Image URL</span>
                        </label>
                        <input type="text" placeholder="URL" name="image" defaultValue={home.image} className="input input-bordered input-primary w-full " required />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-x-5">
                    <div className="from-control w-full my-4">
                        <label className="label">
                            <span className="label-text font-semibold text-white">Bedrooms</span>
                        </label>
                        <input type="number" placeholder="Bedrooms" name="bedrooms" defaultValue={home.bedrooms} className="input input-bordered input-primary w-full " min="0" max="100" required/>
                    </div>
                    <div className="from-control w-full my-4">
                        <label className="label">
                            <span className="label-text font-semibold text-white">Bathroom</span>
                        </label>
                        <input type="number" placeholder="Bathroom" name="bathroom" defaultValue={home.bathroom} className="input input-bordered input-primary w-full " min="0" max="100" required/>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-x-5">
                    <div className="from-control w-full my-4">
                        <label className="label">
                            <span className="label-text font-semibold text-white">Size</span>
                        </label>
                        <input type="number" placeholder="Size Sq.Ft." name="size" defaultValue={home.size} className="input input-bordered input-primary w-full " min="0"  required/>
                    </div>
                    <div className="from-control w-full my-4">
                        <label className="label">
                            <span className="label-text font-semibold text-white">Rent Per Month</span>
                        </label>
                        <input type="number" placeholder="Rent" name="rent" defaultValue={home.rent} className="input input-bordered input-primary w-full " min="0"  required/>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-x-5">
                    <div className="from-control w-full my-4">
                        <label className="label">
                            <span className="label-text font-semibold text-white">Phone BD</span>
                        </label>
                        <input type="tel"  name="phoneNumber" pattern="[0-9]{11}" placeholder="e.g. - 01XXXXXXXXX" defaultValue={home.phoneNumber} className="input input-bordered input-primary w-full " required/>
                    </div>
                    <div className="from-control w-full my-4">
                        <label className="label">
                            <span className="label-text font-semibold text-white">Available Date</span>
                        </label>
                        <input type="date" placeholder="Date" name="date" defaultValue={home.date} className="input input-bordered input-primary w-full " required/>
                    </div>
                    
                </div>
                
                <button className="btn bg-[#fb8500] hover:bg-[#fb8500] text-white  w-full border-none shadow-md mt-5">Update</button>
            </form>
            </div>
        </div>
    );
};

export default EditHouse;