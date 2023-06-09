
export const PARAMS = {
    PREFIX: '/api',
    USER: '/user',
    REGISTRATION: '/registration',
    LOGIN: '/login',
    CHECK_AUTH: '/auth',
    USERS: '/users',
}

export const ROUTES = {
    PREFIX: PARAMS.PREFIX,
    USER: PARAMS.PREFIX + PARAMS.USER,
    REGISTRATION: PARAMS.PREFIX + PARAMS.USER + PARAMS.REGISTRATION,
    LOGIN: PARAMS.PREFIX + PARAMS.USER + PARAMS.LOGIN,
    CHECK_AUTH: PARAMS.PREFIX + PARAMS.USER + PARAMS.CHECK_AUTH,
    USERS: PARAMS.PREFIX + PARAMS.USERS,
}