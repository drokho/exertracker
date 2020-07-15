import React, { Component } from 'react';
import axios from 'axios';
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { config } from '../config';

const User = props => {
    return (
        <li>
            
            <span className="user-delete">
                <a href="#" onClick={ () => {props.deleteUser(props.user._id)} } > <FontAwesomeIcon icon={faTrashAlt} /></a>    
            </span> 
            <span className="user-name">{props.user.username}</span>
        </li>
    )
}

export default class ManageUsers extends Component {

    

    constructor(props) {
        super(props);

            
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeExistingUser = this.onChangeExistingUser.bind(this);
        this.onAddUser = this.onAddUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.userList = this.userList.bind(this);
        //this.getUsers = this.getUsers.bind(this);
            
        this.state = {
            users: [],
            username: ''
        }

    }

    componentDidMount() {
        this.getUsers()
    }

    getUsers() {
        axios.get(config.url.API_URL + '/users/')
            .then(response => {
                if(response.data.length > 0) {
                    this.setState({
                        users: response.data, 
                        existingUser: response.data[0].username
                    });
                }
            })
            .catch((error) => {
                console.log(error);
        })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeExistingUser(e) {

        e.persist();

        this.setState({
            existingUser: e.target.value,
            existingUserId: e.target[e.target.selectedIndex].id
        });

        console.log(e.target[e.target.selectedIndex].id)

    }

    onAddUser(e) {
        e.preventDefault();
        const newUser = {
            username: this.state.username,
        }

        console.log(newUser);
        axios.post(config.url.API_URL + '/users/add', newUser)
            .then((res) => {
                console.log(res.data);
                this.setState({ userAdded: true});
                this.getUsers();
            });

        
    }

    deleteUser(id) {
        axios.delete(config.url.API_URL + '/users/' + id)
            .then((res) => {
                console.log(res.data);
                this.setState({userDeleted: true});
                this.getUsers();
            });
    }

    userList() {

        return this.state.users.map(currentUser => {
            return <User user={currentUser} deleteUser={this.deleteUser} key={currentUser._id} />
        })
    }



    render() {
        return (
            <div className="container">
                <h1>Manage Users</h1>
                <div>
                
                    <form onSubmit={this.onAddUser}>
                        <h2>Add a user</h2>
                        <div className="form-group">
                        <label>Username: </label>
                        <input  type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            />
                        </div>
                        
                        <div className="form-group">
                            <input type="submit" value="Create User" className="btn btn-primary" />
                        </div>
                    </form>
                    <div>
                        { this.state.userAdded ? 
                            <p>{this.state.username} added as a user! Start Logging Exercises!</p> 
                            : <p></p> 
                        } 
                    </div>

                    <h2>Existing Users</h2>
                    <ul className="user-list">
                        { this.userList() }
                    </ul>
                </div>
                
            </div>

        )
    }
}