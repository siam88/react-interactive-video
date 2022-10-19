import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import resultPageBackground from '../../assets/all-images/BTS-TC-page-bg.png'
import VideoLayout from './../../layout/videoLayout/index';

const TAndCPage = () => {
    let navigate = useNavigate();

    return (
        <>

            <VideoLayout backgroundImage={resultPageBackground}>
                <Container >
                    <Row  >
                        <Col xs={12} >
                            <h1><IoArrowBack onClick={() => navigate('/')} style={{ cursor: 'pointer' }} /> Terms And Conditions</h1>
                        </Col>
                        <Col xs={12} className='mt-5' >

                            You are deemed to be a “User” of the Robi Intelligent Solution application (“App”) and/or Website (when you access and/or use the App/Website and you are deemed to have read and understood and accepted to be bound by the following terms and conditions (also referred to as “Terms of Service”, “Terms of use” or “Terms”), including those additional terms & conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all Users of the App and/or Website including, but not limited to, Users who are browsers, vendors, customers, merchants, affiliations and/ or contributors of content.

                            Any new addition of features, service or tools shall also be deemed to be subject to the Terms of Service in force. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes here. Therefore, in order to stay updated on the Terms, please check this page periodically for changes. Your continued use of, or access to the App and/or Website, following the posting of any changes constitutes acceptance of those changes.

                            In order to avail different features/ services on the App/Website, you may be required to register on the App/Website. It is your responsibility to safeguard the username/password that you use to access the App/Website. All activities/actions carried out through access of the App/Website utilizing your username/password shall be attributable to you and you shall be held responsible for any activities or actions, irrespective of whether or not you have authorized such activities or actions. It is your responsibility to notify us immediately if you become aware of any unauthorized use of your username/password.

                            General Conditions


                        </Col>


                    </Row>
                </Container>
            </VideoLayout >


        </>

    )
}

export default React.memo(TAndCPage)