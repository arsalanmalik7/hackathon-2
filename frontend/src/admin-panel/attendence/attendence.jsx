import { useState } from "react";
import { Calendar3 } from "react-bootstrap-icons";

const Attendence = () => {
    return (

        <>

            <div className=" flex flex-col gap-4 p-2">
                <div className=" w-fit p-4 flex justify-center rounded-full bg-blue-600 text-5xl text-white items-center m-auto">
                    <Calendar3 />
                </div>
                <div>
                    <h1>Admin Attendence Page</h1>
                </div>
            </div>
        </>
    )
}

export default Attendence;