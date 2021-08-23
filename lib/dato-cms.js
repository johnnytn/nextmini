const API_URL = process.env.DATOCMS_API_URL || 'https://graphql.datocms.com/'
const API_TOKEN = process.env.DATOCMS_READ_ONLY_API_TOKEN || 'f8e027a31bd5f61f8eff1511084371'

async function fetchCmsAPI(query, { variables } = {}) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`
    },
    body: JSON.stringify({
      query,
      variables
    })
  })

  const json = await res.json()
  if (json.errors) {
    throw new Error('Failed to fetch API')
  }

  return json.data
}

export async function getAllTechnologies() {
  const data = await fetchCmsAPI(`
    {
      allTechnologies {
        id
        name
        visible
        logo {
          url(imgixParams: {fm: jpg, fit: crop, w: 120, h: 120})
        }
      }
    }
  `)

  return data.allTechnologies
}
export async function getAllSeries() {
  const data = await fetchCmsAPI(`
    {
      allSeries {
        id
        name
        slug
        description
        seriesType
        thumbUrl {
          id
          url
        }
        seasons {
          id
        }
      }
    }
  `)

  return data.allSeries
}

export async function getAllFullSeries() {
  const data = await fetchCmsAPI(`
  {
    allSeries {
      id
      name
      slug
      description,
      updatedAt
      thumbUrl {
        url
      }
      features {
        name
      }
      seasons {
        id
        slug
        name
        description
        episodes {
          id
          slug
          name
          description
          videoUrl 
          author {
            id
          }
          videoTime
          thumbUrl {
            id
          }
        }
      }
    }
  }
`)

  return data.allSeries
}
export default { getAllTechnologies, getAllSeries, getAllFullSeries }
