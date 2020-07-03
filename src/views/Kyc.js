import React from "react";
import FirebaseConfig from "../config/FirebaseConfig";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Kyc = () => {
  return (
    <>
      <Sidebar />
      <Header />
      <div className="content-wrapper">
        <h2>KYC</h2>
      </div>
    </>
  );
};

export default Kyc;
