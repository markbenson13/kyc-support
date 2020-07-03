import React from "react";
import FirebaseConfig from "../config/FirebaseConfig";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <>
      <Sidebar />
      <h1>Home</h1>
      <button onClick={() => FirebaseConfig.auth().signOut()}>Sign out</button>
    </>
  );
};

export default Dashboard;
