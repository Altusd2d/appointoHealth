"use client";
import Spinner from "@/components/ui/Spinner";
import  {  useState ,useEffect} from "react";


type Doctor = {
  description: string;
  id: string;
  name: string;
  specialist: string;
  education: string;
  experience: string;
  image: string;
  hospital_id: string;
  availability: Availability;
};


type Availability = {
  Monday: number[];
  Tuesday: number[];
  Wednesday: number[];
  Thursday: number[];
  Friday: number[];
  Saturday: number[];
  Sunday: number[];
};


function Doctors() {




const [availability, setAvailability] = useState({
  Sunday: Array(48).fill(0),
  Monday: Array(48).fill(0),
  Tuesday: Array(48).fill(0),
  Wednesday: Array(48).fill(0),
  Thursday: Array(48).fill(0),
  Friday: Array(48).fill(0),
  Saturday: Array(48).fill(0),
});

const defaultAvailability = {
  Sunday: Array(48).fill(0),
  Monday: Array(48).fill(0),
  Tuesday: Array(48).fill(0),
  Wednesday: Array(48).fill(0),
  Thursday: Array(48).fill(0),
  Friday: Array(48).fill(0),
  Saturday: Array(48).fill(0),
};

const openDoctor = (doctor: Doctor) => {
  setSelectedDoctor(doctor);

  try {
    const doctorAvailability =
      typeof doctor.availability === "string"
        ? JSON.parse(doctor.availability)
        : doctor.availability;

    setAvailability(
      doctorAvailability || defaultAvailability
    );
  } catch (err) {
    console.log(err);
    setAvailability(defaultAvailability);
  }

  setSelectedDay("Sunday");
  setSelectedPeriod("AM");
};

const [selectedPeriod, setSelectedPeriod] =
  useState<"AM" | "PM">("AM");


const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
const [doctors, setDoctors] = useState<Doctor[]>([]);
const [loadingDoctors, setLoadingDoctors] = useState(false);

const [selectedDay, setSelectedDay] = useState("Sunday");
const [updateslots,setupdateslots]=useState<boolean>(false)

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];


