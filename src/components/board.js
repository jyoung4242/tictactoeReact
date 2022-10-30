import React, { useEffect, useState } from "react";
import "../style.css";
import Cell from "./cell";

function Board() {
  const [gameTurn, setGameTurn] = useState(0);
  const [victory, setVictory] = useState(null);
  const [resetFlag, setResetFlag] = useState(false);
  const [gameState, setGameSTate] = useState("active");
  const cellArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const [cellMatrix, setCellMatrix] = useState([null, null, null, null, null, null, null, null, null]);

  const checkForVictoryCondition = () => {
    console.log("cell matrix: ", cellMatrix);
    if (cellMatrix[0] == cellMatrix[1] && cellMatrix[1] == cellMatrix[2]) {
      if (cellMatrix[0] != null) return { victory: 1, player: cellMatrix[0] };
    }
    if (cellMatrix[3] == cellMatrix[4] && cellMatrix[4] == cellMatrix[5]) {
      if (cellMatrix[3] != null) return { victory: 2, player: cellMatrix[3] };
    }

    if (cellMatrix[6] == cellMatrix[7] && cellMatrix[7] == cellMatrix[8]) {
      if (cellMatrix[6] != null) return { victory: 3, player: cellMatrix[6] };
    }

    if (cellMatrix[0] == cellMatrix[3] && cellMatrix[3] == cellMatrix[6]) {
      if (cellMatrix[0] != null) return { victory: 4, player: cellMatrix[0] };
    }

    if (cellMatrix[1] == cellMatrix[4] && cellMatrix[4] == cellMatrix[7]) {
      if (cellMatrix[1] != null) return { victory: 5, player: cellMatrix[1] };
    }

    if (cellMatrix[2] == cellMatrix[5] && cellMatrix[5] == cellMatrix[8]) {
      if (cellMatrix[2] != null) return { victory: 6, player: cellMatrix[2] };
    }

    if (cellMatrix[0] == cellMatrix[4] && cellMatrix[4] == cellMatrix[8]) {
      if (cellMatrix[0] != null) return { victory: 7, player: cellMatrix[0] };
    }

    if (cellMatrix[2] == cellMatrix[4] && cellMatrix[4] == cellMatrix[6]) {
      if (cellMatrix[2] != null) return { victory: 8, player: cellMatrix[2] };
    }
    return null;
  };

  const resetHandler = () => {
    setVictory(null);
    setGameSTate("active");
    console.log("resetting game");
    setCellMatrix([null, null, null, null, null, null, null, null, null]);
    setResetFlag(true);
  };

  useEffect(() => {
    const rslt = checkForVictoryCondition();
    if (rslt) {
      console.log("rslt set");
      setVictory(rslt.victory);
    }
  }, [cellMatrix]);

  useEffect(() => {
    if (victory) {
      console.log("end of game");
      setGameSTate("gameover");
    }
  }, [victory]);

  useEffect(() => {}, [gameState]);

  const setCellData = (cell, data) => {
    //cellMatrix[cell] = data;
    setCellMatrix(
      cellMatrix.map((c, index) => {
        return index == cell ? data : c;
      })
    );
  };

  return (
    <div className="board">
      {cellArray.map(c => {
        return (
          <Cell
            key={c}
            cellnum={c}
            turn={gameTurn}
            resetflag={resetFlag}
            clearflag={setResetFlag}
            setData={setCellData}
            toggleTurn={setGameTurn}
          ></Cell>
        );
      })}
      {gameState == "gameover" ? (
        <button className="button" onClick={resetHandler}>
          RESET
        </button>
      ) : (
        ""
      )}
      {victory == 1 ? <div className="vic1"></div> : ""}
      {victory == 2 ? <div className="vic2"></div> : ""}
      {victory == 3 ? <div className="vic3"></div> : ""}
      {victory == 4 ? <div className="vic4"></div> : ""}
      {victory == 5 ? <div className="vic5"></div> : ""}
      {victory == 6 ? <div className="vic6"></div> : ""}
      {victory == 7 ? <div className="vic7"></div> : ""}
      {victory == 8 ? <div className="vic8"></div> : ""}
    </div>
  );
}

export default Board;
