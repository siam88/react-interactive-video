import React from 'react'
import { useState } from 'react';
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { ErrorMsgFormatter } from '../../utils';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import {
    HiClipboardList
} from "react-icons/hi";



const LoginPage = (props) => {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [checked, setChecked] = useState(false);
    const [nameError, setNameError] = useState("");
    const [phoneError, setPhoneError] = useState("");

    let navigate = useNavigate();

    const onChangeName = (e) => {
        let name = e.target.value
        setName(name)


        if (name.length > 1) {
            setNameError("");
        } else {
            setNameError("At least 2 word required");
        }

    }
    const onChangeNumber = (e) => {
        let phone = e.target.value
        setPhone(phone)


        if (phone.length === 11) {
            setPhoneError("");
        } else {
            setPhoneError("Please Input your 11 digit Robi Number");

        }

    }


    const onHandleLogin = async (e) => {
        e.preventDefault()
        props.setLoading(true)

        let postData = {
            name: name,
            phone: phone
        }


        await axios.post(`${process.env.REACT_APP_SECRET_URL}/login`, postData
        ).then((res) => {
            console.log({ res })
            if (res.data.statusCode === "400200") {
                Cookies.set(process.env.REACT_APP_GET_SECRET_TOKEN, res.data.data.token, {
                    expires: res.data.data.expires_in / 86400,
                });

                props.setAuth(true)
                props.setLoading(false)
                // toast.success(res.data.message)

            } else {
                toast.error(
                    "Something went wrong"
                )
                props.setAuth(false)
                props.setLoading(false)
            }
        }).catch((err) => {
            props.setLoading(false)
            toast.error(
                err.response.data.message
                    ? ErrorMsgFormatter(err.response.data.message)
                    : "Something went wrong"
            )
        }


        );
    }

    const onHandleTC = () => {
        navigate(`/terms-and-conditions`);
    }


    return (
        <Container >
            <Row className='mt-5'>
                <Col xs={12} md={4} lg={{ span: 8, offset: 2 }} className="text-center">
                    <h1>Interactive Video </h1>
                </Col>

                <Col xs={12} md={4} lg={{ span: 4, offset: 4 }}>
                    <Form onSubmit={onHandleLogin} name="form">
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label >Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Your Name"
                                required="required"
                                onChange={e => onChangeName(e)}
                                value={name}
                                name="name"
                            />
                            <Form.Text style={{ color: "red" }} >
                                {nameError}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control

                                type="tel"
                                placeholder="০১*********"
                                required="required"
                                onChange={e => onChangeNumber(e)}
                                value={phone}
                            />
                            <Form.Text style={{ color: "red" }}>
                                {phoneError}
                            </Form.Text>
                            {phoneError.length === 0 && <Form.Text className="text-muted">
                                We'll never share your Number with anyone else.
                            </Form.Text>}
                        </Form.Group>
                        <Form.Group className="mb-3">

                            <Form.Check
                                type="checkbox"
                                checked={checked}
                                onChange={() => setChecked(!checked)}
                                id="disabledFieldsetCheck"
                                label={<>
                                    I agree to terms and conditions

                                </>}
                            />
                            <div style={{ color: "#ff00006e", fontSize: "0.75rem", textAlign: "right", cursor: "pointer" }} onClick={() => onHandleTC()}>
                                ( <HiClipboardList /> Terms and Conditions)
                            </div>



                        </Form.Group>
                        <Form.Group className="text-center">
                            <Button variant="primary" type="submit" disabled={!(name.length > 1 && phone.length === 11 && nameError.length === 0 && phoneError.length === 0 && checked)}>
                                Submit
                            </Button>
                        </Form.Group>

                    </Form >
                </Col>

            </Row>
        </Container >
        // <div className='login'>


        // </div >
    )
}

export default LoginPage


