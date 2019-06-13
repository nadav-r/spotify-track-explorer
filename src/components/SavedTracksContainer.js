import React from 'react';
import SavedTracks from './SavedTracks';

const SavedTracksContainer = ({showList,savedTracks,addToPlaylist,deleteFromNewPlaylist,newPlaylist,sortTracks}) =>{
	
	return(
		<div className ='tc  br2  b--light-silver pa3' >
                   
                  <nav className="tc center ">
                   <h3 className=" white">List Your Saved Tracks Ordered By...</h3>
                    <a className="f6  f5-l link bg-lightest-blue bg-animate black hover-bg-blue hover-black dib pa3 ph4-l " href="#" 
                        onClick = {() =>{sortTracks('popularity')}}>Popularity</a>
                    <a className="f6  f5-l link bg-light-yellow bg-animate black hover-bg-yellow hover-black dib pa3 ph4-l" href="#"
                        onClick = {() =>{sortTracks('energy')}}>Energy</a>
                    <a className="f6   f5-l link bg-lightest-blue bg-animate black hover-bg-light-blue hover-black dib pa3 ph4-l" href="#"
                        onClick = {() =>{sortTracks('danceability')}}>Danceability</a>  
                    <a className="f6 f5-l link bg-light-yellow bg-animate black hover-bg-yellow hover-black dib pa3 ph4-l" href="#"
                        onClick = {() =>{sortTracks('valence')}}>Valence</a>      
                    </nav> 
                    <SavedTracks  showList = {showList} savedTracks={savedTracks} addToPlaylist={addToPlaylist} deleteFromNewPlaylist={deleteFromNewPlaylist}
                    newPlaylist={newPlaylist}/>

            </div>
          )
}


export default SavedTracksContainer;