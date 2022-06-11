import React from 'react';
import {connect} from 'react-redux';
import './styles/Homepage.css';
import Header from './Header';
import Form from './Forms/LoginForm';
import RegisterForm from './Forms/RegisterForm';
import { Segment, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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

	onSubmit = () => {
		if (!this.props.formValues.syncErrors && (this.props.formValues && this.props.formValues.values)) {
			if (this.props.message) {
				this.props.dispatch({ type: "CLEAR_SIGN_IN", payload: "" });
			}
			this.props.dispatch({ type: "SIGN_IN", payload: "" });
			// this.setState({ requested: true, err: false, disableInput: true });
		}
		else {

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