const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? "00" : "30";

  const period = hour < 12 ? "AM" : "PM";
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${minute} ${period}`;
});


const fetchDoctors = async () => {

  try {
    console.log("entered")
    setLoadingDoctors(true);

    const res = await fetch(
      "/api/hospital/getDoctors",
      {
        method: "GET",
      }
    );

    const data = await res.json();
    console.log(data)

    if (!res.ok) {
      console.log(data.message);
     
      return;
    }

    setDoctors(data.message);
    console.log(data.message)
  } catch (error) {
    console.log(error);
  } finally {
    
    setLoadingDoctors(false);
  }
};






useEffect(() => {
  fetchDoctors();
}, []);



    if(loadingDoctors){
      return(<Spinner />)
    }
    



if (selectedDoctor) {
  const currentDaySlots =
    availability[selectedDay as keyof typeof availability];

  const displaySlots = Array.from({ length: 24 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? "00" : "30";

    return `${hour % 12 || 12}:${minute}`;
  });

  const toggleSlot = (slotIndex: number) => {
    const actualIndex =
      selectedPeriod === "AM"
        ? slotIndex
        : slotIndex + 24;

    setAvailability((prev) => ({
      ...prev,
      [selectedDay]:
        prev[selectedDay as keyof typeof prev].map(
          (value, index) =>
            index === actualIndex
              ? value === 1
                ? 0
                : 1
              : value
        ),
    }));
  };

  const saveAvailability = async () => {
    setupdateslots(true)
    try {
      const payload = {
        doctorId: selectedDoctor.id,
        availability,
      };

      console.log(payload);

      const res = await fetch(
        "/api/hospital/ControlSlots",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
  doctorId: payload.doctorId,
  availability:payload.availability,
})
        }
      );

      const data = await res.json();

      console.log(data);
      setupdateslots(false)
      alert(data.message);
    } catch (error) {
        setupdateslots(false)
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 p-6">
      <div className="relative mx-auto max-w-7xl rounded-3xl bg-white p-10">

        {/* Close */}
        <button
          onClick={() => setSelectedDoctor(null)}
          className="absolute right-6 top-6 rounded-full bg-slate-100 px-4 py-2 hover:bg-slate-200"
        >
          ✕
        </button>

        {/* Doctor Info */}
        <div className="flex flex-col items-center gap-12 md:flex-row">

          <img
            src={selectedDoctor.image}
            alt={selectedDoctor.name}
            className="h-64 w-64 rounded-full object-cover shadow-xl"
          />

          <div>
            <h1 className="mb-3 text-5xl font-medium text-blue-600">
              {selectedDoctor.name}
            </h1>

            <p className="mb-2 text-2xl text-slate-900">
              {selectedDoctor.specialist}
            </p>

            <p className="mb-4 text-xl text-slate-500">
              {selectedDoctor.experience} Years Experience
            </p>

            <p className="text-lg leading-relaxed text-slate-700">
              {selectedDoctor.description}
            </p>
          </div>

        </div>

        {/* Days */}
        <div className="mt-16 flex justify-center">
          <div className="flex flex-wrap overflow-hidden rounded-xl border border-slate-400">

            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-6 py-3 font-medium transition ${
                  selectedDay === day
                    ? "bg-indigo-700 text-white"
                    : "bg-white hover:bg-slate-100"
                }`}
              >
                {day}
              </button>
            ))}

          </div>
        </div>

        {/* AM PM */}
        <div className="mt-8 flex justify-center">
          <div className="flex overflow-hidden rounded-lg">

            {["AM", "PM"].map((period) => (
              <button
                key={period}
                onClick={() =>
                  setSelectedPeriod(period as "AM" | "PM")
                }
                className={`border border-indigo-700 px-6 py-2 font-medium ${
                  selectedPeriod === period
                    ? "bg-indigo-700 text-white"
                    : "bg-white text-indigo-700"
                }`}
              >
                {period}
              </button>
            ))}

          </div>
        </div>

        {/* Slots */}
        <div className="mx-auto mt-12 max-w-6xl">

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">

            {displaySlots.map((slot, index) => {

              const actualIndex =
                selectedPeriod === "AM"
                  ? index
                  : index + 24;

              const isSelected =
                currentDaySlots[actualIndex] === 1;

              return (
                <button
                  key={actualIndex}
                  onClick={() => toggleSlot(index)}
                  className={`rounded-lg px-4 py-3 font-medium transition-all ${
                    isSelected
                      ? "bg-indigo-700 text-white"
                      : "border border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {slot} {selectedPeriod}
                </button>
              );
            })}

          </div>

        </div>

        {/* Summary */}
        <div className="mt-8 text-center text-slate-600">
          Selected Day:{" "}
          <span className="font-semibold">
            {selectedDay}
          </span>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex justify-center gap-4">

          <button
            onClick={() => setSelectedDoctor(null)}
            className="rounded-xl border border-slate-300 px-8 py-3"
          >
            Cancel
          </button>

          <button
            onClick={saveAvailability}
            className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
          >
             {updateslots?"Updating":"Save Availability"}
          </button>

        </div>

      </div>
    </div>
  );
}



if(doctors==undefined || doctors.length==0){
  return(
    <div>
      No doctors found..
    </div>
  )
}


  return (
    <article className="rounded-2xl bg-white p-6 shadow-sm">
     <div className="grid grid-cols-1 gap-8 md:grid-cols-3 xl:grid-cols-3">
  {doctors.map((doctor) => (
    <button
      key={doctor.id}
      onClick={() => openDoctor(doctor)}
      className="group relative h-[300px] overflow-hidden rounded-3xl text-left shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:cursor-pointer"
    >
      <img
        src={doctor.image}
        alt={doctor.name}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      <div className="absolute bottom-0 p-7 text-white">
        <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1 text-sm backdrop-blur-md">
          {doctor.specialist}
        </span>

        <h2 className="text-2xl font-bold">
          {doctor.name}
        </h2>

        <p className="mt-2 text-slate-200">
          {doctor.experience} Years Experience
        </p>
      </div>
    </button>
  ))}
</div>
    </article>
  )
}

export default Doctors
