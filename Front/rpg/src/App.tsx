import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import GerarPersonagem from './pages/GerarPersonagem'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gerar" element={<GerarPersonagem />} />
    </Routes>
  )
}

export default App