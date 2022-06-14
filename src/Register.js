import React from 'react';
import {connect} from 'react-redux';
import './styles/Homepage.css';
import Header from './Header';
import Form from './Forms/LoginForm';
import RegisterForm from './Forms/RegisterForm';
import { Segment, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import client from './api/ApolloClient';
import gql from 'graphql-tag';

const POST_REGISTER = gql`
  mutation RegisterUser ($email: String!, $password: String!) {
    registerUser(email: $email, password: $password) {
	  email
    }
  }
`;

class Register extends React.Component{

	state={
        
    }

	handleConfirm = () => {
		if (this.props.message) {
			this.props.dispatch({ type: "CLEAR_SIGN_IN", payload: "" });
		}
	}

	handleRegConfirm = () => {
		if (this.props.regMessage) {
			this.props.dispatch({ type: "CLEAR_SIGN_UP", payload: "" });
		}
	}

	async onSubmit(){
		if (!this.props.RegForm.syncErrors && (this.props.RegForm && this.props.RegForm.values && this.props.RegForm.values.email && this.props.RegForm.values.password)) {
			this.props.dispatch({ type: "CLEAR_SIGN_IN", payload: "" });
			const {email, password} = this.props.RegForm.values;
			const request = await client.mutate({
				variables: { email, password },
				mutation: POST_REGISTER,
			})

			console.log(request);
			if(request.data&&request.data.registerUser){
				this.props.history.push("/");
			}
		}
		else {
			console.log("validation")
		}
	}

	renderSignUpMessages = () => {
		if (this.props.message === "email") {
			if (document.querySelector(".login_input_text")) {
				document.querySelector(".login_input_text").focus();
			}
			return "An account with that sign-in information does not exist";
		}
		else if (this.props.message === "password") {
			if (document.getElementById("login_input_password")) {
				document.getElementById("login_input_password").focus();
			}
			return "You have entered wrong password";
		}
	}

	// renderSignUpMessages = () => {
	// 	if (this.props.regStatus.message === "invalid") {
	// 		return "Unauthorized access";
	// 	}
	// 	else if (this.props.regStatus.message === "email") {
	// 		return "An account with this email already exists";
	// 	}
	// 	else if (this.props.regStatus.message === "validation") {
	// 		return "Please enter a valid phone number";
	// 	}
	// 	else if (this.props.regStatus.message === "company") {
	// 		return "This company name is already registered";
	// 	}
	// 	else if (this.props.regStatus.message === "done") {
	// 		return "We have sent a verification link to your email address. If you do not receive it within a few minutes, please check your Junk, Bulk or Spam folders. Mark the message as not spam to avoid problems receiving our correspondence in the future.";
	// 	}
	// }

	componentDidMount=()=>{
        console.log('X')
	}

	componentWillUnmount=()=>{

	}

	render(){
		return(
			<div style={{width:'100%',display: 'flex',scrollbarColor:'transparent transparent',scrollbarWidth:'none',userSelect:'text'}}>
				<Header/>
				<Segment className="sign-up-container" style={{margin: '0 auto'}}>
					<h1>Register</h1>
					<RegisterForm
						handleConfirm={this.handleRegConfirm}
						// onSubmit={this.onSubmit}
						disableInput={this.state.disableInput}
					/>
					<p>{this.renderSignUpMessages()}</p>
					<div style={{display: 'flex', justifyContent: 'center'}}>
						<div className='login_button_container' >
							{(!this.state.requested) ? (<Button primary onClick={(e) => { this.onSubmit() }}>Sign Up</Button>)
							: (<Button primary>Loading</Button>)}
						</div>
						<div className='reg_button_container' >
							<Link className='headerText' to="/">
								<Button primary>Go to Login</Button>
							</Link>
						</div>
					</div>
				</Segment>
			</div>
		);
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		dispatch
	}
}

const mapStateToProps = (state) => {
	return {
		RegForm: state.form.RegForm,
		isSignedIn: state.auth.isSignedIn,
		message: state.auth.message,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
