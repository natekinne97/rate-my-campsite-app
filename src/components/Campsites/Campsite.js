import React from 'react';
import { Link } from 'react-router-dom'
// fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCampground } from '@fortawesome/free-solid-svg-icons'
import apiService from '../../api-services/api-services';
import './Campsite.css';
// context
import campsiteContext from '../../context/context';



// displays all sites
class Campsite extends React.Component{
    static contextType = campsiteContext

    // import all campsites
    componentDidMount() {
        this.context.clearError()
        // get all campsites
        apiService.getAllCampsites()
            .then(this.context.setCampsites)
            .catch(this.context.setError);
    }

    // render all the tents for the avg review
    renderTents = num => {
        let arr = [];

        for (let i = 1; i <= 5; i++) {
            if (i <= num && num != 0) {
                arr.push(<FontAwesomeIcon className="tent rev-tent" key={i} icon={faCampground} />);
            } else {
                arr.push(<FontAwesomeIcon className="tent-rate tent tent-less" key={i} icon={faCampground} />);
            }

        }
        return arr;
    }

    // get map the campsites and print each one
    renderCampsites(){
        
        const { campsites = [] } = this.context;
        return campsites.map(site => 
                <Link key={site.id} to={`/info/${site.id}`}>
                    <div className="post">
                        <div className="img-post" style={{ backgroundImage: `url(${site.img})` }}></div>
                    <p className="paragraphs">{site.name}</p>
                    

                    {site.avg_reviews
                        ? <p className="paragraphs"> {this.renderTents(site.avg_reviews)} </p>
                        : <p className="paragraphs">No reviews.</p>}
                    
                   
                    <p className="paragraphs">
                        {site.number_of_reviews} Reviews
                    </p>
                    </div>
                </Link>
            )
        
    }

    render(){
        const {error} = this.context;
    //    only render if there isnt an error
        return(
            <div key="595" className="all-posts">
                {error
                    ? <p className='red'>There was an error, try again</p>
                    : this.renderCampsites()}
            </div>
        );
            
        
    }
}

export default Campsite;