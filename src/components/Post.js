/** @format */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { db } from './../firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',

    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),

    margin: theme.spacing(2),
  },
  text: {
    margin: theme.spacing(2),
  },

  post: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    border: '0.5px solid lightgrey',
    maxWidth: '500px',
    margin: '20px auto',
  },

  post_header: {
    display: 'flex',
    alignItems: 'center',
  },
  post_image: {
    width: '100%',
    maxWidth: '500px',
    minWidth: '500px',
    minHeight: '500px',
    objectFit: 'contain',
    borderTop: '1px solid lightgrey',
    borderBottom: '1px solid lightgrey',
  },
  buttom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

function Post({ imgUrl, username, caption, id }) {
  console.log(username, caption, id);
  const classes = useStyles();

  function handleDelete() {
    db.collection('posts')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  }
  return (
    <div className={classes.post}>
      <div className={classes.post_header}>
        <Avatar
          alt='Remy Sharp'
          src='https://images.unsplash.com/photo-1611367540679-d94566094025?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29tYW4lMjBmYWNlfGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
          className={classes.large}
        />
        <h3 className='post_userName'>{username}</h3>
      </div>

      <img
        src={imgUrl}
        alt='user avatar'
        className={classes.post_image}
      />
      <div className={classes.buttom}>
        <p className={classes.text}>
          <strong>{username}:</strong> {caption}
        </p>

        <IconButton
          variant='raised'
          component='span'
          className={classes.button}
          color='secondary'
          onClick={handleDelete}
        >
          <DeleteIcon
            aria-label='delete'
            className={classes.icon}
          />
        </IconButton>
      </div>
    </div>
  );
}

export default Post;
