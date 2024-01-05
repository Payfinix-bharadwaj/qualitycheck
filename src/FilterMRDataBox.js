import React, { useState } from "react";

const FilterMRDataBox = ({ onFilterChange }) => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedyear, setSelectedYear] = useState("");
  const [selectedimage, setSelectedImage] = useState("");

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
  const handleImageChange = (event) => {
    const { value } = event.target;
    setSelectedImage(value);
    onFilterChange("image", value);
  };

  return (
    <div style={styles.container}>
      <div style={styles.filterBox}>
        <label style={styles.label}>Select Year:</label>
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
        <label style={styles.label}>Select Month:</label>
        <select
          style={styles.select}
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          <option value="">All</option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>
      <div style={styles.filterBox}>
        <label style={styles.label}>Select Image Type:</label>
        <select
          style={styles.select}
          value={selectedimage}
          onChange={handleImageChange}
        >
          <option value="">All</option>
          <option value="Found">OCR Found Images</option>
          <option value="Not Found">OCR Not Found Images</option>
        </select>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px 0",
    // marginLeft: "10px",
    flexDirection: "column",
    gap: "40px",
  },
  filterBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  label: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "5px",
    fontFamily: "sans-serif",
  },
  select: {
    padding: "8px 12px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    width: "200px",
    height: "45px",
    fontFamily: "sans-serif",
  },
  input: {
    padding: "8px 12px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    width: "150px",
    height: "30px",
    fontFamily: "sans-serif",
  },
};

export default FilterMRDataBox;
