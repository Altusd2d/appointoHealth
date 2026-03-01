import twentyfour from "../../../public/coreServices/24_by_7.jpg"
import boxicon from "../../../public/coreServices/boxicons_hospital.svg"
import doctor from "../../../public/coreServices/fontisto_doctor.png"
import lets from "../../../public/coreServices/lets-icons_order.png"
import Image from "next/image"
export default function CoreService(){
    return(
        <div className="flex gap-8 xl:px-20 md:px-12 px-6">
            <Image src={twentyfour} alt="" width={4000*0.17} height={4000*0.17}/>
            <div className="grid grid-cols-2 gap-y-12 gap-x-9">
               {
                coredata.map((items,ind)=>{
                    return(
                        <div className="flex gap-3 items-center" key={ind}>
                          <Image src={items.image} alt="" width={120*0.8} height={120*0.8}/>
                          <div className="flex flex-col gap-3">
                              <span>{items.title}</span>
                              <span>{items.title}</span>
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
]