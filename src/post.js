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
                    src={imageurl}
                />
                <h4 className="post_headerUsername">{username}</h4>
            </div>
            <img 
                className= "post_image" 
                src="https://i.pinimg.com/564x/2b/4b/ea/2b4beaad4f09f39c48771d8363546079.jpg"
                alt=""
            />
            <div className="post_footer">
                <h4 className= "post_text"><strong>shikharsangam:</strong>{caption}</h4>
            </div>
        </div>

    )
}

export default post
