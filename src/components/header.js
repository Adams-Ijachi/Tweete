
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState , useContext} from 'react';
import { userContext } from './../context/user';
import { logout } from './../api/auth';


const Header = () => {
 
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const {dispatch}= useContext(userContext)
    const navigate = useNavigate();
    const location = useLocation();
    const handleChange = async () =>{
        try{
            const response =   await logout()
            dispatch({type:"logout"})
            navigate('/')
            setUser(null)
        }catch (err) {
            // Handle Error Here
            if(err.response){
                console.log(err.response.data.msg)
                // setErrors({message:err.response.data.msg})
               
            }
            
        } 

    }

    useEffect(()=>{


        setUser(JSON.parse(localStorage.getItem('user')))
    },[location])


    return ( 
        <>

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link  className="navbar-brand" to="/">Navbar</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <Link  className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
            </li>
          


            {
                user ?(<><li className="nav-item">
                            <Link  className="nav-link " to="/profile">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <div style={{cursor:'pointer'}} onClick={handleChange} className="nav-link">Logout</div>
                        </li></>)
                        :   <li className="nav-item">
                                <Link  className="nav-link " to="/auth/login">Login</Link>
                            </li>

            }

            {/* <li className="nav-item">
                <Link  className="nav-link " to="/auth/login">Login</Link>
            </li> */}
            </ul>
            
        </div>
        </nav>
        </>
     );
}
 
export default Header;