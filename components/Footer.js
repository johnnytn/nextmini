import React from 'react'
import NextLink from 'next/link'
import { Link, Flex } from '@chakra-ui/react'

const Footer = () => (
  <Flex mb={8} mt={24} justify="center">
    <NextLink href="/privacy" passHref>
      <Link fontSize="sm" mr={4} fontWeight="medium" color="gray.500">
        Privacy
      </Link>
    </NextLink>
    <Link
      fontSize="sm"
      mr={4}
      fontWeight="medium"
      color="gray.500"
      target="_blank"
      href="https://www.youtube.com/channel/xxxxxx"
    >
      YouTube
    </Link>
    <Link
      fontSize="sm"
      mr={4}
      fontWeight="medium"
      color="gray.500"
      target="_blank"
      href="https://www.instagram.com/johnnytn_gs"
    >
      Instagram
    </Link>
    <Link
      fontSize="sm"
      mr={4}
      fontWeight="medium"
      color="gray.500"
      target="_blank"
      href="https://www.linkedin.com/in/johnnytn"
    >
      LinkedIn
    </Link>
  </Flex>
)

export default Footer
