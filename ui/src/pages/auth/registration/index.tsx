import { useState } from "react";
import { classNames } from "./styles";
import { Login } from "../../../shared/api";

export const Registration = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const LoginRequest = async () => {
    const data = {
      email: email,
      password: password,
    };

    const response = await Login(data);
    console.log("response: ", response);
  };

  return (
    <div className={classNames.container}>
      <div className={classNames.formContainer}>
        <h1 className={classNames.heading}>Registration</h1>
        <form className="space-y-4">
          <div>
            <label className={classNames.label}>
              <span className={classNames.labelText}>Email</span>
            </label>
            <input
              type="text"
              placeholder="Email Address"
              className={classNames.input}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className={classNames.label}>
              <span className={classNames.labelText}>Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className={classNames.input}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <a href={`/logIn`} className={classNames.link}>
            LogIn
          </a>
          <div>
            <button
              type="button"
              className={classNames.button}
              onClick={LoginRequest}
            >
              Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
