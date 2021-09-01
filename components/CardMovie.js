import { Button, Flex, Text, Box } from '@chakra-ui/react'
import Image from 'next/image'

function CardMovie({ movie, handleAddFavorite, user }) {
  return (
    <Box>
      <Box pb={10}>
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
                {user && (
                  <Button
                    as="a"
                    m={10}
                    colorScheme="purple"
                    variant="outline"
                    size="lg"
                    px="5"
                    onClick={() => handleAddFavorite(movie)}
                  >
                    Add to Favorite
                  </Button>
                )}
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}

export default CardMovie
