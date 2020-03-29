import React from "react";
import "./index.css";
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledButtonDropdown
} from "reactstrap";

function Dropdown(props) {
  return (
    <UncontrolledButtonDropdown>
      <DropdownToggle caret>{props.selectedCountry}</DropdownToggle>
      <DropdownMenu
        style={{ overflow: "auto", height: "17rem", width: "2rem" }}
        onClick={props.onChange}
      >
        {props.countryList.map(element => (
          <DropdownItem key={element.Country}>{element.Country}</DropdownItem>
        ))}
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  );
}

export default React.memo(Dropdown);
