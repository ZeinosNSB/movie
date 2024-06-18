import './ListFilm.css'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CardFilm from '@/page/Home/ListFilm/CardFilm'
import { useGetFilmListQuery } from '@/redux/api/film.service'
import { GROUP_ID } from '@/utils/config'

function ListFilm() {
  const { data: listFilm } = useGetFilmListQuery({ maNhom: GROUP_ID })

  return (
    <Tabs defaultValue='on' className='w-full max-w-7xl m-auto'>
      <TabsList className='mx-auto ml-14 mt-10 bg-white gap-4'>
        <TabsTrigger
          value='on'
          className='p-2 text-base rounded-2xl text-slate-900 hover:bg-neutral-300 border-2 border-amber-200 hover:border-neutral-300 data-[state=active]:bg-slate-900 data-[state=active]:text-orange-300 data-[state=active]:border-slate-900'
        >
          Now Showing
        </TabsTrigger>
        <TabsTrigger
          value='off'
          className='p-2 text-base rounded-2xl text-slate-900 hover:bg-neutral-300 border-2 border-amber-200 hover:border-neutral-300 data-[state=active]:bg-slate-900 data-[state=active]:text-orange-300 data-[state=active]:border-slate-900'
        >
          Coming soon
        </TabsTrigger>
      </TabsList>
      <TabsContent value='on'>
        <Carousel opts={{ loop: true }}>
          <CarouselContent>
            {listFilm?.content
              .filter(film => film.dangChieu)
              .map(film => (
                <CarouselItem key={film.maPhim} className='xs:basis-1 md:basis-1/2 lg:basis-1/3'>
                  <CardFilm film={film} />
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious className='left-5' />
          <CarouselNext className='right-5' />
        </Carousel>
      </TabsContent>
      <TabsContent value='off'>
        <Carousel opts={{ loop: true }}>
          <CarouselContent>
            {listFilm?.content
              .filter(film => film.sapChieu)
              .map(film => (
                <CarouselItem key={film.maPhim} className='xs:basis-1 md:basis-1/2 lg:basis-1/3'>
                  <CardFilm film={film} />
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious className='left-5' />
          <CarouselNext className='right-5' />
        </Carousel>
      </TabsContent>
    </Tabs>
  )
}

export default ListFilm
