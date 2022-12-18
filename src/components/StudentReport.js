import React, { Component } from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Label, FormGroup, Input } from 'reactstrap';
import axios from 'axios';
import { GET_ALL_CLASSROOMS, GET_ALL_STUDENTS, GET_ALL_SUBJECTS, GET_ALL_TEACHERS } from '../config/config';
export default class StudentReport extends Component {

    constructor(props) {
        super(props);

        this.state = {
            teachers: [],
            students: [],
            studentId: null,
            classrooms: [],
            subjects:[]
        }

        this.getStudentId = this.getStudentId.bind(this);

    }

    componentDidMount() {
        const { teachers, students } = this.state;

        axios.get(GET_ALL_TEACHERS)
            .then(res => {
                this.setState({
                    teachers: res.data.listTeachers
                })
            })

        axios.get(GET_ALL_STUDENTS)
            .then(res => {
                this.setState({
                    students: res.data.listStudents
                })
            })

        axios.get(GET_ALL_CLASSROOMS)
            .then(res => {
                this.setState({
                    classrooms: res.data.listClassrooms
                })
            })

            axios.get(GET_ALL_SUBJECTS)
            .then(res => {
                this.setState({
                    subjects: res.data.listSubjects
                })
            })

    }

    getStudentId(e) {
        console.log('e: ', e.target.value);
        e.preventDefault();
        this.setState({
            studentId: e.target.value
        })
    }

    render() {
        const { teachers, students, studentId, classrooms, subjects } = this.state;

        let selectedStudent = studentId ? students.filter((e) => e._id === studentId) : []
        let selectedClsroom = classrooms ? classrooms.filter((e) => e._id === (selectedStudent[0] ? selectedStudent[0].classRoom : null)) : null

        let subjectDetails = {}

        // console.log('teachers: ', teachers);
        // console.log('selectedClsroom[0] ? selectedClsroom[0]._id', selectedClsroom[0] ? selectedClsroom[0]._id : '');
        teachers.map((e) => {
            console.log('e: ', e.classRooms);
            if (e.classRooms.includes(selectedClsroom[0] ? selectedClsroom[0]._id : '')) {
                subjectDetails.teacher = `${e.firstName} ${e.lastName}`
            //     // e.subjects.map((sub) => 
            //     // subjectDetails.subject = sub
            //     // )
            //     console.log('`${e.firstName} ${e.lastName}`: ', `${e.firstName} ${e.lastName}`);

            //     e.subjects.map((sub) =>
            //         console.log('sub: ', sub)
            //     )


            }
            // console.log('e.classRooms.includes(selectedClsroom): ', e.classRooms.includes(selectedClsroom[0] ? selectedClsroom[0]._id : ''));
        })



        return (
            <div>
                <div style={{ "margin": "20px" }}>
                    <div className="card">
                        <div className="card-body">
                            <Container>
                                <Form>
                                    <FormGroup row>
                                        <Label
                                            for="exampleEmail2"
                                            sm={2}
                                        >
                                            Student
                                        </Label>
                                        <Col sm={4}>
                                            <select style={{
                                                "appearance": "none",
                                                "border": "0px none",
                                                " box-sizing": "border-box",
                                                "display": "block",
                                                "margin": "0px",
                                                "background": "rgb(255, 255, 255)",
                                                "padding": "6px 10px",
                                                "font-size": "13px",
                                                "position": "relative",
                                                "width": "100%",
                                                "color": "rgb(51, 51, 51)",
                                                "border-radius": "4px",
                                                "box-shadow": "rgb(0 0 0 / 10%) 0px 0px 0px 1px inset",
                                                "line-height": "20px"
                                            }}
                                                onChange={this.getStudentId}
                                            >
                                                {
                                                    students.map((elem, index) =>
                                                        <option key={index} value={elem._id}>{elem.firstName}</option>
                                                    )
                                                }

                                            </select>
                                        </Col>

                                        <Label

                                            sm={2}
                                        >
                                            Classroom
                                        </Label>
                                        <Col sm={4}>
                                            <Input
                                                readOnly="true"
                                                value={selectedClsroom[0] ? selectedClsroom[0].classroomName : null}
                                                placeholder="Classroom"
                                                type="text"
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label

                                            sm={2}
                                        >
                                            Contact Person
                                        </Label>
                                        <Col sm={4}>
                                            <Input
                                                readOnly="true"
                                                value={selectedStudent[0] ? selectedStudent[0].contactPerson : null}

                                                placeholder="Contact Person"
                                                type="text"
                                            />
                                        </Col>

                                        <Label

                                            sm={2}
                                        >
                                            Email Address
                                        </Label>
                                        <Col sm={4}>
                                            <Input
                                                readOnly="true"
                                                value={selectedStudent[0] ? selectedStudent[0].emailAddress : null}

                                                placeholder="Email Address"
                                                type="email"
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label

                                            sm={2}
                                        >
                                            Contact No.
                                        </Label>
                                        <Col sm={4}>
                                            <Input
                                                readOnly="true"
                                                value={selectedStudent[0] ? selectedStudent[0].contactNo : null}

                                                placeholder="Contact No."
                                                type="number"
                                            />
                                        </Col>

                                        <Label

                                            sm={2}
                                        >
                                            Date Of Birth
                                        </Label>
                                        <Col sm={4}>
                                            <Input
                                                readOnly="true"
                                                value={selectedStudent[0] ? selectedStudent[0].dob : null}

                                                placeholder="Date Of Birth"
                                                type="text"
                                            />
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </Container>

                        </div>
                    </div>

                    <div className="card" style={{ "margin-top": "20px" }}>
                        <div className="card-body">

                            <Table bordered style={{ "margin-top": "20px" }}>
                                <thead>
                                    <tr>
                                        <th>
                                            Subject
                                        </th>
                                        <th>
                                            Teacher
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        // teachers.map((e) => {
                                        //     if (e.classRooms.includes(selectedClsroom[0] ? selectedClsroom[0]._id : '')) {
                                        //         return (e.subjects.map((sub,index) => {

                                        //             let selectedSubject = sub ? subjects.filter((e) => e._id === sub) : []
                                        //             return (
                                        //                 <tr key={index}>
                                        //                     <td>
                                        //                         {selectedSubject[0].subjectName}
                                        //                     </td>
                                        //                     <td>
                                        //                         {`${e.firstName} ${e.lastName}`}
                                        //                     </td>
                                        //                 </tr>
                                        //             )
                                        //         }) )
                                        //     }
                                        // })
                                    }
                                </tbody>
                            </Table>


                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
