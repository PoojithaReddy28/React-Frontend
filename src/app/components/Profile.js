import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong>
          Profile
        </h3>
      </header>
      <p>
        <strong>Id: </strong> {currentUser.id}
      </p>
      <p>
        <strong>First Name:</strong> {currentUser.fname}
      </p>
      <p>
        <strong>Last Name: </strong> {currentUser.lname}
      </p>
      <p>
        <strong>Email: </strong> {currentUser.email}
      </p>
      <p>
        <strong>Authorities: </strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
      </p>
    </div>
  );
};

export default Profile;
