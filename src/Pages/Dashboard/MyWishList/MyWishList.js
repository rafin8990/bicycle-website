import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import useTitle from "../../../hooks/useTitle";

const MyWishList = () => {
  useTitle("Wish List");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  console.log(user);

  const [allWishListData, setAllWishListData] = useState([]);

  useEffect(() => {
    fetch(
      "http://localhost:5000/wishlist"
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setAllWishListData(data);
      });
  }, []);
  console.log("order", allWishListData);

  const handleDelete = (order) => {
    console.log("delete", order._id);

    fetch(
      `http://localhost:5000/wishlist/${order._id}`,
      {
        method: "DELETE",
        // headers: {
        //   authorization: `bearer ${localStorage.getItem("accessToken")}`,
        // },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log("DELETE DATA", data);
        alert("Are you DELETE this order");
        const remainingOrders = allWishListData.filter(
          (orders) => orders._id !== order._id
        );
        setAllWishListData(remainingOrders);
        // refetch();
      });
  };

  const handleBooking = (wishlist) => {
    fetch(
      `http://localhost:5000/wishlist/buyer/${wishlist._id}`,
      {
        method: "PUT",
        // headers: {
        //   authorization: `bearer ${localStorage.getItem("accessToken")}`,
        // },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        toast.success("Make verify successful.");
      });

    // console.log("orderModals", orders);

    fetch(
      "http://localhost:5000/bookings",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(wishlist),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // toast.success("Order Complete");
        console.log("order", data);
        if (data.acknowledged) {
          //  setTreatment(null);
          toast.success("Booking confirmed");
          navigate("/dashboard/order");
        } else {
          toast.error(data.message);
        }
      });
    // console.log("useremail", order);
  };
  return (
    <div>
      {" "}
      <div>
        <h2 className="text-3xl text-center my-10 font-bold">All Wish List</h2>
        <div className="overflow-x-auto">
          <table className="table  w-full">
            <thead>
              <tr>
                <th>{user?.email}</th>
                <th>Name</th>
                <th>Email</th>
                <th>Price</th>
                <th>Buy Now</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {allWishListData.map((wishlist, i) => (
                <>
                  {wishlist?.user?.email === user?.email && (
                    <tr key={wishlist._id}>
                      <th>
                        <img
                          className="rounded-xl w-24"
                          src={wishlist.image_url}
                          alt=""
                        ></img>
                      </th>
                      <td>{wishlist.title}</td>
                      <td>{wishlist?.sellerEmail}</td>
                      <td>{wishlist.resalePrice}</td>

                      {wishlist?.product === "wishlist" ? (
                        <>
                          <td>
                            <button
                              onClick={() => handleBooking(wishlist)}
                              className="btn btn-xs btn-success"
                            >
                              Order Now
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>
                            <button
                              disabled
                              className="btn btn-xs btn-secondary"
                            >
                              All ready Order
                            </button>
                          </td>
                        </>
                      )}
                      <td>
                        <button
                          onClick={() => handleDelete(wishlist)}
                          className="btn btn-xs btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyWishList;
