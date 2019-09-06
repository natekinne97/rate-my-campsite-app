import React from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCampground } from '@fortawesome/free-solid-svg-icons'

import './Featured.css';

// displays the featured component on the home page
// the reason this is divided into a seperate component is because 
// this component requires a large amount of its own logic
// to display the correct site and image
class Featured extends React.Component {



    render(){

        return(
            <div className="featured-shell">
                <h3>Featured Campsite</h3>

               <Link to='/info/:infoId'>
                    <div className="featured-container">
                        <div className="featured-pic">
                            {/* in the future this will
                        be replaced  by a div that has a
                        dynamic background */}
                            <img src="https://i.imgur.com/hrTJ5ke.jpg" alt="some picture"></img>
                        </div>
                        {/* featured info */}
                        <div className="feature-info">
                            <h3>Fall Lake</h3>
                            <div className="feature-rating">
                                <FontAwesomeIcon icon={faCampground} />
                                <FontAwesomeIcon icon={faCampground} />
                                <FontAwesomeIcon icon={faCampground} />
                                <FontAwesomeIcon icon={faCampground} />
                                <FontAwesomeIcon icon={faCampground} />
                            </div>
                            <p>4.5 Tents 20 reviews</p>     
                        </div>
                    </div>
               </Link>

            </div>
        );
    }
}

export default Featured;