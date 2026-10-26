import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom"

import LayoutForm from './components/Layouts/LayoutForm/LayoutForm'
import LayoutDashboard from './components/Layouts/LayoutDashboard/LayoutDashboard'

import DashBoardUser from './components/F000-UserRequest/DashBoardUser'

import SupportRequestForm from './components/F001-SuportRequest/SupportRequestForm'
import Dashboard from './components/F001-SuportRequest/Dashboard'

import Menu from './components/Layouts/Menu/Menu'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboardUser"
        element= {
          <LayoutDashboard
          Menu={
            <>
              <Menu/>
            </>
          }
          Content={
            <>
              <DashBoardUser/>            
            </>
          }
          />
        }
        />
        <Route
        path='/dashboard'
        element= {
          <LayoutDashboard
            Menu={
            <>
              <Menu/>
            </>
            }
            Content={
              <>
                <Dashboard/>
              </>
            }
          />
        }
        > 
        </Route>
        <Route
        path='/EditSuportRequest'
        element={
          <LayoutForm
            Menu={
              <>
                <Menu/>             
              </>         
            }
            Sidebar={
              <>
              </>
            }
            Content={
              <>
                <SupportRequestForm></SupportRequestForm>
              </>
            }
          />
          }
        >
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
