

const Input = (props) => {
    const {label, type , name , placeholder,handleChange,value } = props
    return ( 
        <>
         <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input type={type} className="form-control" id={name} onChange={handleChange} value={value} placeholder={placeholder} name={name} />
        </div>
        </>
     );
}
 
export default Input;