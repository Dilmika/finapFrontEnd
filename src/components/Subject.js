import React, { Component } from 'react'
import axios from 'axios';
import { ADD_SUBJECT } from '../config/config';
export default class Subject extends Component {
  constructor(props){
    super(props);

    this.state = {
        subjectName : '',
            }

    this.changeSubjectName = this.changeSubjectName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

}

onSubmit(e){
  e.preventDefault();
  const {subjectName} = this.state;

  let payload = {
    subjectName : subjectName
  }

  axios.post(ADD_SUBJECT, payload)
  .then(res => {
      alert(`Subject sucessfully added`)
  })
  .catch((err) => {
      console.log('err', err)
  })

}

changeSubjectName(e){
  e.preventDefault();
  this.setState({
    subjectName : e.target.value
  })
}


  render() {
    return (
      <div style={{
        marginTop:"10%",
        marginLeft:"10%",
        marginRight:"10%",
        marginBottom:"10%"
    }}>
        <form onSubmit={this.onSubmit}>
          <h1>Subject Interface</h1>
            <div className="form-group ">
                <label>Subject Name</label>
                <input type={'text'} required="true" className="form-control input_space"   placeholder="Subject Name" onChange={this.changeSubjectName}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
    )
  }
}
