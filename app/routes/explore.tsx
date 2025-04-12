import React from "react";
import { Link } from "react-router";

function Explore() {
	const listItems = [
		"Healthy Living",
		"Dance Central",
		"Filipino Sports and Games",
		"Going Outdoors",
		"Exercises For Certain Ages",
	];
	return (
		<>
			<h1 className='py-3 px-2 border-b-4 border-gray-300 bg-slate-50 text-lg font-bold'>
				Explore Fitness and Other Things
			</h1>
			<ul className='divide-y-3 divide-slate-300 [&>li]:p-2 [&>li:nth-child(odd)]:bg-lime-50'>
				{listItems.map((p, index) => (
					<li key={index}>
						<Link to='/explore'>{p}</Link>
					</li>
				))}
			</ul>
		</>
	);
}

export default Explore;
