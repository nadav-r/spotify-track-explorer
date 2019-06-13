import React, { Component } from 'react';
import querystring from 'querystring';

class Recommendations extends Component {
	constructor(props){
		super(props);
        this.getTopArtists();
        this.state= {
            topArtists:[],
            chosenArtists:[],
            recommendations:[],
            newPlayList:[],
            newPlaylistName :'',
        }   
      }

    getTopArtists =  ()=>{
    	let url = 'https://api.spotify.com/v1/me/top/artists?time_range=long_term';
   		const options = {
        method :'GET',
        headers: {
            'Authorization': 'Bearer ' + this.props.accessToken
            }
        }
        fetch(url,options)
        .then(res=>res.json())
        .then(res =>{this.setState({topArtists:res.items}); this.getRecommendations()})
        .catch(e =>console.log(e));
    }  

    getRecommendations = () =>{
    	let url = 'https://api.spotify.com/v1/recommendations?';
    	let query = querystring.stringify({
    			seed_artists: [this.state.topArtists[0].id,this.state.topArtists[1].id]
    			}
    		);
    	url+=query;
    	console.log(url);

   		const options = {
        method :'GET',
        headers: {
            'Authorization': 'Bearer ' + this.props.accessToken
            }
        }
        fetch(url,options)
        .then(res => res.json())
        .then(res=>console.log(res))
        .catch(e=>console.log(e));
    }

	render(){
		return(
			<div>
				<h2>Your top artists...</h2>
			</div>
		)

	}

}

export default Recommendations;