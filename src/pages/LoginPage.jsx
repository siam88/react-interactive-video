import React from 'react'
import { useState, useRef } from 'react';
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { ErrorMsgFormatter } from '../utils';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const LoginPage = (props) => {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [nameError, setNameError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [formValid, setFormValid] = useState(false)


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
            setPhoneError("Please Input your 11 digit Number");

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
                Cookies.set(process.env.REACT_APP_SECRET_URL, res.data.data.token, {
                    expires: res.data.data.expires_in / 86400,
                });

                props.setAuth(true)
                props.setLoading(false)
                toast.success(res.data.message)

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



    return (

        <div className='login'>

            <Form onSubmit={onHandleLogin}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Your Name"
                        required="required"
                        onChange={e => onChangeName(e)}
                        value={name}
                    />
                    <Form.Text className="text-muted">
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
                    <Form.Text className="text-muted">
                        {phoneError}
                    </Form.Text>
                    {phoneError.length === 0 && <Form.Text className="text-muted">
                        We'll never share your Number with anyone else.
                    </Form.Text>}
                </Form.Group>


                <Button variant="primary" type="submit" disabled={!(name.length > 1 && phone.length === 11 && nameError.length === 0 && phoneError.length === 0)}>
                    Submit
                </Button>
            </Form >
        </div >
    )
}

export default LoginPage


{/*<div
            className="login"

        > <div >
                <p style={{ fontSize: "2rem", color: "white" }}>Login</p>

                <input
                    name="name"
                    type="contact"
                    placeholder="name"
                    ref={nameInputRef}
                />
                <br />
                <br />
                <input
                    type="contact"
                    name="phone"

                    placeholder="০১*********"
                    ref={numberInputRef}
                />
                <br />
                <br />
                <button onClick={() => onHandleLogin()}>Login</button>

            </div></div> */}
