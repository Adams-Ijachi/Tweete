import { useContext,useState } from 'react';
import Input from './../components/Input';
import { Link, useNavigate  } from 'react-router-dom';
import { userContext } from './../context/user';
import { signIn } from '../api/auth';




const initialFormData = Object.freeze({
  email: "",
  password: "",
});



const Login = () => {
    const {dispatch}= useContext(userContext)
    const [formData, updateFormData] = useState(initialFormData);
    const [errors, setErrors] = useState(null)
    const [disabled, setDisabled] = useState(false)

    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setDisabled(true)
        if(!formData.email){
            setErrors({message:'Input an email'})
        }
        if(!formData.password){
            setErrors({message:'Input a Password'})
        }


        try{
            const response =  await signIn(formData)
            dispatch({type:"login", payload:response.data})
            setDisabled(false)
            setErrors(null)
            navigate('/');

        }catch (err) {
            // Handle Error Here
            if(err.response){
                setErrors({message:err.response.data.msg})
                setDisabled(false)
            }
            
        } 
        
    }

    const handleChange = (e) =>{
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
          });
    }

    return ( 
        <>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <Input name={"email"}  id={"email"} value={formData.email} placeholder={"Enter Email"} handleChange={handleChange} type={"email"}/>
                <Input name={"password"}  id={"password"} value={formData.password} handleChange={handleChange} placeholder={"Enter Password"} type={"password"}/>
                { disabled ? "Loading...." :
                    <button type="submit"   className="btn btn-primary">Submit</button>
                }  
                <div className="flex">
                <small className="danger" >{errors && errors.message} </small>
              
                 <small style={{"display":"flex", alignItems:"center"}}><span>Dont't have an account ? </span> <Link  className="nav-link flex " to="/auth/register">SignUp</Link> </small>
                </div>
            </form>
        </>
     );
}
 
export default Login;