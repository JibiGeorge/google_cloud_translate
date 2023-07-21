import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <h1 className='w-full h-screen flex justify-center items-center text-2xl'>Google Cloud Translate</h1>
  )
}
