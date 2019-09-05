import React from 'react';
import { Link } from 'react-router-dom'
import './Campsite.css';
import STORE from '../../Store';

class Campsite extends React.Component{



    render(){
        return(
            <div className="all-posts">
                {STORE.Campsites.map(site=>(
                    
                    <Link key={site.id}  to={`/info/${site.id}`}>
                        <div className="post">
                            <div><img className="img-post" src={site.picture} alt={site.alt} /></div>
                            <p>{site.state}</p>
                            <p>{site.rating}/{site.reviews}</p>
                        </div>
                    </Link>
                   
                ))}
            </div>
        );
    }
}

export default Campsite;