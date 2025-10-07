// import { cryptoManager } from "@/lib/clientCrypto";

// interface VaultItemData {
//   title: string;
//   username: string;
//   password: string;
//   url?: string;
//   notes?: string;
// }

// export function useVaultService() {
//   // tRPC Mutations

//   const createVaultItem = async (data: VaultItemData) => {
//     // 1. Encrypt on client side
    

//     // 2. Call tRPC mutation
//     return await createMutation.mutateAsync({
//       encryptedData,
//       iv,
//     });
//   };

//   /**
//    * UPDATE - Encrypt and update
//    */
//   const updateVaultItem = async (id: string, data: VaultItemData) => {
//     const { encryptedData, iv } = cryptoManager.encryptItem(data);

//     return await updateMutation.mutateAsync({
//       id,
//       encryptedData,
//       iv,
//     });
//   };

//   /**
//    * DELETE
//    */
//   const deleteVaultItem = async (id: string) => {
//     return await deleteMutation.mutateAsync({ id });
//   };

//   return {
//     createVaultItem,
//     updateVaultItem,
//     deleteVaultItem,
//     isCreating: createMutation.isLoading,
//     isUpdating: updateMutation.isLoading,
//     isDeleting: deleteMutation.isLoading,
//   };
// }
