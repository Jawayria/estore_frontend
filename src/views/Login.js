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
  Row,
  Col,
} from "reactstrap";
import {Redirect} from "react-router-dom";
import {BASE_URL} from '../base_url.js';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {username: '', password: '', loggedin: false};
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value, [event.target.password]: event.target.value});
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        try{
            let response = await fetch(
                BASE_URL+'users/login/',
                {
                    method: 'POST',
                    body: JSON.stringify({username: this.state.username, password: this.state.password}),
                    headers: {'Content-Type': 'application/json'}
                }
            );
            let res = await response.json();
            window.localStorage.setItem('access_token', res['access']);
            window.localStorage.setItem('refresh_token', res['refresh']);
            window.localStorage.setItem('user_id', res['user_id']);

            this.setState ( {
                username: '',
                password: '',
                loggedin: true
            })
        }catch (err){
            alert(err);
        }
    };


  render() {

      if(this.state.loggedin) {
        return (<Redirect to="/" />);
        }
      else {
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-2">
            <div className="text-center">
                <h2 className="text-white"> Sign In </h2>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={this.handleSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    value={this.state.username}
                    onChange={this.handleChange}
                    name="username"
                    placeholder="Username"
                    type="text"
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
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col className="text-right" xs="12">
            <a
              className="text-light"
              href="/auth/register"
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
  }
 }
 }

export default Login;
