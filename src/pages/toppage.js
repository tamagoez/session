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
      　<h1 class="text-5xl">Sessions</h1>
        <p className="text-3xl"><Link to={`/login`}>LOGIN</Link> or <Link to={`/signup`}>SIGN UP</Link></p>
      </div>
    );
  };
}

export default Toppage;
