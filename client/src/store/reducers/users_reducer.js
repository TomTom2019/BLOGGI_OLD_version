import {
  AUTH_USER,
  SIGN_OUT,
  VERIFY_ACCOUNT
} from '../type'

const DEFAULT_USER_STATE = {
  data: {
    _id: null,
    email: null,
    firstname: null,
    lastname: null,
    role: null,
    verified: null
  },
  auth: null
}

export default function userReducer (state = { DEFAULT_USER_STATE }, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        data: { ...state.data, ...action.payload.data },
        auth: action.payload.auth
      }

    case SIGN_OUT:
      return {
        ...state,
        data: { ...DEFAULT_USER_STATE.data },
        auth: false
      }
    case VERIFY_ACCOUNT: return { ...state, data: { ...state.data, verified: true } }

    default:
      return state
  }
}
