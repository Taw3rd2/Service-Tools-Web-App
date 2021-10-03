import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectIsEventLoaded,
  selectEventsList,
} from "../../../redux/events/event.selectors";
import {
  selectIsLabelsLoaded,
  selectLabelList,
} from "../../../redux/labels/label.selectors";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import { makeStyles } from "@material-ui/core/styles";

import "./calendarView.css";

const useStyles = makeStyles((theme) => ({
  main: {
    marginRight: theme.spacing(1),
  },
  root: {
    display: "flex",
    flexDirection: "row",
  },
  settingsButton: {
    color: "blue",
    backgroundColor: "white",
    borderRadius: "5px",
    marginTop: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5),
    paddingBottom: 0,
    paddingRight: 0,
    paddingLeft: 1.5,
    paddingTop: 2,
    cursor: "pointer",
    minWidth: 33,
    maxWidth: 33,
    "&:hover": {
      background: "#efefef",
    },
  },
  icon: {
    margin: 0,
    padding: 0,
  },
  text: {
    flexGrow: 5,
    //whiteSpace: "normal",
    wordWrap: "break-word",
    wordBreak: "break-word",
    textAlign: "center",
  },
  button: {
    textAlign: "center",
    color: "blue",
    backgroundColor: "white",
    marginTop: theme.spacing(0.5),
    minWidth: 33,
    maxWidth: 33,
    fontSize: "16px",
    "&:hover": {
      background: "#efefef",
    },
  },
}));

const CalendarView = ({
  isEventsLoaded,
  events,
  technician,
  technicians,
  isLabelsLoaded,
  labels,
  openDailyOptionsModal,
  openSelectedDispatchModal,
}) => {
  const classes = useStyles();

  const getFilteredEvents = () => {
    let filteredEvents = [];
    if (technician === "ALL") {
      filteredEvents = events.events;
    } else {
      filteredEvents = events.events.filter(function (e) {
        return e.techLead === technician;
      });
    }
    return filteredEvents;
  };

  const getFilteredLabels = () => {
    let filteredLabels = [];
    if (technician === "ALL") {
      filteredLabels = labels.labels;
    } else {
      filteredLabels = labels.labels.filter(function (l) {
        return l.tech === technician;
      });
    }
    return filteredLabels;
  };

  const eventColorSetter = (eventData) => {
    var newBackgroundColor = "#000873";

    technicians.technicians.map((tech) => {
      if (tech.name === eventData.techLead) {
        return (newBackgroundColor = tech.color);
      } else {
        return newBackgroundColor;
      }
    });

    eventData.backgroundColor = newBackgroundColor;
    eventData.borderColor = "black";
    return eventData;
  };

  const eventBorderColorSetter = (info) => {
    if (info.event.extendedProps.status === "active") {
      info.el.style.boxShadow = "inset 0 0 0 3px #30db30";
      info.el.style.cursor = "pointer";
    } else if (info.event.extendedProps.status === "scheduled") {
      info.el.style.boxShadow = "inset 0 0 0 3px blue";
      info.el.style.cursor = "pointer";
    } else if (info.event.extendedProps.status === "parts") {
      info.el.style.boxShadow = "inset 0 0 0 3px orange";
      info.el.style.cursor = "pointer";
    } else {
      info.el.style.boxShadow = "inset 0 0 0 1px black";
      info.el.style.cursor = "pointer";
    }
  };

  const customDateHeader = ({
    date,
    dayNumberText,
    dow,
    isDisabled,
    isFuture,
    isOther,
    isPast,
    isToday,
    view,
  }) => {
    if (isLabelsLoaded) {
      let cityLabels = [];
      let dayLabels = getFilteredLabels();

      dayLabels.forEach((label) => {
        if (label.labelDate.getTime() === date.getTime()) {
          cityLabels.push(label.locationName.toString());
        }
      });
      return (
        <div className={classes.root}>
          <button
            className={classes.settingsButton}
            onClick={() => openDailyOptionsModal(date)}
          >
            <SettingsOutlinedIcon className={classes.icon} />
          </button>

          <Typography className={classes.text} variant="body1" gutterBottom>
            {cityLabels.join(" ")}
          </Typography>

          <Button
            variant="outlined"
            color="primary"
            size="small"
            className={classes.button}
          >
            <strong>{dayNumberText}</strong>
          </Button>
        </div>
      );
    } else {
      return (
        <div className={classes.root}>
          <button className={classes.settingsButton}></button>
          <Typography className={classes.text} variant="body1"></Typography>
          <button className={classes.button}>{dayNumberText}</button>
        </div>
      );
    }
  };

  const selectEvent = (clickInfo) => {
    openSelectedDispatchModal(clickInfo.event);
  };

  return (
    <div className={classes.main}>
      {isEventsLoaded && isLabelsLoaded && (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          events={[...getFilteredEvents()]}
          eventDisplay="block"
          eventDataTransform={eventColorSetter}
          displayEventTime={false}
          dayCellContent={customDateHeader}
          eventClick={selectEvent}
          eventDidMount={eventBorderColorSetter}
          height={980}
        />
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isEventsLoaded: selectIsEventLoaded,
  events: selectEventsList,
  isLabelsLoaded: selectIsLabelsLoaded,
  labels: selectLabelList,
});

export default connect(mapStateToProps)(CalendarView);
