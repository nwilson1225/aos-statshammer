import React from "react";
import Card from "components/Card";


const Option = ({ modifier, onClick }) => (
  <Card className="modifier-option" onClick={() => onClick(modifier)}>
    <div className="modifier-title">
      <b>{modifier.name}</b>
    </div>
    <div className="modifier-description">
      {modifier.description}
    </div>
  </Card>
)

export default Option;
