import { useState } from "react";
import { Person } from "react-bootstrap-icons";

const MyAttendance = () => {
    return (
        <>
            <div className=" flex justify-center rounded-full bg-blue-600 text-3xl">
                <Person />
            </div>
            <div>
                <h1>student MyAttendance page</h1>
            </div>
        </>
    )
}

export default MyAttendance;