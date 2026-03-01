import phones from '../../../public/hero/webpages_in_phone-removebg-preview.png'
import Image from 'next/image'
export default function Hero(){
    return(
        <div className="bg-[#00264c] xl:px-20 md:px-12 px-6 tracking-tighter">
         <div className="flex">
            <div className="flex-col ">
              <p className='text-white text-5xl font-medium mr-7 leading-14 mt-8'>Tired of waiting for booking appointments for a doctor</p>
              <p className='opacity-65 mt-7 text-lg text-white'>No more waiting, book the doctor first, then visit and save time</p>
              <div className='flex gap-14 mt-7 text-center font-medium text-[15px]'>
                <div className='text-black bg-white rounded-lg py-1.5 px-3'>Book an appointment</div>
                <div className='bg-[#0066cc] rounded-lg py-1.5 px-3'>Login/Signup</div>
              </div>
            </div>
            <Image src={phones} alt="" width={577*1.3} height={433*1.3}/>
         </div>
        </div>
    )
}