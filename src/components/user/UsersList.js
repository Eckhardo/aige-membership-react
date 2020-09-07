import React, {useEffect, useState} from 'react';

import {Link} from 'react-router-dom';
import UserService from '../../services/UserService';
import ReadUser from './ReadUser';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        console.log('retrieveUsers');
        retrieveUsers();
    }, []);

    const onChangeSearchUser = e => {
        const userName = e.target.value;
        setUserName(userName);
        console.log('userName:',userName);
    };

    const retrieveUsers = () => {
        UserService.getAll()
            .then(response => {
                setUsers(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveUsers();
        setCurrentUser(null);
        setCurrentIndex(-1);
        setUserName('');
    };

    const setActiveUser = (user, index) => {
        setCurrentUser(user);
        setCurrentIndex(index);
    };



    const findByUsername = () => {
        UserService.get(userName)
            .then(response => {
                console.log('findByUsername: ',response);
                setUsers([response.data]);

            })
            .catch(e => {
                console.log('findByUsername: ',e);
                console.log(e);
            });
    };



return (
    <div className="list row">

        <div className="col-md-8">
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by user name"
                    value={userName}
                    onChange={onChangeSearchUser}
                />
                <div className="input-group-append">
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={findByUsername}
                    >
                        Search
                    </button>
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={refreshList}
                    >
                        Clear
                    </button>
                </div>
            </div>
        </div>
        <div className="col-md-6">
            <h4>Users List</h4>

            <ul className="list-group">
                {users &&
                users.map((user, index) => (
                    <li
                        className={
                            "list-group-item " + (index === currentIndex ? "active" : "")
                        }
                        onClick={() => setActiveUser(user, index)}
                        key={index}
                    >
                        {user.first_name} {user.last_name}
                    </li>
                ))}
            </ul>
            <Link
                to={"/addUser/"}
                className="btn btn-warning m-2"
            >
                Add
            </Link>
        </div>
        <div className="col-md-6">

            {currentUser ? (
                    <ReadUser user={currentUser}/>

            ) : (
                <div>
                    <br />
                    <p>Please click on a User...</p>
                </div>
            )}
        </div>
    </div>
);
};
export default UsersList
