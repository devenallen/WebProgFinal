import { useState } from 'react';
import Card from './Card';
import './css/CreateItem.css';
import { useNavigate } from 'react-router-dom';

function CreateItem(props) {
  const navigate = useNavigate();
  const [teamname, setTeamname] = useState('');
  const [numPlayers, setNumPlayers] = useState('');
  const [captain, setCaptain] = useState('');
  const [logo, setLogo] = useState('');

  const handleTeamnameChange = (event) => {
    setTeamname(event.target.value);
  };

  const handleNumPlayersChange = (event) => {
    setNumPlayers(event.target.value);
  };

  const handleCaptainChange = (event) => {
    setCaptain(event.target.value);
  };

  const handleLogoChange = (event) => {
    setLogo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

        const newTeam = {
             id: numPlayers + teamname,
             name: teamname,
             numPlayers: numPlayers,
             captain: captain,
             image: logo
        };

        props.handleCreateTeam(newTeam);
        navigate('/');
  };

  return (
    <div>
      <h1>Create New Team</h1>
    <Card className="create-team">
       <form className="overallform" onSubmit={handleSubmit}>
          <div className="createform">
              <label htmlFor="teamname">Team name: </label>
              <input
                  id="teamname"
                  type="teamname"
                  value={teamname}
                  onChange={handleTeamnameChange}
              />
          </div>
          <div className="createform">
              <label htmlFor="numplayers">Number of Players: </label>
              <input
                  id="numplayers"
                  type="numplayers"
                  placeholder= ""
                  value={numPlayers}
                  onChange={handleNumPlayersChange}
              />
          </div>
          <div className="createform">
              <label htmlFor="captain">Team Captain: </label>
              <input
                  id="captain"
                  type="captain"
                  placeholder= ""
                  value={captain}
                  onChange={handleCaptainChange}
              />
          </div>
          <div className="createform">
              <label htmlFor="logo">Logo: </label>
              <input
                  id="logo"
                  type="logo"
                  placeholder= ""
                  value={logo}
                  onChange={handleLogoChange}
              />
          </div>
          <div className="createform">
            <label htmlFor="logoPreview">Logo Preview: </label>
            {logo && (
              <img
                id="logoPreview"
                src={logo}
                alt="Logo Preview"
                width="150"
                height="150"
              />
            )}
          </div>
          <div className="button">
              <button onClick={handleSubmit} className="createbutton" type="button">Create Team</button>

          </div>
        </form> 
    </Card>
  </div>
  );
}

export default CreateItem;