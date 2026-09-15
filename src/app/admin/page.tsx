import { redirect } from "next/navigation";
import { ADMIN_RSVP_PATH } from "@/lib/admin/constants";

export default function AdminIndexPage() {
  redirect(ADMIN_RSVP_PATH);
}
