import './App.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom"
import Homepage from './pages/Homepage'
import Layout from './layouts/Layout'
import Profile from './pages/Profile/Profile'
import PeoplePage from './pages/PeoplePage'
import Searching from './pages/Search/Searching'
import Group from './pages/Group/Group'

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path='/' element={<Homepage/>} />
        <Route path='/member/profile/:id' element={<Profile/>}/>
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
