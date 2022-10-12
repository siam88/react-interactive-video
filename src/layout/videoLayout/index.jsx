import React from 'react'

import { Row, Col, Container } from 'react-bootstrap';

const videoLayout = (props) => {
    return (
        < div className="App" style={{ backgroundColor: "#28282b", height: "100vh" }}>
            <Container>

                <Row className="justify-content-md-center">
                    <Col xl={10} className="mt-4 mb-4">
                        <div className="video_wrapper ">
                            {
                                props.backgroundImage ? <div style={{
                                    backgroundImage: `url(${props.backgroundImage})`,
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "100% 100%",
                                    minHeight: "520px"

                                }}> {props.children}</div> : <> {props.children}</>
                            }

                        </div>
                    </Col>
                </Row>
            </Container>
        </ div>
    )
}

export default videoLayout