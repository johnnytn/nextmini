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
  Link
} from '@chakra-ui/react'
import { useState } from 'react'
import Image from 'next/image'
import Layout from 'src/components/Layout'
import Footer from 'src/components/Footer'
import SerieCard from 'src/components/serie/SerieCard'
import { getAllTechnologies, getAllSeries } from 'src/lib/dato-cms'

const Cover = ({ technologies }) => {
  const [currentTechnologies, setTechnologies] = useState(technologies)
  const bgColor = useColorModeValue('#FFFFFF', '#1A202C')

  const handleShowAllTechnologies = () => {
    const tecs = currentTechnologies.map((t) => {
      // eslint-disable-next-line no-param-reassign
      t.defaultVisible = true
      return t
    })
    setTechnologies(tecs)
  }

  const hiddenTechnologies = currentTechnologies?.filter(
    (t) => !t.defaultVisible
  ).length

  const renderTechnologies = () =>
    currentTechnologies
      ?.filter((f) => f.defaultVisible)
      ?.map((tech) => (
        <WrapItem key={tech.name}>
          <Center
            w="100px"
            h="100px"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            flexDirection="column"
          >
            <Image
              src={tech.logo.url}
              alt={tech.name}
              width={40}
              height={40}
              title={tech.name}
            />
            <Text fontSize="sm" textAlign="center" fontWeight="bold" mt={2}>
              {tech.name}
            </Text>
          </Center>
        </WrapItem>
      ))

  const renderHiddenTechnologies = () =>
    hiddenTechnologies > 0 && (
      <WrapItem>
        <Center
          w="100px"
          h="100px"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          flexDirection="column"
        >
          <Link onClick={handleShowAllTechnologies}>
            <Text fontSize="sm" textAlign="center" fontWeight="bold" mt={2}>
              {`+${hiddenTechnologies} other`}
            </Text>
          </Link>
        </Center>
      </WrapItem>
    )

  return (
    <Box bgColor={bgColor}>
      <Flex justifyContent="center" alignItems="center" py={20}>
        <Flex
          px={[4, 8]}
          py={[0, 20]}
          w="full"
          maxW="1200px"
          direction="column"
        >
          <Heading
            as="h1"
            fontSize={{ base: '42px', md: '52px', lg: '72px' }}
            mb={4}
            fontWeight="xBold"
          >
            Coding 101
            <Box>from zero to hero </Box>
            <Box bgGradient="linear(to-l, #7928CA,#FF0080)" bgClip="text">
              100% free.
            </Box>
          </Heading>
          <Text fontSize={{ base: '16px', md: '20px', lg: '22px' }}>
            <Box>Keep your knowledge update with the newest </Box>
            <Box>technologies in the market!</Box>
          </Text>
          <Box>
            <Button
              as="a"
              my={10}
              colorScheme="purple"
              variant="outline"
              size="lg"
              href="#series"
            >
              Get started
            </Button>
          </Box>
          <Box>
            <Wrap>
              {renderTechnologies()}
              {renderHiddenTechnologies()}
            </Wrap>
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}

const Series = ({ series }) =>
  series ? (
    <Flex id="series" justify="center">
      <Flex w="full" maxW="1200px" px={[4, 8]} mt={10} direction="column">
        <Heading mb={4}>Series</Heading>
        <SimpleGrid columns={[1, null, 3]} spacing="40px">
          {(series || []).map((s) => (
            <SerieCard serie={s} key={s.id} />
          ))}
        </SimpleGrid>
      </Flex>
    </Flex>
  ) : (
    ''
  )

export default function Home({ technologies, series }) {
  // Box bg="orange" w="100%" p={4}
  return (
    <Layout>
      <Box pb={10}>
        <Cover technologies={technologies} />
        <Series series={series} />
        <Footer />
      </Box>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const technologies = (await getAllTechnologies()) || []
  const series = (await getAllSeries()) || []
  return {
    props: {
      technologies,
      series
    },
    revalidate: 120
  }
}
