import React from 'react';
import {Redirect} from 'react-router-dom';
import apiService from '../../api-services/api-services';
import campsiteContext from '../../context/context';

// displays the post form for making a new campsite
// all gen-form classes will be kept in the indexcss
class AddCampsite extends React.Component{
    static contextType = campsiteContext

    state={
        submitted: false
    }

    handleSubmit = e =>{
        e.preventDefault();
        // campground-pic, name, description, park-name, city, state
        const { img, name, description, park, city, state} = e.target;

        this.setState({
            submitted: true
        })

        // insert new campsite
        apiService.addNewCampsite(
            img.value, 
            name.value, 
            description.value, 
            park.value, 
            city.value, state.value
            ).then(this.context.addNewCampsite)
        .then(()=>{
            img.value = ''
            name.value = ''
            description.value = ''
            park.value =  ''
            city.value = ''
            state.value = ''
        })
        .catch(this.context.setError);


    }

    render(){
        const {submitted} = this.state;
        if(submitted === true){
            return <Redirect to="/"/>
        }

        return(
            <div>
                <header>Post Campground</header>
                <div>chosen pic goes here</div>
                <form className="new-site gen-form" onSubmit={this.handleSubmit}>

                    <label htmlFor="img">Campsite picture</label>
                    <input type="text" name="img" required/>

                    <label htmlFor="name">Campsite name</label>
                    <input type="text" name="name" required/>

                    <label htmlFor="description">Description</label>
                    <textarea name="description" required></textarea>
                    

                    <label htmlFor="park-name">Park name</label>
                    <input type="text" name="park" required/>

                    <label htmlFor="city">City</label>
                    <input type="text" name="city" required/>

                    <label htmlFor="state">State</label>
                    <input type="text" name="state" required/>

                    <button type="submit">Submit</button>

		        </form>
            </div>
        );
    }
}

export default AddCampsite;