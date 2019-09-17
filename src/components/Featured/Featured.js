import React from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCampground } from '@fortawesome/free-solid-svg-icons'
import apiService from '../../api-services/api-services';
import campsiteContext from '../../context/context';
import './Featured.css';

// displays the featured component on the home page
// the reason this is divided into a seperate component is because 
// this component requires a large amount of its own logic
// to display the correct site and image
class Featured extends React.Component {
    static contextType = campsiteContext

 
    // import all campsites
    componentDidMount() {
        this.context.clearError()
        // get all campsites
        apiService.getFeaturedSite()
            .then(result=>{
               
                this.context.setCampsites(result);
            })
            .catch(this.context.setError);
    }


    renderFeatured(){
        // get campsite data
        const {campsites=[]} = this.context;
       
        // id, img, name, number_of_reviews, avg_reviews
       
        // check if there is data for campsite after the 4 times its called for
        // some reason
        if(!campsites[0]){
            console.log('undefined')
        }else{
            // make an object out of the data because it runs twices
            // anc comes back with unusable data when divided differently
            let arr = {
                "id":  campsites[0].id,
                "name": campsites[0].name,
                "img":campsites[0].img,
                "number_of_reviews": campsites[0].number_of_reviews,
                "avg_reviews": parseFloat(campsites[0].avg_reviews).toFixed(1)
            }
            let tents = []
            for (let i = 0; i < arr.avg_reviews - 1; i++) {
                tents[i] = <FontAwesomeIcon key={i} icon={faCampground} />;
            }
            // return the data
            return <Link to={`/info/${arr.id}`}>
                <div className="featured-container">
                    <div className="featured-pic" style={{ backgroundImage: `url(${arr.img})` }}></div>
                    {/* featured info */}
                    <div className="feature-info">
                        <h3>{arr.name}</h3>
                        <div className="feature-rating">
                            {tents}
                        </div>
                        <p>{arr.avg_reviews} Tents {arr.number_of_reviews} reviews</p>
                    </div>
                </div>
            </Link>

        }
        

       
    }


    render(){
        
        return(
            
            <div className="featured-shell">
                <h3>Featured Campsite</h3>
               
                {this.renderFeatured()}

            </div>
        );
        
    }
}

export default Featured;