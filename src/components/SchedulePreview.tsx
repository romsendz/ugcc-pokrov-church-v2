import { Schedule } from "@lib/prisma/queries";
import { forwardRef } from "react";
import { getPeriod, getWeekDay } from "./lib/utils";
import Image from "next/image";
import { RadioTowerIcon, TvMinimalPlayIcon } from "lucide-react";
import { ROUTES } from "@lib/routes";

interface SchedulePreviewProps {
  schedule: Schedule[];
  className?: string;
  showQrCode?: boolean;
  showFooter?: boolean;
  blurPastDays?: boolean;
  showDayDate?: boolean;
}

const SchedulePreview = forwardRef<HTMLDivElement, SchedulePreviewProps>(
  ({ schedule, ...props }, ref) => {
    const period = getPeriod(
      schedule[0].date,
      schedule[schedule.length - 1].date,
    );
    return (
      <div
        ref={ref}
        className={props.className}
        style={{ fontFamily: "Palatino Linotype, sans-serif" }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {props.showQrCode && (
            <a
              href={ROUTES.schedule}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: "absolute",
                top: "-10px",
                right: "-15px",
                border: "2px solid black",
                borderRadius: "10px",
              }}
            >
              <Image
                style={{
                  padding: "2px",
                }}
                width={150}
                height={150}
                src="/img/ugcc_pokrov_schedule_qr.png"
                alt="schedule"
              />
            </a>
          )}

          <div>
            <h1 style={{ marginBottom: "0", textAlign: "center" }}>
              Розклад Богослужінь
            </h1>
            <p
              style={{
                margin: "5px auto 10px auto",
                width: "fit-content",
                fontSize: "larger",
              }}
            >
              <i>{period}</i>
            </p>
          </div>

          <div style={{ marginTop: "20px" }}>
            {schedule.map((day) => {
              const weekday = getWeekDay(day.date);
              return (
                <div
                  key={day.id}
                  style={{
                    marginTop: "8px",
                    opacity: props.blurPastDays && weekday.in_past ? 0.5 : 1,
                    position: "relative",
                  }}
                >
                  <h2
                    style={{
                      marginTop: "12px",
                      marginBottom: "8px",
                      textDecoration: "underline",
                      color: day.is_holiday ? "red" : "inherit",
                    }}
                  >
                    {weekday.name}
                    {!!day.subtitle && `. ${day.subtitle}`}
                  </h2>
                  {day.entries.map((entry) => (
                    <p
                      key={entry.id}
                      style={{
                        marginLeft: "10px",
                        marginTop: "8px",
                        marginBottom: "8px",
                        color: day.is_holiday ? "red" : "inherit",
                      }}
                    >
                      <strong
                        style={{ color: day.is_holiday ? "red" : "inherit" }}
                      >
                        {entry.start_time.toString()}
                      </strong>{" "}
                      - {entry.title}
                    </p>
                  ))}
                  {props.showDayDate && (
                    <span
                      style={{
                        fontSize: "14px",
                        fontStyle: "italic",
                        position: "absolute",
                        top: "0",
                        right: "0",
                      }}
                    >
                      {day.date.toLocaleDateString("uk-UA", {
                        day: "2-digit",
                        month: "long",
                      })}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <div>
            <div
              style={{
                margin: "30px auto 0 auto",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                fontSize: "small",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  fontWeight: "bold",
                }}
              >
                <RadioTowerIcon size={30} style={{ flexShrink: "0" }} />
                FM 97.7 — радіо-трансляція (щоденні Богослужіння)
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  fontWeight: "bold",
                }}
              >
                <TvMinimalPlayIcon size={30} style={{ flexShrink: "0" }} />
                Онлайн на сайті — відео-трансляція (недільні та святкові
                Богослужіння)
              </div>
            </div>
            {props.showFooter && (
              <>
                <p
                  style={{
                    textAlign: "center",
                    marginBottom: "0",
                    fontSize: "x-small",
                  }}
                >
                  Запрошуємо до співпраці та спільної молитви!
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                    fontSize: "x-small",
                  }}
                >
                  Парафія Покрови Пресвятої Богородиці УГКЦ м.Заліщики | Україна
                  <Image
                    src={"/img/flag_ukraine.png"}
                    style={{ borderRadius: "2px" }}
                    alt="flag-ukraine"
                    width={24}
                    height={15}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  },
);

SchedulePreview.displayName = "SchedulePreview";

export default SchedulePreview;
