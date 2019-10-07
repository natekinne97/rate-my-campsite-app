import React, {Component} from 'react';
// handles the context for all of the campsites
// display the campsite
const campsiteContext = new React.createContext({
    // data
    campsites: [],
    siteInfo: [],
    reviews: [],
    // error checking
    error: null,
    // set data
    setInfo: ()=>{},
    setReview: ()=>{},
    setCampsites: ()=>{},
    setUser: ()=>{},
    // insert data
    addReview: ()=>{},
    addCampsite: ()=>{},
    // error handling
    setError: () => { },
    clearError: () => { },
});


export default campsiteContext;

export class CampsiteProvider extends Component{
    _isMounted = false;

    state={
        campsites: [],
        siteInfo: [],
        reviews: [],
        
        error: null,
        isLoading: true
    }

    setCampsites = campsites =>{
        this.setState({
             campsites
        })
    }

    setInfo = siteInfo => {
        this.setState({
            siteInfo
        })
    }
    // initial set for reviews from db
    setReview = reviews => {
        this.setState({
            reviews
        })
    }

    // but doesnt always refresh correctly
    // add review to the state
    // inserts to the state a new review
    addReview = review => {
        this.setReview([
            ...this.state.reviews,
            review
        ])
    }
    // add campsite to the state 
    addCampsite = campsite => {
        this.setReview([
            ...this.state.campsites,
           campsite
        ])
    }

    setError = error => {
        console.error(error)
        this.setState({ error })
    }

    clearError = () => {
        this.setState({ error: null })
    }

    render(){
        const value={
            // data
            campsites: this.state.campsites,
            siteInfo: this.state.siteInfo,
            reviews: this.state.reviews,
            // insert new data
            addReview: this.addReview,
            addCampsite: this.addCampsite,
            // error
            error: this.state.error,
            // set data
            setCampsites: this.setCampsites,
            setInfo: this.setInfo,
            setReview: this.setReview,
            // error handling
            setError: this.setError,
            // clear
            clearError: this.clearError
        }
        return(
            <campsiteContext.Provider value={value}>
                {this.props.children}
            </campsiteContext.Provider>
        );
    }
}