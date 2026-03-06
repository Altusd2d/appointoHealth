import phones from '../../../public/hero/webpages_in_phone-removebg-preview.png'
import Image from 'next/image'
import localFont from "next/font/local"
import Navbar from './navbar'
import { Roboto } from 'next/font/google'
import Link from "next/link"
// const font1=localFont({
//   src:"../../fonts/font1.woff2"
// })
export default function Hero(){
    return(
        <div className={`bg-[#00264c] xl:px-20 md:px-12 px-6 tracking-tighter md:pb-6
           Roboto`}>
            {/* <Navbar/> */}
         <div className="flex max-md:flex-col items-center">
            <div className="flex-col ">
              <span className='text-white xl:text-[60px] lg:text-5xl md:text-4xl sm:text-3xl text-3xl font-semibold mr-7 xl:leading-17 mt-8 text-center'>Tired of waiting for booking appointments for a doctor</span>
              <p className='opacity-65  md:mt-8 mt-4 text-lg text-white'>No more waiting, book the doctor first, then visit and save time</p>
              <div className='flex sm:gap-14 gap-8 md:mt-8 mt-4 text-center font-medium text-[15px]'>
                <Link href="#hospitalSearch" className='text-black bg-white rounded-lg py-1.5 px-3 text-center whitespace-nowrap font-semibold md:text-lg text-md cursor-pointer'>Book an appointment</Link>
                <Link href="/login"><div className='bg-[#0066cc] rounded-lg py-1.5 px-3 text-center h-fit text-white'>Login/Signup</div></Link>
              </div>
            </div>
            <Image src={phones} alt="" width={577*1.5} height={433*1.5}/>
         </div>
        </div>
    )
}
