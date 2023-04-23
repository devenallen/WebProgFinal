import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignupPage from "./components/LoginSignupPage";
import CreateItem from "./components/CreateItem";
import Homepage from "./components/Homepage";
import EditItem from "./components/EditItem";
import ViewItem from "./components/ViewItem";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([
    // {
    // // assign a random id number to each team
    // id: Math.floor(Math.random() +1),
    // name: 'Hawks',
    // image: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/24/Atlanta_Hawks_logo.svg/640px-Atlanta_Hawks_logo.svg.png',
    // captain: 'John',
    // numPlayers: 5,
    // },
    // {
    // id: Math.floor(Math.random() +1),
    // name: 'Bucks',
    // image: 'https://dq7axd795mydj.cloudfront.net/bots/bucks/assets/avatar-bg-transparent.png',
    // captain: 'Joe',
    // numPlayers: 6,
    // },
    // {
    // id: Math.floor(Math.random() +1),
    // name: 'Lakers',
    // image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/1200px-Los_Angeles_Lakers_logo.svg.png',
    // captain: 'Bob',
    // numPlayers: 5,
    // },
    // {
    // id: Math.floor(Math.random() +1),
    // name: 'Heat',
    // image: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fb/Miami_Heat_logo.svg/640px-Miami_Heat_logo.svg.png',
    // captain: 'Sue',
    // numPlayers: 7,
    // },
    // {
    // id: Math.floor(Math.random() +1),
    // name: 'Warriors',
    // image: 'https://images.ctfassets.net/a4rx79jcl3n1/139uoz1HBz6PsWh8pEqOCK/eced155325ccb92acf76962ca5d688e5/gsw-logo-1920.png',
    // captain: 'Sally',
    // numPlayers: 8,
    // },
    // {
    // id: Math.floor(Math.random() +1),
    // name: 'Celtics',
    // image: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/Boston_Celtics.svg/800px-Boston_Celtics.svg.png',
    // captain: 'Tom',
    // numPlayers: 6,
    // },
]);

  const handleLogin = () => {
    if (isLoggedIn === false) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
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
          <Route path="/login-signup" element={<LoginSignupPage setLogin = {handleLogin}/>} />
          <Route path="/create-item" element={<CreateItem handleCreateTeam = {handleCreateTeam}/>} />
          <Route path="/edit-user/:id" element={<EditItem handleEditTeam = {handleEditTeam} users = {users} login = {isLoggedIn}/>} />
          <Route path="/view-user/:id" element={<ViewItem users = {users} />} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;