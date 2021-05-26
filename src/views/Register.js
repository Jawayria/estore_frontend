/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";
import {Redirect} from "react-router-dom";
import {BASE_URL} from '../base_url.js';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {username: '', email: '',password: '', password2: '', loggedin:false};
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value, [event.target.email]:event.target.value, [event.target.password]: event.target.value, [event.target.password2]:event.target.value});
        console.log(event.target.value);
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        try{
            let response = await fetch(
                BASE_URL+'users/signup/',
                {
                    method: 'POST',
                    body: JSON.stringify({"username": this.state.username, "email": this.state.email, "password": this.state.password, "password2": this.state.password2}),
                    headers: {'Content-Type': 'application/json'}
                }
            );
            let res = await response.json();
            window.localStorage.setItem('access_token', res['access']);
            window.localStorage.setItem('refresh_token', res['refresh']);
            window.localStorage.setItem('user_id', res['user_id']);

            this.setState ( {
                username: '',
                email: '',
                password: '',
                password2: '',
                loggedin: true,
            })
        }catch (err){
            alert("Invalid Input");
        }
    };


    render(){
      if(this.state.loggedin) {
        return (<Redirect to="auth/login" />);
        }
      else {
  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-2">
            <div className="text-center">
                <h2 className="text-white"> Sign Up </h2>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={this.handleSubmit}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Name"
                    type="text"
                    value={this.state.username}
                    onChange={this.handleChange}
                    name="username"/>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    value={this.state.email}
                    onChange={this.handleChange}
                    name="email"
                    placeholder="Email"
                    type="email"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    value={this.state.password}
                    onChange={this.handleChange}
                    name="password"
                    placeholder="Password"
                    type="password"
                  />
                </InputGroup>
              </FormGroup>
               <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    value={this.state.password2}
                    onChange={this.handleChange}
                    name="password2"
                    placeholder="Confirm Password"
                    type="password"
                  />
                </InputGroup>
              </FormGroup>

              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}
}
}

export default Register;
