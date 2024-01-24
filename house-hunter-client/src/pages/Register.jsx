import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import useAxiosPublic from "../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthProvider";


const Register = () => {
    const navigate = useNavigate(null)
    const [showPass, setShowPass] = useState(false)
    const { createUser } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()

    const handleRegistration = e =>{
        e.preventDefault()
        const name = e.target.name.value
        const role = e.target.role.value
        const number = e.target.number.value
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(name, role, number, email, password);
        const userInfo = {
            name,
            role,
            number,
            email,
            password,
        }

        createUser(email, password)
        .then(()=>{
            axiosPublic.post('/users', userInfo)
            .then(res => {
                if(res.data.error){
                    toast.error('User Exists');
                }
                if(res.data.insertedId){
                    toast.success('Register Successfully');
                    if(role === "owner"){
                        navigate("/dashboard/owner")
                    }else{
                        navigate("/dashboard/renter")
                    } 
                }
            })
            .catch(error =>{
                toast.error(error.message);
            })
        })
        
    }
    return (
        <div>
            <div>
            
            <div className="hero h-screen bg-base-200 pb-5 ">
                <div className="hero-content flex-col ">
                    <div className="text-center ">
                        <h1 className="text-2xl md:text-5xl font-bold">Register now!</h1>
                        
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleRegistration} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input type="text" placeholder="Your Full Name" className="input input-bordered" name='name' required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Role</span>
                                </label>
                                <select className="select select-bordered w-full max-w-xs" name='role' required >
                                    <option disabled value="" >Your Role ?</option>
                                    <option value="owner">House Owner</option>
                                    <option value="renter">House Renter</option>
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Phone Number</span>
                                </label>
                                <input type="text" placeholder="Your Number" className="input input-bordered" name='number' required/>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" placeholder="Your email" className="input input-bordered" name='email' required/>
                            </div>
                            
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type={showPass ? "text" : "password"} placeholder="Your password" className="input input-bordered" name='password' required/>
                                <span className="absolute bottom-3 right-3 text-xl cursor-pointer" onClick={()=>setShowPass(!showPass)}>
                                    {
                                       showPass ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                    }
                                </span>
                            </div>
                            <div className="form-control mt-6 p-0">
                                <button className="btn btn-neutral" type='submit'>Register</button>
                            </div>
                            <label className="label">
                                Have an account? <Link to="/login" className="label-text-alt link link-hover">Please Login</Link>
                            </label>
                            {/* <SocialLogin /> */}
                        </form>
                        <div className="mb-5">
                                <label className="label justify-center items-center gap-3">
                                    Back to <Link to="/" className="underline text-[#00917c]"> Home</Link>
                                </label>
                                
                            </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Register;