import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import FolderType from "@/types/folder";
import { initialState } from "@/data/folderData";

const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    addFolder: (state, action: PayloadAction<FolderType>) => {
      state.push(action.payload);
    },
  },
});

export const { addFolder } = folderSlice.actions;
export default folderSlice.reducer;
