import  config from '../config';
import TokenService from '../services/token-service';


const apiService = {
    getAllCampsites(){
        return fetch(`${config.API_ENDPOINT}/campsites/`, {
            headers: {

            }
        })
        .then(res =>
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        )
    },
    // gets info for campsite clicked on
    getCampsiteById(id){
        return fetch(`${config.API_ENDPOINT}/campsites/${id}`, {
            headers: {

            }
        })
        .then(res =>
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        )
    },
    // get reviews for clicked on campsite
    getReviewsForSite(id){
        return fetch(`${config.API_ENDPOINT}/campsites/${id}/reviews`, {
            headers: {

            }
        })
        .then(res =>
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        )
    },

    // make a new site
    addNewCampsite(img, name, description, park, city, state) {
        return fetch(`${config.API_ENDPOINT}/campsites/`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({ 
                img, 
                name, 
                description, 
                park, 
                city, 
                state
            }),
           
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
        )
    },
    // gets the featured site for display
    getFeaturedSite() {
        return fetch(`${config.API_ENDPOINT}/campsites/?order=avg_reviews`, {
            headers: {

            }
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    // make a new review
    postReview(text, rating, campsite_id) {
        
        return fetch(`${config.API_ENDPOINT}/reviews/`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
                text,
                rating,
                campsite_id
            }),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )

    },

}

export default apiService;