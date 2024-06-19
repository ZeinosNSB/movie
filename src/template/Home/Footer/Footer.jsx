import { MoveRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import cybersoft from '@/assets/logo/cybersoft.png'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useGetCinemaInfoQuery } from '@/redux/api/cinema.service'

const site = ['Home', 'News', 'Contact']

function Footer() {
  const { data: listCinema } = useGetCinemaInfoQuery()

  return (
    <footer className='bg-gray-800'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='px-4 sm:px-6 lg:px-8'>
          <div className='py-8 grid grid-cols-12 gap-x-5 gap-y-8'>
            <div className='col-span-full xl:col-span-3 relative bg-slate-500 rounded-2xl gap-12 p-6 xl:w-72 h-96 flex flex-col justify-center items-center bg-gradient-to-br from-amber-600 to-amber-900 shadow-2xl shadow-amber-300'>
              <a href='#' className='flex justify-center lg:justify-start'>
                <img className='h-32' src={cybersoft} alt='CyberSoft' />
              </a>
              <p className='text-center text-gray-200'>
                Trusted in more than 100 countries & 5 million customers. Have any query? contact us we are here for
                you.
              </p>
            </div>

            <div className='mx-auto grid xl:grid-col-1 xl:col-span-3 md:col-span-4 xl:py-16'>
              <h4 className='text-lg text-white font-bold text-center xl:text-left'>CyberSoft</h4>
              {site.map(item => (
                <Link to={item.toLowerCase()} key={item} className='text-sm text-gray-400 block hover:text-white'>
                  {item}
                </Link>
              ))}
            </div>

            <div className='block xl:py-16 col-span-full min-[500px]:col-span-6 md:col-span-4 xl:col-span-3 mx-auto'>
              <h4 className='text-lg text-white font-bold mb-9 text-center xl:text-left'>Partners</h4>
              <div className='grid grid-cols-2 text-sm gap-6 xl:gap-12 max-xl:justify-center'>
                {listCinema?.map(cinema => (
                  <img
                    className='h-10 cursor-pointer'
                    key={cinema.maHeThongRap}
                    src={cinema.logo}
                    alt={cinema.tenHeThongRap}
                  />
                ))}
              </div>
            </div>

            <div className='block xl:py-16 col-span-full md:col-span-4 xl:col-span-3'>
              <h4 className='text-lg text-white font-bold mb-9 text-center xl:text-left'>Newsletter</h4>
              <div className='grid gap-7 '>
                <Input type='email' className='bg-white' placeholder='Enter email ...' />
                <Button type='submit' className='bg-orange-500'>
                  Subscribe
                  <MoveRight className='pl-2' />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className='py-5 px-3 sm:px-4 lg:px-6 border-t border-gray-200'>
          <span className='text-sm text-gray-500 '>
            ©<a href=''>CyberSoft</a> 2024, All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
