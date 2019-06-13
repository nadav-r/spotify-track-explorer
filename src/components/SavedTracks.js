import React from 'react';
import './SavedTracks.css';
import Track from './Track';

const SavedTracks = ({showList, savedTracks,addToPlaylist,newPlaylist}) =>{
		const list = savedTracks./*slice(0,10).*/map((track,i) => {//shows only 10 items
			if(i<savedTracks.length-1) {
				let bg = i%2===0? 'hover-bg-lightest-blue': 'hover-bg-light-yellow';
				return (<li key = {track.id+2} className={` ph3 pv2  b--light-silver ttc tooltip bg-animate hover-black ${bg}`}>{/*hover-bg-green*/}
							<Track  track = {track}  addToPlaylist={addToPlaylist} src ={'savedTracks'} newPlaylist={newPlaylist}/>
						</li>)
			}
			else{
				return(<li  key = {track.id+2} className='hover-bg-light-yellow ph3 pv2 ttc'><Track track = {track} addToPlaylist={addToPlaylist} src ={'savedTracks'} /></li>)
			}
		})


	    return (
	    	<div>
	    		{showList?
	    			(<ul className =' list pl0 ml0 center mw6 bg-near-black  b--light-silver br3 shadow-5'>{list}
	    			</ul>)
	    			:
	    			null}
	    	</div>
	    );

}








export default SavedTracks;