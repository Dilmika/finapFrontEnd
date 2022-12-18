import React, { Component } from 'react'
import { Button, Row, Col, Card, CardTitle, CardText } from 'reactstrap';

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
    }

    this.navigator = this.navigator.bind(this);

  }

  navigator(path) {

    window.location.assign(`/${path}`)

  }

  render() {
    return (
      <div style={{"margin" : "40px"}}>

        {/* <div>
          <h1>
            This is FINAP HOMEPAGE
          </h1>
          <button type="button" className="btn btn-primary" onClick={() => this.navigator("Student")}>Student</button>
          <button type="button" className="btn btn-secondary" onClick={() => this.navigator("Teacher")}>Teacher</button>
          <button type="button" className="btn btn-success" onClick={() => this.navigator("Classroom")}>Classroom</button>
          <button type="button" className="btn btn-danger" onClick={() => this.navigator("Subject")}>Subject</button>

        </div> */}

        <Row style={{"margin" : "10px"}}>
          <Col sm="6">
            <Card body>
              <CardTitle tag="h5">
                Allocate Classroom to Teacher Interface
              </CardTitle>
              
              <Button onClick={() => this.navigator("AllocateClassroom")}>
                Allocate Classroom
              </Button>
            </Card>
          </Col>
          <Col sm="6">
            <Card body>
              <CardTitle tag="h5">
              Allocate Subject to Teacher Interface
              </CardTitle>
              
              <Button onClick={() => this.navigator("AllocateSubjects")}>
              Allocate Subject
              </Button>
            </Card>
          </Col>
        </Row>

        <Row style={{"margin" : "10px"}}>
          <Col sm="6">
            <Card body>
              <CardTitle tag="h5">
              Add Subject Interface
              </CardTitle>
              
              <Button onClick={() => this.navigator("Subject")}>
              Add Subject
              </Button>
            </Card>
          </Col>
          <Col sm="6">
            <Card body>
              <CardTitle tag="h5">
                Student Detail Report Interface
              </CardTitle>
              
              <Button onClick={() => this.navigator("StudentDetail")}>
              Student Detail Report
              </Button>
            </Card>
          </Col>
        </Row>

        <Row style={{"margin" : "10px"}}>
          <Col sm="6">
            <Card body>
              <CardTitle tag="h5">
                Add Teacher Interface
              </CardTitle>
              
              <Button onClick={() => this.navigator("Teacher")}>
                Add Teacher
              </Button>
            </Card>
          </Col>
          <Col sm="6">
            <Card body>
              <CardTitle tag="h5">
              Add Student Interface
              </CardTitle>
              
              <Button onClick={() => this.navigator("Student")}>
                Add Student
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
