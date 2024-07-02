import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Box, Img, Text } from '@chakra-ui/react'
import InterfaceMovie from '../interfaces/interfaceMovie'
import { Helmet } from 'react-helmet-async'

const DetailPage = () => {

  const navigate = useNavigate()
  
  const { imdbId } = useParams()
  
  const [data, setData] = useState<InterfaceMovie>()

  function getData(){

    axios(`https://www.omdbapi.com/?apikey=f059145a&i=${imdbId}`).then((res:{data:InterfaceMovie})=>{
      setData(res.data)
    }).catch((err)=>{
      console.log(err)
    })
    
  }

  useEffect(()=>{
    getData()
  },[imdbId])
  
  return (
    <Box pos="relative" h="100vh">

      <Helmet>
        <title>IMDb - {String(data?.Title)} {String(data?.Year)}</title>
      </Helmet>
      
      <Box pos="absolute" left="50%" top="50%" p="10px" transform="translate(-50%,-50%)" w="815px" h="830px" border="1px solid #ccc">
        
        {
          data ? 
          <Box>
            <Text cursor="pointer" onClick={()=>navigate(-1)}>Back</Text>
            <Box w="fit-content" h="300px" >
              <Img src={data?.Poster} w="100%" h="100%" objectFit="cover" loading="lazy" />
            </Box>
            <Box display="flex">
              <Text mr="5px">IMDb ID:</Text>
              <Text>{data?.imdbID}</Text>
            </Box>
            <Box display="flex">
              <Text mr="5px">IMDb Rating:</Text>
              <Text>{data?.imdbRating}</Text>
            </Box>
            <Box display="flex">
              <Text mr="5px">Name:</Text>
              <Text>{data?.Title}</Text>
            </Box>
            <Box display="flex">
              <Text mr="5px">Genre:</Text>
              <Text>{data?.Genre}</Text>
            </Box>
            <Box display="flex">
              <Text mr="5px">Country:</Text>
              <Text>{data?.Country}</Text>
            </Box>
            <Box display="flex">
              <Text mr="5px">Language:</Text>
              <Text>{data?.Language}</Text>
            </Box>
            <Box display="flex">
              <Text mr="5px">Writer:</Text>
              <Text>{data?.Writer}</Text>
            </Box>
            <Box display="flex">
              <Text mr="5px">Actors:</Text>
              <Text>{data?.Actors}</Text>
            </Box>
            <Box display="flex">
              <Text mr="5px">Type:</Text>
              <Text textTransform="capitalize">{data?.Type}</Text>
            </Box>
            <Box display="flex">
              <Text mr="5px">Year:</Text>
              <Text>{data?.Year}</Text>
            </Box>
          </Box>
          :
          <Box>
            <Text>Loading...</Text>
          </Box>
        }
        
      </Box>
    </Box>
  )
}

export default DetailPage