import React from "react";
import { Link } from "react-router";

function Profile() {
	const menuItems = {
		first: [
			{ name: "General settings", value: "general" },
			{ name: "Workout settings", value: "workout" },
			{ name: "Measuring units", value: "units" },
			{ name: "Language", value: "lang" },
		],
		second: ["Rate this app", "Feedback"],
	};

	return (
		<div >
			<h1 className='py-3 px-2 border-b-4 border-gray-300 bg-slate-50 text-lg font-bold'>
				User Profile
			</h1>

			<div className='space-y-2 [&>ul]:divide-y-2 [&>ul]:divide-slate-400 [&>ul>li:nth-child(odd)]:bg-lime-50 [&>ul>li]:p-2'>
        <ul>
          {menuItems.first.map((p, index) => (
            <li key={index}>
              <Link to={"/settings/" + `${p.value}-${p.name}`}>
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul>
          {menuItems.second.map((p, index) => (
            <li key={index}>
              <Link to={""}>{p}</Link>
            </li>
          ))}
        </ul>
      </div></div>
	);
}

export default Profile;
