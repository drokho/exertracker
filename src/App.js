import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Navbar from './components/navbar.component';
import ExercisesList from './components/exercises-list.component';
import EditExercise from './components/edit-exercise.component';
import CreateExercise from './components/create-exercise.component';
import ManageUsers from './components/manage-users.component';
import Footer from './components/footer';

//import "bootstrap/dist/css/bootstrap.min.css";
import './styles.css';


 
function App() {
    return (
        <Router>
            <div className="page">
                <Navbar />
                <Route path="/" exact component={ExercisesList} />
                <Route path="/edit/:id" component={EditExercise} />
                <Route path="/create" component={CreateExercise} />
                <Route path="/user" component={ManageUsers} />
            </div>
            <Footer />
        </Router>
    );
}
 
export default App;
