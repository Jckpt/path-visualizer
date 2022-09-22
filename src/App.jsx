import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'

function App() {
  const [count, setCount] = useState(0)
  const [grid, setGrid] = useState([]);
  const [cols, setCols] = useState(12);
  const [rows, setRows] = useState(10);
  const START_COL = 0;
  const START_ROW = 0;
  const END_COL = cols - 1;
  const END_ROW = rows - 1;
  const initGrid = (cols, rows) => {
    let gridTemp = new Array(rows);
    for (let i = 0; i < rows; i++) {
      gridTemp[i] = new Array(cols);
    }
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        gridTemp[i][j] = new Cell(i, j);
      }
    }
    return gridTemp;
  }
  useEffect(() => {
    let gridTemp = initGrid(cols, rows);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        gridTemp[i][j].addNeighbours(gridTemp);
      }
    }
    console.log(gridTemp);
    setGrid(gridTemp);
  }, [])
  function Cell(x, y) {
    this.x = x;
    this.y = y;
    this.isStart = this.y === START_COL && this.x === START_ROW;
    this.isEnd = this.y === END_COL && this.x === END_ROW;
    this.g = 0;
    this.f = 0;
    this.h = 0;
    this.neighbour = [];
    this.addNeighbours = (grid) => {
      let x = this.x;
      let y = this.y;
      console.log(x, y);
      if (x > 0) this.neighbour.push(grid[x - 1]?.[y])
      if (x < rows - 1) this.neighbour.push(x + 1, y, grid[x + 1]?.[y])
      if (y > 0) this.neighbour.push(x, y - 1, grid[x]?.[y - 1]);
      if (y < cols - 1) this.neighbour.push(x, y + 1, grid[x]?.[y + 1]);
    }
  }
  return (
    <div className="w-screen h-screen flex justify-center items-center">

      <div className=' grid' style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` }}>
        {grid.map((row) => {
          return (
            row.map((cell) => {
              return <div className='border-solid border-white border w-10 h-10' style={{ backgroundColor: cell.isStart ? "blue" : cell.isEnd ? "red" : "" }}>{cell.x} {cell.y}</div>;
            })
          );
        })}
      </div>
    </div>
  )
}

export default App
