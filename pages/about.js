/* eslint-disable react/no-unescaped-entities */
import Layout from 'src/components/Layout'
import {
  Avatar,
  Box,
  Flex,
  Heading,
  Text,
  Icon,
  Stack,
  Link
} from '@chakra-ui/react'
import { FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'

function About() {
  return (
    <Layout>
      <Box>
        <Flex
          justifyContent="center"
          alignItems="center"
          h={['20vh', '40vh']}
          w="100%"
          minW="100%"
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          direction="column"
        >
          <Heading as="h3" size="xl" mb={2}>
            @johnnytn_gs
          </Heading>
          <Stack direction="row" spacing={2}>
            <Link href="https://www.instagram.com/johnnytn_gs">
              <Icon w={6} h={6} as={FaInstagram} />
            </Link>
            <Link href="https://www.linkedin.com/in/johnny-goncalves-de-santana-33b040a4">
              <Icon w={6} h={6} as={FaLinkedin} />
            </Link>
            <Link href="https://www.youtube.com/channel/xxxx">
              <Icon w={6} h={6} as={FaYoutube} />
            </Link>
          </Stack>
        </Flex>
        <Flex justify="center">
          <Flex
            w="full"
            maxW="1200px"
            px={[4, 8]}
            direction="column"
            position="relative"
          >
            <Box top="-8" position="absolute">
              <Avatar size="xl" src="/avatar.jpeg" />
            </Box>
            <Box ml="105px" mt={1}>
              <Heading as="h3" size="md">
                Johnny Gonçalves de Santana
              </Heading>
              <Text fontSize="sm">Fullstack Developer</Text>
            </Box>
            <Box mt={10}>
              <Text fontSize="sm">
                "What We people look for when we are looking for a job?" I think
                we always ask It, but we usually try to turn an easy answer into
                a multi-head monster. And most of the time the answer is simple,
                We are looking for a challenge, somewhere we can learn more each
                day. A place we can give and ask for help with no second
                thoughts. And I am not just saying a place with good practices
                and the top tech, They too are always needed but what is It
                without the real hard-working people behind it? Without
                coworkers that you can almost call them family?
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Layout>
  )
}

export default About
