import { useState } from 'react'
import GameBoard from './GameBoard';
import GameOver from './GameOver';

const INITIAL_HOR_LINES = [
  [false,false,false,false,false,false],
  [false,false,false,false,false,false],
  [false,false,false,false,false,false],
  [false,false,false,false,false,false],
  [false,false,false,false,false,false],
  [false,false,false,false,false,false],
  [false,false,false,false,false,false],
];

const INITIAL_VER_LINES = [
  [false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false],
];

const INITIAL_BOX = [
  [false,false,false,false,false,false],
  [false,false,false,false,false,false],
  [false,false,false,false,false,false],
  [false,false,false,false,false,false],
  [false,false,false,false,false,false],
  [false,false,false,false,false,false],
];

let HOR_LINES = structuredClone(INITIAL_HOR_LINES);
let VER_LINES = structuredClone(INITIAL_VER_LINES);
let BOX =structuredClone(INITIAL_BOX);

let redPoints = 0;
let bluePoints = 0;

function checkAdjBox(type,row,col){
  const adjBoxes = []
  if(type === "hor"){
    if(row != 0){
      adjBoxes.push([row-1, col])
    }
    if(row != 6){
      adjBoxes.push([row,col])
    }
    
  }
  else{
    //ver
    if(col != 0){
      adjBoxes.push([row, col - 1])
    }
    if(col != 6){
      adjBoxes.push([row,col])
    }
  }
  return adjBoxes
}

function checkBoxEdges(color, row, col){
  if(!BOX[row][col]){
    if(
      HOR_LINES[row][col] &&
      HOR_LINES[row+1][col] &&
      VER_LINES[row][col] &&
      VER_LINES[row][col+1]
    ){
      BOX[row][col] = color;
      return true;
    }
  }
  return false;
}



function App() {
  const [playerTurn,setPlayerTurn] = useState("red");
  const [playerPoints, setPlayerPoints] = useState(0);

  // checkBoxEdges("red", 0, 0)
  // console.log(INITIAL_HOR_LINES);

  let turnText = "text-center m-5 text-2xl "
  if(playerTurn === "red"){
    turnText += "text-red-500"
  }else{
    turnText += "text-blue-500"
  }
  
  function handleClickButton(type, row, col){
    if(type === "hor" && !HOR_LINES[row][col]){
      HOR_LINES[row][col] = playerTurn;
      if(playerTurn === "red"){
        setPlayerTurn("blue");
      }
      else{
        setPlayerTurn("red");
      }
    }
    else if(type === "ver" && !VER_LINES[row][col]){
      VER_LINES[row][col] = playerTurn;
      if(playerTurn === "red"){
        setPlayerTurn("blue");
      }
      else{
        setPlayerTurn("red");
      }
    }


    
    const adjBoxes = checkAdjBox(type,row,col);
    let boxChange = false;
    for(const box of adjBoxes){
      if(checkBoxEdges(playerTurn,box[0],box[1])){
        boxChange = true;
        setPlayerPoints((points) => points + 1);
        if(playerTurn === "red"){
          redPoints += 1;
        }else{
          bluePoints += 1;
        }
      }
    }
    if (boxChange){
      setPlayerTurn(playerTurn);
    }
  }

  function handleRestart(){
    HOR_LINES = structuredClone(INITIAL_HOR_LINES);
    VER_LINES = structuredClone(INITIAL_VER_LINES);
    BOX =structuredClone(INITIAL_BOX);
    setPlayerPoints(0);
    setPlayerTurn("red");
  }


    return (
      <>
        {(playerPoints >= 36) && <GameOver redPoints={redPoints} bluePoints={bluePoints} handleRestart={handleRestart}></GameOver>}

        <h3 className={turnText} >{playerTurn}</h3>
        <ol className= "flex flex-wrap self-center justify-center gap-0 m-auto p-10 bg-slate-500 flex-col w-min">
          <GameBoard HOR_LINES={HOR_LINES} VER_LINES={VER_LINES} BOX={BOX} turn={playerTurn} onSelectButton={handleClickButton}/>
        </ol>
        
        <h3 className="text-center m-5 text-2xl text-red-500" >Red: {redPoints}</h3>
        <h3 className="text-center m-5 text-2xl text-blue-500" >Blue: {bluePoints}</h3>

      </>
      
    );
}

export default App
