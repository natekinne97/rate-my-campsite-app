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
        
       
        console.log(this.state.tent)
        apiService.postReview(
            rev.value,
            this.state.tent,
            +siteInfo.id
        )
            .then(rev=>{
                console.log(rev);
                this.context.addReview(rev);
            })
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
        for (let i = 1; i <= 5; i++) {
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
                
                <button type="submit">Submit Review</button>
            </form>
             
           
        );
    }
}

export default Review;