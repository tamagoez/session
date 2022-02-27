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
        <div>
         <h1 className="text-5xl">404 - Not Found</h1>
        </div>
        <div>
         <Link to={`/`} className="button block">Back to top page</Link>
        </div>
      </div>
    );
  };
}

export default NotFound;
