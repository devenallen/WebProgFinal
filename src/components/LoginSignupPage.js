import { useState } from 'react';
import Card from './Card';
import './css/LoginSignupPage.css';
import { useNavigate } from 'react-router-dom';

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

  const handleLoginClick = (event) => {
    const buttonClicked = event.target.name;
    console.log(`Button ${buttonClicked} was clicked`);
    if (buttonClicked === 'login' || buttonClicked === 'signup') {
      if (username  === 'myusername' && password === 'mypassword') {
        props.setLogin();
        navigate('/');
      } else {
        alert('Invalid username or password');
      }
    } else if (buttonClicked === 'useAsGuest') {
      navigate('/');
    } 
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // perform login or signup logic here
  };

  return (
    <div>
      <Card className="login-signup">
        <h1>User Login Page</h1>
         <form onSubmit={handleSubmit}>
            <div className="form-field">
                {/* <label htmlFor="username">Username:</label> */}
                <input
                    id="username"
                    type="text"
                    placeholder= "Username"
                    value={username}
                    onChange={handleUsernameChange}
                />
            </div>
            <div className="form-field">
                {/* <label htmlFor="password">Password:</label> */}
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