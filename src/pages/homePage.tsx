import React, { useEffect, useState } from 'react'
import { Box, Checkbox, Image, Input, Radio, Select, Stack, Switch, Text } from '@chakra-ui/react'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import { Link, useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const columns = [
  {
    name: "IMDb ID",
    selector: (row:any) => row.imdbID,
    sortable: true,
    width: "120px",
    cell: (row:any) => {
      return (
        <Link to={`/detail/${row.imdbID}`}>{row.imdbID}</Link>
      )
    }
  },
  {
    name: "Poster",
    selector: (row:any) => row.Poster,
    sortable: true,
    width: "100px",
    cell: (row:any) => {
      return (
        <Link to={`/detail/${row.imdbID}`}>
          <Image src={row.Poster} h="60px" my="2.5px" />
        </Link>
      )
    }
  },
  {
    name: "Name",
    selector: (row:any) => row.Title,
    sortable: true,
    width: "350px",
    cell: (row:any) => {
      return (
        <Link to={`/detail/${row.imdbID}`}>{row.Title}</Link>
      )
    }
  },
  {
    name: "Type",
    selector: (row:any) => row.Type,
    sortable: true,
    width: "120px"
  },
  {
    name: "Year",
    selector: (row:any) => row.Year,
    sortable: true,
    width: "120px"
  },
]

const HomePage = () => {

  const [searchParams, setSearchParams] = useSearchParams()

  const [search, setSearch] = useState<string>(searchParams.get("s") ? String(searchParams.get("s")) : "pokemon")

  const [year, setYear] = useState<string>(searchParams.get("y") ? String(searchParams.get("y")) : "")
  
  const [type, setType] = useState<string>(searchParams.get("type") ? String(searchParams.get("type")) : "")
  
  const [data, setData] = useState([])

  function getData(){

    axios(`http://www.omdbapi.com/?apikey=f059145a&page=1&s=${search}&y=${year}&type=${type}`).then((res)=>{
      setData(res.data.Search)
    }).catch((err)=>{
      console.log(err)
    })
    
  }

  useEffect(()=>{

      search ? searchParams.set("s", search) : searchParams.delete("s")

      year ? searchParams.set("y", year) : searchParams.delete("y")

      type ? searchParams.set("type", type) : searchParams.delete("type")

      setSearchParams(searchParams)

    getData()
  },[search, year, type])
  
  return (
    <Box pos="relative" h="100vh">

      <Helmet>
        <title>OMDb {search ? `- Searching for: ${search}` : ""}</title>
      </Helmet>
      
      <Box pos="absolute" left="50%" top="50%" transform="translate(-50%,-50%)" w="815px" h="830px" border="1px solid #ccc">
        
        <Box display="flex" p="10px">
          <Box display="flex" alignItems="center" mr="10px">
            <Text fontSize="14px" mr="5px">Search:</Text>
            <Input w="200px" placeholder="movie/series name" fontSize="14px" p="10px" value={search} onChange={(e)=>setSearch(e.target.value)} />
          </Box>

          <Box display="flex" alignItems="center" mr="10px">
            <Text fontSize="14px" mr="5px">Year:</Text>
            <Input w="120px" placeholder="published year" fontSize="14px" p="10px" value={year} type="number" onChange={(e)=>setYear(e.target.value)} />
          </Box>

          <Box display="flex" alignItems="center" mr="10px">
            <Text fontSize="14px" mr="5px">Type:</Text>
            <Select fontSize="14px" value={type} onChange={(e)=>setType(e.target.value)}>
              <option value="">All</option>
              <option value="movie">Movies</option>
              <option value="series">Series</option>
              <option value="episodes">Episodes</option>
              <option value="game">Game</option>
            </Select>
          </Box>
        </Box>
        
        <DataTable
          columns={columns}
          data={data}
          pagination
          paginationRowsPerPageOptions={[10,25,50]}
        />
      </Box>
    </Box>
  )
}

export default HomePage