import React from 'react'
import { useState } from 'react';
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { ResponseMsgFormatter } from '../../utils';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import VideoLayout from './../../layout/videoLayout';
import Background1 from '../../assets/images/tamimleftBackground.jpg';
import styles from './index.css'


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
        }
        else {
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
                    ? ResponseMsgFormatter(err.response.data.message)
                    : "Something went wrong"
            )
        }


        );
    }

    const onHandleTC = () => {
        navigate(`/terms-and-conditions`);
    }


    return (
        <VideoLayout backgroundImage={Background1}>
            <Row >
                <Col xs={12} md={4} lg={{ span: 8, offset: 2 }} className="text-center">
                    <h1>Join</h1>
                    <h1>The Contest Now</h1>
                </Col>

                <Col xs={12} md={4} lg={{ span: 4, offset: 4 }} className="mt-5">
                    <Form onSubmit={onHandleLogin} name="form">
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label >
                                নাম</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="আপনার নাম লিখুন"
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
                            <Form.Label>
                                ফোন নম্বর</Form.Label>
                            <Form.Control

                                type="tel"
                                placeholder="আপনার রবি নম্বর লিখুন"
                                required="required"
                                onChange={e => onChangeNumber(e)}
                                value={phone}
                            />
                            <Form.Text style={{ color: "red" }}>
                                {phoneError}
                            </Form.Text>
                            {phoneError.length === 0 && <Form.Text className="text-muted">
                                আমরা আপনার নম্বর অন্য কারো সাথে শেয়ার করব না।
                            </Form.Text>}
                        </Form.Group>

                        <Form.Group className="text-center mb-4" >
                            <Button variant="danger" type="submit" disabled={!(name.length > 1 && phone.length === 11 && nameError.length === 0 && phoneError.length === 0 && checked)}>
                                Submit
                            </Button>
                        </Form.Group>
                        <Form.Group >

                            <Form.Check

                                type="checkbox"
                                checked={checked}
                                onChange={() => setChecked(!checked)}
                                id="disabledFieldsetCheck"
                                label={<>
                                    আমি <span style={{ color: "#c70a18", cursor: "pointer" }} onClick={() => onHandleTC()}>
                                        শর্তাবলীর
                                    </span> সাথে একমত

                                </>}
                            />




                        </Form.Group>
                    </Form >
                </Col>

            </Row>
        </VideoLayout >

    )
}

export default LoginPage


