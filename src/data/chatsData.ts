import { ChatItem } from "@/types/chat";

export const initialState: ChatItem[] = [
  {
    id: 1,
    name: "Ethan Smith",
    messages: [
      {
        message: "Paul - Come around...",
        sender: "Ethan Smith",
        time: new Date("2025-08-25T15:00:00.000Z"),
      },
      {
        message: "I found this amazing book",
        sender: "You",
        time: new Date("2022-11-01T15:01:00.000Z"),
      },
      {
        message: "Did you find out about the cup",
        sender: "Ethan Smith",
        time: new Date("2022-11-01T15:02:00.000Z"),
      },
      {
        message: "What do you think about this report",
        sender: "Ethan Smith",
        time: new Date("2022-11-01T15:03:00.000Z"),
      },
      {
        message: "Hello! Check out this post",
        sender: "You",
        time: new Date("2022-11-01T15:04:00.000Z"),
      },
      {
        message: "Sam Ottman - Come around",
        sender: "Ethan Smith",
        time: new Date("2022-11-01T15:05:00.000Z"),
      },
      {
        message: "Pedro Rivera (Tech support) - Hello!",
        sender: "Ethan Smith",
        time: new Date("2022-11-01T15:06:00.000Z"),
      },
      {
        message: "Paul - Come around...",
        sender: "Ethan Smith",
        time: new Date("2025-08-25T15:00:00.000Z"),
      },
      {
        message: "Paul - Come around...",
        sender: "Ethan Smith",
        time: new Date("2025-08-26T15:04:00.000Z"),
      },
      {
        message: "Paul - Come around...",
        sender: "Ethan Smith",
        time: new Date("2025-08-27T15:04:00.000Z"),
      },
      {
        message: "Paul - Come around...",
        sender: "Ethan Smith",
        time: new Date("2025-08-28T15:04:00.000Z"),
      },
      {
        message: "Paul - Come around...",
        sender: "Ethan Smith",
        time: new Date("2025-08-29T15:04:00.000Z"),
      },
      {
        message: "Paul - Come around...",
        sender: "Ethan Smith",
        time: new Date("2025-08-30T15:04:00.000Z"),
      },
      {
        message: "Paul - Come around...",
        sender: "Ethan Smith",
        time: new Date("2025-08-31T15:04:00.000Z"),
      },
    ],
    folder: "Favourites",
  },
  {
    id: 2,
    name: "Ava Williams",
    messages: [
      {
        message: "I found this amazing book...",
        sender: "Ava Williams",
        time: new Date("2022-11-01T15:07:00.000Z"),
      },
      {
        message: "Did you find out about the cup",
        sender: "Ava Williams",
        time: new Date("2022-11-01T15:08:00.000Z"),
      },
      {
        message: "What do you think about this report",
        sender: "Ava Williams",
        time: new Date("2022-11-01T15:09:00.000Z"),
      },
      {
        message: "Hello! Check out this post",
        sender: "You",
        time: new Date("2022-11-01T15:10:00.000Z"),
      },
      {
        message: "Sam Ottman - Come around",
        sender: "Ava Williams",
        time: new Date("2022-11-01T15:11:00.000Z"),
      },
      {
        message: "Pedro Rivera (Tech support) - Hello!",
        sender: "Ava Williams",
        time: new Date("2022-11-01T15:12:00.000Z"),
      },
    ],
    folder: "Favourites",
  },
  {
    id: 3,
    name: "Isabella Rais",
    messages: [
      {
        message: "Did you find out about the cup...",
        sender: "Isabella Rais",
        time: new Date("2022-11-01T15:13:00.000Z"),
      },
      {
        message: "hello! how are u?",
        sender: "Isabella Rais",
        time: new Date("2022-11-01T15:14:00.000Z"),
      },
    ],
  },
  {
    id: 4,
    name: "Lana Steiner",
    messages: [
      {
        message: "What do you think about this report?",
        sender: "You",
        time: new Date("2022-11-01T15:15:00.000Z"),
      },
      {
        message: "Hello! Check out this post...",
        sender: "Lana Steiner",
        time: new Date("2022-11-01T15:16:00.000Z"),
      },
    ],
  },
  {
    id: 5,
    name: "Laura Coppen",
    messages: [
      {
        message: "What do you think about this report?",
        sender: "Laura Coppen",
        time: new Date("2022-11-01T15:17:00.000Z"),
      },
      {
        message: "Hello! Check out this post...",
        sender: "Laura Coppen",
        time: new Date("2022-11-01T15:18:00.000Z"),
      },
    ],
  },
  {
    id: 6,
    name: "Oscar Roe",
    messages: [
      {
        message: "What do you think about this report?",
        sender: "Oscar Roe",
        time: new Date("2022-11-01T15:19:00.000Z"),
      },
      {
        message: "Hello! Check out this post...",
        sender: "Oscar Roe",
        time: new Date("2022-11-01T15:20:00.000Z"),
      },
    ],
  },
  {
    id: 7,
    name: "Support",
    messages: [
      {
        message: "What do you think about this report?",
        sender: "Support",
        time: new Date("2022-11-01T15:21:00.000Z"),
      },
      {
        message: "Hello! Check out this post...",
        sender: "Support",
        time: new Date("2022-11-01T15:22:00.000Z"),
      },
    ],
  },
  {
    id: 8,
    name: "Sam Ottman",
    messages: [
      {
        message: "What do you think about this report?",
        sender: "Sam Ottman",
        time: new Date("2022-11-01T15:23:00.000Z"),
      },
      {
        message: "Hello! Check out this post...",
        sender: "Sam Ottman",
        time: new Date("2022-11-01T15:24:00.000Z"),
      },
    ],
  },
  {
    id: 9,
    name: "Pedro Rivera (Tech support)",
    messages: [
      {
        message: "What do you think about this report?",
        sender: "Pedro Rivera (Tech support)",
        time: new Date("2022-11-01T15:25:00.000Z"),
      },
      {
        message: "Hello! Check out this post...",
        sender: "Pedro Rivera (Tech support)",
        time: new Date("2022-11-01T15:26:00.000Z"),
      },
    ],
  },
  {
    id: 10,
    name: "Isabella Rais",
    messages: [
      {
        message: "What do you think about this report?",
        sender: "Isabella Rais",
        time: new Date("2022-11-01T15:27:00.000Z"),
      },
      {
        message: "Hello! Check out this post...",
        sender: "Isabella Rais",
        time: new Date("2022-11-01T15:28:00.000Z"),
      },
    ],
  },
  {
    id: 11,
    name: "Lana Steiner",
    messages: [
      {
        message: "What do you think about this report?",
        sender: "Lana Steiner",
        time: new Date("2022-11-01T15:29:00.000Z"),
      },
      {
        message: "Hello! Check out this post...",
        sender: "Lana Steiner",
        time: new Date("2022-11-01T15:30:00.000Z"),
      },
    ],
  },
  {
    id: 12,
    name: "Laura Coppen",
    messages: [
      {
        message: "What do you think about this report?",
        sender: "Laura Coppen",
        time: new Date("2022-11-01T15:31:00.000Z"),
      },
      {
        message: "Hello! Check out this post...",
        sender: "Laura Coppen",
        time: new Date("2022-11-01T15:32:00.000Z"),
      },
    ],
  },
  {
    id: 13,
    name: "Oscar Roe",
    messages: [
      {
        message: "What do you think about this report?",
        sender: "Oscar Roe",
        time: new Date("2022-11-01T15:33:00.000Z"),
      },
      {
        message: "Hello! Check out this post...",
        sender: "Oscar Roe",
        time: new Date("2022-11-01T15:34:00.000Z"),
      },
    ],
  },
  {
    id: 14,
    name: "Support",
    messages: [
      {
        message: "What do you think about this report?",
        sender: "Support",
        time: new Date("2022-11-01T15:35:00.000Z"),
      },
      {
        message: "Hello! Check out this post...",
        sender: "Support",
        time: new Date("2022-11-01T15:36:00.000Z"),
      },
    ],
  },
];
