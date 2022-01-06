import React, { Fragment, useState } from "react";

const Register = () => {

  // const initalRegInputs = {
  //   fullname: "",
  //   email: "",
  //   password: "",
  // };

  const [regInputs, setRegInputs] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const {fullname, email, password} = regInputs;

  const handleRegInputChange = (e) => {
    //const name = e.target.name 
    //const value = e.target.value 
    //const { name, value } = e.target;

    setRegInputs({...regInputs,[e.target.name]: e.target.value});
  };


  const onSubmit = async(e) => {
    e.preventDefault();
    try {

      const body = {fullname, email, password};
      const response = await fetch("http://localhost:5000/auth/register",{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(body)
      });
      console.log(JSON.stringify(body));
      const parseRes = await response.json();
      console.log(parseRes);
      
    } catch (err) {
      console.error(err.message);
      
    }
  };

  return (
    <Fragment>
      <div className="form-auth">
        <h1>Register</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="fullname"
            placeholder="full name"
            className="form-control my-3 "
            value={regInputs.fullname}
            onChange={handleRegInputChange}
          ></input>
          <input
            type="email"
            name="email"
            placeholder="email"
            className="form-control my-3 "
            value={regInputs.email}
            onChange={handleRegInputChange}
          ></input>
          <input
            type="password"
            name="password"
            placeholder="password"
            className="form-control my-3 "
            value={regInputs.password}
            onChange={handleRegInputChange}
          ></input>
          <button className="btn btn-success w-100">
            Register
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Register;
