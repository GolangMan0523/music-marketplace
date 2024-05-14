import { jsx, jsxs } from "react/jsx-runtime";
import React, { useRef, useCallback, cloneElement } from "react";
import { useValueEffect, useResizeObserver, useLayoutEffect } from "@react-aria/utils";
import clsx from "clsx";
import { g as createSvgIcon, h as useTrans, an as MenuTrigger, I as IconButton, bG as MoreHorizIcon, ao as Menu, f as Item, G as toast, m as message, H as showHttpErrorToast, J as apiClient } from "../server-entry.mjs";
import { useMutation } from "@tanstack/react-query";
const ChevronRightIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" }),
  "ChevronRightOutlined"
);
function BreadcrumbItem(props) {
  const {
    isCurrent,
    sizeStyle: sizeStyle2,
    isMenuTrigger,
    isClickable,
    isDisabled,
    onSelected,
    className,
    isMenuItem,
    isLink
  } = props;
  const children = typeof props.children === "function" ? props.children({ isMenuItem }) : props.children;
  if (isMenuItem) {
    return children;
  }
  const domProps = isMenuTrigger ? {} : {
    tabIndex: isLink && !isDisabled ? 0 : void 0,
    role: isLink ? "link" : void 0,
    "aria-disabled": isLink ? isDisabled : void 0,
    "aria-current": isCurrent && isLink ? "page" : void 0,
    onClick: () => onSelected == null ? void 0 : onSelected()
  };
  return /* @__PURE__ */ jsxs(
    "li",
    {
      className: clsx(
        `relative inline-flex min-w-0 flex-shrink-0 items-center justify-start ${sizeStyle2 == null ? void 0 : sizeStyle2.font}`,
        (!isClickable || isDisabled) && "pointer-events-none",
        !isCurrent && isDisabled && "text-disabled"
      ),
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            ...domProps,
            className: clsx(
              className,
              "cursor-pointer overflow-hidden whitespace-nowrap rounded px-8",
              !isMenuTrigger && "py-4 hover:bg-hover",
              !isMenuTrigger && isLink && "outline-none focus-visible:ring"
            ),
            children
          }
        ),
        isCurrent === false && /* @__PURE__ */ jsx(
          ChevronRightIcon,
          {
            size: sizeStyle2 == null ? void 0 : sizeStyle2.icon,
            className: clsx(isDisabled ? "text-disabled" : "text-muted")
          }
        )
      ]
    }
  );
}
const MIN_VISIBLE_ITEMS = 1;
const MAX_VISIBLE_ITEMS = 10;
function Breadcrumb(props) {
  const {
    size = "md",
    children,
    isDisabled,
    className,
    currentIsClickable,
    isNavigation
  } = props;
  const { trans } = useTrans();
  const style = sizeStyle(size);
  const childArray = [];
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      childArray.push(child);
    }
  });
  const domRef = useRef(null);
  const listRef = useRef(null);
  const [visibleItems, setVisibleItems] = useValueEffect(childArray.length);
  const updateOverflow = useCallback(() => {
    const computeVisibleItems = (itemCount) => {
      var _a;
      const currListRef = listRef.current;
      if (!currListRef) {
        return;
      }
      const listItems = Array.from(currListRef.children);
      if (!listItems.length)
        return;
      const containerWidth = currListRef.offsetWidth;
      const isShowingMenu = childArray.length > itemCount;
      let calculatedWidth = 0;
      let newVisibleItems = 0;
      let maxVisibleItems = MAX_VISIBLE_ITEMS;
      calculatedWidth += listItems.shift().offsetWidth;
      newVisibleItems++;
      if (isShowingMenu) {
        calculatedWidth += ((_a = listItems.shift()) == null ? void 0 : _a.offsetWidth) ?? 0;
        maxVisibleItems--;
      }
      if (calculatedWidth >= containerWidth) {
        newVisibleItems--;
      }
      if (listItems.length > 0) {
        const last = listItems.pop();
        last.style.overflow = "visible";
        calculatedWidth += last.offsetWidth;
        if (calculatedWidth < containerWidth) {
          newVisibleItems++;
        }
        last.style.overflow = "";
      }
      for (const breadcrumb of listItems.reverse()) {
        calculatedWidth += breadcrumb.offsetWidth;
        if (calculatedWidth < containerWidth) {
          newVisibleItems++;
        }
      }
      return Math.max(
        MIN_VISIBLE_ITEMS,
        Math.min(maxVisibleItems, newVisibleItems)
      );
    };
    setVisibleItems(function* () {
      yield childArray.length;
      const newVisibleItems = computeVisibleItems(childArray.length);
      yield newVisibleItems;
      if (newVisibleItems < childArray.length && newVisibleItems > 1) {
        yield computeVisibleItems(newVisibleItems);
      }
    });
  }, [listRef, children, setVisibleItems]);
  useResizeObserver({ ref: domRef, onResize: updateOverflow });
  useLayoutEffect(updateOverflow, [children]);
  let contents = childArray;
  if (childArray.length > visibleItems) {
    const selectedKey = childArray.length - 1;
    const menuItem = /* @__PURE__ */ jsx(BreadcrumbItem, { sizeStyle: style, isMenuTrigger: true, children: /* @__PURE__ */ jsxs(MenuTrigger, { selectionMode: "single", selectedValue: selectedKey, children: [
      /* @__PURE__ */ jsx(IconButton, { "aria-label": "…", disabled: isDisabled, size: style.btn, children: /* @__PURE__ */ jsx(MoreHorizIcon, {}) }),
      /* @__PURE__ */ jsx(Menu, { children: childArray.map((child, index) => {
        const isLast = selectedKey === index;
        return /* @__PURE__ */ jsx(
          Item,
          {
            value: index,
            onSelected: () => {
              var _a, _b;
              if (!isLast) {
                (_b = (_a = child.props).onSelected) == null ? void 0 : _b.call(_a);
              }
            },
            children: cloneElement(child, { isMenuItem: true })
          },
          index
        );
      }) })
    ] }) }, "menu");
    contents = [menuItem];
    const breadcrumbs = [...childArray];
    let endItems = visibleItems;
    if (visibleItems > 1) {
      contents.unshift(breadcrumbs.shift());
      endItems--;
    }
    contents.push(...breadcrumbs.slice(-endItems));
  }
  const lastIndex = contents.length - 1;
  const breadcrumbItems = contents.map((child, index) => {
    const isCurrent = index === lastIndex;
    const isClickable = !isCurrent || currentIsClickable;
    return cloneElement(child, {
      key: child.key || index,
      isCurrent,
      sizeStyle: style,
      isClickable,
      isDisabled,
      isLink: isNavigation && child.key !== "menu"
    });
  });
  const Element = isNavigation ? "nav" : "div";
  return /* @__PURE__ */ jsx(
    Element,
    {
      className: clsx(className, "w-full min-w-0"),
      "aria-label": trans({ message: "Breadcrumbs" }),
      ref: domRef,
      children: /* @__PURE__ */ jsx(
        "ol",
        {
          ref: listRef,
          className: clsx("flex flex-nowrap justify-start", style.minHeight),
          children: breadcrumbItems
        }
      )
    }
  );
}
function sizeStyle(size) {
  switch (size) {
    case "sm":
      return { font: "text-sm", icon: "sm", btn: "sm", minHeight: "min-h-36" };
    case "lg":
      return { font: "text-lg", icon: "md", btn: "md", minHeight: "min-h-42" };
    case "xl":
      return { font: "text-xl", icon: "md", btn: "md", minHeight: "min-h-42" };
    default:
      return { font: "text-base", icon: "md", btn: "md", minHeight: "min-h-42" };
  }
}
function useCancelSubscription() {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (props) => cancelSubscription(props),
    onSuccess: (response, payload) => {
      toast(
        payload.delete ? trans(message("Subscription deleted.")) : trans(message("Subscription cancelled."))
      );
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function cancelSubscription({
  subscriptionId,
  ...payload
}) {
  return apiClient.post(`billing/subscriptions/${subscriptionId}/cancel`, payload).then((r) => r.data);
}
function useResumeSubscription() {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (props) => resumeSubscription(props),
    onSuccess: () => {
      toast(trans(message("Subscription renewed.")));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function resumeSubscription({ subscriptionId }) {
  return apiClient.post(`billing/subscriptions/${subscriptionId}/resume`).then((r) => r.data);
}
export {
  Breadcrumb as B,
  ChevronRightIcon as C,
  BreadcrumbItem as a,
  useResumeSubscription as b,
  useCancelSubscription as u
};
//# sourceMappingURL=use-resume-subscription-fe3dd087.mjs.map
