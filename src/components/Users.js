import './css/Users.css';
import Card from './Card';
import { Link } from 'react-router-dom';
// import './css/UserItem.css';
import { useNavigate } from 'react-router-dom';

function Users(props) {
  const navigate = useNavigate();

  function handleDeleteUser(userid) {
    props.onDeleteUser(userid);

    navigate('/');
  }

  return (
    <div className="users">
      {props.users.map((user) => (
        <Card className="user-item__content">
          <div className="user-item__image">
          <img src={user.image} alt={user.name} />
          </div>
        <div className="user-item__info">
         <Link to={`/view-user/${user.id}`} className="linkinfo">
          <h2>{user.name}</h2>
         </Link>
         {props.login ? (
          <div>
         <button className="editbuttonsUI" type="button" onClick={() => handleDeleteUser(user.id)}>Delete Team</button>
         <Link to={`/edit-user/${user.id}`} className="linkinfo">
          <button className="editbuttonsUI" type="button">Edit Team</button>
          </Link>
          </div>
        ) : (
          <div></div>)}
        </div>
      </Card>
      ))}
    </div>
  );
}

export default Users;