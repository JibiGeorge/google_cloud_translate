import React from 'react'

const Header = () => {
    return (
        <div className='w-full h-auto fixed bg-white px-10 py-2 flex fle-row justify-between items-center'>
            <h1 className='text-black text-2xl font-sans font-bold'>Google Language Translator</h1>
            <div className=''>
                <select name="" id="" className='text-black border border-black w-[120px] rounded-[3px]'>
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="it">Italin</option>
                    <option value="fr">French</option>
                </select>
            </div>
        </div>
    )
}

export default Header