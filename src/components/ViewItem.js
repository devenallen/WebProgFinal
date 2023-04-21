import './css/ViewItem.css';
import Card from './Card';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function ViewItem() {
    
    const { name, captain, numPlayers } = useParams();
    const image = new URLSearchParams(window.location.search).get('image');

    return (
      <div>
        <h1>{name}</h1>
      <Card className="create-team">
          <h2> Teamname: {name}</h2>
          <h2> Number of Players: {numPlayers} </h2>
          <h2> Team Captain: {captain} </h2>
          <h2> Logo : </h2>
          <img src={image} alt="logo" />
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