import React from "react";
// include store for easier reading code and less code
import STORE from '../../Store';
import Review from '../Reviews/Review';
import './Info.css';

// displays all info of the campsite in an easy to read format
class Info extends React.Component{
   
    render(){
        return(
            <div className="info">
                
                {/* Main Content */}
                <div className="full-view">
                    <header>Olympic National Park</header>
                    <img src="https://i.imgur.com/2NF3pvW.jpg"/>
                        <p>Tent Rating</p>
                        <p>3.8/10 Reviews</p>
                        <p>
                            This campsite provides an excelent view
                            of the pacific ocean. Located on the shores of
                            Olympic National Park it provides an exelent place to
                            camp for anyone willing to make the 2 mile trek to the
                            site.
			            </p>
		        </div>

               {/* reviews */}
                <h3>Reviews</h3>
		    <div className="reviews-container">
                
                {STORE.Reviews.map(review => (
                    <div key={review.id} className="reviews">
                        {/* reviewer info */}
                       <div className="review-info">
                           <div className="review-meta">
                                <p>{review.author}</p>
                                <p>{review.date_posted}</p>
                           </div>
                            <div className="rating">
                                <p>Rating: {review.rating}</p>
                            </div>
                       </div>
                       
                        
                        <div className="review-des">
                            <p>{review.review}</p>
                        </div>
                        <hr/>
                    </div>
                ))}
            </div>

                <Review/>
                
            </div>
        );
    }
}

export default Info;