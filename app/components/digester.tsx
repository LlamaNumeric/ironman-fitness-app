import React, { useState } from "react";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Ironman" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

interface DigesterProps {
	type: string;

	defaultValue?: string | number;
	value?: string | number;
}

function Digester({ type, defaultValue, value }: DigesterProps) {
	const [currentValue, setCurrentValue] = useState("");

	return <input type={type} defaultValue={defaultValue} />;
}

export default Digester;
