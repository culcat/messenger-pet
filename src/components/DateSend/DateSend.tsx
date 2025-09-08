import Paragraph from "antd/es/typography/Paragraph";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isToday from "dayjs/plugin/isToday";
import localizedFormat from "dayjs/plugin/localizedFormat";
import weekday from "dayjs/plugin/weekday";


dayjs.extend(weekday);
dayjs.extend(localizedFormat);
dayjs.extend(isToday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

interface dateProps {
  dateSend: Date;
}

export const DateSend = ({ dateSend }: dateProps) => {
  const sendDate = dayjs(dateSend);
  const today = dayjs();

  if (sendDate.isToday()) {
    const time = sendDate.format("HH:mm");
    return <Paragraph>Today at {time}</Paragraph>;
  } else if (sendDate.isSameOrAfter(today.subtract(7, "day"))) {
    const dayName = sendDate.format("dddd");
    const time = sendDate.format("hh:mm A");
    return (
      <Paragraph>
        at {dayName} at {time}
      </Paragraph>
    );
  } else {
    const date = sendDate.format("DD.MM.YYYY");
    const time = sendDate.format("hh:mm A");
    return (
      <Paragraph>
        at {date} at {time}
      </Paragraph>
    );
  }}
