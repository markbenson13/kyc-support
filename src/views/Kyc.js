import React from "react";
import Sidebar from "../components/Sidebar";
import FirebaseConfig from "../config/FirebaseConfig";

const Kyc = () => {
  return (
    <>
      <Sidebar />
      <div className="content-wrapper">
        <h1>KYC</h1>
        <button onClick={() => FirebaseConfig.auth().signOut()}>
          Sign out
        </button>
      </div>
    </>
  );
};

export default Kyc;
