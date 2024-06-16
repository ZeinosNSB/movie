import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetCinemaShowtimeInfoQuery } from '@/redux/api/cinema.service'
import { GROUP_ID } from '@/utils/settingSystems'

function TabsHome() {
  const { data: cinemaShowtimeInfo } = useGetCinemaShowtimeInfoQuery({ maNhom: GROUP_ID })

  return (
    <Tabs defaultValue='BHDStar' className='w-full max-w-7xl m-auto sm:px-6 lg:px-10 py-6' orientation='vertical'>
      <TabsList className='bg-white'>
        {cinemaShowtimeInfo?.content.map(cinemas => (
          <TabsTrigger
            value={cinemas.maHeThongRap}
            key={cinemas.maHeThongRap}
            className='border-r-4 border-transparent data-[state=active]:border-orange-300'
          >
            <img className='rounded-full w-14' src={cinemas.logo} alt={cinemas.tenHeThongRap} />
          </TabsTrigger>
        ))}
      </TabsList>
      <ScrollArea className='h-96'>
        {cinemaShowtimeInfo?.content.map(cinemas => (
          <TabsContent value={cinemas.maHeThongRap} key={cinemas.maHeThongRap}>
            {cinemas.lstCumRap.map(cinema => (
              <TabsList key={cinema.maCumRap} className='bg-white items-start'>
                <TabsTrigger
                  value={cinema.maHeThongRap}
                  key={cinema.maHeThongRap}
                  className='justify-between border-r-4 border-transparent data-[state=active]:border-orange-300'
                >
                  <img className='rounded-full w-14' src={cinema.hinhAnh} alt={cinema.tenCumRap} />
                  <div className='text-start ml-4'>
                    <p>{cinema.tenCumRap}</p>
                    <p>{cinema.diaChi}</p>
                  </div>
                </TabsTrigger>
              </TabsList>
            ))}
          </TabsContent>
        ))}
      </ScrollArea>
    </Tabs>
  )
}

export default TabsHome
