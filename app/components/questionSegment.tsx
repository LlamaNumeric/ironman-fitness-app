import React, { useEffect, useState } from "react";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Ironman" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

type SegmentType = {
	name: string;
	type: string;
	prompt: string;
	content?: {
		options?: { imagepath?: string; label: string }[];
		range?: { min: number; max: number };
		defaultValue: number;
	};
};

interface QuestionProps {
	data: SegmentType;
	answerPoolUpdater: Function;
}

function QuestionSegment({ data, answerPoolUpdater }: QuestionProps) {
	const { name, type, prompt, content } = data;
	const [storedValue, setStoredValue] = useState<any>(
		content?.defaultValue ?? 0
	);

	function handleClick() {
		if (type === "multiple choices") {
			let a = content?.options ? content?.options[storedValue].label : 0;
			answerPoolUpdater({ prompt: name, response: a });
		} else {
			answerPoolUpdater({ prompt: name, response: storedValue });
		}
		setStoredValue(content?.defaultValue ?? 0)
	}

	function handleChange(
		event: React.ChangeEvent<HTMLInputElement>,
		index?: number
	) {}

	const inputTypesSyntax: { [key: string]: Function } = {
		"multiple choices": () => (
			<div className='flex flex-col'>
				<p className='m-4 text-center text-xl'>{prompt}</p>
				<div className='m-2 grid grid-cols-2 gap-2 '>
					{content?.options ? (
						content.options.map(({ imagepath, label }, i) => (
							<label
								key={i}
								htmlFor={`c-${i}`}
								className={
									"p-3 rounded-xl flex flex-col items-center text-center" +
									(i === storedValue ? " bg-green-100" : "")
								}>
								{imagepath && imagepath.trim() !== "" && (
									<img
										src={imagepath}
										width={"80px"}
										height={"80px"}
										className='rounded-lg'
									/>
								)}
								<input
									type='radio'
									className='hidden'
									name={prompt}
									id={`c-${i}`}
									defaultValue={content.defaultValue}
									onChange={e => setStoredValue(i)}
								/>
								{label}
							</label>
						))
					) : (
						<></>
					)}
				</div>
			</div>
		),
		slider: () => (
			<div className='flex justify-center'>
				<p>{prompt}</p>
				<label
					htmlFor='a'
					className='flex flex-col justify-center text-center'>
					{storedValue}
					<input
						id='a'
						type={"range"}
						min={content?.range?.min}
						max={content?.range?.max}
						defaultValue={content?.defaultValue}
						onChange={e => setStoredValue(e.target.value)}
					/>
				</label>
			</div>
		),
		text: () => (
			<input
				type={"text"}
				defaultValue={content?.defaultValue}
				onChange={e => setStoredValue(e.target.value)}
			/>
		),
	};

	return (
		<>
			{inputTypesSyntax[type]()}{" "}
			<div className='mx-4 my-2 flex justify-end'>
				<button
					onClick={handleClick}
					className='p-2 bg-lime-100 hover:bg-lime-300 rounded-full transition duration-200 min-w-[120px] text-center'>
					Next
				</button>
			</div>
		</>
	);
}

export default QuestionSegment;
