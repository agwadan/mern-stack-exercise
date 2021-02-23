import React, { Component } from 'react';
import axios from 'axios';

class CreateUser extends Component {

  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordTwo = this.onChangePasswordTwo.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      email: '',
      password: '',
      passwordTwo: '',
      image: null
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
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

  onChangeImage(e) {
    this.setState({
      image: e.target.files
    })
  }

  onSubmit(e) {
    e.preventDefault(); //--------------------- Prevents the forms from being handled the default way html does it.

    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.passwordTwo,
      //image: this.state.image
    }
    console.log(user);
    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data));

    this.setState({ //------------------------- Resetting the username to nothing after the submission has been done.
      username: '',
      email: '',
      password: '',
      passwordTwo: '',
      image: null
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
              onChange={this.onChangeUsername}
            />
          </div>

          <div className=" form-group">
            <label>Email </label>
            <input
              type='text'
              required
              className='form-control'
              value={this.state.email}
              onChange={this.onChangeEmail}
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

          {/*  <div className='form-group'>
            <label>Upload Profile Picture <br /></label>
            <input type='file' name='photo' onChange={this.onChangeImage} />
          </div> */}

          <div className='form-group'>
            <input type='submit' value='Create User' className='btn btn-primary' />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateUser;