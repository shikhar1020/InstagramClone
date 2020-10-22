import React, {useState, useEffect} from 'react';
import './App.css';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';

import Post from './post';
import { db, auth } from './firebase';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState([false]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');



  useEffect(() => {
    //useEffect runs a peice of code based on specific conditions
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map( doc => ({
        id: doc.id,
        post: doc.data()
      }) ));
    })
  }, []);

  const signUp = (event) => {
    event.preventDefault();

    auth
    .createUserWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message));
  }
    
  return (
    <div className="app"> 
      <Modal
        open={open}
        onClose={() => setOpen(false)} //if clicked outside modal
      >
      <div style={modalStyle} className={classes.paper}>
        <form className="signup_form">
          <center>
            <img 
              className="signup_instaLogo"
              src="https://papajfunk.files.wordpress.com/2013/12/instagram-logo.png?w=640"
              alt="Instagram"
            /> 
          </center>
          <Input 
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.targe.value)}
          />
          <Input 
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.targe.value)}
          />
          <Input 
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.targe.value)}
          />
          <Button type="submit" onclick={signUp}>SignUp</Button> 
        </form >   
      </div>
      </Modal>
                
      <div className="app_header">          
        <img 
          className="app_headerImage"
          src="https://papajfunk.files.wordpress.com/2013/12/instagram-logo.png?w=640"
          alt="Instagram"
        /> 
        <Button onClick={() => setOpen(true)}> Sign Up </Button>

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
