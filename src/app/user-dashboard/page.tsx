"use client";

import { LogOut } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import userIcon from "../../../public/user-icon-default.jpg";
type User = {
  name: string;
  phone_number: string;
  gmail: string;
  gender: string;
};

type Appointment = {
  id: number;
  doctor_id: number;
  appointment_date: string;
  appointment_time: string;
  hospital: string;
  logo: string;
  doctor: doctor ;
  doctorPhoto: string;
  specialty: string;
  qualification: string;
};
type doctor = {
  id: number;
  name: string;
  specialist: string;
  qualification: string;
  experience: string;
  education:string;
  image: string | StaticImageData;
};

export default function UserDashboardPage() {
  const [activeTab, setActiveTab] = useState<"present" | "past">("present");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [pastAppointments, setPastAppointments] = useState<Appointment[]>([]);
  const [presentAppointments, setPresentAppointments] = useState<Appointment[]>(
    [],
  );
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);
  const [cancelLoading, setCancelLoading] = useState<number | null>(null);
  // const [presentDoctorDetails, setPresentDoctorDetails] = useState<Doctor[]>(
  //   [],
  // );
  const [error, setError] = useState("");
  const route = useRouter();
  const fetchPresentAppointments = async () => {
    try {
      const res = await fetch("/api/user/presentAppointments", {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setPresentAppointments(data.presentAppointments);
        // setPresentDoctorDetails(data.doctor);
        console.log(data.doctor);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (res.ok) {
        // window.location.href = "/";
        route.push("/");
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };
  const fetchUserProfile = async () => {
    try {
      const response = await fetch("/api/user/user-profile", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      if (response.status === 403) {
        alert("Unauthorized Access");
        // router.push("/unauthorized");
      }
      if (response.ok) {
        setUser(data.user);
        // console.log("User Profile:", data.user);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Profile Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchPastAppointments = async () => {
    try {
      const response = await fetch("/api/user/pastAppointment", {
        credentials: "include",
      });
      const data = await response.json();
      console.log(data.pastAppointments);
      console.log("Is Array:", Array.isArray(data));
      if (response.ok) {
        if (response.ok) {
          setPastAppointments(data.pastAppointments);
        }
      }
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    }
  };
  useEffect(() => {
    fetchPastAppointments();
    fetchPresentAppointments();
    fetchUserProfile();
  }, []);
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        {/* <h1>Loading</h1> */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="mx-auto mt-20 max-w-md rounded-lg border border-red-200 bg-red-50 p-6 text-center">
        <h2 className="text-lg font-semibold text-red-600">Error</h2>
        <p className="mt-2 text-gray-600">{error}</p>
      </div>
    );
  }
  const handleDelete = async (appointment_id: number) => {
    try {
      setDeleteLoading(appointment_id);
      const res = await fetch("/api/user/deleteAppointment", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointment_id,
        }),
      });
      console.log(appointment_id);
      const data = await res.json();
      if (res.ok) {
        // await fetchPastAppointments();
        setPastAppointments((prev) =>
          prev.filter((item) => item.id !== appointment_id),
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDeleteLoading(null);
    }
  };
  const handleCancelAppointment = async (appointment_id: number) => {
    try {
      setCancelLoading(appointment_id);
      const res = await fetch("/api/user/cancelAppointment", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointment_id: appointment_id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        await fetchPastAppointments();
        setPresentAppointments((prev) =>
          prev.filter((item) => item.id !== appointment_id),
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCancelLoading(null);
    }
  };
  return (
    <main className="min-h-screen px-3 py-6 sm:px-4 sm:py-8 md:px-10">
      <section className="mx-auto max-w-[860px] rounded-[8px] p-3 sm:p-5 md:p-8">
        <div className="flex max-sm:flex-col items-center justify-between gap-3 overflow-x-auto rounded-xl bg-[#d8d8d8] px-4 py-3 sm:px-6">
          <div className="flex flex-row flex-nowrap items-center gap-4 md:gap-6">
            <div className="h-[96px] w-[96px] shrink-0 aspect-square overflow-hidden rounded-full shadow-xl sm:h-[110px] sm:w-[110px] md:h-[130px] md:w-[130px]">
              <Image
                src={userIcon}
                alt="Patient profile"
                width={150}
                height={150}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-2 text-[14px] leading-tight text-[#191919] sm:gap-3 sm:text-[17px] md:gap-4 md:text-[22px]">
              <p>
                <span className="font-semibold">Name:</span> {user?.name}
              </p>
              <p>
                <span className="font-semibold">Phone No:</span>{" "}
                {user?.phone_number}
              </p>
              <p>
                <span className="font-semibold">Gmail:</span> {user?.gmail}
              </p>
              <p className="flex flex-row items-center gap-x-6 md:gap-x-10 justify-between">
                <span>
                  <span className="font-semibold">Age:</span> 20
                </span>
                <span>
                  <span className="font-semibold">Gender:</span> {user?.gender}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 cursor-pointer rounded-md bg-red-600 px-3 py-1.25 text-white hover:bg-red-700">
                  <LogOut size={18} />
                  Logout
                </button>
              </p>
            </div>
          </div>
          <button className="h-7 w-12 shrink-0 rounded-sm bg-[#0f62c3] text-center text-[10px] font-semibold text-white">
            Edit
          </button>
        </div>

        <div className="mt-10 rounded-[8px] bg-[#f7f7f7] p-4 md:p-6">
          <div className="flex rounded-full bg-[#e6e6e6] p-1">
            <button
              onClick={() => setActiveTab("present")}
              className={`h-11 w-1/2 rounded-full px-2 text-[12px] font-semibold sm:text-[15px] md:text-[20px] ${
                activeTab === "present"
                  ? "bg-[#073766] text-white"
                  : "text-[#1b1b1b]"
              }`}>
              Present Appointment
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`h-11 w-1/2 rounded-full px-2 text-[12px] font-semibold sm:text-[15px] md:text-[20px] ${
                activeTab === "past"
                  ? "bg-[#073766] text-white"
                  : "text-[#1b1b1b]"
              }`}>
              Past Appointment
            </button>
          </div>

          {activeTab === "present" ? (
            <div className="mt-8 space-y-6">
              {presentAppointments.length === 0 ? (
                <div className="rounded-lg bg-gray-100 py-8 text-center text-gray-600">
                  No Appointments Found
                </div>
              ) : (
                <div className="mt-8 space-y-6">
                  {presentAppointments.map((appointment, index) => {
                    const doctor = appointment.doctor;
                    return (
                      <article
                        key={`${appointment.id}-${index}`}
                        className="rounded-[4px] bg-[#dfdfdf] pb-4 shadow-[0_1px_3px_rgba(0,0,0,0.2)]">
                        <div className="grid grid-cols-1 border-b border-[#cdcdcd] text-center text-[14px] font-semibold text-[#1d1d1d] sm:grid-cols-2 sm:text-[16px] md:text-[18px]">
                          <p className="border-r border-[#cdcdcd] py-2">
                            ID:
                            <span className="text-[#034b85]">
                              {appointment.id}
                            </span>
                          </p>
                          <p className="py-2">
                            ON:
                            <span className="font-normal">
                              {appointment.appointment_date}{" "}
                              <span className="font-semibold"> / </span>
                              {appointment.appointment_time}
                            </span>
                          </p>
                        </div>

                        <div className="px-4 pt-3">
                          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
                            <Image
                              src={appointment.logo}
                              alt="Hospital logo"
                              width={100}
                              height={32}
                              className="h-8 w-auto object-contain rounded-full"
                            />
                            <h3 className="px-2 text-center text-[18px] font-semibold leading-[1.1] text-[#111111] sm:text-[21px] md:text-[23px]">
                              {appointment.hospital}
                            </h3>
                            {/* <button className="h-8 rounded border border-[#8a8a8a] bg-white px-3 text-[14px] font-semibold text-[#0b2a4d] shadow">
                        Location <span aria-hidden="true">Pin</span>
                      </button> */}
                          </div>

                          <div className="mx-auto mt-3 flex max-w-[560px] flex-wrap items-start gap-3 rounded-[8px] border border-[#c8c8c8] bg-white p-3 shadow sm:flex-nowrap sm:items-center sm:gap-4">
                            <Image
                              src={doctor.image}
                              alt={doctor.name}
                              width={86}
                              height={86}
                              className="h-[70px] w-[70px] rounded-full object-cover sm:h-[86px] sm:w-[86px]"
                            />
                            <div className="text-[10px] text-[#222] sm:text-[11px]">
                              <p className="text-[14px] text-[#2c6fd1] font-medium sm:text-[16px]">
                                Dr.{doctor?.name}
                              </p>
                              <p className="font-semibold">
                                {doctor?.specialist} specialist
                              </p>
                              <p className="">
                                {doctor?.experience} years of experience
                              </p>
                              <p className="mt-2 font-semibold">
                                {doctor?.qualification}
                              </p>
                              <p className="font-medium">
                                Qualication: {doctor?.education}
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-8">
                            <button
                              onClick={() =>
                                handleCancelAppointment(appointment.id)
                              }
                              disabled={cancelLoading === appointment.id}
                              className="h-9 w-full rounded-md bg-[#ff1f1f] px-5 text-[13px] font-semibold text-white shadow sm:w-auto sm:px-6 sm:text-[14px]">
                              {cancelLoading === appointment.id
                                ? "Cancelling..."
                                : "Cancel Appointment"}
                            </button>
                            <button className="h-9 w-full rounded-md bg-[#0d65c8] px-7 text-[13px] font-semibold text-white shadow sm:w-auto sm:text-[14px]">
                              Reschedule
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="mt-8 space-y-6">
              {pastAppointments.length === 0 ? (
                <div className="rounded-lg bg-gray-100 py-8 text-center text-gray-600">
                  No Appointments Found
                </div>
              ) : (
               <div className="mt-8 space-y-6">
              {pastAppointments.map((appointment, index) => {
                const doctor = appointment.doctor;
                return (
                  <article
                    key={`${appointment.id}-past-${index}`}
                    className="rounded-[4px] bg-[#dfdfdf] pb-4 shadow-[0_1px_3px_rgba(0,0,0,0.2)]">
                    <div className="grid grid-cols-1 border-b border-[#cdcdcd] text-center text-[14px] font-semibold text-[#1d1d1d] sm:grid-cols-2 sm:text-[16px] md:text-[18px]">
                      <p className="border-r border-[#cdcdcd] py-2">
                        ID:
                        <span className="text-[#034b85]">{appointment.id}</span>
                      </p>
                      <p className="py-2">
                        ON:
                        <span className="font-normal">
                          {appointment.appointment_time}
                        </span>
                      </p>
                    </div>

                    <div className="px-4 pt-3">
                      <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-between max-sm:flex">
                        <Image
                          src={appointment.logo}
                          alt="Hospital logo"
                          width={100}
                          height={32}
                          className="h-8 w-auto object-contain rounded-full"
                        />
                        <h3 className="px-2 text-center text-[18px] font-semibold leading-[1.1] text-[#111111] sm:text-[21px] md:text-[23px]">
                          {appointment.hospital_id.name}
                        </h3>
                      </div>

                      <div className="mx-auto mt-3 flex max-w-[560px] flex-wrap items-start gap-3 rounded-[8px] border border-[#c8c8c8] bg-[#f6f6f6] p-3 shadow sm:flex-nowrap sm:items-center sm:gap-4">
                        <Image
                          src={doctor.image}
                          alt={doctor.name}
                          width={86}
                          height={86}
                          className="h-[70px] w-[70px] rounded-full object-cover sm:h-[86px] sm:w-[86px]"
                        />
                        <div className="text-[10px] text-[#222] sm:text-[11px]">
                          <p className="text-[14px] text-[#2c6fd1] sm:text-[16px]">
                            Dr.{doctor.name}
                          </p>
                          <p className="font-medium">
                            {doctor?.specialist} specialist
                          </p>
                          <p>{doctor.experience} years of experience</p>
                          <p className="mt-2 font-medium">
                            {doctor?.qualification}
                          </p>
                          <p className="font-medium">
                            Qualification: {doctor.education}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-8">
                        <button
                          onClick={() => handleDelete(appointment.id)}
                          disabled={deleteLoading === appointment.id}
                          className="h-9 w-full rounded-md bg-[#ff1f1f] cursor-pointer px-7 text-[13px] font-semibold text-white shadow sm:w-auto sm:text-[14px]">
                          {deleteLoading === appointment.id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                        <button className="h-9 w-full rounded-md bg-[#0d65c8] px-7 text-[13px] font-semibold text-white shadow sm:w-auto sm:text-[14px]">
                          Book Once Again
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
