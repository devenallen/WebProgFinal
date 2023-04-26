import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignupPage from "./components/LoginSignupPage";
import CreateItem from "./components/CreateItem";
import Homepage from "./components/Homepage";
import EditItem from "./components/EditItem";
import ViewItem from "./components/ViewItem";
import axios from 'axios';
import { useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/teams')
      .then((res) => res.json())
      .then((data) => setUsers(data.teams))
      .catch((err) => console.log(err));


    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
        setIsLoggedIn(false);
      }
      const tokenRes = await axios.post('http://localhost:5000/api/users/tokenIsValid', null, {
        headers: { 'x-auth-token': token }
      });
      if (tokenRes.data) {
        console.log(tokenRes.data);
      }
    };
    checkLoggedIn();
  }, []);

  const handleLogin = (value) => {
    setIsLoggedIn(value);
  };

  const handleCreateTeam = (newTeam) => {
    fetch('http://localhost:5000/api/teams/create-team', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTeam),
      })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    setUsers((users) => [...users, newTeam]);
  };

  function handleDeleteUser(userid) {
    fetch('http://localhost:5000/api/teams/delete-team/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: `${userid}`}),
      })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    setUsers(users.filter(user => user.id !== userid));
  }

  function handleEditTeam(editTeam) {
    fetch('http://localhost:5000/api/teams/edit-team/:id', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(editTeam),
      })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    const newTeamList = users.map((user) => {
      if (user.id === editTeam.id) {
        return editTeam;
      } else {
        return user;
      }
    });
    setUsers(newTeamList);
  }

  return (
    <Router>
      <div className="App">
          <Routes>
            <Route path="/" element={<Homepage login = {isLoggedIn} setLogin = {handleLogin} users = {users} handleDeleteUser = {handleDeleteUser} handleEditTeam = {handleEditTeam}/>} />
            <Route path="/login-signup" element={<LoginSignupPage setLogin = {handleLogin} />} />
            <Route path="/create-item" element={<CreateItem handleCreateTeam = {handleCreateTeam}/>} />
            <Route path="/edit-user/:id" element={<EditItem handleEditTeam = {handleEditTeam} users = {users} login = {isLoggedIn}/>} />
            <Route path="/view-user/:id" element={<ViewItem users = {users} />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;