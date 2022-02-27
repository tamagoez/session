import '../App.css'
// import { useState, useEffect } from 'react'
// import { supabase } from './supabaseClient'
// import Auth from './Auth'
// import Account from './Account'

import React from 'react';
import { Link } from 'react-router-dom';// 追加 Linkタブを読み込む

class NotFound extends React.Component {
  render() {
    return (
      <div className="container" style={{ padding: '50px 0 100px 0' }}>
        <h1>404 - Not Found</h1>
        <Link to={`/`}><p className="text-3xl">Go to top page</p></Link>
      </div>
    );
  };
}

export default NotFound;
