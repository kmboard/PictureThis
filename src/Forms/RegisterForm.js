import React from 'react';
import {connect} from 'react-redux';
import {Field,reduxForm} from 'redux-form';

let emailPattern=`/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/`;

class RegisterForm extends React.Component{

	state={
		flag: false,
	}

	componentDidMount(){

	}

	handleKeyPress=(e)=>{
		if(e&&e.key==="Enter"){
			this.props.onSubmit();
		}
	}

	renderError({error,touched, active}){
		if(touched && error && !active){
			return(
				<div style={{color:'#FF3333',fontSize:'13px',margin:'1px 0px'}}>
					<div>{error}</div>
				</div>
			);
		}
	}

	renderInput=({input, label, disableInput, meta,value, classname, placeholder,type,style,autoComplete})=>{
		return (
			<div className = 'homepageFieldContainerStyle'>
				<div style = {{display:'flex',flexDirection:'column'}}>
					<p style={{textAlign:'left'}}>{placeholder}</p>
					<input {...input} onKeyPress={(e)=>{this.handleKeyPress(e)}} className="login_input_text" style = {{marginTop:'15px',marginBottom:'10px',fontSize:'0.9em'}} required="required" spellCheck="false" value={value} placeholder="example@example.com" /*style={style}*/ type={type} autoComplete={autoComplete} disabled={disableInput}/>	
					<span></span>
				</div>				
				{this.renderError(meta)}
			</div>
		);
	}
	
	renderInputPass=({ input, id, label, disableInput, meta,value, classname, placeholder,type,style,autoComplete})=>{
        return (
            <div className = 'homepageFieldContainerStyle'>
                <div style = {{display:'flex',flexDirection:'column'}}>
                    <p style={{textAlign:'left'}}>{placeholder}</p>
                    <div id={id} style = {{display:'flex',flexDirection:'row',alignItems:'center',marginBottom:'10px',marginTop:'15px'}}>
                        <input {...input} onKeyPress={(e)=>{this.handleKeyPress(e)}} id="login_input_tag" style = {{marginBottom:'0px',fontSize:'0.9em',width:'100%'}} required="required" spellCheck="false" value={value} placeholder="Enter Password" /*style={style}*/ type={type} autoComplete={autoComplete?autoComplete:"off"} disabled={disableInput}/>
                        <svg id="active_eye_icon" onClick={(e)=>{this.onShowPass(id)}} width="20" height="15" style={{marginLeft:'5px'}} viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0 6.99659C0.91954 4.66439 4.13793 0 9.65517 0C16.5517 0 19.4695 5.2875 20 6.99659C18.992 9.72046 16.191 14.1 9.65517 14.1C4.24403 14.1 1.22016 9.77386 0 6.99659ZM1.16699 7.00266C1.98165 4.93548 4.83296 1.01477 9.72091 1.01477C15.8309 1.01477 18.4158 5.48778 18.8858 7.00266C17.9928 9.41699 15.5515 13.1386 9.76116 13.1386C4.9672 13.1386 2.24798 9.46433 1.16699 7.00266Z" fill="#4B5E71"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M10.0793 11.2693C12.3647 11.2693 14.2173 9.40418 14.2173 7.10341C14.2173 4.80264 12.3647 2.9375 10.0793 2.9375C7.79402 2.9375 5.94141 4.80264 5.94141 7.10341C5.94141 9.40418 7.79402 11.2693 10.0793 11.2693ZM10.0795 10.308C11.8374 10.308 13.2625 8.87323 13.2625 7.10341C13.2625 5.33359 11.8374 3.89886 10.0795 3.89886C8.32157 3.89886 6.89648 5.33359 6.89648 7.10341C6.89648 8.87323 8.32157 10.308 10.0795 10.308Z" fill="#4B5E71"/>
                        </svg>
                        <svg id="closed_eye_icon" onClick={(e)=>{this.onShowPass(id)}} style={{display:'none',marginLeft:'5px'}} width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.86197 1.99376C5.377 0.844143 7.30807 0 9.65517 0C16.5517 0 19.4695 5.2875 20 6.99659C19.6117 8.046 18.9572 9.34115 17.9255 10.5369L17.1045 10.0382C17.9862 9.02112 18.5473 7.91795 18.8858 7.00266C18.4158 5.48778 15.8309 1.01477 9.72091 1.01477C7.7438 1.01477 6.0999 1.65624 4.78922 2.55704L3.86197 1.99376ZM1.97942 3.78718C1.00174 4.93963 0.341934 6.12935 0 6.99659C1.22016 9.77386 4.24403 14.1 9.65517 14.1C12.3513 14.1 14.4118 13.3548 15.9731 12.2879L15.092 11.7527C13.7488 12.5789 12.0068 13.1386 9.76116 13.1386C4.9672 13.1386 2.24798 9.46433 1.16699 7.00266C1.46092 6.25682 2.01998 5.26969 2.84416 4.31248L1.97942 3.78718ZM6.02891 6.24711C5.97156 6.52348 5.94141 6.8099 5.94141 7.10341C5.94141 9.40418 7.79402 11.2693 10.0793 11.2693C11.0829 11.2693 12.003 10.9097 12.7194 10.3114L11.8372 9.77547C11.3335 10.112 10.7293 10.308 10.0795 10.308C8.32157 10.308 6.89648 8.87323 6.89648 7.10341C6.89648 6.99549 6.90178 6.88882 6.91213 6.78364L6.02891 6.24711ZM13.2123 7.67377C13.2453 7.48868 13.2625 7.29807 13.2625 7.10341C13.2625 5.33359 11.8374 3.89886 10.0795 3.89886C9.33964 3.89886 8.65874 4.153 8.11821 4.5793L7.25749 4.05643C7.99668 3.36226 8.98874 2.9375 10.0793 2.9375C12.3647 2.9375 14.2173 4.80264 14.2173 7.10341C14.2173 7.48177 14.1672 7.84836 14.0733 8.1968L13.2123 7.67377Z" fill="black"/>
                            <rect width="0.959645" height="22.1705" transform="matrix(0.514077 -0.857744 0.854664 0.519181 0 1.67773)" fill="black"/>
                        </svg>
                    </div>
                    <span></span>
                </div>                
                {this.renderError(meta)}
            </div>
        );
    }
	
