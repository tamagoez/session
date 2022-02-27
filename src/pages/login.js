import { useState } from 'react'
import { supabase } from '../supabaseClient'

import React from 'react';
import { Link } from 'react-router-dom';// 追加 Linkタブを読み込む

import { MdPassword, MdAlternateEmail } from "react-icons"

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
        <div>
          <p className="description"><MdAlternateEmail /> Email address or ID</p>
          <input
            className="inputField"
            type="text"
            placeholder="mail@example.com or example"
            value={acid}
            required
            onChange={(e) => setAcid(e.target.value)}
          />
        </div>
        <div>
          <p className="description"><MdPassword /> Password</p>
          <input
            className="inputField"
            type="password"
            placeholder="password"
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
