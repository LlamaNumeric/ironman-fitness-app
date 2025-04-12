import React from "react";
import ButtonGroup from "~/components/buttonGroup";
import { Link, useOutletContext } from "react-router";
import CardPost from "~/components/post";

const posts = [
	{
		title: "Top 10 Songs to Put On When Exercising",
		author: "GlowUpGal",
		publishDate: "Jun 17, 1982", 
		image: "/images/Gym Man.jpg",
		altText: "man running on treadmill",
		caption: "Third one is my go-to song!",
	},
	{
		title: "Eating Disorders",
		author: "NNC_Official",
		publishDate: "Mar 14, 2002", 
		image: "/images/vulture-child.jpg",
		altText: "vulture waiting for malnourished child to perish",
		caption:
			"Understanding eating disorders—breaking the stigma and promoting recovery",
	},
	{
		title: "Malnutrition",
		author: "NNC_Official",
		publishDate: "Dec 25, 2015", 
		image: "/images/Malnutrition.jpg",
		altText: "a poster about malnutrition",
		caption:
			"Are you at risk? Find out the hidden dangers of malnutrition before it's too late!",
	},
	{
		title: "Guides to Fruits",
		author: "NNC_Official",
		publishDate: "Feb 29, 2021", 
		image: "/images/a fruit basket.jpg",
		altText: "a fruit basket",
		caption:
			"Boost your health instantly—discover the secret powers of these super fruits!",
	},
];

const buttonStyle = "p-1 border-1 border-slate-400 rounded-md"

function Index() {

	return (
		<>
			<h1 className='py-3 px-2 border-b-4 border-gray-300 bg-slate-50 text-lg font-bold'>
				Ironman: Your Fitness Companion App
			</h1>
			<h2 className='m-2 text-2xl font-bold text-slate-800'>Popular Topics</h2>
			<div className='px-2 flex flex-col space-y-4'>
				<ButtonGroup title={"Nutrition & Diet 🍎"}>
					<Link to='/eNutrition'>eNutrition</Link>
				</ButtonGroup>
				<ButtonGroup title={"Fitness 🏋️‍♀️"}>
					<Link to='/eNutrition'>Fitness for Beginners</Link>
				</ButtonGroup>
				<ButtonGroup title={"Sports and Recreation 🎾"}>
					<Link to='/eNutrition'>Traditional Filipino Sports</Link>
					<Link to='/eNutrition'>All things Basketball</Link>
					<Link to='/eNutrition'>Volleyball</Link>
				</ButtonGroup>
				<ButtonGroup title={"Trending 🔥"}></ButtonGroup>
			</div>
			<h1 className='m-2 text-2xl font-bold text-slate-800'>
				Posts
			</h1>
			<div className="m-2">
				<span>Sort by : </span><div className="inline-grid grid grid-cols-3 gap-5"><button className={buttonStyle}>New</button><button className={buttonStyle}>Trending</button><button className={buttonStyle}>Best</button></div>
			</div>	
			<div className="px-2 mb-4 space-y-6">
				{posts.map((p, i) => (
					<CardPost key={i} content={p} />
				))}
			</div>
		</>
	);
}

export default Index;
