
import { useEffect,useState } from 'react';


const Profile = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

    useEffect(()=>{

        setUser(JSON.parse(localStorage.getItem('user')))
    },[])

    const date = new Date(Date.parse(user.created_at)).toDateString()
    

    return (  
        <>


            <h1>Profile</h1>

            <div className="card text-center">
            <div className="card-header">
                {
                    user.email
                }
            </div>
            <div className="card-body">
                <h5 className="card-title">{
                    user.username
                }</h5>
               
            </div>
            <div className="card-footer text-muted">
               { date }
            </div>
            </div>
  

        </>
    );
}
 
export default Profile;