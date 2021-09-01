import {
  Heading,
  Button,
  Flex,
  Text,
  Box,
  SimpleGrid,
  useColorModeValue,
  Wrap,
  WrapItem,
  Center,
  Link,
  Input
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Layout from 'src/components/Layout'
import Footer from 'src/components/Footer'
/* import SerieCard from 'src/components/serie/SerieCard'
import { StarIcon } from '@chakra-ui/icons' */
import useAuth from 'src/hooks/useAuth'
import axios from 'axios'
import { addMovie } from '../lib/firebase'

async function getMovies(search) {
  try {
    const response = await axios.get(`/api/movies?search=${ search }`)
    return response?.data?.Search
  } catch (error) {
    console.error(error)
  }
  return null
}
/* async function addToFavorite(movie) {
  try {
    const response = await axios.post(`/api/movies?search=${ search }`)
    return response?.data?.Search
  } catch (error) {
    console.error(error)
  }
  return null
} */
/* const addMovie = (movie, user) => {
  db.collection('movies')
    .add({
      poster: movie.Poster,
      title: movie.Title,
      type: movie.Type,
      imdbID: movie.imdbID,
      userId: user.uid
    })
    .then((docRef) => {
      console.log(`Document written with ID: `, docRef.id)
    })
    .catch((error) => {
      console.error(`Error adding document: `, error)
    })
} */

const Cover = () => {
  const { user } = useAuth()
  const [search, setSearch] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [movies, setMovies] = useState([])
  const bgColor = useColorModeValue('#FFFFFF', '#1A202C')

  const changeSearch = (event) => {
    setSearch(event.target.value)
  }
  const handleSearch = async () => {
    // setIsSearching(!search)
    const m = await getMovies(search)
    setMovies(m)
    // console.log({movies})
  }
  const handleisSearching = () => {
    setIsSearching(!search)
  }

  const handleAddFavorite = async (fav) => {
    const added = await addMovie(fav, user)
    if (added) {
      alert('yay')
    }
  }

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
            src={movie.Poster}
            alt={movie.Title}
            width={150}
            height={150}
            title={movie.Title}
          />
          <Flex flexDirection="column" alignSelf="center">
            <Text
              fontSize="md"
              textAlign="center"
              alignSelf="center"
              fontWeight="bold"
              px="20px"
            >
              {movie.Title}
            </Text>
            <Flex>
              <Text
                fontSize="md"
                textAlign="center"
                alignSelf="center"
                fontWeight="bold"
                px="20px"
              >
                {movie.Year}
              </Text>
              <Text
                fontSize="md"
                textAlign="center"
                alignSelf="center"
                fontWeight="bold"
                px="20px"
              >
                {movie.Type}
              </Text>
            </Flex>
            <Box>
             {/* <StarIcon w={6} h={6} onClick={handleSearch} /> */}
              {user && <Button
                as="a"
                m={10}
                colorScheme="purple"
                variant="outline"
                size="lg"
                px="5"
                onClick={() => handleAddFavorite(movie)}
              >
                Add to Fav
              </Button>}
            </Box>
          </Flex>
        </Flex>
      </Flex>
    ))

  const renderDefaultCover = () => (
    <Flex px={[4, 8]} py={[0, 20]} w="full" maxW="1200px" direction="column">
      <Heading
        as="h1"
        fontSize={{ base: '42px', md: '52px', lg: '72px' }}
        mb={4}
        fontWeight="xBold"
      >
        Let's find a movie?
        <Box bgGradient="linear(to-l, #7928CA,#FF0080)" bgClip="text">
          100% free.
        </Box>
      </Heading>
      <Text fontSize={{ base: '16px', md: '20px', lg: '22px' }}>
        <Box>Keep your knowledge update with the newest </Box>
        <Box>movienologies in the market!</Box>
      </Text>
      <Box>
        <Button
          as="a"
          my={10}
          colorScheme="purple"
          variant="outline"
          size="lg"
          onClick={handleisSearching}
        >
          Get started
        </Button>
      </Box>
    </Flex>)

  const renderSearchBar = () => (<Flex px={[4, 8]} py={[0, 20]} w="full" maxW="1200px" direction="column">
      <Heading
        as="h1"
        fontSize={{ base: '42px', md: '52px', lg: '72px' }}
        mb={4}
        fontWeight="xBold"
      >
        <Flex alignItems="center">
          <Input p="5" placeholder="Search" onChange={changeSearch} />
          <Box>
            <Button
              as="a"
              my={10}
              colorScheme="purple"
              variant="outline"
              size="lg"
              p="5"
              onClick={handleSearch}
            >
              Search
            </Button>
          </Box>
        </Flex>
        <Flex p="5px" flexDirection="column">
          {renderMovies()}
        </Flex>
        <Text fontSize={{ base: '16px', md: '20px', lg: '22px' }}>
          <Box textAlign="center">Type and search!</Box>
        </Text>
      </Heading>
    </Flex>
  )
  return (
    <Box bgColor={bgColor}>
      <Flex justifyContent="center" alignItems="center" py={20}>
        {!isSearching ? renderDefaultCover() : renderSearchBar()}
      </Flex>
    </Box>
  )
}

export default function Home() {
  useEffect(() => {
    /* getMovies() */
  }, [])
  return (
    <Layout>
      <Box pb={10}>
        <Cover />
        <Footer />
      </Box>
    </Layout>
  )
}

/* export const getStaticProps = async () => {
  const movienologies = (await getAllmovienologies()) || []
  const series = (await getAllSeries()) || []
  return {
    props: {
      movienologies,
      series
    },
    revalidate: 120
  }
}
 */