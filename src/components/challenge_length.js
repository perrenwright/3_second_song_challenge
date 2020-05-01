import React, { useState, useEffect } from 'react';
// import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {Menu, MenuItem,Button,ListItemText,withStyles} from '@material-ui/core';
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
  color: '#19869E'

  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
    ));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: '#19869E',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const Challenge_length = (props) => {
  // const [dropdownOpen, setOpen] = useState(false);
  const [challenge_length, setChallenge_length] = useState(5);
  const [anchorEl, setAnchorEl] = React.useState(null);

  // const toggle = () => setOpen(!dropdownOpen);
  useEffect(() => {
        props.setChallenge_length(challenge_length);
    }, [challenge_length, props]);


  function onclick(challenge_length)
  {
    setChallenge_length(challenge_length)
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      { props.gameState === null &&
      <div>
        <Button data-testid='button1'
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          // endIcon={<ExpandMore/>}
          style={{backgroundColor: '#19869E',color:'#FAFAF6'}}
          onClick={handleClick}

        >
          Challenge Length
        </Button>

        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <StyledMenuItem onClick={() => onclick(5)}>
            <ListItemText primary="5 Questions" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => onclick(10)}>
            <ListItemText primary="10 Questions" />
          </StyledMenuItem >
          <StyledMenuItem onClick={() => onclick(15)}>
            <ListItemText primary="15 Questions" />
          </StyledMenuItem>
        </StyledMenu>
        </div>
      // <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
      //   <DropdownToggle caret >
      //     Challenge Length Setting
      //   </DropdownToggle>
      //   <DropdownMenu>
      //     <DropdownItem onClick={() => onclick(5)}>5 Songs</DropdownItem>
      //     <DropdownItem divider />
      //     <DropdownItem onClick={() => onclick(10)}>10 Songs</DropdownItem>
      //     <DropdownItem divider />
      //     <DropdownItem onClick={() => onclick(15)}>15 Songs</DropdownItem>
      //   </DropdownMenu>
      // </ButtonDropdown>
    }
  </div>
  );
}

export default Challenge_length;