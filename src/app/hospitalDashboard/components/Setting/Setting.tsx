"use client";
import  {  useState } from "react";


type SettingProps = {
  mail: string;
  id:string
};

function Setting({ mail,id }: SettingProps) {
    console.log("mail,id",mail,id)


      const [hos, sethos] = useState<string>("");
      const [email, setemail] = useState<string>("");
      const [num, setnum] = useState<string>("");
      const [img1, setimg1] = useState<string>("");
      const [loc, setloc] = useState<string>("");
      const [load, setload] = useState<boolean>(false);
      
    
      const sendDataToAdmin=async(hos:string,email:string,num:string,loc:string)=>{
        try {
            setload(true)
        const res = await fetch(
          "/api/hospital/changeData",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id:id,
              name: hos,
              email:mail,
              phone: num,
              location: loc,
            }),
          }
        );
    
        const data = await res.json();
    
        if (!res.ok) {
            setload(false)
          alert(data.message);
          return;
        }
        setload(false)
        alert(data.message);
      } catch (err) {
        setload(false)
        console.log(err);
        alert("Failed to send request");
      }
    
      }




  return (
    <article className="rounded-2xl bg-white p-5 shadow-sm md:p-6">
      <h2 className="text-2xl font-semibold">Settings</h2>
      <p className="mt-1 text-slate-600">
        Manage hospital profile and dashboard preferences.
      </p>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 p-4">
          <h3 className="text-lg font-semibold">Hospital Profile</h3>
          <div className="mt-4 space-y-3">
            <div>
              <label className="text-sm text-slate-600">Hospital Name</label>
              <input
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                value={hos}
                onChange={(e) => sethos(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-slate-600">Contact Email</label>
              <input
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-slate-600">Contact Number</label>
              <input
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                value={num}
                onChange={(e) => setnum(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          {/* <h3 className="text-lg font-semibold">Preferences</h3> */}
          <div className="mt-4 space-y-3 text-sm">
            <div>
              <label
                htmlFor="hospital-image-1"
                className="text-sm text-slate-600">
                Image 1
              </label>
              <input
                id="hospital-image-1"
                type="file"
                accept="image/*"
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-sky-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-sky-700 hover:file:bg-sky-100"
              />
            </div>
            <div>
              <label
                htmlFor="hospital-image-2"
                className="text-sm text-slate-600">
                Image 2
              </label>
              <input
                id="hospital-image-2"
                type="file"
                accept="image/*"
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-sky-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-sky-700 hover:file:bg-sky-100"
              />
            </div>
            <div>
              <label
                htmlFor="hospital-location"
                className="text-sm text-slate-600">
                Location
              </label>
              <input
                id="hospital-location"
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                value={loc}
                onChange={(e) => setloc(e.target.value)}
              />
            </div>
            
          </div>
          <button
            type="button"
            className="mt-5 rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
            onClick={()=>{sendDataToAdmin(hos,email,num,loc)}}
            >
             {load?"Sending..":"send data to admin"}
          </button>
        </div>
      </div>
    </article>
  )
}

export default Setting
