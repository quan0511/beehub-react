import { Route, Routes } from "react-router-dom"

import './App.css'

import Homepage from './pages/Homepage'
import Layout from './layouts/Layout'
import Profile from './pages/Profile/Profile'
import PeoplePage from './pages/PeoplePage'
import Searching from './pages/Search/Searching'
import Group from './pages/Group/Group'
import LoginPage from './auth/LoginPage'
import RequireAuth from './auth/RequireAuth'
import RegisterPage from './auth/RegisterPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* public routes */}
        <Route path='login' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route index element={<Homepage />} />
          <Route path='member/profile' element={<Profile />} />
          <Route path='people' element={<PeoplePage />} />
          <Route path='search' element={<Searching />} />
          <Route path='group' element={<Group />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
