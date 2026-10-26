import {Link} from "react-router-dom"
import logo from "../../F001-SuportRequest/Img/Log.png";

const Menu = () => {
  return (
    <>
        <div className="d-flex flex-column flex-sm-row justify-content-start gap-2 align-items-center">
            <img src={logo} height="55px"></img>
            <nav><Link to="/dashboard">DashBoad</Link></nav>
        </div>
    </>
  )
}

export default Menu
