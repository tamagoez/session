import { createStandaloneToast } from '@chakra-ui/react'

export default function AlertToast(title, description, status, duration){
  // const toast = useToast()
  const toast = createStandaloneToast()
  var closab = ((status === 'error') ? false : true)
  toast({
        title: title,
        description: description,
        status: status,
        duration: duration,
        isClosable: closab,
      })
}
