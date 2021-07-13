import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (

  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.exercise._id} color="white">edit</Link> |
                <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }} > delete</a> {/*the " _id " is the field from mongodb.*/}
    </td>
  </tr>
);

class ExerciseList extends Component {

  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = { exercises: [] };

  }

  componentDidMount() {//-------------------------------------- runs before the component is rendered
    axios.get('http://localhost:5000/exercises/')
      .then(response => {
        this.setState({
          exercises: response.data
        })
      })
      .catch(error => { console.log(error) });
  }


  /* -------------FUNCTION TO DISPLAY EACH EXERCISE----------------------------*/
  exerciseList() {
    return this.state.exercises.map(currentexercise => {

      return <Exercise
        exercise={currentexercise}
        deleteExercise={this.deleteExercise}
        key={currentexercise._id}
      />
    })
  }

  deleteExercise(id) {
    axios.delete('http://localhost:5000/exercises/' + id)
      .then(response => console.log(response.data));

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id) //---- If the id of the exercise is not the one that has been deleted, it is passed back to the state.
    })
  }

  render() {
    return (
      <div>
        <h3>Exercise List</h3>
        <table className="table table-light table-striped table-borderless table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration (min)</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.exerciseList()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ExerciseList;