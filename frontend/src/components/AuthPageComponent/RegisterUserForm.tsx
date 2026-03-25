import React from 'react'
import { Link } from 'react-router';

const RegisterUserForm = () => {
  return (
    <form action="">
      <div>
        <label htmlFor="">Username</label>
        <input type="text" placeholder="create your username" />
      </div>
      <div>
        <label htmlFor="">Email</label>
        <input type="email" placeholder="enter your email" />
      </div>
      <div>
        <label htmlFor="">Password</label>
        <input type="password" placeholder="Enter your password" />
      </div>
      <div>
        <label htmlFor="">Profile Picture</label>
        <input type="file" name="" id=""  />
      </div>
      <div>
        Already have an acccount{" "}
        <span>
          <Link to={"/login"}>Login here</Link>
        </span>
      </div>
      <button>Register</button>
    </form>
  );
}

export default RegisterUserForm