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



export default class AllocateSubject extends Component {

    constructor(props) {
        super(props);

        this.state = {
            teachers: [],
            subjects: [],
            selectedTeacherId: null,
            selectedSubject: '',
            classrooms : []
        }

        this.selectTeacher = this.selectTeacher.bind(this);
        this.allocateSubjects = this.allocateSubjects.bind(this);
        this.addSubject = this.addSubject.bind(this);
        this.selectSubject = this.selectSubject.bind(this);
        this.deallocateSubjects = this.deallocateSubjects.bind(this);
        this.updateTeacher = this.updateTeacher.bind(this);

    }

    updateTeacher = () => {
        const {teachers, selectedTeacherId} = this.state;

        let payload = teachers.find((elements) => elements._id === selectedTeacherId)

        axios.put(`http://localhost:5000/teacher/${selectedTeacherId}`, payload)
        .then(res => {
               console.log('  res.data: ',   res.data);
        })
        .catch((err) => {
            console.log('err',err)
        })
    }

    componentDidMount() {
        const { teachers, subjects } = this.state;

        axios.get('http://localhost:5000/teacher')
            .then(res => {
                this.setState({
                    teachers: res.data
                })
            })

        axios.get(GET_ALL_SUBJECTS)
            .then(res => {
                this.setState({
                    subjects: res.data.listSubjects
                })
            })

            axios.get(GET_ALL_CLASSROOMS)
            .then(res => {
                this.setState({
                    classrooms: res.data.listClassrooms
                })
            })
    }

    componentDidUpdate() {
        const { teachers, subjects } = this.state;
    }

    selectTeacher = (e) => {
        this.setState({
            selectedTeacherId: e
        })

    }

    selectSubject = (e) => {
        console.log('e: ', e);
        this.setState({
            selectedSubject: e
        })
    }

    addSubject = () => {
        const { selectedTeacherId, teachers, selectedSubject, classrooms } = this.state;
        
        let selectedClassrooms;

        teachers.map((item,index) => {
            if(item._id === selectedTeacherId){
                selectedClassrooms = item.classRooms
            }
        })

        let intersection = []
        teachers.map((item,index) => {
            
            if(item.subjects.includes(selectedSubject) && selectedClassrooms){
                intersection.push(item.classRooms.filter(elem => selectedClassrooms.includes(elem)))
                
                if(intersection.length < 2) alert(`this subject is already assigned to another teacher to teach in same class`);
                
            }
        })

        teachers.map((item, index) => {
            if (item._id === selectedTeacherId && selectedSubject != '' && intersection.length === 0) {
                
                if (!item.subjects.includes(selectedSubject)) {
                    item.subjects.push(selectedSubject)
                }
            }
        })

        this.setState({
            teachers
        })
    }

    allocateSubjects = (subject) => {
    }

    deallocateSubjects(indexNo) {
        const { selectedTeacherId, teachers, selectedSubject } = this.state;
        teachers.map((item, index) => {
            if (item._id === selectedTeacherId) {
                item.subjects.splice(indexNo, 1)
            }
        })

        this.setState({
            teachers
        })
        console.log('deallocateSubjects teachers: ', teachers);
    }

    render() {
        const { teachers, subjects, selectedTeacherId } = this.state;
        let teachersSubjects = teachers.filter((item) => item._id === selectedTeacherId)
        console.log('teachersSubjects: ', teachersSubjects);

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
                                        <label style={{ fontSize: "25px" }}>Subject</label>
                                    </Col>
                                    <Col>
                                        <Dropdown onSelect={this.selectSubject}>
                                            <Dropdown.Toggle variant="secondary">
                                                Select a Subject
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu variant="dark">
                                                {
                                                    subjects.map((item, index) => {
                                                        return <Dropdown.Item key={index} eventKey={item._id} > {item.subjectName} </Dropdown.Item>
                                                    })
                                                }
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Col>
                                    <Col>
                                        <Button variant="secondary" onClick={this.addSubject}>Allocate</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Container>
                        <Table bordered style={{ "margin-top": "20px" }}>
                            <thead>
                                <tr>
                                    <th>
                                        Subject
                                    </th>
                                    <th>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    teachersSubjects[0] ?
                                        teachersSubjects[0].subjects.map((item, index) => {

                                            let subName = subjects.find(e => e._id === item)

                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        {subName.subjectName} 
                                                    </td>
                                                    <td>
                                                        <Button variant="secondary" onClick={() => this.deallocateSubjects(index)}>Deallocate</Button>
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
