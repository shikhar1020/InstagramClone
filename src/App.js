import React, {useState, useEffect} from 'react';
import './App.css';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';

import Post from './post';
import { db, auth } from './firebase';
import ImageUpload from './ImageUpload';


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
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles(); //used in modal style @line no 98
  const [modalStyle] = useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //if user has logged in
        console.log(authUser);
        setUser(authUser); //if the page refreshes then it checks if the user is logged in
      }
      else {
        //if user has logged out
        setUser(null);
      }
    });
    return () => {
      //perform some cleanup actions
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    //useEffect runs a peice of code based on specific conditions
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => { //order uploaded posts according to timestamp in descending order
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
      .then ((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        });
      })
      .catch((error) => alert(error.message)); //check any error while authintication   
      
      setOpen(false);
  };

  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    setOpenSignIn(false);
  };
    
  return (
    <div className="app"> 
  
      <Modal open={open} onClose={() => setOpen(false)}> 
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
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input 
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" onClick={signUp}>SignUp</Button> 
        </form >   
      </div>
      </Modal>
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="signIn_form">
            <center>
              <img
                className="signIn_instaLogo"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="Instagram Logo"
              />
            </center>
            <Input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>
              Sign In
            </Button>
          </form>
        </div>
      </Modal>
                
      <div className="app_header">          
        <img 
          className="app_headerImage"
          src="https://papajfunk.files.wordpress.com/2013/12/instagram-logo.png?w=640"
          alt="Instagram"
        /> 
      
        {user ? (
        <Button onClick={() => auth.signOut()}> LogOut </Button>
        ) : (
        <div className="app_loginContainer">
          <Button onClick={() => setOpenSignIn(true)}> Sign In </Button>
          <Button onClick={() => setOpen(true)}> Sign Up </Button>
        </div>
        )}      
      </div>

      {user?.displayName ? (
        <ImageUpload username={user.displayName} /> 
      ): (
        <center>
          <h2> Login to Post Image!</h2>
        </center>
      )}

      {
        posts.map(({id, post}) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }


    </div> 
  );
}

export default App;
