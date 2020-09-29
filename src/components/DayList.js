import React from "react";

import DaylistItem from "components/DayListItem";

const DayList = (props) => {

  const itemList = props.days.map(day =>
    (
      <DaylistItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    )
  )

  return (
    <ul>
      {itemList}
    </ul>
  );
};

export default DayList;