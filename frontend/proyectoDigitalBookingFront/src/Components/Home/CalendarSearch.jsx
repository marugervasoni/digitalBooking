import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "../../styles/customInputCalendar.css";
import "../../index.css";
registerLocale("es", es);

const CalendarSearch = ({ startDate, endDate, setStartDate, setEndDate }) => {
  const [monthsShown, setMonthsShown] = useState(2);
  const [tempStartDate, setTempStartDate] = useState(null);
  const [tempEndDate, setTempEndDate] = useState(null);

  const calendarioRef = useRef(null);

  const handleApply = () => {
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
    calendarioRef.current.setOpen(false);
  };

  const onChangeCalendar = (dates) => {
    const [start, end] = dates;
    setTempStartDate(start);
    setTempEndDate(end);
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
    <div className="calendarSearch">
      <div className={`custom-input ${startDate && endDate ? "selected" : ""}`}>
        <img
          src={
            startDate && endDate
              ? "https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/calendar-select.png"
              : "https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/calendar.png"
          }
          alt="Calendario"
          onClick={() => calendarioRef.current.setOpen(true)}
        />
        <DatePicker
          placeholderText="Check in - Check out"
          id="calendarSearch"
          calendarStartDay={0}
          onChange={onChangeCalendar}
          minDate={new Date()}
          startDate={tempStartDate}
          endDate={tempEndDate}
          selectsRange
          monthsShown={monthsShown}
          shouldCloseOnSelect={false}
          fixedHeight
          dateFormat="dd/MM/yyyy"
          locale={es}
          form="buscador-form"
          ref={calendarioRef}
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
        >
          <button
            id="btnAplicarFecha"
            className="botonSecundarioCalendarApply"
            onClick={handleApply}
          >
            Aplicar
          </button>
        </DatePicker>
      </div>
    </div>
  );
};

export default CalendarSearch;
