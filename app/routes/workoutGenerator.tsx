import React, { useState } from "react";
import { Link } from "react-router";
import QuestionSegment from "~/components/questionSegment";
import type { Route } from "./+types";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Ironman" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

type Question = {
	name: string;
	type: string;
	prompt: string;
	content?: {
		options?: { imagepath?: string; label: string }[];
		range?: { min: number; max: number; step?: number };
		defaultValue: number;
	};
};

function WorkoutGenerator() {
	const [currentPage, setCurrentPage] = useState(0);
	const [answerPool, setAnswerPool] = useState<
		{ prompt: string; response: string }[]
	>([]);

	const questionSyntax: Question[] = [
		{
			name: "Current Goal",
			type: "multiple choices",
			prompt: "What is your current fitness goal?",
			content: {
				options: [
					{
						imagepath: "/images/lifting weights.jpg",
						label: "To build muscles and body strength",
					},
					{
						imagepath: "/images/sit-and-reach.jpg",
						label: "To become more flexible",
					},
					{
						imagepath: "/images/volleyball.jpg",
						label: "To be better at sports",
					},
					{
						imagepath: "/images/rehab.jpg",
						label: "To rehabilitate my body",
					},
					{
						imagepath: "/images/weight watch.jpg",
						label: "To maintain a certain weight",
					},
					{
						imagepath: "/images/jogging.jpg",
						label: "To develop my stamina",
					},
				],
				defaultValue: 0,
			},
		},
		{
			name: "Intensity",
			type: "multiple choices",
			prompt: "How intense do you want the exercise to be?",
			content: {
				options: [
					{ label: "Beginner" },
					{ label: "Light" },
					{ label: "Intermediate" },
					{ label: "Heavy" },
				],
				defaultValue: 0,
			},
		},
	];

	function addResponses(data: { prompt: string; response: string }) {
		setAnswerPool(prev => [...prev, data]);
		setCurrentPage(e => e + 1);
	}

	return (
		<div className='h-screen flex flex-col'>
			<h1 className='py-3 px-2 border-b-4 border-gray-300 bg-slate-50 text-lg font-bold'>
				Summary
			</h1>
			<div className='grow block flex flex-col justify-center p-2 space-y-2'>
				{currentPage < questionSyntax.length ? (
					<QuestionSegment
						data={questionSyntax[currentPage]}
						answerPoolUpdater={addResponses}
					/>
				) : (
					<>
						<table className='min-h-[25%] block table-auto rounded-xl bg-orange-50'>
							<tbody>
								{answerPool.map(({ prompt, response }, i) => (
									<tr key={i} className='[&>td]:p-2'>
										<td className=''>{prompt}</td>
										<td className=''>{response}</td>
									</tr>
								))}
							</tbody>
						</table>
						<div className='grow overflow-auto rounded-xl bg-lime-50'></div>
						<div className='flex justify-center'>
							<Link
								to='/workout'
								className='p-2 bg-green-100 hover:bg-green-300 rounded-full transition duration-200 min-w-[120px] text-center'>
								Accept
							</Link>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default WorkoutGenerator;
