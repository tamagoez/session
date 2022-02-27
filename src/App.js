import './App.css'
// import { useState, useEffect } from 'react'
// import { supabase } from './supabaseClient'
// import Auth from './Auth'
// import Account from './Account'
import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      <p className="text-1xl">{useLocation()}</p>
      <p className="text-2xl">Session</p>
      <a href="login">Login</a>
    </div>
  )
}
