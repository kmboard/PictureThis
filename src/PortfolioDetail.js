import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { Segment, Card} from 'semantic-ui-react';
import './styles/PortfolioContainer.css';
import client from './api/ApolloClient';
import gql from 'graphql-tag';

export const DELETE_PORTFOLIO = gql`
  mutation{
    deleteUser{
		_id
	}
  }
`;

export const GET_PORTFOLIO = gql`
    query($id: String!) {
        getUser(id: $id) {
            _id,
            email,
            name,
            description,
            files
        }
    }
`;

class PortfolioDetail extends React.Component{

	state = { activeIndex: 0 }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    async deletePortfolio(){
        const request = await client.mutate({
            mutation: DELETE_PORTFOLIO,
        })

        console.log(request);
        if(request.data&&request.data.deleteUser){
            this.setState({portfolioData: request.data.deleteUser});
            this.props.history.push("/portfolios");
        }
        else{
            console.error("Fetch Error")
        }
    }

	componentDidMount = async () => {
        // if(!this.props.isSignedIn){
        //     this.props.history.replace("/");
        // }

        if(window.location.pathname.split("detail/")&&window.location.pathname.split("detail/")[1]){
            const request = await client.mutate({
                variables: {id: window.location.pathname.split("detail/")[1]},
                mutation: GET_PORTFOLIO,
            })
    
            console.log(request);
            if(request.data&&request.data.getUser){
                this.setState({portfolioData: request.data.getUser}); 
            }
            else{
                console.error("Fetch Error")
            }
        }
	}

	componentWillUnmount=()=>{

	}

	render(){
        console.log(this.state.portfolioData)
        const { activeIndex } = this.state
		return(
			<div style={{width:'100%',scrollbarColor:'transparent transparent',scrollbarWidth:'none',userSelect:'text'}}>
                <Header/>
                <Segment className="portfolio-detail-container">
                    <div style={{display:'flex', justifyContent:'space-between', width: "95%"}}>
                        <div class="ui large header">
                            {this.state.portfolioData?this.state.portfolioData.name:"Portfolio"}
                        </div>
                        <div class="ui red button" onClick={()=>{this.deletePortfolio();}} style={{marginBottom: 15}}>
                            Delete
                        </div>
                    </div>
                    {this.state.portfolioData?<Card.Group itemsPerRow={document.documentElement.clientWidth>767?3:1}>
                        {this.state.portfolioData.files&&this.state.portfolioData.files.map((item)=><Card raised image={item} />)}
                    </Card.Group>:null}
                    {this.state.portfolioData?(<div class="ui message" style={{minWidth: '100%'}}>
                        <p>{this.state.portfolioData.description}</p>
                    </div>):null}
                    {/* <Image className='portfolio-detail-img' src='https://images.pexels.com/photos/302743/pexels-photo-302743.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' /> */}
                    {/* <div className="ui message portfolio-detail-accord">
                        <Accordion>
                            <Accordion.Title
                                active={activeIndex === 0}
                                index={0}
                                onClick={this.handleClick}
                                >
                                <Icon name='dropdown' />
                                What is a dog?
                                </Accordion.Title>
                                <Accordion.Content active={activeIndex === 0}>
                                <p>
                                    A dog is a type of domesticated animal. Known for its loyalty and
                                    faithfulness, it can be found as a welcome guest in many households
                                    across the world.
                                </p>
                                </Accordion.Content>

                                <Accordion.Title
                                active={activeIndex === 1}
                                index={1}
                                onClick={this.handleClick}
                                >
                                <Icon name='dropdown' />
                                What kinds of dogs are there?
                                </Accordion.Title>
                                <Accordion.Content active={activeIndex === 1}>
                                <p>
                                    There are many breeds of dogs. Each breed varies in size and
                                    temperament. Owners often select a breed of dog that they find to be
                                    compatible with their own lifestyle and desires from a companion.
                                </p>
                                </Accordion.Content>

                                <Accordion.Title
                                active={activeIndex === 2}
                                index={2}
                                onClick={this.handleClick}
                                >
                                <Icon name='dropdown' />
                                How do you acquire a dog?
                                </Accordion.Title>
                                <Accordion.Content active={activeIndex === 2}>
                                <p>
                                    Three common ways for a prospective owner to acquire a dog is from
                                    pet shops, private owners, or shelters.
                                </p>
                                <p>
                                    A pet shop may be the most convenient way to buy a dog. Buying a dog
                                    from a private owner allows you to assess the pedigree and
                                    upbringing of your dog before choosing to take it home. Lastly,
                                    finding your dog from a shelter, helps give a good home to a dog who
                                    may not find one so readily.
                                </p>
                            </Accordion.Content>
                        </Accordion> */}
                </Segment>
			</div>
		);
	}
};


// export default connect(null, mapDispatchToProps)(App);

const mapStateToProps=(state)=>{
	return{
		isSignedIn: state.auth.isSignedIn
	};
}


// export default connect(null, mapDispatchToProps)(App);

export default connect(mapStateToProps, {})(PortfolioDetail);
