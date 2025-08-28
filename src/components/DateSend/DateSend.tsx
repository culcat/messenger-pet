import Paragraph from "antd/es/typography/Paragraph";
import React from "react";

import { getWeekDay } from "@/utils/getWeekDay";

interface dateProps {
  dateSend: Date;
}

export const DateSend = (dateSend: dateProps) => {
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - dateSend.dateSend.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    const time = dateSend.dateSend.toLocaleTimeString();
    return <Paragraph>Today at {time}</Paragraph>;
  } else if (diffDays <= 7) {
    const dayName = getWeekDay(dateSend.dateSend);
    const time = dateSend.dateSend.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return (
      <Paragraph>
        at {dayName} at {time}
      </Paragraph>
    );
  } else {
    const date = dateSend.dateSend.toLocaleDateString();
    const time = dateSend.dateSend.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return (
      <Paragraph>
        at {date} at {time}
      </Paragraph>
    );
  }
};
