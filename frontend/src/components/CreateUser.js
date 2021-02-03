import React, { Component } from 'react';
import axios from 'axios';

class CreateUser extends Component {

  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordTwo = this.onChangePasswordTwo.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      password: '',
      passwordTwo: ''
    }
  }

  onChangeValue(name, e) {
    this.setState({
      name: e.value.target
    })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }
  onChangePasswordTwo(e) {
    this.setState({
      passwordTwo: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault(); //--------------------- Prevents the forms from being handled the default way html does it.

    const user = {
      username: this.state.username,
      password: this.state.passwordTwo
    }
    console.log(user);
    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data));

    this.setState({ //------------------------- Resetting the username to nothing after the submission has been done.
      username: '',
      password: ''
    })

    console.log(user);
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className=" form-group">
            <label>Username </label>
            <input
              type='text'
              required
              className='form-control'
              value={this.state.username}
              onChange={this.onChangeValue}
            />
          </div>

          <div className='form-group'>
            <label>Password </label>
            <input
              type='password'
              required
              className='form-control'
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>

          <div className='form-group'>
            <label>Confirm Password </label>
            <input
              type='password'
              required
              className='form-control'
              value={this.state.passwordTwo}
              onChange={this.onChangePasswordTwo}
            />
          </div>

          <div className='form-group'>
            <label>Upload Profile Picture</label>
            <input type='file' name='photo' />
          </div>

          <div className='form-group'>
            <input type='submit' value='Create User' className='btn btn-primary' />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateUser;