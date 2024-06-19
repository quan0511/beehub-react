import { Route, Routes } from "react-router-dom"

import LoginPage from './auth/LoginPage'
import RequireAuth from './auth/RequireAuth'
import RegisterPage from './auth/RegisterPage'
import Logout from "./auth/Logout"
import ShopManagement from "./administrator/pages/ShopManagement"
import RequireAdmin from "./administrator/RequireAdmin"
import AdminLayout from "./administrator/AdminLayout"
import Dashboard from "./administrator/pages/Dashboard"
import Reports from "./administrator/pages/Reports"
import Users from "./administrator/pages/Users"
import Posts from "./administrator/pages/Posts"
import Groups from "./administrator/pages/Groups"
import Layout from './layouts/Layout'
import Layout2 from "./layouts/Layout2"
import Homepage from './pages/Homepage'
import Profile from './pages/Profile/Profile'
import PostPage from './pages/Post/PostPage'
import PeoplePage from './pages/PeoplePage'
import Searching from './pages/Search/Searching'
import Group from './pages/Group/Group'
import ListGroupPage from "./pages/Group/ListGroupPage"
import { AccountSetting } from "./pages/Setting/AccountSetting"
import { GroupCreatePage } from "./pages/Group/GroupCreatePage"
import { GroupManagementPage } from "./pages/GroupManage/GroupManagementPage"
import Shop from "./pages/Shop/Shop"
import NotFoundGroup from "./pages/Group/NotFoundGroup"
import PostNote from "./components/PostNote"

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path='login' element={<LoginPage />} />
      <Route path='register' element={<RegisterPage />} />

      {/* protected routes */}
      <Route element={<RequireAuth />}>
        <Route path='logout' element={<Logout />} />

        <Route path='/' element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path='people' element={<PeoplePage />} />
          <Route path='search' element={<Searching />} />
          <Route path='listgroup' element={<ListGroupPage />} />
          <Route path="post/:id" element={<PostPage />}/>
        </Route>
        <Route path='/postnote/:postid' element={<Layout />}>
          <Route index element={<PostNote />} />

        </Route>

        <Route path='/group' element={<Layout2 />}>
          <Route path=':id' element={<Group />} />
          <Route path='manage/:id' element={<GroupManagementPage />} />
          <Route path="create-group" element={<GroupCreatePage />}/>
          <Route  element={<NotFoundGroup/>} />
        </Route>

        <Route path='/shop' element={<Layout />} >
          <Route index element={<Shop />} />
        </Route>
      
        <Route element={<RequireAdmin/>}>
          <Route path='admin' element={<AdminLayout/>}>
            <Route index element={<Dashboard />} />
            <Route path='reports' element={<Reports />} />
            <Route path='users' element={<Users />} />
            <Route path='groups' element={<Groups />} />
            <Route path='posts' element={<Posts />} />
            <Route path='shop' element={<ShopManagement />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
