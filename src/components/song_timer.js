import React, { useState, useEffect } from 'react';
// import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {Menu, MenuItem,Button,ListItemText,withStyles} from '@material-ui/core';
// import {ExpandMore} from '@material-ui/icons/ExpandMore';
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
const Song_timer = (props) => {
  const [dropdownOpen, setOpen] = useState(false);
  const [gameTime, setgameTime] = useState(3000);
  const [anchorEl, setAnchorEl] = React.useState(null);

  // const toggle = () => setOpen(!dropdownOpen);
  useEffect(() => {
        props.setgameTime(gameTime);
    }, [gameTime, props]);

  function onclick(time)
  {
    setgameTime(time)
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
        <Button
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
          <StyledMenuItem onClick={() => onclick(3000)}>
            <ListItemText primary="3 Seconds" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => onclick(5000)}>
            <ListItemText primary="5 Seconds" />
          </StyledMenuItem >
          <StyledMenuItem onClick={() => onclick(10000)}>
            <ListItemText primary="10 Seconds" />
          </StyledMenuItem>
        </StyledMenu>
        </div>
}
    {/* { props.gameState === null &&
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret >
        Song Length Setting
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={() => onclick(3000)}>3 Seconds</DropdownItem>
        <DropdownItem divider />
        <DropdownItem onClick={() => onclick(5000)}>5 Seconds</DropdownItem>
        <DropdownItem divider />
        <DropdownItem onClick={() => onclick(10000)}>10 Seconds</DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  } */}
  </div>
  );
}

export default Song_timer;