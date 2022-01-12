import React,{useState} from 'react'
import { Form, Button, Row, Col } from "react-bootstrap";
import './LoginScreen.css';
import axios from "axios"
import Header from "../Header/Header.js";

import { Link } from "react-router-dom";

import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading.js"

const LoginScreen = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error,setError] = useState(false)
  const [loading,setLoading] = useState(false)

const submitHandler= async(e)=>{
console.log(email,password);
e.preventDefault();
try {
const config = {
  headers: { 
    "Content-Type": "application/json",
  },
};
setLoading(true);


const { data } = await axios.post(
  "/api/users/login",
  {
  email,password,
},config
);
console.log(data);
localStorage.setItem("userInfo",JSON.stringify(data));


setLoading(false);



} catch (error) {
  setError(error.response.data.message)
  
}



};

    return (
      <div className="loginContainer">
        <Header/>
                        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}


      <Form onSubmit={submitHandler} >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
             value={email}
              placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            />


          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <input  type="password"
              value={password}
            
              onChange={(e) => setPassword(e.target.value)}  className="form-control" placeholder="Enter password" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New Customer ? <Link to="/register">Register Here</Link>
          </Col>
        </Row>
        </div>
    )
}

export default LoginScreen;
