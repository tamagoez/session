import { useState } from 'react'
import { supabase } from '../supabaseClient'

import React from 'react';
import { Link } from 'react-router-dom';// 追加 Linkタブを読み込む

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [acid, setAcid, password, setPassword] = useState('')

  const handleLogin = async (email, password) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email, password })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row flex flex-center">
      <div className="col-7 form-widget">
        <h1 className="header text-5xl">Login</h1>
        <h3 className="text-3xl">Sign in with your email or ID and password</h3>
        <div>
          <p className="description">Your email address or ID</p>
          <input
            className="inputField"
            type="text"
            placeholder="Your mail or ID"
            value={acid}
            required
            onChange={(e) => setAcid(e.target.value)}
          />
        </div>
        <div>
          <p className="description">Your password</p>
          <input
            className="inputField"
            type="password"
            placeholder="Your password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleLogin(acid, password)
            }}
            className={'button block'}
            disabled={loading}
          > 
            {loading ? <span>Loading</span> : <span>Login</span>}
          </button>
          <br />
          <Link to="/signup" className="button block">or Sign up</Link>
        </div>
      </div>
    </div>
  )
}
