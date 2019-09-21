import React from "react";
import campsiteContext from '../../context/context';
import apiService from '../../api-services/api-services';
import TokenServices from '../../services/token-service';
import './Review.css'

// the purpose of this class is to handle submitted reviews
// rendered inside Info.js
class Review extends React.Component{
    static contextType = campsiteContext

    

    handleSubmit = e =>{
        e.preventDefault();

        const {siteInfo} = this.context;
        const { rev, rating} = e.target;

        console.log(Number(this.context.useID), 'user id');

        apiService.postReview(rev.value, Number(rating.value), Number(siteInfo.id), Number(this.context.useID))
            .then(this.context.addReview)
            .then(() => {
                rev.value = ''
            })
            .catch(this.context.setError)
    }

    render(){
        
        return(
            
            <form className="gen-form " onSubmit={this.handleSubmit}>
                <label htmlFor="rev">Review</label>
                <textarea name="rev"></textarea>
                <label>Tents</label>
                <select name="rating">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <button type="submit">Submit Review</button>
            </form>
             
           
        );
    }
}

export default Review;