import React from 'react'
import './post.css';
import Avatar from "@material-ui/core/Avatar";

function post({username, caption, imageurl }) {
    
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
                src={imageurl}
                alt=""
            />
            <div className="post_footer">
                <h4 className= "post_text"><strong>shikharsangam:</strong> {caption} </h4>
            </div>
        </div>

    )
}

export default post
