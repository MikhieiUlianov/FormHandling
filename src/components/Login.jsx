import { useState } from "react";

export default function Login() {
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });
  function handleChange(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => handleChange("email", e.target.value)}
            value={enteredValues.email}
            id="email"
            type="email"
            name="email"
          />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => handleChange("password", e.target.value)}
            value={enteredValues.password}
            id="password"
            type="password"
            name="password"
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>

        <button className="button">Login</button>
      </p>
    </form>
  );
}
