import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./UseAxiosSecure";



const useRenter = () => {
    const {user, loading} = useAuth()
    const axiosSecure = useAxiosSecure()
    const {data: isRenter, isPending: isRenterLoading} = useQuery({
        queryKey: [user?.email, 'isRenter'],
        enabled: !loading,
        queryFn: async() =>{
            const res = await axiosSecure.get(`/users/renter/${user.email}`)
            console.log(res.data);
            return res.data?.renter
        }
    })
    return [isRenter, isRenterLoading]
};

export default useRenter;