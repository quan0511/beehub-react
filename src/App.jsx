import { useState } from 'react'
import './App.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom"
import Homepage from './Hompage/Homepage'
import Layout from './Layout/Layout'
import Profile from './Profile/Profile'
import PeoplePage from './People/PeoplePage'
import Searching from './Search/Searching'
import Group from './Group/Group'

function App() {
  const [count, setCount] = useState(0)
  const router = createBrowserRouter(createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path='/' element={<Homepage/>} />
        <Route path='/member/profile' element={<Profile/>}/>
        <Route path='/people' element={<PeoplePage/>}/>
        <Route path='/search' element={<Searching />}/>
        <Route path='/group' element={<Group/>}/>
      </Route>
  ))
  return (
    <>
      <div className="App" >
      <RouterProvider router={router} />
    </div>
    </>
  )
}

export default App
