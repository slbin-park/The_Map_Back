module.exports = {
    // Success
    SUCCESS: { isSuccess: true, code: 1000, msg: '성공' },

    // Common
    TOKEN_EMPTY: { isSuccess: false, code: 2000, msg: 'JWT 토큰을 입력해주세요.' },
    TOKEN_VERIFICATION_FAILURE: { isSuccess: false, code: 3000, msg: 'JWT 토큰 검증 실패' },
    TOKEN_VERIFICATION_SUCCESS: { isSuccess: true, code: 1001, msg: 'JWT 토큰 검증 성공' }, // ?


    // Response error
    REFRESH_TOKEN_NOTHING: {
        isSuccess: false,
        code: 3001,
        msg: 'Refresh_Token 이 없습니다.',
    },
    LOGIN_FAIL: {
        isSuccess: false,
        code: 3002,
        msg: '아이디 혹은 비밀번호를 확인해주세요.',
    },

    SIGNUP_REDUNDANT_USER_NAME: { isSuccess: false, code: 3001, msg: '중복된 사용자 이름입니다.' },
    SIGNUP_REDUNDANT_NICKNAME: { isSuccess: false, code: 3002, msg: '중복된 닉네임입니다.' },

    SIGNIN_EMAIL_WRONG: { isSuccess: false, code: 3003, msg: '아이디가 잘못 되었습니다.' },
    SIGNIN_PASSWORD_WRONG: { isSuccess: false, code: 3004, msg: '비밀번호가 잘못 되었습니다.' },
    SIGNIN_INACTIVE_ACCOUNT: {
        isSuccess: false,
        code: 3005,
        msg: '비활성화 된 계정입니다. 고객센터에 문의해주세요.',
    },
    SIGNIN_WITHDRAWAL_ACCOUNT: {
        isSuccess: false,
        code: 3006,
        msg: '탈퇴 된 계정입니다. 고객센터에 문의해주세요.',
    },

    FOLLOW_NOTHING: {
        isSuccess: false,
        code: 3007,
        msg: '팔로우 요청 기록이 없습니다.',
    },
    PRIVATE_USER: {
        isSuccess: false,
        code: 3008,
        msg: '비공개 계정입니다.',
    },
    //Connection, Transaction 등의 서버 오류
    DB_ERROR: { isSuccess: false, code: 4000, msg: '데이터 베이스 에러' },
    SERVER_ERROR: { isSuccess: false, code: 4001, memsgssage: '서버 에러' },
};
