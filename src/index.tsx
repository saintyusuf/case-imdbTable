import React from "react"
import ReactDOM from "react-dom/client"
import { ChakraProvider } from "@chakra-ui/react"
import { HelmetProvider } from "react-helmet-async"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import HomePage from "./pages/homePage";
import DetailPage from "./pages/detailPage"


const container = document.getElementById("root")
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/detail/:imdbId" element={<DetailPage/>} />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </ChakraProvider>
  </React.StrictMode>
)