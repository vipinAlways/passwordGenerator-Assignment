"use client";
import { useAuth } from "@/hooks/useGetuser";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getValutitems } from "./api/auth/action/getVaultitemdata";
import { cryptoManager } from "@/lib/clientCrypto";
import { toast } from "sonner";

const page = () => {
  const { authenticated, isLoading } = useAuth();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["user-vault"],
    queryFn: getValutitems,
  });

  useEffect(() => {
    if (!isLoading && !authenticated) {
      router.push("/api/auth/login");
    }
  }, [authenticated, isLoading, router]);

  const decryptedItems =
    data?.map((item) => {
      if (!cryptoManager.isInitialized()) {
        toast.error("Encryption key not initialized — please log in again.");
        return;
      }
      const decrypted = cryptoManager.decryptItem(item.encryptedData, item.iv);
      return {
        _id: item._id,
        ...decrypted,
        createdAt: item.createdAt,
      };
    }) || [];

  const filteredItems = decryptedItems.filter((item) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    if (item)
      return (
        item.title.toLowerCase().includes(query) ||
        item.username.toLowerCase().includes(query) ||
        item.url?.toLowerCase().includes(query)
      );
  });

  // const handleDelete = async (id: string) => {
  //   if (!confirm("Delete this password?")) return;
  //   // await deleteVaultItem(id);
  // };

  if (isLoading) {
    return <div>Loading your vault...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search passwords..."
        className="w-full border rounded-lg px-4 py-2"
      />

      {/* Items */}
      <div className="space-y-3">
        {filteredItems.map((item, i) => (
          <div key={i} className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg">{item?.title}</h3>
            <p className="text-sm text-gray-600">{item?.username}</p>
            <p className="text-sm text-gray-500">••••••••</p>
            {item?.url && (
              <a
                href={item.url}
                className="text-sm text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.url}
              </a>
            )}
            {item?.notes && (
              <p className="text-sm text-gray-500 mt-2">{item?.notes}</p>
            )}

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => navigator.clipboard.writeText(item?.password!)}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
              >
                Copy Password
              </button>
              {/* <button
                onClick={() => handleDelete(item._id)}
                disabled={isDeleting}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 disabled:opacity-50"
              >
                Delete
              </button> */}
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            {searchQuery ? "No results found" : "No passwords saved yet"}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
