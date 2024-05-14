import { jsxs, jsx } from "react/jsx-runtime";
import { A as Avatar, l as usePointerEvents, K as KeyboardArrowLeftIcon } from "./theme-value-to-hex-ee0bd15b.mjs";
import { w as Skeleton, aa as getInputFieldClassNames, e as useNumberFormatter, co as clamp, cp as createEventHandler, g as createSvgIcon, j as useDialogContext, k as Dialog, n as DialogBody, I as IconButton, x as CloseIcon, K as KeyboardArrowRightIcon, aF as slugifyString, al as getBootstrapData, G as toast, m as message, H as showHttpErrorToast, J as apiClient, aH as useMediaQuery } from "../server-entry.mjs";
import clsx from "clsx";
import { useGlobalListeners, mergeProps, snapValueToStep, useObjectRef } from "@react-aria/utils";
import { useControlledState } from "@react-stately/utils";
import { useMemo, useCallback, useState, useRef, useId, useEffect } from "react";
import { useController } from "react-hook-form";
import { useSearchParams, useNavigate, Link, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
const BackendFiltersUrlKey = "filters";
function decodeBackendFilters(encodedFilters) {
  if (!encodedFilters)
    return [];
  let filtersFromQuery = [];
  try {
    filtersFromQuery = JSON.parse(atob(decodeURIComponent(encodedFilters)));
    filtersFromQuery.map((filterValue) => {
      if (filterValue.valueKey != null) {
        filterValue.value = filterValue.valueKey;
      }
      return filterValue;
    });
  } catch (e) {
  }
  return filtersFromQuery;
}
function encodeBackendFilters(filterValues, filters) {
  if (!filterValues)
    return "";
  filterValues = !filters ? filterValues : filterValues.filter((item) => item.value !== "").map((item) => transformValue(item, filters));
  filterValues = filterValues.filter((fm) => !fm.isInactive);
  if (!filterValues.length) {
    return "";
  }
  return encodeURIComponent(btoa(JSON.stringify(filterValues)));
}
function transformValue(filterValue, filters) {
  var _a;
  const filterConfig = filters.find((f) => f.key === filterValue.key);
  if ((filterConfig == null ? void 0 : filterConfig.control.type) === "select") {
    const option = (filterConfig.control.options || []).find(
      (o) => o.key === filterValue.value
    );
    if (option) {
      return { ...filterValue, value: option.value, valueKey: option.key };
    }
  }
  if ((_a = filterConfig == null ? void 0 : filterConfig.extraFilters) == null ? void 0 : _a.length) {
    filterValue["extraFilters"] = filterConfig.extraFilters;
  }
  return filterValue;
}
function useBackendFilterUrlParams(filters, pinnedFilters) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const encodedFilters = searchParams.get(BackendFiltersUrlKey);
  const decodedFilters = useMemo(() => {
    if (!filters)
      return [];
    const decoded = decodeBackendFilters(encodedFilters);
    (pinnedFilters || []).forEach((key) => {
      if (!decoded.find((f) => f.key === key)) {
        const config = filters.find((f) => f.key === key);
        decoded.push({
          key,
          value: config.control.defaultValue,
          operator: config.defaultOperator,
          isInactive: true
        });
      }
    });
    decoded.sort(
      (a, b) => filters.findIndex((f) => f.key === a.key) - filters.findIndex((f) => f.key === b.key)
    );
    return decoded;
  }, [encodedFilters, pinnedFilters, filters]);
  const getDecodedWithoutKeys = useCallback(
    (values) => {
      const newFilters = [...decodedFilters];
      values.forEach((value) => {
        const key = typeof value === "object" ? value.key : value;
        const index = newFilters.findIndex((f) => f.key === key);
        if (index > -1) {
          newFilters.splice(index, 1);
        }
      });
      return newFilters;
    },
    [decodedFilters]
  );
  const replaceAll = useCallback(
    (filterValues) => {
      const encodedFilters2 = encodeBackendFilters(filterValues, filters);
      if (encodedFilters2) {
        searchParams.set(BackendFiltersUrlKey, encodedFilters2);
      } else {
        searchParams.delete(BackendFiltersUrlKey);
      }
      navigate({ search: `?${searchParams}` }, { replace: true });
    },
    [filters, navigate, searchParams]
  );
  const add = useCallback(
    (filterValues) => {
      const existing = getDecodedWithoutKeys(filterValues);
      const decodedFilters2 = [...existing, ...filterValues];
      replaceAll(decodedFilters2);
    },
    [getDecodedWithoutKeys, replaceAll]
  );
  const remove = useCallback(
    (key) => replaceAll(getDecodedWithoutKeys([key])),
    [getDecodedWithoutKeys, replaceAll]
  );
  return {
    add,
    remove,
    replaceAll,
    decodedFilters,
    encodedFilters
  };
}
const EMPTY_PAGINATION_RESPONSE = {
  pagination: { data: [], from: 0, to: 0, per_page: 15, current_page: 1 }
};
function hasNextPage(pagination) {
  if ("next_cursor" in pagination) {
    return pagination.next_cursor != null;
  }
  if ("last_page" in pagination) {
    return pagination.current_page < pagination.last_page;
  }
  return pagination.data.length > 0 && pagination.data.length >= pagination.per_page;
}
function NameWithAvatar({
  image,
  label,
  description,
  labelClassName,
  avatarSize = "md"
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-12", children: [
    image && /* @__PURE__ */ jsx(Avatar, { size: avatarSize, className: "flex-shrink-0", src: image }),
    /* @__PURE__ */ jsxs("div", { className: "min-w-0 overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: clsx(labelClassName, "overflow-hidden overflow-ellipsis"),
          children: label
        }
      ),
      description && /* @__PURE__ */ jsx("div", { className: "overflow-hidden overflow-ellipsis text-xs text-muted", children: description })
    ] })
  ] });
}
function NameWithAvatarPlaceholder({
  labelClassName,
  showDescription
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex w-full max-w-4/5 items-center gap-12", children: [
    /* @__PURE__ */ jsx(Skeleton, { size: "w-40 h-40 md:w-32 md:h-32", variant: "rect" }),
    /* @__PURE__ */ jsxs("div", { className: "flex-auto", children: [
      /* @__PURE__ */ jsx("div", { className: clsx(labelClassName, "leading-3"), children: /* @__PURE__ */ jsx(Skeleton, {}) }),
      showDescription && /* @__PURE__ */ jsx("div", { className: "mt-4 leading-3 text-muted", children: /* @__PURE__ */ jsx(Skeleton, {}) })
    ] })
  ] });
}
function BaseSlider(props) {
  const {
    size = "md",
    inline,
    label,
    showValueLabel = !!label,
    className,
    width = "w-full",
    slider,
    children,
    trackColor = "primary",
    fillColor = "primary"
  } = props;
  const {
    domProps,
    trackRef,
    getThumbPercent,
    getThumbValueLabel,
    labelId,
    groupId,
    thumbIds,
    isDisabled,
    numberFormatter,
    minValue,
    maxValue,
    step,
    values,
    getValueLabel
  } = slider;
  let outputValue = "";
  let maxLabelLength = Math.max(
    [...numberFormatter.format(minValue)].length,
    [...numberFormatter.format(maxValue)].length,
    [...numberFormatter.format(step)].length
  );
  if (getValueLabel) {
    outputValue = getValueLabel(values[0]);
  } else if (values.length === 1) {
    outputValue = getThumbValueLabel(0);
  } else if (values.length === 2) {
    outputValue = `${getThumbValueLabel(0)} – ${getThumbValueLabel(1)}`;
    maxLabelLength = 3 + 2 * Math.max(
      maxLabelLength,
      [...numberFormatter.format(minValue)].length,
      [...numberFormatter.format(maxValue)].length
    );
  }
  const style = getInputFieldClassNames({
    size,
    disabled: isDisabled,
    labelDisplay: "flex"
  });
  const wrapperClassname = clsx("touch-none", className, width, {
    "flex items-center": inline
  });
  return /* @__PURE__ */ jsxs("div", { className: wrapperClassname, role: "group", id: groupId, children: [
    (label || showValueLabel) && /* @__PURE__ */ jsxs("div", { className: clsx(style.label, "select-none"), children: [
      label && /* @__PURE__ */ jsx(
        "label",
        {
          onClick: () => {
            var _a;
            (_a = document.getElementById(thumbIds[0])) == null ? void 0 : _a.focus();
          },
          id: labelId,
          htmlFor: groupId,
          children: label
        }
      ),
      showValueLabel && /* @__PURE__ */ jsx(
        "output",
        {
          htmlFor: thumbIds[0],
          className: "ml-auto text-right",
          "aria-live": "off",
          style: !maxLabelLength ? void 0 : {
            width: `${maxLabelLength}ch`,
            minWidth: `${maxLabelLength}ch`
          },
          children: outputValue
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: trackRef,
        className: clsx("relative", getWrapperHeight(props)),
        ...domProps,
        role: "presentation",
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: clsx(
                "absolute inset-0 m-auto rounded",
                getTrackColor(trackColor, isDisabled),
                getTrackHeight(size)
              )
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: clsx(
                "absolute inset-0 my-auto rounded",
                getFillColor(fillColor, isDisabled),
                getTrackHeight(size)
              ),
              style: { width: `${Math.max(getThumbPercent(0) * 100, 0)}%` }
            }
          ),
          children
        ]
      }
    )
  ] });
}
function getWrapperHeight({ size, wrapperHeight }) {
  if (wrapperHeight)
    return wrapperHeight;
  switch (size) {
    case "xs":
      return "h-14";
    case "sm":
      return "h-20";
    default:
      return "h-30";
  }
}
function getTrackHeight(size) {
  switch (size) {
    case "xs":
      return "h-2";
    case "sm":
      return "h-3";
    default:
      return "h-4";
  }
}
function getTrackColor(color, isDisabled) {
  if (isDisabled) {
    color = "disabled";
  }
  switch (color) {
    case "disabled":
      return "bg-slider-disabled/60";
    case "primary":
      return "bg-primary-light";
    case "neutral":
      return "bg-divider";
    default:
      return color;
  }
}
function getFillColor(color, isDisabled) {
  if (isDisabled) {
    color = "disabled";
  }
  switch (color) {
    case "disabled":
      return "bg-slider-disabled";
    case "primary":
      return "bg-primary";
    default:
      return color;
  }
}
function useSlider({
  minValue = 0,
  maxValue = 100,
  isDisabled = false,
  step = 1,
  formatOptions,
  onChangeEnd,
  onPointerDown,
  label,
  getValueLabel,
  showThumbOnHoverOnly,
  thumbSize,
  onPointerMove,
  ...props
}) {
  const [isPointerOver, setIsPointerOver] = useState(false);
  const numberFormatter = useNumberFormatter(formatOptions);
  const { addGlobalListener, removeGlobalListener } = useGlobalListeners();
  const trackRef = useRef(null);
  const [values, setValues] = useControlledState(
    props.value ? props.value : void 0,
    props.defaultValue ?? [minValue],
    props.onChange
  );
  const valuesRef = useRef(null);
  valuesRef.current = values;
  const [draggedThumbs, setDraggedThumbs] = useState(
    new Array(values.length).fill(false)
  );
  const draggedThumbsRef = useRef(null);
  draggedThumbsRef.current = draggedThumbs;
  function getFormattedValue(value) {
    return numberFormatter.format(value);
  }
  const isThumbDragging = (index) => {
    var _a;
    return ((_a = draggedThumbsRef.current) == null ? void 0 : _a[index]) || false;
  };
  const getThumbValueLabel = (index) => getFormattedValue(values[index]);
  const getThumbMinValue = (index) => index === 0 ? minValue : values[index - 1];
  const getThumbMaxValue = (index) => index === values.length - 1 ? maxValue : values[index + 1];
  const setThumbValue = (index, value) => {
    if (isDisabled || !isThumbEditable(index) || !valuesRef.current) {
      return;
    }
    const thisMin = getThumbMinValue(index);
    const thisMax = getThumbMaxValue(index);
    value = snapValueToStep(value, thisMin, thisMax, step);
    valuesRef.current = replaceIndex(valuesRef.current, index, value);
    setValues(valuesRef.current);
  };
  const updateDraggedThumbs = (index, dragging) => {
    var _a;
    if (isDisabled || !isThumbEditable(index)) {
      return;
    }
    const wasDragging = (_a = draggedThumbsRef.current) == null ? void 0 : _a[index];
    draggedThumbsRef.current = replaceIndex(
      draggedThumbsRef.current || [],
      index,
      dragging
    );
    setDraggedThumbs(draggedThumbsRef.current);
    if (onChangeEnd && wasDragging && !draggedThumbsRef.current.some(Boolean)) {
      onChangeEnd(valuesRef.current || []);
    }
  };
  const [focusedThumb, setFocusedThumb] = useState(
    void 0
  );
  const getValuePercent = (value) => {
    const x = Math.min(1, (value - minValue) / (maxValue - minValue));
    if (isNaN(x)) {
      return 0;
    }
    return x;
  };
  const getThumbPercent = (index) => getValuePercent(valuesRef.current[index]);
  const setThumbPercent = (index, percent) => {
    setThumbValue(index, getPercentValue(percent));
  };
  const getRoundedValue = (value) => Math.round((value - minValue) / step) * step + minValue;
  const getPercentValue = (percent) => {
    const val = percent * (maxValue - minValue) + minValue;
    return clamp(getRoundedValue(val), minValue, maxValue);
  };
  const editableThumbsRef = useRef(
    new Array(values.length).fill(true)
  );
  const isThumbEditable = (index) => editableThumbsRef.current[index];
  const setThumbEditable = (index, editable) => {
    editableThumbsRef.current[index] = editable;
  };
  const realTimeTrackDraggingIndex = useRef(null);
  const currentPointer = useRef(void 0);
  const handlePointerDown = (e) => {
    if (e.pointerType === "mouse" && (e.button !== 0 || e.altKey || e.ctrlKey || e.metaKey)) {
      return;
    }
    onPointerDown == null ? void 0 : onPointerDown();
    if (trackRef.current && !isDisabled && values.every((_, i) => !draggedThumbs[i])) {
      const size = trackRef.current.offsetWidth;
      const trackPosition = trackRef.current.getBoundingClientRect().left;
      const offset = e.clientX - trackPosition;
      const percent = offset / size;
      const value = getPercentValue(percent);
      let closestThumb;
      const split = values.findIndex((v) => value - v < 0);
      if (split === 0) {
        closestThumb = split;
      } else if (split === -1) {
        closestThumb = values.length - 1;
      } else {
        const lastLeft = values[split - 1];
        const firstRight = values[split];
        if (Math.abs(lastLeft - value) < Math.abs(firstRight - value)) {
          closestThumb = split - 1;
        } else {
          closestThumb = split;
        }
      }
      if (closestThumb >= 0 && isThumbEditable(closestThumb)) {
        e.preventDefault();
        realTimeTrackDraggingIndex.current = closestThumb;
        setFocusedThumb(closestThumb);
        currentPointer.current = e.pointerId;
        updateDraggedThumbs(realTimeTrackDraggingIndex.current, true);
        setThumbValue(closestThumb, value);
        addGlobalListener(window, "pointerup", onUpTrack, false);
      } else {
        realTimeTrackDraggingIndex.current = null;
      }
    }
  };
  const currentPosition = useRef(null);
  const { domProps: moveDomProps } = usePointerEvents({
    onPointerDown: handlePointerDown,
    onMoveStart() {
      currentPosition.current = null;
    },
    onMove(e, deltaX) {
      var _a;
      const size = ((_a = trackRef.current) == null ? void 0 : _a.offsetWidth) || 0;
      if (currentPosition.current == null) {
        currentPosition.current = getThumbPercent(realTimeTrackDraggingIndex.current || 0) * size;
      }
      currentPosition.current += deltaX;
      if (realTimeTrackDraggingIndex.current != null && trackRef.current) {
        const percent = clamp(currentPosition.current / size, 0, 1);
        setThumbPercent(realTimeTrackDraggingIndex.current, percent);
      }
    },
    onMoveEnd() {
      if (realTimeTrackDraggingIndex.current != null) {
        updateDraggedThumbs(realTimeTrackDraggingIndex.current, false);
        realTimeTrackDraggingIndex.current = null;
      }
    }
  });
  const domProps = mergeProps(moveDomProps, {
    onPointerEnter: () => {
      setIsPointerOver(true);
    },
    onPointerLeave: () => {
      setIsPointerOver(false);
    },
    onPointerMove: (e) => {
      onPointerMove == null ? void 0 : onPointerMove(e);
    }
  });
  const onUpTrack = (e) => {
    const id2 = e.pointerId;
    if (id2 === currentPointer.current) {
      if (realTimeTrackDraggingIndex.current != null) {
        updateDraggedThumbs(realTimeTrackDraggingIndex.current, false);
        realTimeTrackDraggingIndex.current = null;
      }
      removeGlobalListener(window, "pointerup", onUpTrack, false);
    }
  };
  const id = useId();
  const labelId = label ? `${id}-label` : void 0;
  const groupId = `${id}-group`;
  const thumbIds = [...Array(values.length)].map((v, i) => {
    return `${id}-thumb-${i}`;
  });
  return {
    domProps,
    trackRef,
    isDisabled,
    step,
    values,
    minValue,
    maxValue,
    focusedThumb,
    labelId,
    groupId,
    thumbIds,
    numberFormatter,
    getThumbPercent,
    getThumbMinValue,
    getThumbMaxValue,
    getThumbValueLabel,
    isThumbDragging,
    setThumbValue,
    updateDraggedThumbs,
    setThumbEditable,
    setFocusedThumb,
    getValueLabel,
    isPointerOver,
    showThumbOnHoverOnly,
    thumbSize
  };
}
function replaceIndex(array, index, value) {
  if (array[index] === value) {
    return array;
  }
  return [...array.slice(0, index), value, ...array.slice(index + 1)];
}
function SliderThumb({
  index,
  slider,
  isDisabled: isThumbDisabled,
  ariaLabel,
  inputRef,
  onBlur,
  fillColor = "primary"
}) {
  const inputObjRef = useObjectRef(inputRef);
  const { addGlobalListener, removeGlobalListener } = useGlobalListeners();
  const {
    step,
    values,
    focusedThumb,
    labelId,
    thumbIds,
    isDisabled: isSliderDisabled,
    getThumbPercent,
    getThumbMinValue,
    getThumbMaxValue,
    getThumbValueLabel,
    setThumbValue,
    updateDraggedThumbs,
    isThumbDragging,
    setThumbEditable,
    setFocusedThumb,
    isPointerOver,
    showThumbOnHoverOnly,
    thumbSize = "w-18 h-18"
  } = slider;
  const isDragging = isThumbDragging(index);
  const value = values[index];
  setThumbEditable(index, !isThumbDisabled);
  const isDisabled = isThumbDisabled || isSliderDisabled;
  const focusInput = useCallback(() => {
    if (inputObjRef.current) {
      inputObjRef.current.focus({ preventScroll: true });
    }
  }, [inputObjRef]);
  const isFocused = focusedThumb === index;
  useEffect(() => {
    if (isFocused) {
      focusInput();
    }
  }, [isFocused, focusInput]);
  const currentPointer = useRef(void 0);
  const handlePointerUp = (e) => {
    if (e.pointerId === currentPointer.current) {
      focusInput();
      updateDraggedThumbs(index, false);
      removeGlobalListener(window, "pointerup", handlePointerUp, false);
    }
  };
  const className = clsx(
    "outline-none rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2 absolute inset-0 transition-button duration-200",
    thumbSize,
    !isDisabled && "shadow-md",
    thumbColor({ fillColor, isDisabled, isDragging }),
    // show thumb on hover and while dragging, otherwise "blur" event will fire on thumb and dragging will stop
    !showThumbOnHoverOnly || showThumbOnHoverOnly && isDragging || isPointerOver ? "visible" : "invisible"
  );
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "presentation",
      className,
      style: {
        left: `${Math.max(getThumbPercent(index) * 100, 0)}%`
      },
      onPointerDown: (e) => {
        if (e.button !== 0 || e.altKey || e.ctrlKey || e.metaKey) {
          return;
        }
        focusInput();
        currentPointer.current = e.pointerId;
        updateDraggedThumbs(index, true);
        addGlobalListener(window, "pointerup", handlePointerUp, false);
      },
      children: /* @__PURE__ */ jsx(
        "input",
        {
          id: thumbIds[index],
          onKeyDown: createEventHandler(() => {
            updateDraggedThumbs(index, true);
          }),
          onKeyUp: createEventHandler(() => {
            updateDraggedThumbs(index, false);
          }),
          ref: inputObjRef,
          tabIndex: !isDisabled ? 0 : void 0,
          min: getThumbMinValue(index),
          max: getThumbMaxValue(index),
          step,
          value,
          disabled: isDisabled,
          "aria-label": ariaLabel,
          "aria-labelledby": labelId,
          "aria-orientation": "horizontal",
          "aria-valuetext": getThumbValueLabel(index),
          onFocus: () => {
            setFocusedThumb(index);
          },
          onBlur: (e) => {
            setFocusedThumb(void 0);
            updateDraggedThumbs(index, false);
            onBlur == null ? void 0 : onBlur(e);
          },
          onChange: (e) => {
            setThumbValue(index, parseFloat(e.target.value));
          },
          type: "range",
          className: "sr-only"
        }
      )
    }
  );
}
function thumbColor({
  isDisabled,
  isDragging,
  fillColor
}) {
  if (isDisabled) {
    return "bg-slider-disabled cursor-default";
  }
  if (fillColor && fillColor !== "primary") {
    return fillColor;
  }
  return clsx(
    "hover:bg-primary-dark",
    isDragging ? "bg-primary-dark" : "bg-primary"
  );
}
function Slider({ inputRef, onBlur, ...props }) {
  const { onChange, onChangeEnd, value, defaultValue, ...otherProps } = props;
  const baseProps = {
    ...otherProps,
    // Normalize `value: number[]` to `value: number`
    value: value != null ? [value] : void 0,
    defaultValue: defaultValue != null ? [defaultValue] : void 0,
    onChange: (v) => {
      onChange == null ? void 0 : onChange(v[0]);
    },
    onChangeEnd: (v) => {
      onChangeEnd == null ? void 0 : onChangeEnd(v[0]);
    }
  };
  const slider = useSlider(baseProps);
  return /* @__PURE__ */ jsx(BaseSlider, { ...baseProps, slider, children: /* @__PURE__ */ jsx(
    SliderThumb,
    {
      fillColor: props.fillColor,
      index: 0,
      slider,
      inputRef,
      onBlur
    }
  ) });
}
function FormSlider({ name, ...props }) {
  const {
    field: { onChange, onBlur, value = "", ref }
  } = useController({
    name
  });
  const formProps = {
    onChange,
    onBlur,
    value: value || ""
    // avoid issues with "null" value when setting form defaults from backend model
  };
  return /* @__PURE__ */ jsx(Slider, { inputRef: ref, ...mergeProps(formProps, props) });
}
const MoreVertIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" }),
  "MoreVertOutlined"
);
const artistPageTabs = {
  discography: 1,
  similar: 2,
  about: 3,
  tracks: 4,
  albums: 5,
  followers: 6
};
function ImageZoomDialog(props) {
  const { close } = useDialogContext();
  const { image, images } = props;
  const [activeIndex, setActiveIndex] = useControlledState(
    props.activeIndex,
    props.defaultActiveIndex,
    props.onActiveIndexChange
  );
  const src = image || (images == null ? void 0 : images[activeIndex]);
  return /* @__PURE__ */ jsx(Dialog, { size: "fullscreenTakeover", background: "bg-black/80", children: /* @__PURE__ */ jsxs(DialogBody, { padding: "p-0", className: "h-full w-full", children: [
    /* @__PURE__ */ jsx(
      IconButton,
      {
        size: "lg",
        color: "paper",
        className: "absolute right-0 top-0 z-20 text-white",
        onClick: () => {
          close();
        },
        children: /* @__PURE__ */ jsx(CloseIcon, {})
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative flex h-full w-full items-center justify-center p-40", children: [
      (images == null ? void 0 : images.length) ? /* @__PURE__ */ jsx(
        IconButton,
        {
          size: "lg",
          color: "white",
          variant: "flat",
          className: "absolute bottom-0 left-20 top-0 my-auto",
          disabled: activeIndex < 1,
          onClick: () => {
            setActiveIndex(activeIndex - 1);
          },
          children: /* @__PURE__ */ jsx(KeyboardArrowLeftIcon, {})
        }
      ) : null,
      /* @__PURE__ */ jsx(
        "img",
        {
          src,
          alt: "",
          className: "max-h-full w-auto object-contain shadow"
        }
      ),
      (images == null ? void 0 : images.length) ? /* @__PURE__ */ jsx(
        IconButton,
        {
          size: "lg",
          color: "white",
          variant: "flat",
          className: "absolute bottom-0 right-20 top-0 my-auto",
          disabled: activeIndex + 1 === (images == null ? void 0 : images.length),
          onClick: () => {
            setActiveIndex(activeIndex + 1);
          },
          children: /* @__PURE__ */ jsx(KeyboardArrowRightIcon, {})
        }
      ) : null
    ] })
  ] }) });
}
function GenreLink({ genre, className, ...linkProps }) {
  const uri = useMemo(() => {
    return getGenreLink(genre);
  }, [genre]);
  return /* @__PURE__ */ jsx(
    Link,
    {
      ...linkProps,
      className: clsx(
        "block outline-none first-letter:capitalize hover:underline focus-visible:underline",
        className
      ),
      to: uri,
      children: genre.display_name || genre.name
    }
  );
}
function getGenreLink(genre, { absolute } = {}) {
  const genreName = slugifyString(genre.name);
  let link = `/genre/${genreName}`;
  if (absolute) {
    link = `${getBootstrapData().settings.base_url}${link}`;
  }
  return link;
}
function useDeleteComments() {
  return useMutation({
    mutationFn: (payload) => deleteComments(payload),
    onSuccess: (response, payload) => {
      toast(
        message("[one Comment deleted|other Deleted :count comments]", {
          values: { count: payload.commentIds.length }
        })
      );
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function deleteComments({ commentIds }) {
  return apiClient.delete(`comment/${commentIds.join(",")}`).then((r) => r.data);
}
const TrendingUpIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z" }),
  "TrendingUpOutlined"
);
const CHANNEL_MODEL = "channel";
const GridViewIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z" }),
  "GridViewOutlined"
);
function useIsTouchDevice() {
  return useMediaQuery("((pointer: coarse))");
}
function useChannelQueryParams(channel, userParams) {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const { encodedFilters } = useBackendFilterUrlParams();
  const queryParams = {
    ...userParams,
    restriction: params.restriction || "",
    order: searchParams.get("order"),
    [BackendFiltersUrlKey]: encodedFilters,
    paginate: "simple"
  };
  if (!queryParams.order && channel) {
    queryParams.order = channel.config.contentOrder || "popularity:desc";
  }
  return queryParams;
}
function useChannel(slugOrId, loader, userParams) {
  const params = useParams();
  const channelId = slugOrId || params.slugOrId;
  const queryParams = useChannelQueryParams(void 0, userParams);
  return useQuery({
    // only refetch when channel ID or restriction changes and not query params.
    // content will be re-fetched in channel content components
    // on SSR use query params as well, to avoid caching wrong data when query params change
    queryKey: channelQueryKey(channelId, queryParams),
    queryFn: () => fetchChannel(channelId, { ...queryParams, loader }),
    initialData: () => {
      var _a, _b;
      const data = (_a = getBootstrapData().loaders) == null ? void 0 : _a[loader];
      const isSameChannel = (data == null ? void 0 : data.channel.id) == channelId || (data == null ? void 0 : data.channel.slug) == channelId;
      const isSameRestriction = !queryParams.restriction || ((_b = data == null ? void 0 : data.channel.restriction) == null ? void 0 : _b.name) === queryParams.restriction;
      if (isSameChannel && isSameRestriction) {
        return data;
      }
    }
  });
}
function channelQueryKey(slugOrId, params) {
  return ["channel", `${slugOrId}`, params];
}
function channelEndpoint(slugOrId) {
  return `channel/${slugOrId}`;
}
function fetchChannel(slugOrId, params = {}) {
  return apiClient.get(channelEndpoint(slugOrId), { params }).then((response) => response.data);
}
export {
  BackendFiltersUrlKey as B,
  CHANNEL_MODEL as C,
  EMPTY_PAGINATION_RESPONSE as E,
  FormSlider as F,
  GenreLink as G,
  ImageZoomDialog as I,
  MoreVertIcon as M,
  NameWithAvatar as N,
  Slider as S,
  TrendingUpIcon as T,
  artistPageTabs as a,
  useDeleteComments as b,
  GridViewIcon as c,
  useIsTouchDevice as d,
  useChannel as e,
  useChannelQueryParams as f,
  getGenreLink as g,
  hasNextPage as h,
  channelQueryKey as i,
  channelEndpoint as j,
  NameWithAvatarPlaceholder as k,
  useSlider as l,
  useBackendFilterUrlParams as u
};
//# sourceMappingURL=use-channel-9a9adc56.mjs.map
