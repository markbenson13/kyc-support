import React from "react";

const TableFilter = () => {
  return (
    <div className="filter-wrapper">
      <div className="left-filter">
        <div className="form-control level-filter">
          <label for="level">Level:</label>
          <select name="level" id="level">
            <option selected>All</option>
            <option>Level 1</option>
            <option>Level 2</option>
            <option>Level 3</option>
            <option>Level 4</option>
          </select>
        </div>
        <div className="form-control date-filter">
          <label for="level">Set Date Range:</label>
          <input
            type="date"
            name="from-date"
            id="from-date"
            placeholder="From"
          />
          <input type="date" name="to-date" id="to-date" placeholder="To" />
        </div>
      </div>
      <div className="right-filter">
        <div className="search-field">
          <span className="search-icon"></span>
          <input type="text" placeholder="Search" />
          <button className="btn btn-primary">Go</button>
        </div>
      </div>
    </div>
  );
};

export default TableFilter;
