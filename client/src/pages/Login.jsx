import React from 'react';
import '../styles/Login.css';
import { Formik, Form, Field } from "formik";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        correo: values.correo,
        password: values.password
      }),
      redirect: 'follow'
    };

    try {
      const response = await fetch("http://localhost:3001/auth/login", requestOptions);
      const result = await response.json();

      if (response.ok || response.status === 200) {
        localStorage.setItem("auth_token", result.AccessToken);
        console.log("Autenticación exitosa");
        navigate('/habitaciones'); // Redirige al usuario a la página de Habitaciones
      } else {
        console.log("Error en la autenticación");
      }
    } catch (error) {
      console.log("Error en la solicitud:", error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-2"></div>
          <div className="col-lg-6 col-md-8 login-box">
            <div className="col-lg-12 login-key">
              <i className="fa fa-key" aria-hidden="true"></i>
            </div>
            <div className="col-lg-12 login-title">
              ADMIN PANEL
            </div>

            <div className="col-lg-12 login-form">
              <div className="col-lg-12 login-form">
                <Formik
                  initialValues={{
                    correo: '',
                    password: ''
                  }}
                  onSubmit={handleSubmit}
                >
                  <Form>
                    <div className="form-group">
                      <label className="form-control-label">CORREO</label>
                      <Field type="text" name="correo" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label className="form-control-label">CONTRASEÑA</label>
                      <Field type="password" name="password" className="form-control" />
                    </div>

                    <div className="col-lg-12 loginbttm">
                      <div className="col-lg-6 login-btm login-text">

                      </div>
                      <div className="col-lg-6 login-btm login-button">
                        <button type="submit" className="btn btn-outline-primary">LOGIN</button>
                      </div>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
            <div className="col-lg-3 col-md-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
