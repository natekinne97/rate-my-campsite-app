import React from "react";
import Review from '../Reviews/Review';
import {Link} from 'react-router-dom'
import './Info.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCampground } from '@fortawesome/free-solid-svg-icons'
import TokenService from '../../services/token-service';
import campsiteContext from '../../context/context';
import apiService from '../../api-services/api-services';

// displays all info of the campsite in an easy to read format
class Info extends React.Component{
    static contextType = campsiteContext

    // get the params
    static defaultProps = {
        match: { params: {} },
    }

    componentDidMount(){
        const { infoId } = this.props.match.params
        
        // get campsite info
        apiService.getCampsiteById(infoId)
            .then(info=>{
                
                this.context.setInfo(info);
            })
            .catch(this.context.setError);
        
        // get all reviews
        apiService.getReviewsForSite(infoId)
            .then(rev=>{
                this.context.setReview(rev);
            })
            .catch(this.setError);
           
    }
    // render all the tents for the avg review
    renderTents = num => {
        let arr = [];

        for (let i = 0; i < num; i++) {
            arr.push(<FontAwesomeIcon key={i} icon={faCampground} />);
        }
        return arr;
    } 


    renderInfo(){
        const { siteInfo=[] } = this.context;

        return   <div key={siteInfo.id} className="full-view">
                <header>{siteInfo.name}</header>
                <div className="info-img" style={{ backgroundImage: `url(${siteInfo.img})` }}></div>
                <p className="para">{siteInfo.park}</p>
                <p className="para">{siteInfo.city}, {siteInfo.state}</p>
                <div className="feature-rating">
                    {this.renderTents(siteInfo.avg_reviews)}
                </div>
            {siteInfo.avg_reviews
                ? <p> {parseFloat(siteInfo.Infoavg_reviews).toFixed(1)}Tents </p>
                : <p>Not yet Reviewed.</p>}
                <p>{siteInfo.description}</p>
            </div>
        
    }

    // send user to login to write review if not logged in
    renderReviewButton(){
        return(
            <>
                <Link
                className="review-login-link"
                to="/login">
                    Login or Signup to write a review
                </Link>
            </>
        )
    }


    renderReviews(){
        const { reviews=[] } = this.context;
        console.log(reviews);
        if(reviews.length === 0){
            console.log('no reviews here');
            return (<p>Not yet Reviewed.</p>)
        }
        return reviews.map(rev=>
            <div key={rev.id} className="reviews">
                {/* reviewer info */}
                <div className="review-info">
                    <div className="review-meta">
                        <p>{rev.author}</p>
                        <p>{rev.date_created}</p>
                      
                    </div>
                    <div className="rating">
                        {this.renderTents(rev.rating)}
                    </div>
                </div>


                <div className="review-des">
                    <p>{rev.text}</p>
                </div>
                <hr />
            </div>
           
        )
    }

    render(){
        
        // this.renderInfo()
        return(
            <div className="info">
                
                {/* Main Content */}
                {this.context.error
                ? <p className="red">An error has occured. please try again later.</p>
                    : this.renderInfo()}
                

               {/* reviews */}
                <h3>Reviews</h3>
                
		    <div className="reviews-container">
                    {this.context.error
                        ? <p className="red">An error has occured. please try again later.</p>
                        : this.renderReviews()}
                    
            </div>
                <div className="write-review-container">
                    <h3>Write a review</h3>
                    <div className="write-review">
                {/* renders the write a review form */}
                {TokenService.hasAuthToken()
                ? <Review/>
                : this.renderReviewButton()
                }
                    </div>
                </div>
            </div>
        );
    }
}

export default Info;