import React from "react";
import campsiteContext from '../../context/context';
import apiService from '../../api-services/api-services';
// fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCampground } from '@fortawesome/free-solid-svg-icons'

import './Review.css'

// the purpose of this class is to handle submitted reviews
// rendered inside Info.js
class Review extends React.Component{
    static contextType = campsiteContext

    constructor(){
        super()
        this.state={
            tent: 0
        }
    }

    setTents = tent=>{
        console.log(tent, 'tent clicked');
        this.setState({
            tent: tent
        })
    }
    

    handleSubmit = e =>{
        e.preventDefault();

        const {siteInfo} = this.context;
        const { rev} = e.target;
        
        apiService.postReview(
            rev.value,
            this.state.tent,
            +siteInfo.id
        )
            .then(this.context.addReview)
            .then(() => {
                rev.value = ''
            })
            .catch(error=>{
                if (error === 'SyntaxError: Unexpected end of JSON input at api-services.js:82'){
                    console.log('useless error still works');
                }
               this.context.setError(error);
            })
    }


    renderTents = () => {
        let arr = [];
        for (let i = 0; i < 5; i++) {
            if (i < this.state.tent+1) {
                arr.push(<FontAwesomeIcon className="tent" key={i} icon={faCampground} onClick={e=>this.setTents(i)} />);
            } else {
                arr.push(<FontAwesomeIcon className="tent-rate tent" key={i} icon={faCampground} onClick={e => this.setTents(i)} />);
            }

        }
        return arr;
    }

    render(){
        
        return(
            
            <form className="gen-form " onSubmit={this.handleSubmit}>
                <label htmlFor="rev">Review</label>
                <textarea name="rev"></textarea>
                <label>Tents</label>

                <div className="rev-tents">
                    {this.renderTents()}
                </div>
                
                {/* <select name="rating">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select> */}
                <button type="submit">Submit Review</button>
            </form>
             
           
        );
    }
}

export default Review;