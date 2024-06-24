import { CirclePlay } from 'lucide-react'
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
        <figcaption
          className='text-slate-100 flip-card-back absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-3xl bg-cover bg-center transition-all duration-1000 ease-in-out opacity-75'
          style={{ backgroundImage: `url(${film.hinhAnh})` }}
        >
          <CirclePlay className='size-10 hover:text-red-800 hover:scale-125 transition-colors duration-200 ease-in' />
        </figcaption>
      </figure>
      <Button className='w-full mt-6' onClick={() => navigate(`/detail/${film.maPhim}`)}>
        Buy Ticket
      </Button>
    </div>
  )
}

export default CardFilm
