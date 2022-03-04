// import '../App.css'
// import { useState, useEffect } from 'react'
// import { supabase } from './supabaseClient'
// import Auth from './Auth'
// import Account from './Account'

import React from 'react';
import { useNavigate } from 'react-router-dom';// 追加 Linkタブを読み込む

export default function NotFoundSC(props) {
  // const navigate = useNavigate;
  render() {
    return (
      <div className="container" style={{ padding: '50px 0 100px 0' }}>
        <div>
         <h1 className="text-4xl">404 - Not Found</h1>
        </div>
        <div>
           <h3>Sorry, we can not find {props.type}<br />Maybe you 
        <div>
         <Button className="button block primary" onClick={() => useNavigate.goBack()}>Back to top page</Button>
        </div>
      </div>
    );
  };
}
