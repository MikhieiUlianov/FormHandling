import { useRef, useState } from "react";

export default function Login() {
  const email = useRef();
  const password = useRef();

  const [emailIsInvalid, setEmailIsValid] = useState();

  function handleSubmit(event) {
    event.preventDefault();
    const enteredPassword = password.current.value;
    const enteredEmail = email.current.value;

    const emailIsValid = enteredEmail.includes("@");

    if (!emailIsValid) {
      setEmailIsValid(true);
      return;
    }

    setEmailIsValid(false);

    console.log(data);
    event.target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input ref={email} id="email" type="email" name="email" />
          <div className="control-error">
            {emailIsInvalid && <p>Please Enter a valid email</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input ref={password} id="password" type="password" name="password" />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>

        <button className="button">Login</button>
      </p>
    </form>
  );
}
