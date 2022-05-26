import {
  SITE_LAYOUT
} from '../type'

export default function siteReducer (state = {}, action) {
  switch (action.type) {
    case SITE_LAYOUT:
      return { ...state, layout: action.payload }
    default:
      return state
  }
}
