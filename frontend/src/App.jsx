import './App.css';
import { useState, useContext, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useLocation, useParams } from "react-router-dom";
import { Calendar3, Person, Search } from 'react-bootstrap-icons';
import { instance } from './core.mjs';
import { GlobalContext } from './context/context';

import Attendence from './admin-panel/attendence/attendence';
import Students from './admin-panel/students/students';

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

        const response = await instance.get(`/profile`)

        console.log(response.data);

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

    console.log(state);

    loginStatus();

  }, [])



  return (
    <>

      {
        state.isLogin === true && state?.role === 'admin' ?
          <>
            {/* <div className=' flex flex-grow bg-red-400 h-full'>
              <nav className=' bg-blue-400 flex flex-col w-max h-full  p-2 m-1'>
                <ul className=' flex flex-col bg-blue-200 gap-10 h-full p-2'>
                  <li><Link to="/admin/students" className=' text-2xl backdrop-blur-md p-2 rounded-sm border-4 border-white  '>Students</Link></li>
                  <li><Link to="/admin/attendance" className=' text-2xl backdrop-blur-md p-2 rounded-sm  border-4 border-white '>Attendance</Link></li>
                </ul>
              </nav> */}

            <div className="flex">
              <div className="flex flex-col h-screen p-3 bg-gray-800 shadow w-60">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <h2 className="text-xl font-bold text-white">Dashboard</h2>
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
                  <div className="flex-1">
                    <ul className="pt-2 pb-4 space-y-1 text-sm flex flex-col gap-4">
                      <li className="rounded-sm">
                        <Link to={`/admin/students`} className=' flex gap-1 items-center text-2xl'>
                          <span className=' text-2xl text-white font-bold'>
                            <Person />
                          </span>
                          <span className="text-gray-100">Students</span>
                        </Link>
                      </li>
                      <li className="rounded-sm">
                        <Link to={`/admin/attendance`} className=' flex gap-1 items-center text-2xl'>
                          <span className=' text-2xl text-white font-bold'>
                            <Calendar3 />
                          </span>
                          <span className="text-gray-100">Attendance</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="container mx-auto mt-12">
                <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
                  <Routes>
                    <Route path="admin/students" element={<Attendence />} />
                    <Route path="admin/attendance" element={<Students />} />
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
            <nav className=' bg-blue-200 p-2 m-1'>
              <ul>
                <li><Link to={`/profile`}>Profile</Link></li>
                <li><Link to={`/profile/:studentId`}>Attendance</Link></li>
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

    </>
  );
}

export default App;
