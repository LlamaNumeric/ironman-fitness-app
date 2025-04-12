import React from "react";
import type { Route } from "../+types/root";
import { Outlet } from "react-router";
import BottomNavBar from "~/components/bottomNavBar";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Ironman" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function Home() {
	return (
		<div className='h-screen flex flex-col justify-stretch'>
			<div className='grow overflow-y-auto'>
				<Outlet />
			</div>
			<BottomNavBar />
		</div>
	);
}
