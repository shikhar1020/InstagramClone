import React from 'react';
import './App.css';

import Post from './post';

function App() {
  return (
    <div className="app">        
        
        <div className="app_header">          
          <img 
            className="app_headerImage"
            src="https://papajfunk.files.wordpress.com/2013/12/instagram-logo.png?w=640"
            alt="Instagram"
          />        
        </div>
        <div className="app_posts">  
          <Post/>      
          <Post/>   
          <Post/>  
          <Post/>  
        </div>

    </div>
  );
}

export default App;
