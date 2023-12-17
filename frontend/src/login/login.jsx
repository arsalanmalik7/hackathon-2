import { useState, useRef } from "react";
import { instance } from "../core.mjs";





const Login = () => {


    const emailInputRef = useRef("");
    const passwordInputRef = useRef("");


    const loginSubmitHandler = async (e) => {
        e.preventDefault();
        console.log("login");

        try {

            const response = await instance.post("/login", {

                email: emailInputRef.current.value,
                password: passwordInputRef.current.value,
            })
            console.log(response.data);

        } catch (error) {
            console.log(error.response.data);
        
        }


    }




    return (

        <>
            <div className=" bg-cyan-300 p-3 m-3">
                <form onSubmit={loginSubmitHandler} className=" p-2 m-2" >
                    <input type="email" ref={emailInputRef} required placeholder="Email" className=" p-2 text-xl border-2 border-black" />
                    <input type="password" ref={passwordInputRef} required placeholder="Password" className=" p-2 text-xl border-2 border-black" />
                    <button className=" p-2 text-xl border-2 border-black">Login</button>
                </form>
            </div>
        </>
    )
}

export default Login;