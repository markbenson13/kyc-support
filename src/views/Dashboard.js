import React from "react";
import FirebaseConfig from "../config/FirebaseConfig";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Amla from "./Amla";
import Accounts from "./Accounts";
import Kyc from "./Kyc";

const Dashboard = () => {
  return (
    <>
      <Sidebar />
      <Header />
      <div className="content-wrapper">
        {/* <button onClick={() => FirebaseConfig.auth().signOut()}>
          Sign out
        </button> */}
      </div>
    </>
  );
};

export default Dashboard;
