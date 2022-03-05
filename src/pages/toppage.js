// import '../App.css'
// import { useState, useEffect } from 'react'
// import { supabase } from './supabaseClient'
// import Auth from './Auth'
// import Account from './Account'

import React from 'react';
// import { Link } from 'react-router-dom';// 追加 Linkタブを読み込む

import { Text, Divider, LinkBox, LinkOverlay, Stack, Box, Center } from '@chakra-ui/react'

class Toppage extends React.Component {
  render() {
    return (
      <div className="container" style={{ padding: '50px 0 100px 0' }}>
        <Stack>
          <Box p={2}>
           <Text fontSize='6xl'>Sessions</Text>
            <Text fontSize='2xl'>Way to Collaborate with your friends, grounp and etc.<br />No personal information need, just input your ID(or Email) and password!</Text>
          </Box>
          <Divider />
          <Box p={2}>
            <Text fontSize='2xl'>Let's join to your Sessions!</Text>
            <LinkBox bg='green.0' maxW='xl' p='3' borderWidth='1px' rounded='md'>
              <LinkOverlay href='/dashboard'>
                <Center>Open App</Center>
              </LinkOverlay>
            </LinkBox>
          </Box>
        </Stack>
      </div>
    );
  };
}

export default Toppage;
