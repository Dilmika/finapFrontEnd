import { BrowserRouter, Routes, Route } from "react-router-dom";
import Student from './components/Student';
import Subject from './components/Subject';
import Teacher from './components/Teacher';
import Classroom from './components/Classroom';
import Home from './components/Home';
import AllocateSubject from "./components/AllocateSubject";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { store } from './redux/store';
import { Provider } from 'react-redux'
import AllocateClassroom from "./components/AllocateClassroom";
import StudentReport from "./components/StudentReport";

function App() {
  return (
    // <Provider store={store} >
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Student" element={<Student/>}/>
        <Route path="/Subject" element={<Subject/>}/>
        <Route path="/Teacher" element={<Teacher/>}/>
        <Route path="/Classroom" element={<Classroom/>}/>
        <Route path="/AllocateSubjects" element={<AllocateSubject/>}/>
        <Route path="/AllocateClassroom" element={<AllocateClassroom/>}/>
        <Route path="/StudentDetail" element={<StudentReport/>}/>
      </Routes>
    </BrowserRouter>
    // </Provider>
  );
}

export default App;
