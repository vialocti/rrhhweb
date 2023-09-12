import React,{ useState } from 'react'
import Swal from 'sweetalert2'
import App from '../../App'
import '../../css/login.css'

const LoginPage = () => {
    
  const [login, setLogin] = useState(false)
  const [user, setUser] =useState('')
  const [passw, setPassw] = useState('')
    

  const onHandleChangeU = (e)=>{
      setUser(e.target.value)
  }

  const onHandleChangeP = (e)=>{
    setPassw(e.target.value)
}

  const onHandleSubmit = (e)=>{
      e.preventDefault()
      if (user === 'rrhh.fce.uncu.edu.ar' && passw === 'bombita-2413'){
        //if (user === 'rrhh.fce.uncu.edu.ar' && passw === 'a'){
          setLogin(true)
      
        }else{
          Swal.fire({
            title:'Login',
            text:'Datos Incorrectos',
            icon:'error'
          })
          setPassw('')
          setUser('')
        }
    }




 return (
 
    <>
    
    
     
  { login ?
    <App />
    :
    <div>
      <div className="login">
          
	        
          <h1>Login</h1>
          <form onSubmit={onHandleSubmit}>
    	        <input  
              className='inputU' 
              type="text" 
              id="u" 
              placeholder="Username" 
              required="required" 
              value={user}
              onChange={onHandleChangeU}
              />
              
              <input  
              className='inputU' 
              type="password" 
              id="p" placeholder="Password" 
              required="required"
              value={passw}
              onChange={onHandleChangeP}
              />
              
              <button type="submit" className="btn btn-primary btn-block btn-large">Aceptar</button>
          </form>
      </div>
    </div>
  } 
    </>
    
    
    
  )
}

export default LoginPage