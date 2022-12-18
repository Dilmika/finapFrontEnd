import React, { Component } from 'react'
import axios from 'axios';
import { ADD_TEACHER } from '../config/config';

export default class Teacher extends Component {

  constructor(props){
    super(props);

    this.state = {
        firstName : '',
        lastName : '',
        emailAddress : '',
        contactNo : '',
        subjects : [],
        classrooms: []
            }

    this.changeFirstName = this.changeFirstName.bind(this);
    this.changeLastName = this.changeLastName.bind(this);
    this.changeEmailAddress = this.changeEmailAddress.bind(this);
    this.changeContactNumber = this.changeContactNumber.bind(this); 
    this.onSubmit = this.onSubmit.bind(this); 

}

changeFirstName(e){
  e.preventDefault();
  this.setState({
      firstName : e.target.value
  })
}

changeLastName(e){
  e.preventDefault();
  this.setState({
      lastName : e.target.value
  })
}

changeEmailAddress(e){
  e.preventDefault();
  this.setState({
      emailAddress : e.target.value
  })
}

changeContactNumber(e){
  e.preventDefault();
  this.setState({
      contactNo : e.target.value
  })
}

onSubmit(e){
  e.preventDefault();
  console.log('onSubmit: executed');
  const {firstName, lastName, emailAddress,contactNo} = this.state;

  if(contactNo.toString().length !== 10){
    alert("Please add a valid Number");
  }else{
    let teacher = {
      firstName,
      lastName,
      emailAddress,
      contactNo : contactNo.toString(),
      subjects : "[]",
      classRooms: "[]"
    }
  
    axios.post(ADD_TEACHER, teacher)
    .then(res => {
        alert(`Teacher sucessfully added`)
    })
    .catch((err) => {
        console.log('err', err)
    })
  
  }  
}

  render() {
    return (
      <div style={{
        marginTop:"10%",
        marginLeft:"10%",
        marginRight:"10%",
        marginBottom:"10%"
    }}>
        <h1>Teacher Interface</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group ">
                        <label>First Name</label>
                        <input required="true" type={'text'} className="form-control input_space"   placeholder="First Name" onChange={this.changeFirstName}/>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Last Name</label>
                        <input required="true" type={'text'} className="form-control input_space"  placeholder="Last Name"  onChange={this.changeLastName} />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Contact No</label>
                        <input required="true" type={'number'} className="form-control input_space"   placeholder="Contact No" onChange={this.changeContactNumber}/>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input required="true" type={'email'} className="form-control input_space"   placeholder="Email Address" onChange={this.changeEmailAddress} />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
      </div>
    )
  }
}
