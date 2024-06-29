import { useEffect, useState } from 'react'
import { Box, Image, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Text } from '@chakra-ui/react'
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
          <Image src={row.Poster} h="60px" my="2.5px" objectFit="contain" />
        </Link>
      )
    }
  },
  {
    name: "Name",
    selector: (row:any) => row.Title,
    sortable: true,
    width: "500px",
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

interface ITable{
  search: () => {get:string, set:(value:string)=>void}
  year: () => {get:string, set:(value:string)=>void}
  type: () => {get:string, set:(value:string)=>void}
  page: () => {get:string, set:(value:string)=>void}
  pages: number
  results: number
  data: any[]
  loading: boolean
}

const TableComponent = (params:ITable) => {

  const { search, year, type, page, pages, results, data, loading } = params
    
  return (    
    <Box w="991px" h="774px" border="1px solid #ccc">
      
      <Box display="flex" p="10px">
        <Box display="flex" alignItems="center" mr="10px">
          <Text fontSize="14px" mr="5px">Search:</Text>
          <Input w="140px" placeholder="movie/series name" fontSize="14px" p="10px" value={search().get} onChange={(e)=>search().set(e.target.value)} />
        </Box>

        <Box display="flex" alignItems="center" mr="10px">
          <Text fontSize="14px" mr="5px">Year:</Text>
          <Input w="120px" placeholder="published year" fontSize="14px" p="10px" value={year().get} type="number" onChange={(e)=>year().set(e.target.value)} />
        </Box>

        <Box display="flex" alignItems="center" mr="10px">
          <Text fontSize="14px" mr="5px">Type:</Text>
          <Select fontSize="14px" w="100px" value={type().get} onChange={(e)=>type().set(e.target.value)}>
            <option value="">All</option>
            <option value="movie">Movies</option>
            <option value="series">Series</option>
            <option value="episodes">Episodes</option>
            <option value="game">Game</option>
          </Select>
        </Box>

        <Box display="flex" alignItems="center">
          <Text fontSize="14px" mr="5px">Page:</Text>
          <NumberInput min={1} max={pages} w="80px" value={page().get} onChange={(value)=>(Number(value) > 1 || Number(value) < pages) && page().set(value)}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Text fontSize="14px" mx="5px" >(Results: {results ? results : 0}, Pages: {pages ? pages : 0})</Text>
        </Box>
      </Box>
      
      <DataTable
        columns={columns}
        data={data}
        progressPending={loading}
        progressComponent={
          <Box w="100%" h="600px" display="flex" justifyContent="center" alignItems="center">
            <Text>Loading...</Text>
          </Box>
        }
      />
    </Box>
  )
}

export default TableComponent