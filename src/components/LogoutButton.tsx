"use client";
import { logout } from "@/app/api/auth/action/logout";
import { useMutation } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      router.push("/login"); // redirect after logout
    },
  });

  return (
    <button
      onClick={() => mutate()}
      disabled={isPending}
      className="p-1 px-2  bg-red-600 text-white rounded"
    >
      {isPending ? "Logging out..." : "Logout"}
    </button>
  );
}
