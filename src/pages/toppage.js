import '../App.css'
// import { useState, useEffect } from 'react'
// import { supabase } from './supabaseClient'
// import Auth from './Auth'
// import Account from './Account'

import React from 'react';

class Toppage extends React.Component {
  render() {
    return (
      <div className="container" style={{ padding: '50px 0 100px 0' }}>
        <p className="text-5xl">Session</p>
        <Link to={`/login`} className="text-3xl">Login</Link>
      </div>
    );
  };
}

export default Toppage;
