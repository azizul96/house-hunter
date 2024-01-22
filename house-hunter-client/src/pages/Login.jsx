import { useState } from "react";
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Login = () => {
    const [showPass, setShowPass] = useState(false)

    const handleLogin = e =>{
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(email, password);
    }
    return (
        <div>
            <div className="hero h-screen bg-base-200 pt-10 pb-28">
                <div className="hero-content flex-col ">
                    <div className="text-center ">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Make sure your email and password is correct.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" placeholder="Your email" className="input input-bordered" name='email' />
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type={showPass ? "text" : "password"} placeholder="Your password" className="input input-bordered" name='password' />
                                <span className="absolute bottom-3 right-3 text-xl cursor-pointer" onClick={()=>setShowPass(!showPass)}>
                                    {
                                       showPass ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                    }
                                </span>
                            </div>
                            <div className="form-control mt-6 p-0">
                                <button type='submit' className="btn btn-neutral">Login</button>
                            </div>
                            <label className="label">
                                New here? <Link to="/register" className="label-text-alt link link-hover">Create an account</Link>
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
    );
};

export default Login;