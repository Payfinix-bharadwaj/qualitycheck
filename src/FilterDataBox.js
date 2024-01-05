import React, { useState } from "react";

const FilterDataBox = ({ onFilterChange }) => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedyear, setSelectedYear] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleMonthChange = (event) => {
    const { value } = event.target;
    setSelectedMonth(value);
    onFilterChange("month", value);
  };
  const handleYearChange = (event) => {
    const { value } = event.target;
    setSelectedYear(value);
    onFilterChange("year", value);
  };

  const handleStartDateChange = (event) => {
    const { value } = event.target;
    setStartDate(value);
    onFilterChange("startDate", value);
  };

  const handleEndDateChange = (event) => {
    const { value } = event.target;
    setEndDate(value);
    onFilterChange("endDate", value);
  };
  return (
    <div style={styles.container}>
      <div style={styles.filterBox}>
        <label style={styles.label}>Year:</label>
        <select
          style={styles.select}
          value={selectedyear}
          onChange={handleYearChange}
        >
          <option value="">All</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
        </select>
      </div>
      <div style={styles.filterBox}>
        <label style={styles.label}>Month:</label>
        <select
          style={styles.select}
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          <option value="">All</option>
          <option value="01-2023">January</option>
          <option value="02-2023">February</option>
          <option value="03-2023">March</option>
          <option value="04-2023">April</option>
          <option value="05-2023">May</option>
          <option value="06-2023">June</option>
          <option value="07-2023">July</option>
          <option value="08-2023">August</option>
          <option value="09-2023">September</option>
          <option value="10-2023">October</option>
          <option value="11-2023">November</option>
          <option value="12-2023">December</option>
        </select>
      </div>
      <div style={styles.filterBox}>
        <label style={styles.label}>Start Date:</label>
        <input
          style={styles.input}
          type="date"
          ovalue={startDate}
          onChange={handleStartDateChange}
        />
      </div>
      <div style={styles.filterBox}>
        <label style={styles.label}>End Date:</label>
        <input style={styles.input} type="date" value={endDate} onChange={handleEndDateChange} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px 0",
    marginLeft:"100px",
    gap:"20px"
  },
  filterBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  label: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "5px",
    fontFamily:"sans-serif"
  },
  select: {
    padding: "8px 12px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    width: "100px",
    height:"45px",
    fontFamily:"sans-serif"
  },
  input: {
    padding: "8px 12px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    width: "150px",
    height:"30px",
    fontFamily:"sans-serif"
  },
};

export default FilterDataBox;
