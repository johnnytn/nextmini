import {
  Button,
  Flex,
  Text,
  Box,
  useColorModeValue,
  useToast
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Layout from 'src/components/Layout'
import Footer from 'src/components/Footer'
import useAuth from 'src/hooks/useAuth'
import { getMoviesByUser, removeMovie } from '../lib/firebase'

const getMovies = async (user, setMovies) => {
  if (user) {
    const movies = await getMoviesByUser(user.uid)
    setMovies(movies)
  } /* else {
    const u = await getUser('R4uyxpQeNoYIfYHdraQxNXozvp62')
    const movies = await getMoviesByUser(u.uid)
    setMovies(movies)
  } */
}

const Cover = ({ movies, onRemoveMovie }) => {
  const bgColor = useColorModeValue('#FFFFFF', '#1A202C')
  const renderMovies = () =>
    (movies || [])?.map((movie) => (
      <Flex
        key={movie.imdbID}
        p="5px"
        flexDirection="column"
        alignItems="center"
      >
        <Flex
          w="80vw"
          h="200px"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          <Image
            src={movie.poster}
            alt={movie.title}
            width={150}
            height={150}
            title={movie.title}
          />
          <Flex flexDirection="column" alignSelf="center">
            <Text
              fontSize="md"
              textAlign="center"
              alignSelf="center"
              fontWeight="bold"
              px="20px"
            >
              {movie.title}
            </Text>
            <Flex>
              <Text
                fontSize="md"
                textAlign="center"
                alignSelf="center"
                fontWeight="bold"
                px="20px"
              >
                {movie.year}
              </Text>
              <Text
                fontSize="md"
                textAlign="center"
                alignSelf="center"
                fontWeight="bold"
                px="20px"
              >
                {movie.type}
              </Text>
            </Flex>
            <Box>
              {/* <StarIcon w={6} h={6} onClick={handleSearch} /> */}
              <Button
                as="a"
                m={10}
                colorScheme="purple"
                variant="outline"
                size="lg"
                px="5"
                onClick={() => onRemoveMovie(movie)}
              >
                Remove from favorites
              </Button>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    ))

  return (
    <Box bgColor={bgColor}>
      <Flex
        justifyContent="center"
        alignItems="center"
        py={20}
        flexDirection="column"
      >
        {renderMovies()}
      </Flex>
    </Box>
  )
}

export default function Favorites() {
  const { user } = useAuth()
  const toast = useToast()
  const [movies, setMovies] = useState([])
  useEffect(() => {
    getMovies(user, setMovies)
  }, [])
  function handleRemoveMovie(movie) {
    const index = movies.findIndex((mm) => mm.uid === movie.uid)
    const newMovies = [...movies]
    newMovies.splice(index, 1)
    console.log(newMovies)
    removeMovie(movie)
    setMovies(newMovies)
    toast({
      title: movie.title,
      description: 'Removed from the favorites',
      status: 'success',
      duration: 9000,
      isClosable: true
    })
  }
  return (
    <Layout>
      <Box pb={10}>
        <Cover movies={movies} onRemoveMovie={handleRemoveMovie} />
        <Footer />
      </Box>
    </Layout>
  )
}
