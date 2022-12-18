import React, { Component } from 'react'
import axios from 'axios';

export default class Classroom extends Component {

  constructor(props){
    super(props);

    this.state = {
        classroomName : ''
            }

    this.changeClassName = this.changeClassName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

}

onSubmit(e){
  e.preventDefault();
  const {classroomName} = this.state;
  console.log('classroomName: ', classroomName);

  let payload = {
    classroomName
  }

  axios.post(`http://localhost:5000/classroom/add`, payload)
  .then(res => {
      alert(`Classroom ${res.data.classroomName} sucessfully added`)
  })
  .catch((err) => {
      console.log('err', err)
  })

}

changeClassName(e){
  e.preventDefault();
  this.setState({
    classroomName : e.target.value
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
          <h1>Classroom Interface</h1>
            <div className="form-group ">
                <label>Classroom Name</label>
                <input type={'text'} className="form-control input_space"   placeholder="Classroom Name" onChange={this.changeClassName}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
    )
  }
}
