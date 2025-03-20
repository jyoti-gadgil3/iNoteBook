import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const host = "http://localhost:5000";

  const handleClick = () => {
    navigate("/");
  };

  const handleProfile = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "auth-token": token,
      },
    });
    const json = await response.json();
    console.log(json.date)
    localStorage.setItem("name", json.name);
    localStorage.setItem("id", json._id);
    localStorage.setItem("email", json.email);
    localStorage.setItem('cDate', json.date);
  };

  if (token) {
    handleProfile();

  }
  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Your Profile</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Name : {localStorage.getItem("name")}</li>
          <li className="list-group-item">Email : {localStorage.getItem("email")}</li>
          <li className="list-group-item">ID : {localStorage.getItem("id")}</li>
          <li className="list-group-item">Profile Created : {localStorage.getItem("cDate")}</li>
        </ul>
      </div>
      <div className="my-2">
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Your Notes
        </button>
      </div>
    </div>
  );
};

export default Profile;
