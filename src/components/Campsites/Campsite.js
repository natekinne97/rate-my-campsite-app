import React from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCampground } from '@fortawesome/free-solid-svg-icons'

import './Campsite.css';
import STORE from '../../Store';

// displays all sites
class Campsite extends React.Component{



    render(){
        return(
            <div className="all-posts">
                {STORE.Campsites.map(site=>(
                    
                    <Link key={site.id}  to={`/info/${site.id}`}>
                        <div className="post">
                            <div className="img-post" style={{backgroundImage: `url(${site.picture})`}}></div>
                            <p>{site.name}</p>
                            <FontAwesomeIcon icon={faCampground} />
                            <FontAwesomeIcon icon={faCampground} />
                            <FontAwesomeIcon icon={faCampground} />
                            <FontAwesomeIcon icon={faCampground} />
                            <p>{site.rating} Tents {site.reviews} Reviews</p>
                        </div>
                    </Link>
                   
                ))}
            </div>
        );
    }
}

export default Campsite;