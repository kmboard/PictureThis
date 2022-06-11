import React from 'react';
import Header from './Header';
import { Segment, Card, Icon, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './styles/PortfolioContainer.css';

class PortfolioContainer extends React.Component{

	state={
        
    }

	componentDidMount=()=>{
        console.log('X')
	}

	componentWillUnmount=()=>{

	}

	render(){
		console.log(this.props.bgColor)
		return(
			<div style={{width:'100%',scrollbarColor:'transparent transparent',scrollbarWidth:'none',userSelect:'text'}}>
                <Header/>
                <Card.Group itemsPerRow={5} className="portfolio-container" style={{display:'flex'}}>
				<Card className="portfolio-card" color="yellow" onClick={()=>{this.props.history.push("/detail/1")}}>
						<Image src='https://images.pexels.com/photos/302743/pexels-photo-302743.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' wrapped ui={false} />
						<Card.Content>
						<Card.Header>Ice ball</Card.Header>
						<Card.Meta>
							<span className='date'>Created on 15th May 2022</span>
						</Card.Meta>
						<Card.Description>
							Good Portfolio
						</Card.Description>
						</Card.Content>
						{/* <Card.Content extra>
						<a>
							<Icon name='user' />
							22 Friends
						</a>
						</Card.Content> */}
					</Card>
					<Card className="portfolio-card" color="yellow" onClick={()=>{this.props.history.push("/detail/1")}}>
						<Image src='https://images.pexels.com/photos/302743/pexels-photo-302743.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' wrapped ui={false} />
						<Card.Content>
						<Card.Header>Ice ball</Card.Header>
						<Card.Meta>
							<span className='date'>Created on 15th May 2022</span>
						</Card.Meta>
						<Card.Description>
							Good Portfolio
						</Card.Description>
						</Card.Content>
						{/* <Card.Content extra>
						<a>
							<Icon name='user' />
							22 Friends
						</a>
						</Card.Content> */}
					</Card>
					<Card className="portfolio-card" color="yellow" onClick={()=>{this.props.history.push("/detail/1")}}>
						<Image src='https://images.pexels.com/photos/302743/pexels-photo-302743.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' wrapped ui={false} />
						<Card.Content>
						<Card.Header>Ice ball</Card.Header>
						<Card.Meta>
							<span className='date'>Created on 15th May 2022</span>
						</Card.Meta>
						<Card.Description>
							Good Portfolio
						</Card.Description>
						</Card.Content>
						{/* <Card.Content extra>
						<a>
							<Icon name='user' />
							22 Friends
						</a>
						</Card.Content> */}
					</Card>
					<Card className="portfolio-card" color="yellow" onClick={()=>{this.props.history.push("/detail/1")}}>
						<Image src='https://images.pexels.com/photos/302743/pexels-photo-302743.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' wrapped ui={false} />
						<Card.Content>
						<Card.Header>Ice ball</Card.Header>
						<Card.Meta>
							<span className='date'>Created on 15th May 2022</span>
						</Card.Meta>
						<Card.Description>
							Good Portfolio
						</Card.Description>
						</Card.Content>
						{/* <Card.Content extra>
						<a>
							<Icon name='user' />
							22 Friends
						</a>
						</Card.Content> */}
					</Card>
					<Card className="portfolio-card" color="yellow" onClick={()=>{this.props.history.push("/detail/1")}}>
						<Image src='https://images.pexels.com/photos/302743/pexels-photo-302743.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' wrapped ui={false} />
						<Card.Content>
						<Card.Header>Ice ball</Card.Header>
						<Card.Meta>
							<span className='date'>Created on 15th May 2022</span>
						</Card.Meta>
						<Card.Description>
							Good Portfolio
						</Card.Description>
						</Card.Content>
						{/* <Card.Content extra>
						<a>
							<Icon name='user' />
							22 Friends
						</a>
						</Card.Content> */}
					</Card>
					<Card className="portfolio-card" color="yellow" onClick={()=>{this.props.history.push("/detail/1")}}>
						<Image src='https://images.pexels.com/photos/302743/pexels-photo-302743.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' wrapped ui={false} />
						<Card.Content>
						<Card.Header>Ice ball</Card.Header>
						<Card.Meta>
							<span className='date'>Created on 15th May 2022</span>
						</Card.Meta>
						<Card.Description>
							Good Portfolio
						</Card.Description>
						</Card.Content>
						{/* <Card.Content extra>
						<a>
							<Icon name='user' />
							22 Friends
						</a>
						</Card.Content> */}
					</Card>
					<Card className="portfolio-card" color="yellow" onClick={()=>{this.props.history.push("/detail/1")}}>
						<Image src='https://images.pexels.com/photos/302743/pexels-photo-302743.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' wrapped ui={false} />
						<Card.Content>
						<Card.Header>Ice ball</Card.Header>
						<Card.Meta>
							<span className='date'>Created on 15th May 2022</span>
						</Card.Meta>
						<Card.Description>
							Good Portfolio
						</Card.Description>
						</Card.Content>
						{/* <Card.Content extra>
						<a>
							<Icon name='user' />
							22 Friends
						</a>
						</Card.Content> */}
					</Card>
					<Card className="portfolio-card" color="yellow" onClick={()=>{this.props.history.push("/detail/1")}}>
						<Image src='https://images.pexels.com/photos/302743/pexels-photo-302743.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' wrapped ui={false} />
						<Card.Content>
						<Card.Header>Ice ball</Card.Header>
						<Card.Meta>
							<span className='date'>Created on 15th May 2022</span>
						</Card.Meta>
						<Card.Description>
							Good Portfolio
						</Card.Description>
						</Card.Content>
						{/* <Card.Content extra>
						<a>
							<Icon name='user' />
							22 Friends
						</a>
						</Card.Content> */}
					</Card>
					<Card className="portfolio-card" color="yellow" onClick={()=>{this.props.history.push("/detail/1")}}>
						<Image src='https://images.pexels.com/photos/302743/pexels-photo-302743.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' wrapped ui={false} />
						<Card.Content>
						<Card.Header>Ice ball</Card.Header>
						<Card.Meta>
							<span className='date'>Created on 15th May 2022</span>
						</Card.Meta>
						<Card.Description>
							Good Portfolio
						</Card.Description>
						</Card.Content>
						{/* <Card.Content extra>
						<a>
							<Icon name='user' />
							22 Friends
						</a>
						</Card.Content> */}
					</Card>
					<Card className="portfolio-card" color="yellow" onClick={()=>{this.props.history.push("/detail/1")}}>
						<Image src='https://images.pexels.com/photos/302743/pexels-photo-302743.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' wrapped ui={false} />
						<Card.Content>
						<Card.Header>Ice ball</Card.Header>
						<Card.Meta>
							<span className='date'>Created on 15th May 2022</span>
						</Card.Meta>
						<Card.Description>
							Good Portfolio
						</Card.Description>
						</Card.Content>
						{/* <Card.Content extra>
						<a>
							<Icon name='user' />
							22 Friends
						</a>
						</Card.Content> */}
					</Card>
				</Card.Group>
			</div>
		);
	}
};


// export default connect(null, mapDispatchToProps)(App);

export default PortfolioContainer;
