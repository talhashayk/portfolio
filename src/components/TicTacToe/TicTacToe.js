import React, { useState, useEffect } from "react";
import "./TicTacToe.scss";
import Confetti from "react-confetti";

const TicTacToe = () => {
	const [board, setBoard] = useState(Array(9).fill(null));
	const [xIsNext, setXIsNext] = useState(true);
	const [showConfetti, setShowConfetti] = useState(false);

	const winner = calculateWinner(board);

	const handleCellClick = (index) => {
		if (board[index] || winner) return;
		const newBoard = board.slice();
		newBoard[index] = xIsNext ? "X" : "O";
		setBoard(newBoard);
		setXIsNext(!xIsNext);
	};

	const resetGame = () => {
		setBoard(Array(9).fill(null));
		setXIsNext(true);
	};

	useEffect(() => {
		if (winner) {
			setShowConfetti(true);
			const timer = setTimeout(() => {
				setShowConfetti(false);
			}, 6000);
			return () => clearTimeout(timer);
		}
	}, [winner]);

	return (
		<div className="tic-tac-toe">
			{winner && showConfetti && (
				<Confetti
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						zIndex: 100,
					}}
				/>
			)}
			<h1 className="tic-tac-toe-title">Tic Tac Toe</h1>
			<p className="tic-tac-toe-instructions">
				Take turns placing Xs and Os on the board below. The first to
				get 3 in a row wins.
			</p>
			<div className="board">
				{board.map((cell, index) => (
					<div
						key={index}
						className="cell"
						onClick={() => handleCellClick(index)}
					>
						{cell}
					</div>
				))}
			</div>
			<div className="tic-tac-toe-info">
				<p className="tic-tac-toe-status">
					{winner
						? `${winner} wins!`
						: board.every((cell) => cell !== null)
						? "Draw"
						: `${xIsNext ? "X" : "O"}'s turn`}
				</p>
				<button className="tic-tac-toe-cta" onClick={resetGame}>
					{winner ? `Play again?` : `Reset game?`}
				</button>
			</div>
		</div>
	);
};

function calculateWinner(board) {
	const lines = [
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
		if (board[a] && board[a] === board[b] && board[a] === board[c]) {
			return board[a];
		}
	}
	return null;
}

export default TicTacToe;
