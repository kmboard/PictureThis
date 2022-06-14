import React from 'react';
import { connect } from 'react-redux';
import './styles/Homepage.css';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import history from './history';

class Header extends React.Component{

	state={
        
    }

	componentDidMount=()=>{
        console.log('X')
	}

	componentWillUnmount=()=>{

	}

	render(){
		return(
			<div className="header-container">
                <div>
					<Link className='headerText' to={this.props.isSignedIn?"/portfolios":"/"}>
						<p style={{color: 'white'}}>Portfolio Spot</p>
                    </Link>
				</div>
				{this.props.isSignedIn?<div style={{marginRight: '5px', display: "flex", alignItems:"baseline"}} >
					<div>
						<Link className='headerText' to="/create-portfolio">
							<p style={{cursor: "pointer", color: 'white'}}>Create</p>
                    	</Link>
					</div>
					<div>
						<Icon name='sign out alternate' style={{cursor: "pointer", marginLeft: 20,color:'white'}} onClick={()=>{
							if(this.props.isSignedIn){
								this.props.dispatch({ type: "CLEAR_SIGN_IN", payload: "" });
								history.replace("/");
							}
						}}/>
					</div>
				</div>:null}
			</div>
		);
	}
};

const mapDispatchToProps=(dispatch)=>{
	return{
		dispatch
	};
}

const mapStateToProps=(state)=>{
	return{
		isSignedIn: state.auth.isSignedIn
	};
}


// export default connect(null, mapDispatchToProps)(App);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
