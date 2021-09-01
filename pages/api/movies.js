import axios from 'axios'

const getMovies = async (search) => {
  const { OMD_API } = process.env
  const params = `&s=${search}`
  const url = `http://www.omdbapi.com/?apikey=${OMD_API}${params}`
  const response = await axios.post(url, {})
  return response.data
}

export default async (req, res) => {
  let data
  if (req.method === 'POST') {
    // Process a POST request
  } else {
    data = await getMovies(req.query.search)
    // Handle any other HTTP method
  }
  res.send(data)
}
