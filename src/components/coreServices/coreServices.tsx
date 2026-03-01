import twentyfour from "../../../public/coreServices/24_by_7.jpg"
import boxicon from "../../../public/coreServices/boxicons_hospital.svg"
import doctor from "../../../public/coreServices/fontisto_doctor.png"
import plus from "../../../public/coreServices/Vector.png"
import search from "../../../public/coreServices/search.png"
import Image from "next/image"
export default function CoreService(){
    return(
        <div className="flex gap-8 xl:px-20 md:px-12 px-6">
            <Image src={twentyfour} alt="" width={4000*0.17} height={4000*0.17}/>
            <div className="grid grid-cols-2 gap-y- gap-x-12">
               {
                coredata.map((items,ind)=>{
                    return(
                        <div className="flex gap-3 items-center" key={ind}>
                          <Image src={items.image} alt="" width={120*0.8} height={120*0.8}/>
                          <div className="flex flex-col gap-3 tracking-tight">
                              <span className="text-[#7f7e7e] text-6xl font-semibold">{items.title}</span>
                              <span className="text-[#a0a0a0] text-lg">{items.des}</span>
                          </div>
                        </div>
                    )
                })
               }
            </div>
        </div>
    )
}
const coredata=[
    {
        id:1,
        image:plus,
        title:"24/7",
        des:"services"
    },
    {
        id:2,
        image:boxicon,
        title:"250+",
        des:"hospitals"
    },
    {
        id:1,
        image:boxicon,
        title:"24/7",
        des:"services"
    },
    {
        id:2,
        image:boxicon,
        title:"250+",
        des:"hospitals"
    },
    {
        id:1,
        image:search,
        title:"speaific",
        des:"search"
    },
    {
        id:2,
        image:doctor,
        title:"specialist",
        des:"doctors"
    },
]