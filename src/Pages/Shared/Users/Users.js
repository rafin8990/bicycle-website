import React, { useEffect, useState } from "react";

const Users = (email) => {
  const [userInfo, setuserInfo] = useState([]);

  useEffect(() => {
    if (email) {
      fetch(
        `http://localhost:5000/users/${email}`
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setuserInfo(data);
        });
    }
  }, [email]);
  return [userInfo];
};
export default Users;
