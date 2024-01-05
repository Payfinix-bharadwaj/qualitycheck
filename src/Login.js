import React, { useState } from "react";
import QCDashboard from "./QCDashboard";
import MRList from "./MRList";
import Modal from "react-modal"; // Import react-modal
import "./loginpage.css";
import { Stack } from "react-bootstrap";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isQCDashboard, setQCDashboard] = useState(false);
  const [isMRList, setIsMRList] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const handleLogin = () => {
    if (username === "@amlansarkar" && password === "Sujanix#123") {
      setLoggedIn(true);
      setError("");
      setModalOpen(true);
    } else {
      setLoggedIn(false);
      setError("Invalid credentials");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleDownloadMRList = () => {
    setIsMRList(true);
    console.log("Downloading MRList");
    // You can render <MRList /> or navigate to another page if needed
  };

  const handleQCDashboard = () => {
    setQCDashboard(true);
    console.log("Opening Quality Check Dashboard");
    // Render <QCDashboard />
    // You can navigate to another page or handle it accordingly
  };

  return (
    <div className="container">
      {isLoggedIn && (isQCDashboard || isMRList) ? (
        isQCDashboard ? (
          <QCDashboard />
        ) : (
          <MRList />
        )
      ) : (
        <form>
          <h1>Login to access True-Read Quality Control</h1>
          <br />
          <br />
          <br />
          <br />
          <br />

          {error && <p className="error-message">{error}</p>}
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="@amlansarkar"
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sujanix#123"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="show-password-btn"
            >
              {showPassword ? "Hide" : "Show"} Password
            </button>
          </label>
          <br />
          <button type="button" onClick={handleLogin}>
            Login
          </button>

          {/* Modal for options */}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            className="modal"
            overlayClassName="overlay"
          >
            <h2>Select an option</h2>
            <Stack direction="column" spacing={3}>
              <Stack direction="row" spacing={4} gap={1}>
                <button onClick={handleDownloadMRList}>Download MRList</button>
                <button onClick={handleQCDashboard}>
                  Quality Check Dashboard
                </button>
              </Stack>
              <br></br>
              <button onClick={closeModal}>Close</button>
            </Stack>
          </Modal>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
