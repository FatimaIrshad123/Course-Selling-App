import { useState } from 'react'
import Signup from './components/Signup'
import Appbar from './components/Appbar'
import Login from './components/Login'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import AddCourse from './components/AddCourse'
import Courses from './components/Courses'
import CourseId from './components/CourseId'

function App(){
  return(
    <div style={{width:'100vw',height:'100wh', backgroundColor:'#eeeeee'}}>
      <Router>
      <Appbar />
        <Routes>
        <Route path='/' element={<div>Hello</div>}></Route>
          <Route path='/addcourse' element={<AddCourse />}></Route>
          <Route path='/courses' element={<Courses/>} ></Route>
          <Route path='/courses/:courseid' element={<CourseId/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          
        </Routes>
      </Router>
    </div>
  )
}

export default App
  