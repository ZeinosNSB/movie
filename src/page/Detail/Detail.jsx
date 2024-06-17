import { motion } from 'framer-motion'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { Rating } from '@/components/ui/rating'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetFilmInfoQuery } from '@/redux/api/cinema.service'

const MotionTabsTrigger = motion(TabsTrigger)

function Detail() {
  const [activeTab, setActiveTab] = useState(null)
  const { id } = useParams()
  const { data: film } = useGetFilmInfoQuery({ maPhim: id })

  useEffect(() => {
    film && setActiveTab(film.content.heThongRapChieu[0]?.maHeThongRap)
  }, [film])

  return (
    <div className='bg-cover bg-no-repeat' style={{ backgroundImage: `url(${film?.content?.hinhAnh})` }}>
      <div className='backdrop-blur-xl min-h-screen pt-52'>
        <div className='max-w-7xl w-full mx-auto grid grid-cols-12 gap-8 z-10 px-6'>
          <div className='col-span-4 mx-auto'>
            <img
              className='rounded-2xl h-96 aspect-video object-cover bg-cover bg-no-repeat'
              src={film?.content?.hinhAnh}
              alt='Film'
              onError={event => {
                event.target.onerror = null
                event.target.src = 'https://picsum.photos/300'
              }}
            />
          </div>
          <div className='col-span-5 w-full mx-auto flex justify-center flex-col'>
            <p className='text-lg text-white mb-3'>
              Ngày khởi chiếu: {moment(film?.content?.ngayKhoiChieu).format('DD-MM-YYYY')}
            </p>
            <h1 className='text-3xl font-bold text-white mb-3'>{film?.content?.tenPhim}</h1>
            <div className='text-slate-200'>
              <p className='text-lg'>Mô tả:</p>
              <p>{film?.content?.moTa}</p>
            </div>
          </div>
          <div className='col-span-3 relative w-32 aspect-square m-auto'>
            <Rating
              rating={film?.content?.danhGia / 2}
              totalStars={5}
              size={24}
              variant='yellow'
              className='h-1 pb-10'
              showText={false}
              disabled={true}
            />
            <svg className='w-full h-full' viewBox='0 0 100 100'>
              <circle
                className='text-gray-100 stroke-current opacity-25'
                strokeWidth='10'
                cx='50'
                cy='50'
                r='40'
                fill='transparent'
              />
              <circle
                className={`${film?.content?.danhGia >= 8 ? 'text-green-600' : 'text-orange-600'} stroke-current`}
                strokeWidth='10'
                strokeLinecap='round'
                cx='50'
                cy='50'
                r='40'
                fill='transparent'
                strokeDasharray='251.2'
                strokeDashoffset={`calc(251.2 - (251.2 * ${film?.content?.danhGia}) / 10)`}
                style={{
                  transition: 'stroke-dashoffset 0.5s',
                  transform: 'rotate(-90deg)',
                  transformOrigin: '50% 50%'
                }}
              />
              <text
                x='50'
                y='55'
                textAnchor='middle'
                fill='white'
                fontSize='20'
                fontWeight='bold'
                className='font-bold'
              >
                {film?.content?.danhGia}
              </text>
            </svg>
          </div>
        </div>

        {activeTab && (
          <Tabs defaultValue='showtime' className='w-full max-w-7xl m-auto p-4 bg-white rounded-2xl mb-10 mt-32'>
            <TabsList className='w-full grid grid-cols-3'>
              <TabsTrigger value='showtime'>Lịch chiếu</TabsTrigger>
              <TabsTrigger value='info'>Thông tin</TabsTrigger>
              <TabsTrigger value='rating'>Đánh giá</TabsTrigger>
            </TabsList>
            <TabsContent value='showtime'>
              <Tabs defaultValue={activeTab} orientation='vertical' className='w-full'>
                <TabsList className='bg-white'>
                  {film?.content?.heThongRapChieu.map(cinemas => (
                    <MotionTabsTrigger
                      layoutId={cinemas.maHeThongRap}
                      value={cinemas.maHeThongRap}
                      key={cinemas.maHeThongRap}
                      className={`flex items-center w-full gap-4 relative ${activeTab === cinemas.maHeThongRap ? 'border-orange-300' : 'border-transparent'}`}
                      onClick={() => setActiveTab(cinemas.maHeThongRap)}
                    >
                      <img className='rounded-full w-14' src={cinemas.logo} alt={cinemas.tenHeThongRap} />
                      <div>{cinemas.tenHeThongRap}</div>

                      {activeTab === cinemas.maHeThongRap && (
                        <motion.div
                          layoutId='border'
                          transition={{ duration: 0.5, type: 'spring' }}
                          className='absolute inset-y-0 right-0 w-1 bg-orange-300 rounded-r-full'
                        />
                      )}
                    </MotionTabsTrigger>
                  ))}
                </TabsList>
                {film?.content?.heThongRapChieu.map(cinemas => (
                  <TabsContent value={cinemas.maHeThongRap} key={cinemas.maHeThongRap} className='w-[1000px]'>
                    {cinemas.cumRapChieu.map(cinema => (
                      <div key={cinema.maCumRap} className='border-b-2 rounded-b-2xl pl-4 py-3'>
                        <div className='flex items-center'>
                          <img className='rounded-full w-14' src={cinema.hinhAnh} alt={cinema.tenCumRap} />
                          <div className='pl-6'>
                            <p>{cinema.tenCumRap}</p>
                            <p className='text-xs text-slate-400'>{cinema.diaChi}</p>
                            <div className='grid grid-cols-4 mt-2'>
                              {cinema.lichChieuPhim.slice(0, 12).map(showtime => (
                                <NavLink to='/' key={showtime.maLichChieu}>
                                  <Badge className='justify-center hover:bg-slate-200' variant='outline'>
                                    {moment(showtime.ngayChieuGioChieu).format('hh:mm A')}
                                  </Badge>
                                </NavLink>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                ))}
              </Tabs>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}

export default Detail
