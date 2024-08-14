import React from 'react'
import PacientesList from './pages/Pacientes/PacientesList'
import {BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<PacientesList />}/>

        </Routes>
    </BrowserRouter>
  )
}

export default App