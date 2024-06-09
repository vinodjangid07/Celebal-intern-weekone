// DetailsComponent.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const DetailsComponent = () => {
  const location = useLocation();
  const { formData } = location.state || {};

  return (
    <div className="big_details_wrapper">
    <div className="details-container">
      <h1>Details</h1>
      {formData ? (
        <div>
          <p>First Name: {formData.firstName}</p>
          <p>Last Name: {formData.lastName}</p>
          <p>Username: {formData.username}</p>
          <p>Email: {formData.email}</p>
          <p>Phone No.: {formData.phoneNo}</p>
          <p>Country: {formData.country}</p>
          <p>City: {formData.city}</p>
          <p>Pan No.: {formData.panNo}</p>
          <p>Aadhar No.: {formData.aadharNo}</p>
        </div>
      ) : (
        <p className="no-data">No data available.</p>
      )}
    </div>
    </div>
  );
};

export default DetailsComponent;
