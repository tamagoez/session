// import './tailwind.css'
// import './index.css'

import React from 'react';              //Reactを読み込んでいる
// import { Link } from 'react-router-dom';// 追加 Linkタブを読み込む

import { supabase } from '../supabaseClient'

import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Box,
  Spacer,
  IconButton,
  Heading,
  Button,
  Center,
  Divider
} from '@chakra-ui/react'

import {
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon,
  HamburgerIcon
} from '@chakra-ui/icons'

export default function NavBar() {
  const navigate = useNavigate();
  const [ username, setUsername ] = useState(null)
  async function getUsername() {
    const user = supabase.auth.user();
    try {
      let { data, error, status } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single()

        if (error && status !== 406) {
          throw error
        }
      if (data) {
        setUsername(data.username)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      console.log('loaded')
    }
  }
  getUsername();
  
  const session = supabase.auth.session();
  
  if (!session) { 
    return (
      <div>
        <Flex>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<HamburgerIcon />}
            variant='outline'
          />
          <MenuList>
            <MenuItem icon={<EditIcon />} command='⌘O' onClick={() => navigate('/login')}>
              Login
            </MenuItem>
            <MenuItem icon={<AddIcon />} command='⌘O' onClick={() => navigate('/signup')}>
              Sign Up
            </MenuItem>
          </MenuList>
        </Menu>
          <Center>
            <Heading size='md'>Sessions</Heading>
          </Center>
          <Spacer />
          <Box>
            <Button colorScheme='teal'>Login</Button>
          </Box>
        </Flex>
        <Divider />
      </div>
    )
  } else {
    return (
        <div>
          <Flex>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<HamburgerIcon />}
              variant='outline'
            />
            <MenuList>
              <MenuItem icon={<ExternalLinkIcon />} command='⌘N' onClick={() => navigate('/dashboard')}>
                Dashboard
              </MenuItem>
              <MenuItem icon={<AddIcon />} command='⌘T'>
                New Session
              </MenuItem>
              <MenuItem icon={<RepeatIcon />} command='⌘⇧N'>
                Reload
              </MenuItem>
              <MenuItem icon={<EditIcon />} command='⌘O' onClick={() => navigate('/account')}>
                Edit account settings
              </MenuItem>
            </MenuList>
          </Menu>
            <Center>
              <Heading size='md'>Sessions</Heading>
            </Center>
            <Spacer />
            <Box>
              <Button colorScheme='teal'>{username}</Button>
            </Box>
          </Flex>
          <Divider />
        </div>
      )
    }
}
