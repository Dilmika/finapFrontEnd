import React, { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { ADD_CLASSROOM, ADD_STUDENTS, ADD_SUBJECT, GET_ALL_CLASSROOMS, GET_ALL_SUBJECTS, GET_ALL_TEACHERS } from '../config/config';

export default class Student extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            contactPerson: '',
            emailAddress: '',
            contactNo: '',
            dob: '',
            age: 0,
            classRooms: [],
            subjects: [],
            students: [],
            teachers: [],
            selectedClassroom: ''
        }

        this.changeFirstName = this.changeFirstName.bind(this);
        this.changeLastName = this.changeLastName.bind(this);
        this.changeContactPerson = this.changeContactPerson.bind(this);
        this.changeEmailAddress = this.changeEmailAddress.bind(this);
        this.changeDOB = this.changeDOB.bind(this);
        this.changeContactNumber = this.changeContactNumber.bind(this);
        this.calculateAge = this.calculateAge.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getClassroom = this.getClassroom.bind(this);
    }

    componentDidMount() {
        const { classRooms, subjects, students, teachers } = this.state;

        axios.get(GET_ALL_TEACHERS)
            .then(res => {
                this.setState({
                    teachers: res.data.listTeachers
                })
            })

        axios.get(GET_ALL_CLASSROOMS)
            .then(res => {
                this.setState({
                    classRooms: res.data.listClassrooms
                })
            })

        axios.get(GET_ALL_SUBJECTS)
            .then(res => {
                this.setState({
                    subjects: res.data.listSubjects
                })
            })

    }

    onSubmit(e) {
        console.log('onSubmit executed');
        e.preventDefault();
        const { students, firstName, lastName, contactPerson, emailAddress, contactNo, dob, age, selectedClassroom } = this.state;

        let student;

        console.log('contactNo.toString().length: ', contactNo.toString().length);
        if (age < 5) {
            alert("please enter a valid a age !")
        } else if (contactNo.toString().length !== 10) {
            alert("please enter a valid a contact number !")
        } else {
            student = {
                firstName: firstName,
                lastName: lastName,
                contactPerson: contactPerson,
                emailAddress: emailAddress,
                contactNo: contactNo.toString(),
                dob: dob,
                age: age,
                classRoom: selectedClassroom
            }

            console.log('student: ', student);

            axios.post(ADD_STUDENTS, student)
            .then(res => {
                   console.log('  res.data: ',   res.data);
            })
            .catch((err) => {
                console.log('err',err)
            })


            // let studentsArray = students;

            // studentsArray.push(student);

            // this.setState({
            //     students: studentsArray
            // })
        }

    }

    changeFirstName(e) {
        e.preventDefault();
        this.setState({
            firstName: e.target.value
        })
    }

    changeLastName(e) {
        e.preventDefault();
        this.setState({
            lastName: e.target.value
        })
    }


    changeContactPerson(e) {
        e.preventDefault();
        this.setState({
            contactPerson: e.target.value
        })
    }

    changeEmailAddress(e) {
        e.preventDefault();
        this.setState({
            emailAddress: e.target.value
        })
    }

    changeDOB(e) {
        e.preventDefault();
        this.setState({
            dob: e.target.value
        })
    }

    changeContactNumber(e) {
        e.preventDefault();
        this.setState({
            contactNo: e.target.value
        })
    }

    getClassroom(e){
        e.preventDefault();
        this.setState({
            selectedClassroom : e.target.value
        })
    }


    calculateAge = () => {
        const dateString = this.dob.value;
        const now = new Date();

        const yearNow = now.getFullYear();
        const monthNow = now.getMonth();
        const dateNow = now.getDate();

        const dob = new Date(dateString);

        const yearDob = dob.getFullYear();
        const monthDob = dob.getMonth();
        const dateDob = dob.getDate();

        let yearAge = yearNow - yearDob;
        let monthAge;

        if (monthNow >= monthDob) {
            monthAge = monthNow - monthDob;
        } else {
            yearAge--;
            monthAge = 12 + monthNow - monthDob;
        }

        let dateAge;
        if (dateNow >= dateDob) {
            dateAge = dateNow - dateDob;
        } else {
            monthAge--;
            dateAge = 31 + dateNow - dateDob;

            if (monthAge < 0) {
                monthAge = 11;
                yearAge--;
            }
        }

        const age = {
            years: yearAge,
            months: monthAge,
            days: dateAge
        };

        let dateOfBirth = (dateDob >= 10 ? dateDob : '0' + dateDob) + '/' + (monthDob >= 10 ? monthDob : '0' + monthDob) + '/' + yearDob;

        this.setState({
            age: age.years,
            dob: dateOfBirth
        })

    };

    render() {
        const { classRooms, teachers, subjects } = this.state;

        return (
            <div style={{
                marginTop: "10%",
                marginLeft: "10%",
                marginRight: "10%",
                marginBottom: "10%"
            }}>
                <h1>Student Interface</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group ">
                        <label>First Name</label>
                        <input type="text" className="form-control input_space" placeholder="First Name" onChange={this.changeFirstName} required="true" />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Last Name</label>
                        <input type={'text'} className="form-control input_space" placeholder="Last Name" onChange={this.changeLastName} required="true" />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Contact Person</label>
                        <input type={'text'} className="form-control input_space" placeholder="Contact Person" onChange={this.changeContactPerson} required="true" />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Contact No</label>
                        <input type={'number'} className="form-control input_space" placeholder="Contact No" onChange={this.changeContactNumber} required="true" />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control input_space" placeholder="Email Address" onChange={this.changeEmailAddress} required="true" />
                    </div>

                    <div className="form-group">
                        <label>Classroom</label>
                        <select style={{
                            "appearance": "none",
                            "border": "0px none",
                            " box-sizing": "border-box",
                            "display": "block",
                            "margin-bottom": "20px",
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
                        onChange={this.getClassroom}
                        >
                            {
                                classRooms.map((e, index) =>
                                    <option key={index} value={e._id}>{e.classroomName}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Date Of Birth</label>
                        <input ref={(r) => this.dob = r} type="date" onChange={this.calculateAge} style={{ marginLeft: "20px" }} required="true"/>
                    </div>

                    <div className="form-group">
                        <label for="exampleInputEmail1">Age</label>
                        <input type="email" className="form-control input_space" placeholder="Age" readOnly={true} value={this.state.age} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}
