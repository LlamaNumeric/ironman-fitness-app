import React, { useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Ironman" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

function Workout() {
	const [activeTab, setActiveTab] = useState("Workout");

	const layout: { [key: string]: Function } = {
		Workout: () => {
			return (
				<div className='mx-2 p-2'>
					<p className='text-center'>
						You don't have an active fitness routine
					</p>
					<div className='flex justify-center'>
						<Link to='/generator' className='p-2 rounded-lg border'>
							Generate a routine
						</Link>
					</div>
				</div>
			);
		},
		Diet: () => {
			return (
				<div className='mx-2 p-2'>
					<p className='text-center'>You don't have an active diet plan</p>
					<div className='flex justify-center'>
						<Link to='/planner' className='p-2 rounded-lg border'>
							Plan a diet
						</Link>
					</div>
				</div>
			);
		},
	};

	return (
		<div>
			<h1 className='py-3 px-2 border-b-4 border-gray-300 bg-slate-50 text-lg font-bold'>
				Fitness
			</h1>
			<div className='m-2 flex justify-center'>
				<span className='p-2 flex justify-center gap-4 bg-neutral-50 rounded-xl [&>button]:rounded-full [&>button]:w-[100px] [&>button]:p-2 [&>button]:transition [&>button]:duration-250'>
					<button
						onClick={() => setActiveTab("Workout")}
						className={
							activeTab === "Workout"
								? "bg-green-200"
								: "bg-green-100 hover:bg-green-300"
						}>
						Workout
					</button>
					<button
						onClick={() => setActiveTab("Diet")}
						className={
							activeTab === "Diet"
								? "bg-green-200"
								: "bg-green-100 hover:bg-green-300"
						}>
						Diet
					</button>
				</span>
			</div>
			<div className=''>{layout[activeTab]()}</div>
		</div>
	);
}

export default Workout;
