import React from 'react'
import NextLink from 'next/link'
import { Link, Flex } from '@chakra-ui/react'
/* position: absolute;
    bottom: 0;
    width: 100%; */
const Footer = () => (
  <Flex mb={8} mt={24} justify="center" position="absolute" bottom="0" w="100%">
    <NextLink href="/privacy" passHref>
      <Link fontSize="sm" mr={4} fontWeight="medium" color="gray.500">
        Privacy
      </Link>
    </NextLink>
    {/*  <Link
      fontSize="sm"
      mr={4}
      fontWeight="medium"
      color="gray.500"
      target="_blank"
      href="https://www.youtube.com/channel/xxxxxx"
    >
      YouTube
    </Link> */}
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
      href="https://www.linkedin.com/in/johnny-goncalves-de-santana-33b040a4"
    >
      LinkedIn
    </Link>
  </Flex>
)

export default Footer
