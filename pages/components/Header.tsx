import { useRouter } from 'next/router'
import React, { ChangeEvent } from 'react'

const Header = () => {
    const { push, locale, pathname } = useRouter();

    const handleLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
        document.cookie = `NEXT_LOCALE=${e.target.value}`
        push(pathname, pathname, { locale: e.target.value })
    }
    return (
        <div className='w-full h-auto fixed bg-white px-10 py-2 flex fle-row justify-between items-center'>
            <h1 className='text-black text-2xl font-sans font-bold'>Google Language Translator</h1>
            <div className=''>
                <select value={locale} name="" id="" className='text-black border border-black w-[120px] rounded-[3px]' onChange={handleLanguage}>
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