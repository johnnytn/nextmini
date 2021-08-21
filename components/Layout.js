import { Box, Flex, useColorModeValue, Button } from '@chakra-ui/react'
import Topbar from './Topbar'

function Layout({ children }) {
  const bgColor = useColorModeValue('#F4F6F8', '#1A202C')
  return (
    <Box bgColor={bgColor} minH="100vh" w="100vw">
      <Topbar />
      <Flex flexDirection="column" pt="62px">
        {children}
      </Flex>
      {/* Layout padrão: {children} */}
    </Box>
  )
}

export default Layout