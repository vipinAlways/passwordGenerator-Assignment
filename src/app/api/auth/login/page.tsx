"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import React, { useCallback, useState } from "react";
import { login } from "../action/login";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { cryptoManager } from "@/lib/clientCrypto";

const page = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["check-user"],
    mutationFn: login,
    onSuccess: (data) => {
      router.push("/");
      setEmail("");
      setPassword("");
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
      cryptoManager.initializeKey(password, data.encryptionSalt);

      const key = cryptoManager.getKey();
      sessionStorage.setItem("vaultKey", key);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      mutate({ email, password });

      setEmail("");
      setPassword("");
    },
    [email, password]
  );
  return (
    <div className="h-full w-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white/20 backdrop-blur-xl border gap-4 border-white/30 shadow-lg flex min-h-96 justify-around flex-col py-8 px-10 rounded-2xl w-96 mt-20 hover:bg-white/30 hover:shadow-2xl transition-all duration-300"
      >
        <div className="w-full space-y-2">
          <h1 className="text-3xl font-semibold text-center w-full text-zinc-200">
            Welcome !!
          </h1>
          <p className="text-zinc-600 text-sm text-center">
            Generate and Remember your passwords
          </p>
        </div>
        <div className="flex flex-col gap-y-4 text-xl ">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="px-2 py-1 text-lg focus:outline-black border-zinc-400 rounded-md border"
            disabled={isPending}
          />
        </div>
        <div className="flex flex-col gap-y-4 text-xl ">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="px-2 py-1 text-lg focus:outline-black border-zinc-400 rounded-md border"
            required
            disabled={isPending}
          />
        </div>

        <button
          type="submit"
          className="bg-zinc-800 text-zinc-100 rounded-md text-xl p-2"
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Save"}
        </button>
        <hr className="h-1 w-full" />
        <h1 className="w-full text-center">Or</h1>

        <span className="w-full text-center">
          Don't have Account {""}{" "}
          <Link href={"/api/auth/signup"} className="text-sky-900 underline  ">
            Sign-up{" "}
          </Link>
        </span>
      </form>
    </div>
  );
};

export default page;
