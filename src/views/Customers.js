import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Table from "../components/Table";

const secondTableColumn = [
  { id: "id", title: "RM Number" },
  { id: "name", title: "Name" },
  { id: "lastUpdateby", title: "Last Update By" },
  { id: "lastOpenedby", title: "Last Opened By" },
  { id: "action", title: "Action" },
];

const data = [
  {
    id: 1,
    name: "Rodrigo Roa Duterte",
    lastUpdateby: "Winnie 06/25/2020 10:20",
    dateSubmitted: "Winnie 06/25/2020 10:20",
    action: "View",
    _unique: "ID",
  },
  {
    id: 1,
    name: "Benigno Aquino Jr.",
    lastUpdateby: "Winnie 06/25/2020 10:20",
    dateSubmitted: "Winnie 06/25/2020 10:20",
    action: "View",
    _unique: "ID",
  },
  {
    id: 3,
    name: "Gloria Macapagal Arroyo",
    lastUpdateby: "Winnie 06/25/2020 10:20",
    dateSubmitted: "Winnie 06/25/2020 10:20",
    action: "View",
    _unique: "ID",
  },
];

const Customers = () => {
  return (
    <div>
      <Sidebar />
      <Header />
      <div className="content-wrapper">
        <h2>Customers</h2>
        <Table title="Customers" header={secondTableColumn} data={data} />
      </div>
    </div>
  );
};

export default Customers;
