import React from "react";

export default function Die({ value, holdDice, isHeld }) {
	return (
		<div
			className={`die-face ${isHeld ? "is-held" : "unheld"}`}
			onClick={holdDice}
		>
			<h2 className="die-num">{value}</h2>
		</div>
	);
}
