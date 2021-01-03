import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Navbar";
import CreateExercise from "./components/CreateExercise";
import CreateUser from "./components/CreateUser";
import EditExercise from "./components/EditExercise";
import ExerciseList from "./components/ExerciseList"; 
import Users from "./components/Users";

function App() {
  return (
    <Router>
        <div className="container">
          <NavBar />
          <br/>
          <Route path="/" exact component={ExerciseList}/>
          <Route path="/edit/:id" exact component={EditExercise}/>
          <Route path="/create" exact component={CreateExercise}/>
          <Route path="/user" exact component={CreateUser}/>
          <Route path= "/users" exact component={Users}/>
        </div>

    </Router>
  );
}

export default App;
