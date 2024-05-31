// import { create } from 'zustand'



// export const useSearchStore = create<Us>((set) => ({
//     expanded: false,
//     toggle: () => set((state) => ({ expanded: !state.expanded })),
// }))

// export const useDocumentStore = create<DocumentStore>((set) => ({
//     documents: [],
//     addDocument: (files: File[]) =>
//         set((state) => ({
//             documents: [...state.documents, ...Array.from(files)],
//         })),
//     removeDocument: (document: File) =>
//         set((state) => ({
//             documents: state.documents.filter((file) => file !== document),
//         })),
//     clean: () => set(() => ({ documents: [] })),
// }))
