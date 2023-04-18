import React, { useEffect, useRef, useState } from "react";
import { useGlobalStates } from "../../Context/GlobalContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "../../styles/reserva.css";
import "../../styles/calendarBooking.css";
import "../../index.css";

registerLocale("es", es);

const CalendarBooking = () => {
  const { providerValue } = useGlobalStates();
  const { endDate, setEndDate, startDate, setStartDate } = providerValue;
  const [monthsShown, setMonthsShown] = useState(2);

  const onChangeCalendar = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setMonthsShown(1);
      } else {
        setMonthsShown(2);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="calendario-booking">
      <DatePicker
        id="calendario-booking"
        calendarStartDay={0}
        onChange={onChangeCalendar}
        minDate={new Date()}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        monthsShown={monthsShown}
        fixedHeight
        dateFormat="dd/MM/yyyy"
        locale={es}
        inline
        /*excludeDates= "a la espera del formato del back"*/
        renderCustomHeader={({
          monthDate,
          customHeaderCount,
          decreaseMonth,
          increaseMonth,
        }) => (
          <div>
            {monthsShown === 2 ? (
              <>
                <button
                  aria-label="Previous Month"
                  className={
                    "react-datepicker__navigation react-datepicker__navigation--previous"
                  }
                  style={
                    customHeaderCount === 1 ? { visibility: "hidden" } : null
                  }
                  onClick={decreaseMonth}
                >
                  <span
                    className={
                      "react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
                    }
                  >
                    {"<"}
                  </span>
                </button>
                <span className="react-datepicker__current-month">
                  {monthDate
                    .toLocaleString("es-es", { month: "long" })
                    .replace(/^\w/, (c) => c.toUpperCase())}
                </span>
                <button
                  aria-label="Next Month"
                  className={
                    "react-datepicker__navigation react-datepicker__navigation--next"
                  }
                  style={
                    customHeaderCount === 0 ? { visibility: "hidden" } : null
                  }
                  onClick={increaseMonth}
                >
                  <span
                    className={
                      "react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
                    }
                  >
                    {">"}
                  </span>
                </button>
              </>
            ) : (
              <>
                <button
                  aria-label="Previous Month"
                  className={
                    "react-datepicker__navigation react-datepicker__navigation--previous"
                  }
                  style={
                    customHeaderCount === 1 ? { visibility: "hidden" } : null
                  }
                  onClick={decreaseMonth}
                >
                  <span
                    className={
                      "react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
                    }
                  >
                    {"<"}
                  </span>
                </button>
                <span className="react-datepicker__current-month">
                  {monthDate
                    .toLocaleString("es-es", { month: "long" })
                    .replace(/^\w/, (c) => c.toUpperCase())}
                </span>
                <button
                  aria-label="Next Month"
                  className={
                    "react-datepicker__navigation react-datepicker__navigation--next"
                  }
                  style={
                    customHeaderCount === 0 ? { visibility: "visible" } : null
                  }
                  onClick={increaseMonth}
                >
                  <span
                    className={
                      "react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
                    }
                  >
                    {">"}
                  </span>
                </button>
              </>
            )}
          </div>
        )}
      ></DatePicker>
    </div>
  );
};

export default CalendarBooking;
