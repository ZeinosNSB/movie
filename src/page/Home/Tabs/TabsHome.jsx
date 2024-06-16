import { motion } from 'framer-motion'
import { useState } from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetCinemaShowtimeInfoQuery } from '@/redux/api/cinema.service'
import { GROUP_ID } from '@/utils/settingSystems'

function TabsHome() {
  const { data: cinemaShowtimeInfo } = useGetCinemaShowtimeInfoQuery({ maNhom: GROUP_ID })
  const [activeTab, setActiveTab] = useState('BHDStar')

  return (
    <Tabs defaultValue='BHDStar' className='w-full max-w-7xl m-auto sm:px-6 lg:px-10 py-6' orientation='vertical'>
      <TabsList className='bg-white'>
        {cinemaShowtimeInfo?.content.map(cinemas => (
          <TabsTrigger
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
          </TabsTrigger>
        ))}
      </TabsList>
      {cinemaShowtimeInfo?.content.map(cinemas => (
        <TabsContent value={cinemas.maHeThongRap} key={cinemas.maHeThongRap}>
          <ScrollArea className='h-[400px] w-[400px]' type='always'>
            {cinemas.lstCumRap.map(cinema => (
              <TabsList key={cinema.maCumRap} className='bg-white items-start'>
                <TabsTrigger
                  value={cinema.maHeThongRap}
                  key={cinema.maHeThongRap}
                  className='border-r-4 border-transparent data-[state=active]:border-orange-300'
                >
                  <img className='rounded-full w-14' src={cinema.hinhAnh} alt={cinema.tenCumRap} />
                  <div className='text-start ml-4'>
                    <p>{cinema.tenCumRap}</p>
                    <p className='text-xs text-slate-400'>
                      {cinema.diaChi.length > 40 ? `${cinema.diaChi.slice(0, 40)}...` : cinema.diaChi}
                    </p>
                  </div>
                </TabsTrigger>
              </TabsList>
            ))}
          </ScrollArea>
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default TabsHome
