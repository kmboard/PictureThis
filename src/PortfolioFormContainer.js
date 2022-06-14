import React from 'react';
import {connect} from 'react-redux';
import './styles/Homepage.css';
import Header from './Header';
import Form from './Forms/LoginForm';
import PortfolioForm from './Forms/PortfolioForm';
import { Segment, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import client from './api/ApolloClient';
import gql from 'graphql-tag';

export const CREATE_PORTFOLIO = gql`
  mutation($name: String!, $description: String!, $files: [String!]!) {
    updateUser(name: $name, description: $description, files: $files){
		email
	}
  }
`;

export const EDIT_PORTFOLIO = gql`
  mutation($name: String!, $description: String!, $files: [String!]!) {
    updateUser(name: $name, description: $description, files: $files){
		email
	}
  }
`;

export const GET_USER_DETAILS = gql`
  {
    meUser{
		_id,
		email,
		name,
		description,
		files
	}
  }
`;

let files = ["https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014__340.jpg",
"https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688?k=20&m=517188688&s=612x612&w=0&h=i38qBm2P-6V4vZVEaMy_TaTEaoCMkYhvLCysE7yJQ5Q=",
"https://media.istockphoto.com/photos/hot-air-balloons-flying-over-the-botan-canyon-in-turkey-picture-id1297349747?b=1&k=20&m=1297349747&s=170667a&w=0&h=oH31fJty_4xWl_JQ4OIQWZKP8C6ji9Mz7L4XmEnbqRU=",];

class PortfolioFormContainer extends React.Component{

	state={
        portfolioData: null
    }

	componentDidMount= async () =>{
        if(!this.props.createMode){
			const request = await client.mutate({
				mutation: GET_USER_DETAILS,
			})

			console.log(request);
			if(request.data&&request.data.meUser){
				this.setState({portfolioData: request.data.meUser});
			}
			else{
				console.error("Fetch Error")
			}
		}
	}

	onSubmit = async (fileURLs) => {
		console.log(fileURLs);
		if (this.props.portfolioValues && !this.props.portfolioValues.syncErrors && this.props.portfolioValues.values) {
			if(this.props.createMode){
				const {name, description} = this.props.portfolioValues.values;
				const request = await client.mutate({
					variables: { name, description, files: fileURLs },
					mutation: CREATE_PORTFOLIO,
				})

				console.log(request);
				if(request.data.updateUser){
					this.props.history.push("/portfolios");
				}
			}
			else{
				const {name, description} = this.props.portfolioValues.values;
				const request = await client.mutate({
					variables: { name, description, files: fileURLs },
					mutation: EDIT_PORTFOLIO,
				})

				console.log(request);
				if(request.data.updateUser){
					this.props.history.push("/portfolios");
				}
			}
		}
		else {
			console.log("validation")
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

	componentWillUnmount=()=>{

	}

	render(){
		return(
			<div style={{width:'100%',display: 'flex',scrollbarColor:'transparent transparent',scrollbarWidth:'none',userSelect:'text'}}>
				<Header/>
				<Segment className="sign-up-container" style={{margin: '0 auto'}}>
					<h1>{this.props.createMode?"Create Portfolio":"Edit Portfolio"}</h1>
					<PortfolioForm
						handleConfirm={this.handleRegConfirm}
						// onSubmit={this.onSubmit}
						disableInput={this.state.disableInput}
						createMode={this.props.createMode}
						onSubmit={this.onSubmit}
						portfolioData={this.state.portfolioData}
					/>
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
		portfolioValues: state.form.portfolio,
		isSignedIn: state.auth.isSignedIn,
		message: state.auth.message,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioFormContainer);
