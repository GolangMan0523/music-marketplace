var _a;
import { jsxs, jsx, Fragment as Fragment$1 } from "react/jsx-runtime";
import { Outlet, Link, useLocation, Navigate, useNavigate, useParams, NavLink, useOutletContext, useRoutes } from "react-router-dom";
import clsx from "clsx";
import { u as useSettings, C as CustomMenu, T as Trans, D as DashboardLayoutContext, N as Navbar, I as IconButton, M as MenuOpenIcon, s as setInLocalStorage, a as DashboardLayout, b as DashboardContent, c as useIsMobileMediaQuery, d as DialogTrigger, m as message, e as useNumberFormatter, S as SelectForwardRef, f as Item, K as KeyboardArrowRightIcon, g as createSvgIcon, A as ArrowDropDownIcon, h as useTrans, F as FormSelect, i as FormTextField, j as useDialogContext, k as Dialog, l as DialogHeader, n as DialogBody, o as Form$1, p as Checkbox, B as Button, q as TextField, r as SearchIcon, t as KeyboardArrowDownIcon, v as DialogFooter, w as Skeleton, x as CloseIcon, y as opacityAnimation, P as ProgressBar, z as StaticPageTitle, E as queryClient, G as toast, H as showHttpErrorToast, J as apiClient, L as ConfirmationDialog, O as IllustratedMessage, Q as SvgImage, R as AddIcon, U as downloadFileFromUrl, V as onFormQueryError, W as FormSwitch, X as CheckIcon, Y as Chip, Z as FormattedDate, _ as Tooltip, $ as LoginIcon, a0 as FormImageSelector, a1 as useValueLists, a2 as DoneAllIcon, a3 as List, a4 as ListItem, a5 as Switch, a6 as createSvgIconFromTree, a7 as usePrevious, a8 as Section, a9 as ButtonBase, aa as getInputFieldClassNames, ab as MixedText, ac as FileUploadProvider, ad as useAppearanceEditorMode, ae as ProgressCircle, af as useNavigate$1, ag as useBootstrapData, ah as FullPageLoader, ai as USER_MODEL, aj as LinkStyle, ak as SiteConfigContext, al as getBootstrapData, am as ExternalLink, an as MenuTrigger, ao as Menu, ap as Tabs, aq as TabList, ar as Tab, as as TabPanels, at as TabPanel, au as FormRadioGroup, av as FormRadio, aw as DateFormatPresets, ax as prettyBytes, ay as useSocialLogin, az as useField, aA as Field, aB as useResendVerificationEmail, aC as useUser, aD as useUploadAvatar, aE as useRemoveAvatar, aF as slugifyString, aG as isAbsoluteUrl, aH as useMediaQuery, aI as useProducts, aJ as FormattedPrice, aK as PauseIcon, aL as TrackImage, aM as TrackLink, aN as SmallArtistImage, aO as ArtistLink, aP as ARTIST_MODEL, aQ as TRACK_MODEL, aR as AlbumImage, aS as AlbumLink, aT as ALBUM_MODEL, aU as PageStatus, aV as TwitterIcon, aW as FacebookIcon, aX as PLAYLIST_MODEL, aY as CreatePlaylistDialog, aZ as PlaylistLink, a_ as UserProfileLink, a$ as UpdatePlaylistDialog, b0 as FormattedRelativeTime, b1 as useSelectedLocale, b2 as ComboBoxForwardRef, b3 as ImageIcon, b4 as WarningIcon, b5 as useActiveUpload, b6 as UploadInputType, b7 as Disk, b8 as useCustomPage, b9 as PageMetaTags, ba as useCollator, bb as loadFonts, bc as AuthRoute, bd as NotFoundPage } from "../server-entry.mjs";
import { m, AnimatePresence } from "framer-motion";
import React, { useContext, cloneElement, useRef, Fragment, isValidElement, useId, useState, forwardRef, Suspense, useEffect, useMemo, memo, useCallback } from "react";
import { u as useDateRangePickerState, D as DateRangeDialog, a as DatePickerField, b as DateRangeIcon, c as DateSegmentList, A as ArrowRightAltIcon, d as DateRangePresets, F as FormNormalizedModelField, e as FormChipField, f as FormattedDateTimeRange, g as useNormalizedModel, h as useDatatableData, i as DatatableDataQueryKey, j as FormDatePicker, k as DragHandleIcon, C as ChipField, l as useCurrentDateTime, m as CrupdateResourceLayout, n as useNormalizedModels, o as musicImage, p as useBackstageRequest, q as DocumentScannerIcon, r as CrupdateArtistForm, s as formatReportData, t as ChartColors, B as BaseChart, L as LineChart, P as PolarAreaChart, G as GeoChart, R as ReportDateSelector, I as InsightsReportCharts, v as InfoDialogTrigger, w as CreateTrackPage, U as UpdateTrackPage, x as BackstageTrackInsights, y as CreateAlbumPage, z as UpdateAlbumPage, E as BackstageAlbumInsights, H as UpdateArtistPage, J as BackstageArtistInsights, K as UploadPage, M as useStickySentinel, N as ArrowBackIcon } from "./backstage-track-insights-b8d60490.mjs";
import { parseAbsoluteToLocal } from "@internationalized/date";
import { useController, useForm, useFieldArray, useFormContext, FormProvider } from "react-hook-form";
import { mergeProps, useObjectRef, isMac } from "@react-aria/utils";
import { h as hasNextPage, u as useBackendFilterUrlParams, B as BackendFiltersUrlKey, N as NameWithAvatar, F as FormSlider, M as MoreVertIcon, a as artistPageTabs, I as ImageZoomDialog, G as GenreLink, b as useDeleteComments, T as TrendingUpIcon, C as CHANNEL_MODEL, c as GridViewIcon, d as useIsTouchDevice, E as EMPTY_PAGINATION_RESPONSE, e as useChannel } from "./use-channel-9a9adc56.mjs";
import { K as KeyboardArrowLeftIcon, F as FormattedNumber, A as Avatar, T as Table, C as ChipList, u as useSortable, D as DragPreview, m as moveItemInNewArray, a as FormattedDuration, U as UserAvatar, G as GENRE_MODEL, b as TableContext } from "./theme-value-to-hex-ee0bd15b.mjs";
import { useControlledState } from "@react-stately/utils";
import { FocusScope, useFocusManager } from "@react-aria/focus";
import { useMutation, useQuery, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { E as EditIcon } from "./Edit-f0b99a84.mjs";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import deepMerge from "deepmerge";
import { produce } from "immer";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { parseColor } from "@react-stately/color";
import { nanoid } from "nanoid";
import { diff } from "deep-object-diff";
import dot from "dot-object";
import memoize from "nano-memoize";
import { B as Breadcrumb, a as BreadcrumbItem, C as ChevronRightIcon, u as useCancelSubscription, b as useResumeSubscription } from "./use-resume-subscription-fe3dd087.mjs";
import { useVirtualizer } from "@tanstack/react-virtual";
function AdminSidebar({ className, isCompactMode }) {
  const { version } = useSettings();
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        className,
        "relative flex flex-col gap-20 overflow-y-auto border-r bg-alt px-12 pb-16 pt-26 text-sm font-medium text-muted"
      ),
      children: [
        /* @__PURE__ */ jsx(
          CustomMenu,
          {
            matchDescendants: (to) => to === "/admin",
            menu: "admin-sidebar",
            orientation: "vertical",
            onlyShowIcons: isCompactMode,
            itemClassName: ({ isActive }) => clsx(
              "block w-full rounded-button py-12 px-16",
              isActive ? "bg-primary/6 text-primary font-semibold" : "hover:bg-hover"
            ),
            gap: "gap-8"
          }
        ),
        !isCompactMode && /* @__PURE__ */ jsx("div", { className: "mt-auto gap-14 px-16 text-xs", children: /* @__PURE__ */ jsx(Trans, { message: "Version: :number", values: { number: version } }) })
      ]
    }
  );
}
function DashboardSidenav({
  className,
  position,
  children,
  size = "md",
  mode,
  overlayPosition = "fixed",
  display = "flex",
  overflow = "overflow-hidden",
  forceClosed = false
}) {
  const {
    isMobileMode,
    leftSidenavStatus,
    setLeftSidenavStatus,
    rightSidenavStatus,
    setRightSidenavStatus
  } = useContext(DashboardLayoutContext);
  const status = position === "left" ? leftSidenavStatus : rightSidenavStatus;
  const isOverlayMode = isMobileMode || mode === "overlay";
  const variants = {
    open: { display, width: null },
    compact: {
      display,
      width: null
    },
    closed: {
      width: 0,
      transitionEnd: {
        display: "none"
      }
    }
  };
  const sizeClassName = getSize(status === "compact" ? "compact" : size);
  return /* @__PURE__ */ jsx(
    m.div,
    {
      variants,
      initial: false,
      animate: forceClosed ? "closed" : status,
      transition: { type: "tween", duration: 0.15 },
      onClick: (e) => {
        const target = e.target;
        if (isMobileMode && (target.closest("button") || target.closest("a"))) {
          setLeftSidenavStatus("closed");
          setRightSidenavStatus("closed");
        }
      },
      className: clsx(
        className,
        position === "left" ? "dashboard-grid-sidenav-left" : "dashboard-grid-sidenav-right",
        "will-change-[width]",
        overflow,
        sizeClassName,
        isOverlayMode && `${overlayPosition} bottom-0 top-0 z-20 shadow-2xl`,
        isOverlayMode && position === "left" && "left-0",
        isOverlayMode && position === "right" && "right-0"
      ),
      children: cloneElement(children, {
        className: clsx(
          children.props.className,
          "w-full h-full",
          status === "compact" && "compact-scrollbar"
        ),
        isCompactMode: status === "compact"
      })
    }
  );
}
function getSize(size) {
  switch (size) {
    case "compact":
      return "w-80";
    case "sm":
      return "w-224";
    case "md":
      return "w-240";
    case "lg":
      return "w-288";
    default:
      return size || "";
  }
}
function DashboardNavbar({
  children,
  className,
  hideToggleButton,
  ...props
}) {
  const {
    isMobileMode,
    leftSidenavStatus,
    setLeftSidenavStatus,
    name,
    leftSidenavCanBeCompact
  } = useContext(DashboardLayoutContext);
  const shouldToggleCompactMode = leftSidenavCanBeCompact && !isMobileMode;
  const shouldShowToggle = !hideToggleButton && (isMobileMode || leftSidenavCanBeCompact);
  const handleToggle = () => {
    setLeftSidenavStatus(leftSidenavStatus === "open" ? "closed" : "open");
  };
  const handleCompactModeToggle = () => {
    const newStatus = leftSidenavStatus === "compact" ? "open" : "compact";
    setInLocalStorage(`${name}.sidenav.compact`, newStatus === "compact");
    setLeftSidenavStatus(newStatus);
  };
  return /* @__PURE__ */ jsx(
    Navbar,
    {
      className: clsx("dashboard-grid-navbar", className),
      border: "border-b",
      size: "sm",
      toggleButton: shouldShowToggle ? /* @__PURE__ */ jsx(
        IconButton,
        {
          size: "md",
          onClick: () => {
            if (shouldToggleCompactMode) {
              handleCompactModeToggle();
            } else {
              handleToggle();
            }
          },
          children: /* @__PURE__ */ jsx(MenuOpenIcon, {})
        }
      ) : void 0,
      ...props,
      children
    }
  );
}
function AdminLayout() {
  return /* @__PURE__ */ jsxs(DashboardLayout, { name: "admin", leftSidenavCanBeCompact: true, children: [
    /* @__PURE__ */ jsx(DashboardNavbar, { size: "sm", menuPosition: "admin-navbar" }),
    /* @__PURE__ */ jsx(DashboardSidenav, { position: "left", size: "sm", children: /* @__PURE__ */ jsx(AdminSidebar, {}) }),
    /* @__PURE__ */ jsx(DashboardContent, { children: /* @__PURE__ */ jsx("div", { className: "bg dark:bg-alt", children: /* @__PURE__ */ jsx(Outlet, {}) }) })
  ] });
}
var FilterControlType = /* @__PURE__ */ ((FilterControlType2) => {
  FilterControlType2["Select"] = "select";
  FilterControlType2["DateRangePicker"] = "dateRangePicker";
  FilterControlType2["SelectModel"] = "selectModel";
  FilterControlType2["Input"] = "input";
  FilterControlType2["BooleanToggle"] = "booleanToggle";
  FilterControlType2["ChipField"] = "chipField";
  FilterControlType2["Custom"] = "custom";
  return FilterControlType2;
})(FilterControlType || {});
var FilterOperator = /* @__PURE__ */ ((FilterOperator2) => {
  FilterOperator2["eq"] = "=";
  FilterOperator2["ne"] = "!=";
  FilterOperator2["gt"] = ">";
  FilterOperator2["gte"] = ">=";
  FilterOperator2["lt"] = "<";
  FilterOperator2["lte"] = "<=";
  FilterOperator2["has"] = "has";
  FilterOperator2["hasAll"] = "hasAll";
  FilterOperator2["doesntHave"] = "doesntHave";
  FilterOperator2["between"] = "between";
  return FilterOperator2;
})(FilterOperator || {});
const ALL_PRIMITIVE_OPERATORS = [
  "=",
  "!=",
  ">",
  ">=",
  "<",
  "<="
  /* lte */
];
function DateRangePicker(props) {
  var _a2, _b;
  const { granularity, closeDialogOnSelection, ...fieldProps } = props;
  const state = useDateRangePickerState(props);
  const inputRef = useRef(null);
  const isMobile = useIsMobileMediaQuery();
  const hideCalendarIcon = isMobile && granularity !== "day";
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
      children: /* @__PURE__ */ jsx(DateRangeDialog, { state })
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
  const value = state.selectedValue;
  const onChange = state.setSelectedValue;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      DatePickerField,
      {
        ref: inputRef,
        wrapperProps: openOnClick,
        endAdornment: !hideCalendarIcon ? /* @__PURE__ */ jsx(DateRangeIcon, {}) : void 0,
        ...fieldProps,
        children: [
          /* @__PURE__ */ jsx(
            DateSegmentList,
            {
              isPlaceholder: (_a2 = state.isPlaceholder) == null ? void 0 : _a2.start,
              state,
              segmentProps: openOnClick,
              value: value.start,
              onChange: (newValue) => {
                onChange({ start: newValue, end: value.end });
              }
            }
          ),
          /* @__PURE__ */ jsx(
            ArrowRightAltIcon,
            {
              className: "block flex-shrink-0 text-muted",
              size: "md"
            }
          ),
          /* @__PURE__ */ jsx(
            DateSegmentList,
            {
              isPlaceholder: (_b = state.isPlaceholder) == null ? void 0 : _b.end,
              state,
              segmentProps: openOnClick,
              value: value.end,
              onChange: (newValue) => {
                onChange({ start: value.start, end: newValue });
              }
            }
          )
        ]
      }
    ),
    dialog
  ] });
}
function isHourSegment(e) {
  return ["hour", "minute", "dayPeriod"].includes(
    e.currentTarget.ariaLabel || ""
  );
}
function FormDateRangePicker(props) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid, error }
  } = useController({
    name: props.name
  });
  const formProps = {
    onChange: (e) => {
      onChange(e ? dateRangeToAbsoluteRange(e) : null);
    },
    onBlur,
    value: absoluteRangeToDateRange(value),
    invalid,
    errorMessage: error == null ? void 0 : error.message,
    inputRef: ref
  };
  return /* @__PURE__ */ jsx(DateRangePicker, { ...mergeProps(formProps, props) });
}
function absoluteRangeToDateRange(props) {
  const { start, end, preset } = props || {};
  const dateRange = { preset };
  try {
    if (start) {
      dateRange.start = typeof start === "string" ? parseAbsoluteToLocal(start) : start;
    }
    if (end) {
      dateRange.end = typeof end === "string" ? parseAbsoluteToLocal(end) : end;
    }
  } catch (e) {
  }
  return dateRange;
}
function dateRangeToAbsoluteRange({
  start,
  end,
  preset
} = {}) {
  const absoluteRange = {
    preset
  };
  if (start) {
    absoluteRange.start = start.toAbsoluteString();
  }
  if (end) {
    absoluteRange.end = end.toAbsoluteString();
  }
  return absoluteRange;
}
function timestampFilter(options) {
  var _a2;
  return {
    ...options,
    defaultOperator: FilterOperator.between,
    control: {
      type: FilterControlType.DateRangePicker,
      defaultValue: ((_a2 = options.control) == null ? void 0 : _a2.defaultValue) || dateRangeToAbsoluteRange(
        DateRangePresets[3].getRangeValue()
      )
    }
  };
}
function createdAtFilter(options) {
  return timestampFilter({
    key: "created_at",
    label: message("Date created"),
    ...options
  });
}
function updatedAtFilter(options) {
  return timestampFilter({
    key: "updated_at",
    label: message("Last updated"),
    ...options
  });
}
const UserDatatableFilters = [
  {
    key: "email_verified_at",
    label: message("Email"),
    description: message("Email verification status"),
    defaultOperator: FilterOperator.ne,
    control: {
      type: FilterControlType.Select,
      defaultValue: "01",
      options: [
        {
          key: "01",
          label: message("is confirmed"),
          value: { value: null, operator: FilterOperator.ne }
        },
        {
          key: "02",
          label: message("is not confirmed"),
          value: { value: null, operator: FilterOperator.eq }
        }
      ]
    }
  },
  createdAtFilter({
    description: message("Date user registered or was created")
  }),
  updatedAtFilter({
    description: message("Date user was last updated")
  }),
  {
    key: "subscriptions",
    label: message("Subscription"),
    description: message("Whether user is subscribed or not"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: "01",
      options: [
        {
          key: "01",
          label: message("is subscribed"),
          value: { value: "*", operator: FilterOperator.has }
        },
        {
          key: "02",
          label: message("is not subscribed"),
          value: { value: "*", operator: FilterOperator.doesntHave }
        }
      ]
    }
  }
];
const DataTableContext = React.createContext(
  null
);
function useDataTable() {
  return useContext(DataTableContext);
}
const defaultPerPage = 15;
const perPageOptions = [{ key: 10 }, { key: 15 }, { key: 20 }, { key: 50 }, { key: 100 }];
function DataTablePaginationFooter({
  query,
  onPerPageChange,
  onPageChange,
  className
}) {
  var _a2;
  const isMobile = useIsMobileMediaQuery();
  const numberFormatter = useNumberFormatter();
  const pagination = (_a2 = query.data) == null ? void 0 : _a2.pagination;
  if (!pagination)
    return null;
  const perPageSelect = onPerPageChange ? /* @__PURE__ */ jsx(
    SelectForwardRef,
    {
      minWidth: "min-w-auto",
      selectionMode: "single",
      disabled: query.isLoading,
      labelPosition: "side",
      size: "xs",
      label: /* @__PURE__ */ jsx(Trans, { message: "Items per page" }),
      selectedValue: pagination.per_page || defaultPerPage,
      onSelectionChange: (value) => onPerPageChange(value),
      children: perPageOptions.map((option) => /* @__PURE__ */ jsx(Item, { value: option.key, children: option.key }, option.key))
    }
  ) : null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "flex h-54 select-none items-center justify-end gap-20 px-20",
        className
      ),
      children: [
        !isMobile && perPageSelect,
        pagination.from && pagination.to && "total" in pagination && /* @__PURE__ */ jsx("div", { className: "text-sm", children: /* @__PURE__ */ jsx(
          Trans,
          {
            message: ":from - :to of :total",
            values: {
              from: pagination.from,
              to: pagination.to,
              total: numberFormatter.format(pagination.total)
            }
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "text-muted", children: [
          /* @__PURE__ */ jsx(
            IconButton,
            {
              disabled: query.isFetching || pagination.current_page < 2,
              onClick: () => {
                onPageChange == null ? void 0 : onPageChange((pagination == null ? void 0 : pagination.current_page) - 1);
              },
              children: /* @__PURE__ */ jsx(KeyboardArrowLeftIcon, {})
            }
          ),
          /* @__PURE__ */ jsx(
            IconButton,
            {
              disabled: query.isFetching || !hasNextPage(pagination),
              onClick: () => {
                onPageChange == null ? void 0 : onPageChange((pagination == null ? void 0 : pagination.current_page) + 1);
              },
              children: /* @__PURE__ */ jsx(KeyboardArrowRightIcon, {})
            }
          )
        ] })
      ]
    }
  );
}
const FilterAltIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M7 6h10l-5.01 6.3L7 6zm-2.75-.39C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39c.51-.66.04-1.61-.79-1.61H5.04c-.83 0-1.3.95-.79 1.61z" }),
  "FilterAltOutlined"
);
const AccordionAnimation = {
  variants: {
    open: {
      height: "auto",
      visibility: "visible",
      transitionEnd: {
        overflow: "auto"
      }
    },
    closed: {
      height: 0,
      overflow: "hidden",
      transitionEnd: {
        visibility: "hidden"
      }
    }
  },
  transition: { type: "tween", duration: 0.2 }
};
const Accordion = React.forwardRef(
  ({
    variant = "default",
    mode = "single",
    children,
    className,
    isLazy,
    ...other
  }, ref) => {
    const [expandedValues, setExpandedValues] = useControlledState(
      other.expandedValues,
      other.defaultExpandedValues || [],
      other.onExpandedChange
    );
    const itemsCount = React.Children.count(children);
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: clsx(variant === "outline" && "space-y-10", className),
        ref,
        role: "presentation",
        children: /* @__PURE__ */ jsx(AnimatePresence, { children: /* @__PURE__ */ jsx(FocusScope, { children: React.Children.map(children, (child, index) => {
          if (!isValidElement(child))
            return null;
          return cloneElement(child, {
            key: child.key || index,
            value: child.props.value || index,
            isFirst: index === 0,
            isLast: index === itemsCount - 1,
            mode,
            variant,
            expandedValues,
            setExpandedValues,
            isLazy
          });
        }) }) })
      }
    );
  }
);
function AccordionItem(props) {
  const {
    children,
    label,
    disabled,
    bodyClassName,
    labelClassName,
    buttonPadding = "py-10 pl-14 pr-10",
    startIcon,
    description,
    endAppend,
    chevronPosition = "right",
    isFirst,
    mode,
    isLazy,
    variant,
    footerContent,
    onHeaderMouseEnter,
    onHeaderMouseLeave
  } = props;
  const expandedValues = props.expandedValues || [];
  const value = props.value || 0;
  const setExpandedValues = props.setExpandedValues || (() => {
  });
  const ref = useRef(null);
  const isExpanded = !disabled && expandedValues.includes(value);
  const wasExpandedOnce = useRef(false);
  if (isExpanded) {
    wasExpandedOnce.current = true;
  }
  const focusManager = useFocusManager();
  const id = useId();
  const buttonId = `${id}-button`;
  const panelId = `${id}-panel`;
  const onKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        focusManager == null ? void 0 : focusManager.focusNext();
        break;
      case "ArrowUp":
        focusManager == null ? void 0 : focusManager.focusPrevious();
        break;
      case "Home":
        focusManager == null ? void 0 : focusManager.focusFirst();
        break;
      case "End":
        focusManager == null ? void 0 : focusManager.focusLast();
        break;
    }
  };
  const toggle = () => {
    const i = expandedValues.indexOf(value);
    if (i > -1) {
      const newKeys = [...expandedValues];
      newKeys.splice(i, 1);
      setExpandedValues(newKeys);
    } else if (mode === "single") {
      setExpandedValues([value]);
    } else {
      setExpandedValues([...expandedValues, value]);
    }
  };
  const chevron = /* @__PURE__ */ jsx("div", { className: clsx(variant === "minimal" && ""), children: /* @__PURE__ */ jsx(
    ArrowDropDownIcon,
    {
      "aria-hidden": "true",
      size: "md",
      className: clsx(
        disabled ? "text-disabled" : "text-muted",
        isExpanded && "rotate-180 transition-transform"
      )
    }
  ) });
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        variant === "default" && "border-b",
        variant === "outline" && "rounded-panel border",
        disabled && "text-disabled"
      ),
      children: [
        /* @__PURE__ */ jsxs(
          "h3",
          {
            className: clsx(
              "flex w-full items-center justify-between text-sm",
              disabled && "pointer-events-none",
              isFirst && variant === "default" && "border-t",
              isExpanded && variant !== "minimal" ? "border-b" : "border-b border-b-transparent",
              variant === "outline" ? isExpanded ? "rounded-panel-t" : "rounded-panel" : void 0
            ),
            onMouseEnter: onHeaderMouseEnter,
            onMouseLeave: onHeaderMouseLeave,
            children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  disabled,
                  "aria-expanded": isExpanded,
                  id: buttonId,
                  "aria-controls": panelId,
                  type: "button",
                  ref,
                  onKeyDown,
                  onClick: () => {
                    if (!disabled) {
                      toggle();
                    }
                  },
                  className: clsx(
                    "flex flex-auto items-center gap-10 text-left outline-none hover:bg-hover focus-visible:bg-primary/focus",
                    buttonPadding
                  ),
                  children: [
                    chevronPosition === "left" && chevron,
                    startIcon && cloneElement(startIcon, {
                      size: "md",
                      className: clsx(
                        startIcon.props.className,
                        disabled ? "text-disabled" : "text-muted"
                      )
                    }),
                    /* @__PURE__ */ jsxs("div", { className: "flex-auto overflow-hidden overflow-ellipsis", children: [
                      /* @__PURE__ */ jsx("div", { className: labelClassName, "data-testid": "accordion-label", children: label }),
                      description && /* @__PURE__ */ jsx("div", { className: "text-xs text-muted", children: description })
                    ] }),
                    chevronPosition === "right" && chevron
                  ]
                }
              ),
              endAppend && /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 px-4 text-sm text-muted", children: endAppend })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          m.div,
          {
            "aria-labelledby": id,
            role: "region",
            variants: AccordionAnimation.variants,
            transition: AccordionAnimation.transition,
            initial: false,
            animate: isExpanded ? "open" : "closed",
            children: [
              /* @__PURE__ */ jsx("div", { className: clsx("p-16", bodyClassName), children: !isLazy || wasExpandedOnce ? children : null }),
              footerContent
            ]
          }
        )
      ]
    }
  );
}
function SelectFilterPanel({
  filter
}) {
  const { trans } = useTrans();
  return /* @__PURE__ */ jsx(
    FormSelect,
    {
      size: "sm",
      name: `${filter.key}.value`,
      selectionMode: "single",
      showSearchField: filter.control.showSearchField,
      placeholder: filter.control.placeholder ? trans(filter.control.placeholder) : void 0,
      searchPlaceholder: filter.control.searchPlaceholder ? trans(filter.control.searchPlaceholder) : void 0,
      children: filter.control.options.map((option) => /* @__PURE__ */ jsx(Item, { value: option.key, children: /* @__PURE__ */ jsx(Trans, { ...option.label }) }, option.key))
    }
  );
}
function DateRangeFilterPanel({
  filter
}) {
  return /* @__PURE__ */ jsx(
    FormDateRangePicker,
    {
      min: filter.control.min,
      max: filter.control.max,
      size: "sm",
      name: `${filter.key}.value`,
      granularity: "day",
      closeDialogOnSelection: true
    }
  );
}
function NormalizedModelFilterPanel({
  filter
}) {
  return /* @__PURE__ */ jsx(
    FormNormalizedModelField,
    {
      name: `${filter.key}.value`,
      endpoint: `normalized-models/${filter.control.model}`
    }
  );
}
const FilterOperatorNames = {
  "=": message("is"),
  "!=": message("is not"),
  ">": message("is greater than"),
  ">=": message("is greater than or equal to"),
  "<": message("is less than"),
  "<=": message("is less than or equal to"),
  has: message("Include"),
  doesntHave: message("Do not include"),
  between: message("Is between"),
  hasAll: message("Include all")
};
function InputFilterPanel({
  filter
}) {
  var _a2;
  const control = filter.control;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormSelect,
      {
        selectionMode: "single",
        name: `${filter.key}.operator`,
        className: "mb-14",
        size: "sm",
        required: true,
        children: (_a2 = filter.operators) == null ? void 0 : _a2.map((operator) => /* @__PURE__ */ jsx(Item, { value: operator, children: /* @__PURE__ */ jsx(Trans, { ...FilterOperatorNames[operator] }) }, operator))
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        size: "sm",
        name: `${filter.key}.value`,
        type: filter.control.inputType,
        min: "minValue" in control ? control.minValue : void 0,
        max: "maxValue" in control ? control.maxValue : void 0,
        minLength: "minLength" in control ? control.minLength : void 0,
        maxLength: "maxLength" in control ? control.maxLength : void 0,
        required: true
      }
    )
  ] });
}
function BooleanFilterPanel({
  filter
}) {
  return null;
}
function ChipFieldFilterPanel({
  filter
}) {
  const { trans } = useTrans();
  return /* @__PURE__ */ jsx(
    FormChipField,
    {
      size: "sm",
      name: `${filter.key}.value`,
      valueKey: "id",
      allowCustomValue: false,
      showDropdownArrow: true,
      placeholder: filter.control.placeholder ? trans(filter.control.placeholder) : void 0,
      displayWith: (chip) => {
        var _a2;
        return (_a2 = filter.control.options.find((o) => o.key === chip.id)) == null ? void 0 : _a2.label.message;
      },
      suggestions: filter.control.options.map((o) => ({
        id: o.key,
        name: o.label.message
      })),
      children: (chip) => /* @__PURE__ */ jsx(Item, { value: chip.id, children: /* @__PURE__ */ jsx(Trans, { message: chip.name }) }, chip.id)
    }
  );
}
function AddFilterDialog({ filters }) {
  const { decodedFilters } = useBackendFilterUrlParams(filters);
  const { formId } = useDialogContext();
  const [expandedFilters, setExpandedFilters] = useState(
    () => {
      return decodedFilters.map((f) => f.key);
    }
  );
  const clearButton = /* @__PURE__ */ jsx(
    Button,
    {
      size: "xs",
      variant: "outline",
      className: "mr-auto",
      onClick: () => {
        setExpandedFilters([]);
      },
      children: /* @__PURE__ */ jsx(Trans, { message: "Clear" })
    }
  );
  const applyButton = /* @__PURE__ */ jsx(
    Button,
    {
      size: "xs",
      variant: "flat",
      color: "primary",
      className: "ml-auto",
      type: "submit",
      form: formId,
      children: /* @__PURE__ */ jsx(Trans, { message: "Apply" })
    }
  );
  return /* @__PURE__ */ jsxs(Dialog, { className: "min-w-[300px]", maxWidth: "max-w-400", size: "auto", children: [
    /* @__PURE__ */ jsx(
      DialogHeader,
      {
        padding: "px-14 py-10",
        leftAdornment: clearButton,
        rightAdornment: applyButton,
        children: /* @__PURE__ */ jsx(Trans, { message: "Filter" })
      }
    ),
    /* @__PURE__ */ jsx(DialogBody, { padding: "p-0", children: /* @__PURE__ */ jsx(
      FilterList$1,
      {
        filters,
        expandedFilters,
        setExpandedFilters
      }
    ) })
  ] });
}
function FilterList$1({
  filters,
  expandedFilters,
  setExpandedFilters
}) {
  const { decodedFilters, replaceAll } = useBackendFilterUrlParams(filters);
  const defaultValues = {};
  filters.forEach((filter) => {
    const appliedFilter = decodedFilters.find((f) => f.key === filter.key);
    defaultValues[filter.key] = (appliedFilter == null ? void 0 : appliedFilter.value) !== void 0 ? (
      // there might be some extra keys set on filter besides
      // "value" and "operator", so add the whole object to form
      appliedFilter
    ) : {
      value: filter.control.defaultValue,
      operator: filter.defaultOperator
    };
  });
  const form = useForm({ defaultValues });
  const { formId, close } = useDialogContext();
  return /* @__PURE__ */ jsx(
    Form$1,
    {
      form,
      id: formId,
      onSubmit: (formValue) => {
        const filterValue = Object.entries(formValue).filter(
          ([key, fieldValue]) => expandedFilters.includes(key) && fieldValue !== void 0
        ).map(([key, fieldValue]) => ({
          key,
          ...fieldValue
          // value and operator from form
        }));
        replaceAll(filterValue);
        close();
      },
      children: /* @__PURE__ */ jsx(
        Accordion,
        {
          mode: "multiple",
          expandedValues: expandedFilters,
          onExpandedChange: setExpandedFilters,
          children: filters.map((filter) => /* @__PURE__ */ jsxs(
            AccordionItem,
            {
              startIcon: /* @__PURE__ */ jsx(Checkbox, { checked: expandedFilters.includes(filter.key) }),
              value: filter.key,
              label: /* @__PURE__ */ jsx(Trans, { ...filter.label }),
              bodyClassName: "max-h-288 overflow-y-auto compact-scrollbar",
              children: [
                filter.description && /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: clsx(
                      "text-xs text-muted",
                      // boolean filter will have nothing in the panel, no need to add margin
                      filter.control.type !== FilterControlType.BooleanToggle && "mb-14"
                    ),
                    children: /* @__PURE__ */ jsx(Trans, { ...filter.description })
                  }
                ),
                /* @__PURE__ */ jsx(AddFilterDialogPanel, { filter })
              ]
            },
            filter.key
          ))
        }
      )
    }
  );
}
function AddFilterDialogPanel({ filter }) {
  switch (filter.control.type) {
    case FilterControlType.Select:
      return /* @__PURE__ */ jsx(
        SelectFilterPanel,
        {
          filter
        }
      );
    case FilterControlType.ChipField:
      return /* @__PURE__ */ jsx(
        ChipFieldFilterPanel,
        {
          filter
        }
      );
    case FilterControlType.DateRangePicker:
      return /* @__PURE__ */ jsx(
        DateRangeFilterPanel,
        {
          filter
        }
      );
    case FilterControlType.SelectModel:
      return /* @__PURE__ */ jsx(
        NormalizedModelFilterPanel,
        {
          filter
        }
      );
    case FilterControlType.Input:
      return /* @__PURE__ */ jsx(
        InputFilterPanel,
        {
          filter
        }
      );
    case FilterControlType.BooleanToggle:
      return /* @__PURE__ */ jsx(
        BooleanFilterPanel,
        {
          filter
        }
      );
    case "custom":
      const CustomComponent = filter.control.panel;
      return /* @__PURE__ */ jsx(
        CustomComponent,
        {
          filter
        }
      );
    default:
      return null;
  }
}
function AddFilterButton({
  filters,
  icon = /* @__PURE__ */ jsx(FilterAltIcon, {}),
  color = "primary",
  variant = "outline",
  size = "sm",
  disabled,
  className
}) {
  const isMobile = useIsMobileMediaQuery();
  const desktopButton = /* @__PURE__ */ jsx(
    Button,
    {
      variant,
      color,
      startIcon: icon,
      disabled,
      size,
      className,
      children: /* @__PURE__ */ jsx(Trans, { message: "Filter" })
    }
  );
  const mobileButton = /* @__PURE__ */ jsx(
    IconButton,
    {
      color,
      size: "sm",
      variant,
      disabled,
      className,
      children: icon
    }
  );
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "popover", children: [
    isMobile ? mobileButton : desktopButton,
    /* @__PURE__ */ jsx(AddFilterDialog, { filters })
  ] });
}
function DataTableHeader({
  actions,
  filters,
  filtersLoading,
  searchPlaceholder = message("Type to search..."),
  searchValue = "",
  onSearchChange
}) {
  const { trans } = useTrans();
  return /* @__PURE__ */ jsxs(HeaderLayout, { children: [
    /* @__PURE__ */ jsx(
      TextField,
      {
        inputTestId: "datatable-search",
        className: "flex-auto max-w-440 mr-auto",
        inputWrapperClassName: "mr-24 md:mr-0",
        placeholder: trans(searchPlaceholder),
        startAdornment: /* @__PURE__ */ jsx(SearchIcon, {}),
        value: searchValue,
        onChange: (e) => {
          onSearchChange(e.target.value);
        }
      }
    ),
    filters && /* @__PURE__ */ jsx(AddFilterButton, { filters, disabled: filtersLoading }),
    actions
  ] });
}
function HeaderLayout({ children, ...domProps }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "mb-24 flex items-center gap-8 md:gap-12 text-muted relative h-42",
      ...domProps,
      children
    }
  );
}
const FilterListTriggerButton = forwardRef((props, ref) => {
  const { isInactive, filter, ...domProps } = props;
  if (isInactive) {
    return /* @__PURE__ */ jsx(InactiveFilterButton, { filter, ...domProps, ref });
  }
  return /* @__PURE__ */ jsx(ActiveFilterButton, { filter, ...domProps, ref });
});
const InactiveFilterButton = forwardRef(({ filter, ...domProps }, ref) => {
  return /* @__PURE__ */ jsx(
    Button,
    {
      variant: "outline",
      size: "xs",
      color: "paper",
      radius: "rounded-md",
      border: "border",
      ref,
      endIcon: /* @__PURE__ */ jsx(KeyboardArrowDownIcon, {}),
      ...domProps,
      children: /* @__PURE__ */ jsx(Trans, { ...filter.label })
    }
  );
});
const ActiveFilterButton = forwardRef(({ filter, children, ...domProps }, ref) => {
  const isBoolean = filter.control.type === FilterControlType.BooleanToggle;
  return /* @__PURE__ */ jsxs(
    Button,
    {
      variant: "outline",
      size: "xs",
      color: "primary",
      radius: "rounded-r-md",
      border: "border-y border-r",
      endIcon: !isBoolean && /* @__PURE__ */ jsx(KeyboardArrowDownIcon, {}),
      ref,
      ...domProps,
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: clsx(
              !isBoolean && "border-r border-r-primary-light mr-8 pr-8"
            ),
            children: /* @__PURE__ */ jsx(Trans, { ...filter.label })
          }
        ),
        children
      ]
    }
  );
});
function FilterListItemDialogTrigger(props) {
  const { onValueChange, isInactive, filter, label } = props;
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      offset: 10,
      type: "popover",
      onClose: (value) => {
        if (value !== void 0) {
          onValueChange(value);
        }
      },
      children: [
        /* @__PURE__ */ jsx(FilterListTriggerButton, { isInactive, filter, children: label }),
        /* @__PURE__ */ jsx(FilterListControlDialog, { ...props })
      ]
    }
  );
}
function FilterListControlDialog({
  filter,
  panel,
  value,
  operator
}) {
  const form = useForm({
    defaultValues: {
      [filter.key]: { value, operator }
    }
  });
  const { close, formId } = useDialogContext();
  return /* @__PURE__ */ jsxs(Dialog, { size: "xs", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { ...filter.label }) }),
    /* @__PURE__ */ jsx(DialogBody, { padding: "px-14 pt-14 pb-4 max-h-288", children: /* @__PURE__ */ jsxs(
      Form$1,
      {
        form,
        id: formId,
        onSubmit: (formValue) => {
          close(formValue[filter.key]);
        },
        children: [
          filter.description && /* @__PURE__ */ jsx("div", { className: "text-muted text-xs mb-14", children: /* @__PURE__ */ jsx(Trans, { ...filter.description }) }),
          panel
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(
      Button,
      {
        form: formId,
        type: "submit",
        variant: "flat",
        color: "primary",
        size: "xs",
        children: /* @__PURE__ */ jsx(Trans, { message: "Apply" })
      }
    ) })
  ] });
}
function FilterListControl(props) {
  switch (props.filter.control.type) {
    case FilterControlType.DateRangePicker:
      return /* @__PURE__ */ jsx(DatePickerControl, { ...props });
    case FilterControlType.BooleanToggle:
      return /* @__PURE__ */ jsx(BooleanToggleControl, { ...props });
    case FilterControlType.Select:
      return /* @__PURE__ */ jsx(SelectControl, { ...props });
    case FilterControlType.ChipField:
      return /* @__PURE__ */ jsx(ChipFieldControl, { ...props });
    case FilterControlType.Input:
      return /* @__PURE__ */ jsx(InputControl, { ...props });
    case FilterControlType.SelectModel:
      return /* @__PURE__ */ jsx(SelectModelControl, { ...props });
    case FilterControlType.Custom:
      const Control = props.filter.control.listItem;
      return /* @__PURE__ */ jsx(Control, { ...props });
    default:
      return null;
  }
}
function DatePickerControl(props) {
  const { value, filter } = props;
  let valueLabel;
  if (value.preset !== void 0) {
    valueLabel = /* @__PURE__ */ jsx(Trans, { ...DateRangePresets[value.preset].label });
  } else {
    valueLabel = /* @__PURE__ */ jsx(
      FormattedDateTimeRange,
      {
        start: new Date(value.start),
        end: new Date(value.end),
        options: { dateStyle: "medium" }
      }
    );
  }
  return /* @__PURE__ */ jsx(
    FilterListItemDialogTrigger,
    {
      ...props,
      label: valueLabel,
      panel: /* @__PURE__ */ jsx(DateRangeFilterPanel, { filter })
    }
  );
}
function BooleanToggleControl({
  filter,
  isInactive,
  onValueChange
}) {
  return /* @__PURE__ */ jsx(
    FilterListTriggerButton,
    {
      onClick: () => {
        onValueChange({ value: filter.control.defaultValue });
      },
      filter,
      isInactive
    }
  );
}
function SelectControl(props) {
  const { filter, value } = props;
  const option = filter.control.options.find((o) => o.key === value);
  return /* @__PURE__ */ jsx(
    FilterListItemDialogTrigger,
    {
      ...props,
      label: option ? /* @__PURE__ */ jsx(Trans, { ...option.label }) : null,
      panel: /* @__PURE__ */ jsx(SelectFilterPanel, { filter })
    }
  );
}
function ChipFieldControl(props) {
  return /* @__PURE__ */ jsx(
    FilterListItemDialogTrigger,
    {
      ...props,
      label: /* @__PURE__ */ jsx(MultipleValues, { ...props }),
      panel: /* @__PURE__ */ jsx(ChipFieldFilterPanel, { filter: props.filter })
    }
  );
}
function MultipleValues(props) {
  const { trans } = useTrans();
  const { filter, value } = props;
  const options = value.map((v) => filter.control.options.find((o) => o.key === v));
  const maxShownCount = 3;
  const notShownCount = value.length - maxShownCount;
  const names2 = /* @__PURE__ */ jsx(Fragment, { children: options.filter(Boolean).slice(0, maxShownCount).map((o, i) => {
    let name = "";
    if (i !== 0) {
      name += ", ";
    }
    name += trans(o.label);
    return name;
  }) });
  return notShownCount > 0 ? /* @__PURE__ */ jsx(
    Trans,
    {
      message: ":names + :count more",
      values: { names: names2, count: notShownCount }
    }
  ) : names2;
}
function InputControl(props) {
  const { filter, value, operator } = props;
  const operatorLabel = operator ? /* @__PURE__ */ jsx(Trans, { ...FilterOperatorNames[operator] }) : null;
  const formattedValue = filter.control.inputType === "number" ? /* @__PURE__ */ jsx(FormattedNumber, { value }) : value;
  return /* @__PURE__ */ jsx(
    FilterListItemDialogTrigger,
    {
      ...props,
      label: /* @__PURE__ */ jsxs(Fragment, { children: [
        operatorLabel,
        " ",
        formattedValue
      ] }),
      panel: /* @__PURE__ */ jsx(InputFilterPanel, { filter })
    }
  );
}
function SelectModelControl(props) {
  const { value, filter } = props;
  const { isLoading, data } = useNormalizedModel(
    `normalized-models/${filter.control.model}/${value}`,
    void 0,
    { enabled: !!value }
  );
  const skeleton = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Skeleton, { variant: "avatar", size: "w-18 h-18 mr-6" }),
    /* @__PURE__ */ jsx(Skeleton, { variant: "rect", size: "w-50" })
  ] });
  const modelPreview = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Avatar, { size: "xs", src: data == null ? void 0 : data.model.image, className: "mr-6" }),
    data == null ? void 0 : data.model.name
  ] });
  const label = isLoading || !data ? skeleton : modelPreview;
  return /* @__PURE__ */ jsx(
    FilterListItemDialogTrigger,
    {
      ...props,
      label,
      panel: /* @__PURE__ */ jsx(NormalizedModelFilterPanel, { filter })
    }
  );
}
function FilterList({
  filters,
  pinnedFilters,
  className
}) {
  const { decodedFilters, remove, replaceAll } = useBackendFilterUrlParams(
    filters,
    pinnedFilters
  );
  if (!decodedFilters.length)
    return null;
  return /* @__PURE__ */ jsx("div", { className: clsx("flex items-center gap-6 overflow-x-auto", className), children: decodedFilters.map((field, index) => {
    const filter = filters.find((f) => f.key === field.key);
    if (!filter)
      return null;
    const handleValueChange = (payload) => {
      const newFilters = [...decodedFilters];
      newFilters.splice(index, 1, {
        key: filter.key,
        value: payload.value,
        isInactive: false,
        operator: payload.operator || filter.defaultOperator
      });
      replaceAll(newFilters);
    };
    return /* @__PURE__ */ jsxs("div", { children: [
      !field.isInactive && /* @__PURE__ */ jsx(
        IconButton,
        {
          variant: "outline",
          color: "primary",
          size: "xs",
          radius: "rounded-l-md",
          onClick: () => {
            remove(field.key);
          },
          children: /* @__PURE__ */ jsx(CloseIcon, {})
        }
      ),
      /* @__PURE__ */ jsx(
        FilterListControl,
        {
          filter,
          isInactive: field.isInactive,
          value: field.valueKey != null ? field.valueKey : field.value,
          operator: field.operator,
          onValueChange: handleValueChange
        }
      )
    ] }, field.key);
  }) });
}
function SelectedStateDatatableHeader({
  actions,
  selectedItemsCount
}) {
  return /* @__PURE__ */ jsxs(HeaderLayout, { "data-testid": "datatable-selected-header", children: [
    /* @__PURE__ */ jsx("div", { className: "mr-auto", children: /* @__PURE__ */ jsx(
      Trans,
      {
        message: "[one 1 item|other :count items] selected",
        values: { count: selectedItemsCount }
      }
    ) }),
    actions
  ] });
}
function FilterListSkeleton() {
  return /* @__PURE__ */ jsxs(
    m.div,
    {
      className: "flex items-center gap-6 h-30",
      ...opacityAnimation,
      children: [
        /* @__PURE__ */ jsx(Skeleton, { variant: "rect", size: "h-full w-144", radius: "rounded-md" }),
        /* @__PURE__ */ jsx(Skeleton, { variant: "rect", size: "h-full w-112", radius: "rounded-md" }),
        /* @__PURE__ */ jsx(Skeleton, { variant: "rect", size: "h-full w-172", radius: "rounded-md" })
      ]
    },
    "filter-list-skeleton"
  );
}
function DataTable({
  filters,
  filtersLoading,
  columns,
  searchPlaceholder,
  queryParams,
  endpoint: endpoint2,
  actions,
  selectedActions,
  emptyStateMessage,
  tableDomProps,
  onRowAction,
  enableSelection = true,
  selectionStyle = "checkbox",
  children,
  cellHeight,
  collapseTableOnMobile = true
}) {
  var _a2;
  const isMobile = useIsMobileMediaQuery();
  const { trans } = useTrans();
  const { encodedFilters } = useBackendFilterUrlParams(filters);
  const [params, setParams] = useState({ perPage: 15 });
  const [selectedRows, setSelectedRows] = useState([]);
  const query = useDatatableData(
    endpoint2,
    {
      ...params,
      ...queryParams,
      [BackendFiltersUrlKey]: encodedFilters
    },
    void 0,
    () => setSelectedRows([])
  );
  const isFiltering = !!(params.query || params.filters || encodedFilters);
  const pagination = (_a2 = query.data) == null ? void 0 : _a2.pagination;
  return /* @__PURE__ */ jsxs(
    DataTableContext.Provider,
    {
      value: {
        selectedRows,
        setSelectedRows,
        endpoint: endpoint2,
        params,
        setParams,
        query
      },
      children: [
        children,
        /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: selectedRows.length ? /* @__PURE__ */ jsx(
          SelectedStateDatatableHeader,
          {
            selectedItemsCount: selectedRows.length,
            actions: selectedActions
          },
          "selected"
        ) : /* @__PURE__ */ jsx(
          DataTableHeader,
          {
            searchPlaceholder,
            searchValue: params.query,
            onSearchChange: (query2) => setParams({ ...params, query: query2 }),
            actions,
            filters,
            filtersLoading
          },
          "default"
        ) }),
        filters && /* @__PURE__ */ jsx("div", { className: "mb-14", children: /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: filtersLoading && encodedFilters ? /* @__PURE__ */ jsx(FilterListSkeleton, {}) : /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, children: /* @__PURE__ */ jsx(FilterList, { filters }) }, "filter-list") }) }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: clsx(
              "relative rounded-panel",
              (!isMobile || !collapseTableOnMobile) && "border"
            ),
            children: [
              query.isFetching && /* @__PURE__ */ jsx(
                ProgressBar,
                {
                  isIndeterminate: true,
                  className: "absolute left-0 top-0 z-10 w-full",
                  "aria-label": trans({ message: "Loading" }),
                  size: "xs"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "relative overflow-x-auto md:overflow-hidden", children: /* @__PURE__ */ jsx(
                Table,
                {
                  ...tableDomProps,
                  columns,
                  data: (pagination == null ? void 0 : pagination.data) || [],
                  sortDescriptor: params,
                  onSortChange: (descriptor) => {
                    setParams({ ...params, ...descriptor });
                  },
                  selectedRows,
                  enableSelection,
                  selectionStyle,
                  onSelectionChange: setSelectedRows,
                  onAction: onRowAction,
                  collapseOnMobile: collapseTableOnMobile,
                  cellHeight
                }
              ) }),
              (query.isFetched || query.isPlaceholderData) && !(pagination == null ? void 0 : pagination.data.length) ? /* @__PURE__ */ jsx("div", { className: "pt-50", children: cloneElement(emptyStateMessage, {
                isFiltering
              }) }) : void 0,
              /* @__PURE__ */ jsx(
                DataTablePaginationFooter,
                {
                  query,
                  onPageChange: (page) => setParams({ ...params, page }),
                  onPerPageChange: (perPage) => setParams({ ...params, perPage })
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function DataTablePage({
  title,
  headerContent,
  headerItemsAlign = "items-end",
  className,
  ...dataTableProps
}) {
  const titleId = useId();
  return /* @__PURE__ */ jsxs("div", { className: clsx("p-12 md:p-24", className), children: [
    title && /* @__PURE__ */ jsxs(
      "div",
      {
        className: clsx(
          "mb-16",
          headerContent && `flex ${headerItemsAlign} gap-4`
        ),
        children: [
          /* @__PURE__ */ jsx(StaticPageTitle, { children: title }),
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-light first:capitalize", id: titleId, children: title }),
          headerContent
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      DataTable,
      {
        ...dataTableProps,
        tableDomProps: {
          "aria-labelledby": title ? titleId : void 0
        }
      }
    )
  ] });
}
function useDeleteSelectedRows() {
  const { endpoint: endpoint2, selectedRows, setSelectedRows } = useDataTable();
  return useMutation({
    mutationFn: () => deleteSelectedRows(endpoint2, selectedRows),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey(endpoint2)
      });
      toast(
        message("Deleted [one 1 record|other :count records]", {
          values: { count: selectedRows.length }
        })
      );
      setSelectedRows([]);
    },
    onError: (err) => showHttpErrorToast(err, message("Could not delete records"))
  });
}
function deleteSelectedRows(endpoint2, ids) {
  return apiClient.delete(`${endpoint2}/${ids.join(",")}`).then((r) => r.data);
}
function DeleteSelectedItemsAction() {
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(Button, { variant: "flat", color: "danger", className: "ml-auto", children: /* @__PURE__ */ jsx(Trans, { message: "Delete" }) }),
    /* @__PURE__ */ jsx(DeleteItemsDialog, {})
  ] });
}
function DeleteItemsDialog() {
  const deleteSelectedRows2 = useDeleteSelectedRows();
  const { selectedRows } = useDataTable();
  const { close } = useDialogContext();
  return /* @__PURE__ */ jsx(
    ConfirmationDialog,
    {
      isLoading: deleteSelectedRows2.isPending,
      title: /* @__PURE__ */ jsx(
        Trans,
        {
          message: "Delete [one 1 item|other :count items]?",
          values: { count: selectedRows.length }
        }
      ),
      body: /* @__PURE__ */ jsx(Trans, { message: "This will permanently remove the items and cannot be undone." }),
      confirm: /* @__PURE__ */ jsx(Trans, { message: "Delete" }),
      isDanger: true,
      onConfirm: () => {
        deleteSelectedRows2.mutate(void 0, { onSuccess: () => close() });
      }
    }
  );
}
function DataTableEmptyStateMessage({
  isFiltering,
  title,
  filteringTitle,
  image,
  size,
  className
}) {
  const isMobile = useIsMobileMediaQuery();
  if (!size) {
    size = isMobile ? "sm" : "md";
  }
  return /* @__PURE__ */ jsx(
    IllustratedMessage,
    {
      className,
      size,
      image: /* @__PURE__ */ jsx(SvgImage, { src: image }),
      title: isFiltering && filteringTitle ? filteringTitle : title,
      description: isFiltering && filteringTitle ? /* @__PURE__ */ jsx(Trans, { message: "Try another search query or different filters" }) : void 0
    }
  );
}
const teamSvg = "/assets/team-4364fe09.svg";
const DataTableAddItemButton = React.forwardRef(({ children, to, elementType, onClick }, ref) => {
  const isMobile = useIsMobileMediaQuery();
  if (isMobile) {
    return /* @__PURE__ */ jsx(
      IconButton,
      {
        ref,
        variant: "flat",
        color: "primary",
        className: "flex-shrink-0",
        size: "sm",
        to,
        elementType,
        onClick,
        children: /* @__PURE__ */ jsx(AddIcon, {})
      }
    );
  }
  return /* @__PURE__ */ jsx(
    Button,
    {
      ref,
      startIcon: /* @__PURE__ */ jsx(AddIcon, {}),
      variant: "flat",
      color: "primary",
      size: "sm",
      to,
      elementType,
      onClick,
      children
    }
  );
});
const FileDownloadIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M18 15v3H6v-3H4v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3h-2zm-1-4-1.41-1.41L13 12.17V4h-2v8.17L8.41 9.59 7 11l5 5 5-5z" }),
  "FileDownloadOutlined"
);
function useExportCsv(endpoint2) {
  return useMutation({
    mutationFn: (payload) => exportCsv(endpoint2, payload),
    onError: (err) => showHttpErrorToast(err)
  });
}
function exportCsv(endpoint2, payload) {
  return apiClient.post(endpoint2, payload).then((r) => r.data);
}
function CsvExportInfoDialog() {
  const { close } = useDialogContext();
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Csv export" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      Trans,
      {
        message: "Your request is being processed. We'll email you when the report is ready to download. In\r\n            certain cases, it might take a little longer, depending on the number of items beings\r\n            exported and the volume of activity."
      }
    ) }),
    /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(Button, { variant: "flat", color: "primary", onClick: close, children: /* @__PURE__ */ jsx(Trans, { message: "Got it" }) }) })
  ] });
}
function DataTableExportCsvButton({
  endpoint: endpoint2,
  payload
}) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const exportCsv2 = useExportCsv(endpoint2);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      IconButton,
      {
        variant: "outline",
        color: "primary",
        size: "sm",
        className: "flex-shrink-0",
        disabled: exportCsv2.isPending,
        onClick: () => {
          exportCsv2.mutate(payload, {
            onSuccess: (response) => {
              if (response.downloadPath) {
                downloadFileFromUrl(response.downloadPath);
              } else {
                setDialogIsOpen(true);
              }
            }
          });
        },
        children: /* @__PURE__ */ jsx(FileDownloadIcon, {})
      }
    ),
    /* @__PURE__ */ jsx(
      DialogTrigger,
      {
        type: "modal",
        isOpen: dialogIsOpen,
        onOpenChange: setDialogIsOpen,
        children: /* @__PURE__ */ jsx(CsvExportInfoDialog, {})
      }
    )
  ] });
}
const PersonOffIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "m20 17.17-3.37-3.38c.64.22 1.23.48 1.77.76.97.51 1.58 1.52 1.6 2.62zm1.19 4.02-1.41 1.41-2.61-2.6H4v-2.78c0-1.12.61-2.15 1.61-2.66 1.29-.66 2.87-1.22 4.67-1.45L1.39 4.22 2.8 2.81l18.39 18.38zM15.17 18l-3-3H12c-2.37 0-4.29.73-5.48 1.34-.32.16-.52.5-.52.88V18h9.17zM12 6c1.1 0 2 .9 2 2 0 .86-.54 1.59-1.3 1.87l1.48 1.48C15.28 10.64 16 9.4 16 8c0-2.21-1.79-4-4-4-1.4 0-2.64.72-3.35 1.82l1.48 1.48C10.41 6.54 11.14 6 12 6z" }),
  "PersonOffOutlined"
);
function useBanUser(form, userId) {
  return useMutation({
    mutationFn: (payload) => banUser(userId, payload),
    onSuccess: async () => {
      toast(message("User suspended"));
      await queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (r) => onFormQueryError(r, form)
  });
}
function banUser(userId, payload) {
  return apiClient.post(`users/${userId}/ban`, payload).then((r) => r.data);
}
function BanUserDialog({ user }) {
  const { trans } = useTrans();
  const { close, formId } = useDialogContext();
  const form = useForm({
    defaultValues: {
      permanent: true
    }
  });
  const isPermanent = form.watch("permanent");
  const banUser2 = useBanUser(form, user.id);
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Suspend “:name“", values: { name: user.display_name } }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsxs(
      Form$1,
      {
        id: formId,
        form,
        onSubmit: (values) => banUser2.mutate(values, { onSuccess: () => close() }),
        children: [
          /* @__PURE__ */ jsx(
            FormDatePicker,
            {
              name: "ban_until",
              label: /* @__PURE__ */ jsx(Trans, { message: "Suspend until" }),
              disabled: isPermanent
            }
          ),
          /* @__PURE__ */ jsx(FormSwitch, { name: "permanent", className: "mt-12", children: /* @__PURE__ */ jsx(Trans, { message: "Permanent" }) }),
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              className: "mt-24",
              name: "comment",
              inputElementType: "textarea",
              maxLength: 250,
              label: /* @__PURE__ */ jsx(Trans, { message: "Reason" }),
              placeholder: trans(message("Optional"))
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: () => close(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          form: formId,
          variant: "flat",
          color: "primary",
          type: "submit",
          disabled: banUser2.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Suspend" })
        }
      )
    ] })
  ] });
}
function useUnbanUser(userId) {
  return useMutation({
    mutationFn: () => unbanUser(userId),
    onSuccess: () => {
      toast(message("User unsuspended"));
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (r) => showHttpErrorToast(r)
  });
}
function unbanUser(userId) {
  return apiClient.delete(`users/${userId}/unban`).then((r) => r.data);
}
function useImpersonateUser() {
  return useMutation({
    mutationFn: (payload) => impersonateUser(payload),
    onSuccess: async (response) => {
      toast(message(`Impersonating User "${response.user.display_name}"`));
      window.location.href = "/";
    },
    onError: (r) => showHttpErrorToast(r)
  });
}
function impersonateUser(payload) {
  return apiClient.post(`admin/users/impersonate/${payload.userId}`, payload).then((r) => r.data);
}
const userDatatableColumns = [
  {
    key: "name",
    allowsSorting: true,
    sortingKey: "email",
    width: "flex-3 min-w-200",
    visibleInMode: "all",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "User" }),
    body: (user) => /* @__PURE__ */ jsx(
      NameWithAvatar,
      {
        image: user.avatar,
        label: user.display_name,
        description: user.email
      }
    )
  },
  {
    key: "subscribed",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Subscribed" }),
    width: "w-96",
    body: (user) => {
      var _a2;
      return ((_a2 = user.subscriptions) == null ? void 0 : _a2.length) ? /* @__PURE__ */ jsx(CheckIcon, { className: "text-positive icon-md" }) : /* @__PURE__ */ jsx(CloseIcon, { className: "text-danger icon-md" });
    }
  },
  {
    key: "roles",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Roles" }),
    body: (user) => {
      var _a2;
      return /* @__PURE__ */ jsx(ChipList, { radius: "rounded", size: "xs", children: (_a2 = user == null ? void 0 : user.roles) == null ? void 0 : _a2.map((role) => /* @__PURE__ */ jsx(Chip, { selectable: true, children: /* @__PURE__ */ jsx(
        Link,
        {
          className: clsx("capitalize"),
          target: "_blank",
          to: `/admin/roles/${role.id}/edit`,
          children: /* @__PURE__ */ jsx(Trans, { message: role.name })
        }
      ) }, role.id)) });
    }
  },
  {
    key: "firstName",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "First name" }),
    body: (user) => user.first_name
  },
  {
    key: "lastName",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Last name" }),
    body: (user) => user.last_name
  },
  {
    key: "createdAt",
    allowsSorting: true,
    width: "w-96",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Created at" }),
    body: (user) => /* @__PURE__ */ jsx("time", { children: /* @__PURE__ */ jsx(FormattedDate, { date: user.created_at }) })
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    width: "w-128 flex-shrink-0",
    hideHeader: true,
    align: "end",
    visibleInMode: "all",
    body: (user) => /* @__PURE__ */ jsxs("div", { className: "text-muted", children: [
      /* @__PURE__ */ jsx(Link, { to: `${user.id}/edit`, children: /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Edit user" }), children: /* @__PURE__ */ jsx(IconButton, { size: "md", children: /* @__PURE__ */ jsx(EditIcon, {}) }) }) }),
      user.banned_at ? /* @__PURE__ */ jsx(UnbanButton, { user }) : /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
        /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Suspend user" }), children: /* @__PURE__ */ jsx(IconButton, { size: "md", children: /* @__PURE__ */ jsx(PersonOffIcon, {}) }) }),
        /* @__PURE__ */ jsx(BanUserDialog, { user })
      ] }),
      /* @__PURE__ */ jsx(ImpersonateButton, { user })
    ] })
  }
];
function UnbanButton({ user }) {
  const unban = useUnbanUser(user.id);
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "modal",
      onClose: (confirmed) => {
        if (confirmed) {
          unban.mutate();
        }
      },
      children: [
        /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Remove suspension" }), children: /* @__PURE__ */ jsx(IconButton, { size: "md", color: "danger", children: /* @__PURE__ */ jsx(PersonOffIcon, {}) }) }),
        /* @__PURE__ */ jsx(
          ConfirmationDialog,
          {
            isDanger: true,
            title: /* @__PURE__ */ jsx(Trans, { message: "Suspend “:name“", values: { name: user.display_name } }),
            body: /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to remove suspension from this user?" }),
            confirm: /* @__PURE__ */ jsx(Trans, { message: "Unsuspend" })
          }
        )
      ]
    }
  );
}
function ImpersonateButton({ user }) {
  const impersonate = useImpersonateUser();
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Login as user" }), children: /* @__PURE__ */ jsx(IconButton, { size: "md", children: /* @__PURE__ */ jsx(LoginIcon, {}) }) }),
    /* @__PURE__ */ jsx(
      ConfirmationDialog,
      {
        title: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Login as “:name“",
            values: { name: user.display_name }
          }
        ),
        isLoading: impersonate.isPending,
        body: /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to login as this user?" }),
        confirm: /* @__PURE__ */ jsx(Trans, { message: "Login" }),
        onConfirm: () => {
          impersonate.mutate({ userId: user.id });
        }
      }
    )
  ] });
}
function UserDatatable() {
  const { billing } = useSettings();
  const filteredColumns = !billing.enable ? userDatatableColumns.filter((c) => c.key !== "subscribed") : userDatatableColumns;
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    DataTablePage,
    {
      endpoint: "users",
      title: /* @__PURE__ */ jsx(Trans, { message: "Users" }),
      filters: UserDatatableFilters,
      columns: filteredColumns,
      actions: /* @__PURE__ */ jsx(Actions$c, {}),
      queryParams: { with: "subscriptions,bans" },
      selectedActions: /* @__PURE__ */ jsx(DeleteSelectedItemsAction, {}),
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: teamSvg,
          title: /* @__PURE__ */ jsx(Trans, { message: "No users have been created yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching users" })
        }
      )
    }
  ) });
}
function Actions$c() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(DataTableExportCsvButton, { endpoint: "users/csv/export" }),
    /* @__PURE__ */ jsx(DataTableAddItemButton, { elementType: Link, to: "new", children: /* @__PURE__ */ jsx(Trans, { message: "Add new user" }) })
  ] });
}
function chunkArray(array, chunkSize) {
  return array.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);
}
const DefaultAppearanceConfig = {
  preview: {
    defaultRoute: "/",
    navigationRoutes: []
  },
  sections: {
    general: {
      label: message("General"),
      position: 1,
      buildBreadcrumb: () => [
        {
          label: message("General"),
          location: `general`
        }
      ]
    },
    themes: {
      label: message("Themes"),
      position: 2,
      buildBreadcrumb: (pathname, formValue) => {
        var _a2;
        const parts = pathname.split("/").filter((p) => !!p);
        const [, , , themeIndex] = parts;
        const breadcrumb = [
          {
            label: message("Themes"),
            location: `themes`
          }
        ];
        if (themeIndex != null) {
          breadcrumb.push({
            label: (_a2 = formValue.appearance.themes.all[+themeIndex]) == null ? void 0 : _a2.name,
            location: `themes/${themeIndex}`
          });
        }
        if (parts.at(-1) === "font") {
          breadcrumb.push({
            label: message("Font"),
            location: `themes/${themeIndex}/font`
          });
        }
        if (parts.at(-1) === "radius") {
          breadcrumb.push({
            label: message("Rounding"),
            location: `themes/${themeIndex}/radius`
          });
        }
        return breadcrumb;
      }
    },
    menus: {
      label: message("Menus"),
      position: 3,
      buildBreadcrumb: (pathname, formValue) => {
        const parts = pathname.split("/").filter((p) => !!p);
        const [, , ...rest] = parts;
        const breadcrumb = [
          {
            label: message("Menus"),
            location: "menus"
          }
        ];
        const chunked = chunkArray(rest, 2);
        chunked.forEach(([sectionName, sectionIndex], chunkIndex) => {
          var _a2, _b;
          if (sectionName === "menus" && sectionIndex != null) {
            breadcrumb.push({
              label: (_a2 = formValue.settings.menus[+sectionIndex]) == null ? void 0 : _a2.name,
              location: `menus/${sectionIndex}`
            });
          } else if (sectionName === "items" && sectionIndex != null) {
            const [, menuIndex] = chunked[chunkIndex - 1];
            breadcrumb.push({
              label: (_b = formValue.settings.menus[+menuIndex].items[+sectionIndex]) == null ? void 0 : _b.label,
              location: `menus/${menuIndex}/${sectionIndex}`
            });
          }
        });
        return breadcrumb;
      },
      config: {
        availableRoutes: [
          "/",
          "/login",
          "/register",
          "/contact",
          "/billing/pricing",
          "/account-settings",
          "/admin",
          "/admin/appearance",
          "/admin/settings",
          "/admin/plans",
          "/admin/subscriptions",
          "/admin/users",
          "/admin/roles",
          "/admin/pages",
          "/admin/tags",
          "/admin/files",
          "/admin/localizations",
          "/admin/ads",
          "/admin/settings/authentication",
          "/admin/settings/branding",
          "/admin/settings/cache",
          "/admin/settings/providers",
          "/api-docs"
        ],
        positions: [
          "admin-navbar",
          "admin-sidebar",
          "custom-page-navbar",
          "auth-page-footer",
          "auth-dropdown",
          "account-settings-page",
          "billing-page",
          "checkout-page-navbar",
          "checkout-page-footer",
          "pricing-table-page",
          "contact-us-page",
          "notifications-page",
          "footer",
          "footer-secondary"
        ]
      }
    },
    "custom-code": {
      label: message("Custom Code"),
      position: 4,
      buildBreadcrumb: () => [
        {
          label: message("Custom code"),
          location: `custom-code`
        }
      ]
    },
    "seo-settings": {
      label: message("SEO Settings"),
      position: 5,
      buildBreadcrumb: () => [
        {
          label: message("SEO"),
          location: `seo`
        }
      ]
    }
  }
};
function LandingPageSectionPrimaryFeatures() {
  const { fields, remove, append } = useFieldArray({
    name: "settings.homepage.appearance.primaryFeatures"
  });
  const [expandedValues, setExpandedValues] = useState([0]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      Accordion,
      {
        variant: "outline",
        expandedValues,
        onExpandedChange: (values) => {
          setExpandedValues(values);
          if (values.length) {
            appearanceState().preview.setHighlight(
              `[data-testid="primary-root-${values[0]}"]`
            );
          }
        },
        children: fields.map((field, index) => {
          return /* @__PURE__ */ jsxs(
            AccordionItem,
            {
              value: index,
              label: /* @__PURE__ */ jsx(Trans, { message: `Primary feature ${index + 1}` }),
              children: [
                /* @__PURE__ */ jsx(FeatureForm$1, { index }),
                /* @__PURE__ */ jsx("div", { className: "text-right", children: /* @__PURE__ */ jsx(
                  Button,
                  {
                    size: "xs",
                    variant: "outline",
                    color: "danger",
                    onClick: () => {
                      remove(index);
                    },
                    children: /* @__PURE__ */ jsx(Trans, { message: "Remove" })
                  }
                ) })
              ]
            },
            field.id
          );
        })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mt-20 text-right", children: /* @__PURE__ */ jsx(
      Button,
      {
        size: "xs",
        variant: "outline",
        color: "primary",
        startIcon: /* @__PURE__ */ jsx(AddIcon, {}),
        onClick: () => {
          append({});
          setExpandedValues([fields.length]);
        },
        children: /* @__PURE__ */ jsx(Trans, { message: "Add feature" })
      }
    ) })
  ] });
}
function FeatureForm$1({ index }) {
  const defaultImage = useAppearanceStore(
    (s) => {
      var _a2, _b, _c;
      return (_c = (_b = (_a2 = s.defaults) == null ? void 0 : _a2.settings.homepage.appearance) == null ? void 0 : _b.primaryFeatures[index]) == null ? void 0 : _c.image;
    }
  );
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(
      FormImageSelector,
      {
        name: `settings.homepage.appearance.primaryFeatures.${index}.image`,
        className: "mb-30",
        label: /* @__PURE__ */ jsx(Trans, { message: "Image" }),
        defaultValue: defaultImage,
        diskPrefix: "homepage"
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: `settings.homepage.appearance.primaryFeatures.${index}.title`,
        label: /* @__PURE__ */ jsx(Trans, { message: "Title" }),
        className: "mb-20",
        onFocus: () => {
          appearanceState().preview.setHighlight(
            `[data-testid="primary-title-${index}"]`
          );
        }
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: `settings.homepage.appearance.primaryFeatures.${index}.subtitle`,
        label: /* @__PURE__ */ jsx(Trans, { message: "Subtitle" }),
        className: "mb-20",
        inputElementType: "textarea",
        rows: 4,
        onFocus: () => {
          appearanceState().preview.setHighlight(
            `[data-testid="primary-subtitle-${index}"]`
          );
        }
      }
    )
  ] });
}
function ucFirst(string) {
  if (!string)
    return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const PermissionSelector$1 = React.forwardRef(({ valueListKey = "permissions", ...props }, ref) => {
  const { data } = useValueLists([valueListKey]);
  const permissions = (data == null ? void 0 : data.permissions) || (data == null ? void 0 : data.workspacePermissions);
  const [value, setValue] = useControlledState(props.value, [], props.onChange);
  const [showAdvanced, setShowAdvanced] = useState(false);
  if (!permissions)
    return null;
  const groupedPermissions = buildPermissionList(
    permissions,
    value,
    showAdvanced
  );
  const onRestrictionChange = (newPermission) => {
    const newValue = [...value];
    const index = newValue.findIndex((p) => p.id === newPermission.id);
    if (index > -1) {
      newValue.splice(index, 1, newPermission);
    }
    setValue(newValue);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Accordion, { variant: "outline", ref, children: groupedPermissions.map(({ groupName, items, anyChecked }) => /* @__PURE__ */ jsx(
      AccordionItem,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: prettyName(groupName) }),
        startIcon: anyChecked ? /* @__PURE__ */ jsx(DoneAllIcon, { size: "sm" }) : void 0,
        children: /* @__PURE__ */ jsx(List, { children: items.map((permission) => {
          const index = value.findIndex((v) => v.id === permission.id);
          const isChecked = index > -1;
          return /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(
              ListItem,
              {
                onSelected: () => {
                  if (isChecked) {
                    const newValue = [...value];
                    newValue.splice(index, 1);
                    setValue(newValue);
                  } else {
                    setValue([...value, permission]);
                  }
                },
                endSection: /* @__PURE__ */ jsx(
                  Switch,
                  {
                    tabIndex: -1,
                    checked: isChecked,
                    onChange: () => {
                    }
                  }
                ),
                description: /* @__PURE__ */ jsx(Trans, { message: permission.description }),
                children: /* @__PURE__ */ jsx(
                  Trans,
                  {
                    message: permission.display_name || permission.name
                  }
                )
              }
            ),
            isChecked && /* @__PURE__ */ jsx(
              Restrictions,
              {
                permission,
                onChange: onRestrictionChange
              }
            )
          ] }, permission.id);
        }) })
      },
      groupName
    )) }),
    /* @__PURE__ */ jsx(
      Switch,
      {
        className: "mt-30",
        checked: showAdvanced,
        onChange: (e) => {
          setShowAdvanced(e.target.checked);
        },
        children: /* @__PURE__ */ jsx(Trans, { message: "Show advanced permissions" })
      }
    )
  ] });
});
function Restrictions({ permission, onChange }) {
  var _a2;
  if (!((_a2 = permission == null ? void 0 : permission.restrictions) == null ? void 0 : _a2.length))
    return null;
  const setRestrictionValue = (name, value) => {
    const nextState = produce(permission, (draftState) => {
      const restriction = draftState.restrictions.find((r) => r.name === name);
      if (restriction) {
        restriction.value = value;
      }
    });
    onChange == null ? void 0 : onChange(nextState);
  };
  return /* @__PURE__ */ jsx("div", { className: "px-40 py-20", children: permission.restrictions.map((restriction, index) => {
    const isLast = index === permission.restrictions.length - 1;
    const name = /* @__PURE__ */ jsx(Trans, { message: prettyName(restriction.name) });
    const description = restriction.description ? /* @__PURE__ */ jsx(Trans, { message: restriction.description }) : void 0;
    if (restriction.type === "bool") {
      return /* @__PURE__ */ jsx(
        Switch,
        {
          description,
          className: clsx(!isLast && "mb-30"),
          checked: Boolean(restriction.value),
          onChange: (e) => {
            setRestrictionValue(restriction.name, e.target.checked);
          },
          children: name
        },
        restriction.name
      );
    }
    return /* @__PURE__ */ jsx(
      TextField,
      {
        size: "sm",
        label: name,
        description,
        type: "number",
        className: clsx(!isLast && "mb-30"),
        value: restriction.value || "",
        onChange: (e) => {
          setRestrictionValue(
            restriction.name,
            e.target.value === "" ? void 0 : parseInt(e.target.value)
          );
        }
      },
      restriction.name
    );
  }) });
}
function FormPermissionSelector(props) {
  const {
    field: { onChange, value = [], ref }
  } = useController({
    name: props.name
  });
  const formProps = {
    onChange,
    value
  };
  return /* @__PURE__ */ jsx(PermissionSelector$1, { ref, ...mergeProps(formProps, props) });
}
const prettyName = (name) => {
  return ucFirst(name.replace("_", " "));
};
function buildPermissionList(allPermissions, selectedPermissions, showAdvanced) {
  const groupedPermissions = [];
  allPermissions.forEach((permission) => {
    const index = selectedPermissions.findIndex((p) => p.id === permission.id);
    if (!showAdvanced && permission.advanced)
      return;
    let group = groupedPermissions.find(
      (g) => g.groupName === permission.group
    );
    if (!group) {
      group = { groupName: permission.group, anyChecked: false, items: [] };
      groupedPermissions.push(group);
    }
    if (index > -1) {
      const mergedPermission = {
        ...permission,
        restrictions: mergeRestrictions(
          permission.restrictions,
          selectedPermissions[index].restrictions
        )
      };
      group.anyChecked = true;
      group.items.push(mergedPermission);
    } else {
      group.items.push(permission);
    }
  });
  return groupedPermissions;
}
function mergeRestrictions(allRestrictions, selectedRestrictions) {
  return allRestrictions == null ? void 0 : allRestrictions.map((restriction) => {
    const selected = selectedRestrictions.find(
      (r) => r.name === restriction.name
    );
    if (selected) {
      return { ...restriction, value: selected.value };
    } else {
      return restriction;
    }
  });
}
function useAvailableRoutes() {
  const menuConfig = mergedAppearanceConfig.sections.menus.config;
  if (!menuConfig)
    return [];
  return menuConfig.availableRoutes.map((route) => {
    return {
      id: route,
      label: route,
      action: route,
      type: "route",
      target: "_self"
    };
  });
}
const iconGridStyle = {
  grid: "flex flex-wrap gap-24",
  button: "flex flex-col items-center rounded hover:bg-hover h-90 aspect-square"
};
const skeletons = [...Array(60).keys()];
const IconList = React.lazy(() => import("./icon-list-3e69a118.mjs"));
function IconPicker({ onIconSelected }) {
  const { trans } = useTrans();
  const [value, setValue] = React.useState("");
  return /* @__PURE__ */ jsxs("div", { className: "py-4", children: [
    /* @__PURE__ */ jsx(
      TextField,
      {
        className: "mb-20",
        value,
        onChange: (e) => {
          setValue(e.target.value);
        },
        placeholder: trans({ message: "Search icons..." })
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
      Suspense,
      {
        fallback: /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, className: iconGridStyle.grid, children: skeletons.map((_, index) => /* @__PURE__ */ jsx("div", { className: iconGridStyle.button, children: /* @__PURE__ */ jsx(Skeleton, { variant: "rect" }) }, index)) }),
        children: /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, className: iconGridStyle.grid, children: /* @__PURE__ */ jsx(IconList, { searchQuery: value, onIconSelected }) })
      }
    ) })
  ] });
}
function IconPickerDialog() {
  return /* @__PURE__ */ jsxs(Dialog, { size: "w-850", className: "min-h-dialog", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Select icon" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(IconPickerWrapper, {}) })
  ] });
}
function IconPickerWrapper() {
  const { close } = useDialogContext();
  return /* @__PURE__ */ jsx(
    IconPicker,
    {
      onIconSelected: (value) => {
        close(value);
      }
    }
  );
}
function MenuItemForm({
  formPathPrefix,
  hideRoleAndPermissionFields
}) {
  const { trans } = useTrans();
  const prefixName = (name) => {
    return formPathPrefix ? `${formPathPrefix}.${name}` : name;
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        className: "mb-20",
        name: prefixName("label"),
        label: /* @__PURE__ */ jsx(Trans, { message: "Label" }),
        placeholder: trans(message("No label...")),
        startAppend: /* @__PURE__ */ jsx(IconDialogTrigger, { prefixName })
      }
    ),
    /* @__PURE__ */ jsx(DestinationSelector, { prefixName }),
    !hideRoleAndPermissionFields && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(RoleSelector, { prefixName }),
      /* @__PURE__ */ jsx(PermissionSelector, { prefixName })
    ] }),
    /* @__PURE__ */ jsx(TargetSelect, { prefixName })
  ] });
}
function IconDialogTrigger({
  prefixName,
  ...buttonProps
}) {
  const { watch, setValue } = useFormContext();
  const fieldName = prefixName("icon");
  const watchedItemIcon = watch(fieldName);
  const Icon = watchedItemIcon && createSvgIconFromTree(watchedItemIcon);
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "modal",
      onClose: (iconTree) => {
        if (iconTree || iconTree === null) {
          setValue(fieldName, iconTree, {
            shouldDirty: true
          });
        }
      },
      children: [
        /* @__PURE__ */ jsx(
          IconButton,
          {
            className: "text-muted icon-sm",
            variant: "outline",
            size: "md",
            ...buttonProps,
            children: Icon ? /* @__PURE__ */ jsx(Icon, {}) : /* @__PURE__ */ jsx(EditIcon, {})
          }
        ),
        /* @__PURE__ */ jsx(IconPickerDialog, {})
      ]
    }
  );
}
function DestinationSelector({ prefixName }) {
  const form = useFormContext();
  const currentType = form.watch(prefixName("type"));
  const previousType = usePrevious(currentType);
  const { data } = useValueLists(["menuItemCategories"]);
  const categories = (data == null ? void 0 : data.menuItemCategories) || [];
  const selectedCategory = categories.find((c) => c.type === currentType);
  const { trans } = useTrans();
  const routeItems = useAvailableRoutes();
  useEffect(() => {
    if (previousType && previousType !== currentType) {
      form.setValue(prefixName("action"), "");
    }
  }, [currentType, previousType, form, prefixName]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      FormSelect,
      {
        className: "mb-20",
        name: prefixName("type"),
        selectionMode: "single",
        label: /* @__PURE__ */ jsx(Trans, { message: "Type" }),
        children: [
          /* @__PURE__ */ jsx(Item, { value: "link", children: /* @__PURE__ */ jsx(Trans, { message: "Custom link" }) }),
          /* @__PURE__ */ jsx(Item, { value: "route", children: /* @__PURE__ */ jsx(Trans, { message: "Site page" }) }),
          categories.map((category) => /* @__PURE__ */ jsx(Item, { value: category.type, children: category.name }, category.type))
        ]
      }
    ),
    currentType === "link" && /* @__PURE__ */ jsx(
      FormTextField,
      {
        className: "mb-20",
        required: true,
        type: "url",
        name: prefixName("action"),
        placeholder: trans({ message: "Enter a url..." }),
        label: /* @__PURE__ */ jsx(Trans, { message: "Url" })
      }
    ),
    currentType === "route" && /* @__PURE__ */ jsx(
      FormSelect,
      {
        className: "mb-20",
        required: true,
        items: routeItems,
        name: prefixName("action"),
        label: /* @__PURE__ */ jsx(Trans, { message: "Page" }),
        searchPlaceholder: trans(message("Search pages")),
        showSearchField: true,
        selectionMode: "single",
        children: (item) => /* @__PURE__ */ jsx(Item, { value: item.id, children: item.label }, item.id)
      }
    ),
    selectedCategory && /* @__PURE__ */ jsx(
      FormSelect,
      {
        className: "mb-20",
        required: true,
        items: selectedCategory.items,
        name: prefixName("action"),
        showSearchField: true,
        searchPlaceholder: trans(message("Search...")),
        selectionMode: "single",
        label: /* @__PURE__ */ jsx(Trans, { message: selectedCategory.name }),
        children: (item) => /* @__PURE__ */ jsx(Item, { value: item.action, children: /* @__PURE__ */ jsx(Trans, { message: item.label }) })
      }
    )
  ] });
}
function RoleSelector({ prefixName }) {
  const { data } = useValueLists(["roles", "permissions"]);
  const roles = (data == null ? void 0 : data.roles) || [];
  const { trans } = useTrans();
  return /* @__PURE__ */ jsx(
    FormChipField,
    {
      className: "mb-20",
      placeholder: trans({ message: "Add role..." }),
      label: /* @__PURE__ */ jsx(Trans, { message: "Only show if user has role" }),
      name: prefixName("roles"),
      chipSize: "sm",
      suggestions: roles,
      valueKey: "id",
      displayWith: (c) => {
        var _a2;
        return (_a2 = roles.find((r) => r.id === c.id)) == null ? void 0 : _a2.name;
      },
      children: (role) => /* @__PURE__ */ jsx(Item, { value: role.id, capitalizeFirst: true, children: /* @__PURE__ */ jsx(Trans, { message: role.name }) }, role.id)
    }
  );
}
function PermissionSelector({ prefixName }) {
  const { data } = useValueLists(["roles", "permissions"]);
  const { trans } = useTrans();
  const groupedPermissions = useMemo(() => {
    return buildPermissionList((data == null ? void 0 : data.permissions) || [], [], false);
  }, [data == null ? void 0 : data.permissions]);
  return /* @__PURE__ */ jsx(
    FormChipField,
    {
      label: /* @__PURE__ */ jsx(Trans, { message: "Only show if user has permissions" }),
      placeholder: trans({ message: "Add permission..." }),
      chipSize: "sm",
      suggestions: groupedPermissions,
      name: prefixName("permissions"),
      valueKey: "name",
      children: ({ groupName, items }) => /* @__PURE__ */ jsx(Section, { label: prettyName(groupName), children: items.map((permission) => /* @__PURE__ */ jsx(
        Item,
        {
          value: permission.name,
          description: /* @__PURE__ */ jsx(Trans, { message: permission.description }),
          children: /* @__PURE__ */ jsx(Trans, { message: permission.display_name || permission.name })
        },
        permission.name
      )) }, groupName)
    }
  );
}
function TargetSelect({ prefixName }) {
  return /* @__PURE__ */ jsxs(
    FormSelect,
    {
      className: "mt-20",
      selectionMode: "single",
      name: prefixName("target"),
      label: /* @__PURE__ */ jsx(Trans, { message: "Open link in" }),
      children: [
        /* @__PURE__ */ jsx(Item, { value: "_self", children: /* @__PURE__ */ jsx(Trans, { message: "Same window" }) }),
        /* @__PURE__ */ jsx(Item, { value: "_blank", children: /* @__PURE__ */ jsx(Trans, { message: "New window" }) })
      ]
    }
  );
}
function LandingPageSectionActionButtons() {
  const [expandedValues, setExpandedValues] = useState(["cta1"]);
  return /* @__PURE__ */ jsxs(
    Accordion,
    {
      variant: "outline",
      expandedValues,
      onExpandedChange: (values) => {
        setExpandedValues(values);
        if (values.length) {
          appearanceState().preview.setHighlight(
            `[data-testid="${values[0]}"]`
          );
        }
      },
      children: [
        /* @__PURE__ */ jsx(AccordionItem, { value: "cta1", label: /* @__PURE__ */ jsx(Trans, { message: "Header button 1" }), children: /* @__PURE__ */ jsx(MenuItemForm, { formPathPrefix: "settings.homepage.appearance.actions.cta1" }) }),
        /* @__PURE__ */ jsx(AccordionItem, { value: "ct2", label: /* @__PURE__ */ jsx(Trans, { message: "Header button 2" }), children: /* @__PURE__ */ jsx(MenuItemForm, { formPathPrefix: "settings.homepage.appearance.actions.cta2" }) }),
        /* @__PURE__ */ jsx(AccordionItem, { value: "cta3", label: /* @__PURE__ */ jsx(Trans, { message: "Footer button" }), children: /* @__PURE__ */ jsx(MenuItemForm, { formPathPrefix: "settings.homepage.appearance.actions.cta3" }) })
      ]
    }
  );
}
const AppearanceButton = forwardRef(
  ({ startIcon, children, className, description, ...other }, ref) => {
    return /* @__PURE__ */ jsxs(
      ButtonBase,
      {
        ref,
        display: "flex",
        className: clsx(
          "relative mb-10 h-54 w-full items-center gap-10 rounded-input border bg px-14 text-sm hover:bg-hover",
          className
        ),
        variant: null,
        ...other,
        children: [
          startIcon,
          /* @__PURE__ */ jsxs("span", { className: "block min-w-0", children: [
            /* @__PURE__ */ jsx("span", { className: "block", children }),
            description && /* @__PURE__ */ jsx("span", { className: "block overflow-hidden overflow-ellipsis whitespace-nowrap text-xs text-muted", children: description })
          ] }),
          /* @__PURE__ */ jsx(
            KeyboardArrowRightIcon,
            {
              "aria-hidden": true,
              className: "ml-auto text-muted icon-sm"
            }
          )
        ]
      }
    );
  }
);
const ColorIcon = createSvgIcon(
  /* @__PURE__ */ jsx(
    "path",
    {
      stroke: "#E0E0E0",
      d: "M24,44c-7.168,0-13-5.816-13-12.971C11,24,24,4,24,4s13,20,13,27.029C37,38.184,31.168,44,24,44z"
    }
  )
);
function ColorSwatch({ onChange, value, colors }) {
  const presetButtons = colors.map((color) => {
    const isSelected = value === color;
    return /* @__PURE__ */ jsx(
      ButtonBase,
      {
        onClick: () => {
          onChange == null ? void 0 : onChange(color);
        },
        className: clsx(
          "relative block flex-shrink-0 w-26 h-26 border rounded",
          isSelected && "shadow-md"
        ),
        style: { backgroundColor: color },
        children: isSelected && /* @__PURE__ */ jsx("span", { className: "absolute inset-0 m-auto rounded-full w-8 h-8 bg-white" })
      },
      color
    );
  });
  return /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-6", children: presetButtons });
}
const ColorPresets = [
  {
    color: "rgb(255, 255, 255)",
    name: message("White")
  },
  {
    color: "rgb(239,245,245)",
    name: message("Solitude")
  },
  {
    color: "rgb(245,213,174)",
    name: message("Wheat")
  },
  {
    color: "rgb(253,227,167)",
    name: message("Cape Honey")
  },
  {
    color: "rgb(242,222,186)",
    name: message("Milk punch")
  },
  {
    color: "rgb(97,118,75)",
    name: message("Dingy"),
    foreground: "rgb(255, 255, 255)"
  },
  {
    color: "rgb(4, 147, 114)",
    name: message("Aquamarine"),
    foreground: "rgb(255, 255, 255)"
  },
  {
    color: "rgb(222,245,229)",
    name: message("Cosmic Latte")
  },
  {
    color: "rgb(233,119,119)",
    name: message("Geraldine"),
    foreground: "rgb(90,14,14)"
  },
  {
    color: "rgb(247,164,164)",
    name: message("Sundown")
  },
  {
    color: "rgb(30,139,195)",
    name: message("Pelorous"),
    foreground: "rgb(255, 255, 255)"
  },
  {
    color: "rgb(142,68,173)",
    name: message("Deep Lilac"),
    foreground: "rgb(255, 255, 255)"
  },
  {
    color: "rgb(108,74,182)",
    name: message("Blue marguerite"),
    foreground: "rgb(255, 255, 255)"
  },
  {
    color: "rgb(139,126,116)",
    name: message("Americano"),
    foreground: "rgb(255, 255, 255)"
  },
  {
    color: "rgb(0,0,0)",
    name: message("Black"),
    foreground: "rgb(255, 255, 255)"
  },
  {
    color: "rgb(64,66,88)",
    name: message("Blue zodiac"),
    foreground: "rgb(255, 255, 255)"
  },
  {
    color: "rgb(101,100,124)",
    name: message("Comet"),
    foreground: "rgb(255, 255, 255)"
  }
];
const DefaultPresets = ColorPresets.map(({ color }) => color).slice(0, 14);
function ColorPicker({
  defaultValue,
  onChange,
  colorPresets,
  showInput
}) {
  const [color, setColor] = useState(defaultValue);
  const presets = colorPresets || DefaultPresets;
  const style = getInputFieldClassNames({ size: "sm" });
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      HexColorPicker,
      {
        className: "!w-auto",
        color,
        onChange: (newColor) => {
          onChange == null ? void 0 : onChange(newColor);
          setColor(newColor);
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "py-20 px-12", children: [
      presets && /* @__PURE__ */ jsx(
        ColorSwatch,
        {
          colors: presets,
          onChange: (newColor) => {
            if (newColor) {
              const hex = parseColor(newColor).toString("hex");
              onChange == null ? void 0 : onChange(hex);
              setColor(hex);
            }
          },
          value: color
        }
      ),
      showInput && /* @__PURE__ */ jsx("div", { className: "pt-20", children: /* @__PURE__ */ jsx(
        HexColorInput,
        {
          autoComplete: "off",
          role: "textbox",
          autoCorrect: "off",
          spellCheck: "false",
          required: true,
          "aria-label": "Hex color",
          prefixed: true,
          className: style.input,
          color,
          onChange: (newColor) => {
            onChange == null ? void 0 : onChange(newColor);
            setColor(newColor);
          }
        }
      ) })
    ] })
  ] });
}
function ColorPickerDialog({
  hideFooter = false,
  showInput = true
}) {
  const { close, value, setValue, initialValue } = useDialogContext();
  return /* @__PURE__ */ jsxs(Dialog, { size: "2xs", children: [
    /* @__PURE__ */ jsx(
      ColorPicker,
      {
        showInput,
        defaultValue: initialValue ? initialValue : "",
        onChange: (newValue) => setValue(newValue)
      }
    ),
    !hideFooter && /* @__PURE__ */ jsxs(DialogFooter, { dividerTop: true, children: [
      /* @__PURE__ */ jsx(Button, { variant: "text", size: "xs", onClick: () => close(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          size: "xs",
          onClick: () => close(value),
          children: /* @__PURE__ */ jsx(Trans, { message: "Apply" })
        }
      )
    ] })
  ] });
}
function LandingPageSectionGeneral() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(HeaderSection, {}),
    /* @__PURE__ */ jsxs("div", { className: "my-24 border-y py-24", children: [
      /* @__PURE__ */ jsx(
        AppearanceButton,
        {
          to: "action-buttons",
          elementType: Link,
          className: "mb-20",
          children: /* @__PURE__ */ jsx(Trans, { message: "Action buttons" })
        }
      ),
      /* @__PURE__ */ jsx(AppearanceButton, { to: "primary-features", elementType: Link, children: /* @__PURE__ */ jsx(Trans, { message: "Primary features" }) }),
      /* @__PURE__ */ jsx(AppearanceButton, { to: "secondary-features", elementType: Link, children: /* @__PURE__ */ jsx(Trans, { message: "Secondary features" }) })
    ] }),
    /* @__PURE__ */ jsx(FooterSection, {}),
    /* @__PURE__ */ jsx(PricingSection, {})
  ] });
}
function HeaderSection() {
  const defaultImage = useAppearanceStore(
    (s) => {
      var _a2, _b;
      return (_b = (_a2 = s.defaults) == null ? void 0 : _a2.settings.homepage.appearance) == null ? void 0 : _b.headerImage;
    }
  );
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Header title" }),
        className: "mb-20",
        name: "settings.homepage.appearance.headerTitle",
        onFocus: () => {
          appearanceState().preview.setHighlight('[data-testid="headerTitle"]');
        }
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Header subtitle" }),
        className: "mb-30",
        inputElementType: "textarea",
        rows: 4,
        name: "settings.homepage.appearance.headerSubtitle",
        onFocus: () => {
          appearanceState().preview.setHighlight(
            '[data-testid="headerSubtitle"]'
          );
        }
      }
    ),
    /* @__PURE__ */ jsx(
      FormImageSelector,
      {
        name: "settings.homepage.appearance.headerImage",
        className: "mb-30",
        label: /* @__PURE__ */ jsx(Trans, { message: "Header image" }),
        defaultValue: defaultImage,
        diskPrefix: "homepage"
      }
    ),
    /* @__PURE__ */ jsx(
      FormSlider,
      {
        name: "settings.homepage.appearance.headerImageOpacity",
        label: /* @__PURE__ */ jsx(Trans, { message: "Header image opacity" }),
        minValue: 0,
        step: 0.1,
        maxValue: 1,
        formatOptions: { style: "percent" }
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mb-20 text-xs text-muted", children: /* @__PURE__ */ jsx(Trans, { message: "In order for overlay colors to appear, header image opacity will need to be less then 100%" }) }),
    /* @__PURE__ */ jsx(
      ColorPickerTrigger$1,
      {
        formKey: "settings.homepage.appearance.headerOverlayColor1",
        label: /* @__PURE__ */ jsx(Trans, { message: "Header overlay color 1" })
      }
    ),
    /* @__PURE__ */ jsx(
      ColorPickerTrigger$1,
      {
        formKey: "settings.homepage.appearance.headerOverlayColor2",
        label: /* @__PURE__ */ jsx(Trans, { message: "Header overlay color 2" })
      }
    )
  ] });
}
function FooterSection() {
  const defaultImage = useAppearanceStore(
    (s) => {
      var _a2, _b;
      return (_b = (_a2 = s.defaults) == null ? void 0 : _a2.settings.homepage.appearance) == null ? void 0 : _b.footerImage;
    }
  );
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(FormSwitch, { className: "mb-24", name: "settings.homepage.trending", children: /* @__PURE__ */ jsx(Trans, { message: "Show trending artists" }) }),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Footer title" }),
        className: "mb-20",
        name: "settings.homepage.appearance.footerTitle",
        onFocus: () => {
          appearanceState().preview.setHighlight('[data-testid="footerTitle"]');
        }
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Footer subtitle" }),
        className: "mb-20",
        name: "settings.homepage.appearance.footerSubtitle",
        onFocus: () => {
          appearanceState().preview.setHighlight(
            '[data-testid="footerSubtitle"]'
          );
        }
      }
    ),
    /* @__PURE__ */ jsx(
      FormImageSelector,
      {
        name: "settings.homepage.appearance.footerImage",
        className: "mb-30",
        label: /* @__PURE__ */ jsx(Trans, { message: "Footer background image" }),
        defaultValue: defaultImage,
        diskPrefix: "homepage"
      }
    )
  ] });
}
function PricingSection() {
  return /* @__PURE__ */ jsxs("div", { className: "mt-24 border-t pt-24", children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Pricing title" }),
        className: "mb-20",
        name: "settings.homepage.appearance.pricingTitle",
        onFocus: () => {
          appearanceState().preview.setHighlight(
            '[data-testid="pricingTitle"]'
          );
        }
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Pricing subtitle" }),
        className: "mb-20",
        name: "settings.homepage.appearance.pricingSubtitle",
        onFocus: () => {
          appearanceState().preview.setHighlight(
            '[data-testid="pricingSubtitle"]'
          );
        }
      }
    ),
    /* @__PURE__ */ jsx(FormSwitch, { className: "mb-24", name: "settings.homepage.pricing", children: /* @__PURE__ */ jsx(Trans, { message: "Show pricing table" }) })
  ] });
}
function ColorPickerTrigger$1({ label, formKey }) {
  const key = formKey;
  const { watch, setValue } = useFormContext();
  const formValue = watch(key);
  const setColor = (value) => {
    setValue(formKey, value, {
      shouldDirty: true
    });
  };
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      value: formValue,
      type: "popover",
      onValueChange: (newValue) => setColor(newValue),
      onClose: (value) => setColor(value),
      children: [
        /* @__PURE__ */ jsx(
          AppearanceButton,
          {
            className: "capitalize",
            startIcon: /* @__PURE__ */ jsx(
              ColorIcon,
              {
                viewBox: "0 0 48 48",
                className: "icon-lg",
                style: { fill: formValue }
              }
            ),
            children: label
          }
        ),
        /* @__PURE__ */ jsx(ColorPickerDialog, {})
      ]
    }
  );
}
function LandingPageSecondaryFeatures() {
  const { fields, remove, append } = useFieldArray({
    name: "settings.homepage.appearance.secondaryFeatures"
  });
  const [expandedValues, setExpandedValues] = useState([0]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      Accordion,
      {
        variant: "outline",
        expandedValues,
        onExpandedChange: (values) => {
          setExpandedValues(values);
          if (values.length) {
            appearanceState().preview.setHighlight(
              `[data-testid="secondary-root-${values[0]}"]`
            );
          }
        },
        children: fields.map((field, index) => {
          return /* @__PURE__ */ jsxs(
            AccordionItem,
            {
              value: index,
              label: /* @__PURE__ */ jsx(Trans, { message: `Secondary feature ${index + 1}` }),
              children: [
                /* @__PURE__ */ jsx(FeatureForm, { index }),
                /* @__PURE__ */ jsx("div", { className: "text-right", children: /* @__PURE__ */ jsx(
                  Button,
                  {
                    size: "xs",
                    variant: "outline",
                    color: "danger",
                    onClick: () => {
                      remove(index);
                    },
                    children: /* @__PURE__ */ jsx(Trans, { message: "Remove" })
                  }
                ) })
              ]
            },
            field.id
          );
        })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mt-20 text-right", children: /* @__PURE__ */ jsx(
      Button,
      {
        size: "xs",
        variant: "outline",
        color: "primary",
        startIcon: /* @__PURE__ */ jsx(AddIcon, {}),
        onClick: () => {
          append({});
          setExpandedValues([fields.length]);
        },
        children: /* @__PURE__ */ jsx(Trans, { message: "Add feature" })
      }
    ) })
  ] });
}
function FeatureForm({ index }) {
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(
      FormImageSelector,
      {
        name: `settings.homepage.appearance.secondaryFeatures.${index}.image`,
        className: "mb-30",
        label: /* @__PURE__ */ jsx(Trans, { message: "Image" }),
        defaultValue: getDefaultImage(index),
        diskPrefix: "homepage"
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: `settings.homepage.appearance.secondaryFeatures.${index}.title`,
        label: /* @__PURE__ */ jsx(Trans, { message: "Title" }),
        className: "mb-20",
        onFocus: () => {
          appearanceState().preview.setHighlight(
            `[data-testid="secondary-title-${index}"]`
          );
        }
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: `settings.homepage.appearance.secondaryFeatures.${index}.subtitle`,
        label: /* @__PURE__ */ jsx(Trans, { message: "Subtitle" }),
        className: "mb-20",
        inputElementType: "textarea",
        rows: 4,
        onFocus: () => {
          appearanceState().preview.setHighlight(
            `[data-testid="secondary-subtitle-${index}"]`
          );
        }
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: `settings.homepage.appearance.secondaryFeatures.${index}.description`,
        label: /* @__PURE__ */ jsx(Trans, { message: "Description" }),
        className: "mb-20",
        inputElementType: "textarea",
        rows: 4,
        onFocus: () => {
          appearanceState().preview.setHighlight(
            `[data-testid="secondary-description-${index}"]`
          );
        }
      }
    )
  ] });
}
function getDefaultImage(index) {
  var _a2, _b;
  return (_b = (_a2 = appearanceState().defaults) == null ? void 0 : _a2.settings.homepage.appearance.secondaryFeatures[index]) == null ? void 0 : _b.image;
}
const AppAppearanceConfig = {
  preview: {
    defaultRoute: "dashboard",
    navigationRoutes: ["dashboard"]
  },
  sections: {
    "landing-page": {
      label: message("Landing Page"),
      position: 1,
      previewRoute: "/",
      routes: [
        { path: "landing-page", element: /* @__PURE__ */ jsx(LandingPageSectionGeneral, {}) },
        {
          path: "landing-page/action-buttons",
          element: /* @__PURE__ */ jsx(LandingPageSectionActionButtons, {})
        },
        {
          path: "landing-page/primary-features",
          element: /* @__PURE__ */ jsx(LandingPageSectionPrimaryFeatures, {})
        },
        {
          path: "landing-page/secondary-features",
          element: /* @__PURE__ */ jsx(LandingPageSecondaryFeatures, {})
        }
      ],
      buildBreadcrumb: (pathname) => {
        const parts = pathname.split("/").filter((p) => !!p);
        const sectionName = parts.pop();
        const breadcrumb = [
          {
            label: message("Landing page"),
            location: "landing-page"
          }
        ];
        if (sectionName === "action-buttons") {
          breadcrumb.push({
            label: message("Action buttons"),
            location: "landing-page/action-buttons"
          });
        }
        if (sectionName === "primary-features") {
          breadcrumb.push({
            label: message("Primary features"),
            location: "landing-page/primary-features"
          });
        }
        if (sectionName === "secondary-features") {
          breadcrumb.push({
            label: message("Secondary features"),
            location: "landing-page/secondary-features"
          });
        }
        return breadcrumb;
      }
    },
    // missing label will get added by deepMerge from default config
    // @ts-ignore
    menus: {
      config: {
        positions: [
          "sidebar-primary",
          "sidebar-secondary",
          "mobile-bottom",
          "landing-page-navbar",
          "home-on-sidebar",
          "studio-on-sidebar",
          "account-on-sidebar",
          "settings-on-sidebar",
          "footer-on-sidebar",
          "footer",
          "footer-company",
          "footer-support",
          "footer-extra",
          "footer-media",
          "footer-terms",
          "footer-terms-two"
        ],
        availableRoutes: [
          "/upload",
          "/library/songs",
          "/library/albums",
          "/library/artists",
          "/library/history",
          "/admin/upload",
          "/admin/channels",
          "/admin/artists",
          "/admin/albums",
          "/admin/tracks",
          "/admin/genres",
          "/admin/lyrics",
          "/admin/playlists",
          "/admin/backstage-requests",
          "/admin/comments",
          "/backstage/requests"
        ]
      }
    },
    // @ts-ignore
    "seo-settings": {
      config: {
        pages: [
          {
            key: "artist-page",
            label: message("Artist page")
          },
          {
            key: "album-page",
            label: message("Album page")
          },
          {
            key: "track-page",
            label: message("Track page")
          },
          {
            key: "playlist-page",
            label: message("Playlist page")
          },
          {
            key: "landing-page",
            label: message("Landing page")
          },
          {
            key: "channel-page",
            label: message("Channel page")
          },
          {
            key: "user-profile-page",
            label: message("User profile page")
          },
          {
            key: "search-page",
            label: message("Search page")
          }
        ]
      }
    }
  }
};
const mergedAppearanceConfig = deepMerge.all([
  DefaultAppearanceConfig,
  AppAppearanceConfig
]);
const useAppearanceStore = create()(
  subscribeWithSelector(
    immer((set, get) => ({
      defaults: null,
      iframeWindow: null,
      config: mergedAppearanceConfig,
      setDefaults: (value) => {
        set((state) => {
          state.defaults = { ...value };
        });
      },
      setIframeWindow: (value) => {
        set(() => {
          return { iframeWindow: value };
        });
      },
      preview: {
        navigate: (sectionName) => {
          var _a2;
          const section = (_a2 = get().config) == null ? void 0 : _a2.sections[sectionName];
          const route = (section == null ? void 0 : section.previewRoute) || "/";
          const preview = get().iframeWindow;
          if (route) {
            postMessage(preview, { type: "navigate", to: route });
          }
        },
        setValues: (values) => {
          const preview = get().iframeWindow;
          postMessage(preview, { type: "setValues", values });
        },
        setThemeFont: (font) => {
          const preview = get().iframeWindow;
          postMessage(preview, { type: "setThemeFont", value: font });
        },
        setThemeValue: (name, value) => {
          const preview = get().iframeWindow;
          postMessage(preview, { type: "setThemeValue", name, value });
        },
        setActiveTheme: (themeId) => {
          const preview = get().iframeWindow;
          postMessage(preview, { type: "setActiveTheme", themeId });
        },
        setCustomCode: (mode, value) => {
          const preview = get().iframeWindow;
          postMessage(preview, { type: "setCustomCode", mode, value });
        },
        setHighlight: (selector) => {
          set(() => {
            var _a2;
            let node = null;
            const document = (_a2 = get().iframeWindow) == null ? void 0 : _a2.document;
            if (document && selector) {
              node = document.querySelector(selector);
            }
            if (node) {
              requestAnimationFrame(() => {
                if (!node)
                  return;
                node.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                  inline: "center"
                });
              });
            }
          });
        }
      }
    }))
  )
);
function postMessage(window2, command) {
  if (window2) {
    window2.postMessage({ source: "be-appearance-editor", ...command }, "*");
  }
}
function appearanceState() {
  return useAppearanceStore.getState();
}
function useSaveAppearanceChanges() {
  return useMutation({
    mutationFn: (values) => saveAppearanceChanges(values),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["admin/appearance/values"]
      });
      toast(message("Changes saved"));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function saveAppearanceChanges(changes) {
  return apiClient.post(`admin/appearance`, { changes }).then((r) => r.data);
}
function useAppearanceValues() {
  return useQuery({
    queryKey: ["admin/appearance/values"],
    queryFn: () => fetchAppearanceValues(),
    staleTime: Infinity
  });
}
function fetchAppearanceValues() {
  return apiClient.get("admin/appearance/values").then((response) => response.data);
}
function SectionHeader() {
  const { pathname } = useLocation();
  const { getValues } = useFormContext();
  const [breadcrumb, setBreadcrumb] = useState(null);
  useEffect(() => {
    var _a2;
    const [, , sectionName] = pathname.split("/").filter((p) => !!p);
    if (sectionName) {
      const section = (_a2 = appearanceState().config) == null ? void 0 : _a2.sections[sectionName];
      if (section) {
        setBreadcrumb([
          {
            label: message("Appearance"),
            location: ""
          },
          ...section.buildBreadcrumb(pathname, getValues())
        ]);
        return;
      }
    }
    setBreadcrumb(null);
  }, [pathname, getValues]);
  if (!breadcrumb || breadcrumb.length < 2) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center border-b h-60 flex-shrink-0", children: [
    /* @__PURE__ */ jsx(
      IconButton,
      {
        iconSize: "md",
        radius: "rounded-none",
        className: "text-muted h-full w-50 flex-shrink-0",
        elementType: Link,
        to: `/admin/appearance/${breadcrumb[breadcrumb.length - 2].location}`,
        children: /* @__PURE__ */ jsx(KeyboardArrowLeftIcon, {})
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "border-l p-10 min-w-0", children: [
      /* @__PURE__ */ jsx("div", { className: "text-xs text-muted", children: /* @__PURE__ */ jsx(Trans, { message: "Customizing" }) }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4 text-sm mt-2", children: breadcrumb.map((item, index) => {
        const isLast = breadcrumb.length - 1 === index;
        const isFirst = index === 0;
        const label = /* @__PURE__ */ jsx(MixedText, { value: item.label });
        if (isFirst) {
          return null;
        }
        return /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: clsx(
                "whitespace-nowrap overflow-hidden overflow-ellipsis min-w-0",
                isLast && "text-primary",
                // don't overflow ellipses last item
                isLast ? "flex-shrink-0" : "flex-auto"
              ),
              children: label
            }
          ),
          !isLast && /* @__PURE__ */ jsx(KeyboardArrowRightIcon, { className: "icon-sm text-muted flex-shrink-0" })
        ] }, index);
      }) })
    ] })
  ] });
}
function AppearanceLayout() {
  const { isAppearanceEditorActive } = useAppearanceEditorMode();
  const { data } = useAppearanceValues();
  const { base_url } = useSettings();
  const iframeRef = useRef(null);
  const { pathname } = useLocation();
  useEffect(() => {
    if ((data == null ? void 0 : data.defaults) && !appearanceState().defaults) {
      appearanceState().setDefaults(data.defaults);
    }
  }, [data]);
  useEffect(() => {
    if (iframeRef.current) {
      appearanceState().setIframeWindow(iframeRef.current.contentWindow);
    }
  }, []);
  useEffect(() => {
    const sectionName = pathname.split("/")[3];
    appearanceState().preview.navigate(sectionName);
  }, [pathname]);
  if (isAppearanceEditorActive) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/admin" });
  }
  return /* @__PURE__ */ jsxs("div", { className: "h-screen items-center md:flex", children: [
    /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Appearance" }) }),
    /* @__PURE__ */ jsx(Sidebar, { values: data == null ? void 0 : data.values }),
    /* @__PURE__ */ jsx("div", { className: "relative h-full flex-auto", children: /* @__PURE__ */ jsx(
      "iframe",
      {
        ref: iframeRef,
        className: "h-full w-full max-md:hidden",
        src: `${base_url}?appearanceEditor=true`
      }
    ) })
  ] });
}
function Sidebar({ values }) {
  const spinner = /* @__PURE__ */ jsx("div", { className: "flex h-full flex-auto items-center justify-center", children: /* @__PURE__ */ jsx(ProgressCircle, { isIndeterminate: true, "aria-label": "Loading editor" }) });
  return /* @__PURE__ */ jsx("div", { className: "relative z-10 h-full w-full border-r bg shadow-lg @container md:w-320", children: values ? /* @__PURE__ */ jsx(AppearanceForm, { defaultValues: values }) : spinner });
}
function AppearanceForm({ defaultValues }) {
  const form = useForm({ defaultValues });
  const { watch, reset } = form;
  const saveChanges = useSaveAppearanceChanges();
  useEffect(() => {
    const subscription = watch((value) => {
      appearanceState().preview.setValues(value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  return /* @__PURE__ */ jsxs(
    Form$1,
    {
      className: "flex h-full flex-col",
      form,
      onSubmit: (values) => {
        saveChanges.mutate(values, {
          onSuccess: () => reset(values)
        });
      },
      children: [
        /* @__PURE__ */ jsx(Header$4, { isLoading: saveChanges.isPending }),
        /* @__PURE__ */ jsx(SectionHeader, {}),
        /* @__PURE__ */ jsx("div", { className: "flex-auto overflow-y-auto px-14 py-20", children: /* @__PURE__ */ jsx(FileUploadProvider, { children: /* @__PURE__ */ jsx(Outlet, {}) }) })
      ]
    }
  );
}
function Header$4({ isLoading }) {
  const {
    formState: { dirtyFields }
  } = useFormContext();
  const isDirty = Object.keys(dirtyFields).length;
  return /* @__PURE__ */ jsxs("div", { className: "flex h-50 flex-shrink-0 items-center border-b pr-10", children: [
    /* @__PURE__ */ jsx(
      IconButton,
      {
        border: "border-r",
        className: "text-muted",
        elementType: Link,
        to: "..",
        children: /* @__PURE__ */ jsx(CloseIcon, {})
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "pl-10", children: /* @__PURE__ */ jsx(Trans, { message: "Appearance editor" }) }),
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "flat",
        color: "primary",
        className: "ml-auto block",
        disabled: !isDirty || isLoading,
        type: "submit",
        children: isDirty ? /* @__PURE__ */ jsx(Trans, { message: "Save" }) : /* @__PURE__ */ jsx(Trans, { message: "Saved" })
      }
    )
  ] });
}
function MenuList() {
  const navigate = useNavigate();
  const { trans } = useTrans();
  const { fields, append } = useFieldArray({
    name: "settings.menus",
    keyName: "key"
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { children: fields.map((field, index) => /* @__PURE__ */ jsx(AppearanceButton, { to: `${index}`, elementType: Link, children: field.name }, field.key)) }),
    /* @__PURE__ */ jsx("div", { className: "text-right", children: /* @__PURE__ */ jsx(
      Button,
      {
        variant: "outline",
        color: "primary",
        startIcon: /* @__PURE__ */ jsx(AddIcon, {}),
        size: "xs",
        onClick: () => {
          const id = nanoid(10);
          append({
            name: trans(
              message("New menu :number", {
                values: { number: fields.length + 1 }
              })
            ),
            id,
            positions: [],
            items: []
          });
          navigate(`${fields.length}`);
        },
        children: /* @__PURE__ */ jsx(Trans, { message: "Create menu" })
      }
    ) })
  ] });
}
function AddMenuItemDialog({
  title = /* @__PURE__ */ jsx(Trans, { message: "Add menu item" })
}) {
  const { data } = useValueLists(["menuItemCategories"]);
  const categories = (data == null ? void 0 : data.menuItemCategories) || [];
  const routeItems = useAvailableRoutes();
  return /* @__PURE__ */ jsxs(Dialog, { size: "sm", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: title }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsxs(Accordion, { variant: "outline", children: [
      /* @__PURE__ */ jsx(
        AccordionItem,
        {
          label: /* @__PURE__ */ jsx(Trans, { message: "Link" }),
          bodyClassName: "max-h-240 overflow-y-auto",
          children: /* @__PURE__ */ jsx(AddCustomLink, {})
        }
      ),
      /* @__PURE__ */ jsx(
        AccordionItem,
        {
          label: /* @__PURE__ */ jsx(Trans, { message: "Route" }),
          bodyClassName: "max-h-240 overflow-y-auto",
          children: /* @__PURE__ */ jsx(AddRoute, { items: routeItems })
        }
      ),
      categories.map((category) => /* @__PURE__ */ jsx(
        AccordionItem,
        {
          label: /* @__PURE__ */ jsx(Trans, { message: category.name }),
          children: /* @__PURE__ */ jsx(AddRoute, { items: category.items })
        },
        category.name
      ))
    ] }) })
  ] });
}
function AddCustomLink() {
  const form = useForm({
    defaultValues: {
      id: nanoid(6),
      type: "link",
      target: "_blank"
    }
  });
  const { close } = useDialogContext();
  return /* @__PURE__ */ jsxs(
    Form$1,
    {
      form,
      onSubmit: (value) => {
        close(value);
      },
      children: [
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            required: true,
            name: "label",
            label: /* @__PURE__ */ jsx(Trans, { message: "Label" }),
            className: "mb-20"
          }
        ),
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            required: true,
            type: "url",
            name: "action",
            placeholder: "https://",
            label: /* @__PURE__ */ jsx(Trans, { message: "Url" }),
            className: "mb-20"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "text-right", children: /* @__PURE__ */ jsx(Button, { type: "submit", variant: "flat", color: "primary", size: "xs", children: /* @__PURE__ */ jsx(Trans, { message: "Add to menu" }) }) })
      ]
    }
  );
}
function AddRoute({ items }) {
  const { close } = useDialogContext();
  return /* @__PURE__ */ jsx(List, { children: items.map((item) => {
    return /* @__PURE__ */ jsx(
      ListItem,
      {
        startIcon: /* @__PURE__ */ jsx(AddIcon, { size: "sm" }),
        onSelected: () => {
          if (item.label) {
            const last = item.label.split("/").pop();
            item.label = last ? ucFirst(last) : item.label;
            item.id = nanoid(6);
          }
          close(item);
        },
        children: item.label
      },
      item.id
    );
  }) });
}
const DragIndicatorIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" }),
  "DragIndicatorOutlined"
);
const DeleteIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" }),
  "DeleteOutlined"
);
const dropdownMenu = "/assets/dropdown-menu-3e584075.svg";
function MenuEditor() {
  const { menuIndex } = useParams();
  const navigate = useNavigate();
  const { getValues } = useFormContext();
  const formPath = `settings.menus.${menuIndex}`;
  const menu = getValues(formPath);
  useEffect(() => {
    if (!menu) {
      navigate("/admin/appearance/menus");
    } else {
      appearanceState().preview.setHighlight(`[data-menu-id="${menu.id}"]`);
    }
  }, [navigate, menu]);
  if (!menu) {
    return null;
  }
  return /* @__PURE__ */ jsx(MenuEditorSection, { formPath });
}
function MenuEditorSection({ formPath }) {
  const {
    site: { has_mobile_app }
  } = useSettings();
  const menuSectionConfig = useAppearanceStore(
    (s) => {
      var _a2;
      return (_a2 = s.config) == null ? void 0 : _a2.sections.menus.config;
    }
  );
  const menuPositions = useMemo(() => {
    const positions = [...menuSectionConfig == null ? void 0 : menuSectionConfig.positions];
    if (has_mobile_app) {
      positions.push("mobile-app-about");
    }
    return positions.map((position) => ({
      key: position,
      name: position.replaceAll("-", " ")
    }));
  }, [menuSectionConfig, has_mobile_app]);
  const fieldArray = useFieldArray({
    name: `${formPath}.items`,
    keyName: "key"
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-30 border-b pb-30", children: [
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          name: `${formPath}.name`,
          label: /* @__PURE__ */ jsx(Trans, { message: "Menu name" }),
          className: "mb-20",
          autoFocus: true
        }
      ),
      /* @__PURE__ */ jsx(
        FormChipField,
        {
          chipSize: "sm",
          name: `${formPath}.positions`,
          valueKey: "id",
          label: /* @__PURE__ */ jsx(Trans, { message: "Menu positions" }),
          description: /* @__PURE__ */ jsx(Trans, { message: "Where should this menu appear on the site" }),
          children: menuPositions.map((item) => /* @__PURE__ */ jsx(Item, { value: item.key, capitalizeFirst: true, children: item.name }, item.key))
        }
      )
    ] }),
    /* @__PURE__ */ jsx(MenuItemsManager, { fieldArray }),
    /* @__PURE__ */ jsx("div", { className: "text-right", children: /* @__PURE__ */ jsx(DeleteMenuTrigger, {}) })
  ] });
}
function MenuItemsManager({ fieldArray: { append, fields, move } }) {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-shrink-0 items-center justify-between gap-16", children: [
      /* @__PURE__ */ jsx(Trans, { message: "Menu items" }),
      /* @__PURE__ */ jsxs(
        DialogTrigger,
        {
          type: "popover",
          placement: "right",
          offset: 20,
          onClose: (menuItemConfig) => {
            if (menuItemConfig) {
              append({ ...menuItemConfig });
              navigate(`items/${fields.length}`);
            }
          },
          children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                color: "primary",
                size: "xs",
                startIcon: /* @__PURE__ */ jsx(AddIcon, {}),
                children: /* @__PURE__ */ jsx(Trans, { message: "Add" })
              }
            ),
            /* @__PURE__ */ jsx(AddMenuItemDialog, {})
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-20 flex-shrink-0", children: [
      fields.map((item, index) => /* @__PURE__ */ jsx(
        MenuListItem,
        {
          item,
          items: fields,
          index,
          onSortEnd: (oldIndex, newIndex) => {
            move(oldIndex, newIndex);
          }
        },
        item.key
      )),
      !fields.length ? /* @__PURE__ */ jsx(
        IllustratedMessage,
        {
          size: "xs",
          className: "my-40",
          image: /* @__PURE__ */ jsx(SvgImage, { src: dropdownMenu }),
          title: /* @__PURE__ */ jsx(Trans, { message: "No menu items yet" }),
          description: /* @__PURE__ */ jsx(Trans, { message: "Click “add“ button to start adding links, pages, routes and other items to this menu. " })
        }
      ) : null
    ] })
  ] });
}
function DeleteMenuTrigger() {
  const navigate = useNavigate();
  const { menuIndex } = useParams();
  const { fields, remove } = useFieldArray({
    name: "settings.menus",
    keyName: "key"
  });
  if (!menuIndex)
    return null;
  const menu = fields[+menuIndex];
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "modal",
      onClose: (isConfirmed) => {
        if (isConfirmed) {
          const index = fields.findIndex((m2) => m2.id === menu.id);
          remove(index);
          navigate("/admin/appearance/menus");
        }
      },
      children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            color: "danger",
            size: "xs",
            startIcon: /* @__PURE__ */ jsx(DeleteIcon, {}),
            children: /* @__PURE__ */ jsx(Trans, { message: "Delete menu" })
          }
        ),
        /* @__PURE__ */ jsx(
          ConfirmationDialog,
          {
            isDanger: true,
            title: /* @__PURE__ */ jsx(Trans, { message: "Delete menu" }),
            body: /* @__PURE__ */ jsx(
              Trans,
              {
                message: "Are you sure you want to delete “:name“?",
                values: { name: menu.name }
              }
            ),
            confirm: /* @__PURE__ */ jsx(Trans, { message: "Delete" })
          }
        )
      ]
    }
  );
}
function MenuListItem({ item, items, index, onSortEnd }) {
  const ref = useRef(null);
  const { sortableProps, dragHandleRef } = useSortable({
    item,
    items,
    type: "menuEditorSortable",
    ref,
    onSortEnd,
    strategy: "liveSort"
  });
  const Icon = item.icon && createSvgIconFromTree(item.icon);
  const iconOnlyLabel = /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-xs text-muted", children: [
    Icon && /* @__PURE__ */ jsx(Icon, { size: "sm" }),
    "(",
    /* @__PURE__ */ jsx(Trans, { message: "No label..." }),
    ")"
  ] });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    AppearanceButton,
    {
      elementType: Link,
      to: `items/${index}`,
      ref,
      ...sortableProps,
      children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-10", children: [
        /* @__PURE__ */ jsx(IconButton, { ref: dragHandleRef, size: "sm", children: /* @__PURE__ */ jsx(DragIndicatorIcon, { className: "text-muted hover:cursor-move" }) }),
        /* @__PURE__ */ jsx("div", { children: item.label || iconOnlyLabel })
      ] })
    }
  ) });
}
function MenuItemEditor() {
  const { menuIndex, menuItemIndex } = useParams();
  const navigate = useNavigate$1();
  const { getValues } = useFormContext();
  const formPath = `settings.menus.${menuIndex}.items.${menuItemIndex}`;
  const item = getValues(formPath);
  useEffect(() => {
    if (!item)
      ;
    else {
      appearanceState().preview.setHighlight(
        `[data-menu-item-id="${item.id}"]`
      );
    }
  }, [navigate, item]);
  if (!item || menuItemIndex == null) {
    return null;
  }
  return /* @__PURE__ */ jsx(MenuItemEditorSection, { formPath });
}
function MenuItemEditorSection({ formPath }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(MenuItemForm, { formPathPrefix: formPath }),
    /* @__PURE__ */ jsx("div", { className: "text-right mt-40", children: /* @__PURE__ */ jsx(DeleteItemTrigger, {}) })
  ] });
}
function DeleteItemTrigger() {
  const navigate = useNavigate$1();
  const { menuIndex, menuItemIndex } = useParams();
  const { fields, remove } = useFieldArray({
    name: `settings.menus.${+menuIndex}.items`
  });
  if (!menuItemIndex)
    return null;
  const item = fields[+menuItemIndex];
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "modal",
      onClose: (isConfirmed) => {
        if (isConfirmed) {
          if (menuItemIndex) {
            remove(+menuItemIndex);
            navigate(`/admin/appearance/menus/${menuIndex}`);
          }
        }
      },
      children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            color: "danger",
            size: "xs",
            startIcon: /* @__PURE__ */ jsx(DeleteIcon, {}),
            children: /* @__PURE__ */ jsx(Trans, { message: "Delete this item" })
          }
        ),
        /* @__PURE__ */ jsx(
          ConfirmationDialog,
          {
            isDanger: true,
            title: /* @__PURE__ */ jsx(Trans, { message: "Delete menu item" }),
            body: /* @__PURE__ */ jsx(
              Trans,
              {
                message: "Are you sure you want to delete “:name“?",
                values: { name: item.label }
              }
            ),
            confirm: /* @__PURE__ */ jsx(Trans, { message: "Delete" })
          }
        )
      ]
    }
  );
}
function GeneralSection() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      BrandingImageSelector,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Favicon" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "This will generate different size favicons. Image should be at least 512x512 in size." }),
        type: "favicon"
      }
    ),
    /* @__PURE__ */ jsx(
      BrandingImageSelector,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Light logo" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Will be used on dark backgrounds." }),
        type: "logo_light"
      }
    ),
    /* @__PURE__ */ jsx(
      BrandingImageSelector,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Dark logo" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Will be used on light backgrounds. Will default to light logo if left empty." }),
        type: "logo_dark"
      }
    ),
    /* @__PURE__ */ jsx(
      BrandingImageSelector,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Mobile light logo" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Will be used on light backgrounds on mobile. Will default to desktop logo if left empty." }),
        type: "logo_light_mobile"
      }
    ),
    /* @__PURE__ */ jsx(
      BrandingImageSelector,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Mobile dark logo" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Will be used on dark backgrounds on mobile. Will default to desktop if left empty." }),
        type: "logo_dark_mobile"
      }
    ),
    /* @__PURE__ */ jsx(SiteNameTextField, {}),
    /* @__PURE__ */ jsx(SiteDescriptionTextArea, {})
  ] });
}
function BrandingImageSelector({ label, description, type }) {
  const defaultValue = useAppearanceStore(
    (s) => {
      var _a2;
      return (_a2 = s.defaults) == null ? void 0 : _a2.settings.branding[type];
    }
  );
  return /* @__PURE__ */ jsx(
    FormImageSelector,
    {
      name: `settings.branding.${type}`,
      className: "border-b pb-30 mb-30",
      label,
      description,
      diskPrefix: "branding_media",
      defaultValue,
      onChange: () => {
        appearanceState().preview.setHighlight('[data-logo="navbar"]');
      }
    }
  );
}
function SiteNameTextField() {
  return /* @__PURE__ */ jsx(
    FormTextField,
    {
      name: "appearance.env.app_name",
      required: true,
      className: "mt-20",
      label: /* @__PURE__ */ jsx(Trans, { message: "Site name" })
    }
  );
}
function SiteDescriptionTextArea() {
  return /* @__PURE__ */ jsx(
    FormTextField,
    {
      name: "settings.branding.site_description",
      className: "mt-20",
      inputElementType: "textarea",
      rows: 4,
      label: /* @__PURE__ */ jsx(Trans, { message: "Site description" })
    }
  );
}
function randomNumber(min = 1, max = 1e4) {
  const randomBuffer = new Uint32Array(1);
  window.crypto.getRandomValues(randomBuffer);
  const number = randomBuffer[0] / (4294967295 + 1);
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(number * (max - min + 1)) + min;
}
function ThemeList() {
  const { trans } = useTrans();
  const navigate = useNavigate();
  const {
    data: { themes }
  } = useBootstrapData();
  const { fields, append } = useFieldArray({
    name: "appearance.themes.all",
    keyName: "key"
  });
  useEffect(() => {
    if (themes.selectedThemeId) {
      appearanceState().preview.setActiveTheme(themes.selectedThemeId);
    }
  }, [themes.selectedThemeId]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "mb-20", children: /* @__PURE__ */ jsx(
      Button,
      {
        size: "xs",
        variant: "outline",
        color: "primary",
        startIcon: /* @__PURE__ */ jsx(AddIcon, {}),
        onClick: () => {
          var _a2;
          const lightThemeColors = (_a2 = appearanceState().defaults) == null ? void 0 : _a2.appearance.themes.light;
          append({
            id: randomNumber(),
            name: trans(message("New theme")),
            values: lightThemeColors
          });
          navigate(`${fields.length + 1}`);
        },
        children: /* @__PURE__ */ jsx(Trans, { message: "New theme" })
      }
    ) }),
    fields.map((field, index) => /* @__PURE__ */ jsx(AppearanceButton, { to: `${index}`, elementType: NavLink, children: field.name }, field.key))
  ] });
}
const AceEditor = React.lazy(() => import("./ace-editor-688dad49.mjs"));
function AceDialog({
  defaultValue,
  mode = "html",
  title,
  onSave,
  isSaving,
  footerStartAction,
  beautify,
  editorRef
}) {
  const [value, setValue] = useState(defaultValue);
  const [isValid, setIsValid] = useState(true);
  return /* @__PURE__ */ jsxs(Dialog, { size: "fullscreen", className: "h-full w-full", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: title }),
    /* @__PURE__ */ jsx(DialogBody, { className: "relative flex-auto", padding: "p-0", children: /* @__PURE__ */ jsx(
      Suspense,
      {
        fallback: /* @__PURE__ */ jsx("div", { className: "flex h-400 w-full items-center justify-center", children: /* @__PURE__ */ jsx(
          ProgressCircle,
          {
            "aria-label": "Loading editor...",
            isIndeterminate: true,
            size: "md"
          }
        ) }),
        children: /* @__PURE__ */ jsx(
          AceEditor,
          {
            beautify,
            mode,
            onChange: (newValue) => setValue(newValue),
            defaultValue: value || "",
            onIsValidChange: setIsValid,
            editorRef
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsx(
      Footer,
      {
        disabled: !isValid || isSaving,
        value,
        onSave,
        startAction: footerStartAction
      }
    )
  ] });
}
function Footer({ disabled, value, onSave, startAction }) {
  const { close } = useDialogContext();
  return /* @__PURE__ */ jsxs(DialogFooter, { dividerTop: true, startAction, children: [
    /* @__PURE__ */ jsx(Button, { onClick: () => close(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
    /* @__PURE__ */ jsx(
      Button,
      {
        disabled,
        variant: "flat",
        color: "primary",
        onClick: () => {
          if (onSave) {
            onSave(value);
          } else {
            close(value);
          }
        },
        children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
      }
    )
  ] });
}
function useSeoTags(name) {
  return useQuery({
    queryKey: ["admin", "seo-tags", name],
    queryFn: () => fetchTags(name)
  });
}
function fetchTags(name) {
  return apiClient.get(`admin/appearance/seo-tags/${name}`).then((response) => response.data);
}
function useUpdateSeoTags(name) {
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: (payload) => updateTags(name, payload.tags),
    onSuccess: async () => {
      await queryClient2.invalidateQueries({
        queryKey: ["admin", "seo-tags", name]
      });
      toast(message("Updated SEO tags"));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function updateTags(name, tags) {
  return apiClient.put(`admin/appearance/seo-tags/${name}`, { tags }).then((r) => r.data);
}
const pages = ((_a = mergedAppearanceConfig.sections["seo-settings"].config) == null ? void 0 : _a.pages) || [];
const names = pages.map((page) => page.key);
function SeoSection() {
  const { isLoading } = useSeoTags(names);
  if (isLoading) {
    return /* @__PURE__ */ jsx(FullPageLoader, {});
  }
  return /* @__PURE__ */ jsx(Fragment, { children: pages.map((page) => /* @__PURE__ */ jsx(TagEditorTrigger, { label: page.label, name: page.key }, page.key)) });
}
function TagEditorTrigger({ label, name }) {
  const { data, isLoading } = useSeoTags(names);
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(AppearanceButton, { disabled: isLoading, children: /* @__PURE__ */ jsx(Trans, { ...label }) }),
    data ? /* @__PURE__ */ jsx(TagsEditorDialog, { name, value: data[name] }) : null
  ] });
}
function TagsEditorDialog({ name, value }) {
  const { close } = useDialogContext();
  const updateTags2 = useUpdateSeoTags(name);
  const editorRef = useRef(null);
  const resetButton = /* @__PURE__ */ jsx(
    Button,
    {
      variant: "outline",
      color: "primary",
      onClick: () => {
        if (editorRef.current) {
          editorRef.current.editor.setValue(value.original);
        }
      },
      children: /* @__PURE__ */ jsx(Trans, { message: "Reset to original" })
    }
  );
  return /* @__PURE__ */ jsx(
    AceDialog,
    {
      mode: "php_laravel_blade",
      title: /* @__PURE__ */ jsx(Trans, { message: "Edit SEO meta tags" }),
      footerStartAction: resetButton,
      editorRef,
      defaultValue: value.custom || value.original,
      isSaving: updateTags2.isPending,
      beautify: false,
      onSave: (newValue) => {
        if (newValue != null) {
          updateTags2.mutate(
            { tags: newValue },
            {
              onSuccess: () => close()
            }
          );
        }
      }
    }
  );
}
function CustomCodeSection() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(CustomCodeDialogTrigger, { mode: "css" }),
    /* @__PURE__ */ jsx(CustomCodeDialogTrigger, { mode: "html" })
  ] });
}
function CustomCodeDialogTrigger({ mode }) {
  const { getValues } = useFormContext();
  const { setValue } = useFormContext();
  const title = mode === "html" ? /* @__PURE__ */ jsx(Trans, { message: "Custom HTML & JavaScript" }) : /* @__PURE__ */ jsx(Trans, { message: "Custom CSS" });
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "modal",
      onClose: (newValue) => {
        if (newValue != null) {
          setValue(`appearance.custom_code.${mode}`, newValue, {
            shouldDirty: true
          });
          appearanceState().preview.setCustomCode(mode, newValue);
        }
      },
      children: [
        /* @__PURE__ */ jsx(AppearanceButton, { children: title }),
        /* @__PURE__ */ jsx(
          AceDialog,
          {
            title,
            defaultValue: getValues(`appearance.custom_code.${mode}`) || "",
            mode
          }
        )
      ]
    }
  );
}
const articlesSvg = "/assets/articles-e4d78a19.svg";
const CustomPageDatatableFilters = (config) => {
  const dynamicFilters = config.customPages.types.length > 1 ? [
    {
      control: {
        type: FilterControlType.Select,
        defaultValue: "default",
        options: config.customPages.types.map((type) => ({
          value: type.type,
          label: type.label,
          key: type.type
        }))
      },
      key: "type",
      label: message("Type"),
      description: message("Type of the page"),
      defaultOperator: FilterOperator.eq
    }
  ] : [];
  return [
    {
      key: "user_id",
      label: message("User"),
      description: message("User page was created by"),
      defaultOperator: FilterOperator.eq,
      control: {
        type: FilterControlType.SelectModel,
        model: USER_MODEL
      }
    },
    ...dynamicFilters,
    createdAtFilter({
      description: message("Date page was created")
    }),
    updatedAtFilter({
      description: message("Date page was last updated")
    })
  ];
};
const CustomPageDatatableColumns = [
  {
    key: "slug",
    allowsSorting: true,
    width: "flex-2 min-w-200",
    visibleInMode: "all",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Slug" }),
    body: (page) => /* @__PURE__ */ jsx(Link, { target: "_blank", to: `/pages/${page.slug}`, className: LinkStyle, children: page.slug })
  },
  {
    key: "user_id",
    allowsSorting: true,
    width: "flex-2 min-w-140",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Owner" }),
    body: (page) => page.user && /* @__PURE__ */ jsx(
      NameWithAvatar,
      {
        image: page.user.avatar,
        label: page.user.display_name,
        description: page.user.email
      }
    )
  },
  {
    key: "type",
    maxWidth: "max-w-100",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Type" }),
    body: (page) => /* @__PURE__ */ jsx(Trans, { message: page.type })
  },
  {
    key: "updated_at",
    allowsSorting: true,
    width: "w-100",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Last updated" }),
    body: (page) => /* @__PURE__ */ jsx(FormattedDate, { date: page.updated_at })
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    hideHeader: true,
    align: "end",
    width: "w-84 flex-shrink-0",
    visibleInMode: "all",
    body: (page) => /* @__PURE__ */ jsx(
      IconButton,
      {
        size: "md",
        className: "text-muted",
        elementType: Link,
        to: `${page.id}/edit`,
        children: /* @__PURE__ */ jsx(EditIcon, {})
      }
    )
  }
];
function CustomPageDatablePage() {
  const config = useContext(SiteConfigContext);
  const filters = useMemo(() => {
    return CustomPageDatatableFilters(config);
  }, [config]);
  return /* @__PURE__ */ jsx(
    DataTablePage,
    {
      endpoint: "custom-pages",
      title: /* @__PURE__ */ jsx(Trans, { message: "Custom pages" }),
      filters,
      columns: CustomPageDatatableColumns,
      queryParams: { with: "user" },
      actions: /* @__PURE__ */ jsx(Actions$b, {}),
      selectedActions: /* @__PURE__ */ jsx(DeleteSelectedItemsAction, {}),
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: articlesSvg,
          title: /* @__PURE__ */ jsx(Trans, { message: "No pages have been created yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching pages" })
        }
      )
    }
  );
}
function Actions$b() {
  return /* @__PURE__ */ jsx(DataTableAddItemButton, { elementType: Link, to: "new", children: /* @__PURE__ */ jsx(Trans, { message: "New page" }) });
}
const AppSettingsNavConfig = [
  {
    label: message("Local search"),
    to: "search"
  },
  {
    label: message("Automation"),
    to: "providers"
  },
  {
    label: message("Player"),
    to: "player"
  }
];
const filteredSettingsNavConfig = [
  { label: message("General"), to: "general" },
  ...AppSettingsNavConfig,
  getBootstrapData().settings.billing.integrated && {
    label: message("Subscriptions"),
    to: "subscriptions"
  },
  { label: message("Localization"), to: "localization" },
  {
    label: message("Authentication"),
    to: "authentication"
  },
  { label: message("Uploading"), to: "uploading" },
  { label: message("Outgoing email"), to: "outgoing-email" },
  { label: message("Cache"), to: "cache" },
  { label: message("Analytics"), to: "analytics" },
  { label: message("Logging"), to: "logging" },
  { label: message("Queue"), to: "queue" },
  { label: message("Recaptcha"), to: "recaptcha" },
  { label: message("GDPR"), to: "gdpr" },
  { label: message("Maintenance"), to: "maintenance" },
  {
    label: message("Menus"),
    to: "/admin/appearance/menus"
  },
  {
    label: message("Seo"),
    to: "/admin/appearance/seo-settings"
  },
  {
    label: message("Themes"),
    to: "/admin/appearance/themes"
  }
].filter(Boolean);
const SettingsNavConfig = filteredSettingsNavConfig;
function SettingsLayout({ className }) {
  const isMobile = useIsMobileMediaQuery();
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        className,
        "container mx-auto min-h-full items-start gap-30 p-24 md:flex"
      ),
      children: [
        /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Settings" }) }),
        isMobile ? /* @__PURE__ */ jsx(MobileNav, {}) : /* @__PURE__ */ jsx(DesktopNav, {}),
        /* @__PURE__ */ jsx("div", { className: "relative max-w-500 flex-auto md:px-30", children: /* @__PURE__ */ jsx(Outlet, {}) })
      ]
    }
  );
}
function MobileNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const value = pathname.split("/").pop();
  return /* @__PURE__ */ jsx(
    SelectForwardRef,
    {
      minWidth: "min-w-none",
      className: "mb-24 w-full bg",
      selectionMode: "single",
      selectedValue: value,
      onSelectionChange: (newPage) => {
        navigate(newPage);
      },
      children: SettingsNavConfig.map((item) => /* @__PURE__ */ jsx(Item, { value: item.to, children: /* @__PURE__ */ jsx(Trans, { ...item.label }) }, item.to))
    }
  );
}
function DesktopNav() {
  return /* @__PURE__ */ jsx("div", { className: "sticky top-24 w-240 flex-shrink-0", children: SettingsNavConfig.map((item) => /* @__PURE__ */ jsx(
    NavLink,
    {
      to: item.to,
      className: ({ isActive }) => clsx(
        "mb-8 block whitespace-nowrap rounded-button p-14 text-sm transition-bg-color",
        isActive ? "bg-primary/6 font-semibold text-primary" : "hover:bg-hover"
      ),
      children: /* @__PURE__ */ jsx(Trans, { ...item.label })
    },
    item.to
  )) });
}
function useAdminSettings() {
  return useQuery({
    queryKey: ["fetchAdminSettings"],
    queryFn: () => fetchAdminSettings(),
    // prevent automatic re-fetching so diffing with previous settings work properly
    staleTime: Infinity
  });
}
function fetchAdminSettings() {
  return apiClient.get("settings").then((response) => response.data);
}
function GenerateSitemap() {
  return apiClient.post("sitemap/generate").then((r) => r.data);
}
function useGenerateSitemap() {
  return useMutation({
    mutationFn: () => GenerateSitemap(),
    onSuccess: () => {
      toast(message("Sitemap generated"));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function useUpdateAdminSettings(form) {
  const { data: original } = useAdminSettings();
  return useMutation({
    mutationFn: (props) => {
      var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
      if ((_b = (_a2 = props.client) == null ? void 0 : _a2.cookie_notice) == null ? void 0 : _b.button) {
        props.client.cookie_notice.button = JSON.stringify(
          props.client.cookie_notice.button
        );
      }
      if ((_d = (_c = props.client) == null ? void 0 : _c.registration) == null ? void 0 : _d.policies) {
        props.client.registration.policies = JSON.stringify(
          props.client.registration.policies
        );
      }
      if ((_f = (_e = props.client) == null ? void 0 : _e.artistPage) == null ? void 0 : _f.tabs) {
        props.client.artistPage.tabs = JSON.stringify(
          props.client.artistPage.tabs
        );
      }
      if ((_h = (_g = props.client) == null ? void 0 : _g.title_page) == null ? void 0 : _h.sections) {
        props.client.title_page.sections = JSON.stringify(
          props.client.title_page.sections
        );
      }
      if ((_i = props.client) == null ? void 0 : _i.incoming_email) {
        props.client.incoming_email = JSON.stringify(
          props.client.incoming_email
        );
      }
      if ((_k = (_j = props.client) == null ? void 0 : _j.publish) == null ? void 0 : _k.default_credentials) {
        props.client.publish.default_credentials = JSON.stringify(
          props.client.publish.default_credentials
        );
      }
      const client = props.client ? diff(original.client, props.client) : null;
      const server = props.server ? diff(original.server, props.server) : null;
      return updateAdminSettings({
        client,
        server,
        files: props.files,
        maintenance: props.maintenance
      });
    },
    onSuccess: () => {
      toast(message("Settings updated"), {
        position: "bottom-right"
      });
      queryClient.invalidateQueries({ queryKey: ["fetchAdminSettings"] });
    },
    onError: (r) => onFormQueryError(r, form)
  });
}
function updateAdminSettings({
  client,
  server,
  files,
  maintenance
}) {
  const formData = new FormData();
  if (client) {
    formData.set("client", JSON.stringify(dot.dot(client)));
  }
  if (server) {
    formData.set("server", JSON.stringify(dot.dot(server)));
  }
  Object.entries(files || {}).forEach(([key, file]) => {
    formData.set(key, file);
  });
  return apiClient.post("settings", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }).then((r) => r.data);
}
function SettingsPanel({
  title,
  description,
  children,
  transformValues
}) {
  const { data } = useAdminSettings();
  return /* @__PURE__ */ jsxs("section", { children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-40", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-4 text-xl", children: title }),
      /* @__PURE__ */ jsx("div", { className: "text-sm text-muted", children: description })
    ] }),
    data ? /* @__PURE__ */ jsx(FormWrapper, { defaultValues: data, transformValues, children }) : /* @__PURE__ */ jsx(ProgressCircle, { isIndeterminate: true, "aria-label": "Loading settings..." })
  ] });
}
function FormWrapper({
  children,
  defaultValues,
  transformValues
}) {
  const form = useForm({ defaultValues });
  const updateSettings = useUpdateAdminSettings(form);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      Form$1,
      {
        form,
        onBeforeSubmit: () => {
          const errors = form.formState.errors;
          const keys = Object.keys(errors).filter((key) => {
            return key.endsWith("_group");
          });
          form.clearErrors(keys);
        },
        onSubmit: (value) => {
          value = transformValues ? transformValues(value) : value;
          updateSettings.mutate(value);
        },
        children: [
          children,
          /* @__PURE__ */ jsx("div", { className: "mt-40", children: /* @__PURE__ */ jsx(
            Button,
            {
              type: "submit",
              variant: "flat",
              color: "primary",
              disabled: updateSettings.isPending,
              children: /* @__PURE__ */ jsx(Trans, { message: "Update" })
            }
          ) })
        ]
      }
    ),
    updateSettings.isPending && /* @__PURE__ */ jsx(
      ProgressBar,
      {
        size: "xs",
        className: "absolute -bottom-14 left-30 w-full",
        isIndeterminate: true,
        "aria-label": "Saving settings..."
      }
    )
  ] });
}
function SettingsSeparator() {
  return /* @__PURE__ */ jsx("div", { className: "h-1 bg-divider my-30" });
}
const LinkIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8z" }),
  "LinkOutlined"
);
function LearnMoreLink({ link, className }) {
  const { site } = useSettings();
  if (site.hide_docs_button) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: clsx("flex items-center gap-8", className), children: [
    /* @__PURE__ */ jsx(LinkIcon, { size: "sm" }),
    /* @__PURE__ */ jsx(ExternalLink, { href: link, children: /* @__PURE__ */ jsx(Trans, { message: "Learn more" }) })
  ] });
}
function GeneralSettings() {
  return /* @__PURE__ */ jsxs(
    SettingsPanel,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "General" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Configure site url, homepage, theme and other general settings." }),
      children: [
        /* @__PURE__ */ jsx(SiteUrlSection, {}),
        /* @__PURE__ */ jsx(SettingsSeparator, {}),
        /* @__PURE__ */ jsx(HomepageSection, {}),
        /* @__PURE__ */ jsx(SettingsSeparator, {}),
        /* @__PURE__ */ jsx(ThemeSection, {}),
        /* @__PURE__ */ jsx(SettingsSeparator, {}),
        /* @__PURE__ */ jsx(SitemapSection, {})
      ]
    }
  );
}
function SiteUrlSection() {
  const { data } = useAdminSettings();
  if (!data)
    return null;
  let append = null;
  const server = data.server;
  const isInvalid = server.newAppUrl && server.newAppUrl !== server.app_url;
  if (isInvalid) {
    append = /* @__PURE__ */ jsx("div", { className: "mt-20 text-sm text-danger", children: /* @__PURE__ */ jsx(
      Trans,
      {
        values: {
          baseUrl: server.app_url,
          currentUrl: server.newAppUrl,
          b: (chunks) => /* @__PURE__ */ jsx("b", { children: chunks })
        },
        message: "Base site url is set as <b>:baseUrl</b> in configuration, but current url is <b>:currentUrl</b>. It is recommended to set the primary url you want to use in configuration file and then redirect all other url versions to this primary version via cpanel or .htaccess file."
      }
    ) });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: !!isInvalid,
        name: "server.app_url",
        label: /* @__PURE__ */ jsx(Trans, { message: "Primary site url" }),
        description: /* @__PURE__ */ jsx(LearnMoreLink, { link: "https://support.vebto.com/help-center/articles/35/primary-site-url" })
      }
    ),
    append
  ] });
}
function HomepageSection() {
  var _a2, _b;
  const { watch } = useFormContext();
  const { homepage } = useContext(SiteConfigContext);
  const { data } = useValueLists(["menuItemCategories"]);
  const selectedType = watch("client.homepage.type");
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs(
      FormSelect,
      {
        name: "client.homepage.type",
        selectionMode: "single",
        label: /* @__PURE__ */ jsx(Trans, { message: "Site home page" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Which page should be used as site homepage." }),
        children: [
          homepage.options.map((option) => /* @__PURE__ */ jsx(Item, { value: option.value, children: /* @__PURE__ */ jsx(Trans, { ...option.label }) }, option.value)),
          (_a2 = data == null ? void 0 : data.menuItemCategories) == null ? void 0 : _a2.map((category) => /* @__PURE__ */ jsx(Item, { value: category.type, children: category.name }, category.type))
        ]
      }
    ),
    (_b = data == null ? void 0 : data.menuItemCategories) == null ? void 0 : _b.map((category) => {
      return selectedType === category.type ? /* @__PURE__ */ jsx(
        FormSelect,
        {
          className: "mt-24",
          name: "client.homepage.value",
          selectionMode: "single",
          label: /* @__PURE__ */ jsx(Trans, { message: "Homepage :name", values: { name: category.name } }),
          children: category.items.map((item) => /* @__PURE__ */ jsx(Item, { value: item.model_id, children: item.label }, item.label))
        },
        category.name
      ) : null;
    })
  ] });
}
function ThemeSection() {
  const {
    data: { themes }
  } = useBootstrapData();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      FormSelect,
      {
        className: "mb-20",
        name: "client.themes.default_id",
        selectionMode: "single",
        label: /* @__PURE__ */ jsx(Trans, { message: "Default site theme" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Which theme to use for users that have not chosen a theme manually." }),
        children: [
          /* @__PURE__ */ jsx(Item, { value: 0, children: /* @__PURE__ */ jsx(Trans, { message: "System" }) }),
          themes.all.map((theme) => /* @__PURE__ */ jsx(Item, { value: theme.id, children: theme.name }, theme.id))
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        name: "client.themes.user_change",
        description: /* @__PURE__ */ jsx(Trans, { message: "Allow users to manually change site theme." }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Allow theme change" })
      }
    )
  ] });
}
function SitemapSection() {
  const generateSitemap = useGenerateSitemap();
  const { base_url } = useSettings();
  const url = `${base_url}/storage/sitemaps/sitemap-index.xml`;
  const link = /* @__PURE__ */ jsx(ExternalLink, { href: url, children: url });
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "outline",
        size: "xs",
        color: "primary",
        disabled: generateSitemap.isPending,
        onClick: () => {
          generateSitemap.mutate();
        },
        children: /* @__PURE__ */ jsx(Trans, { message: "Generate sitemap" })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mt-14 text-sm text-muted", children: /* @__PURE__ */ jsx(
      Trans,
      {
        message: "Once generated, sitemap url will be: :url",
        values: {
          url: link
        }
      }
    ) })
  ] });
}
function colorToThemeValue(color) {
  return parseColor(color).toString("rgb").replace("rgb(", "").replace(")", "").replace(/, ?/g, " ");
}
const TuneIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z" }),
  "TuneOutlined"
);
function ThemeSettingsDialogTrigger() {
  const { getValues, setValue } = useFormContext();
  const { themeIndex } = useParams();
  const theme = getValues(`appearance.themes.all.${+themeIndex}`);
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "modal",
      onClose: (value) => {
        if (!value)
          return;
        getValues("appearance.themes.all").forEach((currentTheme, index) => {
          if (currentTheme.id === value.id) {
            setValue(`appearance.themes.all.${index}`, value, {
              shouldDirty: true
            });
            return;
          }
          if (value.default_light) {
            setValue(
              `appearance.themes.all.${index}`,
              { ...currentTheme, default_light: false },
              { shouldDirty: true }
            );
            return;
          }
          if (value.default_dark) {
            setValue(
              `appearance.themes.all.${index}`,
              { ...currentTheme, default_dark: false },
              { shouldDirty: true }
            );
            return;
          }
        });
      },
      children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            size: "xs",
            variant: "outline",
            color: "primary",
            startIcon: /* @__PURE__ */ jsx(TuneIcon, {}),
            children: /* @__PURE__ */ jsx(Trans, { message: "Settings" })
          }
        ),
        /* @__PURE__ */ jsx(SettingsDialog, { theme })
      ]
    }
  );
}
function SettingsDialog({ theme }) {
  const form = useForm({ defaultValues: theme });
  const { close, formId } = useDialogContext();
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "default_light" && value.default_light) {
        form.setValue("default_dark", false);
      }
      if (name === "default_dark" && value.default_dark) {
        form.setValue("default_light", false);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Update settings" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsxs(
      Form$1,
      {
        form,
        id: formId,
        onSubmit: (values) => {
          close(values);
        },
        children: [
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              name: "name",
              label: /* @__PURE__ */ jsx(Trans, { message: "Name" }),
              className: "mb-30",
              autoFocus: true
            }
          ),
          /* @__PURE__ */ jsx(
            FormSwitch,
            {
              name: "is_dark",
              className: "mb-20 pb-20 border-b",
              description: /* @__PURE__ */ jsx(Trans, { message: "Whether this theme has light text on dark background." }),
              children: /* @__PURE__ */ jsx(Trans, { message: "Dark theme" })
            }
          ),
          /* @__PURE__ */ jsx(
            FormSwitch,
            {
              name: "default_light",
              className: "mb-30",
              description: /* @__PURE__ */ jsx(Trans, { message: "When light mode is selected, this theme will be used." }),
              children: /* @__PURE__ */ jsx(Trans, { message: "Default for light mode" })
            }
          ),
          /* @__PURE__ */ jsx(
            FormSwitch,
            {
              name: "default_dark",
              description: /* @__PURE__ */ jsx(Trans, { message: "When dark mode is selected, this theme will be used." }),
              children: /* @__PURE__ */ jsx(Trans, { message: "Default for dark mode" })
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: () => {
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
          type: "submit",
          form: formId,
          disabled: !form.formState.isDirty,
          children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
        }
      )
    ] })
  ] });
}
const RestartAltIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M6 13c0-1.65.67-3.15 1.76-4.24L6.34 7.34C4.9 8.79 4 10.79 4 13c0 4.08 3.05 7.44 7 7.93v-2.02c-2.83-.48-5-2.94-5-5.91zm14 0c0-4.42-3.58-8-8-8-.06 0-.12.01-.18.01l1.09-1.09L11.5 2.5 8 6l3.5 3.5 1.41-1.41-1.08-1.08c.06 0 .12-.01.17-.01 3.31 0 6 2.69 6 6 0 2.97-2.17 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93z" }),
  "RestartAltOutlined"
);
function ThemeMoreOptionsButton() {
  const navigate = useNavigate$1();
  const { themeIndex } = useParams();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const { setValue, getValues } = useFormContext();
  const { fields, remove } = useFieldArray({
    name: "appearance.themes.all"
  });
  const deleteTheme = () => {
    if (fields.length <= 1) {
      toast.danger(message("At least one theme is required"));
      return;
    }
    if (themeIndex) {
      navigate("/admin/appearance/themes");
      remove(+themeIndex);
      setValue("appearance.themes.selectedThemeId", null);
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      MenuTrigger,
      {
        onItemSelected: (key) => {
          if (key === "delete") {
            setConfirmDialogOpen(true);
          } else if (key === "reset") {
            const path = `appearance.themes.all.${+themeIndex}`;
            const defaultColors = getValues(`${path}.is_dark`) ? appearanceState().defaults.appearance.themes.dark : appearanceState().defaults.appearance.themes.light;
            Object.entries(defaultColors).forEach(([colorName, themeValue]) => {
              appearanceState().preview.setThemeValue(colorName, themeValue);
            });
            appearanceState().preview.setThemeFont(null);
            setValue(`${path}.values`, defaultColors, {
              shouldDirty: true
            });
            setValue(`${path}.font`, void 0, {
              shouldDirty: true
            });
          }
        },
        children: [
          /* @__PURE__ */ jsx(IconButton, { size: "md", className: "text-muted", children: /* @__PURE__ */ jsx(MoreVertIcon, {}) }),
          /* @__PURE__ */ jsxs(Menu, { children: [
            /* @__PURE__ */ jsx(Item, { value: "reset", startIcon: /* @__PURE__ */ jsx(RestartAltIcon, {}), children: /* @__PURE__ */ jsx(Trans, { message: "Reset colors" }) }),
            /* @__PURE__ */ jsx(Item, { value: "delete", startIcon: /* @__PURE__ */ jsx(DeleteIcon, {}), children: /* @__PURE__ */ jsx(Trans, { message: "Delete" }) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      DialogTrigger,
      {
        type: "modal",
        isOpen: confirmDialogOpen,
        onClose: (isConfirmed) => {
          if (isConfirmed) {
            deleteTheme();
          }
          setConfirmDialogOpen(false);
        },
        children: /* @__PURE__ */ jsx(
          ConfirmationDialog,
          {
            isDanger: true,
            title: /* @__PURE__ */ jsx(Trans, { message: "Delete theme" }),
            body: /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to delete this theme?" }),
            confirm: /* @__PURE__ */ jsx(Trans, { message: "Delete" })
          }
        )
      }
    )
  ] });
}
const navbarColorMap = [
  {
    label: message("Accent"),
    value: "primary",
    bgColor: "bg-primary",
    previewBgColor: "text-primary"
  },
  {
    label: message("Background"),
    value: "bg",
    bgColor: "bg-background",
    previewBgColor: "text-background"
  },
  {
    label: message("Background alt"),
    value: "bg-alt",
    bgColor: "bg-alt",
    previewBgColor: "text-background-alt"
  },
  {
    label: message("Transparent"),
    value: "transparent",
    bgColor: "bg-transparent",
    previewBgColor: "text-transparent"
  }
];
function NavbarColorPicker() {
  var _a2;
  const { themeIndex } = useParams();
  const { watch, setValue } = useFormContext();
  const key = `appearance.themes.all.${themeIndex}.values.--be-navbar-color`;
  const selectedValue = watch(key);
  const previewColor = (_a2 = navbarColorMap.find(({ value }) => value === selectedValue)) == null ? void 0 : _a2.previewBgColor;
  return /* @__PURE__ */ jsxs(
    MenuTrigger,
    {
      placement: "right",
      selectionMode: "single",
      selectedValue,
      onSelectionChange: (value) => {
        setValue(key, value, { shouldDirty: true });
      },
      children: [
        /* @__PURE__ */ jsx(
          AppearanceButton,
          {
            startIcon: /* @__PURE__ */ jsx(
              ColorIcon,
              {
                viewBox: "0 0 48 48",
                className: clsx("icon-lg", previewColor)
              }
            ),
            children: /* @__PURE__ */ jsx(Trans, { message: "Navbar" })
          }
        ),
        /* @__PURE__ */ jsx(Menu, { children: navbarColorMap.map(({ label, value, bgColor }) => /* @__PURE__ */ jsx(
          Item,
          {
            value,
            startIcon: /* @__PURE__ */ jsx("div", { className: clsx("h-20 w-20 rounded border", bgColor) }),
            children: /* @__PURE__ */ jsx(Trans, { ...label })
          },
          value
        )) })
      ]
    }
  );
}
const colorList = [
  {
    label: message("Background"),
    key: "--be-background"
  },
  {
    label: message("Background alt"),
    key: "--be-background-alt"
  },
  {
    label: message("Foreground"),
    key: "--be-foreground-base"
  },
  {
    label: message("Accent light"),
    key: "--be-primary-light"
  },
  {
    label: message("Accent"),
    key: "--be-primary"
  },
  {
    label: message("Accent dark"),
    key: "--be-primary-dark"
  },
  {
    label: message("Text on accent"),
    key: "--be-on-primary"
  },
  {
    label: message("Chip"),
    key: "--be-background-chip"
  }
];
function ThemeEditor() {
  const navigate = useNavigate();
  const { themeIndex } = useParams();
  const { getValues, watch } = useFormContext();
  const theme = getValues(`appearance.themes.all.${+themeIndex}`);
  const selectedFont = watch(
    `appearance.themes.all.${+themeIndex}.font.family`
  );
  useEffect(() => {
    if (!theme) {
      navigate("/admin/appearance/themes");
    }
  }, [navigate, theme]);
  useEffect(() => {
    if (theme == null ? void 0 : theme.id) {
      appearanceState().preview.setActiveTheme(theme.id);
    }
  }, [theme == null ? void 0 : theme.id]);
  if (!theme)
    return null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-20 flex items-center justify-between gap-10", children: [
      /* @__PURE__ */ jsx(ThemeSettingsDialogTrigger, {}),
      /* @__PURE__ */ jsx(ThemeMoreOptionsButton, {})
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        AppearanceButton,
        {
          elementType: Link,
          to: "font",
          description: selectedFont ? selectedFont : /* @__PURE__ */ jsx(Trans, { message: "System" }),
          children: /* @__PURE__ */ jsx(Trans, { message: "Font" })
        }
      ),
      /* @__PURE__ */ jsx(AppearanceButton, { elementType: Link, to: "radius", children: /* @__PURE__ */ jsx(Trans, { message: "Rounding" }) }),
      /* @__PURE__ */ jsx("div", { className: "mb-6 mt-22 text-sm font-semibold", children: /* @__PURE__ */ jsx(Trans, { message: "Colors" }) }),
      /* @__PURE__ */ jsx(NavbarColorPicker, {}),
      colorList.map((color) => /* @__PURE__ */ jsx(
        ColorPickerTrigger,
        {
          colorName: color.key,
          label: /* @__PURE__ */ jsx(Trans, { ...color.label }),
          initialThemeValue: theme.values[color.key],
          theme
        },
        color.key
      ))
    ] })
  ] });
}
function ColorPickerTrigger({
  label,
  theme,
  colorName,
  initialThemeValue
}) {
  const { setValue } = useFormContext();
  const { themeIndex } = useParams();
  const [selectedThemeValue, setSelectedThemeValue] = useState(initialThemeValue);
  const selectThemeValue = (themeValue) => {
    setSelectedThemeValue(themeValue);
    appearanceState().preview.setThemeValue(colorName, themeValue);
  };
  useEffect(() => {
    setSelectedThemeValue(initialThemeValue);
  }, [initialThemeValue]);
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      value: selectedThemeValue,
      type: "popover",
      placement: "right",
      offset: 10,
      onValueChange: (newColor) => {
        selectThemeValue(colorToThemeValue(newColor));
      },
      onClose: (newColor, { valueChanged, initialValue }) => {
        if (newColor && valueChanged) {
          setValue(
            `appearance.themes.all.${+themeIndex}.values.${colorName}`,
            newColor,
            { shouldDirty: true }
          );
          setValue("appearance.themes.selectedThemeId", theme.id);
        } else {
          selectThemeValue(initialValue);
        }
      },
      children: [
        /* @__PURE__ */ jsx(
          AppearanceButton,
          {
            className: "capitalize",
            startIcon: /* @__PURE__ */ jsx(
              ColorIcon,
              {
                viewBox: "0 0 48 48",
                className: "icon-lg",
                style: { fill: `rgb(${selectedThemeValue})` }
              }
            ),
            children: label
          }
        ),
        /* @__PURE__ */ jsx(ColorPickerDialog, {})
      ]
    }
  );
}
function SectionHelper({
  title,
  description,
  actions,
  color = "primary",
  className,
  size = "md"
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        className,
        "rounded p-10",
        size === "sm" ? "text-xs" : "text-sm",
        color === "positive" && "bg-positive/focus",
        color === "warning" && "bg-warning/focus",
        color === "danger" && "bg-danger/focus",
        color === "primary" && "bg-primary/focus",
        color === "neutral" && "border bg",
        color === "bgAlt" && "border bg-alt"
      ),
      children: [
        title && /* @__PURE__ */ jsx("div", { className: "mb-4 font-medium", children: title }),
        description && /* @__PURE__ */ jsx("div", { children: description }),
        actions && /* @__PURE__ */ jsx("div", { className: "mt-14", children: actions })
      ]
    }
  );
}
function SettingsErrorGroup({
  children,
  name,
  separatorBottom = true,
  separatorTop = true
}) {
  const {
    formState: { errors }
  } = useFormContext();
  const ref = useRef(null);
  const error = errors[name];
  useEffect(() => {
    var _a2;
    if (error) {
      (_a2 = ref.current) == null ? void 0 : _a2.scrollIntoView({ behavior: "smooth" });
    }
  }, [error]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        separatorBottom && "border-b mb-20 pb-20",
        separatorTop && "border-t mt-20 pt-20",
        error && "border-y-error"
      ),
      ref,
      children: [
        children(!!error),
        error && /* @__PURE__ */ jsx(
          "div",
          {
            className: "text-danger text-sm mt-20",
            dangerouslySetInnerHTML: { __html: error.message }
          }
        )
      ]
    }
  );
}
function useSearchModels() {
  return useQuery({
    queryKey: ["search-models"],
    queryFn: () => fetchModels()
  });
}
function fetchModels() {
  return apiClient.get("admin/search/models").then((response) => response.data);
}
function useImportSearchModels() {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (payload) => importModels(payload),
    onSuccess: () => {
      toast(trans(message("Imported search models")));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function importModels(payload) {
  return apiClient.post("admin/search/import", payload).then((r) => r.data);
}
function SearchSettings() {
  return /* @__PURE__ */ jsxs(
    SettingsPanel,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Search" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Configure search method used on the site as well as related 3rd party integrations." }),
      children: [
        /* @__PURE__ */ jsx(SearchMethodSelect, {}),
        /* @__PURE__ */ jsx(ImportRecordsPanel, {})
      ]
    }
  );
}
function SearchMethodSelect() {
  const { watch } = useFormContext();
  const selectedMethod = watch("server.scout_driver");
  return /* @__PURE__ */ jsx(SettingsErrorGroup, { name: "search_group", separatorBottom: false, children: (isInvalid) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      FormSelect,
      {
        invalid: isInvalid,
        name: "server.scout_driver",
        selectionMode: "single",
        label: /* @__PURE__ */ jsx(Trans, { message: "Search method" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Which method should be used for search related functionality across the site." }),
        children: [
          /* @__PURE__ */ jsx(Item, { value: "mysql", children: "Mysql" }),
          /* @__PURE__ */ jsx(Item, { value: "meilisearch", children: "Meilisearch" }),
          /* @__PURE__ */ jsx(Item, { value: "tntsearch", children: "TNTSearch" }),
          /* @__PURE__ */ jsx(Item, { value: "Matchish\\ScoutElasticSearch\\Engines\\ElasticSearchEngine", children: "Elasticsearch" }),
          /* @__PURE__ */ jsx(Item, { value: "algolia", children: "Algolia" })
        ]
      }
    ),
    selectedMethod === "mysql" && /* @__PURE__ */ jsx(MysqlFields, {}),
    selectedMethod === "meilisearch" && /* @__PURE__ */ jsx(MeilisearchFields, {}),
    selectedMethod === "algolia" && /* @__PURE__ */ jsx(AlgoliaFields, {}),
    selectedMethod === "Matchish\\ScoutElasticSearch\\Engines\\ElasticSearchEngine" && /* @__PURE__ */ jsx(ElasticsearchField, {})
  ] }) });
}
function MysqlFields() {
  const { clearErrors } = useFormContext();
  return /* @__PURE__ */ jsxs(
    FormSelect,
    {
      className: "mt-24",
      name: "server.scout_mysql_mode",
      selectionMode: "single",
      label: /* @__PURE__ */ jsx(Trans, { message: "MySQL mode" }),
      onSelectionChange: () => {
        clearErrors();
      },
      children: [
        /* @__PURE__ */ jsx(Item, { value: "basic", children: /* @__PURE__ */ jsx(Trans, { message: "Basic" }) }),
        /* @__PURE__ */ jsx(Item, { value: "extended", children: /* @__PURE__ */ jsx(Trans, { message: "Extended" }) }),
        /* @__PURE__ */ jsx(Item, { value: "fulltext", children: /* @__PURE__ */ jsx(Trans, { message: "Fulltext" }) })
      ]
    }
  );
}
function MeilisearchFields() {
  return /* @__PURE__ */ jsx(
    SectionHelper,
    {
      className: "mt-24",
      color: "warning",
      title: /* @__PURE__ */ jsx(Trans, { message: "Important!" }),
      description: /* @__PURE__ */ jsx(
        Trans,
        {
          message: "<a>Meilisearch</a> needs to be installed and running for this method to work.",
          values: {
            a: (parts) => /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://www.meilisearch.com",
                target: "_blank",
                rel: "noreferrer",
                children: parts
              }
            )
          }
        }
      )
    }
  );
}
function ElasticsearchField() {
  return /* @__PURE__ */ jsx(
    SectionHelper,
    {
      className: "mt-24",
      color: "warning",
      title: /* @__PURE__ */ jsx(Trans, { message: "Important!" }),
      description: /* @__PURE__ */ jsx(
        Trans,
        {
          message: "<a>Elasticsearch</a> needs to be installed and running for this method to work.",
          values: {
            a: (parts) => /* @__PURE__ */ jsx("a", { href: "https://www.elastic.co", target: "_blank", rel: "noreferrer", children: parts })
          }
        }
      )
    }
  );
}
function AlgoliaFields() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        className: "mt-24",
        name: "server.algolia_app_id",
        label: /* @__PURE__ */ jsx(Trans, { message: "Algolia app ID" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        className: "mt-24",
        name: "server.algolia_secret",
        label: /* @__PURE__ */ jsx(Trans, { message: "Algolia app secret" }),
        required: true
      }
    )
  ] });
}
function ImportRecordsPanel() {
  const { getValues } = useFormContext();
  const { data } = useSearchModels();
  const importModels2 = useImportSearchModels();
  const [selectedModel, setSelectedModel] = useState("*");
  return /* @__PURE__ */ jsx(
    SectionHelper,
    {
      className: "mt-34",
      color: "neutral",
      title: /* @__PURE__ */ jsx(Trans, { message: "Import records" }),
      description: /* @__PURE__ */ jsxs("span", { children: [
        /* @__PURE__ */ jsx(Trans, { message: "Whenever a new search method is enabled, records that already exist in database need to be imported into the index. All records created after search method is enabled will be imported automatically." }),
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx(Trans, { message: "Depending on number of records in database, importing could take some time. Don't close this window while it is in progress." })
      ] }),
      actions: /* @__PURE__ */ jsxs("div", { className: "mt-10 border-t pt-14", children: [
        /* @__PURE__ */ jsxs(
          SelectForwardRef,
          {
            selectionMode: "single",
            label: /* @__PURE__ */ jsx(Trans, { message: "What to import?" }),
            selectedValue: selectedModel,
            onSelectionChange: (newValue) => {
              setSelectedModel(newValue);
            },
            children: [
              /* @__PURE__ */ jsx(Item, { value: "*", children: /* @__PURE__ */ jsx(Trans, { message: "Everything" }) }),
              data == null ? void 0 : data.models.map((item) => /* @__PURE__ */ jsx(Item, { value: item.model, children: /* @__PURE__ */ jsx(Trans, { message: item.name }) }, item.model))
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "flat",
            color: "primary",
            className: "mb-8 mt-24",
            disabled: importModels2.isPending,
            onClick: () => {
              importModels2.mutate({
                model: selectedModel,
                driver: getValues("server.scout_driver")
              });
            },
            children: /* @__PURE__ */ jsx(Trans, { message: "Import now" })
          }
        )
      ] })
    }
  );
}
function AutomationSettings() {
  return /* @__PURE__ */ jsxs(
    SettingsPanel,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Content automation" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Select and configure providers that will be used to automatically import artist, album, track and other content." }),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "border-b mb-20", children: [
          /* @__PURE__ */ jsx(
            FormSwitch,
            {
              className: "mb-24",
              name: "client.artist_provider",
              value: "spotify",
              description: /* @__PURE__ */ jsx(Trans, { message: "This will automatically import, and periodically update, all metadata available on spotify about the artist when user visits that artist's page." }),
              children: /* @__PURE__ */ jsx(Trans, { message: "Artist automation" })
            }
          ),
          /* @__PURE__ */ jsx(WikipediaFields, {})
        ] }),
        /* @__PURE__ */ jsx(
          FormSwitch,
          {
            className: "mb-24",
            name: "client.album_provider",
            value: "spotify",
            description: /* @__PURE__ */ jsx(Trans, { message: "This will automatically import, and periodically update, all metadata available on spotify about an when user visits that album's page." }),
            children: /* @__PURE__ */ jsx(Trans, { message: "Album automation" })
          }
        ),
        /* @__PURE__ */ jsxs(
          FormSelect,
          {
            className: "mb-24",
            name: "client.search_provider",
            selectionMode: "single",
            label: /* @__PURE__ */ jsx(Trans, { message: "Search method" }),
            description: /* @__PURE__ */ jsx(Trans, { message: "Which method should be used for user facing search in the web player." }),
            children: [
              /* @__PURE__ */ jsx(
                Item,
                {
                  value: "spotify",
                  description: /* @__PURE__ */ jsx(Trans, { message: "Search on the site will directly connect to, and search spotify. Any artist, album and track available on spotify will be discoverable via search, without needing to import or create it first." }),
                  children: /* @__PURE__ */ jsx(Trans, { message: "Spotify" })
                }
              ),
              /* @__PURE__ */ jsx(
                Item,
                {
                  value: "local",
                  description: /* @__PURE__ */ jsx(Trans, { message: "Will only search content that was created or imported from backstage or admin area. This can be further configured from 'Local search' settings page." }),
                  children: /* @__PURE__ */ jsx(Trans, { message: "Local" })
                }
              ),
              /* @__PURE__ */ jsx(
                Item,
                {
                  value: "localAndSpotify",
                  description: /* @__PURE__ */ jsx(Trans, { message: "Will combine search results from both 'local' and 'spotify' methods. If there are identical matches, local results will be preferred." }),
                  children: /* @__PURE__ */ jsx(Trans, { message: "Local and spotify" })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(SpotifyFields, {}),
        /* @__PURE__ */ jsx(
          FormSwitch,
          {
            className: "mb-24",
            name: "client.player.lyrics_automate",
            value: "spotify",
            description: /* @__PURE__ */ jsx(Trans, { message: "Try to automatically find and import lyrics based on song and artist name. Lyrics can still be added manually, if this is disabled." }),
            children: /* @__PURE__ */ jsx(Trans, { message: "Lyrics automation" })
          }
        )
      ]
    }
  );
}
function WikipediaFields() {
  const { watch } = useFormContext();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      FormSelect,
      {
        className: "mb-24",
        name: "client.artist_bio_provider",
        selectionMode: "single",
        label: /* @__PURE__ */ jsx(Trans, { message: "Artist biography provider" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Which method should be used for user facing search in the web player." }),
        children: [
          /* @__PURE__ */ jsx(
            Item,
            {
              value: "wikipedia",
              description: /* @__PURE__ */ jsx(Trans, { message: "Will import artist biography from wikipedia in the selected language." }),
              children: /* @__PURE__ */ jsx(Trans, { message: "Wikipedia" })
            }
          ),
          /* @__PURE__ */ jsx(
            Item,
            {
              value: "local",
              description: /* @__PURE__ */ jsx(Trans, { message: "Will only show artist biography that was manually added from admin area or backstage." }),
              children: /* @__PURE__ */ jsx(Trans, { message: "Local" })
            }
          )
        ]
      }
    ),
    watch("client.artist_bio_provider") === "wikipedia" && /* @__PURE__ */ jsx(
      FormTextField,
      {
        className: "mb-24",
        minLength: 2,
        maxLength: 2,
        name: "client.wikipedia_language",
        label: /* @__PURE__ */ jsx(Trans, { message: "Wikipedia language" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "ISO 639-1 (two letter) language code." })
      }
    )
  ] });
}
function SpotifyFields() {
  const { watch: w } = useFormContext();
  const shouldShow = [
    w("client.artist_provider"),
    w("client.album_provider"),
    w("client.search_provider")
  ].some((provider) => `${provider}`.toLowerCase().includes("spotify"));
  if (!shouldShow) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(SettingsErrorGroup, { name: "spotify_group", children: (isInvalid) => /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          invalid: isInvalid,
          name: "server.spotify_id",
          label: /* @__PURE__ */ jsx(Trans, { message: "Spotify ID" }),
          className: "mb-24",
          required: true
        }
      ),
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          invalid: isInvalid,
          name: "server.spotify_secret",
          label: /* @__PURE__ */ jsx(Trans, { message: "Spotify secret" }),
          required: true,
          description: /* @__PURE__ */ jsx(LearnMoreLink, { link: "https://support.vebto.com/help-center/articles/28/34/165/spotify-credentials" })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        className: "mb-24",
        name: "server.lastfm_api_key",
        label: /* @__PURE__ */ jsx(Trans, { message: "LastFM Api Key" }),
        description: /* @__PURE__ */ jsx(LearnMoreLink, { link: "https://support.vebto.com/help-center/articles/28/34/166/lastfm-credentials" })
      }
    )
  ] });
}
function ArtistPagePanel() {
  const { watch } = useFormContext();
  const tabs = watch("client.artistPage.tabs") || [];
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-14 text-sm", children: [
      /* @__PURE__ */ jsx(Trans, { message: "Artist page tabs" }),
      /* @__PURE__ */ jsx("div", { className: "text-xs text-muted", children: /* @__PURE__ */ jsx(Trans, { message: "Select which tabs should appear on artist page and in which order." }) })
    ] }),
    tabs.map((tab) => /* @__PURE__ */ jsx(Fragment, { children: getListItem(tab.id) }, tab.id)),
    /* @__PURE__ */ jsxs(
      FormSelect,
      {
        className: "my-24",
        name: "client.player.default_artist_view",
        selectionMode: "single",
        label: /* @__PURE__ */ jsx(Trans, { message: "Default albums layout" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "How should albums on main artist page be displayed by default." }),
        children: [
          /* @__PURE__ */ jsx(Item, { value: "list", children: /* @__PURE__ */ jsx(Trans, { message: "List" }) }),
          /* @__PURE__ */ jsx(Item, { value: "grid", children: /* @__PURE__ */ jsx(Trans, { message: "Grid" }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        name: "client.artistPage.showDescription",
        description: /* @__PURE__ */ jsx(Trans, { message: "Whether short artist biography be shown in main artist page header." }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Show description" })
      }
    )
  ] });
}
function getListItem(id) {
  switch (id) {
    case artistPageTabs.tracks:
      return /* @__PURE__ */ jsx(
        ArtistTabListItem,
        {
          id: artistPageTabs.tracks,
          title: /* @__PURE__ */ jsx(Trans, { message: "Tracks" }),
          description: /* @__PURE__ */ jsx(Trans, { message: "Show all artist tracks in a list view." })
        }
      );
    case artistPageTabs.albums:
      return /* @__PURE__ */ jsx(
        ArtistTabListItem,
        {
          id: artistPageTabs.albums,
          title: /* @__PURE__ */ jsx(Trans, { message: "Albums" }),
          description: /* @__PURE__ */ jsx(Trans, { message: "Show all artist albums in a list view." })
        }
      );
    case artistPageTabs.followers:
      return /* @__PURE__ */ jsx(
        ArtistTabListItem,
        {
          id: artistPageTabs.followers,
          title: /* @__PURE__ */ jsx(Trans, { message: "Followers" }),
          description: /* @__PURE__ */ jsx(Trans, { message: "Shows all users that are currently following an artist." })
        }
      );
    case artistPageTabs.similar:
      return /* @__PURE__ */ jsx(
        ArtistTabListItem,
        {
          id: artistPageTabs.similar,
          title: /* @__PURE__ */ jsx(Trans, { message: "Similar artists" }),
          description: /* @__PURE__ */ jsx(Trans, { message: "Shows similar artists." })
        }
      );
    case artistPageTabs.about:
      return /* @__PURE__ */ jsx(
        ArtistTabListItem,
        {
          id: artistPageTabs.about,
          title: /* @__PURE__ */ jsx(Trans, { message: "About" }),
          description: /* @__PURE__ */ jsx(Trans, { message: "Shows artist biography/description as well as extra images" })
        }
      );
    case artistPageTabs.discography:
      return /* @__PURE__ */ jsx(
        ArtistTabListItem,
        {
          id: artistPageTabs.discography,
          title: /* @__PURE__ */ jsx(Trans, { message: "Discography" }),
          description: /* @__PURE__ */ jsx(Trans, { message: "Shows all artist albums in grid or list view." })
        }
      );
  }
}
function ArtistTabListItem({ title, description, id }) {
  var _a2;
  const ref = useRef(null);
  const previewRef = useRef(null);
  const { watch, setValue } = useFormContext();
  const tabs = watch("client.artistPage.tabs") || [];
  const ids = tabs.map((tab) => tab.id);
  const isChecked = (_a2 = tabs.find((tab) => tab.id === id)) == null ? void 0 : _a2.active;
  const isFirst = ids[0] === id;
  const { sortableProps, dragHandleRef } = useSortable({
    ref,
    item: id,
    items: ids,
    type: "artistPageTabs",
    preview: previewRef,
    strategy: "line",
    onSortEnd: (oldIndex, newIndex) => {
      setValue(
        "client.artistPage.tabs",
        moveItemInNewArray(tabs, oldIndex, newIndex)
      );
    }
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: clsx(
          "flex w-full items-center gap-8 border-b py-6",
          isFirst && "border-t border-t-transparent"
        ),
        ref,
        ...sortableProps,
        children: [
          /* @__PURE__ */ jsx(IconButton, { ref: dragHandleRef, children: /* @__PURE__ */ jsx(DragHandleIcon, {}) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-auto", children: [
            /* @__PURE__ */ jsx("div", { className: "text-sm", children: title }),
            /* @__PURE__ */ jsx("div", { className: "text-xs", children: description })
          ] }),
          /* @__PURE__ */ jsx(
            Checkbox,
            {
              checked: isChecked,
              onChange: () => {
                const newTabs = tabs.map((tab) => {
                  if (tab.id === id) {
                    return { ...tab, active: !tab.active };
                  }
                  return tab;
                });
                setValue("client.artistPage.tabs", newTabs);
              }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(TabDragPreview, { title, ref: previewRef })
  ] });
}
const TabDragPreview = React.forwardRef(
  ({ title }, ref) => {
    return /* @__PURE__ */ jsx(DragPreview, { ref, children: () => /* @__PURE__ */ jsx("div", { className: "rounded bg-chip p-8 text-sm shadow", children: title }) });
  }
);
function PlayerSettings() {
  return /* @__PURE__ */ jsx(
    SettingsPanel,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Player" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Configure web player interface and functionality." }),
      children: /* @__PURE__ */ jsxs(Tabs, { isLazy: true, children: [
        /* @__PURE__ */ jsxs(TabList, { children: [
          /* @__PURE__ */ jsx(Tab, { children: /* @__PURE__ */ jsx(Trans, { message: "General" }) }),
          /* @__PURE__ */ jsx(Tab, { children: /* @__PURE__ */ jsx(Trans, { message: "Controls" }) }),
          /* @__PURE__ */ jsx(Tab, { children: /* @__PURE__ */ jsx(Trans, { message: "Artist page" }) })
        ] }),
        /* @__PURE__ */ jsxs(TabPanels, { className: "pt-20", children: [
          /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(GeneralPanel, {}) }),
          /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(ControlsPanel, {}) }),
          /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(ArtistPagePanel, {}) })
        ] })
      ] })
    }
  );
}
function GeneralPanel() {
  const { spotify_is_setup } = useSettings();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    spotify_is_setup && /* @__PURE__ */ jsxs(
      FormSelect,
      {
        className: "mb-24",
        name: "client.player.sort_method",
        selectionMode: "single",
        label: /* @__PURE__ */ jsx(Trans, { message: "Content popularity" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "When content is sorted by popularity (eg. In track table), should it be sorted based on how popular that content is on spotify or by number of plays on the site." }),
        children: [
          /* @__PURE__ */ jsx(Item, { value: "external", children: /* @__PURE__ */ jsx(Trans, { message: "Spotify popularity" }) }),
          /* @__PURE__ */ jsx(Item, { value: "local", children: /* @__PURE__ */ jsx(Trans, { message: "Local plays" }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      FormSelect,
      {
        className: "mb-24",
        name: "client.player.seekbar_type",
        selectionMode: "single",
        label: /* @__PURE__ */ jsx(Trans, { message: "Track seekbar type" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Waveform is generated when uploading audio or video file and will default to 'simple' for auto-imported tracks." }),
        children: [
          /* @__PURE__ */ jsx(Item, { value: "waveform", children: /* @__PURE__ */ jsx(Trans, { message: "Waveform" }) }),
          /* @__PURE__ */ jsx(Item, { value: "line", children: /* @__PURE__ */ jsx(Trans, { message: "Simple" }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        className: "mb-24",
        name: "client.player.hide_queue",
        description: /* @__PURE__ */ jsx(Trans, { message: "Whether player queue (right sidebar) should be shown by default. It can still be toggled via queue button, even if this is disabled." }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Hide queue sidebar" })
      }
    ),
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        className: "mb-24",
        name: "client.player.hide_radio_button",
        description: /* @__PURE__ */ jsx(Trans, { message: "Whether 'Go to radio' buttons should be shown." }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Hide radio buttons" })
      }
    ),
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        className: "mb-24",
        name: "client.player.enable_repost",
        description: /* @__PURE__ */ jsx(Trans, { message: "Enable reposting functionality for albums and tracks." }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Enable reposts" })
      }
    ),
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        className: "mb-24",
        name: "client.player.track_comments",
        description: /* @__PURE__ */ jsx(Trans, { message: "Enable commenting functionality for albums and tracks." }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Enable commenting" })
      }
    ),
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        className: "mb-24",
        name: "client.player.show_upload_btn",
        description: /* @__PURE__ */ jsx(Trans, { message: "Whether upload button should be shown in left sidebar (if user has permissions to upload tracks)." }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Upload button" })
      }
    ),
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        className: "mb-24",
        name: "client.player.show_become_artist_btn",
        description: /* @__PURE__ */ jsx(Trans, { message: "Whether become artist menu item should be shown (if user is not yet an artist)." }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Become artist menu item" })
      }
    ),
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        name: "client.uploads.autoMatch",
        description: /* @__PURE__ */ jsx(Trans, { message: "When uploading audio or video file, this will autofill track and album form with existing album and artist based on file metadata, or create a new album and artist if they do not yet exist." }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Metadata matching" })
      }
    )
  ] });
}
function ControlsPanel() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        className: "mb-24",
        name: "client.player.default_volume",
        label: /* @__PURE__ */ jsx(Trans, { message: "Default player volume" }),
        type: "number",
        min: 1,
        max: 100
      }
    ),
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        className: "mb-24",
        name: "client.player.hide_lyrics",
        description: /* @__PURE__ */ jsx(Trans, { message: "Whether lyrics button should be shown in player controls." }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Hide lyrics button" })
      }
    ),
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        className: "mb-24",
        name: "client.player.enable_download",
        description: /* @__PURE__ */ jsx(Trans, { message: "Whether download track button should be shown in player controls. It will only appear if track has an audio or video file uploaded." }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Download button" })
      }
    ),
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        className: "mb-24",
        name: "client.player.hide_video_button",
        description: /* @__PURE__ */ jsx(Trans, { message: "Whether toggle video button should be shown in player controls." }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Hide video button" })
      }
    ),
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        className: "mb-24",
        name: "client.player.hide_video",
        description: /* @__PURE__ */ jsx(Trans, { message: "Should small video in the bottom right corner be hidden by default. Note that this might cause issues with background playback for youtube embed, especially on mobile." }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Hide video" })
      }
    ),
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        name: "client.player.mobile.auto_open_overlay",
        description: /* @__PURE__ */ jsx(Trans, { message: "Should fullscreen video overlay be opened automatically on mobile when user starts playback. This will only apply when streaming from youtube." }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Automatically open overlay on mobile" })
      }
    )
  ] });
}
const AppSettingsRoutes = [
  {
    path: "search",
    element: /* @__PURE__ */ jsx(SearchSettings, {})
  },
  {
    path: "providers",
    element: /* @__PURE__ */ jsx(AutomationSettings, {})
  },
  {
    path: "player",
    element: /* @__PURE__ */ jsx(PlayerSettings, {})
  }
];
function JsonChipField({ children, ...props }) {
  const {
    field: { onChange, onBlur, value = [], ref },
    fieldState: { invalid, error }
  } = useController({
    name: props.name
  });
  const arrayValue = useMemo(() => {
    const mixedValue = value;
    return typeof mixedValue === "string" ? JSON.parse(mixedValue) : mixedValue;
  }, [value]);
  const formProps = {
    onChange: (newValue) => {
      const jsonValue = JSON.stringify(newValue.map((chip) => chip.name));
      onChange(jsonValue);
    },
    onBlur,
    value: arrayValue,
    invalid,
    errorMessage: error == null ? void 0 : error.message
  };
  return /* @__PURE__ */ jsx(ChipField, { ref, ...mergeProps(formProps, props) });
}
function SubscriptionSettings() {
  const { trans } = useTrans();
  return /* @__PURE__ */ jsx(
    SettingsPanel,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Subscriptions" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Configure gateway integration, accepted cards, invoices and other related settings." }),
      children: /* @__PURE__ */ jsxs(Tabs, { children: [
        /* @__PURE__ */ jsxs(TabList, { children: [
          /* @__PURE__ */ jsx(Tab, { children: /* @__PURE__ */ jsx(Trans, { message: "General" }) }),
          /* @__PURE__ */ jsx(Tab, { children: /* @__PURE__ */ jsx(Trans, { message: "Invoices" }) })
        ] }),
        /* @__PURE__ */ jsxs(TabPanels, { className: "pt-30", children: [
          /* @__PURE__ */ jsxs(TabPanel, { children: [
            /* @__PURE__ */ jsx(
              FormSwitch,
              {
                name: "client.billing.enable",
                description: /* @__PURE__ */ jsx(Trans, { message: "Enable or disable all subscription related functionality across the site." }),
                children: /* @__PURE__ */ jsx(Trans, { message: "Enable subscriptions" })
              }
            ),
            /* @__PURE__ */ jsx(SettingsSeparator, {}),
            /* @__PURE__ */ jsx(PaypalSection, {}),
            /* @__PURE__ */ jsx(StripeSection, {}),
            /* @__PURE__ */ jsx(SettingsSeparator, {}),
            /* @__PURE__ */ jsx(
              JsonChipField,
              {
                label: /* @__PURE__ */ jsx(Trans, { message: "Accepted cards" }),
                name: "client.billing.accepted_cards",
                placeholder: trans({ message: "Add new card..." })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(TabPanel, { children: [
            /* @__PURE__ */ jsx(
              FormTextField,
              {
                inputElementType: "textarea",
                rows: 5,
                label: /* @__PURE__ */ jsx(Trans, { message: "Invoice address" }),
                name: "client.billing.invoice.address",
                className: "mb-30"
              }
            ),
            /* @__PURE__ */ jsx(
              FormTextField,
              {
                inputElementType: "textarea",
                rows: 5,
                label: /* @__PURE__ */ jsx(Trans, { message: "Invoice notes" }),
                description: /* @__PURE__ */ jsx(Trans, { message: "Default notes to show under `notes` section of user invoice. Optional." }),
                name: "client.billing.invoice.notes"
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
function PaypalSection() {
  const { watch } = useFormContext();
  const paypalIsEnabled = watch("client.billing.paypal.enable");
  return /* @__PURE__ */ jsxs("div", { className: "mb-30", children: [
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        name: "client.billing.paypal.enable",
        description: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Trans, { message: "Enable PayPal payment gateway integration." }),
          /* @__PURE__ */ jsx(
            LearnMoreLink,
            {
              className: "mt-6",
              link: "https://support.vebto.com/help-center/articles/147/configuring-paypal"
            }
          )
        ] }),
        children: /* @__PURE__ */ jsx(Trans, { message: "PayPal gateway" })
      }
    ),
    paypalIsEnabled ? /* @__PURE__ */ jsx(SettingsErrorGroup, { name: "paypal_group", children: (isInvalid) => /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          name: "server.paypal_client_id",
          label: /* @__PURE__ */ jsx(Trans, { message: "PayPal Client ID" }),
          required: true,
          invalid: isInvalid,
          className: "mb-20"
        }
      ),
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          name: "server.paypal_secret",
          label: /* @__PURE__ */ jsx(Trans, { message: "PayPal Secret" }),
          required: true,
          invalid: isInvalid,
          className: "mb-20"
        }
      ),
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          name: "server.paypal_webhook_id",
          label: /* @__PURE__ */ jsx(Trans, { message: "PayPal Webhook ID" }),
          required: true,
          invalid: isInvalid,
          className: "mb-20"
        }
      ),
      /* @__PURE__ */ jsx(
        FormSwitch,
        {
          name: "client.billing.paypal_test_mode",
          invalid: isInvalid,
          description: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Trans, { message: "Allows testing PayPal payments with sandbox accounts." }) }),
          children: /* @__PURE__ */ jsx(Trans, { message: "PayPal test mode" })
        }
      )
    ] }) }) : null
  ] });
}
function StripeSection() {
  const { watch } = useFormContext();
  const stripeEnabled = watch("client.billing.stripe.enable");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        name: "client.billing.stripe.enable",
        description: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Trans, { message: "Enable Stripe payment gateway integration." }),
          /* @__PURE__ */ jsx(
            LearnMoreLink,
            {
              className: "mt-6",
              link: "https://support.vebto.com/help-center/articles/148/configuring-stripe"
            }
          )
        ] }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Stripe gateway" })
      }
    ),
    stripeEnabled ? /* @__PURE__ */ jsx(SettingsErrorGroup, { name: "stripe_group", separatorBottom: false, children: (isInvalid) => /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          name: "server.stripe_key",
          label: /* @__PURE__ */ jsx(Trans, { message: "Stripe publishable key" }),
          required: true,
          className: "mb-20",
          invalid: isInvalid
        }
      ),
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          name: "server.stripe_secret",
          label: /* @__PURE__ */ jsx(Trans, { message: "Stripe secret key" }),
          required: true,
          className: "mb-20",
          invalid: isInvalid
        }
      ),
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          name: "server.stripe_webhook_secret",
          label: /* @__PURE__ */ jsx(Trans, { message: "Stripe webhook signing secret" }),
          className: "mb-20",
          invalid: isInvalid
        }
      )
    ] }) }) : null
  ] });
}
function LocalizationSettings() {
  const { data } = useValueLists(["timezones", "localizations"]);
  const today = useCurrentDateTime();
  const { trans } = useTrans();
  return /* @__PURE__ */ jsxs(
    SettingsPanel,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Localization" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Configure global date, time and language settings." }),
      children: [
        /* @__PURE__ */ jsxs(
          FormSelect,
          {
            className: "mb-30",
            required: true,
            name: "client.dates.default_timezone",
            showSearchField: true,
            selectionMode: "single",
            label: /* @__PURE__ */ jsx(Trans, { message: "Default timezone" }),
            searchPlaceholder: trans(message("Search timezones")),
            description: /* @__PURE__ */ jsx(Trans, { message: "Which timezone should be selected by default for new users and guests." }),
            children: [
              /* @__PURE__ */ jsx(Item, { value: "auto", children: /* @__PURE__ */ jsx(Trans, { message: "Auto" }) }, "auto"),
              Object.entries((data == null ? void 0 : data.timezones) || {}).map(([groupName, timezones]) => /* @__PURE__ */ jsx(Section, { label: groupName, children: timezones.map((timezone) => /* @__PURE__ */ jsx(Item, { value: timezone.value, children: timezone.text }, timezone.value)) }, groupName))
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          FormSelect,
          {
            name: "client.locale.default",
            className: "mb-30",
            selectionMode: "single",
            label: /* @__PURE__ */ jsx(Trans, { message: "Default language" }),
            description: /* @__PURE__ */ jsx(Trans, { message: "Which localization should be selected by default for new users and guests." }),
            children: [
              /* @__PURE__ */ jsx(Item, { value: "auto", children: /* @__PURE__ */ jsx(Trans, { message: "Auto" }) }, "auto"),
              ((data == null ? void 0 : data.localizations) || []).map((locale) => /* @__PURE__ */ jsx(Item, { value: locale.language, capitalizeFirst: true, children: locale.name }, locale.language))
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          FormRadioGroup,
          {
            required: true,
            className: "mb-30",
            size: "sm",
            name: "client.dates.format",
            orientation: "vertical",
            label: /* @__PURE__ */ jsx(Trans, { message: "Date verbosity" }),
            description: /* @__PURE__ */ jsx(Trans, { message: "Default verbosity for all dates displayed across the site. Month/day order and separators will be adjusted automatically, based on user's locale." }),
            children: [
              /* @__PURE__ */ jsx(FormRadio, { value: "auto", children: /* @__PURE__ */ jsx(Trans, { message: "Auto" }) }, "auto"),
              Object.entries(DateFormatPresets).map(([format, options]) => /* @__PURE__ */ jsx(FormRadio, { value: format, children: /* @__PURE__ */ jsx(FormattedDate, { date: today, options }) }, format))
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          FormSwitch,
          {
            name: "client.i18n.enable",
            description: /* @__PURE__ */ jsx(Trans, { message: "If disabled, site will always be shown in default language and user will not be able to change their locale." }),
            children: /* @__PURE__ */ jsx(Trans, { message: "Enable translations" })
          }
        )
      ]
    }
  );
}
function AuthenticationSettings() {
  return /* @__PURE__ */ jsxs(
    SettingsPanel,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Authentication" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Configure registration, social login and related 3rd party integrations." }),
      children: [
        /* @__PURE__ */ jsx(EmailConfirmationSection, {}),
        /* @__PURE__ */ jsx(
          FormSwitch,
          {
            className: "mb-24",
            name: "client.registration.disable",
            description: /* @__PURE__ */ jsx(Trans, { message: "All registration related functionality (including social login) will be disabled." }),
            children: /* @__PURE__ */ jsx(Trans, { message: "Disable registration" })
          }
        ),
        /* @__PURE__ */ jsx(
          FormSwitch,
          {
            className: "mb-24",
            name: "client.single_device_login",
            description: /* @__PURE__ */ jsx(Trans, { message: "Only allow one device to be logged into user account at the same time." }),
            children: /* @__PURE__ */ jsx(Trans, { message: "Single device login" })
          }
        ),
        /* @__PURE__ */ jsx(
          FormSwitch,
          {
            name: "client.social.compact_buttons",
            description: /* @__PURE__ */ jsx(Trans, { message: "Use compact design for social login buttons." }),
            children: /* @__PURE__ */ jsx(Trans, { message: "Compact buttons" })
          }
        ),
        /* @__PURE__ */ jsx(EnvatoSection, {}),
        /* @__PURE__ */ jsx(GoogleSection, {}),
        /* @__PURE__ */ jsx(FacebookSection, {}),
        /* @__PURE__ */ jsx(TwitterSection, {}),
        /* @__PURE__ */ jsx(SettingsSeparator, {}),
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            inputElementType: "textarea",
            rows: 3,
            className: "mt-24",
            name: "client.auth.domain_blacklist",
            label: /* @__PURE__ */ jsx(Trans, { message: "Domain blacklist" }),
            description: /* @__PURE__ */ jsx(Trans, { message: "Comma separated list of domains. Users will not be able to register or login using any email adress from specified domains." })
          }
        )
      ]
    }
  );
}
function MailNotSetupWarning() {
  const { watch } = useFormContext();
  const mailSetup = watch("server.mail_setup");
  if (mailSetup)
    return null;
  return /* @__PURE__ */ jsx("p", { className: "mt-10 rounded-panel border p-10 text-sm text-danger", children: /* @__PURE__ */ jsx(
    Trans,
    {
      message: "Outgoing mail method needs to be setup before enabling this setting. <a>Fix now</a>",
      values: {
        a: (text) => /* @__PURE__ */ jsx(
          Button,
          {
            elementType: Link,
            variant: "outline",
            size: "xs",
            display: "flex",
            className: "mt-10 max-w-max",
            to: "/admin/settings/outgoing-email",
            children: text
          }
        )
      }
    }
  ) });
}
function EmailConfirmationSection() {
  return /* @__PURE__ */ jsx(
    FormSwitch,
    {
      className: "mb-30",
      name: "client.require_email_confirmation",
      description: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Trans, { message: "Require newly registered users to validate their email address before being able to login." }),
        /* @__PURE__ */ jsx(MailNotSetupWarning, {})
      ] }),
      children: /* @__PURE__ */ jsx(Trans, { message: "Require email confirmation" })
    }
  );
}
function EnvatoSection() {
  var _a2;
  const { watch } = useFormContext();
  const settings = useSettings();
  const envatoLoginEnabled = watch("client.social.envato.enable");
  if (!((_a2 = settings.envato) == null ? void 0 : _a2.enable))
    return null;
  return /* @__PURE__ */ jsx(SettingsErrorGroup, { separatorBottom: false, name: "envato_group", children: (isInvalid) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        invalid: isInvalid,
        name: "client.social.envato.enable",
        description: /* @__PURE__ */ jsx(Trans, { message: "Enable logging into the site via envato." }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Envato login" })
      }
    ),
    !!envatoLoginEnabled && /* @__PURE__ */ jsxs(Fragment$1, { children: [
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          invalid: isInvalid,
          className: "mt-30",
          name: "server.envato_id",
          label: /* @__PURE__ */ jsx(Trans, { message: "Envato ID" }),
          required: true
        }
      ),
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          invalid: isInvalid,
          className: "mt-30",
          name: "server.envato_secret",
          label: /* @__PURE__ */ jsx(Trans, { message: "Envato secret" }),
          required: true
        }
      ),
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          invalid: isInvalid,
          className: "mt-30",
          name: "server.envato_personal_token",
          label: /* @__PURE__ */ jsx(Trans, { message: "Envato personal token" }),
          required: true
        }
      )
    ] })
  ] }) });
}
function GoogleSection() {
  const { watch } = useFormContext();
  const googleLoginEnabled = watch("client.social.google.enable");
  return /* @__PURE__ */ jsx(SettingsErrorGroup, { name: "google_group", children: (isInvalid) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        invalid: isInvalid,
        name: "client.social.google.enable",
        description: /* @__PURE__ */ jsx(Trans, { message: "Enable logging into the site via google." }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Google login" })
      }
    ),
    !!googleLoginEnabled && /* @__PURE__ */ jsxs(Fragment$1, { children: [
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          invalid: isInvalid,
          className: "mt-30",
          name: "server.google_id",
          label: /* @__PURE__ */ jsx(Trans, { message: "Google client ID" }),
          required: true
        }
      ),
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          className: "mt-30",
          name: "server.google_secret",
          label: /* @__PURE__ */ jsx(Trans, { message: "Google client secret" }),
          required: true
        }
      )
    ] })
  ] }) });
}
function FacebookSection() {
  const { watch } = useFormContext();
  const facebookLoginEnabled = watch("client.social.facebook.enable");
  return /* @__PURE__ */ jsx(SettingsErrorGroup, { name: "facebook_group", separatorTop: false, children: (isInvalid) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        invalid: isInvalid,
        name: "client.social.facebook.enable",
        description: /* @__PURE__ */ jsx(Trans, { message: "Enable logging into the site via facebook." }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Facebook login" })
      }
    ),
    !!facebookLoginEnabled && /* @__PURE__ */ jsxs(Fragment$1, { children: [
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          invalid: isInvalid,
          className: "mt-30",
          name: "server.facebook_id",
          label: /* @__PURE__ */ jsx(Trans, { message: "Facebook app ID" }),
          required: true
        }
      ),
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          invalid: isInvalid,
          className: "mt-30",
          name: "server.facebook_secret",
          label: /* @__PURE__ */ jsx(Trans, { message: "Facebook app secret" }),
          required: true
        }
      )
    ] })
  ] }) });
}
function TwitterSection() {
  const { watch } = useFormContext();
  const twitterLoginEnabled = watch("client.social.twitter.enable");
  return /* @__PURE__ */ jsx(
    SettingsErrorGroup,
    {
      name: "twitter_group",
      separatorTop: false,
      separatorBottom: false,
      children: (isInvalid) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
        /* @__PURE__ */ jsx(
          FormSwitch,
          {
            invalid: isInvalid,
            name: "client.social.twitter.enable",
            description: /* @__PURE__ */ jsx(Trans, { message: "Enable logging into the site via twitter." }),
            children: /* @__PURE__ */ jsx(Trans, { message: "Twitter login" })
          }
        ),
        !!twitterLoginEnabled && /* @__PURE__ */ jsxs(Fragment$1, { children: [
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              invalid: isInvalid,
              className: "mt-30",
              name: "server.twitter_id",
              label: /* @__PURE__ */ jsx(Trans, { message: "Twitter ID" }),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              invalid: isInvalid,
              className: "mt-30",
              name: "server.twitter_secret",
              label: /* @__PURE__ */ jsx(Trans, { message: "Twitter secret" }),
              required: true
            }
          )
        ] })
      ] })
    }
  );
}
function fetchMaxServerUploadSize() {
  return apiClient.get("uploads/server-max-file-size").then((response) => response.data);
}
function useMaxServerUploadSize() {
  return useQuery({
    queryKey: ["MaxServerUploadSize"],
    queryFn: () => fetchMaxServerUploadSize()
  });
}
const spaceUnits = ["B", "KB", "MB", "GB", "TB", "PB"];
function convertToBytes(value, unit) {
  if (value == null)
    return 0;
  switch (unit) {
    case "KB":
      return value * 1024;
    case "MB":
      return value * 1024 ** 2;
    case "GB":
      return value * 1024 ** 3;
    case "TB":
      return value * 1024 ** 4;
    case "PB":
      return value * 1024 ** 5;
    default:
      return value;
  }
}
const MaxValue = 108851651149824;
const FormFileSizeField = React.forwardRef(({ name, ...props }, ref) => {
  const {
    field: {
      onChange: setByteValue,
      onBlur,
      value: byteValue = "",
      ref: inputRef
    },
    fieldState: { invalid, error }
  } = useController({
    name
  });
  const [liveValue, setLiveValue] = useState("");
  const [unit, setUnit] = useState("MB");
  useEffect(() => {
    if (byteValue == null || byteValue === "") {
      setLiveValue("");
      return;
    }
    const { amount, unit: newUnit } = fromBytes({
      bytes: Math.min(byteValue, MaxValue)
    });
    setUnit(newUnit || "MB");
    setLiveValue(Number.isNaN(amount) ? "" : amount);
  }, [byteValue, unit]);
  const formProps = {
    onChange: (e) => {
      const value = parseInt(e.target.value);
      if (Number.isNaN(value)) {
        setByteValue(value);
      } else {
        const newBytes = convertToBytes(
          parseInt(e.target.value),
          unit
        );
        setByteValue(newBytes);
      }
    },
    onBlur,
    value: liveValue,
    invalid,
    errorMessage: error == null ? void 0 : error.message,
    inputRef
  };
  const unitSelect = /* @__PURE__ */ jsx(
    SelectForwardRef,
    {
      minWidth: "min-w-80",
      selectionMode: "single",
      selectedValue: unit,
      disabled: !byteValue,
      onSelectionChange: (newUnit) => {
        const newBytes = convertToBytes(
          liveValue || 0,
          newUnit
        );
        setByteValue(newBytes);
      },
      children: spaceUnits.slice(0, 5).map((u) => /* @__PURE__ */ jsx(Item, { value: u, children: u === "B" ? "Bytes" : u }, u))
    }
  );
  return /* @__PURE__ */ jsx(
    TextField,
    {
      ...mergeProps(formProps, props),
      type: "number",
      ref,
      endAppend: unitSelect
    }
  );
});
const fromBytes = memoize(
  ({ bytes }) => {
    const pretty = prettyBytes(bytes);
    if (!pretty)
      return { amount: "", unit: "MB" };
    let amount = parseInt(pretty.split(" ")[0]);
    amount = Math.round(amount);
    return { amount, unit: pretty.split(" ")[1] };
  }
);
function useUploadS3Cors() {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: () => uploadCors(),
    onSuccess: () => {
      toast(trans(message("CORS file updated")));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function uploadCors() {
  return apiClient.post("s3/cors/upload").then((r) => r.data);
}
function useGenerateDropboxRefreshToken() {
  return useMutation({
    mutationFn: (props) => generateToken(props),
    onError: (err) => showHttpErrorToast(err)
  });
}
function generateToken(payload) {
  return apiClient.post("settings/uploading/dropbox-refresh-token", payload).then((r) => r.data);
}
function DropboxForm({ isInvalid }) {
  const { watch, setValue } = useFormContext();
  const appKey = watch("server.storage_dropbox_app_key");
  const appSecret = watch("server.storage_dropbox_app_secret");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-20",
        name: "server.storage_dropbox_app_key",
        label: /* @__PURE__ */ jsx(Trans, { message: "Dropbox application key" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-20",
        name: "server.storage_dropbox_app_secret",
        label: /* @__PURE__ */ jsx(Trans, { message: "Dropbox application secret" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-20",
        name: "server.storage_dropbox_refresh_token",
        label: /* @__PURE__ */ jsx(Trans, { message: "Dropbox refresh token" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsxs(
      DialogTrigger,
      {
        type: "modal",
        onClose: (refreshToken) => {
          if (refreshToken) {
            setValue("server.storage_dropbox_refresh_token", refreshToken);
          }
        },
        children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              color: "primary",
              size: "xs",
              disabled: !appKey || !appSecret,
              children: /* @__PURE__ */ jsx(Trans, { message: "Get dropbox refresh token" })
            }
          ),
          /* @__PURE__ */ jsx(DropboxRefreshTokenDialog, { appKey, appSecret })
        ]
      }
    )
  ] });
}
function DropboxRefreshTokenDialog({
  appKey,
  appSecret
}) {
  const form = useForm();
  const { formId, close } = useDialogContext();
  const generateRefreshToken = useGenerateDropboxRefreshToken();
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Connected dropbox account" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsxs(
      Form$1,
      {
        id: formId,
        form,
        onSubmit: (data) => {
          generateRefreshToken.mutate(
            {
              app_key: appKey,
              app_secret: appSecret,
              access_code: data.accessCode
            },
            {
              onSuccess: (response) => {
                close(response.refreshToken);
              }
            }
          );
        },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-20 pb-20 border-b", children: [
            /* @__PURE__ */ jsx("div", { className: "text-muted text-sm mb-10", children: /* @__PURE__ */ jsx(Trans, { message: "Click the 'get access code' button to get dropbox access code, then paste it into the field below." }) }),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                color: "primary",
                size: "xs",
                elementType: "a",
                target: "_blank",
                href: `https://www.dropbox.com/oauth2/authorize?client_id=${appKey}&token_access_type=offline&response_type=code`,
                children: /* @__PURE__ */ jsx(Trans, { message: "Get access code" })
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              name: "accessCode",
              label: /* @__PURE__ */ jsx(Trans, { message: "Dropbox access code" }),
              required: true
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: () => {
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
          form: formId,
          type: "submit",
          disabled: !appKey || !appSecret || generateRefreshToken.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Connect" })
        }
      )
    ] })
  ] });
}
function UploadingSettings() {
  const { trans } = useTrans();
  return /* @__PURE__ */ jsxs(
    SettingsPanel,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Uploading" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Configure size and type of files that users are able to upload. This will affect all uploads across the site." }),
      children: [
        /* @__PURE__ */ jsx(PrivateUploadSection, {}),
        /* @__PURE__ */ jsx(PublicUploadSection, {}),
        /* @__PURE__ */ jsx(CredentialsSection, {}),
        /* @__PURE__ */ jsx(SettingsErrorGroup, { name: "static_delivery_group", children: (isInvalid) => /* @__PURE__ */ jsxs(
          FormRadioGroup,
          {
            invalid: isInvalid,
            size: "sm",
            name: "server.static_file_delivery",
            orientation: "vertical",
            label: /* @__PURE__ */ jsx(Trans, { message: "File delivery optimization" }),
            description: /* @__PURE__ */ jsx(Trans, { message: "Both X-Sendfile and X-Accel need to be enabled on the server first. When enabled, it will reduce server memory and CPU usage when previewing or downloading files, especially for large files." }),
            children: [
              /* @__PURE__ */ jsx(FormRadio, { value: "", children: /* @__PURE__ */ jsx(Trans, { message: "None" }) }),
              /* @__PURE__ */ jsx(FormRadio, { value: "xsendfile", children: /* @__PURE__ */ jsx(Trans, { message: "X-Sendfile (Apache)" }) }),
              /* @__PURE__ */ jsx(FormRadio, { value: "xaccel", children: /* @__PURE__ */ jsx(Trans, { message: "X-Accel (Nginx)" }) })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(
          FormFileSizeField,
          {
            className: "mb-30",
            name: "client.uploads.chunk_size",
            min: 1,
            label: /* @__PURE__ */ jsx(Trans, { message: "Chunk size" }),
            placeholder: "Infinity",
            description: /* @__PURE__ */ jsx(Trans, { message: "Size (in bytes) for each file chunk. It should only be changed if there is a maximum upload size on your server or proxy (for example cloudflare). If chunk size is larger then limit on the server, uploads will fail." })
          }
        ),
        /* @__PURE__ */ jsx(MaxUploadSizeSection, {}),
        /* @__PURE__ */ jsx(SettingsSeparator, {}),
        /* @__PURE__ */ jsx(
          FormFileSizeField,
          {
            min: 1,
            name: "client.uploads.max_size",
            className: "mb-30",
            label: /* @__PURE__ */ jsx(Trans, { message: "Maximum file size" }),
            description: /* @__PURE__ */ jsx(Trans, { message: "Maximum size (in bytes) for a single file user can upload." })
          }
        ),
        /* @__PURE__ */ jsx(
          FormFileSizeField,
          {
            min: 1,
            name: "client.uploads.available_space",
            className: "mb-30",
            label: /* @__PURE__ */ jsx(Trans, { message: "Available space" }),
            description: /* @__PURE__ */ jsx(Trans, { message: "Disk space (in bytes) each user uploads are allowed to take up. This can be overridden per user." })
          }
        ),
        /* @__PURE__ */ jsx(
          JsonChipField,
          {
            name: "client.uploads.allowed_extensions",
            className: "mb-30",
            label: /* @__PURE__ */ jsx(Trans, { message: "Allowed extensions" }),
            placeholder: trans(message("Add extension...")),
            description: /* @__PURE__ */ jsx(Trans, { message: "List of allowed file types (jpg, mp3, pdf etc.). Leave empty to allow all file types." })
          }
        ),
        /* @__PURE__ */ jsx(
          JsonChipField,
          {
            name: "client.uploads.blocked_extensions",
            label: /* @__PURE__ */ jsx(Trans, { message: "Blocked extensions" }),
            placeholder: trans(message("Add extension...")),
            description: /* @__PURE__ */ jsx(Trans, { message: "Prevent uploading of these file types, even if they are allowed above." })
          }
        )
      ]
    }
  );
}
function MaxUploadSizeSection() {
  const { data } = useMaxServerUploadSize();
  return /* @__PURE__ */ jsx(
    SectionHelper,
    {
      color: "warning",
      description: /* @__PURE__ */ jsx(
        Trans,
        {
          message: "Maximum upload size on your server currently is set to <b>:size</b>",
          values: { size: data == null ? void 0 : data.maxSize, b: (chunks) => /* @__PURE__ */ jsx("b", { children: chunks }) }
        }
      )
    }
  );
}
function PrivateUploadSection() {
  const { watch, clearErrors } = useFormContext();
  const isEnabled = watch("server.uploads_disk_driver");
  if (!isEnabled)
    return null;
  return /* @__PURE__ */ jsxs(
    FormSelect,
    {
      className: "mb-30",
      selectionMode: "single",
      name: "server.uploads_disk_driver",
      label: /* @__PURE__ */ jsx(Trans, { message: "User Uploads Storage Method" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Where should user private file uploads be stored." }),
      onSelectionChange: () => {
        clearErrors();
      },
      children: [
        /* @__PURE__ */ jsx(Item, { value: "local", children: /* @__PURE__ */ jsx(Trans, { message: "Local Disk (Default)" }) }),
        /* @__PURE__ */ jsx(Item, { value: "ftp", children: "FTP" }),
        /* @__PURE__ */ jsx(Item, { value: "digitalocean_s3", children: "DigitalOcean Spaces" }),
        /* @__PURE__ */ jsx(Item, { value: "backblaze_s3", children: "Backblaze" }),
        /* @__PURE__ */ jsx(Item, { value: "s3", children: "Amazon S3 (Or compatible service)" }),
        /* @__PURE__ */ jsx(Item, { value: "dropbox", children: "Dropbox" }),
        /* @__PURE__ */ jsx(Item, { value: "rackspace", children: "Rackspace" })
      ]
    }
  );
}
function PublicUploadSection() {
  const { watch, clearErrors } = useFormContext();
  const isEnabled = watch("server.public_disk_driver");
  if (!isEnabled)
    return null;
  return /* @__PURE__ */ jsxs(
    FormSelect,
    {
      label: /* @__PURE__ */ jsx(Trans, { message: "Public Uploads Storage Method" }),
      selectionMode: "single",
      name: "server.public_disk_driver",
      description: /* @__PURE__ */ jsx(Trans, { message: "Where should user public uploads (like avatars) be stored." }),
      onSelectionChange: () => {
        clearErrors();
      },
      children: [
        /* @__PURE__ */ jsx(Item, { value: "local", children: /* @__PURE__ */ jsx(Trans, { message: "Local Disk (Default)" }) }),
        /* @__PURE__ */ jsx(Item, { value: "s3", children: "Amazon S3" }),
        /* @__PURE__ */ jsx(Item, { value: "ftp", children: "FTP" }),
        /* @__PURE__ */ jsx(Item, { value: "digitalocean_s3", children: "DigitalOcean Spaces" }),
        /* @__PURE__ */ jsx(Item, { value: "backblaze_s3", children: "Backblaze" })
      ]
    }
  );
}
function CredentialsSection() {
  const { watch } = useFormContext();
  const drives = [
    watch("server.uploads_disk_driver"),
    watch("server.public_disk_driver")
  ];
  if (drives[0] === "local" && drives[1] === "local") {
    return null;
  }
  return /* @__PURE__ */ jsx(SettingsErrorGroup, { separatorBottom: false, name: "storage_group", children: (isInvalid) => {
    if (drives.includes("s3")) {
      return /* @__PURE__ */ jsx(S3Form, { isInvalid });
    }
    if (drives.includes("ftp")) {
      return /* @__PURE__ */ jsx(FtpForm, { isInvalid });
    }
    if (drives.includes("dropbox")) {
      return /* @__PURE__ */ jsx(DropboxForm, { isInvalid });
    }
    if (drives.includes("digitalocean_s3")) {
      return /* @__PURE__ */ jsx(DigitalOceanForm, { isInvalid });
    }
    if (drives.includes("backblaze_s3")) {
      return /* @__PURE__ */ jsx(BackblazeForm, { isInvalid });
    }
  } });
}
function S3Form({ isInvalid }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.storage_s3_key",
        label: /* @__PURE__ */ jsx(Trans, { message: "Amazon S3 key" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.storage_s3_secret",
        label: /* @__PURE__ */ jsx(Trans, { message: "Amazon S3 secret" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.storage_s3_region",
        label: /* @__PURE__ */ jsx(Trans, { message: "Amazon S3 region" }),
        pattern: "[a-z1-9\\-]+",
        placeholder: "us-east-1"
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.storage_s3_bucket",
        label: /* @__PURE__ */ jsx(Trans, { message: "Amazon S3 bucket" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        name: "server.storage_s3_endpoint",
        label: /* @__PURE__ */ jsx(Trans, { message: "Amazon S3 endpoint" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Only change endpoint if you are using another S3 compatible storage service." })
      }
    ),
    /* @__PURE__ */ jsx(S3DirectUploadField, { invalid: isInvalid })
  ] });
}
function DigitalOceanForm({ isInvalid }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.storage_digitalocean_key",
        label: /* @__PURE__ */ jsx(Trans, { message: "DigitalOcean key" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.storage_digitalocean_secret",
        label: /* @__PURE__ */ jsx(Trans, { message: "DigitalOcean secret" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.storage_digitalocean_region",
        label: /* @__PURE__ */ jsx(Trans, { message: "DigitalOcean region" }),
        pattern: "[a-z0-9\\-]+",
        placeholder: "us-east-1",
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.storage_digitalocean_bucket",
        label: /* @__PURE__ */ jsx(Trans, { message: "DigitalOcean bucket" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(S3DirectUploadField, { invalid: isInvalid })
  ] });
}
function BackblazeForm({ isInvalid }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.storage_backblaze_key",
        label: /* @__PURE__ */ jsx(Trans, { message: "Backblaze KeyID" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.storage_backblaze_secret",
        label: /* @__PURE__ */ jsx(Trans, { message: "Backblaze applicationKey" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.storage_backblaze_region",
        label: /* @__PURE__ */ jsx(Trans, { message: "Backblaze Region" }),
        pattern: "[a-z0-9\\-]+",
        placeholder: "us-west-002",
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.storage_backblaze_bucket",
        label: /* @__PURE__ */ jsx(Trans, { message: "Backblaze bucket name" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(S3DirectUploadField, { invalid: isInvalid })
  ] });
}
function S3DirectUploadField({ invalid }) {
  var _a2, _b;
  const uploadCors2 = useUploadS3Cors();
  const { data: defaultSettings } = useAdminSettings();
  const s3DriverEnabled = ((_a2 = defaultSettings == null ? void 0 : defaultSettings.server.uploads_disk_driver) == null ? void 0 : _a2.endsWith("s3")) || ((_b = defaultSettings == null ? void 0 : defaultSettings.server.public_disk_driver) == null ? void 0 : _b.endsWith("s3"));
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        className: "mt-30",
        invalid,
        name: "client.uploads.s3_direct_upload",
        description: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Trans, { message: "Upload files directly from the browser to s3 without going through the server. It will save on server bandwidth and should result in faster upload times. This should be enabled, unless storage provider does not support multipart uploads." }) }),
          /* @__PURE__ */ jsx("p", { className: "mt-10", children: /* @__PURE__ */ jsx(Trans, { message: "If s3 provider is not configured to allow uploads from browser, this can be done automatically via CORS button below, when valid credentials are saved." }) })
        ] }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Direct upload" })
      }
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "flat",
        color: "primary",
        size: "xs",
        className: "mt-20",
        onClick: () => {
          uploadCors2.mutate();
        },
        disabled: !s3DriverEnabled || uploadCors2.isPending,
        children: /* @__PURE__ */ jsx(Trans, { message: "Configure CORS" })
      }
    )
  ] });
}
function FtpForm({ isInvalid }) {
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.storage_ftp_host",
        label: /* @__PURE__ */ jsx(Trans, { message: "FTP hostname" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.storage_ftp_username",
        label: /* @__PURE__ */ jsx(Trans, { message: "FTP username" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.storage_ftp_password",
        label: /* @__PURE__ */ jsx(Trans, { message: "FTP password" }),
        type: "password",
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.storage_ftp_root",
        label: /* @__PURE__ */ jsx(Trans, { message: "FTP directory" }),
        placeholder: "/"
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.storage_ftp_port",
        label: /* @__PURE__ */ jsx(Trans, { message: "FTP port" }),
        type: "number",
        min: 0,
        placeholder: "21"
      }
    ),
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        invalid: isInvalid,
        name: "server.storage_ftp_passive",
        className: "mb-30",
        children: /* @__PURE__ */ jsx(Trans, { message: "Passive" })
      }
    ),
    /* @__PURE__ */ jsx(FormSwitch, { invalid: isInvalid, name: "server.storage_ftp_ssl", children: /* @__PURE__ */ jsx(Trans, { message: "SSL" }) })
  ] });
}
function MailgunCredentials({ isInvalid }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.mailgun_domain",
        label: /* @__PURE__ */ jsx(Trans, { message: "Mailgun domain" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Usually the domain of your site (site.com)" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.mailgun_secret",
        label: /* @__PURE__ */ jsx(Trans, { message: "Mailgun API key" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Should start with `key-`" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        name: "server.mailgun_endpoint",
        label: /* @__PURE__ */ jsx(Trans, { message: "Mailgun endpoint" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Can be left empty, if your mailgun account is in the US region." }),
        placeholder: "api.eu.mailgun.net"
      }
    )
  ] });
}
function SmtpCredentials({ isInvalid }) {
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.mail_host",
        label: /* @__PURE__ */ jsx(Trans, { message: "SMTP host" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.mail_username",
        label: /* @__PURE__ */ jsx(Trans, { message: "SMTP username" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        type: "password",
        name: "server.mail_password",
        label: /* @__PURE__ */ jsx(Trans, { message: "SMTP password" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        type: "number",
        name: "server.mail_port",
        label: /* @__PURE__ */ jsx(Trans, { message: "SMTP port" })
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.mail_encryption",
        label: /* @__PURE__ */ jsx(Trans, { message: "SMTP encryption" })
      }
    )
  ] });
}
function SesCredentials({ isInvalid }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.ses_key",
        label: /* @__PURE__ */ jsx(Trans, { message: "SES key" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.ses_secret",
        label: /* @__PURE__ */ jsx(Trans, { message: "SES secret" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        name: "server.ses_region",
        label: /* @__PURE__ */ jsx(Trans, { message: "SES region" }),
        placeholder: "us-east-1",
        required: true
      }
    )
  ] });
}
function PostmarkCredentials({ isInvalid }) {
  return /* @__PURE__ */ jsx(
    FormTextField,
    {
      invalid: isInvalid,
      name: "server.postmark_token",
      label: /* @__PURE__ */ jsx(Trans, { message: "Postmark token" }),
      required: true
    }
  );
}
const GmailIcon = createSvgIcon(
  [
    /* @__PURE__ */ jsx(
      "path",
      {
        fill: "#4caf50",
        d: "M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"
      },
      "0"
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        fill: "#1e88e5",
        d: "M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"
      },
      "1"
    ),
    /* @__PURE__ */ jsx(
      "polygon",
      {
        fill: "#e53935",
        points: "35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"
      },
      "2"
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        fill: "#c62828",
        d: "M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"
      },
      "3"
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        fill: "#fbc02d",
        d: "M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"
      },
      "4"
    )
  ],
  "Gmail",
  "0 0 48 48"
);
function ConnectGmailPanel() {
  const { watch, setValue } = useFormContext();
  const { connectSocial } = useSocialLogin();
  const connectedEmail = watch("server.connectedGmailAccount");
  const handleGmailConnect = async () => {
    const e = await connectSocial("secure/settings/mail/gmail/connect");
    if ((e == null ? void 0 : e.status) === "SUCCESS") {
      const email = e.callbackData.profile.email;
      setValue("server.connectedGmailAccount", email);
      toast(message("Connected gmail account: :email", { values: { email } }));
    }
  };
  const connectButton = /* @__PURE__ */ jsx(
    Button,
    {
      variant: "outline",
      color: "primary",
      startIcon: /* @__PURE__ */ jsx(GmailIcon, {}),
      onClick: () => {
        handleGmailConnect();
      },
      children: /* @__PURE__ */ jsx(Trans, { message: "Connect gmail account" })
    }
  );
  const reconnectPanel = /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-14 rounded border bg-alt px-14 py-6 text-sm", children: [
    /* @__PURE__ */ jsx(GmailIcon, { size: "lg" }),
    connectedEmail,
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "text",
        color: "primary",
        className: "ml-auto",
        onClick: () => {
          handleGmailConnect();
        },
        children: /* @__PURE__ */ jsx(Trans, { message: "Reconnect" })
      }
    )
  ] });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "mb-6 text-sm", children: /* @__PURE__ */ jsx(Trans, { message: "Gmail account" }) }),
    connectedEmail ? reconnectPanel : connectButton
  ] });
}
function OutgoingMailGroup() {
  const { watch, clearErrors } = useFormContext();
  const selectedDriver = watch("server.mail_driver");
  const credentialForms = [];
  if (selectedDriver === "mailgun") {
    credentialForms.push(MailgunCredentials);
  }
  if (selectedDriver === "smtp") {
    credentialForms.push(SmtpCredentials);
  }
  if (selectedDriver === "ses") {
    credentialForms.push(SesCredentials);
  }
  if (selectedDriver === "postmark") {
    credentialForms.push(PostmarkCredentials);
  }
  if (selectedDriver === "gmailApi") {
    credentialForms.push(ConnectGmailPanel);
  }
  return /* @__PURE__ */ jsx(
    SettingsErrorGroup,
    {
      separatorTop: false,
      separatorBottom: false,
      name: "mail_group",
      children: (isInvalid) => /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs(
          FormSelect,
          {
            onSelectionChange: () => {
              clearErrors();
            },
            invalid: isInvalid,
            selectionMode: "single",
            name: "server.mail_driver",
            label: /* @__PURE__ */ jsx(Trans, { message: "Outgoing mail method" }),
            description: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Trans, { message: "Which method should be used for sending outgoing application emails (like registration confirmation)" }),
              /* @__PURE__ */ jsx(
                LearnMoreLink,
                {
                  className: "mt-8",
                  link: "https://support.vebto.com/help-center/articles/42/44/155/incoming-emails"
                }
              )
            ] }),
            children: [
              /* @__PURE__ */ jsx(Item, { value: "mailgun", children: "Mailgun" }),
              /* @__PURE__ */ jsx(Item, { value: "gmailApi", children: "Gmail Api" }),
              /* @__PURE__ */ jsx(Item, { value: "smtp", children: "SMTP" }),
              /* @__PURE__ */ jsx(Item, { value: "postmark", children: "Postmark" }),
              /* @__PURE__ */ jsx(Item, { value: "ses", children: "Ses (Amazon Simple Email Service)" }),
              /* @__PURE__ */ jsx(Item, { value: "sendmail", children: "SendMail" }),
              /* @__PURE__ */ jsx(Item, { value: "log", children: "Log (Email will be saved to error log)" })
            ]
          }
        ),
        credentialForms.length ? /* @__PURE__ */ jsx("div", { className: "mt-30", children: credentialForms.map((CredentialsForm, index) => /* @__PURE__ */ jsx(CredentialsForm, { isInvalid }, index)) }) : null
      ] })
    }
  );
}
function OutgoingEmailSettings() {
  return /* @__PURE__ */ jsxs(
    SettingsPanel,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Outgoing email settings" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Change outgoing email handlers, email credentials and other related settings." }),
      children: [
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            id: "outgoing-emails",
            className: "mb-30",
            type: "email",
            name: "server.mail_from_address",
            label: /* @__PURE__ */ jsx(Trans, { message: "From address" }),
            description: /* @__PURE__ */ jsx(Trans, { message: "All outgoing application emails will be sent from this email address." }),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(ContactAddressSection, {}),
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            className: "mb-30",
            name: "server.mail_from_name",
            label: /* @__PURE__ */ jsx(Trans, { message: "From name" }),
            description: /* @__PURE__ */ jsx(Trans, { message: "All outgoing application emails will be sent using this name." }),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(
          SectionHelper,
          {
            color: "warning",
            description: /* @__PURE__ */ jsx(Trans, { message: "Your selected mail method must be authorized to send emails using this address and name." })
          }
        ),
        /* @__PURE__ */ jsx(SettingsSeparator, {}),
        /* @__PURE__ */ jsx(OutgoingMailGroup, {})
      ]
    }
  );
}
function ContactAddressSection() {
  const { base_url } = useSettings();
  const contactPageUrl = `${base_url}/contact`;
  const link = /* @__PURE__ */ jsx(ExternalLink, { href: contactPageUrl, children: contactPageUrl });
  return /* @__PURE__ */ jsx(
    FormTextField,
    {
      className: "mb-30",
      type: "email",
      name: "client.mail.contact_page_address",
      label: /* @__PURE__ */ jsx(Trans, { message: "Contact page address" }),
      description: /* @__PURE__ */ jsx(
        Trans,
        {
          values: {
            contactPageUrl: link
          },
          message: "Where emails from :contactPageUrl page should be sent to."
        }
      )
    }
  );
}
function clearCache() {
  return apiClient.post("cache/flush").then((r) => r.data);
}
function useClearCache() {
  return useMutation({
    mutationFn: () => clearCache(),
    onSuccess: () => {
      toast(message("Cache cleared"));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function CacheSettings() {
  const clearCache2 = useClearCache();
  return /* @__PURE__ */ jsxs(
    SettingsPanel,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Cache settings" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Select cache provider and manually clear cache." }),
      children: [
        /* @__PURE__ */ jsx(CacheSelect, {}),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "xs",
            color: "primary",
            disabled: clearCache2.isPending,
            onClick: () => {
              clearCache2.mutate();
            },
            children: /* @__PURE__ */ jsx(Trans, { message: "Clear cache" })
          }
        ),
        /* @__PURE__ */ jsx(
          SectionHelper,
          {
            color: "warning",
            className: "mt-30",
            description: /* @__PURE__ */ jsx(
              Trans,
              {
                message: '"File" is the best option for most cases and should not be changed, unless you are familiar with another cache method and have it set up on the server already.'
              }
            )
          }
        )
      ]
    }
  );
}
function CacheSelect() {
  const { watch, clearErrors } = useFormContext();
  const cacheDriver = watch("server.cache_driver");
  let CredentialSection = null;
  if (cacheDriver === "memcached") {
    CredentialSection = MemcachedCredentials;
  }
  return /* @__PURE__ */ jsx(SettingsErrorGroup, { separatorTop: false, name: "cache_group", children: (isInvalid) => {
    return /* @__PURE__ */ jsxs(Fragment$1, { children: [
      /* @__PURE__ */ jsxs(
        FormSelect,
        {
          invalid: isInvalid,
          onSelectionChange: () => {
            clearErrors();
          },
          selectionMode: "single",
          name: "server.cache_driver",
          label: /* @__PURE__ */ jsx(Trans, { message: "Cache method" }),
          description: /* @__PURE__ */ jsx(Trans, { message: "Which method should be used for storing and retrieving cached items." }),
          children: [
            /* @__PURE__ */ jsx(Item, { value: "file", children: /* @__PURE__ */ jsx(Trans, { message: "File (Default)" }) }),
            /* @__PURE__ */ jsx(Item, { value: "array", children: /* @__PURE__ */ jsx(Trans, { message: "None" }) }),
            /* @__PURE__ */ jsx(Item, { value: "apc", children: "APC" }),
            /* @__PURE__ */ jsx(Item, { value: "memcached", children: "Memcached" }),
            /* @__PURE__ */ jsx(Item, { value: "redis", children: "Redis" })
          ]
        }
      ),
      CredentialSection && /* @__PURE__ */ jsx("div", { className: "mt-30", children: /* @__PURE__ */ jsx(CredentialSection, { isInvalid }) })
    ] });
  } });
}
function MemcachedCredentials({ isInvalid }) {
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.memcached_host",
        label: /* @__PURE__ */ jsx(Trans, { message: "Memcached host" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        type: "number",
        name: "server.memcached_port",
        label: /* @__PURE__ */ jsx(Trans, { message: "Memcached port" }),
        required: true
      }
    )
  ] });
}
function LoggingSettings() {
  return /* @__PURE__ */ jsxs(
    SettingsPanel,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Error logging" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Configure site error logging and related 3rd party integrations." }),
      children: [
        /* @__PURE__ */ jsx(SentrySection, {}),
        /* @__PURE__ */ jsx(
          SectionHelper,
          {
            className: "mt-30",
            color: "positive",
            description: /* @__PURE__ */ jsx(
              Trans,
              {
                values: {
                  a: (parts) => /* @__PURE__ */ jsx(ExternalLink, { href: "https://sentry.io", children: parts })
                },
                message: "<a>Sentry</a> integration provides real-time error tracking and helps identify and fix issues when site is in production."
              }
            )
          }
        )
      ]
    }
  );
}
function SentrySection() {
  const { clearErrors } = useFormContext();
  return /* @__PURE__ */ jsx(
    SettingsErrorGroup,
    {
      separatorTop: false,
      separatorBottom: false,
      name: "logging_group",
      children: (isInvalid) => {
        return /* @__PURE__ */ jsx(
          FormTextField,
          {
            onChange: () => {
              clearErrors();
            },
            invalid: isInvalid,
            name: "server.sentry_dsn",
            type: "url",
            minLength: 30,
            label: /* @__PURE__ */ jsx(Trans, { message: "Sentry DSN" })
          }
        );
      }
    }
  );
}
function QueueSettings() {
  return /* @__PURE__ */ jsxs(
    SettingsPanel,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Queue" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Select active queue method and enter related 3rd party API keys." }),
      children: [
        /* @__PURE__ */ jsx(
          SectionHelper,
          {
            color: "positive",
            className: "mb-30",
            description: /* @__PURE__ */ jsx(Trans, { message: "Queues allow to defer time consuming tasks, such as sending an email, until a later time. Deferring these tasks can speed up web requests to the application." })
          }
        ),
        /* @__PURE__ */ jsx(
          SectionHelper,
          {
            color: "warning",
            className: "mb-30",
            description: /* @__PURE__ */ jsx(Trans, { message: "All methods except sync require additional setup, which should be performed before changing the queue method. Consult documentation for more information." })
          }
        ),
        /* @__PURE__ */ jsx(DriverSection, {})
      ]
    }
  );
}
function DriverSection() {
  const { watch, clearErrors } = useFormContext();
  const queueDriver = watch("server.queue_driver");
  let CredentialSection = null;
  if (queueDriver === "sqs") {
    CredentialSection = SqsCredentials;
  }
  return /* @__PURE__ */ jsx(
    SettingsErrorGroup,
    {
      separatorTop: false,
      separatorBottom: false,
      name: "queue_group",
      children: (isInvalid) => {
        return /* @__PURE__ */ jsxs(Fragment$1, { children: [
          /* @__PURE__ */ jsxs(
            FormSelect,
            {
              invalid: isInvalid,
              onSelectionChange: () => {
                clearErrors();
              },
              selectionMode: "single",
              name: "server.queue_driver",
              label: /* @__PURE__ */ jsx(Trans, { message: "Queue method" }),
              required: true,
              children: [
                /* @__PURE__ */ jsx(Item, { value: "sync", children: /* @__PURE__ */ jsx(Trans, { message: "Sync (Default)" }) }),
                /* @__PURE__ */ jsx(Item, { value: "beanstalkd", children: "Beanstalkd" }),
                /* @__PURE__ */ jsx(Item, { value: "database", children: /* @__PURE__ */ jsx(Trans, { message: "Database" }) }),
                /* @__PURE__ */ jsx(Item, { value: "sqs", children: /* @__PURE__ */ jsx(Trans, { message: "SQS (Amazon simple queue service)" }) }),
                /* @__PURE__ */ jsx(Item, { value: "redis", children: "Redis" })
              ]
            }
          ),
          CredentialSection && /* @__PURE__ */ jsx("div", { className: "mt-30", children: /* @__PURE__ */ jsx(CredentialSection, { isInvalid }) })
        ] });
      }
    }
  );
}
function SqsCredentials({ isInvalid }) {
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.sqs_queue_key",
        label: /* @__PURE__ */ jsx(Trans, { message: "SQS queue key" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.sqs_queue_secret",
        label: /* @__PURE__ */ jsx(Trans, { message: "SQS queue secret" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.sqs_queue_prefix",
        label: /* @__PURE__ */ jsx(Trans, { message: "SQS queue prefix" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.sqs_queue_name",
        label: /* @__PURE__ */ jsx(Trans, { message: "SQS queue name" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.sqs_queue_region",
        label: /* @__PURE__ */ jsx(Trans, { message: "SQS queue region" }),
        required: true
      }
    )
  ] });
}
function RecaptchaSettings() {
  const { settings } = useContext(SiteConfigContext);
  return /* @__PURE__ */ jsxs(
    SettingsPanel,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Recaptcha" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Configure google recaptcha integration and credentials." }),
      children: [
        (settings == null ? void 0 : settings.showRecaptchaLinkSwitch) && /* @__PURE__ */ jsx(
          FormSwitch,
          {
            className: "mb-30",
            name: "client.recaptcha.enable.link_creation",
            description: /* @__PURE__ */ jsx(Trans, { message: "Enable recaptcha integration when creating links from homepage or user dashboard." }),
            children: /* @__PURE__ */ jsx(Trans, { message: "Link creation" })
          }
        ),
        /* @__PURE__ */ jsx(
          FormSwitch,
          {
            className: "mb-30",
            name: "client.recaptcha.enable.contact",
            description: /* @__PURE__ */ jsx(
              Trans,
              {
                message: 'Enable recaptcha integration for "contact us" page.'
              }
            ),
            children: /* @__PURE__ */ jsx(Trans, { message: "Contact page" })
          }
        ),
        /* @__PURE__ */ jsx(
          FormSwitch,
          {
            className: "mb-30",
            name: "client.recaptcha.enable.register",
            description: /* @__PURE__ */ jsx(Trans, { message: "Enable recaptcha integration for registration page." }),
            children: /* @__PURE__ */ jsx(Trans, { message: "Registration page" })
          }
        ),
        /* @__PURE__ */ jsx(RecaptchaSection, {})
      ]
    }
  );
}
function RecaptchaSection() {
  const { clearErrors } = useFormContext();
  return /* @__PURE__ */ jsx(
    SettingsErrorGroup,
    {
      separatorTop: false,
      separatorBottom: false,
      name: "recaptcha_group",
      children: (isInvalid) => {
        return /* @__PURE__ */ jsxs(Fragment$1, { children: [
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              className: "mb-30",
              onChange: () => {
                clearErrors();
              },
              invalid: isInvalid,
              name: "client.recaptcha.site_key",
              label: /* @__PURE__ */ jsx(Trans, { message: "Recaptcha v3 site key" })
            }
          ),
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              onChange: () => {
                clearErrors();
              },
              invalid: isInvalid,
              name: "client.recaptcha.secret_key",
              label: /* @__PURE__ */ jsx(Trans, { message: "Recaptcha v3 secret key" })
            }
          )
        ] });
      }
    }
  );
}
const FileField = React.forwardRef(
  (props, ref) => {
    const inputRef = useObjectRef(ref);
    const { fieldProps, inputProps } = useField({ ...props, focusRef: inputRef });
    const inputFieldClassNames = getInputFieldClassNames(props);
    return /* @__PURE__ */ jsx(Field, { ref, fieldClassNames: inputFieldClassNames, ...fieldProps, children: /* @__PURE__ */ jsx(
      "input",
      {
        type: "file",
        ref: inputRef,
        ...inputProps,
        className: clsx(
          inputFieldClassNames.input,
          "py-8",
          "file:bg-primary file:text-on-primary file:border-none file:rounded file:text-sm file:font-semibold file:px-10 file:h-24 file:mr-10"
        )
      }
    ) });
  }
);
function FormFileField({ name, ...props }) {
  const {
    field: { onChange, onBlur, ref },
    fieldState: { invalid, error }
  } = useController({
    name
  });
  const [value, setValue] = React.useState("");
  const formProps = {
    onChange: (e) => {
      var _a2;
      onChange((_a2 = e.target.files) == null ? void 0 : _a2[0]);
      setValue(e.target.value);
    },
    onBlur,
    value,
    invalid,
    errorMessage: error == null ? void 0 : error.message
  };
  return /* @__PURE__ */ jsx(FileField, { ref, ...mergeProps(formProps, props) });
}
function ReportsSettings() {
  return /* @__PURE__ */ jsx(
    SettingsPanel,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Analytics" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Configure google analytics integration and credentials." }),
      children: /* @__PURE__ */ jsx(AnalyticsSection, {})
    }
  );
}
function AnalyticsSection() {
  const { clearErrors } = useFormContext();
  return /* @__PURE__ */ jsx(
    SettingsErrorGroup,
    {
      separatorTop: false,
      separatorBottom: false,
      name: "analytics_group",
      children: (isInvalid) => /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          FormFileField,
          {
            className: "mb-30",
            onChange: () => {
              clearErrors();
            },
            invalid: isInvalid,
            name: "files.certificate",
            accept: ".json",
            label: /* @__PURE__ */ jsx(Trans, { message: "Google service account key file (.json)" })
          }
        ),
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            className: "mb-30",
            onChange: () => {
              clearErrors();
            },
            invalid: isInvalid,
            name: "server.analytics_property_id",
            type: "number",
            label: /* @__PURE__ */ jsx(Trans, { message: "Google analytics property ID" })
          }
        ),
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            className: "mb-30",
            onChange: () => {
              clearErrors();
            },
            invalid: isInvalid,
            name: "client.analytics.tracking_code",
            placeholder: "G-******",
            min: "1",
            max: "20",
            description: /* @__PURE__ */ jsx(Trans, { message: "Google analytics measurement ID only, not the whole javascript snippet." }),
            label: /* @__PURE__ */ jsx(Trans, { message: "Google tag manager measurement ID" })
          }
        ),
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            name: "client.analytics.gchart_api_key",
            label: /* @__PURE__ */ jsx(Trans, { message: "Google maps javascript API key" }),
            description: /* @__PURE__ */ jsx(Trans, { message: "Only required in order to show world geochart on integrated analytics pages." })
          }
        )
      ] })
    }
  );
}
function useUpdateUser(form) {
  const navigate = useNavigate$1();
  return useMutation({
    mutationFn: (props) => updateUser(props),
    onSuccess: (response, props) => {
      toast(message("User updated"));
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/admin/users");
    },
    onError: (r) => onFormQueryError(r, form)
  });
}
function updateUser({ id, ...other }) {
  if (other.roles) {
    other.roles = other.roles.map((r) => r.id);
  }
  return apiClient.put(`users/${id}`, other).then((r) => r.data);
}
function CrupdateUserForm({
  onSubmit,
  form,
  title,
  subTitle,
  isLoading,
  avatarManager,
  resendEmailButton,
  children
}) {
  const { require_email_confirmation } = useSettings();
  const { data: valueLists } = useValueLists(["roles", "permissions"]);
  return /* @__PURE__ */ jsxs(
    CrupdateResourceLayout,
    {
      onSubmit,
      form,
      title,
      subTitle,
      isLoading,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-40 flex items-start gap-40 md:gap-80", children: [
          avatarManager,
          /* @__PURE__ */ jsxs("div", { className: "flex-auto", children: [
            children,
            /* @__PURE__ */ jsx(
              FormTextField,
              {
                className: "mb-30",
                name: "first_name",
                label: /* @__PURE__ */ jsx(Trans, { message: "First name" })
              }
            ),
            /* @__PURE__ */ jsx(
              FormTextField,
              {
                name: "last_name",
                label: /* @__PURE__ */ jsx(Trans, { message: "Last name" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-30 border-b border-t pb-30 pt-30", children: [
          /* @__PURE__ */ jsx(
            FormSwitch,
            {
              className: clsx(resendEmailButton && "mb-30"),
              disabled: !require_email_confirmation,
              name: "email_verified_at",
              description: /* @__PURE__ */ jsx(Trans, { message: "Whether email address has been confirmed. User will not be able to login until address is confirmed, unless confirmation is disabled from settings page." }),
              children: /* @__PURE__ */ jsx(Trans, { message: "Email confirmed" })
            }
          ),
          resendEmailButton
        ] }),
        /* @__PURE__ */ jsx(
          FormFileSizeField,
          {
            className: "mb-30",
            name: "available_space",
            label: /* @__PURE__ */ jsx(Trans, { message: "Allowed storage space" }),
            description: /* @__PURE__ */ jsx(
              Trans,
              {
                values: {
                  a: (parts) => /* @__PURE__ */ jsx(
                    Link,
                    {
                      className: LinkStyle,
                      target: "_blank",
                      to: "/admin/settings/uploading",
                      children: parts
                    }
                  )
                },
                message: "Total storage space all user uploads are allowed to take up. If left empty, this value will be inherited from any roles or subscriptions user has, or from 'Available space' setting in <a>Uploading</a> settings page."
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          FormChipField,
          {
            className: "mb-30",
            name: "roles",
            label: /* @__PURE__ */ jsx(Trans, { message: "Roles" }),
            suggestions: valueLists == null ? void 0 : valueLists.roles,
            children: (chip) => /* @__PURE__ */ jsx(Item, { value: chip.id, children: chip.name }, chip.id)
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "mt-30 border-t pt-30", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-10 text-sm", children: /* @__PURE__ */ jsx(Trans, { message: "Permissions" }) }),
          /* @__PURE__ */ jsx(FormPermissionSelector, { name: "permissions" })
        ] })
      ]
    }
  );
}
const ReportIcon = createSvgIcon(
  [/* @__PURE__ */ jsx("path", { d: "M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM19 14.9 14.9 19H9.1L5 14.9V9.1L9.1 5h5.8L19 9.1v5.8z" }, "0"), /* @__PURE__ */ jsx("circle", { cx: "12", cy: "16", r: "1" }, "1"), /* @__PURE__ */ jsx("path", { d: "M11 7h2v7h-2z" }, "2")],
  "ReportOutlined"
);
function UpdateUserPage() {
  var _a2, _b, _c;
  const form = useForm();
  const { require_email_confirmation } = useSettings();
  const { userId } = useParams();
  const updateUser2 = useUpdateUser(form);
  const resendConfirmationEmail = useResendVerificationEmail();
  const { data, isLoading } = useUser(userId, {
    with: ["subscriptions", "roles", "permissions", "bans"]
  });
  const banReason = (_b = (_a2 = data == null ? void 0 : data.user.bans) == null ? void 0 : _a2[0]) == null ? void 0 : _b.comment;
  useEffect(() => {
    if ((data == null ? void 0 : data.user) && !form.getValues().id) {
      form.reset({
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        roles: data.user.roles,
        permissions: data.user.permissions,
        id: data.user.id,
        email_verified_at: Boolean(data.user.email_verified_at),
        available_space: data.user.available_space,
        avatar: data.user.avatar
      });
    }
  }, [data == null ? void 0 : data.user, form]);
  if (isLoading) {
    return /* @__PURE__ */ jsx(FullPageLoader, {});
  }
  const resendEmailButton = /* @__PURE__ */ jsx(
    Button,
    {
      size: "xs",
      variant: "outline",
      color: "primary",
      disabled: !require_email_confirmation || resendConfirmationEmail.isPending || ((_c = data == null ? void 0 : data.user) == null ? void 0 : _c.email_verified_at) != null,
      onClick: () => {
        resendConfirmationEmail.mutate({ email: data.user.email });
      },
      children: /* @__PURE__ */ jsx(Trans, { message: "Resend email" })
    }
  );
  return /* @__PURE__ */ jsx(
    CrupdateUserForm,
    {
      onSubmit: (newValues) => {
        updateUser2.mutate(newValues);
      },
      form,
      title: /* @__PURE__ */ jsx(Trans, { values: { email: data == null ? void 0 : data.user.email }, message: "Edit “:email“" }),
      subTitle: banReason && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-sm text-danger", children: [
        /* @__PURE__ */ jsx(ReportIcon, {}),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Suspended: :reason",
            values: { reason: banReason }
          }
        ) })
      ] }),
      isLoading: updateUser2.isPending,
      avatarManager: /* @__PURE__ */ jsx(
        AvatarSection,
        {
          user: data.user,
          onChange: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
          }
        }
      ),
      resendEmailButton,
      children: /* @__PURE__ */ jsx(
        FormTextField,
        {
          className: "mb-30",
          name: "password",
          type: "password",
          label: /* @__PURE__ */ jsx(Trans, { message: "New password" })
        }
      )
    }
  );
}
function AvatarSection({ user, onChange }) {
  const uploadAvatar = useUploadAvatar({ user });
  const removeAvatar = useRemoveAvatar({ user });
  return /* @__PURE__ */ jsx(FileUploadProvider, { children: /* @__PURE__ */ jsx(
    FormImageSelector,
    {
      name: "avatar",
      diskPrefix: "avatars",
      variant: "avatar",
      stretchPreview: true,
      label: /* @__PURE__ */ jsx(Trans, { message: "Profile image" }),
      previewSize: "w-90 h-90",
      showRemoveButton: true,
      onChange: (url) => {
        if (url) {
          uploadAvatar.mutate({ url });
        } else {
          removeAvatar.mutate();
        }
        onChange();
      }
    }
  ) });
}
function useCreateUser(form) {
  const navigate = useNavigate$1();
  return useMutation({
    mutationFn: (props) => createUser(props),
    onSuccess: () => {
      toast(message("User created"));
      queryClient.invalidateQueries({ queryKey: DatatableDataQueryKey("users") });
      navigate("/admin/users");
    },
    onError: (r) => onFormQueryError(r, form)
  });
}
function createUser(payload) {
  if (payload.roles) {
    payload.roles = payload.roles.map((r) => r.id);
  }
  return apiClient.post("users", payload).then((r) => r.data);
}
function CreateUserPage() {
  const form = useForm();
  const createUser2 = useCreateUser(form);
  const avatarManager = /* @__PURE__ */ jsx(FileUploadProvider, { children: /* @__PURE__ */ jsx(
    FormImageSelector,
    {
      name: "avatar",
      diskPrefix: "avatars",
      variant: "avatar",
      stretchPreview: true,
      label: /* @__PURE__ */ jsx(Trans, { message: "Profile image" }),
      previewSize: "w-90 h-90",
      showRemoveButton: true
    }
  ) });
  return /* @__PURE__ */ jsxs(
    CrupdateUserForm,
    {
      onSubmit: (newValues) => {
        createUser2.mutate(newValues);
      },
      form,
      title: /* @__PURE__ */ jsx(Trans, { message: "Add new user" }),
      isLoading: createUser2.isPending,
      avatarManager,
      children: [
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            className: "mb-30",
            name: "email",
            type: "email",
            label: /* @__PURE__ */ jsx(Trans, { message: "Email" })
          }
        ),
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            className: "mb-30",
            name: "password",
            type: "password",
            label: /* @__PURE__ */ jsx(Trans, { message: "Password" })
          }
        )
      ]
    }
  );
}
const TranslateIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "m12.87 15.07-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7 1.62-4.33L19.12 17h-3.24z" }),
  "TranslateOutlined"
);
const getLocalWithLinesQueryKey = (localeId) => {
  const key = ["getLocaleWithLines"];
  if (localeId != null) {
    key.push(localeId);
  }
  return key;
};
function useLocaleWithLines(localeId) {
  return useQuery({
    queryKey: getLocalWithLinesQueryKey(localeId),
    queryFn: () => fetchLocaleWithLines(localeId),
    staleTime: Infinity
  });
}
function fetchLocaleWithLines(localeId) {
  return apiClient.get(`localizations/${localeId}`).then((response) => response.data);
}
function UpdateLocalization({
  id,
  ...other
}) {
  return apiClient.put(`localizations/${id}`, other).then((r) => r.data);
}
function useUpdateLocalization(form) {
  return useMutation({
    mutationFn: (props) => UpdateLocalization(props),
    onSuccess: () => {
      toast(message("Localization updated"));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("localizations")
      });
      queryClient.invalidateQueries({ queryKey: getLocalWithLinesQueryKey() });
    },
    onError: (r) => form ? onFormQueryError(r, form) : showHttpErrorToast(r)
  });
}
function UpdateLocalizationDialog({
  localization
}) {
  const { trans } = useTrans();
  const { formId, close } = useDialogContext();
  const form = useForm({
    defaultValues: {
      id: localization.id,
      name: localization.name,
      language: localization.language
    }
  });
  const { data } = useValueLists(["languages"]);
  const languages = (data == null ? void 0 : data.languages) || [];
  const updateLocalization = useUpdateLocalization(form);
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Update localization" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsxs(
      Form$1,
      {
        form,
        id: formId,
        onSubmit: (values) => {
          updateLocalization.mutate(values, { onSuccess: close });
        },
        children: [
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              name: "name",
              label: /* @__PURE__ */ jsx(Trans, { message: "Name" }),
              className: "mb-30",
              required: true
            }
          ),
          /* @__PURE__ */ jsx(
            FormSelect,
            {
              required: true,
              name: "language",
              label: /* @__PURE__ */ jsx(Trans, { message: "Language" }),
              selectionMode: "single",
              showSearchField: true,
              searchPlaceholder: trans(message("Search languages")),
              children: languages.map((language) => /* @__PURE__ */ jsx(Item, { value: language.code, children: language.name }, language.code))
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: close, children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          type: "submit",
          form: formId,
          disabled: updateLocalization.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
        }
      )
    ] })
  ] });
}
function createLocalization(payload) {
  return apiClient.post(`localizations`, payload).then((r) => r.data);
}
function useCreateLocalization(form) {
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: (props) => createLocalization(props),
    onSuccess: () => {
      toast(message("Localization created"));
      queryClient2.invalidateQueries({
        queryKey: DatatableDataQueryKey("localizations")
      });
    },
    onError: (r) => onFormQueryError(r, form)
  });
}
function CreateLocationDialog() {
  const { trans } = useTrans();
  const { formId, close } = useDialogContext();
  const form = useForm({
    defaultValues: {
      language: "en"
    }
  });
  const { data } = useValueLists(["languages"]);
  const languages = (data == null ? void 0 : data.languages) || [];
  const createLocalization2 = useCreateLocalization(form);
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Create localization" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsxs(
      Form$1,
      {
        form,
        id: formId,
        onSubmit: (values) => {
          createLocalization2.mutate(values, { onSuccess: close });
        },
        children: [
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              autoFocus: true,
              name: "name",
              label: /* @__PURE__ */ jsx(Trans, { message: "Name" }),
              className: "mb-30",
              required: true
            }
          ),
          /* @__PURE__ */ jsx(
            FormSelect,
            {
              required: true,
              name: "language",
              label: /* @__PURE__ */ jsx(Trans, { message: "Language" }),
              selectionMode: "single",
              showSearchField: true,
              searchPlaceholder: trans(message("Search languages")),
              children: languages.map((language) => /* @__PURE__ */ jsx(Item, { value: language.code, children: language.name }, language.code))
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: close, children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          type: "submit",
          form: formId,
          disabled: createLocalization2.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
        }
      )
    ] })
  ] });
}
const aroundTheWorldSvg = "/assets/around-the-world-06866e90.svg";
const columnConfig$9 = [
  {
    key: "name",
    allowsSorting: true,
    sortingKey: "name",
    visibleInMode: "all",
    width: "flex-3 min-w-200",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Name" }),
    body: (locale) => locale.name
  },
  {
    key: "language",
    allowsSorting: true,
    sortingKey: "language",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Language code" }),
    body: (locale) => locale.language
  },
  {
    key: "updatedAt",
    allowsSorting: true,
    width: "w-100",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Last updated" }),
    body: (locale) => /* @__PURE__ */ jsx(FormattedDate, { date: locale.updated_at })
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    hideHeader: true,
    align: "end",
    width: "w-84 flex-shrink-0",
    visibleInMode: "all",
    body: (locale) => {
      return /* @__PURE__ */ jsxs("div", { className: "text-muted", children: [
        /* @__PURE__ */ jsx(Link, { to: `${locale.id}/translate`, children: /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Translate" }), children: /* @__PURE__ */ jsx(IconButton, { size: "md", children: /* @__PURE__ */ jsx(TranslateIcon, {}) }) }) }),
        /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
          /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Edit" }), children: /* @__PURE__ */ jsx(IconButton, { children: /* @__PURE__ */ jsx(EditIcon, {}) }) }),
          /* @__PURE__ */ jsx(UpdateLocalizationDialog, { localization: locale })
        ] })
      ] });
    }
  }
];
function LocalizationIndex() {
  return /* @__PURE__ */ jsx(
    DataTablePage,
    {
      endpoint: "localizations",
      title: /* @__PURE__ */ jsx(Trans, { message: "Localizations" }),
      columns: columnConfig$9,
      actions: /* @__PURE__ */ jsx(Actions$a, {}),
      selectedActions: /* @__PURE__ */ jsx(DeleteSelectedItemsAction, {}),
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: aroundTheWorldSvg,
          title: /* @__PURE__ */ jsx(Trans, { message: "No localizations have been created yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching localizations" })
        }
      )
    }
  );
}
function Actions$a() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(DataTableAddItemButton, { children: /* @__PURE__ */ jsx(Trans, { message: "Add new localization" }) }),
    /* @__PURE__ */ jsx(CreateLocationDialog, {})
  ] }) });
}
function NewTranslationDialog() {
  const { formId, close } = useDialogContext();
  const form = useForm();
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Add translation" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsxs(
      Form$1,
      {
        form,
        id: formId,
        onSubmit: (values) => {
          close(values);
        },
        children: [
          /* @__PURE__ */ jsx(
            SectionHelper,
            {
              className: "mb-30",
              title: /* @__PURE__ */ jsx(Trans, { message: "Add a new translation, if it does not exist already." }),
              description: /* @__PURE__ */ jsx(Trans, { message: "This should only need to be done for things like custom menu items." })
            }
          ),
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              inputElementType: "textarea",
              rows: 2,
              autoFocus: true,
              name: "key",
              label: /* @__PURE__ */ jsx(Trans, { message: "Translation key" }),
              className: "mb-30",
              required: true
            }
          ),
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              inputElementType: "textarea",
              rows: 2,
              name: "value",
              label: /* @__PURE__ */ jsx(Trans, { message: "Translation value" }),
              required: true
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: close, children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(Button, { variant: "flat", color: "primary", type: "submit", form: formId, children: /* @__PURE__ */ jsx(Trans, { message: "Add" }) })
    ] })
  ] });
}
function TranslationManagementPage() {
  const { localeId } = useParams();
  const { data, isLoading } = useLocaleWithLines(localeId);
  const localization = data == null ? void 0 : data.localization;
  if (isLoading || !localization) {
    return /* @__PURE__ */ jsx(FullPageLoader, {});
  }
  return /* @__PURE__ */ jsx(Form, { localization });
}
function Form({ localization }) {
  const [lines, setLines] = useState(localization.lines || {});
  const navigate = useNavigate$1();
  const updateLocalization = useUpdateLocalization();
  const [searchQuery, setSearchQuery] = useState("");
  return /* @__PURE__ */ jsxs(
    "form",
    {
      className: "p-14 md:p-24 flex flex-col h-full",
      onSubmit: (e) => {
        e.preventDefault();
        updateLocalization.mutate(
          { id: localization.id, lines },
          {
            onSuccess: () => {
              navigate("/admin/localizations");
            }
          }
        );
      },
      children: [
        /* @__PURE__ */ jsx(
          Header$3,
          {
            localization,
            setLines,
            lines,
            searchQuery,
            setSearchQuery,
            isLoading: updateLocalization.isPending
          }
        ),
        /* @__PURE__ */ jsx(LinesList, { lines, setLines, searchQuery })
      ]
    }
  );
}
function Header$3({
  localization,
  searchQuery,
  setSearchQuery,
  isLoading,
  lines,
  setLines
}) {
  const navigate = useNavigate$1();
  const isMobile = useIsMobileMediaQuery();
  const { trans } = useTrans();
  return /* @__PURE__ */ jsxs("div", { className: "flex-shrink-0", children: [
    /* @__PURE__ */ jsxs(Breadcrumb, { size: "lg", className: "mb-16", children: [
      /* @__PURE__ */ jsx(
        BreadcrumbItem,
        {
          onSelected: () => {
            navigate("/admin/localizations");
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Localizations" })
        }
      ),
      /* @__PURE__ */ jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsx(
        Trans,
        {
          message: ":locale translations",
          values: { locale: localization.name }
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-24 flex items-center gap-32 md:gap-12", children: [
      /* @__PURE__ */ jsx("div", { className: "max-w-440 flex-auto", children: /* @__PURE__ */ jsx(
        TextField,
        {
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          startAdornment: /* @__PURE__ */ jsx(SearchIcon, {}),
          placeholder: trans({ message: "Type to search..." })
        }
      ) }),
      /* @__PURE__ */ jsxs(
        DialogTrigger,
        {
          type: "modal",
          onClose: (newTranslation) => {
            if (newTranslation) {
              const newLines = { ...lines };
              newLines[newTranslation.key] = newTranslation.value;
              setLines(newLines);
            }
          },
          children: [
            !isMobile && /* @__PURE__ */ jsx(
              Button,
              {
                className: "ml-auto",
                variant: "outline",
                color: "primary",
                startIcon: /* @__PURE__ */ jsx(AddIcon, {}),
                children: /* @__PURE__ */ jsx(Trans, { message: "Add new" })
              }
            ),
            /* @__PURE__ */ jsx(NewTranslationDialog, {})
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          type: "submit",
          disabled: isLoading,
          children: isMobile ? /* @__PURE__ */ jsx(Trans, { message: "Save" }) : /* @__PURE__ */ jsx(Trans, { message: "Save translations" })
        }
      )
    ] })
  ] });
}
function LinesList({ searchQuery, lines, setLines }) {
  const filteredLines = useMemo(() => {
    return Object.entries(lines).filter(([id, translation]) => {
      const lowerCaseQuery = searchQuery == null ? void 0 : searchQuery.toLowerCase();
      return !lowerCaseQuery || (id == null ? void 0 : id.toLowerCase().includes(lowerCaseQuery)) || (translation == null ? void 0 : translation.toLowerCase().includes(lowerCaseQuery));
    });
  }, [lines, searchQuery]);
  const ref = useRef(null);
  const rowVirtualizer = useVirtualizer({
    count: filteredLines.length,
    getScrollElement: () => ref.current,
    estimateSize: () => 123
  });
  return /* @__PURE__ */ jsx("div", { className: "flex-auto overflow-y-auto", ref, children: /* @__PURE__ */ jsx(
    "div",
    {
      className: "relative w-full",
      style: {
        height: `${rowVirtualizer.getTotalSize()}px`
      },
      children: rowVirtualizer.getVirtualItems().map((virtualItem) => {
        const [id, translation] = filteredLines[virtualItem.index];
        return /* @__PURE__ */ jsx(
          "div",
          {
            className: "w-full absolute top-0 left-0",
            style: {
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`
            },
            children: /* @__PURE__ */ jsxs("div", { className: "rounded border mb-10 md:mr-10", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-24 justify-between px-10 py-2 border-b", children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    className: "text-xs font-semibold flex-auto",
                    htmlFor: id,
                    children: id
                  }
                ),
                /* @__PURE__ */ jsx(
                  IconButton,
                  {
                    size: "xs",
                    className: "text-muted",
                    onClick: () => {
                      const newLines = { ...lines };
                      delete newLines[id];
                      setLines(newLines);
                    },
                    children: /* @__PURE__ */ jsx(CloseIcon, {})
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
                "textarea",
                {
                  id,
                  name: id,
                  defaultValue: translation,
                  className: "w-full bg-inherit block rounded resize-none outline-none focus-visible:ring-2 p-10 text-sm",
                  rows: 2,
                  onChange: (e) => {
                    const newLines = { ...lines };
                    newLines[id] = e.target.value;
                    setLines(newLines);
                  }
                }
              ) })
            ] })
          },
          id
        );
      })
    }
  ) });
}
function AdsPage() {
  var _a2;
  const query = useAdminSettings();
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-12 md:p-24", children: [
    /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Ads" }) }),
    /* @__PURE__ */ jsx("h1", { className: "mb-20 text-2xl font-light md:mb-40 md:text-3xl", children: /* @__PURE__ */ jsx(Trans, { message: "Predefined Ad slots" }) }),
    query.isLoading ? /* @__PURE__ */ jsx(ProgressCircle, { isIndeterminate: true }) : /* @__PURE__ */ jsx(AdsForm, { defaultValues: ((_a2 = query.data) == null ? void 0 : _a2.client.ads) || {} })
  ] });
}
function AdsForm({ defaultValues }) {
  const {
    admin: { ads }
  } = useContext(SiteConfigContext);
  const form = useForm({
    defaultValues: { client: { ads: defaultValues } }
  });
  const updateSettings = useUpdateAdminSettings(form);
  return /* @__PURE__ */ jsxs(
    Form$1,
    {
      form,
      onSubmit: (value) => {
        updateSettings.mutate(value);
      },
      children: [
        ads.map((ad) => {
          return /* @__PURE__ */ jsx(AdSection, { adConfig: ad }, ad.slot);
        }),
        /* @__PURE__ */ jsx(
          FormSwitch,
          {
            name: "client.ads.disable",
            className: "mb-30",
            description: /* @__PURE__ */ jsx(Trans, { message: "Disable all add related functionality across the site." }),
            children: /* @__PURE__ */ jsx(Trans, { message: "Disable ads" })
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            variant: "flat",
            color: "primary",
            disabled: updateSettings.isPending,
            children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
          }
        )
      ]
    }
  );
}
function AdSection({ adConfig }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-24", children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        className: "mb-30 flex-auto",
        name: `client.${adConfig.slot}`,
        inputElementType: "textarea",
        rows: 8,
        label: /* @__PURE__ */ jsx(Trans, { ...adConfig.description })
      }
    ),
    /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "cursor-zoom-in overflow-hidden rounded outline-none transition hover:scale-105 focus-visible:ring max-md:hidden",
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: adConfig.image,
              className: "h-[186px] w-auto border",
              alt: "Ad slot example"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(ImageZoomDialog, { image: adConfig.image })
    ] })
  ] });
}
function SectionList() {
  const sections = useAppearanceStore((s) => {
    var _a2;
    return (_a2 = s.config) == null ? void 0 : _a2.sections;
  });
  const sortedSection = useMemo(() => {
    if (!sections)
      return [];
    return Object.entries(sections || []).map(([key, value]) => {
      return {
        ...value,
        key
      };
    }).sort((a, b) => ((a == null ? void 0 : a.position) || 1) - ((b == null ? void 0 : b.position) || 1));
  }, [sections]);
  return /* @__PURE__ */ jsx(Fragment, { children: sortedSection.map((section) => {
    return /* @__PURE__ */ jsx(
      AppearanceButton,
      {
        to: section.key,
        elementType: NavLink,
        children: /* @__PURE__ */ jsx(Trans, { ...section.label })
      },
      section.key
    );
  }) });
}
const RoleIndexPageFilters = [
  {
    key: "type",
    label: message("Type"),
    description: message("Type of the role"),
    defaultOperator: FilterOperator.ne,
    control: {
      type: FilterControlType.Select,
      defaultValue: "01",
      options: [
        {
          key: "01",
          label: message("Sitewide"),
          value: "sitewide"
        },
        {
          key: "02",
          label: message("Workspace"),
          value: "workspace"
        }
      ]
    }
  },
  createdAtFilter({
    description: message("Date role was created")
  }),
  updatedAtFilter({
    description: message("Date role was last updated")
  })
];
const columnConfig$8 = [
  {
    key: "name",
    allowsSorting: true,
    visibleInMode: "all",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Role" }),
    body: (role) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Trans, { message: role.name }) }),
      /* @__PURE__ */ jsx("div", { className: "text-muted text-xs overflow-x-hidden overflow-ellipsis", children: role.description ? /* @__PURE__ */ jsx(Trans, { message: role.description }) : void 0 })
    ] })
  },
  {
    key: "type",
    maxWidth: "max-w-100",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Type" }),
    body: (role) => /* @__PURE__ */ jsx(Trans, { message: role.type })
  },
  {
    key: "updated_at",
    maxWidth: "max-w-100",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Last updated" }),
    body: (role) => /* @__PURE__ */ jsx(FormattedDate, { date: role.updated_at })
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    hideHeader: true,
    visibleInMode: "all",
    align: "end",
    width: "w-42 flex-shrink-0",
    body: (role) => {
      return /* @__PURE__ */ jsx(Link, { to: `${role.id}/edit`, children: /* @__PURE__ */ jsx(IconButton, { size: "md", className: "text-muted", children: /* @__PURE__ */ jsx(EditIcon, {}) }) });
    }
  }
];
function RolesIndexPage() {
  return /* @__PURE__ */ jsx(
    DataTablePage,
    {
      endpoint: "roles",
      title: /* @__PURE__ */ jsx(Trans, { message: "Roles" }),
      columns: columnConfig$8,
      filters: RoleIndexPageFilters,
      actions: /* @__PURE__ */ jsx(Actions$9, {}),
      selectedActions: /* @__PURE__ */ jsx(DeleteSelectedItemsAction, {}),
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: teamSvg,
          title: /* @__PURE__ */ jsx(Trans, { message: "No roles have been created yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching roles" })
        }
      )
    }
  );
}
function Actions$9() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(DataTableExportCsvButton, { endpoint: "roles/csv/export" }),
    /* @__PURE__ */ jsx(DataTableAddItemButton, { elementType: Link, to: "new", children: /* @__PURE__ */ jsx(Trans, { message: "Add new role" }) })
  ] });
}
const Endpoint$6 = (id) => `roles/${id}`;
function useRole() {
  const { roleId } = useParams();
  return useQuery({
    queryKey: [Endpoint$6(roleId)],
    queryFn: () => fetchRole(roleId)
  });
}
function fetchRole(roleId) {
  return apiClient.get(Endpoint$6(roleId)).then((response) => response.data);
}
const Endpoint$5 = (id) => `roles/${id}`;
function useUpdateRole() {
  const { trans } = useTrans();
  const navigate = useNavigate$1();
  return useMutation({
    mutationFn: (payload) => updateRole(payload),
    onSuccess: (response) => {
      toast(trans(message("Role updated")));
      queryClient.invalidateQueries({ queryKey: [Endpoint$5(response.role.id)] });
      queryClient.invalidateQueries({ queryKey: DatatableDataQueryKey("roles") });
      navigate("/admin/roles");
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function updateRole({ id, ...payload }) {
  return apiClient.put(Endpoint$5(id), payload).then((r) => r.data);
}
function CrupdateRolePageSettingsPanel({
  isInternal = false
}) {
  const { trans } = useTrans();
  const { workspaces } = useSettings();
  const { watch } = useFormContext();
  const watchedType = watch("type");
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Name" }),
        name: "name",
        className: "mb-20",
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Description" }),
        name: "description",
        inputElementType: "textarea",
        placeholder: trans(message("Role description...")),
        rows: 4,
        className: "mb-20"
      }
    ),
    workspaces.integrated && /* @__PURE__ */ jsxs(
      FormSelect,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Type" }),
        name: "type",
        selectionMode: "single",
        className: "mb-20",
        description: /* @__PURE__ */ jsx(Trans, { message: "Whether this role will be assigned to users globally on the site or only within workspaces." }),
        children: [
          /* @__PURE__ */ jsx(Item, { value: "sitewide", children: /* @__PURE__ */ jsx(Trans, { message: "Sitewide" }) }),
          /* @__PURE__ */ jsx(Item, { value: "workspace", children: /* @__PURE__ */ jsx(Trans, { message: "Workspace" }) })
        ]
      }
    ),
    !isInternal && /* @__PURE__ */ jsxs(Fragment$1, { children: [
      /* @__PURE__ */ jsx(
        FormSwitch,
        {
          name: "default",
          className: "mb-20",
          description: /* @__PURE__ */ jsx(Trans, { message: "Assign this role to new users automatically." }),
          children: /* @__PURE__ */ jsx(Trans, { message: "Default" })
        }
      ),
      watchedType === "sitewide" && /* @__PURE__ */ jsx(
        FormSwitch,
        {
          name: "guests",
          description: /* @__PURE__ */ jsx(Trans, { message: "Assign this role to guests (not logged in users)." }),
          children: /* @__PURE__ */ jsx(Trans, { message: "Guests" })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("h2", { className: "mb-10 mt-30 text-lg", children: /* @__PURE__ */ jsx(Trans, { message: "Permissions" }) }),
    /* @__PURE__ */ jsx(
      FormPermissionSelector,
      {
        name: "permissions",
        valueListKey: watchedType === "sitewide" ? "permissions" : "workspacePermissions"
      }
    )
  ] });
}
function SelectUserDialog({ onUserSelected }) {
  var _a2;
  const { close } = useDialogContext();
  const [searchTerm, setSearchTerm] = useState("");
  const { trans } = useTrans();
  const query = useNormalizedModels("normalized-models/user", {
    query: searchTerm,
    perPage: 14
  });
  const users = ((_a2 = query.data) == null ? void 0 : _a2.results) || [];
  const emptyStateMessage = /* @__PURE__ */ jsx(
    IllustratedMessage,
    {
      className: "pt-20",
      size: "sm",
      title: /* @__PURE__ */ jsx(Trans, { message: "No matching users" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Try another search query" }),
      image: /* @__PURE__ */ jsx(SvgImage, { src: teamSvg })
    }
  );
  const selectUser = (user) => {
    close();
    onUserSelected(user);
  };
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Select a user" }) }),
    /* @__PURE__ */ jsxs(DialogBody, { children: [
      /* @__PURE__ */ jsx(
        TextField,
        {
          autoFocus: true,
          className: "mb-20",
          startAdornment: /* @__PURE__ */ jsx(SearchIcon, {}),
          placeholder: trans(message("Search for user by name or email")),
          value: searchTerm,
          onChange: (e) => {
            setSearchTerm(e.target.value);
          }
        }
      ),
      !query.isLoading && !users.length && emptyStateMessage,
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-x-10", children: users.map((user) => /* @__PURE__ */ jsx(
        UserListItem,
        {
          user,
          onUserSelected: selectUser
        },
        user.id
      )) })
    ] })
  ] });
}
function UserListItem({ user, onUserSelected }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "flex items-center gap-10 rounded p-10 outline-none ring-offset-4 hover:bg-hover focus-visible:ring",
      role: "button",
      tabIndex: 0,
      onClick: () => {
        onUserSelected(user);
      },
      onKeyDown: (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onUserSelected(user);
        }
      },
      children: [
        /* @__PURE__ */ jsx(Avatar, { src: user.image }),
        /* @__PURE__ */ jsxs("div", { className: "overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "overflow-hidden text-ellipsis", children: user.name }),
          /* @__PURE__ */ jsx("div", { className: "overflow-hidden text-ellipsis text-muted", children: user.description })
        ] })
      ]
    },
    user.id
  );
}
function useRemoveUsersFromRole(role) {
  return useMutation({
    mutationFn: ({ userIds }) => removeUsersFromRole({ userIds, roleId: role.id }),
    onSuccess: (response, payload) => {
      toast(
        message("Removed [one 1 user|other :count users] from “{role}“", {
          values: { count: payload.userIds.length, role: role.name }
        })
      );
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function removeUsersFromRole({
  roleId,
  userIds
}) {
  return apiClient.post(`roles/${roleId}/remove-users`, { userIds }).then((r) => r.data);
}
function useAddUsersToRole(role) {
  return useMutation({
    mutationFn: ({ userIds }) => addUsersToRole({ userIds, roleId: role.id }),
    onSuccess: (response, payload) => {
      toast(
        message("Assigned [one 1 user|other :count users] to {role}", {
          values: { count: payload.userIds.length, role: role.name }
        })
      );
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function addUsersToRole({
  roleId,
  userIds
}) {
  return apiClient.post(`roles/${roleId}/add-users`, { userIds }).then((r) => r.data);
}
const userColumn = {
  key: "name",
  allowsSorting: true,
  sortingKey: "email",
  header: () => /* @__PURE__ */ jsx(Trans, { message: "User" }),
  body: (user) => /* @__PURE__ */ jsx(
    NameWithAvatar,
    {
      image: user.avatar,
      label: user.display_name,
      description: user.email
    }
  ),
  width: "col-w-3"
};
const desktopColumns = [
  userColumn,
  {
    key: "first_name",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "First name" }),
    body: (user) => user.first_name
  },
  {
    key: "last_name",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Last name" }),
    body: (user) => user.last_name
  },
  {
    key: "created_at",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Assigned at" }),
    body: (user) => /* @__PURE__ */ jsx(FormattedDate, { date: user.created_at })
  }
];
const mobileColumns = [userColumn];
function EditRolePageUsersPanel({
  role
}) {
  const isMobile = useIsMobileMediaQuery();
  if (role.guests || role.type === "workspace") {
    return /* @__PURE__ */ jsx("div", { className: "pt-30 pb-10", children: /* @__PURE__ */ jsx(
      DataTableEmptyStateMessage,
      {
        image: teamSvg,
        title: /* @__PURE__ */ jsx(Trans, { message: "Users can't be assigned to this role" })
      }
    ) });
  }
  return /* @__PURE__ */ jsx(
    DataTable,
    {
      endpoint: "users",
      columns: isMobile ? mobileColumns : desktopColumns,
      queryParams: { roleId: `${role.id}` },
      actions: /* @__PURE__ */ jsx(AssignUserAction, { role }),
      selectedActions: /* @__PURE__ */ jsx(RemoveUsersAction, { role }),
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: teamSvg,
          title: /* @__PURE__ */ jsx(Trans, { message: "No users have been assigned to this role yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching users" })
        }
      )
    }
  );
}
function AssignUserAction({ role }) {
  const addUsers = useAddUsersToRole(role);
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(Button, { variant: "flat", color: "primary", disabled: addUsers.isPending, children: /* @__PURE__ */ jsx(Trans, { message: "Assign user" }) }),
    /* @__PURE__ */ jsx(
      SelectUserDialog,
      {
        onUserSelected: (user) => {
          addUsers.mutate(
            { userIds: [user.id] },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({
                  queryKey: DatatableDataQueryKey("users", {
                    roleId: `${role.id}`
                  })
                });
              }
            }
          );
        }
      }
    )
  ] });
}
function RemoveUsersAction({ role }) {
  const removeUsers = useRemoveUsersFromRole(role);
  const { selectedRows } = useDataTable();
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "modal",
      onClose: (isConfirmed) => {
        if (isConfirmed) {
          removeUsers.mutate(
            { userIds: selectedRows },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({
                  queryKey: DatatableDataQueryKey("users", {
                    roleId: `${role.id}`
                  })
                });
              }
            }
          );
        }
      },
      children: [
        /* @__PURE__ */ jsx(Button, { variant: "flat", color: "danger", disabled: removeUsers.isPending, children: /* @__PURE__ */ jsx(Trans, { message: "Remove users" }) }),
        /* @__PURE__ */ jsx(
          ConfirmationDialog,
          {
            title: /* @__PURE__ */ jsx(
              Trans,
              {
                message: "Remove [one 1 user|other :count users] from “:name“ role?",
                values: { count: selectedRows.length, name: role.name }
              }
            ),
            body: /* @__PURE__ */ jsx(Trans, { message: "This will permanently remove the users." }),
            confirm: /* @__PURE__ */ jsx(Trans, { message: "Remove" }),
            isDanger: true
          }
        )
      ]
    }
  );
}
function EditRolePage() {
  const query = useRole();
  if (query.status !== "success") {
    return /* @__PURE__ */ jsx(FullPageLoader, {});
  }
  return /* @__PURE__ */ jsx(PageContent$3, { role: query.data.role });
}
function PageContent$3({ role }) {
  const form = useForm({ defaultValues: role });
  const updateRole2 = useUpdateRole();
  return /* @__PURE__ */ jsx(
    CrupdateResourceLayout,
    {
      form,
      onSubmit: (values) => {
        updateRole2.mutate(values);
      },
      title: /* @__PURE__ */ jsx(Trans, { message: "Edit “:name“ role", values: { name: role.name } }),
      isLoading: updateRole2.isPending,
      children: /* @__PURE__ */ jsxs(Tabs, { isLazy: true, children: [
        /* @__PURE__ */ jsxs(TabList, { children: [
          /* @__PURE__ */ jsx(Tab, { children: /* @__PURE__ */ jsx(Trans, { message: "Settings" }) }),
          /* @__PURE__ */ jsx(Tab, { children: /* @__PURE__ */ jsx(Trans, { message: "Users" }) })
        ] }),
        /* @__PURE__ */ jsxs(TabPanels, { className: "pt-20", children: [
          /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(CrupdateRolePageSettingsPanel, { isInternal: role.internal }) }),
          /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(EditRolePageUsersPanel, { role }) })
        ] })
      ] })
    }
  );
}
const Endpoint$4 = "roles";
function useCreateRole(form) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (payload) => createRole(payload),
    onSuccess: () => {
      toast(trans(message("Created new role")));
      queryClient.invalidateQueries({ queryKey: DatatableDataQueryKey("roles") });
    },
    onError: (r) => onFormQueryError(r, form)
  });
}
function createRole({ id, ...payload }) {
  return apiClient.post(Endpoint$4, payload).then((r) => r.data);
}
function CreateRolePage() {
  const form = useForm({ defaultValues: { type: "sitewide" } });
  const createRole2 = useCreateRole(form);
  const navigate = useNavigate$1();
  return /* @__PURE__ */ jsx(
    CrupdateResourceLayout,
    {
      form,
      onSubmit: (values) => {
        createRole2.mutate(values, {
          onSuccess: (response) => {
            navigate(`/admin/roles/${response.role.id}/edit`);
          }
        });
      },
      title: /* @__PURE__ */ jsx(Trans, { message: "Add new role" }),
      isLoading: createRole2.isPending,
      children: /* @__PURE__ */ jsx(CrupdateRolePageSettingsPanel, {})
    }
  );
}
const TagIndexPageFilters = (types) => {
  return [
    {
      key: "type",
      label: message("Type"),
      description: message("Type of the tag"),
      defaultOperator: FilterOperator.ne,
      control: {
        type: FilterControlType.Select,
        defaultValue: types[0].name,
        options: types.map((type) => ({
          key: type.name,
          label: message(type.name),
          value: type.name
        }))
      }
    },
    createdAtFilter({
      description: message("Date tag was created")
    }),
    updatedAtFilter({
      description: message("Date tag was last updated")
    })
  ];
};
const softwareEngineerSvg = "/assets/software-engineer-d9a74757.svg";
function CrupdateTagForm({
  form,
  onSubmit,
  formId
}) {
  const {
    tags: { types }
  } = useContext(SiteConfigContext);
  const watchedType = form.watch("type");
  const isSystem = !!types.find((t) => t.name === watchedType && t.system);
  return /* @__PURE__ */ jsxs(Form$1, { id: formId, form, onSubmit, children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: "name",
        label: /* @__PURE__ */ jsx(Trans, { message: "Name" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Unique tag identifier." }),
        className: "mb-20",
        required: true,
        autoFocus: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: "display_name",
        label: /* @__PURE__ */ jsx(Trans, { message: "Display name" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "User friendly tag name." }),
        className: "mb-20"
      }
    ),
    /* @__PURE__ */ jsx(
      FormSelect,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Type" }),
        name: "type",
        selectionMode: "single",
        disabled: isSystem,
        children: types.filter((t) => !t.system).map((type) => /* @__PURE__ */ jsx(Item, { value: type.name, children: /* @__PURE__ */ jsx(Trans, { message: type.name }) }, type.name))
      }
    )
  ] });
}
function useCreateNewTag(form) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (props) => createNewTag$2(props),
    onSuccess: () => {
      toast(trans(message("Tag created")));
      queryClient.invalidateQueries({ queryKey: DatatableDataQueryKey("tags") });
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function createNewTag$2(payload) {
  payload.name = slugifyString(payload.name);
  return apiClient.post("tags", payload).then((r) => r.data);
}
function CreateTagDialog() {
  const { close, formId } = useDialogContext();
  const {
    tags: { types }
  } = useContext(SiteConfigContext);
  const form = useForm({
    defaultValues: {
      type: types[0].name
    }
  });
  const createNewTag2 = useCreateNewTag(form);
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Add new tag" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      CrupdateTagForm,
      {
        formId,
        form,
        onSubmit: (values) => {
          createNewTag2.mutate(values, {
            onSuccess: () => {
              close();
            }
          });
        }
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: () => {
            close();
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          form: formId,
          disabled: createNewTag2.isPending,
          variant: "flat",
          color: "primary",
          type: "submit",
          children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
        }
      )
    ] })
  ] });
}
function useUpdateTag(form) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (props) => updateTag(props),
    onSuccess: () => {
      toast(trans(message("Tag updated")));
      queryClient.invalidateQueries({ queryKey: DatatableDataQueryKey("tags") });
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function updateTag({ id, ...payload }) {
  if (payload.name) {
    payload.name = slugifyString(payload.name);
  }
  return apiClient.put(`tags/${id}`, payload).then((r) => r.data);
}
function UpdateTagDialog({ tag }) {
  const { close, formId } = useDialogContext();
  const form = useForm({
    defaultValues: {
      id: tag.id,
      name: tag.name,
      display_name: tag.display_name,
      type: tag.type
    }
  });
  const updateTag2 = useUpdateTag(form);
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Update “:name“ tag", values: { name: tag.name } }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      CrupdateTagForm,
      {
        formId,
        form,
        onSubmit: (values) => {
          updateTag2.mutate(values, {
            onSuccess: () => {
              close();
            }
          });
        }
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: () => {
            close();
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          form: formId,
          disabled: updateTag2.isPending,
          variant: "flat",
          color: "primary",
          type: "submit",
          children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
        }
      )
    ] })
  ] });
}
const columnConfig$7 = [
  {
    key: "name",
    allowsSorting: true,
    visibleInMode: "all",
    width: "flex-3 min-w-200",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Name" }),
    body: (tag) => tag.name
  },
  {
    key: "type",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Type" }),
    body: (tag) => tag.type
  },
  {
    key: "display_name",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Display name" }),
    body: (tag) => tag.display_name
  },
  {
    key: "updated_at",
    allowsSorting: true,
    width: "w-100",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Last updated" }),
    body: (tag) => /* @__PURE__ */ jsx(FormattedDate, { date: tag.updated_at })
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    hideHeader: true,
    align: "end",
    width: "w-42 flex-shrink-0",
    visibleInMode: "all",
    body: (tag) => {
      return /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
        /* @__PURE__ */ jsx(IconButton, { size: "md", className: "text-muted", children: /* @__PURE__ */ jsx(EditIcon, {}) }),
        /* @__PURE__ */ jsx(UpdateTagDialog, { tag })
      ] });
    }
  }
];
function TagIndexPage() {
  const { tags } = useContext(SiteConfigContext);
  const filters = useMemo(() => {
    return TagIndexPageFilters(tags.types);
  }, [tags.types]);
  return /* @__PURE__ */ jsx(
    DataTablePage,
    {
      endpoint: "tags",
      title: /* @__PURE__ */ jsx(Trans, { message: "Tags" }),
      columns: columnConfig$7,
      filters,
      actions: /* @__PURE__ */ jsx(Actions$8, {}),
      selectedActions: /* @__PURE__ */ jsx(DeleteSelectedItemsAction, {}),
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: softwareEngineerSvg,
          title: /* @__PURE__ */ jsx(Trans, { message: "No tags have been created yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching tags" })
        }
      )
    }
  );
}
function Actions$8() {
  return /* @__PURE__ */ jsx(Fragment$1, { children: /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(DataTableAddItemButton, { children: /* @__PURE__ */ jsx(Trans, { message: "Add new tag" }) }),
    /* @__PURE__ */ jsx(CreateTagDialog, {})
  ] }) });
}
const FormattedBytes = memo(({ bytes }) => {
  return /* @__PURE__ */ jsx(Fragment, { children: prettyBytes(bytes) });
});
const VisibilityIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z" }),
  "VisibilityOutlined"
);
const uploadSvg = "/assets/upload-0bbdc60b.svg";
const FileEntryUrlsContext = React.createContext(null);
function useFileEntryUrls(entry, options) {
  const { base_url } = useSettings();
  const urlSearchParams = useContext(FileEntryUrlsContext);
  return useMemo(() => {
    if (!entry) {
      return {};
    }
    let previewUrl;
    if (entry.url) {
      previewUrl = isAbsoluteUrl(entry.url) ? entry.url : `${base_url}/${entry.url}`;
    }
    const urls = {
      previewUrl,
      downloadUrl: `${base_url}/api/v1/file-entries/download/${(options == null ? void 0 : options.downloadHashes) || entry.hash}`
    };
    if (urlSearchParams) {
      if (urls.previewUrl) {
        urls.previewUrl = addParams(
          urls.previewUrl,
          { ...urlSearchParams, thumbnail: (options == null ? void 0 : options.thumbnail) ? "true" : "" },
          base_url
        );
      }
      urls.downloadUrl = addParams(urls.downloadUrl, urlSearchParams, base_url);
    }
    return urls;
  }, [
    base_url,
    entry,
    options == null ? void 0 : options.downloadHashes,
    options == null ? void 0 : options.thumbnail,
    urlSearchParams
  ]);
}
function addParams(urlString, params, baseUrl) {
  const url = new URL(urlString, baseUrl);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  return url.toString();
}
const FilePreviewContext = React.createContext(
  null
);
function DefaultFilePreview({ message: message2, className, allowDownload }) {
  const { entries, activeIndex } = useContext(FilePreviewContext);
  const activeEntry = entries[activeIndex];
  const content = message2 || /* @__PURE__ */ jsx(Trans, { message: "No file preview available" });
  const { downloadUrl } = useFileEntryUrls(activeEntry);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        className,
        "shadow bg-background max-w-400 w-[calc(100%-40px)] text-center p-40 rounded"
      ),
      children: [
        /* @__PURE__ */ jsx("div", { className: "text-lg", children: content }),
        allowDownload && /* @__PURE__ */ jsx("div", { className: "block mt-20 text-center", children: /* @__PURE__ */ jsx(
          Button,
          {
            variant: "flat",
            color: "primary",
            onClick: () => {
              if (downloadUrl) {
                downloadFileFromUrl(downloadUrl);
              }
            },
            children: /* @__PURE__ */ jsx(Trans, { message: "Download" })
          }
        ) })
      ]
    }
  );
}
function ImageFilePreview(props) {
  const { entry, className } = props;
  const { trans } = useTrans();
  const { previewUrl } = useFileEntryUrls(entry);
  if (!previewUrl) {
    return /* @__PURE__ */ jsx(DefaultFilePreview, { ...props });
  }
  return /* @__PURE__ */ jsx(
    "img",
    {
      className: clsx(className, "shadow"),
      src: previewUrl,
      alt: trans({
        message: "Preview for :name",
        values: { name: entry.name }
      })
    }
  );
}
const FIVE_MB = 5242880;
function TextFilePreview(props) {
  const { entry, className } = props;
  const { trans } = useTrans();
  const [tooLarge, setTooLarge] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFailed, setIsFailed] = useState(false);
  const [contents, setContents] = useState(null);
  const { previewUrl } = useFileEntryUrls(entry);
  useEffect(() => {
    if (!entry)
      return;
    if (!previewUrl) {
      setIsFailed(true);
    } else if (entry.file_size >= FIVE_MB) {
      setTooLarge(true);
      setIsLoading(false);
    } else {
      getFileContents(previewUrl).then((response) => {
        setContents(response.data);
      }).catch(() => {
        setIsFailed(true);
      }).finally(() => {
        setIsLoading(false);
      });
    }
  }, [entry, previewUrl]);
  if (isLoading) {
    return /* @__PURE__ */ jsx(
      ProgressCircle,
      {
        isIndeterminate: true,
        "aria-label": trans({ message: "Loading file contents" })
      }
    );
  }
  if (tooLarge) {
    return /* @__PURE__ */ jsx(
      DefaultFilePreview,
      {
        ...props,
        message: /* @__PURE__ */ jsx(Trans, { message: "This file is too large to preview." })
      }
    );
  }
  if (isFailed) {
    return /* @__PURE__ */ jsx(
      DefaultFilePreview,
      {
        ...props,
        message: /* @__PURE__ */ jsx(Trans, { message: "There was an issue previewing this file" })
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "pre",
    {
      className: clsx(
        "rounded bg-background p-20 text-sm whitespace-pre-wrap break-words h-full overflow-y-auto w-full",
        className
      ),
      children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: `${contents}` })
    }
  );
}
function getFileContents(src) {
  return apiClient.get(src, {
    responseType: "text",
    // required for s3 presigned url to work
    withCredentials: false,
    headers: {
      Accept: "text/plain"
    }
  });
}
function VideoFilePreview(props) {
  const { entry, className } = props;
  const { previewUrl } = useFileEntryUrls(entry);
  const ref = useRef(null);
  const [mediaInvalid, setMediaInvalid] = useState(false);
  useEffect(() => {
    var _a2;
    setMediaInvalid(!((_a2 = ref.current) == null ? void 0 : _a2.canPlayType(entry.mime)));
  }, [entry]);
  if (mediaInvalid || !previewUrl) {
    return /* @__PURE__ */ jsx(DefaultFilePreview, { ...props });
  }
  return /* @__PURE__ */ jsx(
    "video",
    {
      className,
      ref,
      controls: true,
      controlsList: "nodownload noremoteplayback",
      playsInline: true,
      autoPlay: true,
      children: /* @__PURE__ */ jsx(
        "source",
        {
          src: previewUrl,
          type: entry.mime,
          onError: () => {
            setMediaInvalid(true);
          }
        }
      )
    }
  );
}
function AudioFilePreview(props) {
  const { entry, className } = props;
  const { previewUrl } = useFileEntryUrls(entry);
  const ref = useRef(null);
  const [mediaInvalid, setMediaInvalid] = useState(false);
  useEffect(() => {
    var _a2;
    setMediaInvalid(!((_a2 = ref.current) == null ? void 0 : _a2.canPlayType(entry.mime)));
  }, [entry]);
  if (mediaInvalid || !previewUrl) {
    return /* @__PURE__ */ jsx(DefaultFilePreview, { ...props });
  }
  return /* @__PURE__ */ jsx(
    "audio",
    {
      className,
      ref,
      controls: true,
      controlsList: "nodownload noremoteplayback",
      autoPlay: true,
      children: /* @__PURE__ */ jsx(
        "source",
        {
          src: previewUrl,
          type: entry.mime,
          onError: () => {
            setMediaInvalid(true);
          }
        }
      )
    }
  );
}
function PdfFilePreview(props) {
  const { entry, className } = props;
  const { trans } = useTrans();
  const { previewUrl } = useFileEntryUrls(entry);
  if (!previewUrl) {
    return /* @__PURE__ */ jsx(DefaultFilePreview, { ...props });
  }
  return /* @__PURE__ */ jsx(
    "iframe",
    {
      title: trans({
        message: "Preview for :name",
        values: { name: entry.name }
      }),
      className: clsx(className, "w-full h-full"),
      src: `${previewUrl}#toolbar=0`
    }
  );
}
function WordDocumentFilePreview(props) {
  const { entry, className } = props;
  const { trans } = useTrans();
  const ref = useRef(null);
  const [showDefault, setShowDefault] = useState(false);
  const timeoutId = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const { previewUrl } = useFileEntryUrls(entry);
  useEffect(() => {
    if (!previewUrl) {
      setShowDefault(true);
    } else if (entry.file_size && entry.file_size > 25e6) {
      setShowDefault(true);
    } else if (ref.current) {
      ref.current.onload = () => {
        clearTimeout(timeoutId.current);
        setIsLoading(false);
      };
      buildPreviewUrl(previewUrl, entry).then((url) => {
        if (ref.current) {
          ref.current.src = url;
        }
      });
      timeoutId.current = setTimeout(() => {
        setShowDefault(true);
      }, 5e3);
    }
  }, [entry, previewUrl]);
  if (showDefault) {
    return /* @__PURE__ */ jsx(DefaultFilePreview, { ...props });
  }
  return /* @__PURE__ */ jsxs("div", { className: clsx(className, "w-full h-full"), children: [
    isLoading && /* @__PURE__ */ jsx(ProgressCircle, {}),
    /* @__PURE__ */ jsx(
      "iframe",
      {
        ref,
        title: trans({
          message: "Preview for :name",
          values: { name: entry.name }
        }),
        className: clsx("w-full h-full", isLoading && "hidden")
      }
    )
  ] });
}
async function buildPreviewUrl(urlString, entry) {
  const url = new URL(urlString);
  if (!url.searchParams.has("shareable_link")) {
    const { data } = await apiClient.post(
      `file-entries/${entry.id}/add-preview-token`
    );
    url.searchParams.append("preview_token", data.preview_token);
  }
  return buildOfficeLivePreviewUrl(url);
}
function buildOfficeLivePreviewUrl(url) {
  return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
    url.toString()
  )}`;
}
const AvailablePreviews = {
  text: TextFilePreview,
  video: VideoFilePreview,
  audio: AudioFilePreview,
  image: ImageFilePreview,
  pdf: PdfFilePreview,
  spreadsheet: WordDocumentFilePreview,
  powerPoint: WordDocumentFilePreview,
  word: WordDocumentFilePreview,
  "text/rtf": DefaultFilePreview
};
function getPreviewForEntry(entry) {
  const mime = entry == null ? void 0 : entry.mime;
  const type = entry == null ? void 0 : entry.type;
  return AvailablePreviews[mime] || AvailablePreviews[type] || DefaultFilePreview;
}
const ChevronLeftIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" }),
  "ChevronLeftOutlined"
);
const DefaultFileIcon = createSvgIcon(
  /* @__PURE__ */ jsx("g", { children: /* @__PURE__ */ jsx("path", { d: "M 23.65625 4 C 22.320313 4 21.066406 4.519531 20.121094 5.464844 L 11.464844 14.121094 C 10.519531 15.066406 10 16.320313 10 17.65625 L 10 57 C 10 58.652344 11.347656 60 13 60 L 53 60 C 54.652344 60 56 58.652344 56 57 L 56 7 C 56 5.347656 54.652344 4 53 4 Z M 24 6 L 53 6 C 53.550781 6 54 6.449219 54 7 L 54 57 C 54 57.550781 53.550781 58 53 58 L 13 58 C 12.449219 58 12 57.550781 12 57 L 12 18 L 21 18 C 22.652344 18 24 16.652344 24 15 Z M 22 6.5 L 22 15 C 22 15.550781 21.550781 16 21 16 L 12.5 16 C 12.605469 15.835938 12.734375 15.679688 12.878906 15.535156 L 21.535156 6.878906 C 21.679688 6.738281 21.835938 6.613281 22 6.5 Z M 21 22 C 20.449219 22 20 22.449219 20 23 C 20 23.550781 20.449219 24 21 24 L 37 24 C 37.550781 24 38 23.550781 38 23 C 38 22.449219 37.550781 22 37 22 Z M 41 22 C 40.449219 22 40 22.449219 40 23 C 40 23.550781 40.449219 24 41 24 L 45 24 C 45.550781 24 46 23.550781 46 23 C 46 22.449219 45.550781 22 45 22 Z M 21 26 C 20.449219 26 20 26.449219 20 27 C 20 27.550781 20.449219 28 21 28 L 41 28 C 41.550781 28 42 27.550781 42 27 C 42 26.449219 41.550781 26 41 26 Z M 21 32 C 20.449219 32 20 32.449219 20 33 C 20 33.550781 20.449219 34 21 34 L 43 34 C 43.550781 34 44 33.550781 44 33 C 44 32.449219 43.550781 32 43 32 Z M 21 36 C 20.449219 36 20 36.449219 20 37 C 20 37.550781 20.449219 38 21 38 L 33 38 C 33.550781 38 34 37.550781 34 37 C 34 36.449219 33.550781 36 33 36 Z M 15 50 C 14.449219 50 14 50.449219 14 51 L 14 53 C 14 53.550781 14.449219 54 15 54 C 15.550781 54 16 53.550781 16 53 L 16 51 C 16 50.449219 15.550781 50 15 50 Z M 20 50 C 19.449219 50 19 50.449219 19 51 L 19 53 C 19 53.550781 19.449219 54 20 54 C 20.550781 54 21 53.550781 21 53 L 21 51 C 21 50.449219 20.550781 50 20 50 Z M 25 50 C 24.449219 50 24 50.449219 24 51 L 24 53 C 24 53.550781 24.449219 54 25 54 C 25.550781 54 26 53.550781 26 53 L 26 51 C 26 50.449219 25.550781 50 25 50 Z M 30 50 C 29.449219 50 29 50.449219 29 51 L 29 53 C 29 53.550781 29.449219 54 30 54 C 30.550781 54 31 53.550781 31 53 L 31 51 C 31 50.449219 30.550781 50 30 50 Z M 35 50 C 34.449219 50 34 50.449219 34 51 L 34 53 C 34 53.550781 34.449219 54 35 54 C 35.550781 54 36 53.550781 36 53 L 36 51 C 36 50.449219 35.550781 50 35 50 Z M 40 50 C 39.449219 50 39 50.449219 39 51 L 39 53 C 39 53.550781 39.449219 54 40 54 C 40.550781 54 41 53.550781 41 53 L 41 51 C 41 50.449219 40.550781 50 40 50 Z M 45 50 C 44.449219 50 44 50.449219 44 51 L 44 53 C 44 53.550781 44.449219 54 45 54 C 45.550781 54 46 53.550781 46 53 L 46 51 C 46 50.449219 45.550781 50 45 50 Z M 50 50 C 49.449219 50 49 50.449219 49 51 L 49 53 C 49 53.550781 49.449219 54 50 54 C 50.550781 54 51 53.550781 51 53 L 51 51 C 51 50.449219 50.550781 50 50 50 Z " }) })
);
const AudioFileIcon = createSvgIcon(
  /* @__PURE__ */ jsx("g", { children: /* @__PURE__ */ jsx("path", { d: "M 21.65625 4 C 20.320313 4 19.0625 4.519531 18.121094 5.464844 L 9.464844 14.121094 C 8.519531 15.066406 8 16.320313 8 17.65625 L 8 57 C 8 58.652344 9.347656 60 11 60 L 51 60 C 52.652344 60 54 58.652344 54 57 L 54 7 C 54 5.347656 52.652344 4 51 4 Z M 22 6 L 51 6 C 51.550781 6 52 6.449219 52 7 L 52 57 C 52 57.550781 51.550781 58 51 58 L 11 58 C 10.449219 58 10 57.550781 10 57 L 10 18 L 19 18 C 20.652344 18 22 16.652344 22 15 Z M 20 6.5 L 20 15 C 20 15.550781 19.550781 16 19 16 L 10.5 16 C 10.609375 15.835938 10.734375 15.679688 10.878906 15.535156 L 19.535156 6.878906 C 19.679688 6.734375 19.835938 6.609375 20 6.5 Z M 42.78125 18.023438 L 24.78125 22.023438 C 24.328125 22.125 24 22.53125 24 23 L 24 37 C 20.691406 37 18 39.242188 18 42 C 18 44.757813 20.691406 47 24 47 C 27.308594 47 30 44.757813 30 42 L 30 29.910156 L 38 28.136719 L 38 33 C 34.691406 33 32 35.242188 32 38 C 32 40.757813 34.691406 43 38 43 C 41.308594 43 44 40.757813 44 38 L 44 19 C 44 18.695313 43.863281 18.410156 43.625 18.21875 C 43.390625 18.03125 43.082031 17.960938 42.78125 18.023438 Z M 42 20.246094 L 42 38 C 42 39.652344 40.207031 41 38 41 C 35.792969 41 34 39.652344 34 38 C 34 36.347656 35.792969 35 38 35 C 38.28125 35 38.5625 35.023438 38.839844 35.066406 C 39.128906 35.117188 39.421875 35.03125 39.648438 34.84375 C 39.871094 34.652344 40 34.375 40 34.078125 L 40 26.890625 C 40 26.585938 39.863281 26.300781 39.625 26.109375 C 39.390625 25.921875 39.078125 25.847656 38.78125 25.910156 L 28.78125 28.136719 C 28.328125 28.238281 28 28.644531 28 29.109375 L 28 42 C 28 43.652344 26.207031 45 24 45 C 21.792969 45 20 43.652344 20 42 C 20 40.347656 21.792969 39 24 39 C 24.28125 39 24.5625 39.023438 24.839844 39.066406 C 25.128906 39.117188 25.425781 39.03125 25.648438 38.84375 C 25.871094 38.652344 26 38.375 26 38.078125 L 26 23.800781 Z M 13 52 C 12.449219 52 12 52.445313 12 53 L 12 55 C 12 55.554688 12.449219 56 13 56 C 13.550781 56 14 55.554688 14 55 L 14 53 C 14 52.445313 13.550781 52 13 52 Z M 18 52 C 17.449219 52 17 52.445313 17 53 L 17 55 C 17 55.554688 17.449219 56 18 56 C 18.550781 56 19 55.554688 19 55 L 19 53 C 19 52.445313 18.550781 52 18 52 Z M 23 52 C 22.449219 52 22 52.445313 22 53 L 22 55 C 22 55.554688 22.449219 56 23 56 C 23.550781 56 24 55.554688 24 55 L 24 53 C 24 52.445313 23.550781 52 23 52 Z M 28 52 C 27.449219 52 27 52.445313 27 53 L 27 55 C 27 55.554688 27.449219 56 28 56 C 28.550781 56 29 55.554688 29 55 L 29 53 C 29 52.445313 28.550781 52 28 52 Z M 33 52 C 32.449219 52 32 52.445313 32 53 L 32 55 C 32 55.554688 32.449219 56 33 56 C 33.550781 56 34 55.554688 34 55 L 34 53 C 34 52.445313 33.550781 52 33 52 Z M 38 52 C 37.449219 52 37 52.445313 37 53 L 37 55 C 37 55.554688 37.449219 56 38 56 C 38.550781 56 39 55.554688 39 55 L 39 53 C 39 52.445313 38.550781 52 38 52 Z M 43 52 C 42.449219 52 42 52.445313 42 53 L 42 55 C 42 55.554688 42.449219 56 43 56 C 43.550781 56 44 55.554688 44 55 L 44 53 C 44 52.445313 43.550781 52 43 52 Z M 48 52 C 47.449219 52 47 52.445313 47 53 L 47 55 C 47 55.554688 47.449219 56 48 56 C 48.550781 56 49 55.554688 49 55 L 49 53 C 49 52.445313 48.550781 52 48 52 Z " }) })
);
const VideoFileIcon = createSvgIcon(
  /* @__PURE__ */ jsx("g", { children: /* @__PURE__ */ jsx("path", { d: "M 23.65625 4 C 22.320313 4 21.0625 4.519531 20.121094 5.464844 L 11.464844 14.121094 C 10.519531 15.066406 10 16.320313 10 17.65625 L 10 57 C 10 58.652344 11.347656 60 13 60 L 53 60 C 54.652344 60 56 58.652344 56 57 L 56 7 C 56 5.347656 54.652344 4 53 4 Z M 24 6 L 53 6 C 53.550781 6 54 6.449219 54 7 L 54 57 C 54 57.550781 53.550781 58 53 58 L 13 58 C 12.449219 58 12 57.550781 12 57 L 12 18 L 21 18 C 22.652344 18 24 16.652344 24 15 Z M 22 6.5 L 22 15 C 22 15.550781 21.550781 16 21 16 L 12.5 16 C 12.613281 15.835938 12.738281 15.675781 12.878906 15.535156 L 21.535156 6.878906 C 21.679688 6.734375 21.835938 6.609375 22 6.5 Z M 28.023438 21.816406 C 27.671875 21.808594 27.316406 21.890625 26.996094 22.0625 C 26.355469 22.417969 25.964844 23.085938 25.964844 23.816406 L 25.964844 42.183594 C 25.964844 42.910156 26.355469 43.582031 26.996094 43.933594 C 27.296875 44.097656 27.632813 44.183594 27.964844 44.183594 C 28.335938 44.183594 28.707031 44.078125 29.03125 43.871094 L 43.53125 34.6875 C 44.113281 34.320313 44.464844 33.6875 44.464844 33 C 44.464844 32.308594 44.113281 31.679688 43.53125 31.3125 L 29.03125 22.125 C 28.722656 21.933594 28.375 21.828125 28.023438 21.816406 Z M 27.964844 23.816406 L 42.464844 33 L 27.964844 42.1875 Z M 15 52 C 14.449219 52 14 52.449219 14 53 L 14 55 C 14 55.550781 14.449219 56 15 56 C 15.550781 56 16 55.550781 16 55 L 16 53 C 16 52.449219 15.550781 52 15 52 Z M 20 52 C 19.449219 52 19 52.449219 19 53 L 19 55 C 19 55.550781 19.449219 56 20 56 C 20.550781 56 21 55.550781 21 55 L 21 53 C 21 52.449219 20.550781 52 20 52 Z M 25 52 C 24.449219 52 24 52.449219 24 53 L 24 55 C 24 55.550781 24.449219 56 25 56 C 25.550781 56 26 55.550781 26 55 L 26 53 C 26 52.449219 25.550781 52 25 52 Z M 30 52 C 29.449219 52 29 52.449219 29 53 L 29 55 C 29 55.550781 29.449219 56 30 56 C 30.550781 56 31 55.550781 31 55 L 31 53 C 31 52.449219 30.550781 52 30 52 Z M 35 52 C 34.449219 52 34 52.449219 34 53 L 34 55 C 34 55.550781 34.449219 56 35 56 C 35.550781 56 36 55.550781 36 55 L 36 53 C 36 52.449219 35.550781 52 35 52 Z M 40 52 C 39.449219 52 39 52.449219 39 53 L 39 55 C 39 55.550781 39.449219 56 40 56 C 40.550781 56 41 55.550781 41 55 L 41 53 C 41 52.449219 40.550781 52 40 52 Z M 45 52 C 44.449219 52 44 52.449219 44 53 L 44 55 C 44 55.550781 44.449219 56 45 56 C 45.550781 56 46 55.550781 46 55 L 46 53 C 46 52.449219 45.550781 52 45 52 Z M 50 52 C 49.449219 52 49 52.449219 49 53 L 49 55 C 49 55.550781 49.449219 56 50 56 C 50.550781 56 51 55.550781 51 55 L 51 53 C 51 52.449219 50.550781 52 50 52 Z " }) })
);
const TextFileIcon = createSvgIcon(
  /* @__PURE__ */ jsx("g", { children: /* @__PURE__ */ jsx("path", { d: "M 17.660156 4 C 16.320313 4 15.058594 4.519531 14.121094 5.460938 L 5.460938 14.121094 C 4.519531 15.070313 4 16.320313 4 17.660156 L 4 57 C 4 58.648438 5.351563 60 7 60 L 47 60 C 48.648438 60 50 58.648438 50 57 L 50 46 L 58 46 C 59.101563 46 60 45.101563 60 44 L 60 24 C 60 22.898438 59.101563 22 58 22 L 50 22 L 50 7 C 50 5.351563 48.648438 4 47 4 Z M 18 6 L 47 6 C 47.550781 6 48 6.449219 48 7 L 48 22 L 16 22 C 14.898438 22 14 22.898438 14 24 L 14 44 C 14 45.101563 14.898438 46 16 46 L 48 46 L 48 57 C 48 57.550781 47.550781 58 47 58 L 7 58 C 6.449219 58 6 57.550781 6 57 L 6 18 L 15 18 C 16.652344 18 18 16.652344 18 15 Z M 16 6.5 L 16 15 C 16 15.550781 15.550781 16 15 16 L 6.5 16 C 6.613281 15.835938 6.738281 15.679688 6.882813 15.539063 L 15.539063 6.882813 C 15.679688 6.738281 15.835938 6.609375 16 6.5 Z M 16 24 L 58 24 L 58 44 L 16 44 Z M 24 28 C 23.449219 28 23 28.445313 23 29 C 23 29.554688 23.449219 30 24 30 L 26 30 L 26 39 C 26 39.554688 26.449219 40 27 40 C 27.550781 40 28 39.554688 28 39 L 28 30 L 30 30 C 30.550781 30 31 29.554688 31 29 C 31 28.445313 30.550781 28 30 28 Z M 44 28 C 43.449219 28 43 28.445313 43 29 C 43 29.554688 43.449219 30 44 30 L 46 30 L 46 39 C 46 39.554688 46.449219 40 47 40 C 47.550781 40 48 39.554688 48 39 L 48 30 L 50 30 C 50.550781 30 51 29.554688 51 29 C 51 28.445313 50.550781 28 50 28 Z M 33.859375 28.011719 C 33.730469 28.027344 33.601563 28.070313 33.484375 28.140625 C 33.011719 28.425781 32.859375 29.039063 33.140625 29.515625 L 35.832031 34 L 33.140625 38.484375 C 32.859375 38.957031 33.011719 39.574219 33.484375 39.859375 C 33.644531 39.953125 33.824219 40 34 40 C 34.339844 40 34.671875 39.828125 34.859375 39.515625 L 37 35.941406 L 39.140625 39.515625 C 39.328125 39.828125 39.660156 40 40 40 C 40.175781 40 40.355469 39.953125 40.515625 39.859375 C 40.988281 39.574219 41.140625 38.957031 40.859375 38.484375 L 38.167969 34 L 40.859375 29.515625 C 41.140625 29.042969 40.988281 28.425781 40.515625 28.140625 C 40.042969 27.859375 39.425781 28.011719 39.140625 28.484375 L 37 32.058594 L 34.859375 28.484375 C 34.644531 28.128906 34.246094 27.957031 33.859375 28.011719 Z M 9 52 C 8.449219 52 8 52.445313 8 53 L 8 55 C 8 55.554688 8.449219 56 9 56 C 9.550781 56 10 55.554688 10 55 L 10 53 C 10 52.445313 9.550781 52 9 52 Z M 14 52 C 13.449219 52 13 52.445313 13 53 L 13 55 C 13 55.554688 13.449219 56 14 56 C 14.550781 56 15 55.554688 15 55 L 15 53 C 15 52.445313 14.550781 52 14 52 Z M 19 52 C 18.449219 52 18 52.445313 18 53 L 18 55 C 18 55.554688 18.449219 56 19 56 C 19.550781 56 20 55.554688 20 55 L 20 53 C 20 52.445313 19.550781 52 19 52 Z M 24 52 C 23.449219 52 23 52.445313 23 53 L 23 55 C 23 55.554688 23.449219 56 24 56 C 24.550781 56 25 55.554688 25 55 L 25 53 C 25 52.445313 24.550781 52 24 52 Z M 29 52 C 28.449219 52 28 52.445313 28 53 L 28 55 C 28 55.554688 28.449219 56 29 56 C 29.550781 56 30 55.554688 30 55 L 30 53 C 30 52.445313 29.550781 52 29 52 Z M 34 52 C 33.449219 52 33 52.445313 33 53 L 33 55 C 33 55.554688 33.449219 56 34 56 C 34.550781 56 35 55.554688 35 55 L 35 53 C 35 52.445313 34.550781 52 34 52 Z M 39 52 C 38.449219 52 38 52.445313 38 53 L 38 55 C 38 55.554688 38.449219 56 39 56 C 39.550781 56 40 55.554688 40 55 L 40 53 C 40 52.445313 39.550781 52 39 52 Z M 44 52 C 43.449219 52 43 52.445313 43 53 L 43 55 C 43 55.554688 43.449219 56 44 56 C 44.550781 56 45 55.554688 45 55 L 45 53 C 45 52.445313 44.550781 52 44 52 Z " }) })
);
const PdfFileIcon = createSvgIcon(
  /* @__PURE__ */ jsx("g", { children: /* @__PURE__ */ jsx("path", { d: "M 17.65625 4 C 16.320313 4 15.066406 4.519531 14.121094 5.464844 L 5.464844 14.121094 C 4.519531 15.066406 4 16.320313 4 17.65625 L 4 57 C 4 58.652344 5.347656 60 7 60 L 47 60 C 48.652344 60 50 58.652344 50 57 L 50 46 L 58 46 C 59.101563 46 60 45.101563 60 44 L 60 24 C 60 22.898438 59.101563 22 58 22 L 50 22 L 50 7 C 50 5.347656 48.652344 4 47 4 Z M 18 6 L 47 6 C 47.550781 6 48 6.449219 48 7 L 48 22 L 16 22 C 14.898438 22 14 22.898438 14 24 L 14 44 C 14 45.101563 14.898438 46 16 46 L 48 46 L 48 57 C 48 57.550781 47.550781 58 47 58 L 7 58 C 6.449219 58 6 57.550781 6 57 L 6 18 L 15 18 C 16.652344 18 18 16.652344 18 15 Z M 16 6.5 L 16 15 C 16 15.550781 15.550781 16 15 16 L 6.5 16 C 6.609375 15.835938 6.734375 15.679688 6.878906 15.535156 L 15.535156 6.878906 C 15.679688 6.734375 15.835938 6.609375 16 6.5 Z M 16 24 L 58 24 L 58 44 L 16 44 Z M 25 28 C 24.445313 28 24 28.449219 24 29 L 24 39 C 24 39.550781 24.445313 40 25 40 C 25.554688 40 26 39.550781 26 39 L 26 36 L 29 36 C 30.652344 36 32 34.652344 32 33 L 32 31 C 32 29.347656 30.652344 28 29 28 Z M 35 28 C 34.445313 28 34 28.449219 34 29 L 34 39 C 34 39.550781 34.445313 40 35 40 L 38 40 C 40.207031 40 42 38.207031 42 36 L 42 32 C 42 29.792969 40.207031 28 38 28 Z M 45 28 C 44.445313 28 44 28.449219 44 29 L 44 39 C 44 39.550781 44.445313 40 45 40 C 45.554688 40 46 39.550781 46 39 L 46 36 L 49 36 C 49.554688 36 50 35.550781 50 35 C 50 34.449219 49.554688 34 49 34 L 46 34 L 46 30 L 50 30 C 50.554688 30 51 29.550781 51 29 C 51 28.449219 50.554688 28 50 28 Z M 26 30 L 29 30 C 29.550781 30 30 30.449219 30 31 L 30 33 C 30 33.550781 29.550781 34 29 34 L 26 34 Z M 36 30 L 38 30 C 39.101563 30 40 30.898438 40 32 L 40 36 C 40 37.101563 39.101563 38 38 38 L 36 38 Z M 9 52 C 8.445313 52 8 52.449219 8 53 L 8 55 C 8 55.550781 8.445313 56 9 56 C 9.554688 56 10 55.550781 10 55 L 10 53 C 10 52.449219 9.554688 52 9 52 Z M 14 52 C 13.445313 52 13 52.449219 13 53 L 13 55 C 13 55.550781 13.445313 56 14 56 C 14.554688 56 15 55.550781 15 55 L 15 53 C 15 52.449219 14.554688 52 14 52 Z M 19 52 C 18.445313 52 18 52.449219 18 53 L 18 55 C 18 55.550781 18.445313 56 19 56 C 19.554688 56 20 55.550781 20 55 L 20 53 C 20 52.449219 19.554688 52 19 52 Z M 24 52 C 23.445313 52 23 52.449219 23 53 L 23 55 C 23 55.550781 23.445313 56 24 56 C 24.554688 56 25 55.550781 25 55 L 25 53 C 25 52.449219 24.554688 52 24 52 Z M 29 52 C 28.445313 52 28 52.449219 28 53 L 28 55 C 28 55.550781 28.445313 56 29 56 C 29.554688 56 30 55.550781 30 55 L 30 53 C 30 52.449219 29.554688 52 29 52 Z M 34 52 C 33.445313 52 33 52.449219 33 53 L 33 55 C 33 55.550781 33.445313 56 34 56 C 34.554688 56 35 55.550781 35 55 L 35 53 C 35 52.449219 34.554688 52 34 52 Z M 39 52 C 38.445313 52 38 52.449219 38 53 L 38 55 C 38 55.550781 38.445313 56 39 56 C 39.554688 56 40 55.550781 40 55 L 40 53 C 40 52.449219 39.554688 52 39 52 Z M 44 52 C 43.445313 52 43 52.449219 43 53 L 43 55 C 43 55.550781 43.445313 56 44 56 C 44.554688 56 45 55.550781 45 55 L 45 53 C 45 52.449219 44.554688 52 44 52 Z " }) })
);
const ArchiveFileIcon = createSvgIcon(
  /* @__PURE__ */ jsx("g", { children: /* @__PURE__ */ jsx("path", { d: "M 21.65625 4 C 20.320313 4 19.066406 4.519531 18.121094 5.464844 L 9.464844 14.121094 C 8.519531 15.066406 8 16.320313 8 17.65625 L 8 57 C 8 58.652344 9.347656 60 11 60 L 51 60 C 52.652344 60 54 58.652344 54 57 L 54 7 C 54 5.347656 52.652344 4 51 4 Z M 22 6 L 36 6 L 36 27.59375 C 35.144531 27.222656 34.210938 27 33.226563 27 L 32.773438 27 C 31.789063 27 30.859375 27.222656 30 27.59375 L 30 9 C 30 8.449219 29.554688 8 29 8 C 28.449219 8 28 8.449219 28 9 L 28 28.902344 C 27.015625 29.824219 26.277344 31.023438 25.953125 32.425781 L 24.875 37.097656 C 24.597656 38.292969 24.878906 39.53125 25.640625 40.488281 C 26.40625 41.449219 27.546875 42 28.769531 42 L 37.230469 42 C 38.457031 42 39.59375 41.449219 40.359375 40.488281 C 41.121094 39.53125 41.402344 38.292969 41.125 37.097656 L 40.046875 32.425781 C 39.726563 31.023438 38.984375 29.824219 38 28.902344 L 38 6 L 51 6 C 51.550781 6 52 6.449219 52 7 L 52 57 C 52 57.550781 51.550781 58 51 58 L 11 58 C 10.449219 58 10 57.550781 10 57 L 10 18 L 19 18 C 20.652344 18 22 16.652344 22 15 Z M 20 6.5 L 20 15 C 20 15.550781 19.550781 16 19 16 L 10.5 16 C 10.609375 15.835938 10.734375 15.679688 10.878906 15.535156 L 19.535156 6.878906 C 19.679688 6.738281 19.835938 6.609375 20 6.5 Z M 32 8 C 31.449219 8 31 8.445313 31 9 C 31 9.554688 31.449219 10 32 10 L 34 10 C 34.550781 10 35 9.554688 35 9 C 35 8.445313 34.550781 8 34 8 Z M 32 13 C 31.449219 13 31 13.445313 31 14 C 31 14.554688 31.449219 15 32 15 L 34 15 C 34.550781 15 35 14.554688 35 14 C 35 13.445313 34.550781 13 34 13 Z M 32 18 C 31.449219 18 31 18.445313 31 19 C 31 19.554688 31.449219 20 32 20 L 34 20 C 34.550781 20 35 19.554688 35 19 C 35 18.445313 34.550781 18 34 18 Z M 32 23 C 31.449219 23 31 23.445313 31 24 C 31 24.554688 31.449219 25 32 25 L 34 25 C 34.550781 25 35 24.554688 35 24 C 35 23.445313 34.550781 23 34 23 Z M 32.773438 29 L 33.226563 29 C 35.570313 29 37.574219 30.59375 38.097656 32.875 L 39.175781 37.550781 C 39.316406 38.148438 39.175781 38.765625 38.796875 39.246094 C 38.414063 39.722656 37.839844 40 37.230469 40 L 28.769531 40 C 28.160156 40 27.589844 39.722656 27.207031 39.246094 C 26.824219 38.765625 26.683594 38.148438 26.824219 37.550781 L 27.902344 32.875 C 28.429688 30.59375 30.429688 29 32.773438 29 Z M 31 34 C 30.449219 34 30 34.445313 30 35 C 30 35.554688 30.449219 36 31 36 L 35 36 C 35.550781 36 36 35.554688 36 35 C 36 34.445313 35.550781 34 35 34 Z M 13 52 C 12.449219 52 12 52.445313 12 53 C 12 53.554688 12.449219 54 13 54 L 17 54 C 17.550781 54 18 53.554688 18 53 C 18 52.445313 17.550781 52 17 52 Z M 21 52 C 20.449219 52 20 52.445313 20 53 C 20 53.554688 20.449219 54 21 54 L 49 54 C 49.550781 54 50 53.554688 50 53 C 50 52.445313 49.550781 52 49 52 Z " }) })
);
const FolderFileIcon = createSvgIcon(
  /* @__PURE__ */ jsx("g", { children: /* @__PURE__ */ jsx("path", { d: "M 5 10 C 3.300781 10 2 11.300781 2 13 L 2 52 C 2 54.199219 3.800781 56 6 56 L 60 56 C 62.199219 56 64 54.199219 64 52 L 64 23 C 64 21.300781 62.699219 20 61 20 L 58 20 L 58 19 C 58 17.300781 56.699219 16 55 16 L 29.699219 16 C 28.898438 16 28.199219 15.699219 27.597656 15.097656 L 23.902344 11.402344 C 23 10.5 21.699219 10 20.402344 10 Z M 5 12 L 20.402344 12 C 21.199219 12 21.898438 12.300781 22.5 12.902344 L 26.199219 16.597656 C 27.097656 17.5 28.398438 18 29.699219 18 L 55 18 C 55.601563 18 56 18.398438 56 19 L 56 52 C 56 52.601563 56.199219 53.300781 56.597656 54 L 6 54 C 4.898438 54 4 53.101563 4 52 L 4 46 L 45 46 C 45.601563 46 46 45.601563 46 45 C 46 44.398438 45.601563 44 45 44 L 4 44 L 4 13 C 4 12.398438 4.398438 12 5 12 Z M 58 22 L 61 22 C 61.601563 22 62 22.398438 62 23 L 62 52 C 62 53.101563 61.101563 54 60 54 C 58.800781 54 58 52.601563 58 52 Z M 11 24 C 10.398438 24 10 24.398438 10 25 C 10 25.601563 10.398438 26 11 26 L 21 26 C 21.601563 26 22 25.601563 22 25 C 22 24.398438 21.601563 24 21 24 Z M 25 24 C 24.398438 24 24 24.398438 24 25 C 24 25.601563 24.398438 26 25 26 L 31 26 C 31.601563 26 32 25.601563 32 25 C 32 24.398438 31.601563 24 31 24 Z M 11 28 C 10.398438 28 10 28.398438 10 29 C 10 29.601563 10.398438 30 11 30 L 15 30 C 15.601563 30 16 29.601563 16 29 C 16 28.398438 15.601563 28 15 28 Z M 19 28 C 18.398438 28 18 28.398438 18 29 C 18 29.601563 18.398438 30 19 30 L 26 30 C 26.601563 30 27 29.601563 27 29 C 27 28.398438 26.601563 28 26 28 Z M 49 44 C 48.398438 44 48 44.398438 48 45 C 48 45.601563 48.398438 46 49 46 L 53 46 C 53.601563 46 54 45.601563 54 45 C 54 44.398438 53.601563 44 53 44 Z M 7 48 C 6.398438 48 6 48.398438 6 49 L 6 51 C 6 51.601563 6.398438 52 7 52 C 7.601563 52 8 51.601563 8 51 L 8 49 C 8 48.398438 7.601563 48 7 48 Z M 12 48 C 11.398438 48 11 48.398438 11 49 L 11 51 C 11 51.601563 11.398438 52 12 52 C 12.601563 52 13 51.601563 13 51 L 13 49 C 13 48.398438 12.601563 48 12 48 Z M 17 48 C 16.398438 48 16 48.398438 16 49 L 16 51 C 16 51.601563 16.398438 52 17 52 C 17.601563 52 18 51.601563 18 51 L 18 49 C 18 48.398438 17.601563 48 17 48 Z M 22 48 C 21.398438 48 21 48.398438 21 49 L 21 51 C 21 51.601563 21.398438 52 22 52 C 22.601563 52 23 51.601563 23 51 L 23 49 C 23 48.398438 22.601563 48 22 48 Z M 27 48 C 26.398438 48 26 48.398438 26 49 L 26 51 C 26 51.601563 26.398438 52 27 52 C 27.601563 52 28 51.601563 28 51 L 28 49 C 28 48.398438 27.601563 48 27 48 Z M 32 48 C 31.398438 48 31 48.398438 31 49 L 31 51 C 31 51.601563 31.398438 52 32 52 C 32.601563 52 33 51.601563 33 51 L 33 49 C 33 48.398438 32.601563 48 32 48 Z M 37 48 C 36.398438 48 36 48.398438 36 49 L 36 51 C 36 51.601563 36.398438 52 37 52 C 37.601563 52 38 51.601563 38 51 L 38 49 C 38 48.398438 37.601563 48 37 48 Z M 42 48 C 41.398438 48 41 48.398438 41 49 L 41 51 C 41 51.601563 41.398438 52 42 52 C 42.601563 52 43 51.601563 43 51 L 43 49 C 43 48.398438 42.601563 48 42 48 Z M 47 48 C 46.398438 48 46 48.398438 46 49 L 46 51 C 46 51.601563 46.398438 52 47 52 C 47.601563 52 48 51.601563 48 51 L 48 49 C 48 48.398438 47.601563 48 47 48 Z M 52 48 C 51.398438 48 51 48.398438 51 49 L 51 51 C 51 51.601563 51.398438 52 52 52 C 52.601563 52 53 51.601563 53 51 L 53 49 C 53 48.398438 52.601563 48 52 48 Z " }) })
);
const ImageFileIcon = createSvgIcon(
  /* @__PURE__ */ jsx("g", { children: /* @__PURE__ */ jsx("path", { d: "M 21.65625 4 C 20.320313 4 19.066406 4.519531 18.121094 5.464844 L 9.464844 14.121094 C 8.519531 15.066406 8 16.320313 8 17.65625 L 8 57 C 8 58.652344 9.347656 60 11 60 L 51 60 C 52.652344 60 54 58.652344 54 57 L 54 7 C 54 5.347656 52.652344 4 51 4 Z M 22 6 L 51 6 C 51.550781 6 52 6.449219 52 7 L 52 57 C 52 57.550781 51.550781 58 51 58 L 11 58 C 10.449219 58 10 57.550781 10 57 L 10 18 L 19 18 C 20.652344 18 22 16.652344 22 15 Z M 20 6.5 L 20 15 C 20 15.550781 19.550781 16 19 16 L 10.5 16 C 10.605469 15.835938 10.734375 15.679688 10.878906 15.535156 L 19.535156 6.878906 C 19.679688 6.738281 19.835938 6.613281 20 6.5 Z M 20 24 C 17.792969 24 16 25.792969 16 28 C 16 30.207031 17.792969 32 20 32 C 22.207031 32 24 30.207031 24 28 C 24 25.792969 22.207031 24 20 24 Z M 20 25.75 C 21.242188 25.75 22.25 26.757813 22.25 28 C 22.25 29.242188 21.242188 30.25 20 30.25 C 18.757813 30.25 17.75 29.242188 17.75 28 C 17.75 26.757813 18.757813 25.75 20 25.75 Z M 37 30.414063 C 36.488281 30.414063 35.976563 30.609375 35.585938 31 L 29 37.585938 L 26.414063 35 C 25.632813 34.21875 24.363281 34.21875 23.585938 35 L 14.585938 44 L 13.042969 44 C 12.417969 44 12 44.398438 12 45 C 12 45.601563 12.523438 46 13.042969 46 L 48.980469 46 C 49.5 46 50.023438 45.601563 50.023438 45 C 50.023438 44.398438 49.5 44 48.980469 44 L 25.414063 44 L 37 32.414063 L 45.292969 40.707031 C 45.683594 41.097656 46.316406 41.097656 46.707031 40.707031 C 47.097656 40.316406 47.097656 39.683594 46.707031 39.292969 L 38.414063 31 C 38.023438 30.609375 37.511719 30.414063 37 30.414063 Z M 25 36.414063 L 27.585938 39 L 22.585938 44 L 17.414063 44 Z M 13 52 C 12.449219 52 12 52.449219 12 53 L 12 55 C 12 55.550781 12.449219 56 13 56 C 13.550781 56 14 55.550781 14 55 L 14 53 C 14 52.449219 13.550781 52 13 52 Z M 18 52 C 17.449219 52 17 52.449219 17 53 L 17 55 C 17 55.550781 17.449219 56 18 56 C 18.550781 56 19 55.550781 19 55 L 19 53 C 19 52.449219 18.550781 52 18 52 Z M 23 52 C 22.449219 52 22 52.449219 22 53 L 22 55 C 22 55.550781 22.449219 56 23 56 C 23.550781 56 24 55.550781 24 55 L 24 53 C 24 52.449219 23.550781 52 23 52 Z M 28 52 C 27.449219 52 27 52.449219 27 53 L 27 55 C 27 55.550781 27.449219 56 28 56 C 28.550781 56 29 55.550781 29 55 L 29 53 C 29 52.449219 28.550781 52 28 52 Z M 33 52 C 32.449219 52 32 52.449219 32 53 L 32 55 C 32 55.550781 32.449219 56 33 56 C 33.550781 56 34 55.550781 34 55 L 34 53 C 34 52.449219 33.550781 52 33 52 Z M 38 52 C 37.449219 52 37 52.449219 37 53 L 37 55 C 37 55.550781 37.449219 56 38 56 C 38.550781 56 39 55.550781 39 55 L 39 53 C 39 52.449219 38.550781 52 38 52 Z M 43 52 C 42.449219 52 42 52.449219 42 53 L 42 55 C 42 55.550781 42.449219 56 43 56 C 43.550781 56 44 55.550781 44 55 L 44 53 C 44 52.449219 43.550781 52 43 52 Z M 48 52 C 47.449219 52 47 52.449219 47 53 L 47 55 C 47 55.550781 47.449219 56 48 56 C 48.550781 56 49 55.550781 49 55 L 49 53 C 49 52.449219 48.550781 52 48 52 Z " }) })
);
const PowerPointFileIcon = createSvgIcon(
  /* @__PURE__ */ jsx("g", { children: /* @__PURE__ */ jsx("path", { d: "M 35.136719 2.386719 C 34.917969 2.378906 34.699219 2.390625 34.480469 2.429688 L 5.304688 7.578125 C 3.390625 7.917969 2 9.574219 2 11.515625 L 2 50.484375 C 2 52.429688 3.390625 54.085938 5.304688 54.421875 L 34.480469 59.570313 C 34.652344 59.601563 34.828125 59.613281 35 59.613281 C 35.703125 59.613281 36.382813 59.371094 36.925781 58.914063 C 37.609375 58.34375 38 57.503906 38 56.613281 L 38 52 L 57 52 C 58.652344 52 60 50.652344 60 49 L 60 13 C 60 11.347656 58.652344 10 57 10 L 38 10 L 38 5.382813 C 38 4.496094 37.609375 3.65625 36.925781 3.085938 C 36.417969 2.65625 35.789063 2.414063 35.136719 2.386719 Z M 35.105469 4.390625 C 35.359375 4.414063 35.542969 4.535156 35.640625 4.617188 C 35.777344 4.730469 36 4.980469 36 5.382813 L 36 56.613281 C 36 57.019531 35.777344 57.269531 35.640625 57.382813 C 35.507813 57.496094 35.226563 57.667969 34.828125 57.601563 L 5.652344 52.453125 C 4.695313 52.285156 4 51.457031 4 50.484375 L 4 11.515625 C 4 10.542969 4.695313 9.714844 5.652344 9.546875 L 34.824219 4.398438 C 34.925781 4.382813 35.019531 4.378906 35.105469 4.390625 Z M 38 12 L 57 12 C 57.550781 12 58 12.449219 58 13 L 58 49 C 58 49.550781 57.550781 50 57 50 L 38 50 L 38 45.949219 L 52.949219 45.949219 C 53.5 45.949219 53.949219 45.554688 53.949219 45 C 53.949219 44.445313 53.5 44 52.949219 44 L 50 44 L 50 41 C 50 40.445313 49.550781 40 49 40 L 46 40 L 46 37 C 46 36.445313 45.550781 36 45 36 L 41 36 C 40.449219 36 40 36.445313 40 37 L 40 39 L 38 39 L 38 32.46875 C 39.46875 33.449219 41.203125 34 43 34 C 47.960938 34 52 29.964844 52 25 C 52 20.035156 47.960938 16 43 16 C 41.1875 16 39.464844 16.535156 38 17.519531 Z M 42 18.078125 L 42 24.832031 C 42 25.027344 42.070313 25.203125 42.171875 25.359375 C 42.21875 25.492188 42.289063 25.617188 42.394531 25.726563 L 47.234375 30.5625 C 46.054688 31.460938 44.589844 32 43 32 C 41.113281 32 39.316406 31.230469 38 29.886719 L 38 20.105469 C 39.089844 18.992188 40.484375 18.292969 42 18.078125 Z M 44 18.078125 C 47.386719 18.566406 50 21.480469 50 25 C 50 26.546875 49.488281 27.976563 48.636719 29.136719 L 44 24.5 Z M 15 20 C 14.449219 20 14 20.445313 14 21 L 14 41 C 14 41.554688 14.449219 42 15 42 C 15.550781 42 16 41.554688 16 41 L 16 34 L 21 34 C 23.757813 34 26 31.757813 26 29 L 26 25 C 26 22.242188 23.757813 20 21 20 Z M 16 22 L 21 22 C 22.652344 22 24 23.347656 24 25 L 24 29 C 24 30.652344 22.652344 32 21 32 L 16 32 Z M 42 38 L 44 38 L 44 44 L 42 44 Z M 38 41 L 40 41 L 40 44 L 38 44 Z M 46 42 L 48 42 L 48 44 L 46 44 Z " }) })
);
const WordFileIcon = createSvgIcon(
  /* @__PURE__ */ jsx("g", { children: /* @__PURE__ */ jsx("path", { d: "M 21.65625 4 C 20.320313 4 19.0625 4.519531 18.121094 5.464844 L 9.464844 14.121094 C 8.519531 15.066406 8 16.320313 8 17.65625 L 8 57 C 8 58.652344 9.347656 60 11 60 L 51 60 C 52.652344 60 54 58.652344 54 57 L 54 7 C 54 5.347656 52.652344 4 51 4 Z M 22 6 L 51 6 C 51.550781 6 52 6.449219 52 7 L 52 57 C 52 57.550781 51.550781 58 51 58 L 11 58 C 10.449219 58 10 57.550781 10 57 L 10 18 L 19 18 C 20.652344 18 22 16.652344 22 15 Z M 20 6.5 L 20 15 C 20 15.550781 19.550781 16 19 16 L 10.5 16 C 10.613281 15.832031 10.738281 15.675781 10.878906 15.535156 L 19.535156 6.878906 C 19.679688 6.734375 19.835938 6.609375 20 6.5 Z M 21.140625 23.011719 C 21.015625 22.992188 20.878906 22.996094 20.746094 23.03125 C 20.210938 23.175781 19.894531 23.722656 20.03125 24.253906 L 25.03125 43.253906 C 25.148438 43.691406 25.539063 43.996094 25.984375 44 L 26 44 C 26.441406 44 26.832031 43.710938 26.957031 43.28125 L 31 29.546875 L 35.042969 43.28125 C 35.167969 43.707031 35.558594 44 36 44 L 36.015625 44 C 36.460938 43.992188 36.851563 43.6875 36.96875 43.253906 L 41.96875 24.253906 C 42.105469 23.722656 41.789063 23.175781 41.253906 23.03125 C 40.71875 22.890625 40.171875 23.210938 40.03125 23.746094 L 35.945313 39.273438 L 31.957031 25.71875 C 31.832031 25.292969 31.445313 25 31 25 C 30.554688 25 30.167969 25.292969 30.042969 25.71875 L 26.054688 39.277344 L 21.96875 23.746094 C 21.863281 23.347656 21.527344 23.066406 21.140625 23.011719 Z M 13 52 C 12.449219 52 12 52.445313 12 53 L 12 55 C 12 55.554688 12.449219 56 13 56 C 13.550781 56 14 55.554688 14 55 L 14 53 C 14 52.445313 13.550781 52 13 52 Z M 18 52 C 17.449219 52 17 52.445313 17 53 L 17 55 C 17 55.554688 17.449219 56 18 56 C 18.550781 56 19 55.554688 19 55 L 19 53 C 19 52.445313 18.550781 52 18 52 Z M 23 52 C 22.449219 52 22 52.445313 22 53 L 22 55 C 22 55.554688 22.449219 56 23 56 C 23.550781 56 24 55.554688 24 55 L 24 53 C 24 52.445313 23.550781 52 23 52 Z M 28 52 C 27.449219 52 27 52.445313 27 53 L 27 55 C 27 55.554688 27.449219 56 28 56 C 28.550781 56 29 55.554688 29 55 L 29 53 C 29 52.445313 28.550781 52 28 52 Z M 33 52 C 32.449219 52 32 52.445313 32 53 L 32 55 C 32 55.554688 32.449219 56 33 56 C 33.550781 56 34 55.554688 34 55 L 34 53 C 34 52.445313 33.550781 52 33 52 Z M 38 52 C 37.449219 52 37 52.445313 37 53 L 37 55 C 37 55.554688 37.449219 56 38 56 C 38.550781 56 39 55.554688 39 55 L 39 53 C 39 52.445313 38.550781 52 38 52 Z M 43 52 C 42.449219 52 42 52.445313 42 53 L 42 55 C 42 55.554688 42.449219 56 43 56 C 43.550781 56 44 55.554688 44 55 L 44 53 C 44 52.445313 43.550781 52 43 52 Z M 48 52 C 47.449219 52 47 52.445313 47 53 L 47 55 C 47 55.554688 47.449219 56 48 56 C 48.550781 56 49 55.554688 49 55 L 49 53 C 49 52.445313 48.550781 52 48 52 Z " }) })
);
const SpreadsheetFileIcon = createSvgIcon(
  /* @__PURE__ */ jsx("g", { children: /* @__PURE__ */ jsx("path", { d: "M 35.136719 2.386719 C 34.917969 2.378906 34.699219 2.390625 34.480469 2.429688 L 5.304688 7.578125 C 3.390625 7.917969 2 9.574219 2 11.515625 L 2 50.484375 C 2 52.429688 3.390625 54.085938 5.304688 54.421875 L 34.480469 59.570313 C 34.652344 59.601563 34.828125 59.613281 35 59.613281 C 35.703125 59.613281 36.382813 59.371094 36.925781 58.914063 C 37.609375 58.34375 38 57.503906 38 56.613281 L 38 52 L 57 52 C 58.652344 52 60 50.652344 60 49 L 60 13 C 60 11.347656 58.652344 10 57 10 L 38 10 L 38 5.382813 C 38 4.496094 37.609375 3.65625 36.925781 3.085938 C 36.417969 2.65625 35.789063 2.414063 35.136719 2.386719 Z M 35.105469 4.390625 C 35.359375 4.414063 35.542969 4.535156 35.640625 4.617188 C 35.777344 4.730469 36 4.980469 36 5.382813 L 36 56.613281 C 36 57.019531 35.777344 57.269531 35.640625 57.382813 C 35.507813 57.496094 35.226563 57.671875 34.828125 57.601563 L 5.652344 52.453125 C 4.695313 52.285156 4 51.457031 4 50.484375 L 4 11.515625 C 4 10.542969 4.695313 9.714844 5.652344 9.546875 L 34.824219 4.398438 C 34.925781 4.382813 35.019531 4.378906 35.105469 4.390625 Z M 38 12 L 57 12 C 57.550781 12 58 12.449219 58 13 L 58 49 C 58 49.550781 57.550781 50 57 50 L 38 50 L 38 44 L 41 44 C 41.550781 44 42 43.554688 42 43 C 42 42.445313 41.550781 42 41 42 L 38 42 L 38 38 L 41 38 C 41.550781 38 42 37.554688 42 37 C 42 36.445313 41.550781 36 41 36 L 38 36 L 38 32 L 41 32 C 41.550781 32 42 31.554688 42 31 C 42 30.445313 41.550781 30 41 30 L 38 30 L 38 26 L 41 26 C 41.550781 26 42 25.554688 42 25 C 42 24.445313 41.550781 24 41 24 L 38 24 L 38 20 L 41 20 C 41.550781 20 42 19.554688 42 19 C 42 18.445313 41.550781 18 41 18 L 38 18 Z M 45 18 C 44.449219 18 44 18.445313 44 19 C 44 19.554688 44.449219 20 45 20 L 51 20 C 51.550781 20 52 19.554688 52 19 C 52 18.445313 51.550781 18 51 18 Z M 12.824219 20.015625 C 12.695313 20.039063 12.570313 20.085938 12.453125 20.160156 C 11.992188 20.460938 11.859375 21.082031 12.160156 21.546875 L 18.308594 31 L 12.160156 40.453125 C 11.859375 40.917969 11.992188 41.539063 12.453125 41.839844 C 12.625 41.949219 12.8125 42 13 42 C 13.324219 42 13.648438 41.839844 13.839844 41.546875 L 19.5 32.835938 L 25.160156 41.546875 C 25.351563 41.839844 25.675781 42 26 42 C 26.1875 42 26.375 41.949219 26.546875 41.839844 C 27.007813 41.539063 27.140625 40.917969 26.839844 40.453125 L 20.691406 31 L 26.839844 21.546875 C 27.140625 21.082031 27.007813 20.460938 26.546875 20.160156 C 26.082031 19.859375 25.460938 19.992188 25.160156 20.453125 L 19.5 29.164063 L 13.839844 20.453125 C 13.613281 20.105469 13.207031 19.945313 12.824219 20.015625 Z M 45 24 C 44.449219 24 44 24.445313 44 25 C 44 25.554688 44.449219 26 45 26 L 51 26 C 51.550781 26 52 25.554688 52 25 C 52 24.445313 51.550781 24 51 24 Z M 45 30 C 44.449219 30 44 30.445313 44 31 C 44 31.554688 44.449219 32 45 32 L 51 32 C 51.550781 32 52 31.554688 52 31 C 52 30.445313 51.550781 30 51 30 Z M 45 36 C 44.449219 36 44 36.445313 44 37 C 44 37.554688 44.449219 38 45 38 L 51 38 C 51.550781 38 52 37.554688 52 37 C 52 36.445313 51.550781 36 51 36 Z M 45 42 C 44.449219 42 44 42.445313 44 43 C 44 43.554688 44.449219 44 45 44 L 51 44 C 51.550781 44 52 43.554688 52 43 C 52 42.445313 51.550781 42 51 42 Z " }) })
);
const SharedFolderFileIcon = createSvgIcon(
  /* @__PURE__ */ jsx("g", { children: /* @__PURE__ */ jsx("path", { d: "M 3 8 C 1.347656 8 0 9.347656 0 11 L 0 52 C 0 54.207031 1.792969 56 4 56 L 58 56 C 60.207031 56 62 54.207031 62 52 L 62 21 C 62 19.347656 60.652344 18 59 18 L 56 18 L 56 17 C 56 15.347656 54.652344 14 53 14 L 27.707031 14 C 26.910156 14 26.164063 13.691406 25.597656 13.132813 L 21.875 9.445313 C 20.929688 8.515625 19.679688 8 18.355469 8 Z M 3 10 L 18.355469 10 C 19.152344 10 19.898438 10.308594 20.464844 10.867188 L 24.1875 14.554688 C 25.132813 15.484375 26.382813 16 27.707031 16 L 53 16 C 53.550781 16 54 16.449219 54 17 L 54 52 C 54 52.617188 54.222656 53.339844 54.632813 54 L 4 54 C 2.898438 54 2 53.101563 2 52 L 2 46 L 43 46 C 43.550781 46 44 45.550781 44 45 C 44 44.449219 43.550781 44 43 44 L 2 44 L 2 11 C 2 10.449219 2.449219 10 3 10 Z M 56 20 L 59 20 C 59.550781 20 60 20.449219 60 21 L 60 52 C 60 53.101563 59.101563 54 58 54 C 56.753906 54 56 52.609375 56 52 Z M 27 22 C 24.242188 22 22 24.242188 22 27 L 22 29 C 22 29.992188 22.300781 30.914063 22.800781 31.691406 C 20.058594 32.886719 17.882813 35.527344 17.28125 38.765625 C 17.179688 39.3125 17.539063 39.832031 18.082031 39.933594 C 18.625 40.035156 19.148438 39.675781 19.25 39.132813 C 19.785156 36.242188 21.863281 33.949219 24.371094 33.234375 C 25.136719 33.710938 26.03125 34 27 34 C 27.96875 34 28.863281 33.710938 29.628906 33.234375 C 32.136719 33.949219 34.214844 36.246094 34.75 39.136719 C 34.839844 39.617188 35.261719 39.953125 35.734375 39.953125 C 35.796875 39.953125 35.855469 39.949219 35.917969 39.9375 C 36.460938 39.835938 36.820313 39.3125 36.71875 38.769531 C 36.117188 35.53125 33.941406 32.886719 31.199219 31.691406 C 31.699219 30.914063 32 29.992188 32 29 L 32 27 C 32 24.242188 29.757813 22 27 22 Z M 27 24 C 28.652344 24 30 25.347656 30 27 L 30 29 C 30 30.652344 28.652344 32 27 32 C 25.347656 32 24 30.652344 24 29 L 24 27 C 24 25.347656 25.347656 24 27 24 Z M 47 44 C 46.449219 44 46 44.449219 46 45 C 46 45.550781 46.449219 46 47 46 L 51 46 C 51.550781 46 52 45.550781 52 45 C 52 44.449219 51.550781 44 51 44 Z M 5 48 C 4.449219 48 4 48.449219 4 49 L 4 51 C 4 51.550781 4.449219 52 5 52 C 5.550781 52 6 51.550781 6 51 L 6 49 C 6 48.449219 5.550781 48 5 48 Z M 10 48 C 9.449219 48 9 48.449219 9 49 L 9 51 C 9 51.550781 9.449219 52 10 52 C 10.550781 52 11 51.550781 11 51 L 11 49 C 11 48.449219 10.550781 48 10 48 Z M 15 48 C 14.449219 48 14 48.449219 14 49 L 14 51 C 14 51.550781 14.449219 52 15 52 C 15.550781 52 16 51.550781 16 51 L 16 49 C 16 48.449219 15.550781 48 15 48 Z M 20 48 C 19.449219 48 19 48.449219 19 49 L 19 51 C 19 51.550781 19.449219 52 20 52 C 20.550781 52 21 51.550781 21 51 L 21 49 C 21 48.449219 20.550781 48 20 48 Z M 25 48 C 24.449219 48 24 48.449219 24 49 L 24 51 C 24 51.550781 24.449219 52 25 52 C 25.550781 52 26 51.550781 26 51 L 26 49 C 26 48.449219 25.550781 48 25 48 Z M 30 48 C 29.449219 48 29 48.449219 29 49 L 29 51 C 29 51.550781 29.449219 52 30 52 C 30.550781 52 31 51.550781 31 51 L 31 49 C 31 48.449219 30.550781 48 30 48 Z M 35 48 C 34.449219 48 34 48.449219 34 49 L 34 51 C 34 51.550781 34.449219 52 35 52 C 35.550781 52 36 51.550781 36 51 L 36 49 C 36 48.449219 35.550781 48 35 48 Z M 40 48 C 39.449219 48 39 48.449219 39 49 L 39 51 C 39 51.550781 39.449219 52 40 52 C 40.550781 52 41 51.550781 41 51 L 41 49 C 41 48.449219 40.550781 48 40 48 Z M 45 48 C 44.449219 48 44 48.449219 44 49 L 44 51 C 44 51.550781 44.449219 52 45 52 C 45.550781 52 46 51.550781 46 51 L 46 49 C 46 48.449219 45.550781 48 45 48 Z M 50 48 C 49.449219 48 49 48.449219 49 49 L 49 51 C 49 51.550781 49.449219 52 50 52 C 50.550781 52 51 51.550781 51 51 L 51 49 C 51 48.449219 50.550781 48 50 48 Z " }) })
);
function FileTypeIcon({ type, mime, className, size }) {
  if (!type && mime) {
    type = mime.split("/")[0];
  }
  const Icon = FileTypeIcons[type] || FileTypeIcons.default;
  return /* @__PURE__ */ jsx(
    Icon,
    {
      size,
      className: clsx(className, `${type}-file-color`),
      viewBox: "0 0 64 64"
    }
  );
}
const FileTypeIcons = {
  default: DefaultFileIcon,
  audio: AudioFileIcon,
  video: VideoFileIcon,
  text: TextFileIcon,
  pdf: PdfFileIcon,
  archive: ArchiveFileIcon,
  folder: FolderFileIcon,
  sharedFolder: SharedFolderFileIcon,
  image: ImageFileIcon,
  powerPoint: PowerPointFileIcon,
  word: WordFileIcon,
  spreadsheet: SpreadsheetFileIcon
};
const TwoMB$1 = 2 * 1024 * 1024;
function FileThumbnail({
  file,
  className,
  iconClassName,
  showImage = true
}) {
  const { trans } = useTrans();
  const { previewUrl } = useFileEntryUrls(file, { thumbnail: true });
  if (file.file_size && file.file_size > TwoMB$1 && !file.thumbnail) {
    showImage = false;
  }
  if (showImage && file.type === "image" && previewUrl) {
    const alt = trans({
      message: ":fileName thumbnail",
      values: { fileName: file.name }
    });
    return /* @__PURE__ */ jsx(
      "img",
      {
        className: clsx(className, "object-cover"),
        src: previewUrl,
        alt,
        draggable: false
      }
    );
  }
  return /* @__PURE__ */ jsx(FileTypeIcon, { className: iconClassName, type: file.type });
}
function FilePreviewContainer({
  entries,
  onClose,
  showHeader = true,
  className,
  headerActionsLeft,
  allowDownload = true,
  ...props
}) {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const [activeIndex, setActiveIndex] = useControlledState(
    props.activeIndex,
    props.defaultActiveIndex || 0,
    props.onActiveIndexChange
  );
  const activeEntry = entries[activeIndex];
  const contextValue = useMemo(() => {
    return { entries, activeIndex };
  }, [entries, activeIndex]);
  const Preview = getPreviewForEntry(activeEntry);
  if (!activeEntry) {
    onClose == null ? void 0 : onClose();
    return null;
  }
  const canOpenNext = entries.length - 1 > activeIndex;
  const openNext = () => {
    setActiveIndex(activeIndex + 1);
  };
  const canOpenPrevious = activeIndex > 0;
  const openPrevious = () => {
    setActiveIndex(activeIndex - 1);
  };
  return /* @__PURE__ */ jsxs(FilePreviewContext.Provider, { value: contextValue, children: [
    showHeader && /* @__PURE__ */ jsx(
      Header$2,
      {
        actionsLeft: headerActionsLeft,
        isMobile,
        onClose,
        onNext: canOpenNext ? openNext : void 0,
        onPrevious: canOpenPrevious ? openPrevious : void 0,
        allowDownload
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: clsx("overflow-hidden relative flex-auto", className), children: [
      isMobile && /* @__PURE__ */ jsx(
        IconButton,
        {
          size: "lg",
          className: "text-muted absolute left-0 top-1/2 transform -translate-y-1/2 z-10",
          disabled: !canOpenPrevious,
          onClick: openPrevious,
          children: /* @__PURE__ */ jsx(KeyboardArrowLeftIcon, {})
        }
      ),
      /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: /* @__PURE__ */ jsx(
        m.div,
        {
          className: "absolute inset-0 flex items-center justify-center",
          ...opacityAnimation,
          children: /* @__PURE__ */ jsx(
            Preview,
            {
              className: "max-h-[calc(100%-30px)]",
              entry: activeEntry,
              allowDownload
            }
          )
        },
        activeEntry.id
      ) }),
      isMobile && /* @__PURE__ */ jsx(
        IconButton,
        {
          size: "lg",
          className: "text-muted absolute right-0 top-1/2 transform -translate-y-1/2 z-10",
          disabled: !canOpenNext,
          onClick: openNext,
          children: /* @__PURE__ */ jsx(KeyboardArrowRightIcon, {})
        }
      )
    ] })
  ] });
}
function Header$2({
  onNext,
  onPrevious,
  onClose,
  isMobile,
  actionsLeft,
  allowDownload
}) {
  const { entries, activeIndex } = useContext(FilePreviewContext);
  const activeEntry = entries[activeIndex];
  const { downloadUrl } = useFileEntryUrls(activeEntry);
  const desktopDownloadButton = /* @__PURE__ */ jsx(
    Button,
    {
      startIcon: /* @__PURE__ */ jsx(FileDownloadIcon, {}),
      variant: "text",
      onClick: () => {
        if (downloadUrl) {
          downloadFileFromUrl(downloadUrl);
        }
      },
      children: /* @__PURE__ */ jsx(Trans, { message: "Download" })
    }
  );
  const mobileDownloadButton = /* @__PURE__ */ jsx(
    IconButton,
    {
      onClick: () => {
        if (downloadUrl) {
          downloadFileFromUrl(downloadUrl);
        }
      },
      children: /* @__PURE__ */ jsx(FileDownloadIcon, {})
    }
  );
  const downloadButton = isMobile ? mobileDownloadButton : desktopDownloadButton;
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-20 bg-background border-b flex-shrink-0 text-sm min-h-50 px-10 text-muted", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 w-1/3 justify-start", children: [
      actionsLeft,
      allowDownload ? downloadButton : void 0
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-10 w-1/3 justify-center flex-nowrap text-main", children: [
      /* @__PURE__ */ jsx(
        FileThumbnail,
        {
          file: activeEntry,
          iconClassName: "w-16 h-16",
          showImage: false
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "whitespace-nowrap overflow-hidden overflow-ellipsis", children: activeEntry.name })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-1/3 flex items-center gap-10 justify-end whitespace-nowrap", children: [
      !isMobile && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(IconButton, { disabled: !onPrevious, onClick: onPrevious, children: /* @__PURE__ */ jsx(ChevronLeftIcon, {}) }),
        /* @__PURE__ */ jsx("div", { children: activeIndex + 1 }),
        /* @__PURE__ */ jsx("div", { children: "/" }),
        /* @__PURE__ */ jsx("div", { children: entries.length }),
        /* @__PURE__ */ jsx(IconButton, { disabled: !onNext, onClick: onNext, children: /* @__PURE__ */ jsx(ChevronRightIcon, {}) }),
        /* @__PURE__ */ jsx("div", { className: "bg-divider w-1 h-24 mx-20" })
      ] }),
      /* @__PURE__ */ jsx(IconButton, { radius: "rounded-none", onClick: onClose, children: /* @__PURE__ */ jsx(CloseIcon, {}) })
    ] })
  ] });
}
function FilePreviewDialog(props) {
  return /* @__PURE__ */ jsx(
    Dialog,
    {
      size: "fullscreenTakeover",
      background: "bg-alt",
      className: "flex flex-col",
      children: /* @__PURE__ */ jsx(Content, { ...props })
    }
  );
}
function Content(props) {
  const { close } = useDialogContext();
  return /* @__PURE__ */ jsx(FilePreviewContainer, { onClose: close, ...props });
}
const FILE_ENTRY_TYPE_FILTER = {
  key: "type",
  label: message("Type"),
  description: message("Type of the file"),
  defaultOperator: FilterOperator.eq,
  control: {
    type: FilterControlType.Select,
    defaultValue: "05",
    options: [
      { key: "02", label: message("Text"), value: "text" },
      {
        key: "03",
        label: message("Audio"),
        value: "audio"
      },
      {
        key: "04",
        label: message("Video"),
        value: "video"
      },
      {
        key: "05",
        label: message("Image"),
        value: "image"
      },
      { key: "06", label: message("PDF"), value: "pdf" },
      {
        key: "07",
        label: message("Spreadsheet"),
        value: "spreadsheet"
      },
      {
        key: "08",
        label: message("Word Document"),
        value: "word"
      },
      {
        key: "09",
        label: message("Photoshop"),
        value: "photoshop"
      },
      {
        key: "10",
        label: message("Archive"),
        value: "archive"
      },
      {
        key: "11",
        label: message("Folder"),
        value: "folder"
      }
    ]
  }
};
const FILE_ENTRY_INDEX_FILTERS = [
  FILE_ENTRY_TYPE_FILTER,
  {
    key: "public",
    label: message("Visibility"),
    description: message("Whether file is publicly accessible"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: "01",
      options: [
        { key: "01", label: message("Private"), value: false },
        { key: "02", label: message("Public"), value: true }
      ]
    }
  },
  createdAtFilter({
    description: message("Date file was uploaded")
  }),
  updatedAtFilter({
    description: message("Date file was last changed")
  }),
  {
    key: "owner_id",
    label: message("Uploader"),
    description: message("User that this file was uploaded by"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.SelectModel,
      model: USER_MODEL
    }
  }
];
const columnConfig$6 = [
  {
    key: "name",
    allowsSorting: true,
    visibleInMode: "all",
    width: "flex-3 min-w-200",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Name" }),
    body: (entry) => /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "overflow-x-hidden overflow-ellipsis", children: entry.name }),
      /* @__PURE__ */ jsx("div", { className: "text-muted text-xs overflow-x-hidden overflow-ellipsis", children: entry.file_name })
    ] })
  },
  {
    key: "owner_id",
    allowsSorting: true,
    width: "flex-3 min-w-200",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Uploader" }),
    body: (entry) => {
      var _a2;
      const user = (_a2 = entry.users) == null ? void 0 : _a2[0];
      if (!user)
        return null;
      return /* @__PURE__ */ jsx(
        NameWithAvatar,
        {
          image: user.avatar,
          label: user.display_name,
          description: user.email
        }
      );
    }
  },
  {
    key: "type",
    width: "w-100 flex-shrink-0",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Type" }),
    body: (entry) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-12", children: [
      /* @__PURE__ */ jsx(FileTypeIcon, { type: entry.type, className: "w-24 h-24 overflow-hidden" }),
      /* @__PURE__ */ jsx("div", { className: "capitalize", children: entry.type })
    ] })
  },
  {
    key: "public",
    allowsSorting: true,
    width: "w-60 flex-shrink-0",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Public" }),
    body: (entry) => entry.public ? /* @__PURE__ */ jsx(CheckIcon, { className: "icon-md text-positive" }) : /* @__PURE__ */ jsx(CloseIcon, { className: "icon-md text-danger" })
  },
  {
    key: "file_size",
    allowsSorting: true,
    maxWidth: "max-w-100",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "File size" }),
    body: (entry) => /* @__PURE__ */ jsx(FormattedBytes, { bytes: entry.file_size })
  },
  {
    key: "updated_at",
    allowsSorting: true,
    width: "w-100",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Last updated" }),
    body: (entry) => /* @__PURE__ */ jsx(FormattedDate, { date: entry.updated_at })
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    hideHeader: true,
    align: "end",
    width: "w-42 flex-shrink-0",
    visibleInMode: "all",
    body: (entry) => {
      return /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
        /* @__PURE__ */ jsx(IconButton, { size: "md", className: "text-muted", children: /* @__PURE__ */ jsx(VisibilityIcon, {}) }),
        /* @__PURE__ */ jsx(FilePreviewDialog, { entries: [entry] })
      ] });
    }
  }
];
function FileEntryIndexPage() {
  return /* @__PURE__ */ jsx(
    DataTablePage,
    {
      endpoint: "file-entries",
      title: /* @__PURE__ */ jsx(Trans, { message: "Uploaded files and folders" }),
      columns: columnConfig$6,
      filters: FILE_ENTRY_INDEX_FILTERS,
      selectedActions: /* @__PURE__ */ jsx(DeleteSelectedItemsAction, {}),
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: uploadSvg,
          title: /* @__PURE__ */ jsx(Trans, { message: "Nothing has been uploaded yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching files or folders" })
        }
      )
    }
  );
}
const SubscriptionIndexPageFilters = [
  {
    key: "ends_at",
    label: message("Status"),
    description: message("Whether subscription is active or cancelled"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: "active",
      options: [
        {
          key: "active",
          label: message("Active"),
          value: { value: null, operator: FilterOperator.eq }
        },
        {
          key: "cancelled",
          label: message("Cancelled"),
          value: { value: null, operator: FilterOperator.ne }
        }
      ]
    }
  },
  {
    control: {
      type: FilterControlType.Select,
      defaultValue: "stripe",
      options: [
        {
          key: "stripe",
          label: message("Stripe"),
          value: "stripe"
        },
        {
          key: "paypal",
          label: message("PayPal"),
          value: "paypal"
        },
        {
          key: "none",
          label: message("None"),
          value: "none"
        }
      ]
    },
    key: "gateway_name",
    label: message("Gateway"),
    description: message(
      "With which payment provider was subscription created"
    ),
    defaultOperator: FilterOperator.eq
  },
  timestampFilter({
    key: "renews_at",
    label: message("Renew date"),
    description: message("Date subscription will renew")
  }),
  createdAtFilter({
    description: message("Date subscription was created")
  }),
  updatedAtFilter({
    description: message("Date subscription was last updated")
  })
];
const subscriptionsSvg = "/assets/subscriptions-43fd6e86.svg";
function useUpdateSubscription(form) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (props) => updateSubscription(props),
    onSuccess: () => {
      toast(trans(message("Subscription updated")));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("billing/subscriptions")
      });
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function updateSubscription({
  id,
  ...payload
}) {
  return apiClient.put(`billing/subscriptions/${id}`, payload).then((r) => r.data);
}
function CrupdateSubscriptionForm({
  form,
  onSubmit,
  formId
}) {
  var _a2, _b;
  const query = useProducts();
  const watchedProductId = form.watch("product_id");
  const selectedProduct = (_a2 = query.data) == null ? void 0 : _a2.products.find(
    (p) => p.id === watchedProductId
  );
  return /* @__PURE__ */ jsxs(Form$1, { id: formId, form, onSubmit, children: [
    /* @__PURE__ */ jsx(
      FormNormalizedModelField,
      {
        name: "user_id",
        className: "mb-20",
        endpoint: "normalized-models/user",
        label: /* @__PURE__ */ jsx(Trans, { message: "User" })
      }
    ),
    /* @__PURE__ */ jsx(
      FormSelect,
      {
        name: "product_id",
        selectionMode: "single",
        className: "mb-20",
        label: /* @__PURE__ */ jsx(Trans, { message: "Plan" }),
        children: (_b = query.data) == null ? void 0 : _b.products.filter((p) => !p.free).map((product) => /* @__PURE__ */ jsx(Item, { value: product.id, children: /* @__PURE__ */ jsx(Trans, { message: product.name }) }, product.id))
      }
    ),
    !(selectedProduct == null ? void 0 : selectedProduct.free) && /* @__PURE__ */ jsx(
      FormSelect,
      {
        name: "price_id",
        selectionMode: "single",
        className: "mb-20",
        label: /* @__PURE__ */ jsx(Trans, { message: "Price" }),
        children: selectedProduct == null ? void 0 : selectedProduct.prices.map((price) => /* @__PURE__ */ jsx(Item, { value: price.id, children: /* @__PURE__ */ jsx(FormattedPrice, { price }) }, price.id))
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        inputElementType: "textarea",
        rows: 3,
        name: "description",
        label: /* @__PURE__ */ jsx(Trans, { message: "Description" }),
        className: "mb-20"
      }
    ),
    /* @__PURE__ */ jsx(
      FormDatePicker,
      {
        className: "mb-20",
        name: "renews_at",
        granularity: "day",
        label: /* @__PURE__ */ jsx(Trans, { message: "Renews at" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "This will only change local records. User will continue to be billed on their original cycle on the payment gateway." })
      }
    ),
    /* @__PURE__ */ jsx(
      FormDatePicker,
      {
        className: "mb-20",
        name: "ends_at",
        granularity: "day",
        label: /* @__PURE__ */ jsx(Trans, { message: "Ends at" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "This will only change local records. User will continue to be billed on their original cycle on the payment gateway." })
      }
    )
  ] });
}
function UpdateSubscriptionDialog({
  subscription
}) {
  const { close, formId } = useDialogContext();
  const form = useForm({
    defaultValues: {
      id: subscription.id,
      product_id: subscription.product_id,
      price_id: subscription.price_id,
      description: subscription.description,
      renews_at: subscription.renews_at,
      ends_at: subscription.ends_at,
      user_id: subscription.user_id
    }
  });
  const updateSubscription2 = useUpdateSubscription(form);
  return /* @__PURE__ */ jsxs(Dialog, { size: "md", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Update subscription" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      CrupdateSubscriptionForm,
      {
        formId,
        form,
        onSubmit: (values) => {
          updateSubscription2.mutate(values, {
            onSuccess: () => {
              close();
            }
          });
        }
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: () => {
            close();
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          form: formId,
          disabled: updateSubscription2.isPending,
          variant: "flat",
          color: "primary",
          type: "submit",
          children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
        }
      )
    ] })
  ] });
}
const endpoint$5 = "billing/subscriptions";
function useCreateSubscription(form) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (props) => createNewSubscription(props),
    onSuccess: () => {
      toast(trans(message("Subscription created")));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey(endpoint$5)
      });
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function createNewSubscription(payload) {
  return apiClient.post(endpoint$5, payload).then((r) => r.data);
}
function CreateSubscriptionDialog() {
  const { close, formId } = useDialogContext();
  const form = useForm({});
  const createSubscription = useCreateSubscription(form);
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Add new subscription" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      CrupdateSubscriptionForm,
      {
        formId,
        form,
        onSubmit: (values) => {
          createSubscription.mutate(values, {
            onSuccess: () => {
              close();
            }
          });
        }
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: () => {
            close();
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          form: formId,
          disabled: createSubscription.isPending,
          variant: "flat",
          color: "primary",
          type: "submit",
          children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
        }
      )
    ] })
  ] });
}
const PlayArrowIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M10 8.64 15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z" }),
  "PlayArrowOutlined"
);
const endpoint$4 = "billing/subscriptions";
const columnConfig$5 = [
  {
    key: "user_id",
    allowsSorting: true,
    width: "flex-3 min-w-200",
    visibleInMode: "all",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Customer" }),
    body: (subscription) => subscription.user && /* @__PURE__ */ jsx(
      NameWithAvatar,
      {
        image: subscription.user.avatar,
        label: subscription.user.display_name,
        description: subscription.user.email
      }
    )
  },
  {
    key: "status",
    width: "w-100 flex-shrink-0",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Status" }),
    body: (subscription) => {
      if (subscription.valid) {
        return /* @__PURE__ */ jsx(Chip, { size: "xs", color: "positive", radius: "rounded", className: "w-max", children: /* @__PURE__ */ jsx(Trans, { message: "Active" }) });
      }
      return /* @__PURE__ */ jsx(Chip, { size: "xs", radius: "rounded", className: "w-max", children: /* @__PURE__ */ jsx(Trans, { message: "Cancelled" }) });
    }
  },
  {
    key: "product_id",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Plan" }),
    body: (subscription) => {
      var _a2;
      return (_a2 = subscription.product) == null ? void 0 : _a2.name;
    }
  },
  {
    key: "gateway_name",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Gateway" }),
    body: (subscription) => /* @__PURE__ */ jsx("span", { className: "capitalize", children: subscription.gateway_name })
  },
  {
    key: "renews_at",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Renews at" }),
    body: (subscription) => /* @__PURE__ */ jsx(FormattedDate, { date: subscription.renews_at })
  },
  {
    key: "ends_at",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Ends at" }),
    body: (subscription) => /* @__PURE__ */ jsx(FormattedDate, { date: subscription.ends_at })
  },
  {
    key: "created_at",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Created at" }),
    body: (subscription) => /* @__PURE__ */ jsx(FormattedDate, { date: subscription.created_at })
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    hideHeader: true,
    align: "end",
    visibleInMode: "all",
    width: "w-128 flex-shrink-0",
    body: (subscription) => {
      return /* @__PURE__ */ jsx(SubscriptionActions, { subscription });
    }
  }
];
function SubscriptionsIndexPage() {
  return /* @__PURE__ */ jsx(
    DataTablePage,
    {
      endpoint: endpoint$4,
      title: /* @__PURE__ */ jsx(Trans, { message: "Subscriptions" }),
      columns: columnConfig$5,
      filters: SubscriptionIndexPageFilters,
      actions: /* @__PURE__ */ jsx(PageActions, {}),
      enableSelection: false,
      selectedActions: /* @__PURE__ */ jsx(DeleteSelectedItemsAction, {}),
      queryParams: { with: "product" },
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: subscriptionsSvg,
          title: /* @__PURE__ */ jsx(Trans, { message: "No subscriptions have been created yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching subscriptions" })
        }
      )
    }
  );
}
function PageActions() {
  return /* @__PURE__ */ jsx(Fragment$1, { children: /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(DataTableAddItemButton, { children: /* @__PURE__ */ jsx(Trans, { message: "Add new subscription" }) }),
    /* @__PURE__ */ jsx(CreateSubscriptionDialog, {})
  ] }) });
}
function SubscriptionActions({ subscription }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
      /* @__PURE__ */ jsx(IconButton, { size: "md", className: "text-muted", children: /* @__PURE__ */ jsx(EditIcon, {}) }),
      /* @__PURE__ */ jsx(UpdateSubscriptionDialog, { subscription })
    ] }),
    subscription.cancelled ? /* @__PURE__ */ jsx(ResumeSubscriptionButton, { subscription }) : /* @__PURE__ */ jsx(SuspendSubscriptionButton, { subscription }),
    /* @__PURE__ */ jsx(CancelSubscriptionButton, { subscription })
  ] });
}
function SuspendSubscriptionButton({ subscription }) {
  const cancelSubscription = useCancelSubscription();
  const handleSuspendSubscription = () => {
    cancelSubscription.mutate(
      { subscriptionId: subscription.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: DatatableDataQueryKey(endpoint$4)
          });
        }
      }
    );
  };
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "modal",
      onClose: (confirmed) => {
        if (confirmed) {
          handleSuspendSubscription();
        }
      },
      children: [
        /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Cancel subscription" }), children: /* @__PURE__ */ jsx(
          IconButton,
          {
            size: "md",
            className: "text-muted",
            disabled: cancelSubscription.isPending,
            children: /* @__PURE__ */ jsx(PauseIcon, {})
          }
        ) }),
        /* @__PURE__ */ jsx(
          ConfirmationDialog,
          {
            title: /* @__PURE__ */ jsx(Trans, { message: "Cancel subscription" }),
            body: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to cancel this subscription?" }),
              /* @__PURE__ */ jsx("div", { className: "mt-10 text-sm font-semibold", children: /* @__PURE__ */ jsx(Trans, { message: "This will put user on grace period until their next scheduled renewal date. Subscription can be renewed until that date by user or from admin area." }) })
            ] }),
            confirm: /* @__PURE__ */ jsx(Trans, { message: "Confirm" })
          }
        )
      ]
    }
  );
}
function ResumeSubscriptionButton({ subscription }) {
  const resumeSubscription = useResumeSubscription();
  const handleResumeSubscription = () => {
    resumeSubscription.mutate(
      { subscriptionId: subscription.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: DatatableDataQueryKey(endpoint$4)
          });
        }
      }
    );
  };
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "modal",
      onClose: (confirmed) => {
        if (confirmed) {
          handleResumeSubscription();
        }
      },
      children: [
        /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Renew subscription" }), children: /* @__PURE__ */ jsx(
          IconButton,
          {
            size: "md",
            className: "text-muted",
            onClick: handleResumeSubscription,
            disabled: resumeSubscription.isPending,
            children: /* @__PURE__ */ jsx(PlayArrowIcon, {})
          }
        ) }),
        /* @__PURE__ */ jsx(
          ConfirmationDialog,
          {
            title: /* @__PURE__ */ jsx(Trans, { message: "Resume subscription" }),
            body: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to resume this subscription?" }),
              /* @__PURE__ */ jsx("div", { className: "mt-10 text-sm font-semibold", children: /* @__PURE__ */ jsx(Trans, { message: "This will put user on their original plan and billing cycle." }) })
            ] }),
            confirm: /* @__PURE__ */ jsx(Trans, { message: "Confirm" })
          }
        )
      ]
    }
  );
}
function CancelSubscriptionButton({ subscription }) {
  const cancelSubscription = useCancelSubscription();
  const handleDeleteSubscription = () => {
    cancelSubscription.mutate(
      { subscriptionId: subscription.id, delete: true },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: DatatableDataQueryKey(endpoint$4)
          });
        }
      }
    );
  };
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "modal",
      onClose: (confirmed) => {
        if (confirmed) {
          handleDeleteSubscription();
        }
      },
      children: [
        /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Delete subscription" }), children: /* @__PURE__ */ jsx(
          IconButton,
          {
            size: "md",
            className: "text-muted",
            disabled: cancelSubscription.isPending,
            children: /* @__PURE__ */ jsx(CloseIcon, {})
          }
        ) }),
        /* @__PURE__ */ jsx(
          ConfirmationDialog,
          {
            isDanger: true,
            title: /* @__PURE__ */ jsx(Trans, { message: "Delete subscription" }),
            body: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to delete this subscription?" }),
              /* @__PURE__ */ jsx("div", { className: "mt-10 text-sm font-semibold", children: /* @__PURE__ */ jsx(Trans, { message: "This will permanently delete the subscription and immediately cancel it on billing gateway. Subscription will not be renewable anymore." }) })
            ] }),
            confirm: /* @__PURE__ */ jsx(Trans, { message: "Confirm" })
          }
        )
      ]
    }
  );
}
const SyncIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" }),
  "SyncOutlined"
);
function useSyncProducts() {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: () => syncPlans(),
    onSuccess: () => {
      toast(trans(message("Plans synced")));
    },
    onError: (err) => showHttpErrorToast(err, message("Could not sync plans"))
  });
}
function syncPlans() {
  return apiClient.post("billing/products/sync").then((r) => r.data);
}
const endpoint$3 = (id) => `billing/products/${id}`;
function useDeleteProduct() {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (payload) => updateProduct$1(payload),
    onSuccess: () => {
      toast(trans(message("Plan deleted")));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("billing/products")
      });
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function updateProduct$1({ productId }) {
  return apiClient.delete(endpoint$3(productId)).then((r) => r.data);
}
const PlansIndexPageFilters = [
  {
    key: "subscriptions",
    label: message("Subscriptions"),
    description: message("Whether plan has any active subscriptions"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: "01",
      options: [
        {
          key: "01",
          label: message("Has active subscriptions"),
          value: { value: "*", operator: FilterOperator.has }
        },
        {
          key: "02",
          label: message("Does not have active subscriptions"),
          value: { value: "*", operator: FilterOperator.doesntHave }
        }
      ]
    }
  },
  createdAtFilter({
    description: message("Date plan was created")
  }),
  updatedAtFilter({
    description: message("Date plan was last updated")
  })
];
const columnConfig$4 = [
  {
    key: "name",
    allowsSorting: true,
    visibleInMode: "all",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Name" }),
    body: (product) => {
      const price = product.prices[0];
      return /* @__PURE__ */ jsx(
        NameWithAvatar,
        {
          label: product.name,
          description: product.free ? /* @__PURE__ */ jsx(Trans, { message: "Free" }) : /* @__PURE__ */ jsx(FormattedPrice, { price })
        }
      );
    }
  },
  {
    key: "created_at",
    allowsSorting: true,
    maxWidth: "max-w-100",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Created" }),
    body: (product) => /* @__PURE__ */ jsx(FormattedDate, { date: product.created_at })
  },
  {
    key: "updated_at",
    allowsSorting: true,
    maxWidth: "max-w-100",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Last updated" }),
    body: (product) => /* @__PURE__ */ jsx(FormattedDate, { date: product.updated_at })
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    visibleInMode: "all",
    hideHeader: true,
    align: "end",
    maxWidth: "max-w-84",
    body: (product) => {
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          IconButton,
          {
            size: "md",
            className: "text-muted",
            elementType: Link,
            to: `/admin/plans/${product.id}/edit`,
            children: /* @__PURE__ */ jsx(EditIcon, {})
          }
        ),
        /* @__PURE__ */ jsx(DeleteProductButton, { product })
      ] });
    }
  }
];
function PlansIndexPage() {
  const navigate = useNavigate$1();
  return /* @__PURE__ */ jsx(
    DataTablePage,
    {
      endpoint: "billing/products",
      title: /* @__PURE__ */ jsx(Trans, { message: "Subscription plans" }),
      columns: columnConfig$4,
      actions: /* @__PURE__ */ jsx(Actions$7, {}),
      enableSelection: false,
      filters: PlansIndexPageFilters,
      onRowAction: (item) => {
        navigate(`/admin/plans/${item.id}/edit`);
      },
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: softwareEngineerSvg,
          title: /* @__PURE__ */ jsx(Trans, { message: "No plans have been created yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching plans" })
        }
      )
    }
  );
}
function DeleteProductButton({ product }) {
  const deleteProduct = useDeleteProduct();
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "modal",
      onClose: (confirmed) => {
        if (confirmed) {
          deleteProduct.mutate({ productId: product.id });
        }
      },
      children: [
        /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Delete plan" }), children: /* @__PURE__ */ jsx(
          IconButton,
          {
            size: "md",
            className: "text-muted",
            disabled: deleteProduct.isPending,
            children: /* @__PURE__ */ jsx(DeleteIcon, {})
          }
        ) }),
        /* @__PURE__ */ jsx(
          ConfirmationDialog,
          {
            title: /* @__PURE__ */ jsx(Trans, { message: "Delete plan" }),
            body: /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to delete this plan?" }),
            confirm: /* @__PURE__ */ jsx(Trans, { message: "Delete" })
          }
        )
      ]
    }
  );
}
function Actions$7() {
  const syncPlans2 = useSyncProducts();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Sync plans with Stripe & PayPal" }), children: /* @__PURE__ */ jsx(
      IconButton,
      {
        color: "primary",
        variant: "outline",
        size: "sm",
        disabled: syncPlans2.isPending,
        onClick: () => {
          syncPlans2.mutate();
        },
        children: /* @__PURE__ */ jsx(SyncIcon, {})
      }
    ) }),
    /* @__PURE__ */ jsx(DataTableAddItemButton, { elementType: Link, to: "/admin/plans/new", children: /* @__PURE__ */ jsx(Trans, { message: "Add new plan" }) })
  ] });
}
const Endpoint$3 = (id) => `billing/products/${id}`;
function useProduct() {
  const { productId } = useParams();
  return useQuery({
    queryKey: [Endpoint$3(productId)],
    queryFn: () => fetchProduct(productId)
  });
}
function fetchProduct(productId) {
  return apiClient.get(Endpoint$3(productId)).then((response) => response.data);
}
const BillingPeriodPresets = [
  {
    key: "day1",
    label: message("Daily"),
    interval: "day",
    interval_count: 1
  },
  {
    key: "week1",
    label: message("Weekly"),
    interval: "week",
    interval_count: 1
  },
  {
    key: "month1",
    label: message("Monthly"),
    interval: "month",
    interval_count: 1
  },
  {
    key: "month3",
    label: message("Every 3 months"),
    interval: "month",
    interval_count: 3
  },
  {
    key: "month6",
    label: message("Every 6 months"),
    interval: "month",
    interval_count: 6
  },
  {
    key: "year1",
    label: message("Yearly"),
    interval: "year",
    interval_count: 1
  },
  {
    key: "custom",
    label: message("Custom"),
    interval: null,
    interval_count: null
  }
];
function PriceForm({ index, onRemovePrice }) {
  const { trans } = useTrans();
  const query = useValueLists(["currencies"]);
  const currencies = useMemo(() => {
    var _a2;
    return ((_a2 = query.data) == null ? void 0 : _a2.currencies) ? Object.values(query.data.currencies) : [];
  }, [query.data]);
  const { watch, getValues } = useFormContext();
  const isNewProduct = !watch("id");
  const isNewPrice = watch(`prices.${index}.id`) == null;
  const subscriberCount = watch(`prices.${index}.subscriptions_count`) || 0;
  const [billingPeriodPreset, setBillingPeriodPreset] = useState(() => {
    const interval = getValues(`prices.${index}.interval`);
    const intervalCount = getValues(`prices.${index}.interval_count`);
    const preset = BillingPeriodPresets.find(
      (p) => p.key === `${interval}${intervalCount}`
    );
    return preset ? preset.key : "custom";
  });
  const allowPriceChanges = isNewProduct || isNewPrice || !subscriberCount;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    !allowPriceChanges && /* @__PURE__ */ jsx("p", { className: "text-muted text-sm max-w-500 mb-20", children: /* @__PURE__ */ jsx(
      Trans,
      {
        message: "This price can't modified or deleted, because it has [one 1 subscriber|other :count subscribers]. You can instead add a new price.",
        values: { count: subscriberCount }
      }
    ) }),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        required: true,
        disabled: !allowPriceChanges,
        label: /* @__PURE__ */ jsx(Trans, { message: "Amount" }),
        type: "number",
        min: 0.1,
        step: 0.01,
        name: `prices.${index}.amount`,
        className: "mb-20"
      }
    ),
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        name: `prices.${index}.currency_position`,
        className: "mt-4 mb-20",
        description: /* @__PURE__ */ jsx(Trans, { message: "When enabled, position is left. (ex. $100)" }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Currency Position" })
      }
    ),
    /* @__PURE__ */ jsx(
      FormSelect,
      {
        required: true,
        disabled: !allowPriceChanges,
        label: /* @__PURE__ */ jsx(Trans, { message: "Currency" }),
        name: `prices.${index}.currency`,
        items: currencies,
        showSearchField: true,
        searchPlaceholder: trans(message("Search currencies")),
        selectionMode: "single",
        className: "mb-20",
        children: (item) => /* @__PURE__ */ jsx(
          Item,
          {
            value: item.code,
            children: `${item.code}: ${item.name}`
          },
          item.code
        )
      }
    ),
    /* @__PURE__ */ jsx(
      BillingPeriodSelect,
      {
        disabled: !allowPriceChanges,
        index,
        value: billingPeriodPreset,
        onValueChange: setBillingPeriodPreset
      }
    ),
    billingPeriodPreset === "custom" && /* @__PURE__ */ jsx(CustomBillingPeriodField, { disabled: !allowPriceChanges, index }),
    /* @__PURE__ */ jsx("div", { className: "text-right", children: /* @__PURE__ */ jsx(
      Button,
      {
        size: "xs",
        variant: "outline",
        color: "danger",
        disabled: !allowPriceChanges,
        onClick: () => {
          onRemovePrice();
        },
        children: /* @__PURE__ */ jsx(Trans, { message: "Delete price" })
      }
    ) })
  ] });
}
function BillingPeriodSelect({
  index,
  value,
  onValueChange,
  disabled
}) {
  const { setValue: setFormValue } = useFormContext();
  return /* @__PURE__ */ jsx(
    SelectForwardRef,
    {
      label: /* @__PURE__ */ jsx(Trans, { message: "Billing period" }),
      disabled,
      className: "mb-20",
      selectionMode: "single",
      selectedValue: value,
      onSelectionChange: (value2) => {
        onValueChange(value2);
        if (value2 === "custom")
          ;
        else {
          const preset = BillingPeriodPresets.find((p) => p.key === value2);
          if (preset) {
            setFormValue(
              `prices.${index}.interval`,
              preset.interval
            );
            setFormValue(
              `prices.${index}.interval_count`,
              preset.interval_count
            );
          }
        }
      },
      children: BillingPeriodPresets.map((preset) => /* @__PURE__ */ jsx(Item, { value: preset.key, children: /* @__PURE__ */ jsx(Trans, { ...preset.label }) }, preset.key))
    }
  );
}
function CustomBillingPeriodField({
  index,
  disabled
}) {
  const { watch } = useFormContext();
  const interval = watch(`prices.${index}.interval`);
  let maxIntervalCount;
  if (interval === "day") {
    maxIntervalCount = 365;
  } else if (interval === "week") {
    maxIntervalCount = 52;
  } else {
    maxIntervalCount = 12;
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex border rounded w-min", children: [
    /* @__PURE__ */ jsx("div", { className: "px-18 flex items-center text-sm", children: /* @__PURE__ */ jsx(Trans, { message: "Every" }) }),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        inputShadow: "shadow-none",
        inputBorder: "border-none",
        className: "border-l border-r w-80",
        name: `prices.${index}.interval_count`,
        type: "number",
        min: 1,
        max: maxIntervalCount,
        disabled,
        required: true
      }
    ),
    /* @__PURE__ */ jsxs(
      FormSelect,
      {
        inputShadow: "shadow-none",
        inputBorder: "border-none",
        name: `prices.${index}.interval`,
        selectionMode: "single",
        disabled,
        children: [
          /* @__PURE__ */ jsx(Item, { value: "day", children: /* @__PURE__ */ jsx(Trans, { message: "Days" }) }),
          /* @__PURE__ */ jsx(Item, { value: "week", children: /* @__PURE__ */ jsx(Trans, { message: "Weeks" }) }),
          /* @__PURE__ */ jsx(Item, { value: "month", children: /* @__PURE__ */ jsx(Trans, { message: "Months" }) })
        ]
      }
    )
  ] });
}
function CrupdatePlanForm() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: "name",
        label: /* @__PURE__ */ jsx(Trans, { message: "Name" }),
        className: "mb-20",
        required: true,
        autoFocus: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: "description",
        label: /* @__PURE__ */ jsx(Trans, { message: "Description" }),
        className: "mb-20",
        inputElementType: "textarea",
        rows: 4
      }
    ),
    /* @__PURE__ */ jsxs(
      FormSelect,
      {
        name: "position",
        selectionMode: "single",
        label: /* @__PURE__ */ jsx(Trans, { message: "Position in pricing table" }),
        className: "mb-20",
        children: [
          /* @__PURE__ */ jsx(Item, { value: 0, children: /* @__PURE__ */ jsx(Trans, { message: "First" }) }),
          /* @__PURE__ */ jsx(Item, { value: 1, children: /* @__PURE__ */ jsx(Trans, { message: "Second" }) }),
          /* @__PURE__ */ jsx(Item, { value: 2, children: /* @__PURE__ */ jsx(Trans, { message: "Third" }) }),
          /* @__PURE__ */ jsx(Item, { value: 3, children: /* @__PURE__ */ jsx(Trans, { message: "Fourth" }) }),
          /* @__PURE__ */ jsx(Item, { value: 4, children: /* @__PURE__ */ jsx(Trans, { message: "Fifth" }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      FormFileSizeField,
      {
        className: "mb-30",
        name: "available_space",
        label: /* @__PURE__ */ jsx(Trans, { message: "Allowed storage space" }),
        description: /* @__PURE__ */ jsx(
          Trans,
          {
            values: {
              a: (parts) => /* @__PURE__ */ jsx(
                Link,
                {
                  className: LinkStyle,
                  target: "_blank",
                  to: "/admin/settings/uploading",
                  children: parts
                }
              )
            },
            message: "Total storage space all user uploads are allowed to take up."
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        name: "recommended",
        className: "mb-20",
        description: /* @__PURE__ */ jsx(Trans, { message: "Plan will be displayed more prominently on pricing page." }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Recommend" })
      }
    ),
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        name: "hidden",
        className: "mb-20",
        description: /* @__PURE__ */ jsx(Trans, { message: "Plan will not be shown on pricing or upgrade pages." }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Hidden" })
      }
    ),
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        name: "free",
        className: "mb-20",
        description: /* @__PURE__ */ jsx(Trans, { message: "Will be assigned to all users, if they are not subscribed already." }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Free" })
      }
    ),
    /* @__PURE__ */ jsx(Header$1, { children: /* @__PURE__ */ jsx(Trans, { message: "Feature list" }) }),
    /* @__PURE__ */ jsx(FeatureListForm, {}),
    /* @__PURE__ */ jsx(PricingListForm, {}),
    /* @__PURE__ */ jsx(Header$1, { children: /* @__PURE__ */ jsx(Trans, { message: "Permissions" }) }),
    /* @__PURE__ */ jsx(FormPermissionSelector, { name: "permissions" })
  ] });
}
function Header$1({ children }) {
  return /* @__PURE__ */ jsx("h2", { className: "mt-40 mb-20 text-base font-semibold", children });
}
function FeatureListForm() {
  const { fields, append, remove } = useFieldArray({
    name: "feature_list"
  });
  return /* @__PURE__ */ jsxs("div", { children: [
    fields.map((field, index) => {
      return /* @__PURE__ */ jsxs("div", { className: "flex gap-10 mb-10", children: [
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            name: `feature_list.${index}.value`,
            size: "sm",
            className: "flex-auto"
          }
        ),
        /* @__PURE__ */ jsx(
          IconButton,
          {
            size: "sm",
            color: "primary",
            className: "flex-shrink-0",
            onClick: () => {
              remove(index);
            },
            children: /* @__PURE__ */ jsx(CloseIcon, {})
          }
        )
      ] }, field.id);
    }),
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "text",
        color: "primary",
        startIcon: /* @__PURE__ */ jsx(AddIcon, {}),
        size: "xs",
        onClick: () => {
          append({ value: "" });
        },
        children: /* @__PURE__ */ jsx(Trans, { message: "Add another line" })
      }
    )
  ] });
}
function PricingListForm() {
  var _a2;
  const {
    watch,
    formState: { errors }
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: "prices",
    keyName: "key"
  });
  if (watch("free")) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Header$1, { children: /* @__PURE__ */ jsx(Trans, { message: "Pricing" }) }),
    ((_a2 = errors.prices) == null ? void 0 : _a2.message) && /* @__PURE__ */ jsx("div", { className: "text-sm text-danger mb-20", children: errors.prices.message }),
    /* @__PURE__ */ jsx(Accordion, { variant: "outline", className: "mb-10", children: fields.map((field, index) => /* @__PURE__ */ jsx(
      AccordionItem,
      {
        label: /* @__PURE__ */ jsx(FormattedPrice, { price: field }),
        children: /* @__PURE__ */ jsx(
          PriceForm,
          {
            index,
            onRemovePrice: () => {
              remove(index);
            }
          }
        )
      },
      field.key
    )) }),
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "text",
        color: "primary",
        startIcon: /* @__PURE__ */ jsx(AddIcon, {}),
        size: "xs",
        onClick: () => {
          append({
            currency: "USD",
            currency_position: true,
            amount: 1,
            interval_count: 1,
            interval: "month"
          });
        },
        children: /* @__PURE__ */ jsx(Trans, { message: "Add another price" })
      }
    )
  ] });
}
const Endpoint$2 = (id) => `billing/products/${id}`;
function useUpdateProduct(form) {
  const { trans } = useTrans();
  const navigate = useNavigate$1();
  return useMutation({
    mutationFn: (payload) => updateProduct(payload),
    onSuccess: (response) => {
      toast(trans(message("Plan updated")));
      queryClient.invalidateQueries({
        queryKey: [Endpoint$2(response.product.id)]
      });
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("billing/products")
      });
      navigate("/admin/plans");
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function updateProduct({
  id,
  ...payload
}) {
  const backendPayload = {
    ...payload,
    feature_list: payload.feature_list.map((feature) => feature.value)
  };
  return apiClient.put(Endpoint$2(id), backendPayload).then((r) => r.data);
}
function EditPlanPage() {
  const query = useProduct();
  if (query.status !== "success") {
    return /* @__PURE__ */ jsx(FullPageLoader, {});
  }
  return /* @__PURE__ */ jsx(PageContent$2, { product: query.data.product });
}
function PageContent$2({ product }) {
  const form = useForm({
    defaultValues: {
      ...product,
      feature_list: product.feature_list.map((f) => ({ value: f }))
    }
  });
  const updateProduct2 = useUpdateProduct(form);
  return /* @__PURE__ */ jsx(
    CrupdateResourceLayout,
    {
      form,
      onSubmit: (values) => {
        updateProduct2.mutate(values);
      },
      title: /* @__PURE__ */ jsx(Trans, { message: "Edit “:name“ plan", values: { name: product.name } }),
      isLoading: updateProduct2.isPending,
      children: /* @__PURE__ */ jsx(CrupdatePlanForm, {})
    }
  );
}
const endpoint$2 = "billing/products";
function useCreateProduct(form) {
  const { trans } = useTrans();
  const navigate = useNavigate$1();
  return useMutation({
    mutationFn: (payload) => createProduct(payload),
    onSuccess: () => {
      toast(trans(message("Plan created")));
      queryClient.invalidateQueries({ queryKey: [endpoint$2] });
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("billing/products")
      });
      navigate("/admin/plans");
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function createProduct(payload) {
  const backendPayload = {
    ...payload,
    feature_list: payload.feature_list.map((feature) => feature.value)
  };
  return apiClient.post(endpoint$2, backendPayload).then((r) => r.data);
}
function CreatePlanPage() {
  const form = useForm({
    defaultValues: {
      free: false,
      recommended: false
    }
  });
  const createProduct2 = useCreateProduct(form);
  return /* @__PURE__ */ jsx(
    CrupdateResourceLayout,
    {
      form,
      onSubmit: (values) => {
        createProduct2.mutate(values);
      },
      title: /* @__PURE__ */ jsx(Trans, { message: "Create new plan" }),
      isLoading: createProduct2.isPending,
      children: /* @__PURE__ */ jsx(CrupdatePlanForm, {})
    }
  );
}
function GdprSettings() {
  return /* @__PURE__ */ jsxs(
    SettingsPanel,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "GDPR" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Configure settings related to EU General Data Protection Regulation." }),
      children: [
        /* @__PURE__ */ jsx(CookieNoticeSection, {}),
        /* @__PURE__ */ jsx(SettingsSeparator, {}),
        /* @__PURE__ */ jsx(RegistrationPoliciesSection, {})
      ]
    }
  );
}
function CookieNoticeSection() {
  const { watch } = useFormContext();
  const noticeEnabled = watch("client.cookie_notice.enable");
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        name: "client.cookie_notice.enable",
        className: "mb-20",
        description: /* @__PURE__ */ jsx(Trans, { message: "Whether cookie notice should be shown automatically to users from EU until it is accepted." }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Enable cookie notice" })
      }
    ),
    noticeEnabled && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-20 border-b pb-6", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-20 border-b pb-10 text-sm font-medium", children: /* @__PURE__ */ jsx(Trans, { message: "Information button" }) }),
        /* @__PURE__ */ jsx(
          MenuItemForm,
          {
            hideRoleAndPermissionFields: true,
            formPathPrefix: "client.cookie_notice.button"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        FormSelect,
        {
          name: "client.cookie_notice.position",
          selectionMode: "single",
          label: /* @__PURE__ */ jsx(Trans, { message: "Cookie notice position" }),
          className: "mb-20",
          children: [
            /* @__PURE__ */ jsx(Item, { value: "top", children: /* @__PURE__ */ jsx(Trans, { message: "Top" }) }),
            /* @__PURE__ */ jsx(Item, { value: "bottom", children: /* @__PURE__ */ jsx(Trans, { message: "Bottom" }) })
          ]
        }
      )
    ] })
  ] });
}
function RegistrationPoliciesSection() {
  const { fields, append, remove } = useFieldArray({
    name: "client.registration.policies"
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "mb-6 text-sm", children: /* @__PURE__ */ jsx(Trans, { message: "Registration policies" }) }),
    /* @__PURE__ */ jsx("div", { className: "text-xs text-muted", children: /* @__PURE__ */ jsx(Trans, { message: "Create policies that will be shown on registration page. User will be required to accept them by toggling a checkbox." }) }),
    /* @__PURE__ */ jsx(Accordion, { className: "mt-16", variant: "outline", children: fields.map((field, index) => /* @__PURE__ */ jsx(
      AccordionItem,
      {
        label: field.label,
        chevronPosition: "left",
        endAppend: /* @__PURE__ */ jsx(
          IconButton,
          {
            variant: "text",
            color: "danger",
            size: "sm",
            onClick: () => {
              remove(index);
            },
            children: /* @__PURE__ */ jsx(CloseIcon, {})
          }
        ),
        children: /* @__PURE__ */ jsx(
          MenuItemForm,
          {
            hideRoleAndPermissionFields: true,
            formPathPrefix: `client.register_policies.${index}`
          }
        )
      },
      field.id
    )) }),
    /* @__PURE__ */ jsxs(
      DialogTrigger,
      {
        type: "modal",
        onClose: (value) => {
          if (value) {
            append(value);
          }
        },
        children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              className: "mt-12",
              variant: "link",
              color: "primary",
              startIcon: /* @__PURE__ */ jsx(AddIcon, {}),
              size: "xs",
              children: /* @__PURE__ */ jsx(Trans, { message: "Add another policy" })
            }
          ),
          /* @__PURE__ */ jsx(AddMenuItemDialog, { title: /* @__PURE__ */ jsx(Trans, { message: "Add policy" }) })
        ]
      }
    )
  ] });
}
function useUpdateLyric(form) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (props) => updateGenre$1(props),
    onSuccess: () => {
      toast(trans(message("Lyric updated")));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("lyrics")
      });
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("tracks")
      });
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function updateGenre$1({ id, ...payload }) {
  return apiClient.put(`lyrics/${id}`, payload).then((r) => r.data);
}
function CrupdateLyricForm({ form, onSubmit, formId }) {
  return /* @__PURE__ */ jsxs(Form$1, { id: formId, form, onSubmit: (values) => onSubmit(values), children: [
    /* @__PURE__ */ jsx(
      FormNormalizedModelField,
      {
        className: "mb-24",
        label: /* @__PURE__ */ jsx(Trans, { message: "Track" }),
        name: "track_id",
        endpoint: "normalized-models/track",
        queryParams: {
          with: "artists,album"
        }
      }
    ),
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        className: "mb-24",
        name: "is_synced",
        description: /* @__PURE__ */ jsx(Trans, { message: "Whether lyric contains timestmaps" }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Synced" })
      }
    ),
    form.watch("is_synced") ? /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: "duration",
        type: "number",
        label: /* @__PURE__ */ jsx(Trans, { message: "duration" }),
        className: "mb-24",
        required: true,
        description: /* @__PURE__ */ jsx(Trans, { message: "Lyric duration in seconds. If this duration does not match the duration of track that is being played, lyric sync will be disabled and plain lyrics will be shown instead." })
      }
    ) : null,
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: "text",
        label: /* @__PURE__ */ jsx(Trans, { message: "Text" }),
        inputElementType: "textarea",
        rows: 30
      }
    )
  ] });
}
function UpdateLyricDialog({ lyric }) {
  const { close, formId } = useDialogContext();
  const form = useForm({
    defaultValues: {
      id: lyric.id,
      track_id: lyric.track_id,
      text: lyric.text,
      is_synced: lyric.is_synced,
      duration: lyric.duration
    }
  });
  const updateLyric = useUpdateLyric(form);
  return /* @__PURE__ */ jsxs(Dialog, { size: "xl", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Update lyric" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      CrupdateLyricForm,
      {
        formId,
        form,
        onSubmit: (values) => {
          updateLyric.mutate(values, {
            onSuccess: () => {
              close();
            }
          });
        }
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: () => close(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          form: formId,
          disabled: updateLyric.isPending,
          variant: "flat",
          color: "primary",
          type: "submit",
          children: /* @__PURE__ */ jsx(Trans, { message: "Update" })
        }
      )
    ] })
  ] });
}
function useCreateLyric(form) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (props) => createNewTag$1(props),
    onSuccess: () => {
      toast(trans(message("Lyric created")));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("lyrics")
      });
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("tracks")
      });
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function createNewTag$1(payload) {
  return apiClient.post("lyrics", payload).then((r) => r.data);
}
function CreateLyricDialog({ trackId }) {
  const { close, formId } = useDialogContext();
  const form = useForm({
    defaultValues: {
      track_id: trackId,
      is_synced: false
    }
  });
  const createLyric = useCreateLyric(form);
  return /* @__PURE__ */ jsxs(Dialog, { size: "xl", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Create new lyric" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      CrupdateLyricForm,
      {
        formId,
        form,
        onSubmit: (values) => {
          createLyric.mutate(values, {
            onSuccess: () => close()
          });
        }
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: () => close(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          form: formId,
          disabled: createLyric.isPending,
          variant: "flat",
          color: "primary",
          type: "submit",
          children: /* @__PURE__ */ jsx(Trans, { message: "Create" })
        }
      )
    ] })
  ] });
}
const ClosedCaptionIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H5V6h14v12zM7 15h3c.55 0 1-.45 1-1v-1H9.5v.5h-2v-3h2v.5H11v-1c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm7 0h3c.55 0 1-.45 1-1v-1h-1.5v.5h-2v-3h2v.5H18v-1c0-.55-.45-1-1-1h-3c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1z" }),
  "ClosedCaptionOutlined"
);
const BarChartIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z" }),
  "BarChartOutlined"
);
const TracksDatatableColumns = [
  {
    key: "name",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Track" }),
    width: "flex-3 min-w-200",
    visibleInMode: "all",
    body: (track) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-12", children: [
      /* @__PURE__ */ jsx(
        TrackImage,
        {
          track,
          className: "flex-shrink-0",
          size: "w-34 h-34 rounded"
        }
      ),
      /* @__PURE__ */ jsx(TrackLink, { track, target: "_blank" })
    ] })
  },
  {
    key: "artist",
    allowsSorting: false,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Artist" }),
    width: "flex-2",
    body: (track) => {
      var _a2;
      if (!((_a2 = track.artists) == null ? void 0 : _a2[0]))
        return null;
      return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-12", children: [
        /* @__PURE__ */ jsx(
          SmallArtistImage,
          {
            artist: track.artists[0],
            className: "flex-shrink-0 rounded",
            size: "w-34 h-34"
          }
        ),
        /* @__PURE__ */ jsx(ArtistLink, { artist: track.artists[0] })
      ] });
    }
  },
  {
    key: "duration",
    minWidth: "min-w-76",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Duration" }),
    body: (track) => track.duration ? /* @__PURE__ */ jsx(FormattedDuration, { ms: track.duration }) : null
  },
  {
    key: "plays",
    allowsSorting: true,
    minWidth: "min-w-70",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Plays" }),
    body: (track) => track.plays ? /* @__PURE__ */ jsx(FormattedNumber, { value: track.plays }) : null
  },
  {
    key: "updated_at",
    allowsSorting: true,
    width: "w-100",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Last updated" }),
    body: (track) => track.updated_at ? /* @__PURE__ */ jsx(FormattedDate, { date: track.updated_at }) : ""
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    hideHeader: true,
    align: "end",
    visibleInMode: "all",
    width: "w-128 flex-shrink-0",
    body: (track) => /* @__PURE__ */ jsxs("div", { className: "text-muted", children: [
      /* @__PURE__ */ jsx(IconButton, { size: "md", elementType: Link, to: `${track.id}/insights`, children: /* @__PURE__ */ jsx(BarChartIcon, {}) }),
      /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
        /* @__PURE__ */ jsx(IconButton, { size: "md", children: /* @__PURE__ */ jsx(ClosedCaptionIcon, {}) }),
        track.lyric ? /* @__PURE__ */ jsx(UpdateLyricDialog, { lyric: track.lyric }) : /* @__PURE__ */ jsx(CreateLyricDialog, { trackId: track.id })
      ] }),
      /* @__PURE__ */ jsx(IconButton, { size: "md", elementType: Link, to: `${track.id}/edit`, children: /* @__PURE__ */ jsx(EditIcon, {}) })
    ] })
  }
];
const TracksDatatableFilters = [
  {
    key: "image",
    label: message("Artwork"),
    description: message("Whether track has any artwork uploaded"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: "02",
      options: [
        {
          key: "01",
          label: message("Has artwork"),
          value: false
        },
        {
          key: "02",
          label: message("Does not have artwork"),
          value: true
        }
      ]
    }
  },
  {
    key: "album_id",
    label: message("Album"),
    description: message("Whether track is part of an album"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: "01",
      options: [
        {
          key: "01",
          label: message("Part of an album"),
          value: { operator: FilterOperator.ne, value: null }
        },
        {
          key: "02",
          label: message("Single"),
          value: { operator: FilterOperator.eq, value: null }
        }
      ]
    }
  },
  {
    key: "plays",
    label: message("Plays count"),
    description: message("Number of times this track was played"),
    defaultOperator: FilterOperator.gte,
    operators: ALL_PRIMITIVE_OPERATORS,
    control: {
      type: FilterControlType.Input,
      inputType: "number",
      defaultValue: 100
    }
  },
  createdAtFilter({
    description: message("Date artist was created")
  }),
  updatedAtFilter({
    description: message("Date artist was last updated")
  }),
  {
    defaultOperator: FilterOperator.has,
    key: "artists",
    label: message("Artist"),
    description: message("Artist this track belongs to"),
    control: {
      type: FilterControlType.SelectModel,
      model: ARTIST_MODEL
    }
  }
];
function useImportTrack() {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (props) => importTrack(props),
    onSuccess: () => {
      toast(trans(message("Track imported")));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("tracks")
      });
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function importTrack(payload) {
  return apiClient.post("import-media/single-item", {
    modelType: TRACK_MODEL,
    spotifyId: payload.spotifyId,
    importLyrics: payload.importLyrics
  }).then((r) => r.data);
}
function ImportTrackDialog() {
  const form = useForm({
    defaultValues: {
      importLyrics: true
    }
  });
  const { formId, close } = useDialogContext();
  const importTrack2 = useImportTrack();
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Import track" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsxs(
      Form$1,
      {
        id: formId,
        form,
        onSubmit: (values) => {
          importTrack2.mutate(values, {
            onSuccess: (response) => {
              close(response.track);
            }
          });
        },
        children: [
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              autoFocus: true,
              required: true,
              name: "spotifyId",
              minLength: 22,
              maxLength: 22,
              label: /* @__PURE__ */ jsx(Trans, { message: "Spotify ID" }),
              className: "mb-24",
              description: /* @__PURE__ */ jsx(Trans, { message: "This will also import all artists that collaborated on this track and album this track belongs to." })
            }
          ),
          /* @__PURE__ */ jsx(FormSwitch, { name: "importLyrics", className: "mb-24", children: /* @__PURE__ */ jsx(Trans, { message: "Import lyrics" }) })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: () => close(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          form: formId,
          variant: "flat",
          color: "primary",
          type: "submit",
          disabled: importTrack2.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Import" })
        }
      )
    ] })
  ] });
}
const PublishIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M5 4h14v2H5zm0 10h4v6h6v-6h4l-7-7-7 7zm8-2v6h-2v-6H9.83L12 9.83 14.17 12H13z" }),
  "PublishOutlined"
);
function TracksDatatablePage() {
  return /* @__PURE__ */ jsx(
    DataTablePage,
    {
      endpoint: "tracks",
      title: /* @__PURE__ */ jsx(Trans, { message: "Tracks" }),
      filters: TracksDatatableFilters,
      columns: TracksDatatableColumns,
      queryParams: {
        with: "artists,lyric"
      },
      actions: /* @__PURE__ */ jsx(Actions$6, {}),
      selectedActions: /* @__PURE__ */ jsx(DeleteSelectedItemsAction, {}),
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: musicImage,
          title: /* @__PURE__ */ jsx(Trans, { message: "No tracks have been created yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching tracks" })
        }
      )
    }
  );
}
function Actions$6() {
  const { spotify_is_setup } = useSettings();
  const navigate = useNavigate$1();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    spotify_is_setup && /* @__PURE__ */ jsxs(
      DialogTrigger,
      {
        type: "modal",
        onClose: (album) => {
          if (album) {
            navigate(`/admin/tracks/${album.id}/edit`);
          }
        },
        children: [
          /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Import by spotify ID" }), children: /* @__PURE__ */ jsx(
            IconButton,
            {
              variant: "outline",
              color: "primary",
              className: "flex-shrink-0",
              size: "sm",
              children: /* @__PURE__ */ jsx(PublishIcon, {})
            }
          ) }),
          /* @__PURE__ */ jsx(ImportTrackDialog, {})
        ]
      }
    ),
    /* @__PURE__ */ jsx(DataTableAddItemButton, { elementType: Link, to: "new", children: /* @__PURE__ */ jsx(Trans, { message: "Add new track" }) })
  ] });
}
const AlbumsDatatableColumns = [
  {
    key: "name",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Album" }),
    width: "flex-3",
    visibleInMode: "all",
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
    key: "artist",
    allowsSorting: false,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Artist" }),
    width: "flex-2",
    body: (album) => {
      var _a2;
      if (!((_a2 = album.artists) == null ? void 0 : _a2[0]))
        return null;
      return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-12", children: [
        /* @__PURE__ */ jsx(
          SmallArtistImage,
          {
            artist: album.artists[0],
            className: "flex-shrink-0 rounded",
            size: "w-34 h-34"
          }
        ),
        /* @__PURE__ */ jsx(ArtistLink, { artist: album.artists[0] })
      ] });
    }
  },
  {
    key: "release_date",
    allowsSorting: true,
    minWidth: "min-w-100",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Release date" }),
    body: (album) => album.release_date ? /* @__PURE__ */ jsx(FormattedDate, { date: album.release_date }) : null
  },
  {
    key: "track_count",
    allowsSorting: false,
    minWidth: "min-w-70",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Track count" }),
    body: (album) => album.tracks_count ? /* @__PURE__ */ jsx(FormattedNumber, { value: album.tracks_count }) : null
  },
  {
    key: "plays",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Plays" }),
    minWidth: "min-w-70",
    body: (album) => album.plays ? /* @__PURE__ */ jsx(FormattedNumber, { value: album.plays }) : null
  },
  {
    key: "updated_at",
    allowsSorting: true,
    width: "w-100",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Last updated" }),
    body: (album) => album.updated_at ? /* @__PURE__ */ jsx(FormattedDate, { date: album.updated_at }) : ""
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    hideHeader: true,
    visibleInMode: "all",
    align: "end",
    width: "w-84 flex-shrink-0",
    body: (album) => /* @__PURE__ */ jsxs("div", { className: "text-muted", children: [
      /* @__PURE__ */ jsx(IconButton, { size: "md", elementType: Link, to: `${album.id}/insights`, children: /* @__PURE__ */ jsx(BarChartIcon, {}) }),
      /* @__PURE__ */ jsx(IconButton, { size: "md", elementType: Link, to: `${album.id}/edit`, children: /* @__PURE__ */ jsx(EditIcon, {}) })
    ] })
  }
];
const AlbumsDatatableFilters = [
  {
    key: "image",
    label: message("Artwork"),
    description: message("Whether album has any artwork uploaded"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: "02",
      options: [
        {
          key: "01",
          label: message("Has artwork"),
          value: false
        },
        {
          key: "02",
          label: message("Does not have artwork"),
          value: true
        }
      ]
    }
  },
  {
    key: "plays",
    label: message("Plays count"),
    description: message("Number of times this album was played"),
    defaultOperator: FilterOperator.gte,
    operators: ALL_PRIMITIVE_OPERATORS,
    control: {
      type: FilterControlType.Input,
      inputType: "number",
      defaultValue: 100
    }
  },
  createdAtFilter({
    description: message("Date album was created")
  }),
  updatedAtFilter({
    description: message("Date album was last updated")
  }),
  {
    defaultOperator: FilterOperator.has,
    key: "artists",
    label: message("Artist"),
    description: message("Artist this album belongs to"),
    control: {
      type: FilterControlType.SelectModel,
      model: ARTIST_MODEL
    }
  }
];
function useImportAlbum() {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (props) => importAlbum(props),
    onSuccess: () => {
      toast(trans(message("Album imported")));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("albums")
      });
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function importAlbum(payload) {
  return apiClient.post("import-media/single-item", {
    modelType: ALBUM_MODEL,
    spotifyId: payload.spotifyId
  }).then((r) => r.data);
}
function ImportAlbumDialog() {
  const form = useForm();
  const { formId, close } = useDialogContext();
  const importAlbum2 = useImportAlbum();
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Import album" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      Form$1,
      {
        id: formId,
        form,
        onSubmit: (values) => {
          importAlbum2.mutate(values, {
            onSuccess: (response) => {
              close(response.album);
            }
          });
        },
        children: /* @__PURE__ */ jsx(
          FormTextField,
          {
            autoFocus: true,
            required: true,
            name: "spotifyId",
            minLength: 22,
            maxLength: 22,
            label: /* @__PURE__ */ jsx(Trans, { message: "Spotify ID" }),
            description: /* @__PURE__ */ jsx(Trans, { message: "This will also import all artists that collaborated on this album and any tracks that it contains." })
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: () => close(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          form: formId,
          variant: "flat",
          color: "primary",
          type: "submit",
          disabled: importAlbum2.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Import" })
        }
      )
    ] })
  ] });
}
function AlbumsDatatablePage() {
  return /* @__PURE__ */ jsx(
    DataTablePage,
    {
      endpoint: "albums",
      title: /* @__PURE__ */ jsx(Trans, { message: "Albums" }),
      filters: AlbumsDatatableFilters,
      columns: AlbumsDatatableColumns,
      queryParams: {
        withCount: "tracks"
      },
      actions: /* @__PURE__ */ jsx(Actions$5, {}),
      selectedActions: /* @__PURE__ */ jsx(DeleteSelectedItemsAction, {}),
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: musicImage,
          title: /* @__PURE__ */ jsx(Trans, { message: "No albums have been created yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching albums" })
        }
      )
    }
  );
}
function Actions$5() {
  const { spotify_is_setup } = useSettings();
  const navigate = useNavigate$1();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    spotify_is_setup && /* @__PURE__ */ jsxs(
      DialogTrigger,
      {
        type: "modal",
        onClose: (album) => {
          if (album) {
            navigate(`/admin/albums/${album.id}/edit`);
          }
        },
        children: [
          /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Import by spotify ID" }), children: /* @__PURE__ */ jsx(
            IconButton,
            {
              variant: "outline",
              color: "primary",
              className: "flex-shrink-0",
              size: "sm",
              children: /* @__PURE__ */ jsx(PublishIcon, {})
            }
          ) }),
          /* @__PURE__ */ jsx(ImportAlbumDialog, {})
        ]
      }
    ),
    /* @__PURE__ */ jsx(DataTableAddItemButton, { elementType: Link, to: "new", children: /* @__PURE__ */ jsx(Trans, { message: "Add new album" }) })
  ] });
}
const acceptRequest = "/assets/accept-request-9cbcffca.svg";
const BackstageRequestDatatableFilters = [
  {
    key: "type",
    label: message("Type"),
    description: message("Type of the request"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: "become-artist",
      options: [
        {
          key: "become-artist",
          label: message("Become artist"),
          value: "become-artist"
        },
        {
          key: "verify-artist",
          label: message("Verify artist"),
          value: "verify-artist"
        },
        {
          key: "claim-artist",
          label: message("Claim artist"),
          value: "claim-artist"
        }
      ]
    }
  },
  {
    key: "status",
    label: message("Status"),
    description: message("Status of the request"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: "pending",
      options: [
        {
          key: "pending",
          label: message("Pending"),
          value: "pending"
        },
        {
          key: "approved",
          label: message("Approved"),
          value: "approved"
        },
        {
          key: "denied",
          label: message("Denied"),
          value: "denied"
        }
      ]
    }
  },
  {
    key: "user_id",
    label: message("Requester"),
    description: message("User that submitted the request"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.SelectModel,
      model: USER_MODEL
    }
  },
  createdAtFilter({
    description: message("Date request was created")
  }),
  updatedAtFilter({
    description: message("Date request was last updated")
  })
];
function BackstageRequestType({ type }) {
  return /* @__PURE__ */ jsx("span", { className: "capitalize", children: /* @__PURE__ */ jsx(Trans, { message: type.replace("-", " ") }) });
}
const BackstageRequestsDatatableColumns = [
  {
    key: "type",
    allowsSorting: true,
    minWidth: "min-w-100",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Type" }),
    body: (request) => /* @__PURE__ */ jsx(BackstageRequestType, { type: request.type })
  },
  {
    key: "status",
    allowsSorting: true,
    visibleInMode: "all",
    minWidth: "min-w-100",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Status" }),
    body: (request) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-8", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: clsx(
            "w-10 h-10 rounded-full flex-shrink-0",
            request.status === "approved" && "bg-positive",
            request.status === "pending" && "bg-warning",
            request.status === "denied" && "bg-danger"
          )
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "capitalize", children: /* @__PURE__ */ jsx(Trans, { message: request.status }) })
    ] })
  },
  {
    key: "user",
    allowsSorting: true,
    visibleInMode: "all",
    width: "flex-3",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "User" }),
    body: (request) => request.user ? /* @__PURE__ */ jsx(
      NameWithAvatar,
      {
        image: request.user.avatar,
        label: request.user.display_name,
        description: request.user.email
      }
    ) : null
  },
  {
    key: "artist",
    allowsSorting: true,
    width: "flex-3",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Artist" }),
    body: (request) => {
      if (!request.artist)
        return request.artist_name;
      return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-12 w-max", children: [
        /* @__PURE__ */ jsx(
          SmallArtistImage,
          {
            artist: request.artist,
            className: "flex-shrink-0 rounded",
            size: "w-34 h-34"
          }
        ),
        /* @__PURE__ */ jsx(ArtistLink, { artist: request.artist })
      ] });
    }
  },
  {
    key: "created_at",
    allowsSorting: true,
    width: "w-100",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Requested at" }),
    body: (request) => request.created_at ? /* @__PURE__ */ jsx(FormattedDate, { date: request.created_at }) : ""
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    hideHeader: true,
    align: "end",
    visibleInMode: "all",
    width: "w-60 flex-shrink-0",
    body: (request) => /* @__PURE__ */ jsx(
      Button,
      {
        elementType: Link,
        to: `${request.id}`,
        color: "primary",
        variant: "outline",
        size: "xs",
        children: /* @__PURE__ */ jsx(Trans, { message: "View" })
      }
    )
  }
];
function BackstageRequestsDatatablePage() {
  return /* @__PURE__ */ jsx(
    DataTablePage,
    {
      endpoint: "backstage-request",
      title: /* @__PURE__ */ jsx(Trans, { message: "Backstage requests" }),
      filters: BackstageRequestDatatableFilters,
      columns: BackstageRequestsDatatableColumns,
      selectedActions: /* @__PURE__ */ jsx(DeleteSelectedItemsAction, {}),
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: acceptRequest,
          title: /* @__PURE__ */ jsx(Trans, { message: "No requests have been submitted yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching requests" })
        }
      )
    }
  );
}
function useApproveBackstageRequest() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload) => approveRequest(payload),
    onSuccess: () => {
      toast(message("Request approved"));
      navigate("/admin/backstage-requests");
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("backstage-request")
      });
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function approveRequest({
  requestId,
  ...payload
}) {
  return apiClient.post(`backstage-request/${requestId}/approve`, payload).then((r) => r.data);
}
function ApproveBackstageRequestDialog({ request }) {
  const { trans } = useTrans();
  const { close, formId } = useDialogContext();
  const form = useForm();
  const approveRequest2 = useApproveBackstageRequest();
  return /* @__PURE__ */ jsxs(Dialog, { size: "lg", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Approve request" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsxs(
      Form$1,
      {
        form,
        id: formId,
        onSubmit: (values) => {
          approveRequest2.mutate({
            ...values,
            requestId: request.id
          });
        },
        children: [
          /* @__PURE__ */ jsx("div", { className: "mb-14", children: /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to approve this request?" }) }),
          /* @__PURE__ */ jsx("div", { className: "font-bold", children: /* @__PURE__ */ jsx(
            Trans,
            {
              message: "This will create a new artist profile and assign it to ':user', as well as give them artist role on the site.",
              values: { user: request.user.display_name }
            }
          ) }),
          /* @__PURE__ */ jsx(FormSwitch, { name: "markArtistAsVerified", className: "my-24", children: /* @__PURE__ */ jsx(Trans, { message: "Also mark this artist as verified" }) }),
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              label: /* @__PURE__ */ jsx(Trans, { message: "Notes (optional)" }),
              name: "notes",
              placeholder: trans(
                message(
                  "Add any extra notes that should be sent to use via notification email"
                )
              ),
              inputElementType: "textarea",
              rows: 6
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: () => close(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          type: "submit",
          form: formId,
          disabled: approveRequest2.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Approve" })
        }
      )
    ] })
  ] });
}
function useDeleteBackstageRequest() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ requestId }) => deleteRequest(requestId),
    onSuccess: () => {
      toast(message("Request deleted"));
      navigate("/admin/backstage-requests");
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("backstage-request")
      });
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function deleteRequest(requestId) {
  return apiClient.delete(`backstage-request/${requestId}`).then((r) => r.data);
}
function useDenyBackstageRequest() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload) => denyRequest(payload),
    onSuccess: () => {
      toast(message("Request denied"));
      navigate("/admin/backstage-requests");
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("backstage-request")
      });
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function denyRequest({ requestId, ...payload }) {
  return apiClient.post(`backstage-request/${requestId}/deny`, payload).then((r) => r.data);
}
function DenyBackstageRequestDialog({ request }) {
  const { trans } = useTrans();
  const { close, formId } = useDialogContext();
  const form = useForm();
  const denyRequest2 = useDenyBackstageRequest();
  return /* @__PURE__ */ jsxs(Dialog, { size: "lg", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Deny request" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsxs(
      Form$1,
      {
        form,
        id: formId,
        onSubmit: (values) => {
          denyRequest2.mutate({
            ...values,
            requestId: request.id
          });
        },
        children: [
          /* @__PURE__ */ jsx("div", { className: "mb-14", children: /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to deny this request?" }) }),
          /* @__PURE__ */ jsx("div", { className: "font-bold mb-24", children: /* @__PURE__ */ jsx(
            Trans,
            {
              message: "This will mark request as denied and notify ':user'.",
              values: { user: request.user.display_name }
            }
          ) }),
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              label: /* @__PURE__ */ jsx(Trans, { message: "Notes (optional)" }),
              name: "notes",
              placeholder: trans(
                message(
                  "Add any extra notes that should be sent to use via notification email"
                )
              ),
              inputElementType: "textarea",
              rows: 6
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: () => close(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "danger",
          type: "submit",
          form: formId,
          disabled: denyRequest2.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Deny" })
        }
      )
    ] })
  ] });
}
function BackstageRequestViewerHeader({ request }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-14", children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        elementType: Link,
        to: "..",
        relative: "path",
        variant: "outline",
        className: "mr-auto hidden md:inline-flex",
        children: /* @__PURE__ */ jsx(Trans, { message: "Go back" })
      }
    ),
    request.status === "pending" && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
        /* @__PURE__ */ jsx(Button, { variant: "flat", color: "primary", children: /* @__PURE__ */ jsx(Trans, { message: "Approve" }) }),
        /* @__PURE__ */ jsx(ApproveBackstageRequestDialog, { request })
      ] }),
      /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", children: /* @__PURE__ */ jsx(Trans, { message: "Deny" }) }),
        /* @__PURE__ */ jsx(DenyBackstageRequestDialog, { request })
      ] })
    ] }),
    /* @__PURE__ */ jsx(DeleteButton, { request })
  ] });
}
function DeleteButton({ request }) {
  const deleteRequest2 = useDeleteBackstageRequest();
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "modal",
      onClose: (isConfirmed) => {
        if (isConfirmed) {
          deleteRequest2.mutate({ requestId: request.id });
        }
      },
      children: [
        /* @__PURE__ */ jsx(Button, { disabled: deleteRequest2.isPending, variant: "outline", children: /* @__PURE__ */ jsx(Trans, { message: "Delete" }) }),
        /* @__PURE__ */ jsx(
          ConfirmationDialog,
          {
            isDanger: true,
            title: /* @__PURE__ */ jsx(Trans, { message: "Delete request" }),
            body: /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to delete this request?" }),
            confirm: /* @__PURE__ */ jsx(Trans, { message: "Delete" })
          }
        )
      ]
    }
  );
}
function ViewBackstageRequestPage() {
  const query = useBackstageRequest();
  if (query.data) {
    return /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-24", children: [
      /* @__PURE__ */ jsx(BackstageRequestViewerHeader, { request: query.data.request }),
      /* @__PURE__ */ jsx(RequestDetails, { request: query.data.request }),
      /* @__PURE__ */ jsx(VerificationList, { request: query.data.request })
    ] });
  }
  return /* @__PURE__ */ jsx(PageStatus, { query });
}
function RequestDetails({ request }) {
  var _a2;
  return /* @__PURE__ */ jsxs("div", { className: "mt-60", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-14 mt-24 text-2xl", children: /* @__PURE__ */ jsx(Trans, { message: "Request details" }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        Detail,
        {
          name: /* @__PURE__ */ jsx(Trans, { message: "Image" }),
          value: request.data.image ? /* @__PURE__ */ jsx(
            "img",
            {
              src: request.data.image || ((_a2 = request.artist) == null ? void 0 : _a2.image_small),
              className: "rounded",
              alt: ""
            }
          ) : null
        }
      ),
      /* @__PURE__ */ jsx(
        Detail,
        {
          name: /* @__PURE__ */ jsx(Trans, { message: "Type" }),
          value: /* @__PURE__ */ jsx(BackstageRequestType, { type: request.type })
        }
      ),
      /* @__PURE__ */ jsx(
        Detail,
        {
          name: /* @__PURE__ */ jsx(Trans, { message: "Requester" }),
          value: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-8", children: [
            /* @__PURE__ */ jsx(UserAvatar, { user: request.user }),
            request.user.display_name
          ] })
        }
      ),
      request.artist && /* @__PURE__ */ jsx(
        Detail,
        {
          name: /* @__PURE__ */ jsx(Trans, { message: "Artist" }),
          value: /* @__PURE__ */ jsxs("div", { className: "flex w-max items-center gap-12", children: [
            /* @__PURE__ */ jsx(
              SmallArtistImage,
              {
                artist: request.artist,
                className: "flex-shrink-0 rounded",
                size: "w-32 h-32"
              }
            ),
            /* @__PURE__ */ jsx(ArtistLink, { artist: request.artist })
          ] })
        }
      ),
      /* @__PURE__ */ jsx(
        Detail,
        {
          name: /* @__PURE__ */ jsx(Trans, { message: "Requested artist name" }),
          value: /* @__PURE__ */ jsx(BackstageRequestType, { type: request.artist_name })
        }
      ),
      /* @__PURE__ */ jsx(
        Detail,
        {
          name: /* @__PURE__ */ jsx(Trans, { message: "Requested role" }),
          value: request.data.role ? /* @__PURE__ */ jsx(Trans, { message: request.data.role }) : void 0
        }
      ),
      /* @__PURE__ */ jsx(
        Detail,
        {
          name: /* @__PURE__ */ jsx(Trans, { message: "First name" }),
          value: request.data.first_name
        }
      ),
      /* @__PURE__ */ jsx(
        Detail,
        {
          name: /* @__PURE__ */ jsx(Trans, { message: "Last name" }),
          value: request.data.last_name
        }
      ),
      /* @__PURE__ */ jsx(
        Detail,
        {
          name: /* @__PURE__ */ jsx(Trans, { message: "Company" }),
          value: request.data.company
        }
      )
    ] })
  ] });
}
function Detail({ name, value }) {
  return /* @__PURE__ */ jsxs("div", { className: "items-center gap-24 border-b py-12 text-sm md:flex md:py-18", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-8 min-w-200 md:mb-0", children: name }),
    /* @__PURE__ */ jsx("div", { children: value })
  ] });
}
function VerificationList({ request }) {
  return /* @__PURE__ */ jsxs("div", { className: "mt-60", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-14 mt-24 text-2xl", children: /* @__PURE__ */ jsx(Trans, { message: "Attached verification" }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      request.data.passport_scan_entry && /* @__PURE__ */ jsx(
        VerificationListItem,
        {
          icon: /* @__PURE__ */ jsx(DocumentScannerIcon, {}),
          title: /* @__PURE__ */ jsx(Trans, { message: "Passport scan" }),
          description: `${request.data.passport_scan_entry.name} (${prettyBytes(request.data.passport_scan_entry.file_size)})`,
          action: /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
            /* @__PURE__ */ jsx(Button, { variant: "outline", color: "primary", size: "xs", children: /* @__PURE__ */ jsx(Trans, { message: "View" }) }),
            /* @__PURE__ */ jsx(ImageZoomDialog, { image: request.data.passport_scan_entry.url })
          ] })
        }
      ),
      /* @__PURE__ */ jsx(SocialServiceVerification, { request, service: "twitter" }),
      /* @__PURE__ */ jsx(SocialServiceVerification, { request, service: "facebook" })
    ] })
  ] });
}
function SocialServiceVerification({
  service,
  request
}) {
  const account = request.user.social_profiles.find(
    (s) => s.service_name === service
  );
  if (!account)
    return null;
  return /* @__PURE__ */ jsx(
    VerificationListItem,
    {
      icon: service === "twitter" ? /* @__PURE__ */ jsx(TwitterIcon, { className: "text-twitter" }) : /* @__PURE__ */ jsx(FacebookIcon, { className: "text-facebook" }),
      title: /* @__PURE__ */ jsx("span", { className: "capitalize", children: /* @__PURE__ */ jsx(Trans, { message: ":service account", values: { service } }) }),
      action: /* @__PURE__ */ jsx(
        Button,
        {
          elementType: "a",
          className: LinkStyle,
          variant: "outline",
          color: "primary",
          size: "xs",
          href: service === "twitter" ? `https://twitter.com/${account.username}` : `https://facebook.com/${account.username}`,
          target: "_blank",
          children: /* @__PURE__ */ jsx(Trans, { message: "View" })
        }
      ),
      description: account.username
    }
  );
}
function VerificationListItem({
  icon,
  title,
  description,
  action
}) {
  return /* @__PURE__ */ jsxs("div", { className: "mb-8 flex items-center gap-8 rounded border px-14 py-8", children: [
    /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 text-muted", children: cloneElement(icon, { size: "lg" }) }),
    /* @__PURE__ */ jsxs("div", { className: "mr-auto overflow-hidden whitespace-nowrap", children: [
      /* @__PURE__ */ jsx("div", { className: "overflow-hidden overflow-ellipsis text-xs text-muted", children: title }),
      /* @__PURE__ */ jsx("div", { className: "overflow-hidden overflow-ellipsis text-sm", children: description })
    ] }),
    action
  ] });
}
const GenreDatatablePageFilters = [
  createdAtFilter({
    description: message("Date genre was created")
  }),
  updatedAtFilter({
    description: message("Date genre was last updated")
  })
];
function useUpdateGenre(form) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (props) => updateGenre(props),
    onSuccess: () => {
      toast(trans(message("Genre updated")));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("genres")
      });
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function updateGenre({ id, ...payload }) {
  return apiClient.put(`genres/${id}`, payload).then((r) => r.data);
}
function CrupdateGenreFrom({ form, onSubmit, formId }) {
  return /* @__PURE__ */ jsxs(Form$1, { id: formId, form, onSubmit, children: [
    /* @__PURE__ */ jsx(FileUploadProvider, { children: /* @__PURE__ */ jsx(
      FormImageSelector,
      {
        name: "image",
        diskPrefix: "genre_media",
        variant: "input",
        label: /* @__PURE__ */ jsx(Trans, { message: "Image" }),
        className: "mb-24"
      }
    ) }),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: "name",
        label: /* @__PURE__ */ jsx(Trans, { message: "Name" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Unique genre identifier." }),
        className: "mb-24",
        required: true,
        autoFocus: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: "display_name",
        label: /* @__PURE__ */ jsx(Trans, { message: "Display name" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "User friendly genre name." })
      }
    )
  ] });
}
function useImportGenreArtists() {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (props) => importArtists$2(props),
    onSuccess: () => {
      toast(trans(message("Artists imported")));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("genres")
      });
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function importArtists$2(payload) {
  return apiClient.post("import-media/single-item", {
    modelType: GENRE_MODEL,
    genreId: payload.genre.id
  }).then((r) => r.data);
}
function UpdateGenreDialog({ genre }) {
  const { spotify_is_setup } = useSettings();
  const { close, formId } = useDialogContext();
  const form = useForm({
    defaultValues: {
      id: genre.id,
      name: genre.name,
      display_name: genre.display_name,
      image: genre.image
    }
  });
  const updateGenre2 = useUpdateGenre(form);
  const importArtists2 = useImportGenreArtists();
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Update “:name“ genre", values: { name: genre.name } }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      CrupdateGenreFrom,
      {
        formId,
        form,
        onSubmit: (values) => {
          updateGenre2.mutate(values, {
            onSuccess: () => {
              close();
            }
          });
        }
      }
    ) }),
    /* @__PURE__ */ jsxs(
      DialogFooter,
      {
        startAction: spotify_is_setup && /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            onClick: () => importArtists2.mutate({ genre }, { onSuccess: () => close() }),
            disabled: importArtists2.isPending,
            children: /* @__PURE__ */ jsx(Trans, { message: "Import artists" })
          }
        ),
        children: [
          /* @__PURE__ */ jsx(Button, { onClick: () => close(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
          /* @__PURE__ */ jsx(
            Button,
            {
              form: formId,
              disabled: updateGenre2.isPending,
              variant: "flat",
              color: "primary",
              type: "submit",
              children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
            }
          )
        ]
      }
    )
  ] });
}
function useCreateGenre(form) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (props) => createNewTag(props),
    onSuccess: () => {
      toast(trans(message("Genre created")));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("genres")
      });
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function createNewTag(payload) {
  return apiClient.post("genres", payload).then((r) => r.data);
}
function CreateGenreDialog() {
  const { close, formId } = useDialogContext();
  const form = useForm();
  const createGenre = useCreateGenre(form);
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Create new genre" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      CrupdateGenreFrom,
      {
        formId,
        form,
        onSubmit: (values) => {
          createGenre.mutate(values, {
            onSuccess: () => close()
          });
        }
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: () => close(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          form: formId,
          disabled: createGenre.isPending,
          variant: "flat",
          color: "primary",
          type: "submit",
          children: /* @__PURE__ */ jsx(Trans, { message: "Create" })
        }
      )
    ] })
  ] });
}
const columnConfig$3 = [
  {
    key: "name",
    allowsSorting: true,
    visibleInMode: "all",
    width: "flex-3 min-w-200",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Genre" }),
    body: (genre) => /* @__PURE__ */ jsx(NameWithAvatar, { image: genre.image, label: /* @__PURE__ */ jsx(GenreLink, { genre }) })
  },
  {
    key: "display_name",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Display name" }),
    body: (genre) => genre.display_name || genre.name
  },
  {
    key: "artists_count",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Number of artists" }),
    body: (genre) => genre.artists_count
  },
  {
    key: "updated_at",
    allowsSorting: true,
    width: "w-100",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Last updated" }),
    body: (genre) => /* @__PURE__ */ jsx(FormattedDate, { date: genre.updated_at })
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    hideHeader: true,
    align: "end",
    visibleInMode: "all",
    width: "w-42 flex-shrink-0",
    body: (genre) => {
      return /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
        /* @__PURE__ */ jsx(IconButton, { size: "md", className: "text-muted", children: /* @__PURE__ */ jsx(EditIcon, {}) }),
        /* @__PURE__ */ jsx(UpdateGenreDialog, { genre })
      ] });
    }
  }
];
function GenresDatatablePage() {
  return /* @__PURE__ */ jsx(
    DataTablePage,
    {
      endpoint: "genres",
      title: /* @__PURE__ */ jsx(Trans, { message: "Genres" }),
      columns: columnConfig$3,
      filters: GenreDatatablePageFilters,
      queryParams: {
        withCount: "artists"
      },
      actions: /* @__PURE__ */ jsx(Actions$4, {}),
      selectedActions: /* @__PURE__ */ jsx(DeleteSelectedItemsAction, {}),
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: musicImage,
          title: /* @__PURE__ */ jsx(Trans, { message: "No genres have been created yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching genres" })
        }
      )
    }
  );
}
function Actions$4() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(DataTableAddItemButton, { children: /* @__PURE__ */ jsx(Trans, { message: "Add new genre" }) }),
    /* @__PURE__ */ jsx(CreateGenreDialog, {})
  ] }) });
}
const playlistImage = "/assets/playlist-a9b5cb0d.svg";
const PlaylistDatatablePageFilters = [
  {
    key: "public",
    label: message("Visibility"),
    description: message("Whether playlist is publicly viewable"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: "01",
      options: [
        { key: "01", label: message("Private"), value: false },
        { key: "02", label: message("Public"), value: true }
      ]
    }
  },
  {
    key: "collaborative",
    label: message("Collaborative"),
    description: message("Whether playlist is marked as collaborative"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.BooleanToggle,
      defaultValue: true
    }
  },
  {
    key: "plays",
    label: message("Play count"),
    description: message("Number of times this playlist was played"),
    defaultOperator: FilterOperator.gte,
    operators: ALL_PRIMITIVE_OPERATORS,
    control: {
      type: FilterControlType.Input,
      defaultValue: 100,
      inputType: "number"
    }
  },
  {
    key: "views",
    label: message("View count"),
    description: message("Number of times this playlist page was viewed"),
    defaultOperator: FilterOperator.gte,
    operators: ALL_PRIMITIVE_OPERATORS,
    control: {
      type: FilterControlType.Input,
      inputType: "number",
      defaultValue: 100
    }
  },
  createdAtFilter({
    description: message("Date playlist was created")
  }),
  updatedAtFilter({
    description: message("Date playlist was last updated")
  })
];
function useImportPlaylist() {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (props) => importArtists$1(props),
    onSuccess: () => {
      toast(trans(message("Playlist imported")));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("playlists")
      });
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function importArtists$1(payload) {
  return apiClient.post("import-media/single-item", {
    modelType: PLAYLIST_MODEL,
    spotifyId: payload.spotifyId
  }).then((r) => r.data);
}
function ImportPlaylistDialog() {
  const form = useForm();
  const { formId, close } = useDialogContext();
  const importPlaylist = useImportPlaylist();
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Import playlist" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      Form$1,
      {
        id: formId,
        form,
        onSubmit: (values) => {
          importPlaylist.mutate(values, {
            onSuccess: (response) => {
              close(response.playlist);
            }
          });
        },
        children: /* @__PURE__ */ jsx(
          FormTextField,
          {
            autoFocus: true,
            required: true,
            name: "spotifyId",
            minLength: 22,
            maxLength: 22,
            label: /* @__PURE__ */ jsx(Trans, { message: "Spotify ID" }),
            description: /* @__PURE__ */ jsx(Trans, { message: "Only public playlists can be imported." })
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: () => close(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          form: formId,
          variant: "flat",
          color: "primary",
          type: "submit",
          disabled: importPlaylist.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Import" })
        }
      )
    ] })
  ] });
}
const columnConfig$2 = [
  {
    key: "name",
    allowsSorting: true,
    width: "flex-3 min-w-200",
    visibleInMode: "all",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Playlist" }),
    body: (playlist2) => /* @__PURE__ */ jsx(
      NameWithAvatar,
      {
        image: playlist2.image,
        label: /* @__PURE__ */ jsx(PlaylistLink, { playlist: playlist2 })
      }
    )
  },
  {
    key: "owner",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Owner" }),
    width: "flex-2",
    body: (playlist2) => {
      var _a2;
      return playlist2.owner ? /* @__PURE__ */ jsx(
        NameWithAvatar,
        {
          image: (_a2 = playlist2.owner) == null ? void 0 : _a2.avatar,
          label: /* @__PURE__ */ jsx(UserProfileLink, { user: playlist2.owner }),
          description: playlist2.owner.email
        }
      ) : null;
    }
  },
  {
    key: "public",
    allowsSorting: true,
    maxWidth: "max-w-100",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Public" }),
    body: (entry) => entry.public ? /* @__PURE__ */ jsx(CheckIcon, { className: "text-positive icon-md" }) : /* @__PURE__ */ jsx(CloseIcon, { className: "text-danger icon-md" })
  },
  {
    key: "collaborative",
    allowsSorting: true,
    maxWidth: "max-w-100",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Collaborative" }),
    body: (entry) => entry.collaborative ? /* @__PURE__ */ jsx(CheckIcon, { className: "text-positive icon-md" }) : /* @__PURE__ */ jsx(CloseIcon, { className: "text-danger icon-md" })
  },
  {
    key: "views",
    maxWidth: "max-w-100",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Views" }),
    body: (playlist2) => /* @__PURE__ */ jsx(FormattedNumber, { value: playlist2.views })
  },
  {
    key: "updated_at",
    allowsSorting: true,
    width: "w-100",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Last updated" }),
    body: (playlist2) => /* @__PURE__ */ jsx(FormattedDate, { date: playlist2.updated_at })
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    hideHeader: true,
    align: "end",
    width: "w-42 flex-shrink-0",
    visibleInMode: "all",
    body: (playlist2) => {
      return /* @__PURE__ */ jsxs(
        DialogTrigger,
        {
          type: "modal",
          onClose: (updatedPlaylist) => {
            if (updatedPlaylist) {
              invalidateQuery();
            }
          },
          children: [
            /* @__PURE__ */ jsx(IconButton, { size: "md", className: "text-muted", children: /* @__PURE__ */ jsx(EditIcon, {}) }),
            /* @__PURE__ */ jsx(UpdatePlaylistDialog, { playlist: playlist2 })
          ]
        }
      );
    }
  }
];
function PlaylistDatatablePage() {
  return /* @__PURE__ */ jsx(
    DataTablePage,
    {
      endpoint: "playlists",
      title: /* @__PURE__ */ jsx(Trans, { message: "Playlists" }),
      columns: columnConfig$2,
      filters: PlaylistDatatablePageFilters,
      queryParams: {
        with: "owner"
      },
      actions: /* @__PURE__ */ jsx(Actions$3, {}),
      selectedActions: /* @__PURE__ */ jsx(DeleteSelectedItemsAction, {}),
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: playlistImage,
          title: /* @__PURE__ */ jsx(Trans, { message: "No playlists have been created yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching playlists" })
        }
      )
    }
  );
}
function Actions$3() {
  const { spotify_is_setup } = useSettings();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    spotify_is_setup && /* @__PURE__ */ jsxs(
      DialogTrigger,
      {
        type: "modal",
        onClose: (newPlaylist) => {
          if (newPlaylist) {
            invalidateQuery();
          }
        },
        children: [
          /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Import by spotify ID" }), children: /* @__PURE__ */ jsx(
            IconButton,
            {
              variant: "outline",
              color: "primary",
              className: "flex-shrink-0",
              size: "sm",
              children: /* @__PURE__ */ jsx(PublishIcon, {})
            }
          ) }),
          /* @__PURE__ */ jsx(ImportPlaylistDialog, {})
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      DialogTrigger,
      {
        type: "modal",
        onClose: (newPlaylist) => {
          if (newPlaylist) {
            invalidateQuery();
          }
        },
        children: [
          /* @__PURE__ */ jsx(DataTableAddItemButton, { children: /* @__PURE__ */ jsx(Trans, { message: "Add new playlist" }) }),
          /* @__PURE__ */ jsx(CreatePlaylistDialog, {})
        ]
      }
    )
  ] });
}
function invalidateQuery() {
  queryClient.invalidateQueries({ queryKey: DatatableDataQueryKey("playlists") });
}
const lyricImage = "/assets/source-code-49b511f2.svg";
const LyricDatatablePageFilters = [
  createdAtFilter({
    description: message("Date lyric was created")
  }),
  updatedAtFilter({
    description: message("Date lyric was last updated")
  })
];
const columnConfig$1 = [
  {
    key: "track_id",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Track" }),
    width: "flex-3 min-w-200",
    visibleInMode: "all",
    body: (lyric) => lyric.track ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-12", children: [
      /* @__PURE__ */ jsx(
        TrackImage,
        {
          track: lyric.track,
          className: "flex-shrink-0 rounded",
          size: "w-34 h-34"
        }
      ),
      /* @__PURE__ */ jsx(TrackLink, { track: lyric.track, target: "_blank" })
    ] }) : null
  },
  {
    key: "album",
    width: "flex-2",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Album" }),
    body: (lyric) => {
      var _a2;
      return ((_a2 = lyric.track) == null ? void 0 : _a2.album) ? /* @__PURE__ */ jsx(AlbumLink, { album: lyric.track.album }) : null;
    }
  },
  {
    key: "updated_at",
    allowsSorting: true,
    width: "w-100",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Last updated" }),
    body: (lyric) => /* @__PURE__ */ jsx(FormattedDate, { date: lyric.updated_at })
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    hideHeader: true,
    align: "end",
    visibleInMode: "all",
    width: "w-42 flex-shrink-0",
    body: (lyric) => {
      return /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
        /* @__PURE__ */ jsx(IconButton, { size: "md", className: "text-muted", children: /* @__PURE__ */ jsx(EditIcon, {}) }),
        /* @__PURE__ */ jsx(UpdateLyricDialog, { lyric })
      ] });
    }
  }
];
function LyricsDatatablePage() {
  return /* @__PURE__ */ jsx(
    DataTablePage,
    {
      endpoint: "lyrics",
      title: /* @__PURE__ */ jsx(Trans, { message: "Lyrics" }),
      columns: columnConfig$1,
      filters: LyricDatatablePageFilters,
      queryParams: {
        with: "track.album.artists"
      },
      actions: /* @__PURE__ */ jsx(Actions$2, {}),
      selectedActions: /* @__PURE__ */ jsx(DeleteSelectedItemsAction, {}),
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: lyricImage,
          title: /* @__PURE__ */ jsx(Trans, { message: "No lyrics have been created yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching lyrics" })
        }
      )
    }
  );
}
function Actions$2() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(DataTableAddItemButton, { children: /* @__PURE__ */ jsx(Trans, { message: "Add new lyric" }) }),
    /* @__PURE__ */ jsx(CreateLyricDialog, {})
  ] }) });
}
const ArtistDatatableColumns = [
  {
    key: "name",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Artist" }),
    width: "flex-3",
    visibleInMode: "all",
    body: (artist) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-12 w-max", children: [
      /* @__PURE__ */ jsx(
        SmallArtistImage,
        {
          artist,
          className: "flex-shrink-0",
          size: "w-34 h-34 rounded"
        }
      ),
      /* @__PURE__ */ jsx(ArtistLink, { artist, target: "_blank" })
    ] })
  },
  {
    key: "albums_count",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Album count" }),
    body: (artist) => artist.albums_count ? /* @__PURE__ */ jsx(FormattedNumber, { value: artist.albums_count }) : null
  },
  {
    key: "plays",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Total plays" }),
    body: (artist) => artist.plays ? /* @__PURE__ */ jsx(FormattedNumber, { value: artist.plays }) : null
  },
  {
    key: "views",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Page views" }),
    body: (artist) => artist.views ? /* @__PURE__ */ jsx(FormattedNumber, { value: artist.views }) : null
  },
  {
    key: "updated_at",
    allowsSorting: true,
    maxWidth: "max-w-100",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Last updated" }),
    body: (artist) => artist.updated_at ? /* @__PURE__ */ jsx(FormattedDate, { date: artist.updated_at }) : ""
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    hideHeader: true,
    visibleInMode: "all",
    align: "end",
    width: "w-84 flex-shrink-0",
    body: (artist) => /* @__PURE__ */ jsxs("div", { className: "text-muted", children: [
      /* @__PURE__ */ jsx(IconButton, { size: "md", elementType: Link, to: `${artist.id}/insights`, children: /* @__PURE__ */ jsx(BarChartIcon, {}) }),
      /* @__PURE__ */ jsx(IconButton, { size: "md", elementType: Link, to: `${artist.id}/edit`, children: /* @__PURE__ */ jsx(EditIcon, {}) })
    ] })
  }
];
const ArtistDatatableFilters = [
  {
    key: "verified",
    label: message("Status"),
    description: message("Whether artist is verified"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: "01",
      options: [
        {
          key: "01",
          label: message("Verified"),
          value: true
        },
        {
          key: "02",
          label: message("Not verified"),
          value: false
        }
      ]
    }
  },
  {
    key: "plays",
    label: message("Plays count"),
    description: message("Number of times artist tracks have been played"),
    defaultOperator: FilterOperator.gte,
    operators: ALL_PRIMITIVE_OPERATORS,
    control: {
      type: FilterControlType.Input,
      inputType: "number",
      defaultValue: 100
    }
  },
  {
    key: "views",
    label: message("Views count"),
    description: message("Number of times artist page have been viewed"),
    defaultOperator: FilterOperator.gte,
    operators: ALL_PRIMITIVE_OPERATORS,
    control: {
      type: FilterControlType.Input,
      inputType: "number",
      defaultValue: 100
    }
  },
  createdAtFilter({
    description: message("Date artist was created")
  }),
  updatedAtFilter({
    description: message("Date artist was last updated")
  })
];
function useImportArtist() {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (props) => importArtists(props),
    onSuccess: () => {
      toast(trans(message("Artist imported")));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("artists")
      });
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function importArtists(payload) {
  return apiClient.post("import-media/single-item", {
    modelType: ARTIST_MODEL,
    spotifyId: payload.spotifyId,
    importSimilarArtists: payload.importSimilarArtists,
    importAlbums: payload.importAlbums
  }).then((r) => r.data);
}
function ImportArtistDialog() {
  const form = useForm({
    defaultValues: {
      importAlbums: true,
      importSimilarArtists: true
    }
  });
  const { formId, close } = useDialogContext();
  const importArtist = useImportArtist();
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Import artist" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsxs(
      Form$1,
      {
        id: formId,
        form,
        onSubmit: (values) => {
          importArtist.mutate(values, {
            onSuccess: (response) => {
              close(response.artist);
            }
          });
        },
        children: [
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              autoFocus: true,
              required: true,
              name: "spotifyId",
              minLength: 22,
              maxLength: 22,
              label: /* @__PURE__ */ jsx(Trans, { message: "Spotify ID" }),
              className: "mb-24"
            }
          ),
          /* @__PURE__ */ jsx(FormSwitch, { name: "importAlbums", className: "mb-24", children: /* @__PURE__ */ jsx(Trans, { message: "Import albums" }) }),
          /* @__PURE__ */ jsx(FormSwitch, { name: "importSimilarArtists", children: /* @__PURE__ */ jsx(Trans, { message: "Import similar artists" }) })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: () => close(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          form: formId,
          variant: "flat",
          color: "primary",
          type: "submit",
          disabled: importArtist.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Import" })
        }
      )
    ] })
  ] });
}
function ArtistDatatablePage() {
  return /* @__PURE__ */ jsx(
    DataTablePage,
    {
      endpoint: "artists",
      title: /* @__PURE__ */ jsx(Trans, { message: "Artists" }),
      filters: ArtistDatatableFilters,
      columns: ArtistDatatableColumns,
      actions: /* @__PURE__ */ jsx(Actions$1, {}),
      selectedActions: /* @__PURE__ */ jsx(DeleteSelectedItemsAction, {}),
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: musicImage,
          title: /* @__PURE__ */ jsx(Trans, { message: "No artists have been created yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching artists" })
        }
      )
    }
  );
}
function Actions$1() {
  const { spotify_is_setup } = useSettings();
  const navigate = useNavigate$1();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    spotify_is_setup && /* @__PURE__ */ jsxs(
      DialogTrigger,
      {
        type: "modal",
        onClose: (artist) => {
          if (artist) {
            navigate(`/admin/artists/${artist.id}/edit`);
          }
        },
        children: [
          /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Import by spotify ID" }), children: /* @__PURE__ */ jsx(
            IconButton,
            {
              variant: "outline",
              color: "primary",
              className: "flex-shrink-0",
              size: "sm",
              children: /* @__PURE__ */ jsx(PublishIcon, {})
            }
          ) }),
          /* @__PURE__ */ jsx(ImportArtistDialog, {})
        ]
      }
    ),
    /* @__PURE__ */ jsx(DataTableAddItemButton, { elementType: Link, to: "new", children: /* @__PURE__ */ jsx(Trans, { message: "Add new artist" }) })
  ] });
}
const endpoint$1 = "artists";
function useCreateArtist(form) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (payload) => createAlbum(payload),
    onSuccess: () => {
      toast(trans(message("Artist created")));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey(endpoint$1)
      });
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function createAlbum(payload) {
  return apiClient.post(endpoint$1, payload).then((r) => r.data);
}
function CreateArtistPage({ wrapInContainer, showExternalFields }) {
  const navigate = useNavigate$1();
  const form = useForm();
  const createArtist = useCreateArtist(form);
  return /* @__PURE__ */ jsx(
    CrupdateResourceLayout,
    {
      form,
      onSubmit: (values) => {
        createArtist.mutate(values, {
          onSuccess: (response) => {
            navigate(`../${response.artist.id}/edit`, {
              relative: "path",
              replace: true
            });
          }
        });
      },
      title: /* @__PURE__ */ jsx(Trans, { message: "Add new artist" }),
      isLoading: createArtist.isPending,
      disableSaveWhenNotDirty: true,
      wrapInContainer,
      children: /* @__PURE__ */ jsx(CrupdateArtistForm, { showExternalFields })
    }
  );
}
function DeleteCommentsButton({
  commentIds,
  variant = "outline",
  size = "xs"
}) {
  const deleteComments = useDeleteComments();
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "modal",
      onClose: (isConfirmed) => {
        if (isConfirmed) {
          deleteComments.mutate(
            { commentIds },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["comment"] });
              }
            }
          );
        }
      },
      children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant,
            size,
            color: "danger",
            className: "mr-10",
            disabled: deleteComments.isPending,
            children: /* @__PURE__ */ jsx(Trans, { message: "Delete" })
          }
        ),
        /* @__PURE__ */ jsx(
          ConfirmationDialog,
          {
            isDanger: true,
            title: /* @__PURE__ */ jsx(
              Trans,
              {
                message: "Delete [one comment|other :count comments]",
                values: { count: commentIds.length }
              }
            ),
            body: commentIds.length > 1 ? /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to delete selected comments?" }) : /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to delete this comment?" }),
            confirm: /* @__PURE__ */ jsx(Trans, { message: "Delete" })
          }
        )
      ]
    }
  );
}
function useUpdateComment() {
  return useMutation({
    mutationFn: (props) => updateComment(props),
    onSuccess: () => {
      toast(message("Comment updated"));
      queryClient.invalidateQueries({ queryKey: ["comment"] });
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function updateComment({ commentId, content }) {
  return apiClient.put(`comment/${commentId}`, { content }).then((r) => r.data);
}
function useRestoreComments() {
  return useMutation({
    mutationFn: (payload) => restoreComment(payload),
    onSuccess: (response, payload) => {
      toast(
        message("Restored [one 1 comment|other :count comments]", {
          values: { count: payload.commentIds.length }
        })
      );
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function restoreComment({ commentIds }) {
  return apiClient.post("comment/restore", { commentIds }).then((r) => r.data);
}
function RestoreCommentsButton({
  commentIds,
  variant = "outline",
  size = "xs"
}) {
  const restoreComments = useRestoreComments();
  return /* @__PURE__ */ jsx(
    Button,
    {
      variant,
      size,
      className: "mr-10",
      disabled: restoreComments.isPending,
      color: "primary",
      onClick: () => {
        restoreComments.mutate(
          { commentIds },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["comment"] });
            }
          }
        );
      },
      children: /* @__PURE__ */ jsx(Trans, { message: "Restore" })
    }
  );
}
function CommentDatatableItem({ comment, isSelected, onToggle }) {
  const [isEditing, setIsEditing] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: clsx("p-14 border-b", comment.deleted && "bg-danger/6"), children: [
    comment.commentable && /* @__PURE__ */ jsx(
      CommentableHeader,
      {
        isSelected,
        onToggle,
        commentable: comment.commentable
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-10 pt-14 md:pl-20", children: [
      /* @__PURE__ */ jsx(UserAvatar, { className: "flex-shrink-0", user: comment.user, size: "md" }),
      /* @__PURE__ */ jsxs("div", { className: "flex-auto", children: [
        /* @__PURE__ */ jsx(CommentHeader, { comment }),
        isEditing ? /* @__PURE__ */ jsx(
          EditCommentForm,
          {
            comment,
            onClose: (isSaved) => {
              setIsEditing(false);
              if (isSaved) {
                queryClient.invalidateQueries({ queryKey: ["comment"] });
              }
            }
          }
        ) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm my-14", children: comment.content }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-24 justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              comment.deleted ? /* @__PURE__ */ jsx(RestoreCommentsButton, { commentIds: [comment.id] }) : /* @__PURE__ */ jsx(DeleteCommentsButton, { commentIds: [comment.id] }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "outline",
                  size: "xs",
                  onClick: () => {
                    setIsEditing(true);
                  },
                  children: /* @__PURE__ */ jsx(Trans, { message: "Edit" })
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-danger", children: /* @__PURE__ */ jsx(
              Trans,
              {
                message: "Reported [one 1 time|other :count times]",
                values: { count: comment.reports_count }
              }
            ) })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function CommentableHeader({
  isSelected,
  onToggle,
  commentable
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
    /* @__PURE__ */ jsx("div", { className: "mr-14", children: /* @__PURE__ */ jsx(Checkbox, { checked: isSelected, onChange: () => onToggle() }) }),
    commentable.image && /* @__PURE__ */ jsx(
      "img",
      {
        className: "w-20 h-20 rounded overflow-hidden object-cover mr-6",
        src: commentable.image,
        alt: ""
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "text-sm mr-4", children: commentable.name }),
    /* @__PURE__ */ jsxs("div", { className: "text-muted text-xs", children: [
      "(",
      commentable.model_type,
      ")"
    ] })
  ] });
}
function CommentHeader({ comment }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-sm", children: [
    /* @__PURE__ */ jsx("div", { children: comment.user && /* @__PURE__ */ jsx(UserDisplayName, { user: comment.user, show: "display_name" }) }),
    /* @__PURE__ */ jsx("div", { children: "•" }),
    /* @__PURE__ */ jsx("time", { children: /* @__PURE__ */ jsx(FormattedRelativeTime, { date: comment.created_at }) }),
    comment.user && /* @__PURE__ */ jsx("div", { className: "ml-auto hidden md:block", children: /* @__PURE__ */ jsx(UserDisplayName, { user: comment.user, show: "email" }) })
  ] });
}
function EditCommentForm({ comment, onClose }) {
  const [content, setContent] = useState(comment.content);
  const updateComment2 = useUpdateComment();
  return /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: (e) => {
        e.preventDefault();
        updateComment2.mutate(
          { commentId: comment.id, content },
          { onSuccess: () => onClose(true) }
        );
      },
      children: [
        /* @__PURE__ */ jsx(
          TextField,
          {
            autoFocus: true,
            inputElementType: "textarea",
            className: "my-14",
            rows: 2,
            value: content,
            onChange: (e) => setContent(e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            size: "xs",
            variant: "outline",
            color: "primary",
            type: "submit",
            className: "mr-6",
            disabled: updateComment2.isPending,
            children: /* @__PURE__ */ jsx(Trans, { message: "Save edit" })
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            size: "xs",
            variant: "outline",
            className: "mr-6",
            onClick: (e) => onClose(false),
            disabled: updateComment2.isPending,
            children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" })
          }
        )
      ]
    }
  );
}
function UserDisplayName({ user, show }) {
  const { auth } = useContext(SiteConfigContext);
  if (auth.getUserProfileLink) {
    return /* @__PURE__ */ jsx(
      Link,
      {
        to: auth.getUserProfileLink(user),
        className: LinkStyle,
        target: "_blank",
        children: user[show]
      }
    );
  }
  return /* @__PURE__ */ jsx("div", { className: "text-muted", children: user[show] });
}
const publicDiscussionsImage = "/assets/public-discussion-77ceae12.svg";
const CommentsDatatableFilters = [
  {
    key: "deleted",
    label: message("Status"),
    description: message("Whether comment is active or deleted"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: "01",
      options: [
        {
          key: "01",
          label: message("Active"),
          value: false
        },
        {
          key: "02",
          label: message("Deleted"),
          value: true
        }
      ]
    }
  },
  {
    key: "reports",
    label: message("Reported"),
    description: message("Show only reported comments"),
    defaultOperator: FilterOperator.has,
    control: {
      type: FilterControlType.BooleanToggle,
      defaultValue: "*"
    }
  },
  {
    key: "user_id",
    label: message("User"),
    description: message("User comment was created by"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.SelectModel,
      model: USER_MODEL
    }
  },
  createdAtFilter({
    description: message("Date comment was created")
  }),
  updatedAtFilter({
    description: message("Date comment was last updated")
  })
];
function CommentsDatatablePage({ hideTitle, commentable }) {
  var _a2;
  const filters = useMemo(() => {
    return CommentsDatatableFilters.filter(
      (f) => f.key !== "commentable_id" || !commentable
    );
  }, [commentable]);
  const { encodedFilters } = useBackendFilterUrlParams(filters);
  const [params, setParams] = useState({ perPage: 15 });
  const [selectedComments, setSelectedComments] = useState([]);
  const query = useDatatableData(
    "comment",
    {
      ...params,
      with: "commentable",
      withCount: "reports",
      filters: encodedFilters,
      commentable_type: commentable == null ? void 0 : commentable.model_type,
      commentable_id: commentable == null ? void 0 : commentable.id
    },
    void 0,
    () => {
      setSelectedComments([]);
    }
  );
  const toggleComment = useCallback(
    (id) => {
      const newValues = [...selectedComments];
      if (!newValues.includes(id)) {
        newValues.push(id);
      } else {
        const index = newValues.indexOf(id);
        newValues.splice(index, 1);
      }
      setSelectedComments(newValues);
    },
    [selectedComments, setSelectedComments]
  );
  const isFiltering = !!(params.query || params.filters || encodedFilters);
  const pagination = (_a2 = query.data) == null ? void 0 : _a2.pagination;
  return /* @__PURE__ */ jsxs("div", { className: clsx(!hideTitle && "p-12 md:p-24"), children: [
    /* @__PURE__ */ jsxs("div", { className: clsx("mb-16"), children: [
      /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Comments" }) }),
      !hideTitle && /* @__PURE__ */ jsx("h1", { className: "text-3xl font-light", children: /* @__PURE__ */ jsx(Trans, { message: "Comments" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: selectedComments.length ? /* @__PURE__ */ jsx(
        SelectedStateDatatableHeader,
        {
          selectedItemsCount: selectedComments.length,
          actions: /* @__PURE__ */ jsx(
            DeleteCommentsButton,
            {
              size: "sm",
              variant: "flat",
              commentIds: selectedComments
            }
          )
        },
        "selected"
      ) : /* @__PURE__ */ jsx(
        DataTableHeader,
        {
          filters,
          searchValue: params.query,
          onSearchChange: (query2) => setParams({ ...params, query: query2 })
        },
        "default"
      ) }),
      /* @__PURE__ */ jsx(FilterList, { className: "mb-14", filters }),
      query.isLoading ? /* @__PURE__ */ jsx(FullPageLoader, { className: "min-h-200" }) : /* @__PURE__ */ jsx("div", { className: "rounded border-x border-t", children: pagination == null ? void 0 : pagination.data.map((comment) => /* @__PURE__ */ jsx(
        CommentDatatableItem,
        {
          comment,
          isSelected: selectedComments.includes(comment.id),
          onToggle: () => toggleComment(comment.id)
        },
        comment.id
      )) }),
      (query.isFetched || query.isPlaceholderData) && !(pagination == null ? void 0 : pagination.data.length) ? /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          className: "pt-50",
          isFiltering,
          image: publicDiscussionsImage,
          title: /* @__PURE__ */ jsx(Trans, { message: "No comments have been created yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching comments" })
        }
      ) : void 0,
      /* @__PURE__ */ jsx(
        DataTablePaginationFooter,
        {
          className: "mt-10",
          query,
          onPageChange: (page) => setParams({ ...params, page }),
          onPerPageChange: (perPage) => setParams({ ...params, perPage })
        }
      )
    ] })
  ] });
}
function ButtonGroup({
  children,
  color,
  variant,
  radius = "rounded-button",
  size,
  className,
  value,
  onChange,
  multiple,
  disabled
}) {
  const isActive = (childValue) => {
    if (value === void 0)
      return false;
    if (multiple) {
      return value.includes(childValue);
    }
    return childValue === value;
  };
  const toggleMultipleValue = (childValue) => {
    const newValue = [...value];
    const childIndex = value.indexOf(childValue);
    if (childIndex > -1) {
      newValue.splice(childIndex, 1);
    } else {
      newValue.push(childValue);
    }
    return newValue;
  };
  const buttons = React.Children.map(children, (button, i) => {
    if (React.isValidElement(button)) {
      const active = isActive(button.props.value);
      const adjustedColor = active ? "primary" : color;
      return React.cloneElement(button, {
        color: active ? "primary" : color,
        variant,
        size,
        radius: null,
        disabled: button.props.disabled || disabled,
        ...button.props,
        onClick: (e) => {
          if (button.props.onClick) {
            button.props.onClick(e);
          }
          if (!onChange)
            return;
          if (multiple) {
            onChange == null ? void 0 : onChange(toggleMultipleValue(button.props.value));
          } else {
            onChange == null ? void 0 : onChange(button.props.value);
          }
        },
        className: clsx(
          button.props.className,
          // borders are hidden via negative margin, make sure both are visible for active item
          active ? "z-20" : "z-10",
          getStyle(i, children, radius, adjustedColor)
        )
      });
    }
  });
  return /* @__PURE__ */ jsx("div", { className: clsx(radius, "isolate inline-flex", className), children: buttons });
}
function getStyle(i, children, radius, color) {
  if (i === 0) {
    return clsx(
      radius,
      "rounded-tr-none rounded-br-none",
      !color && "border-r-transparent disabled:border-r-transparent"
    );
  }
  if (i === children.length - 1) {
    return clsx(radius, "rounded-tl-none rounded-bl-none -ml-1");
  }
  return clsx(
    "rounded-none -ml-1",
    !color && "border-r-transparent disabled:border-r-transparent"
  );
}
const TrendingDownIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "m16 18 2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6h-6z" }),
  "TrendingDownOutlined"
);
function BarChart({
  data,
  direction = "vertical",
  individualBarColors = false,
  className,
  ...props
}) {
  const { localeCode } = useSelectedLocale();
  const formattedData = useMemo(() => {
    const formattedData2 = formatReportData(data, { localeCode });
    formattedData2.datasets = formattedData2.datasets.map((dataset, i) => ({
      ...dataset,
      backgroundColor: individualBarColors ? ChartColors.map((c) => c[1]) : ChartColors[i][1],
      borderColor: individualBarColors ? ChartColors.map((c) => c[0]) : ChartColors[i][0],
      borderWidth: 2
    }));
    return formattedData2;
  }, [data, localeCode, individualBarColors]);
  const isHorizontal = direction === "horizontal";
  const options = useMemo(() => {
    return {
      indexAxis: isHorizontal ? "y" : "x",
      parsing: {
        xAxisKey: isHorizontal ? "value" : "label",
        yAxisKey: isHorizontal ? "label" : "value"
      }
    };
  }, [isHorizontal]);
  return /* @__PURE__ */ jsx(
    BaseChart,
    {
      type: "bar",
      className: clsx(className, "min-w-500"),
      data: formattedData,
      options,
      ...props
    }
  );
}
const AdminReportPageColGap = "gap-12 md:gap-24 mb-12 md:mb-24";
const rowClassName = `flex flex-col md:flex-row md:items-center overflow-x-auto ${AdminReportPageColGap}`;
function VisitorsReportCharts({
  report,
  isLoading
}) {
  const totalViews = report == null ? void 0 : report.pageViews.total;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: rowClassName, children: [
      /* @__PURE__ */ jsx(
        LineChart,
        {
          isLoading,
          className: "flex-auto",
          data: report == null ? void 0 : report.pageViews,
          title: /* @__PURE__ */ jsx(Trans, { message: "Pageviews" }),
          description: totalViews ? /* @__PURE__ */ jsx(
            Trans,
            {
              message: ":count total views",
              values: { count: /* @__PURE__ */ jsx(FormattedNumber, { value: totalViews }) }
            }
          ) : null
        }
      ),
      /* @__PURE__ */ jsx(
        PolarAreaChart,
        {
          isLoading,
          data: report == null ? void 0 : report.devices,
          title: /* @__PURE__ */ jsx(Trans, { message: "Top devices" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: rowClassName, children: [
      /* @__PURE__ */ jsx(
        BarChart,
        {
          isLoading,
          data: report == null ? void 0 : report.browsers,
          className: "flex-auto md:w-1/3",
          direction: "horizontal",
          individualBarColors: true,
          hideLegend: true,
          title: /* @__PURE__ */ jsx(Trans, { message: "Top browsers" })
        }
      ),
      /* @__PURE__ */ jsx(
        GeoChart,
        {
          isLoading,
          className: "flex-auto",
          data: report == null ? void 0 : report.locations,
          title: /* @__PURE__ */ jsx(Trans, { message: "Top locations" })
        }
      )
    ] })
  ] });
}
const TrendingFlatIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "m22 12-4-4v3H3v2h15v3l4-4z" }),
  "TrendingFlatOutlined"
);
function AdminHeaderReport({ report, isLoading }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `flex h-[97px] flex-shrink-0 items-center overflow-x-auto ${AdminReportPageColGap}`,
      children: report == null ? void 0 : report.map((datum) => /* @__PURE__ */ jsx(ReportItem, { datum, isLoading }, datum.name))
    }
  );
}
function ReportItem({ datum, isLoading = false }) {
  let icon;
  if (isValidElement(datum.icon)) {
    icon = cloneElement(datum.icon, { size: "lg" });
  } else {
    const IconEl = createSvgIconFromTree(datum.icon);
    icon = /* @__PURE__ */ jsx(IconEl, { size: "lg" });
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "rounded-panel flex h-full flex-auto items-center gap-18 whitespace-nowrap border p-20",
      children: [
        /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 rounded-lg bg-primary-light/20 p-10 text-primary", children: icon }),
        /* @__PURE__ */ jsxs("div", { className: "flex-auto", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between gap-20", children: /* @__PURE__ */ jsx("div", { className: "text-lg font-bold text-main", children: /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: isLoading ? /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, children: /* @__PURE__ */ jsx(Skeleton, { className: "min-w-24" }) }, "skeleton") : /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, children: /* @__PURE__ */ jsx(FormattedValue, { datum }) }, "value") }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-20", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-sm text-muted", children: datum.name }),
            (datum.percentageChange != null || datum.previousValue != null) && /* @__PURE__ */ jsx("div", { className: "flex items-center gap-10", children: /* @__PURE__ */ jsx(TrendingIndicator, { datum }) })
          ] })
        ] })
      ]
    },
    datum.name
  );
}
function FormattedValue({ datum }) {
  switch (datum.type) {
    case "fileSize":
      return /* @__PURE__ */ jsx(FormattedBytes, { bytes: datum.currentValue });
    case "percentage":
      return /* @__PURE__ */ jsx(
        FormattedNumber,
        {
          value: datum.currentValue,
          style: "percent",
          maximumFractionDigits: 1
        }
      );
    default:
      return /* @__PURE__ */ jsx(FormattedNumber, { value: datum.currentValue });
  }
}
function TrendingIndicator({ datum }) {
  const percentage = calculatePercentage(datum);
  let icon;
  if (percentage > 0) {
    icon = /* @__PURE__ */ jsx(TrendingUpIcon, { size: "md", className: "text-positive" });
  } else if (percentage === 0) {
    icon = /* @__PURE__ */ jsx(TrendingFlatIcon, { className: "text-muted" });
  } else {
    icon = /* @__PURE__ */ jsx(TrendingDownIcon, { className: "text-danger" });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    icon,
    /* @__PURE__ */ jsxs("div", { className: "text-sm font-semibold text-muted", children: [
      percentage,
      "%"
    ] })
  ] });
}
function calculatePercentage({
  percentageChange,
  previousValue,
  currentValue
}) {
  if (percentageChange != null || previousValue == null || currentValue == null) {
    return percentageChange ?? 0;
  }
  if (previousValue === 0) {
    return 100;
  }
  return Math.round((currentValue - previousValue) / previousValue * 100);
}
const Endpoint$1 = "admin/reports";
function useAdminReport(payload = {}) {
  return useQuery({
    queryKey: [Endpoint$1, payload],
    queryFn: () => fetchAnalyticsReport(payload),
    placeholderData: keepPreviousData
  });
}
function fetchAnalyticsReport({
  types,
  dateRange
}) {
  const params = {};
  if (types) {
    params.types = types.join(",");
  }
  if (dateRange) {
    params.startDate = dateRange.start.toAbsoluteString();
    params.endDate = dateRange.end.toAbsoluteString();
    params.timezone = dateRange.start.timeZone;
  }
  return apiClient.get(Endpoint$1, { params }).then((response) => response.data);
}
function BemusicAdminReportPage() {
  const [dateRange, setDateRange] = useState(() => {
    return DateRangePresets[2].getRangeValue();
  });
  const params = useParams();
  const channel = params["*"] || "plays";
  const title = channel === "visitors" ? /* @__PURE__ */ jsx(Trans, { message: "Visitors report" }) : /* @__PURE__ */ jsx(Trans, { message: "Plays report" });
  return /* @__PURE__ */ jsxs("div", { className: "min-h-full overflow-x-hidden p-12 md:p-24", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-24 items-center justify-between gap-24 md:flex", children: [
      /* @__PURE__ */ jsx(StaticPageTitle, { children: title }),
      /* @__PURE__ */ jsx("h1", { className: "mb-24 text-3xl font-light md:mb-0", children: title }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-shrink-0 items-center justify-between gap-10 md:gap-24", children: [
        /* @__PURE__ */ jsxs(ButtonGroup, { variant: "outline", value: channel, children: [
          /* @__PURE__ */ jsx(Button, { value: "plays", elementType: Link, to: "plays", children: /* @__PURE__ */ jsx(Trans, { message: "Plays" }) }),
          /* @__PURE__ */ jsx(Button, { value: "visitors", elementType: Link, to: "visitors", children: /* @__PURE__ */ jsx(Trans, { message: "Visitors" }) })
        ] }),
        /* @__PURE__ */ jsx(ReportDateSelector, { value: dateRange, onChange: setDateRange })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Header, { dateRange }),
    /* @__PURE__ */ jsx(Outlet, { context: { dateRange, setDateRange } })
  ] });
}
function Header({ dateRange }) {
  const { data } = useAdminReport({ types: ["header"], dateRange });
  return /* @__PURE__ */ jsx(AdminHeaderReport, { report: data == null ? void 0 : data.headerReport });
}
function AdminInsightsReport() {
  const { dateRange } = useOutletContext();
  return /* @__PURE__ */ jsx(
    InsightsReportCharts,
    {
      dateRange,
      model: "track_play=0",
      showTracks: true,
      showArtistsAndAlbums: true
    }
  );
}
function AdminVisitorsReport() {
  const { dateRange } = useOutletContext();
  const { data, isLoading, isPlaceholderData } = useAdminReport({
    types: ["visitors"],
    dateRange
  });
  return /* @__PURE__ */ jsx(
    VisitorsReportCharts,
    {
      isLoading: isLoading || isPlaceholderData,
      report: data == null ? void 0 : data.visitorsReport
    }
  );
}
function ChannelEditorTabs({ children }) {
  return /* @__PURE__ */ jsxs(Tabs, { isLazy: true, children: [
    /* @__PURE__ */ jsxs(TabList, { children: [
      /* @__PURE__ */ jsx(Tab, { children: /* @__PURE__ */ jsx(Trans, { message: "Details" }) }),
      /* @__PURE__ */ jsx(Tab, { children: /* @__PURE__ */ jsx(Trans, { message: "SEO" }) })
    ] }),
    /* @__PURE__ */ jsxs(TabPanels, { className: "pt-20", children: [
      /* @__PURE__ */ jsx(TabPanel, { children }),
      /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(SeoFields, {}) })
    ] })
  ] });
}
function SeoFields() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: "config.seoTitle",
        label: /* @__PURE__ */ jsx(Trans, { message: "SEO title" }),
        className: "mb-24"
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: "config.seoDescription",
        label: /* @__PURE__ */ jsx(Trans, { message: "SEO description" }),
        inputElementType: "textarea",
        rows: 6
      }
    )
  ] });
}
function SlugEditor({
  host,
  value: initialValue = "",
  placeholder,
  onChange,
  className,
  inputRef,
  onInputBlur,
  showLinkIcon = true,
  pattern,
  minLength,
  maxLength,
  hideButton,
  ...props
}) {
  const { base_url } = useSettings();
  const prefix = props.prefix ? `/${props.prefix}` : "";
  const suffix = props.suffix ? `/${props.suffix}` : "";
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  host = host || base_url;
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  const handleSubmit = () => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
      if (value) {
        onChange == null ? void 0 : onChange(value);
      }
    }
  };
  let preview = "";
  if (value) {
    preview = value;
  } else if (placeholder) {
    preview = slugifyString(placeholder);
  }
  return (
    // can't use <form/> here as component might be used inside another form
    /* @__PURE__ */ jsxs("div", { className: clsx("flex items-center", className), children: [
      showLinkIcon && /* @__PURE__ */ jsx(LinkIcon, { className: "icon-md text-muted" }),
      /* @__PURE__ */ jsxs("div", { className: "text-primary ml-6 mr-14", children: [
        host,
        prefix,
        !isEditing && preview && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("span", { children: "/" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: preview })
        ] }),
        !isEditing ? suffix : null
      ] }),
      isEditing && /* @__PURE__ */ jsx(
        TextField,
        {
          pattern,
          minLength,
          maxLength,
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          },
          ref: inputRef,
          "aria-label": "slug",
          autoFocus: true,
          className: "mr-14",
          size: "2xs",
          value,
          onBlur: onInputBlur,
          onChange: (e) => {
            setValue(e.target.value);
          }
        }
      ),
      !hideButton && /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          color: "chip",
          variant: "outline",
          size: "2xs",
          onClick: () => {
            handleSubmit();
          },
          children: isEditing ? /* @__PURE__ */ jsx(Trans, { message: "Save" }) : /* @__PURE__ */ jsx(Trans, { message: "Edit" })
        }
      )
    ] })
  );
}
function ChannelNameField() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: "name",
        label: /* @__PURE__ */ jsx(Trans, { message: "Name" }),
        className: "mb-10",
        required: true,
        autoFocus: true
      }
    ),
    /* @__PURE__ */ jsx(FormSlugField, {})
  ] });
}
function FormSlugField() {
  const { watch, setValue } = useFormContext();
  const value = watch("slug");
  const name = watch("name");
  const disableSlugEditing = watch("config.lockSlug");
  const restriction = watch("config.restriction");
  const restrictionId = watch("config.restrictionModelId");
  const { trans } = useTrans();
  return /* @__PURE__ */ jsx(
    SlugEditor,
    {
      hideButton: disableSlugEditing,
      placeholder: name,
      suffix: restriction && restrictionId === "urlParam" ? trans(message(":restriction_name", { values: { restriction } })) : void 0,
      className: "text-sm",
      pattern: "[A-Za-z0-9_-]+",
      minLength: 3,
      maxLength: 20,
      value,
      onChange: (newSlug) => {
        setValue("slug", newSlug);
      }
    }
  );
}
function ContentTypeField({ config }) {
  const { setValue } = useFormContext();
  return /* @__PURE__ */ jsxs(
    FormSelect,
    {
      className: "my-24",
      selectionMode: "single",
      name: "config.contentType",
      label: /* @__PURE__ */ jsx(Trans, { message: "Content" }),
      onSelectionChange: (newValue) => {
        var _a2;
        let model = Object.entries(config.models)[0];
        if (newValue === "autoUpdate") {
          const newModel = Object.entries(config.models).find(
            ([, modelConfig2]) => {
              var _a3;
              return (_a3 = modelConfig2.autoUpdateMethods) == null ? void 0 : _a3.length;
            }
          );
          if (newModel) {
            model = newModel;
          }
        }
        const [modelName, modelConfig] = model;
        setValue("config.contentModel", modelName);
        setValue("config.restrictionModelId", void 0);
        setValue(
          "config.autoUpdateMethod",
          newValue === "autoUpdate" ? (_a2 = modelConfig.autoUpdateMethods) == null ? void 0 : _a2[0] : ""
        );
        setValue("config.contentOrder", modelConfig.sortMethods[0]);
        setValue("config.restriction", "");
      },
      children: [
        /* @__PURE__ */ jsx(Item, { value: "listAll", children: /* @__PURE__ */ jsx(Trans, { message: "List all content of specified type" }) }),
        /* @__PURE__ */ jsx(Item, { value: "manual", children: /* @__PURE__ */ jsx(Trans, { message: "Manage content manually" }) }),
        /* @__PURE__ */ jsx(Item, { value: "autoUpdate", children: /* @__PURE__ */ jsx(Trans, { message: "Automatically update content with specified method" }) })
      ]
    }
  );
}
function ContentModelField({ config, className, exclude }) {
  const { setValue, getValues } = useFormContext();
  return /* @__PURE__ */ jsx(
    FormSelect,
    {
      className,
      selectionMode: "single",
      name: "config.contentModel",
      label: /* @__PURE__ */ jsx(Trans, { message: "Type of content" }),
      onSelectionChange: (newValue) => {
        var _a2, _b;
        const modelConfig = config.models[newValue];
        if (getValues("config.contentType") === "autoUpdate" && !((_a2 = modelConfig.autoUpdateMethods) == null ? void 0 : _a2.length)) {
          setValue("config.contentType", "manual");
        }
        setValue("config.autoUpdateMethod", (_b = modelConfig.autoUpdateMethods) == null ? void 0 : _b[0]);
        setValue(
          "config.contentOrder",
          modelConfig.sortMethods[0] || "channelables.order:asc"
        );
        setValue("config.layout", modelConfig.layoutMethods[0]);
      },
      children: Object.entries(config.models).filter(([model]) => !(exclude == null ? void 0 : exclude.includes(model))).map(([model, { label }]) => /* @__PURE__ */ jsx(Item, { value: model, children: /* @__PURE__ */ jsx(Trans, { ...label }) }, model))
    }
  );
}
function ContentOrderField({ config }) {
  const { watch } = useFormContext();
  const contentType = watch("config.contentType");
  const modelConfig = config.models[watch("config.contentModel")];
  const sortMethods = [...modelConfig.sortMethods, "channelables.order:asc"];
  return /* @__PURE__ */ jsx(
    FormSelect,
    {
      className: "my-24",
      selectionMode: "single",
      name: "config.contentOrder",
      label: /* @__PURE__ */ jsx(Trans, { message: "How to order content" }),
      children: sortMethods.map((method) => {
        const sortConfig = config.sortingMethods[method];
        if (!sortConfig.contentTypes || sortConfig.contentTypes.includes(contentType)) {
          return /* @__PURE__ */ jsx(Item, { value: method, children: /* @__PURE__ */ jsx(Trans, { ...sortConfig.label }) }, method);
        }
      })
    }
  );
}
function ContentLayoutFields({ config }) {
  return /* @__PURE__ */ jsxs("div", { className: "md:flex items-end my-24 gap-14", children: [
    /* @__PURE__ */ jsx(
      LayoutField,
      {
        config,
        name: "config.layout",
        label: /* @__PURE__ */ jsx(Trans, { message: "Layout" })
      }
    ),
    /* @__PURE__ */ jsx(
      LayoutField,
      {
        config,
        name: "config.nestedLayout",
        label: /* @__PURE__ */ jsx(Trans, { message: "Layout when nested" })
      }
    )
  ] });
}
function LayoutField({ config, name, label }) {
  var _a2;
  const { watch } = useFormContext();
  const contentModel = watch("config.contentModel");
  const modelConfig = config.models[contentModel];
  if (!((_a2 = modelConfig.layoutMethods) == null ? void 0 : _a2.length)) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    FormSelect,
    {
      className: "flex-auto w-full",
      selectionMode: "single",
      name,
      label,
      children: modelConfig.layoutMethods.map((method) => {
        const label2 = config.layoutMethods[method].label;
        return /* @__PURE__ */ jsx(Item, { value: method, children: /* @__PURE__ */ jsx(Trans, { ...label2 }) }, method);
      })
    }
  );
}
const ViewWeekIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM8 18H4V6h4v12zm6 0h-4V6h4v12zm6 0h-4V6h4v12z" }),
  "ViewWeekOutlined"
);
const ViewListIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M3 5v14h18V5H3zm4 2v2H5V7h2zm-2 6v-2h2v2H5zm0 2h2v2H5v-2zm14 2H9v-2h10v2zm0-4H9v-2h10v2zm0-4H9V7h10v2z" }),
  "ViewListOutlined"
);
const contentModels = {
  [ARTIST_MODEL]: {
    label: message("Artists"),
    sortMethods: [
      "popularity:desc",
      "created_at:desc"
      /* recent */
    ],
    layoutMethods: [
      "grid",
      "carousel"
      /* carousel */
    ],
    autoUpdateMethods: []
  },
  [ALBUM_MODEL]: {
    label: message("Albums"),
    sortMethods: [
      "popularity:desc",
      "created_at:desc",
      "release_date:desc"
      /* releaseDate */
    ],
    layoutMethods: [
      "grid",
      "carousel"
      /* carousel */
    ],
    autoUpdateMethods: [
      "spotifyNewAlbums"
      /* spotifyNewAlbums */
    ]
  },
  [TRACK_MODEL]: {
    label: message("Tracks"),
    sortMethods: [
      "popularity:desc",
      "created_at:desc"
      /* recent */
    ],
    layoutMethods: [
      "grid",
      "trackTable",
      "list",
      "carousel"
      /* carousel */
    ],
    autoUpdateMethods: [
      "spotifyTopTracks",
      "spotifyPlaylistTracks"
      /* spotifyPlaylistTracks */
    ]
  },
  [PLAYLIST_MODEL]: {
    label: message("Playlists"),
    sortMethods: [
      "popularity:desc",
      "created_at:desc"
      /* recent */
    ],
    layoutMethods: [
      "grid",
      "carousel"
      /* carousel */
    ]
  },
  [USER_MODEL]: {
    label: message("Users"),
    sortMethods: [
      "created_at:desc"
      /* recent */
    ],
    layoutMethods: [
      "grid",
      "carousel"
      /* carousel */
    ],
    autoUpdateMethods: []
  },
  [GENRE_MODEL]: {
    label: message("Genres"),
    sortMethods: [
      "popularity:desc",
      "created_at:desc"
      /* recent */
    ],
    layoutMethods: [
      "grid",
      "carousel"
      /* carousel */
    ],
    autoUpdateMethods: [
      "lastfmTopGenres"
      /* lastfmTopGenres */
    ]
  },
  [CHANNEL_MODEL]: {
    label: message("Channels"),
    sortMethods: [],
    layoutMethods: [
      "list"
      /* list */
    ]
  }
};
const contentSortingMethods = {
  [
    "popularity:desc"
    /* popular */
  ]: {
    label: message("Most popular first")
  },
  [
    "created_at:desc"
    /* recent */
  ]: {
    label: message("Recently added first")
  },
  [
    "channelables.order:asc"
    /* curated */
  ]: {
    label: message("Curated (reorder below)"),
    contentTypes: ["manual"]
  },
  [
    "release_date:desc"
    /* releaseDate */
  ]: {
    label: message("Most recent first (by release date)")
  }
};
const contentLayoutMethods = {
  [
    "grid"
    /* grid */
  ]: {
    label: message("Grid"),
    icon: /* @__PURE__ */ jsx(GridViewIcon, {})
  },
  [
    "trackTable"
    /* table */
  ]: {
    label: message("Table"),
    icon: /* @__PURE__ */ jsx(ViewWeekIcon, {})
  },
  [
    "list"
    /* list */
  ]: {
    label: message("List"),
    icon: /* @__PURE__ */ jsx(ViewListIcon, {})
  },
  [
    "carousel"
    /* carousel */
  ]: {
    label: message("Carousel")
  }
};
const contentAutoUpdateMethods = {
  [
    "spotifyTopTracks"
    /* spotifyTopTracks */
  ]: {
    label: message("Spotify: top tracks"),
    provider: "spotify"
  },
  [
    "spotifyNewAlbums"
    /* spotifyNewAlbums */
  ]: {
    label: message("Spotify: new releases"),
    provider: "spotify"
  },
  [
    "spotifyPlaylistTracks"
    /* spotifyPlaylistTracks */
  ]: {
    label: message("Spotify: playlist tracks"),
    provider: "spotify",
    value: {
      label: message("Playlist ID"),
      inputType: "text"
    }
  },
  [
    "lastfmTopGenres"
    /* lastfmTopGenres */
  ]: {
    label: message("Last.fm: popular genres"),
    provider: "lastfm"
  }
};
const channelContentConfig = {
  models: contentModels,
  sortingMethods: contentSortingMethods,
  layoutMethods: contentLayoutMethods,
  autoUpdateMethods: contentAutoUpdateMethods,
  userSelectableLayouts: [
    "grid",
    "trackTable",
    "list"
    /* list */
  ]
};
function useAddableContent(params) {
  return useQuery({
    queryKey: ["search", params],
    queryFn: () => search(params),
    //enabled: !!params.query,
    placeholderData: params.query ? keepPreviousData : void 0
  });
}
function search(params) {
  return apiClient.get(`channel/search-for-addable-content`, { params }).then((response) => response.data);
}
function ChannelContentSearchField({
  onResultSelected,
  imgRenderer
}) {
  const { watch } = useFormContext();
  const contentModel = watch("config.contentModel");
  const { trans } = useTrans();
  const [query, setQuery] = useState("");
  const { isFetching, data } = useAddableContent({
    query,
    modelType: contentModel
  });
  return /* @__PURE__ */ jsx(
    ComboBoxForwardRef,
    {
      isAsync: true,
      placeholder: trans(message("Search for content to add...")),
      isLoading: isFetching,
      inputValue: query,
      onInputValueChange: setQuery,
      clearInputOnItemSelection: true,
      blurReferenceOnItemSelection: true,
      selectionMode: "none",
      openMenuOnFocus: true,
      floatingMaxHeight: 670,
      startAdornment: /* @__PURE__ */ jsx(SearchIcon, {}),
      hideEndAdornment: true,
      children: data == null ? void 0 : data.results.map((result) => /* @__PURE__ */ jsx(
        Item,
        {
          value: result.id,
          onSelected: () => onResultSelected == null ? void 0 : onResultSelected(result),
          startIcon: imgRenderer ? imgRenderer(result) : null,
          description: result.description,
          textLabel: result.name,
          children: result.name
        },
        result.id
      ))
    }
  );
}
function ChannelContentItemImage({ item }) {
  const imageClassName = clsx(
    "aspect-square w-46 rounded object-cover",
    !item.image ? "flex items-center justify-center" : "block"
  );
  return item.image ? /* @__PURE__ */ jsx("img", { className: imageClassName, src: item.image, alt: "" }) : /* @__PURE__ */ jsx("span", { className: imageClassName, children: /* @__PURE__ */ jsx(ImageIcon, { className: "max-w-[60%] text-divider", size: "text-6xl" }) });
}
const playlist = "/assets/playlist-a9b5cb0d.svg";
const RefreshIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" }),
  "RefreshOutlined"
);
function useUpdateChannelContent(channelId) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (payload) => updateChannel$1(channelId, payload),
    onSuccess: () => {
      toast(trans(message("Channel content updated")));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function updateChannel$1(channelId, payload) {
  return apiClient.post(`channel/${channelId}/update-content`, {
    ...payload,
    normalizeContent: true
  }).then((r) => r.data);
}
const columnConfig = [
  {
    key: "dragHandle",
    width: "w-42 flex-shrink-0",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Drag handle" }),
    hideHeader: true,
    body: () => /* @__PURE__ */ jsx(DragHandleIcon, { className: "cursor-pointer text-muted hover:text" })
  },
  {
    key: "name",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Content item" }),
    visibleInMode: "all",
    body: (item) => /* @__PURE__ */ jsx(
      NameWithAvatar,
      {
        image: item.image,
        label: item.name,
        description: item.description
      }
    )
  },
  {
    key: "type",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Content type" }),
    width: "w-100 flex-shrink-0",
    body: (item) => /* @__PURE__ */ jsx("span", { className: "capitalize", children: item.model_type })
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    hideHeader: true,
    align: "end",
    width: "w-42 flex-shrink-0",
    visibleInMode: "all",
    body: (item, { index }) => /* @__PURE__ */ jsx(RemoveItemColumn, { index })
  }
];
function ChannelContentEditor({
  searchField,
  title,
  noResultsMessage
}) {
  const { watch, getValues } = useFormContext();
  const contentType = watch("config.contentType");
  const fieldArray = useFieldArray({
    name: "content.data"
  });
  const content = watch("content");
  const filteredColumns = columnConfig.filter((col) => {
    return !(contentType !== "manual" && (col.key === "actions" || col.key === "dragHandle"));
  });
  return /* @__PURE__ */ jsxs("div", { className: "mt-40 border-t pt-40", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-40", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-10 text-2xl", children: title || /* @__PURE__ */ jsx(Trans, { message: "Channel content" }) }),
      /* @__PURE__ */ jsx(ContentNotEditableWarning, {}),
      /* @__PURE__ */ jsx(UpdateContentButton, {}),
      contentType === "manual" ? cloneElement(searchField, {
        onResultSelected: (result) => {
          const alreadyAttached = getValues("content.data").find(
            (x) => x.id === result.id && x.model_type === result.model_type
          );
          if (!alreadyAttached) {
            fieldArray.prepend(result);
          }
        }
      }) : null
    ] }),
    /* @__PURE__ */ jsx(
      Table,
      {
        className: "mt-24",
        columns: filteredColumns,
        data: content.data,
        meta: fieldArray,
        renderRowAs: contentType === "manual" ? ContentTableRow : void 0,
        enableSelection: false,
        hideHeaderRow: true
      }
    ),
    !fieldArray.fields.length && contentType === "manual" ? noResultsMessage || /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        title: /* @__PURE__ */ jsx(Trans, { message: "Channel is empty" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "No content is attached to this channel yet." }),
        image: /* @__PURE__ */ jsx(SvgImage, { src: playlist })
      }
    ) : null
  ] });
}
function ContentTableRow({
  item,
  children,
  className,
  ...domProps
}) {
  const isTouchDevice = useIsTouchDevice();
  const { data, meta } = useContext(TableContext);
  const domRef = useRef(null);
  const previewRef = useRef(null);
  const [dropPosition, setDropPosition] = useState(null);
  const fieldArray = meta;
  const { sortableProps } = useSortable({
    ref: domRef,
    disabled: isTouchDevice ?? false,
    item,
    items: data,
    type: "channelContentItem",
    preview: previewRef,
    strategy: "line",
    onDropPositionChange: (position) => {
      setDropPosition(position);
    },
    onSortEnd: (oldIndex, newIndex) => {
      fieldArray.move(oldIndex, newIndex);
    }
  });
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        className,
        dropPosition === "before" && "sort-preview-before",
        dropPosition === "after" && "sort-preview-after"
      ),
      ref: domRef,
      ...mergeProps(sortableProps, domProps),
      children: [
        children,
        !item.isPlaceholder && /* @__PURE__ */ jsx(RowDragPreview, { item, ref: previewRef })
      ]
    }
  );
}
const RowDragPreview = React.forwardRef(({ item }, ref) => {
  return /* @__PURE__ */ jsx(DragPreview, { ref, children: () => /* @__PURE__ */ jsx("div", { className: "rounded bg-chip p-8 text-base shadow", children: item.name }) });
});
function RemoveItemColumn({ index }) {
  const { meta } = useContext(TableContext);
  const fieldArray = meta;
  return /* @__PURE__ */ jsx(
    IconButton,
    {
      size: "md",
      className: "text-muted",
      onClick: () => {
        fieldArray.remove(index);
      },
      children: /* @__PURE__ */ jsx(CloseIcon, {})
    }
  );
}
function ContentNotEditableWarning() {
  const { watch } = useFormContext();
  const contentType = watch("config.contentType");
  if (contentType === "manual") {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: "mb-20 mt-4 flex items-center gap-8", children: [
    /* @__PURE__ */ jsx(WarningIcon, { size: "xs" }),
    /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted", children: [
      contentType === "listAll" ? /* @__PURE__ */ jsx(Trans, { message: "This channel is listing all available content of specified type, and can't be curated manually." }) : null,
      contentType === "autoUpdate" ? /* @__PURE__ */ jsx(Trans, { message: "This channel content is set to update automatically and can't be curated manually." }) : null
    ] })
  ] });
}
function UpdateContentButton() {
  const { slugOrId } = useParams();
  const updateContent = useUpdateChannelContent(slugOrId);
  const { setValue, watch, getValues } = useFormContext();
  if (watch("config.contentType") !== "autoUpdate") {
    return null;
  }
  return /* @__PURE__ */ jsx(
    Button,
    {
      size: "xs",
      variant: "outline",
      color: "primary",
      startIcon: /* @__PURE__ */ jsx(RefreshIcon, {}),
      onClick: () => {
        updateContent.mutate(
          {
            channelConfig: getValues("config")
          },
          {
            onSuccess: (response) => {
              if (response.channel.content) {
                setValue("content", response.channel.content);
              }
            }
          }
        );
      },
      disabled: updateContent.isPending || !watch("config.autoUpdateMethod") || !watch("id"),
      children: /* @__PURE__ */ jsx(Trans, { message: "Update content now" })
    }
  );
}
function ContentAutoUpdateField({ children, config }) {
  var _a2;
  const { watch, setValue } = useFormContext();
  const modelConfig = config.models[watch("config.contentModel")];
  const selectedMethodConfig = config.autoUpdateMethods[watch("config.autoUpdateMethod")];
  if (watch("config.contentType") !== "autoUpdate" || !((_a2 = modelConfig.autoUpdateMethods) == null ? void 0 : _a2.length)) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: "my-24 items-end gap-14 md:flex", children: [
    /* @__PURE__ */ jsx(
      FormSelect,
      {
        required: true,
        className: "flex-auto",
        selectionMode: "single",
        name: "config.autoUpdateMethod",
        onSelectionChange: (value) => {
          if (config.autoUpdateMethods[value].provider) {
            setValue(
              "config.autoUpdateProvider",
              config.autoUpdateMethods[value].provider
            );
          }
        },
        label: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Trans, { message: "Auto update method" }),
          /* @__PURE__ */ jsx(
            InfoDialogTrigger,
            {
              body: /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("div", { className: "mb-20", children: /* @__PURE__ */ jsx(Trans, { message: "This option will automatically update channel content every 24 hours using the specified method." }) }),
                /* @__PURE__ */ jsx(LearnMoreLink, { link: "https://support.vebto.com/help-center/articles/28/31/170/channels" })
              ] })
            }
          )
        ] }),
        children: modelConfig.autoUpdateMethods.map((method) => /* @__PURE__ */ jsx(Item, { value: method, children: /* @__PURE__ */ jsx(Trans, { ...config.autoUpdateMethods[method].label }) }, method))
      }
    ),
    (selectedMethodConfig == null ? void 0 : selectedMethodConfig.value) ? /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: "config.autoUpdateValue",
        required: true,
        className: "flex-auto",
        label: /* @__PURE__ */ jsx(Trans, { ...selectedMethodConfig == null ? void 0 : selectedMethodConfig.value.label }),
        type: selectedMethodConfig == null ? void 0 : selectedMethodConfig.value.inputType
      }
    ) : null,
    children
  ] });
}
function CrupdateChannelForm() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(ChannelEditorTabs, { children: [
      /* @__PURE__ */ jsx(ChannelNameField, {}),
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          name: "description",
          label: /* @__PURE__ */ jsx(Trans, { message: "Description" }),
          inputElementType: "textarea",
          rows: 2,
          className: "my-24"
        }
      ),
      /* @__PURE__ */ jsx(ContentTypeField, { config: channelContentConfig }),
      /* @__PURE__ */ jsx(AutoUpdateField, {}),
      /* @__PURE__ */ jsx(ContentModelField, { config: channelContentConfig, className: "my-24" }),
      /* @__PURE__ */ jsx(ContentOrderField, { config: channelContentConfig }),
      /* @__PURE__ */ jsx(ContentLayoutFields, { config: channelContentConfig }),
      /* @__PURE__ */ jsx(
        FormSwitch,
        {
          className: "mb-24",
          name: "config.hideTitle",
          description: /* @__PURE__ */ jsx(Trans, { message: "Whether title should be shown when displaying this channel on the site." }),
          children: /* @__PURE__ */ jsx(Trans, { message: "Hide title" })
        }
      ),
      /* @__PURE__ */ jsx(GenreSwitch, {})
    ] }),
    /* @__PURE__ */ jsx(ChannelContentEditor, { searchField: /* @__PURE__ */ jsx(SearchField, {}) })
  ] });
}
function SearchField(props) {
  return /* @__PURE__ */ jsx(
    ChannelContentSearchField,
    {
      ...props,
      imgRenderer: (item) => /* @__PURE__ */ jsx(ChannelContentItemImage, { item })
    }
  );
}
function AutoUpdateField() {
  return /* @__PURE__ */ jsx(ContentAutoUpdateField, { config: channelContentConfig });
}
function GenreSwitch() {
  const { watch, setValue } = useFormContext();
  if (watch("config.contentType") === "autoUpdate") {
    return null;
  }
  return /* @__PURE__ */ jsx(
    FormSwitch,
    {
      className: "mt-24",
      name: "config.restriction",
      value: "genre",
      onChange: (e) => {
        if (e.target.checked) {
          setValue("config.restrictionModelId", "urlParam");
        }
      },
      description: /* @__PURE__ */ jsx(Trans, { message: "Filter this channel contents by genre specified in the url." }),
      children: /* @__PURE__ */ jsx(Trans, { message: "Filter by genre" })
    }
  );
}
const endpoint = "channel";
function useCreateChannel(form) {
  const { trans } = useTrans();
  const navigate = useNavigate$1();
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: (payload) => createChannel(payload),
    onSuccess: async (response) => {
      await queryClient2.invalidateQueries({
        queryKey: DatatableDataQueryKey(endpoint)
      });
      toast(trans(message("Channel created")));
      navigate(`/admin/channels/${response.channel.id}/edit`, {
        replace: true
      });
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function createChannel(payload) {
  return apiClient.post(endpoint, payload).then((r) => r.data);
}
function CreateChannelPageLayout({ defaultValues, children }) {
  const form = useForm({
    defaultValues: {
      content: EMPTY_PAGINATION_RESPONSE.pagination,
      config: {
        contentType: "listAll",
        contentOrder: "created_at:desc",
        nestedLayout: "carousel",
        ...defaultValues
      }
    }
  });
  const createChannel2 = useCreateChannel(form);
  return /* @__PURE__ */ jsx(
    CrupdateResourceLayout,
    {
      form,
      onSubmit: (values) => {
        createChannel2.mutate(values);
      },
      title: /* @__PURE__ */ jsx(Trans, { message: "Add new channel" }),
      isLoading: createChannel2.isPending,
      children
    }
  );
}
function CreateChannelPage() {
  return /* @__PURE__ */ jsx(
    CreateChannelPageLayout,
    {
      defaultValues: {
        contentType: "listAll",
        contentModel: TRACK_MODEL,
        contentOrder: "created_at:desc",
        layout: "trackTable",
        nestedLayout: "carousel"
      },
      children: /* @__PURE__ */ jsx(CrupdateChannelForm, {})
    }
  );
}
const Endpoint = (id) => `channel/${id}`;
function useUpdateChannel(form) {
  const { trans } = useTrans();
  const navigate = useNavigate$1();
  return useMutation({
    mutationFn: (payload) => updateChannel(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("channel")
      });
      toast(trans(message("Channel updated")));
      navigate("/admin/channels");
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function updateChannel({
  id,
  ...payload
}) {
  return apiClient.put(Endpoint(id), payload).then((r) => r.data);
}
function EditChannelPageLayout({ children }) {
  const query = useChannel(void 0, "editChannelPage");
  if (query.data) {
    return /* @__PURE__ */ jsx(PageContent$1, { channel: query.data.channel, children });
  }
  return /* @__PURE__ */ jsx(PageStatus, { query, loaderIsScreen: false });
}
function PageContent$1({ channel, children }) {
  const form = useForm({
    // @ts-ignore
    defaultValues: {
      ...channel
    }
  });
  const updateChannel2 = useUpdateChannel(form);
  return /* @__PURE__ */ jsx(
    CrupdateResourceLayout,
    {
      form,
      onSubmit: (values) => {
        updateChannel2.mutate(values);
      },
      title: /* @__PURE__ */ jsx(Trans, { message: "Edit “:name“ channel", values: { name: channel.name } }),
      isLoading: updateChannel2.isPending,
      children
    }
  );
}
function EditChannelPage() {
  return /* @__PURE__ */ jsx(EditChannelPageLayout, { children: /* @__PURE__ */ jsx(CrupdateChannelForm, {}) });
}
const ChannelsDatatableColumns = [
  {
    key: "name",
    allowsSorting: true,
    width: "flex-3",
    visibleInMode: "all",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Name" }),
    body: (channel) => {
      if (channel.config.restriction && channel.config.restrictionModelId === "urlParam") {
        return channel.name;
      }
      return /* @__PURE__ */ jsx(
        "a",
        {
          className: "hover:underline focus-visible:underline outline-none",
          href: `channel/${channel.slug}`,
          target: "_blank",
          rel: "noreferrer",
          children: channel.name
        }
      );
    }
  },
  {
    key: "content_type",
    allowsSorting: false,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Content type" }),
    body: (channel) => /* @__PURE__ */ jsx("span", { className: "capitalize", children: channel.config.contentModel ? /* @__PURE__ */ jsx(Trans, { message: channel.config.contentModel }) : void 0 })
  },
  {
    key: "layout",
    allowsSorting: false,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Layout" }),
    body: (channel) => /* @__PURE__ */ jsx("span", { className: "capitalize", children: channel.config.layout ? /* @__PURE__ */ jsx(Trans, { message: channel.config.layout }) : void 0 })
  },
  {
    key: "auto_update",
    allowsSorting: false,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Auto update" }),
    body: (channel) => /* @__PURE__ */ jsx("span", { className: "capitalize", children: channel.config.autoUpdateMethod })
  },
  {
    key: "updated_at",
    allowsSorting: true,
    maxWidth: "max-w-100",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Last updated" }),
    body: (channel) => channel.updated_at ? /* @__PURE__ */ jsx(FormattedDate, { date: channel.updated_at }) : ""
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    hideHeader: true,
    visibleInMode: "all",
    align: "end",
    width: "w-42 flex-shrink-0",
    body: (channel) => /* @__PURE__ */ jsx(Link, { to: `${channel.id}/edit`, className: "text-muted", children: /* @__PURE__ */ jsx(IconButton, { size: "md", children: /* @__PURE__ */ jsx(EditIcon, {}) }) })
  }
];
function useResetChannelsToDefault() {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: () => resetChannels(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("channel")
      });
      toast(trans(message("Channels reset to default")));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function resetChannels() {
  return apiClient.post("channel/reset-to-default").then((r) => r.data);
}
function ChannelsDatatablePage() {
  return /* @__PURE__ */ jsx(
    DataTablePage,
    {
      endpoint: "channel",
      title: /* @__PURE__ */ jsx(Trans, { message: "Channels" }),
      headerContent: /* @__PURE__ */ jsx(InfoTrigger, {}),
      queryParams: { type: "channel" },
      columns: ChannelsDatatableColumns,
      actions: /* @__PURE__ */ jsx(Actions, {}),
      selectedActions: /* @__PURE__ */ jsx(DeleteSelectedItemsAction, {}),
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: playlist,
          title: /* @__PURE__ */ jsx(Trans, { message: "No channels have been created yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching channels" })
        }
      )
    }
  );
}
function InfoTrigger() {
  return /* @__PURE__ */ jsx(
    InfoDialogTrigger,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Channels" }),
      body: /* @__PURE__ */ jsx(Trans, { message: "Channels are used to display either all content of specific type or manually cured content. They can be shown as separate page or nested." })
    }
  );
}
function Actions() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
      /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Reset channels" }), children: /* @__PURE__ */ jsx(
        IconButton,
        {
          variant: "outline",
          color: "primary",
          className: "flex-shrink-0",
          size: "sm",
          children: /* @__PURE__ */ jsx(RestartAltIcon, {})
        }
      ) }),
      /* @__PURE__ */ jsx(ResetChannelsDialog, {})
    ] }),
    /* @__PURE__ */ jsx(DataTableAddItemButton, { elementType: Link, to: "new", children: /* @__PURE__ */ jsx(Trans, { message: "Add new channel" }) })
  ] });
}
function ResetChannelsDialog() {
  const { close } = useDialogContext();
  const resetChannels2 = useResetChannelsToDefault();
  return /* @__PURE__ */ jsx(
    ConfirmationDialog,
    {
      isLoading: resetChannels2.isPending,
      onConfirm: () => {
        resetChannels2.mutate(void 0, { onSuccess: () => close() });
      },
      isDanger: true,
      title: /* @__PURE__ */ jsx(Trans, { message: "Reset channels" }),
      body: /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to reset channels to default ones? This will delete any manually created channels and any configuration changes made to them." }),
      confirm: /* @__PURE__ */ jsx(Trans, { message: "Reset" })
    }
  );
}
const AppAdminRoutes = [
  // Reports
  {
    path: "/",
    element: /* @__PURE__ */ jsx(BemusicAdminReportPage, {}),
    children: [
      { index: true, element: /* @__PURE__ */ jsx(AdminInsightsReport, {}) },
      { path: "plays", element: /* @__PURE__ */ jsx(AdminInsightsReport, {}) },
      { path: "visitors", element: /* @__PURE__ */ jsx(AdminVisitorsReport, {}) }
    ]
  },
  // Channels
  {
    path: "channels",
    element: /* @__PURE__ */ jsx(ChannelsDatatablePage, {})
  },
  {
    path: "channels/new",
    element: /* @__PURE__ */ jsx(CreateChannelPage, {})
  },
  {
    path: "channels/:slugOrId/edit",
    element: /* @__PURE__ */ jsx(EditChannelPage, {})
  },
  // Tracks
  {
    path: "tracks",
    element: /* @__PURE__ */ jsx(TracksDatatablePage, {})
  },
  {
    path: "tracks/new",
    element: /* @__PURE__ */ jsx(CreateTrackPage, {})
  },
  {
    path: "tracks/:trackId/edit",
    element: /* @__PURE__ */ jsx(UpdateTrackPage, {})
  },
  {
    path: "tracks/:trackId/insights",
    element: /* @__PURE__ */ jsx(BackstageTrackInsights, { isNested: true })
  },
  // Albums
  {
    path: "albums",
    element: /* @__PURE__ */ jsx(AlbumsDatatablePage, {})
  },
  {
    path: "albums/new",
    element: /* @__PURE__ */ jsx(CreateAlbumPage, {})
  },
  {
    path: "albums/:albumId/edit",
    element: /* @__PURE__ */ jsx(UpdateAlbumPage, {})
  },
  {
    path: "albums/:albumId/insights",
    element: /* @__PURE__ */ jsx(BackstageAlbumInsights, { isNested: true })
  },
  // Artists
  {
    path: "artists",
    element: /* @__PURE__ */ jsx(ArtistDatatablePage, {})
  },
  {
    path: "artists/new",
    element: /* @__PURE__ */ jsx(CreateArtistPage, { showExternalFields: true })
  },
  {
    path: "artists/:artistId/edit",
    element: /* @__PURE__ */ jsx(UpdateArtistPage, { showExternalFields: true })
  },
  {
    path: "artists/:artistId/insights",
    element: /* @__PURE__ */ jsx(BackstageArtistInsights, { isNested: true })
  },
  // Upload
  {
    path: "upload",
    element: /* @__PURE__ */ jsx(UploadPage, { backstageLayout: false })
  },
  // Backstage requests
  {
    path: "backstage-requests",
    element: /* @__PURE__ */ jsx(BackstageRequestsDatatablePage, {})
  },
  {
    path: "backstage-requests/:requestId",
    element: /* @__PURE__ */ jsx(ViewBackstageRequestPage, {})
  },
  // Genres
  {
    path: "genres",
    element: /* @__PURE__ */ jsx(GenresDatatablePage, {})
  },
  // Playlists
  {
    path: "playlists",
    element: /* @__PURE__ */ jsx(PlaylistDatatablePage, {})
  },
  // Lyrics
  {
    path: "lyrics",
    element: /* @__PURE__ */ jsx(LyricsDatatablePage, {})
  },
  // Comments
  {
    path: "comments",
    element: /* @__PURE__ */ jsx(CommentsDatatablePage, {})
  }
];
function useUpdateCustomPage(endpoint2) {
  const { pageId } = useParams();
  const finalEndpoint = `${endpoint2 || "custom-pages"}/${pageId}`;
  return useMutation({
    mutationFn: (payload) => updatePage(payload, finalEndpoint),
    onError: (err) => showHttpErrorToast(err),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["custom-pages"] });
      await queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey(finalEndpoint)
      });
      toast(message("Page updated"));
    }
  });
}
function updatePage(payload, endpoint2) {
  return apiClient.put(`${endpoint2}`, payload).then((r) => r.data);
}
function ArticleEditorTitle() {
  const [editingTitle, setEditingTitle] = useState(false);
  const { trans } = useTrans();
  const form = useFormContext();
  const watchedTitle = form.watch("title");
  const titlePlaceholder = trans({ message: "Title" });
  if (editingTitle) {
    return /* @__PURE__ */ jsx(
      FormTextField,
      {
        placeholder: titlePlaceholder,
        autoFocus: true,
        className: "mb-30",
        onBlur: () => {
          setEditingTitle(false);
        },
        name: "title",
        required: true
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    "h1",
    {
      tabIndex: 0,
      onClick: () => {
        setEditingTitle(true);
      },
      onFocus: () => {
        setEditingTitle(true);
      },
      className: clsx(
        "hover:bg-primary/focus rounded cursor-pointer",
        !watchedTitle && "text-muted"
      ),
      children: [
        watchedTitle || titlePlaceholder,
        /* @__PURE__ */ jsx(EditIcon, { className: "icon-sm mx-8 mt-8 align-top text-muted" })
      ]
    }
  );
}
const UndoIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" }),
  "UndoOutlined"
);
const RedoIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z" }),
  "RedoOutlined"
);
function HistoryButtons({ editor }) {
  return /* @__PURE__ */ jsxs("span", { children: [
    /* @__PURE__ */ jsx(
      IconButton,
      {
        size: "md",
        disabled: !editor.can().undo(),
        onClick: () => {
          editor.commands.focus();
          editor.commands.undo();
        },
        children: /* @__PURE__ */ jsx(UndoIcon, {})
      }
    ),
    /* @__PURE__ */ jsx(
      IconButton,
      {
        size: "md",
        disabled: !editor.can().redo(),
        onClick: () => {
          editor.commands.focus();
          editor.commands.redo();
        },
        children: /* @__PURE__ */ jsx(RedoIcon, {})
      }
    )
  ] });
}
const CodeIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" }),
  "CodeOutlined"
);
function ModeButton({ editor }) {
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "modal",
      onClose: (newValue) => {
        if (newValue != null) {
          editor == null ? void 0 : editor.commands.setContent(newValue);
        }
      },
      children: [
        /* @__PURE__ */ jsx(Button, { variant: "text", startIcon: /* @__PURE__ */ jsx(CodeIcon, {}), children: /* @__PURE__ */ jsx(Trans, { message: "Source" }) }),
        /* @__PURE__ */ jsx(
          AceDialog,
          {
            title: /* @__PURE__ */ jsx(Trans, { message: "Source code" }),
            defaultValue: editor.getHTML()
          }
        )
      ]
    }
  );
}
function Divider() {
  return /* @__PURE__ */ jsx("div", { className: "self-stretch mx-4 w-1 bg-divider flex-shrink-0" });
}
const FormatBoldIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" }),
  "FormatBoldOutlined"
);
const FormatItalicIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z" }),
  "FormatItalicOutlined"
);
const FormatUnderlinedIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z" }),
  "FormatUnderlinedOutlined"
);
function FontStyleButtons({ editor, size }) {
  return /* @__PURE__ */ jsxs("span", { className: clsx("flex-shrink-0 whitespace-nowrap"), children: [
    /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Bold" }), children: /* @__PURE__ */ jsx(
      IconButton,
      {
        size,
        color: editor.isActive("bold") ? "primary" : null,
        onClick: () => {
          editor.commands.focus();
          editor.commands.toggleBold();
        },
        children: /* @__PURE__ */ jsx(FormatBoldIcon, {})
      }
    ) }),
    /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Italic" }), children: /* @__PURE__ */ jsx(
      IconButton,
      {
        size,
        color: editor.isActive("italic") ? "primary" : null,
        onClick: () => {
          editor.commands.focus();
          editor.commands.toggleItalic();
        },
        children: /* @__PURE__ */ jsx(FormatItalicIcon, {})
      }
    ) }),
    /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Underline" }), children: /* @__PURE__ */ jsx(
      IconButton,
      {
        size,
        color: editor.isActive("underline") ? "primary" : null,
        onClick: () => {
          editor.commands.focus();
          editor.commands.toggleUnderline();
        },
        children: /* @__PURE__ */ jsx(FormatUnderlinedIcon, {})
      }
    ) })
  ] });
}
const FormatListBulletedIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z" }),
  "FormatListBulletedOutlined"
);
const FormatListNumberedIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z" }),
  "FormatListNumberedOutlined"
);
function ListButtons({ editor, size }) {
  const bulletActive = editor.isActive("bulletList");
  const orderedActive = editor.isActive("orderedList");
  return /* @__PURE__ */ jsxs("span", { className: clsx("flex-shrink-0", "whitespace-nowrap"), children: [
    /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Bulleted list" }), children: /* @__PURE__ */ jsx(
      IconButton,
      {
        size,
        color: bulletActive ? "primary" : null,
        onClick: () => {
          editor.commands.focus();
          editor.commands.toggleBulletList();
        },
        children: /* @__PURE__ */ jsx(FormatListBulletedIcon, {})
      }
    ) }),
    /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Numbered list" }), children: /* @__PURE__ */ jsx(
      IconButton,
      {
        size,
        color: orderedActive ? "primary" : null,
        onClick: () => {
          editor.commands.focus();
          editor.commands.toggleOrderedList();
        },
        children: /* @__PURE__ */ jsx(FormatListNumberedIcon, {})
      }
    ) })
  ] });
}
function insertLinkIntoTextEditor(editor, { text, target, href }) {
  if (editor.state.selection.empty && text) {
    editor.commands.insertContent(
      `<a href="${href}" target="${target}">${text}</a>`
    );
  } else if (!editor.state.selection.empty) {
    if (!href) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href, target }).run();
    }
  }
}
function LinkButton({ editor, size }) {
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Insert link" }), children: /* @__PURE__ */ jsx(IconButton, { size, className: clsx("flex-shrink-0"), children: /* @__PURE__ */ jsx(LinkIcon, {}) }) }),
    /* @__PURE__ */ jsx(LinkDialog, { editor })
  ] });
}
function LinkDialog({ editor }) {
  const previousUrl = editor.getAttributes("link").href;
  const previousText = editor.state.doc.textBetween(
    editor.state.selection.from,
    editor.state.selection.to,
    ""
  );
  const form = useForm({
    defaultValues: { href: previousUrl, text: previousText, target: "_blank" }
  });
  const { formId, close } = useDialogContext();
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Insert link" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsxs(
      Form$1,
      {
        form,
        id: formId,
        onSubmit: (value) => {
          insertLinkIntoTextEditor(editor, value);
          close();
        },
        children: [
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              name: "href",
              label: /* @__PURE__ */ jsx(Trans, { message: "URL" }),
              autoFocus: true,
              type: "url",
              className: "mb-20"
            }
          ),
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              name: "text",
              label: /* @__PURE__ */ jsx(Trans, { message: "Text to display" }),
              className: "mb-20"
            }
          ),
          /* @__PURE__ */ jsxs(
            FormSelect,
            {
              selectionMode: "single",
              name: "target",
              label: /* @__PURE__ */ jsx(Trans, { message: "Open link in..." }),
              children: [
                /* @__PURE__ */ jsx(Item, { value: "_self", children: /* @__PURE__ */ jsx(Trans, { message: "Current window" }) }),
                /* @__PURE__ */ jsx(Item, { value: "_blank", children: /* @__PURE__ */ jsx(Trans, { message: "New window" }) })
              ]
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: close, variant: "text", children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(Button, { type: "submit", form: formId, variant: "flat", color: "primary", children: /* @__PURE__ */ jsx(Trans, { message: "Save" }) })
    ] })
  ] });
}
const TwoMB = 2097152;
function ImageButton({ editor, size, diskPrefix = "page_media" }) {
  const { selectAndUploadFile } = useActiveUpload();
  const handleUpload = () => {
    selectAndUploadFile({
      showToastOnRestrictionFail: true,
      restrictions: {
        allowedFileTypes: [UploadInputType.image],
        maxFileSize: TwoMB
      },
      metadata: {
        diskPrefix,
        disk: Disk.public
      },
      onSuccess: (entry) => {
        editor.commands.focus();
        editor.commands.setImage({
          src: entry.url
        });
      }
    });
  };
  return /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Insert image" }), children: /* @__PURE__ */ jsx(
    IconButton,
    {
      size,
      onClick: handleUpload,
      className: clsx("flex-shrink-0"),
      children: /* @__PURE__ */ jsx(ImageIcon, {})
    }
  ) });
}
const FormatClearIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M20 8V5H6.39l3 3h1.83l-.55 1.28 2.09 2.1L14.21 8zM3.41 4.86 2 6.27l6.97 6.97L6.5 19h3l1.57-3.66L16.73 21l1.41-1.41z" }),
  "FormatClearOutlined"
);
function ClearFormatButton({ editor, size }) {
  return /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Clear formatting" }), children: /* @__PURE__ */ jsx(
    IconButton,
    {
      className: clsx("flex-shrink-0"),
      size,
      onClick: () => {
        editor.chain().focus().clearNodes().unsetAllMarks().run();
      },
      children: /* @__PURE__ */ jsx(FormatClearIcon, {})
    }
  ) });
}
const HorizontalRuleIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M4 11h16v2H4z" }),
  "HorizontalRuleOutlined"
);
const PriorityHighIcon = createSvgIcon(
  [/* @__PURE__ */ jsx("circle", { cx: "12", cy: "19", r: "2" }, "0"), /* @__PURE__ */ jsx("path", { d: "M10 3h4v12h-4z" }, "1")],
  "PriorityHighOutlined"
);
const NoteIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M16 4H4c-1.1 0-2 .9-2 2v12.01c0 1.1.9 1.99 2 1.99h16c1.1 0 2-.9 2-2v-8l-6-6zM4 18.01V6h11v5h5v7.01H4z" }),
  "NoteOutlined"
);
const SmartDisplayIcon = createSvgIcon(
  [/* @__PURE__ */ jsx("path", { d: "M9.5 7.5v9l7-4.5z" }, "0"), /* @__PURE__ */ jsx("path", { d: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14.01H4V5.99h16v12.02z" }, "1")],
  "SmartDisplayOutlined"
);
function InsertMenuTrigger({ editor, size }) {
  const [dialog, setDialog] = useState(false);
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsxs(
      MenuTrigger,
      {
        onItemSelected: (key) => {
          if (key === "hr") {
            editor.commands.focus();
            editor.commands.setHorizontalRule();
          } else if (key === "embed") {
            setDialog("embed");
          } else {
            editor.commands.focus();
            editor.commands.addInfo({ type: key });
          }
        },
        children: [
          /* @__PURE__ */ jsx(
            IconButton,
            {
              variant: "text",
              size,
              className: clsx("flex-shrink-0"),
              children: /* @__PURE__ */ jsx(MoreVertIcon, {})
            }
          ),
          /* @__PURE__ */ jsxs(Menu, { children: [
            /* @__PURE__ */ jsx(Item, { value: "hr", startIcon: /* @__PURE__ */ jsx(HorizontalRuleIcon, {}), children: /* @__PURE__ */ jsx(Trans, { message: "Horizontal rule" }) }),
            /* @__PURE__ */ jsx(Item, { value: "embed", startIcon: /* @__PURE__ */ jsx(SmartDisplayIcon, {}), children: /* @__PURE__ */ jsx(Trans, { message: "Embed" }) }),
            /* @__PURE__ */ jsx(Item, { value: "important", startIcon: /* @__PURE__ */ jsx(PriorityHighIcon, {}), children: /* @__PURE__ */ jsx(Trans, { message: "Important" }) }),
            /* @__PURE__ */ jsx(Item, { value: "warning", startIcon: /* @__PURE__ */ jsx(WarningIcon, {}), children: /* @__PURE__ */ jsx(Trans, { message: "Warning" }) }),
            /* @__PURE__ */ jsx(Item, { value: "success", startIcon: /* @__PURE__ */ jsx(NoteIcon, {}), children: /* @__PURE__ */ jsx(Trans, { message: "Note" }) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      DialogTrigger,
      {
        type: "modal",
        isOpen: !!dialog,
        onClose: () => {
          setDialog(false);
        },
        children: /* @__PURE__ */ jsx(EmbedDialog, { editor })
      }
    )
  ] });
}
function EmbedDialog({ editor }) {
  const previousSrc = editor.getAttributes("embed").src;
  const form = useForm({
    defaultValues: { src: previousSrc }
  });
  const { formId, close } = useDialogContext();
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Insert link" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      Form$1,
      {
        form,
        id: formId,
        onSubmit: (value) => {
          editor.commands.setEmbed(value);
          close();
        },
        children: /* @__PURE__ */ jsx(
          FormTextField,
          {
            name: "src",
            label: /* @__PURE__ */ jsx(Trans, { message: "Embed URL" }),
            autoFocus: true,
            type: "url",
            required: true
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: close, variant: "text", children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "submit",
          form: formId,
          disabled: !form.formState.isValid,
          variant: "flat",
          color: "primary",
          children: /* @__PURE__ */ jsx(Trans, { message: "Add" })
        }
      )
    ] })
  ] });
}
function Keyboard({ children, modifier, separator = "+" }) {
  const modKey = isMac() ? /* @__PURE__ */ jsx("span", { className: "text-base align-middle", children: "⌘" }) : "Ctrl";
  return /* @__PURE__ */ jsxs("kbd", { className: "text-xs text-muted", children: [
    modifier && /* @__PURE__ */ jsxs(Fragment$1, { children: [
      modKey,
      separator
    ] }),
    children
  ] });
}
function FormatMenuTrigger({ editor, size }) {
  return /* @__PURE__ */ jsxs(
    MenuTrigger,
    {
      floatingMinWidth: "w-256",
      onItemSelected: (key) => {
        editor.commands.focus();
        if (typeof key === "string" && key.startsWith("h")) {
          editor.commands.toggleHeading({
            level: parseInt(key.replace("h", ""))
          });
        } else if (key === "code") {
          editor.commands.toggleCode();
        } else if (key === "strike") {
          editor.commands.toggleStrike();
        } else if (key === "super") {
          editor.commands.toggleSuperscript();
        } else if (key === "sub") {
          editor.commands.toggleSubscript();
        } else if (key === "blockquote") {
          editor.commands.toggleBlockquote();
        } else if (key === "paragraph") {
          editor.commands.setParagraph();
        }
      },
      children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            className: clsx("flex-shrink-0"),
            variant: "text",
            size,
            endIcon: /* @__PURE__ */ jsx(KeyboardArrowDownIcon, {}),
            children: /* @__PURE__ */ jsx(Trans, { message: "Format" })
          }
        ),
        /* @__PURE__ */ jsxs(Menu, { children: [
          /* @__PURE__ */ jsx(Item, { value: "h1", endSection: /* @__PURE__ */ jsx(Keyboard, { modifier: true, children: "Alt+1" }), children: /* @__PURE__ */ jsx(Trans, { message: "Heading :number", values: { number: 1 } }) }),
          /* @__PURE__ */ jsx(Item, { value: "h2", endSection: /* @__PURE__ */ jsx(Keyboard, { modifier: true, children: "Alt+2" }), children: /* @__PURE__ */ jsx(Trans, { message: "Heading :number", values: { number: 2 } }) }),
          /* @__PURE__ */ jsx(Item, { value: "h3", endSection: /* @__PURE__ */ jsx(Keyboard, { modifier: true, children: "Alt+3" }), children: /* @__PURE__ */ jsx(Trans, { message: "Heading :number", values: { number: 3 } }) }),
          /* @__PURE__ */ jsx(Item, { value: "h4", endSection: /* @__PURE__ */ jsx(Keyboard, { modifier: true, children: "Alt+4" }), children: /* @__PURE__ */ jsx(Trans, { message: "Heading :number", values: { number: 4 } }) }),
          /* @__PURE__ */ jsx(Item, { value: "code", endSection: /* @__PURE__ */ jsx(Keyboard, { modifier: true, children: "E" }), children: /* @__PURE__ */ jsx(Trans, { message: "Code" }) }),
          /* @__PURE__ */ jsx(
            Item,
            {
              value: "strike",
              endSection: /* @__PURE__ */ jsx(Keyboard, { modifier: true, children: "Shift+X" }),
              children: /* @__PURE__ */ jsx(Trans, { message: "Strikethrough" })
            }
          ),
          /* @__PURE__ */ jsx(
            Item,
            {
              value: "super",
              endSection: /* @__PURE__ */ jsx(Keyboard, { modifier: true, separator: " ", children: "." }),
              children: /* @__PURE__ */ jsx(Trans, { message: "Superscript" })
            }
          ),
          /* @__PURE__ */ jsx(
            Item,
            {
              value: "sub",
              endSection: /* @__PURE__ */ jsx(Keyboard, { modifier: true, separator: " ", children: "," }),
              children: /* @__PURE__ */ jsx(Trans, { message: "Subscript" })
            }
          ),
          /* @__PURE__ */ jsx(
            Item,
            {
              value: "blockquote",
              endSection: /* @__PURE__ */ jsx(Keyboard, { modifier: true, children: "Shift+B" }),
              children: /* @__PURE__ */ jsx(Trans, { message: "Blockquote" })
            }
          ),
          /* @__PURE__ */ jsx(
            Item,
            {
              value: "paragraph",
              endSection: /* @__PURE__ */ jsx(Keyboard, { modifier: true, children: "Alt+0" }),
              children: /* @__PURE__ */ jsx(Trans, { message: "Paragraph" })
            }
          )
        ] })
      ]
    }
  );
}
const FormatColorTextIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M2 20h20v4H2v-4zm3.49-3h2.42l1.27-3.58h5.65L16.09 17h2.42L13.25 3h-2.5L5.49 17zm4.42-5.61 2.03-5.79h.12l2.03 5.79H9.91z" }),
  "FormatColorTextOutlined"
);
const FormatColorFillIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M16.56 8.94 7.62 0 6.21 1.41l2.38 2.38-5.15 5.15c-.59.59-.59 1.54 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12zM5.21 10 10 5.21 14.79 10H5.21zM19 11.5s-2 2.17-2 3.5c0 1.1.9 2 2 2s2-.9 2-2c0-1.33-2-3.5-2-3.5zM2 20h20v4H2v-4z" }),
  "FormatColorFillOutlined"
);
function ColorButtons({ editor, size }) {
  const [dialog, setDialog] = useState(false);
  const textActive = editor.getAttributes("textStyle").color;
  const backgroundActive = editor.getAttributes("textStyle").backgroundColor;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("span", { className: clsx("flex-shrink-0 whitespace-nowrap"), children: [
      /* @__PURE__ */ jsx(
        IconButton,
        {
          size,
          color: textActive ? "primary" : null,
          onClick: () => {
            setDialog("text");
          },
          children: /* @__PURE__ */ jsx(FormatColorTextIcon, {})
        }
      ),
      /* @__PURE__ */ jsx(
        IconButton,
        {
          size,
          color: backgroundActive ? "primary" : null,
          onClick: () => {
            setDialog("bg");
          },
          children: /* @__PURE__ */ jsx(FormatColorFillIcon, {})
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      DialogTrigger,
      {
        defaultValue: dialog === "text" ? "#000000" : "#FFFFFF",
        type: "modal",
        isOpen: !!dialog,
        onClose: (newValue) => {
          if (newValue) {
            if (dialog === "text") {
              editor.commands.setColor(newValue);
            } else {
              editor.commands.setBackgroundColor(newValue);
            }
          }
          setDialog(false);
        },
        children: /* @__PURE__ */ jsx(ColorPickerDialog, {})
      }
    )
  ] });
}
const FormatAlignLeftIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z" }),
  "FormatAlignLeftOutlined"
);
const FormatAlignCenterIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z" }),
  "FormatAlignCenterOutlined"
);
const FormatAlignRightIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z" }),
  "FormatAlignRightOutlined"
);
const FormatAlignJustifyIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z" }),
  "FormatAlignJustifyOutlined"
);
const iconMap = {
  left: {
    icon: FormatAlignLeftIcon,
    label: message("Align left")
  },
  center: {
    icon: FormatAlignCenterIcon,
    label: message("Align center")
  },
  right: {
    icon: FormatAlignRightIcon,
    label: message("Align right")
  },
  justify: {
    icon: FormatAlignJustifyIcon,
    label: message("Justify")
  }
};
function AlignButtons({ editor, size }) {
  const activeKey = Object.keys(iconMap).find((key) => {
    return editor.isActive({ textAlign: key });
  }) || "left";
  const ActiveIcon = activeKey ? iconMap[activeKey].icon : iconMap.left.icon;
  return /* @__PURE__ */ jsxs(
    MenuTrigger,
    {
      floatingWidth: "auto",
      selectionMode: "single",
      selectedValue: activeKey,
      onSelectionChange: (key) => {
        editor.commands.focus();
        editor.commands.setTextAlign(key);
      },
      children: [
        /* @__PURE__ */ jsx(
          IconButton,
          {
            size,
            color: activeKey ? "primary" : null,
            className: clsx("flex-shrink-0"),
            children: /* @__PURE__ */ jsx(ActiveIcon, {})
          }
        ),
        /* @__PURE__ */ jsx(Menu, { children: Object.entries(iconMap).map(([name, config]) => {
          const Icon = config.icon;
          return /* @__PURE__ */ jsx(
            Item,
            {
              value: name,
              startIcon: /* @__PURE__ */ jsx(Icon, { size: "md" }),
              capitalizeFirst: true,
              children: /* @__PURE__ */ jsx(Trans, { message: config.label.message })
            },
            name
          );
        }) })
      ]
    }
  );
}
const FormatIndentDecreaseIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M11 17h10v-2H11v2zm-8-5 4 4V8l-4 4zm0 9h18v-2H3v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z" }),
  "FormatIndentDecreaseOutlined"
);
const FormatIndentIncreaseIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M3 21h18v-2H3v2zM3 8v8l4-4-4-4zm8 9h10v-2H11v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z" }),
  "FormatIndentIncreaseOutlined"
);
function IndentButtons({ editor, size }) {
  return /* @__PURE__ */ jsxs("span", { className: clsx("flex-shrink-0", "whitespace-nowrap"), children: [
    /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Decrease indent" }), children: /* @__PURE__ */ jsx(
      IconButton,
      {
        size,
        onClick: () => {
          editor.commands.focus();
          editor.commands.outdent();
        },
        children: /* @__PURE__ */ jsx(FormatIndentDecreaseIcon, {})
      }
    ) }),
    /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Increase indent" }), children: /* @__PURE__ */ jsx(
      IconButton,
      {
        size,
        onClick: () => {
          editor.commands.focus();
          editor.commands.indent();
        },
        children: /* @__PURE__ */ jsx(FormatIndentIncreaseIcon, {})
      }
    ) })
  ] });
}
function CodeBlockMenuTrigger({ editor, size }) {
  const language = editor.getAttributes("codeBlock").language || "";
  return /* @__PURE__ */ jsxs(
    MenuTrigger,
    {
      selectionMode: "single",
      selectedValue: language,
      onSelectionChange: (key) => {
        editor.commands.toggleCodeBlock({ language: key });
      },
      children: [
        /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Codeblock" }), children: /* @__PURE__ */ jsx(
          IconButton,
          {
            className: clsx("flex-shrink-0"),
            size,
            color: language ? "primary" : null,
            children: /* @__PURE__ */ jsx(CodeIcon, {})
          }
        ) }),
        /* @__PURE__ */ jsxs(Menu, { children: [
          /* @__PURE__ */ jsx(Item, { value: "html", children: "HTML" }),
          /* @__PURE__ */ jsx(Item, { value: "javascript", children: "JavaScript" }),
          /* @__PURE__ */ jsx(Item, { value: "css", children: "CSS" }),
          /* @__PURE__ */ jsx(Item, { value: "php", children: "PHP" }),
          /* @__PURE__ */ jsx(Item, { value: "shell", children: "Shell" }),
          /* @__PURE__ */ jsx(Item, { value: "bash", children: "Bash" }),
          /* @__PURE__ */ jsx(Item, { value: "ruby", children: "Ruby" }),
          /* @__PURE__ */ jsx(Item, { value: "python", children: "Python" }),
          /* @__PURE__ */ jsx(Item, { value: "java", children: "Java" }),
          /* @__PURE__ */ jsx(Item, { value: "c++", children: "C++" })
        ] })
      ]
    }
  );
}
const UnfoldMoreIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M12 5.83 15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z" }),
  "UnfoldMoreOutlined"
);
const UnfoldLessIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M7.41 18.59 8.83 20 12 16.83 15.17 20l1.41-1.41L12 14l-4.59 4.59zm9.18-13.18L15.17 4 12 7.17 8.83 4 7.41 5.41 12 10l4.59-4.59z" }),
  "UnfoldLessOutlined"
);
const MenubarRowClassName = "flex items-center px-4 h-42 text-muted border-b overflow-hidden";
function ArticleBodyEditorMenubar({
  editor,
  size = "md",
  justify = "justify-center",
  hideInsertButton = false,
  imageDiskPrefix
}) {
  const isMobile = useIsMobileMediaQuery();
  const [extendedVisible, setExtendedVisible] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: clsx(extendedVisible ? "h-84" : "h-42"), children: [
    /* @__PURE__ */ jsxs("div", { className: clsx(MenubarRowClassName, justify, "relative z-20"), children: [
      /* @__PURE__ */ jsx(FormatMenuTrigger, { editor, size }),
      /* @__PURE__ */ jsx(Divider, {}),
      /* @__PURE__ */ jsx(FontStyleButtons, { editor, size }),
      /* @__PURE__ */ jsx(Divider, {}),
      /* @__PURE__ */ jsx(AlignButtons, { editor, size }),
      /* @__PURE__ */ jsx(IndentButtons, { editor, size }),
      /* @__PURE__ */ jsx(Divider, {}),
      isMobile ? /* @__PURE__ */ jsx(
        IconButton,
        {
          className: "flex-shrink-0",
          color: extendedVisible ? "primary" : null,
          size,
          onClick: () => {
            setExtendedVisible(!extendedVisible);
          },
          children: extendedVisible ? /* @__PURE__ */ jsx(UnfoldLessIcon, {}) : /* @__PURE__ */ jsx(UnfoldMoreIcon, {})
        }
      ) : /* @__PURE__ */ jsx(
        ExtendedButtons,
        {
          editor,
          size,
          hideInsertButton,
          imageDiskPrefix
        }
      )
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: extendedVisible && /* @__PURE__ */ jsx(
      m.div,
      {
        className: clsx(
          MenubarRowClassName,
          justify,
          "absolute flex h-full w-full"
        ),
        initial: { y: "-100%" },
        animate: { y: 0 },
        exit: { y: "-100%" },
        children: /* @__PURE__ */ jsx(
          ExtendedButtons,
          {
            editor,
            size,
            imageDiskPrefix
          }
        )
      }
    ) })
  ] });
}
function ExtendedButtons({
  editor,
  size = "md",
  hideInsertButton,
  imageDiskPrefix
}) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ListButtons, { editor, size }),
    /* @__PURE__ */ jsx(Divider, {}),
    /* @__PURE__ */ jsx(LinkButton, { editor, size }),
    /* @__PURE__ */ jsx(ImageButton, { editor, size, diskPrefix: imageDiskPrefix }),
    !hideInsertButton && /* @__PURE__ */ jsx(InsertMenuTrigger, { editor, size }),
    /* @__PURE__ */ jsx(Divider, {}),
    /* @__PURE__ */ jsx(ColorButtons, { editor, size }),
    /* @__PURE__ */ jsx(Divider, {}),
    /* @__PURE__ */ jsx(CodeBlockMenuTrigger, { editor, size }),
    /* @__PURE__ */ jsx(ClearFormatButton, { editor, size })
  ] });
}
function ArticleEditorStickyHeader({
  editor,
  allowSlugEditing = true,
  onSave,
  saveButton,
  isLoading = false,
  backLink,
  slugPrefix = "pages",
  imageDiskPrefix
}) {
  const { isSticky, sentinelRef } = useStickySentinel();
  const isMobile = useIsMobileMediaQuery();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { ref: sentinelRef }),
    /* @__PURE__ */ jsxs("div", { className: clsx("sticky top-0 z-10 mb-20 bg", isSticky && "shadow"), children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-20 border-b px-20 py-10 text-muted sm:justify-start", children: [
        !isMobile && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "text",
              size: "sm",
              elementType: Link,
              to: backLink,
              relative: "path",
              startIcon: /* @__PURE__ */ jsx(ArrowBackIcon, {}),
              children: /* @__PURE__ */ jsx(Trans, { message: "Back" })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "mr-auto", children: allowSlugEditing && /* @__PURE__ */ jsx(
            FormSlugEditor,
            {
              name: "slug",
              showLinkIcon: false,
              prefix: slugPrefix
            }
          ) })
        ] }),
        editor && /* @__PURE__ */ jsx(HistoryButtons, { editor }),
        !isMobile && /* @__PURE__ */ jsx(ModeButton, { editor }),
        onSave && /* @__PURE__ */ jsx(
          SaveButton,
          {
            onSave: () => {
              onSave(editor.getHTML());
            },
            isLoading
          }
        ),
        saveButton
      ] }),
      /* @__PURE__ */ jsx(
        ArticleBodyEditorMenubar,
        {
          editor,
          size: "sm",
          imageDiskPrefix
        }
      )
    ] })
  ] });
}
function SaveButton({ onSave, isLoading }) {
  const form = useFormContext();
  const title = form.watch("title");
  return /* @__PURE__ */ jsx(
    Button,
    {
      variant: "flat",
      size: "sm",
      color: "primary",
      className: "min-w-90",
      disabled: isLoading || !title,
      onClick: () => onSave(),
      children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
    }
  );
}
function FormSlugEditor({ name, ...other }) {
  const {
    field: { onChange, onBlur, value = "", ref }
  } = useController({
    name
  });
  const manuallyChanged = useRef(false);
  const { watch, setValue } = useFormContext();
  useEffect(() => {
    const subscription = watch((formVal, { name: fieldName }) => {
      if (fieldName === "title" && !manuallyChanged.current) {
        setValue("slug", formVal.title);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);
  return /* @__PURE__ */ jsx(
    SlugEditor,
    {
      className: clsx(!value && "invisible"),
      onChange: (e) => {
        manuallyChanged.current = true;
        onChange(e);
      },
      onInputBlur: onBlur,
      value,
      inputRef: ref,
      ...other
    }
  );
}
const ArticleBodyEditor$1 = React.lazy(
  () => import("./article-body-editor-a7b26c57.mjs")
);
function EditCustomPage() {
  const query = useCustomPage();
  return query.data ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageMetaTags, { query }),
    /* @__PURE__ */ jsx(PageContent, { page: query.data.page })
  ] }) : /* @__PURE__ */ jsx("div", { className: "relative w-full h-full", children: /* @__PURE__ */ jsx(PageStatus, { query }) });
}
function PageContent({ page }) {
  const navigate = useNavigate$1();
  const crupdatePage = useUpdateCustomPage();
  const form = useForm({
    defaultValues: {
      title: page.title,
      slug: page.slug,
      body: page.body
    }
  });
  const handleSave = (editorContent) => {
    crupdatePage.mutate(
      {
        ...form.getValues(),
        body: editorContent
      },
      {
        onSuccess: () => navigate("../..", { relative: "path" })
      }
    );
  };
  return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(FullPageLoader, {}), children: /* @__PURE__ */ jsx(ArticleBodyEditor$1, { initialContent: page.body, children: (content, editor) => /* @__PURE__ */ jsx(FileUploadProvider, { children: /* @__PURE__ */ jsxs(FormProvider, { ...form, children: [
    /* @__PURE__ */ jsx(
      ArticleEditorStickyHeader,
      {
        editor,
        backLink: "../..",
        isLoading: crupdatePage.isPending,
        onSave: handleSave
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mx-20", children: /* @__PURE__ */ jsxs("div", { className: "prose dark:prose-invert mx-auto flex-auto", children: [
      /* @__PURE__ */ jsx(ArticleEditorTitle, {}),
      content
    ] }) })
  ] }) }) }) });
}
function useCreateCustomPage(endpoint2) {
  const finalEndpoint = endpoint2 || "custom-pages";
  return useMutation({
    mutationFn: (payload) => createPage(payload, finalEndpoint),
    onError: (err) => showHttpErrorToast(err),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["custom-pages"] });
      await queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey(finalEndpoint)
      });
      toast(message("Page created"));
    }
  });
}
function createPage(payload, endpoint2) {
  return apiClient.post(`${endpoint2}`, payload).then((r) => r.data);
}
const ArticleBodyEditor = React.lazy(
  () => import("./article-body-editor-a7b26c57.mjs")
);
function CreateCustomPage() {
  const navigate = useNavigate$1();
  const createPage2 = useCreateCustomPage();
  const form = useForm();
  const handleSave = (editorContent) => {
    createPage2.mutate(
      {
        ...form.getValues(),
        body: editorContent
      },
      {
        onSuccess: () => navigate("../", { relative: "path" })
      }
    );
  };
  return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(FullPageLoader, {}), children: /* @__PURE__ */ jsx(ArticleBodyEditor, { children: (content, editor) => /* @__PURE__ */ jsx(FileUploadProvider, { children: /* @__PURE__ */ jsxs(FormProvider, { ...form, children: [
    /* @__PURE__ */ jsx(
      ArticleEditorStickyHeader,
      {
        editor,
        isLoading: createPage2.isPending,
        onSave: handleSave,
        backLink: "../"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mx-20", children: /* @__PURE__ */ jsxs("div", { className: "prose dark:prose-invert mx-auto flex-auto", children: [
      /* @__PURE__ */ jsx(ArticleEditorTitle, {}),
      content
    ] }) })
  ] }) }) }) });
}
const fontImage = "/assets/font-6e80de77.svg";
function FontSelectorFilters({
  state: { filters, setFilters }
}) {
  const { trans } = useTrans();
  return /* @__PURE__ */ jsxs("div", { className: "mb-24 items-center gap-24 @xs:flex", children: [
    /* @__PURE__ */ jsx(
      TextField,
      {
        className: "mb-12 flex-auto @xs:mb-0",
        value: filters.query,
        onChange: (e) => {
          setFilters({
            ...filters,
            query: e.target.value
          });
        },
        startAdornment: /* @__PURE__ */ jsx(SearchIcon, {}),
        placeholder: trans(message("Search fonts"))
      }
    ),
    /* @__PURE__ */ jsxs(
      SelectForwardRef,
      {
        className: "flex-auto",
        selectionMode: "single",
        selectedValue: filters.category,
        onSelectionChange: (value) => {
          setFilters({
            ...filters,
            category: value
          });
        },
        children: [
          /* @__PURE__ */ jsx(Item, { value: "", children: /* @__PURE__ */ jsx(Trans, { message: "All categories" }) }),
          /* @__PURE__ */ jsx(Item, { value: "serif", children: /* @__PURE__ */ jsx(Trans, { message: "Serif" }) }),
          /* @__PURE__ */ jsx(Item, { value: "sans-serif", children: /* @__PURE__ */ jsx(Trans, { message: "Sans serif" }) }),
          /* @__PURE__ */ jsx(Item, { value: "display", children: /* @__PURE__ */ jsx(Trans, { message: "Display" }) }),
          /* @__PURE__ */ jsx(Item, { value: "handwriting", children: /* @__PURE__ */ jsx(Trans, { message: "Handwriting" }) }),
          /* @__PURE__ */ jsx(Item, { value: "monospace", children: /* @__PURE__ */ jsx(Trans, { message: "Monospace" }) })
        ]
      }
    )
  ] });
}
function useFilter(options) {
  const collator = useCollator({
    usage: "search",
    ...options
  });
  return {
    startsWith(string, substring) {
      if (substring.length === 0) {
        return true;
      }
      string = string.normalize("NFC");
      substring = substring.normalize("NFC");
      return collator.compare(string.slice(0, substring.length), substring) === 0;
    },
    endsWith(string, substring) {
      if (substring.length === 0) {
        return true;
      }
      string = string.normalize("NFC");
      substring = substring.normalize("NFC");
      return collator.compare(string.slice(-substring.length), substring) === 0;
    },
    contains(string, substring) {
      if (substring.length === 0) {
        return true;
      }
      string = string.normalize("NFC");
      substring = substring.normalize("NFC");
      let scan = 0;
      const sliceLen = substring.length;
      for (; scan + sliceLen <= string.length; scan++) {
        const slice = string.slice(scan, scan + sliceLen);
        if (collator.compare(substring, slice) === 0) {
          return true;
        }
      }
      return false;
    }
  };
}
const BrowserSafeFonts = [
  {
    label: message("System"),
    family: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    category: "sans-serif"
  },
  { family: "Impact, Charcoal, sans-serif", category: "sans-serif" },
  { family: "Arial, Helvetica Neue, Helvetica, sans-serif", category: "serif" },
  { family: '"Comic Sans MS", cursive, sans-serif', category: "Handwriting" },
  { family: "Century Gothic, sans-serif", category: "sans-serif" },
  { family: '"Courier New", Courier, monospace', category: "monospace" },
  {
    family: '"Lucida Sans Unicode", "Lucida Grande", sans-serif',
    category: "sans-serif"
  },
  { family: '"Times New Roman", Times, serif', category: "serif" },
  { family: '"Lucida Console", Monaco, monospace', category: "monospace" },
  { family: '"Andele Mono", monospace, sans-serif', category: "sans-serif" },
  { family: "Verdana, Geneva, sans-serif", category: "sans-serif" },
  {
    family: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    category: "sans-serif"
  }
];
function useFontSelectorState({
  value,
  onChange
}) {
  const { data, isLoading } = useValueLists(["googleFonts"]);
  const [currentPage, setCurrentPage] = useState(0);
  const [filters, setFilterState] = useState({
    query: "",
    category: (value == null ? void 0 : value.category) ?? ""
  });
  const { contains } = useFilter({
    sensitivity: "base"
  });
  const setFilters = useCallback((filters2) => {
    setFilterState(filters2);
    setCurrentPage(0);
  }, []);
  const allFonts = useMemo(() => {
    return BrowserSafeFonts.concat((data == null ? void 0 : data.googleFonts) ?? []);
  }, [data == null ? void 0 : data.googleFonts]);
  const filteredFonts = useMemo(() => {
    return allFonts.filter((font) => {
      var _a2;
      return contains(font.family, filters.query) && (!filters.category || ((_a2 = font.category) == null ? void 0 : _a2.toLowerCase()) === filters.category.toLowerCase());
    });
  }, [allFonts, filters, contains]);
  const pages2 = useMemo(() => {
    return chunkArray(filteredFonts, 20);
  }, [filteredFonts]);
  const fonts = pages2[currentPage];
  useEffect(() => {
    const id = "font-selector";
    if (fonts == null ? void 0 : fonts.length) {
      loadFonts(fonts, { id });
    }
  }, [fonts, currentPage]);
  return {
    fonts: fonts || [],
    currentPage,
    filteredFonts: filteredFonts || [],
    setCurrentPage,
    isLoading,
    filters,
    setFilters,
    value,
    onChange,
    pages: pages2
  };
}
function FontSelectorPagination({
  state: { currentPage = 0, setCurrentPage, filteredFonts, pages: pages2 }
}) {
  const total = (filteredFonts == null ? void 0 : filteredFonts.length) || 0;
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-24 text-sm mt-30 pt-14 border-t", children: [
    total > 0 && /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      Trans,
      {
        message: ":from - :to of :total",
        values: {
          from: currentPage * 20 + 1,
          to: Math.min((currentPage + 1) * 20, total),
          total
        }
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "text-muted", children: [
      /* @__PURE__ */ jsx(
        IconButton,
        {
          disabled: currentPage < 1,
          onClick: () => {
            setCurrentPage(Math.max(0, currentPage - 1));
          },
          children: /* @__PURE__ */ jsx(KeyboardArrowLeftIcon, {})
        }
      ),
      /* @__PURE__ */ jsx(
        IconButton,
        {
          disabled: currentPage >= pages2.length - 1,
          onClick: () => {
            setCurrentPage(currentPage + 1);
          },
          children: /* @__PURE__ */ jsx(KeyboardArrowRightIcon, {})
        }
      )
    ] })
  ] });
}
function FontSelector(props) {
  const state = useFontSelectorState(props);
  return /* @__PURE__ */ jsxs("div", { className: props.className, children: [
    /* @__PURE__ */ jsx(FontSelectorFilters, { state }),
    /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: /* @__PURE__ */ jsx(FontList, { state }) }),
    /* @__PURE__ */ jsx(FontSelectorPagination, { state })
  ] });
}
function FontList({ state }) {
  const { isLoading, fonts } = state;
  const gridClassName = "grid gap-24 grid-cols-[repeat(auto-fill,minmax(90px,1fr))] items-start";
  if (isLoading) {
    return /* @__PURE__ */ jsx(FontListSkeleton, { className: gridClassName });
  }
  if (!(fonts == null ? void 0 : fonts.length)) {
    return /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        className: "mt-60",
        size: "sm",
        image: /* @__PURE__ */ jsx(SvgImage, { src: fontImage }),
        title: /* @__PURE__ */ jsx(Trans, { message: "No matching fonts" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Try another search query or different category" })
      }
    );
  }
  return /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, className: gridClassName, children: fonts == null ? void 0 : fonts.map((font) => /* @__PURE__ */ jsx(FontButton, { font, state }, font.family)) }, "font-list");
}
function FontButton({ font, state: { value, onChange } }) {
  const isActive = (value == null ? void 0 : value.family) === font.family;
  const displayName = font.family.split(",")[0].replace(/"/g, "");
  return /* @__PURE__ */ jsxs(
    ButtonBase,
    {
      display: "block",
      onClick: () => {
        onChange(font);
      },
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: clsx(
              "flex aspect-square items-center justify-center rounded-panel border text-4xl transition-bg-color hover:bg-hover md:text-5xl",
              isActive && "ring-2 ring-primary ring-offset-2"
            ),
            children: /* @__PURE__ */ jsx("span", { style: { fontFamily: font.family }, children: "Aa" })
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: clsx(
              "mt-6 block overflow-hidden overflow-ellipsis whitespace-nowrap text-sm",
              isActive && "text-primary"
            ),
            children: font.label ? /* @__PURE__ */ jsx(Trans, { ...font.label }) : displayName
          }
        )
      ]
    },
    font.family
  );
}
function FontListSkeleton({ className }) {
  const items = Array.from(Array(20).keys());
  return /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, className, children: items.map((index) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "aspect-square", children: /* @__PURE__ */ jsx(Skeleton, { display: "block", variant: "rect" }) }),
    /* @__PURE__ */ jsx(Skeleton, { className: "mt-6 text-sm" })
  ] }, index)) }, "font-list-skeleton");
}
function ThemeFontPanel() {
  const { setValue, watch } = useFormContext();
  const { themeIndex } = useParams();
  const key = `appearance.themes.all.${themeIndex}.font`;
  return /* @__PURE__ */ jsx(
    FontSelector,
    {
      value: watch(key),
      onChange: (font) => {
        setValue(key, font, { shouldDirty: true });
        appearanceState().preview.setThemeFont(font);
      }
    }
  );
}
const radiusMap = {
  "rounded-none": {
    label: message("Square"),
    value: "0px"
  },
  "rounded-sm": {
    label: message("Small"),
    value: "0.125rem"
  },
  "rounded-md": {
    label: message("Medium"),
    value: "0.25rem"
  },
  "rounded-lg": {
    label: message("Large"),
    value: "0.5rem"
  },
  "rounded-xl": {
    label: message("Larger"),
    value: "0.75rem"
  },
  "rounded-full": {
    label: message("Pill"),
    value: "9999px"
  }
};
function ThemeRadiusPanel() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-24", children: [
    /* @__PURE__ */ jsx(
      RadiusSelector,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Button rounding" }),
        name: "button-radius"
      }
    ),
    /* @__PURE__ */ jsx(
      RadiusSelector,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Input rounding" }),
        name: "input-radius"
      }
    ),
    /* @__PURE__ */ jsx(
      RadiusSelector,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Panel rounding" }),
        name: "panel-radius",
        hidePill: true
      }
    )
  ] });
}
function RadiusSelector({ label, name, hidePill }) {
  const { themeIndex } = useParams();
  const { watch, setValue } = useFormContext();
  const formKey = `appearance.themes.all.${themeIndex}.values.--be-${name}`;
  const currentValue = watch(formKey);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "mb-10 text-sm font-semibold", children: label }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-10 text-sm", children: Object.entries(radiusMap).filter(([key]) => !hidePill || !key.includes("full")).map(([key, { label: label2, value }]) => /* @__PURE__ */ jsx(
      PreviewButton,
      {
        radius: key,
        isActive: value === currentValue,
        onClick: () => {
          setValue(formKey, value, { shouldDirty: true });
        },
        children: /* @__PURE__ */ jsx(Trans, { ...label2 })
      },
      key
    )) })
  ] });
}
function PreviewButton({
  radius,
  children,
  isActive,
  onClick
}) {
  return /* @__PURE__ */ jsx(
    ButtonBase,
    {
      display: "block",
      className: clsx(
        "h-36 border-2 hover:bg-hover",
        radius,
        isActive && "border-primary"
      ),
      onClick,
      children
    }
  );
}
function MaintenanceSettings() {
  return /* @__PURE__ */ jsx(
    SettingsPanel,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Maintenance" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Configure Maintenance Mode Settings." }),
      children: /* @__PURE__ */ jsx(MaintenanceSection, {})
    }
  );
}
function MaintenanceSection() {
  const { watch } = useFormContext();
  watch("maintenance.enable");
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
    FormSwitch,
    {
      name: "client.maintenance.enable",
      className: "mb-20",
      description: /* @__PURE__ */ jsx(Trans, { message: "Website maintenance improves performance and security. Some features may be temporarily unavailable, with users seeing a maintenance page until work is done." }),
      children: /* @__PURE__ */ jsx(Trans, { message: "Enable Maintenance Mode" })
    }
  ) });
}
const ReportsPage = React.lazy(() => import("./admin-report-page-c737dc82.mjs"));
const AdminRouteConfig = [
  {
    path: "appearance",
    element: /* @__PURE__ */ jsx(AuthRoute, { permission: "appearance.update", children: /* @__PURE__ */ jsx(AppearanceLayout, {}) }),
    children: [
      { index: true, element: /* @__PURE__ */ jsx(SectionList, {}) },
      { path: "general", element: /* @__PURE__ */ jsx(GeneralSection, {}) },
      { path: "seo-settings", element: /* @__PURE__ */ jsx(SeoSection, {}) },
      { path: "custom-code", element: /* @__PURE__ */ jsx(CustomCodeSection, {}) },
      { path: "themes", element: /* @__PURE__ */ jsx(ThemeList, {}) },
      { path: "themes/:themeIndex", element: /* @__PURE__ */ jsx(ThemeEditor, {}) },
      { path: "themes/:themeIndex/font", element: /* @__PURE__ */ jsx(ThemeFontPanel, {}) },
      { path: "themes/:themeIndex/radius", element: /* @__PURE__ */ jsx(ThemeRadiusPanel, {}) },
      { path: "menus", element: /* @__PURE__ */ jsx(MenuList, {}) },
      { path: "menus/:menuIndex", element: /* @__PURE__ */ jsx(MenuEditor, {}) },
      {
        path: "menus/:menuIndex/items/:menuItemIndex",
        element: /* @__PURE__ */ jsx(MenuItemEditor, {})
      },
      ...Object.values(AppAppearanceConfig.sections).flatMap(
        (s) => s.routes || []
      )
    ]
  },
  {
    path: "/",
    element: /* @__PURE__ */ jsx(AdminLayout, {}),
    children: [
      ...AppAdminRoutes,
      // REPORT PAGE
      {
        path: "/",
        element: /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(FullPageLoader, { screen: true }), children: /* @__PURE__ */ jsx(ReportsPage, {}) })
      },
      // USERS
      {
        path: "users",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "users.update", children: /* @__PURE__ */ jsx(UserDatatable, {}) })
      },
      {
        path: "users/new",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "users.update", children: /* @__PURE__ */ jsx(CreateUserPage, {}) })
      },
      {
        path: "users/:userId/edit",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "users.update", children: /* @__PURE__ */ jsx(UpdateUserPage, {}) })
      },
      // ROLES
      {
        path: "roles",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "roles.update", children: /* @__PURE__ */ jsx(RolesIndexPage, {}) })
      },
      {
        path: "roles/new",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "roles.update", children: /* @__PURE__ */ jsx(CreateRolePage, {}) })
      },
      {
        path: "roles/:roleId/edit",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "roles.update", children: /* @__PURE__ */ jsx(EditRolePage, {}) })
      },
      // SUBSCRIPTIONS and PLANS
      {
        path: "subscriptions",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "subscriptions.update", children: /* @__PURE__ */ jsx(SubscriptionsIndexPage, {}) })
      },
      {
        path: "plans",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "plans.update", children: /* @__PURE__ */ jsx(PlansIndexPage, {}) })
      },
      {
        path: "plans/new",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "plans.update", children: /* @__PURE__ */ jsx(CreatePlanPage, {}) })
      },
      {
        path: "plans/:productId/edit",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "plans.update", children: /* @__PURE__ */ jsx(EditPlanPage, {}) })
      },
      // CUSTOM PAGES
      {
        path: "custom-pages",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "custom_pages.update", children: /* @__PURE__ */ jsx(CustomPageDatablePage, {}) })
      },
      {
        path: "custom-pages/new",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "custom_pages.update", children: /* @__PURE__ */ jsx(CreateCustomPage, {}) })
      },
      {
        path: "custom-pages/:pageId/edit",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "custom_pages.update", children: /* @__PURE__ */ jsx(EditCustomPage, {}) })
      },
      // TAGS
      {
        path: "tags",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "tags.update", children: /* @__PURE__ */ jsx(TagIndexPage, {}) })
      },
      // LOCALIZATIONS
      {
        path: "localizations",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "localizations.update", children: /* @__PURE__ */ jsx(LocalizationIndex, {}) })
      },
      {
        path: "localizations/:localeId/translate",
        element: /* @__PURE__ */ jsx(TranslationManagementPage, {})
      },
      // FILE ENTRIES
      {
        path: "files",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "files.update", children: /* @__PURE__ */ jsx(FileEntryIndexPage, {}) })
      },
      // ADS
      {
        path: "ads",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "settings.update", children: /* @__PURE__ */ jsx(AdsPage, {}) })
      },
      // SETTINGS
      {
        path: "settings",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "settings.update", children: /* @__PURE__ */ jsx(SettingsLayout, {}) }),
        children: [
          { index: true, element: /* @__PURE__ */ jsx(Navigate, { to: "general", replace: true }) },
          { path: "general", element: /* @__PURE__ */ jsx(GeneralSettings, {}) },
          { path: "subscriptions", element: /* @__PURE__ */ jsx(SubscriptionSettings, {}) },
          { path: "localization", element: /* @__PURE__ */ jsx(LocalizationSettings, {}) },
          { path: "authentication", element: /* @__PURE__ */ jsx(AuthenticationSettings, {}) },
          { path: "uploading", element: /* @__PURE__ */ jsx(UploadingSettings, {}) },
          { path: "outgoing-email", element: /* @__PURE__ */ jsx(OutgoingEmailSettings, {}) },
          { path: "cache", element: /* @__PURE__ */ jsx(CacheSettings, {}) },
          { path: "analytics", element: /* @__PURE__ */ jsx(ReportsSettings, {}) },
          { path: "logging", element: /* @__PURE__ */ jsx(LoggingSettings, {}) },
          { path: "queue", element: /* @__PURE__ */ jsx(QueueSettings, {}) },
          { path: "recaptcha", element: /* @__PURE__ */ jsx(RecaptchaSettings, {}) },
          { path: "gdpr", element: /* @__PURE__ */ jsx(GdprSettings, {}) },
          { path: "maintenance", element: /* @__PURE__ */ jsx(MaintenanceSettings, {}) },
          ...AppSettingsRoutes
        ]
      }
    ]
  },
  { path: "*", element: /* @__PURE__ */ jsx(NotFoundPage, {}) }
];
function AdminRoutes() {
  return useRoutes(AdminRouteConfig);
}
const adminRoutes = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminRoutes
}, Symbol.toStringTag, { value: "Module" }));
export {
  AdminHeaderReport as A,
  BarChartIcon as B,
  ChevronLeftIcon as C,
  DeleteIcon as D,
  TrendingDownIcon as E,
  FileDownloadIcon as F,
  TrendingFlatIcon as G,
  HorizontalRuleIcon as H,
  TuneIcon as I,
  UnfoldLessIcon as J,
  UnfoldMoreIcon as K,
  LinkIcon as L,
  ViewListIcon as M,
  NoteIcon as N,
  ViewWeekIcon as O,
  PersonOffIcon as P,
  VisibilityIcon as Q,
  RedoIcon as R,
  SmartDisplayIcon as S,
  TranslateIcon as T,
  UndoIcon as U,
  VisitorsReportCharts as V,
  useFilter as W,
  iconGridStyle as X,
  adminRoutes as Y,
  ClosedCaptionIcon as a,
  CodeIcon as b,
  DragIndicatorIcon as c,
  FilterAltIcon as d,
  FormatAlignCenterIcon as e,
  FormatAlignJustifyIcon as f,
  FormatAlignLeftIcon as g,
  FormatAlignRightIcon as h,
  FormatBoldIcon as i,
  FormatClearIcon as j,
  FormatColorFillIcon as k,
  FormatColorTextIcon as l,
  FormatIndentDecreaseIcon as m,
  FormatIndentIncreaseIcon as n,
  FormatItalicIcon as o,
  FormatListBulletedIcon as p,
  FormatListNumberedIcon as q,
  FormatUnderlinedIcon as r,
  PlayArrowIcon as s,
  PriorityHighIcon as t,
  useAdminReport as u,
  PublishIcon as v,
  RefreshIcon as w,
  ReportIcon as x,
  RestartAltIcon as y,
  SyncIcon as z
};
//# sourceMappingURL=admin-routes-6a77e340.mjs.map
