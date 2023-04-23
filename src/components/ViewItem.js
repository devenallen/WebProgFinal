import './css/ViewItem.css';
import Card from './Card';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function ViewItem(props) {
    
    // const { name, captain, numPlayers } = useParams();
    // const image = new URLSearchParams(window.location.search).get('image');
    const { id } = useParams();

  // Find the user with the matching id
  const user = props.users.find((u) => u.id === id);

    return (
      <div>

        <h1>{user.name}</h1>
      <Card className="create-team">
          <h2> Teamname: {user.name}</h2>
          <h2> Number of Players: {user.numPlayers} </h2>
          <h2> Team Captain: {user.captain} </h2>
          <h2> Logo : </h2>
          <img src={user.image} alt="logo" />
          <div className="editbutton">
              <Link to="/">
                <button className="editbuttons" type="button">Save</button>
               </Link>
            </div>
      </Card>
    </div>
    );
}

export default ViewItem;