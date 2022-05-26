import {
  GET_ARTICLES,
  ERROR_GLOBAL,
  SUCCESS_GLOBAL,
  CLEAR_NOTIFICATION,
  AUTH_USER,
  SIGN_OUT,
  SITE_LAYOUT,
  GET_ARTICLE,
  CLEAR_CURRENT_ARTICLE,
  ADD_ARTICLE,
  GET_ADMIN_ARTICLES,
  UPDATE_ARTICLE_STATUS,
  REMOVE_ARTICLE,
  VERIFY_ACCOUNT,
  GET_CATEGORIES,
  ADD_CATEGORY,
  NAV_SEARCH
} from '../type'

// ARTICLE

export const addArticle = (article) => ({
  type: ADD_ARTICLE,
  payload: article
})

export const getArticles = (articles) => ({
  type: GET_ARTICLES,
  payload: articles
})

export const getArticle = (article) => ({
  type: GET_ARTICLE,
  payload: article
})

export const clearCurrentArticle = () => ({
  type: CLEAR_CURRENT_ARTICLE
})

export const getPaginateArticles = (articles) => ({
  type: GET_ADMIN_ARTICLES,
  payload: articles
})

export const updateArticleStatus = (articles) => ({
  type: UPDATE_ARTICLE_STATUS,
  payload: articles
})

// SEARCH
export const navSearch = (articles) => ({
    type:NAV_SEARCH,
    payload: articles
})



// NOTIFICATION
export const errorGlobal = (msg) => ({
  type: ERROR_GLOBAL,
  payload: msg
})

export const successGlobal = (msg) => ({
  type: SUCCESS_GLOBAL,
  payload: msg
})

export const clearNotification = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_NOTIFICATION
    })
  }
}

export const getCategories = (categories) => ({
  type: GET_CATEGORIES,
  payload: categories
})

export const addCategory = (categories) => ({
  type: ADD_CATEGORY,
  payload: categories
})

// REMOVE Articles
export const removeArticle = () => ({
  type: REMOVE_ARTICLE
})

// USERS
export const authUser = (user) => ({
  type: AUTH_USER,
  payload: user
})

export const signOut = () => ({
  type: SIGN_OUT
})

export const accountVerify = () => ({
  type: VERIFY_ACCOUNT
})

// LAYOUT
export const appLayout = (layout) => ({
  type: SITE_LAYOUT,
  payload: layout
})
