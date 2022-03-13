import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../../store/session';
import "./Splash.css"
import {FaSpotify} from 'react-icons/fa'
import {Link} from 'react-router-dom'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    const err = []
    if(password !== repeatPassword){
      err.push('Passwords Must Match')
      setErrors(err)
    }
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="splash">
      <h1><FaSpotify/> Spot-ify</h1>
    <div>
    <form onSubmit={onSignUp}>
      <div >
        {errors?.map((error, ind) => {
         return <div id='signup-err' key={ind}>{error}</div>
      })}
      </div>
      <div className='formdiv'>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          required
          value={username}
          placeholder={"Username"}
        ></input>
      </div>
      <div className='formdiv'>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          placeholder={"Email"}
          required

        ></input>
      </div>
      <div className='formdiv'>
        <input
          type='text'
          name='firstName'
          // onChange={updateEmail}
          // value={email}
          placeholder={"First Name"}

        ></input>
      </div>
      <div className='formdiv'>
        <input
          type='text'
          name='lastName'
          // onChange={updateEmail}
          // value={email}
          placeholder={"Last Name"}

        ></input>
      </div>
      <div className='formdiv'>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          placeholder={"Password"}
          required
        ></input>
      </div>
      <div className='formdiv'>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          placeholder={"Confirm Password"}

        />
      </div>
      <div className='formdiv'>
      <button className="button-white" type='submit'>Sign Up</button>
      </div>
    </form>
    <div className='formdiv'>
    <Link to="/login"><h4> Login here</h4></Link>
    </div>
    </div>
    </div>
  );
};

export default SignUpForm;