	onShowPass=(id)=>{
		if(document.getElementById(id)&&document.getElementById(id).children.length){
			if(document.getElementById(id).children[0].type==="password"){
				document.getElementById(id).children[0].type="text";
			}
			else{
				document.getElementById(id).children[0].type="password";
			}

			if(document.getElementById(id).children[1].style.display!=="none"){
				document.getElementById(id).children[1].style.display="none";
				document.getElementById(id).children[2].style.display="";
			}
			else{
				document.getElementById(id).children[1].style.display="";
				document.getElementById(id).children[2].style.display="none";
			}
		}
	}

	render(){

		return (
			<form class="ui form" onSubmit={(e)=>{e.preventDefault()}} type="email" autoComplete="off" style={{fontSize:'inherit'}}>					
				<Field 
					name="email" 
					type="email"
					disableInput={this.props.disableInput}
					spellCheck="false" 
					pattern={emailPattern} 
					autoComplete="off" 
					component={this.renderInput} 
					onChange={()=>{if(this.props.message!==""){this.props.handleConfirm();}}}
					placeholder="Email" 
					className="login_input_text"
					style={{fontSize:'1.15em',boxShadow:'0 0px 0px 0 rgb(255, 255, 255)',border:'0px',margin:'0rem 0'}}
				/>	
				<Field
					name="password" 
					id="login_input_password" 
					disableInput={this.props.disableInput}
					placeholder="Password"
					spellCheck="false"
					component={this.renderInputPass}
					onChange={()=>{if(this.props.message!==""){this.props.handleConfirm();}}}
					type="password"
					autoComplete="current-password"
					style={{fontSize:'1.15em',margin:'0rem 0',backgroundColor:'transparent'}}
				/>
				<Field
					name="c_password" 
					id="confirm_input_password" 
					disableInput={this.props.disableInput}
					placeholder="Confirm Password"
					spellCheck="false"
					component={this.renderInputPass}
					onChange={()=>{if(this.props.message!==""){this.props.handleConfirm();}}}
					type="password"
					autoComplete="current-password"
					style={{fontSize:'1.15em',margin:'0rem 0',backgroundColor:'transparent'}}
				/>
			</form>
		);
	}
}


const validate = (formValues) => {
	const errors = {};

	if(!formValues.email){
		errors.email= 'Please fill this field';
	}
	
	if(!formValues.password){
		errors.password= 'Please fill this field';
	}

	if(!formValues.c_password){
		errors.c_password= 'Please fill this field';
	}

	if(formValues.c_password){
		if(formValues.c_password!==formValues.password){
			errors.c_password= 'Passwords do not match';
		}
	}
	
	return errors;
};

// const mapDispatchToProps=(dispatch)=>{
//     return{

//     }
// }

const mapStateToProps=(state)=>{
	return {
		// message: state.auth.message,
		// isSignedIn: state.auth.isSignedIn,
		// breakpoint: state.breakpoint
	};
};
// reduxForm({ form: 'Form', validate})(connect(mapStateToProps, mapDispatchToProps)(Name)); Refactor Export Later
export default (reduxForm({
	form: 'RegForm',
	validate
}))(connect(mapStateToProps)(RegisterForm));






				


				