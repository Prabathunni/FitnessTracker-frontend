import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const VideoBanner = () => {


  const { showPopUp, setShowPopUp } = useAuth()


  return (
    <>

      <div className="video-banner-section">
        <Container fluid className="px-0">
          <Row className="g-0">
            <Col>
              <div className="video-container">
                {/* Video element with controls */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-100"
                >
                  <source src="/video/bannerfitness.mp4" type="video/mp4" />
                </video>

                {/* Optional overlay content */}
                <div className="video-overlay">
                  <Container>
                    <Row className="align-items-center" style={{ height: '100vh' }}>
                      <Col md={8} lg={6}>
                        <h1 className="text-white display-3" style={{ fontFamily: '"Anton", sans-serif' }}>Start Today. Sweat Harder. Be Better Tomorrow.</h1>


                        <button className='mt-4 btn btn-primary' onClick={() => setShowPopUp(true)}>
                          Get Started
                          <svg width="16" height="16" className='ms-1' fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 2l6 6-6 6" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
                          </svg>
                        </button>


                      </Col>
                    </Row>
                  </Container>
                </div>
              </div>
            </Col>
          </Row>
        </Container>

      </div>



    </>
  );
};

export default VideoBanner;