import React, { useEffect, useState } from 'react'
import { Box, Checkbox, Heading, Image, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, Select, Stack, Switch, Text } from '@chakra-ui/react'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import { Link, useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import TableComponent from '../components/table.component'

const HomePage = () => {

  const [searchParams, setSearchParams] = useSearchParams()
  const search = () => {
    const get = searchParams.get("search") ?? ""
    const set = (value:string) => {
      value ? searchParams.set("search", value) : searchParams.delete("search")
      page().set("1")
      setSearchParams(searchParams)
    }
    return {get, set} as const
  }
  const year = () => {
    const get = searchParams.get("year") ?? ""
    const set = (value:string) => {
      value ? searchParams.set("year", value) : searchParams.delete("year")
      page().set("1")
      setSearchParams(searchParams)
    }
    return {get, set} as const
  }
  const type = () => {
    const get = searchParams.get("type") ?? ""
    const set = (value:string) => {
      value ? searchParams.set("type", value) : searchParams.delete("type")
      page().set("1")
      setSearchParams(searchParams)
    }
    return {get, set} as const
  }
  const page = () => {
    const get = searchParams.get("page") ?? "1"
    const set = (value:string) => {
      value ? searchParams.set("page", value) : searchParams.delete("page")
      setSearchParams(searchParams)
    }
    return {get, set} as const
  }
  const [pages, setPages] = useState<number>(1)
  const [results, setResults] = useState<number>(0)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    if(!search().get)
    search().set("pokemon")
  },[])

  useEffect(()=>{
    getData()
  },[search().get, year().get, type().get, page().get])

  function getData(){

    setLoading(true)

    axios(`http://www.omdbapi.com/?apikey=f059145a&s=${search().get}&y=${year().get}&type=${type().get}&page=${page().get}`).then((res)=>{
      setData(res.data.Search)
      setResults(res.data.totalResults)
      setPages(Math.ceil(Number(res.data.totalResults)/10))
    }).catch((err)=>{
      console.log(err)
    }).finally(()=>{
      setLoading(false)
    })
    
  }
  
  return (
    <Box pos="relative" h="100vh">

      <Helmet>
        <title>IMDb {search ? `- ${search().get}` : ""}</title>
      </Helmet>

      <Box pos="relative" h="100vh">
      
        <Box pos="absolute" left="50%" top="50%" transform="translate(-50%,-50%)" >
          <TableComponent 
            search={search}
            year={year}
            type={type}
            page={page}
            pages={pages}
            results={results}
            data={data}
            loading={loading}
          />
        </Box>

      </Box>
      
    </Box>
  )
}

export default HomePage