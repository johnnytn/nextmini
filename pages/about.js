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
            <Link href="https://www.linkedin.com/in/johnnytn">
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
                Profissional apaixonado por tecnologia e um eterno aprendiz.
                Constantemente compartilhando conhecimentos para ajudar na
                formação e transformação de profissionais da área de tecnologia.
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Layout>
  )
}

export default About
