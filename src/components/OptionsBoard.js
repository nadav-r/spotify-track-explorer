import React from 'react';
import SavedTracksExplorer from './SavedTracksExplorer';
import Recommendations from './Recommendations';

import { BrowserRouter, Route, Link } from "react-router-dom";
const OptionsBorad = ({accessToken}) =>{
    return (
        <BrowserRouter id='router'>    
            <div>
                <nav className="">
                    
                        <Link  to="/SavedTracksExplorer" className="link dim white">Explore saved tracks | </Link> 
                        <Link  to="/Recommendations" className="link dim white"> Get recomendations</Link>
                   
           

                </nav>
                <Route path='/SavedTracksExplorer' component ={() => <SavedTracksExplorer 
                    accessToken={accessToken}/>}/>
                <Route path='/Recommendations' component ={() => <Recommendations 
                    accessToken={accessToken}/>}/>
            </div>
        </BrowserRouter>
    );
}


export default OptionsBorad