import {create} from 'zustand';

interface PaginationStore {
  page: number;
  itemsPerPage: number;
  setPage: (page: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
}

export const usePaginationStore = create<PaginationStore>((set) => ({
  page: 1,
  itemsPerPage: 5,
  setPage: (page: number) => set({ page }),
  setItemsPerPage: (itemsPerPage: number) => set({ itemsPerPage }),
}));
