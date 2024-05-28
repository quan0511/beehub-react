import './App.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes
} from "react-router-dom"
import Homepage from './pages/Homepage'
import Layout from './layouts/Layout'
import Profile from './pages/Profile/Profile'
import PeoplePage from './pages/PeoplePage'
import Searching from './pages/Search/Searching'
import Group from './pages/Group/Group'

import { useLayoutEffect, useState } from 'react'
import axios from 'axios'
import APIService from './auth/APIService'
import { Spinner } from 'react-bootstrap'
import ListGroupPage from './pages/Group/ListGroupPage'
import { AccountSetting } from './pages/Setting/AccountSetting'
import Layout2 from './layouts/Layout2'
import { GroupManagementPage } from './pages/GroupManage/GroupManagementPage'

function App() {
  const [user, setUser] = useState();
  useLayoutEffect(() => {
    axios.get(`${APIService.URL_REST_API}/user/6`).then((res)=>{
      setUser(res.data);
    });
  },[]);

  const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path='/' element={<Layout appUser={user} />}>
        <Route index element={<Homepage appUser={user}/>} />
        <Route path='people' element={<PeoplePage appUser={user}/>}/>
        <Route path='search' element={<Searching  appUser={user}/>}/>
        <Route path='listgroup' element={ <ListGroupPage  appUser={user}/>}/>
      </Route>
      <Route path='/member' element={<Layout2  appUser={user}/>}>
        <Route path='profile/:username' element={<Profile appUser={user}/>}/>
        <Route path='account-setting' element={ <AccountSetting appUser={user} />}/>
      </Route>
      <Route  path='/group' element={<Layout2  appUser={user}/>}>
        <Route path=':id' element={<Group  appUser={user}/>}/>
        <Route path='manage/:id' element={<GroupManagementPage appUser={user} /> } />
      </Route>

    </Route>
  ))
  return (
    <>
      <div className="App" >
        {
          user!=null?
            <RouterProvider router={router} />
          :
          <div className='d-flex justify-content-center align-items-center' style={{height:"500px"}}>
            <Spinner animation="border"  role="status" >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        }
      </div>
    </>
  )
}

export default App
