import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AdminLogin from './pages/AdminLogin'
import ExploreUs from './pages/ExploreUs/ExploreUs'
import LatestArticles from './pages/LatestArticles/LatestArticles'
import ServicesPage from './pages/ServicesPage/ServicesPage'
import ServiceDetails from './pages/ServiceDetails/ServiceDetails'
import Contact from './components/Contact/Contact'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/explore-us" element={<ExploreUs />} />
      <Route path="/latest-articles" element={<LatestArticles />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/services/:slug" element={<ServiceDetails />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  )
}

export default App