import { useState } from 'react'
import { supabase } from '../supabaseClient'

// import { useAlert } from 'react-alert'

import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';// 追加 Linkタブを読み込む

import { MdPassword, MdAlternateEmail } from "react-icons/md";

import { createStandaloneToast, Spinner, Input, InputRightElement, InputGroup, InputLeftElement, Button  } from '@chakra-ui/react';

function AuthPage(props) {
  const [loading, setLoading] = useState(false)
  const [acid, setAcid] = useState('')
  const [password, setPassword] = useState('')
  var mailaddress = ''
  const othertype = (props.type === 'login') ? "signup" : "login";
  let navigate = useNavigate();
  
  const handleAuth = async (request_email, request_password) => {   
    var pattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;
    if (pattern.test(request_email)) {
      mailaddress = request_email
    } else {
      mailaddress = request_email + "@web-sessions.vercel.app"
    }
    
    if (props.type === 'login'){
        if ( request_password === '' ) { AuthToast('ERROR', 'Please provide your password!', 'error') } else {
          try {
            setLoading(true)
            const { error } = await supabase.auth.signIn({
            email: mailaddress,
            password: request_password});
            console.log('Login successed')
            AuthToast('Login Successed', 'You are connecting to your account', 'success')
            if (error) throw error
            } catch (error) {
              // alert(error.error_description || error.message)
              AuthToast('ERROR', error.error_description || error.message, 'error')
            } finally {
              setLoading(false)
            }
        }
    } else {
      try {
        setLoading(true)
        const { error } = await supabase.auth.signUp({
          email: mailaddress,
          password: request_password,
        });
        if (error) throw error
        AuthToast('Successed', 'Nice! Your account was confirmed!', 'success')
        
        // Generate
        //
        const user = supabase.auth.user()
        const updates = {
          id: user.id,
          username: request_email,
          statustext: '',
          avatar_url: 'default.png',
          website: '',
          signed_at: new Date(),
          last_login: new Date(),
          login_id: request_email
        }

        let { error_upsert } = await supabase.from('profiles').upsert(updates, {
          returning: 'minimal', // Don't return the value after inserting
        })

        if (error_upsert) { throw error }
        //
        // Generate Fin
        
      } catch (error) {
        // alert(error.error_description || error.message)
        AuthToast('ERROR', error.error_description || error.message, 'error')
      } finally {
        setLoading(false)
      }
    }
    var sessioncheck = supabase.auth.session();
    if (!sessioncheck) { console.log('Error occured while login!') } else { if (props.type === 'login') { navigate("/dashboard") } else { navigate("/account") }}
  }
  
  const submitOnEnter = (event) => {
    // Watch for enter key
    if (event.keyCode === 13) {
      handleAuth(acid, password);
    }
  }
  
  const [show, setShow] = useState(false)
  const changeshow = () => setShow(!show)

  return (
    <div className="row flex flex-center">
      <div className="col-7 form-widget">
        <h1 className="header text-5xl">{(props.type === 'login') ? "Login" : "Signup"}</h1>
        <div>
          <p>Email address or ID (Can use Alphabet or Number)</p>
          <InputGroup size='md'>
            <InputLeftElement
              pointerEvents='none'
              children={<MdAlternateEmail />}
            />
            <Input
              pr='4.5rem'
              type="text"
              placeholder="mail@example.com or example (Can use a~z and 0~9)"
              value={acid}
              onChange={(e) => setAcid(e.target.value)}
            />
          </InputGroup>
        </div>
        <div>
          <p>Password</p>
          <InputGroup size='md'>
            <InputLeftElement
              pointerEvents='none'
              children={<MdPassword />}
            />
            <Input
              pr='4.5rem'
              type={show ? 'text' : 'password'}
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => submitOnEnter(e)}
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={changeshow}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleAuth(acid, password)
            }}
            className={'button block primary'}
            disabled={loading}
          > 
            {loading ? <Spinner /> : <span>{props.type}</span>}
          </button>
        </div>
        <div>
          <Link to={"/" + othertype} className="button block">or {othertype}</Link>
        </div>
      </div>
    </div>
  )
}

export default function Auth(props) {
  const session = supabase.auth.session();
  // const alert = useAlert();
  return (
    <div>
      {!session ? <AuthPage type={props.type} /> : <Navigate to="/dashboard" state={'/' + props.type} />}
    </div>
  )
}

  
function AuthToast(title, description, status){
  // const toast = useToast()
  const toast = createStandaloneToast()
  var closab = ((status === 'error') ? false : true)
  toast({
        title: title,
        description: description,
        status: status,
        duration: 6000,
        isClosable: closab,
      })
}
