import React, { useState } from 'react';

function Signup() {
    const onChange = (e) => {
    };

    const onReset = () => {
    };


    return (
        <div>
            <input placeholder="이름" />
            <input placeholder="비밀번호" />
            <input placeholder="이름" />
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값: </b>
                이름 (닉네임)
            </div>
        </div>
    );
}

export default Signup;