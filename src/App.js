import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './post';
import { db } from './firebase';

function App() {
  const [posts, setPosts] = useState([
    ]);

    useEffect(() => {
      //useEffect runs a peice of code based on specific conditions
      db.collection('posts').onSnapshot(snapshot => {
        setPosts(snapshot.docs.map( doc => ({
          id: doc.id,
          post: doc.data()
        }) ));
      })
    }, []);
    
  return (
    <div className="app">            
      <div className="app_header">          
        <img 
          className="app_headerImage"
          src="https://papajfunk.files.wordpress.com/2013/12/instagram-logo.png?w=640"
          alt="Instagram"
        />        
      </div>
       
      {
        posts.map(({id, post}) => (
          <Post key={id} username={post.username} caption={post.caption} imageurl={post.imageurl}/>
        ))
      }

    </div> 
  );
}

export default App;
