import React from 'react';
import './form.css'


export default function  Form() {


const [errors, setErrors] = React.useState({}); // estado, donde mantenemos un objeto con los errores

const [input, setInput] = React.useState({ //definiendo un sólo estado,  más control sobre él,
  username: '',             //pero ahora tenemos una sola funcion setInput que debe manejar todos los inputs.
  password: '',          // si pasamos esta función a cualq input, podemos usar su atributo name para indicar
});                       // el nombre de la propiedad en el estado.
                          

const handleInputChange = function(e) {
  setInput({
    ...input, // setInput pisaa el estado anterior.tenemos que pasarle también las propiedades viejas que tenia el estad
              //usamos ...input,
    [e.target.name]: e.target.value
  });
  setErrors(validate({
    ...input,
    [e.target.name]: e.target.value
  }));
}

  return (
    <form >
      <div id="frm"><div>
        <h1>Log in</h1>                      
        <input  id= "mail" className={errors.username && 'danger'}  //onChange pasa un evento a la función que le pasemos.
        type="text" placeholder='Mail' name="username" onChange={handleInputChange} value={input.username} />
        {errors.username && (<p className="danger">{errors.username}</p>)}
      </div>
      <div>
        <input id="pass" placeholder='Password' className={errors.password && 'danger'} type="password" name="password" value={input.password} 
        onChange={handleInputChange} /> {errors.password && (<p className="danger">{errors.password}</p>)}
      </div>
      <div>
        <input id="button" type="submit" value="submit" onChange={handleInputChange}/></div>
      </div>
    </form>


    
  )
}


export function validate(input) {   //funcion de valudacion
  let errors = {};
  if (!input.username) {
    errors.username = 'Mail is required';  //si no hay input
  } else if (!/\S+@\S+\.\S+/.test(input.username)) { //si input no es mail
    errors.username = 'Mail is invalid';
  }
  if(!input.password){
    errors.password= 'Password is required'
  }else if (!/(?=.*[0-9])/.test(input.password)){ //al menos 1 numero en password
    errors.password='Password is invalid'
  }

  return errors;
};