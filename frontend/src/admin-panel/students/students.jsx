import { useState, useRef, useEffect } from "react";
import { instance } from "../../core.mjs";
import { Person, PlusLg } from "react-bootstrap-icons";
import { Modal, Button, Form, Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'




const Students = () => {



    const nameInputRef = useRef("");
    const lastNameInputRef = useRef("");
    const emailInputRef = useRef("");
    const passwordInputRef = useRef("");
    const courseInputRef = useRef("");

    const [students, setStudents] = useState([]);

    useEffect(() => {
        const getStudents = async () => {
            try {
                const response = await instance.get("/allStudents");
                console.log(response.data);
                setStudents(response.data);
            } catch (error) {
                console.log(error.response.data);
            }
        }
        getStudents();

    }, [])



    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addStudentHandler = () => {

        try {
            const response = instance.post("/register", {
                name: nameInputRef.current.value,
                email: emailInputRef.current.value,
                password: passwordInputRef.current.value,
                course: courseInputRef.current.value,
            })
            console.log(response.data);

            handleClose();
        } catch (error) {
            console.log(error.response.data);
        }
    }

    return (
        <>




            <div className=" flex flex-col gap-4 p-2 justify-center w-full">
                <div className=" p-4 flex justify-center w-full items-center gap-2">
                    <div className=" bg-blue-600 p-2 rounded-full text-white  text-5xl">
                        <Person />
                    </div>
                    <div className="text-black text-5xl ">Students</div>
                    <div className=" ml-auto">
                        <button
                            type="button"
                            className=" bg-blue-400 hover:bg-blue-500 rounded-lg p-3 text-white"
                            onClick={handleShow}
                        >
                            <div className=" flex justify-center items-center gap-2">
                                <span className=" text-xl">+</span> Add Student
                            </div>
                        </button>
                    </div>
                </div>
                <div>
                    <div className=" bg-slate-300">



                        <div className=" p-4 flex justify-center  items-center gap-2">


                            <Table striped bordered hover variant="light">
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>Profile Image</th>
                                        <th>Name</th>
                                        <th>Course Name</th>
                                        <th>Password</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        students.map((student, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index}</td>
                                                    {student.profile_image ?
                                                        <td><img src={student.profile_image} alt="" className=" w-[50px] h-[50px]" /></td>
                                                        :

                                                        <td className=" text-xl text-black"> <Person className=" m-auto" /></td>

                                                    }
                                                    <td>{student.name}</td>
                                                    <td>{student.course}</td>
                                                    <td>{student.password}</td>
                                                </tr>

                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </div>



                    </div>

                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                ref={nameInputRef}
                                type="text"
                                placeholder="Name"
                                autoFocus
                                required={true}
                            />
                            <br />

                            <Form.Label>Course</Form.Label>
                            <Form.Control
                                ref={courseInputRef}
                                type="text"
                                placeholder="course"
                                autoFocus
                                required={true}
                            />
                            <br />
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                ref={emailInputRef}
                                type="email"
                                placeholder="name@example.com"
                                autoFocus
                                required={true}
                            />
                            <br />
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                ref={passwordInputRef}
                                type="password"
                                placeholder="password"
                                autoFocus
                                required={true}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" className=" disabled:cursor-not-allowed" onClick={addStudentHandler} disabled={
                        [nameInputRef, lastNameInputRef, emailInputRef, passwordInputRef, courseInputRef]
                            .some(ref => ref?.current?.value?.length === 0) ? true : false
                    } >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>


        </>
    )
}

export default Students;