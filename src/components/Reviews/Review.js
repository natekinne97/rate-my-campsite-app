import React from "react";
import './Review.css'

// the purpose of this class is to render and handle submitted reviews
// rendered inside Info.js
class Review extends React.Component{

    render(){
        return(
            <div className="write-review-container">
                <h3>Write a review</h3>
                <div className="write-review">
                    <form className="gen-form ">
                        <label htmlFor="rev">Review</label>
                        <textarea name="rev"></textarea>
                        <label>Tents</label>
                        <select>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                        <button type="submit">Submit Review</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Review;