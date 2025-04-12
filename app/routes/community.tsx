import React from "react";
import Card from "~/components/card";
import CardList from "~/components/cardList";

function Community() {
	return (
		<div>
			<h1 className='py-3 px-2 border-b-4 border-gray-300 bg-slate-50 text-lg font-bold'>
				Find your Community
			</h1>
			<CardList title='Government'>
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
			</CardList>
			<CardList title='Facebook Groups'>
				<Card
					title='NNC'
					targetAddress='https://www.facebook.com/nncofficial/'
				/>
				<Card />
			</CardList>
			<CardList title='Local Fitness Clubs'>
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
			</CardList>
		</div>
	);
}

export default Community;
