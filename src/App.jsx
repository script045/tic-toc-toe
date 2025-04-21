import {useState} from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import './App.css'

DataTable.use(DT);

const Board = () => {

    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [tableData, setTableData] = useState([]);
    console.log("squares", squares);
    const handleClick = (idx) => {
        const nextSqares = squares.slice();
        console.log("nextSquare", nextSqares);
        const nextTableData = tableData.slice();
        console.log("nextTableData", nextTableData);
        if (nextSqares[idx] || calculateWinner(squares)) {
            return;
        }

        nextSqares[idx] = xIsNext ? 'X' : "0";
        nextTableData.push({
            move: nextTableData.length + 1,
            player: xIsNext ? 'X' : "0",
            position: idx,
            time: new Date()

        });

        setSquares(nextSqares);
        setXIsNext(!xIsNext);
        setTableData(nextTableData);

    }


    let winner = calculateWinner(squares);
    let status = winner
        ? 'Winner: ' + winner
        : 'Next player: ' + (xIsNext ? 'X' : '0');

    return (
        <>
            <h1>Reactive data</h1>
            <h2>DataTables + React example</h2>
            <p>
                This example builds upon the classic React tic-tac-toe example to use a
                DataTable to display the event log. This is done by giving the game
                state object to the DataTable as the data to display.
            </p>

            <div className="status">{status}</div>
            <div className="board-row">
                <Square val={squares[0]} onSquareClick={() => handleClick(0)}/>
                <Square val={squares[1]} onSquareClick={() => handleClick(1)}/>
                <Square val={squares[2]} onSquareClick={() => handleClick(2)}/>
            </div>
            <div className="board-row">
                <Square val={squares[3]} onSquareClick={() => handleClick(3)}/>
                <Square val={squares[4]} onSquareClick={() => handleClick(4)}/>
                <Square val={squares[5]} onSquareClick={() => handleClick(5)}/>
            </div>
            <div className="board-row">
                <Square val={squares[6]} onSquareClick={() => handleClick(6)}/>
                <Square val={squares[7]} onSquareClick={() => handleClick(7)}/>
                <Square val={squares[8]} onSquareClick={() => handleClick(8)}/>
            </div>
            <DataTable
                className="display"
                data={tableData}
                options={{
                    columns: [
                        {data: 'move', name: 'player'},
                        {data: 'player'},
                        {data: 'position'},
                        {data: 'time', render: DT.render.datetime()},
                    ]
                }}

            >
                <thead>
                <tr>
                    <th>Move</th>
                    <th>Player</th>
                    <th>Position</th>
                    <th>Time</th>
                </tr>
                </thead>
            </DataTable>
        </>
    );
};

export default Board;


const Square = ({val, onSquareClick}) => {
    return (
        <button className="square" onClick={onSquareClick}>
            {val}

        </button>
    );
};


const calculateWinner = (squares) => {
    let lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let [a, b, c] of lines) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
