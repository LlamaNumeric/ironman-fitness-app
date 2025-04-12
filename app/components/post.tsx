import React from 'react'

interface CardProps {
    content : {[key: string] : string | undefined};
}

function CardPost( {content} : CardProps) {
    const {title, author, publishDate, image, caption, altText} = content;
    return (
        <div className='h-[220px] flex flex-col border-2 border-neutral-300 rounded-md'>
            <div className='p-2 h-[65%] bg-neutral-300 overflow-hidden'>
                <img className="mx-auto rounded-lg " src={image} alt={altText} width="180px" height="180px"/>
            </div>
            <div className='p-2 grow bg-neutral-50'>
                <h2 className='text-xl font-bold'>{title}</h2>
                <span className='text-sm text-neutral-600'>by {author?.length ? author : "author"} | {publishDate ?.length ? publishDate : ""}</span>
                <p className=''>{caption}</p>
            </div>
        </div>
    )
}

export default CardPost