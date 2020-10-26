import React, {useState, useEffect} from 'react'
import './post.css';
import Avatar from "@material-ui/core/Avatar";
import { db } from "./firebase";
import firebase from "firebase";

function Post({ postId, username, user, caption, imageUrl }) {   
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    

    useEffect(() => {
        let unsubscribe;
        if (postId) {
          unsubscribe = db
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
              setComments(snapshot.docs.map((doc) => doc.data()));
            });
        }
        return () => {
            unsubscribe();
          };
        }, [postId]);
    
    
        const postComment = (event) => {
            event.preventDefault();
            db.collection("posts").doc(postId).collection("comments").add({
              text: comment,
              username: user.displayName,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            setComment('');
          };


        return (
            <div className="post">
                <div className="post_header">
                    <Avatar 
                        className="post_avatar"
                        alt="Krishna"
                        src="https://i.pinimg.com/originals/fc/ea/9f/fcea9f6961956cb431f752fef6ff2ed7.png"
                    />
                    <h4 className="post_headerUsername">{username}</h4>
                </div>
                <img 
                    className= "post_image" 
                    src={imageUrl}
                    alt=""
                />
                <div className="post_caption">
                    <h4 className= "post_text"><strong>{username}:</strong> {caption} </h4>
                </div>
                <div className="post__comments">
                    {comments.map((comment) => (
                    <p>
                        <strong>{comment.username}: </strong>
                        {comment.text}
                    </p>
                    ))}
                </div>
                
                {user && (
                    <form className="post_commentBox">
                        <input
                            className="post_commentInput"
                            type="text"
                            placeholder="Add your comment here.."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button
                            className="post_commentButton"
                            disabled={!comment}
                            type="submit"
                            onClick={postComment}
                        >
                            Comment
                        </button>
                    </form>
                )}
            </div>

        );
}

export default Post;


