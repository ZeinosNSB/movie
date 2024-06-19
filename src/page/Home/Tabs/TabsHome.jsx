import { motion } from 'framer-motion'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetCinemaShowtimeInfoQuery } from '@/redux/api/cinema.service'
import { GROUP_ID } from '@/utils/config'

const MotionTabsTrigger = motion(TabsTrigger)

function TabsHome() {
  const [activeTab, setActiveTab] = useState('BHDStar')
  const { data: cinemaShowtimeInfo } = useGetCinemaShowtimeInfoQuery({ maNhom: GROUP_ID })

  useEffect(() => {
    cinemaShowtimeInfo && setActiveTab(cinemaShowtimeInfo[0].maHeThongRap)
  }, [cinemaShowtimeInfo])

  return (
    <Tabs defaultValue={activeTab} className='w-full max-w-7xl m-auto sm:px-6 lg:px-10 py-6' orientation='vertical'>
      <TabsList className='bg-white'>
        {cinemaShowtimeInfo?.map(cinemas => (
          <MotionTabsTrigger
            layoutId={cinemas.maHeThongRap}
            value={cinemas.maHeThongRap}
            key={cinemas.maHeThongRap}
            className={`relative ${activeTab === cinemas.maHeThongRap ? 'border-orange-300' : 'border-transparent'}`}
            onClick={() => setActiveTab(cinemas.maHeThongRap)}
          >
            <img className='rounded-full w-14' src={cinemas.logo} alt={cinemas.tenHeThongRap} />
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
      {cinemaShowtimeInfo?.map(cinemas => (
        <TabsContent value={cinemas.maHeThongRap} key={cinemas.maHeThongRap}>
          <Tabs
            defaultValue={cinemas?.lstCumRap[0]?.maCumRap}
            orientation='vertical'
            className='p-0 justify-center w-full'
          >
            <ScrollArea className='h-[810px] overflow-hidden w-[400px]' type='always'>
              <TabsList className='bg-white items-start'>
                {cinemas.lstCumRap.map(cinema => (
                  <TabsTrigger
                    value={cinema.maCumRap}
                    key={cinema.maCumRap}
                    className='data-[state=active]:text-rose-700 px-1'
                  >
                    <img className='rounded-full w-14' src={cinema.hinhAnh} alt={cinema.tenCumRap} />
                    <div className='text-start ml-4'>
                      <p>{cinema.tenCumRap}</p>
                      <p className='text-xs text-slate-400'>
                        {cinema.diaChi.length > 40 ? `${cinema.diaChi.slice(0, 40)}...` : cinema.diaChi}
                      </p>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </ScrollArea>

            {cinemas.lstCumRap.map(cinema => (
              <TabsContent value={cinema.maCumRap} key={cinema.maCumRap}>
                <ScrollArea className='h-[810px] overflow-hidden' type='always'>
                  {cinema.danhSachPhim.map(film => (
                    <div
                      key={film.maPhim}
                      className='flex justify-between w-[650px] gap-4 border-2 rounded-2xl mb-4 mr-8 cursor-pointer hover:shadow-lg'
                    >
                      <img
                        className='w-24 h-36 rounded-l-lg'
                        src={film.hinhAnh}
                        alt='Film'
                        onError={event => {
                          event.target.onerror = null
                          event.target.src = 'https://picsum.photos/96/144'
                        }}
                      />
                      <div className='p-2 w-full'>
                        <h3 className='font-semibold text-slate-900'>{film.tenPhim}</h3>
                        <p className='text-sm text-slate-400'>{cinema.diaChi}</p>
                        <div className='grid grid-cols-6 gap-2 text-nowrap text-sm text-center mt-4'>
                          {film.lstLichChieuTheoPhim.slice(0, 12).map(showtime => (
                            <NavLink to='/' key={showtime.maLichChieu}>
                              <Badge className='justify-center hover:bg-slate-200' variant='outline'>
                                {moment(showtime.ngayChieuGioChieu).format('hh:mm A')}
                              </Badge>
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </TabsContent>
            ))}
          </Tabs>
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default TabsHome
