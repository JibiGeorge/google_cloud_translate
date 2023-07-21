import Header from "./components/Header";

export default function Home() {
  return (
    <div className='w-full h-screen flex flex-col'>
      <Header />
      <div className="w-full h-full flex flex-col items-center pt-[80px]">
        <div className='w-[250px] h-[300xp] bg-white p-3'>
          <div className='w-full h-[200px] overflow-hidden'>
            <img src='https://fostervictor.com/wp-content/uploads/2019/12/AtomicHabits_1book-768x993.png' style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
          </div>
          <div className='w-full overflow-hidden font-medium font-serif'>
            <p className='text-black'>Atomic Habits is the most comprehensive and practical guide on how to create good habits, break bad ones, and get 1 percent better every day. I do not believe you will find a more actionable book on the subject of habits and improvement. If you're having trouble changing your habits, the problem isn't you.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
