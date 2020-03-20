import React, { useState } from "react";
import { Container, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Email";
import WorkIcon from "@material-ui/icons/Person";
import BeachAccessIcon from "@material-ui/icons/ViewAgendaSharp";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(10),
      width: theme.spacing(40),
      height: theme.spacing(60)
    }
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  large: {
    width: theme.spacing(27),
    height: theme.spacing(27)
  }
}));

const CardUser = props => {
  const [User, setUser] = useState({
    name: "test1",
    email: "test1@hotmail.com",
    age: "27",
    imgLink:
      "https://scontent.ftun2-1.fna.fbcdn.net/v/t1.0-9/p960x960/89149177_2692422090987121_484992160945405952_o.jpg?_nc_cat=109&_nc_sid=85a577&_nc_ohc=vtG0mysb5FgAX-ouKYD&_nc_ht=scontent.ftun2-1.fna&_nc_tp=6&oh=6c3265a919fe420128bcc112db491295&oe=5E968367"
  });

  const classes = useStyles();
  return (
    <Container maxWidth='sm' className='container'>
      <div className={classes.root}>
        {" "}
        <Paper
          elevation={24}
          variant='outlined'
          onClick={() => {
            localStorage.setItem("idUser", props.id);
          }}
        >
          <Avatar
            alt='Remy Sharp'
            src={props.imgLink}
            className={classes.large}
            style={{ marginTop: "5%" }}
          />
          <List style={{}}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon color='secondary' />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Email' secondary={props.email} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon color='secondary' />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Name' secondary={props.name} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <BeachAccessIcon color='secondary' />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Age' secondary={props.age} />
            </ListItem>
          </List>
        </Paper>{" "}
      </div>
    </Container>
  );
};

export default CardUser;
