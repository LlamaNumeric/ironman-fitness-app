import React from "react";

interface ButtonGroupProps {
    title : string;
    children?: React.ReactNode;
}

const buttonStyling = ({children} : ButtonGroupProps) : string => {
  const classname = [];
  classname.push(React.Children.count(children) > 0 ? "flex gap-[5px]" : "")
  classname.push("mt-2 text-sm md:text-lg")
  classname.push("[&>a]:bg-emerald-200 [&>a]:rounded-md [&>a]:p-1 [&>a]:text-center [&>a]:min-w-[20%] [&>a]:flex [&>a]:flex-col [&>a]:justify-center")
  return classname.join(" ");
}

function ButtonGroup(props : ButtonGroupProps) {
  return (
    <div className="p-2 sm:mx-auto sm:w-[80%] bg-lime-100 rounded-md space-y-4 ">
        <h1 className="m-0 border-b border-slate-400">{props.title}</h1>
        <div className={buttonStyling(props)} >{props.children || <p className="m-1 text-center text-neutral-500 block">This button group is empty</p>}</div>
    </div>
  )
}

export default ButtonGroup