import React from 'react'
import Featured from '../Featured/Featured';
import Campsite from '../Campsites/Campsite';
import './Homepage.css';


class Homepage extends React.Component{

    renderLandingPage(){
        return(<div className="landing-page">
            <header>
                <h2>Show the world your great campsite discovories</h2>
                <p>"A social media for campsites."</p>
                <p>Post your favorite campsites and let the world review them.</p>
            </header>
        </div>);
    }

    render(){
        return(
            <React.Fragment>

                {this.renderLandingPage()}

                <Featured/>
                
                    <Campsite />
               
               
            </React.Fragment>
        );
    }
}

export default Homepage;