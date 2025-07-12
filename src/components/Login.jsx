import { useRef } from "react";

export default function Login() {
  function handleSubmit(event) {
    event.preventDefault();
    const data = {
      password: password.current.value,
      email: email.current.value,
    };
    console.log(data);
  }

  const email = useRef();
  const password = useRef();

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input ref={email} id="email" type="email" name="email" />
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
