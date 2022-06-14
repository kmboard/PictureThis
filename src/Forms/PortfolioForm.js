import React from 'react';
import {connect} from 'react-redux';
import {Field,reduxForm} from 'redux-form';
import TextareaAutosize from 'react-textarea-autosize';
import { FilePond, File, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';
import axios, { post } from 'axios';
import { Button } from 'semantic-ui-react';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);


class PortfolioForm extends React.Component{

	state={
		flag: false,
		files: []
	}

	componentDidMount(){
		console.log(this.props.createMode);
	}

	componentDidUpdate=()=>{
		if(this.props.portfolioData&&this.props.portfolioData.name&&!this.state.initialized){
			this.setState({initialized: true});
			this.props.initialize({
				name: this.props.portfolioData.name,
				description: this.props.portfolioData.description
			});
		}
	}

	uploadFiles(formData){
		if(this.props.createMode){
			this.setState({requested: true});
			let fileURLs=[];
			const url = 'http://localhost:5000/upload';
			console.log(this.state.files)
			const config = {
				headers: {
					'content-type': 'multipart/form-data'
				}
			}
			for(let i=0; i<this.state.files.length; i++){
				let form_data = new FormData();
				form_data.append('photo', this.state.files[i] );
				console.log(this.state.files[i], i, this.state.files[i])
				post(url, form_data, config)
				.then((e)=>{
					console.log(e);
					if(e.data&&e.data.file&&e.data.file.filename){
						console.log(`http://localhost:5000/${e.data.file.filename}`);
						fileURLs.push(`http://localhost:5000/${e.data.file.filename}`);
					}
					console.log(fileURLs);
					if(fileURLs.length===this.state.files.length){
						this.props.onSubmit(fileURLs);
					}
				})
				.catch((err)=>{
					console.log(err);
				})
			}
			this.setState({requested: false, disableInput: true});
		}
		else if(this.props.portfolioData&&this.props.portfolioData.files){
			this.props.onSubmit(this.props.portfolioData.files);
			this.setState({requested: false, disableInput: true});
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

	renderTextArea=({input, label, disableInput, meta,value, classname, placeholder,type,style,autoComplete,minRows,maxRows})=>{
		return (
			<div className = 'homepageFieldContainerStyle'>
				<div style = {{display:'flex',flexDirection:'column'}}>
					<p style={{textAlign:'left'}}>{placeholder}</p>
					<TextareaAutosize {...input} minRows={minRows} maxRows={maxRows} className="login_input_text" style = {{resize: "vertical",...style,marginTop:'15px',marginBottom:'10px'}} required="required" spellCheck="false" /*style={style}*/ type={type} autoComplete={autoComplete} disabled={disableInput}/>	
					<span></span>
				</div>				
				{this.renderError(meta)}
			</div>
		);
	}

	render(){
		console.log(this.props);
		return (
			<form class="ui form" onSubmit={(e)=>{e.preventDefault()}} type="email" autoComplete="off" style={{fontSize:'inherit'}}>					
				<Field 
					name="name" 
					type="name"
					minRows={1}
					maxRows={1}
					disableInput={this.props.disableInput}
					spellCheck="false" 
					autoComplete="off" 
					component={this.renderTextArea} 
					// onChange={()=>{if(this.props.message!==""){this.props.handleConfirm();}}}
					placeholder="Name" 
					className="login_input_text"
					style={{resize: "none"}}
				/>	
				<Field 
					name="description" 
					type="description"
					minRows={4}
					maxRows={8}
					disableInput={this.props.disableInput}
					spellCheck="false" 
					autoComplete="off" 
					component={this.renderTextArea} 
					// onChange={()=>{if(this.props.message!==""){this.props.handleConfirm();}}}
					placeholder="Description about portfolio" 
					className="login_input_text"
				/>
				{this.props.createMode?<div>
					<p style={{marginTop:'10px',marginBottom:'20px',textAlign:'left'}}>Upload Portfolio Images</p>
					<FilePond
						files={this.state.files}
						onupdatefiles={fileItems => {
							// Set currently active file objects to this.state
							this.setState({
							  files: fileItems.map(fileItem => fileItem.file)
							});
						}}
						allowMultiple={true}
						allowReorder={true}
						maxFiles={3}
						// server="http://localhost:5000/upload"
						name="photo"
						labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
					/>
				</div>:null}
				<div style={{marginTop: 20, display: 'flex', justifyContent: 'center'}}>
					<div className='login_button_container' >
						{(!this.state.requested) ? (<Button disabled={this.state.disableInput} primary onClick={(e) => { this.uploadFiles(); }}>{this.props.createMode?"Create":"Update"}</Button>)
						: (<Button primary>Loading</Button>)}
					</div>
				</div>
			</form>
		);
	}
}


const validate = (formValues) => {
	const errors = {};

	if(!formValues.name){
		errors.name= 'Please fill this field';
	}

	if(!formValues.description){
		errors.description= 'Please fill this field';
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
	form: 'portfolio',
	validate,
	enableReinitialize: true,
    keepDirtyOnReinitialize : true
}))(connect(mapStateToProps)(PortfolioForm));






				


				