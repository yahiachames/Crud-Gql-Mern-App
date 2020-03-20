import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";

import Email from "@material-ui/icons/Email";
import Person from "@material-ui/icons/Person";
import Rate from "@material-ui/icons/RateReview";
import Picture from "@material-ui/icons/Photo";
import Save from "@material-ui/icons/Save";
//gql
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
const UPDATE_User = gql`
  mutation updateUser(
    $id: ID!
    $name: String!
    $email: String!
    $age: Int!
    $imgLink: String!
  ) {
    updateUser(
      id: $id
      name: $name
      email: $email
      age: $age
      imgLink: $imgLink
    ) {
      id
      name
      email
      age
      imgLink
    }
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const UpdateUser = props => {
  const [updateUser, { data, loading, error }] = useMutation(UPDATE_User);
  const [User, setUser] = useState({
    email: "",
    age: 0,
    name: "",
    imgLink: ""
  });
  const classes = useStyles();
  return (
    <Container maxWidth='sm'>
      <form className='formAddUser'>
        <TextField
          onChange={e => {
            setUser({ ...User, email: e.target.value });
          }}
          id='standard-basic'
          label='Email'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Email />
              </InputAdornment>
            )
          }}
        />
        <TextField
          onChange={e => {
            setUser({ ...User, name: e.target.value });
          }}
          id='standard-basic'
          label='Name'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Person />
              </InputAdornment>
            )
          }}
        />
        <TextField
          onChange={e => {
            setUser({ ...User, age: e.target.value });
          }}
          id='standard-basic'
          label='Age'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Rate />
              </InputAdornment>
            )
          }}
        />
        <TextField
          onChange={e => {
            setUser({ ...User, imgLink: e.target.value });
          }}
          id='standard-basic'
          label='Picture'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Picture />
              </InputAdornment>
            )
          }}
        />
        <Button
          variant='contained'
          color='default'
          className={classes.button}
          startIcon={<Save />}
          size='medium'
          onClick={() => {
            updateUser({
              variables: {
                id: localStorage.getItem("idUser"),
                name: User.name,
                email: User.email,
                age: parseInt(User.age),
                imgLink: User.imgLink
              }
            })
              .then(result => console.log(result))
              .catch(error => console.log(error.graphqlErrors));
          }}
        >
          save Updates
        </Button>
      </form>
    </Container>
  );
};

export default UpdateUser;
