import "./App.css";
import { useState } from "react";
import Select from "react-select";
import locationData from "./data/data3";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [selectedProvince, setProvince] = useState(null);
  const [selectedCity, setCity] = useState(null);

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name || name.length < 3) {
      newErrors.name = "Username must be at least 3 characters";
    }
    if (!email || email.length < 3 || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!password || password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!selectedProvince) {
      newErrors.province = "Province must be selected";
    }
    if (!selectedCity) {
      newErrors.city = "City must be selected";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = {
        name,
        email,
        password,
        selectedProvince: selectedProvince.label,
        selectedCity: selectedCity.label,
      };
      console.log(formData);
      alert("Form submitted successfully:\n" + JSON.stringify(formData, null, 2));
    }
  };

  const provinceOptions = Object.keys(locationData).map((province) => ({
    value: province,
    label: province,
  }));

  const cityOptions = selectedProvince
    ? Object.keys(locationData[selectedProvince.value]).map((city) => ({
        value: city,
        label: city,
      }))
    : [];

  return (
    <div className="container">
      <h3>Registration</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Name">Name</label>
        <input
          type="text"
          placeholder="Enter Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <label htmlFor="Email">Email</label>
        <input
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label htmlFor="Password">Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <label htmlFor="Province">Province</label>
        <Select
          options={provinceOptions}
          onChange={(selected) => {
            setProvince(selected);
            setCity(null);
            setDistrict(null);
          }}
          value={selectedProvince}
        />
        {errors.province && <p className="error">{errors.province}</p>}

        <label htmlFor="City">City</label>
        <Select
          options={cityOptions}
          onChange={(selected) => {
            setCity(selected);
            setDistrict(null);
          }}
          value={selectedCity}
          isDisabled={!selectedProvince}
        />
        {errors.city && <p className="error">{errors.city}</p>}

        <button id="submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;