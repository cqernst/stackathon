import axios from 'axios';
import { StackNavigator } from 'react-navigation';


/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
// export const me = () =>
//   dispatch =>
//     axios.get('/auth/me')
//       .then(res =>
//         dispatch(getUser(res.data || defaultUser)))
//       .catch(err => console.log(err))

export const auth = (email, password) =>
  dispatch =>
    axios.post('http://172.16.25.113:8080/auth/login', { email, password })
      .then(res => {
        dispatch(getUser(res.data))
        //DO SOMETHING DIFFERENT TO REDIRECT
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({error: authError}));
      })
      //DO SOMETHING DIFFERENT WITH HISTORY?
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const newUser = (email, password, streetAddress, municipality, state, zip) =>
  dispatch =>
    axios.post('http://172.16.25.113:8080/auth/signup', { email, password, streetAddress, municipality, state, zip })
      .then(res => {
        dispatch(getUser(res.data))
        //DO SOMETHING DIFFERENT TO REDIRECT
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({error: authError}));
      })
      //DO SOMETHING DIFFERENT WITH HISTORY?
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const logout = () =>
  dispatch =>
    axios.post('http://172.16.25.113:8080/auth/logout')
      .then(_ => {
        dispatch(removeUser())
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
