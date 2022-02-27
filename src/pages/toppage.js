import '../App.css'
// import { useState, useEffect } from 'react'
// import { supabase } from './supabaseClient'
// import Auth from './Auth'
// import Account from './Account'

import React from 'react';
import { Link } from 'react-router-dom';// 追加 Linkタブを読み込む

class Toppage extends React.Component {
  render() {
    return (
      <div className="container" style={{ padding: '50px 0 100px 0' }}>
        <p className="text-5xl">Session</p>
        <Link to={`/login`}><p className="text-4xl">Login</p></Link>
      </div>
    );
  };
}

export default Toppage;
