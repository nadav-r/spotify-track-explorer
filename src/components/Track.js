import React from 'react';
import './Track.css';



const Track = ({track,addToPlaylist,src,deleteFromNewPlaylist,newPlaylist}) =>{
		//if track is in new list don't show add btn
		(function (){
			const trackId = track.id;
			//if(newPlaylist){console.log('newPlaylist.find(track => track.id===trackId) =', newPlaylist.find(track => track.id===trackId))}
			if(src==='savedTracks' && newPlaylist && newPlaylist.find(track => track.id===trackId)){
				
				const el = document.getElementById(track.id); 
				if(el && !el.classList.contains('hidden')){
					el.classList.add('hidden');
				}
			}
		})()

		//add btn for the savedTracks and trash btn for the new playlist 
		const btn = (()=>{

			if (src==='playListGenerator'){
				return (
					<i id = {track.id+1} className="add-btn fas fa-trash" //track.id+1 for enabling deletion from new playlist change the corresponing element in the savedTracklist
					style = {{float:'right',color:'white'}} 
					onClick={()=>{
							deleteFromNewPlaylist(track.id+1);
							}
						}> 
					</i>
					);
			}
			else if(src==='savedTracks' ){
				return(
						<i id = {track.id}
						className="add-btn fas fa-check-circle"
						style = {{float:'right',color:'white'}}
						onClick={()=>{
							document.getElementById(track.id).classList.add('hidden'); 
							addToPlaylist(track.id)}}> </i>
					)
			}
			else return null;
		})();
	    return (
				<div className='tooltip  hover-black'>
					<a className="  link dim gray hover-black" href={track.external_urls.spotify} target="_blank"  rel="noopener noreferrer">{track.name} </a>
					{btn}


					<span className='tooltiptext  '>
					<img className ="pa2" src ={track.album.images[0].url}/> 
					<span> Artist: {track.artists[0].name}</span>
					<span>Popularity: {track.popularity}</span>
					<span>Energy: {track.analysis.energy}</span>
					<span>Danceability: {track.analysis.danceability}</span>
					<span>Valence: {track.analysis.valence}</span>

					</span>
				</div>
	    );

}

export default Track;