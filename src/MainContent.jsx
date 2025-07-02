import { useRef, useEffect, useState } from "react";

const Event = function Event(props) {
  return (
    <li className={"event" + (props.slim ? " event_slim" : "")}>
      <button className="event__button">
        <span
          className={`event__icon event__icon_${props.icon}`}
          role="img"
          aria-label={props.iconLabel}
        ></span>
        <h4 className="event__title">{props.title}</h4>
        {props.subtitle && (
          <span className="event__subtitle">{props.subtitle}</span>
        )}
      </button>
    </li>
  );
};

const TABS = {
  all: {
    title: "Все",
    items: [
      {
        icon: "light2",
        iconLabel: "Освещение",
        title: "Xiaomi Yeelight LED Smart Bulb",
        subtitle: "Включено",
      },
      {
        icon: "light",
        iconLabel: "Освещение",
        title: "D-Link Omna 180 Cam",
        subtitle: "Включится в 17:00",
      },
      {
        icon: "temp",
        iconLabel: "Температура",
        title: "Elgato Eve Degree Connected",
        subtitle: "Выключено до 17:00",
      },
      {
        icon: "light",
        iconLabel: "Освещение",
        title: "LIFX Mini Day & Dusk A60 E27",
        subtitle: "Включится в 17:00",
      },
      {
        icon: "light2",
        iconLabel: "Освещение",
        title: "Xiaomi Mi Air Purifier 2S",
        subtitle: "Включено",
      },
      {
        icon: "light",
        iconLabel: "Освещение",
        title: "Philips Zhirui",
        subtitle: "Включено",
      },
      {
        icon: "light",
        iconLabel: "Освещение",
        title: "Philips Zhirui",
        subtitle: "Включено",
      },
      {
        icon: "light2",
        iconLabel: "Освещение",
        title: "Xiaomi Mi Air Purifier 2S",
        subtitle: "Включено",
      },
    ],
  },
  kitchen: {
    title: "Кухня",
    items: [
      {
        icon: "light2",
        iconLabel: "Освещение",
        title: "Xiaomi Yeelight LED Smart Bulb",
        subtitle: "Включено",
      },
      {
        icon: "temp",
        iconLabel: "Температура",
        title: "Elgato Eve Degree Connected",
        subtitle: "Выключено до 17:00",
      },
    ],
  },
  hall: {
    title: "Зал",
    items: [
      {
        icon: "light",
        iconLabel: "Освещение",
        title: "Philips Zhirui",
        subtitle: "Выключено",
      },
      {
        icon: "light2",
        iconLabel: "Освещение",
        title: "Xiaomi Mi Air Purifier 2S",
        subtitle: "Выключено",
      },
    ],
  },
  lights: {
    title: "Лампочки",
    items: [
      {
        icon: "light",
        iconLabel: "Освещение",
        title: "D-Link Omna 180 Cam",
        subtitle: "Включится в 17:00",
      },
      {
        icon: "light",
        iconLabel: "Освещение",
        title: "LIFX Mini Day & Dusk A60 E27",
        subtitle: "Включится в 17:00",
      },
      {
        icon: "light2",
        iconLabel: "Освещение",
        title: "Xiaomi Mi Air Purifier 2S",
        subtitle: "Включено",
      },
      {
        icon: "light",
        iconLabel: "Освещение",
        title: "Philips Zhirui",
        subtitle: "Включено",
      },
    ],
  },
  cameras: {
    title: "Камеры",
    items: [
      {
        icon: "light2",
        iconLabel: "Освещение",
        title: "Xiaomi Mi Air Purifier 2S",
        subtitle: "Включено",
      },
    ],
  },
};
const TABS_KEYS = Object.keys(TABS);
TABS.all.items = new Array(2 ** 6).fill(TABS.all.items).flat();

export function Main() {
  const ref = useRef();
  const [activeTab, setActiveTab] = useState("");
  const [hasRightScroll, setHasRightScroll] = useState(false);

  useEffect(() => {
    setActiveTab(new URLSearchParams(location.search).get("tab") || "cameras");
  }, []);

  const onSelectInput = (event) => {
    setActiveTab(event.target.value);
  };

  useEffect(() => {
    const scroller = ref.current?.querySelector(
      ".section__panel:not(.section__panel_hidden)"
    );
    if (scroller) {
      const newHasRightScroll = scroller.scrollWidth > scroller.clientWidth;
      if (newHasRightScroll !== hasRightScroll) {
        setHasRightScroll(newHasRightScroll);
      }
    }
  }, [activeTab]);

  const onArrowCLick = () => {
    const scroller = ref.current.querySelector(
      ".section__panel:not(.section__panel_hidden)"
    );
    if (scroller) {
      scroller.scrollTo({
        left: scroller.scrollLeft + 400,
        behavior: "smooth",
      });
    }
  };

  if (!activeTab) {
    return null;
  }
  return (
    <section>
      <div className="section__title">
        <h2 className="section__title-header">Избранные устройства</h2>

        <select
          className="section__select"
          defaultValue="all"
          onInput={onSelectInput}
        >
          {TABS_KEYS.map((key) => (
            <option key={key} value={key}>
              {TABS[key].title}
            </option>
          ))}
        </select>

        <ul role="tablist" className="section__tabs">
          {TABS_KEYS.map((key) => (
            <li
              key={key}
              role="tab"
              aria-selected={key === activeTab ? "true" : "false"}
              tabIndex={key === activeTab ? "0" : undefined}
              className={
                "section__tab" +
                (key === activeTab ? " section__tab_active" : "")
              }
              id={`tab_${key}`}
              aria-controls={`panel_${key}`}
              onClick={() => setActiveTab(key)}
            >
              {TABS[key].title}
            </li>
          ))}
        </ul>
      </div>

      <div className="section__panel-wrapper" ref={ref}>
        <div
          role="tabpanel"
          className={"section__panel"}
          id={`panel_${activeTab}`}
          aria-labelledby={`tab_${activeTab}`}
        >
          <ul className="section__panel-list">
            {TABS[activeTab].items.map((item, index) => (
              <Event key={index} {...item} />
            ))}
          </ul>
        </div>
        {hasRightScroll && (
          <div className="section__arrow" onClick={onArrowCLick}></div>
        )}
      </div>
    </section>
  );
}
