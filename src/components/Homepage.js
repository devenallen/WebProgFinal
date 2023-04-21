import './css/Homepage.css';
import Users from './Users';
import { Link } from "react-router-dom";

function Homepage(props) {
    
    const handleSignOut = (event) => {
        props.setLogin();
    }

    const handleCreateTeam = props.handleCreateTeam;
    const handleDeleteUser = props.handleDeleteUser;

    return (
        <div>
            {props.login ? (
                <div>
                <Link to={{ pathname: "/create-item", state: { handleCreateTeam: {handleCreateTeam}} }}>
                <div className="button-container">
                    <button className="create-button">Create Team</button>
                </div>
                </Link>
            <div className="header">
                <div className="header-center">
                    <h1 className="header-title">Intramural League Builder</h1>
                </div>
                        <button className="header-button" onClick={handleSignOut}>Sign Out</button>
            </div>

            <Users users={props.users} login={true} onDeleteUser={handleDeleteUser}/>
        </div>
            ) : (
                <div>
                <div className="header">
                    <div className="header-center">
                        <h1 className="header-title">Intramural League Builder</h1>
                    </div>
                        <Link to="/login-signup">
                            <button className="header-button">Login</button>
                        </Link>
                </div>
    
                <Users users={props.users} login={false} onDeleteUser={handleDeleteUser}/>
            </div>
            )}
        </div>
    );
}

export default Homepage;