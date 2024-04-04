import { useState } from "react";
import { useDispatch } from "react-redux";

import { classNames } from "./styles";
import { Login } from "../../../shared/api";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../../store/reducers/user/action";

export const LogIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const LoginRequest = async () => {
   
    const data = {
      email: email,
      password: password,
    };

    const response = await Login(data);

    if (response) {
      console.log("response", response);
      dispatch(setToken(response?.data.token));
      navigate("/voiting");
    }
  };

  return (
    <div className={classNames.container}>
      <div className={classNames.formContainer}>
        <h1 className={classNames.heading}>LogIn</h1>
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

          <div>
            <button
              type="button"
              className={classNames.button}
              onClick={LoginRequest}
            >
              Login
            </button>
            <div className={classNames.registrationWrapeer}>
              <span className={classNames.titleLink}>
                Сon't have an account?
              </span>
              <a href={`/registration`} className={classNames.link}>
                Registration
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
