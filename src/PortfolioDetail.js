import React from 'react';
import Header from './Header';
import { Segment, Accordion, Icon, Image, } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './styles/PortfolioContainer.css';

class PortfolioDetail extends React.Component{

	state = { activeIndex: 0 }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

	componentDidMount=()=>{
        console.log('X')
	}

	componentWillUnmount=()=>{

	}

	render(){
        const { activeIndex } = this.state
		console.log(this.props.bgColor)
		return(
			<div style={{width:'100%',scrollbarColor:'transparent transparent',scrollbarWidth:'none',userSelect:'text'}}>
                <Header/>
                <Segment className="portfolio-detail-container">
                    <div class="ui header">
                        Ice ball
                    </div>
                    <div class="ui message" style={{minWidth: '100%'}}>
                        <p>Made by .........</p>
                    </div>
                    <Image className='portfolio-detail-img' src='https://images.pexels.com/photos/302743/pexels-photo-302743.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' />
                    <div className="ui message portfolio-detail-accord">
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
                        </Accordion>
                    </div>
                </Segment>
			</div>
		);
	}
};


// export default connect(null, mapDispatchToProps)(App);

export default PortfolioDetail;
