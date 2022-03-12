import { useState } from 'react'
import { supabase } from '../supabaseClient'

// import { useAlert } from 'react-alert'

import React from 'react';
import LogoutToast from '../components/LogoutToast'

// import { Spinner } from '@chakra-ui/react'
import { createStandaloneToast, Spinner } from '@chakra-ui/react'

function LogoutProcess() {
  supabase.auth.signOut()
  const sessioncheck = supabase.auth.session();
  if (!sessioncheck) {
    LogoutToast()
    window.location.replace("/thanks")
  } else { AuthToast('Signout Failed', 'Something error happend. Please reload this page.', 'error') }
}
  

export default function Logout() {
  const session = supabase.auth.session();
  // const alert = useAlert();
  return (
    <div>
      <p>Dealing Logout process...<br />After a second, you will redirect to thanks page.</p>
      <Spinner
        thickness='4px'
        speed='0.4s'
        emptyColor='gray.100'
        color='green.500'
        size='xl'
      />
      {!session ? window.location.replace("/login?after=/logout") : <LogoutProcess />}
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
