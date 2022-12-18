import React, { Component } from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { } from 'reactstrap';
import axios from 'axios';
import { GET_ALL_SUBJECTS,GET_ALL_CLASSROOMS } from '../config/config';


export default class AllocateClassroom extends Component {

    constructor(props) {
        super(props);

        this.state = {
            teachers: [],
            classroom: [],
            selectedTeacherId: null,
            selectedClassroom: '',
            subjects: []
        }

        this.selectTeacher = this.selectTeacher.bind(this);
        this.allocateSubjects = this.allocateSubjects.bind(this);
        this.addClassroom = this.addClassroom.bind(this);
        this.selectClassroom = this.selectClassroom.bind(this);
        this.deallocateClassrooms = this.deallocateClassrooms.bind(this);
        this.updateTeacher = this.updateTeacher.bind(this);



    }

    componentDidMount() {
        const { teachers, classroom } = this.state;

        // axios.get('http://localhost:5000/teacher')
        //     .then(res => {
        //         this.setState({
        //             teachers: res.data
        //         })
        //     })

        axios.get(GET_ALL_CLASSROOMS)
            .then(res => {
                this.setState({
                    classroom: res.data.listClassrooms
                })
            })
            
        axios.get(GET_ALL_SUBJECTS)
            .then(res => {
                this.setState({
                    subjects: res.data.listSubjects
                })
            })
    }

    componentDidUpdate() {
        const { teachers, classroom } = this.state;
    }

    selectTeacher = (e) => {
        this.setState({
            selectedTeacherId: e
        })

    }

    selectClassroom = (e) => {
        this.setState({
            selectedClassroom: e
        })
    }

    updateTeacher = () => {
        const { teachers, selectedTeacherId } = this.state;

        let payload = teachers.find((elements) => elements._id === selectedTeacherId)

        axios.put(`http://localhost:5000/teacher/${selectedTeacherId}`, payload)
            .then(res => {
                console.log('  res.data: ', res.data);
            })
            .catch((err) => {
                console.log('err', err)
            })
    }

    addClassroom = () => {
        const { selectedTeacherId, teachers, selectedClassroom, subjects } = this.state;

        let selectedTeacherSubjects;
        teachers.map((item, index) => {
            if (item._id === selectedTeacherId) {
                selectedTeacherSubjects = item.subjects
            }
        })

        let intersection = []
        teachers.map((item, index) => {

            if (item.classRooms.includes(selectedClassroom) && selectedTeacherSubjects) {
                intersection.push(item.subjects.filter(elem => selectedTeacherSubjects.includes(elem)))

                if (intersection.length < 2) alert(`${intersection.length} same subjects are taught by another tutor for same class`);

            }
        })

        teachers.map((item, index) => {
            if (item._id === selectedTeacherId && selectedClassroom != '' && intersection.length === 0) {

                if (!item.classRooms.includes(selectedClassroom)) {
                    item.classRooms.push(selectedClassroom)
                }
            }
        })

        this.setState({
            teachers
        })
    }

    allocateSubjects = (subject) => {
    }

    deallocateClassrooms(indexNo) {
        const { selectedTeacherId, teachers, selectedClassroom } = this.state;
        teachers.map((item, index) => {
            if (item._id === selectedTeacherId) {
                item.classRooms.splice(indexNo, 1)
            }
        })

        this.setState({
            teachers
        })
    }

    render() {
        const { teachers, classroom, selectedTeacherId } = this.state;
        let teachersSubjects = teachers.filter((item) => item._id === selectedTeacherId)

        return (
            <div style={{ "margin": "20px" }}>
                <div className="card">
                    <div className="card-body">
                        <Container>
                            <Form>
                                <Row xs={2} md={4} lg={6}>
                                    <Col>
                                        <label style={{ fontSize: "25px" }}>Teacher</label>
                                    </Col>
                                    <Col>
                                        <Dropdown onSelect={this.selectTeacher}>
                                            <Dropdown.Toggle variant="secondary">
                                                Select a Teacher
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu variant="dark">
                                                {
                                                    teachers.map((item, index) => {
                                                        return <Dropdown.Item eventKey={item._id} key={index}> {item.firstName} </Dropdown.Item>
                                                    })
                                                }
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Col>
                                    <Col>
                                        <Button variant="secondary" onClick={this.updateTeacher}>Save</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Container>

                    </div>
                </div>

                <div className="card" style={{ "margin-top": "20px" }}>
                    <div className="card-body">
                        <Container>
                            <Form>
                                <Row xs={2} md={4} lg={6}>
                                    <Col>
                                        <label style={{ fontSize: "25px" }}>Classroom</label>
                                    </Col>
                                    <Col>
                                        <Dropdown onSelect={this.selectClassroom}>
                                            <Dropdown.Toggle variant="secondary">
                                                Select a Classroom
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu variant="dark">
                                                {
                                                    classroom.map((item, index) => {
                                                        return <Dropdown.Item key={index} eventKey={item._id} > {item.classroomName} </Dropdown.Item>
                                                    })
                                                }
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Col>
                                    <Col>
                                        <Button variant="secondary" onClick={this.addClassroom}>Allocate</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Container>
                        <Table bordered style={{ "margin-top": "20px" }}>
                            <thead>
                                <tr>
                                    <th>
                                        Classrooms
                                    </th>
                                    <th>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    teachersSubjects[0] ?
                                        teachersSubjects[0].classRooms.map((item, index) => {

                                            let clsName = classroom.find(e => e._id === item)

                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        {clsName.classroomName}
                                                    </td>
                                                    <td>
                                                        <Button variant="secondary" onClick={() => this.deallocateClassrooms(index)}>Deallocate</Button>
                                                    </td>
                                                </tr>
                                            )
                                        }) : null
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>


            </div>
        )
    }
}
