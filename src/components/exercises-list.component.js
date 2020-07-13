import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Exercise = props => {
    return (
        <tr>
            <td>{props.exercise.username}</td>
            <td>{props.exercise.description}</td>
            <td>{props.exercise.duration}</td>
            <td>{props.exercise.date.substring(0, 10)}</td>
            <td>
                <Link to={"/edit/" + props.exercise._id}><FontAwesomeIcon icon={faPencilAlt} /> </Link> 
                | 
                <a href="#" onClick={ () => {props.deleteExercise(props.exercise._id)} } > <FontAwesomeIcon icon={faTrashAlt} /></a>
            </td>
        </tr>
    )
}

export default class ExercisesList extends Component {

    constructor(props) {

        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {
            exercises: [] 
        }
    }

    componentDidMount() {
        axios.get('https://exertracker-1.tgx.repl.co/exercises')
            .then(response => {
                this.setState({
                    exercises: response.data
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/' + id)
            .then(res => console.log(res.data));

        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        });
    }

    exerciseList() {
        return this.state.exercises.map(currentExercise => {
            return <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id} />;
        })
    }

    render() {
        return (
            <div className="container">
                <h1>Logged Exercises</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration<br></br>(minutes)</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table>
            </div>
        )
    }
}