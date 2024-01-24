import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./UseAxiosSecure";
import useAuth from "./useAuth";



const useOwner = () => {
    const {user, loading} = useAuth()
    const axiosSecure = useAxiosSecure()
    const {data: isOwner, isPending: isOwnerLoading} = useQuery({
        queryKey: [user?.email, 'isOwner'],
        enabled: !loading,
        queryFn: async() =>{
            const res = await axiosSecure.get(`/users/owner/${user.email}`)
            console.log(res.data);
            return res.data?.owner
        }
    })
    return [isOwner, isOwnerLoading]
};

export default useOwner;