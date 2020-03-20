import React from "react";
import User from "./card";
import Carousel from "react-material-ui-carousel";
import DeleteIcon from "@material-ui/icons/Delete";
import AddUserIcon from "@material-ui/icons/PersonAdd";
import UpdateIcon from "@material-ui/icons/Update";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Container } from "@material-ui/core";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import "./App.css";
//modal
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
//components
import AddUser from "./addUser";
import UpdateUser from "./updateUser";

const GET_USERS = gql`
  {
    users {
      id
      name
      email
      age
      imgLink
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      name
      email
      age
      imgLink
    }
  }
`;

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white"
  }
}));

const Link =
  "https://scontent.ftun2-1.fna.fbcdn.net/v/t1.0-9/p960x960/89149177_2692422090987121_484992160945405952_o.jpg?_nc_cat=109&_nc_sid=85a577&_nc_ohc=vtG0mysb5FgAX-ouKYD&_nc_ht=scontent.ftun2-1.fna&_nc_tp=6&oh=6c3265a919fe420128bcc112db491295&oe=5E968367";

function App() {
  const classes = useStyles();
  const { data, loading, error } = useQuery(GET_USERS);
  const [deleteUser, { dataa, loadingg, errorr }] = useMutation(DELETE_USER);

  // const users = [
  //   <User
  //     name='chames'
  //     email='yahiachames@gmail.com'
  //     age='21'
  //     imgLink={Link}
  //   />,
  //   <User />,
  //   <User />,
  //   <User />,
  //   <User />
  // ];
  const [openAddUser, setOpenAddUser] = React.useState(false);
  const [openUpdateUser, setOpenUpdateUser] = React.useState(false);

  const handleOpenaddUser = () => {
    setOpenAddUser(true);
  };

  const handleOpenUpdateUser = () => {
    setOpenUpdateUser(true);
  };
  const handleClose = () => {
    setOpenAddUser(false);
    setOpenUpdateUser(false);
  };

  if (loading) return <div> loading... </div>;
  if (error) return <div> {error.message} </div>;
  return (
    <Container
      style={{
        backgroundColor: "grey"
      }}
      maxWidth='sm'
    >
      <Carousel className='carousell' infiniteLoop indicators>
        {data.users.map(item => (
          <User
            name={item.name}
            email={item.email}
            age={item.age}
            imgLink={item.imgLink}
            id={item.id}
          />
        ))}
      </Carousel>{" "}
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          justifyContent: "space-evenly"
        }}
        maxWidth='xl'
      >
        {" "}
        <Button
          variant='contained'
          color='secondary'
          className={classes.button}
          startIcon={<DeleteIcon />}
          size='medium'
          onClick={() =>
            deleteUser({
              variables: {
                id: localStorage.getItem("idUser")
              }
            })
          }
        >
          Delete User
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          endIcon={<AddUserIcon />}
          size='medium'
          onClick={handleOpenaddUser}
        >
          add User
        </Button>
        <Button
          variant='contained'
          color='default'
          className={classes.button}
          startIcon={<UpdateIcon />}
          size='medium'
          onClick={handleOpenUpdateUser}
        >
          Update User
        </Button>
        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          className={classes.modal}
          open={openUpdateUser}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={openUpdateUser}>
            <UpdateUser />
          </Fade>
        </Modal>
        {""}
        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          className={classes.modal}
          open={openAddUser}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={openAddUser}>
            <AddUser />
          </Fade>
        </Modal>
      </Container>
    </Container>
  );
}
export default App;
