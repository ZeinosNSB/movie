import Autoplay from 'embla-carousel-autoplay'
import { useRef } from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { useGetBannerFilmQuery } from '@/redux/api/film-management.service'

function CarouselHome() {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }))

  const { data: banners } = useGetBannerFilmQuery()
  console.log(banners?.content)

  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[plugin.current]}
      className='w-full m-auto'
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
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
