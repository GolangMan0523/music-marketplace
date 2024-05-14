import { jsx, jsxs } from "react/jsx-runtime";
import { g as createSvgIcon, aH as useMediaQuery, cG as isCtrlKeyPressed, cp as createEventHandler, cD as useIsDarkMode, c as useIsMobileMediaQuery, cH as isCtrlOrShiftPressed, w as Skeleton, p as Checkbox, h as useTrans, cI as AvatarPlaceholderIcon, _ as Tooltip, e as useNumberFormatter, cs as shallowEqual, cJ as UploadedFile, co as clamp, cK as rootEl, m as message, al as getBootstrapData, J as apiClient, ak as SiteConfigContext, i as FormTextField, T as Trans, I as IconButton, x as CloseIcon, B as Button, R as AddIcon } from "../server-entry.mjs";
import React, { createContext, useContext, useMemo, useRef, useState, useCallback, cloneElement, Fragment, forwardRef, Children, isValidElement, memo, useLayoutEffect, useEffect, useImperativeHandle } from "react";
import { useControlledState } from "@react-stately/utils";
import { getFocusableTreeWalker } from "@react-aria/focus";
import { focusWithoutScrolling, useGlobalListeners, useObjectRef, mergeProps, getScrollParent } from "@react-aria/utils";
import clsx from "clsx";
import { useInteractOutside } from "@react-aria/interactions";
import { AnimatePresence, m } from "framer-motion";
import { flushSync, createPortal } from "react-dom";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import dot from "dot-object";
import { useFieldArray } from "react-hook-form";
import { parseColor } from "@react-stately/color";
const KeyboardArrowLeftIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" }),
  "KeyboardArrowLeftOutlined"
);
function useIsTabletMediaQuery(options) {
  return useMediaQuery("(max-width: 1024px)", options);
}
function useGridNavigation(props) {
  const { cellCount, rowCount } = props;
  const onKeyDown = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        focusSiblingCell(e, { cell: { op: "decrement" } }, props);
        break;
      case "ArrowRight":
        focusSiblingCell(e, { cell: { op: "increment" } }, props);
        break;
      case "ArrowUp":
        focusSiblingCell(e, { row: { op: "decrement" } }, props);
        break;
      case "ArrowDown":
        focusSiblingCell(e, { row: { op: "increment" } }, props);
        break;
      case "PageUp":
        focusSiblingCell(e, { row: { op: "decrement", count: 5 } }, props);
        break;
      case "PageDown":
        focusSiblingCell(e, { row: { op: "increment", count: 5 } }, props);
        break;
      case "Tab":
        focusFirstElementAfterGrid(e);
        break;
      case "Home":
        if (isCtrlKeyPressed(e)) {
          focusSiblingCell(
            e,
            {
              row: { op: "decrement", count: rowCount },
              cell: { op: "decrement", count: cellCount }
            },
            props
          );
        } else {
          focusSiblingCell(
            e,
            { cell: { op: "decrement", count: cellCount } },
            props
          );
        }
        break;
      case "End":
        if (isCtrlKeyPressed(e)) {
          focusSiblingCell(
            e,
            {
              row: { op: "increment", count: rowCount },
              cell: { op: "increment", count: cellCount }
            },
            props
          );
        } else {
          focusSiblingCell(
            e,
            { cell: { op: "increment", count: cellCount } },
            props
          );
        }
        break;
    }
  };
  return { onKeyDown };
}
function focusSiblingCell(e, operations, { cellCount, rowCount }) {
  var _a, _b, _c, _d, _e, _f, _g;
  if (((_a = document.activeElement) == null ? void 0 : _a.tagName) === "input")
    return;
  e.preventDefault();
  const grid = e.currentTarget;
  const currentCell = e.target.closest("[aria-colindex]");
  if (!currentCell || !grid)
    return;
  const row = currentCell.closest("[aria-rowindex]");
  if (!row)
    return;
  let rowIndex = parseInt(row.getAttribute("aria-rowindex"));
  let cellIndex = parseInt(currentCell.getAttribute("aria-colindex"));
  if (Number.isNaN(rowIndex) || Number.isNaN(cellIndex))
    return;
  const rowOpCount = ((_b = operations.row) == null ? void 0 : _b.count) ?? 1;
  if (((_c = operations.row) == null ? void 0 : _c.op) === "increment") {
    rowIndex = Math.min(rowCount, rowIndex + rowOpCount);
  } else if (((_d = operations.row) == null ? void 0 : _d.op) === "decrement") {
    rowIndex = Math.max(1, rowIndex - rowOpCount);
  }
  const cellOpCount = ((_e = operations.cell) == null ? void 0 : _e.count) ?? 1;
  if (((_f = operations.cell) == null ? void 0 : _f.op) === "increment") {
    cellIndex = Math.min(cellCount, cellIndex + cellOpCount);
  } else if (((_g = operations.cell) == null ? void 0 : _g.op) === "decrement") {
    cellIndex = Math.max(1, cellIndex - cellOpCount);
  }
  const nextCell = grid.querySelector(
    `[aria-rowindex="${rowIndex}"] [aria-colindex="${cellIndex}"]`
  );
  if (!nextCell)
    return;
  const walker = getFocusableTreeWalker(nextCell);
  const nextFocusableElement = walker.nextNode() || nextCell;
  currentCell.setAttribute("tabindex", "-1");
  nextFocusableElement.setAttribute("tabindex", "0");
  nextFocusableElement.focus();
}
function focusFirstElementAfterGrid(e) {
  const grid = e.currentTarget;
  if (e.shiftKey) {
    grid.focus();
  } else {
    const walker = getFocusableTreeWalker(grid, { tabbable: true });
    let next;
    let last;
    do {
      last = walker.lastChild();
      if (last) {
        next = last;
      }
    } while (last);
    if (next && !next.contains(document.activeElement)) {
      focusWithoutScrolling(next);
    }
  }
}
const TableContext = createContext(null);
function useTableCellStyle({ index, isHeader }) {
  const {
    columns,
    cellHeight = "h-46",
    headerCellHeight = "h-46"
  } = useContext(TableContext);
  const column = columns[index];
  const userPadding = column == null ? void 0 : column.padding;
  let justify = "justify-start";
  if ((column == null ? void 0 : column.align) === "center") {
    justify = "justify-center";
  } else if ((column == null ? void 0 : column.align) === "end") {
    justify = "justify-end";
  }
  return clsx(
    "flex items-center overflow-hidden whitespace-nowrap overflow-ellipsis outline-none focus-visible:outline focus-visible:outline-offset-2",
    isHeader ? headerCellHeight : cellHeight,
    (column == null ? void 0 : column.width) ?? "flex-1",
    column == null ? void 0 : column.maxWidth,
    column == null ? void 0 : column.minWidth,
    justify,
    userPadding,
    column == null ? void 0 : column.className
  );
}
function TableCell({
  rowIndex,
  rowIsHovered,
  index,
  item,
  id
}) {
  const { columns } = useContext(TableContext);
  const column = columns[index];
  const rowContext = useMemo(() => {
    return {
      index: rowIndex,
      isHovered: rowIsHovered,
      isPlaceholder: item.isPlaceholder
    };
  }, [rowIndex, rowIsHovered, item.isPlaceholder]);
  const style = useTableCellStyle({
    index,
    isHeader: false
  });
  return /* @__PURE__ */ jsx(
    "div",
    {
      tabIndex: -1,
      role: "gridcell",
      "aria-colindex": index + 1,
      id,
      className: style,
      children: /* @__PURE__ */ jsx("div", { className: "overflow-x-hidden overflow-ellipsis min-w-0 w-full", children: column.body(item, rowContext) })
    }
  );
}
function usePointerEvents({
  onMoveStart,
  onMove,
  onMoveEnd,
  minimumMovement = 0,
  preventDefault,
  stopPropagation = true,
  onPress,
  onLongPress,
  ...props
}) {
  const stateRef = useRef({
    lastPosition: { x: 0, y: 0 },
    started: false,
    longPressTriggered: false
  });
  const state = stateRef.current;
  const { addGlobalListener, removeGlobalListener } = useGlobalListeners();
  const start = (e) => {
    if (!state.el)
      return;
    const result = onMoveStart == null ? void 0 : onMoveStart(e, state.el);
    if (result === false)
      return;
    state.originalTouchAction = state.el.style.touchAction;
    state.el.style.touchAction = "none";
    state.originalUserSelect = document.documentElement.style.userSelect;
    document.documentElement.style.userSelect = "none";
    state.started = true;
  };
  const onPointerDown = (e) => {
    var _a;
    if (e.button === 0 && state.id == null) {
      state.started = false;
      const result = (_a = props.onPointerDown) == null ? void 0 : _a.call(props, e);
      if (result === false)
        return;
      if (stopPropagation) {
        e.stopPropagation();
      }
      if (preventDefault) {
        e.preventDefault();
      }
      state.id = e.pointerId;
      state.el = e.currentTarget;
      state.lastPosition = { x: e.clientX, y: e.clientY };
      if (onLongPress) {
        state.longPressTimer = setTimeout(() => {
          onLongPress(e, state.el);
          state.longPressTriggered = true;
        }, 400);
      }
      if (onMoveStart || onMove) {
        addGlobalListener(window, "pointermove", onPointerMove, false);
      }
      addGlobalListener(window, "pointerup", onPointerUp, false);
      addGlobalListener(window, "pointercancel", onPointerUp, false);
    }
  };
  const onPointerMove = (e) => {
    if (e.pointerId === state.id) {
      const deltaX = e.clientX - state.lastPosition.x;
      const deltaY = e.clientY - state.lastPosition.y;
      if ((Math.abs(deltaX) >= minimumMovement || Math.abs(deltaY) >= minimumMovement) && !state.started) {
        start(e);
      }
      if (state.started) {
        onMove == null ? void 0 : onMove(e, deltaX, deltaY);
        state.lastPosition = { x: e.clientX, y: e.clientY };
      }
    }
  };
  const onPointerUp = (e) => {
    var _a;
    if (e.pointerId === state.id) {
      if (state.longPressTimer) {
        clearTimeout(state.longPressTimer);
      }
      const longPressTriggered = state.longPressTriggered;
      state.longPressTriggered = false;
      if (state.started) {
        onMoveEnd == null ? void 0 : onMoveEnd(e);
      }
      if (state.el) {
        if (e.type !== "pointercancel") {
          (_a = props.onPointerUp) == null ? void 0 : _a.call(props, e, state.el);
          if (e.target && state.el.contains(e.target)) {
            if (longPressTriggered) {
              onLongPress == null ? void 0 : onLongPress(e, state.el);
            } else {
              onPress == null ? void 0 : onPress(e, state.el);
            }
          }
        }
        document.documentElement.style.userSelect = state.originalUserSelect || "";
        state.el.style.touchAction = state.originalTouchAction || "";
      }
      state.id = void 0;
      state.started = false;
      removeGlobalListener(window, "pointermove", onPointerMove, false);
      removeGlobalListener(window, "pointerup", onPointerUp, false);
      removeGlobalListener(window, "pointercancel", onPointerUp, false);
    }
  };
  return {
    domProps: {
      onPointerDown: createEventHandler(onPointerDown)
    }
  };
}
function useTableRowStyle({ index, isSelected, isHeader }) {
  const isDarkMode = useIsDarkMode();
  const isMobile = useIsMobileMediaQuery();
  const { hideBorder, enableSelection, collapseOnMobile, onAction } = useContext(TableContext);
  const isFirst = index === 0;
  return clsx(
    "flex gap-x-16 break-inside-avoid outline-none border border-transparent",
    onAction && "cursor-pointer",
    isMobile && collapseOnMobile && hideBorder ? "mb-8 pl-8 pr-0 rounded" : "px-16",
    !hideBorder && "border-b-divider",
    !hideBorder && isFirst && "border-t-divider",
    isSelected && !isDarkMode && "bg-primary/selected hover:bg-primary/focus focus-visible:bg-primary/focus",
    isSelected && isDarkMode && "bg-selected hover:bg-focus focus-visible:bg-focus",
    !isSelected && !isHeader && (enableSelection || onAction) && "focus-visible:bg-focus hover:bg-hover"
  );
}
const interactableElements = ["button", "a", "input", "select", "textarea"];
function TableRow({
  item,
  index,
  renderAs,
  className,
  style
}) {
  const {
    selectedRows,
    columns,
    toggleRow,
    selectRow,
    onAction,
    selectRowOnContextMenu,
    enableSelection,
    selectionStyle,
    hideHeaderRow
  } = useContext(TableContext);
  const isTouchDevice = useRef(false);
  const isSelected = selectedRows.includes(item.id);
  const [isHovered, setIsHovered] = useState(false);
  const clickedOnInteractable = (e) => {
    return e.target.closest(interactableElements.join(","));
  };
  const doubleClickHandler = (e) => {
    if (selectionStyle === "highlight" && onAction && !isTouchDevice.current && !clickedOnInteractable(e)) {
      e.preventDefault();
      e.stopPropagation();
      onAction(item, index);
    }
  };
  const anyRowsSelected = !!selectedRows.length;
  const handleRowTap = (e) => {
    if (clickedOnInteractable(e))
      return;
    if (selectionStyle === "checkbox") {
      if (enableSelection && (anyRowsSelected || !onAction)) {
        toggleRow(item);
      } else if (onAction) {
        onAction(item, index);
      }
    } else if (selectionStyle === "highlight") {
      if (isTouchDevice.current) {
        if (enableSelection && anyRowsSelected) {
          toggleRow(item);
        } else {
          onAction == null ? void 0 : onAction(item, index);
        }
      } else if (enableSelection) {
        selectRow(item, isCtrlOrShiftPressed(e));
      }
    }
  };
  const { domProps } = usePointerEvents({
    onPointerDown: (e) => {
      isTouchDevice.current = e.pointerType === "touch";
    },
    onPress: handleRowTap,
    onLongPress: enableSelection ? () => {
      if (isTouchDevice.current) {
        toggleRow(item);
      }
    } : void 0
  });
  const keyboardHandler = (e) => {
    if (enableSelection && e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      if (selectionStyle === "checkbox") {
        toggleRow(item);
      } else {
        selectRow(item);
      }
    } else if (e.key === "Enter" && !selectedRows.length && onAction) {
      e.preventDefault();
      e.stopPropagation();
      onAction(item, index);
    }
  };
  const contextMenuHandler = (e) => {
    if (selectRowOnContextMenu && enableSelection) {
      if (!selectedRows.includes(item.id)) {
        selectRow(item);
      }
    }
    if (isTouchDevice.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  const styleClassName = useTableRowStyle({ index, isSelected });
  const RowElement = renderAs || "div";
  return /* @__PURE__ */ jsx(
    RowElement,
    {
      role: "row",
      "aria-rowindex": index + 1 + (hideHeaderRow ? 0 : 1),
      "aria-selected": isSelected,
      tabIndex: -1,
      className: clsx(className, styleClassName),
      item: RowElement === "div" ? void 0 : item,
      onDoubleClick: createEventHandler(doubleClickHandler),
      onKeyDown: createEventHandler(keyboardHandler),
      onContextMenu: createEventHandler(contextMenuHandler),
      onPointerEnter: createEventHandler(() => setIsHovered(true)),
      onPointerLeave: createEventHandler(() => setIsHovered(false)),
      style,
      ...domProps,
      children: columns.map((column, cellIndex) => /* @__PURE__ */ jsx(
        TableCell,
        {
          rowIndex: index,
          rowIsHovered: isHovered,
          index: cellIndex,
          item
        },
        `${item.id}-${column.key}`
      ))
    }
  );
}
const CheckboxColumnConfig = {
  key: "checkbox",
  header: () => /* @__PURE__ */ jsx(SelectAllCheckbox, {}),
  align: "center",
  width: "w-24 flex-shrink-0",
  body: (item, row) => {
    if (row.isPlaceholder) {
      return /* @__PURE__ */ jsx(Skeleton, { size: "w-24 h-24", variant: "rect" });
    }
    return /* @__PURE__ */ jsx(SelectRowCheckbox, { item });
  }
};
function SelectRowCheckbox({ item }) {
  const { selectedRows, toggleRow } = useContext(TableContext);
  return /* @__PURE__ */ jsx(
    Checkbox,
    {
      checked: selectedRows.includes(item.id),
      onChange: () => toggleRow(item)
    }
  );
}
function SelectAllCheckbox() {
  const { trans } = useTrans();
  const { data, selectedRows, onSelectionChange } = useContext(TableContext);
  const allRowsSelected = !!data.length && data.length === selectedRows.length;
  const someRowsSelected = !allRowsSelected && !!selectedRows.length;
  return /* @__PURE__ */ jsx(
    Checkbox,
    {
      "aria-label": trans({ message: "Select all" }),
      isIndeterminate: someRowsSelected,
      checked: allRowsSelected,
      onChange: () => {
        if (allRowsSelected) {
          onSelectionChange([]);
        } else {
          onSelectionChange(data.map((d) => d.id));
        }
      }
    }
  );
}
const ArrowDownwardIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "m20 12-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" }),
  "ArrowDownwardOutlined"
);
function HeaderCell({ index }) {
  const { columns, sortDescriptor, onSortChange, enableSorting } = useContext(TableContext);
  const column = columns[index];
  const style = useTableCellStyle({
    index,
    isHeader: true
  });
  const [isHovered, setIsHovered] = useState(false);
  const sortingKey = column.sortingKey || column.key;
  const allowSorting = column.allowsSorting && enableSorting;
  const { orderBy, orderDir } = sortDescriptor || {};
  const sortActive = allowSorting && orderBy === sortingKey;
  let ariaSort;
  if (sortActive && orderDir === "asc") {
    ariaSort = "ascending";
  } else if (sortActive && orderDir === "desc") {
    ariaSort = "descending";
  } else if (allowSorting) {
    ariaSort = "none";
  }
  const toggleSorting = () => {
    if (!allowSorting)
      return;
    let newSort;
    if (sortActive && orderDir === "desc") {
      newSort = { orderDir: "asc", orderBy: sortingKey };
    } else if (sortActive && orderDir === "asc") {
      newSort = { orderBy: void 0, orderDir: void 0 };
    } else {
      newSort = { orderDir: "desc", orderBy: sortingKey };
    }
    onSortChange == null ? void 0 : onSortChange(newSort);
  };
  const sortVisible = sortActive || isHovered;
  const sortVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: "-25%" }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "columnheader",
      tabIndex: -1,
      "aria-colindex": index + 1,
      "aria-sort": ariaSort,
      className: clsx(
        style,
        "text-muted font-medium text-xs",
        allowSorting && "cursor-pointer"
      ),
      onMouseEnter: () => {
        setIsHovered(true);
      },
      onMouseLeave: () => {
        setIsHovered(false);
      },
      onKeyDown: (e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          toggleSorting();
        }
      },
      onClick: toggleSorting,
      children: [
        column.hideHeader ? /* @__PURE__ */ jsx("div", { className: "sr-only", children: column.header() }) : column.header(),
        /* @__PURE__ */ jsx(AnimatePresence, { children: allowSorting && /* @__PURE__ */ jsx(
          m.span,
          {
            variants: sortVariants,
            animate: sortVisible ? "visible" : "hidden",
            initial: false,
            transition: { type: "tween" },
            className: "inline-block ml-6 -mt-2",
            "data-testid": "table-sort-button",
            "aria-hidden": !sortVisible,
            children: /* @__PURE__ */ jsx(
              ArrowDownwardIcon,
              {
                size: "xs",
                className: clsx(
                  "text-muted",
                  orderDir === "asc" && orderBy === sortingKey && "rotate-180 transition-transform"
                )
              }
            )
          },
          "sort-icon"
        ) })
      ]
    }
  );
}
function TableHeaderRow() {
  const { columns } = useContext(TableContext);
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "row",
      "aria-rowindex": 1,
      tabIndex: -1,
      className: "flex gap-x-16 px-16",
      children: columns.map((column, columnIndex) => /* @__PURE__ */ jsx(HeaderCell, { index: columnIndex }, column.key))
    }
  );
}
function Table({
  className,
  columns: userColumns,
  collapseOnMobile = true,
  hideHeaderRow = false,
  hideBorder = false,
  data,
  selectedRows: propsSelectedRows,
  defaultSelectedRows: propsDefaultSelectedRows,
  onSelectionChange: propsOnSelectionChange,
  sortDescriptor: propsSortDescriptor,
  onSortChange: propsOnSortChange,
  enableSorting = true,
  onDelete,
  enableSelection = true,
  selectionStyle = "checkbox",
  ariaLabelledBy,
  selectRowOnContextMenu,
  onAction,
  renderRowAs,
  tableBody,
  meta,
  tableRef: propsTableRef,
  closeOnInteractOutside = false,
  cellHeight,
  headerCellHeight,
  ...domProps
}) {
  const isMobile = useIsMobileMediaQuery();
  const isCollapsedMode = !!isMobile && collapseOnMobile;
  if (isCollapsedMode) {
    hideHeaderRow = true;
    hideBorder = true;
  }
  const [selectedRows, onSelectionChange] = useControlledState(
    propsSelectedRows,
    propsDefaultSelectedRows || [],
    propsOnSelectionChange
  );
  const [sortDescriptor, onSortChange] = useControlledState(
    propsSortDescriptor,
    void 0,
    propsOnSortChange
  );
  const toggleRow = useCallback(
    (item) => {
      const newValues = [...selectedRows];
      if (!newValues.includes(item.id)) {
        newValues.push(item.id);
      } else {
        const index = newValues.indexOf(item.id);
        newValues.splice(index, 1);
      }
      onSelectionChange(newValues);
    },
    [selectedRows, onSelectionChange]
  );
  const selectRow = useCallback(
    // allow deselecting all rows by passing in null
    (item, merge) => {
      let newValues = [];
      if (item) {
        newValues = merge ? [...selectedRows == null ? void 0 : selectedRows.filter((id) => id !== item.id), item.id] : [item.id];
      }
      onSelectionChange(newValues);
    },
    [selectedRows, onSelectionChange]
  );
  const columns = useMemo(() => {
    const filteredColumns = userColumns.filter((c) => {
      const visibleInMode = c.visibleInMode || "regular";
      if (visibleInMode === "all") {
        return true;
      }
      if (visibleInMode === "compact" && isCollapsedMode) {
        return true;
      }
      if (visibleInMode === "regular" && !isCollapsedMode) {
        return true;
      }
    });
    const showCheckboxCell = enableSelection && selectionStyle !== "highlight" && !isMobile;
    if (showCheckboxCell) {
      filteredColumns.unshift(CheckboxColumnConfig);
    }
    return filteredColumns;
  }, [isMobile, userColumns, enableSelection, selectionStyle, isCollapsedMode]);
  const contextValue = {
    isCollapsedMode,
    cellHeight,
    headerCellHeight,
    hideBorder,
    hideHeaderRow,
    selectedRows,
    onSelectionChange,
    enableSorting,
    enableSelection,
    selectionStyle,
    data,
    columns,
    sortDescriptor,
    onSortChange,
    toggleRow,
    selectRow,
    onAction,
    selectRowOnContextMenu,
    meta,
    collapseOnMobile
  };
  const navProps = useGridNavigation({
    cellCount: enableSelection ? columns.length + 1 : columns.length,
    rowCount: data.length + 1
  });
  const tableBodyProps = {
    renderRowAs
  };
  if (!tableBody) {
    tableBody = /* @__PURE__ */ jsx(BasicTableBody, { ...tableBodyProps });
  } else {
    tableBody = cloneElement(tableBody, tableBodyProps);
  }
  const tableRef = useObjectRef(propsTableRef);
  useInteractOutside({
    ref: tableRef,
    onInteractOutside: (e) => {
      if (closeOnInteractOutside && enableSelection && (selectedRows == null ? void 0 : selectedRows.length) && // don't deselect if clicking on a dialog (for example is table row has a context menu)
      !e.target.closest('[role="dialog"]')) {
        onSelectionChange([]);
      }
    }
  });
  return /* @__PURE__ */ jsx(TableContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsxs(
    "div",
    {
      ...mergeProps(domProps, navProps, {
        onKeyDown: (e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            e.stopPropagation();
            if (selectedRows == null ? void 0 : selectedRows.length) {
              onSelectionChange([]);
            }
          } else if (e.key === "Delete") {
            e.preventDefault();
            e.stopPropagation();
            if (selectedRows == null ? void 0 : selectedRows.length) {
              onDelete == null ? void 0 : onDelete(
                data.filter((item) => selectedRows == null ? void 0 : selectedRows.includes(item.id))
              );
            }
          } else if (isCtrlKeyPressed(e) && e.key === "a") {
            e.preventDefault();
            e.stopPropagation();
            if (enableSelection) {
              onSelectionChange(data.map((item) => item.id));
            }
          }
        }
      }),
      role: "grid",
      tabIndex: 0,
      "aria-rowcount": data.length + 1,
      "aria-colcount": columns.length + 1,
      ref: tableRef,
      "aria-multiselectable": enableSelection ? true : void 0,
      "aria-labelledby": ariaLabelledBy,
      className: clsx(
        className,
        "isolate select-none text-sm outline-none focus-visible:ring-2"
      ),
      children: [
        !hideHeaderRow && /* @__PURE__ */ jsx(TableHeaderRow, {}),
        tableBody
      ]
    }
  ) });
}
function BasicTableBody({ renderRowAs }) {
  const { data } = useContext(TableContext);
  return /* @__PURE__ */ jsx(Fragment, { children: data.map((item, rowIndex) => /* @__PURE__ */ jsx(
    TableRow,
    {
      item,
      index: rowIndex,
      renderAs: renderRowAs
    },
    item.id
  )) });
}
const Avatar = forwardRef(
  ({
    className,
    circle,
    size = "md",
    src,
    link,
    label,
    fallback = "generic",
    lazy = true,
    ...domProps
  }, ref) => {
    let renderedAvatar = src ? /* @__PURE__ */ jsx(
      "img",
      {
        ref,
        src,
        alt: label,
        loading: lazy ? "lazy" : void 0,
        className: "block h-full w-full object-cover"
      }
    ) : /* @__PURE__ */ jsx("div", { className: "h-full w-full bg-alt dark:bg-chip", children: /* @__PURE__ */ jsx(
      AvatarPlaceholderIcon,
      {
        viewBox: "0 0 48 48",
        className: "h-full w-full text-muted"
      }
    ) });
    if (label) {
      renderedAvatar = /* @__PURE__ */ jsx(Tooltip, { label, children: renderedAvatar });
    }
    const wrapperProps = {
      ...domProps,
      className: clsx(
        className,
        "relative block overflow-hidden select-none flex-shrink-0",
        getSizeClassName(size),
        circle ? "rounded-full" : "rounded"
      )
    };
    return link ? /* @__PURE__ */ jsx(Link, { ...wrapperProps, to: link, children: renderedAvatar }) : /* @__PURE__ */ jsx("div", { ...wrapperProps, children: renderedAvatar });
  }
);
function getSizeClassName(size) {
  switch (size) {
    case "xs":
      return "w-18 h-18";
    case "sm":
      return "w-24 h-24";
    case "md":
      return "w-32 h-32";
    case "lg":
      return "w-40 h-40";
    case "xl":
      return "w-60 h-60";
    default:
      return size;
  }
}
function ChipList({
  className,
  children,
  size,
  color,
  radius,
  selectable,
  wrap = true
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        "flex items-center gap-8",
        wrap && "flex-wrap",
        className
      ),
      children: Children.map(children, (chip) => {
        if (isValidElement(chip)) {
          return cloneElement(chip, {
            size,
            color,
            selectable,
            radius
          });
        }
      })
    }
  );
}
const FormattedNumber = memo(
  ({ value, ...options }) => {
    const formatter = useNumberFormatter(options);
    if (isNaN(value)) {
      value = 0;
    }
    return /* @__PURE__ */ jsx(Fragment, { children: formatter.format(value) });
  },
  shallowEqual
);
const draggables = /* @__PURE__ */ new Map();
const droppables = /* @__PURE__ */ new Map();
const dragMonitors = /* @__PURE__ */ new Map();
const dragSession = {
  status: "inactive"
};
function interactableEvent({
  e,
  rect,
  deltaX,
  deltaY
}) {
  return {
    rect,
    x: e.clientX,
    y: e.clientY,
    deltaX: deltaX ?? 0,
    deltaY: deltaY ?? 0,
    nativeEvent: e
  };
}
let activeInteraction = null;
function setActiveInteraction(name) {
  activeInteraction = name;
}
function domRectToObj(rect) {
  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height
  };
}
function updateRects(targets) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const { width, height, left, top } = entry.boundingClientRect;
      const [id, target] = [...targets].find(
        ([, target2]) => target2.ref.current === entry.target
      ) || [];
      if (id == null || target == null)
        return;
      const rect = {
        width,
        height,
        left,
        top
      };
      targets.set(id, { ...target, rect });
    });
    observer.disconnect();
  });
  [...targets.values()].forEach((target) => {
    if (target.ref.current) {
      observer.observe(target.ref.current);
    }
  });
}
function useDraggable({
  id,
  disabled,
  ref,
  preview,
  hidePreview,
  ...options
}) {
  const dragHandleRef = useRef(null);
  const { addGlobalListener, removeAllGlobalListeners } = useGlobalListeners();
  const state = useRef({
    lastPosition: { x: 0, y: 0 }
  }).current;
  const optionsRef = useRef(options);
  optionsRef.current = options;
  useLayoutEffect(() => {
    if (!disabled) {
      draggables.set(id, {
        ...draggables.get(id),
        id,
        ref,
        type: optionsRef.current.type,
        getData: optionsRef.current.getData
      });
    } else {
      draggables.delete(id);
    }
    return () => {
      draggables.delete(id);
    };
  }, [id, disabled, optionsRef, ref]);
  const notifyMonitors = (callback) => {
    dragMonitors.forEach((monitor) => {
      var _a;
      if (monitor.type === ((_a = draggables.get(id)) == null ? void 0 : _a.type)) {
        callback(monitor);
      }
    });
  };
  const onDragStart = (e) => {
    var _a, _b;
    const draggable = draggables.get(id);
    const el = ref.current;
    const clickedOnHandle = !dragHandleRef.current || !state.clickedEl || dragHandleRef.current.contains(state.clickedEl);
    if (activeInteraction || !el || !draggable || !clickedOnHandle) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    updateRects(droppables);
    setActiveInteraction("drag");
    if (hidePreview) {
      hideNativeGhostImage(e);
    }
    e.dataTransfer.effectAllowed = "move";
    state.lastPosition = { x: e.clientX, y: e.clientY };
    state.currentRect = domRectToObj(el.getBoundingClientRect());
    const ie = interactableEvent({ rect: state.currentRect, e });
    if (preview == null ? void 0 : preview.current) {
      preview.current(draggable, (node) => {
        e.dataTransfer.setDragImage(node, 0, 0);
      });
    }
    dragSession.status = "dragging";
    dragSession.dragTargetId = id;
    if (ref.current) {
      ref.current.dataset.dragging = "true";
    }
    (_b = (_a = optionsRef.current).onDragStart) == null ? void 0 : _b.call(_a, ie, draggable);
    requestAnimationFrame(() => {
      notifyMonitors((m2) => {
        var _a2;
        return (_a2 = m2.onDragStart) == null ? void 0 : _a2.call(m2, ie, draggable);
      });
    });
    addGlobalListener(window, "dragover", onDragOver, true);
  };
  const onDragOver = (e) => {
    var _a, _b;
    e.preventDefault();
    if (!state.currentRect)
      return;
    const deltaX = e.clientX - state.lastPosition.x;
    const deltaY = e.clientY - state.lastPosition.y;
    const newRect = {
      ...state.currentRect,
      left: state.currentRect.left + deltaX,
      top: state.currentRect.top + deltaY
    };
    const ie = interactableEvent({ rect: newRect, e, deltaX, deltaY });
    const target = draggables.get(id);
    if (target) {
      (_b = (_a = optionsRef.current).onDragMove) == null ? void 0 : _b.call(_a, ie, target);
      notifyMonitors((m2) => {
        var _a2;
        return (_a2 = m2.onDragMove) == null ? void 0 : _a2.call(m2, ie, target);
      });
    }
    state.lastPosition = { x: e.clientX, y: e.clientY };
    state.currentRect = newRect;
  };
  const onDragEnd = (e) => {
    var _a, _b;
    removeAllGlobalListeners();
    if (!state.currentRect)
      return;
    setActiveInteraction(null);
    if (emptyImage) {
      emptyImage.remove();
    }
    const ie = interactableEvent({ rect: state.currentRect, e });
    const draggable = draggables.get(id);
    if (draggable) {
      (_b = (_a = optionsRef.current).onDragEnd) == null ? void 0 : _b.call(_a, ie, draggable);
      notifyMonitors((m2) => {
        var _a2;
        return (_a2 = m2.onDragEnd) == null ? void 0 : _a2.call(m2, ie, draggable, dragSession.status);
      });
    }
    requestAnimationFrame(() => {
      dragSession.dragTargetId = void 0;
      dragSession.status = "inactive";
      if (ref.current) {
        delete ref.current.dataset.dragging;
      }
    });
  };
  const draggableProps = {
    draggable: !disabled,
    onDragStart,
    onDragEnd,
    onPointerDown: (e) => {
      state.clickedEl = e.target;
    }
  };
  return { draggableProps, dragHandleRef };
}
let emptyImage;
function hideNativeGhostImage(e) {
  if (!emptyImage) {
    emptyImage = new Image();
    document.body.append(emptyImage);
    emptyImage.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
  }
  e.dataTransfer.setDragImage(emptyImage, 0, 0);
}
async function* readFilesFromDataTransfer(dataTransfer) {
  const entries = [];
  for (const item of dataTransfer.items) {
    if (item.kind === "file") {
      const entry = item.webkitGetAsEntry();
      if (entry) {
        entries.push(entry);
      }
    }
  }
  for (const entry of entries) {
    if (entry.isFile) {
      if (entry.name === ".DS_Store")
        continue;
      const file = await getEntryFile(entry);
      yield new UploadedFile(file, entry.fullPath);
    } else if (entry.isDirectory) {
      yield* getEntriesFromDirectory(entry);
    }
  }
}
async function* getEntriesFromDirectory(item) {
  const reader = item.createReader();
  let entries;
  do {
    entries = await new Promise((resolve, reject) => {
      reader.readEntries(resolve, reject);
    });
    for (const entry of entries) {
      if (entry.isFile) {
        if (entry.name === ".DS_Store")
          continue;
        const file = await getEntryFile(entry);
        yield new UploadedFile(file, entry.fullPath);
      } else if (entry.isDirectory) {
        yield* getEntriesFromDirectory(entry);
      }
    }
  } while (entries.length > 0);
}
function getEntryFile(entry) {
  return new Promise((resolve, reject) => entry.file(resolve, reject));
}
async function asyncIterableToArray(iterator) {
  const items = [];
  for await (const item of iterator) {
    items.push(item);
  }
  return items;
}
const DROP_ACTIVATE_TIMEOUT = 400;
function useDroppable({
  id,
  disabled,
  ref,
  ...options
}) {
  const state = useRef({
    dragOverElements: /* @__PURE__ */ new Set(),
    dropActivateTimer: void 0
  }).current;
  const optionsRef = useRef(options);
  optionsRef.current = options;
  useLayoutEffect(() => {
    droppables.set(id, {
      ...droppables.get(id),
      disabled,
      id,
      ref
    });
    return () => {
      droppables.delete(id);
    };
  }, [id, optionsRef, disabled, ref]);
  const canDrop = (draggable) => {
    var _a;
    const options2 = optionsRef.current;
    const allowEventsOnSelf = options2.allowDragEventsFromItself || ref.current !== ((_a = draggable.ref) == null ? void 0 : _a.current);
    return !!((draggable == null ? void 0 : draggable.type) && allowEventsOnSelf && options2.types.includes(draggable.type) && (!options2.acceptsDrop || options2.acceptsDrop(draggable)));
  };
  const fireDragLeave = (e) => {
    var _a, _b;
    const draggable = getDraggable(e);
    if (draggable) {
      (_b = (_a = optionsRef.current).onDragLeave) == null ? void 0 : _b.call(_a, draggable);
    }
  };
  const onDragEnter = (e) => {
    var _a, _b;
    e.stopPropagation();
    state.dragOverElements.add(e.target);
    if (state.dragOverElements.size > 1) {
      return;
    }
    const draggable = getDraggable(e);
    if (draggable && canDrop(draggable)) {
      (_b = (_a = optionsRef.current).onDragEnter) == null ? void 0 : _b.call(_a, draggable);
      clearTimeout(state.dropActivateTimer);
      if (typeof optionsRef.current.onDropActivate === "function") {
        state.dropActivateTimer = setTimeout(() => {
          var _a2, _b2;
          if (draggable) {
            (_b2 = (_a2 = optionsRef.current).onDropActivate) == null ? void 0 : _b2.call(_a2, draggable);
          }
        }, DROP_ACTIVATE_TIMEOUT);
      }
    }
  };
  const onDragLeave = (e) => {
    e.stopPropagation();
    state.dragOverElements.delete(e.target);
    for (const element of state.dragOverElements) {
      if (!e.currentTarget.contains(element)) {
        state.dragOverElements.delete(element);
      }
    }
    if (state.dragOverElements.size > 0) {
      return;
    }
    const draggable = getDraggable(e);
    if (draggable && canDrop(draggable)) {
      fireDragLeave(e);
      clearTimeout(state.dropActivateTimer);
    }
  };
  const onDrop = async (e) => {
    var _a, _b, _c, _d;
    e.preventDefault();
    e.stopPropagation();
    state.dragOverElements.clear();
    fireDragLeave(e);
    clearTimeout(state.dropActivateTimer);
    const draggable = getDraggable(e);
    if (draggable) {
      (_b = (_a = optionsRef.current).onDragLeave) == null ? void 0 : _b.call(_a, draggable);
      if (!canDrop(draggable)) {
        if (dragSession.status !== "inactive") {
          dragSession.status = "dropFail";
        }
      } else {
        const dropResult = (_d = (_c = optionsRef.current).onDrop) == null ? void 0 : _d.call(_c, draggable);
        if (dragSession.status !== "inactive") {
          dragSession.status = dropResult === false ? "dropFail" : "dropSuccess";
        }
      }
    }
  };
  const droppableProps = {
    onDragOver: (e) => {
      var _a, _b;
      e.preventDefault();
      e.stopPropagation();
      const draggable = getDraggable(e);
      if (draggable && canDrop(draggable)) {
        (_b = (_a = optionsRef.current).onDragOver) == null ? void 0 : _b.call(_a, draggable, e);
      }
    },
    onDragEnter,
    onDragLeave,
    onDrop
  };
  return {
    droppableProps: disabled ? {} : droppableProps
  };
}
function getDraggable(e) {
  if (dragSession.dragTargetId != null) {
    return draggables.get(dragSession.dragTargetId);
  } else if (e.dataTransfer.types.includes("Files")) {
    return {
      type: "nativeFile",
      el: null,
      ref: null,
      getData: () => {
        return asyncIterableToArray(readFilesFromDataTransfer(e.dataTransfer));
      }
    };
  }
}
const sortableLineStrategy = {
  onDragStart: () => {
  },
  onDragEnter: () => {
  },
  onDragOver: ({ e, ref, item, sortSession: sortSession2, onDropPositionChange }) => {
    var _a;
    const previousPosition = sortSession2.dropPosition;
    let newPosition = null;
    const rect = (_a = droppables.get(item)) == null ? void 0 : _a.rect;
    if (rect) {
      const midY = rect.top + rect.height / 2;
      if (e.clientY <= midY) {
        newPosition = "before";
      } else if (e.clientY >= midY) {
        newPosition = "after";
      }
    }
    if (newPosition !== previousPosition) {
      const overIndex = sortSession2.sortables.indexOf(item);
      sortSession2.dropPosition = newPosition;
      onDropPositionChange == null ? void 0 : onDropPositionChange(sortSession2.dropPosition);
      clearLinePreview(sortSession2);
      if (ref.current) {
        if (sortSession2.dropPosition === "after") {
          addLinePreview(ref.current, "bottom", sortSession2);
        } else {
          if (overIndex === 0) {
            addLinePreview(ref.current, "top", sortSession2);
          } else {
            const droppableId = sortSession2.sortables[overIndex - 1];
            const droppable = droppables.get(droppableId);
            if (droppable == null ? void 0 : droppable.ref.current) {
              addLinePreview(droppable.ref.current, "bottom", sortSession2);
            }
          }
        }
      }
      const itemIndex = sortSession2.sortables.indexOf(item);
      if (sortSession2.activeIndex === itemIndex) {
        sortSession2.finalIndex = sortSession2.activeIndex;
        return;
      }
      const dragDirection = overIndex > sortSession2.activeIndex ? "after" : "before";
      if (dragDirection === "after") {
        sortSession2.finalIndex = sortSession2.dropPosition === "before" ? itemIndex - 1 : itemIndex;
      } else {
        sortSession2.finalIndex = sortSession2.dropPosition === "after" ? itemIndex + 1 : itemIndex;
      }
    }
  },
  onDragEnd: (sortSession2) => {
    clearLinePreview(sortSession2);
  }
};
function clearLinePreview(sortSession2) {
  if (sortSession2 == null ? void 0 : sortSession2.linePreviewEl) {
    sortSession2.linePreviewEl.style.borderBottomColor = "";
    sortSession2.linePreviewEl.style.borderTopColor = "";
    sortSession2.linePreviewEl = void 0;
  }
}
function addLinePreview(el, side, sortSession2) {
  const color = "rgb(var(--be-primary))";
  if (side === "top") {
    el.style.borderTopColor = color;
  } else {
    el.style.borderBottomColor = color;
  }
  if (sortSession2) {
    sortSession2.linePreviewEl = el;
  }
}
function moveItemInArray(array, fromIndex, toIndex) {
  const from = clamp(fromIndex, 0, array.length - 1);
  const to = clamp(toIndex, 0, array.length - 1);
  if (from === to) {
    return array;
  }
  const target = array[from];
  const delta = to < from ? -1 : 1;
  for (let i = from; i !== to; i += delta) {
    array[i] = array[i + delta];
  }
  array[to] = target;
  return array;
}
function moveItemInNewArray(array, from, to) {
  const newArray = array.slice();
  newArray.splice(
    to < 0 ? newArray.length + to : to,
    0,
    newArray.splice(from, 1)[0]
  );
  return newArray;
}
const transition = "transform 0.2s cubic-bezier(0.2, 0, 0, 1)";
const sortableTransformStrategy = {
  onDragStart: (sortSession2) => {
    sortSession2.sortables.forEach((sortable, index) => {
      const droppable = droppables.get(sortable);
      if (!(droppable == null ? void 0 : droppable.ref.current))
        return;
      droppable.ref.current.style.transition = transition;
      if ((sortSession2 == null ? void 0 : sortSession2.activeIndex) === index) {
        droppable.ref.current.style.opacity = "0.4";
      }
    });
  },
  onDragEnter: (sortSession2, overIndex, currentIndex) => {
    moveItemInArray(sortSession2.sortables, currentIndex, overIndex);
    const rects = sortSession2.sortables.map((s) => {
      var _a;
      return (_a = droppables.get(s)) == null ? void 0 : _a.rect;
    });
    sortSession2.sortables.forEach((sortable, index) => {
      if (!sortSession2)
        return;
      const newRects = moveItemInNewArray(
        rects,
        overIndex,
        sortSession2.activeIndex
      );
      const oldRect = rects[index];
      const newRect = newRects[index];
      const sortableTarget = droppables.get(sortable);
      if ((sortableTarget == null ? void 0 : sortableTarget.ref.current) && newRect && oldRect) {
        const x = newRect.left - oldRect.left;
        const y = newRect.top - oldRect.top;
        sortableTarget.ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    });
    sortSession2.finalIndex = overIndex;
  },
  onDragOver: () => {
  },
  onDragEnd: (sortSession2) => {
    sortSession2.sortables.forEach((sortable) => {
      const droppable = droppables.get(sortable);
      if (droppable == null ? void 0 : droppable.ref.current) {
        droppable.ref.current.style.transform = "";
        droppable.ref.current.style.transition = "";
        droppable.ref.current.style.opacity = "";
        droppable.ref.current.style.zIndex = "";
      }
    });
  }
};
const sortableMoveNodeStrategy = {
  onDragStart: () => {
  },
  onDragOver: () => {
  },
  onDragEnter: (sortSession2, overIndex, currentIndex) => {
    var _a;
    const node = (_a = droppables.get(sortSession2.sortables[currentIndex])) == null ? void 0 : _a.ref.current;
    if (node) {
      moveNode(node, currentIndex, overIndex);
      moveItemInArray(sortSession2.sortables, currentIndex, overIndex);
      sortSession2.finalIndex = overIndex;
    }
  },
  onDragEnd: () => {
  }
};
function moveNode(el, currentIndex, newIndex) {
  const parentEl = el.parentElement;
  if (newIndex < 0) {
    parentEl.prepend(el);
  } else {
    if (currentIndex > -1 && currentIndex <= newIndex) {
      newIndex++;
    }
    const ref = parentEl.children.item(newIndex);
    if (ref) {
      ref.before(el);
    } else {
      parentEl.append(el);
    }
  }
}
let sortSession = null;
const strategies = {
  line: sortableLineStrategy,
  liveSort: sortableTransformStrategy,
  moveNode: sortableMoveNodeStrategy
};
function useSortable({
  item,
  items,
  type,
  ref,
  onSortEnd,
  onSortStart,
  onDragEnd,
  preview,
  disabled,
  onDropPositionChange,
  strategy = "liveSort"
}) {
  useEffect(() => {
    if (sortSession && sortSession.sortables.length !== items.length) {
      sortSession.sortables = [...items];
      sortSession.activeIndex = items.indexOf(item);
    }
  }, [items, item]);
  const { draggableProps, dragHandleRef } = useDraggable({
    id: item,
    ref,
    type,
    preview,
    disabled,
    onDragStart: () => {
      var _a;
      sortSession = {
        sortables: [...items],
        activeSortable: item,
        activeIndex: items.indexOf(item),
        finalIndex: items.indexOf(item),
        dropPosition: null,
        ref,
        scrollParent: ref.current ? getScrollParent(ref.current) : void 0,
        scrollListener: () => {
          updateRects(droppables);
        }
      };
      strategies[strategy].onDragStart(sortSession);
      onSortStart == null ? void 0 : onSortStart();
      (_a = sortSession.scrollParent) == null ? void 0 : _a.addEventListener(
        "scroll",
        sortSession.scrollListener
      );
    },
    onDragEnd: () => {
      var _a;
      if (!sortSession)
        return;
      sortSession.dropPosition = null;
      onDropPositionChange == null ? void 0 : onDropPositionChange(sortSession.dropPosition);
      if (sortSession.activeIndex !== sortSession.finalIndex) {
        onSortEnd == null ? void 0 : onSortEnd(sortSession.activeIndex, sortSession.finalIndex);
      }
      (_a = sortSession.scrollParent) == null ? void 0 : _a.removeEventListener(
        "scroll",
        sortSession.scrollListener
      );
      strategies[strategy].onDragEnd(sortSession);
      onDragEnd == null ? void 0 : onDragEnd();
      sortSession = null;
    },
    getData: () => {
    }
  });
  const { droppableProps } = useDroppable({
    id: item,
    ref,
    types: [type],
    disabled,
    allowDragEventsFromItself: true,
    onDragOver: (target, e) => {
      if (!sortSession)
        return;
      strategies[strategy].onDragOver({
        e,
        ref,
        item,
        sortSession,
        onDropPositionChange
      });
    },
    onDragEnter: () => {
      if (!sortSession)
        return;
      const overIndex = sortSession.sortables.indexOf(item);
      const oldIndex = sortSession.sortables.indexOf(
        sortSession.activeSortable
      );
      strategies[strategy].onDragEnter(sortSession, overIndex, oldIndex);
    },
    onDragLeave: () => {
      if (!sortSession)
        return;
      sortSession.dropPosition = null;
      onDropPositionChange == null ? void 0 : onDropPositionChange(sortSession.dropPosition);
    }
  });
  return {
    sortableProps: { ...mergeProps(draggableProps, droppableProps) },
    dragHandleRef
  };
}
const DragPreview = React.forwardRef((props, ref) => {
  const render = props.children;
  const [children, setChildren] = useState(null);
  const domRef = useRef(null);
  useImperativeHandle(
    ref,
    () => (draggable, callback) => {
      flushSync(() => {
        setChildren(render(draggable));
      });
      callback(domRef.current);
      requestAnimationFrame(() => {
        setChildren(null);
      });
    },
    [render]
  );
  if (!children) {
    return null;
  }
  return createPortal(
    /* @__PURE__ */ jsx(
      "div",
      {
        style: { zIndex: -100, position: "absolute", top: 0, left: -1e5 },
        ref: domRef,
        children
      }
    ),
    rootEl
  );
});
const FormattedDuration = memo(
  ({
    minutes,
    seconds,
    ms,
    verbose = false,
    addZeroToFirstUnit = true
  }) => {
    const { trans } = useTrans();
    if (minutes) {
      ms = minutes * 6e4;
    } else if (seconds) {
      ms = seconds * 1e3;
    }
    if (!ms) {
      ms = 0;
    }
    const unsignedMs = ms < 0 ? -ms : ms;
    const parsedMS = {
      days: Math.trunc(unsignedMs / 864e5),
      hours: Math.trunc(unsignedMs / 36e5) % 24,
      minutes: Math.trunc(unsignedMs / 6e4) % 60,
      seconds: Math.trunc(unsignedMs / 1e3) % 60
    };
    let formattedValue;
    if (verbose) {
      formattedValue = formatVerbose(parsedMS, trans);
    } else {
      formattedValue = formatCompact(parsedMS, addZeroToFirstUnit);
    }
    return /* @__PURE__ */ jsx(Fragment, { children: formattedValue });
  }
);
function formatVerbose(t, trans) {
  const output = [];
  if (t.days) {
    output.push(`${t.days}${trans(message("d"))}`);
  }
  if (t.hours) {
    output.push(`${t.hours}${trans(message("hr"))}`);
  }
  if (t.minutes) {
    output.push(`${t.minutes}${trans(message("min"))}`);
  }
  if (t.seconds && !t.hours) {
    output.push(`${t.seconds}${trans(message("sec"))}`);
  }
  return output.join(" ");
}
function formatCompact(t, addZeroToFirstUnit = true) {
  const seconds = addZero(t.seconds);
  let output = "";
  if (t.days && !output) {
    output = `${t.days}:${addZero(t.hours)}:${addZero(t.minutes)}:${seconds}`;
  }
  if (t.hours && !output) {
    output = `${addZero(t.hours, addZeroToFirstUnit)}:${addZero(
      t.minutes
    )}:${seconds}`;
  }
  if (!output) {
    output = `${addZero(t.minutes, addZeroToFirstUnit)}:${seconds}`;
  }
  return output;
}
function addZero(v, addZero2 = true) {
  if (!addZero2)
    return v;
  let value = `${v}`;
  if (value.length === 1) {
    value = "0" + value;
  }
  return value;
}
const GENRE_MODEL = "genre";
const WAVE_WIDTH = 1365;
const WAVE_HEIGHT = 45;
const BAR_WIDTH = 3;
const BAR_GAP = 0.5;
function generateWaveformData(file) {
  const audioContext = new window.AudioContext();
  return new Promise((resolve, abort) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) {
      abort();
      return;
    }
    canvas.width = WAVE_WIDTH;
    canvas.height = WAVE_HEIGHT;
    const reader = new FileReader();
    reader.onload = (e) => {
      var _a;
      const buffer = (_a = e.target) == null ? void 0 : _a.result;
      if (!buffer) {
        abort();
      } else {
        audioContext.decodeAudioData(
          buffer,
          (buffer2) => {
            const waveData = extractBuffer(buffer2, context);
            resolve(waveData);
          },
          () => resolve(null)
        );
      }
    };
    reader.readAsArrayBuffer(file);
  });
}
function extractBuffer(buffer, context) {
  const waveData = [];
  const channelData = buffer.getChannelData(0);
  const sections = WAVE_WIDTH;
  const len = Math.floor(channelData.length / sections);
  const maxHeight = WAVE_HEIGHT;
  const vals = [];
  for (let i = 0; i < sections; i += BAR_WIDTH) {
    vals.push(bufferMeasure(i * len, len, channelData) * 1e4);
  }
  for (let j = 0; j < sections; j += BAR_WIDTH) {
    const scale = maxHeight / Math.max(...vals);
    let val = bufferMeasure(j * len, len, channelData) * 1e4;
    val *= scale;
    val += 1;
    waveData.push(getBarData(j, val));
  }
  context.clearRect(0, 0, WAVE_WIDTH, WAVE_HEIGHT);
  return waveData;
}
function bufferMeasure(position, length, data) {
  let sum = 0;
  for (let i = position; i <= position + length - 1; i++) {
    sum += Math.pow(data[i], 2);
  }
  return Math.sqrt(sum / data.length);
}
function getBarData(i, h) {
  let w = BAR_WIDTH;
  {
    w *= Math.abs(1 - BAR_GAP);
  }
  const x = i + w / 2, y = WAVE_HEIGHT - h;
  return [x, y, w, h];
}
function assignAlbumToTracks(album) {
  var _a;
  album.tracks = (_a = album.tracks) == null ? void 0 : _a.map((track) => {
    if (!track.album) {
      track.album = { ...album, tracks: void 0 };
    }
    return track;
  });
  return album;
}
function useTrack(params) {
  const { trackId } = useParams();
  return useQuery({
    queryKey: ["tracks", +trackId, params],
    queryFn: () => fetchTrack(trackId, params),
    initialData: () => {
      var _a, _b;
      const data = (_a = getBootstrapData().loaders) == null ? void 0 : _a[params.loader];
      if (((_b = data == null ? void 0 : data.track) == null ? void 0 : _b.id) == trackId && (data == null ? void 0 : data.loader) === params.loader) {
        return data;
      }
      return void 0;
    }
  });
}
function fetchTrack(trackId, params) {
  return apiClient.get(`tracks/${trackId}`, { params }).then((response) => {
    if (response.data.track.album) {
      response.data.track = {
        ...response.data.track,
        album: assignAlbumToTracks(response.data.track.album)
      };
    }
    return response.data;
  });
}
function useAlbum(params) {
  const { albumId } = useParams();
  return useQuery({
    queryKey: ["albums", +albumId],
    queryFn: () => fetchAlbum(albumId, params),
    initialData: () => {
      var _a, _b;
      const data = (_a = getBootstrapData().loaders) == null ? void 0 : _a[params.loader];
      if (((_b = data == null ? void 0 : data.album) == null ? void 0 : _b.id) == albumId && (data == null ? void 0 : data.loader) === params.loader) {
        return data;
      }
      return void 0;
    }
  });
}
function fetchAlbum(albumId, params) {
  return apiClient.get(`albums/${albumId}`, {
    params
  }).then((response) => {
    response.data.album = assignAlbumToTracks(response.data.album);
    return response.data;
  });
}
function UserAvatar({ user, ...props }) {
  var _a;
  const { auth } = useContext(SiteConfigContext);
  return /* @__PURE__ */ jsx(
    Avatar,
    {
      ...props,
      label: user == null ? void 0 : user.display_name,
      src: user == null ? void 0 : user.avatar,
      link: (user == null ? void 0 : user.id) && ((_a = auth.getUserProfileLink) == null ? void 0 : _a.call(auth, user))
    }
  );
}
const MAX_SAFE_INTEGER = 9007199254740991;
function sortArrayOfObjects(data, orderBy, orderDir = "desc") {
  return data.sort((a, b) => {
    let valueA = sortingDataAccessor(a, orderBy);
    let valueB = sortingDataAccessor(b, orderBy);
    const valueAType = typeof valueA;
    const valueBType = typeof valueB;
    if (valueAType !== valueBType) {
      if (valueAType === "number") {
        valueA += "";
      }
      if (valueBType === "number") {
        valueB += "";
      }
    }
    let comparatorResult = 0;
    if (valueA != null && valueB != null) {
      if (valueA > valueB) {
        comparatorResult = 1;
      } else if (valueA < valueB) {
        comparatorResult = -1;
      }
    } else if (valueA != null) {
      comparatorResult = 1;
    } else if (valueB != null) {
      comparatorResult = -1;
    }
    return comparatorResult * (orderDir === "asc" ? 1 : -1);
  });
}
function sortingDataAccessor(data, key) {
  const value = dot.pick(key, data);
  if (isNumberValue(value)) {
    const numberValue = Number(value);
    return numberValue < MAX_SAFE_INTEGER ? numberValue : value;
  }
  return value;
}
function isNumberValue(value) {
  return !isNaN(parseFloat(value)) && !isNaN(Number(value));
}
function useSortableTableData(data) {
  const [sortDescriptor, onSortChange] = useState({});
  const sortedData = useMemo(() => {
    if (!data) {
      return [];
    } else if (sortDescriptor == null ? void 0 : sortDescriptor.orderBy) {
      return sortArrayOfObjects(
        [...data],
        sortDescriptor.orderBy,
        sortDescriptor.orderDir
      );
    }
    return data;
  }, [sortDescriptor, data]);
  return { data: sortedData, sortDescriptor, onSortChange };
}
function ProfileLinksForm() {
  const { fields, append, remove } = useFieldArray({
    name: "links"
  });
  return /* @__PURE__ */ jsxs("div", { children: [
    fields.map((field, index) => {
      return /* @__PURE__ */ jsxs("div", { className: "flex gap-10 mb-10 items-end", children: [
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            required: true,
            type: "url",
            label: /* @__PURE__ */ jsx(Trans, { message: "URL" }),
            name: `links.${index}.url`,
            size: "sm",
            className: "flex-auto"
          }
        ),
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            required: true,
            label: /* @__PURE__ */ jsx(Trans, { message: "Short title" }),
            name: `links.${index}.title`,
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
          append({ url: "", title: "" });
        },
        children: /* @__PURE__ */ jsx(Trans, { message: "Add another link" })
      }
    )
  ] });
}
const albumLayoutKey = "artistPage-albumLayout";
function useArtist(params) {
  const { artistId } = useParams();
  return useQuery({
    queryKey: ["artists", artistId, params],
    queryFn: () => fetchArtist(artistId, params),
    initialData: () => {
      var _a, _b;
      const data = (_a = getBootstrapData().loaders) == null ? void 0 : _a[params.loader];
      if (((_b = data == null ? void 0 : data.artist) == null ? void 0 : _b.id) == artistId && (data == null ? void 0 : data.loader) === params.loader) {
        return data;
      }
      return void 0;
    }
  });
}
function fetchArtist(artistId, params) {
  return apiClient.get(`artists/${artistId}`, { params }).then((response) => {
    if (response.data.albums) {
      response.data.albums.data = response.data.albums.data.map(
        (album) => assignAlbumToTracks(album)
      );
    }
    return response.data;
  });
}
function themeValueToHex(value) {
  try {
    return parseColor(`rgb(${value.split(" ").join(",")})`).toString("hex");
  } catch (e) {
    return value;
  }
}
export {
  Avatar as A,
  ChipList as C,
  DragPreview as D,
  FormattedNumber as F,
  GENRE_MODEL as G,
  KeyboardArrowLeftIcon as K,
  ProfileLinksForm as P,
  Table as T,
  UserAvatar as U,
  WAVE_WIDTH as W,
  FormattedDuration as a,
  TableContext as b,
  TableRow as c,
  WAVE_HEIGHT as d,
  assignAlbumToTracks as e,
  useSortableTableData as f,
  albumLayoutKey as g,
  useArtist as h,
  useAlbum as i,
  useTrack as j,
  useIsTabletMediaQuery as k,
  usePointerEvents as l,
  moveItemInNewArray as m,
  generateWaveformData as n,
  useDroppable as o,
  ArrowDownwardIcon as p,
  themeValueToHex as t,
  useSortable as u
};
//# sourceMappingURL=theme-value-to-hex-ee0bd15b.mjs.map
