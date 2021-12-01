import React from 'react';

// 부트스트랩 관련
import 'bootstrap/dist/css/bootstrap.css'
import { Container } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

// css관련
import "./common.css";
import "./Sign_log.css";

function Signup() {
    const onChange = (e) => {
};
const onReset = () => {
};

    return (
        <Container fluid>
            <div className="signup_input_all">
                {/* 구름이미지 */}
                <div class="signup_cloud_img">
                    <svg width="426" height="229" viewBox="0 0 426 229" fill="none">
                    <path d="M391.468 123.781C415.042 156.546 429.473 221.746 298.608 220.428C169.218 251.619 157.37 190.226 167.619 155.631C147.325 171.006 90.3791 188.139 24.9463 133.665C1.66285 119.937 -37.7806 52.3937 85.8283 52.3937C161.593 -42.4964 230.141 12.8562 254.945 52.3937C263.759 31.9633 303.404 -2.78954 391.468 21.6423C450.505 45.8041 422.422 113.347 391.468 123.781Z" fill="url(#paint0_linear_81_199)" fill-opacity="0.5"/>
                    <defs>
                    <linearGradient id="paint0_linear_81_199" x1="99.625" y1="25.2601" x2="361.616" y2="133.531" gradientUnits="userSpaceOnUse">
                    <stop offset="0.135417" stop-color="#6567E8"/>
                    <stop offset="0.776042" stop-color="#7791D1" stop-opacity="0.8"/>
                    <stop offset="0.958333" stop-color="#7791D1" stop-opacity="0.8"/>
                    </linearGradient>
                    </defs>
                    </svg>
                </div>
                {/* 회원가입입력란 */}
                <div>
                    <div className="signup_insert_input">
                    <Form.Control size="lg" type="text" placeholder="이름(이메일)을 입력해주세요"/>
                    <Form.Control size="lg" type="password" placeholder="비밀번호를 입력해주세요"/>
                    <Form.Control size="lg" type="password" placeholder="비밀번호를 재입력해주세요"/>
                    <Form.Control size="lg" type="text" placeholder="별명을 입력해주세요"/>
                    </div>
                    <Row className="signup_all_button d-flex justify-content-around">
                        <Col xs={12} sm={6}>
                            <button>로그인</button>
                        </Col>
                        <Col xm={12}>
                            <button>회원가입</button>
                        </Col>
                    </Row>
                </div>
            </div>
        </Container>
    );
}

export default Signup;