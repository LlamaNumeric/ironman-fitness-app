import React from "react";
import { Link, NavLink } from "react-router";

function BottomNavBar() {
    const selectedItemClass = (isActive : Boolean) => {
        const base = "text-center text-[28px] block";
        return base.concat(isActive ? " bg-blue-300" : "")
    }

	return (
		<nav>
			<ul className='grid grid-cols-5 border-t-3 divide-x-3'>
				<li>
                    <NavLink className={({isActive}) => selectedItemClass(isActive)} to="/">
                        🏠
                    </NavLink>
                </li>
				<li>
                    <NavLink className={({isActive}) => selectedItemClass(isActive)} to="/community">
                        👪
                    </NavLink>
				</li>
				<li>
                    <NavLink className={({isActive}) => selectedItemClass(isActive)} to="/workout">
                        🏋️‍♀️
                    </NavLink>
				</li>
				<li>
                    <NavLink className={({isActive}) => selectedItemClass(isActive)} to="/explore">
                        🧭
                    </NavLink>
				</li>
				<li>
                    <NavLink className={({isActive}) => selectedItemClass(isActive)} to="/profile">
                        🙍‍♂️
                    </NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default BottomNavBar;
