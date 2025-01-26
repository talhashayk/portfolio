import React, { useEffect, useState } from "react";
import "./Tenzies.scss";
import Die from "./Die.js";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

const Tenzies = ({ isDarkMode }) => {
	let [tenzies, setTenzies] = useState(false);
	let [dice, setDice] = useState(allNewDice());
	const [showConfetti, setShowConfetti] = useState(false);

	useEffect(() => {
		const allHeld = dice.every((die) => die.isHeld);
		const firstValue = dice[0].value;
		const sameValues = dice.every((die) => die.value === firstValue);
		if (allHeld && sameValues) {
			setTenzies(true);
			setShowConfetti(true);
		}
	}, [dice]);

	useEffect(() => {
		if (showConfetti) {
			const timer = setTimeout(() => {
				setShowConfetti(false);
			}, 6000);
			return () => clearTimeout(timer);
		}
	}, [showConfetti]);

	function generateNewDie() {
		return {
			value: Math.ceil(Math.random() * 6),
			isHeld: false,
			id: nanoid(),
		};
	}

	function allNewDice() {
		const newDice = [];
		for (let i = 0; i < 10; i++) {
			newDice.push(generateNewDie());
		}
		return newDice;
	}

	const diceElements = dice.map((die) => (
		<Die
			key={die.id}
			value={die.value}
			isHeld={die.isHeld}
			isDarkMode={isDarkMode}
			holdDice={() => holdDice(die.id)}
		/>
	));

	function rollDice() {
		if (tenzies) {
			setTenzies(false);
			setDice(allNewDice());
		} else {
			setDice((prevDice) =>
				prevDice.map((die) => {
					return die.isHeld ? die : generateNewDie();
				})
			);
		}
	}

	function holdDice(id) {
		setDice((prevDice) =>
			prevDice.map((die) => {
				return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
			})
		);
	}

	return (
		<div className="tenzies">
			{showConfetti && (
				<Confetti
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						zIndex: 100,
					}}
				/>
			)}
			<h1 className="tenzies-title">Tenzies</h1>
			<p className="tenzies-instructions">
				Roll until all the dice show the same value. Click on a die to
				hold its current value during subsequent rolls.
			</p>
			<div className="dice-container">{diceElements}</div>
			<button className="roll-dice-cta" onClick={rollDice}>
				{tenzies ? "New Game" : "Roll"}
			</button>
		</div>
	);
};

export default Tenzies;
