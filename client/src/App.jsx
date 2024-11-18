// import React from 'react'
// import {BrowserRouter,Routes,Route} from 'react-router-dom'
// import Navbar from './components/Navbar'
// import Sidebar from './components/Sidebar'
// import Footer from './components/Footer'
// import Home from './pages/Home'
// import Login from './pages/Login'
// import ShowRoles from './pages/Roles/ShowRoles'
// // import CategoryToatl from './pages/Roles/CategoryToatl'
// import AddRole from './pages/Roles/AddRole'
// import UpdateRole from './pages/Roles/UpdateRole'
// import ShowEmployee from './pages/Employees/ShowEmployee'
// import AddEmployee from './pages/Employees/AddEmployee'
// import ShowExpance from './pages/Expance/ShowExpance'
// import AddExpance from './pages/Expance/AddExpance'
// import UpdateExpance from './pages/Expance/UpdateExpance'

// import ShowExpanceCategory from './pages/ExpanceCategory/ShowExpanceCategory'
// import AddExpanceCategory from './pages/ExpanceCategory/AddExpanceCategory'
// import UpdateExpanceCategory from './pages/ExpanceCategory/UpdateExpanceCategory'

// import UpdateEmployee from './pages/Employees/UpdateEmployee'
// import ShowAttendance from './pages/Attendance/ShowAttendance'
// import AddAttendance from './pages/Attendance/AddAttendance'



// const App = () => {
//   return (
//     <>
//     <BrowserRouter>
//     <Navbar/>
//     <Sidebar/>
//     <div class="content-body">
//     <Routes>

//         <Route path='/' element={<Home/>} />
//         <Route path='/login' element={<Login/>} />
//         {/* Role routes */}
//         <Route path='/showrole' element={<ShowRoles/>} />
//         {/* <Route path='/cattotal' element={<CategoryToatl/>} /> */}
//         <Route path='/addrole' element={<AddRole/>} />
//         <Route path='/updaterole/:id' element={<UpdateRole/>} />
//         {/* Employee Routes */}
//         <Route path='/showemployee' element={<ShowEmployee/>} />
//         <Route path='/addemployee' element={<AddEmployee/>} />
//         <Route path='/updateemployee/:id' element={<UpdateEmployee/>} />
//         {/* Expance Category Routes */}
//         <Route path='/showexpanceCategory' element={<ShowExpanceCategory/>} />
//         <Route path='/addexpanceCategory' element={<AddExpanceCategory/>} />
//         <Route path='/updateexpanceCategory/:id' element={<UpdateExpanceCategory/>} />
//         {/* Expance Routes */}
//         <Route path='/showexpance' element={<ShowExpance/>} />
//         <Route path='/addexpance' element={<AddExpance/>} />
//         <Route path='/updateexpance/:id' element={<UpdateExpance/>} />
//         {/* Attendance Routes */}
//         <Route path='/showattendance' element={<ShowAttendance/>} />
//         <Route path='/addattendance' element={<AddAttendance/>} />

//     </Routes>
//         </div>
//     <Footer/>
//     </BrowserRouter>
//     </>
//   )
// }

// export default App



import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import ShowRoles from './pages/Roles/ShowRoles'
// import CategoryToatl from './pages/Roles/CategoryToatl'
import AddRole from './pages/Roles/AddRole'
import UpdateRole from './pages/Roles/UpdateRole'
import ShowEmployee from './pages/Employees/ShowEmployee'
import AddEmployee from './pages/Employees/AddEmployee'
import ShowExpance from './pages/Expance/ShowExpance'
import AddExpance from './pages/Expance/AddExpance'
import UpdateExpance from './pages/Expance/UpdateExpance'

import ShowExpanceCategory from './pages/ExpanceCategory/ShowExpanceCategory'
import AddExpanceCategory from './pages/ExpanceCategory/AddExpanceCategory'
import UpdateExpanceCategory from './pages/ExpanceCategory/UpdateExpanceCategory'

import UpdateEmployee from './pages/Employees/UpdateEmployee'
import ShowAttendance from './pages/Attendance/ShowAttendance'
import AddAttendance from './pages/Attendance/AddAttendance'
import AdminOutlet from './Outlets/AdminOutlet'



const App = () => {
  return (
    <>
      <BrowserRouter>


          <Routes>

            <Route path='/login' element={<Login />} />

            <Route path='/' element={<AdminOutlet/>}>
            <Route path='/' element={<Home />} />
              {/* Role routes */}
              <Route path='/showrole' element={<ShowRoles />} />
              {/* <Route path='/cattotal' element={<CategoryToatl/>} /> */}
              <Route path='/addrole' element={<AddRole />} />
              <Route path='/updaterole/:id' element={<UpdateRole />} />
              {/* Employee Routes */}
              <Route path='/showemployee' element={<ShowEmployee />} />
              <Route path='/addemployee' element={<AddEmployee />} />
              <Route path='/updateemployee/:id' element={<UpdateEmployee />} />
              {/* Expance Category Routes */}
              <Route path='/showexpanceCategory' element={<ShowExpanceCategory />} />
              <Route path='/addexpanceCategory' element={<AddExpanceCategory />} />
              <Route path='/updateexpanceCategory/:id' element={<UpdateExpanceCategory />} />
              {/* Expance Routes */}
              <Route path='/showexpance' element={<ShowExpance />} />
              <Route path='/addexpance' element={<AddExpance />} />
              <Route path='/updateexpance/:id' element={<UpdateExpance />} />
              {/* Attendance Routes */}
              <Route path='/showattendance' element={<ShowAttendance />} />
              <Route path='/addattendance' element={<AddAttendance />} />
            </Route>


          </Routes>


      </BrowserRouter>
    </>
  )
}

export default App