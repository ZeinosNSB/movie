import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'

function CardFilm({ film }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const navigate = useNavigate()

  const handleMouseMove = event => {
    const rect = event.currentTarget.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top
    const rotateX = (mouseY / rect.height - 0.5) * 50
    const rotateY = -(mouseX / rect.width - 0.5) * 50
    event.currentTarget.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMouseLeave = event => {
    event.currentTarget.style.transform = ''
  }

  const handleFlip = () => {
    setIsFlipped(isFlipped => !isFlipped)
  }

  return (
    <div className='px-10 py-2'>
      <figure
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleFlip}
        onKeyDown={event => event.key === 'Enter' && handleFlip()}
        tabIndex='0'
        className={`flip-container relative h-[400px] cursor-pointer rounded-3xl w-full ${isFlipped ? 'is-flipped' : ''}`}
      >
        <div
          className='flip-card-front absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-3xl bg-cover bg-center transition-all duration-1000 ease-in-out'
          style={{ backgroundImage: `url(${film.hinhAnh})` }}
        >
          <img className='opacity-0 h-0' src={film.hinhAnh} alt='Film' />
        </div>
        <figcaption className='flip-card-back absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-3 rounded-3xl bg-slate-950 text-slate-100 transition-all duration-1000 ease-in-out'>
          <h2 className='mb-2 text-2xl font-bold'>Bald Eagle</h2>
          <img
            src='https://images.unsplash.com/photo-1611689342806-0863700ce1e4?q=80&w=600'
            alt='Bald Eagle Portrait'
            className='size-24 rounded-full object-cover'
          />
          <h3 className='font-semibold'>National Symbol of the USA</h3>
          <div className='grid grid-cols-1 grid-rows-3 gap-2 text-nowrap text-sm'>
            <div className='rounded-full bg-amber-500 px-4 py-2 text-center font-semibold text-slate-900'>
              White & Brown
            </div>
            <div className='rounded-full bg-amber-500 px-4 py-2 text-center font-semibold text-slate-900'>
              Fish Expert
            </div>
            <div className='rounded-full bg-amber-500 px-4 py-2 text-center font-semibold text-slate-900'>
              Found Near Water
            </div>
          </div>
        </figcaption>
      </figure>
      <Button className='w-full mt-6' onClick={() => navigate(`/detail/${film.maPhim}`)}>
        Đặt vé
      </Button>
    </div>
  )
}

export default CardFilm
