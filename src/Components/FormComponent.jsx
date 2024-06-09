import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { Country, City } from 'country-state-city';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    showPassword: false,
    phoneNo: '',
    country: '',
    city: '',
    panNo: '',
    aadharNo: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let errors = {};
    if (!formData.firstName) errors.firstName = 'First Name is required';
    if (!formData.lastName) errors.lastName = 'Last Name is required';
    if (!formData.username) errors.username = 'Username is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.password) errors.password = 'Password is required';
    if (!formData.phoneNo) errors.phoneNo = 'Phone Number is required';
    if (!formData.country) errors.country = 'Country is required';
    if (!formData.city) errors.city = 'City is required';
    if (!formData.panNo) errors.panNo = 'Pan No. is required';
    if (!formData.aadharNo) errors.aadharNo = 'Aadhar No. is required';
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error for the current field
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phoneNo: value });

    // Clear error for the phone field
    if (errors.phoneNo) {
      setErrors((prevErrors) => ({ ...prevErrors, phoneNo: '' }));
    }
  };

  const handleCountryChange = (selectedOption) => {
    setFormData({ ...formData, country: selectedOption.value, city: '' });

    // Clear error for the country field
    if (errors.country) {
      setErrors((prevErrors) => ({ ...prevErrors, country: '' }));
    }
    if (errors.city) {
      setErrors((prevErrors) => ({ ...prevErrors, city: '' }));
    }
  };

  const handleCityChange = (selectedOption) => {
    setFormData({ ...formData, city: selectedOption.value });

    // Clear error for the city field
    if (errors.city) {
      setErrors((prevErrors) => ({ ...prevErrors, city: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      navigate('/details', { state: { formData } });
    }
  };

  const togglePasswordVisibility = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const countryOptions = Country.getAllCountries().map(country => ({
    value: country.isoCode,
    label: country.name
  }));

  const cityOptions = formData.country
    ? City.getCitiesOfCountry(formData.country).map(city => ({
        value: city.name,
        label: city.name
      }))
    : [];

  return (
    <div className="wrapper_container">
      <div className="form-container">
        <h2>Registration</h2>
        <h3>Enter your details to register</h3>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group">
            <label>First Name <span className="required">*</span></label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              autoComplete="off"
              placeholder='First Name'
            />
            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
          </div>
          <div className="form-group">
            <label>Last Name <span className="required">*</span></label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              autoComplete="off"
              placeholder='Last Name'
            />
            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
          </div>
          <div className="form-group">
            <label>Username <span className="required">*</span></label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              autoComplete="off"
              placeholder='johnathan07'
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>
          <div className="form-group">
            <label>Email <span className="required">*</span></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
              placeholder='example@gmail.com'
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="form-group password-group">
            <label>Password <span className="required">*</span></label>
            <div className="password_eye_wrapper">
            <input
              type={formData.showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="off"
              placeholder='Password'
            />
            <span className="password-toggle" onClick={togglePasswordVisibility}>
              {formData.showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                  <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525 372.8c22.8-25.7 42.7-55.6 58.8-87.5c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/>
                </svg>
              )}
            </span>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          <div className="form-group">
            <label>Phone No. <span className="required">*</span></label>
            <PhoneInput
              country={'in'}
              value={formData.phoneNo}
              onChange={handlePhoneChange}
              autoComplete="off"
            />
            {errors.phoneNo && <span className="error-message">{errors.phoneNo}</span>}
          </div>
          <div className="form-group">
            <label>Country <span className="required">*</span></label>
            <Select
              options={countryOptions}
              value={countryOptions.find(option => option.value === formData.country)}
              onChange={handleCountryChange}
              className='custom-select'
            />
            {errors.country && <span className="error-message">{errors.country}</span>}
          </div>
          <div className="form-group">
            <label>City <span className="required">*</span></label>
            <Select
              options={cityOptions}
              value={cityOptions.find(option => option.value === formData.city)}
              onChange={handleCityChange}
              isDisabled={!formData.country}
              className='custom-select'
            />
            {errors.city && <span className="error-message">{errors.city}</span>}
          </div>
          <div className="form-group">
            <label>Pan No. <span className="required">*</span></label>
            <input
              type="text"
              name="panNo"
              value={formData.panNo}
              onChange={handleChange}
              autoComplete="off"
              placeholder='Eg:ABCDE1234E'
            />
            {errors.panNo && <span className="error-message">{errors.panNo}</span>}
          </div>
          <div className="form-group">
            <label>Aadhar No. <span className="required">*</span></label>
            <input
              type="text"
              name="aadharNo"
              value={formData.aadharNo}
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.aadharNo && <span className="error-message">{errors.aadharNo}</span>}
          </div>
          <div className="form-group">
            <button type="submit" className='submit_button'>Submit</button>
          </div>
        </form>
      </div>
      <div className="wallpaper_container">
        <h1>Celebal Technologies</h1>
        <h2>Week 1 Assignment</h2>
        <p>Created by <a href="https://github.com/vinodjangid07">@vinodjangid07</a></p>
      </div>
    </div>
  );
};

export default FormComponent;
