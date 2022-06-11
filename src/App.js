import React from 'react';
import { Switch ,Route } from 'react-router-dom';
import './styles/App.css';
import PortfolioContainer from './PortfolioContainer';
import PortfolioDetail from './PortfolioDetail';
import Homepage from './Homepage';
import Register from './Register';

class App extends React.Component{

	constructor(props){
		super(props);
		this.state={
			comingSoon: false
		}
	}

	componentDidMount=()=>{

	}

	componentWillUnmount=()=>{

	}

	render(){
    console.log('X')
				return(
						<div style={{width:'100%',scrollbarColor:'transparent transparent',scrollbarWidth:'none',userSelect:'text', maxWidth: '1440px', margin: '0px auto'}}>
								<div>			
									<Switch>
										<Route path="/" exact component={props => <Homepage {...props} />}  />
										<Route path="/register" exact component={props => <Register {...props}/>}  />
										<Route path="/portfolios" exact component={props => <PortfolioContainer {...props}/>}  />
										<Route path="/detail/:portfolioId" exact component={props => <PortfolioDetail {...props}/>}  />
									</Switch>
								</div>
						</div>
				);
			}
};

const mapDispatchToProps=(dispatch)=>{
	return{

	}
} 


// export default connect(null, mapDispatchToProps)(App);

export default App;
