import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Navbar";
import CreateExercise from "./components/CreateExercise";
import CreateUser from "./components/CreateUser";
import EditExercise from "./components/EditExercise";
import ExerciseList from "./components/ExerciseList"; 
import UserList from "./components/UserList";

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
          <Route path= "/users" exact component={UserList}/>
        </div>

    </Router>
  );
}

export default App;
