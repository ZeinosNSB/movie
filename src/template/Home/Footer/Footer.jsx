import { MoveRight } from 'lucide-react'

import cybersoft from '@/assets/logo/cybersoft.png'

function Footer() {
  return (
    <footer className='w-full'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='py-14 grid grid-cols-12 gap-x-5 gap-y-8'>
          <div className='col-span-full xl:col-span-3 relative bg-gradient-to-tl from-amber-600 to-orange-800 rounded-2xl gap-12 p-6 xl:w-72 h-96 flex flex-col justify-center items-center'>
            <a href='#' className='flex justify-center lg:justify-start'>
              <img className='h-32' src={cybersoft} alt='CyberSoft' />
            </a>
            <p className='text-center text-gray-200'>
              Trusted in more than 100 countries & 5 million customers. Have any query? contact us we are here for you.
            </p>
          </div>

          <div className='block text-center xl:text-left xl:py-16 col-span-full min-[500px]:col-span-6 md:col-span-4 xl:col-span-3 xl:pl-5'>
            <h4 className='text-lg text-gray-900 font-bold mb-9'>Get In Touch</h4>
            <ul className='text-gray-900 transition-all duration-500 grid gap-6'>
              <li>support@pagedone.com</li>
              <li>+91 945 658 3256</li>
              <li>61-A, Elm street, Gujarat, India.</li>
            </ul>
          </div>
          <div className='block xl:py-16 col-span-full min-[500px]:col-span-6 md:col-span-4 xl:col-span-3'>
            <h4 className='text-lg text-gray-900 font-bold mb-9 text-center xl:text-left'>Quick Links</h4>
            <div className='flex gap-6 xl:gap-12 max-xl:justify-center'>
              <ul className='text-gray-600 transition-all duration-500 grid gap-6'>
                <li>
                  <a href='#'>Home</a>
                </li>
                <li>
                  <a href='#'>FAQs</a>
                </li>
                <li>
                  <a href='#'>Price Plan</a>
                </li>
                <li>
                  <a href='#'>Features</a>
                </li>
              </ul>
              <ul className='text-gray-600 transition-all duration-500 grid gap-6'>
                <li>
                  <a href='#'>Careers</a>
                </li>
                <li>
                  <a href='#'>About </a>
                </li>
                <li>
                  <a href='#'>Contact</a>
                </li>
                <li>
                  <a href='#'>Products</a>
                </li>
              </ul>
            </div>
          </div>
          <div className='block xl:py-16 col-span-full md:col-span-4 xl:col-span-3'>
            <h4 className='text-lg text-gray-900 font-bold mb-9 text-center xl:text-left'>Newsletter</h4>
            <div className='grid gap-7 '>
              <input
                type='text'
                name='email'
                className='py-2 px-4 border border-gray-300 shadow-sm h-14 text-lg text-gray-800 rounded-full w-full  xl:w-64 placeholder:text-gray-400 focus:outline-none'
                placeholder='Enter email..'
              />
              <button
                type='submit'
                className='flex gap-2 justify-center items-center py-3.5 px-7 rounded-full text-white bg-gradient-to-tl from-amber-600 to-orange-800 shadow-md w-fit transition-all duration-500 mx-auto xl:mx-0'
              >
                Subscribe
                <MoveRight />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='py-4 bg-indigo-50'>
        <div className='flex items-center justify-center'>
          <span className='text-sm text-gray-800 '>
            Copyright@2024 All Right Reserved by{' '}
            <a href='#' className='hover:text-amber-600'>
              CyberSoft
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
