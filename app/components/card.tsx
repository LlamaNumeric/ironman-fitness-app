import React from 'react'
import { Link } from 'react-router';

interface CardProps {
  title ?: string;
  targetAddress ?: string
}

function Card( { title, targetAddress } : CardProps) {
    return (
      <div className='
            bg-slate-50 rounded-md overflow-hidden
            min-w-[103px] max-w-[103px] min-h-[180px] max-h-[180] md:min-w-[180px] md:max-w-[180px] md:min-h-[240px] md:max-h-[240px]
            '>
          <Link className="h-[100%] flex flex-col" to={targetAddress || "." } target="_blank">
            <div className='bg-lime-200 grow'>Image</div>
            <span className='text-center text-wrap'>{ title || "Card Title"} </span>
          </Link>
      </div>
    )
}

export default Card