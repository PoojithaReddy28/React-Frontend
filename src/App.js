import React, { useCallback, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Register from "./app/components/Register";
import Login from "./app/components/Login";
import Home from "./app/components/Home";
import Profile from "./app/components/Home";
import BoardUser from "./app/components/BoardUser";
import BoardEditor from "./app/components/BoardEditor";
import BoardSupervisor from "./app/components/BoardSupervisor";
import BoardPrincipal from "./app/components/BoardPrincipal";
import BoardAdmin from "./app/components/BoardAdmin";

import { logout } from "./app/slices/auth";

const App = () => {
  const [showEditorBoard, setShowEditorBoard] = useState(false);
  const [showSupervisorBoard, setShowSupervisorBoard] = useState(false);
  const [showPrincipalBoard, setShowPrincipalBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowEditorBoard(currentUser.roles.includes("ROLE_EDITOR"));
      setShowSupervisorBoard(currentUser.roles.includes("ROLE_SUPERVISOR"));
      setShowPrincipalBoard(currentUser.roles.includes("ROLE_PRINCIPAL"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    } else {
      setShowEditorBoard(false);
      setShowSupervisorBoard(false);
      setShowPrincipalBoard(false);
      setShowAdminBoard(false);
    }
  }, [currentUser]);

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            shule
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
            {showEditorBoard && (
              <li className="nav-item">
                <Link to={"/editor"} className="nav-link">
                  Editor Board
                </Link>
              </li>
            )}
            {showSupervisorBoard && (
              <li className="nav-item">
                <Link to={"/supervisor"} className="nav-link">
                  Supervisor Board
                </Link>
              </li>
            )}

            {showPrincipalBoard && (
              <li className="nav-item">
                <Link to={"/principal"} className="nav-link">
                  Principal Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/editor" element={<BoardEditor />} />
            <Route path="/supervisor" element={<BoardSupervisor />} />
            <Route path="/principal" element={<BoardPrincipal />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
