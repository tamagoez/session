// import './tailwind.css'
// import './index.css'

import React from 'react';              //Reactを読み込んでいる
// import { Link } from 'react-router-dom';// 追加 Linkタブを読み込む

import { supabase } from '../supabaseClient'

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
        return (data.username)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      console.log('loaded')
    }
  }
  
  const session = supabase.auth.session();
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
          <MenuItem icon={<AddIcon />} command='⌘T'>
            New Tab
          </MenuItem>
          <MenuItem icon={<ExternalLinkIcon />} command='⌘N'>
            New Window
          </MenuItem>
          <MenuItem icon={<RepeatIcon />} command='⌘⇧N'>
            Open Closed Tab
          </MenuItem>
          <MenuItem icon={<EditIcon />} command='⌘O'>
            Open File...
          </MenuItem>
        </MenuList>
      </Menu>
        <Center>
          <Heading size='md'>Sessions</Heading>
        </Center>
        <Spacer />
        <Box>
          {!session ? <Button colorScheme='teal'>Login</Button> : <Button colorScheme='teal'>{getUsername()}</Button>}
        </Box>
      </Flex>
      <Divider />
    </div>
  )
}
