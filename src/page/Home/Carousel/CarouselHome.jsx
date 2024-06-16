import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import { useRef } from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { useGetBannerFilmQuery } from '@/redux/api/film.service'

function CarouselHome() {
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnMouseEnter: true }))
  const fade = useRef(Fade())

  const { data: banners } = useGetBannerFilmQuery()

  return (
    <Carousel opts={{ loop: true }} plugins={[autoplay.current, fade.current]} className='w-full m-auto'>
      <CarouselContent>
        {banners?.content.map(banner => (
          <CarouselItem key={banner.maBanner}>
            <div
              className='bg-no-repeat bg-cover bg-center w-full h-[700px]'
              style={{ backgroundImage: `url(${banner.hinhAnh})` }}
            >
              <img className='opacity-0' src={banner.hinhAnh} alt='CyberSoft' />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='left-10' />
      <CarouselNext className='right-10' />
      <CarouselDots className='bottom-0' />
    </Carousel>
  )
}

export default CarouselHome
