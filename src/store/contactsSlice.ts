import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContactItem } from "@/types/contact";

const initialState: ContactItem[] = [
  {
    id: 1,
    name: "Ethan Smith",
    number: "+32658029525",
    email: "ZGt6j@example.com",
  },
  {
    id: 2,
    name: "Ava Williams",
    number: "+32658029526",
    email: "ZGt6j@example.com",
  },
  {
    id: 3,
    name: "Isabella Rais",
    number: "+32658029527",
    email: "ZGt6j@example.com",
  },
  {
    id: 4,
    name: "Lana Steiner",
    number: "+32658029528",
    email: "ZGt6j@example.com",
  },
  {
    id: 5,
    name: "Laura Coppen",
    number: "+32658029529",
    email: "ZGt6j@example.com",
  },
  {
    id: 6,
    name: "Oscar Roe",
    number: "+32658029530",
    email: "ZGt6j@example.com",
  },
  {
    id: 7,
    name: "Support",
    number: "+32658029531",
    email: "ZGt6j@example.com",
    status: "We're here to help! Contact us for any assistance.",
  },
];

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact(state, action: PayloadAction<ContactItem>) {
      state.push(action.payload);
    },
  },
});

export const { addContact } = contactsSlice.actions;
export default contactsSlice.reducer;
