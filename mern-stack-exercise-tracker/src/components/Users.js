import Axios from 'axios';
import React, { Component } from 'react';
import axios from 'axios';

const User = props => (
  <tr>
    <td>{props.users.username}</td>
  </tr>
)

class Users extends Component {

  constructor(props) {
    super(props);
    this.state = { users: [] }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        this.setState({
          users: response.data
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  userList() {
    return (this.state.users.map((usr) => {
      return (
        <User users = {usr}
              key   ={usr._id}/>
      )
    }))
  }

  render() {
    return (
      <div>
        <h1>Users</h1>
        <table className="table table-light">
          <thead className="thead-dark">
            <tr>
              <th>
                Users' Name
              </th>
            </tr>
          </thead>
          <tbody>{this.userList()}</tbody>
        </table>
      </div>
    );
  }
}

export default Users;