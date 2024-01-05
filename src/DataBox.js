import React from "react";

const DataBox = ({ name, value }) => {
  return (
    <div style={styles.container}>
      <p style={styles.name}>{name}</p>
      <p style={styles.value}>{value}</p>
    </div>
  );
};

const styles = {
  container: {
    width:"200px",
    height:"100px",
    border: "1px solid #ddd",
    padding: "15px",
    margin: "5px",
    textAlign: "center",
    borderRadius: "5px",
    boxShadow: "1.5px 1.5px 1.5px 1.5px rgba(238, 114, 43, 4)",
    backgroundColor: "#fff",
  },
  name: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "18px 0",
    fontFamily:"sans-serif",
  },
  value: {
    fontSize: "20px",
    margin: "0",
    fontFamily:"sans-serif"
  },
};

export default DataBox;
