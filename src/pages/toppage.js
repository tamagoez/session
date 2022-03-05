// import '../App.css'
// import { useState, useEffect } from 'react'
// import { supabase } from './supabaseClient'
// import Auth from './Auth'
// import Account from './Account'

import React from 'react';
// import { Link } from 'react-router-dom';// 追加 Linkタブを読み込む

import { Text, Divider, LinkBox, LinkOverlay, Stack, Box } from '@chakra-ui/react'

class Toppage extends React.Component {
  render() {
    return (
      <div className="container" style={{ padding: '50px 0 100px 0' }}>
        <Stack>
          <Box>
           <Text fontSize='6xl'>Sessions</Text>
            <Text fontSize='2xl'>Way to Collaborate with your friends, grounp and etc.<br />No personal information need, just input your ID(or Email) and password!</Text>
          </Box>
          <Divider />
          <Box>
            <Text fontSize='2xl'>Let's join to your Sessions!</Text>
            <LinkBox bg='green.100' maxW='sm' p='3' borderWidth='1px' rounded='md'>
              <LinkOverlay href='/dashboard'>
                Open App
              </LinkOverlay>
            </LinkBox>
          </Box>
        </Stack>
      </div>
    );
  };
}

export default Toppage;
