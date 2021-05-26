/** @format */

import React, { useState } from 'react';
import {
  Input,
  Button,
  IconButton,
  LinearProgress,
} from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';
import { storage, db } from './../firebase';
import firebase from '@firebase/app';

const useStyles = makeStyles((theme) => ({
  root: {
    border: '0.5px solid lightgrey',

    padding: theme.spacing(3),
    width: '450px',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    alignItems: 'center',
  },
  progress: {
    width: 120,
    marginLeft: theme.spacing(2),
  },
  input: {
    width: '50%',
  },
  button: {
    margin: theme.spacing(1),
  },
  upload: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    justifyContent: 'space-between',
  },
  uploadButton: {
    backgroundColor: '#f60257',
    border: 'none',
    color: 'white',
    '&:hover': {
      backgroundColor: '#f75d91',
    },
  },
  image: {
    height: '150px',
    width: '150px',
    objectFit: 'cover',
  },
  imageWrap: {
    height: '150px',
    width: '150px',
    backgroundColor: '#afafaf',
  },
}));

export default function Upload({ username }) {
  const classes = useStyles();

  const [caption, setCaption] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);

  function handlePreview(image) {
    storage.ref(`image_previews/${image.name}`).put(image);

    storage
      .ref('images')
      .child(image.name)
      .getDownloadURL()
      .then((url) => setImagePreview(url));
  }

  const handleChange = (e) => {
    if (e.target.files[0]) {
      console.log('file:', e.target.files[0]);
      setImage(e.target.files[0]);
      handlePreview(e.target.files[0]);
    }
  };

  function handleUpload() {
    const uploadTask = storage
      .ref(`images/${image.name}`)
      .put(image);
    console.log('image:', image);
    console.log('image name:', image.name);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        //progress function
        const progress = Math.round(
          (snapshot.bytesTransferred /
            snapshot.totalBytes) *
            100
        );
        setProgress(progress);
      },
      (error) => {
        //error function
        console.log(error);
        alert(error.message);
      },
      () => {
        //complete function
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post image inside db
            console.log('url:' + url);
            db.collection('posts').add({
              timestamp:
                firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
          });
        setProgress(0);
        setCaption('');
        setImage(null);
      }
    );
  }

  return (
    <>
      <div className={classes.root}>
        <div className={classes.imageWrap}>
          <img
            src={imagePreview}
            alt=''
            className={classes.image}
          />
        </div>
        <input
          type='file'
          onChange={handleChange}
          className={classes.input}
          style={{ display: 'none' }}
          id='raised-button-file'
        />
        <label htmlFor='raised-button-file'>
          <span>Add an image here 👉</span>
          <IconButton
            variant='raised'
            component='span'
            className={classes.button}
            color='secondary'
          >
            <PhotoCamera className={classes.icon} />
          </IconButton>
        </label>
        <Input
          type='text'
          placeholder='enter a caption'
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className={classes.input}
          color='secondary'
        />
        <div className={classes.upload}>
          {image === null || image === '' ? (
            <Button
              variant='outlined'
              onClick={handleUpload}
              disabled
            >
              upload
            </Button>
          ) : (
            <Button
              variant='outlined'
              onClick={handleUpload}
              className={classes.uploadButton}
            >
              upload
            </Button>
          )}
          <LinearProgress
            variant='determinate'
            color='secondary'
            value={progress}
            className={classes.progress}
          />
        </div>
      </div>
    </>
  );
}
