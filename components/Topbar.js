import NextLink from 'next/link'
import {
  Flex,
  Link,
  useColorMode,
  useColorModeValue,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Heading
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import useAuth from 'src/hooks/useAuth'
import withAuthModal from './Auth'

function Topbar({ openAuthModal }) {
  const { user, signout } = useAuth()
  const { colorMode, toggleColorMode } = useColorMode()
  const bg = useColorModeValue('#FFFFFF', '#1A202C')
  const color = useColorModeValue('#1A202C', '#EDEEEE')
  const borderColor = useColorModeValue('#DDD', '#27272A')

  return (
    <Flex
      mb={[8, 16]}
      w="full"
      position="fixed"
      zIndex={99999}
      bgColor={bg}
      color={color}
      borderBottom={`1px solid ${borderColor}`}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        pt={4}
        pb={4}
        maxW="1200px"
        margin="0 auto"
        w="full"
        px={[4, 8]}
        h="60px"
      >
        <Flex alignItems="center">
          <NextLink href="/" passHref>
            <Link>
              <Heading size="md" mr={4} display={['none', 'block']}>
                nextmini.vercel.app
              </Heading>
            </Link>
          </NextLink>
          <NextLink href="/" passHref>
            <Link mr={4}>Home</Link>
          </NextLink>
          <NextLink href="/#series" passHref>
            <Link mr={4}>Series</Link>
          </NextLink>
          <NextLink href="/about" passHref>
            <Link>About</Link>
          </NextLink>
        </Flex>
        <Flex justifyContent="center" alignItems="center">
          {user ? (
            <Menu>
              <MenuButton
                as={Avatar}
                mr={6}
                name={user.name}
                src={user.photoUrl}
                size="sm"
              />
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuItem>My videos</MenuItem>
                <MenuItem onClick={() => signout()}>Sign out</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button mr={6} onClick={() => openAuthModal()}>
              Sign in
            </Button>
          )}
          {colorMode === 'light' ? (
            <MoonIcon w={6} h={6} onClick={toggleColorMode} />
          ) : (
            <SunIcon w={6} h={6} onClick={toggleColorMode} />
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default withAuthModal(Topbar)
