import React, { useState, useEffect } from "react";
import DataBox from "./DataBox";
import FilterDataBox from "./FilterDataBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faSync } from "@fortawesome/free-solid-svg-icons";
import { utils, writeFile } from "xlsx";
import axiosInstance from "./utils/axios";
import { TailSpin } from "react-loader-spinner";

const QCDashboard = () => {
  const [tableData, setTableData] = useState([]);
  const [reportdata, setReportData] = useState([]);
  const [userdata, setUserData] = useState([]);
  const [qcloading, setQCLoading] = useState(false);
  const [reportloading, setReportLoading] = useState(false);
  const [userloading, setUserLoading] = useState(false);
  const [monthloading, setMonthLoading] = useState(false);
  const [daywiseloading, setDayWiseLoading] = useState(false);
  const [dailyloading, setDailyLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedyear, setSelectedYear] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [serialNumber, setSerialNumber] = useState(1);

  console.log("selectedyear", selectedyear);

  useEffect(() => {
    qcdashboard({ month: selectedMonth, year: selectedyear });
    qcreportdata({
      startDate,
      endDate,
      month: selectedMonth,
      year: selectedyear,
    });
    qcuserdata({ month: selectedMonth, year: selectedyear });
  }, [startDate, endDate, selectedMonth, selectedyear]);

  const handleRefresh = () => {
    window.location.reload();
    setSerialNumber(1);
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === "year") {
      setSelectedYear(value);
    } else if (filterType === "month") {
      setSelectedMonth(value);
    } else if (filterType === "startDate") {
      setStartDate(value);
    } else if (filterType === "endDate") {
      setEndDate(value);
    }

    qcreportdata({
      startDate: filterType === "startDate" ? value : startDate,
      endDate: filterType === "endDate" ? value : endDate,
      month: filterType === "month" ? value : selectedMonth,
    });
  };

  const generateSerialNumber = (index) => {
    return serialNumber + index;
  };

  const qcdashboard = async (value) => {
    setQCLoading(true);
    console.log("1");
    try {
      const { month, year } = value;
      const formattedMonth = month ? month.split("-")[0] : "";
      console.log("qcmonth", formattedMonth);
      console.log("qcyear", year);
      const response = await axiosInstance.post("/webqcdashboard/", {
        month: formattedMonth,
        year: year,
      });
      const queryData = response.data;
      console.log("qcdata", response);
      setTableData(queryData);
    } catch (err) {
      console.log(err);
    } finally {
      setQCLoading(false);
    }
  };

  const dailyreport = async () => {
    setDailyLoading(true);
    try {
      const response = await axiosInstance.get("/qcdailyreport1/");
      const dailyData = response.data.data;
      console.log("dailydata", response.data.data);
      if (dailyData.length > 0) {
        const wb = utils.book_new();
        const sheetData = [];

        sheetData.push(["Users", "QC Total", "QC Date"]);

        for (const row of dailyData) {
          const rowData = [
            row.rdng_ocr_status_changed_by,
            row.tot_count,
            row.date_qc,
          ];
          sheetData.push(rowData);
        }

        const ws = utils.aoa_to_sheet(sheetData);
        utils.book_append_sheet(wb, ws, "Daily Data");

        const fileName = "dailydata.xlsx";
        writeFile(wb, fileName);

        setDailyLoading(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setDailyLoading(false);
    }
  };

  const monthlyreport = async () => {
    setMonthLoading(true);
    try {
      const response = await axiosInstance.get("/qcmonthlyreport1/");
      const monthlyData = response.data.data;
      if (monthlyData.length > 0) {
        const wb = utils.book_new();
        const sheetData = [];

        sheetData.push([
          "QC Date",
          ...Array.from({ length: 15 }, (_, i) => `User ${i + 1}`),
          "QC Total",
        ]);

        for (const row of monthlyData) {
          const userData = Array.from(
            { length: 15 },
            (_, i) => row[`user${i + 1}`]
          );
          const rowData = [row.date_qc, ...userData, row.tot_count];
          sheetData.push(rowData);
        }

        const ws = utils.aoa_to_sheet(sheetData);
        utils.book_append_sheet(wb, ws, "Monthly Data");

        const fileName = "monthlydata.xlsx";
        writeFile(wb, fileName);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setMonthLoading(false);
    }
  };

  const daywisereport = async () => {
    setDayWiseLoading(true);
    try {
      const response = await axiosInstance.get("/qcdaywisereport1/");
      const daywiseData = response.data.data;
      console.log("daywiseData", response.data.data);
      if (daywiseData.length > 0) {
        const wb = utils.book_new();
        const sheetData = [];

        sheetData.push(["Users", "QC Total", "QC Date"]);

        for (const row of daywiseData) {
          const rowData = [
            row.rdng_ocr_status_changed_by,
            row.tot_count,
            row.date_qc,
          ];
          sheetData.push(rowData);
        }

        const ws = utils.aoa_to_sheet(sheetData);
        utils.book_append_sheet(wb, ws, "Day Wise Data");

        const fileName = "daywisedata.xlsx";
        writeFile(wb, fileName);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setDayWiseLoading(false);
    }
  };

  const qcreportdata = async (value) => {
    setReportLoading(true);
    try {
      const { startDate, endDate, month, year } = value;
      const monthyear = month || "";
      const response = await axiosInstance.post("/qcreportdata1/", {
        start_date: startDate,
        end_date: endDate,
        monthyear: monthyear,
        year: year,
      });
      const querydata = response.data.data;
      setReportData(querydata);
    } catch (err) {
      console.log(err);
    } finally {
      setReportLoading(false);
    }
  };

  const qcuserdata = async (value) => {
    setUserLoading(true);
    try {
      const { month, year } = value;
      const formattedMonth = month ? month.split("-")[0] : "";
      console.log("useryear", year);
      const response = await axiosInstance.post("/getuserdata/", {
        month: formattedMonth,
        year: year,
      });
      console.log("userdata", response.data.data);
      const querydata = response.data.data;
      setUserData(querydata);
    } catch (err) {
      console.log(err);
    } finally {
      setUserLoading(false);
    }
  };

  const {
    tot_count,
    pending_count,
    updated_count,
    yes_count,
    no_count,
    spoof_count,
  } = tableData;

  return (
    <div style={{ margin: "20px" }}>
      <h1 style={styles.title}>Quality Check Dashboard</h1>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <button
            onClick={handleRefresh}
            style={{ width: "100px", height: "40px" }}
          >
            <FontAwesomeIcon icon={faSync} /> Clear
          </button>
          <button
            onClick={daywisereport}
            style={{ marginLeft: "10px", width: "180px", height: "40px" }}
          >
            <FontAwesomeIcon icon={faDownload} /> Day-Wise Report
          </button>
        </div>
        <FilterDataBox onFilterChange={handleFilterChange} />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <button
            onClick={dailyreport}
            style={{ marginLeft: "10px", width: "180px", height: "40px" }}
          >
            <FontAwesomeIcon icon={faDownload} /> Daily Report
          </button>
          <button
            onClick={monthlyreport}
            style={{ marginLeft: "10px", width: "180px", height: "40px" }}
          >
            <FontAwesomeIcon icon={faDownload} /> Monthly Report
          </button>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        {tableData ? (
          <>
            <DataBox name="Total Readings" value={tot_count} />
            <DataBox name="QC Remaining" value={pending_count} />
            <DataBox name="QC Done" value={updated_count} />
            <DataBox name="QC Passed" value={yes_count} />
            <DataBox name="QC Failed" value={no_count} />
            <DataBox name="QC Spoof" value={spoof_count} />
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      {(qcloading ||
        reportloading ||
        monthloading ||
        userloading ||
        daywiseloading ||
        dailyloading) && (
        <div style={{ justifyContent: "center", marginTop: "20px" }}>
          <TailSpin
            height="50"
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
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeaderRow}>
              <th style={styles.tableHeaderCell}>S.No</th>
              <th style={styles.tableHeaderCell}>QC Date</th>
              {Array.from({ length: 15 }, (_, i) => i + 1).map((userNumber) => (
                <th key={userNumber} style={styles.tableHeaderCell}>
                  User {userNumber}
                </th>
              ))}
              <th style={styles.tableHeaderCell}>QC Total</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(reportdata) ? (
              reportdata.map((item, index) => (
                <tr
                  key={generateSerialNumber(index)}
                  style={{
                    borderBottom: "1px solid #ddd",
                    fontFamily: "sans-serif",
                  }}
                >
                  <td
                    style={{
                      padding: "10px",
                      border: "2px solid #ddd",
                      fontFamily: "sans-serif",
                    }}
                  >
                    {generateSerialNumber(index)}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      border: "2px solid #ddd",
                      fontFamily: "sans-serif",
                    }}
                  >
                    {item.date_qc}
                  </td>

                  {Array.from({ length: 15 }, (_, i) => i + 1).map(
                    (userNumber) => (
                      <td
                        key={userNumber}
                        style={{
                          padding: "10px",
                          border: "2px solid #ddd",
                          fontFamily: "sans-serif",
                        }}
                      >
                        {item[`user${userNumber}`]}
                      </td>
                    )
                  )}
                  <td
                    style={{
                      padding: "10px",
                      border: "2px solid #ddd",
                      fontFamily: "sans-serif",
                      fontWeight: "bold",
                    }}
                  >
                    {item.tot_count}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="18">Loading...</td>{" "}
              </tr>
            )}
          </tbody>
          <tbody>
            {Array.isArray(userdata) ? (
              userdata.map((item, index) => (
                <tr
                  key={generateSerialNumber(index)}
                  style={{
                    borderBottom: "1px solid #ddd",
                    fontFamily: "sans-serif",
                  }}
                >
                  <td
                    style={{
                      padding: "10px",
                      border: "2px solid #ddd",
                      fontFamily: "sans-serif",
                    }}
                  ></td>
                  <td
                    style={{
                      padding: "10px",
                      border: "2px solid #ddd",
                      fontFamily: "sans-serif",
                      fontWeight: "bold",
                    }}
                  >
                    Total
                  </td>

                  {Array.from({ length: 15 }, (_, i) => i + 1).map(
                    (userNumber) => (
                      <td
                        key={userNumber}
                        style={{
                          padding: "10px",
                          border: "2px solid #ddd",
                          fontFamily: "sans-serif",
                          fontWeight: "bold",
                        }}
                      >
                        {item[`user${userNumber}`]}
                      </td>
                    )
                  )}
                  <td
                    style={{
                      padding: "10px",
                      border: "2px solid #ddd",
                      fontFamily: "sans-serif",
                      fontWeight: "bold",
                    }}
                  >
                    {item.tot_count}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="18">Loading...</td>{" "}
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* {loading && (
        <div style={{ justifyContent: "center", marginTop: "20px" }}>
          <TailSpin
            height="50"
            width="50"
            color="#EE722B"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{ justifyContent: "center" }}
            wrapperClass=""
            visible={true}
          />
        </div>
      )} */}
    </div>
  );
};

const styles = {
  title: {
    fontSize: "24px",
    boxShadow: "3px 3px 3px 3px rgba(238, 114, 43, 4)",
    fontWeight: "bold",
    padding: "10px",
    borderRadius: 5,
    fontFamily: "sans-serif",
  },
  tableContainer: {
    marginTop: "20px",
    boxShadow: "0 2px 4px rgba(238, 114, 43, 4)",
    borderRadius: "5px",
    overflow: "hidden",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeaderRow: {
    backgroundColor: "#EE722B",
  },
  tableHeaderCell: {
    padding: "10px",
    border: "2px solid #ddd",
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "sans-serif",
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
  },
  tableCell: {
    padding: "10px",
    border: "2px solid #ddd",
    textAlign: "center",
    fontFamily: "sans-serif",
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
    gap: "10px",
  },
  paginationButton: {
    padding: "8px 16px",
    margin: "0 5px",
    borderRadius: "5px",
    background: "#EE722B",
    color: "white",
    border: "none",
    cursor: "pointer",
    outline: "none",
  },
  loader: {
    display: "inline-block",
    border: "4px solid #f3f3f3",
    borderTop: "4px solid #3498db",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    animation: "spin 2s linear infinite",
    marginTop: "10px",
  },
};

export default QCDashboard;
