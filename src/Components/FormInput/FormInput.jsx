import React,{useState} from 'react';
import "./FormInput.css";
const FormInput =(props) =>{
  const [focused,setFocused]=useState(false);
  const {label,errorMessage, onChange, id, ...Ip} = props;
  const handleFocus = (e) => {
    setFocused(true);
  }
  return (
    <div className='FormInput'>
      <label>{label}</label>
        <input {...Ip} onChange={onChange} onBlur={handleFocus} onFocus={()=>Ip.name==="confirmPassword" && setFocused(true)} focused={focused.toString()}/>
        <span className='errorMessage'>{errorMessage}</span>
    </div>
  )
}

export default FormInput