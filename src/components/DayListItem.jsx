import React from "react";
import classnames from "classnames";
import "components/DayListItem.scss";

// DayListItem COMPONENT:

const DayListItem = (props) => {
  // FORMAT SPOTS INTO READABLE SENTENCE
  const formatSpots = (spots) => {
    return spots === 0
      ? "no spots remaining"
      : spots === 1
      ? "1 spot remaining"
      : `${spots} spots remaining`;
  };

  // STYLING DEPENDING ON SELECTED OR FULL
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(props.name)}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
};

export default DayListItem;
