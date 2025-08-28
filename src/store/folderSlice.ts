import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { initialState } from "@/data/folderData";
import FolderType from "@/types/folder";

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
