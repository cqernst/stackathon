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
    axios.post('http://192.168.1.179:8080/auth/login', { email, password })
      .then(res => {
        alert('got inside thunk!')
        dispatch(getUser(res.data))
        //DO SOMETHING DIFFERENT TO REDIRECT
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        alert('authError');
        dispatch(getUser({error: authError}));
      })
      //DO SOMETHING DIFFERENT WITH HISTORY?
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/login')
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
