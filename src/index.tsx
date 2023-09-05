import "../styles/globals.css"
import React from 'react'
import {createRoot} from 'react-dom/client'
import MusicPage from "./MusicPage"

const container = document.getElementById('root')!
const root = createRoot(container)
root.render(<MusicPage />)