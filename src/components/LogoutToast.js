import { createStandaloneToast } from '@chakra-ui/react'

export default function LogoutToast(){
  // const toast = useToast()
  const toast = createStandaloneToast()
  toast({
        title: 'Logout Success',
        description: 'You are not connecting to your account.',
        status: 'success',
        duration: 7000,
        isClosable: true,
      })
}
