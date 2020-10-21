import React, {useState} from 'react';
import './App.css';
import Post from './post';

function App() {
  const [posts, setPosts] = useState([
    {
      username: "shikharsangam",
      caption: "Looove youu krishna",
      imageurl: "https://i.pinimg.com/originals/b7/65/eb/b765eb49233959d3aaf790452986143d.jpg"
    },
    {
      username:"sizi",
      caption:"Aare krishna aap!",
      imageurl:"https://media.tenor.com/images/6321fa6690d59b2f37c25ce0d271cb6c/tenor.gif"
    },
    {
      username: "mystery_angel",
      caption: "kaaaaaaaisse hooo!!",
      imageurl: "https://i.pinimg.com/originals/b7/65/eb/b765eb49233959d3aaf790452986143d.jpg"
    },
    {
      username: "shikharsangam_doobara",
      caption: "mai toh masssst",
      imageurl: "https://i.pinimg.com/originals/aa/cd/5b/aacd5b08af0c185a0aeae7211fe4bef0.jpg"
    }
  ]);
    
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
        posts.map(post => (
          <Post username={post.username} caption={post.caption} imageurl={post.imageurl}/>
        ))
      }

    </div> 
  );
}

export default App;
