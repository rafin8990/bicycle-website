import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import useBuyer from "../hooks/useBuyer";
import MyProducts from "../Pages/Dashboard/MyProducts/MyProducts";
import Order from "../Pages/Dashboard/Order/Order";

import Navbar from "../Pages/Shared/Navbar/Navbar";

import useSeller from "./../hooks/useSeller";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isBuyer] = useBuyer(user?.email);
  const [isSeller] = useSeller(user?.email);
  return (
    <div>
      <Navbar></Navbar>
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          {/* <h3 className="text-center text-3xl font-bold">
            Welcom to Computer Zone
          </h3> */}
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-48 ">
            {isBuyer && (
              <>
                <li>
                  <Link to="/dashboard/order">My Orders</Link>
                </li>
                <li>
                  <Link to="/dashboard/mywishlist">My Wish List</Link>
                </li>
              </>
            )}
            {isSeller && (
              <>
                {" "}
                <li>
                  <Link to="/dashboard/addproducts">Add a Products</Link>
                </li>
                <li>
                  <Link to="/dashboard/myproducts">My Products</Link>
                </li>
                <li>
                  <Link to="/dashboard/mybuyers">My Buyers</Link>
                </li>
              </>
            )}

            {isAdmin && (
              <>
                <li>
                  <Link to="/dashboard/allseller">All Seller</Link>
                </li>
                <li>
                  <Link to="/dashboard/allbuyer">All Buyer</Link>
                </li>
                <li>
                  <Link to="/dashboard/admin">Admin Route</Link>
                </li>
                <li>
                  <Link to="/dashboard/reportadmin">Report</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
