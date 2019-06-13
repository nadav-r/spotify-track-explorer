import React, { Component } from 'react';
import SavedTracks from './SavedTracks';
import PlaylistGenerator from './PlaylistGenerator';
import SavedTracksContainer from './SavedTracksContainer';

class SavedTracksExplorer extends Component {
    constructor(props){
      super(props);
        this.baseURL = 'https://api.spotify.com/v1';
        this.options ={
        method :'GET',
        headers: {
            'Authorization': 'Bearer ' + this.props.accessToken
            }
        }
        this.getSavedTracks();
        this.state= {
            savedTracks:[],
            showList:false,
            newPlaylist:[],
            newPlaylistName :'',

        }   
      }
    

    getSavedTracks = () =>{
        let savedTracks =[];
        fetch(this.baseURL+ '/me/tracks',this.options)
        .then(res => res.json())
        .then(res =>{
            savedTracks = res.items;
            savedTracks = savedTracks.map(obj => obj.track);
            savedTracks.forEach(track => {
                fetch(this.baseURL + '/audio-features/'+track.id, this.options)//for each track item add an audio features field
                .then(analysis => analysis.json())
                .then(analysis => {
                    track['analysis'] = analysis;
                })
                .catch(e => console.log('error fetching audio features'));
            })
            savedTracks.sort(this.comparePopularity);
            this.setState({savedTracks});
        })
        .catch(e => console.log(e,'error fetching tracks'));
        
    }

    createNewPlaylist =  async () =>{
        if(this.state.newPlaylist.length===0){
            alert('Please add at least one track to create a new playlist');
            return;

        }
        if(!window.confirm('Are you sure you want to create this playlist?')){
            return;
        }
        const userProfile = await fetch(this.baseURL+ '/me', this.options)
                       .then(res => res.json())
                       .catch(e => console.log(e));
        const userId = userProfile.id;
        let url = this.baseURL +`/users/${userId}/playlists`;
        let name = this.state.newPlaylistName.length>0? this.state.newPlaylistName:'New Playlist'
        let options ={
            method :'POST',
            headers: {
                'Authorization': 'Bearer ' + this.props.accessToken,
                'Content-Type': 'application/json'
                },
            body :JSON.stringify({name: name,public:false})
        }
        console.log(options);
        const newPlaylist = await fetch(url, options)
                            .then(res => res.json())
                            .catch(e => console.log(e));
        console.log(newPlaylist);

        const playlistId = newPlaylist.id;
        const uriList = this.state.newPlaylist.map(track => track.uri);
        url = this.baseURL +`/playlists/${playlistId}/tracks?`
        options = {
            method:'POST',
            headers: {
                'Authorization': 'Bearer ' + this.props.accessToken,
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                'uris':uriList
            })
        }

        fetch(url,options).then(res => {if (res.status>=200){alert(name + ' was added to your playlists' )}}).catch(e => console.log(e));
        this.setState({newPlaylist :[]})
       
        let iEleList = Array.from(document.getElementsByTagName('i'));
        iEleList.forEach(i=> {
            if(i.classList.contains('hidden')){
                i.classList.remove('hidden');
            }
        })

        document.getElementsByTagName('input')[0].value='';


    }

    handlePlalylistNameInput = (e) => {
        
        this.setState({newPlaylistName:e.target.value});
    }

    addToPlaylist  = (trackId) => {
        const newPlaylist = this.state.newPlaylist;
        const track = this.state.savedTracks.find(track => track.id===trackId);
        newPlaylist.push(track);
        this.setState({newPlaylist})
    }

    deleteFromNewPlaylist = (trackId) =>{//track ids in the new playlist i-elements ===trackids in saved tracks list +1
        const newPlaylist = this.state.newPlaylist.filter(track => track.id!==trackId.slice(0,-1));
        this.setState({newPlaylist});
        const corresponding = document.getElementById(trackId.slice(0,-1));
         if (corresponding && corresponding.classList.contains('hidden')) {corresponding.classList.remove('hidden');} 

    }

    deleteNewPlaylist =()=>{
        if(window.confirm('Are you sure you want to clear all tracks?')){
            this.setState({newPlaylist:[]})
            const addBtnList = Array.from(document.getElementsByTagName('i'));
            addBtnList.forEach(i =>{
                if(i.classList.contains('hidden')){
                    i.classList.remove('hidden');
                }
            })
        }
    }
    //from the most to the least popular
    comparePopularity = (a,b) => {
        return b.popularity-a.popularity;
    }
    compareDanceability=(a , b)=>{
        return b.analysis.danceability-a.analysis.danceability;
    }
    compareEnergy=(a , b)=>{
        return b.analysis.energy-a.analysis.energy;
    }
    compareValence=(a,b)=>{
      return b.analysis.valence - a.analysis.valence;
    }
    sortTracks =  (criterion) => {
        let savedTracks = this.state.savedTracks;
        switch (criterion){
            case 'popularity':
                savedTracks.sort(this.comparePopularity);
                break;
            case 'energy':
                savedTracks.sort(this.compareEnergy);
                break;
            case 'danceability':
                savedTracks.sort(this.compareDanceability);
                break;
            case 'valence':
                savedTracks.sort(this.compareValence);
                break;   
            default:
                break;
        }
        this.setState({savedTracks}); 
        this.setState({showList:true});
        //temporary:
       // let addBtnList = Array.from(document.getElementsByClassName('add-btn'));
       
    } 

    render(){

        return (
        <div className= 'lists-div'>
            <SavedTracksContainer sortTracks ={this.sortTracks} 
                    showList = {this.state.showList} 
                    savedTracks={this.state.savedTracks} 
                    addToPlaylist={this.addToPlaylist} 
                    deleteFromNewPlaylist={this.deleteFromNewPlaylist}
                    newPlaylist={this.state.newPlaylist}/>
            <PlaylistGenerator handlePlalylistNameInput={this.handlePlalylistNameInput} 
                newPlaylist={this.state.newPlaylist} 
                deleteFromNewPlaylist={this.deleteFromNewPlaylist} 
                createNewPlaylist={this.createNewPlaylist}
                deleteNewPlaylist={this.deleteNewPlaylist}/>
        </div>
      );
  }
}



export default SavedTracksExplorer;