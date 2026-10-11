import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getUserLicenses } from "@/lib/systems-service";
import ClientPortalClient from "./ClientPortalClient";

export const metadata: Metadata = {
  title: "Client Portal // Licensed Systems & Artifacts",
  description: "Enterprise client workspace for managing cryptographic software licenses, build hashes, and source code distributions.",
};

export default async function ClientPortalPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login?callbackUrl=/portal");
  }

  const licenses = await getUserLicenses(
    (session.user as any).id,
    session.user.email || undefined
  );

  return (
    <ClientPortalClient
      user={{
        id: (session.user as any).id,
        name: session.user.name,
        email: session.user.email,
        role: (session.user as any).role || "CLIENT",
        companyName: (session.user as any).companyName || "CYBER_ENTERPRISE_CORP",
      }}
      licenses={licenses}
    />
  );
}
