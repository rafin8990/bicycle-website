import React, { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const WishListModal = ({ treatment, setTreatment, refetch }) => {
  const orderDate = new Date();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const {
    title,
    category,
    condition,
    image_url,
    originalPrice,
    product_details,
    resalePrice,
    usedYear,
    email,
    sellerName,
  } = treatment;

  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const buyerPhone = form.phone.value;
    const buyerLocation = form.location.value;

    const orders = {
      ...treatment,
      user,
      paid: "unpaid",
      buyerPhone,
      buyerLocation,
      orderDate,
      product: "wishlist",
    };

    // console.log("orderModals", orders);

    fetch(
      "http://localhost:5000/wishlist",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(orders),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // toast.success("Order Complete");
        console.log("order", data);
        if (data.acknowledged) {
          //  setTreatment(null);
          toast.success("Booking confirmed");
          navigate("/dashboard/mywishlist");
          refetch();
        } else {
          toast.error(data.message);
        }
      });
    // console.log("useremail", order);
  };

  return (
    <div>
      {" "}
      <input type="checkbox" id="my-modal1" className="modal-toggle" />
      <div className="modal">
        <h2 className="text-2xl text-center">Wish List</h2>
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 gap-3 mt-10"
          >
            <label
              htmlFor="my-modal1"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <input
              type="text"
              disabled
              value={title}
              className="input w-full input-bordered "
            />

            <input
              name="price"
              type="text"
              value={resalePrice}
              disabled
              placeholder="Your Name"
              className="input w-full input-bordered"
            />
            <input
              name="name"
              type="text"
              defaultValue={user?.displayName}
              disabled
              placeholder="Your Name"
              className="input w-full input-bordered"
            />
            <input
              name="email"
              type="email"
              defaultValue={user?.email}
              disabled
              placeholder="Email Address"
              className="input w-full input-bordered"
            />
            <input
              name="phone"
              type="text"
              required
              placeholder="Phone Number"
              className="input w-full input-bordered"
            />
            <input
              name="location"
              type="text"
              required
              placeholder="Meet Locaton"
              className="input w-full input-bordered"
            />
            <br />
            <input
              className="btn btn-accent w-full"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default WishListModal;
