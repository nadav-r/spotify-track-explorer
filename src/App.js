import React, { Component } from 'react';
import OptionsBoard from './components/OptionsBoard';
import SavedTracksExplorer from './components/SavedTracksExplorer';
//import PlaylistGenerator from './components/PlaylistGenerator';


import './App.css';

class App extends Component {
    constructor(){
      super();
      const params = this.getHashParams();

      this.state = {
        loggedIn : params.access_token? true: false,
        accessToken: params.access_token,

      }
    }


    //for spotify access token
    getHashParams = () => {
      var hashParams = {};
      var e, r = /([^&;=]+)=?([^&;]*)/g,
          q = window.location.hash.substring(1);
      e = r.exec(q);
      while ( e ) {
         hashParams[e[1]] = decodeURIComponent(e[2]);
         e = r.exec(q);
      }
      return hashParams;
    }


    render(){
      const loginScreen = !this.state.loggedIn? 
      <a className="f6 grow no-underline br-pill ba bw2 ph3 pv2 mb2 dib white bg-green" onClick={this.handleLogin} href='https://arcane-castle-79537.herokuapp.com/login'/*"http://localhost:8888/login"*/>Login with spotify</a>
      :
        <OptionsBoard accessToken={this.state.accessToken}/>
        // <SavedTracksExplorer accessToken = {this.state.accessToken}/>;

      
    
      
    
     
        
     
      return (
        <div className ='tc' >
         <div > 
            
            <h1 className = "f1 light-gray ttu tracked-mega ">Explore your music</h1>
            <h1 className='f2 light-gray ttu tracked-mega '>With Spotify API</h1>  
          </div>
          <div className='body'>
            {loginScreen}
          </div>
        </div>
      );
  }
}

export default App;
