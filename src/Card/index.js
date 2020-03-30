import React from "react";
import "./index.css";
import { Card, CardText, CardBody, CardTitle } from "reactstrap";
import "font-awesome/css/font-awesome.css";

function Cards(props) {
  let name = `userIcon-wrapper ${props.colour}`;
  let data = `${props.count}  [+${props.new}]`;
  return (
    <div className="card-wrapper">
      <Card>
        <CardBody>
          <div className={name}>
            <div className="fa fa-users"></div>
          </div>

          <CardTitle>{props.title}</CardTitle>
          <CardText className={props.colour}>{data}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

export default React.memo(Cards);
