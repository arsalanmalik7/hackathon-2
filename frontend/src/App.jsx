import './App.css';
import { useState, useContext, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useLocation, useParams } from "react-router-dom";
import { Calendar3, Person, Search } from 'react-bootstrap-icons';
import { instance } from './core.mjs';
import { GlobalContext } from './context/context';
import smit from './assets/images (3).jpeg';

import Attendence from './admin-panel/attendence/attendence';
import Students from './admin-panel/students/students';

import Login from './login/login';

import Profile from './student-page/profile';
import MyAttendance from './student-page/myattendance';



const App = () => {

  const { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    instance.interceptors.request.use(
      function (config) {
        config.withCredentials = true;
        return config;
      },
      function (error) {
        console.error('Axios request error:', error);
        return Promise.reject(error);
      }
    );
  }, []);

  useEffect(() => {

    const loginStatus = async () => {

      try {

        const response = await instance.get(`/profile`,{})

        console.log(response.data.data);

        dispatch({
          type: "USER_LOGIN",
          payload: response.data.data
        })

      } catch (error) {
        console.log(error);
        dispatch({ type: "USER_LOGOUT" })
        return;
      }

    }


    loginStatus();

  }, [])


  const logoutHandler = async () => {
    try {
      const response = await instance.post(`/logout`, {}, {
        withCredentials: true,
      })

      console.log(response.data);
      dispatch({ type: "USER_LOGOUT" })
    } catch (error) {
      console.log(error);
    }

  }

  console.log("state: " ,state);


  return (
    <>

      {
        state.isLogin === true && state?.role === 'admin' ?
          <>


            <div className="flex justify-between">
              <div className="flex flex-col h-screen p-3 bg-blue-400 shadow w-60">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <img src={smit} className=' w-20 rounded-full' alt="SMIT" />
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center py-4">
                      <button
                        type="submit"
                        className="p-2 focus:outline-none focus:ring"
                      >
                        <Search />
                      </button>
                    </span>
                    <input
                      type="search"
                      name="Search"
                      placeholder="Search..."
                      className="w-full py-2 pl-10 text-sm rounded-md focus:outline-none"
                    />
                  </div>
                  <div className="flex justify-between">
                    <ul className="pt-2 pb-4 space-y-1 text-sm flex flex-col gap-4">
                      <li className="rounded-md hover:rounded-full delay-100 border-2 hover:border-white px-3 py-2">
                        <Link to={`/admin/students`} className=' flex gap-1 items-center text-2xl'>
                          <span className=' text-2xl text-white font-bold'>
                            <Person />
                          </span>
                          <span className="text-gray-100 no-underline border-0">Students</span>
                        </Link>
                      </li>
                      <li className="rounded-md hover:rounded-full delay-100 border-2 hover:border-white px-3 py-2">
                        <Link to={`/admin/attendance`} className=' flex gap-1 items-center text-2xl'>
                          <span className=' text-2xl text-white font-bold'>
                            <Calendar3 />
                          </span>
                          <span className="text-gray-100 no-underline border-0">Attendance</span>
                        </Link>
                      </li>


                    </ul>
                  </div>
                </div>
                <button onClick={logoutHandler} className=' bg-red-400 hover:bg-red-500 p-2 text-white font-bold rounded'>Logout</button>
              </div>
              <div className="container ">
                <div className="">
                  <Routes>
                    <Route path="admin/students" element={<Students />} />
                    <Route path="admin/attendance" element={<Attendence />} />
                  </Routes>
                </div>
              </div>
            </div>





          </>
          :
          null
      }

      {
        state.isLogin === true && state?.role === 'student' ?
          <>
            <nav className=' bg-blue-200 p-2 m-1 flex justify-center items-center'>
              <ul className=' flex gap-2 items-center text-2xl font-bold text-white '>
                <li className=' bg-blue-500 p-4 rounded-xl '><Link className='text-white no-underline' to={`/profile`}>Profile</Link></li>
                <li className=' bg-blue-500 p-4 rounded-xl '><Link className='text-white no-underline' to={`/profile/:studentId`}>Attendance</Link></li>
              </ul>
            </nav>



            <Routes>
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/:studentId" element={<MyAttendance />} />
            </Routes>
          </>
          :
          null
      }


      {state?.isLogin === false ?

        <>

          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace={true} />} />

          </Routes>



        </>
        :
        null
      }
    </>
  );
}

export default App;
