import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import './App.css';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
const brRegex = RegExp(
  /^[C|F|G|H|J|K|L|M|N|P|R|T|V|W|X|Y|Z]{2}[0-9]{6}$/
);

const frRegex = RegExp(
  /^[C|F|G|H|J|K|L|M|N|P|R|T|V|W|X|Y|Z0-9]{8}$/
);

const formValid = ({ formErrors, ...rest }) =>{
  let valid = true;

  Object.values(formErrors).forEach(val =>{
    val.length > 0 && (valid = false);
  });

  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      titles: null,
      firstName: null,
      lastName: null,
      citizenship: "France",
      passportId: null,
      email: null,
      formErrors:{
        title: "",
        firstName: "",
        lastName: "",
        citizenship: "",
        passportId: "",
        email: ""
      }
    }; 
  }

  handleSubmit = e =>{
      e.preventDefault();

      if(formValid(this.state)){
        console.log(`
        Title: ${this.state.titles}
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Citizenship: ${this.state.citizenship}
        PassportId: ${this.state.passportId}
        Email: ${this.state.email}
        `)
      } else {
        console.error('Invalid Form');
      }
  };

  handleChange = e =>{
    //e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors};
    let stCiti = this.state.citizenship;
    switch(name){
      case 'firstName':
        formErrors.firstName = value.length < 4 
          ? "Minimum 4 Characters"
          : "";
        break;
      case 'lastName':
        formErrors.lastName = value.length < 4 
          ? "Minimum 4 Characters"
          : "";
        break;
      case 'email':
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Invalid email address";
        break;

      case 'passportId'  :
        switch(stCiti){
          case 'France':
          formErrors.passportId = frRegex.test(value)
          ? ""
          : "Invalid Passport French";
          break;
          case 'Brazil':
          formErrors.passportId = brRegex.test(value)
          ? ""
          : "Invalid Passport Brazilian";
          break;
          default:
          break;
        }
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value });
  };
  render() {

    const {formErrors} = this.state;
    return(
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Form Visa</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="title" onChange={this.handleChange}>
              <label htmlFor="title">Title</label>
          
                <input type="radio" value="Mr" name="titles"/> Mr
                <input type="radio" value="Mrs" name="titles"/> Mrs
              
            </div>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <TextField 
                type="text" 
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name" 
                name="firstName" 
                noValidate 
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 &&(
                  <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <TextField 
              type="text" 
              className={formErrors.lastName.length > 0 ? "error" : null}
              placeholder="Last Name" 
              name="lastName" 
              noValidate 
              onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
            <div className="citizenships">
              <label htmlFor="citizenships">Country of citizenship</label>
              <div onChange={this.handleChange}>
                <input defaultChecked={this.state} type="radio" value="France" name="citizenship"/> France
                <input type="radio" value="Brazil" name="citizenship"/> Brazil
              </div>
            </div>
            <div className="passportId">
              <label htmlFor="passportId">Passport Id</label>
              <TextField 
              type="text" 
              className={formErrors.passportId.length > 0 ? "error" : null}
              placeholder="Passport Id" 
              name="passportId" 
              noValidate 
              onChange={this.handleChange}
              />
              {formErrors.passportId.length > 0 && (
                <span className="errorMessage">{formErrors.passportId}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <TextField 
              type="email" 
              className={formErrors.email.length > 0 ? "error" : null}
              placeholder="Email" 
              name="email" 
              noValidate 
              onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="createVisa">
              <Button variant="contained" color="primary" type="submit">Submit your Visa</Button>

            </div>
            
          </form>
        </div>
      </div>
    );
  }
}

export default App;
