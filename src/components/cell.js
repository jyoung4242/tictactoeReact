import React, { useEffect, useState } from "react";
import "../style.css";

function Cell(props) {
  let myX = "X";
  let myO = "O";
  const [cellVal, setCellVal] = useState(null);
  const [cellLock, setCellLock] = useState(false);
  let cssString = "red";

  useEffect(() => {
    console.log("resetting");
    setCellLock(false);
    setCellVal("");
  }, [props.resetflag]);

  useEffect(() => {
    if (cellVal == "") {
      props.clearflag(false);
    }
  }, [cellVal]);

  const handleClick = e => {
    if (cellLock == false) {
      if (props.turn == 0) {
        //set to X
        setCellVal("X");
        setCellLock(true);
        props.toggleTurn(1);
        props.setData(props.cellnum, "X");
        cssString = "blue";
      } else {
        setCellLock(true);
        setCellVal("O");
        props.toggleTurn(0);
        props.setData(props.cellnum, "O");
        cssString = "red";
      }
    }
  };

  if (cellVal == "X") cssString = "blue";

  return (
    <div onClick={handleClick} className={`cell ${cssString}`}>
      {cellVal}
    </div>
  );
}

export default Cell;
