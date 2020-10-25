import React, { useState } from 'react';
import './ImageUpload.css';
import firebase from "firebase";
import { storage, db } from "./firebase";
import { Button } from "@material-ui/core";


function ImageUpload({username}) {
    const [caption, setCaption] = useState("");
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        if (e.target.files[0]) { //choose the first file
          setImage(e.target.files[0]);
        }
};

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);//take referrence from the image that is being uploaded to firebase
        
        uploadTask.on(
            "state_changed",
            (snapshot) => {
              // function for progress bar
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              setProgress(progress);
            },
            (error) => {
                // Error function
                console.log(error);
                alert(error.message);
            },
            () => {
                //logic function for uploading image
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL() //get the url of image that is uploaded to firebase
                    .then((url) => {
                        // post the image in the database
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username,
                        });
                        //if done once then set it to its intial postion
                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    });
                }        
            );
    }

    return (
        <div className="image_Uploader">
            <h1> Image Upload</h1>
            {/* ImageUploadProgress */}
            <progress  value={progress} max="100" />
            {/* CaptionInput */}
            <input
                type="text"
                placeholder="Enter a caption"
                onChange={(event) => setCaption(event.target.value)}
                value={caption}
            />
            {/* File picker */}
            <input type="file" onChange={handleChange} />
            {/* PostButton */}
            <Button onClick={handleUpload}>Post</Button>
        </div>
    )
}

export default ImageUpload;
