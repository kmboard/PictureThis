import React from 'react';
import './styles/Homepage.css';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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
					<Link className='headerText' to="/">
						<p style={{color: 'white'}}>Portfolio Spot</p>
                    </Link>
				</div>
				<div style={{marginRight: '5px'}}>
					<Icon name='sign out alternate' style={{color:'white'}}/>
				</div>
			</div>
		);
	}
};


// export default connect(null, mapDispatchToProps)(App);

export default Header;
