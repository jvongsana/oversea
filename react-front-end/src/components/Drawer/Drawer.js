import React  from 'react';
import './Drawer.scss';
import { 
  Drawer as Sidebar, 
  List, 
  ListItem,
  ListItemText,
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  drawer: {
    width: '240px',
    color: 'white'
  },
  paper: {
    backgroundColor: '#01234c',
    width: '240px',
    textAlign: 'center'
  },
  button: {
    padding: '10px',
    borderRadius: '10px',
    textAlign: 'center',
    "&:hover": {
      backgroundColor: '#a6d0ef',
      padding: '10px',
      borderRadius: '20px'
    }
  }
});


function Drawer() {
  const classes = useStyles();
  const itemsList = ['Reports', 'Chequings Account', 'Savings Account', 'RBC Credit Card', '+ Add Account'];
    return (
          <Sidebar variant="permanent" className={classes.drawer} classes={{ paper: classes.paper }}>
          <img
            className="logo--centered"
            src={require('../../images/logo-white.png')}
            alt="Interview Scheduler"
            width="100px"
            height="100px"
          />
          <List>
            {itemsList.map((text, index) => (
              <ListItem button key={text} classes={{ root: classes.button }} >
                  <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>  
        </Sidebar> 
    );
}

export default Drawer;