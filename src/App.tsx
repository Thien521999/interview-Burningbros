import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/home'
import './styles/App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:value" element={<Home />} />
    </Routes>
  )
}

export default App
