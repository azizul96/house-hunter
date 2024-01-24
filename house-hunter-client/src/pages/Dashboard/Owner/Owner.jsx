import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

const Owner = () => {
    const {user} = useContext(AuthContext)

    const axiosPublic = useAxiosPublic()
    const {data: houses =[], refetch} = useQuery({
        queryKey: ['house'],
        queryFn: async()=>{
            const res = await axiosPublic.get(`/house`)
            const filterHouse = res.data.filter(house => house.email === user.email)
            return filterHouse
        }
    })

    const handleDelete = id =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You want to Delete!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete!"
          }).then((result) => {
            if (result.isConfirmed) {

            axiosPublic.delete(`/house/${id}`)
            .then(res =>{
                console.log(res.data);
                if(res.data.deletedCount > 0){
                    Swal.fire({
                        title: "Deleted!",
                        text: "Employee data has been Deleted.",
                        icon: "success"
                    });
                    refetch()
                }
                
            })
            }
          });
    }
  return (
    <div>
      <div className="overflow-x-auto rounded-md">
        <table className="table ">
          {/* head */}
          <thead className="bg-orange-300">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Number</th>
              <th>Rent</th>
              <th>City</th>
              <th>Action</th>
              
            </tr>
          </thead>
          <tbody>
            {houses.map((home) => (
              <tr key={home._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={home.image} alt="image" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{home.name}</td>
                <td>{home.phoneNumber}</td>
                <td>$ {home.rent}</td>
                <td>{home.city}</td>
                
                <td>
                  <Link to={`update/${home._id}`}>
                    <button className="btn btn-ghost btn-sm hover:bg-transparent text-green-500 md:text-2xl text-xl">
                      <FaEdit/>
                    </button>
                  </Link>
                  <button onClick={()=>handleDelete(home._id)} className="btn btn-ghost btn-sm hover:bg-transparent text-red-500 md:text-2xl text-xl">
                      <MdDelete/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Owner;
