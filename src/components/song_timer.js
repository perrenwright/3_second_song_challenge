import React, { useState, useEffect } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


const Song_timer = (props) => {
  const [dropdownOpen, setOpen] = useState(false);
  const [gameTime, setgameTime] = useState(3000);



  const toggle = () => setOpen(!dropdownOpen);
  useEffect(() => {
        props.setgameTime(gameTime);
    }, [gameTime, props]);


  function onclick(time)
  {
    setgameTime(time)
  }

  return (
    <div>
    { props.gameState === null &&
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
  }
  </div>
  );
}

export default Song_timer;