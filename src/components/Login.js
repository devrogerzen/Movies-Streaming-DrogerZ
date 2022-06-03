import React from "react";
import axios from "axios";
import swAlert from "@sweetalert/with-react";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const navigator = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //console.log(regexEmail.test(email))
    if (email === "" || password === "") {
      swAlert(<h2>los campos no pueden estar vacios</h2>);
      return;
    }
    if (email !== "" && !regexEmail.test(email)) {
      swAlert(<h2>Debes escribir una dirección de correo valida</h2>);
      return;
    }
    if (email !== "challenge@alkemy.org" || password !== "react") {
      swAlert(<h2>creadenciales invalidas</h2>);
      return;
    }
    //swAlert(<h2>Formulario a sido Enviado</h2>);

    //peticion de tipo post para enviar
    //post() espera ('La url', {los datos que espero capturar})
    axios
      .post("http://challenge-react.alkemy.org", { email, password })
      .then((res) => {
        swAlert(<h2>Perfecto, ingresaste correctamente</h2>);
        console.log(res.data);
        const tokenRecibido = res.data.token;
        //setItem 2 argumentos el
        //1º nombre de la propiedad donde quieres guardar la informacion
        //2º cual es la informacion que quieres guardar
        sessionStorage.setItem("token", tokenRecibido);
        navigator(<Navigate replace to="/listado" />);
      });
  };

  let token = sessionStorage.getItem("token");

  return (
    <>
      {token && <Navigate replace to="/listado" />}
      <h2 className="pt-5 ps-5">Formulario de Login</h2>
      <form onSubmit={submitHandler} className="w-100 my-5 px-5 fs-4 font-monospace" >
        <label>
          <span>Correo Electrónico</span>
          <br />
          <input type="email" name="email" />
        </label>
        <br />
        <label>
          <span>Contraseña</span>
          <br />
          <input type="password" name="password" />
        </label>
        <br />
        <button type="submit">Ingresar</button>
      </form>
    </>
  );
};

export default Login;
