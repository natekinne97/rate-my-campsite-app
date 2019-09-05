import React from 'react';

// displays the post form for making a new campsite
// all gen-form classes will be kept in the indexcss
class AddCampsite extends React.Component{

    render(){
        return(
            <div>
                <header>Post Campground</header>
                <div>chosen pic goes here</div>
                <form className="new-site gen-form">

                    <label htmlFor="campground-pic">Campsite picture</label>
                    <input type="file" name="campground-pic"/>

                    <label htmlFor="name">Campsite name</label>
                    <input type="text" name="name"/>

                    <label htmlFor="description">Description</label>
                    <input type="text" name="description"/>

                    <label htmlFor="park-name">Park name</label>
                    <input type="text" name="park-name"/>

                    <label htmlFor="city">City</label>
                    <input type="text" name="city"/>

                    <label htmlFor="state">State</label>
                    <input type="text" name="state"/>

                    <button type="submit">Submit</button>

		        </form>
            </div>
        );
    }
}

export default AddCampsite;