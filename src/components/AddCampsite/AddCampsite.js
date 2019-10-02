import React from 'react';
import {Redirect} from 'react-router-dom';
import apiService from '../../api-services/api-services';
import campsiteContext from '../../context/context';
import './AddCampsite.css';

// displays the post form for making a new campsite
// all gen-form classes will be kept in the indexcss
class AddCampsite extends React.Component{
    static contextType = campsiteContext

    static defaultProps = {
        location: {},
        history: {
            push: () => { },
        },
    }

    directToHome = id =>{
        const { history } = this.props
        history.push(`/info/${id}`);
    }

    state={
        submitted: false,
        img: '',
        selectedFile: null,
        bgImage: null
    }

    onPicChange = ()=>{
        const img = document.getElementById('new-img').value;
        this.setState({
            img
        })
    }

    fileChangedHandler = (event)=>{
       
        this.setState({ 
            selectedFile: event.target.files[0],
            bgImage: URL.createObjectURL(event.target.files[0]) 
        });
        
    }

    handleSubmit = e =>{
        e.preventDefault();
        
        // campground-pic, name, description, park-name, city, state
        const { name, description, park, city, state} = e.target;

        console.log(this.state.selectedFile, 'selected file being sent');

        this.setState({
            submitted: true
        })
        
        let formData = new FormData();
        formData.append('img', this.state.selectedFile);
        formData.append('name', name.value);
        formData.append('description', description.value);
        formData.append('park', park.value);
        formData.append('city', city.value);
        formData.append('state', state.value);
        console.log(formData, 'form data');

        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1])
        }

        const newCampsite = {
            img: this.state.selectedFile,
            name: name.value,
            description: description.value,
            park: park.value,
            city: city.value,
            state: state.value
        }
        console.log(newCampsite, 'new campsite');
        // insert new campsite
        apiService.addNewCampsite(
           formData
            ).then(this.context.addNewCampsite)
        .then(site=>{
            console.log(site);
            name.value = ''
            description.value = ''
            park.value =  ''
            city.value = ''
            state.value = ''
            console.log(site, 'new site');
            console.log('site.id');
            this.directToHome(site.id);
        })
        .catch(this.context.setError);
    }

    render(){
        const {submitted} = this.state;
        if(submitted === true){
            return <Redirect to="/"/>
        }

        return(
            <div className="add-campsite">
                <header>Post Campground</header>
                <div className="chosen-pic" style={{ backgroundImage: `url(${this.state.bgImage})` }}>
                    {this.state.bgImage
                    ? null
                : <p>Chosen picture</p>}
                </div>
                <form className="new-site gen-form" id="add-site" onSubmit={this.handleSubmit}>

                    <label htmlFor="new-img">Link to campsite image</label>
                    <input type="file" onChange={this.fileChangedHandler} />

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