import React from 'react'
import { Link } from 'react-router';

const LoginUserForm = () => {
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
        Don't have an acccount?{" "}
        <span>
          <Link to={"/register"}>Register here</Link>
        </span>
      </div>
      <button>Login</button>
    </form>
  );
}

export default LoginUserForm