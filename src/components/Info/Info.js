import React from "react";
import Review from '../Reviews/Review';
import {Link} from 'react-router-dom'
import './Info.css';
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
        console.log(typeof infoId);
        // get campsite info
        apiService.getCampsiteById(infoId)
            .then(this.context.setInfo)
            .catch(this.context.setError);
        
        // get all reviews
        apiService.getReviewsForSite(infoId)
            .then(this.context.setReview)
            .catch(this.setError);
           
    }

    renderInfo(){
        const { siteInfo=[] } = this.context;
        
        return siteInfo.map(info => 
            <div key={info.id} className="full-view">
                <header>{info.name}</header>
                <div className="info-img" style={{ backgroundImage: `url(${info.img})` }}></div>
                <p>Tent Rating</p>
                <p>3.8/{info.number_of_reviews} Reviews</p>
                <p>{info.description}</p>
            </div>
        ) 
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
        return reviews.map(rev=>
            <div key={rev.id} className="reviews">
                {/* reviewer info */}
                <div className="review-info">
                    <div className="review-meta">
                        <p>author</p>
                        <p>{rev.date_created}</p>
                        {console.log(rev.date_created, 'date created')}
                    </div>
                    <div className="rating">
                        <p>Rating: {rev.rating}</p>
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
        
        
        return(
            <div className="info">
                
                {/* Main Content */}
                {this.renderInfo()}

               {/* reviews */}
                <h3>Reviews</h3>
                
		    <div className="reviews-container">
                    {this.renderReviews()}
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