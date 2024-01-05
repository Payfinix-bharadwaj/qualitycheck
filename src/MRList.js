import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faSync } from "@fortawesome/free-solid-svg-icons";
import { utils, writeFile } from "xlsx";
import axiosInstance from "./utils/axios";
import { TailSpin } from "react-loader-spinner";
import FilterMRDataBox from "./FilterMRDataBox";

function MRList() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedyear, setSelectedYear] = useState("");
  const [selectedimg, setSelectedImg] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("selectedvalues", selectedMonth, selectedyear, selectedimg);

  const handleFilterChange = (filterType, value) => {
    if (filterType === "year") {
      setSelectedYear(value);
    } else if (filterType === "month") {
      setSelectedMonth(value);
    } else if (filterType === "image") {
      setSelectedImg(value);
    }
  };

  const mrlistdata = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/downloadmrlist/?month=${selectedMonth}&year=${selectedyear}&image_type=${selectedimg}`,
      );
      const mrlist = response.data.data;
      console.log("mrlist", response.data.data);
      if (mrlist.length > 0) {
        const wb = utils.book_new();
        const sheetData = [];

        sheetData.push(["MRID", `${selectedimg}`]);

        for (const row of mrlist) {
          const rowData = [row.mr_id, row.tot_count];
          sheetData.push(rowData);
        }

        const ws = utils.aoa_to_sheet(sheetData);
        utils.book_append_sheet(wb, ws, "MR Data");

        const fileName = `${selectedMonth}_${selectedyear}_MRList.xlsx`;
        writeFile(wb, fileName);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        margin: "30px",
        display: "flex",
        padding: "40px",
        flexDirection: "column",
        gap: "30px",
        borderRadius: 5,
        boxShadow: "3px 3px 3px 3px rgba(238, 114, 43, 4)",
        alignItems: "center",
        // backgroundColor:"lightgray"
      }}
    >
      <h1 style={styles.title}>Download MR Data for Quality Check</h1>
      <FilterMRDataBox onFilterChange={handleFilterChange} />

      <button onClick={mrlistdata} style={{ width: "180px", height: "40px" }}>
        <FontAwesomeIcon icon={faDownload} /> Download
      </button>
      {loading && (
        <div style={{ justifyContent: "center", marginTop: "10px" }}>
          <TailSpin
            height="40"
            width="50"
            color="#EE722B"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{ justifyContent: "center" }}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
      {/* <button type="submit">Download</button> */}
    </div>
  );
}

const styles = {
  title: {
    fontSize: "24px",
    boxShadow: "3px 3px 3px 3px rgba(238, 114, 43, 4)",
    fontWeight: "bold",
    padding: "10px",
    borderRadius: 5,
    fontFamily: "sans-serif",
  },
};

export default MRList;
