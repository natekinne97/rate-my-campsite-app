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


    // render all the tents for the avg review
    renderTents = num => {
        let arr = [];
        for (let i = 0; i < 5; i++) {
            if (i <= num) {
                arr.push(<FontAwesomeIcon className="tent" key={i} icon={faCampground} />);
            } else {
                arr.push(<FontAwesomeIcon className="tent-rate tent" key={i} icon={faCampground} />);
            }

        }
        return arr;
    }


    renderFeatured(num){
        // get campsite data
        const {campsites=[]} = this.context;
        let numOrient = false;
        // for code reuseability check the number and change the sides of the pic
        if(num === 0){
            numOrient = false;
        }else{
            numOrient = true;
        }
        
       
        // check if there is data for campsite after the 4 times its called for
        // some reason
        if(!campsites[num]){
            return (<p className="red">Error occured. Please try again later</p>);
        }else{
            // make an object out of the data because it runs twices
            // anc comes back with unusable data when divided differently
            let arr = {
                "id":  campsites[num].id,
                "name": campsites[num].name,
                "img":campsites[num].img,
                "number_of_reviews": campsites[num].number_of_reviews,
                "avg_reviews": parseFloat(campsites[num].avg_reviews).toFixed(1)
            }
            
            // return the data
            return <Link to={`/info/${arr.id}`}>
                <div className="featured-container">
                    
                    
                    {numOrient
                    ? null
                        : <div className="featured-pic" style={{ backgroundImage: `url(${arr.img})` }}></div>
                    }

                    <div className="feature-info">

                        <h3>{arr.name}</h3>
                        <div className="feature-rating">
                            {this.renderTents(arr.avg_reviews)}
                        </div>
                        <p>{arr.avg_reviews} Tents {arr.number_of_reviews} reviews</p>
                        {/* not a button but a suggestion for action. see more info */}
                        <div className="info-button"><p>More info</p></div>
                    </div>

                    {numOrient
                        ? <div className="featured-pic" style={{ backgroundImage: `url(${arr.img})` }}></div>
                        : null
                    }
                </div>
            </Link>

        }
        

       
    }


    render(){
        
        return(
            
            <div className="featured-shell">

                {this.renderFeatured(0)}
                {this.renderFeatured(1)}

            </div>
        );
        
    }
}

export default Featured;