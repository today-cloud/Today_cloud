import React from 'react';

// 부트스트랩 관련
import 'bootstrap/dist/css/bootstrap.css'
import { Container } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';

// css관련
import "./common.css";

function Main() {

    return (
        <div>
            <header>
                <Nav defaultActiveKey="/home" as="ul">
                <Nav.Item as="li">
                <Nav.Link href="/home">
                <div class="cloud_img">
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
                </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                <Nav.Link eventKey="link-1">Link</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                <Nav.Link eventKey="link-2">Link</Nav.Link>
                </Nav.Item>
                </Nav>
            </header>         
        </div>
    );
}

export default Main;