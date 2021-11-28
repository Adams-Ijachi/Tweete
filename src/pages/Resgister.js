import Input from './../components/Input';
import { useContext,useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { userContext } from './../context/user';
import { signUp } from '../api/auth';




const initialFormData = Object.freeze({
    email: "",
    password: "",
    name:""
});

const Register = () => {
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
            return
        }
        if(!formData.name){
            setErrors({message:'Input an NAME'})
            return
        }
        
        if(!formData.password){
            setErrors({message:'Input a Password'})
            return
        }

        try{
            const response =  await signUp(formData)
            dispatch({type:"register", payload:response.data})
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
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
                <Input name={"name"}  id={"name"} value={formData.name} handleChange={handleChange} placeholder={"Enter Name"} type={"text"}/>
                <Input name={"email"}  id={"email"} value={formData.email} handleChange={handleChange} placeholder={"Enter Email"} type={"email"}/>
                <Input name={"password"}  id={"password"} value={formData.password}  handleChange={handleChange} placeholder={"Enter Password"} type={"password"}/>
                { disabled ? "Loading...." :
                    <button type="submit"   className="btn btn-primary">Submit</button>
                } 
                <div className="flex">
                <small className="danger" >{errors && errors.message} </small>

                 <small style={{"display":"flex", alignItems:"center"}}><span>Already have an account ? </span> <Link  className="nav-link flex " to="/auth/login">SignIn</Link> </small>
                </div>
        </form>
        </>
     );
}
 
export default Register;