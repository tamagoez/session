import { useState } from 'react'
import { supabase } from '../supabaseClient'
import React from 'react';
// import { Link, Navigate } from 'react-router-dom';// 追加 Linkタブを読み込む
import { Navigate, useParams } from 'react-router-dom';
// import { MdPassword, MdAlternateEmail } from "react-icons/md";

// import { GetLog } from '../lib/GetLog';
// import { CheckRole } from '../lib/CheckRole';

import { Getmes } from '../lib/Message';
import { Textarea, Button } from '@chakra-ui/react';
import AlertToast from '../components/AlertToast'

import { IoSend } from "react-icons/io5";
import BeatLoader from "react-spinners/BeatLoader";

export default function Chat(props) {
  var session = supabase.auth.session();
  const { cid } = useParams();
  return (
    <div>
      {!session ? <Navigate to="/login" state={'/app/chat/' + cid} /> : <CoreChat chid={cid} />}
    </div>
  )
}

function CoreChat(props) {
  // Prepare
  // const [loading, setLoading] = useState(false)
  // console.log('Loading: ' + loading)
  // setLoading(true)
  
  const chid = props.chid
  console.log('channelID: ' + chid)
  var session = supabase.auth.session();
  
  // console.log('User session: ' + session)
  
  const userid = session.user.id;
  console.log('userID: ' + userid)
  
  // const navigate = useNavigate();
  // setLoading(false)
  
  // useEffect(() => {
  //   console.log('Load: ' + loading)
  // }, [loading])
  
  CheckRole()
  // GetLog()
  
  // const { messages } = Getmes({ chid })
  
  function CheckRole() {
    console.log('id is ' + userid)
  }
  
  const [sendtext, setSendText] = useState(null)
  const [sendstatus, setSendStatus] = useState(false)
    
  function sendMes() {
    const user = supabase.auth.user()
    setSendStatus(true);
    console.log('Sending message: ' + sendtext);
    async function senddeal(){
      try {
        const { error, status } = await supabase
          .from('channels_chat')
          .insert([
            { userid: user.id, message: sendtext, channel: chid }
          ],{ upsert: false })
        if (error && status !== 406) {
          throw error
        }
      } catch (error) {
        AlertToast('ERROR', error.message, 'error', 6000)
      } finally {
        setSendStatus(false)
      }
    }
    senddeal();
  }
  
    function MessageBox(){
      return (
        <>
          <Textarea
            placeholder='Here is a sample placeholder'
            size='md'
            resize='none'
            onChange={(e) => setSendText(e.target.value)}
          />
          <Button
            isLoading={sendstatus}
            colorScheme='green'
            spinner={<BeatLoader size={8} color='white' />}
            onClick={() => sendMes()}
          >
            <IoSend />
          </Button>
        </>
      )
  }

  return (
    <div>
      <Getmes id={chid} />
      <MessageBox />
    </div>
   )
}
