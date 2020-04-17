import React, { useState, useEffect } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


const Challenge_length = (props) => {
  const [dropdownOpen, setOpen] = useState(false);
  const [challenge_length, setChallenge_length] = useState(5);

  const toggle = () => setOpen(!dropdownOpen);
  useEffect(() => {
        props.setChallenge_length(challenge_length);
    }, [challenge_length, props]);


  function onclick(challenge_length)
  {
    setChallenge_length(challenge_length)
  }

  return (
    <div>
    { props.gameState === null &&
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret >
        Challenge Length Setting
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={() => onclick(5)}>5 Songs</DropdownItem>
        <DropdownItem divider />
        <DropdownItem onClick={() => onclick(10)}>10 Songs</DropdownItem>
        <DropdownItem divider />
        <DropdownItem onClick={() => onclick(15)}>15 Songs</DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  }
  </div>
  );
}

export default Challenge_length;