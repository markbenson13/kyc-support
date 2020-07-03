import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Accounts = () => {
  return (
    <>
      <Sidebar />
      <Header />
      <div className="content-wrapper">
        <h2>Accounts</h2>
      </div>
    </>
  );
};

export default Accounts;
