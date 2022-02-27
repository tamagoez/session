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
      　<h1 className="text-4xl">Sessions</h1>
        <Link to={`/login`} className="button block">Login or SignUp</Link>
      </div>
    );
  };
}

export default Toppage;
