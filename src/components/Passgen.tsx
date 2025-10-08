"use client";
import { PostPasswords } from "@/app/api/auth/action/postVaultItems";
import { cryptoManager } from "@/lib/clientCrypto";
import { useMutation } from "@tanstack/react-query";
import React, { useCallback, useState } from "react";
import { toast } from "sonner";
import { Url } from "url";

interface formdataProps {
  username: string;
  password: string;
  url?: string;
  note?: string;
}

const Passgen = () => {
  const [formData, setFormData] = useState<formdataProps>({
    username: "",
    password: "",

    note: "",
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ["postpassword"],
    mutationFn: PostPasswords,
    onSuccess: () => {},
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!cryptoManager.isInitialized()) {
        toast.error("Encryption key not initialized — please log in again.");
        return;
      }

      const { encryptedData, iv } = cryptoManager.encryptItem(formData);

      console.log(encryptedData, iv);

      mutate({ encryptedData, iv });
    },
    [formData]
  );
  return (
    <div>
      <form action="" onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="font-semibold">
            User Name
          </label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, username: e.target.value }))
            }
            className="border-2 focus:outline-green-800 p-1 text-sm rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="font-semibold">
            Password
          </label>
          <input
            type="text"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            className="border-2 focus:outline-green-800 p-1 text-sm rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="url" className="font-semibold">
            URL
          </label>
          <input
            id="url"
            type="url"
            placeholder="https://example.com"
            value={formData.url || ""}
            onChange={(e) => {
              const value = e.target.value;
              setFormData((prev) => ({ ...prev, url: value }));
            }}
            onBlur={(e) => {
              if (e.target.value.trim()) {
                try {
                  new URL(e.target.value);
                } catch {
                  toast.error(
                    "Please enter a valid URL (e.g., https://example.com)"
                  );
                  setFormData((prev) => ({ ...prev, url: "" }));
                }
              }
            }}
            required
            pattern="https?://.+"
            className="border-2 focus:outline-green-800 p-1 text-sm rounded-md"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="font-semibold">
            Any Note
          </label>
          <textarea
            value={formData.note}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, note: e.target.value }))
            }
            className="border-2 h-40 focus:outline-green-800 p-1 text-sm rounded-md capitalize"
            spellCheck={true}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-950 text-zinc-200 text-lg rounded-lg p-1"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Passgen;
