import React from 'react';
import Head from 'next/head'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import RshellGui from '../components/rshell-gui';

console.log('INIT');

// ---------- See how to move all the counter business logic in counter.js ---------- //
const initialState = {
  content: ''
};

function rshell_gui_reducer(state= initialState, action) {
  console.log('reducer ', state, action);
  switch (action.type) {
    case 'SEND':
      return {content: action.content};
    case 'RES':
      return {content: ''};
    default:
      return state;
  }
}

const rshell_gui_store = createStore(rshell_gui_reducer);

function HomePage() {
  return (
    <div className='d-flex h-100 w-100 justify-content-center align-items-center'>
      <Head>
        <title>Rshell GUI</title>
        <link rel='icon' href='/bash.ico' />
        <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootswatch/4.4.1/superhero/bootstrap.min.css' />
      </Head>
      <Provider store={rshell_gui_store}>
        <div className='align-middle'>
          <div>
            <RshellGui />
          </div>
        </div>
      </Provider>
    </div>
  )
}

export default HomePage
