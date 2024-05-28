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
import ListGroupPage from "./pages/Group/ListGroupPage"
import Layout2 from "./layouts/Layout2"
import { AccountSetting } from "./pages/Setting/AccountSetting"
import { GroupManagementPage } from "./pages/GroupManage/GroupManagementPage"

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* public routes */}
        <Route path='login' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />

        {/* protected routes */}
        {/* <Route element={<RequireAuth />}> */}
          <Route index element={<Homepage />} />
          <Route path='people' element={<PeoplePage />} />
          <Route path='search' element={<Searching />} />
          <Route path='listgroup' element={ <ListGroupPage/>}/>
        {/* </Route> */}
      </Route>
      <Route path='/member' element={<Layout2/>}>
        <Route path='profile/:username' element={<Profile/>}/>
        <Route path='account-setting' element={ <AccountSetting />}/>
      </Route>
      <Route  path='/group' element={<Layout2 />}>
        <Route path=':id' element={<Group />}/>
        <Route path='manage/:id' element={<GroupManagementPage /> } />
      </Route>
    </Routes>
  )
}

export default App
