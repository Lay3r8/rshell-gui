import {createStore} from 'redux';

const initialState = {
  previous_cmd: ''
};

function reducer (state = initialState, action) {
  switch (action.type) {
    case 'PREVIOUS_CMD':
      return Object.assign({}, state, {
        previous_cmd: state.previous_cmd.concat(action.previous_cmd + '\r\n')
      })
    case 'RESET':
      return Object.assign({}, state, {
        previous_cmd: ''
      })
    default:
      return state;
  }
}

const store = createStore(reducer);
export default store;
