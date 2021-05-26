/** @format */

import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Modal,
  Button,
  Input,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { auth } from './../firebase';

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
  form: {
    disaply: 'flex',
    flexDirection: 'column',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    width: 250,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  button: {
    marginBottom: 10,
  },
  logbutton: {
    marginRight: 10,
  },
  img: {
    maxWidth: 150,
  },
  login: {
    dispaly: 'flex',
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  //modal open/close
  const handleOpen = () => {
    setOpen(true);
  };

  //signup functionality
  const [openSignin, setOpenSignin] = useState(false);
  const [username, setUserame] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (authUser) => {
        if (authUser) {
          //user has loged in
          console.log('user:', authUser);
          setUser(authUser);
        } else {
          //user has loged out
          setUser(null);
        }
      }
    );

    return () => {
      //perform cleanup before refire useeffect
      unsubscribe();
    };
  }, [user, username]);

  const signup = (e) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
  };

  const signout = (e) => {
    auth.signOut();
  };

  const signin = (e) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignin(false);
  };

  const demoSignin = (e) => {
    auth
      .signInWithEmailAndPassword(
        'demosignup@gmail.com',
        'abc123'
      )
      .catch((error) => alert(error.message));

    setOpenSignin(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <img
        className={classes.img}
        src='https://firebasestorage.googleapis.com/v0/b/instagram-clone-app-ebf8a.appspot.com/o/logo%2Fpupplogo.png?alt=media&token=f4a7d9d7-acd7-4f09-8280-3011e68458aa'
        alt='instagram logo'
      />
      <form
        className={classes.form}
        onSubmit={(e) => e.preventDefault() && false}
      >
        <FormControl margin='normal' required fullWidth>
          <InputLabel htmlFor='name'>Name</InputLabel>
          <Input
            id='name'
            name='name'
            autoComplete='off'
            autoFocus
            value={username}
            onChange={(e) => setUserame(e.target.value)}
          />
        </FormControl>
        <FormControl margin='normal' required fullWidth>
          <InputLabel htmlFor='email'>
            Email Address
          </InputLabel>
          <Input
            id='email'
            name='email'
            autoComplete='off'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl margin='normal' required fullWidth>
          <InputLabel htmlFor='password'>
            Password
          </InputLabel>
          <Input
            name='password'
            type='password'
            id='password'
            autoComplete='off'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <div className={classes.box}>
          <Button
            className={classes.button}
            variant='outlined'
            color='secondary'
            onClick={signup}
          >
            Sign up
          </Button>
          <Button
            className={classes.button}
            variant='outlined'
            color='secondary'
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </div>
      </form>
    </div>
  );

  const signinbody = (
    <div style={modalStyle} className={classes.paper}>
      <img
        className={classes.img}
        src='https://firebasestorage.googleapis.com/v0/b/instagram-clone-app-ebf8a.appspot.com/o/logo%2Fpupplogo.png?alt=media&token=f4a7d9d7-acd7-4f09-8280-3011e68458aa'
        alt='instagram logo'
      />
      <form
        className={classes.form}
        onSubmit={(e) => e.preventDefault() && false}
      >
        <FormControl margin='normal' required fullWidth>
          <InputLabel htmlFor='email'>
            Email Address
          </InputLabel>
          <Input
            id='email'
            name='email'
            autoComplete='off'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl margin='normal' required fullWidth>
          <InputLabel htmlFor='password'>
            Password
          </InputLabel>
          <Input
            name='password'
            type='password'
            id='password'
            autoComplete='off'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <div className={classes.box}>
          <Button
            className={classes.button}
            variant='contained'
            color='secondary'
            onClick={demoSignin}
          >
            Demo Sign in
          </Button>
          <Button
            className={classes.button}
            variant='outlined'
            color='secondary'
            onClick={signin}
          >
            Sign in
          </Button>
          <Button
            className={classes.button}
            variant='outlined'
            color='secondary'
            onClick={() => setOpenSignin(false)}
          >
            Close
          </Button>
        </div>
      </form>
    </div>
  );

  return (
    <div>
      {user ? (
        <Button
          variant='contained'
          color='secondary'
          onClick={signout}
        >
          Sign out
        </Button>
      ) : (
        <div className={classes.login}>
          <Button
            className={classes.logbutton}
            variant='contained'
            color='secondary'
            onClick={() => setOpenSignin(true)}
          >
            Log in
          </Button>
          <Button
            variant='contained'
            color='secondary'
            onClick={handleOpen}
          >
            Sign Up
          </Button>
        </div>
      )}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {body}
      </Modal>
      <Modal
        open={openSignin}
        onClose={() => setOpenSignin(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {signinbody}
      </Modal>
    </div>
  );
}
