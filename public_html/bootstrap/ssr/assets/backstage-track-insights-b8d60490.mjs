var _a, _b;
import { jsx, jsxs } from "react/jsx-runtime";
import { al as getBootstrapData, m as message, g as createSvgIcon, aa as getInputFieldClassNames, az as useField, aA as Field, cq as useUserTimezone, c as useIsMobileMediaQuery, b1 as useSelectedLocale, cr as useDateFormatter, I as IconButton, K as KeyboardArrowRightIcon, u as useSettings, aw as DateFormatPresets, cs as shallowEqual, a3 as List, a4 as ListItem, T as Trans, j as useDialogContext, v as DialogFooter, B as Button, k as Dialog, n as DialogBody, a5 as Switch, J as apiClient, h as useTrans, S as SelectForwardRef, f as Item, y as opacityAnimation, _ as Tooltip, w as Skeleton, Y as Chip, ct as useListbox, cu as Listbox, cv as Popover, ae as ProgressCircle, t as KeyboardArrowDownIcon, cw as useListboxKeyboardNavigation, cp as createEventHandler, d as DialogTrigger, o as Form, ax as prettyBytes, P as ProgressBar, cx as useFileUploadStore, ab as MixedText, cy as ErrorIcon, b4 as WarningIcon, cz as CheckCircleIcon, x as CloseIcon, H as showHttpErrorToast, b6 as UploadInputType, b7 as Disk, G as toast, cA as validateUpload, cB as openUploadWindow, a0 as FormImageSelector, i as FormTextField, E as queryClient, V as onFormQueryError, af as useNavigate, ac as FileUploadProvider, bq as getTrackLink, aU as PageStatus, bP as useTrackPermissions, bo as getAlbumLink, l as DialogHeader, R as AddIcon, O as IllustratedMessage, Q as SvgImage, L as ConfirmationDialog, c7 as useAlbumPermissions, bX as usePrimaryArtistForCurrentUser, aT as ALBUM_MODEL, aR as AlbumImage, aL as TrackImage, bn as ArtistLinks, aj as LinkStyle, cC as ShareMediaButtons, q as TextField, bE as useAuth, cD as useIsDarkMode, a as DashboardLayout, c0 as PlayerNavbarLayout, c1 as SidedavFrontend, c2 as Sidenav, b as DashboardContent, aS as AlbumLink, Z as FormattedDate, cE as useDeleteAlbum, W as FormSwitch, ap as Tabs, aq as TabList, ar as Tab, as as TabPanels, at as TabPanel, bl as getArtistLink, cF as useArtistPermissions, bK as useThemeSelector, bS as lazyLoader, bC as PlayArrowFilledIcon, aN as SmallArtistImage, a_ as UserProfileLink, aM as TrackLink, aO as ArtistLink, z as StaticPageTitle } from "../server-entry.mjs";
import { useLocation, Navigate, Link, useSearchParams, useParams } from "react-router-dom";
import { K as KeyboardArrowLeftIcon, k as useIsTabletMediaQuery, A as Avatar, C as ChipList, n as generateWaveformData, G as GENRE_MODEL, a as FormattedDuration, j as useTrack, D as DragPreview, u as useSortable, i as useAlbum, o as useDroppable, f as useSortableTableData, T as Table, F as FormattedNumber, P as ProfileLinksForm, h as useArtist, t as themeValueToHex, U as UserAvatar } from "./theme-value-to-hex-ee0bd15b.mjs";
import { useFormContext, useController, useForm, useFieldArray } from "react-hook-form";
import { useQuery, keepPreviousData, useMutation } from "@tanstack/react-query";
import React, { useState, useMemo, useCallback, useRef, Fragment, memo, forwardRef, useImperativeHandle, useEffect, lazy, Suspense, cloneElement } from "react";
import clsx from "clsx";
import { m, AnimatePresence } from "framer-motion";
import { getLocalTimeZone, now, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, CalendarDate, toZoned, maxDate, minDate, isSameDay, toCalendarDate, isSameMonth, today, getMinimumDayInMonth, getMinimumMonthInYear, getDayOfWeek, isToday, getWeeksInMonth, parseAbsolute, parseAbsoluteToLocal, DateFormatter } from "@internationalized/date";
import { useObjectRef, mergeProps, useLayoutEffect } from "@react-aria/utils";
import { useControlledState } from "@react-stately/utils";
import { E as EditIcon } from "./Edit-f0b99a84.mjs";
import { FocusScope, createFocusManager, useFocusManager } from "@react-aria/focus";
import { NumberParser } from "@internationalized/number";
import memoize from "nano-memoize";
function startOfDay(date) {
  return date.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
}
function endOfDay(date) {
  return date.set({
    hour: 24 - 1,
    minute: 60 - 1,
    second: 60 - 1,
    millisecond: 1e3 - 1
  });
}
function getUserTimezone() {
  var _a2, _b2, _c;
  const defaultTimezone = (_a2 = getBootstrapData()) == null ? void 0 : _a2.settings.dates.default_timezone;
  const preferredTimezone = ((_c = (_b2 = getBootstrapData()) == null ? void 0 : _b2.user) == null ? void 0 : _c.timezone) || defaultTimezone || "auto";
  if (!preferredTimezone || preferredTimezone === "auto") {
    return getLocalTimeZone();
  }
  return preferredTimezone;
}
const Now = startOfDay(now(getUserTimezone()));
const locale = ((_b = (_a = getBootstrapData()) == null ? void 0 : _a.i18n) == null ? void 0 : _b.language) || "en";
const DateRangePresets = [
  {
    key: 0,
    label: message("Today"),
    getRangeValue: () => ({
      preset: 0,
      start: Now,
      end: endOfDay(Now)
    })
  },
  {
    key: 1,
    label: message("Yesterday"),
    getRangeValue: () => ({
      preset: 1,
      start: Now.subtract({ days: 1 }),
      end: endOfDay(Now).subtract({ days: 1 })
    })
  },
  {
    key: 2,
    label: message("This week"),
    getRangeValue: () => ({
      preset: 2,
      start: startOfWeek(Now, locale),
      end: endOfWeek(endOfDay(Now), locale)
    })
  },
  {
    key: 3,
    label: message("Last week"),
    getRangeValue: () => {
      const start = startOfWeek(Now, locale).subtract({ days: 7 });
      return {
        preset: 3,
        start,
        end: start.add({ days: 6 })
      };
    }
  },
  {
    key: 4,
    label: message("Last 7 days"),
    getRangeValue: () => ({
      preset: 4,
      start: Now.subtract({ days: 7 }),
      end: endOfDay(Now)
    })
  },
  {
    key: 6,
    label: message("Last 30 days"),
    getRangeValue: () => ({
      preset: 6,
      start: Now.subtract({ days: 30 }),
      end: endOfDay(Now)
    })
  },
  {
    key: 7,
    label: message("Last 3 months"),
    getRangeValue: () => ({
      preset: 7,
      start: Now.subtract({ months: 3 }),
      end: endOfDay(Now)
    })
  },
  {
    key: 8,
    label: message("Last 12 months"),
    getRangeValue: () => ({
      preset: 8,
      start: Now.subtract({ months: 12 }),
      end: endOfDay(Now)
    })
  },
  {
    key: 9,
    label: message("This month"),
    getRangeValue: () => ({
      preset: 9,
      start: startOfMonth(Now),
      end: endOfMonth(endOfDay(Now))
    })
  },
  {
    key: 10,
    label: message("This year"),
    getRangeValue: () => ({
      preset: 10,
      start: startOfYear(Now),
      end: endOfYear(endOfDay(Now))
    })
  },
  {
    key: 11,
    label: message("Last year"),
    getRangeValue: () => ({
      preset: 11,
      start: startOfYear(Now).subtract({ years: 1 }),
      end: endOfYear(endOfDay(Now)).subtract({ years: 1 })
    })
  }
];
const DateRangeIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M7 11h2v2H7v-2zm14-5v14c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2l.01-14c0-1.1.88-2 1.99-2h1V2h2v2h8V2h2v2h1c1.1 0 2 .9 2 2zM5 8h14V6H5v2zm14 12V10H5v10h14zm-4-7h2v-2h-2v2zm-4 0h2v-2h-2v2z" }),
  "DateRangeOutlined"
);
const Input = React.forwardRef(
  (props, ref) => {
    const {
      children,
      inputProps,
      wrapperProps,
      className,
      autoFocus,
      style,
      onClick
    } = props;
    return /* @__PURE__ */ jsx("div", { ...wrapperProps, onClick, children: /* @__PURE__ */ jsx(
      "div",
      {
        ...inputProps,
        role: "group",
        className: clsx(
          className,
          "flex items-center focus-within:ring focus-within:ring-primary/focus focus-within:border-primary/60"
        ),
        ref,
        style,
        children: /* @__PURE__ */ jsx(FocusScope, { autoFocus, children })
      }
    ) });
  }
);
const DatePickerField = React.forwardRef(
  ({ inputRef, wrapperProps, children, onBlur, ...other }, ref) => {
    const fieldClassNames = getInputFieldClassNames(other);
    const objRef = useObjectRef(ref);
    const { fieldProps, inputProps } = useField({
      ...other,
      focusRef: objRef,
      labelElementType: "span"
    });
    fieldClassNames.wrapper = clsx(fieldClassNames.wrapper, other.disabled && "pointer-events-none");
    return /* @__PURE__ */ jsx(
      Field,
      {
        wrapperProps: mergeProps(
          wrapperProps,
          {
            onBlur: (e) => {
              if (objRef.current && !objRef.current.contains(e.relatedTarget)) {
                onBlur == null ? void 0 : onBlur(e);
              }
            },
            onClick: () => {
              const focusManager = createFocusManager(objRef);
              focusManager == null ? void 0 : focusManager.focusFirst();
            }
          }
        ),
        fieldClassNames,
        ref: objRef,
        ...fieldProps,
        children: /* @__PURE__ */ jsx(
          Input,
          {
            inputProps,
            className: clsx(fieldClassNames.input, "gap-10"),
            ref: inputRef,
            children
          }
        )
      }
    );
  }
);
function getDefaultGranularity(date) {
  if (date instanceof CalendarDate) {
    return "day";
  }
  return "minute";
}
function dateIsInvalid(date, min, max) {
  return min != null && date.compare(min) < 0 || max != null && date.compare(max) > 0;
}
function useBaseDatePickerState(selectedDate, props) {
  const timezone = useUserTimezone();
  const [calendarIsOpen, setCalendarIsOpen] = useState(false);
  const closeDialogOnSelection = props.closeDialogOnSelection ?? true;
  const granularity = props.granularity || getDefaultGranularity(selectedDate);
  const min = props.min ? toZoned(props.min, timezone) : void 0;
  const max = props.max ? toZoned(props.max, timezone) : void 0;
  return {
    timezone,
    granularity,
    min,
    max,
    calendarIsOpen,
    setCalendarIsOpen,
    closeDialogOnSelection
  };
}
function useCurrentDateTime() {
  const timezone = useUserTimezone();
  return useMemo(() => {
    return now(timezone);
  }, [timezone]);
}
function useDateRangePickerState(props) {
  var _a2, _b2;
  const now2 = useCurrentDateTime();
  const [isPlaceholder, setIsPlaceholder] = useState({
    start: (!props.value || !props.value.start) && !((_a2 = props.defaultValue) == null ? void 0 : _a2.start),
    end: (!props.value || !props.value.end) && !((_b2 = props.defaultValue) == null ? void 0 : _b2.end)
  });
  const setStateValue = props.onChange;
  const [internalValue, setInternalValue] = useControlledState(
    props.value ? completeRange(props.value, now2) : void 0,
    !props.value ? completeRange(props.defaultValue, now2) : void 0,
    (value) => {
      setIsPlaceholder({ start: false, end: false });
      setStateValue == null ? void 0 : setStateValue(value);
    }
  );
  const {
    min,
    max,
    granularity,
    timezone,
    calendarIsOpen,
    setCalendarIsOpen,
    closeDialogOnSelection
  } = useBaseDatePickerState(internalValue.start, props);
  const clear = useCallback(() => {
    setIsPlaceholder({ start: true, end: true });
    setInternalValue(completeRange(null, now2));
    setStateValue == null ? void 0 : setStateValue(null);
    setCalendarIsOpen(false);
  }, [now2, setInternalValue, setStateValue, setCalendarIsOpen]);
  const [anchorDate, setAnchorDate] = useState(null);
  const [isHighlighting, setIsHighlighting] = useState(false);
  const [highlightedRange, setHighlightedRange] = useState(internalValue);
  const [calendarDates, setCalendarDates] = useState(() => {
    return rangeToCalendarDates(internalValue, max);
  });
  const constrainRange = useCallback(
    (range) => {
      let start = range.start;
      let end = range.end;
      if (min) {
        start = maxDate(start, min);
      }
      const startMax = max ? minDate(max, end) : end;
      start = minDate(start, startMax);
      const endMin = min ? maxDate(min, start) : start;
      end = maxDate(end, endMin);
      if (max) {
        end = minDate(end, max);
      }
      return { start: toZoned(start, timezone), end: toZoned(end, timezone) };
    },
    [min, max, timezone]
  );
  const setSelectedValue = useCallback(
    (newRange) => {
      const value = {
        ...constrainRange(newRange),
        preset: newRange.preset
      };
      setInternalValue(value);
      setHighlightedRange(value);
      setCalendarDates(rangeToCalendarDates(value, max));
      setIsPlaceholder({ start: false, end: false });
    },
    [setInternalValue, constrainRange, max]
  );
  const dayIsActive = useCallback(
    (day) => {
      return !isPlaceholder.start && isSameDay(day, highlightedRange.start) || !isPlaceholder.end && isSameDay(day, highlightedRange.end);
    },
    [highlightedRange, isPlaceholder]
  );
  const dayIsHighlighted = useCallback(
    (day) => {
      return (isHighlighting || !isPlaceholder.start && !isPlaceholder.end) && day.compare(highlightedRange.start) >= 0 && day.compare(highlightedRange.end) <= 0;
    },
    [highlightedRange, isPlaceholder, isHighlighting]
  );
  const dayIsRangeStart = useCallback(
    (day) => isSameDay(day, highlightedRange.start),
    [highlightedRange]
  );
  const dayIsRangeEnd = useCallback(
    (day) => isSameDay(day, highlightedRange.end),
    [highlightedRange]
  );
  const getCellProps = useCallback(
    (date, isSameMonth2) => {
      return {
        onPointerEnter: () => {
          if (isHighlighting && isSameMonth2) {
            setHighlightedRange(
              makeRange({ start: anchorDate, end: date, timezone })
            );
          }
        },
        onClick: () => {
          if (!isHighlighting) {
            setIsHighlighting(true);
            setAnchorDate(date);
            setHighlightedRange(makeRange({ start: date, end: date, timezone }));
          } else {
            const finalRange = makeRange({
              start: anchorDate,
              end: date,
              timezone
            });
            finalRange.start = startOfDay(finalRange.start);
            finalRange.end = endOfDay(finalRange.end);
            setIsHighlighting(false);
            setAnchorDate(null);
            setSelectedValue == null ? void 0 : setSelectedValue(finalRange);
            if (closeDialogOnSelection) {
              setCalendarIsOpen == null ? void 0 : setCalendarIsOpen(false);
            }
          }
        }
      };
    },
    [
      anchorDate,
      isHighlighting,
      setSelectedValue,
      setCalendarIsOpen,
      closeDialogOnSelection,
      timezone
    ]
  );
  return {
    selectedValue: internalValue,
    setSelectedValue,
    calendarIsOpen,
    setCalendarIsOpen,
    dayIsActive,
    dayIsHighlighted,
    dayIsRangeStart,
    dayIsRangeEnd,
    getCellProps,
    calendarDates,
    setIsPlaceholder,
    isPlaceholder,
    clear,
    setCalendarDates,
    min,
    max,
    granularity,
    timezone,
    closeDialogOnSelection
  };
}
function rangeToCalendarDates(range, max) {
  let start = toCalendarDate(startOfMonth(range.start));
  let end = toCalendarDate(endOfMonth(range.end));
  if (isSameMonth(start, end)) {
    end = endOfMonth(end.add({ months: 1 }));
  }
  if (max && end.compare(max) > 0) {
    end = start;
    start = startOfMonth(start.subtract({ months: 1 }));
  }
  return [start, end];
}
function makeRange(props) {
  const start = toZoned(props.start, props.timezone);
  const end = toZoned(props.end, props.timezone);
  if (start.compare(end) > 0) {
    return { start: end, end: start };
  }
  return { start, end };
}
function completeRange(range, now2) {
  if ((range == null ? void 0 : range.start) && (range == null ? void 0 : range.end)) {
    return range;
  } else if (!(range == null ? void 0 : range.start) && (range == null ? void 0 : range.end)) {
    range.start = range.end.subtract({ months: 1 });
    return range;
  } else if (!(range == null ? void 0 : range.end) && (range == null ? void 0 : range.start)) {
    range.end = range.start.add({ months: 1 });
    return range;
  }
  return { start: now2, end: now2.add({ months: 1 }) };
}
const ArrowRightAltIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z" }),
  "ArrowRightAltOutlined"
);
function adjustSegment(value, part, amount, options) {
  switch (part) {
    case "era":
    case "year":
    case "month":
    case "day":
      return value.cycle(part, amount, { round: part === "year" });
  }
  if ("hour" in value) {
    switch (part) {
      case "dayPeriod": {
        const hours = value.hour;
        const isPM = hours >= 12;
        return value.set({ hour: isPM ? hours - 12 : hours + 12 });
      }
      case "hour":
      case "minute":
      case "second":
        return value.cycle(part, amount, {
          round: part !== "hour",
          hourCycle: options.hour12 ? 12 : 24
        });
    }
  }
  return value;
}
function setSegment(value, part, segmentValue, options) {
  switch (part) {
    case "day":
    case "month":
    case "year":
      return value.set({ [part]: segmentValue });
  }
  if ("hour" in value) {
    switch (part) {
      case "dayPeriod": {
        const hours = value.hour;
        const wasPM = hours >= 12;
        const isPM = segmentValue >= 12;
        if (isPM === wasPM) {
          return value;
        }
        return value.set({ hour: wasPM ? hours - 12 : hours + 12 });
      }
      case "hour":
        if (options.hour12) {
          const hours = value.hour;
          const wasPM = hours >= 12;
          if (!wasPM && segmentValue === 12) {
            segmentValue = 0;
          }
          if (wasPM && segmentValue < 12) {
            segmentValue += 12;
          }
        }
      case "minute":
      case "second":
        return value.set({ [part]: segmentValue });
    }
  }
  return value;
}
const PAGE_STEP = {
  year: 5,
  month: 2,
  day: 7,
  hour: 2,
  minute: 15,
  second: 15,
  dayPeriod: 1
};
function EditableDateSegment({
  segment,
  domProps,
  value,
  onChange,
  isPlaceholder,
  state: { timezone, calendarIsOpen, setCalendarIsOpen }
}) {
  const isMobile = useIsMobileMediaQuery();
  const enteredKeys = useRef("");
  const { localeCode } = useSelectedLocale();
  const focusManager = useFocusManager();
  const formatter = useDateFormatter({ timeZone: timezone });
  const parser = useMemo(
    () => new NumberParser(localeCode, { maximumFractionDigits: 0 }),
    [localeCode]
  );
  const setSegmentValue = (newValue) => {
    onChange(
      setSegment(value, segment.type, newValue, formatter.resolvedOptions())
    );
  };
  const adjustSegmentValue = (amount) => {
    onChange(
      adjustSegment(value, segment.type, amount, formatter.resolvedOptions())
    );
  };
  const backspace = () => {
    if (parser.isValidPartialNumber(segment.text)) {
      const newValue = segment.text.slice(0, -1);
      const parsed = parser.parse(newValue);
      if (newValue.length === 0 || parsed === 0) {
        const now2 = today(timezone);
        if (segment.type in now2) {
          setSegmentValue(now2[segment.type]);
        }
      } else {
        setSegmentValue(parsed);
      }
      enteredKeys.current = newValue;
    } else if (segment.type === "dayPeriod") {
      adjustSegmentValue(-1);
    }
  };
  const onKeyDown = (e) => {
    var _a2;
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) {
      return;
    }
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        e.stopPropagation();
        focusManager == null ? void 0 : focusManager.focusPrevious();
        break;
      case "ArrowRight":
        e.preventDefault();
        e.stopPropagation();
        focusManager == null ? void 0 : focusManager.focusNext();
        break;
      case "Enter":
        (_a2 = e.target.closest("form")) == null ? void 0 : _a2.requestSubmit();
        setCalendarIsOpen(!calendarIsOpen);
        break;
      case "Tab":
        break;
      case "Backspace":
      case "Delete": {
        e.preventDefault();
        e.stopPropagation();
        backspace();
        break;
      }
      case "ArrowUp":
        e.preventDefault();
        enteredKeys.current = "";
        adjustSegmentValue(1);
        break;
      case "ArrowDown":
        e.preventDefault();
        enteredKeys.current = "";
        adjustSegmentValue(-1);
        break;
      case "PageUp":
        e.preventDefault();
        enteredKeys.current = "";
        adjustSegmentValue(PAGE_STEP[segment.type] || 1);
        break;
      case "PageDown":
        e.preventDefault();
        enteredKeys.current = "";
        adjustSegmentValue(-(PAGE_STEP[segment.type] || 1));
        break;
      case "Home":
        e.preventDefault();
        enteredKeys.current = "";
        setSegmentValue(segment.maxValue);
        break;
      case "End":
        e.preventDefault();
        enteredKeys.current = "";
        setSegmentValue(segment.minValue);
        break;
    }
    onInput(e.key);
  };
  const amPmFormatter = useDateFormatter({ hour: "numeric", hour12: true });
  const am = useMemo(() => {
    const amDate = /* @__PURE__ */ new Date();
    amDate.setHours(0);
    return amPmFormatter.formatToParts(amDate).find((part) => part.type === "dayPeriod").value;
  }, [amPmFormatter]);
  const pm = useMemo(() => {
    const pmDate = /* @__PURE__ */ new Date();
    pmDate.setHours(12);
    return amPmFormatter.formatToParts(pmDate).find((part) => part.type === "dayPeriod").value;
  }, [amPmFormatter]);
  const onInput = (key) => {
    const newValue = enteredKeys.current + key;
    switch (segment.type) {
      case "dayPeriod":
        if (am.toLowerCase().startsWith(key)) {
          setSegmentValue(0);
        } else if (pm.toLowerCase().startsWith(key)) {
          setSegmentValue(12);
        } else {
          break;
        }
        focusManager == null ? void 0 : focusManager.focusNext();
        break;
      case "day":
      case "hour":
      case "minute":
      case "second":
      case "month":
      case "year": {
        if (!parser.isValidPartialNumber(newValue)) {
          return;
        }
        let numberValue = parser.parse(newValue);
        let segmentValue = numberValue;
        let allowsZero = segment.minValue === 0;
        if (segment.type === "hour" && formatter.resolvedOptions().hour12) {
          switch (formatter.resolvedOptions().hourCycle) {
            case "h11":
              if (numberValue > 11) {
                segmentValue = parser.parse(key);
              }
              break;
            case "h12":
              allowsZero = false;
              if (numberValue > 12) {
                segmentValue = parser.parse(key);
              }
              break;
          }
          if (segment.value >= 12 && numberValue > 1) {
            numberValue += 12;
          }
        } else if (numberValue > segment.maxValue) {
          segmentValue = parser.parse(key);
        }
        if (Number.isNaN(numberValue)) {
          return;
        }
        const shouldSetValue = segmentValue !== 0 || allowsZero;
        if (shouldSetValue) {
          setSegmentValue(segmentValue);
        }
        if (Number(`${numberValue}0`) > segment.maxValue || newValue.length >= String(segment.maxValue).length) {
          enteredKeys.current = "";
          if (shouldSetValue) {
            focusManager == null ? void 0 : focusManager.focusNext();
          }
        } else {
          enteredKeys.current = newValue;
        }
        break;
      }
    }
  };
  const spinButtonProps = isMobile ? {} : {
    "aria-label": segment.type,
    "aria-valuetext": isPlaceholder ? void 0 : `${segment.value}`,
    "aria-valuemin": segment.minValue,
    "aria-valuemax": segment.maxValue,
    "aria-valuenow": isPlaceholder ? void 0 : segment.value,
    tabIndex: 0,
    onKeyDown
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...mergeProps(domProps, {
        ...spinButtonProps,
        onFocus: (e) => {
          enteredKeys.current = "";
          e.target.scrollIntoView({ block: "nearest" });
        },
        onClick: (e) => {
          e.preventDefault();
          e.stopPropagation();
        }
      }),
      className: "box-content cursor-default select-none whitespace-nowrap rounded p-2 text-center tabular-nums caret-transparent outline-none focus:bg-primary focus:text-on-primary",
      children: segment.text.padStart(segment.minLength, "0")
    }
  );
}
function LiteralDateSegment({ segment, domProps }) {
  const focusManager = useFocusManager();
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...domProps,
      onPointerDown: (e) => {
        if (e.pointerType === "mouse") {
          e.preventDefault();
          const res = focusManager == null ? void 0 : focusManager.focusNext({ from: e.target });
          if (!res) {
            focusManager == null ? void 0 : focusManager.focusPrevious({ from: e.target });
          }
        }
      },
      "aria-hidden": true,
      className: "min-w-4 cursor-default select-none",
      children: segment.text
    }
  );
}
function getSegmentLimits(date, type, options) {
  switch (type) {
    case "year":
      return {
        value: date.year,
        placeholder: "yyyy",
        minValue: 1,
        maxValue: date.calendar.getYearsInEra(date)
      };
    case "month":
      return {
        value: date.month,
        placeholder: "mm",
        minValue: getMinimumMonthInYear(date),
        maxValue: date.calendar.getMonthsInYear(date)
      };
    case "day":
      return {
        value: date.day,
        minValue: getMinimumDayInMonth(date),
        maxValue: date.calendar.getDaysInMonth(date),
        placeholder: "dd"
      };
  }
  if ("hour" in date) {
    switch (type) {
      case "dayPeriod":
        return {
          value: date.hour >= 12 ? 12 : 0,
          minValue: 0,
          maxValue: 12,
          placeholder: "--"
        };
      case "hour":
        if (options.hour12) {
          const isPM = date.hour >= 12;
          return {
            value: date.hour,
            minValue: isPM ? 12 : 0,
            maxValue: isPM ? 23 : 11,
            placeholder: "--"
          };
        }
        return {
          value: date.hour,
          minValue: 0,
          maxValue: 23,
          placeholder: "--"
        };
      case "minute":
        return {
          value: date.minute,
          minValue: 0,
          maxValue: 59,
          placeholder: "--"
        };
    }
  }
  return {};
}
function DateSegmentList({
  segmentProps,
  state,
  value,
  onChange,
  isPlaceholder
}) {
  const { granularity } = state;
  const options = useMemo(() => {
    const memoOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric"
    };
    if (granularity === "minute") {
      memoOptions.hour = "numeric";
      memoOptions.minute = "numeric";
    }
    return memoOptions;
  }, [granularity]);
  const formatter = useDateFormatter(options);
  const dateValue = useMemo(() => value.toDate(), [value]);
  const segments = useMemo(() => {
    return formatter.formatToParts(dateValue).map((segment) => {
      const limits = getSegmentLimits(
        value,
        segment.type,
        formatter.resolvedOptions()
      );
      const textValue = isPlaceholder && segment.type !== "literal" ? limits.placeholder : segment.value;
      return {
        type: segment.type,
        text: segment.value === ", " ? " " : textValue,
        ...limits,
        minLength: segment.type !== "literal" ? String(limits.maxValue).length : 1
      };
    });
  }, [dateValue, formatter, isPlaceholder, value]);
  return /* @__PURE__ */ jsx("div", { className: "flex items-center", children: segments.map((segment, index) => {
    if (segment.type === "literal") {
      return /* @__PURE__ */ jsx(
        LiteralDateSegment,
        {
          domProps: segmentProps,
          segment
        },
        index
      );
    }
    return /* @__PURE__ */ jsx(
      EditableDateSegment,
      {
        isPlaceholder,
        domProps: segmentProps,
        state,
        value,
        onChange,
        segment
      },
      index
    );
  }) });
}
function CalendarCell({
  date,
  currentMonth,
  state: {
    dayIsActive,
    dayIsHighlighted,
    dayIsRangeStart,
    dayIsRangeEnd,
    getCellProps,
    timezone,
    min,
    max
  }
}) {
  const { localeCode } = useSelectedLocale();
  const dayOfWeek = getDayOfWeek(date, localeCode);
  const isActive = dayIsActive(date);
  const isHighlighted = dayIsHighlighted(date);
  const isRangeStart = dayIsRangeStart(date);
  const isRangeEnd = dayIsRangeEnd(date);
  const dayIsToday = isToday(date, timezone);
  const sameMonth = isSameMonth(date, currentMonth);
  const isDisabled = dateIsInvalid(date, min, max);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "button",
      "aria-disabled": isDisabled,
      className: clsx(
        "w-40 h-40 text-sm relative isolate flex-shrink-0",
        isDisabled && "text-disabled pointer-events-none",
        !sameMonth && "invisible pointer-events-none"
      ),
      ...getCellProps(date, sameMonth),
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: clsx(
              "absolute inset-0 flex items-center justify-center rounded-full w-full h-full select-none z-10 cursor-pointer",
              !isActive && !dayIsToday && "hover:bg-hover",
              isActive && "bg-primary text-on-primary font-semibold",
              dayIsToday && !isActive && "bg-chip"
            ),
            children: date.day
          }
        ),
        isHighlighted && sameMonth && /* @__PURE__ */ jsx(
          "span",
          {
            className: clsx(
              "absolute w-full h-full inset-0 bg-primary/focus",
              (isRangeStart || dayOfWeek === 0 || date.day === 1) && "rounded-l-full",
              (isRangeEnd || dayOfWeek === 6 || date.day === currentMonth.calendar.getDaysInMonth(currentMonth)) && "rounded-r-full"
            )
          }
        )
      ]
    }
  );
}
function CalendarMonth({
  startDate,
  state,
  isFirst,
  isLast
}) {
  const { localeCode } = useSelectedLocale();
  const weeksInMonth = getWeeksInMonth(startDate, localeCode);
  const monthStart = startOfWeek(startDate, localeCode);
  return /* @__PURE__ */ jsxs("div", { className: "w-280 flex-shrink-0", children: [
    /* @__PURE__ */ jsx(
      CalendarMonthHeader,
      {
        isFirst,
        isLast,
        state,
        currentMonth: startDate
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "block", role: "grid", children: [
      /* @__PURE__ */ jsx(WeekdayHeader, { state, startDate }),
      [...new Array(weeksInMonth).keys()].map((weekIndex) => /* @__PURE__ */ jsx(m.div, { className: "flex mb-6", children: [...new Array(7).keys()].map((dayIndex) => /* @__PURE__ */ jsx(
        CalendarCell,
        {
          date: monthStart.add({ weeks: weekIndex, days: dayIndex }),
          currentMonth: startDate,
          state
        },
        dayIndex
      )) }, weekIndex))
    ] })
  ] });
}
function CalendarMonthHeader({
  currentMonth,
  isFirst,
  isLast,
  state: { calendarDates, setCalendarDates, timezone, min, max }
}) {
  const shiftCalendars = (direction) => {
    const count = calendarDates.length;
    let newDates;
    if (direction === "forward") {
      newDates = calendarDates.map(
        (date) => endOfMonth(date.add({ months: count }))
      );
    } else {
      newDates = calendarDates.map(
        (date) => endOfMonth(date.subtract({ months: count }))
      );
    }
    setCalendarDates(newDates);
  };
  const monthFormatter = useDateFormatter({
    month: "long",
    year: "numeric",
    era: currentMonth.calendar.identifier !== "gregory" ? "long" : void 0,
    calendar: currentMonth.calendar.identifier
  });
  const isBackwardDisabled = dateIsInvalid(
    currentMonth.subtract({ days: 1 }),
    min,
    max
  );
  const isForwardDisabled = dateIsInvalid(
    startOfMonth(currentMonth.add({ months: 1 })),
    min,
    max
  );
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-10", children: [
    /* @__PURE__ */ jsx(
      IconButton,
      {
        size: "md",
        className: clsx("text-muted", !isFirst && "invisible"),
        disabled: !isFirst || isBackwardDisabled,
        "aria-hidden": !isFirst,
        onClick: () => {
          shiftCalendars("backward");
        },
        children: /* @__PURE__ */ jsx(KeyboardArrowLeftIcon, {})
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold select-none", children: monthFormatter.format(currentMonth.toDate(timezone)) }),
    /* @__PURE__ */ jsx(
      IconButton,
      {
        size: "md",
        className: clsx("text-muted", !isLast && "invisible"),
        disabled: !isLast || isForwardDisabled,
        "aria-hidden": !isLast,
        onClick: () => {
          shiftCalendars("forward");
        },
        children: /* @__PURE__ */ jsx(KeyboardArrowRightIcon, {})
      }
    )
  ] });
}
function WeekdayHeader({ state: { timezone }, startDate }) {
  const { localeCode } = useSelectedLocale();
  const dayFormatter = useDateFormatter({ weekday: "short" });
  const monthStart = startOfWeek(startDate, localeCode);
  return /* @__PURE__ */ jsx("div", { className: "flex", children: [...new Array(7).keys()].map((index) => {
    const date = monthStart.add({ days: index });
    const dateDay = date.toDate(timezone);
    const weekday = dayFormatter.format(dateDay);
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: "w-40 h-40 text-sm font-semibold relative flex-shrink-0",
        children: /* @__PURE__ */ jsx("div", { className: "absolute flex items-center justify-center w-full h-full select-none", children: weekday })
      },
      index
    );
  }) });
}
function Calendar({ state, visibleMonths = 1 }) {
  const isMobile = useIsMobileMediaQuery();
  if (isMobile) {
    visibleMonths = 1;
  }
  return /* @__PURE__ */ jsx(Fragment, { children: [...new Array(visibleMonths).keys()].map((index) => {
    const startDate = toCalendarDate(
      startOfMonth(state.calendarDates[index])
    );
    const isFirst = index === 0;
    const isLast = index === visibleMonths - 1;
    return /* @__PURE__ */ jsx(
      CalendarMonth,
      {
        state,
        startDate,
        isFirst,
        isLast
      },
      index
    );
  }) });
}
const FormattedDateTimeRange = memo(
  ({ start, end, options, preset }) => {
    const { dates } = useSettings();
    const timezone = useUserTimezone();
    const formatter = useDateFormatter(
      options || DateFormatPresets[preset || (dates == null ? void 0 : dates.format)]
    );
    if (!start || !end) {
      return null;
    }
    let value;
    try {
      value = formatter.formatRange(
        castToDate(start, timezone),
        castToDate(end, timezone)
      );
    } catch (e) {
      value = "";
    }
    return /* @__PURE__ */ jsx(Fragment, { children: value });
  },
  shallowEqual
);
function castToDate(date, timezone) {
  if (typeof date === "string") {
    return parseAbsolute(date, timezone).toDate();
  }
  if ("toDate" in date) {
    return date.toDate(timezone);
  }
  return date;
}
function DatePresetList({
  onPresetSelected,
  selectedValue
}) {
  return /* @__PURE__ */ jsx(List, { children: DateRangePresets.map((preset) => /* @__PURE__ */ jsx(
    ListItem,
    {
      borderRadius: "rounded-none",
      capitalizeFirst: true,
      isSelected: (selectedValue == null ? void 0 : selectedValue.preset) === preset.key,
      onSelected: () => {
        const newValue = preset.getRangeValue();
        onPresetSelected(newValue);
      },
      children: /* @__PURE__ */ jsx(Trans, { ...preset.label })
    },
    preset.key
  )) });
}
const DateRangeComparePresets = [
  {
    key: 0,
    label: message("Preceding period"),
    getRangeValue: (range) => {
      const startDate = range.start;
      const endDate = range.end;
      const diffInMilliseconds = endDate.toDate().getTime() - startDate.toDate().getTime();
      const diffInMinutes = diffInMilliseconds / (1e3 * 60);
      const newStart = startDate.subtract({ minutes: diffInMinutes });
      return {
        preset: 0,
        start: newStart,
        end: startDate
      };
    }
  },
  {
    key: 1,
    label: message("Same period last year"),
    getRangeValue: (range) => {
      return {
        start: range.start.subtract({ years: 1 }),
        end: range.end.subtract({ years: 1 }),
        preset: 1
      };
    }
  },
  {
    key: 2,
    label: message("Custom"),
    getRangeValue: (range) => {
      return {
        start: range.start.subtract({ weeks: 1 }),
        end: range.end.subtract({ weeks: 1 }),
        preset: 2
      };
    }
  }
];
function DateRangeComparePresetList({
  originalRangeValue,
  onPresetSelected,
  selectedValue
}) {
  return /* @__PURE__ */ jsx(List, { children: DateRangeComparePresets.map((preset) => /* @__PURE__ */ jsx(
    ListItem,
    {
      borderRadius: "rounded-none",
      capitalizeFirst: true,
      isSelected: (selectedValue == null ? void 0 : selectedValue.preset) === preset.key,
      onSelected: () => {
        const newValue = preset.getRangeValue(originalRangeValue);
        onPresetSelected(newValue);
      },
      children: /* @__PURE__ */ jsx(Trans, { ...preset.label })
    },
    preset.key
  )) });
}
function DateRangeDialog({
  state,
  compareState,
  showInlineDatePickerField = false,
  compareVisibleDefault = false
}) {
  const isTablet = useIsTabletMediaQuery();
  const { close } = useDialogContext();
  const initialStateRef = useRef(state);
  const hasPlaceholder = state.isPlaceholder.start || state.isPlaceholder.end;
  const [compareVisible, setCompareVisible] = useState(compareVisibleDefault);
  const footer = /* @__PURE__ */ jsxs(
    DialogFooter,
    {
      dividerTop: true,
      startAction: !hasPlaceholder && !isTablet ? /* @__PURE__ */ jsx("div", { className: "text-xs", children: /* @__PURE__ */ jsx(
        FormattedDateTimeRange,
        {
          start: state.selectedValue.start.toDate(),
          end: state.selectedValue.end.toDate(),
          options: { dateStyle: "medium" }
        }
      ) }) : void 0,
      children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "text",
            size: "xs",
            onClick: () => {
              state.setSelectedValue(initialStateRef.current.selectedValue);
              state.setIsPlaceholder(initialStateRef.current.isPlaceholder);
              close();
            },
            children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" })
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "flat",
            color: "primary",
            size: "xs",
            onClick: () => {
              const value = state.selectedValue;
              if (compareState && compareVisible) {
                value.compareStart = compareState.selectedValue.start;
                value.compareEnd = compareState.selectedValue.end;
              }
              close(value);
            },
            children: /* @__PURE__ */ jsx(Trans, { message: "Select" })
          }
        )
      ]
    }
  );
  return /* @__PURE__ */ jsxs(Dialog, { size: "auto", children: [
    /* @__PURE__ */ jsxs(DialogBody, { className: "flex", padding: "p-0", children: [
      !isTablet && /* @__PURE__ */ jsxs("div", { className: "min-w-192 py-14", children: [
        /* @__PURE__ */ jsx(
          DatePresetList,
          {
            selectedValue: state.selectedValue,
            onPresetSelected: (preset) => {
              state.setSelectedValue(preset);
              if (state.closeDialogOnSelection) {
                close(preset);
              }
            }
          }
        ),
        !!compareState && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            Switch,
            {
              className: "mx-20 mb-10 mt-14",
              checked: compareVisible,
              onChange: (e) => setCompareVisible(e.target.checked),
              children: /* @__PURE__ */ jsx(Trans, { message: "Compare" })
            }
          ),
          compareVisible && /* @__PURE__ */ jsx(
            DateRangeComparePresetList,
            {
              originalRangeValue: state.selectedValue,
              selectedValue: compareState.selectedValue,
              onPresetSelected: (preset) => {
                compareState.setSelectedValue(preset);
              }
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: /* @__PURE__ */ jsx(
        Calendars,
        {
          state,
          compareState,
          showInlineDatePickerField,
          compareVisible
        }
      ) })
    ] }),
    !state.closeDialogOnSelection && footer
  ] });
}
function Calendars({
  state,
  compareState,
  showInlineDatePickerField,
  compareVisible
}) {
  return /* @__PURE__ */ jsxs(
    m.div,
    {
      initial: { width: 0, overflow: "hidden" },
      animate: { width: "auto" },
      exit: { width: 0, overflow: "hidden" },
      transition: { type: "tween", duration: 0.125 },
      className: "border-l px-20 pb-20 pt-10",
      children: [
        showInlineDatePickerField && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InlineDatePickerField, { state }),
          !!compareState && compareVisible && /* @__PURE__ */ jsx(
            InlineDatePickerField,
            {
              state: compareState,
              label: /* @__PURE__ */ jsx(Trans, { message: "Compare" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-start gap-36", children: /* @__PURE__ */ jsx(Calendar, { state, visibleMonths: 2 }) })
      ]
    }
  );
}
function InlineDatePickerField({ state, label }) {
  const { selectedValue, setSelectedValue } = state;
  return /* @__PURE__ */ jsxs(DatePickerField, { className: "mb-20 mt-10", label, children: [
    /* @__PURE__ */ jsx(
      DateSegmentList,
      {
        state,
        value: selectedValue.start,
        onChange: (newValue) => {
          setSelectedValue({ ...selectedValue, start: newValue });
        }
      }
    ),
    /* @__PURE__ */ jsx(ArrowRightAltIcon, { className: "block flex-shrink-0 text-muted", size: "md" }),
    /* @__PURE__ */ jsx(
      DateSegmentList,
      {
        state,
        value: selectedValue.end,
        onChange: (newValue) => {
          setSelectedValue({ ...selectedValue, end: newValue });
        }
      }
    )
  ] });
}
const DatatableDataQueryKey = (endpoint2, params) => {
  const key = endpoint2.split("/");
  if (params) {
    key.push(params);
  }
  return key;
};
function useDatatableData(endpoint2, params, options, onLoad) {
  return useQuery({
    queryKey: DatatableDataQueryKey(endpoint2, params),
    queryFn: ({ signal }) => paginate(endpoint2, params, onLoad, signal),
    placeholderData: keepPreviousData,
    ...options
  });
}
async function paginate(endpoint2, params, onLoad, signal) {
  if (params.query) {
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  const response = await apiClient.get(endpoint2, { params, signal: params.query ? signal : void 0 }).then((response2) => response2.data);
  onLoad == null ? void 0 : onLoad(response);
  return response;
}
function useNormalizedModels(endpoint2, queryParams, queryOptions) {
  return useQuery({
    queryKey: [endpoint2, queryParams],
    queryFn: () => fetchModels(endpoint2, queryParams),
    placeholderData: keepPreviousData,
    ...queryOptions
  });
}
async function fetchModels(endpoint2, params) {
  return apiClient.get(endpoint2, { params }).then((r) => r.data);
}
function useNormalizedModel(endpoint2, queryParams, queryOptions) {
  return useQuery({
    queryKey: [endpoint2, queryParams],
    queryFn: () => fetchModel(endpoint2, queryParams),
    ...queryOptions
  });
}
async function fetchModel(endpoint2, params) {
  return apiClient.get(endpoint2, { params }).then((r) => r.data);
}
function NormalizedModelField({
  label,
  className,
  background,
  value,
  defaultValue = "",
  placeholder = message("Select item..."),
  searchPlaceholder = message("Find an item..."),
  onChange,
  description,
  errorMessage,
  invalid,
  autoFocus,
  queryParams,
  endpoint: endpoint2,
  disabled,
  required
}) {
  var _a2;
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useControlledState(
    value,
    defaultValue,
    onChange
  );
  const query = useNormalizedModels(endpoint2, {
    query: inputValue,
    ...queryParams
  });
  const { trans } = useTrans();
  const fieldClassNames = getInputFieldClassNames({ size: "md" });
  if (selectedValue) {
    return /* @__PURE__ */ jsxs("div", { className, children: [
      /* @__PURE__ */ jsx("div", { className: fieldClassNames.label, children: label }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: clsx(
            "rounded-input border p-8",
            background,
            invalid && "border-danger"
          ),
          children: /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: /* @__PURE__ */ jsx(
            SelectedModelPreview,
            {
              disabled,
              endpoint: endpoint2,
              modelId: selectedValue,
              queryParams,
              onEditClick: () => {
                setSelectedValue("");
                setInputValue("");
                requestAnimationFrame(() => {
                  var _a3, _b2;
                  (_a3 = inputRef.current) == null ? void 0 : _a3.focus();
                  (_b2 = inputRef.current) == null ? void 0 : _b2.click();
                });
              }
            }
          ) })
        }
      ),
      description && !errorMessage && /* @__PURE__ */ jsx("div", { className: fieldClassNames.description, children: description }),
      errorMessage && /* @__PURE__ */ jsx("div", { className: fieldClassNames.error, children: errorMessage })
    ] });
  }
  return /* @__PURE__ */ jsx(
    SelectForwardRef,
    {
      className,
      showSearchField: true,
      invalid,
      errorMessage,
      description,
      color: "white",
      isAsync: true,
      background,
      placeholder: trans(placeholder),
      searchPlaceholder: trans(searchPlaceholder),
      label,
      isLoading: query.isFetching,
      items: (_a2 = query.data) == null ? void 0 : _a2.results,
      inputValue,
      onInputValueChange: setInputValue,
      selectionMode: "single",
      selectedValue,
      onSelectionChange: setSelectedValue,
      ref: inputRef,
      autoFocus,
      disabled,
      required,
      children: (model) => /* @__PURE__ */ jsx(
        Item,
        {
          value: model.id,
          description: model.description,
          startIcon: /* @__PURE__ */ jsx(Avatar, { src: model.image }),
          children: model.name
        },
        model.id
      )
    }
  );
}
function SelectedModelPreview({
  modelId,
  onEditClick,
  endpoint: endpoint2,
  disabled,
  queryParams
}) {
  const { data, isLoading } = useNormalizedModel(
    `${endpoint2}/${modelId}`,
    queryParams
  );
  if (isLoading || !(data == null ? void 0 : data.model)) {
    return /* @__PURE__ */ jsx(LoadingSkeleton, {}, "skeleton");
  }
  return /* @__PURE__ */ jsxs(
    m.div,
    {
      className: clsx(
        "flex items-center gap-10",
        disabled && "pointer-events-none cursor-not-allowed text-disabled"
      ),
      ...opacityAnimation,
      children: [
        data.model.image && /* @__PURE__ */ jsx(Avatar, { src: data.model.image }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm leading-4", children: data.model.name }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted", children: data.model.description })
        ] }),
        /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Change item" }), children: /* @__PURE__ */ jsx(
          IconButton,
          {
            className: "ml-auto text-muted",
            size: "sm",
            onClick: onEditClick,
            disabled,
            children: /* @__PURE__ */ jsx(EditIcon, {})
          }
        ) })
      ]
    },
    "preview"
  );
}
function LoadingSkeleton() {
  return /* @__PURE__ */ jsxs(m.div, { className: "flex items-center gap-10", ...opacityAnimation, children: [
    /* @__PURE__ */ jsx(Skeleton, { variant: "rect", size: "w-32 h-32" }),
    /* @__PURE__ */ jsxs("div", { className: "max-h-[36px] flex-auto", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "text-xs" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "max-h-8 text-xs" })
    ] }),
    /* @__PURE__ */ jsx(Skeleton, { variant: "icon", size: "w-24 h-24" })
  ] });
}
function FormNormalizedModelField({
  name,
  ...fieldProps
}) {
  const { clearErrors } = useFormContext();
  const {
    field: { onChange, value = "" },
    fieldState: { invalid, error }
  } = useController({
    name
  });
  return /* @__PURE__ */ jsx(
    NormalizedModelField,
    {
      value,
      onChange: (value2) => {
        onChange(value2);
        clearErrors(name);
      },
      invalid,
      errorMessage: error == null ? void 0 : error.message,
      ...fieldProps
    }
  );
}
function stringToChipValue(value) {
  return { id: value, name: `${value}`, description: `${value}` };
}
function ChipFieldInner(props, ref) {
  const fieldRef = useRef(null);
  const inputRef = useObjectRef(ref);
  const {
    displayWith = (v) => v.name,
    validateWith,
    children,
    suggestions,
    isLoading,
    inputValue,
    onInputValueChange,
    onItemSelected,
    placeholder,
    onOpenChange,
    chipSize = "sm",
    openMenuOnFocus = true,
    showEmptyMessage,
    value: propsValue,
    defaultValue,
    onChange: propsOnChange,
    valueKey,
    isAsync,
    allowCustomValue = true,
    showDropdownArrow,
    onChipClick,
    ...inputFieldProps
  } = props;
  const fieldClassNames = getInputFieldClassNames({
    ...props,
    flexibleHeight: true
  });
  const [value, onChange] = useChipFieldValueState(props);
  const [listboxIsOpen, setListboxIsOpen] = useState(false);
  const loadingIndicator = /* @__PURE__ */ jsx(ProgressCircle, { isIndeterminate: true, size: "sm", "aria-label": "loading..." });
  const dropdownArrow = showDropdownArrow ? /* @__PURE__ */ jsx(KeyboardArrowDownIcon, {}) : null;
  const { fieldProps, inputProps } = useField({
    ...inputFieldProps,
    focusRef: inputRef,
    endAdornment: isLoading && listboxIsOpen ? loadingIndicator : dropdownArrow
  });
  return /* @__PURE__ */ jsx(Field, { fieldClassNames, ...fieldProps, children: /* @__PURE__ */ jsxs(
    Input,
    {
      ref: fieldRef,
      className: clsx("flex flex-wrap items-center", fieldClassNames.input),
      onClick: () => {
        var _a2;
        (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
      },
      children: [
        /* @__PURE__ */ jsx(
          ListWrapper,
          {
            displayChipUsing: displayWith,
            onChipClick,
            items: value,
            setItems: onChange,
            chipSize
          }
        ),
        /* @__PURE__ */ jsx(
          ChipInput,
          {
            size: props.size,
            showEmptyMessage,
            inputProps,
            inputValue,
            onInputValueChange,
            fieldRef,
            inputRef,
            chips: value,
            setChips: onChange,
            validateWith,
            isLoading,
            suggestions,
            placeholder,
            openMenuOnFocus,
            listboxIsOpen,
            setListboxIsOpen,
            allowCustomValue,
            children
          }
        )
      ]
    }
  ) });
}
function ListWrapper({
  items,
  setItems,
  displayChipUsing,
  chipSize,
  onChipClick
}) {
  const manager = useFocusManager();
  const removeItem = useCallback(
    (key) => {
      const i = items.findIndex((cr) => cr.id === key);
      const newItems = [...items];
      if (i > -1) {
        newItems.splice(i, 1);
        setItems(newItems);
      }
      return newItems;
    },
    [items, setItems]
  );
  return /* @__PURE__ */ jsx(
    ChipList,
    {
      className: clsx(
        "max-w-full flex-shrink-0 flex-wrap",
        chipSize === "xs" ? "my-6" : "my-8"
      ),
      size: chipSize,
      selectable: true,
      children: items.map((item) => /* @__PURE__ */ jsx(
        Chip,
        {
          errorMessage: item.errorMessage,
          adornment: item.image ? /* @__PURE__ */ jsx(Avatar, { circle: true, src: item.image }) : null,
          onClick: () => onChipClick == null ? void 0 : onChipClick(item),
          onRemove: () => {
            const newItems = removeItem(item.id);
            if (newItems.length) {
              manager == null ? void 0 : manager.focusPrevious({ tabbable: true });
            } else {
              manager == null ? void 0 : manager.focusLast();
            }
          },
          children: displayChipUsing(item)
        },
        item.id
      ))
    }
  );
}
function ChipInput(props) {
  const {
    inputRef,
    fieldRef,
    validateWith,
    setChips,
    chips,
    suggestions,
    inputProps,
    placeholder,
    openMenuOnFocus,
    listboxIsOpen,
    setListboxIsOpen,
    allowCustomValue,
    isLoading,
    size
  } = props;
  const manager = useFocusManager();
  const addItems = useCallback(
    (items) => {
      items = (items || []).filter((item) => {
        const invalid = !item || !item.id || !item.name;
        const alreadyExists = chips.findIndex((cr) => cr.id === (item == null ? void 0 : item.id)) > -1;
        return !alreadyExists && !invalid;
      });
      if (!items.length)
        return;
      if (validateWith) {
        items = items.map((item) => validateWith(item));
      }
      setChips([...chips, ...items]);
    },
    [chips, setChips, validateWith]
  );
  const listbox = useListbox({
    ...props,
    clearInputOnItemSelection: true,
    isOpen: listboxIsOpen,
    onOpenChange: setListboxIsOpen,
    items: suggestions,
    selectionMode: "none",
    role: "listbox",
    virtualFocus: true,
    onItemSelected: (value) => {
      handleItemSelection(value);
    }
  });
  const {
    state: {
      activeIndex,
      setActiveIndex,
      isOpen,
      setIsOpen,
      inputValue,
      setInputValue
    },
    refs,
    listboxId,
    collection,
    onInputChange
  } = listbox;
  const handleItemSelection = (textValue) => {
    const option = collection.size && activeIndex != null ? [...collection.values()][activeIndex] : null;
    if (option == null ? void 0 : option.item) {
      addItems([option.item]);
    } else if (allowCustomValue) {
      addItems([stringToChipValue(option ? option.value : textValue)]);
    }
    setInputValue("");
    setActiveIndex(null);
    setIsOpen(false);
  };
  useLayoutEffect(() => {
    if (fieldRef.current && refs.reference.current !== fieldRef.current) {
      listbox.reference(fieldRef.current);
    }
  }, [fieldRef, listbox, refs]);
  const { handleTriggerKeyDown, handleListboxKeyboardNavigation } = useListboxKeyboardNavigation(listbox);
  const handleFocusAndClick = createEventHandler(() => {
    if (openMenuOnFocus && !isOpen) {
      setIsOpen(true);
    }
  });
  return /* @__PURE__ */ jsx(
    Listbox,
    {
      listbox,
      mobileOverlay: Popover,
      isLoading,
      onPointerDown: (e) => {
        e.preventDefault();
      },
      children: /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          className: clsx(
            "mx-8 my-4 min-w-30 flex-[1_1_60px] bg-transparent text-sm outline-none",
            size === "xs" ? "h-20" : "h-30"
          ),
          placeholder,
          ...mergeProps(inputProps, {
            ref: inputRef,
            value: inputValue,
            onChange: onInputChange,
            onPaste: (e) => {
              const paste = e.clipboardData.getData("text");
              const emails = paste.match(
                /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
              );
              if (emails) {
                e.preventDefault();
                const selection = window.getSelection();
                if (selection == null ? void 0 : selection.rangeCount) {
                  selection.deleteFromDocument();
                  addItems(emails.map((email) => stringToChipValue(email)));
                }
              }
            },
            "aria-autocomplete": "list",
            "aria-controls": isOpen ? listboxId : void 0,
            autoComplete: "off",
            autoCorrect: "off",
            spellCheck: "false",
            onKeyDown: (e) => {
              const input = e.target;
              if (e.key === "Enter") {
                e.preventDefault();
                handleItemSelection(input.value);
                return;
              }
              if (e.key === "Escape" && isOpen) {
                setIsOpen(false);
                setInputValue("");
              }
              if (e.key === "ArrowUp" && isOpen && (activeIndex === 0 || activeIndex == null)) {
                setActiveIndex(null);
                return;
              }
              if (activeIndex != null && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
                e.preventDefault();
                return;
              }
              if ((e.key === "ArrowLeft" || e.key === "Backspace" || e.key === "Delete") && input.selectionStart === 0 && activeIndex == null && chips.length) {
                manager == null ? void 0 : manager.focusPrevious({ tabbable: true });
                return;
              }
              const handled = handleTriggerKeyDown(e);
              if (!handled) {
                handleListboxKeyboardNavigation(e);
              }
            },
            onFocus: handleFocusAndClick,
            onClick: handleFocusAndClick
          })
        }
      )
    }
  );
}
function useChipFieldValueState({
  onChange,
  value,
  defaultValue,
  valueKey
}) {
  const propsValue = useMemo(() => {
    return mixedValueToChipValue(value);
  }, [value]);
  const propsDefaultValue = useMemo(() => {
    return mixedValueToChipValue(defaultValue);
  }, [defaultValue]);
  const handleChange = useCallback(
    (value2) => {
      const newValue = valueKey ? value2.map((v) => v[valueKey]) : value2;
      onChange == null ? void 0 : onChange(newValue);
    },
    [onChange, valueKey]
  );
  return useControlledState(
    !propsValue ? void 0 : propsValue,
    propsDefaultValue || [],
    handleChange
  );
}
function mixedValueToChipValue(value) {
  if (value == null) {
    return void 0;
  }
  return value.map((v) => {
    return typeof v !== "object" ? stringToChipValue(v) : v;
  });
}
const ChipField = React.forwardRef(ChipFieldInner);
function FormChipField({ children, ...props }) {
  const {
    field: { onChange, onBlur, value = [], ref },
    fieldState: { invalid, error }
  } = useController({
    name: props.name
  });
  const formProps = {
    onChange,
    onBlur,
    value,
    invalid,
    errorMessage: error == null ? void 0 : error.message
  };
  return /* @__PURE__ */ jsx(ChipField, { ref, ...mergeProps(formProps, props), children });
}
function useDatePickerState(props) {
  const now2 = useCurrentDateTime();
  const [isPlaceholder, setIsPlaceholder] = useState(
    !props.value && !props.defaultValue
  );
  const setStateValue = props.onChange;
  const [internalValue, setInternalValue] = useControlledState(
    props.value || now2,
    props.defaultValue || now2,
    (value) => {
      setIsPlaceholder(false);
      setStateValue == null ? void 0 : setStateValue(value);
    }
  );
  const {
    min,
    max,
    granularity,
    timezone,
    calendarIsOpen,
    setCalendarIsOpen,
    closeDialogOnSelection
  } = useBaseDatePickerState(internalValue, props);
  const clear = useCallback(() => {
    setIsPlaceholder(true);
    setInternalValue(now2);
    setStateValue == null ? void 0 : setStateValue(null);
    setCalendarIsOpen(false);
  }, [now2, setInternalValue, setStateValue, setCalendarIsOpen]);
  const [calendarDates, setCalendarDates] = useState(() => {
    return [toCalendarDate(internalValue)];
  });
  const setSelectedValue = useCallback(
    (newValue) => {
      if (min && newValue.compare(min) < 0) {
        newValue = min;
      } else if (max && newValue.compare(max) > 0) {
        newValue = max;
      }
      const value = internalValue ? internalValue.set(newValue) : toZoned(newValue, timezone);
      setInternalValue(value);
      setCalendarDates([toCalendarDate(value)]);
      setIsPlaceholder(false);
    },
    [setInternalValue, min, max, internalValue, timezone]
  );
  const dayIsActive = useCallback(
    (day) => !isPlaceholder && isSameDay(internalValue, day),
    [internalValue, isPlaceholder]
  );
  const getCellProps = useCallback(
    (date) => {
      return {
        onClick: () => {
          setSelectedValue == null ? void 0 : setSelectedValue(date);
          if (closeDialogOnSelection) {
            setCalendarIsOpen == null ? void 0 : setCalendarIsOpen(false);
          }
        }
      };
    },
    [setSelectedValue, setCalendarIsOpen, closeDialogOnSelection]
  );
  return {
    selectedValue: internalValue,
    setSelectedValue: setInternalValue,
    calendarIsOpen,
    setCalendarIsOpen,
    dayIsActive,
    dayIsHighlighted: () => false,
    dayIsRangeStart: () => false,
    dayIsRangeEnd: () => false,
    getCellProps,
    calendarDates,
    setCalendarDates,
    isPlaceholder,
    clear,
    setIsPlaceholder,
    min,
    max,
    granularity,
    timezone,
    closeDialogOnSelection
  };
}
function DatePicker({ showCalendarFooter, ...props }) {
  const state = useDatePickerState(props);
  const inputRef = useRef(null);
  const now2 = useCurrentDateTime();
  const footer = showCalendarFooter && /* @__PURE__ */ jsx(
    DialogFooter,
    {
      padding: "px-14 pb-14",
      startAction: /* @__PURE__ */ jsx(
        Button,
        {
          disabled: state.isPlaceholder,
          variant: "text",
          color: "primary",
          onClick: () => {
            state.clear();
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Clear" })
        }
      ),
      children: /* @__PURE__ */ jsx(
        Button,
        {
          variant: "text",
          color: "primary",
          onClick: () => {
            state.setSelectedValue(now2);
            state.setCalendarIsOpen(false);
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Today" })
        }
      )
    }
  );
  const dialog = /* @__PURE__ */ jsx(
    DialogTrigger,
    {
      offset: 8,
      placement: "bottom-start",
      isOpen: state.calendarIsOpen,
      onOpenChange: state.setCalendarIsOpen,
      type: "popover",
      triggerRef: inputRef,
      returnFocusToTrigger: false,
      moveFocusToDialog: false,
      children: /* @__PURE__ */ jsxs(Dialog, { size: "auto", children: [
        /* @__PURE__ */ jsx(
          DialogBody,
          {
            className: "flex items-start gap-40",
            padding: showCalendarFooter ? "px-24 pt-20 pb-10" : null,
            children: /* @__PURE__ */ jsx(Calendar, { state, visibleMonths: 1 })
          }
        ),
        footer
      ] })
    }
  );
  const openOnClick = {
    onClick: (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!isHourSegment(e)) {
        state.setCalendarIsOpen(true);
      } else {
        state.setCalendarIsOpen(false);
      }
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      DatePickerField,
      {
        ref: inputRef,
        wrapperProps: openOnClick,
        endAdornment: /* @__PURE__ */ jsx(DateRangeIcon, { className: clsx(props.disabled && "text-disabled") }),
        ...props,
        children: /* @__PURE__ */ jsx(
          DateSegmentList,
          {
            segmentProps: openOnClick,
            state,
            value: state.selectedValue,
            onChange: state.setSelectedValue,
            isPlaceholder: state.isPlaceholder
          }
        )
      }
    ),
    dialog
  ] });
}
function FormDatePicker(props) {
  const { min, max } = props;
  const { trans } = useTrans();
  const { format } = useDateFormatter();
  const {
    field: { onChange, onBlur, value = null, ref },
    fieldState: { invalid, error }
  } = useController({
    name: props.name,
    rules: {
      validate: (v) => {
        if (!v)
          return;
        const date = parseAbsoluteToLocal(v);
        if (min && date.compare(min) < 0) {
          return trans({
            message: "Enter a date after :date",
            values: { date: format(v) }
          });
        }
        if (max && date.compare(max) > 0) {
          return trans({
            message: "Enter a date before :date",
            values: { date: format(v) }
          });
        }
      }
    }
  });
  const parsedValue = value ? parseAbsoluteToLocal(value) : null;
  const formProps = {
    onChange: (e) => {
      onChange(e ? e.toAbsoluteString() : e);
    },
    onBlur,
    value: parsedValue,
    invalid,
    errorMessage: error == null ? void 0 : error.message,
    inputRef: ref
  };
  return /* @__PURE__ */ jsx(DatePicker, { ...mergeProps(formProps, props) });
}
function isHourSegment(e) {
  return ["hour", "minute", "dayPeriod"].includes(
    e.currentTarget.ariaLabel || ""
  );
}
const DragHandleIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M20 9H4v2h16V9zM4 15h16v-2H4v2z" }),
  "DragHandleOutlined"
);
function useStickySentinel() {
  const [isSticky, setIsSticky] = useState(false);
  const observerRef = useRef();
  const sentinelRef = useCallback((sentinel) => {
    var _a2;
    if (sentinel) {
      const observer = new IntersectionObserver(
        ([e]) => setIsSticky(e.intersectionRatio < 1),
        { threshold: [1] }
      );
      observerRef.current = observer;
      observer.observe(sentinel);
    } else if (observerRef.current) {
      (_a2 = observerRef.current) == null ? void 0 : _a2.disconnect();
    }
  }, []);
  return { isSticky, sentinelRef };
}
function CrupdateResourceLayout({
  onSubmit,
  form,
  title,
  subTitle,
  children,
  actions,
  backButton,
  isLoading = false,
  disableSaveWhenNotDirty = false,
  wrapInContainer = true
}) {
  const { isSticky, sentinelRef } = useStickySentinel();
  const isDirty = !disableSaveWhenNotDirty ? true : Object.keys(form.formState.dirtyFields).length;
  return /* @__PURE__ */ jsxs(
    Form,
    {
      onSubmit,
      onBeforeSubmit: () => form.clearErrors(),
      form,
      children: [
        /* @__PURE__ */ jsx("div", { ref: sentinelRef }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: clsx(
              "sticky top-0 z-10 my-12 transition-shadow md:my-24",
              isSticky && "bg shadow"
            ),
            children: /* @__PURE__ */ jsxs(
              "div",
              {
                className: clsx(
                  "flex items-center gap-24 py-14 md:items-start",
                  wrapInContainer && "container mx-auto px-24"
                ),
                children: [
                  backButton,
                  /* @__PURE__ */ jsxs("div", { className: "overflow-hidden overflow-ellipsis md:mr-64", children: [
                    /* @__PURE__ */ jsx("h1", { className: "overflow-hidden overflow-ellipsis whitespace-nowrap text-xl md:text-3xl", children: title }),
                    subTitle && /* @__PURE__ */ jsx("div", { className: "mt-4", children: subTitle })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "mr-auto" }),
                  actions,
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "flat",
                      color: "primary",
                      type: "submit",
                      disabled: isLoading || !isDirty,
                      children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
                    }
                  )
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: wrapInContainer ? "container mx-auto px-24 pb-24" : void 0,
            children: /* @__PURE__ */ jsx("div", { className: "rounded", children })
          }
        )
      ]
    }
  );
}
const musicImage = "/assets/music-cae87f73.svg";
function useArtistPickerSuggestions(queryParams) {
  return useQuery({
    queryKey: ["artists", "search-suggestions", queryParams],
    queryFn: () => fetchArtists(queryParams),
    placeholderData: keepPreviousData
  });
}
async function fetchArtists(params) {
  return apiClient.get("search/suggestions/artist", { params }).then((r) => r.data);
}
function FormArtistPicker({ name, className }) {
  const { trans } = useTrans();
  const [inputValue, setInputValue] = useState("");
  const { data, isLoading } = useArtistPickerSuggestions({ query: inputValue });
  return /* @__PURE__ */ jsx(
    FormChipField,
    {
      className,
      name,
      label: /* @__PURE__ */ jsx(Trans, { message: "Artists" }),
      isAsync: true,
      inputValue,
      onInputValueChange: setInputValue,
      suggestions: data == null ? void 0 : data.results,
      placeholder: trans(message("+Add artist")),
      isLoading,
      allowCustomValue: false,
      children: data == null ? void 0 : data.results.map((result) => /* @__PURE__ */ jsx(
        Item,
        {
          value: result,
          startIcon: result.image ? /* @__PURE__ */ jsx(
            "img",
            {
              className: "rounded-full object-cover w-24 h-24",
              src: result.image,
              alt: ""
            }
          ) : void 0,
          children: result.name
        },
        result.id
      ))
    }
  );
}
function FormNormalizedModelChipField({
  name,
  label,
  placeholder,
  model,
  className,
  allowCustomValue = false
}) {
  const [inputValue, setInputValue] = useState("");
  const { data, isLoading } = useNormalizedModels(`normalized-models/${model}`, {
    query: inputValue
  });
  return /* @__PURE__ */ jsx(
    FormChipField,
    {
      className,
      name,
      label,
      isAsync: true,
      inputValue,
      onInputValueChange: setInputValue,
      suggestions: data == null ? void 0 : data.results,
      placeholder,
      isLoading,
      allowCustomValue,
      children: data == null ? void 0 : data.results.map((result) => /* @__PURE__ */ jsx(
        Item,
        {
          value: result,
          startIcon: result.image ? /* @__PURE__ */ jsx(
            "img",
            {
              className: "h-24 w-24 rounded-full object-cover",
              src: result.image,
              alt: ""
            }
          ) : void 0,
          children: result.name
        },
        result.id
      ))
    }
  );
}
const TAG_MODEL = "tag";
const FileUploadIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M18 15v3H6v-3H4v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3h-2zM7 9l1.41 1.41L11 7.83V16h2V7.83l2.59 2.58L17 9l-5-5-5 5z" }),
  "FileUploadOutlined"
);
function TrackUploadStatusText({ fileUpload, status, className }) {
  const bytesUploaded = (fileUpload == null ? void 0 : fileUpload.bytesUploaded) || 0;
  const totalBytes = useMemo(
    () => prettyBytes(fileUpload.file.size),
    [fileUpload.file.size]
  );
  const uploadedBytes = useMemo(
    () => prettyBytes(bytesUploaded),
    [bytesUploaded]
  );
  let statusMessage;
  if (status === "completed") {
    statusMessage = /* @__PURE__ */ jsx(Trans, { message: "Upload complete" });
  } else if (status === "aborted") {
    statusMessage = /* @__PURE__ */ jsx(Trans, { message: "Upload cancelled" });
  } else if (status === "failed") {
    statusMessage = /* @__PURE__ */ jsx(Trans, { message: "Upload failed" });
  } else if (status === "processing") {
    statusMessage = /* @__PURE__ */ jsx(Trans, { message: "Processing upload..." });
  } else if (status === "pending") {
    statusMessage = /* @__PURE__ */ jsx(Trans, { message: "Waiting to start..." });
  } else {
    statusMessage = /* @__PURE__ */ jsx(
      Trans,
      {
        message: ":bytesUploaded of :totalBytes uploaded",
        values: {
          bytesUploaded: uploadedBytes,
          totalBytes
        }
      }
    );
  }
  return /* @__PURE__ */ jsx("div", { className: clsx("text-muted text-xs", className), children: statusMessage });
}
function TrackUploadProgress({
  fileUpload,
  status,
  onAbort,
  size = "md",
  className
}) {
  return /* @__PURE__ */ jsxs("div", { className, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-24 justify-between", children: [
      /* @__PURE__ */ jsx(TrackUploadStatusText, { fileUpload, status }),
      /* @__PURE__ */ jsx(
        UploadStatusButton,
        {
          fileUpload,
          status,
          onAbort
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      ProgressBar,
      {
        size: size === "sm" ? "xs" : "sm",
        radius: "rounded-sm",
        value: fileUpload.percentage,
        isIndeterminate: status === "processing" || status === "pending"
      }
    )
  ] });
}
function UploadStatusButton({
  fileUpload,
  status,
  onAbort
}) {
  useFileUploadStore((s) => s.abortUpload);
  useFileUploadStore((s) => s.clearInactive);
  const errorMessage = fileUpload.errorMessage;
  let statusButton;
  if (status === "failed") {
    const errMessage = errorMessage || message("This file could not be uploaded");
    statusButton = /* @__PURE__ */ jsx(AnimatedStatus, { children: /* @__PURE__ */ jsx(Tooltip, { variant: "danger", label: /* @__PURE__ */ jsx(MixedText, { value: errMessage }), children: /* @__PURE__ */ jsx(ErrorIcon, { className: "text-danger", size: "sm" }) }) });
  } else if (status === "aborted") {
    statusButton = /* @__PURE__ */ jsx(AnimatedStatus, { children: /* @__PURE__ */ jsx(WarningIcon, { className: "text-warning", size: "sm" }) });
  } else if (status === "completed" || status === "processing") {
    statusButton = /* @__PURE__ */ jsx(AnimatedStatus, { children: /* @__PURE__ */ jsx(CheckCircleIcon, { size: "sm", className: "text-primary" }) });
  } else if (onAbort) {
    statusButton = /* @__PURE__ */ jsx(AnimatedStatus, { children: /* @__PURE__ */ jsx(IconButton, { size: "xs", onClick: () => onAbort(fileUpload.file.id), children: /* @__PURE__ */ jsx(CloseIcon, {}) }) });
  } else {
    statusButton = /* @__PURE__ */ jsx("div", { className: "w-30 h-30" });
  }
  return /* @__PURE__ */ jsx(AnimatePresence, { children: statusButton });
}
function AnimatedStatus({ children, ...domProps }) {
  return /* @__PURE__ */ jsx(
    m.div,
    {
      className: "flex w-30 h-30 items-center justify-center",
      ...domProps,
      initial: { scale: 0, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0, opacity: 0 },
      children
    }
  );
}
function useExtractTackFileMetadata() {
  return useMutation({
    mutationFn: (payload) => extractMeta(payload),
    onError: (err) => showHttpErrorToast(err)
  });
}
function extractMeta(payload) {
  return apiClient.post(`tracks/${payload.fileEntryId}/extract-metadata`, payload).then((r) => metadataToFormValues(r.data));
}
function metadataToFormValues(response) {
  const values = {
    name: response.metadata.title,
    duration: response.metadata.duration,
    genres: response.metadata.genres || [],
    description: response.metadata.comment,
    lyric: response.metadata.lyrics,
    release_date: response.metadata.release_date,
    album_name: response.metadata.album_name
  };
  if (response.metadata.album) {
    values.album_id = response.metadata.album.id;
  }
  if (response.metadata.artist) {
    values.artists = [response.metadata.artist];
  }
  if (response.metadata.image) {
    values.image = response.metadata.image.url;
  }
  return values;
}
function hydrateAlbumForm(form, data) {
  var _a2, _b2;
  if (!((_a2 = form.getValues("artists")) == null ? void 0 : _a2.length) && data.artists) {
    form.setValue("artists", data.artists);
  }
  if (!form.getValues("image") && data.image) {
    form.setValue("image", data.image);
  }
  if (data.release_date) {
    form.setValue("release_date", data.release_date);
  }
  if ((_b2 = data.genres) == null ? void 0 : _b2.length) {
    form.setValue(
      "genres",
      // @ts-ignore
      mergeArraysWithoutDuplicates(form.getValues("genres"), data.genres)
    );
  }
  if (!form.getValues("name") && data.album_name) {
    form.setValue("name", data.album_name);
  }
}
function mergeTrackFormValues(newValues, oldValues) {
  return {
    ...oldValues,
    ...newValues,
    artists: mergeArraysWithoutDuplicates(oldValues.artists, newValues.artists),
    genres: mergeArraysWithoutDuplicates(
      oldValues.genres,
      newValues.genres,
      "name"
    ),
    tags: mergeArraysWithoutDuplicates(oldValues.tags, newValues.tags, "name")
  };
}
function mergeArraysWithoutDuplicates(oldValues = [], newValues = [], key = "id") {
  newValues = newValues.filter(
    (nv) => !oldValues.find((ov) => ov[key] === nv[key])
  );
  return [...oldValues, ...newValues];
}
const FiftyMB = 50 * 1024 * 1024;
function useTrackUploader(options) {
  const { uploads } = useSettings();
  const restrictions = useMemo(
    () => ({
      allowedFileTypes: [UploadInputType.audio, UploadInputType.video],
      maxFileSize: uploads.max_size || FiftyMB
    }),
    [uploads.max_size]
  );
  const extractMetadata = useExtractTackFileMetadata();
  const optionsRef = useRef(options);
  optionsRef.current = options;
  const uploadMultiple = useFileUploadStore((s) => s.uploadMultiple);
  const updateFileUpload = useFileUploadStore((s) => s.updateFileUpload);
  const getUpload = useFileUploadStore((s) => s.getUpload);
  const updateUpload = useCallback(
    (uploadId, newMeta) => {
      var _a2;
      updateFileUpload(uploadId, {
        meta: {
          // @ts-ignore
          ...((_a2 = getUpload(uploadId)) == null ? void 0 : _a2.meta) || {},
          ...newMeta
        }
      });
    },
    [updateFileUpload, getUpload]
  );
  const uploadOptions = useMemo(() => {
    return {
      metadata: {
        diskPrefix: "track_media",
        disk: Disk.public
      },
      restrictions,
      onSuccess: (entry, file) => {
        updateUpload(file.id, { isExtractingMetadata: true });
        extractMetadata.mutate(
          {
            fileEntryId: entry.id,
            autoMatchAlbum: optionsRef.current.autoMatchAlbum
          },
          {
            onSuccess: (formValues) => {
              updateUpload(file.id, { isExtractingMetadata: false });
              const newValues = {
                ...formValues,
                src: entry.url
              };
              optionsRef.current.onMetadataChange(file, newValues);
            },
            onError: () => {
              updateUpload(file.id, { isExtractingMetadata: false });
            }
          }
        );
      },
      onError: (message2) => {
        if (message2) {
          toast.danger(message2);
        }
      }
    };
  }, [extractMetadata, updateUpload, restrictions]);
  const validateUploads = useCallback(
    (files) => {
      const validFiles = files.filter(
        (file) => !validateUpload(file, restrictions)
      );
      if (files.length !== validFiles.length) {
        toast.danger(
          message(":count of your files is not supported.", {
            values: { count: files.length - validFiles.length }
          })
        );
      }
      return validFiles;
    },
    [restrictions]
  );
  const uploadTracks = useCallback(
    async (files) => {
      const validFiles = validateUploads(files);
      if (!validFiles.length)
        return;
      files.forEach((file) => {
        var _a2, _b2;
        (_b2 = (_a2 = optionsRef.current).onUploadStart) == null ? void 0 : _b2.call(_a2, {
          name: file.name,
          uploadId: file.id
        });
      });
      uploadMultiple(files, uploadOptions);
      for (const file of files) {
        updateUpload(file.id, { isGeneratingWave: true });
        const waveData = await generateWaveformData(file.native);
        if (waveData) {
          optionsRef.current.onMetadataChange(file, { waveData });
        }
        updateUpload(file.id, { isGeneratingWave: false });
      }
    },
    [uploadOptions, uploadMultiple, updateUpload, validateUploads]
  );
  const openFilePicker = useCallback(async () => {
    const files = await openUploadWindow({
      multiple: true,
      types: restrictions.allowedFileTypes
    });
    await uploadTracks(files);
  }, [uploadTracks, restrictions]);
  return { openFilePicker, uploadTracks, validateUploads };
}
function useTrackUpload(uploadId) {
  const upload = useFileUploadStore(
    (s) => uploadId ? s.fileUploads.get(uploadId) : null
  );
  let isUploading = false;
  let status;
  if (upload) {
    const meta = upload.meta;
    const isProcessing = (meta == null ? void 0 : meta.isExtractingMetadata) || (meta == null ? void 0 : meta.isGeneratingWave);
    isUploading = (upload == null ? void 0 : upload.status) === "pending" || (upload == null ? void 0 : upload.status) === "inProgress" || !!isProcessing;
    status = (upload == null ? void 0 : upload.status) === "completed" && isProcessing ? "processing" : upload == null ? void 0 : upload.status;
  }
  return { isUploading, status, activeUpload: upload };
}
function TrackFormUploadButton() {
  const [uploadId, setUploadId] = useState();
  const { setValue, watch, getValues } = useFormContext();
  const { openFilePicker } = useTrackUploader({
    onUploadStart: ({ uploadId: uploadId2 }) => setUploadId(uploadId2),
    onMetadataChange: (file, newData) => {
      const mergedValues = mergeTrackFormValues(newData, getValues());
      Object.entries(mergedValues).forEach(
        ([key, value]) => setValue(key, value, { shouldDirty: true })
      );
    }
  });
  const { status, isUploading, activeUpload } = useTrackUpload(uploadId);
  const { abortUpload, clearInactive } = useFileUploadStore();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        className: "w-full",
        variant: "flat",
        color: "primary",
        startIcon: /* @__PURE__ */ jsx(FileUploadIcon, {}),
        disabled: isUploading,
        onClick: () => openFilePicker(),
        children: watch("src") ? /* @__PURE__ */ jsx(Trans, { message: "Replace file" }) : /* @__PURE__ */ jsx(Trans, { message: "Upload file" })
      }
    ),
    activeUpload && /* @__PURE__ */ jsx(
      TrackUploadProgress,
      {
        fileUpload: activeUpload,
        status,
        className: "mt-24",
        onAbort: (uploadId2) => {
          abortUpload(uploadId2);
          clearInactive();
        }
      }
    )
  ] });
}
function TrackForm({
  showExternalIdFields,
  showAlbumField = true,
  uploadButton
}) {
  const { trans } = useTrans();
  const isMobile = useIsMobileMediaQuery();
  return /* @__PURE__ */ jsxs("div", { className: "gap-24 md:flex", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex-shrink-0", children: [
      /* @__PURE__ */ jsx(
        FormImageSelector,
        {
          name: "image",
          diskPrefix: "track_image",
          variant: isMobile ? "input" : "square",
          label: isMobile ? /* @__PURE__ */ jsx(Trans, { message: "Image" }) : null,
          previewSize: isMobile ? void 0 : "w-full md:w-224 aspect-square",
          stretchPreview: true
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "mt-24", children: uploadButton ? uploadButton : /* @__PURE__ */ jsx(TrackFormUploadButton, {}) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-24 flex-auto md:mt-0", children: [
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          name: "name",
          label: /* @__PURE__ */ jsx(Trans, { message: "Name" }),
          className: "mb-24",
          required: true,
          autoFocus: true
        }
      ),
      showAlbumField && /* @__PURE__ */ jsx(
        FormNormalizedModelField,
        {
          className: "mb-24",
          label: /* @__PURE__ */ jsx(Trans, { message: "Album" }),
          name: "album_id",
          endpoint: "search/suggestions/album"
        }
      ),
      /* @__PURE__ */ jsx(FormArtistPicker, { name: "artists", className: "mb-24" }),
      /* @__PURE__ */ jsx(
        FormNormalizedModelChipField,
        {
          label: /* @__PURE__ */ jsx(Trans, { message: "Genres" }),
          placeholder: trans(message("+Add genre")),
          model: GENRE_MODEL,
          name: "genres",
          allowCustomValue: true,
          className: "mb-24"
        }
      ),
      /* @__PURE__ */ jsx(
        FormNormalizedModelChipField,
        {
          label: /* @__PURE__ */ jsx(Trans, { message: "Tags" }),
          placeholder: trans(message("+Add tag")),
          model: TAG_MODEL,
          name: "tags",
          allowCustomValue: true,
          className: "mb-24"
        }
      ),
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          name: "description",
          label: /* @__PURE__ */ jsx(Trans, { message: "Description" }),
          inputElementType: "textarea",
          rows: 5,
          className: "mb-24"
        }
      ),
      /* @__PURE__ */ jsx(DurationField, {}),
      showExternalIdFields && /* @__PURE__ */ jsx(SourceField, {}),
      showExternalIdFields && /* @__PURE__ */ jsx(SpotifyIdField$2, {})
    ] })
  ] });
}
function SourceField() {
  return /* @__PURE__ */ jsx(
    FormTextField,
    {
      name: "src",
      label: /* @__PURE__ */ jsx(Trans, { message: "Playback source" }),
      className: "mb-24",
      minLength: 1,
      maxLength: 230,
      description: /* @__PURE__ */ jsx(Trans, { message: "Supports audio, video, hls/dash stream and youtube video url. If left empty, best matching youtube video will be found automatically." })
    }
  );
}
function SpotifyIdField$2() {
  const { spotify_is_setup } = useSettings();
  if (!spotify_is_setup) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    FormTextField,
    {
      name: "spotify_id",
      label: /* @__PURE__ */ jsx(Trans, { message: "Spotify ID" }),
      className: "mb-24",
      minLength: 22,
      maxLength: 22
    }
  );
}
function DurationField() {
  const { watch } = useFormContext();
  return /* @__PURE__ */ jsx(
    FormTextField,
    {
      required: true,
      name: "duration",
      label: /* @__PURE__ */ jsx(Trans, { message: "Duration (in milliseconds)" }),
      className: "mb-24",
      type: "number",
      min: 1,
      max: 864e5,
      description: /* @__PURE__ */ jsx(
        Trans,
        {
          message: "Will appear on the site as: :preview",
          values: { preview: /* @__PURE__ */ jsx(FormattedDuration, { ms: watch("duration") }) }
        }
      )
    }
  );
}
const endpoint$2 = "tracks";
function useCreateTrack(form, { onSuccess } = {}) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (payload) => createTrack(payload),
    onSuccess: (response) => {
      toast(trans(message("Track created")));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey(endpoint$2)
      });
      onSuccess == null ? void 0 : onSuccess(response);
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function createTrack(payload) {
  return apiClient.post(endpoint$2, prepareTrackPayload(payload)).then((r) => r.data);
}
function prepareTrackPayload(payload) {
  var _a2;
  return {
    ...payload,
    album_id: payload.album_id ? payload.album_id : null,
    artists: (_a2 = payload.artists) == null ? void 0 : _a2.map((artist) => artist.id)
  };
}
function useCreateTrackForm({
  onTrackCreated,
  defaultValues
} = {}) {
  const form = useForm({
    defaultValues
  });
  const createTrack2 = useCreateTrack(form, { onSuccess: onTrackCreated });
  return { form, createTrack: createTrack2 };
}
function CreateTrackPage({ wrapInContainer }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { form, createTrack: createTrack2 } = useCreateTrackForm({
    onTrackCreated: (response) => {
      if (pathname.includes("admin")) {
        navigate(`/admin/tracks/${response.track.id}/edit`);
      } else {
        navigate(getTrackLink(response.track));
      }
    }
  });
  return /* @__PURE__ */ jsx(
    CrupdateResourceLayout,
    {
      form,
      onSubmit: (values) => {
        createTrack2.mutate(values);
      },
      title: /* @__PURE__ */ jsx(Trans, { message: "Add new track" }),
      isLoading: createTrack2.isPending,
      disableSaveWhenNotDirty: true,
      wrapInContainer,
      children: /* @__PURE__ */ jsx(FileUploadProvider, { children: /* @__PURE__ */ jsx(TrackForm, { showExternalIdFields: true }) })
    }
  );
}
const Endpoint$2 = (id) => `tracks/${id}`;
function useUpdateTrack(form, options = {}) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (payload) => updateChannel(payload),
    onSuccess: (response) => {
      var _a2;
      toast(trans(message("Track updated")));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("tracks")
      });
      (_a2 = options.onSuccess) == null ? void 0 : _a2.call(options, response);
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function updateChannel({
  id,
  ...payload
}) {
  return apiClient.put(Endpoint$2(id), prepareTrackPayload(payload)).then((r) => r.data);
}
function useUpdateTrackForm(track, options = {}) {
  var _a2;
  const form = useForm({
    defaultValues: {
      ...track,
      image: track.image || ((_a2 = track.album) == null ? void 0 : _a2.image)
    }
  });
  const updateTrack = useUpdateTrack(form, { onSuccess: options.onTrackUpdated });
  return { form, updateTrack };
}
function UpdateTrackPage({ wrapInContainer }) {
  const query = useTrack({ loader: "editTrackPage" });
  if (query.data) {
    return /* @__PURE__ */ jsx(PageContent$3, { track: query.data.track, wrapInContainer });
  }
  return /* @__PURE__ */ jsx(
    PageStatus,
    {
      query,
      loaderClassName: "absolute inset-0 m-auto",
      loaderIsScreen: false
    }
  );
}
function PageContent$3({ track, wrapInContainer }) {
  const { canEdit } = useTrackPermissions([track]);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { form, updateTrack } = useUpdateTrackForm(track, {
    onTrackUpdated: (response) => {
      if (pathname.includes("admin")) {
        navigate("/admin/tracks");
      } else {
        navigate(getTrackLink(response.track));
      }
    }
  });
  if (!canEdit) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/", replace: true });
  }
  return /* @__PURE__ */ jsx(
    CrupdateResourceLayout,
    {
      form,
      onSubmit: (values) => {
        updateTrack.mutate(values);
      },
      title: /* @__PURE__ */ jsx(Trans, { message: "Edit “:name“ track", values: { name: track.name } }),
      isLoading: updateTrack.isPending,
      disableSaveWhenNotDirty: true,
      wrapInContainer,
      children: /* @__PURE__ */ jsx(FileUploadProvider, { children: /* @__PURE__ */ jsx(TrackForm, { showExternalIdFields: true }) })
    }
  );
}
const endpoint$1 = "albums";
function useCreateAlbum(form) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (payload) => createAlbum(payload),
    onSuccess: () => {
      toast(trans(message("Album created")));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey(endpoint$1)
      });
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function createAlbum(payload) {
  return apiClient.post(endpoint$1, prepareAlbumPayload(payload)).then((r) => r.data);
}
function prepareAlbumPayload(payload) {
  var _a2, _b2;
  return {
    ...payload,
    artists: (_a2 = payload.artists) == null ? void 0 : _a2.map((artist) => artist.id),
    tracks: (_b2 = payload.tracks) == null ? void 0 : _b2.map((track) => prepareTrackPayload(track))
  };
}
const Endpoint$1 = (id) => `albums/${id}`;
function useUpdateAlbum(form, albumId) {
  const { trans } = useTrans();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return useMutation({
    mutationFn: (payload) => updateAlbum$1(albumId, payload),
    onSuccess: (response) => {
      toast(trans(message("Album updated")));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("albums")
      });
      if (pathname.includes("admin")) {
        navigate("/admin/albums");
      } else {
        navigate(getAlbumLink(response.album));
      }
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function updateAlbum$1(id, payload) {
  return apiClient.put(Endpoint$1(id), prepareAlbumPayload(payload)).then((r) => r.data);
}
function UpdateTrackDialog({ track, hideAlbumField }) {
  const { formId, close } = useDialogContext();
  const { form } = useUpdateTrackForm(track);
  return /* @__PURE__ */ jsxs(Dialog, { size: "fullscreen", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Edit “:name“ track", values: { name: track.name } }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      Form,
      {
        id: formId,
        form,
        onSubmit: (values) => {
          close(values);
        },
        onBeforeSubmit: () => {
          form.clearErrors();
        },
        children: /* @__PURE__ */ jsx(TrackForm, { showExternalIdFields: true, showAlbumField: !hideAlbumField })
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { variant: "text", onClick: () => close(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(Button, { form: formId, variant: "flat", color: "primary", type: "submit", children: /* @__PURE__ */ jsx(Trans, { message: "Update" }) })
    ] })
  ] });
}
function CreateTrackDialog({ defaultValues, hideAlbumField }) {
  const { formId, close } = useDialogContext();
  const { form } = useCreateTrackForm({ defaultValues });
  return /* @__PURE__ */ jsxs(Dialog, { size: "fullscreen", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Add new track" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      Form,
      {
        id: formId,
        form,
        onSubmit: (values) => {
          close(values);
        },
        onBeforeSubmit: () => {
          form.clearErrors();
        },
        children: /* @__PURE__ */ jsx(TrackForm, { showExternalIdFields: true, showAlbumField: !hideAlbumField })
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { variant: "text", onClick: () => close(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(Button, { form: formId, variant: "flat", color: "primary", type: "submit", children: /* @__PURE__ */ jsx(Trans, { message: "Create" }) })
    ] })
  ] });
}
function AlbumTracksForm() {
  const form = useFormContext();
  const { watch, setValue, getValues } = form;
  const { fields, remove, prepend, move } = useFieldArray({
    name: "tracks"
  });
  const updateTrack = (uploadId, newValues) => {
    var _a2;
    const index = (_a2 = getValues("tracks")) == null ? void 0 : _a2.findIndex((f) => f.uploadId === uploadId);
    if (index != null) {
      setValue(
        `tracks.${index}`,
        mergeTrackFormValues(newValues, getValues(`tracks.${index}`)),
        { shouldDirty: true }
      );
    }
  };
  const { openFilePicker } = useTrackUploader({
    onUploadStart: (data) => prepend(
      // newly uploaded track should inherit album artists, genres and tags
      mergeTrackFormValues(data, {
        artists: form.getValues("artists"),
        genres: form.getValues("genres"),
        tags: form.getValues("tags")
      })
    ),
    onMetadataChange: (file, newData) => {
      hydrateAlbumForm(form, newData);
      updateTrack(file.id, newData);
    }
  });
  const tracks = watch("tracks") || [];
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "my-24 text-xl font-semibold", children: /* @__PURE__ */ jsx(Trans, { message: "Tracks" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          color: "primary",
          size: "xs",
          className: "ml-auto",
          startIcon: /* @__PURE__ */ jsx(FileUploadIcon, {}),
          onClick: () => openFilePicker(),
          children: /* @__PURE__ */ jsx(Trans, { message: "Upload tracks" })
        }
      ),
      /* @__PURE__ */ jsxs(
        DialogTrigger,
        {
          type: "modal",
          onClose: (newTrack) => {
            if (newTrack) {
              prepend(newTrack);
            }
          },
          children: [
            /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Create track" }), children: /* @__PURE__ */ jsx(IconButton, { variant: "outline", color: "primary", size: "xs", children: /* @__PURE__ */ jsx(AddIcon, {}) }) }),
            /* @__PURE__ */ jsx(
              CreateTrackDialog,
              {
                hideAlbumField: true,
                defaultValues: {
                  artists: watch("artists"),
                  tags: watch("tags"),
                  genres: watch("genres")
                }
              }
            )
          ]
        }
      )
    ] }),
    fields.map((field, index) => {
      const track = tracks[index];
      return /* @__PURE__ */ jsx(
        TrackItem,
        {
          track,
          onRemove: () => remove(index),
          onSort: (oldIndex, newIndex) => move(oldIndex, newIndex),
          tracks,
          onUpdate: (newValues) => {
            updateTrack(track.uploadId, newValues);
          }
        },
        field.id
      );
    }),
    !fields.length ? /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        className: "mt-40",
        image: /* @__PURE__ */ jsx(SvgImage, { src: musicImage }),
        title: /* @__PURE__ */ jsx(Trans, { message: "This album does not have any tracks yet" })
      }
    ) : null
  ] });
}
function TrackItem({
  track,
  tracks,
  onRemove,
  onUpdate,
  onSort
}) {
  const ref = useRef(null);
  const previewRef = useRef(null);
  const abortUpload = useFileUploadStore((s) => s.abortUpload);
  const activeUpload = useFileUploadStore((s) => {
    return track.uploadId ? s.fileUploads.get(track.uploadId) : null;
  });
  const { isUploading, status } = useTrackUpload(track.uploadId);
  const { sortableProps } = useSortable({
    disabled: isUploading,
    ref,
    item: track,
    items: tracks,
    type: "albumFormTrack",
    preview: previewRef,
    strategy: "line",
    onSortEnd: (oldIndex, newIndex) => {
      onSort(oldIndex, newIndex);
    }
  });
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "border-b border-t border-t-transparent py-4",
      ref,
      ...sortableProps,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm", children: [
          /* @__PURE__ */ jsx(IconButton, { className: "mr-14 flex-shrink-0", disabled: isUploading, children: /* @__PURE__ */ jsx(DragHandleIcon, {}) }),
          /* @__PURE__ */ jsx("div", { className: "flex-auto overflow-hidden overflow-ellipsis whitespace-nowrap", children: track.name }),
          activeUpload && /* @__PURE__ */ jsxs("div", { className: "mr-10 flex items-center", children: [
            /* @__PURE__ */ jsx(
              TrackUploadStatusText,
              {
                fileUpload: activeUpload,
                status,
                className: "mr-10"
              }
            ),
            /* @__PURE__ */ jsx(
              ProgressCircle,
              {
                isIndeterminate: status === "processing",
                value: activeUpload.percentage,
                size: "sm"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            DialogTrigger,
            {
              type: "modal",
              onClose: (updatedTrack) => {
                if (updatedTrack) {
                  onUpdate(updatedTrack);
                }
              },
              children: [
                /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Edit track" }), children: /* @__PURE__ */ jsx(
                  IconButton,
                  {
                    className: "ml-auto flex-shrink-0 text-muted",
                    disabled: isUploading,
                    children: /* @__PURE__ */ jsx(EditIcon, {})
                  }
                ) }),
                /* @__PURE__ */ jsx(UpdateTrackDialog, { track, hideAlbumField: true })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            DialogTrigger,
            {
              type: "modal",
              onClose: (isConfirmed) => {
                if (isConfirmed) {
                  if (track.uploadId) {
                    abortUpload(track.uploadId);
                  }
                  onRemove();
                }
              },
              children: [
                /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Remove track" }), children: /* @__PURE__ */ jsx(IconButton, { className: "flex-shrink-0 text-muted", children: /* @__PURE__ */ jsx(CloseIcon, {}) }) }),
                /* @__PURE__ */ jsx(
                  ConfirmationDialog,
                  {
                    isDanger: true,
                    title: /* @__PURE__ */ jsx(Trans, { message: "Remove track" }),
                    body: /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to remove this track from the album?" }),
                    confirm: /* @__PURE__ */ jsx(Trans, { message: "Remove" })
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx(RowDragPreview, { track, ref: previewRef })
      ]
    }
  );
}
const RowDragPreview = React.forwardRef(
  ({ track }, ref) => {
    var _a2, _b2;
    let content = track.name;
    if ((_a2 = track.artists) == null ? void 0 : _a2.length) {
      content += `- ${(_b2 = track.artists) == null ? void 0 : _b2[0].name}`;
    }
    return /* @__PURE__ */ jsx(DragPreview, { ref, children: () => /* @__PURE__ */ jsx("div", { className: "rounded bg-chip p-8 text-sm shadow", children: content }) });
  }
);
function AlbumForm({ showExternalIdFields }) {
  const { trans } = useTrans();
  const isMobile = useIsMobileMediaQuery();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "gap-24 md:flex", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx(
        FormImageSelector,
        {
          name: "image",
          diskPrefix: "album_images",
          label: isMobile ? /* @__PURE__ */ jsx(Trans, { message: "Image" }) : null,
          variant: isMobile ? "input" : "square",
          previewSize: "md:w-full md:w-224 md:aspect-square",
          stretchPreview: true
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-24 flex-auto md:mt-0", children: [
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            name: "name",
            label: /* @__PURE__ */ jsx(Trans, { message: "Name" }),
            className: "mb-24",
            required: true,
            autoFocus: true
          }
        ),
        /* @__PURE__ */ jsx(
          FormDatePicker,
          {
            name: "release_date",
            label: /* @__PURE__ */ jsx(Trans, { message: "Release date" }),
            className: "mb-24",
            granularity: "day"
          }
        ),
        /* @__PURE__ */ jsx(FormArtistPicker, { name: "artists", className: "mb-24" }),
        /* @__PURE__ */ jsx(
          FormNormalizedModelChipField,
          {
            label: /* @__PURE__ */ jsx(Trans, { message: "Genres" }),
            placeholder: trans(message("+Add genre")),
            model: GENRE_MODEL,
            name: "genres",
            allowCustomValue: true,
            className: "mb-24"
          }
        ),
        /* @__PURE__ */ jsx(
          FormNormalizedModelChipField,
          {
            label: /* @__PURE__ */ jsx(Trans, { message: "Tags" }),
            placeholder: trans(message("+Add tag")),
            model: TAG_MODEL,
            name: "tags",
            allowCustomValue: true,
            className: "mb-24"
          }
        ),
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            name: "description",
            label: /* @__PURE__ */ jsx(Trans, { message: "Description" }),
            inputElementType: "textarea",
            rows: 5,
            className: "mb-24"
          }
        ),
        showExternalIdFields && /* @__PURE__ */ jsx(SpotifyIdField$1, {})
      ] })
    ] }),
    /* @__PURE__ */ jsx(AlbumTracksForm, {})
  ] });
}
function SpotifyIdField$1() {
  const { spotify_is_setup } = useSettings();
  if (!spotify_is_setup) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    FormTextField,
    {
      name: "spotify_id",
      label: /* @__PURE__ */ jsx(Trans, { message: "Spotify ID" }),
      className: "mb-24",
      minLength: 22,
      maxLength: 22
    }
  );
}
function UpdateAlbumPage({ wrapInContainer }) {
  const query = useAlbum({ loader: "editAlbumPage" });
  if (query.data) {
    return /* @__PURE__ */ jsx(FileUploadProvider, { children: /* @__PURE__ */ jsx(
      PageContent$2,
      {
        album: query.data.album,
        wrapInContainer
      }
    ) });
  }
  return /* @__PURE__ */ jsx(
    PageStatus,
    {
      query,
      loaderIsScreen: false,
      loaderClassName: "absolute inset-0 m-auto"
    }
  );
}
function PageContent$2({ album, wrapInContainer }) {
  const { canEdit } = useAlbumPermissions(album);
  const uploadIsInProgress = !!useFileUploadStore((s) => s.activeUploadsCount);
  const form = useForm({
    defaultValues: {
      image: album.image,
      name: album.name,
      release_date: album.release_date,
      artists: album.artists,
      genres: album.genres,
      tags: album.tags,
      description: album.description,
      spotify_id: album.spotify_id,
      tracks: album.tracks
    }
  });
  const updateAlbum2 = useUpdateAlbum(form, album.id);
  if (!canEdit) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/", replace: true });
  }
  return /* @__PURE__ */ jsx(
    CrupdateResourceLayout,
    {
      form,
      onSubmit: (values) => {
        updateAlbum2.mutate(values);
      },
      title: /* @__PURE__ */ jsx(Trans, { message: "Edit “:name“ album", values: { name: album.name } }),
      isLoading: updateAlbum2.isPending || uploadIsInProgress,
      disableSaveWhenNotDirty: true,
      wrapInContainer,
      children: /* @__PURE__ */ jsx(AlbumForm, { showExternalIdFields: true })
    }
  );
}
const AlbumUploader = forwardRef(
  ({ onUploadStart, onCancel, onCreate }, ref) => {
    const userArtist = usePrimaryArtistForCurrentUser();
    const now2 = useCurrentDateTime();
    const [isVisible, setIsVisible] = useState(false);
    const form = useForm({
      defaultValues: {
        tracks: [],
        artists: userArtist ? [userArtist] : [],
        release_date: now2.toAbsoluteString()
      }
    });
    const tracks = form.watch("tracks") || [];
    const abortUpload = useFileUploadStore((s) => s.abortUpload);
    const uploadIsInProgress = !!useFileUploadStore((s) => s.activeUploadsCount);
    const { openFilePicker, uploadTracks, validateUploads } = useTrackUploader({
      onUploadStart: (data) => {
        setIsVisible(true);
        form.setValue("tracks", [...form.getValues("tracks"), data]);
        onUploadStart();
      },
      onMetadataChange: (file, newData) => {
        hydrateAlbumForm(form, newData);
        form.setValue(
          "tracks",
          form.getValues("tracks").map((track) => {
            return track.uploadId === file.id ? mergeTrackFormValues(newData, track) : track;
          })
        );
      }
    });
    useImperativeHandle(
      ref,
      () => ({
        openFilePicker,
        uploadTracks,
        validateUploads
      }),
      [openFilePicker, uploadTracks, validateUploads]
    );
    const createAlbum2 = useCreateAlbum(form);
    return isVisible ? /* @__PURE__ */ jsxs(
      Form,
      {
        className: "rounded border p-14 md:p-24 mb-30 bg-background",
        form,
        onSubmit: (newValues) => createAlbum2.mutate(newValues, {
          onSuccess: (response) => {
            setIsVisible(false);
            form.reset();
            onCreate(response.album);
          }
        }),
        children: [
          /* @__PURE__ */ jsx(AlbumForm, { showExternalIdFields: false }),
          /* @__PURE__ */ jsxs("div", { className: "mt-24", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "text",
                onClick: () => {
                  tracks.forEach((track) => {
                    abortUpload(track.uploadId);
                  });
                  form.reset();
                  setIsVisible(false);
                  onCancel();
                },
                className: "mr-10",
                children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" })
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "submit",
                variant: "flat",
                color: "primary",
                disabled: uploadIsInProgress || createAlbum2.isPending,
                children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
              }
            )
          ] })
        ]
      }
    ) : null;
  }
);
const TracksUploader = forwardRef(
  ({ onUploadStart, onCancel, onCreate }, ref) => {
    const userArtist = usePrimaryArtistForCurrentUser();
    const abortUpload = useFileUploadStore((s) => s.abortUpload);
    const [tracks, setTracks] = useState([]);
    const { openFilePicker, uploadTracks, validateUploads } = useTrackUploader({
      onUploadStart: (data) => {
        setTracks((prev) => {
          if (userArtist) {
            return [...prev, { ...data, artists: [userArtist] }];
          }
          return [...prev, data];
        });
        onUploadStart();
      },
      onMetadataChange: (file, newData) => {
        setTracks((allTracks) => {
          return allTracks.map((track) => {
            return track.uploadId === file.id ? mergeTrackFormValues(newData, track) : track;
          });
        });
      }
    });
    useImperativeHandle(
      ref,
      () => ({
        openFilePicker,
        uploadTracks,
        validateUploads
      }),
      [openFilePicker, uploadTracks, validateUploads]
    );
    return /* @__PURE__ */ jsx("div", { className: "w-full", children: tracks.map((track) => /* @__PURE__ */ jsx(
      TrackUploadItem,
      {
        track,
        onCreate: (createdTrack) => {
          setTracks(
            (prev) => prev.filter((t) => t.uploadId !== track.uploadId)
          );
          onCreate(createdTrack);
        },
        onRemove: () => {
          setTracks((prev) => {
            const newTracks = prev.filter(
              (t) => t.uploadId !== track.uploadId
            );
            if (!newTracks.length) {
              onCancel();
            }
            return newTracks;
          });
          abortUpload(track.uploadId);
        }
      },
      track.uploadId
    )) });
  }
);
const TrackUploadItem = memo(
  ({ track, onRemove, onCreate }) => {
    const form = useForm({
      defaultValues: track
    });
    const createTrack2 = useCreateTrack(form);
    const activeUpload = useFileUploadStore(
      (s) => s.fileUploads.get(track.uploadId)
    );
    const { isUploading, status } = useTrackUpload(track.uploadId);
    useEffect(() => {
      form.reset(track);
    }, [track, form]);
    const uploadProgress = isUploading && activeUpload ? /* @__PURE__ */ jsx(TrackUploadProgress, { fileUpload: activeUpload, status }) : null;
    return /* @__PURE__ */ jsxs(
      Form,
      {
        form,
        onSubmit: (values) => {
          createTrack2.mutate(values, {
            onSuccess: (response) => onCreate(response.track)
          });
        },
        className: "rounded border p-14 md:p-24 mb-30 bg-background",
        children: [
          /* @__PURE__ */ jsx(TrackForm, { uploadButton: uploadProgress, showExternalIdFields: false }),
          /* @__PURE__ */ jsx(Button, { variant: "text", onClick: () => onRemove(), className: "mr-10", children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "submit",
              variant: "flat",
              color: "primary",
              disabled: createTrack2.isPending || !form.watch("src"),
              children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
            }
          )
        ]
      }
    );
  }
);
const albumBorderImage = "/assets/album-border-b5dd7d9f.png";
function UploadedMediaPreview({ media }) {
  var _a2, _b2;
  const isAlbum = media.model_type === ALBUM_MODEL;
  const absoluteLink = isAlbum ? getAlbumLink(media, { absolute: true }) : getTrackLink(media, { absolute: true });
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-28 border rounded bg-background p-20 my-20 mx-auto w-780 max-w-full", children: [
    /* @__PURE__ */ jsxs("div", { className: clsx(isAlbum && "relative isolate my-14 mx-18"), children: [
      isAlbum ? /* @__PURE__ */ jsx(
        AlbumImage,
        {
          album: media,
          className: "rounded flex-shrink-0 z-20 relative",
          size: "w-132 h-132"
        }
      ) : /* @__PURE__ */ jsx(
        TrackImage,
        {
          track: media,
          className: "rounded flex-shrink-0 z-20 relative",
          size: "w-132 h-132"
        }
      ),
      isAlbum && /* @__PURE__ */ jsx(
        "img",
        {
          className: "absolute block w-160 h-160 max-w-160 -top-14 -left-14 z-10",
          src: albumBorderImage,
          alt: ""
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-auto", children: [
      /* @__PURE__ */ jsx("div", { className: "text-base font-bold", children: media.name }),
      /* @__PURE__ */ jsx("div", { className: "text-muted text-sm mb-14", children: /* @__PURE__ */ jsx(ArtistLinks, { artists: media.artists }) }),
      ((_a2 = media.genres) == null ? void 0 : _a2.length) ? /* @__PURE__ */ jsx(ChipList, { selectable: false, size: "sm", className: "mb-14", children: (_b2 = media.genres) == null ? void 0 : _b2.map((genre) => {
        return /* @__PURE__ */ jsx(Chip, { children: genre.display_name || genre.name }, genre.id);
      }) }) : null,
      /* @__PURE__ */ jsx("div", { className: "text-sm", children: /* @__PURE__ */ jsx(
        Trans,
        {
          message: "Upload complete. <a>Go to your track</a>",
          values: {
            a: (parts) => /* @__PURE__ */ jsx(
              Link,
              {
                className: LinkStyle,
                to: isAlbum ? getAlbumLink(media) : getTrackLink(media),
                children: parts
              }
            )
          }
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "ml-auto flex-auto max-w-300", children: /* @__PURE__ */ jsxs("div", { className: "text-muted text-sm", children: [
      /* @__PURE__ */ jsx(Trans, { message: "Share your new track" }),
      /* @__PURE__ */ jsx(
        ShareMediaButtons,
        {
          name: media.name,
          image: media.image,
          link: absoluteLink
        }
      ),
      /* @__PURE__ */ jsx(
        TextField,
        {
          value: absoluteLink,
          readOnly: true,
          className: "mt-24 w-full",
          size: "sm",
          onClick: (e) => {
            e.target.select();
          }
        }
      )
    ] }) })
  ] });
}
function DropTargetMask({ isVisible }) {
  const mask = /* @__PURE__ */ jsx(
    m.div,
    {
      ...opacityAnimation,
      transition: { duration: 0.3 },
      className: "absolute inset-0 w-full min-h-full bg-primary-light/30 border-2 border-dashed border-primary pointer-events-none",
      children: /* @__PURE__ */ jsx(
        m.div,
        {
          initial: { y: "100%", opacity: 0 },
          animate: { y: "-10px", opacity: 1 },
          exit: { y: "100%", opacity: 0 },
          className: "p-10 bg-primary text-on-primary fixed bottom-0 left-0 right-0 max-w-max mx-auto rounded",
          children: /* @__PURE__ */ jsx(Trans, { message: "Drop your files anywhere on the page to upload" })
        }
      )
    },
    "dragTargetMask"
  );
  return /* @__PURE__ */ jsx(AnimatePresence, { children: isVisible ? mask : null });
}
function resetMinutesLimitQuery() {
  const { user } = getBootstrapData();
  if (user == null ? void 0 : user.id) {
    queryClient.resetQueries({ queryKey: ["minutesLimit", user.id] });
  }
}
function useUserMinutesLimit() {
  const { user } = useAuth();
  const userId = user == null ? void 0 : user.id;
  return useQuery({
    queryKey: ["minutesLimit", userId],
    queryFn: () => fetchLimit(userId),
    enabled: userId != null
  });
}
function fetchLimit(userId) {
  return apiClient.get(`users/${userId}/minutes-left`).then((response) => response.data);
}
function BackstageLayout({ children, ...domProps }) {
  useIsDarkMode();
  const { player } = useSettings();
  useIsMobileMediaQuery();
  return /* @__PURE__ */ jsx("div", { className: "flex h-screen flex-col", ...domProps, children: /* @__PURE__ */ jsxs(
    DashboardLayout,
    {
      name: "web-player",
      initialRightSidenavStatus: (player == null ? void 0 : player.hide_queue) ? "closed" : "open",
      children: [
        /* @__PURE__ */ jsx(
          PlayerNavbarLayout,
          {
            size: "sm",
            menuPosition: "pricing-table-page",
            className: "flex-shrink-0"
          }
        ),
        /* @__PURE__ */ jsx(SidedavFrontend, { position: "left", display: "block", children: /* @__PURE__ */ jsx(Sidenav, {}) }),
        /* @__PURE__ */ jsx(DashboardContent, { children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "relative flex-auto overflow-y-auto",
            children: /* @__PURE__ */ jsx("div", { className: "container mx-auto flex min-h-full flex-col p-14 md:p-24", children: /* @__PURE__ */ jsx("div", { className: "flex-auto", children }) })
          }
        ) })
      ]
    }
  ) });
}
function UploadPage({ backstageLayout = true }) {
  return /* @__PURE__ */ jsx(FileUploadProvider, { children: /* @__PURE__ */ jsx(Content, { backstageLayout }) });
}
function Content({ backstageLayout }) {
  const [uploadMode, setUploadMode] = useState("tracks");
  const [modeIsLocked, setModeIsLocked] = useState(false);
  const uploaderRef = useRef(null);
  const Uploader = uploadMode === "tracks" ? TracksUploader : AlbumUploader;
  const [createdItems, setCreatedItems] = useState([]);
  const ref = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const { droppableProps } = useDroppable({
    id: "uploadPageRoot",
    ref,
    types: ["nativeFile"],
    onDragEnter: () => setIsDragOver(true),
    onDragLeave: () => setIsDragOver(false),
    onDrop: async (draggable) => {
      var _a2, _b2;
      if (draggable.type === "nativeFile") {
        const files = await draggable.getData();
        const validFiles = (_a2 = uploaderRef.current) == null ? void 0 : _a2.validateUploads(files);
        if (validFiles == null ? void 0 : validFiles.length) {
          (_b2 = uploaderRef.current) == null ? void 0 : _b2.uploadTracks(validFiles);
        }
      }
    }
  });
  const Wrapper = backstageLayout ? BackstageLayout : DefaultWrapper;
  return /* @__PURE__ */ jsxs(Wrapper, { ...droppableProps, children: [
    !modeIsLocked && /* @__PURE__ */ jsx(
      UploadPanel,
      {
        onUpload: () => {
          var _a2;
          return (_a2 = uploaderRef.current) == null ? void 0 : _a2.openFilePicker();
        },
        uploadMode,
        onUploadModeChange: setUploadMode
      }
    ),
    createdItems.map((item) => /* @__PURE__ */ jsx(UploadedMediaPreview, { media: item }, item.id)),
    /* @__PURE__ */ jsx(
      Uploader,
      {
        ref: uploaderRef,
        onUploadStart: () => setModeIsLocked(true),
        onCreate: (item) => {
          setCreatedItems((prev) => [...prev, item]);
          resetMinutesLimitQuery();
        },
        onCancel: () => {
          setModeIsLocked(false);
        }
      }
    ),
    /* @__PURE__ */ jsx(DropTargetMask, { isVisible: isDragOver })
  ] });
}
function UploadPanel({
  onUpload,
  uploadMode,
  onUploadModeChange
}) {
  const { data } = useUserMinutesLimit();
  return /* @__PURE__ */ jsxs("div", { className: "pt-40", children: [
    /* @__PURE__ */ jsxs("div", { className: "border rounded p-20 md:p-48 flex flex-col items-center max-w-580 mx-auto bg-background", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-base md:text-[22px] md:font-light", children: /* @__PURE__ */ jsx(Trans, { message: "Drag and drop your tracks, videos & albums here." }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          className: "mt-20 w-min",
          onClick: () => onUpload(),
          children: /* @__PURE__ */ jsx(Trans, { message: "Or choose files to upload" })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "border-t pt-20 mt-20", children: /* @__PURE__ */ jsx(
        Switch,
        {
          checked: uploadMode === "album",
          onChange: (e) => onUploadModeChange(e.target.checked ? "album" : "tracks"),
          children: /* @__PURE__ */ jsx(Trans, { message: "Make an album when multiple files are selected" })
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-muted mt-20 text-sm text-center min-h-20", children: (data == null ? void 0 : data.minutesLeft) != null && /* @__PURE__ */ jsx(
      Trans,
      {
        message: "You have :count minutes left. Try <a>Pro accounts</a> to get more time and access to advanced features.",
        values: {
          count: data.minutesLeft,
          a: (parts) => /* @__PURE__ */ jsx(Link, { className: LinkStyle, to: "/pricing", children: parts })
        }
      }
    ) })
  ] });
}
function DefaultWrapper({ children, ...domProps }) {
  return /* @__PURE__ */ jsx("div", { ...domProps, className: "min-h-full relative", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto p-14 md:p-24", children }) });
}
function CreateAlbumPage({ wrapInContainer }) {
  return /* @__PURE__ */ jsx(FileUploadProvider, { children: /* @__PURE__ */ jsx(PageContent$1, { wrapInContainer }) });
}
function PageContent$1({ wrapInContainer }) {
  const uploadIsInProgress = !!useFileUploadStore((s) => s.activeUploadsCount);
  const now2 = useCurrentDateTime();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const { data } = useNormalizedModel(
    `normalized-models/artist/${searchParams.get("artistId")}`,
    void 0,
    { enabled: !!searchParams.get("artistId") }
  );
  const artist = data == null ? void 0 : data.model;
  const form = useForm({
    defaultValues: {
      release_date: now2.toAbsoluteString()
    }
  });
  const createAlbum2 = useCreateAlbum(form);
  useEffect(() => {
    if (artist) {
      form.reset({
        artists: [artist]
      });
    }
  }, [artist, form]);
  return /* @__PURE__ */ jsx(
    CrupdateResourceLayout,
    {
      form,
      onSubmit: (values) => {
        createAlbum2.mutate(values, {
          onSuccess: (response) => {
            if (pathname.includes("admin")) {
              if (artist) {
                navigate(`/admin/artists/${artist.id}/edit`);
              } else {
                navigate("/admin/albums");
              }
            } else {
              navigate(getAlbumLink(response.album));
            }
          }
        });
      },
      title: /* @__PURE__ */ jsx(Trans, { message: "Add new album" }),
      isLoading: createAlbum2.isPending || uploadIsInProgress,
      disableSaveWhenNotDirty: true,
      wrapInContainer,
      children: /* @__PURE__ */ jsx(AlbumForm, { showExternalIdFields: true })
    }
  );
}
function useBackstageRequest() {
  const { requestId } = useParams();
  return useQuery({
    queryKey: ["backstage-request", +requestId],
    queryFn: () => fetchBackstageRequest(requestId)
  });
}
function fetchBackstageRequest(trackId) {
  return apiClient.get(`backstage-request/${trackId}`).then((response) => response.data);
}
const DocumentScannerIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M7 3H4v3H2V1h5v2zm15 3V1h-5v2h3v3h2zM7 21H4v-3H2v5h5v-2zm13-3v3h-3v2h5v-5h-2zM17 6H7v12h10V6zm2 12c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v12zM15 8H9v2h6V8zm0 3H9v2h6v-2zm0 3H9v2h6v-2z" }),
  "DocumentScannerOutlined"
);
const InfoDialogTriggerIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M9 8a1 1 0 0 0-1-1H5.5a1 1 0 1 0 0 2H7v4a1 1 0 0 0 2 0zM4 0h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4zm4 5.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" }),
  "InfoDialogTrigger"
);
const Columns = [
  {
    key: "name",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Name" }),
    visibleInMode: "all",
    width: "flex-3",
    body: (album) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-12", children: [
      /* @__PURE__ */ jsx(
        AlbumImage,
        {
          album,
          className: "flex-shrink-0",
          size: "w-34 h-34 rounded"
        }
      ),
      /* @__PURE__ */ jsx(AlbumLink, { album, target: "_blank" })
    ] })
  },
  {
    key: "release_date",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Release date" }),
    body: (album) => album.release_date ? /* @__PURE__ */ jsx(FormattedDate, { date: album.release_date }) : null
  },
  {
    key: "track_count",
    allowsSorting: false,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Track count" }),
    body: (album) => album.tracks_count ? /* @__PURE__ */ jsx(FormattedNumber, { value: album.tracks_count }) : null
  },
  {
    key: "plays",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Plays" }),
    body: (album) => album.plays ? /* @__PURE__ */ jsx(FormattedNumber, { value: album.plays }) : null
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    width: "w-84 flex-shrink-0",
    visibleInMode: "all",
    hideHeader: true,
    align: "end",
    body: (album) => /* @__PURE__ */ jsx(RowActions, { album })
  }
];
function ArtistAlbumsTable({ albums = [] }) {
  const { watch } = useFormContext();
  const artistId = watch("id");
  const { data, sortDescriptor, onSortChange } = useSortableTableData(albums);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "my-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold", children: /* @__PURE__ */ jsx(Trans, { message: "Albums" }) }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            color: "primary",
            size: "xs",
            className: "ml-auto",
            startIcon: /* @__PURE__ */ jsx(AddIcon, {}),
            elementType: artistId ? Link : void 0,
            to: `../../../albums/new?artistId=${artistId}`,
            relative: "path",
            disabled: !artistId,
            children: /* @__PURE__ */ jsx(Trans, { message: "Add album" })
          }
        )
      ] }),
      !artistId && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 text-sm", children: [
        /* @__PURE__ */ jsx(
          InfoDialogTriggerIcon,
          {
            viewBox: "0 0 16 16",
            size: "xs",
            className: "text-muted"
          }
        ),
        /* @__PURE__ */ jsx(Trans, { message: "Save changes to enable album creation." })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      Table,
      {
        columns: Columns,
        data: albums,
        sortDescriptor,
        onSortChange,
        enableSelection: false
      }
    ),
    !data.length ? /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        className: "mt-40",
        image: /* @__PURE__ */ jsx(SvgImage, { src: musicImage }),
        title: /* @__PURE__ */ jsx(Trans, { message: "This artist does not have any albums yet" })
      }
    ) : null
  ] });
}
function RowActions({ album }) {
  const deleteAlbum = useDeleteAlbum();
  return /* @__PURE__ */ jsxs("div", { className: "text-muted", children: [
    /* @__PURE__ */ jsx(Link, { to: `../../../albums/${album.id}/edit`, relative: "path", children: /* @__PURE__ */ jsx(IconButton, { size: "md", children: /* @__PURE__ */ jsx(EditIcon, {}) }) }),
    /* @__PURE__ */ jsxs(
      DialogTrigger,
      {
        type: "modal",
        onClose: (isConfirmed) => {
          if (isConfirmed) {
            deleteAlbum.mutate({ albumId: album.id });
          }
        },
        children: [
          /* @__PURE__ */ jsx(IconButton, { size: "md", disabled: deleteAlbum.isPending, children: /* @__PURE__ */ jsx(CloseIcon, {}) }),
          /* @__PURE__ */ jsx(
            ConfirmationDialog,
            {
              isDanger: true,
              title: /* @__PURE__ */ jsx(Trans, { message: "Delete album" }),
              body: /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to delete this album?" }),
              confirm: /* @__PURE__ */ jsx(Trans, { message: "Delete" })
            }
          )
        ]
      }
    )
  ] });
}
function CrupdateArtistForm({ albums, showExternalFields }) {
  const isMobile = useIsMobileMediaQuery();
  return /* @__PURE__ */ jsxs(FileUploadProvider, { children: [
    /* @__PURE__ */ jsxs("div", { className: "md:flex gap-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-shrink-0", children: [
        /* @__PURE__ */ jsx(
          FormImageSelector,
          {
            name: "image_small",
            diskPrefix: "artist_images",
            label: isMobile ? /* @__PURE__ */ jsx(Trans, { message: "Image" }) : null,
            variant: isMobile ? "input" : "square",
            previewSize: isMobile ? void 0 : "w-full md:w-224 aspect-square",
            stretchPreview: true
          }
        ),
        showExternalFields && /* @__PURE__ */ jsx(FormSwitch, { name: "verified", className: "mt-14", children: /* @__PURE__ */ jsx(Trans, { message: "Verified" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex-auto mt-24 md:mt-0", children: /* @__PURE__ */ jsxs(Tabs, { isLazy: true, children: [
        /* @__PURE__ */ jsxs(TabList, { children: [
          /* @__PURE__ */ jsx(Tab, { children: /* @__PURE__ */ jsx(Trans, { message: "Details" }) }),
          /* @__PURE__ */ jsx(Tab, { children: /* @__PURE__ */ jsx(Trans, { message: "Links" }) }),
          /* @__PURE__ */ jsx(Tab, { children: /* @__PURE__ */ jsx(Trans, { message: "Biography" }) }),
          /* @__PURE__ */ jsx(Tab, { children: /* @__PURE__ */ jsx(Trans, { message: "Images" }) })
        ] }),
        /* @__PURE__ */ jsxs(TabPanels, { className: "pt-20", children: [
          /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(DetailsPanel, { showExternalFields }) }),
          /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(ProfileLinksForm, {}) }),
          /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(BiographyPanel, {}) }),
          /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(ImagesPanel, {}) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(ArtistAlbumsTable, { albums })
  ] });
}
function DetailsPanel({ showExternalFields }) {
  const { trans } = useTrans();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: "name",
        label: /* @__PURE__ */ jsx(Trans, { message: "Name" }),
        className: "mb-24",
        required: true,
        autoFocus: true,
        disabled: !showExternalFields
      }
    ),
    /* @__PURE__ */ jsx(
      FormNormalizedModelChipField,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Genres" }),
        placeholder: trans(message("+Add genre")),
        model: GENRE_MODEL,
        name: "genres",
        allowCustomValue: true,
        className: "mb-24"
      }
    ),
    showExternalFields && /* @__PURE__ */ jsx(SpotifyIdField, {})
  ] });
}
function BiographyPanel() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: "profile.country",
        label: /* @__PURE__ */ jsx(Trans, { message: "Country" }),
        className: "mb-24"
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: "profile.city",
        label: /* @__PURE__ */ jsx(Trans, { message: "City" }),
        className: "mb-24"
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        inputElementType: "textarea",
        rows: 5,
        name: "profile.description",
        label: /* @__PURE__ */ jsx(Trans, { message: "Description" }),
        className: "mb-24"
      }
    )
  ] });
}
function ImagesPanel() {
  const { fields, append, remove } = useFieldArray({
    name: "profile_images"
  });
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "flex gap-12 flex-wrap mb-24", children: fields.map((field, index) => {
      return /* @__PURE__ */ jsx(
        FormImageSelector,
        {
          name: `profile_images.${index}.url`,
          diskPrefix: "artist_images",
          variant: "square",
          previewSize: "w-160 h-160",
          stretchPreview: true,
          showRemoveButton: true,
          onChange: (value) => {
            if (!value) {
              remove(index);
            }
          }
        },
        field.id
      );
    }) }),
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "outline",
        color: "primary",
        startIcon: /* @__PURE__ */ jsx(AddIcon, {}),
        onClick: () => {
          append({ url: "" });
        },
        children: /* @__PURE__ */ jsx(Trans, { message: "Add another image" })
      }
    )
  ] });
}
function SpotifyIdField() {
  const { spotify_is_setup } = useSettings();
  if (!spotify_is_setup) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    FormTextField,
    {
      name: "spotify_id",
      label: /* @__PURE__ */ jsx(Trans, { message: "Spotify ID" }),
      className: "mb-24",
      minLength: 22,
      maxLength: 22
    }
  );
}
const Endpoint = (id) => `artists/${id}`;
function useUpdateArtist(form) {
  const { trans } = useTrans();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return useMutation({
    mutationFn: (payload) => updateAlbum(payload),
    onSuccess: (response) => {
      toast(trans(message("Artist updated")));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("artists")
      });
      if (pathname.includes("admin")) {
        navigate("/admin/artists");
      } else {
        navigate(getArtistLink(response.artist));
      }
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function updateAlbum({ id, ...payload }) {
  return apiClient.put(Endpoint(id), payload).then((r) => r.data);
}
function UpdateArtistPage({ wrapInContainer, showExternalFields }) {
  const query = useArtist({
    loader: "editArtistPage"
  });
  if (query.data) {
    return /* @__PURE__ */ jsx(
      PageContent,
      {
        response: query.data,
        wrapInContainer,
        showExternalFields
      }
    );
  }
  return /* @__PURE__ */ jsx(PageStatus, { query, loaderClassName: "absolute inset-0 m-auto" });
}
function PageContent({
  response,
  wrapInContainer,
  showExternalFields
}) {
  var _a2;
  const { canEdit } = useArtistPermissions(response.artist);
  const form = useForm({
    defaultValues: {
      id: response.artist.id,
      name: response.artist.name,
      verified: response.artist.verified,
      spotify_id: response.artist.spotify_id,
      genres: response.artist.genres,
      image_small: response.artist.image_small,
      links: response.artist.links,
      profile: response.artist.profile,
      profile_images: response.artist.profile_images
    }
  });
  const updateArtist = useUpdateArtist(form);
  if (!canEdit) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/", replace: true });
  }
  return /* @__PURE__ */ jsx(
    CrupdateResourceLayout,
    {
      form,
      onSubmit: (values) => {
        updateArtist.mutate(values);
      },
      title: /* @__PURE__ */ jsx(
        Trans,
        {
          message: "Edit “:name“ artist",
          values: { name: response.artist.name }
        }
      ),
      isLoading: updateArtist.isPending,
      disableSaveWhenNotDirty: true,
      wrapInContainer,
      children: /* @__PURE__ */ jsx(
        CrupdateArtistForm,
        {
          albums: (_a2 = response.albums) == null ? void 0 : _a2.data,
          showExternalFields
        }
      )
    }
  );
}
const monthDayFormat = {
  month: "short",
  day: "2-digit"
};
function ReportDateSelector({
  value,
  onChange,
  disabled,
  compactOnMobile = true,
  enableCompare = false,
  granularity = "minute"
}) {
  const isMobile = useIsMobileMediaQuery();
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "popover",
      onClose: (value2) => {
        if (value2) {
          onChange(value2);
        }
      },
      children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            color: "chip",
            endIcon: /* @__PURE__ */ jsx(DateRangeIcon, {}),
            disabled,
            children: /* @__PURE__ */ jsx(
              FormattedDateTimeRange,
              {
                start: value.start,
                end: value.end,
                options: isMobile && compactOnMobile ? monthDayFormat : DateFormatPresets.short
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          DateSelectorDialog,
          {
            value,
            enableCompare,
            granularity
          }
        )
      ]
    }
  );
}
function DateSelectorDialog({
  value,
  enableCompare,
  granularity
}) {
  const isMobile = useIsMobileMediaQuery();
  const state = useDateRangePickerState({
    granularity,
    defaultValue: {
      start: value.start,
      end: value.end,
      preset: value.preset
    },
    closeDialogOnSelection: false
  });
  const compareHasInitialValue = !!value.compareStart && !!value.compareEnd;
  const compareState = useDateRangePickerState({
    granularity,
    defaultValue: compareHasInitialValue ? {
      start: value.compareStart,
      end: value.compareEnd,
      preset: value.comparePreset
    } : DateRangeComparePresets[0].getRangeValue(state.selectedValue)
  });
  return /* @__PURE__ */ jsx(
    DateRangeDialog,
    {
      state,
      compareState: enableCompare ? compareState : void 0,
      compareVisibleDefault: compareHasInitialValue,
      showInlineDatePickerField: !isMobile
    }
  );
}
function ChartLayout(props) {
  const {
    title,
    description,
    children,
    className,
    contentIsFlex = true,
    contentClassName,
    contentRef,
    minHeight = "min-h-440"
  } = props;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "rounded-panel flex h-full flex-auto flex-col border bg",
        minHeight,
        className
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-shrink-0 items-center justify-between p-14 text-xs", children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold", children: title }),
          description && /* @__PURE__ */ jsx("div", { className: "text-muted", children: description })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: contentRef,
            className: clsx(
              "relative p-14",
              contentIsFlex && "flex flex-auto items-center justify-center",
              contentClassName
            ),
            children
          }
        )
      ]
    }
  );
}
function ChartLoadingIndicator() {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-10 text-sm absolute mx-auto", children: [
    /* @__PURE__ */ jsx(ProgressCircle, { isIndeterminate: true, size: "sm" }),
    /* @__PURE__ */ jsx(Trans, { message: "Chart loading" })
  ] });
}
const LazyChart = lazy(() => import("./lazy-chart-9300132f.mjs"));
function BaseChart(props) {
  const { title, description, className, contentRef, isLoading } = props;
  return /* @__PURE__ */ jsx(
    ChartLayout,
    {
      title,
      description,
      className,
      contentRef,
      children: /* @__PURE__ */ jsxs(Suspense, { fallback: /* @__PURE__ */ jsx(ChartLoadingIndicator, {}), children: [
        /* @__PURE__ */ jsx(LazyChart, { ...props }),
        isLoading && /* @__PURE__ */ jsx(ChartLoadingIndicator, {})
      ] })
    }
  );
}
function formatReportData(report, { localeCode = "en", shareFirstDatasetLabels = true }) {
  if (!report)
    return { datasets: [] };
  const firstDatasetLabels = [];
  return {
    ...report,
    datasets: report.datasets.map((dataset, datasetIndex) => {
      const data = dataset.data.map((datasetItem, itemIndex) => {
        let label;
        if (datasetIndex === 0 || !shareFirstDatasetLabels) {
          label = generateDatasetLabels(
            datasetItem,
            report.granularity,
            localeCode
          );
          firstDatasetLabels[itemIndex] = label;
        } else {
          label = firstDatasetLabels[itemIndex];
        }
        return {
          ...label,
          value: datasetItem.value
        };
      });
      return { ...dataset, data };
    })
  };
}
function generateDatasetLabels(datum, granularity, locale2) {
  if (datum.label) {
    return { label: datum.label };
  }
  if (!datum.date) {
    return { label: "" };
  }
  return generateTimeLabels(datum, granularity, locale2);
}
function generateTimeLabels({ date: isoDate, endDate: isoEndDate }, granularity = "day", locale2) {
  const date = parseAbsoluteToLocal(isoDate).toDate();
  const endDate = isoEndDate ? parseAbsoluteToLocal(isoEndDate).toDate() : null;
  switch (granularity) {
    case "minute":
      return {
        label: getFormatter(locale2, {
          second: "2-digit"
        }).format(date),
        tooltipTitle: getFormatter(locale2, {
          day: "2-digit",
          hour: "numeric",
          minute: "numeric",
          second: "2-digit"
        }).format(date)
      };
    case "hour":
      return {
        label: getFormatter(locale2, {
          hour: "numeric",
          minute: "numeric"
        }).format(date),
        tooltipTitle: getFormatter(locale2, {
          month: "short",
          day: "2-digit",
          hour: "numeric",
          minute: "numeric"
        }).format(date)
      };
    case "day":
      return {
        label: getFormatter(locale2, {
          day: "2-digit",
          weekday: "short"
        }).format(date),
        tooltipTitle: getFormatter(locale2, {
          day: "2-digit",
          weekday: "short",
          month: "short"
        }).format(date)
      };
    case "week":
      return {
        label: getFormatter(locale2, {
          month: "short",
          day: "2-digit"
        }).format(date),
        tooltipTitle: getFormatter(locale2, {
          day: "2-digit",
          month: "long",
          year: "numeric"
        }).formatRange(date, endDate)
      };
    case "month":
      return {
        label: getFormatter(locale2, {
          month: "short",
          year: "numeric"
        }).format(date),
        tooltipTitle: getFormatter(locale2, {
          month: "long",
          year: "numeric"
        }).format(date)
      };
    case "year":
      return {
        label: getFormatter(locale2, {
          year: "numeric"
        }).format(date),
        tooltipTitle: getFormatter(locale2, {
          year: "numeric"
        }).format(date)
      };
  }
}
const getFormatter = memoize(
  (locale2, options) => {
    return new DateFormatter(locale2, options);
  },
  {
    equals: (a, b) => {
      return shallowEqual(a, b);
    },
    callTimeout: void 0
  }
);
const primaryColor = getBootstrapData().themes.all[0].values["--be-primary"];
const ChartColors = [
  [
    `rgb(${primaryColor.replaceAll(" ", ",")})`,
    `rgba(${primaryColor.replaceAll(" ", ",")},0.2)`
  ],
  ["rgb(255,112,67)", "rgb(255,112,67,0.2)"],
  ["rgb(255,167,38)", "rgb(255,167,38,0.2)"],
  ["rgb(141,110,99)", "rgb(141,110,99,0.2)"],
  ["rgb(102,187,106)", "rgba(102,187,106,0.2)"],
  ["rgb(92,107,192)", "rgb(92,107,192,0.2)"]
];
const LineChartOptions = {
  parsing: {
    xAxisKey: "label",
    yAxisKey: "value"
  },
  datasets: {
    line: {
      fill: "origin",
      tension: 0.1,
      pointBorderWidth: 4,
      pointHitRadius: 10
    }
  },
  plugins: {
    tooltip: {
      intersect: false,
      mode: "index"
    }
  }
};
function LineChart({ data, className, ...props }) {
  const { localeCode } = useSelectedLocale();
  const formattedData = useMemo(() => {
    const formattedData2 = formatReportData(data, { localeCode });
    formattedData2.datasets = formattedData2.datasets.map((dataset, i) => ({
      ...dataset,
      backgroundColor: ChartColors[i][1],
      borderColor: ChartColors[i][0],
      pointBackgroundColor: ChartColors[i][0]
    }));
    return formattedData2;
  }, [data, localeCode]);
  return /* @__PURE__ */ jsx(
    BaseChart,
    {
      ...props,
      className: clsx(className, "min-w-500"),
      data: formattedData,
      type: "line",
      options: LineChartOptions
    }
  );
}
const PolarAreaChartOptions = {
  parsing: {
    key: "value"
  },
  plugins: {
    tooltip: {
      intersect: true
    }
  }
};
function PolarAreaChart({
  data,
  className,
  ...props
}) {
  const { localeCode } = useSelectedLocale();
  const formattedData = useMemo(() => {
    var _a2;
    const formattedData2 = formatReportData(data, { localeCode });
    formattedData2.labels = (_a2 = formattedData2.datasets[0]) == null ? void 0 : _a2.data.map((d) => d.label);
    formattedData2.datasets = formattedData2.datasets.map((dataset, i) => ({
      ...dataset,
      backgroundColor: ChartColors.map((c) => c[1]),
      borderColor: ChartColors.map((c) => c[0]),
      borderWidth: 2
    }));
    return formattedData2;
  }, [data, localeCode]);
  return /* @__PURE__ */ jsx(
    BaseChart,
    {
      type: "polarArea",
      data: formattedData,
      options: PolarAreaChartOptions,
      className: clsx(className, "min-w-500"),
      ...props
    }
  );
}
const loaderUrl = "https://www.gstatic.com/charts/loader.js";
function useGoogleGeoChart({
  placeholderRef,
  data,
  country,
  onCountrySelected
}) {
  const { trans } = useTrans();
  const { analytics } = useSettings();
  const apiKey = analytics == null ? void 0 : analytics.gchart_api_key;
  const { selectedTheme } = useThemeSelector();
  const geoChartRef = useRef();
  const regionInteractivity = !!onCountrySelected && !country;
  const drawGoogleChart = useCallback(() => {
    var _a2, _b2;
    if (typeof google === "undefined")
      return;
    const seedData = data.map((location) => [location.label, location.value]);
    seedData.unshift([
      country ? trans(message("City")) : trans(message("Country")),
      trans(message("Clicks"))
    ]);
    const backgroundColor = `${themeValueToHex(
      selectedTheme.values["--be-paper"]
    )}`;
    const chartColor = `${themeValueToHex(
      selectedTheme.values["--be-primary"]
    )}`;
    const options = {
      colorAxis: { colors: [chartColor] },
      backgroundColor,
      region: country ? country.toUpperCase() : void 0,
      resolution: country ? "provinces" : "countries",
      displayMode: country ? "markers" : "regions",
      enableRegionInteractivity: regionInteractivity
    };
    if (!geoChartRef.current && placeholderRef.current && ((_a2 = google == null ? void 0 : google.visualization) == null ? void 0 : _a2.GeoChart)) {
      geoChartRef.current = new google.visualization.GeoChart(
        placeholderRef.current
      );
    }
    (_b2 = geoChartRef.current) == null ? void 0 : _b2.draw(
      google.visualization.arrayToDataTable(seedData),
      options
    );
  }, [
    selectedTheme,
    data,
    placeholderRef,
    trans,
    country,
    regionInteractivity
  ]);
  const initGoogleGeoChart = useCallback(async () => {
    if (lazyLoader.isLoadingOrLoaded(loaderUrl))
      return;
    await lazyLoader.loadAsset(loaderUrl, { type: "js", id: "google-charts-js" });
    await google.charts.load("current", {
      packages: ["geochart"],
      mapsApiKey: apiKey
    });
    drawGoogleChart();
  }, [apiKey, drawGoogleChart]);
  useEffect(() => {
    if (geoChartRef.current && onCountrySelected) {
      google.visualization.events.addListener(
        geoChartRef.current,
        "regionClick",
        (a) => onCountrySelected == null ? void 0 : onCountrySelected(a.region)
      );
    }
    return () => {
      if (geoChartRef.current) {
        google.visualization.events.removeAllListeners(geoChartRef.current);
      }
    };
  }, [onCountrySelected, geoChartRef.current]);
  useEffect(() => {
    initGoogleGeoChart();
  }, [initGoogleGeoChart]);
  useEffect(() => {
    drawGoogleChart();
  }, [selectedTheme, drawGoogleChart, data]);
  return { drawGoogleChart };
}
const ArrowBackIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" }),
  "ArrowBackOutlined"
);
function InfoDialogTrigger({
  title,
  body,
  dialogSize = "sm",
  className
}) {
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "popover", triggerOnHover: true, children: [
    /* @__PURE__ */ jsx(
      IconButton,
      {
        className: clsx("ml-4 text-muted opacity-70", className),
        iconSize: "xs",
        size: "2xs",
        children: /* @__PURE__ */ jsx(InfoDialogTriggerIcon, { viewBox: "0 0 16 16" })
      }
    ),
    /* @__PURE__ */ jsxs(Dialog, { size: dialogSize, children: [
      title && /* @__PURE__ */ jsx(DialogHeader, { padding: "px-18 pt-12", size: "md", hideDismissButton: true, children: title }),
      /* @__PURE__ */ jsx(DialogBody, { children: body })
    ] })
  ] });
}
const FormattedCountryName = memo(({ code: countryCode }) => {
  const { localeCode } = useSelectedLocale();
  const regionNames = new Intl.DisplayNames([localeCode], { type: "region" });
  let formattedName;
  try {
    formattedName = regionNames.of(countryCode.toUpperCase());
  } catch (e) {
  }
  return /* @__PURE__ */ jsx(Fragment, { children: formattedName });
});
function GeoChart({
  data: metricData,
  isLoading,
  onCountrySelected,
  country,
  ...layoutProps
}) {
  const placeholderRef = useRef(null);
  const regionInteractivity = !!onCountrySelected;
  const initialData = metricData == null ? void 0 : metricData.datasets[0].data;
  const data = useMemo(() => {
    return initialData || [];
  }, [initialData]);
  useGoogleGeoChart({ placeholderRef, data, country, onCountrySelected });
  return /* @__PURE__ */ jsxs(
    ChartLayout,
    {
      ...layoutProps,
      className: "min-w-500",
      title: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(Trans, { message: "Top Locations" }),
        country ? /* @__PURE__ */ jsxs("span", { className: "pl-4", children: [
          "(",
          /* @__PURE__ */ jsx(FormattedCountryName, { code: country }),
          ")"
        ] }) : null,
        regionInteractivity && /* @__PURE__ */ jsx(InfoTrigger, {})
      ] }),
      contentIsFlex: isLoading,
      children: [
        isLoading && /* @__PURE__ */ jsx(ChartLoadingIndicator, {}),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-24", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              ref: placeholderRef,
              className: "flex-auto w-[480px] min-h-[340px]"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "w-[170px]", children: [
            /* @__PURE__ */ jsx("div", { className: "text-sm max-h-[340px] w-full flex-initial overflow-y-auto", children: data.map((location) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: clsx(
                  "flex items-center gap-4 mb-4",
                  regionInteractivity && "cursor-pointer hover:underline"
                ),
                role: regionInteractivity ? "button" : void 0,
                onClick: () => {
                  onCountrySelected == null ? void 0 : onCountrySelected(location.code);
                },
                children: [
                  /* @__PURE__ */ jsx("div", { className: "max-w-110 whitespace-nowrap overflow-hidden overflow-ellipsis", children: location.label }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    "(",
                    location.percentage,
                    ")%"
                  ] })
                ]
              },
              location.label
            )) }),
            country && /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                size: "xs",
                className: "mt-14",
                startIcon: /* @__PURE__ */ jsx(ArrowBackIcon, {}),
                onClick: () => {
                  onCountrySelected == null ? void 0 : onCountrySelected(void 0);
                },
                children: /* @__PURE__ */ jsx(Trans, { message: "Back to countries" })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function InfoTrigger() {
  return /* @__PURE__ */ jsx(
    InfoDialogTrigger,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Zooming in" }),
      body: /* @__PURE__ */ jsx(Trans, { message: "Click on a country inside the map or country list to zoom in and see city data for that country." })
    }
  );
}
const endpoint = "reports/insights";
function useInsightsReport(payload, options) {
  return useQuery({
    queryKey: [endpoint, payload],
    queryFn: () => fetchReport(endpoint, payload),
    placeholderData: options.isEnabled ? keepPreviousData : void 0,
    enabled: options.isEnabled
  });
}
function fetchReport(endpoint2, payload) {
  var _a2;
  const params = {
    model: payload.model,
    metrics: (_a2 = payload.metrics) == null ? void 0 : _a2.join(",")
  };
  params.startDate = payload.dateRange.start.toAbsoluteString();
  params.endDate = payload.dateRange.end.toAbsoluteString();
  params.timezone = payload.dateRange.start.timeZone;
  return apiClient.get(endpoint2, { params }).then((response) => response.data);
}
const InfoIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" }),
  "InfoOutlined"
);
function TopModelsChartLayout({ data, isLoading, ...layoutProps }) {
  const dataItems = (data == null ? void 0 : data.datasets[0].data) || [];
  return /* @__PURE__ */ jsxs(
    ChartLayout,
    {
      ...layoutProps,
      className: "min-w-500 md:min-w-0 w-1/2",
      contentIsFlex: isLoading,
      contentClassName: "max-h-[370px] overflow-y-auto compact-scrollbar",
      children: [
        isLoading && /* @__PURE__ */ jsx(ChartLoadingIndicator, {}),
        dataItems.map((item) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "mb-20 text-sm flex items-center justify-between gap-24",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-8", children: [
                /* @__PURE__ */ jsx(
                  Image,
                  {
                    model: item.model,
                    size: "w-42 h-42",
                    className: "rounded flex-shrink-0"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "text-sm", children: /* @__PURE__ */ jsx(Name, { model: item.model }) }),
                  /* @__PURE__ */ jsx("div", { className: "text-xs text-muted", children: /* @__PURE__ */ jsx(Description, { model: item.model }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 flex-shrink-0", children: [
                /* @__PURE__ */ jsx(PlayArrowFilledIcon, { className: "text-muted", size: "sm" }),
                /* @__PURE__ */ jsx(
                  Trans,
                  {
                    message: ":count plays",
                    values: { count: /* @__PURE__ */ jsx(FormattedNumber, { value: item.value }) }
                  }
                )
              ] })
            ]
          },
          item.model.id
        )),
        !isLoading && !dataItems.length ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-8 text-muted", children: [
          /* @__PURE__ */ jsx(InfoIcon, { size: "sm" }),
          /* @__PURE__ */ jsx(Trans, { message: "No plays in selected timeframe." })
        ] }) : null
      ]
    }
  );
}
function Image({ model, size, className }) {
  const { pathname } = useLocation();
  const inAdmin = pathname.includes("/admin");
  const link = inAdmin ? `/admin/${model.model_type}s/${model.id}/insights` : `/backstage/${model.model_type}s/${model.id}/insights`;
  switch (model.model_type) {
    case "artist":
      return /* @__PURE__ */ jsx(Link, { to: link, children: /* @__PURE__ */ jsx(SmallArtistImage, { artist: model, size, className }) });
    case "album":
      return /* @__PURE__ */ jsx(Link, { to: link, children: /* @__PURE__ */ jsx(AlbumImage, { album: model, size, className }) });
    case "track":
      return /* @__PURE__ */ jsx(Link, { to: link, children: /* @__PURE__ */ jsx(TrackImage, { track: model, size, className }) });
    case "user":
      return /* @__PURE__ */ jsx(UserAvatar, { user: model, size, className });
  }
}
function Name({ model }) {
  switch (model.model_type) {
    case "artist":
      return /* @__PURE__ */ jsx(ArtistLink, { artist: model, target: "_blank" });
    case "album":
      return /* @__PURE__ */ jsx(AlbumLink, { album: model, target: "_blank" });
    case "track":
      return /* @__PURE__ */ jsx(TrackLink, { track: model, target: "_blank" });
    case "user":
      return model.id ? /* @__PURE__ */ jsx(UserProfileLink, { user: model, target: "_blank" }) : /* @__PURE__ */ jsx(Fragment, { children: model.display_name });
  }
}
function Description({ model }) {
  switch (model.model_type) {
    case "artist":
    case "user":
      return null;
    case "album":
    case "track":
      return /* @__PURE__ */ jsx(ArtistLinks, { artists: model.artists, target: "_blank" });
  }
}
function InsightsReportCharts(props) {
  const colGap = "gap-12 md:gap-24 mb-12 md:mb-24";
  const rowClassName = `flex flex-col lg:flex-row lg:items-center overflow-x-auto ${colGap}`;
  const model = props.model;
  const dateRange = props.dateRange;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: rowClassName, children: [
      /* @__PURE__ */ jsx(AsyncChart, { metric: "plays", model, dateRange, children: ({ data }) => /* @__PURE__ */ jsx(
        LineChart,
        {
          className: "flex-auto",
          title: /* @__PURE__ */ jsx(Trans, { message: "Plays" }),
          hideLegend: true,
          description: /* @__PURE__ */ jsx(
            Trans,
            {
              message: ":count total plays",
              values: {
                count: /* @__PURE__ */ jsx(FormattedNumber, { value: (data == null ? void 0 : data.report.plays.total) || 0 })
              }
            }
          )
        }
      ) }),
      /* @__PURE__ */ jsx(AsyncChart, { metric: "devices", model, dateRange, children: /* @__PURE__ */ jsx(PolarAreaChart, { title: /* @__PURE__ */ jsx(Trans, { message: "Top devices" }) }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: rowClassName, children: [
      props.showTracks && /* @__PURE__ */ jsx(AsyncChart, { metric: "tracks", model, dateRange, children: /* @__PURE__ */ jsx(
        TopModelsChartLayout,
        {
          title: /* @__PURE__ */ jsx(Trans, { message: "Most played tracks" })
        }
      ) }),
      /* @__PURE__ */ jsx(AsyncChart, { metric: "users", model, dateRange, children: /* @__PURE__ */ jsx(TopModelsChartLayout, { title: /* @__PURE__ */ jsx(Trans, { message: "Top listeners" }) }) })
    ] }),
    props.showArtistsAndAlbums && /* @__PURE__ */ jsxs("div", { className: rowClassName, children: [
      /* @__PURE__ */ jsx(AsyncChart, { metric: "artists", model, dateRange, children: /* @__PURE__ */ jsx(
        TopModelsChartLayout,
        {
          title: /* @__PURE__ */ jsx(Trans, { message: "Most played artists" })
        }
      ) }),
      /* @__PURE__ */ jsx(AsyncChart, { metric: "albums", model, dateRange, children: /* @__PURE__ */ jsx(
        TopModelsChartLayout,
        {
          title: /* @__PURE__ */ jsx(Trans, { message: "Most played albums" })
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: rowClassName, children: [
      /* @__PURE__ */ jsx(AsyncChart, { metric: "locations", model, dateRange, children: /* @__PURE__ */ jsx(GeoChart, { className: "flex-auto w-1/2 lg:max-w-[740px]" }) }),
      /* @__PURE__ */ jsx(AsyncChart, { metric: "platforms", model, dateRange, children: /* @__PURE__ */ jsx(
        PolarAreaChart,
        {
          className: "max-w-500",
          title: /* @__PURE__ */ jsx(Trans, { message: "Top platforms" })
        }
      ) })
    ] })
  ] });
}
function AsyncChart({ children, metric, model, dateRange }) {
  var _a2, _b2;
  const [isEnabled, setIsEnabled] = useState(false);
  const query = useInsightsReport(
    { metrics: [metric], model, dateRange },
    { isEnabled }
  );
  const chart = typeof children === "function" ? children(query) : children;
  const observerRef = useRef();
  const contentRef = useCallback((el) => {
    var _a3;
    if (el) {
      const observer = new IntersectionObserver(
        ([e]) => {
          var _a4;
          if (e.isIntersecting) {
            setIsEnabled(true);
            (_a4 = observerRef.current) == null ? void 0 : _a4.disconnect();
            observerRef.current = void 0;
          }
        },
        { threshold: 0.1 }
        // if only header is visible, don't load
      );
      observerRef.current = observer;
      observer.observe(el);
    } else if (observerRef.current) {
      (_a3 = observerRef.current) == null ? void 0 : _a3.disconnect();
    }
  }, []);
  return cloneElement(chart, {
    data: (_b2 = (_a2 = query.data) == null ? void 0 : _a2.report) == null ? void 0 : _b2[metric],
    isLoading: query.isLoading,
    contentRef
  });
}
function BackstageInsightsLayout({
  children,
  reportModel,
  title,
  isNested
}) {
  const [dateRange, setDateRange] = useState(() => {
    return DateRangePresets[2].getRangeValue();
  });
  const { player } = useSettings();
  useIsMobileMediaQuery();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Insights" }) }),
    /* @__PURE__ */ jsx("div", { className: "h-full flex flex-col", children: /* @__PURE__ */ jsxs(
      DashboardLayout,
      {
        name: "web-player",
        initialRightSidenavStatus: (player == null ? void 0 : player.hide_queue) ? "closed" : "open",
        children: [
          /* @__PURE__ */ jsx(
            PlayerNavbarLayout,
            {
              size: "sm",
              menuPosition: "pricing-table-page",
              className: "flex-shrink-0"
            }
          ),
          /* @__PURE__ */ jsx(SidedavFrontend, { position: "left", display: "block", children: /* @__PURE__ */ jsx(Sidenav, {}) }),
          /* @__PURE__ */ jsx(DashboardContent, { children: /* @__PURE__ */ jsx("div", { className: "overflow-y-auto flex-auto bg-cover relative", children: /* @__PURE__ */ jsx("div", { className: "min-h-full p-12 md:p-24 overflow-x-hidden max-w-[1600px] mx-auto flex flex-col", children: /* @__PURE__ */ jsxs("div", { className: "flex-auto", children: [
            /* @__PURE__ */ jsxs("div", { className: "md:flex items-center justify-between gap-24 h-48 mt-14 mb-38", children: [
              title ? title : /* @__PURE__ */ jsx(Skeleton, { className: "max-w-320" }),
              /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 flex items-center justify-between gap-10 md:gap-24", children: /* @__PURE__ */ jsx(
                ReportDateSelector,
                {
                  value: dateRange,
                  onChange: setDateRange
                }
              ) })
            ] }),
            cloneElement(children, { dateRange, model: reportModel })
          ] }) }) }) })
        ]
      }
    ) })
  ] });
}
function BackstageInsightsTitle({ image, name, description }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-10", children: [
    cloneElement(image, { size: "w-48 h-48", className: "rounded" }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-base whitespace-nowrap overflow-hidden overflow-ellipsis", children: [
        "“",
        name,
        "“ ",
        /* @__PURE__ */ jsx(Trans, { message: "insights" })
      ] }),
      description && /* @__PURE__ */ jsx("div", { className: "text-muted text-sm", children: description })
    ] })
  ] });
}
function BackstageArtistInsights({ isNested }) {
  const { artistId } = useParams();
  const { data } = useArtist({ loader: "artist" });
  return /* @__PURE__ */ jsx(
    BackstageInsightsLayout,
    {
      reportModel: `artist=${artistId}`,
      title: (data == null ? void 0 : data.artist) && /* @__PURE__ */ jsx(
        BackstageInsightsTitle,
        {
          image: /* @__PURE__ */ jsx(SmallArtistImage, { artist: data.artist }),
          name: /* @__PURE__ */ jsx(ArtistLink, { artist: data.artist })
        }
      ),
      isNested,
      children: /* @__PURE__ */ jsx(InsightsReportCharts, { showTracks: true })
    }
  );
}
function BackstageAlbumInsights({ isNested }) {
  const { albumId } = useParams();
  const { data } = useAlbum({ loader: "album" });
  return /* @__PURE__ */ jsx(
    BackstageInsightsLayout,
    {
      reportModel: `album=${albumId}`,
      title: (data == null ? void 0 : data.album) && /* @__PURE__ */ jsx(
        BackstageInsightsTitle,
        {
          image: /* @__PURE__ */ jsx(AlbumImage, { album: data.album }),
          name: /* @__PURE__ */ jsx(AlbumLink, { album: data.album }),
          description: /* @__PURE__ */ jsx(ArtistLinks, { artists: data.album.artists })
        }
      ),
      isNested,
      children: /* @__PURE__ */ jsx(InsightsReportCharts, { showTracks: true })
    }
  );
}
function BackstageTrackInsights({ isNested }) {
  const { trackId } = useParams();
  const { data } = useTrack({ loader: "track" });
  return /* @__PURE__ */ jsx(
    BackstageInsightsLayout,
    {
      reportModel: `track=${trackId}`,
      title: (data == null ? void 0 : data.track) && /* @__PURE__ */ jsx(
        BackstageInsightsTitle,
        {
          image: /* @__PURE__ */ jsx(TrackImage, { track: data.track }),
          name: /* @__PURE__ */ jsx(TrackLink, { track: data.track }),
          description: /* @__PURE__ */ jsx(ArtistLinks, { artists: data.track.artists })
        }
      ),
      isNested,
      children: /* @__PURE__ */ jsx(InsightsReportCharts, {})
    }
  );
}
export {
  ArrowRightAltIcon as A,
  BaseChart as B,
  ChipField as C,
  DateRangeDialog as D,
  BackstageAlbumInsights as E,
  FormNormalizedModelField as F,
  GeoChart as G,
  UpdateArtistPage as H,
  InsightsReportCharts as I,
  BackstageArtistInsights as J,
  UploadPage as K,
  LineChart as L,
  useStickySentinel as M,
  ArrowBackIcon as N,
  BackstageLayout as O,
  PolarAreaChart as P,
  FileUploadIcon as Q,
  ReportDateSelector as R,
  InfoIcon as S,
  UpdateTrackPage as U,
  DatePickerField as a,
  DateRangeIcon as b,
  DateSegmentList as c,
  DateRangePresets as d,
  FormChipField as e,
  FormattedDateTimeRange as f,
  useNormalizedModel as g,
  useDatatableData as h,
  DatatableDataQueryKey as i,
  FormDatePicker as j,
  DragHandleIcon as k,
  useCurrentDateTime as l,
  CrupdateResourceLayout as m,
  useNormalizedModels as n,
  musicImage as o,
  useBackstageRequest as p,
  DocumentScannerIcon as q,
  CrupdateArtistForm as r,
  formatReportData as s,
  ChartColors as t,
  useDateRangePickerState as u,
  InfoDialogTrigger as v,
  CreateTrackPage as w,
  BackstageTrackInsights as x,
  CreateAlbumPage as y,
  UpdateAlbumPage as z
};
//# sourceMappingURL=backstage-track-insights-b8d60490.mjs.map
