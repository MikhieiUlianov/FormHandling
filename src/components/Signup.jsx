import {
  isEmail,
  hasMinLength,
  isNotEmpty,
  isEqualToOtherValue,
} from "../util/validation";
import { useActionState } from "react";

export default function Signup() {
  //when we use "useActionState" our fucntion is called in a different way,
  //in this case formData object will be as the second arg.
  //first arg is the previous state

  //first time it is executed,
  // our initial state will simply be that initial state,
  //  which was passed to this hook
  function signUpAction(prevState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");
    const firstName = formData.get("first-name");
    const lastName = formData.get("last-name");
    const role = formData.get("role");
    const terms = formData.get("terms");
    const acquisitionChannel = formData.getAll("acquisition");
    let errors = [];

    if (!isEmail(email)) {
      errors.push("invalid email address");
    }
    if (!isNotEmpty(password) || !hasMinLength(password, 6)) {
      errors.push("Invalid password");
    }

    if (!isEqualToOtherValue(password, confirmPassword)) {
      errors.push("Passwords do not match");
    }
    if (!isNotEmpty(firstName) || !isNotEmpty(lastName)) {
      errors.push("Provide both your first and last name");
    }

    if (!isNotEmpty(role)) {
      errors.push("Select role");
    }
    if (!terms) {
      errors.push("You must agree with our conditions");
    }
    if (acquisitionChannel.length === 0) {
      errors.push("Select acquisition channel");
    }

    if (errors.length > 0) {
      return { errors };
    }

    return { errors: null };
  }
  //second argument is an initial state,
  // which will be active while "signUpAction" function will not be executed

  //arg #1 it is state which can change from initial to state which will be returned by "signUpAction"
  //arg #2 we get an updated form action.
  // which is wrappin our "signUpAction" function, and does so it can listen it, and provides some exctra futures.
  //arg #3 pending status, true or false
  const [formState, formAction /* pending */] = useActionState(signUpAction, {
    errors: null,
  });

  return (
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" />I
          agree to the terms and conditions
        </label>
      </div>
      {formState.errors && (
        <ul className="error">
          {formState.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Sign up</button>
      </p>
    </form>
  );
}
