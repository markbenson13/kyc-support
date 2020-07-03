import React, { Component } from "react";
import FirebaseConfig from "../config/FirebaseConfig";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Table from "../components/Table";

const columnTitle = [
  { id: "name", title: "Name" },
  { id: "email", title: "Email" },
  { id: "dateSubmitted", title: "Date Submitted" },
  { id: "level", title: "Level" },
  { id: "customerType", title: "Customer Type" },
  { id: "pepScan", title: "PEP Scan Identified" },
  { id: "openedBy", title: "Last opened by" },
  { id: "action", title: "Action" },
];

const data = [
  {
    name: "Rohan",
    email: "deusexmachina892",
    dateSubmitted: "06/25/2020",
    level: "Level 3",
    customerType: "Individual",
    pepScan: "Negative",
    openedBy: "Winnie 06/25/2020 4:30",
    action: "View",
    _unique: "ID",
  },
  {
    name: "Rohan",
    email: "deusexmachina892",
    dateSubmitted: "06/25/2020",
    level: "Level 3",
    customerType: "Individual",
    pepScan: "Negative",
    openedBy: "Winnie 06/25/2020 4:30",
    action: "View",
    _unique: "ID",
  },
  {
    name: "Rohan",
    email: "deusexmachina892",
    dateSubmitted: "06/25/2020",
    level: "Level 3",
    customerType: "Individual",
    pepScan: "Negative",
    openedBy: "Winnie 06/25/2020 4:30",
    action: "View",
    _unique: "ID",
  },
];

const Kyc = () => {
  return (
    <>
      <Sidebar />
      <Header />
      <div className="content-wrapper">
        <h2>KYC</h2>
        <Table title="Pending KYC" header={columnTitle} data={data} />
        <Table title="All KYC" header={columnTitle} data={data} />
      </div>
    </>
  );
};

export default Kyc;
