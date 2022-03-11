// import './tailwind.css'
// import './index.css'

import React from 'react';              //Reactを読み込んでいる
// import { Link } from 'react-router-dom';// 追加 Linkタブを読み込む

import { useNavigate } from 'react-router-dom';

import { supabase } from '../supabaseClient'

import { useState, useEffect } from 'react'

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
  Divider,
  Avatar,
  AvatarBadge
} from '@chakra-ui/react'

import {
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon,
  HamburgerIcon
} from '@chakra-ui/icons'

export default function NavBar() {
  const [ username, setUsername ] = useState(null)
  const user = supabase.auth.user();
  async function getUsername() {
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
  
  const session = supabase.auth.session();
  
  const navigate = useNavigate();
  
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
            <MenuItem icon={<EditIcon />} command='⌘O'>
              Login
            </MenuItem>
            <MenuItem icon={<EditIcon />} command='⌘O'>
              Sign Up
            </MenuItem>
          </MenuList>
        </Menu>
          <Center>
            <Heading size='md'>Sessions</Heading>
          </Center>
          <Spacer />
          <Box onClick={() => navigate('login')}>
            <Button colorScheme='teal'>Login</Button>
          </Box>
        </Flex>
        <Divider />
      </div>
    )
  } else {
    // getUsername()
    async function downloadImage(path) {
      const [avatarUrl, setAvatarUrl] = useState(null)
      try {
        const { data, error } = await supabase.storage.from('avatars').download(path)
        if (error) {
          throw error
        }
        const url = URL.createObjectURL(data)
        setAvatarUrl(url)
      } catch (error) {
        console.log('Error downloading image: ', error.message)
      }
    }
    
    async function getIcon() {
      const [icon, setIcon] = useState(null)
      try{
        let { data, error, status } = await supabase
            .from('profiles')
            .select('avatar_url')
            .eq('id', user.id)
            .single()
        
        if (error && status !== 406) {
          throw error
        }

        if (data) {
          setIcon(data.avatar_url)
        }
        downloadImage(icon);
      } catch (error) {
        alert(error.message)
      } finally {
        console.log('Icon load Finished')
      }
    }

    getIcon();
    
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
              <MenuItem icon={<ExternalLinkIcon />} command='⌘N'>
                Dashboard
              </MenuItem>
              <MenuItem icon={<AddIcon />} command='⌘T'>
                New Session
              </MenuItem>
              <MenuItem icon={<RepeatIcon />} command='⌘⇧N'>
                Reload
              </MenuItem>
              <MenuItem icon={<EditIcon />} command='⌘O'>
                Edit account settings
              </MenuItem>
            </MenuList>
          </Menu>
            <Center>
              <Heading size='md'>Sessions</Heading>
            </Center>
            <Spacer />
            <Box onClick={() => navigate('account')}>
              <Avatar>
                <AvatarBadge boxSize='1em' bg='green.500' src={avatarUrl} />
              </Avatar>
            </Box>
          </Flex>
          <Divider />
        </div>
      )
    }
}
