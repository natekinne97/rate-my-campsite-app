import React from 'react'
import Featured from '../Featured/Featured';
import Campsite from '../Campsites/Campsite';

class Homepage extends React.Component{

    render(){
        return(
            <>
                <Featured/>
                <Campsite/>
            </>
        );
    }
}

export default Homepage;