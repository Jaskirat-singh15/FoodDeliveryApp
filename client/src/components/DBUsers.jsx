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
      });
    }
  }, []);
  // console.log(allUsers);

  return (
    <div className="flex items-center justify-self-center gap-4 pt-6 w-full">
      <DataTable
        columns={[
          {
            title: "Image",
            field: "photoURL",
            render: (rowData) => (
              <img
                className="w-32 h-16 object-contain rounded-md"
                src={rowData.photoURL ? rowData.photoURL : Avatar}
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
         data = {allUsers}
        // data ={`  ${(allUsers == []) ? [] : allUsers } `}

        // data={(query) =>
        //   new Promise((resolve, reject) => {
        //     let url =
        //       "http://127.0.0.1:5001/feastexpress-4b58f/us-central1/app/api/users/all?";
        //     url += "per_page=" + query.pageSize;
        //     url += "&page=" + (query.page + 1);
        //     fetch(url)
        //       .then((response) => response.json())
        //       .then((result) => {
        //         resolve({
        //           data: result.data,
        //           page: result.page - 1,
        //           totalCount: result.total,
        //         });
        //       });
        //   })
        // }

        // data={(query) =>
        //     new Promise((resolve, reject) => {
        //       if (!allUsers) {
        //         getAllUsers().then((data) => {
        //           dispatch(setAllUserDetails(data));
        //         });
        //       }

        //       resolve({
        //         data: allUsers

        //       });
        //     })
        //   }


        // paertially working
        // data={(query) =>
        //   new Promise((resolve, reject) => {
        //     if (!allUsers) {
        //       getAllUsers().then((data) => {
        //         dispatch(setAllUserDetails(data))
        //         resolve({
        //           data: data,
        //           page: 5 - 1,
        //            totalCount: 100,
        //         });
        //       });
        //     }
        //   })
        // }
        title="List of Users"
      />
    </div>

    // trying to find bug on stack over flow it say data has to be a function or array but u are provinding an object
    // <div>hi{console.log(...allUsers)}</div>
  );
};

export default DBUsers;
