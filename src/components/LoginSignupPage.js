import { useState } from 'react';
import Card from './Card';
import './css/LoginSignupPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginSignupPage(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  async function handleLoginClick(event) {
    const buttonClicked = event.target.name;
    console.log(`Button ${buttonClicked} was clicked`);
    if (buttonClicked === 'login') {
      try {
        const loginUser = { username, password };
        const loginRes = await axios.post('http://localhost:5000/api/users/login', loginUser);
        // props.setUserData( {
        //   token: loginRes.data.token,
        //   user: loginRes.data.user,
        // });

        localStorage.setItem('auth-token', loginRes.data.token);
        /* set logged in to true*/
        props.setLogin(true);
        navigate('/');
      } catch (err) {
        alert("Username or password is incorrect");
        console.log(err.response.data.msg);
      }
    } else if (buttonClicked === 'signup') {
      try {
        const newUser =  { username, password };
        await axios.post('http://localhost:5000/api/users/signup', newUser);
        const loginRes = await axios.post('http://localhost:5000/api/users/login', {
          username,
          password,
        });
        localStorage.setItem('auth-token', loginRes.data.token);
        props.setLogin(true);
        navigate('/');
    
      } catch (err) {
        alert("Username already exists");
        console.log(err.response.data.msg);
      }
      
    } else if (buttonClicked === 'useAsGuest') {
      props.setLogin(false);
      navigate('/');
    } 
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Card className="login-signup">
        <h1>User Login Page</h1>
         <form onSubmit={handleSubmit}>
            <div className="form-field">
                {}
                <input
                    id="username"
                    type="text"
                    placeholder= "Username"
                    value={username}
                    onChange={handleUsernameChange}
                />
            </div>
            <div className="form-field">
                {}
                <input
                    id="password"
                    type="password"
                    placeholder= "Password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <div className="">
              <div className="button-field">
                <button className="pagebutton" name="useAsGuest" onClick={handleLoginClick}>Use as Guest</button>
                <button className="pagebutton" name="login" onClick={handleLoginClick}>Login</button>
                <button className="pagebutton" name="signup" onClick={handleLoginClick}>Signup</button>
            </div>

            </div>
          </form> 
      </Card>
    </div>

  );
}

export default LoginSignupPage;