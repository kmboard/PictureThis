import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { Segment, Card, Icon, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './styles/PortfolioContainer.css';
import client from './api/ApolloClient';
import gql from 'graphql-tag';

export const GET_PORTFOLIOS = gql`
  {
    users{
		_id,
		email,
		name,
		description,
		files
	}
  }
`;

export const USER_DETAIL = gql`
  {
    meUser{
		email
	}
  }
`;

class PortfolioContainer extends React.Component{

	state={
        portfolioData: []
    }

	async componentDidMount(){
		if(!this.props.isSignedIn){
            this.props.history.replace("/");
        }
        else{
			const request = await client.mutate({
				mutation: GET_PORTFOLIOS,
			})

			console.log(request);
			if(request.data&&request.data.users){
				this.setState({portfolioData: request.data.users});
			}
			else{
				console.error("Fetch Error")
			}
		}
	}

	componentWillUnmount=()=>{

	}

	render(){
		
		return(
			<div style={{width:'100%',scrollbarColor:'transparent transparent',scrollbarWidth:'none',userSelect:'text'}}>
                <Header/>
                <Card.Group itemsPerRow={document.documentElement.clientWidth>767?4:1} className="portfolio-container" style={{display:'flex'}}>
					{this.state.portfolioData[0]?this.state.portfolioData.map((item)=>(<Card className="portfolio-card" color="yellow" onClick={()=>{this.props.history.push(`/detail/${item._id}`)}}>
							<Image src={item.files?item.files[0]:""} wrapped ui={false} />
							<Card.Content>
							<Card.Header style={{textAlign: 'center'}}>{item.name}</Card.Header>
							{/* <Card.Meta>
								<span className='date'>Created on 15th May 2022</span>
							</Card.Meta> */}
							{/* <Card.Description>
								{item.description}
							</Card.Description> */}
							</Card.Content>
							{(this.props.email===item.email)?<Card.Content onClick={(e)=>{e.stopPropagation(); this.props.history.push("/edit-portfolio");}} extra style={{textAlign:'center'}}>
								<Button basic color='blue' style={{zIndex: 1}}>
									Edit
								</Button>
							</Card.Content>:null}
					</Card>)):<div className="ui large header" style={{marginTop: 20,textAlign:'center', width: "100%"}}>No Portfolio</div>}
				</Card.Group>
			</div>
		);
	}
};


// export default connect(null, mapDispatchToProps)(App);

const mapStateToProps=(state)=>{
	return{
		isSignedIn: state.auth.isSignedIn,
		email: state.auth.email
	};
}


// export default connect(null, mapDispatchToProps)(App);

export default connect(mapStateToProps, {})(PortfolioContainer);