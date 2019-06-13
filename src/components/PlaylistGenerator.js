import React from 'react';
import Track from './Track';

const PlaylistGenerator = ({newPlaylist, deleteFromNewPlaylist, createNewPlaylist,handlePlalylistNameInput,deleteNewPlaylist}) =>{

		const list = newPlaylist.map((track,i) => {

			let bg = i%2===0? 'hover-bg-lightest-blue': 'hover-bg-light-yellow';
			let bgLast = i%2===0? 'hover-bg-lightest-blue': 'hover-bg-light-yellow';
			if(i<newPlaylist.length-1) {
				return (<li key = {i} className={`ph3 pv2  b--light-silver ttc tooltip bg-animate ${bg}`}>
							<Track track = {track} src = {'playListGenerator'} deleteFromNewPlaylist={deleteFromNewPlaylist}/>
						</li>)
			}
			else{
				return(<li  key = {i} className={`ph3 pv2 ttc ${bgLast} `}>
						<Track track = {track} src = {'playListGenerator'} deleteFromNewPlaylist={deleteFromNewPlaylist}/>
						</li>)
			}
		})

	    return (
	    	<div className ='tc pa3   w-30 b--light-silver' >
	    	   <nav className=" tc  center ">
               		<h3 className="white">Create a new playlist...</h3>
               		<p>
               			<input className='input-reset ba b--black-20 pa2 mb2 db w-70 center' 
               				type='text' onChange={handlePlalylistNameInput}placeholder='New Playlist Name...'/>
               		</p>
               		<a id= 'create-new-playlist'className="f6 link dim br3 ph3 pv2 mb2 dib white bg-green  " 
               		onClick={createNewPlaylist}
               		href="#">Create New Playlist</a>
	    		</nav>
	    		{newPlaylist.length>0?
	    		(<div>
		    		<ul className='list pl0 ml0 center mw6 br2 bg-near-black b--light-silver br3 shadow-5'>
		    			{list}
		    		</ul>
		    		<a className="f6 link dim br3 ph3 pv2 mb2 dib white bg-red" 
               		onClick={deleteNewPlaylist}
               		href="#">Clear All</a>

		    	</div>
		    	)
	    		:
	    		(<ul className='list pl0 ml0 center mw6 br2 bg-near-black b--light-silver br3 shadow-5'>
	    			<li className="ph3 pv2 ttc hover-bg-lightest-blue gray"> Add tracks here... </li>
	    			<li className="ph3 pv2 ttc hover-bg-light-yellow gray"> My Lorem Track </li>
	    			<li className="ph3 pv2 ttc hover-bg-lightest-blue gray"> Someone's Ipsum  </li>
	    		</ul>)
	    		}
	    	</div>
	    );

}

export default PlaylistGenerator;