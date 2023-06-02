import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../api";
import { setAllUserDetails } from "../context/actions/allUsersAction";
import { DataTable } from "../components";
import { Avatar } from "../assests";

const DBUsers = () => {
  const allUsers = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch(setAllUserDetails(data));
        console.log("hi  use effect");
      });
    }
  });

  return (
    <div className="flex items-center justify-self-center gap-4 pt-6 w-full">
      {allUsers && (
        <DataTable
          columns={[
            {
              title: "Image",
              field: "photoURL",
              render: (rowData) => (
                <img
                  className="w-32 h-16 object-contain rounded-md"
                  src={rowData.photoURL ? rowData.photoURL : Avatar}
                  alt=""
                />
              ),
            },
            { title: "Name", field: "displayName" },
            { title: "Email", field: "email" },
            {
              title: "Verified",
              field: "emailVerified",
              render: (rowData) => (
                <p
                  className={`px-2 py-1 w-32 text-center text-primary rounded-md ${
                    rowData.emailVerified ? "bg-emerald-500" : "bg-red-500"
                  } `}
                >
                  {rowData.emailVerified ? "Verified" : "Not Verified"}
                </p>
              ),
            },
          ]}
          data={allUsers}
          title="List of Users"
        />
      )}
    </div>
  );
};

export default DBUsers;
