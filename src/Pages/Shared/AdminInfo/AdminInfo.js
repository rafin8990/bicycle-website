import React, { useEffect, useState } from "react";

const AdminInfo = (email) => {
  const [adminInfo, setAdminInfo] = useState([]);

  useEffect(() => {
    if (email) {
      fetch(
        `http://localhost:5000/users/${email}`
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setAdminInfo(data);
        });
    }
  }, [email]);
  return [adminInfo];
};
export default AdminInfo;
