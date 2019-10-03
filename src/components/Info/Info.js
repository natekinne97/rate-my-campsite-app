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
        console.log(num, 'num')
        for (let i = 0; i < 5; i++) {
            if (i <= num && num != 0) {
                arr.push(<FontAwesomeIcon className="tent rev-tent" key={i} icon={faCampground} />);
            } else {
                arr.push(<FontAwesomeIcon className="tent-rate tent tent-less" key={i} icon={faCampground} />);
            }

        }
        return arr;
    }



    renderInfo(){
        const { siteInfo=[] } = this.context;

        return <div key={siteInfo.id} className="info-img" style={{ backgroundImage: `url(${siteInfo.img})` }}>
               
                {/* <div className="info-img" style={{ backgroundImage: `url(${siteInfo.img})` }}></div> */}
                
                <div className="info-info">
                    <header>{siteInfo.name}</header>
                    <p className="para">{siteInfo.park}</p>
                    <p className="para">{siteInfo.city}, {siteInfo.state}</p>
                    <div className="feature-rating">
                        {this.renderTents(siteInfo.avg_reviews)}
                    </div>
                
                    <p>{siteInfo.description}</p>
                </div>
                
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
        if(reviews.length === 0){
            return (<p>Not yet Reviewed.</p>)
        }
        return reviews.map(rev=>
            <div key={rev.id} className="reviews">
                {/* reviewer info */}
                <div className="review-info">
                    <div className="rating">
                        {this.renderTents(rev.rating)}
                    </div>
                </div>
                <div className="review-des">
                    <p>"{rev.text}"</p>
                </div>

                <div className="review-meta">
                    <p>- {rev.author} &#8194;</p>
                    <p> {rev.date_created}</p>

                </div> 

               
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