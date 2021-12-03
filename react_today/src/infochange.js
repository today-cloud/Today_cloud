import React from 'react';

// css관련
import "./common.css";

function Infochange() {

    return (
        <div>
            <div className="user-info">
                아이디: <input></input>
                비밀번호: <input></input>
                이름: <input></input>
                닉네임: <input></input>
                휴대폰번호: <input></input>

                <button>개인정보 수정</button>
            </div>
        </div>
    
    );
}

export default Infochange;