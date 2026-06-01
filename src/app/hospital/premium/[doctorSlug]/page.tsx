import PremiumDoctorDetail from "@/components/hospitalPremium/premiumDoctorDetail";
import { getPremiumDoctorBySlug } from "@/components/hospitalPremium/premiumDoctorsData";
import { notFound } from "next/navigation";

type PremiumDoctorPageProps = {
  params: Promise<{
    doctorSlug: string;
  }>;
};

export default async function PremiumDoctorPage({
  params,
}: PremiumDoctorPageProps) {
  const { doctorSlug } = await params;
  const doctor = getPremiumDoctorBySlug(doctorSlug);

  if (!doctor) {
    notFound();
  }

  return <PremiumDoctorDetail doctor={doctor} />;
}
