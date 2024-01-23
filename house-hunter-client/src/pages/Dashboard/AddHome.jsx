import toast from "react-hot-toast";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";


const AddHome = () => {
    const navigate = useNavigate(null)
    const axiosPublic = useAxiosPublic()

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
        }

        axiosPublic.post('/house', houseInfo)
        .then(res => {
            console.log(res.data)
            if(res.data.insertedId){
                toast.success('House Added successfully');
                navigate("/dashboard/add-house")
            }
        })
        .catch(error =>{
            toast.error(error.message);
        })
          
    }

    return (
        <div>
            <h1 className="text-2xl text-center font-bold p-4 bg-rose-600 text-white rounded-md mb-1">Add New House </h1>
            <div className=" bg-[#335c67] p-5 rounded-md">
            <form onSubmit={handleSubmit}>
                <div className="from-control w-full ">
                    <label className="label">
                        <span className="label-text font-semibold text-white">Name</span>
                    </label>
                    <input type="text" placeholder="Name" name="name" className="input input-bordered input-primary w-full " required />
                </div>
                <div className="from-control w-full my-4">
                    <label className="label">
                        <span className="label-text font-semibold text-white">Description</span>
                    </label>
                    <textarea className="textarea textarea-primary w-full" placeholder="Description" name="description"></textarea>
                </div>
                <div className="flex flex-col md:flex-row gap-x-5">
                    <div className="from-control w-full ">
                        <label className="label">
                            <span className="label-text font-semibold text-white">City</span>
                        </label>
                        <input type="text" placeholder="City" name="city" className="input input-bordered input-primary w-full " required />
                    </div>
                    <div className="from-control w-full ">
                        <label className="label">
                            <span className="label-text font-semibold text-white">Image URL</span>
                        </label>
                        <input type="text" placeholder="URL" name="image" className="input input-bordered input-primary w-full " required />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-x-5">
                    <div className="from-control w-full my-4">
                        <label className="label">
                            <span className="label-text font-semibold text-white">Bedrooms</span>
                        </label>
                        <input type="number" placeholder="Bedrooms" name="bedrooms" className="input input-bordered input-primary w-full " min="0" max="100" required/>
                    </div>
                    <div className="from-control w-full my-4">
                        <label className="label">
                            <span className="label-text font-semibold text-white">Bathroom</span>
                        </label>
                        <input type="number" placeholder="Bathroom" name="bathroom" className="input input-bordered input-primary w-full " min="0" max="100" required/>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-x-5">
                    <div className="from-control w-full my-4">
                        <label className="label">
                            <span className="label-text font-semibold text-white">Size</span>
                        </label>
                        <input type="number" placeholder="Size Sq.Ft." name="size" className="input input-bordered input-primary w-full " min="0"  required/>
                    </div>
                    <div className="from-control w-full my-4">
                        <label className="label">
                            <span className="label-text font-semibold text-white">Rent Per Month</span>
                        </label>
                        <input type="number" placeholder="Rent" name="rent" className="input input-bordered input-primary w-full " min="0"  required/>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-x-5">
                    <div className="from-control w-full my-4">
                        <label className="label">
                            <span className="label-text font-semibold text-white">Phone BD</span>
                        </label>
                        <input type="tel"  name="phoneNumber" pattern="[0-9]{11}" placeholder="e.g. - 01XXXXXXXXX" className="input input-bordered input-primary w-full " required/>
                    </div>
                    <div className="from-control w-full my-4">
                        <label className="label">
                            <span className="label-text font-semibold text-white">Available Date</span>
                        </label>
                        <input type="date" placeholder="Date" name="date" className="input input-bordered input-primary w-full " required/>
                    </div>
                    
                </div>
                
                <button className="btn bg-[#fb8500] hover:bg-[#fb8500] text-white  w-full border-none shadow-md mt-5">Add Now </button>
            </form>
            </div>
        </div>
    );
};

export default AddHome;