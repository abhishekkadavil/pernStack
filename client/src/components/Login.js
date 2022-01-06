import React, { Fragment, useState } from "react";
import "../style.css";

const Login = ({ setAuth }) => {

  return (
    <Fragment>
      <div className="form-auth">
        <form>
          <h1 className="text-center my-5">Login</h1>
          <input
            type="email"
            name="email"
            placeholder="email"
            className="form-control my-3"/>
          <input
            type="password"
            name="password"
            placeholder="password"
            className="form-control my-3"/>
          <button
            type="button"
            className="btn btn-success w-100"
            onClick={() => setAuth(true)}>Login</button>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
