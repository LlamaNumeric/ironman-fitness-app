import React from 'react'

interface CardListProps {
    title : string | undefined;
    children?: React.ReactNode
}

function CardList( {title, children} : CardListProps) {
  return (
    <div className='m-2 p-2 bg-lime-100 rounded-md md:max-w-[80%] md:mx-auto'>
        <h2 className='p-1 text-lg border-b-3 border-slate-400'>{title}</h2>
        <div className='p-2 flex space-x-4 overflow-auto'>
            {children || "No car0ds available"}
        </div>
    </div>
  )
}

export default CardList