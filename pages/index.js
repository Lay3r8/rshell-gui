import React from 'react';
import Head from 'next/head'
import { Provider } from 'react-redux';
import store from '../src/store'
import Layout from "../components/layout";

function HomePage() {
  return (
    <div className='d-flex flex-column h-100 w-100 justify-content-center align-items-center'>
      <Provider store={store}>
        <Head>
          <title>Rshell GUI</title>
          <link rel='icon' href='/bash.ico' />
          <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootswatch/4.4.1/superhero/bootstrap.min.css' />
        </Head>
        <div className='row'>
          <h1 className='title'>Simple CLI</h1>
        </div>
        <Layout/>
      </Provider>
    </div>
  )
}

export default HomePage
