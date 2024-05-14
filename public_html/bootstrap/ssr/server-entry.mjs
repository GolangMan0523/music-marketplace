var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var _a, _b;
import { jsx, jsxs, Fragment as Fragment$1 } from "react/jsx-runtime";
import { renderToPipeableStream } from "react-dom/server";
import process$1 from "process";
import { createServer } from "http";
import { QueryClient, useQuery, keepPreviousData, useMutation, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { StaticRouter } from "react-router-dom/server.mjs";
import React, { useMemo, forwardRef, memo, createContext, useContext, Fragment, isValidElement, cloneElement, useCallback, useState, useEffect, StrictMode, useRef, useId, Children } from "react";
import { LazyMotion, domAnimation, AnimatePresence, m } from "framer-motion";
import { Link, useNavigate as useNavigate$1, useLocation, createPath, resolvePath, NavLink, Navigate, Outlet, useSearchParams, useParams, Route, Routes } from "react-router-dom";
import clsx from "clsx";
import slugify from "slugify";
import deepMerge from "deepmerge";
import { getLocalTimeZone, parseAbsoluteToLocal, DateFormatter } from "@internationalized/date";
import memoize from "nano-memoize";
import { create, createStore, useStore } from "zustand";
import { immer } from "zustand/middleware/immer";
import { nanoid } from "nanoid";
import { NumberFormatter } from "@internationalized/number";
import { useControlledState } from "@react-stately/utils";
import { useViewportSize, useObjectRef, mergeProps, useLayoutEffect, isMac } from "@react-aria/utils";
import { offset, shift, flip, size, arrow, useFloating, autoUpdate } from "@floating-ui/react-dom";
import { mergeRefs } from "react-merge-refs";
import { FocusScope, useFocusManager, getFocusableTreeWalker } from "@react-aria/focus";
import { createPortal } from "react-dom";
import { useIsSSR } from "@react-aria/ssr";
import { useController, FormProvider, useForm } from "react-hook-form";
import fscreen from "fscreen";
import { subscribeWithSelector } from "zustand/middleware";
import { useStoreWithEqualityFn } from "zustand/traditional";
import { enableMapSet, produce } from "immer";
import axiosRetry from "axios-retry";
import { Upload } from "tus-js-client";
import match from "mime-match";
import useCopyClipboard from "react-use-clipboard";
let activeWorkspaceId = 0;
function getActiveWorkspaceId() {
  return activeWorkspaceId;
}
function setActiveWorkspaceId(id) {
  activeWorkspaceId = id;
}
function isAbsoluteUrl(url) {
  if (!url)
    return false;
  return /^[a-zA-Z][a-zA-Z\d+\-.]*?:/.test(url);
}
function errorStatusIs(err, status) {
  var _a2;
  return axios.isAxiosError(err) && ((_a2 = err.response) == null ? void 0 : _a2.status) == status;
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3e4,
      retry: (failureCount, err) => {
        return !errorStatusIs(err, 401) && !errorStatusIs(err, 403) && !errorStatusIs(err, 404) && failureCount < 2;
      }
    }
  }
});
const apiClient = axios.create();
apiClient.defaults.withCredentials = true;
apiClient.defaults.responseType = "json";
apiClient.defaults.headers = {
  common: {
    Accept: "application/json"
  }
};
apiClient.interceptors.request.use((config) => {
  var _a2, _b2, _c, _d, _e, _f, _g;
  if (!((_a2 = config.url) == null ? void 0 : _a2.startsWith("auth")) && !((_b2 = config.url) == null ? void 0 : _b2.startsWith("secure")) && !isAbsoluteUrl(config == null ? void 0 : config.url)) {
    config.url = `api/v1/${config.url}`;
  }
  const method = (_c = config.method) == null ? void 0 : _c.toUpperCase();
  if (method === "GET" && Array.isArray((_d = config.params) == null ? void 0 : _d.with)) {
    config.params.with = config.params.with.join(",");
  }
  if (method === "GET" && Array.isArray((_e = config.params) == null ? void 0 : _e.load)) {
    config.params.load = config.params.load.join(",");
  }
  if (method === "GET" && Array.isArray((_f = config.params) == null ? void 0 : _f.loadCount)) {
    config.params.loadCount = config.params.loadCount.join(",");
  }
  const workspaceId = getActiveWorkspaceId();
  if (workspaceId) {
    const method2 = (_g = config.method) == null ? void 0 : _g.toLowerCase();
    if (["get", "post", "put"].includes(method2)) {
      config.params = { ...config.params, workspaceId };
    }
  }
  if (method === "PUT" || method === "DELETE" || method === "PATCH") {
    config.headers = {
      ...config.headers,
      "X-HTTP-Method-Override": method
    };
    config.method = "POST";
    config.params = {
      ...config.params,
      _method: method
    };
  }
  {
    config.headers = {
      ...config.headers,
      referer: "http://localhost"
    };
  }
  return config;
});
const queryKey$1 = ["bootstrapData"];
function getBootstrapData() {
  return queryClient.getQueryData(queryKey$1);
}
function invalidateBootstrapData() {
  queryClient.invalidateQueries({ queryKey: queryKey$1 });
}
function setBootstrapData(data) {
  queryClient.setQueryData(
    queryKey$1,
    typeof data === "string" ? decodeBootstrapData(data) : data
  );
}
function mergeBootstrapData(partialData) {
  setBootstrapData({
    ...getBootstrapData(),
    ...partialData
  });
}
const initialBootstrapData = typeof window !== "undefined" && window.bootstrapData ? decodeBootstrapData(window.bootstrapData) : void 0;
queryClient.setQueryData(queryKey$1, initialBootstrapData);
function useBackendBootstrapData() {
  return useQuery({
    queryKey: queryKey$1,
    queryFn: () => fetchBootstrapData(),
    staleTime: Infinity,
    placeholderData: keepPreviousData,
    initialData: initialBootstrapData
  });
}
const fetchBootstrapData = async () => {
  return apiClient.get("http://bedesk.test/api/v1/bootstrap-data").then((response) => {
    return decodeBootstrapData(response.data.data);
  });
};
function decodeBootstrapData(data) {
  return typeof data === "string" ? JSON.parse(data) : data;
}
const SiteConfigContext = React.createContext(
  null
);
function message(msg, props) {
  return { ...props, message: msg };
}
function slugifyString(text2, replacement = "-", strict = false) {
  if (!text2)
    return text2;
  let slugified = slugify(text2, {
    lower: true,
    replacement,
    strict,
    remove: /[*+~.()'"!:@?\|/\\#]/g
  });
  if (!slugified) {
    slugified = text2.replace(/\s+/g, "-").toLowerCase();
  }
  return slugified;
}
function UserProfileLink({
  user,
  className,
  ...linkProps
}) {
  const finalUri = useMemo(() => {
    return getUserProfileLink(user);
  }, [user]);
  return /* @__PURE__ */ jsx(
    Link,
    {
      ...linkProps,
      className: clsx("hover:underline", className),
      to: finalUri,
      children: user.display_name
    }
  );
}
function getUserProfileLink(user) {
  return `/user/${user.id}/${slugifyString(user.display_name)}`;
}
const generalTopImage = "/assets/general_top-beedc96d.jpg";
const generalBottomImage = "/assets/general_bottom-56f8f517.jpg";
const artistTopImage = "/assets/artist_top-fc3c4106.jpg";
const artistBottomImage = "/assets/artist_bottom-a58b3d3e.jpg";
const albumAboveImage = "/assets/album_above-70d822e9.jpg";
const SiteConfig = {
  homepage: {
    options: [{ label: message("Landing page"), value: "landingPage" }]
  },
  auth: {
    redirectUri: "/",
    adminRedirectUri: "/admin",
    getUserProfileLink
  },
  admin: {
    ads: [
      {
        image: generalTopImage,
        slot: "ads.general_top",
        description: message(
          "Appears at the top of most pages. Best size <= 150px height or responsive."
        )
      },
      {
        image: generalBottomImage,
        slot: "ads.general_bottom",
        description: message(
          "Appears at the bottom of most pages. Best size <= 150px height or responsive."
        )
      },
      {
        image: artistTopImage,
        slot: "ads.artist_top",
        description: message(
          "Appears in artist page only (below page header). Best size <= 1000px width or responsive."
        )
      },
      {
        image: artistBottomImage,
        slot: "ads.artist_bottom",
        description: message(
          "Appears in artist page only (below similar artists). Best size <= 430px width or responsive."
        )
      },
      {
        image: albumAboveImage,
        slot: "ads.album_above",
        description: message(
          "Appears in album page only (above album tracks). Best size is as wide as possible or responsive."
        )
      }
    ]
  }
};
const SvgIcon = forwardRef(
  (props, ref) => {
    const {
      attr,
      size: size2,
      title,
      className,
      color,
      style,
      children,
      viewBox,
      width,
      height,
      ...svgProps
    } = props;
    return /* @__PURE__ */ jsxs(
      "svg",
      {
        "aria-hidden": !title,
        focusable: false,
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: viewBox || "0 0 24 24",
        ...attr,
        ...svgProps,
        className: clsx("svg-icon", className, getSizeClassName$2(size2), "hover:text-black"),
        style: {
          color,
          ...style
        },
        ref,
        height: height || "1em",
        width: width || "1em",
        children: [
          title && /* @__PURE__ */ jsx("title", { children: title }),
          children
        ]
      }
    );
  }
);
function getSizeClassName$2(size2) {
  switch (size2) {
    case "2xs":
      return "icon-2xs";
    case "xs":
      return "icon-xs";
    case "sm":
      return "icon-sm";
    case "md":
      return "icon-md";
    case "lg":
      return "icon-lg";
    case "xl":
      return "icon-xl";
    default:
      return size2;
  }
}
function createSvgIcon(path, displayName = "", viewBox) {
  const Component = (props, ref) => /* @__PURE__ */ jsx(
    SvgIcon,
    {
      "data-testid": `${displayName}Icon`,
      ref,
      viewBox,
      ...props,
      size: props.size || "md",
      children: path
    }
  );
  if (process.env.NODE_ENV !== "production") {
    Component.displayName = `${displayName}Icon`;
  }
  return React.memo(React.forwardRef(Component));
}
function createSvgIconFromTree(data, displayName = "") {
  const path = treeToElement(data);
  return createSvgIcon(path, displayName);
}
function treeToElement(tree) {
  return (tree == null ? void 0 : tree.map) && tree.map((node, i) => {
    return React.createElement(
      node.tag,
      { key: i, ...node.attr },
      treeToElement(node.child)
    );
  });
}
function elementToTree(el) {
  const attributes = {};
  const tree = { tag: el.tagName, attr: attributes };
  Array.from(el.attributes).forEach((attribute) => {
    attributes[attribute.name] = attribute.value;
  });
  if (el.children.length) {
    tree.child = Array.from(el.children).map(
      (child) => elementToTree(child)
    );
  }
  return tree;
}
const GroupAddIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M22 9V7h-2v2h-2v2h2v2h2v-2h2V9zM8 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5H2v-.99C2.2 16.29 5.3 15 8 15s5.8 1.29 6 2v1zM12.51 4.05C13.43 5.11 14 6.49 14 8s-.57 2.89-1.49 3.95C14.47 11.7 16 10.04 16 8s-1.53-3.7-3.49-3.95zm4.02 9.78C17.42 14.66 18 15.7 18 17v3h2v-3c0-1.45-1.59-2.51-3.47-3.17z" }),
  "GroupAddOutlined"
);
const PeopleIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5zM4.34 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25H4.34zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44zM15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35z" }),
  "PeopleOutlined"
);
const FileDownloadDoneIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M20.13 5.41 18.72 4l-9.19 9.19-4.25-4.24-1.41 1.41 5.66 5.66zM5 18h14v2H5z" }),
  "FileDownloadDoneOutlined"
);
function getAssetUrl(url) {
  if (isAbsoluteUrl(url)) {
    return url;
  }
  const assetUrl = getBootstrapData().settings.asset_url || getBootstrapData().settings.base_url;
  url = url.replace(/^\/+/g, "");
  if (url.startsWith("assets/")) {
    return `${assetUrl}/build/${url}`;
  }
  return `${assetUrl}/${url}`;
}
const SvgImage = memo(({ src, className, height = "h-full" }) => {
  const { data: svgString } = useSvgImageContent(src);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        "svg-image-container inline-block bg-no-repeat",
        height,
        className
      ),
      dangerouslySetInnerHTML: svgString
    }
  );
});
function useSvgImageContent(src) {
  return useQuery({
    queryKey: ["svgImage", getAssetUrl(src)],
    queryFn: () => fetchSvgImageContent(src),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: !!src
  });
}
function fetchSvgImageContent(src) {
  return axios.get(src, {
    responseType: "text"
  }).then((response) => {
    return { __html: response.data };
  });
}
const MixedImage = memo(({ src, className, ...domProps }) => {
  let type = null;
  if (!src) {
    type = null;
  } else if (typeof src === "object") {
    type = "icon";
  } else if (src.endsWith(".svg") && !isAbsoluteUrl(src)) {
    type = "svg";
  } else {
    type = "image";
  }
  if (type === "svg") {
    return /* @__PURE__ */ jsx(
      SvgImage,
      {
        ...domProps,
        className,
        src,
        height: false
      }
    );
  }
  if (type === "image") {
    return /* @__PURE__ */ jsx("img", { ...domProps, className, src, alt: "" });
  }
  if (type === "icon") {
    const Icon = src;
    return /* @__PURE__ */ jsx(
      Icon,
      {
        ...domProps,
        className
      }
    );
  }
  return null;
});
function getButtonSizeStyle(size2, { padding, equalWidth, variant } = {}) {
  switch (size2) {
    case "2xs":
      if (variant === "link")
        return "text-xs";
      return `text-xs h-24 ${equalWidth ? "w-24" : padding || "px-10"}`;
    case "xs":
      if (variant === "link")
        return "text-xs";
      return `text-xs h-30 ${equalWidth ? "w-30" : padding || "px-14"}`;
    case "sm":
      if (variant === "link")
        return "text-sm";
      return `text-sm h-36 ${equalWidth ? "w-36" : padding || "px-18"}`;
    case "md":
      if (variant === "link")
        return "text-base";
      return `text-base h-42 ${equalWidth ? "w-42" : padding || "px-22"}`;
    case "lg":
      if (variant === "link")
        return "text-lg";
      return `text-base h-50 ${equalWidth ? "w-50" : padding || "px-26"}`;
    case "xl":
      if (variant === "link")
        return "text-xl";
      return `text-lg h-60 ${equalWidth ? "w-60" : padding || "px-32"}`;
    default:
      return size2 || "";
  }
}
function getSharedButtonStyle(props) {
  const {
    variant,
    shadow,
    whitespace = "whitespace-nowrap",
    display = "inline-flex"
  } = props;
  const variantProps = { ...props, border: props.border || "border" };
  let style = [];
  if (variant === "outline") {
    style = outline(variantProps);
  } else if (variant === "text") {
    style = text(variantProps);
  } else if (variant === "flat" || variant === "raised") {
    style = contained(variantProps);
  } else if (variant === "link") {
    style = link(variantProps);
  }
  return [
    ...style,
    shadow || variant === "raised" && "shadow-md",
    whitespace,
    display,
    variant && "align-middle flex-shrink-0 items-center transition-button duration-200",
    "select-none appearance-none no-underline outline-none disabled:pointer-events-none disabled:cursor-default"
  ];
}
function outline({ color, border }) {
  const disabled = "disabled:text-disabled disabled:bg-transparent disabled:border-disabled-bg";
  switch (color) {
    case "primary":
      return [
        `text-black bg-primary ${border} border-primary/50`,
        "hover:bg-primary-dark hover:border-primary",
        disabled
      ];
    case "danger":
      return [
        `text-danger bg-transparent ${border} border-danger/50`,
        "hover:bg-danger/4 hover:border-danger",
        disabled
      ];
    case "positive":
      return [
        `text-positive bg-transparent ${border} border-positive/50`,
        "hover:bg-positive/4 hover:border-positive",
        disabled
      ];
    case "paper":
      return [`text bg-background ${border}`, "hover:bg-hover", disabled];
    case "white":
      return [
        "text-white bg-transparent border border-white",
        "hover:bg-white/20",
        "disabled:text-white/70 disabled:border-white/70 disabled:bg-transparent"
      ];
    default:
      return [`bg-transparent ${border}`, "hover:bg-hover", disabled];
  }
}
function text({ color }) {
  const disabled = "disabled:text-disabled disabled:bg-transparent";
  switch (color) {
    case "primary":
      return [
        "text-primary bg-transparent border-transparent",
        "hover:bg-primary/4",
        disabled
      ];
    case "danger":
      return [
        "text-danger bg-transparent border-transparent",
        "hover:bg-danger/4",
        disabled
      ];
    case "positive":
      return [
        "text-positive bg-transparent border-transparent",
        "hover:bg-positive/4",
        disabled
      ];
    case "white":
      return [
        "text-white bg-transparent border-transparent",
        "hover:bg-white/20",
        "disabled:text-white/70 disabled:bg-transparent"
      ];
    default:
      return ["bg-transparent border-transparent", "hover:bg-hover", disabled];
  }
}
function link({ color }) {
  switch (color) {
    case "primary":
      return ["text-primary", "hover:underline", "disabled:text-disabled"];
    case "danger":
      return ["text-danger", "hover:underline", "disabled:text-disabled"];
    default:
      return ["text-main", "hover:underline", "disabled:text-disabled"];
  }
}
function contained({ color, border }) {
  const disabled = "disabled:text-disabled disabled:bg-disabled disabled:border-transparent disabled:shadow-none";
  switch (color) {
    case "primary":
      return [
        `text-black bg-primary ${border} border-primary`,
        "hover:bg-primary-dark hover:border-primary-dark",
        disabled
      ];
    case "danger":
      return [
        `text-white bg-danger ${border} border-danger`,
        "hover:bg-danger/90 hover:border-danger/90",
        disabled
      ];
    case "chip":
      return [
        `text-main bg-chip ${border} border-chip`,
        "hover:bg-chip/90 hover:border-chip/90",
        disabled
      ];
    case "paper":
      return [
        `text-main bg-background ${border} border-paper`,
        "hover:bg-background/90 hover:border-paper/90",
        disabled
      ];
    case "white":
      return [
        `text-black bg-white ${border} border-white`,
        "hover:bg-white",
        disabled
      ];
    default:
      return [`bg ${border} border-background`, "hover:bg-hover", disabled];
  }
}
function createEventHandler(handler) {
  if (!handler)
    return handler;
  return (e) => {
    if (e.currentTarget.contains(e.target)) {
      handler(e);
    }
  };
}
const ButtonBase = forwardRef((props, ref) => {
  const {
    children,
    color = null,
    variant,
    radius,
    shadow,
    whitespace,
    justify = "justify-center",
    className,
    href,
    form,
    border,
    elementType,
    to,
    relative,
    replace,
    end,
    display,
    type = "button",
    onClick,
    onPointerDown,
    onPointerUp,
    onKeyDown,
    ...domProps
  } = props;
  const Element = elementType || (href ? "a" : "button");
  const isLink = Element === "a";
  return /* @__PURE__ */ jsx(
    Element,
    {
      ref,
      form: isLink ? void 0 : form,
      href,
      to,
      relative,
      type: isLink ? void 0 : type,
      replace,
      end,
      onPointerDown: createEventHandler(onPointerDown),
      onPointerUp: createEventHandler(onPointerUp),
      onClick: createEventHandler(onClick),
      onKeyDown: createEventHandler(onKeyDown),
      className: clsx(
        "focus-visible:ring",
        getSharedButtonStyle({ variant, color, border, whitespace, display }),
        radius,
        justify,
        className
      ),
      ...domProps,
      children
    }
  );
});
const Button = React.forwardRef(
  ({
    children,
    startIcon,
    endIcon,
    size: size2 = "sm",
    sizeClassName,
    className,
    equalWidth = false,
    radius = "rounded-button",
    variant = "text",
    disabled,
    elementType,
    to,
    href,
    download,
    ...other
  }, ref) => {
    const mergedClassName = clsx(
      "font-semibold",
      sizeClassName || getButtonSizeStyle(size2, { equalWidth, variant }),
      className
    );
    return /* @__PURE__ */ jsxs(
      ButtonBase,
      {
        className: mergedClassName,
        ref,
        radius,
        variant,
        disabled,
        to: disabled ? void 0 : to,
        href: disabled ? void 0 : href,
        download: disabled ? void 0 : download,
        elementType: disabled ? void 0 : elementType,
        ...other,
        children: [
          startIcon && /* @__PURE__ */ jsx(InlineIcon, { position: "start", icon: startIcon, size: size2 }),
          children,
          endIcon && /* @__PURE__ */ jsx(InlineIcon, { position: "end", icon: endIcon, size: size2 })
        ]
      }
    );
  }
);
function InlineIcon({ icon, position, size: size2 }) {
  const className = clsx(
    "m-auto",
    {
      "-ml-4 mr-8": position === "start",
      "-mr-4 ml-8": position === "end"
    },
    icon.props.className
  );
  return React.cloneElement(icon, { className, size: size2 });
}
function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }
  if (!objA || !objB) {
    return false;
  }
  const aKeys = Object.keys(objA);
  const bKeys = Object.keys(objB);
  const len = aKeys.length;
  if (bKeys.length !== len) {
    return false;
  }
  for (let i = 0; i < len; i++) {
    const key = aKeys[i];
    if (objA[key] !== objB[key] || !Object.prototype.hasOwnProperty.call(objB, key)) {
      return false;
    }
  }
  return true;
}
const BoostrapDataContext = createContext(
  null
);
function useBootstrapData() {
  return useContext(BoostrapDataContext);
}
function useSelectedLocale() {
  const {
    data: { i18n }
  } = useBootstrapData();
  return {
    locale: i18n,
    localeCode: (i18n == null ? void 0 : i18n.language) || "en",
    lines: i18n == null ? void 0 : i18n.lines
  };
}
function useUserTimezone() {
  const {
    data: { user, settings }
  } = useContext(BoostrapDataContext);
  const defaultTimezone = settings.dates.default_timezone;
  const preferredTimezone = (user == null ? void 0 : user.timezone) || defaultTimezone || "auto";
  return useMemo(() => {
    return !preferredTimezone || preferredTimezone === "auto" ? getLocalTimeZone() : preferredTimezone;
  }, [preferredTimezone]);
}
function handlePluralMessage(localeCode, { message: message2, values }) {
  const match2 = message2.match(/\[(.+?)]/);
  const count = values == null ? void 0 : values.count;
  if (match2 && match2[1] && !Number.isNaN(count)) {
    const [pluralPlaceholder, pluralConfig] = match2;
    const choices = pluralConfig.split("|");
    if (!choices.length)
      return message2;
    const rules = getRules(localeCode);
    const choiceName = rules.select(count);
    let choiceConfig = choices.find((c) => {
      return c.startsWith(choiceName);
    });
    if (!choiceConfig) {
      choiceConfig = choices[0];
    }
    const choice = choiceConfig.substring(choiceConfig.indexOf(" ") + 1);
    return message2.replace(pluralPlaceholder, choice);
  }
  return message2;
}
const getRules = memoize((localeCode) => {
  return new Intl.PluralRules(localeCode);
});
const Trans = memo((props) => {
  const { message: initialMessage, values } = props;
  const { lines, localeCode } = useSelectedLocale();
  let translatedMessage;
  if (Object == null ? void 0 : Object.hasOwn(lines || {}, initialMessage)) {
    translatedMessage = lines == null ? void 0 : lines[initialMessage];
  } else if (Object == null ? void 0 : Object.hasOwn(lines || {}, initialMessage == null ? void 0 : initialMessage.toLowerCase())) {
    translatedMessage = lines == null ? void 0 : lines[initialMessage.toLowerCase()];
  } else {
    translatedMessage = initialMessage;
  }
  if (!values || !translatedMessage) {
    return /* @__PURE__ */ jsx(Fragment, { children: translatedMessage });
  }
  translatedMessage = handlePluralMessage(localeCode, {
    message: translatedMessage,
    values
  });
  const nodePlaceholders = [];
  const tagNames = [];
  Object.entries(values).forEach(([key, value]) => {
    if (typeof value === "function") {
      tagNames.push(key);
    } else if (isValidElement(value)) {
      nodePlaceholders.push(key);
    } else if (value != void 0) {
      translatedMessage = translatedMessage == null ? void 0 : translatedMessage.replace(`:${key}`, `${value}`);
    }
  });
  if (tagNames.length || nodePlaceholders.length) {
    const regexArray = [];
    if (tagNames.length) {
      const tagNameMatchers = tagNames.join("");
      regexArray.push(`(<[${tagNameMatchers}]>.+?<\\/[${tagNameMatchers}]>)`);
    }
    if (nodePlaceholders.length) {
      const nodePlaceholderMatchers = nodePlaceholders.join("|");
      regexArray.push(`(:(?:${nodePlaceholderMatchers}))`);
    }
    const regex = new RegExp(regexArray.join("|"), "gm");
    const parts = translatedMessage.split(regex);
    const compiledMessage = parts.filter(Boolean).map((part, i) => {
      if (part.startsWith("<") && part.endsWith(">")) {
        const matches = part.match(/<([a-z]+)>(.+?)<\/([a-z]+)>/);
        if (matches) {
          const [, tagName, content] = matches;
          const renderFn = values == null ? void 0 : values[tagName];
          if (typeof renderFn === "function") {
            const node = renderFn(content);
            return cloneElement(node, { key: i });
          }
        }
      }
      if (part.startsWith(":")) {
        const key = part.replace(":", "");
        const node = values == null ? void 0 : values[key];
        if (isValidElement(node)) {
          return cloneElement(node, { key: i });
        }
      }
      return part;
    });
    return /* @__PURE__ */ jsx(Fragment, { children: compiledMessage });
  }
  return /* @__PURE__ */ jsx(Fragment, { children: translatedMessage });
}, areEqual);
function areEqual(prevProps, nextProps) {
  const { values, ...otherProps } = prevProps;
  const { values: nextValues, ...nextOtherProps } = nextProps;
  return shallowEqual(nextValues, values) && shallowEqual(otherProps, nextOtherProps);
}
const DIVISIONS = [
  { amount: 60, name: "seconds" },
  { amount: 60, name: "minutes" },
  { amount: 24, name: "hours" },
  { amount: 7, name: "days" },
  { amount: 4.34524, name: "weeks" },
  { amount: 12, name: "months" },
  { amount: Number.POSITIVE_INFINITY, name: "years" }
];
const FormattedRelativeTime = memo(
  ({ date, style }) => {
    const { localeCode } = useSelectedLocale();
    const timezone = useUserTimezone();
    const formatter = useMemo(
      () => new Intl.RelativeTimeFormat(localeCode, {
        numeric: "auto",
        style
      }),
      [localeCode, style]
    );
    if (!date) {
      return null;
    }
    try {
      if (typeof date === "string") {
        date = parseAbsoluteToLocal(date).toDate();
      } else if ("toDate" in date) {
        date = date.toDate(timezone);
      }
    } catch (e) {
      return null;
    }
    let duration = (date.getTime() - Date.now()) / 1e3;
    for (let i = 0; i <= DIVISIONS.length; i++) {
      const division = DIVISIONS[i];
      if (Math.abs(duration) < division.amount) {
        if (division.name === "seconds") {
          return /* @__PURE__ */ jsx(Trans, { message: "a few seconds ago" });
        }
        return /* @__PURE__ */ jsx(Fragment, { children: formatter.format(Math.round(duration), division.name) });
      }
      duration /= division.amount;
    }
    return /* @__PURE__ */ jsx(Fragment, { children: formatter.format(Math.round(duration), "day") });
  },
  shallowEqual
);
function Line({ notification, line, index, iconRenderer }) {
  var _a2, _b2;
  const isPrimary = line.type === "primary" || index === 0;
  const Icon = iconRenderer || DefaultIconRenderer;
  const Element = line.action ? "a" : "div";
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsxs(
      Element,
      {
        className: clsx(
          "flex items-center gap-8",
          line.action && "hover:underline",
          isPrimary ? "text-sm mnarktext-main whitespace-nowrap" : "text-xs text-muted mt-6"
        ),
        href: (_a2 = line.action) == null ? void 0 : _a2.action,
        title: (_b2 = line.action) == null ? void 0 : _b2.label,
        children: [
          line.icon && /* @__PURE__ */ jsx(Icon, { icon: line.icon }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "overflow-hidden text-ellipsis",
              dangerouslySetInnerHTML: { __html: line.content }
            }
          )
        ]
      },
      index
    ),
    index === 0 && /* @__PURE__ */ jsx("time", { className: "text-xs text-muted", children: /* @__PURE__ */ jsx(FormattedRelativeTime, { date: notification.created_at }) })
  ] });
}
function DefaultIconRenderer({ icon }) {
  return /* @__PURE__ */ jsx(MixedImage, { src: icon });
}
const Endpoint = "notifications";
function useUserNotifications(payload) {
  return useQuery({
    queryKey: useUserNotifications.key,
    queryFn: () => fetchUserNotifications(payload)
  });
}
function fetchUserNotifications(payload) {
  return apiClient.get(Endpoint, { params: payload }).then((response) => response.data);
}
useUserNotifications.key = [Endpoint];
class ToastTimer {
  constructor(callback, remaining) {
    __publicField(this, "timerId");
    __publicField(this, "createdAt", 0);
    this.callback = callback;
    this.remaining = remaining;
    this.resume();
  }
  pause() {
    clearTimeout(this.timerId);
    this.remaining -= Date.now() - this.createdAt;
  }
  resume() {
    this.createdAt = Date.now();
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.timerId = setTimeout(this.callback, this.remaining);
  }
  clear() {
    clearTimeout(this.timerId);
  }
}
const maximumVisible = 1;
function getDefaultDuration(type) {
  switch (type) {
    case "danger":
      return 8e3;
    case "loading":
      return 0;
    default:
      return 3e3;
  }
}
const useToastStore = create()(
  immer((set, get) => ({
    toasts: [],
    add: (message2, opts) => {
      const amountToRemove = get().toasts.length + 1 - maximumVisible;
      if (amountToRemove > 0) {
        set((state) => {
          state.toasts.splice(0, amountToRemove);
        });
      }
      const toastId = (opts == null ? void 0 : opts.id) || nanoid(6);
      const toastType = (opts == null ? void 0 : opts.type) || "positive";
      const duration = (opts == null ? void 0 : opts.duration) ?? getDefaultDuration(toastType);
      const toast2 = {
        timer: duration > 0 ? new ToastTimer(() => get().remove(toastId), duration) : null,
        message: message2,
        ...opts,
        id: toastId,
        type: toastType,
        position: (opts == null ? void 0 : opts.position) || "bottom-center",
        duration,
        disableExitAnimation: opts == null ? void 0 : opts.disableExitAnimation,
        disableEnterAnimation: opts == null ? void 0 : opts.disableEnterAnimation
      };
      const toastIndex = get().toasts.findIndex((t) => t.id === toast2.id);
      if (toastIndex > -1) {
        set((state) => {
          state.toasts[toastIndex] = toast2;
        });
      } else {
        set((state) => {
          state.toasts.push(toast2);
        });
      }
    },
    remove: (toastId) => {
      const newToasts = get().toasts.filter((toast2) => {
        var _a2;
        if (toastId === toast2.id) {
          (_a2 = toast2.timer) == null ? void 0 : _a2.clear();
          return false;
        }
        return true;
      });
      set((state) => {
        state.toasts = newToasts;
      });
    }
  }))
);
function toastState() {
  return useToastStore.getState();
}
function toast(message2, opts) {
  toastState().add(message2, opts);
}
toast.danger = (message2, opts) => {
  toastState().add(message2, { ...opts, type: "danger" });
};
toast.positive = (message2, opts) => {
  toastState().add(message2, { ...opts, type: "positive" });
};
toast.loading = (message2, opts) => {
  toastState().add(message2, { ...opts, type: "loading" });
};
function getAxiosErrorMessage(err, field) {
  var _a2;
  if (axios.isAxiosError(err) && err.response) {
    const response = err.response.data;
    if (field != null) {
      const fieldMessage = (_a2 = response.errors) == null ? void 0 : _a2[field];
      return Array.isArray(fieldMessage) ? fieldMessage[0] : fieldMessage;
    }
    return response == null ? void 0 : response.message;
  }
}
const defaultErrorMessage = message("There was an issue. Please try again.");
function showHttpErrorToast(err, defaultMessage = defaultErrorMessage, field, toastOptions) {
  var _a2, _b2;
  toast.danger(getAxiosErrorMessage(err, field) || defaultMessage, {
    action: (_b2 = (_a2 = err.response) == null ? void 0 : _a2.data) == null ? void 0 : _b2.action,
    ...toastOptions
  });
}
function useMarkNotificationsAsRead() {
  const { data, mergeBootstrapData: mergeBootstrapData2 } = useBootstrapData();
  return useMutation({
    mutationFn: (props) => UseMarkNotificationsAsRead(props),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: useUserNotifications.key });
      if (response.unreadCount === 0) {
        mergeBootstrapData2({
          user: { ...data.user, unread_notifications_count: 0 }
        });
      }
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function UseMarkNotificationsAsRead(payload) {
  return apiClient.post("notifications/mark-as-read", payload).then((r) => r.data);
}
function useNavigate() {
  const routerNavigate = useNavigate$1();
  const location = useLocation();
  return useCallback(
    (to, options) => {
      const replace = createPath(location) === createPath(resolvePath(to, location.pathname));
      routerNavigate(to, {
        ...options,
        replace: (options == null ? void 0 : options.replace) !== false && replace
      });
    },
    [routerNavigate, location]
  );
}
function useSettings() {
  const {
    data: { settings }
  } = useBootstrapData();
  return settings;
}
const iconMap = {
  "group-add": GroupAddIcon,
  people: PeopleIcon,
  "export-csv": FileDownloadDoneIcon
};
function NotificationList({
  notifications,
  className
}) {
  const { notifications: config } = useContext(SiteConfigContext);
  return /* @__PURE__ */ jsx("div", { className, children: notifications.map((notification, index) => {
    var _a2;
    const isLast = notifications.length - 1 === index;
    const Renderer = ((_a2 = config == null ? void 0 : config.renderMap) == null ? void 0 : _a2[notification.type]) || NotificationListItem;
    return /* @__PURE__ */ jsx(
      Renderer,
      {
        notification,
        isLast
      },
      notification.id
    );
  }) });
}
function NotificationListItem({
  notification,
  onActionButtonClick,
  lineIconRenderer,
  isLast
}) {
  const markAsRead = useMarkNotificationsAsRead();
  const navigate = useNavigate();
  const mainAction = notification.data.mainAction;
  const showUnreadIndicator = !notification.data.image && !notification.read_at;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onClick: () => {
        var _a2;
        if (!markAsRead.isPending && !notification.read_at) {
          markAsRead.mutate({ ids: [notification.id] });
        }
        if (mainAction == null ? void 0 : mainAction.action) {
          if (isAbsoluteUrl(mainAction.action)) {
            (_a2 = window.open(mainAction.action, "_blank")) == null ? void 0 : _a2.focus();
          } else {
            navigate(mainAction.action);
          }
        }
      },
      className: clsx(
        "flex items-start gap-14 px-32 py-20 bg-alt relative",
        !isLast && "border-b",
        (mainAction == null ? void 0 : mainAction.action) && "cursor-pointer",
        !notification.read_at ? "bg-background hover:bg-primary/10" : "hover:bg-hover"
      ),
      title: (mainAction == null ? void 0 : mainAction.label) ? mainAction.label : void 0,
      children: [
        showUnreadIndicator && /* @__PURE__ */ jsx("div", { className: "absolute left-16 top-26 w-8 h-8 shadow rounded-full bg-primary flex-shrink-0" }),
        notification.data.image && /* @__PURE__ */ jsx(
          MixedImage,
          {
            className: "w-24 h-24 flex-shrink-0 text-muted",
            src: iconMap[notification.data.image] || notification.data.image
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          notification.data.lines.map((line, index) => /* @__PURE__ */ jsx(
            Line,
            {
              iconRenderer: lineIconRenderer,
              notification,
              line,
              index
            },
            index
          )),
          /* @__PURE__ */ jsx(
            ButtonActions,
            {
              onActionClick: onActionButtonClick,
              notification
            }
          )
        ] })
      ]
    }
  );
}
function ButtonActions({ notification, onActionClick }) {
  const { base_url } = useSettings();
  if (!notification.data.buttonActions)
    return null;
  return /* @__PURE__ */ jsx("div", { className: "mt-12 flex items-center gap-12", children: notification.data.buttonActions.map((action, index) => /* @__PURE__ */ jsx(
    Button,
    {
      size: "xs",
      variant: index === 0 ? "flat" : "outline",
      color: index === 0 ? "primary" : null,
      elementType: !onActionClick ? Link : void 0,
      to: !onActionClick ? action.action.replace(base_url, "") : void 0,
      onClick: (e) => {
        onActionClick == null ? void 0 : onActionClick(e, action);
      },
      children: action.label
    },
    index
  )) });
}
const WorkspaceQueryKeys = {
  fetchUserWorkspaces: ["user-workspaces"],
  workspaceWithMembers: (id) => ["workspace-with-members", id]
};
const PersonalWorkspace = {
  name: "Default",
  default: true,
  id: 0,
  members_count: 1
};
function isSsr() {
  return true;
}
const listenForCookieChange = (name, callback) => {
  return () => {
  };
};
function getCookie(name, initialValue = "") {
  return initialValue;
}
function useCookie(key, initialValue) {
  const [item, setItem] = useState(() => {
    return getCookie(key, initialValue);
  });
  useEffect(() => {
    return listenForCookieChange();
  }, [key]);
  const updateItem = useCallback(
    (value, options) => {
      setItem(value);
    },
    [key]
  );
  return [item, updateItem];
}
const ActiveWorkspaceIdContext = React.createContext({
  // set default as null, so it's not sent via query params in admin and
  // other places if component is not wrapped in workspace context explicitly
  workspaceId: null,
  setWorkspaceId: () => {
  }
});
function useActiveWorkspaceId() {
  return useContext(ActiveWorkspaceIdContext);
}
function ActiveWorkspaceProvider({
  children
}) {
  const [workspaceId, setCookieId] = useCookie(
    "activeWorkspaceId",
    `${PersonalWorkspace.id}`
  );
  useEffect(() => {
    setActiveWorkspaceId(parseInt(workspaceId));
    return () => {
      setActiveWorkspaceId(0);
    };
  }, [workspaceId]);
  const contextValue = useMemo(() => {
    return {
      workspaceId: parseInt(workspaceId),
      setWorkspaceId: (id) => {
        setCookieId(`${id}`);
      }
    };
  }, [workspaceId, setCookieId]);
  return /* @__PURE__ */ jsx(ActiveWorkspaceIdContext.Provider, { value: contextValue, children });
}
function useJoinWorkspace() {
  const { setWorkspaceId } = useActiveWorkspaceId() || {};
  return useMutation({
    mutationFn: (props) => joinWorkspace(props),
    onSuccess: (response) => {
      toast(message("Joined workspace"));
      setWorkspaceId(response.workspace.id);
      queryClient.invalidateQueries({
        queryKey: WorkspaceQueryKeys.fetchUserWorkspaces
      });
      queryClient.invalidateQueries({ queryKey: useUserNotifications.key });
    },
    onError: (e) => {
      if (axios.isAxiosError(e) && e.response && e.response.status === 404) {
        queryClient.invalidateQueries({ queryKey: useUserNotifications.key });
        toast.danger(message("This invite is no longer valid"));
      } else {
        showHttpErrorToast(e);
      }
    }
  });
}
function joinWorkspace({ inviteId }) {
  return apiClient.get(`workspace/join/${inviteId}`).then((r) => r.data);
}
function deleteInvite({ inviteId }) {
  return apiClient.delete(`workspace/invite/${inviteId}`).then((r) => r.data);
}
function useDeleteInvite() {
  return useMutation({
    mutationFn: (props) => deleteInvite(props),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: useUserNotifications.key });
      toast(message("Declined workspace invitation"));
    },
    onError: (e) => {
      if (axios.isAxiosError(e) && e.response && e.response.status === 404) {
        queryClient.invalidateQueries({ queryKey: useUserNotifications.key });
        toast.danger(message("This invite is no longer valid"));
      } else {
        showHttpErrorToast(e);
      }
    }
  });
}
const DialogContext = React.createContext(null);
function useDialogContext() {
  return useContext(DialogContext);
}
function WorkspaceInviteNotificationRenderer(props) {
  const { notification } = props;
  const joinWorkspace2 = useJoinWorkspace();
  const deleteInvite2 = useDeleteInvite();
  const dialogContextValue = useDialogContext();
  return /* @__PURE__ */ jsx(
    NotificationListItem,
    {
      ...props,
      onActionButtonClick: (e, { action }) => {
        const data = notification.data;
        if (action === "join") {
          joinWorkspace2.mutate({
            inviteId: data.inviteId
          });
        }
        if (action === "decline") {
          deleteInvite2.mutate({
            inviteId: data.inviteId
          });
        }
        dialogContextValue == null ? void 0 : dialogContextValue.close();
      }
    }
  );
}
const workspaceInviteNotif = "Common\\Workspaces\\Notifications\\WorkspaceInvitation";
const BaseSiteConfig = {
  auth: {
    redirectUri: "/",
    adminRedirectUri: "/admin"
  },
  tags: {
    types: [{ name: "custom" }]
  },
  customPages: {
    types: [{ type: "default", label: message("Default") }]
  },
  notifications: {
    renderMap: {
      [workspaceInviteNotif]: WorkspaceInviteNotificationRenderer
    }
  },
  admin: {
    ads: []
  },
  demo: {
    loginPageDefaults: "singleAccount"
  },
  homepage: {
    options: [
      { label: message("Login page"), value: "loginPage" },
      { label: message("Registration page"), value: "registerPage" }
    ]
  }
};
let rootEl = typeof document !== "undefined" ? document.getElementById("root") ?? document.body : void 0;
let themeEl = typeof document !== "undefined" ? document.documentElement : void 0;
function setThemeValue(key, value) {
  themeEl == null ? void 0 : themeEl.style.setProperty(key, value);
}
function removeThemeValue(key) {
  themeEl == null ? void 0 : themeEl.style.removeProperty(key);
}
function applyThemeToDom(theme) {
  Object.entries(theme.values).forEach(([key, value]) => {
    setThemeValue(key, value);
  });
  if (theme.is_dark) {
    themeEl.classList.add("dark");
  } else {
    themeEl.classList.remove("dark");
  }
}
const ThemeSelectorContext = createContext(
  null
);
function useThemeSelector() {
  return useContext(ThemeSelectorContext);
}
const STORAGE_KEY = "be-active-theme";
function ThemeProvider({ children }) {
  const { themes } = useSettings();
  const canChangeTheme = themes == null ? void 0 : themes.user_change;
  const { data } = useBootstrapData();
  const allThemes = useMemo(() => data.themes.all || [], [data.themes.all]);
  const initialThemeId = data.themes.selectedThemeId || void 0;
  const [selectedThemeId, setSelectedThemeId] = useCookie(
    STORAGE_KEY,
    `${initialThemeId}`
  );
  let selectedTheme = canChangeTheme ? allThemes.find((t) => t.id == selectedThemeId) : allThemes.find((t) => t.id == (themes == null ? void 0 : themes.default_id));
  if (!selectedTheme) {
    selectedTheme = allThemes[0];
  }
  const contextValue = useMemo(() => {
    return {
      allThemes,
      selectedTheme,
      selectTheme: (id) => {
        if (!canChangeTheme)
          return;
        const theme = findTheme(allThemes, id);
        if (theme) {
          setSelectedThemeId(`${theme.id}`);
          applyThemeToDom(theme);
        }
      }
    };
  }, [allThemes, selectedTheme, setSelectedThemeId, canChangeTheme]);
  return /* @__PURE__ */ jsx(ThemeSelectorContext.Provider, { value: contextValue, children });
}
function findTheme(themes, id) {
  return themes.find((t) => {
    if (id === "light") {
      return t.default_light === true;
    }
    if (id === "dark") {
      return t.default_dark === true;
    }
    return t.id === id;
  });
}
function BootstrapDataProvider({ children }) {
  const { data } = useBackendBootstrapData();
  const value = useMemo(() => {
    return {
      data,
      setBootstrapData,
      mergeBootstrapData,
      invalidateBootstrapData
    };
  }, [data]);
  return /* @__PURE__ */ jsx(BoostrapDataContext.Provider, { value, children });
}
const mergedConfig = deepMerge(BaseSiteConfig, SiteConfig);
function CommonProvider({ children }) {
  return /* @__PURE__ */ jsx(StrictMode, { children: /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(LazyMotion, { features: domAnimation, children: /* @__PURE__ */ jsx(SiteConfigContext.Provider, { value: mergedConfig, children: /* @__PURE__ */ jsx(BootstrapDataProvider, { children: /* @__PURE__ */ jsx(ThemeProvider, { children }) }) }) }) }) });
}
function useAppearanceEditorMode() {
  return {
    isAppearanceEditorActive: !isSsr()
  };
}
function getFromLocalStorage(key, initialValue = null) {
  if (typeof window === "undefined") {
    return initialValue;
  }
  try {
    const item = window.localStorage.getItem(key);
    return item != null ? JSON.parse(item) : initialValue;
  } catch (error) {
    return initialValue;
  }
}
function setInLocalStorage(key, value) {
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
  }
}
function removeFromLocalStorage(key) {
  try {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key);
    }
  } catch (error) {
  }
}
function useAuth() {
  var _a2;
  const {
    data: { user, guest_role }
  } = useBootstrapData();
  const {
    auth: { redirectUri = "/" }
  } = useContext(SiteConfigContext);
  const getPermission = useCallback(
    (name) => {
      const permissions = (user == null ? void 0 : user.permissions) || (guest_role == null ? void 0 : guest_role.permissions);
      if (!permissions)
        return;
      return permissions.find((p) => p.name === name);
    },
    [user == null ? void 0 : user.permissions, guest_role == null ? void 0 : guest_role.permissions]
  );
  const getRestrictionValue = useCallback(
    (permissionName, restrictionName) => {
      const permission = getPermission(permissionName);
      let restrictionValue = null;
      if (permission) {
        const restriction = permission.restrictions.find(
          (r) => r.name === restrictionName
        );
        restrictionValue = restriction ? restriction.value : void 0;
      }
      return restrictionValue;
    },
    [getPermission]
  );
  const hasPermission = useCallback(
    (name) => {
      const permissions = (user == null ? void 0 : user.permissions) || (guest_role == null ? void 0 : guest_role.permissions);
      const isAdmin = (permissions == null ? void 0 : permissions.find((p) => p.name === "admin")) != null;
      return isAdmin || getPermission(name) != null;
    },
    [user == null ? void 0 : user.permissions, guest_role == null ? void 0 : guest_role.permissions, getPermission]
  );
  const checkOverQuotaOrNoPermission = useCallback(
    (permission, restrictionName, currentCount) => {
      const noPermission = !hasPermission(permission);
      const maxCount = getRestrictionValue(permission, restrictionName);
      const overQuota = maxCount != null && currentCount >= maxCount;
      return {
        overQuota: maxCount != null && currentCount >= maxCount,
        noPermission,
        overQuotaOrNoPermission: overQuota || noPermission
      };
    },
    [getRestrictionValue, hasPermission]
  );
  const isSubscribed = ((_a2 = user == null ? void 0 : user.subscriptions) == null ? void 0 : _a2.find((sub) => sub.valid)) != null;
  const getRedirectUri = useCallback(() => {
    const onboarding = getFromLocalStorage("be.onboarding.selected");
    if (onboarding) {
      return `/checkout/${onboarding.productId}/${onboarding.priceId}`;
    }
    return redirectUri;
  }, [redirectUri]);
  const hasRole = useCallback(
    (roleId) => {
      var _a3;
      return ((_a3 = user == null ? void 0 : user.roles) == null ? void 0 : _a3.find((role) => role.id === roleId)) != null;
    },
    [user]
  );
  return {
    user,
    hasPermission,
    getPermission,
    getRestrictionValue,
    checkOverQuotaOrNoPermission,
    isLoggedIn: !!user,
    isSubscribed,
    hasRole,
    // where to redirect user after successful login
    getRedirectUri
  };
}
const IconButton = forwardRef(
  ({
    children,
    size: size2 = "md",
    // only set icon size based on button size if "ButtonSize" is passed in and not custom className
    iconSize = size2 && size2.length <= 3 ? size2 : "md",
    variant = "text",
    radius = "rounded-button",
    className,
    padding,
    equalWidth = true,
    badge,
    ...other
  }, ref) => {
    const mergedClassName = clsx(
      getButtonSizeStyle(size2, { padding, equalWidth, variant }),
      className,
      badge && "relative"
    );
    return /* @__PURE__ */ jsxs(
      ButtonBase,
      {
        ...other,
        ref,
        radius,
        variant,
        className: mergedClassName,
        children: [
          cloneElement(children, { size: iconSize }),
          badge
        ]
      }
    );
  }
);
const CloseIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" }),
  "CloseOutlined"
);
function MixedText({ value }) {
  if (!value) {
    return null;
  }
  if (typeof value === "string") {
    return /* @__PURE__ */ jsx(Fragment, { children: value });
  }
  return /* @__PURE__ */ jsx(Trans, { ...value });
}
const ErrorOutlineIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" }),
  "ErrorOutlineOutlined"
);
const CheckCircleIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z" }),
  "CheckCircleOutlined"
);
function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
function useNumberFormatter(options = {}) {
  const { localeCode } = useSelectedLocale();
  return useMemo(
    () => new NumberFormatter(localeCode, options),
    [localeCode, options]
  );
}
const ProgressCircle = React.forwardRef((props, ref) => {
  let {
    value = 0,
    minValue = 0,
    maxValue = 100,
    size: size2 = "md",
    isIndeterminate = false,
    className,
    position = "relative",
    trackColor,
    fillColor = "border-primary",
    ...domProps
  } = props;
  value = clamp(value, minValue, maxValue);
  const circleSize = getCircleStyle(size2);
  const percentage = (value - minValue) / (maxValue - minValue);
  const formatter = useNumberFormatter({ style: "percent" });
  let valueLabel = "";
  if (!isIndeterminate && !valueLabel) {
    valueLabel = formatter.format(percentage);
  }
  const subMask1Style = {};
  const subMask2Style = {};
  if (!isIndeterminate) {
    const percentage2 = (value - minValue) / (maxValue - minValue) * 100;
    let angle;
    if (percentage2 > 0 && percentage2 <= 50) {
      angle = -180 + percentage2 / 50 * 180;
      subMask1Style.transform = `rotate(${angle}deg)`;
      subMask2Style.transform = "rotate(-180deg)";
    } else if (percentage2 > 50) {
      angle = -180 + (percentage2 - 50) / 50 * 180;
      subMask1Style.transform = "rotate(0deg)";
      subMask2Style.transform = `rotate(${angle}deg)`;
    }
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ...domProps,
      "aria-valuenow": isIndeterminate ? void 0 : value,
      "aria-valuemin": minValue,
      "aria-valuemax": maxValue,
      "aria-valuetext": isIndeterminate ? void 0 : valueLabel,
      role: "progressbar",
      ref,
      className: clsx(
        "progress-circle",
        position,
        circleSize,
        isIndeterminate && "indeterminate",
        className
      ),
      children: [
        /* @__PURE__ */ jsx("div", { className: clsx(circleSize, trackColor, "rounded-full border-4") }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: clsx(
              "fills absolute left-0 top-0 h-full w-full",
              isIndeterminate && "progress-circle-fills-animate"
            ),
            children: [
              /* @__PURE__ */ jsx(
                FillMask,
                {
                  circleSize,
                  subMaskStyle: subMask1Style,
                  isIndeterminate,
                  className: "rotate-180",
                  fillColor,
                  subMaskClassName: clsx(
                    isIndeterminate && "progress-circle-fill-submask-1-animate"
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                FillMask,
                {
                  circleSize,
                  subMaskStyle: subMask2Style,
                  isIndeterminate,
                  fillColor,
                  subMaskClassName: clsx(
                    isIndeterminate && "progress-circle-fill-submask-2-animate"
                  )
                }
              )
            ]
          }
        )
      ]
    }
  );
});
function FillMask({
  subMaskStyle,
  subMaskClassName,
  className,
  circleSize,
  isIndeterminate,
  fillColor
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        "absolute h-full w-1/2 origin-[100%] overflow-hidden",
        className
      ),
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: clsx(
            "h-full w-full origin-[100%] rotate-180 overflow-hidden",
            !isIndeterminate && "transition-transform duration-100",
            subMaskClassName
          ),
          style: subMaskStyle,
          children: /* @__PURE__ */ jsx("div", { className: clsx(circleSize, fillColor, "rounded-full border-4") })
        }
      )
    }
  );
}
function getCircleStyle(size2) {
  switch (size2) {
    case "xs":
      return "w-20 h-20";
    case "sm":
      return "w-24 h-24";
    case "md":
      return "w-32 h-32";
    case "lg":
      return "w-42 h-42";
    default:
      return size2;
  }
}
const initial = { opacity: 0, y: 50, scale: 0.3 };
const animate = { opacity: 1, y: 0, scale: 1 };
const exit = {
  opacity: 0,
  scale: 0.5
};
function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  return /* @__PURE__ */ jsx("div", { className: "relative pointer-events-none", children: /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: toasts.map((toast2) => /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        "fixed mx-auto p-20 z-toast",
        toast2.position === "bottom-center" ? "left-0 right-0 bottom-0" : "right-0 bottom-0"
      ),
      children: /* @__PURE__ */ jsxs(
        m.div,
        {
          initial: toast2.disableEnterAnimation ? void 0 : initial,
          animate: toast2.disableEnterAnimation ? void 0 : animate,
          exit: toast2.disableExitAnimation ? void 0 : exit,
          className: clsx(
            "flex items-center gap-10 min-w-288 max-w-500 shadow-lg w-min rounded-lg pl-16 pr-6 py-6 text-sm pointer-events-auto max-h-100 bg-background text-main bg-background border mx-auto min-h-50"
          ),
          onPointerEnter: () => {
            var _a2;
            return (_a2 = toast2.timer) == null ? void 0 : _a2.pause();
          },
          onPointerLeave: () => {
            var _a2;
            return (_a2 = toast2.timer) == null ? void 0 : _a2.resume();
          },
          role: "alert",
          "aria-live": toast2.type === "danger" ? "assertive" : "polite",
          children: [
            toast2.type === "danger" && /* @__PURE__ */ jsx(
              ErrorOutlineIcon,
              {
                className: "text-danger flex-shrink-0",
                size: "md"
              }
            ),
            toast2.type === "loading" && /* @__PURE__ */ jsx(
              ProgressCircle,
              {
                size: "sm",
                className: "flex-shrink-0",
                isIndeterminate: true
              }
            ),
            toast2.type === "positive" && /* @__PURE__ */ jsx(
              CheckCircleIcon,
              {
                className: "text-positive flex-shrink-0",
                size: "md"
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "overflow-hidden overflow-ellipsis w-max mr-auto",
                "data-testid": "toast-message",
                children: /* @__PURE__ */ jsx(MixedText, { value: toast2.message })
              }
            ),
            toast2.action && /* @__PURE__ */ jsx(
              Button,
              {
                variant: "text",
                color: "primary",
                size: "sm",
                className: "flex-shrink-0",
                onFocus: () => {
                  var _a2;
                  return (_a2 = toast2.timer) == null ? void 0 : _a2.pause();
                },
                onBlur: () => {
                  var _a2;
                  return (_a2 = toast2.timer) == null ? void 0 : _a2.resume();
                },
                onClick: () => toastState().remove(toast2.id),
                elementType: Link,
                to: toast2.action.action,
                children: /* @__PURE__ */ jsx(MixedText, { value: toast2.action.label })
              }
            ),
            toast2.type !== "loading" && /* @__PURE__ */ jsx(
              IconButton,
              {
                onFocus: () => {
                  var _a2;
                  return (_a2 = toast2.timer) == null ? void 0 : _a2.pause();
                },
                onBlur: () => {
                  var _a2;
                  return (_a2 = toast2.timer) == null ? void 0 : _a2.resume();
                },
                type: "button",
                className: "flex-shrink-0",
                onClick: () => {
                  toastState().remove(toast2.id);
                },
                size: "sm",
                children: /* @__PURE__ */ jsx(CloseIcon, {})
              }
            )
          ]
        }
      )
    },
    toast2.id
  )) }) });
}
const queryKey = (id, params) => {
  const key = ["users", `${id}`];
  if (params) {
    key.push(params);
  }
  return key;
};
function useUser(id, params) {
  return useQuery({
    queryKey: queryKey(id, params),
    queryFn: () => fetchUser(id, params)
  });
}
function fetchUser(id, params) {
  return apiClient.get(`users/${id}`, { params }).then((response) => response.data);
}
const mailSentSvg = "/assets/mail-sent-1c55f94c.svg";
function useResendVerificationEmail() {
  return useMutation({
    mutationFn: resendEmail,
    onSuccess: () => {
      toast(message("Email sent"));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function resendEmail(payload) {
  return apiClient.post("auth/email/verification-notification", payload).then((response) => response.data);
}
function useIsDarkMode() {
  const { selectedTheme } = useThemeSelector();
  return selectedTheme.is_dark ?? false;
}
const appearanceMessage = "Can't logout while in appearance editor.";
function useLogout() {
  const navigate = useNavigate();
  const { isAppearanceEditorActive } = useAppearanceEditorMode();
  const { setBootstrapData: setBootstrapData2 } = useBootstrapData();
  return useMutation({
    mutationFn: () => isAppearanceEditorActive ? noopLogout() : logout(),
    onSuccess: (response) => {
      setBootstrapData2(response.bootstrapData);
      queryClient.clear();
      navigate("/login");
      queryClient.clear();
      setBootstrapData2(response.bootstrapData);
    },
    onError: (err) => showHttpErrorToast(
      err,
      isAppearanceEditorActive ? message(appearanceMessage) : void 0
    )
  });
}
function logout() {
  return apiClient.post("auth/logout").then((r) => r.data);
}
function noopLogout() {
  return Promise.reject(appearanceMessage);
}
function EmailVerificationPage() {
  const { data } = useUser("me");
  const resendEmail2 = useResendVerificationEmail();
  const {
    branding: { logo_light, logo_dark }
  } = useSettings();
  const isDarkMode = useIsDarkMode();
  const logoSrc = isDarkMode ? logo_light : logo_dark;
  const logout2 = useLogout();
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen w-screen flex-col items-center bg-alt p-24", children: [
    logoSrc && /* @__PURE__ */ jsx(
      "img",
      {
        src: logoSrc,
        alt: "Site logo",
        className: "my-60 block h-42 w-auto"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex max-w-580 flex-col items-center rounded border bg-background px-14 py-28 text-center shadow", children: [
      /* @__PURE__ */ jsx(SvgImage, { src: mailSentSvg, height: "h-144" }),
      /* @__PURE__ */ jsx("h1", { className: "mb-20 mt-40 text-3xl", children: /* @__PURE__ */ jsx(Trans, { message: "Verify your email" }) }),
      /* @__PURE__ */ jsx("div", { className: "mb-24 text-sm", children: /* @__PURE__ */ jsx(
        Trans,
        {
          message: "We've sent an email to “:email“ to verify your email address and activate your account. The link in the the email will expire in 24 hours.",
          values: { email: data == null ? void 0 : data.user.email }
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "text-sm", children: /* @__PURE__ */ jsx(Trans, { message: "If you did not receive an email, click the button below and we will send you another one." }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-30", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            className: "mr-10",
            variant: "flat",
            color: "primary",
            disabled: resendEmail2.isPending || !(data == null ? void 0 : data.user.email),
            onClick: () => {
              resendEmail2.mutate({ email: data.user.email });
            },
            children: /* @__PURE__ */ jsx(Trans, { message: "Resend email" })
          }
        ),
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => logout2.mutate(), children: /* @__PURE__ */ jsx(Trans, { message: "Logout" }) })
      ] })
    ] })
  ] });
}
const useDialogStore = create()(
  immer((set, get) => ({
    dialog: null,
    data: void 0,
    resolveClosePromise: null,
    openDialog: (dialog, data) => {
      return new Promise((resolve) => {
        set((state) => {
          state.dialog = dialog;
          state.data = data;
          state.resolveClosePromise = resolve;
        });
      });
    },
    closeActiveDialog: (value) => {
      var _a2, _b2;
      (_b2 = (_a2 = get()).resolveClosePromise) == null ? void 0 : _b2.call(_a2, value);
      set((state) => {
        state.dialog = null;
        state.data = void 0;
        state.resolveClosePromise = null;
      });
    }
  }))
);
const openDialog = useDialogStore.getState().openDialog;
const closeDialog = (value) => {
  useDialogStore.getState().closeActiveDialog(value);
};
function useFloatingPosition({
  floatingWidth,
  ref,
  disablePositioning = false,
  placement = "bottom",
  offset: offset$1 = 2,
  showArrow = false,
  maxHeight,
  shiftCrossAxis = true,
  fallbackPlacements
}) {
  const arrowRef = useRef(null);
  const floatingConfig = { placement, strategy: "fixed" };
  if (!disablePositioning) {
    floatingConfig.whileElementsMounted = autoUpdate;
    floatingConfig.middleware = [
      offset(offset$1),
      shift({ padding: 16, crossAxis: shiftCrossAxis, mainAxis: true }),
      flip({
        padding: 16,
        fallbackPlacements
      }),
      size({
        apply({ rects, availableHeight, availableWidth, elements }) {
          if (floatingWidth === "matchTrigger" && maxHeight != null) {
            Object.assign(elements.floating.style, {
              width: `${rects.reference.width}px`,
              maxWidth: `${availableWidth}`,
              maxHeight: `${Math.min(availableHeight, maxHeight)}px`
            });
          } else if (maxHeight != null) {
            Object.assign(elements.floating.style, {
              maxHeight: `${Math.min(availableHeight, maxHeight)}px`
            });
          }
        },
        padding: 16
      })
    ];
    if (showArrow) {
      floatingConfig.middleware.push(arrow({ element: arrowRef }));
    }
  }
  const floatingProps = useFloating(floatingConfig);
  const mergedReferenceRef = useMemo(
    () => mergeRefs([ref, floatingProps.refs.setReference]),
    [floatingProps.refs.setReference, ref]
  );
  const { x: arrowX, y: arrowY } = floatingProps.middlewareData.arrow || {};
  const staticSide = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right"
  }[floatingProps.placement.split("-")[0]];
  const arrowStyle = {
    left: arrowX,
    top: arrowY,
    right: "",
    bottom: "",
    [staticSide]: "-4px"
  };
  return {
    ...floatingProps,
    reference: mergedReferenceRef,
    arrowRef,
    arrowStyle
  };
}
function useMediaQuery(query, { noSSR } = { noSSR: true }) {
  const supportsMatchMedia = typeof window !== "undefined" && typeof window.matchMedia === "function";
  const [matches, setMatches] = useState(
    noSSR ? () => supportsMatchMedia ? window.matchMedia(query).matches : false : null
  );
  useEffect(() => {
    if (!supportsMatchMedia) {
      return;
    }
    const mq = window.matchMedia(query);
    const onChange = () => {
      setMatches(mq.matches);
    };
    mq.addEventListener("change", onChange);
    if (!noSSR) {
      onChange();
    }
    return () => {
      mq.removeEventListener("change", onChange);
    };
  }, [supportsMatchMedia, query, noSSR]);
  return typeof window === "undefined" ? null : matches;
}
function useIsMobileMediaQuery(options) {
  return useMediaQuery("(max-width: 768px)", options);
}
const PopoverAnimation = {
  initial: { opacity: 0, y: 5 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 5 },
  transition: { type: "tween", duration: 0.125 }
};
function useOverlayViewport() {
  const { width, height } = useViewportSize();
  return {
    "--be-viewport-height": `${height}px`,
    "--be-viewport-width": `${width}px`
  };
}
const Popover = forwardRef(
  ({
    children,
    style,
    autoFocus = false,
    restoreFocus = true,
    isDismissable,
    isContextMenu,
    isOpen,
    onClose,
    triggerRef,
    arrowRef,
    arrowStyle,
    onPointerLeave,
    onPointerEnter
  }, ref) => {
    const viewPortStyle = useOverlayViewport();
    const objRef = useObjectRef(ref);
    const { domProps } = useCloseOnInteractOutside(
      {
        isDismissable,
        isOpen,
        onClose,
        triggerRef,
        isContextMenu
      },
      objRef
    );
    return /* @__PURE__ */ jsx(
      m.div,
      {
        className: "isolate z-popover",
        role: "presentation",
        ref: objRef,
        style: { ...viewPortStyle, ...style, position: "fixed" },
        ...PopoverAnimation,
        ...mergeProps(domProps, { onPointerLeave, onPointerEnter }),
        children: /* @__PURE__ */ jsx(
          FocusScope,
          {
            restoreFocus,
            autoFocus,
            contain: false,
            children
          }
        )
      }
    );
  }
);
const visibleOverlays = [];
function useCloseOnInteractOutside({
  onClose,
  isDismissable = true,
  triggerRef,
  isContextMenu = false
}, ref) {
  const stateRef = useRef({
    isPointerDown: false,
    isContextMenu,
    onClose
  });
  const state = stateRef.current;
  state.isContextMenu = isContextMenu;
  state.onClose = onClose;
  const isValidEvent = useCallback(
    (e) => {
      const target = e.target;
      if (target) {
        const ownerDocument = target.ownerDocument;
        if (!ownerDocument || !ownerDocument.documentElement.contains(target)) {
          return false;
        }
      }
      return ref.current && !ref.current.contains(target);
    },
    [ref]
  );
  const isTopMostPopover = useCallback(() => {
    return visibleOverlays[visibleOverlays.length - 1] === ref;
  }, [ref]);
  const hideOverlay = useCallback(() => {
    if (isTopMostPopover()) {
      state.onClose();
    }
  }, [isTopMostPopover, state]);
  const clickedOnTriggerElement = useCallback(
    (el) => {
      var _a2, _b2;
      if (triggerRef.current && "contains" in triggerRef.current) {
        return (_b2 = (_a2 = triggerRef.current).contains) == null ? void 0 : _b2.call(_a2, el);
      }
      return false;
    },
    [triggerRef]
  );
  const onInteractOutsideStart = useCallback(
    (e) => {
      if (!clickedOnTriggerElement(e.target)) {
        if (isTopMostPopover()) {
          e.stopPropagation();
          e.preventDefault();
        }
      }
    },
    [clickedOnTriggerElement, isTopMostPopover]
  );
  const onInteractOutside = useCallback(
    (e) => {
      if (!clickedOnTriggerElement(e.target)) {
        if (isTopMostPopover()) {
          e.stopPropagation();
          e.preventDefault();
        }
        if (!state.isContextMenu || e.button !== 2) {
          hideOverlay();
        }
      }
    },
    [clickedOnTriggerElement, hideOverlay, state, isTopMostPopover]
  );
  useEffect(() => {
    visibleOverlays.push(ref);
    const onPointerDown = (e) => {
      if (isValidEvent(e)) {
        onInteractOutsideStart(e);
        stateRef.current.isPointerDown = true;
      }
    };
    const onPointerUp = (e) => {
      if (stateRef.current.isPointerDown && isValidEvent(e)) {
        stateRef.current.isPointerDown = false;
        onInteractOutside(e);
      }
    };
    const onContextMenu = (e) => {
      e.preventDefault();
      if (isValidEvent(e)) {
        hideOverlay();
      }
    };
    const onScroll = (e) => {
      if (!triggerRef.current) {
        return;
      }
      const scrollableRegion = e.target;
      let triggerEl;
      if (triggerRef.current instanceof Node) {
        triggerEl = triggerRef.current;
      } else if ("contextElement" in triggerRef.current) {
        triggerEl = triggerRef.current.contextElement;
      }
      if (!(scrollableRegion instanceof Node) || !triggerEl || scrollableRegion.contains(triggerEl)) {
        state.onClose();
      }
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("pointerup", onPointerUp, true);
    document.addEventListener("contextmenu", onContextMenu, true);
    document.addEventListener("scroll", onScroll, true);
    return () => {
      const index = visibleOverlays.indexOf(ref);
      if (index >= 0) {
        visibleOverlays.splice(index, 1);
      }
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("pointerup", onPointerUp, true);
      document.removeEventListener("contextmenu", onContextMenu, true);
      document.removeEventListener("scroll", onScroll, true);
    };
  }, [
    ref,
    isValidEvent,
    state,
    onInteractOutside,
    onInteractOutsideStart,
    triggerRef,
    clickedOnTriggerElement,
    hideOverlay
  ]);
  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      e.preventDefault();
      hideOverlay();
    }
  };
  return {
    domProps: {
      onKeyDown
    }
  };
}
const opacityAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 }
};
function Underlay({
  position = "absolute",
  className,
  isTransparent = false,
  disableInitialTransition,
  ...domProps
}) {
  return /* @__PURE__ */ jsx(
    m.div,
    {
      ...domProps,
      className: clsx(
        className,
        !isTransparent && "bg-background/80",
        "inset-0 z-10 h-full w-full",
        position,
        "backdrop-blur-sm"
      ),
      "aria-hidden": true,
      initial: disableInitialTransition ? void 0 : { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      ...opacityAnimation,
      transition: { duration: 0.15 }
    }
  );
}
const Tray = forwardRef(
  ({
    children,
    autoFocus = false,
    restoreFocus = true,
    isDismissable,
    isOpen,
    onClose
  }, ref) => {
    const viewPortStyle = useOverlayViewport();
    const objRef = useObjectRef(ref);
    return /* @__PURE__ */ jsxs("div", { className: "isolate z-tray fixed inset-0", style: viewPortStyle, children: [
      /* @__PURE__ */ jsx(
        Underlay,
        {
          onClick: () => {
            if (isDismissable) {
              onClose();
            }
          }
        },
        "tray-underlay"
      ),
      /* @__PURE__ */ jsx(
        m.div,
        {
          ref: objRef,
          className: "absolute bottom-0 left-0 right-0 w-full z-20 rounded-t overflow-hidden max-w-375 max-h-tray mx-auto pb-safe-area",
          role: "presentation",
          initial: { opacity: 0, y: "100%" },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: "100%" },
          transition: { type: "tween", duration: 0.2 },
          children: /* @__PURE__ */ jsx(FocusScope, { restoreFocus, autoFocus, contain: true, children })
        }
      )
    ] });
  }
);
const Modal = forwardRef(
  ({
    children,
    autoFocus = false,
    restoreFocus = true,
    isDismissable = true,
    isOpen = false,
    placement = "center",
    onClose
  }, ref) => {
    const viewPortStyle = useOverlayViewport();
    const objRef = useObjectRef(ref);
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: "fixed inset-0 isolate z-modal",
        style: viewPortStyle,
        onKeyDown: (e) => {
          if (e.key === "Escape") {
            e.stopPropagation();
            e.preventDefault();
            onClose();
          }
        },
        children: [
          /* @__PURE__ */ jsx(
            Underlay,
            {
              onClick: () => {
                if (isDismissable) {
                  onClose();
                }
              }
            },
            "modal-underlay"
          ),
          /* @__PURE__ */ jsx(
            m.div,
            {
              ref: objRef,
              className: clsx(
                "pointer-events-none absolute inset-0 z-20 flex h-full w-full",
                placement === "center" && "items-center justify-center",
                placement === "top" && "items-start justify-center pt-40"
              ),
              role: "presentation",
              initial: { opacity: 0, scale: placement === "top" ? 1 : 0.7 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 1 },
              transition: { duration: 0.1 },
              children: /* @__PURE__ */ jsx(FocusScope, { restoreFocus, autoFocus, contain: true, children })
            }
          )
        ]
      }
    );
  }
);
function Section({ children, label, index }) {
  const id = useId();
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "group",
      className: clsx(index !== 0 && "border-t my-4"),
      "aria-labelledby": label ? `be-select-${id}` : void 0,
      children: [
        label && /* @__PURE__ */ jsx(
          "div",
          {
            className: "block uppercase text-muted text-xs px-16 py-10",
            role: "presentation",
            id: `be-select-${id}`,
            "aria-hidden": "true",
            children: label
          }
        ),
        children
      ]
    }
  );
}
const buildListboxCollection = memoize(
  ({ maxItems, children, items, inputValue }) => {
    let collection = childrenToCollection({ children, items });
    let filteredCollection = filterCollection({ collection, inputValue });
    if (maxItems) {
      collection = new Map([...collection.entries()].slice(0, maxItems));
      filteredCollection = new Map(
        [...filteredCollection.entries()].slice(0, maxItems)
      );
    }
    return { collection, filteredCollection };
  }
);
const filterCollection = memoize(
  ({ collection, inputValue }) => {
    let filteredCollection = /* @__PURE__ */ new Map();
    const query = inputValue ? `${inputValue}`.toLowerCase().trim() : "";
    if (!query) {
      filteredCollection = collection;
    } else {
      let filterIndex = 0;
      collection.forEach((meta, value) => {
        const haystack = meta.item ? JSON.stringify(meta.item) : meta.textLabel;
        if (haystack.toLowerCase().trim().includes(query)) {
          filteredCollection.set(value, { ...meta, index: filterIndex++ });
        }
      });
    }
    return filteredCollection;
  }
);
const childrenToCollection = memoize(
  ({ children, items }) => {
    let reactChildren;
    if (items && typeof children === "function") {
      reactChildren = items.map((item) => children(item));
    } else {
      reactChildren = children;
    }
    const collection = /* @__PURE__ */ new Map();
    let optionIndex = 0;
    const setOption = (element, section, sectionIndex, sectionItemIndex) => {
      const index = optionIndex++;
      const item = section ? (
        // get item from nested array
        items == null ? void 0 : items[sectionIndex].items[sectionItemIndex]
      ) : (
        // get item from flat array
        items == null ? void 0 : items[index]
      );
      collection.set(element.props.value, {
        index,
        element,
        textLabel: getTextLabel(element),
        item,
        section,
        isDisabled: element.props.isDisabled,
        value: element.props.value
      });
    };
    Children.forEach(reactChildren, (child, childIndex) => {
      if (!isValidElement(child))
        return;
      if (child.type === Section) {
        Children.forEach(
          child.props.children,
          (nestedChild, nestedChildIndex) => {
            setOption(nestedChild, child, childIndex, nestedChildIndex);
          }
        );
      } else {
        setOption(child);
      }
    });
    return collection;
  }
);
function getTextLabel(item) {
  var _a2;
  const content = item.props.children;
  if (item.props.textLabel) {
    return item.props.textLabel;
  }
  if ((_a2 = content == null ? void 0 : content.props) == null ? void 0 : _a2.message) {
    return content.props.message;
  }
  return `${content}` || "";
}
function useListbox(props, ref) {
  const {
    children,
    items,
    role = "listbox",
    virtualFocus,
    loopFocus = false,
    autoFocusFirstItem = true,
    onItemSelected,
    clearInputOnItemSelection,
    blurReferenceOnItemSelection,
    floatingWidth = "matchTrigger",
    floatingMinWidth,
    floatingMaxHeight,
    offset: offset2,
    placement,
    showCheckmark,
    showEmptyMessage,
    maxItems,
    isAsync,
    allowCustomValue,
    clearSelectionOnInputClear
  } = props;
  const selectionMode = props.selectionMode || "none";
  const id = useId();
  const listboxId = `${id}-listbox`;
  const [inputValue, setInputValue] = useControlledState(
    props.inputValue,
    props.defaultInputValue || "",
    props.onInputValueChange
  );
  const [activeCollection, setActiveCollection] = useState(
    "all"
  );
  const collections = buildListboxCollection({
    children,
    items,
    // don't filter on client side if async, it will already be filtered on server
    inputValue: isAsync ? void 0 : inputValue,
    maxItems
  });
  const collection = activeCollection === "all" ? collections.collection : collections.filteredCollection;
  const listItemsRef = useRef([]);
  const listContent = useMemo(() => {
    return [...collection.values()].map(
      (o) => o.isDisabled ? null : o.textLabel
    );
  }, [collection]);
  const { selectedValues, selectValues } = useControlledSelection(props);
  const [isOpen, setIsOpen] = useControlledState(
    props.isOpen,
    props.defaultIsOpen,
    props.onOpenChange
  );
  const [activeIndex, setActiveIndex] = useState(null);
  const floatingProps = useFloatingPosition({
    floatingWidth,
    ref,
    placement,
    offset: offset2,
    maxHeight: floatingMaxHeight ?? 420,
    // don't shift floating menu on the sides of combobox, otherwise input might get obscured
    shiftCrossAxis: !virtualFocus
  });
  const { refs, strategy, x, y } = floatingProps;
  const selectedOption = selectionMode === "none" ? void 0 : collection.get(selectedValues[0]);
  const selectedIndex = selectionMode === "none" ? void 0 : selectedOption == null ? void 0 : selectedOption.index;
  const setSelectedIndex = (index) => {
    if (selectionMode !== "none") {
      const item = [...collection.values()][index];
      if (item) {
        selectValues(item.value);
      }
    }
  };
  const focusItem = useCallback(
    (fallbackOperation, newIndex) => {
      var _a2, _b2;
      const items2 = [...collection.values()];
      const allItemsDisabled = !items2.find((i) => !i.isDisabled);
      const lastIndex = collection.size - 1;
      if (newIndex == null || !collection.size || newIndex > lastIndex || newIndex < 0 || allItemsDisabled) {
        setActiveIndex(null);
        return;
      }
      newIndex = getNonDisabledIndex(
        items2,
        newIndex,
        loopFocus,
        fallbackOperation
      );
      setActiveIndex(newIndex);
      if (virtualFocus) {
        (_a2 = listItemsRef.current[newIndex]) == null ? void 0 : _a2.scrollIntoView({
          block: "nearest"
        });
      } else {
        (_b2 = listItemsRef.current[newIndex]) == null ? void 0 : _b2.focus();
      }
    },
    [collection, virtualFocus, loopFocus]
  );
  const onInputChange = useCallback(
    (e) => {
      setInputValue(e.target.value);
      setActiveCollection(e.target.value.trim() ? "filtered" : "all");
      if (e.target.value) {
        setIsOpen(true);
      } else if (clearSelectionOnInputClear) {
        selectValues("");
      }
      if (autoFocusFirstItem && activeIndex == null) {
        focusItem("increment", 0);
      } else {
        setActiveIndex(null);
      }
    },
    [
      setInputValue,
      setIsOpen,
      setActiveCollection,
      selectValues,
      clearSelectionOnInputClear,
      focusItem,
      autoFocusFirstItem,
      activeIndex
    ]
  );
  const handleItemSelection = (value) => {
    const reference = refs.reference.current;
    if (selectionMode !== "none") {
      selectValues(value);
    } else {
      if (reference && "focus" in reference) {
        reference.focus();
      }
    }
    if (virtualFocus) {
      setInputValue(clearInputOnItemSelection ? "" : `${value}`);
      if (blurReferenceOnItemSelection && reference && "blur" in reference) {
        reference.blur();
      }
    }
    setActiveCollection("all");
    setIsOpen(false);
    onItemSelected == null ? void 0 : onItemSelected(value);
    setActiveIndex(null);
  };
  return {
    // even handlers
    handleItemSelection,
    onInputChange,
    loopFocus,
    // config
    floatingWidth,
    floatingMinWidth,
    floatingMaxHeight,
    showCheckmark,
    collection,
    collections,
    virtualFocus,
    focusItem,
    showEmptyMessage: showEmptyMessage && !!inputValue,
    allowCustomValue,
    // floating ui
    refs,
    reference: floatingProps.reference,
    floating: refs.setFloating,
    positionStyle: {
      position: strategy,
      top: y ?? "",
      left: x ?? ""
    },
    listContent,
    listItemsRef,
    listboxId,
    role,
    state: {
      // currently focused or active (if virtual focus) option
      activeIndex,
      setActiveIndex,
      selectedIndex,
      setSelectedIndex,
      selectionMode,
      selectedValues,
      selectValues,
      inputValue,
      setInputValue,
      isOpen,
      setIsOpen,
      setActiveCollection
    }
  };
}
function getNonDisabledIndex(items, newIndex, loopFocus, operation) {
  var _a2;
  const lastIndex = items.length - 1;
  while ((_a2 = items[newIndex]) == null ? void 0 : _a2.isDisabled) {
    if (operation === "increment") {
      newIndex++;
      if (newIndex >= lastIndex) {
        if (loopFocus) {
          newIndex = 0;
        } else {
          return newIndex - 1;
        }
      }
    } else {
      newIndex--;
      if (newIndex < 0) {
        if (loopFocus) {
          newIndex = lastIndex;
        } else {
          return newIndex + 1;
        }
      }
    }
  }
  return newIndex;
}
function useControlledSelection(props) {
  const { selectionMode, allowEmptySelection } = props;
  const selectionEnabled = selectionMode === "single" || selectionMode === "multiple";
  const [stateValues, setStateValues] = useControlledState(
    !selectionEnabled ? void 0 : props.selectedValue,
    !selectionEnabled ? void 0 : props.defaultSelectedValue,
    !selectionEnabled ? void 0 : props.onSelectionChange
  );
  const selectedValues = useMemo(() => {
    if (typeof stateValues === "undefined") {
      return [];
    }
    return Array.isArray(stateValues) ? stateValues : [stateValues];
  }, [stateValues]);
  const selectValues = useCallback(
    (mixedValue) => {
      const newValues = Array.isArray(mixedValue) ? mixedValue : [mixedValue];
      if (selectionMode === "single") {
        setStateValues(newValues[0]);
      } else {
        newValues.forEach((newValue) => {
          const index = selectedValues.indexOf(newValue);
          if (index === -1) {
            selectedValues.push(newValue);
            setStateValues([...selectedValues]);
          } else if (selectedValues.length > 1 || allowEmptySelection) {
            selectedValues.splice(index, 1);
            setStateValues([...selectedValues]);
          }
        });
      }
    },
    [allowEmptySelection, selectedValues, selectionMode, setStateValues]
  );
  return {
    selectedValues,
    selectValues
  };
}
const ListBoxContext = createContext(null);
function useListboxContext() {
  return useContext(ListBoxContext);
}
const MOBILE_SCREEN_WIDTH = 768;
function useIsMobileDevice() {
  const isSSR = useIsSSR();
  if (isSSR || typeof window === "undefined") {
    return getBootstrapData().is_mobile_device;
  }
  return window.screen.width <= MOBILE_SCREEN_WIDTH;
}
function Listbox({
  listbox,
  children: trigger,
  isLoading,
  mobileOverlay = Tray,
  searchField,
  onClose,
  prepend,
  className: listboxClassName,
  ...domProps
}) {
  const isMobile = useIsMobileDevice();
  const {
    floatingWidth,
    floatingMinWidth = "min-w-180",
    collection,
    showEmptyMessage,
    state: { isOpen, setIsOpen },
    positionStyle,
    floating,
    refs
  } = listbox;
  const Overlay = !prepend && isMobile ? mobileOverlay : Popover;
  const className = clsx(
    "text-base sm:text-sm outline-none bg max-h-inherit flex flex-col",
    !prepend && "shadow-xl border py-4",
    listboxClassName,
    // tray will apply its own rounding and max width
    Overlay === Popover && "rounded-panel",
    Overlay === Popover && floatingWidth === "auto" ? `max-w-288 ${floatingMinWidth}` : ""
  );
  const children = useMemo(() => {
    let sectionIndex = 0;
    const renderedSections = [];
    return [...collection.values()].reduce((prev, curr) => {
      if (!curr.section) {
        prev.push(
          cloneElement(curr.element, {
            key: curr.element.key || curr.element.props.value
          })
        );
      } else if (!renderedSections.includes(curr.section)) {
        const section = cloneElement(curr.section, {
          key: curr.section.key || sectionIndex,
          index: sectionIndex
        });
        prev.push(section);
        renderedSections.push(curr.section);
        sectionIndex++;
      }
      return prev;
    }, []);
  }, [collection]);
  const showContent = children.length > 0 || showEmptyMessage && !isLoading;
  const innerContent = showContent ? /* @__PURE__ */ jsxs("div", { className, role: "presentation", children: [
    searchField,
    /* @__PURE__ */ jsx(FocusContainer, { isLoading, ...domProps, children })
  ] }) : null;
  return /* @__PURE__ */ jsxs(ListBoxContext.Provider, { value: listbox, children: [
    trigger,
    prepend ? innerContent : rootEl && createPortal(
      /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && showContent && /* @__PURE__ */ jsx(
        Overlay,
        {
          triggerRef: refs.reference,
          restoreFocus: true,
          isOpen,
          onClose: () => {
            onClose == null ? void 0 : onClose();
            setIsOpen(false);
          },
          isDismissable: true,
          style: positionStyle,
          ref: floating,
          children: innerContent
        }
      ) }),
      rootEl
    )
  ] });
}
function FocusContainer({
  className,
  children,
  isLoading,
  ...domProps
}) {
  const {
    role,
    listboxId,
    virtualFocus,
    focusItem,
    state: { activeIndex, setActiveIndex, selectedIndex }
  } = useListboxContext();
  const autoFocusRef = useRef(true);
  const domRef = useRef(null);
  useEffect(() => {
    return () => setActiveIndex(null);
  }, [setActiveIndex]);
  useEffect(() => {
    if (autoFocusRef.current) {
      const indexToFocus = activeIndex ?? selectedIndex;
      if (indexToFocus == null && !virtualFocus) {
        requestAnimationFrame(() => {
          var _a2;
          (_a2 = domRef.current) == null ? void 0 : _a2.focus({ preventScroll: true });
        });
      } else if (indexToFocus != null) {
        requestAnimationFrame(() => {
          focusItem("increment", indexToFocus);
        });
      }
    }
    autoFocusRef.current = false;
  }, [activeIndex, selectedIndex, focusItem, virtualFocus]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      tabIndex: virtualFocus ? void 0 : -1,
      role,
      id: listboxId,
      className: "flex-auto overflow-y-auto overscroll-contain outline-none",
      ref: domRef,
      ...domProps,
      children: children.length ? children : /* @__PURE__ */ jsx(EmptyMessage, {})
    }
  );
}
function EmptyMessage() {
  return /* @__PURE__ */ jsx("div", { className: "px-8 py-4 text-sm italic text-muted", children: /* @__PURE__ */ jsx(Trans, { message: "There are no items matching your query" }) });
}
const CheckIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" }),
  "CheckOutlined"
);
const ListItemBase = React.forwardRef(
  (props, ref) => {
    let {
      startIcon,
      capitalizeFirst,
      children,
      description,
      endIcon,
      endSection,
      isDisabled,
      isActive,
      isSelected,
      showCheckmark,
      elementType = "div",
      radius,
      padding,
      ...domProps
    } = props;
    if (!startIcon && showCheckmark) {
      startIcon = /* @__PURE__ */ jsx(
        CheckIcon,
        {
          size: "sm",
          className: clsx("text-primary", !isSelected && "invisible")
        }
      );
    }
    const iconClassName = clsx(
      "icon-sm rounded overflow-hidden flex-shrink-0",
      !isDisabled && "text-muted"
    );
    const endSectionClassName = clsx(!isDisabled && "text-muted");
    const Element = elementType;
    return /* @__PURE__ */ jsxs(
      Element,
      {
        ...domProps,
        "aria-disabled": isDisabled,
        className: itemClassName(props),
        ref,
        children: [
          startIcon && /* @__PURE__ */ jsx("div", { className: iconClassName, children: startIcon }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: clsx(
                "min-w-auto mr-auto w-full overflow-hidden overflow-ellipsis",
                capitalizeFirst && "first-letter:capitalize"
              ),
              children: [
                children,
                description && /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: clsx(
                      "mt-4 whitespace-normal text-xs",
                      isDisabled ? "text-disabled" : "text-muted"
                    ),
                    children: description
                  }
                )
              ]
            }
          ),
          (endIcon || endSection) && /* @__PURE__ */ jsx("div", { className: endIcon ? iconClassName : endSectionClassName, children: endIcon || endSection })
        ]
      }
    );
  }
);
function itemClassName({
  className,
  isSelected,
  isActive,
  isDisabled,
  showCheckmark,
  endIcon,
  endSection,
  radius,
  padding: userPadding
}) {
  let state = "";
  if (isDisabled) {
    state = "text-disabled pointer-events-none";
  } else if (isSelected) {
    if (isActive) {
      state = "bg-primary/focus";
    } else {
      state = "bg-primary/selected hover:bg-primary/focus";
    }
  } else if (isActive) {
    state = "hover:bg-fg-base/15 bg-focus";
  } else {
    state = "hover:bg-hover";
  }
  let padding;
  if (userPadding) {
    padding = userPadding;
  } else if (showCheckmark) {
    if (endIcon || endSection) {
      padding = "pl-8 pr-8 py-8";
    } else {
      padding = "pl-8 pr-24 py-8";
    }
  } else {
    padding = "px-20 py-8";
  }
  return clsx(
    "w-full select-none outline-none cursor-pointer",
    "text-sm truncate flex items-center gap-10",
    !isDisabled && "text-main",
    padding,
    state,
    className,
    radius
  );
}
function Item$1({
  children,
  value,
  startIcon,
  endIcon,
  endSection,
  description,
  capitalizeFirst,
  textLabel,
  isDisabled,
  onSelected,
  onClick,
  ...domProps
}) {
  var _a2;
  const {
    collection,
    showCheckmark,
    virtualFocus,
    listboxId,
    role,
    listItemsRef,
    handleItemSelection,
    state: { selectedValues, activeIndex, setActiveIndex }
  } = useListboxContext();
  const isSelected = selectedValues.includes(value);
  const index = (_a2 = collection.get(value)) == null ? void 0 : _a2.index;
  const isActive = activeIndex === index;
  if (index == null) {
    return null;
  }
  const tabIndex = isActive && !isDisabled ? -1 : 0;
  return /* @__PURE__ */ jsx(
    ListItemBase,
    {
      ...domProps,
      onFocus: () => {
        if (!virtualFocus) {
          setActiveIndex(index);
        }
      },
      onPointerEnter: (e) => {
        setActiveIndex(index);
        if (!virtualFocus) {
          e.currentTarget.focus();
        }
      },
      onPointerDown: (e) => {
        if (virtualFocus) {
          e.preventDefault();
        }
      },
      onKeyDown: (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleItemSelection(value);
          onSelected == null ? void 0 : onSelected();
        }
      },
      onClick: (e) => {
        handleItemSelection(value);
        onSelected == null ? void 0 : onSelected();
        onClick == null ? void 0 : onClick(e);
      },
      ref: (node) => listItemsRef.current[index] = node,
      id: `${listboxId}-${index}`,
      role: role === "menu" ? "menuitem" : "option",
      tabIndex: virtualFocus ? void 0 : tabIndex,
      "aria-selected": isActive && isSelected,
      showCheckmark,
      isDisabled,
      isActive,
      isSelected,
      startIcon,
      description,
      endIcon,
      endSection,
      capitalizeFirst,
      "data-value": value,
      children
    }
  );
}
function useListboxKeyboardNavigation({
  state: { isOpen, setIsOpen, selectedIndex, activeIndex, setInputValue },
  loopFocus,
  collection,
  focusItem,
  handleItemSelection,
  allowCustomValue
}) {
  const handleTriggerKeyDown = (e) => {
    if (isOpen || !e.currentTarget.contains(e.target))
      return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIsOpen(true);
      focusItem("increment", selectedIndex != null ? selectedIndex : 0);
      return true;
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIsOpen(true);
      focusItem(
        "decrement",
        selectedIndex != null ? selectedIndex : collection.size - 1
      );
      return true;
    } else if (e.key === "Enter" || e.key === "Space") {
      e.preventDefault();
      setIsOpen(true);
      focusItem("increment", selectedIndex != null ? selectedIndex : 0);
      return true;
    }
  };
  const handleListboxKeyboardNavigation = (e) => {
    const lastIndex = Math.max(0, collection.size - 1);
    if (!isOpen || !e.currentTarget.contains(e.target))
      return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (activeIndex == null) {
          focusItem("increment", 0);
        } else if (activeIndex >= lastIndex) {
          if (loopFocus) {
            focusItem("increment", 0);
          }
        } else {
          focusItem("increment", activeIndex + 1);
        }
        return true;
      case "ArrowUp":
        e.preventDefault();
        if (activeIndex == null) {
          focusItem("decrement", lastIndex);
        } else if (activeIndex <= 0) {
          if (loopFocus) {
            focusItem("decrement", lastIndex);
          }
        } else {
          focusItem("decrement", activeIndex - 1);
        }
        return true;
      case "Home":
        e.preventDefault();
        focusItem("increment", 0);
        return true;
      case "End":
        e.preventDefault();
        focusItem("decrement", lastIndex);
        return true;
      case "Tab":
        setIsOpen(false);
        return true;
    }
  };
  const handleListboxSearchFieldKeydown = (e) => {
    var _a2, _b2;
    if (e.key === "Enter" && activeIndex != null && collection.size) {
      e.preventDefault();
      const [value, obj] = [...collection.entries()][activeIndex];
      if (value) {
        handleItemSelection(value);
        (_b2 = (_a2 = obj.element.props).onSelected) == null ? void 0 : _b2.call(_a2);
      }
      return;
    }
    if (e.key === "Escape" && isOpen) {
      setIsOpen(false);
      if (!allowCustomValue) {
        setInputValue("");
      }
    }
    const handled = handleTriggerKeyDown(e);
    if (!handled) {
      handleListboxKeyboardNavigation(e);
    }
  };
  return {
    handleTriggerKeyDown,
    handleListboxKeyboardNavigation,
    handleListboxSearchFieldKeydown
  };
}
const cache = /* @__PURE__ */ new Map();
function useCollator(options) {
  const { localeCode } = useSelectedLocale();
  const cacheKey = localeCode + (options ? Object.entries(options).sort((a, b) => a[0] < b[0] ? -1 : 1).join() : "");
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  const formatter = new Intl.Collator(localeCode, options);
  cache.set(cacheKey, formatter);
  return formatter;
}
function useTypeSelect() {
  const collator = useCollator({ usage: "search", sensitivity: "base" });
  const state = useRef({
    search: "",
    timeout: void 0
  }).current;
  const getMatchingIndex = (listContent, fromIndex) => {
    let index = fromIndex ?? 0;
    while (index != null) {
      const item = listContent[index];
      const substring = item == null ? void 0 : item.slice(0, state.search.length);
      if (substring && collator.compare(substring, state.search) === 0) {
        return index;
      }
      if (index < listContent.length - 1) {
        index++;
      } else {
        return null;
      }
    }
    return null;
  };
  const findMatchingItem = (e, listContent, fromIndex = 0) => {
    const character = getStringForKey(e.key);
    if (!character || e.ctrlKey || e.metaKey) {
      return null;
    }
    if (character === " " && state.search.trim().length > 0) {
      e.preventDefault();
      e.stopPropagation();
    }
    state.search += character;
    let index = getMatchingIndex(listContent, fromIndex);
    if (index == null) {
      index = getMatchingIndex(listContent, 0);
    }
    clearTimeout(state.timeout);
    state.timeout = setTimeout(() => {
      state.search = "";
    }, 500);
    return index ?? null;
  };
  return { findMatchingItem };
}
function getStringForKey(key) {
  if (key.length === 1 || !/^[A-Z]/i.test(key)) {
    return key;
  }
  return "";
}
const SearchIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" }),
  "SearchOutlined"
);
function getInputFieldClassNames(props = {}) {
  const {
    size: size2 = "md",
    startAppend,
    endAppend,
    className,
    labelPosition,
    labelDisplay = "block",
    inputClassName,
    inputWrapperClassName,
    unstyled,
    invalid,
    disabled,
    background = "bg-transparent",
    flexibleHeight,
    inputShadow = "shadow-sm",
    descriptionPosition = "bottom",
    inputRing,
    inputFontSize,
    labelSuffix
  } = { ...props };
  if (unstyled) {
    return {
      label: "",
      input: inputClassName || "",
      wrapper: className || "",
      inputWrapper: inputWrapperClassName || "",
      adornment: "",
      append: { size: "", radius: "" },
      size: { font: "", height: "" },
      description: "",
      error: ""
    };
  }
  const sizeClass = inputSizeClass({
    size: props.size,
    flexibleHeight
  });
  if (inputFontSize) {
    sizeClass.font = inputFontSize;
  }
  const isInputGroup = startAppend || endAppend;
  const ringColor = invalid ? "focus:ring-danger/focus focus:border-danger/60" : "focus:ring-primary/focus focus:border-primary/60";
  const ringClassName = inputRing || `focus:ring ${ringColor}`;
  const radius = getRadius(props);
  return {
    label: clsx(
      labelDisplay,
      "first-letter:capitalize text-left whitespace-nowrap",
      disabled && "text-disabled",
      sizeClass.font,
      labelSuffix ? "" : labelPosition === "side" ? "mr-16" : "mb-4"
    ),
    input: clsx(
      "block text-left relative w-full appearance-none transition-shadow text",
      background,
      // radius
      radius.input,
      getInputBorder(props),
      !disabled && `${ringClassName} focus:outline-none ${inputShadow}`,
      disabled && "text-disabled cursor-not-allowed",
      inputClassName,
      sizeClass.font,
      sizeClass.height,
      getInputPadding(props)
    ),
    adornment: iconSizeClass(size2),
    append: {
      size: getButtonSizeStyle(size2),
      radius: radius.append
    },
    wrapper: clsx(className, sizeClass.font, {
      "flex items-center": labelPosition === "side"
    }),
    inputWrapper: clsx(
      "isolate relative",
      inputWrapperClassName,
      isInputGroup && "flex items-stretch"
    ),
    size: sizeClass,
    description: `text-muted ${descriptionPosition === "bottom" ? "pt-10" : "pb-10"} text-xs`,
    error: "text-danger pt-10 text-xs"
  };
}
function getInputBorder({
  startAppend,
  endAppend,
  inputBorder,
  invalid
}) {
  if (inputBorder)
    return inputBorder;
  const isInputGroup = startAppend || endAppend;
  const borderColor = invalid ? "border-danger" : "border-divider";
  if (!isInputGroup) {
    return `${borderColor} border`;
  }
  if (startAppend) {
    return `${borderColor} border-y border-r`;
  }
  return `${borderColor} border-y border-l`;
}
function getInputPadding({
  startAdornment,
  endAdornment,
  inputRadius
}) {
  if (inputRadius === "rounded-full") {
    return clsx(
      startAdornment ? "pl-54" : "pl-28",
      endAdornment ? "pr-54" : "pr-28"
    );
  }
  return clsx(
    startAdornment ? "pl-46" : "pl-12",
    endAdornment ? "pr-46" : "pr-12"
  );
}
function getRadius(props) {
  const { startAppend, endAppend, inputRadius } = props;
  const isInputGroup = startAppend || endAppend;
  if (inputRadius === "rounded-full") {
    return {
      input: clsx(
        !isInputGroup && "rounded-full",
        startAppend && "rounded-r-full rounded-l-none",
        endAppend && "rounded-l-full rounded-r-none"
      ),
      append: startAppend ? "rounded-l-full" : "rounded-r-full"
    };
  } else if (inputRadius === "rounded-none") {
    return {
      input: "",
      append: ""
    };
  } else if (inputRadius) {
    return {
      input: inputRadius,
      append: inputRadius
    };
  }
  return {
    input: clsx(
      !isInputGroup && "rounded-input",
      startAppend && "rounded-input-r rounded-l-none",
      endAppend && "rounded-input-l rounded-r-none"
    ),
    append: startAppend ? "rounded-input-l" : "rounded-input-r"
  };
}
function inputSizeClass({ size: size2, flexibleHeight }) {
  switch (size2) {
    case "2xs":
      return { font: "text-xs", height: flexibleHeight ? "min-h-24" : "h-24" };
    case "xs":
      return { font: "text-xs", height: flexibleHeight ? "min-h-30" : "h-30" };
    case "sm":
      return { font: "text-sm", height: flexibleHeight ? "min-h-36" : "h-36" };
    case "lg":
      return {
        font: "text-md md:text-lg",
        height: flexibleHeight ? "min-h-50" : "h-50"
      };
    case "xl":
      return { font: "text-xl", height: flexibleHeight ? "min-h-60" : "h-60" };
    default:
      return { font: "text-sm", height: flexibleHeight ? "min-h-42" : "h-42" };
  }
}
function iconSizeClass(size2) {
  switch (size2) {
    case "2xs":
      return "icon-2xs";
    case "xs":
      return "icon-xs";
    case "sm":
      return "icon-sm";
    case "md":
      return "icon-sm";
    case "lg":
      return "icon-lg";
    case "xl":
      return "icon-xl";
    default:
      return "";
  }
}
function Adornment({
  children,
  direction,
  className,
  position = direction === "start" ? "left-0" : "right-0"
}) {
  if (!children)
    return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        "pointer-events-none absolute top-0 z-10 flex h-full min-w-42 items-center justify-center text-muted",
        position,
        className
      ),
      children
    }
  );
}
function removeEmptyValuesFromObject(obj, options) {
  const shouldCopy = (options == null ? void 0 : options.copy) ?? true;
  const newObj = shouldCopy ? { ...obj } : obj;
  Object.keys(newObj).forEach((_key) => {
    const key = _key;
    if ((options == null ? void 0 : options.arrays) && Array.isArray(newObj[key]) && newObj[key].length === 0) {
      delete newObj[key];
    } else if ((options == null ? void 0 : options.deep) && newObj[key] && typeof newObj[key] === "object") {
      newObj[key] = removeEmptyValuesFromObject(newObj[key], options);
      if (Object.keys(newObj[key]).length === 0) {
        delete newObj[key];
      }
    } else if (newObj[key] == null || newObj[key] === "") {
      delete newObj[key];
    }
  });
  return shouldCopy ? newObj : obj;
}
const Field = React.forwardRef(
  (props, ref) => {
    const {
      children,
      // Not every component that uses <Field> supports help text.
      description,
      errorMessage,
      descriptionProps = {},
      errorMessageProps = {},
      startAdornment,
      endAdornment,
      adornmentPosition,
      startAppend,
      endAppend,
      fieldClassNames,
      disabled,
      wrapperProps
    } = props;
    return /* @__PURE__ */ jsxs("div", { className: fieldClassNames.wrapper, ref, ...wrapperProps, children: [
      /* @__PURE__ */ jsx(Label, { ...props }),
      /* @__PURE__ */ jsxs("div", { className: fieldClassNames.inputWrapper, children: [
        /* @__PURE__ */ jsx(
          Adornment,
          {
            direction: "start",
            className: fieldClassNames.adornment,
            position: adornmentPosition,
            children: startAdornment
          }
        ),
        startAppend && /* @__PURE__ */ jsx(Append, { style: fieldClassNames.append, disabled, children: startAppend }),
        children,
        endAppend && /* @__PURE__ */ jsx(Append, { style: fieldClassNames.append, disabled, children: endAppend }),
        /* @__PURE__ */ jsx(
          Adornment,
          {
            direction: "end",
            className: fieldClassNames.adornment,
            position: adornmentPosition,
            children: endAdornment
          }
        )
      ] }),
      description && !errorMessage && /* @__PURE__ */ jsx("div", { className: fieldClassNames.description, ...descriptionProps, children: description }),
      errorMessage && /* @__PURE__ */ jsx("div", { className: fieldClassNames.error, ...errorMessageProps, children: errorMessage })
    ] });
  }
);
function Label({
  labelElementType,
  fieldClassNames,
  labelProps,
  label,
  labelSuffix,
  labelSuffixPosition = "spaced",
  required
}) {
  if (!label) {
    return null;
  }
  const ElementType = labelElementType || "label";
  const labelNode = /* @__PURE__ */ jsxs(ElementType, { className: fieldClassNames.label, ...labelProps, children: [
    label,
    required && /* @__PURE__ */ jsx("span", { className: "text-danger", children: " *" })
  ] });
  if (labelSuffix) {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: clsx(
          "mb-4 flex w-full gap-4",
          labelSuffixPosition === "spaced" ? "items-end" : "items-center"
        ),
        children: [
          labelNode,
          /* @__PURE__ */ jsx(
            "div",
            {
              className: clsx(
                "text-xs text-muted",
                labelSuffixPosition === "spaced" ? "ml-auto" : ""
              ),
              children: labelSuffix
            }
          )
        ]
      }
    );
  }
  return labelNode;
}
function Append({ children, style, disabled }) {
  return React.cloneElement(children, {
    ...children.props,
    disabled: children.props.disabled || disabled,
    // make sure append styles are not overwritten with empty values
    ...removeEmptyValuesFromObject(style)
  });
}
function useAutoFocus({ autoFocus, autoSelectText }, ref) {
  const autoFocusRef = useRef(autoFocus);
  useEffect(() => {
    if (autoFocusRef.current && ref.current) {
      requestAnimationFrame(() => {
        var _a2, _b2;
        (_a2 = ref.current) == null ? void 0 : _a2.focus();
        if (autoSelectText && ((_b2 = ref.current) == null ? void 0 : _b2.nodeName.toLowerCase()) === "input") {
          ref.current.select();
        }
      });
    }
    autoFocusRef.current = false;
  }, [ref, autoSelectText]);
}
function useField(props) {
  const {
    focusRef,
    labelElementType = "label",
    label,
    labelSuffix,
    labelSuffixPosition,
    autoFocus,
    autoSelectText,
    labelPosition,
    descriptionPosition,
    size: size2,
    errorMessage,
    description,
    flexibleHeight,
    startAdornment,
    endAdornment,
    startAppend,
    adornmentPosition,
    endAppend,
    className,
    inputClassName,
    inputWrapperClassName,
    unstyled,
    background,
    invalid,
    disabled,
    id,
    inputRadius,
    inputBorder,
    inputShadow,
    inputRing,
    inputFontSize,
    ...inputDomProps
  } = props;
  useAutoFocus(props, focusRef);
  const defaultId = useId();
  const inputId = id || defaultId;
  const labelId = `${inputId}-label`;
  const descriptionId = `${inputId}-description`;
  const errorId = `${inputId}-error`;
  const labelProps = {
    id: labelId,
    htmlFor: labelElementType === "label" ? inputId : void 0
  };
  const descriptionProps = {
    id: descriptionId
  };
  const errorMessageProps = {
    id: errorId
  };
  const ariaLabel = !props.label && !props["aria-label"] && props.placeholder ? props.placeholder : props["aria-label"];
  const inputProps = {
    "aria-label": ariaLabel,
    "aria-invalid": invalid || void 0,
    id: inputId,
    disabled,
    ...inputDomProps
  };
  const labelledBy = [];
  if (label) {
    labelledBy.push(labelProps.id);
  }
  if (inputProps["aria-labelledby"]) {
    labelledBy.push(inputProps["aria-labelledby"]);
  }
  inputProps["aria-labelledby"] = labelledBy.length ? labelledBy.join(" ") : void 0;
  const describedBy = [];
  if (description) {
    describedBy.push(descriptionProps.id);
  }
  if (errorMessage) {
    describedBy.push(errorMessageProps.id);
  }
  if (inputProps["aria-describedby"]) {
    describedBy.push(inputProps["aria-describedby"]);
  }
  inputProps["aria-describedby"] = describedBy.length ? describedBy.join(" ") : void 0;
  return {
    fieldProps: {
      errorMessageProps,
      descriptionProps,
      labelProps,
      disabled,
      label,
      labelSuffix,
      labelSuffixPosition,
      autoFocus,
      autoSelectText,
      labelPosition,
      descriptionPosition,
      size: size2,
      errorMessage,
      description,
      flexibleHeight,
      startAdornment,
      endAdornment,
      startAppend,
      adornmentPosition,
      endAppend,
      className,
      inputClassName,
      inputWrapperClassName,
      unstyled,
      background,
      invalid
    },
    inputProps
  };
}
const TextField = forwardRef(
  ({
    inputElementType = "input",
    flexibleHeight,
    inputRef,
    inputTestId,
    ...props
  }, ref) => {
    const inputObjRef = useObjectRef(inputRef);
    const { fieldProps, inputProps } = useField({
      ...props,
      focusRef: inputObjRef
    });
    const isTextArea = inputElementType === "textarea";
    const ElementType = isTextArea ? "textarea" : "input";
    const inputFieldClassNames = getInputFieldClassNames({
      ...props,
      flexibleHeight: flexibleHeight || inputElementType === "textarea"
    });
    if (inputElementType === "textarea" && !props.unstyled) {
      inputFieldClassNames.input = `${inputFieldClassNames.input} py-12`;
    }
    return /* @__PURE__ */ jsx(Field, { ref, fieldClassNames: inputFieldClassNames, ...fieldProps, children: /* @__PURE__ */ jsx(
      ElementType,
      {
        "data-testid": inputTestId,
        ref: inputObjRef,
        ...inputProps,
        rows: isTextArea ? inputProps.rows || 4 : void 0,
        className: inputFieldClassNames.input
      }
    ) });
  }
);
const FormTextField = React.forwardRef(({ name, ...props }, ref) => {
  const {
    field: { onChange, onBlur, value = "", ref: inputRef },
    fieldState: { invalid, error }
  } = useController({
    name
  });
  const formProps = {
    onChange,
    onBlur,
    value: value == null ? "" : value,
    // avoid issues with "null" value when setting form defaults from backend model
    invalid,
    errorMessage: error == null ? void 0 : error.message,
    inputRef,
    name
  };
  return /* @__PURE__ */ jsx(TextField, { ref, ...mergeProps(formProps, props) });
});
const MenuTrigger = forwardRef(
  (props, ref) => {
    const {
      searchPlaceholder,
      showSearchField,
      children: [menuTrigger, menu],
      floatingWidth = "auto",
      isLoading
    } = props;
    const id = useId();
    const isMobile = useIsMobileMediaQuery();
    const listbox = useListbox(
      {
        ...props,
        clearInputOnItemSelection: true,
        showEmptyMessage: showSearchField,
        // on mobile menu will be shown as bottom drawer, so make it fullscreen width always
        floatingWidth: isMobile ? "auto" : floatingWidth,
        virtualFocus: showSearchField,
        role: showSearchField ? "listbox" : "menu",
        loopFocus: !showSearchField,
        children: menu.props.children
      },
      ref
    );
    const {
      state: { isOpen, setIsOpen, activeIndex, inputValue, setInputValue },
      listboxId,
      focusItem,
      listContent,
      reference,
      onInputChange
    } = listbox;
    const {
      handleTriggerKeyDown,
      handleListboxKeyboardNavigation,
      handleListboxSearchFieldKeydown
    } = useListboxKeyboardNavigation(listbox);
    const { findMatchingItem } = useTypeSelect();
    const handleListboxTypeSelect = (e) => {
      if (!isOpen)
        return;
      const i = findMatchingItem(e, listContent, activeIndex);
      if (i != null) {
        focusItem("increment", i);
      }
    };
    return /* @__PURE__ */ jsx(
      Listbox,
      {
        onClick: (e) => e.stopPropagation(),
        listbox,
        onKeyDownCapture: !showSearchField ? handleListboxTypeSelect : void 0,
        onKeyDown: handleListboxKeyboardNavigation,
        onClose: showSearchField ? () => setInputValue("") : void 0,
        "aria-labelledby": id,
        isLoading,
        searchField: showSearchField ? /* @__PURE__ */ jsx(
          TextField,
          {
            size: "sm",
            placeholder: searchPlaceholder,
            startAdornment: /* @__PURE__ */ jsx(SearchIcon, {}),
            className: "flex-shrink-0 px-8 pb-8 pt-4",
            autoFocus: true,
            "aria-expanded": isOpen ? "true" : "false",
            "aria-haspopup": "listbox",
            "aria-controls": isOpen ? listboxId : void 0,
            "aria-autocomplete": "list",
            autoComplete: "off",
            autoCorrect: "off",
            spellCheck: "false",
            value: inputValue,
            onChange: onInputChange,
            onKeyDown: (e) => {
              handleListboxSearchFieldKeydown(e);
            }
          }
        ) : null,
        children: cloneElement(menuTrigger, {
          id,
          "aria-expanded": isOpen ? "true" : "false",
          "aria-haspopup": "menu",
          "aria-controls": isOpen ? listboxId : void 0,
          ref: reference,
          onKeyDown: handleTriggerKeyDown,
          onClick: createEventHandler((e) => {
            var _a2, _b2;
            (_b2 = (_a2 = menuTrigger.props) == null ? void 0 : _a2.onClick) == null ? void 0 : _b2.call(_a2, e);
            setIsOpen(!isOpen);
          })
        })
      }
    );
  }
);
function Menu({ children }) {
  return children;
}
function pointToVirtualElement({ x, y }, contextElement) {
  return {
    getBoundingClientRect() {
      return {
        x,
        y,
        width: 0,
        height: 0,
        top: y,
        right: x,
        bottom: y,
        left: x
      };
    },
    contextElement
  };
}
function useCallbackRef(callback) {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  });
  return useMemo(() => (...args) => {
    var _a2;
    return (_a2 = callbackRef.current) == null ? void 0 : _a2.call(callbackRef, ...args);
  }, []);
}
function DialogTrigger(props) {
  let {
    children,
    type,
    disableInitialTransition,
    isDismissable = true,
    moveFocusToDialog = true,
    returnFocusToTrigger = true,
    triggerOnHover = false,
    triggerOnContextMenu = false,
    usePortal = true,
    mobileType,
    alwaysReturnCurrentValueOnClose
  } = props;
  const contextMenuTriggerRef = useRef(null);
  const triggerRef = triggerOnContextMenu && !props.triggerRef ? contextMenuTriggerRef : props.triggerRef;
  const initialValueRef = useRef(props.value);
  const [isOpen, setIsOpen] = useControlledState(
    props.isOpen,
    props.defaultIsOpen,
    props.onOpenChange
  );
  const [value, setValue] = useControlledState(
    props.value,
    props.defaultValue,
    props.onValueChange
  );
  const isMobile = useIsMobileMediaQuery();
  if (isMobile && type === "popover") {
    type = mobileType || "modal";
  }
  const hoverTimeoutRef = useRef(null);
  const { x, y, reference, strategy, refs } = useFloatingPosition({
    ...props,
    disablePositioning: type === "modal"
  });
  const floatingStyle = type === "popover" ? {
    position: strategy,
    top: y ?? "",
    left: x ?? ""
  } : {};
  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;
  const formId = `${id}-form`;
  const onClose = useCallbackRef(props.onClose);
  const close2 = useCallback(
    (closeValue) => {
      if (typeof closeValue === "undefined" && alwaysReturnCurrentValueOnClose) {
        closeValue = value;
      }
      const finalValue = typeof closeValue !== "undefined" ? closeValue : initialValueRef.current;
      onClose == null ? void 0 : onClose(finalValue, {
        initialValue: initialValueRef.current,
        valueChanged: finalValue !== initialValueRef.current
      });
      setIsOpen(false);
    },
    [onClose, setIsOpen, value, alwaysReturnCurrentValueOnClose]
  );
  const open = useCallback(() => {
    setIsOpen(true);
    initialValueRef.current = props.value;
  }, [props.value, setIsOpen]);
  useLayoutEffect(() => {
    if ((triggerRef == null ? void 0 : triggerRef.current) && refs.reference.current !== triggerRef.current) {
      reference(triggerRef.current);
    }
  }, [reference, triggerRef == null ? void 0 : triggerRef.current, refs]);
  const dialogProps = useMemo(() => {
    return {
      "aria-labelledby": labelId,
      "aria-describedby": descriptionId
    };
  }, [labelId, descriptionId]);
  let Overlay;
  if (type === "modal") {
    Overlay = Modal;
  } else if (type === "tray") {
    Overlay = Tray;
  } else {
    Overlay = Popover;
  }
  const contextValue = useMemo(() => {
    return {
      dialogProps,
      type,
      labelId,
      descriptionId,
      isDismissable,
      close: close2,
      value,
      initialValue: initialValueRef.current,
      setValue,
      formId
    };
  }, [
    close2,
    descriptionId,
    dialogProps,
    formId,
    labelId,
    type,
    isDismissable,
    value,
    setValue
  ]);
  triggerOnHover = triggerOnHover && type === "popover";
  const handleTriggerHover = {
    onPointerEnter: createEventHandler((e) => {
      open();
    }),
    onPointerLeave: createEventHandler((e) => {
      hoverTimeoutRef.current = setTimeout(() => {
        close2();
      }, 150);
    })
  };
  const handleFloatingHover = {
    onPointerEnter: createEventHandler((e) => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    }),
    onPointerLeave: createEventHandler((e) => {
      close2();
    })
  };
  const handleTriggerContextMenu = {
    onContextMenu: createEventHandler((e) => {
      e.preventDefault();
      contextMenuTriggerRef.current = pointToVirtualElement(
        { x: e.clientX, y: e.clientY },
        e.currentTarget
      );
      open();
    })
  };
  const handleTriggerClick = {
    onClick: createEventHandler((e) => {
      e.stopPropagation();
      if (isOpen) {
        close2();
      } else {
        open();
      }
    })
  };
  const { dialogTrigger, dialog } = extractChildren(children, contextValue);
  const dialogContent = /* @__PURE__ */ jsx(AnimatePresence, { initial: !disableInitialTransition, children: isOpen && /* @__PURE__ */ jsx(DialogContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx(
    Overlay,
    {
      ...triggerOnHover ? handleFloatingHover : {},
      ref: refs.setFloating,
      triggerRef: refs.reference,
      style: floatingStyle,
      restoreFocus: returnFocusToTrigger,
      autoFocus: moveFocusToDialog,
      isOpen,
      onClose: close2,
      isDismissable,
      isContextMenu: triggerOnContextMenu,
      placement: props.placement,
      children: dialog
    }
  ) }) });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    dialogTrigger && cloneElement(
      dialogTrigger,
      mergeProps(
        {
          // make sure ref specified on trigger element is not overwritten
          ...!triggerRef && !triggerOnContextMenu ? { ref: reference } : {},
          ...!triggerOnContextMenu ? handleTriggerClick : {},
          ...triggerOnHover ? handleTriggerHover : {},
          ...triggerOnContextMenu ? handleTriggerContextMenu : {}
        },
        {
          ...dialogTrigger.props
        }
      )
    ),
    usePortal ? rootEl && createPortal(dialogContent, rootEl) : dialogContent
  ] });
}
function extractChildren(rawChildren, ctx) {
  const children = Array.isArray(rawChildren) ? rawChildren : Children.toArray(rawChildren);
  let dialog = children.length === 2 ? children[1] : children[0];
  dialog = typeof dialog === "function" ? dialog(ctx) : dialog;
  if (children.length === 2) {
    return {
      dialogTrigger: children[0],
      dialog
    };
  }
  return { dialog };
}
function DialogStoreOutlet() {
  const { dialog: DialogElement, data } = useDialogStore();
  return /* @__PURE__ */ jsx(
    DialogTrigger,
    {
      type: "modal",
      isOpen: DialogElement != null,
      onClose: (value) => {
        closeDialog(value);
      },
      children: DialogElement ? /* @__PURE__ */ jsx(DialogElement, { ...data }) : null
    }
  );
}
class LazyLoader {
  constructor() {
    __publicField(this, "loadedAssets", {});
  }
  loadAsset(url, params = { type: "js" }) {
    var _a2;
    const currentState = (_a2 = this.loadedAssets[url]) == null ? void 0 : _a2.state;
    if (currentState === "loaded" && !params.force) {
      return new Promise((resolve) => resolve());
    }
    const neverLoaded = !currentState || this.loadedAssets[url].doc !== params.document;
    if (neverLoaded || params.force && currentState === "loaded") {
      this.loadedAssets[url] = {
        state: new Promise((resolve) => {
          const finalUrl = isAbsoluteUrl(url) ? url : `assets/${url}`;
          const finalId = buildId(url, params.id);
          const assetOptions = {
            url: finalUrl,
            id: finalId,
            resolve,
            parentEl: params.parentEl,
            document: params.document
          };
          if (params.type === "css") {
            this.loadStyleAsset(assetOptions);
          } else {
            this.loadScriptAsset(assetOptions);
          }
        }),
        doc: params.document
      };
      return this.loadedAssets[url].state;
    }
    return this.loadedAssets[url].state;
  }
  /**
   * Check whether asset is loading or has already loaded.
   */
  isLoadingOrLoaded(url) {
    return this.loadedAssets[url] != null;
  }
  loadStyleAsset(options) {
    var _a2;
    const doc = options.document || document;
    const parentEl = options.parentEl || doc.head;
    const style = doc.createElement("link");
    const prefixedId = buildId(options.url, options.id);
    style.rel = "stylesheet";
    style.id = prefixedId;
    style.href = options.url;
    try {
      if (parentEl.querySelector(`#${prefixedId}`)) {
        (_a2 = parentEl.querySelector(`#${prefixedId}`)) == null ? void 0 : _a2.remove();
      }
    } catch (e) {
    }
    style.onload = () => {
      this.loadedAssets[options.url].state = "loaded";
      options.resolve();
    };
    parentEl.appendChild(style);
  }
  loadScriptAsset(options) {
    var _a2;
    const doc = options.document || document;
    const parentEl = options.parentEl || doc.body;
    const script = doc.createElement("script");
    const prefixedId = buildId(options.url, options.id);
    script.async = true;
    script.id = prefixedId;
    script.src = options.url;
    try {
      if (parentEl.querySelector(`#${prefixedId}`)) {
        (_a2 = parentEl.querySelector(`#${prefixedId}`)) == null ? void 0 : _a2.remove();
      }
    } catch (e) {
    }
    script.onload = () => {
      this.loadedAssets[options.url].state = "loaded";
      options.resolve();
    };
    (parentEl || parentEl).appendChild(script);
  }
}
function buildId(url, id) {
  if (id)
    return id;
  return btoa(url.split("/").pop());
}
const lazyLoader = new LazyLoader();
function prefixId(id) {
  return `be-fonts-${id}`;
}
function loadFonts(fonts, options) {
  const doc = options.document || document;
  const googleFonts = [];
  const customFonts = [];
  let promises = [];
  fonts.forEach((font) => {
    if ("google" in font && font.google) {
      googleFonts.push(font);
    } else if ("src" in font) {
      customFonts.push(font);
    }
  });
  if (googleFonts == null ? void 0 : googleFonts.length) {
    const weights = options.weights || [400];
    const families = fonts.map((f) => `${f.family}:${weights.join(",")}`).join("|");
    const googlePromise = lazyLoader.loadAsset(
      `https://fonts.googleapis.com/css?family=${families}&display=swap`,
      {
        type: "css",
        id: prefixId(options.id),
        force: options.forceAssetLoad,
        document: doc
      }
    );
    promises.push(googlePromise);
  }
  if (customFonts == null ? void 0 : customFonts.length) {
    const customFontPromises = customFonts.map(async (fontConfig) => {
      const loadedFont = Array.from(doc.fonts.values()).find((current) => {
        return current.family === fontConfig.family;
      });
      if (loadedFont) {
        return loadedFont.loaded;
      }
      const fontFace = new FontFace(
        fontConfig.family,
        `url(${(options == null ? void 0 : options.prefixSrc) ? options.prefixSrc(fontConfig.src) : fontConfig.src})`,
        fontConfig.descriptors
      );
      doc.fonts.add(fontFace);
      return fontFace.load();
    });
    promises = promises.concat(customFontPromises);
  }
  return Promise.all(promises);
}
function AppearanceListener() {
  const navigate = useNavigate$1();
  const { mergeBootstrapData: mergeBootstrapData2, data: currentData } = useBootstrapData();
  const handleCommand = useCallback(
    (command) => {
      switch (command.type) {
        case "navigate":
          return navigate(command.to);
        case "setValues":
          return mergeBootstrapData2({
            themes: {
              ...currentData.themes,
              all: command.values.appearance.themes.all
            },
            settings: {
              ...currentData.settings,
              ...command.values.settings
            }
          });
        case "setThemeFont":
          if (command.value) {
            setThemeValue("--be-font-family", command.value.family);
            loadFonts([command.value], {
              id: "be-primary-font",
              forceAssetLoad: true
            });
          } else {
            removeThemeValue("--be-font-family");
          }
          return;
        case "setThemeValue":
          return setThemeValue(command.name, command.value);
        case "setActiveTheme":
          const theme = currentData.themes.all.find(
            (t) => t.id === command.themeId
          );
          if (theme) {
            applyThemeToDom(theme);
          }
          return;
        case "setCustomCode":
          return renderCustomCode(command.mode, command.value);
      }
    },
    [currentData, mergeBootstrapData2, navigate]
  );
  useEffect(() => {
    const handleMessage = (e) => {
      if (isAppearanceEvent(e) && eventIsTrusted(e)) {
        handleCommand(e.data);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [navigate, handleCommand]);
  return null;
}
function isAppearanceEvent(e) {
  var _a2;
  return ((_a2 = e.data) == null ? void 0 : _a2.source) === "be-appearance-editor";
}
function eventIsTrusted(e) {
  return new URL(e.origin).hostname === window.location.hostname;
}
function renderCustomCode(mode, value) {
  const parent = mode === "html" ? document.body : document.head;
  const nodeType = mode === "html" ? "div" : "style";
  let customNode = parent.querySelector("#be-custom-code");
  if (!value) {
    if (customNode) {
      customNode.remove();
    }
  } else {
    if (!customNode) {
      customNode = document.createElement(nodeType);
      customNode.id = "be-custom-code";
      parent.appendChild(customNode);
    }
    customNode.innerHTML = value;
  }
}
function useCustomMenu(menuOrPosition) {
  var _a2;
  const settings = useSettings();
  const { user, hasPermission } = useAuth();
  if (!menuOrPosition) {
    return null;
  }
  const menu = typeof menuOrPosition === "string" ? (_a2 = settings.menus) == null ? void 0 : _a2.find((s) => {
    var _a3;
    return (_a3 = s.positions) == null ? void 0 : _a3.includes(menuOrPosition);
  }) : menuOrPosition;
  if (menu) {
    menu.items = menu.items.filter((item) => {
      const hasRoles = (item.roles || []).every(
        (a) => user == null ? void 0 : user.roles.find((b) => b.id === a)
      );
      const hasPermissions = (item.permissions || []).every(
        (a) => hasPermission(a)
      );
      return item.action && hasRoles && hasPermissions;
    });
  }
  return menu;
}
function CustomMenu({
  className,
  iconClassName,
  itemClassName: itemClassName2,
  gap = "gap-10",
  menu: menuOrPosition,
  orientation = "horizontal",
  children,
  matchDescendants,
  onlyShowIcons,
  iconSize,
  unstyled = false
}) {
  const menu = useCustomMenu(menuOrPosition);
  if (!menu)
    return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        "flex",
        gap,
        orientation === "vertical" ? "flex-col items-start" : "items-center",
        className
      ),
      "data-menu-id": menu.id,
      children: menu.items.map((item) => {
        if (children) {
          return children(item);
        }
        return /* @__PURE__ */ jsx(
          CustomMenuItem,
          {
            unstyled,
            onlyShowIcon: onlyShowIcons,
            matchDescendants,
            iconClassName,
            iconSize,
            className: (props) => {
              return typeof itemClassName2 === "function" ? itemClassName2({ ...props, item }) : itemClassName2;
            },
            item
          },
          item.id
        );
      })
    }
  );
}
const CustomMenuItem = forwardRef(
  ({
    item,
    className,
    matchDescendants,
    unstyled,
    onlyShowIcon,
    iconClassName,
    iconSize = "sm",
    ...linkProps
  }, ref) => {
    const label = /* @__PURE__ */ jsx(Trans, { message: item.label });
    const Icon = item.icon && createSvgIconFromTree(item.icon);
    const content = /* @__PURE__ */ jsxs(Fragment, { children: [
      Icon && /* @__PURE__ */ jsx(Icon, { size: iconSize, className: iconClassName }),
      (!Icon || !onlyShowIcon) && label
    ] });
    const baseClassName = !unstyled && "whitespace-nowrap flex items-center justify-start gap-10 hover:text-white";
    const focusClassNames = !unstyled && "outline-none focus-visible:ring-2";
    if (item.type === "link") {
      return /* @__PURE__ */ jsx(
        "a",
        {
          className: clsx(
            baseClassName,
            className == null ? void 0 : className({ isActive: false }),
            focusClassNames
          ),
          href: item.action,
          target: item.target,
          "data-menu-item-id": item.id,
          ref,
          ...linkProps,
          children: content
        }
      );
    }
    return /* @__PURE__ */ jsx(
      NavLink,
      {
        end: typeof matchDescendants === "function" ? matchDescendants(item.action) : matchDescendants,
        className: (props) => clsx(baseClassName, className == null ? void 0 : className(props), focusClassNames),
        to: item.action,
        target: item.target,
        "data-menu-item-id": item.id,
        ref,
        ...linkProps,
        children: content
      }
    );
  }
);
function CookieNotice() {
  const {
    cookie_notice: { position, enable: enable2 }
  } = useSettings();
  const [, setCookie] = useCookie("cookie_notice");
  const [alreadyAccepted, setAlreadyAccepted] = useState(() => {
    return !getBootstrapData().show_cookie_notice;
  });
  if (!enable2 || alreadyAccepted) {
    return null;
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "fixed z-50 flex w-full justify-center gap-14 bg-toast p-14 text-sm text-white shadow max-md:flex-col md:items-center md:gap-30",
        position == "top" ? "top-0" : "bottom-0"
      ),
      children: [
        /* @__PURE__ */ jsx(
          Trans,
          {
            message: "We use cookies to optimize site functionality and provide you with the\r\n      best possible experience."
          }
        ),
        /* @__PURE__ */ jsx(InfoLink, {}),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "flat",
            color: "primary",
            size: "xs",
            className: "max-w-100",
            onClick: () => {
              setCookie("true", { days: 30, path: "/" });
              setAlreadyAccepted(true);
            },
            children: /* @__PURE__ */ jsx(Trans, { message: "OK" })
          }
        )
      ]
    }
  );
}
function InfoLink() {
  const {
    cookie_notice: { button }
  } = useSettings();
  if (!(button == null ? void 0 : button.label)) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    CustomMenuItem,
    {
      className: () => "text-primary-light hover:underline",
      item: button
    }
  );
}
const imgUrl1 = "/assets/404-1-176145e9.png";
const imgUrl2 = "/assets/404-2-14c4a897.png";
function NotFoundPage() {
  return /* @__PURE__ */ jsxs("div", { className: "lg:px-96 lg:py-96 md:py-80 md:px-176 px-16 py-96 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-112 gap-64", children: [
    /* @__PURE__ */ jsx("div", { className: "xl:pt-96 w-full xl:w-1/2 relative pb-48 lg:pb-0", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute", children: /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsx("h1", { className: "my-8 text-main font-bold text-2xl", children: /* @__PURE__ */ jsx(Trans, { message: "Looks like you've found the doorway to the great nothing" }) }),
        /* @__PURE__ */ jsx("p", { className: "my-16 text-main", children: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Sorry about that! Please visit our homepage to get where you need\r\n                to go."
          }
        ) }),
        /* @__PURE__ */ jsx(
          Button,
          {
            className: "my-8",
            elementType: Link,
            size: "lg",
            to: "/",
            variant: "flat",
            color: "primary",
            children: /* @__PURE__ */ jsx(Trans, { message: "Take me there!" })
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "dark:opacity-5", children: /* @__PURE__ */ jsx("img", { src: imgUrl2, alt: "" }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "dark:opacity-80", children: /* @__PURE__ */ jsx("img", { src: imgUrl1, alt: "" }) })
  ] });
}
function AuthRoute({ children, permission, requireLogin = true }) {
  const { isLoggedIn, hasPermission } = useAuth();
  if (requireLogin && !isLoggedIn || permission && !hasPermission(permission)) {
    if (isLoggedIn) {
      return /* @__PURE__ */ jsx(NotFoundPage, {});
    }
    return /* @__PURE__ */ jsx(Navigate, { to: "/login", replace: true });
  }
  return children || /* @__PURE__ */ jsx(Outlet, {});
}
function FullPageLoader({ className, screen: screen2 }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        "flex items-center justify-center flex-auto",
        screen2 ? "h-screen w-screen" : "h-full w-full",
        className
      ),
      children: /* @__PURE__ */ jsx(ProgressCircle, { isIndeterminate: true, "aria-label": "Loading page..." })
    }
  );
}
function GuestRoute({ children }) {
  const { isLoggedIn, getRedirectUri } = useAuth();
  const { isAppearanceEditorActive } = useAppearanceEditorMode();
  const redirectUri = getRedirectUri();
  const { auth } = useContext(SiteConfigContext);
  const { pathname } = useLocation();
  if (isLoggedIn && !isAppearanceEditorActive) {
    if (redirectUri !== pathname) {
      return /* @__PURE__ */ jsx(Navigate, { to: redirectUri, replace: true });
    } else if (auth.secondaryRedirectUri) {
      return /* @__PURE__ */ jsx(Navigate, { to: auth.secondaryRedirectUri, replace: true });
    }
  }
  return children || /* @__PURE__ */ jsx(Outlet, {});
}
function Form({
  children,
  onBeforeSubmit,
  onSubmit,
  form,
  className,
  id,
  onBlur
}) {
  return /* @__PURE__ */ jsx(FormProvider, { ...form, children: /* @__PURE__ */ jsx(
    "form",
    {
      id,
      onBlur,
      className,
      onSubmit: (e) => {
        e.stopPropagation();
        onBeforeSubmit == null ? void 0 : onBeforeSubmit();
        form.handleSubmit(onSubmit)(e);
      },
      children
    }
  ) });
}
const LinkStyle = "text-link hover:underline hover:text-primary-dark focus-visible:ring focus-visible:ring-2 focus-visible:ring-offset-2 outline-none rounded transition-colors";
function ExternalLink({
  children,
  className,
  target = "_blank",
  ...domProps
}) {
  return /* @__PURE__ */ jsx("a", { className: LinkStyle, target, ...domProps, children });
}
function onFormQueryError(r, form) {
  if (form && axios.isAxiosError(r) && r.response) {
    const response = r.response.data;
    if (!response.errors) {
      showHttpErrorToast(r);
    } else {
      Object.entries(response.errors || {}).forEach(([key, errors], index) => {
        if (typeof errors === "string") {
          form.setError(key, { message: errors }, { shouldFocus: index === 0 });
        } else {
          errors.forEach((message2, subIndex) => {
            form.setError(
              key,
              { message: message2 },
              { shouldFocus: index === 0 && subIndex === 0 }
            );
          });
        }
      });
    }
  }
}
function useRegister(form) {
  const navigate = useNavigate();
  const { getRedirectUri } = useAuth();
  const { setBootstrapData: setBootstrapData2 } = useBootstrapData();
  return useMutation({
    mutationFn: register,
    onSuccess: (response) => {
      setBootstrapData2(response.bootstrapData);
      if (response.status === "needs_email_verification") {
        navigate("/");
      } else {
        navigate(getRedirectUri(), { replace: true });
      }
    },
    onError: (r) => onFormQueryError(r, form)
  });
}
function register(payload) {
  return apiClient.post("auth/register", payload).then((response) => response.data);
}
function useConnectSocialWithPassword(form) {
  const navigate = useNavigate();
  const { getRedirectUri } = useAuth();
  const { setBootstrapData: setBootstrapData2 } = useBootstrapData();
  return useMutation({
    mutationFn: connect,
    onSuccess: (response) => {
      setBootstrapData2(response.bootstrapData);
      navigate(getRedirectUri(), { replace: true });
    },
    onError: (r) => onFormQueryError(r, form)
  });
}
function connect(payload) {
  return apiClient.post("secure/auth/social/connect", payload).then((response) => response.data);
}
function useTrans() {
  const { lines, localeCode } = useSelectedLocale();
  const trans = useCallback(
    (props) => {
      return translate({ ...props, lines, localeCode });
    },
    [lines, localeCode]
  );
  return { trans };
}
const translate = memoize(
  (props) => {
    let { lines, message: message2, values, localeCode } = props;
    if (message2 == null) {
      return "";
    }
    message2 = (lines == null ? void 0 : lines[message2]) || (lines == null ? void 0 : lines[message2.toLowerCase()]) || message2;
    if (!values) {
      return message2;
    }
    message2 = handlePluralMessage(localeCode, props);
    Object.entries(values).forEach(([key, value]) => {
      message2 = message2.replace(`:${key}`, `${value}`);
    });
    return message2;
  },
  { equals: shallowEqual, callTimeout: 0 }
);
function DismissButton({ onDismiss }) {
  const { trans } = useTrans();
  const onClick = () => {
    if (onDismiss) {
      onDismiss();
    }
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: "sr-only",
      "aria-label": trans(message("Dismiss")),
      tabIndex: -1,
      onClick
    }
  );
}
function Dialog(props) {
  const {
    type = "modal",
    dialogProps,
    ...contextProps
  } = useContext(DialogContext);
  const {
    children,
    className,
    size: size2 = "md",
    background,
    radius = "rounded",
    maxWidth = "max-w-dialog",
    ...domProps
  } = props;
  let dismissButton = null;
  if (type === "popover" || type === "tray") {
    dismissButton = /* @__PURE__ */ jsx(DismissButton, { onDismiss: contextProps.close });
  }
  const isTrayOrFullScreen = size2 === "fullscreenTakeover" || type === "tray";
  const mergedClassName = clsx(
    "mx-auto pointer-events-auto outline-none flex flex-col overflow-hidden",
    background || "bg",
    type !== "tray" && sizeStyle(size2),
    type === "tray" && "rounded-t border-b-bg",
    size2 !== "fullscreenTakeover" && `shadow-2xl border max-h-dialog`,
    !isTrayOrFullScreen && `${radius} ${maxWidth}`,
    className
  );
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ...mergeProps({ role: "dialog", tabIndex: -1 }, dialogProps, domProps),
      style: { ...props.style, "--be-dialog-padding": "24px" },
      "aria-modal": true,
      className: mergedClassName,
      children: [
        Children.toArray(children).map((child) => {
          if (isValidElement(child)) {
            return cloneElement(child, {
              size: child.props.size ?? size2
            });
          }
          return child;
        }),
        dismissButton
      ]
    }
  );
}
function sizeStyle(dialogSize) {
  switch (dialogSize) {
    case "2xs":
      return "w-256";
    case "xs":
      return "w-320";
    case "sm":
      return "w-384";
    case "md":
      return "w-440";
    case "lg":
      return "w-620";
    case "xl":
      return "w-780";
    case "2xl":
      return "w-850";
    case "fullscreen":
      return "w-1280";
    case "fullscreenTakeover":
      return "w-full h-full";
    default:
      return dialogSize;
  }
}
function DialogHeader(props) {
  const {
    children,
    className,
    color,
    onDismiss,
    leftAdornment,
    rightAdornment,
    hideDismissButton = false,
    size: size2,
    showDivider,
    justify = "justify-between",
    titleFontWeight = "font-semibold",
    titleTextSize = size2 === "xs" ? "text-xs" : "text-sm",
    closeButtonSize = size2 === "xs" ? "xs" : "sm",
    actions
  } = props;
  const { labelId, isDismissable, close: close2 } = useContext(DialogContext);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        className,
        "flex flex-shrink-0 items-center gap-10",
        titleFontWeight,
        showDivider && "border-b",
        getPadding$2(props),
        color || "text-main",
        justify
      ),
      children: [
        leftAdornment,
        /* @__PURE__ */ jsx(
          "h3",
          {
            id: labelId,
            className: clsx(titleTextSize, "mr-auto leading-5 opacity-90"),
            children
          }
        ),
        rightAdornment,
        actions,
        isDismissable && !hideDismissButton && /* @__PURE__ */ jsx(
          IconButton,
          {
            "aria-label": "Dismiss",
            onClick: () => {
              if (onDismiss) {
                onDismiss();
              } else {
                close2();
              }
            },
            size: closeButtonSize,
            className: clsx("-mr-8 text-muted", rightAdornment && "sr-only"),
            children: /* @__PURE__ */ jsx(CloseIcon, {})
          }
        )
      ]
    }
  );
}
function getPadding$2({ size: size2, padding }) {
  if (padding) {
    return padding;
  }
  switch (size2) {
    case "2xs":
    case "xs":
      return "px-14 py-4";
    case "sm":
      return "px-18 py-4";
    default:
      return "px-24 py-6";
  }
}
const DialogBody = forwardRef(
  (props, ref) => {
    const { children, className, padding, size: size2, ...domProps } = props;
    return /* @__PURE__ */ jsx(
      "div",
      {
        ...domProps,
        ref,
        className: clsx(
          className,
          getPadding$1(props),
          "overflow-y-auto overflow-x-hidden overscroll-contain text-sm flex-auto"
        ),
        children
      }
    );
  }
);
function getPadding$1({ size: size2, padding }) {
  if (padding) {
    return padding;
  }
  switch (size2) {
    case "xs":
      return "p-14";
    case "sm":
      return "p-18";
    default:
      return "px-24 py-20";
  }
}
function DialogFooter(props) {
  const { children, startAction, className, dividerTop, padding, size: size2 } = props;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        className,
        dividerTop && "border-t",
        getPadding(props),
        "flex items-center gap-10 flex-shrink-0"
      ),
      children: [
        /* @__PURE__ */ jsx("div", { children: startAction }),
        /* @__PURE__ */ jsx("div", { className: "ml-auto flex items-center gap-10", children })
      ]
    }
  );
}
function getPadding({ padding, size: size2 }) {
  if (padding) {
    return padding;
  }
  switch (size2) {
    case "xs":
      return "p-14";
    case "sm":
      return "p-18";
    default:
      return "px-24 py-20";
  }
}
function useDisconnectSocial() {
  return useMutation({
    mutationFn: disconnect,
    onError: (err) => showHttpErrorToast(err)
  });
}
function disconnect(payload) {
  return apiClient.post(`secure/auth/social/${payload.service}/disconnect`, payload).then((response) => response.data);
}
function useSocialLogin() {
  const { trans } = useTrans();
  const { setBootstrapData: setBootstrapData2 } = useBootstrapData();
  const disconnectSocial = useDisconnectSocial();
  const [requestingPassword, setIsRequestingPassword] = useState(false);
  const handleSocialLoginCallback = useCallback(
    (e) => {
      const { status, callbackData } = e;
      if (!status)
        return;
      switch (status.toUpperCase()) {
        case "SUCCESS":
          if (callbackData == null ? void 0 : callbackData.bootstrapData) {
            setBootstrapData2(callbackData.bootstrapData);
          }
          return e;
        case "REQUEST_PASSWORD":
          setIsRequestingPassword(true);
          return e;
        case "ERROR":
          const message2 = (callbackData == null ? void 0 : callbackData.errorMessage) || trans({
            message: "An error occurred. Please try again later"
          });
          toast.danger(message2);
          return e;
        default:
          return e;
      }
    },
    [trans, setBootstrapData2]
  );
  return {
    requestingPassword,
    setIsRequestingPassword,
    loginWithSocial: async (serviceName) => {
      const event = await openNewSocialAuthWindow(
        `secure/auth/social/${serviceName}/login`
      );
      return handleSocialLoginCallback(event);
    },
    connectSocial: async (serviceNameOrUrl) => {
      const url = serviceNameOrUrl.includes("/") ? serviceNameOrUrl : `secure/auth/social/${serviceNameOrUrl}/connect`;
      const event = await openNewSocialAuthWindow(url);
      return handleSocialLoginCallback(event);
    },
    disconnectSocial
  };
}
const windowHeight = 550;
const windowWidth = 650;
let win;
function openNewSocialAuthWindow(url) {
  const left = window.screen.width / 2 - windowWidth / 2;
  const top = window.screen.height / 2 - windowHeight / 2;
  return new Promise((resolve) => {
    win = window.open(
      url,
      "Authenticate Account",
      `menubar=0, location=0, toolbar=0, titlebar=0, status=0, scrollbars=1, width=${windowWidth}, height=${windowHeight}, left=${left}, top=${top}`
    );
    const messageListener = (e) => {
      const baseUrl = getBootstrapData().settings.base_url;
      if (e.data.type === "social-auth" && baseUrl.indexOf(e.origin) > -1) {
        resolve(e.data);
        window.removeEventListener("message", messageListener);
      }
    };
    window.addEventListener("message", messageListener);
    const timer = setInterval(() => {
      if (!win || win.closed) {
        clearInterval(timer);
        resolve({});
        window.removeEventListener("message", messageListener);
      }
    }, 1e3);
  });
}
const GoogleIcon = createSvgIcon(
  /* @__PURE__ */ jsxs("g", { children: [
    /* @__PURE__ */ jsx(
      "path",
      {
        fill: "#EA4335",
        d: "M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      }
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        fill: "#4285F4",
        d: "M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      }
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        fill: "#FBBC05",
        d: "M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      }
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        fill: "#34A853",
        d: "M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      }
    ),
    /* @__PURE__ */ jsx("path", { fill: "none", d: "M0 0h48v48H0z" })
  ] })
);
const FacebookIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5A3.5 3.5 0 0 0 12 8.5V11h-2v3h2v7h3v-7h3v-3h-3V9a1 1 0 0 1 1-1h2V5z" })
);
const TwitterIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" })
);
const EnvatoIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M 23.898438 47 C 13.65625 47 5.003906 38.355469 5.003906 28.125 L 5.003906 28 C 4.929688 23.074219 6.558594 19.714844 7.261719 18.5 C 8.621094 16.152344 10.296875 14.410156 10.8125 14.136719 C 11.566406 13.734375 12.121094 14.332031 12.363281 14.585938 C 12.832031 15.085938 12.597656 15.695313 12.507813 15.925781 C 11.613281 18.265625 10.929688 20.28125 11.003906 23.097656 C 11.097656 26.90625 12.488281 28.699219 13.085938 29.292969 C 13.460938 29.671875 13.769531 29.847656 14.015625 29.933594 C 14.054688 28.671875 14.203125 26.148438 14.773438 23.304688 C 15.113281 21.589844 16.28125 17.085938 19.6875 12.296875 C 23.714844 6.632813 28.449219 4.273438 29.214844 4.042969 C 30.570313 3.636719 33.535156 3.128906 35.957031 3.019531 C 38.53125 2.910156 39.160156 3.574219 39.921875 5.035156 L 40.046875 5.277344 C 41.820313 8.613281 45.03125 18.832031 43.65625 29.132813 C 42.011719 39.992188 34.257813 47 23.898438 47 Z M 14.648438 30 C 14.640625 30 14.632813 30 14.628906 30 L 14.652344 30 C 14.648438 30 14.648438 30 14.648438 30 Z " })
);
const googleLabel = message("Continue with google");
const facebookLabel = message("Continue with facebook");
const twitterLabel = message("Continue with twitter");
const envatoLabel = message("Continue with envato");
function SocialAuthSection({ dividerMessage }) {
  var _a2, _b2, _c, _d, _e, _f, _g, _h;
  const { social } = useSettings();
  const navigate = useNavigate();
  const { getRedirectUri } = useAuth();
  const { loginWithSocial, requestingPassword, setIsRequestingPassword } = useSocialLogin();
  const allSocialsDisabled = !((_a2 = social == null ? void 0 : social.google) == null ? void 0 : _a2.enable) && !((_b2 = social == null ? void 0 : social.facebook) == null ? void 0 : _b2.enable) && !((_c = social == null ? void 0 : social.twitter) == null ? void 0 : _c.enable) && !((_d = social == null ? void 0 : social.envato) == null ? void 0 : _d.enable);
  if (allSocialsDisabled) {
    return null;
  }
  const handleSocialLogin = async (service) => {
    const e = await loginWithSocial(service);
    if ((e == null ? void 0 : e.status) === "SUCCESS" || (e == null ? void 0 : e.status) === "ALREADY_LOGGED_IN") {
      navigate(getRedirectUri(), { replace: true });
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "relative my-20 text-center before:absolute before:left-0 before:top-1/2 before:h-1 before:w-full before:-translate-y-1/2 before:bg-divider", children: /* @__PURE__ */ jsx("span", { className: "relative z-10 bg-background px-10 text-sm text-muted", children: dividerMessage }) }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: clsx(
          "flex items-center justify-center gap-14",
          !social.compact_buttons && "flex-col"
        ),
        children: [
          ((_e = social == null ? void 0 : social.google) == null ? void 0 : _e.enable) ? /* @__PURE__ */ jsx(
            SocialLoginButton,
            {
              label: googleLabel,
              icon: /* @__PURE__ */ jsx(GoogleIcon, { viewBox: "0 0 48 48" }),
              onClick: () => handleSocialLogin("google")
            }
          ) : null,
          ((_f = social == null ? void 0 : social.facebook) == null ? void 0 : _f.enable) ? /* @__PURE__ */ jsx(
            SocialLoginButton,
            {
              label: facebookLabel,
              icon: /* @__PURE__ */ jsx(FacebookIcon, { className: "text-facebook" }),
              onClick: () => handleSocialLogin("facebook")
            }
          ) : null,
          ((_g = social == null ? void 0 : social.twitter) == null ? void 0 : _g.enable) ? /* @__PURE__ */ jsx(
            SocialLoginButton,
            {
              label: twitterLabel,
              icon: /* @__PURE__ */ jsx(TwitterIcon, { className: "text-twitter" }),
              onClick: () => handleSocialLogin("twitter")
            }
          ) : null,
          ((_h = social == null ? void 0 : social.envato) == null ? void 0 : _h.enable) ? /* @__PURE__ */ jsx(
            SocialLoginButton,
            {
              label: envatoLabel,
              icon: /* @__PURE__ */ jsx(EnvatoIcon, { viewBox: "0 0 50 50", className: "text-envato" }),
              onClick: () => handleSocialLogin("envato")
            }
          ) : null
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      DialogTrigger,
      {
        type: "modal",
        isOpen: requestingPassword,
        onOpenChange: setIsRequestingPassword,
        children: /* @__PURE__ */ jsx(RequestPasswordDialog, {})
      }
    )
  ] });
}
function RequestPasswordDialog() {
  const form = useForm();
  const { formId } = useDialogContext();
  const connect2 = useConnectSocialWithPassword(form);
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Password required" }) }),
    /* @__PURE__ */ jsxs(DialogBody, { children: [
      /* @__PURE__ */ jsx("div", { className: "mb-30 text-sm text-muted", children: /* @__PURE__ */ jsx(Trans, { message: "An account with this email address already exists. If you want to connect the two accounts, enter existing account password." }) }),
      /* @__PURE__ */ jsx(
        Form,
        {
          form,
          id: formId,
          onSubmit: (payload) => {
            connect2.mutate(payload);
          },
          children: /* @__PURE__ */ jsx(
            FormTextField,
            {
              autoFocus: true,
              name: "password",
              type: "password",
              required: true,
              label: /* @__PURE__ */ jsx(Trans, { message: "Password" })
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { variant: "text", children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "submit",
          form: formId,
          variant: "flat",
          color: "primary",
          disabled: connect2.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Connect" })
        }
      )
    ] })
  ] });
}
function SocialLoginButton({ onClick, label, icon }) {
  const { trans } = useTrans();
  const {
    social: { compact_buttons }
  } = useSettings();
  if (compact_buttons) {
    return /* @__PURE__ */ jsx(IconButton, { variant: "outline", "aria-label": trans(label), onClick, children: icon });
  }
  return /* @__PURE__ */ jsx(
    Button,
    {
      variant: "outline",
      startIcon: icon,
      onClick,
      className: "min-h-42 w-full",
      children: /* @__PURE__ */ jsx("span", { className: "min-w-160 text-start", children: /* @__PURE__ */ jsx(Trans, { ...label }) })
    }
  );
}
function AuthLayoutFooter() {
  const { branding } = useSettings();
  return /* @__PURE__ */ jsxs("div", { className: "pt-42 pb-32 flex items-center gap-30 text-sm text-muted mt-auto", children: [
    /* @__PURE__ */ jsxs(Link, { className: "hover:text-fg-base transition-colors", to: "/", children: [
      "© ",
      branding.site_name
    ] }),
    /* @__PURE__ */ jsx(
      CustomMenu,
      {
        menu: "auth-page-footer",
        orientation: "horizontal",
        itemClassName: "hover:text-fg-base transition-colors"
      }
    )
  ] });
}
const authBgSvg = "/assets/auth-bg-8529ec0e.svg";
function AuthLayout({ heading, children, message: message2 }) {
  const { branding } = useSettings();
  const isDarkMode = useIsDarkMode();
  const { trans } = useTrans();
  return /* @__PURE__ */ jsxs(
    "main",
    {
      className: "flex h-screen flex-col items-center overflow-y-auto bg-alt px-14 pt-70 dark:bg-none md:px-10vw",
      style: { backgroundImage: isDarkMode ? void 0 : `url("${authBgSvg}")` },
      children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/",
            className: "mb-40 block flex-shrink-0",
            "aria-label": trans({ message: "Go to homepage" }),
            children: /* @__PURE__ */ jsx(
              "img",
              {
                src: isDarkMode ? branding.logo_light : branding == null ? void 0 : branding.logo_dark,
                className: "m-auto block h-42 w-auto",
                alt: ""
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-440 rounded-lg bg px-40 pb-32 pt-40 shadow md:shadow-xl", children: [
          heading && /* @__PURE__ */ jsx("h1", { className: "mb-20 text-xl", children: heading }),
          children
        ] }),
        message2 && /* @__PURE__ */ jsx("div", { className: "mt-36 text-sm", children: message2 }),
        /* @__PURE__ */ jsx(AuthLayoutFooter, {})
      ]
    }
  );
}
const CheckBoxOutlineBlankIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" }),
  "CheckBoxOutlineBlankOutlined"
);
const CheckboxFilledIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }),
  "CheckBox"
);
const IndeterminateCheckboxFilledIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M17,13H7v-2h10V13z" }),
  "CheckBox"
);
const Checkbox = forwardRef(
  (props, ref) => {
    const {
      size: size2 = "md",
      children,
      className,
      icon,
      checkedIcon,
      disabled,
      isIndeterminate,
      errorMessage,
      invalid,
      orientation = "horizontal",
      onChange,
      autoFocus,
      required,
      value,
      name,
      inputTestId
    } = props;
    const style = getInputFieldClassNames({ ...props, label: children });
    const Icon = icon || CheckBoxOutlineBlankIcon;
    const CheckedIcon = checkedIcon || (isIndeterminate ? IndeterminateCheckboxFilledIcon : CheckboxFilledIcon);
    const inputObjRef = useObjectRef(ref);
    useAutoFocus({ autoFocus }, inputObjRef);
    useEffect(() => {
      if (inputObjRef.current) {
        inputObjRef.current.indeterminate = isIndeterminate || false;
      }
    });
    const [isSelected, setSelected] = useControlledState(
      props.checked,
      props.defaultChecked || false
    );
    const updateChecked = useCallback(
      (e) => {
        onChange == null ? void 0 : onChange(e);
        setSelected(e.target.checked);
      },
      [onChange, setSelected]
    );
    const mergedClassName = clsx(
      "select-none",
      className,
      invalid && "text-danger",
      !invalid && disabled && "text-disabled"
    );
    let CheckboxIcon;
    let checkboxColor = invalid ? "text-danger" : null;
    if (isIndeterminate) {
      CheckboxIcon = IndeterminateCheckboxFilledIcon;
      checkboxColor = checkboxColor || "text-primary";
    } else if (isSelected) {
      CheckboxIcon = CheckedIcon;
      checkboxColor = checkboxColor || "text-primary";
    } else {
      CheckboxIcon = Icon;
      checkboxColor = checkboxColor || "text-muted";
    }
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: mergedClassName, children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: clsx(
            "relative flex items-center",
            orientation === "vertical" && "flex-col flex-col-reverse"
          ),
          children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                className: "absolute left-0 top-0 h-24 w-24 appearance-none overflow-hidden rounded outline-none ring-inset transition-shadow focus-visible:ring",
                type: "checkbox",
                "aria-checked": isIndeterminate ? "mixed" : isSelected,
                "aria-invalid": invalid || void 0,
                onChange: updateChecked,
                ref: inputObjRef,
                required,
                disabled,
                value,
                name,
                "data-testid": inputTestId
              }
            ),
            /* @__PURE__ */ jsx(
              CheckboxIcon,
              {
                size: size2,
                className: clsx(
                  "pointer-events-none",
                  disabled ? "text-disabled" : checkboxColor
                )
              }
            ),
            children && /* @__PURE__ */ jsx(
              "div",
              {
                className: clsx(
                  "first-letter:capitalize",
                  style.size.font,
                  orientation === "vertical" ? "mb-6" : "ml-6"
                ),
                children
              }
            )
          ]
        }
      ) }),
      errorMessage && /* @__PURE__ */ jsx("div", { className: style.error, children: errorMessage })
    ] });
  }
);
function FormCheckbox(props) {
  const {
    field: { onChange, onBlur, value = false, ref },
    fieldState: { invalid, error }
  } = useController({
    name: props.name
  });
  const formProps = {
    onChange,
    onBlur,
    checked: value,
    invalid,
    errorMessage: error == null ? void 0 : error.message,
    name: props.name
  };
  return /* @__PURE__ */ jsx(Checkbox, { ref, ...mergeProps(formProps, props) });
}
function useRecaptcha(action) {
  const { recaptcha: { site_key, enable: enable2 } = {} } = useSettings();
  const enabled = site_key && (enable2 == null ? void 0 : enable2[action]);
  const [isVerifying, setIsVerifying] = useState(false);
  useEffect(() => {
    if (enabled) {
      load(site_key);
    }
  }, [enabled, site_key]);
  const verify = useCallback(async () => {
    if (!enabled)
      return true;
    setIsVerifying(true);
    const isValid = await execute(site_key, action);
    if (!isValid) {
      toast.danger(message("Could not verify you are human."));
    }
    setIsVerifying(false);
    return isValid;
  }, [enabled, site_key, action]);
  return { verify, isVerifying };
}
async function execute(siteKey, action) {
  await load(siteKey);
  return new Promise((resolve) => {
    var _a2;
    (_a2 = window.grecaptcha) == null ? void 0 : _a2.ready(async () => {
      var _a3;
      const token = await ((_a3 = window.grecaptcha) == null ? void 0 : _a3.execute(siteKey, { action }));
      const result = apiClient.post("recaptcha/verify", { token }).then((r) => r.data.success).catch(() => false);
      resolve(result ?? false);
    });
  });
}
function load(siteKey) {
  return lazyLoader.loadAsset(
    `https://www.google.com/recaptcha/api.js?render=${siteKey}`,
    { id: "recaptcha-js" }
  );
}
const Helmet = memo(({ children, tags }) => {
  useTrans();
  return null;
}, shallowEqual);
function StaticPageTitle({ children }) {
  const {
    branding: { site_name }
  } = useSettings();
  return /* @__PURE__ */ jsx(Helmet, { children: children ? (
    // @ts-ignore
    /* @__PURE__ */ jsxs("title", { children: [
      children,
      " - ",
      site_name
    ] })
  ) : void 0 });
}
function RegisterPage() {
  const {
    branding,
    registration: { disable: disable2 },
    social
  } = useSettings();
  const { auth } = useContext(SiteConfigContext);
  const { verify, isVerifying } = useRecaptcha("register");
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const isWorkspaceRegister = pathname.includes("workspace");
  const isBillingRegister = searchParams.get("redirectFrom") === "pricing";
  const searchParamsEmail = searchParams.get("email") || void 0;
  const form = useForm({
    defaultValues: { email: searchParamsEmail }
  });
  const register2 = useRegister(form);
  if (disable2) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/login", replace: true });
  }
  let heading = /* @__PURE__ */ jsx(Trans, { message: "Create a new account" });
  if (isWorkspaceRegister) {
    heading = /* @__PURE__ */ jsx(
      Trans,
      {
        values: { siteName: branding == null ? void 0 : branding.site_name },
        message: "To join your team on :siteName, create an account"
      }
    );
  } else if (isBillingRegister) {
    heading = /* @__PURE__ */ jsx(Trans, { message: "First, let's create your account" });
  }
  const message2 = /* @__PURE__ */ jsx(
    Trans,
    {
      values: {
        a: (parts) => /* @__PURE__ */ jsx(Link, { className: LinkStyle, to: "/login", children: parts })
      },
      message: "Already have an account? <a>Sign in.</a>"
    }
  );
  return /* @__PURE__ */ jsxs(AuthLayout, { heading, message: message2, children: [
    /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Register" }) }),
    /* @__PURE__ */ jsxs(
      Form,
      {
        form,
        onSubmit: async (payload) => {
          const isValid = await verify();
          if (isValid) {
            register2.mutate(payload);
          }
        },
        children: [
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              className: "mb-32",
              name: "email",
              type: "email",
              disabled: !!searchParamsEmail,
              label: /* @__PURE__ */ jsx(Trans, { message: "Email" }),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              className: "mb-32",
              name: "password",
              type: "password",
              label: /* @__PURE__ */ jsx(Trans, { message: "Password" }),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              className: "mb-32",
              name: "password_confirmation",
              type: "password",
              label: /* @__PURE__ */ jsx(Trans, { message: "Confirm password" }),
              required: true
            }
          ),
          (auth == null ? void 0 : auth.registerFields) ? /* @__PURE__ */ jsx(auth.registerFields, {}) : null,
          /* @__PURE__ */ jsx(PolicyCheckboxes, {}),
          /* @__PURE__ */ jsx(
            Button,
            {
              className: "block w-full",
              type: "submit",
              variant: "flat",
              color: "primary",
              size: "md",
              disabled: register2.isPending || isVerifying,
              children: /* @__PURE__ */ jsx(Trans, { message: "Create account" })
            }
          ),
          /* @__PURE__ */ jsx(
            SocialAuthSection,
            {
              dividerMessage: social.compact_buttons ? /* @__PURE__ */ jsx(Trans, { message: "Or sign up with" }) : /* @__PURE__ */ jsx(Trans, { message: "OR" })
            }
          )
        ]
      }
    )
  ] });
}
function PolicyCheckboxes() {
  const {
    registration: { policies }
  } = useSettings();
  if (!policies)
    return null;
  return /* @__PURE__ */ jsx("div", { className: "mb-32", children: policies.map((policy) => /* @__PURE__ */ jsx(
    FormCheckbox,
    {
      name: policy.id,
      className: "mb-4 block",
      required: true,
      children: /* @__PURE__ */ jsx(
        Trans,
        {
          message: "I accept the :name",
          values: {
            name: /* @__PURE__ */ jsx(
              CustomMenuItem,
              {
                unstyled: true,
                className: () => LinkStyle,
                item: policy
              }
            )
          }
        }
      )
    },
    policy.id
  )) });
}
const endpoint$1 = (slugOrId) => `custom-pages/${slugOrId}`;
function useCustomPage(pageId) {
  const params = useParams();
  if (!pageId) {
    pageId = params.pageId;
  }
  return useQuery({
    queryKey: [endpoint$1(pageId)],
    queryFn: () => fetchCustomPage(pageId),
    initialData: () => {
      var _a2;
      const data = (_a2 = getBootstrapData().loaders) == null ? void 0 : _a2.customPage;
      if ((data == null ? void 0 : data.page) && (data.page.id == pageId || data.page.slug == pageId)) {
        return data;
      }
    }
  });
}
function fetchCustomPage(slugOrId) {
  return apiClient.get(endpoint$1(slugOrId)).then((response) => response.data);
}
const DarkModeIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M9.37 5.51c-.18.64-.27 1.31-.27 1.99 0 4.08 3.32 7.4 7.4 7.4.68 0 1.35-.09 1.99-.27C17.45 17.19 14.93 19 12 19c-3.86 0-7-3.14-7-7 0-2.93 1.81-5.45 4.37-6.49zM12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" }),
  "DarkModeOutlined"
);
const LightbulbIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" }),
  "LightbulbOutlined"
);
function useValueLists(names, params, options = {}) {
  return useQuery({
    queryKey: ["value-lists", names, params],
    queryFn: () => fetchValueLists(names, params),
    // if there are params, make sure we update lists when they change
    staleTime: !params ? Infinity : void 0,
    placeholderData: keepPreviousData,
    enabled: !options.disabled,
    initialData: () => {
      const previousData = queryClient.getQueriesData({ queryKey: ["ValueLists"] }).find(([, response]) => {
        if (response && names.every((n) => response[n])) {
          return response;
        }
        return null;
      });
      if (previousData) {
        return previousData[1];
      }
    }
  });
}
function fetchValueLists(names, params) {
  return apiClient.get(`value-lists/${names}`, { params }).then((response) => response.data);
}
const LanguageIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" }),
  "LanguageOutlined"
);
const KeyboardArrowDownIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" }),
  "KeyboardArrowDownOutlined"
);
function useChangeLocale() {
  const { mergeBootstrapData: mergeBootstrapData2 } = useBootstrapData();
  return useMutation({
    mutationFn: (props) => changeLocale(props),
    onSuccess: (response) => {
      mergeBootstrapData2({
        i18n: response.locale
      });
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function changeLocale(props) {
  return apiClient.post(`users/me/locale`, props).then((r) => r.data);
}
function LocaleSwitcher() {
  const { locale } = useSelectedLocale();
  const changeLocale2 = useChangeLocale();
  const { data } = useValueLists(["localizations"]);
  const { i18n } = useSettings();
  if (!(data == null ? void 0 : data.localizations) || !locale || !i18n.enable)
    return null;
  return /* @__PURE__ */ jsxs(
    MenuTrigger,
    {
      floatingWidth: "matchTrigger",
      selectionMode: "single",
      selectedValue: locale.language,
      onSelectionChange: (value) => {
        const newLocale = value;
        if (newLocale !== (locale == null ? void 0 : locale.language)) {
          changeLocale2.mutate({ locale: newLocale });
        }
      },
      children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            disabled: changeLocale2.isPending,
            className: "capitalize",
            startIcon: /* @__PURE__ */ jsx(LanguageIcon, {}),
            endIcon: /* @__PURE__ */ jsx(KeyboardArrowDownIcon, {}),
            children: locale.name
          }
        ),
        /* @__PURE__ */ jsx(Menu, { children: data.localizations.map((localization) => /* @__PURE__ */ jsx(
          Item$1,
          {
            value: localization.language,
            className: "capitalize",
            children: localization.name
          },
          localization.language
        )) })
      ]
    }
  );
}
const CookieSettingsForm = () => {
  const [activeTab, setActiveTab] = useState("privacy");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleToggle = (category) => {
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "ot-pc-content ot-pc-scrollbar ot-sdk-row",
      style: { height: "259px" },
      children: /* @__PURE__ */ jsxs("div", { className: "ot-sdk-container ot-grps-cntr ot-sdk-column", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "ot-sdk-four ot-sdk-columns ot-tab-list",
            "aria-label": "Cookie Categories",
            children: /* @__PURE__ */ jsx("ul", { className: "ot-cat-grp", role: "tablist", children: /* @__PURE__ */ jsx(
              "li",
              {
                className: `ot-abt-tab ${activeTab === "privacy" ? "ot-active-menu" : ""}`,
                role: "presentation",
                children: /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "category-menu-switch-handler",
                    role: "tab",
                    tabIndex: 0,
                    "aria-selected": activeTab === "privacy" ? "true" : "false",
                    onClick: () => handleTabClick("privacy"),
                    children: /* @__PURE__ */ jsx("h3", { children: "Your Privacy" })
                  }
                )
              }
            ) })
          }
        ),
        activeTab === "privacy" && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { children: "Privacy Settings" }),
          /* @__PURE__ */ jsxs("label", { children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                onChange: () => handleToggle()
              }
            ),
            "Example Category"
          ] })
        ] })
      ] })
    }
  );
};
function CookieSettings() {
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Cookie Preference Settings" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(CookieSettingsForm, {}) }),
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
      /* @__PURE__ */ jsx(Button, { variant: "flat", color: "primary", type: "submit", children: /* @__PURE__ */ jsx(Trans, { message: "Save" }) })
    ] })
  ] });
}
const CookieIcon = createSvgIcon(
  [/* @__PURE__ */ jsx("circle", { cx: "10.5", cy: "8.5", r: "1.5" }, "0"), /* @__PURE__ */ jsx("circle", { cx: "8.5", cy: "13.5", r: "1.5" }, "1"), /* @__PURE__ */ jsx("circle", { cx: "15", cy: "15", r: "1" }, "2"), /* @__PURE__ */ jsx("path", { d: "M21.95 10.99c-1.79-.03-3.7-1.95-2.68-4.22-2.97 1-5.78-1.59-5.19-4.56C7.11.74 2 6.41 2 12c0 5.52 4.48 10 10 10 5.89 0 10.54-5.08 9.95-11.01zM12 20c-4.41 0-8-3.59-8-8 0-3.31 2.73-8.18 8.08-8.02.42 2.54 2.44 4.56 4.99 4.94.07.36.52 2.55 2.92 3.63C19.7 16.86 16.06 20 12 20z" }, "3")],
  "CookieOutlined"
);
function FooterVersion({ className, padding }) {
  const { version } = useSettings();
  return /* @__PURE__ */ jsx("footer", { className: clsx("text-sm", padding ? padding : "", className), children: /* @__PURE__ */ jsx("div", { className: "mt-4 md:mt-0", children: /* @__PURE__ */ jsx(Link, { className: "px-10 transition-colors hover:text-fg-base", to: "/", children: /* @__PURE__ */ jsx("span", { className: "text-xs", children: /* @__PURE__ */ jsx(Trans, { message: "Version: :number", values: { number: version } }) }) }) }) });
}
function FooterCopyright({ className, padding }) {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const { branding, version } = useSettings();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth > 1024 && window.innerWidth <= 1205
  );
  useEffect(() => {
    const handleResize = () => {
      const windowWidth2 = window.innerWidth;
      setIsMobile(windowWidth2 <= 1024);
      setIsTablet(windowWidth2 > 1024 && windowWidth2 <= 1205);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const divClass = clsx({
    "mt-20 justify-center items-center text-center": isMobile,
    "mt-0": !isMobile
  });
  const copyrightClass = clsx({
    "flex flex-col justify-center items-center text-center": isMobile,
    "flex flex-col justify-between": !isMobile
  });
  const tabletClass = clsx({
    "pb-84 pt-50": isTablet,
    "": !isTablet
  });
  return /* @__PURE__ */ jsxs(
    "footer",
    {
      className: clsx(
        "left-0 right-0 top-0 p-16 text-sm",
        padding ? padding : "",
        tabletClass
      ),
      children: [
        /* @__PURE__ */ jsx(Menus$4, {}),
        /* @__PURE__ */ jsxs("div", { className: "items-center justify-between gap-10 text-muted md:flex md:text-left", children: [
          /* @__PURE__ */ jsxs("div", { className: copyrightClass, children: [
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { className: "px-10 transition-colors hover:text-fg-base", to: "/", children: /* @__PURE__ */ jsx("span", { className: "text-xs", children: /* @__PURE__ */ jsx(
              Trans,
              {
                message: `© ${year} | ${branding.site_name} | All Rights Reserved |`
              }
            ) }) }) }),
            /* @__PURE__ */ jsx(FooterVersion, {})
          ] }),
          /* @__PURE__ */ jsxs("div", { className: divClass, children: [
            /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
              /* @__PURE__ */ jsxs(Button, { variant: "text", children: [
                /* @__PURE__ */ jsx(CookieIcon, { className: "-ml-4 mr-8" }),
                /* @__PURE__ */ jsx(Trans, { message: "Cookies Preference" })
              ] }),
              /* @__PURE__ */ jsx(CookieSettings, {})
            ] }),
            /* @__PURE__ */ jsx(ThemeSwitcher$1, {}),
            /* @__PURE__ */ jsx(LocaleSwitcher, {})
          ] })
        ] })
      ]
    }
  );
}
function Menus$4() {
  const settings = useSettings();
  const primaryMenu = settings.menus.find(
    (m2) => {
      var _a2;
      return (_a2 = m2.positions) == null ? void 0 : _a2.includes("footer-terms");
    }
  );
  const secondaryMenu = settings.menus.find(
    (m2) => {
      var _a2;
      return (_a2 = m2.positions) == null ? void 0 : _a2.includes("footer-terms-two");
    }
  );
  if (!primaryMenu && !secondaryMenu)
    return null;
  return /* @__PURE__ */ jsxs("div", { className: "mb-14 flex items-center justify-between gap-10 overflow-x-auto px-10 pb-14 md:flex", children: [
    primaryMenu && /* @__PURE__ */ jsx(CustomMenu, { menu: primaryMenu, className: "text-muted" }),
    secondaryMenu && /* @__PURE__ */ jsx(CustomMenu, { menu: secondaryMenu, className: "mb:mt-0 text-muted" })
  ] });
}
function ThemeSwitcher$1() {
  const { themes } = useSettings();
  const { selectedTheme, selectTheme } = useThemeSelector();
  if (!selectedTheme || !(themes == null ? void 0 : themes.user_change))
    return null;
  return /* @__PURE__ */ jsx(
    Button,
    {
      variant: "text",
      startIcon: selectedTheme.is_dark ? /* @__PURE__ */ jsx(DarkModeIcon, {}) : /* @__PURE__ */ jsx(LightbulbIcon, {}),
      onClick: () => {
        if (selectedTheme.is_dark) {
          selectTheme("light");
        } else {
          selectTheme("dark");
        }
      },
      children: selectedTheme.is_dark ? /* @__PURE__ */ jsx(Trans, { message: "Dark mode" }) : /* @__PURE__ */ jsx(Trans, { message: "Light mode" })
    }
  );
}
function FooterLogoDesktop({
  color,
  logoColor,
  isDarkMode
}) {
  const { trans } = useTrans();
  const { branding } = useSettings();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1205);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1205);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  let desktopLogo;
  let mobileLogo;
  if (isDarkMode || !branding.logo_dark || logoColor !== "dark" && color !== "bg" && color !== "bg-alt") {
    desktopLogo = branding.logo_light;
    mobileLogo = branding.logo_light_mobile;
  } else {
    desktopLogo = branding.logo_dark;
    mobileLogo = branding.logo_dark_mobile;
  }
  if (!mobileLogo && !desktopLogo) {
    return null;
  }
  return /* @__PURE__ */ jsx("div", { className: "flex", children: /* @__PURE__ */ jsx(
    Link,
    {
      to: "/",
      className: `block h-full max-h-26 flex-shrink-0 md:max-h-36 ${isMobile ? "mx-auto" : "ml-4 mr-4 md:mr-24"}`,
      "aria-label": trans({ message: "Go to homepage" }),
      children: /* @__PURE__ */ jsxs("picture", { children: [
        /* @__PURE__ */ jsx(
          "source",
          {
            srcSet: mobileLogo || desktopLogo,
            media: "(max-width: 768px)"
          }
        ),
        /* @__PURE__ */ jsx("source", { srcSet: desktopLogo, media: "(min-width: 769px)" }),
        /* @__PURE__ */ jsx(
          "img",
          {
            className: "block h-auto max-w-[50px]",
            alt: trans({ message: "Site logo" })
          }
        )
      ] })
    }
  ) });
}
const MailIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0-8 4.99L4 6h16zm0 12H4V8l8 5 8-5v10z" }),
  "MailOutlined"
);
function NewsletterSettingsForm() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    plan: "FREE",
    attendedWebinar: "True"
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };
  return /* @__PURE__ */ jsxs("div", { className: "card relative", children: [
    /* @__PURE__ */ jsxs("div", { className: "title-container flex-vertical", children: [
      /* @__PURE__ */ jsx("h3", { children: "Example Newsletter Subscribe form" }),
      /* @__PURE__ */ jsx("p", { children: "Be the first to know the latest challenges, live shows, opportunities, and more!" })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          name: "name",
          value: formData.name,
          onChange: handleChange,
          placeholder: "Name"
        }
      ),
      /* @__PURE__ */ jsx("button", { type: "submit", children: "Subscribe" })
    ] })
  ] });
}
function NewsletterSettings() {
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Join our newsletter" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(NewsletterSettingsForm, {}) }),
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
      /* @__PURE__ */ jsx(Button, { variant: "flat", color: "primary", type: "submit", children: /* @__PURE__ */ jsx(Trans, { message: "Save" }) })
    ] })
  ] });
}
function PwaButton({ link: link2, altText }) {
  const imageSource = "/images/mobile-apps/pwa.png";
  return /* @__PURE__ */ jsx("a", { href: link2, target: "_blank", rel: "noopener noreferrer", children: /* @__PURE__ */ jsx(
    "img",
    {
      src: imageSource,
      alt: altText,
      className: "h-auto max-w-[100px]"
    }
  ) });
}
function GooglePlayButton({ link: link2, altText }) {
  const imageSource = "/images/mobile-apps/google-play.png";
  return /* @__PURE__ */ jsx("a", { href: link2, target: "_blank", rel: "noopener noreferrer", children: /* @__PURE__ */ jsx(
    "img",
    {
      src: imageSource,
      alt: altText,
      className: "h-auto max-w-[100px]"
    }
  ) });
}
function AppleStoreButton({ link: link2, altText }) {
  const imageSource = "/images/mobile-apps/apple-store.png";
  return /* @__PURE__ */ jsx("a", { href: link2, target: "_blank", rel: "noopener noreferrer", children: /* @__PURE__ */ jsx(
    "img",
    {
      src: imageSource,
      alt: altText,
      className: "h-auto max-w-[100px]"
    }
  ) });
}
function Menus$3({
  menuPosition,
  className
}) {
  const settings = useSettings();
  const menu = settings.menus.find((m2) => {
    var _a2;
    return (_a2 = m2.positions) == null ? void 0 : _a2.includes(menuPosition);
  });
  if (!menu)
    return null;
  return /* @__PURE__ */ jsx(
    CustomMenu,
    {
      menu,
      className: className || "transition-colors hover:text-fg-base"
    }
  );
}
function FooterLinksDesktop({ className, padding }) {
  const { branding, version } = useSettings();
  return /* @__PURE__ */ jsx(
    "footer",
    {
      className: clsx(
        "border-b border-t p-16 text-sm",
        padding ? padding : "pb-50 pt-50",
        className
      ),
      children: /* @__PURE__ */ jsx("div", { className: "mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-span-1 mb-6 md:col-span-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "col-span-1 mb-6 border-b pb-20 md:col-span-1", children: [
            /* @__PURE__ */ jsx("div", { className: "col-span-1 mb-6 px-10 pb-20 md:col-span-1", children: /* @__PURE__ */ jsx(FooterLogoDesktop, {}) }),
            /* @__PURE__ */ jsx("div", { className: "mt-20 px-10 pb-20 text-muted", children: /* @__PURE__ */ jsx("h3", { children: /* @__PURE__ */ jsx(Trans, { message: `${branding.site_name} | ${branding.site_description}` }) }) }),
            /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
              /* @__PURE__ */ jsxs(Button, { variant: "text", children: [
                /* @__PURE__ */ jsx(MailIcon, { className: "-ml-4 mr-8" }),
                /* @__PURE__ */ jsx(Trans, { message: "Subscribe to our Newsletter" })
              ] }),
              /* @__PURE__ */ jsx(NewsletterSettings, {})
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "col-span-1 mb-6 md:col-span-1", children: [
            /* @__PURE__ */ jsx("div", { className: "mt-20 px-10 pb-20 text-muted", children: /* @__PURE__ */ jsx("h3", { children: /* @__PURE__ */ jsx(Trans, { message: "Listen Anytime, Anywhere. From Any Device." }) }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-10 px-10", children: [
              /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
                PwaButton,
                {
                  link: "https://example.com",
                  altText: "Download Pwa App"
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
                GooglePlayButton,
                {
                  link: "https://example.com",
                  altText: "Download Android App"
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
                AppleStoreButton,
                {
                  link: "https://example.com",
                  altText: "Download Ios App"
                }
              ) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-span-1 mb-6 md:col-span-1", children: [
          /* @__PURE__ */ jsx("h6", { className: "mb-4 pb-20 font-bold uppercase", children: /* @__PURE__ */ jsx(Trans, { message: `${branding.site_name}` }) }),
          /* @__PURE__ */ jsx(
            Menus$3,
            {
              menuPosition: "footer-company",
              className: "flex flex-col items-start gap-0 text-muted"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-span-1 mb-6 md:col-span-1", children: [
          /* @__PURE__ */ jsx("h6", { className: "mb-4 pb-20 font-bold uppercase", children: /* @__PURE__ */ jsx(Trans, { message: "Support" }) }),
          /* @__PURE__ */ jsx(
            Menus$3,
            {
              menuPosition: "footer-support",
              className: "flex flex-col items-start gap-0 text-muted"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-span-1 mb-6 md:col-span-1", children: [
          /* @__PURE__ */ jsx("h6", { className: "mb-4 pb-20 font-bold uppercase", children: /* @__PURE__ */ jsx(Trans, { message: "Extra" }) }),
          /* @__PURE__ */ jsx(
            Menus$3,
            {
              menuPosition: "footer-extra",
              className: "flex flex-col items-start gap-0 text-muted"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-span-1 mb-6 md:col-span-1", children: [
          /* @__PURE__ */ jsx("h6", { className: "mb-4 pb-20 font-bold uppercase", children: /* @__PURE__ */ jsx(Trans, { message: "Social Media" }) }),
          /* @__PURE__ */ jsx(
            Menus$3,
            {
              menuPosition: "footer-media",
              className: "flex flex-col items-start gap-0 text-muted"
            }
          )
        ] })
      ] }) })
    }
  );
}
function FooterLogoMobile({
  color,
  logoColor,
  isDarkMode
}) {
  const { trans } = useTrans();
  const { branding } = useSettings();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1205);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1205);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  let desktopLogo;
  let mobileLogo;
  if (isDarkMode || !branding.logo_dark || logoColor !== "dark" && color !== "bg" && color !== "bg-alt") {
    desktopLogo = branding.logo_light;
    mobileLogo = branding.logo_light_mobile;
  } else {
    desktopLogo = branding.logo_dark;
    mobileLogo = branding.logo_dark_mobile;
  }
  if (!mobileLogo && !desktopLogo) {
    return null;
  }
  return /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(
    Link,
    {
      to: "/",
      className: `block h-full max-h-26 flex-shrink-0 md:max-h-36 ${isMobile ? "mx-auto" : "ml-4 mr-4 md:mr-24"}`,
      "aria-label": trans({ message: "Go to homepage" }),
      children: /* @__PURE__ */ jsxs("picture", { children: [
        /* @__PURE__ */ jsx(
          "source",
          {
            srcSet: mobileLogo || desktopLogo,
            media: "(max-width: 768px)"
          }
        ),
        /* @__PURE__ */ jsx("source", { srcSet: desktopLogo, media: "(min-width: 769px)" }),
        /* @__PURE__ */ jsx(
          "img",
          {
            className: "block h-auto max-w-[50px]",
            alt: trans({ message: "Site logo" })
          }
        )
      ] })
    }
  ) });
}
const AccordionItem = ({
  title,
  children
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  return /* @__PURE__ */ jsxs("div", { className: "mb-6 w-full", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "flex cursor-pointer items-center justify-between",
        onClick: toggleAccordion,
        children: [
          /* @__PURE__ */ jsx("h3", { children: title }),
          /* @__PURE__ */ jsx("span", { children: isOpen ? "-" : "+" })
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsx("div", { className: "flex flex-col items-start gap-0 text-muted", children })
  ] });
};
const Menus$2 = ({
  menuPosition,
  className
}) => {
  const settings = useSettings();
  const menu = settings.menus.find((m2) => {
    var _a2;
    return (_a2 = m2.positions) == null ? void 0 : _a2.includes(menuPosition);
  });
  if (!menu)
    return null;
  return /* @__PURE__ */ jsx(
    CustomMenu,
    {
      menu,
      className: className || "transition-colors hover:text-fg-base"
    }
  );
};
function FooterLinksMobile({ className, padding }) {
  const { branding, version } = useSettings();
  return /* @__PURE__ */ jsx(
    "footer",
    {
      className: clsx(
        "border-b border-t p-16 text-sm",
        padding ? padding : "pb-50 pt-50",
        className,
        "left-0 right-0 top-0"
      ),
      children: /* @__PURE__ */ jsx("div", { className: "mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center text-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-span-1 mb-6 md:col-span-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "col-span-1 mb-6 border-b pb-20 md:col-span-1", children: [
            /* @__PURE__ */ jsx("div", { className: "col-span-1 mb-6 justify-center px-10 pb-20 md:col-span-1", children: /* @__PURE__ */ jsx(FooterLogoMobile, {}) }),
            /* @__PURE__ */ jsx("div", { className: "mt-20 px-10 pb-20 text-muted", children: /* @__PURE__ */ jsx("h3", { children: /* @__PURE__ */ jsx(
              Trans,
              {
                message: `${branding.site_name} | ${branding.site_description}`
              }
            ) }) }),
            /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
              /* @__PURE__ */ jsxs(Button, { variant: "text", children: [
                /* @__PURE__ */ jsx(MailIcon, { className: "-ml-4 mr-8" }),
                /* @__PURE__ */ jsx(Trans, { message: "Subscribe to our Newsletter" })
              ] }),
              /* @__PURE__ */ jsx(NewsletterSettings, {})
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "col-span-1 mb-6 md:col-span-1", children: [
            /* @__PURE__ */ jsx("div", { className: "mt-20 px-10 pb-20 text-muted", children: /* @__PURE__ */ jsx("h3", { children: /* @__PURE__ */ jsx(Trans, { message: "Listen Anytime, Anywhere. From Any Device." }) }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-10 px-10", children: [
              /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
                PwaButton,
                {
                  link: "https://example.com",
                  altText: "Download Pwa App"
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
                GooglePlayButton,
                {
                  link: "https://example.com",
                  altText: "Download Android App"
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
                AppleStoreButton,
                {
                  link: "https://example.com",
                  altText: "Download Ios App"
                }
              ) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "col-span-1 mb-6 mt-20 w-full md:col-span-1", children: /* @__PURE__ */ jsx(AccordionItem, { title: "#BEATBOSS", children: /* @__PURE__ */ jsx(
          Menus$2,
          {
            menuPosition: "footer-company",
            className: "flex flex-col items-start gap-0 text-muted"
          }
        ) }) }),
        /* @__PURE__ */ jsx("div", { className: "col-span-1 mb-6 w-full md:col-span-1", children: /* @__PURE__ */ jsx(AccordionItem, { title: "Support", children: /* @__PURE__ */ jsx(
          Menus$2,
          {
            menuPosition: "footer-support",
            className: "flex flex-col items-start gap-0 text-muted"
          }
        ) }) }),
        /* @__PURE__ */ jsx("div", { className: "col-span-1 mb-6 w-full md:col-span-1", children: /* @__PURE__ */ jsx(AccordionItem, { title: "Extra", children: /* @__PURE__ */ jsx(
          Menus$2,
          {
            menuPosition: "footer-extra",
            className: "flex flex-col items-start gap-0 text-muted"
          }
        ) }) }),
        /* @__PURE__ */ jsx("div", { className: "col-span-1 mb-6 w-full md:col-span-1", children: /* @__PURE__ */ jsx(AccordionItem, { title: "Social Media", children: /* @__PURE__ */ jsx(
          Menus$2,
          {
            menuPosition: "footer-media",
            className: "flex flex-col items-start gap-0 text-muted"
          }
        ) }) })
      ] }) })
    }
  );
}
function FooterLinks({ className, padding }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1205);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1205);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return /* @__PURE__ */ jsx("footer", { children: isMobile ? /* @__PURE__ */ jsx(FooterLinksMobile, {}) : /* @__PURE__ */ jsx(FooterLinksDesktop, {}) });
}
function Footer({ className, padding }) {
  (/* @__PURE__ */ new Date()).getFullYear();
  useSettings();
  return /* @__PURE__ */ jsxs(
    "footer",
    {
      className: clsx(
        "text-sm",
        padding ? padding : "pt-54",
        className
      ),
      children: [
        /* @__PURE__ */ jsx(Menus$1, {}),
        /* @__PURE__ */ jsxs("div", { className: "ml-60 mr-60", children: [
          /* @__PURE__ */ jsx(FooterLinks, {}),
          /* @__PURE__ */ jsx(FooterCopyright, {})
        ] })
      ]
    }
  );
}
function Menus$1() {
  const settings = useSettings();
  const primaryMenu = settings.menus.find((m2) => {
    var _a2;
    return (_a2 = m2.positions) == null ? void 0 : _a2.includes("footer");
  });
  const secondaryMenu = settings.menus.find(
    (m2) => {
      var _a2;
      return (_a2 = m2.positions) == null ? void 0 : _a2.includes("footer-secondary");
    }
  );
  if (!primaryMenu && !secondaryMenu)
    return null;
  return /* @__PURE__ */ jsxs("div", { className: "mb-14 items-center justify-between gap-10 overflow-x-auto border-b pb-14 md:flex", children: [
    primaryMenu && /* @__PURE__ */ jsx(CustomMenu, { menu: primaryMenu, className: "text-primary" }),
    secondaryMenu && /* @__PURE__ */ jsx(CustomMenu, { menu: secondaryMenu, className: "mb:mt-0 mt-14 text-muted" })
  ] });
}
function highlightCode(el) {
  import("./assets/highlight-917b1416.mjs").then(({ hljs }) => {
    el.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block);
    });
  });
}
function CustomPageBody({ page }) {
  const bodyRef = useRef(null);
  useEffect(() => {
    if (bodyRef.current) {
      highlightCode(bodyRef.current);
    }
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "px-16 md:px-24", children: /* @__PURE__ */ jsxs("div", { className: "custom-page-body prose mx-auto my-50 dark:prose-invert", children: [
    /* @__PURE__ */ jsx("h1", { children: page.title }),
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: bodyRef,
        className: "whitespace-pre-wrap break-words",
        dangerouslySetInnerHTML: { __html: page.body }
      }
    )
  ] }) });
}
function DefaultMetaTags() {
  const {
    data: { default_meta_tags }
  } = useBootstrapData();
  return /* @__PURE__ */ jsx(Helmet, { tags: default_meta_tags });
}
function PageMetaTags({ query }) {
  var _a2, _b2;
  if ((_a2 = query.data) == null ? void 0 : _a2.set_seo) {
    return null;
  }
  return ((_b2 = query.data) == null ? void 0 : _b2.seo) ? /* @__PURE__ */ jsx(Helmet, { tags: query.data.seo }) : /* @__PURE__ */ jsx(DefaultMetaTags, {});
}
function IllustratedMessage({
  image,
  title,
  description,
  action,
  className,
  size: size2 = "md",
  imageHeight,
  imageMargin = "mb-24"
}) {
  const style = getSizeClassName$1(size2, imageHeight);
  return /* @__PURE__ */ jsxs("div", { className: clsx("text-center", className), children: [
    image && /* @__PURE__ */ jsx("div", { className: clsx(style.image, imageMargin), children: image }),
    title && /* @__PURE__ */ jsx("div", { className: clsx(style.title, "mb-2 text-main"), children: title }),
    description && /* @__PURE__ */ jsx("div", { className: clsx(style.description, "text-muted"), children: description }),
    action && /* @__PURE__ */ jsx("div", { className: "mt-20", children: action })
  ] });
}
function getSizeClassName$1(size2, imageHeight) {
  switch (size2) {
    case "xs":
      return {
        image: imageHeight || "h-60",
        title: "text-sm",
        description: "text-xs"
      };
    case "sm":
      return {
        image: imageHeight || "h-80",
        title: "text-base",
        description: "text-sm"
      };
    default:
      return {
        image: imageHeight || "h-128",
        title: "text-lg",
        description: "text-base"
      };
  }
}
const ErrorIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" }),
  "ErrorOutlined"
);
function PageErrorMessage() {
  return /* @__PURE__ */ jsx(
    IllustratedMessage,
    {
      className: "mt-40",
      image: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(ErrorIcon, { size: "xl" }) }),
      imageHeight: "h-auto",
      title: /* @__PURE__ */ jsx(Trans, { message: "There was an issue loading this page" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Please try again later" })
    }
  );
}
const defaultOptions = {
  delay: 500,
  minDuration: 200
};
function useSpinDelay(loading, options) {
  options = Object.assign({}, defaultOptions, options);
  const [state, setState] = useState("IDLE");
  const timeout = useRef(null);
  useEffect(() => {
    if (loading && state === "IDLE") {
      clearTimeout(timeout.current);
      timeout.current = setTimeout(
        () => {
          if (!loading) {
            return setState("IDLE");
          }
          timeout.current = setTimeout(
            () => {
              setState("EXPIRE");
            },
            options == null ? void 0 : options.minDuration
          );
          setState("DISPLAY");
        },
        options == null ? void 0 : options.delay
      );
      setState("DELAY");
    }
    if (!loading && state !== "DISPLAY") {
      clearTimeout(timeout.current);
      setState("IDLE");
    }
  }, [loading, state, options.delay, options.minDuration]);
  useEffect(() => {
    return () => clearTimeout(timeout.current);
  }, []);
  return state === "DISPLAY" || state === "EXPIRE";
}
function PageStatus({
  query,
  show404 = true,
  loader,
  loaderClassName,
  loaderIsScreen = true,
  delayedSpinner = true,
  redirectOn404
}) {
  const { isLoggedIn } = useAuth();
  const showSpinner = useSpinDelay(query.isLoading, {
    delay: 500,
    minDuration: 200
  });
  if (query.isLoading) {
    if (!showSpinner && delayedSpinner) {
      return null;
    }
    return loader || /* @__PURE__ */ jsx(FullPageLoader, { className: loaderClassName, screen: loaderIsScreen });
  }
  if (query.isError && (errorStatusIs(query.error, 401) || errorStatusIs(query.error, 403)) && !isLoggedIn) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/login", replace: true });
  }
  if (show404 && query.isError && errorStatusIs(query.error, 404)) {
    if (redirectOn404) {
      return /* @__PURE__ */ jsx(Navigate, { to: redirectOn404, replace: true });
    }
    return /* @__PURE__ */ jsx(NotFoundPage, {});
  }
  return /* @__PURE__ */ jsx(PageErrorMessage, {});
}
function usePrimaryArtistForCurrentUser() {
  var _a2;
  const { user } = useAuth();
  return (_a2 = user == null ? void 0 : user.artists) == null ? void 0 : _a2.find((a) => a.role === "artist");
}
const MicIcon = createSvgIcon(
  [/* @__PURE__ */ jsx("path", { d: "M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" }, "0"), /* @__PURE__ */ jsx("path", { d: "M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" }, "1")],
  "MicOutlined"
);
function ArtistLink({ artist, className, ...linkProps }) {
  const finalUri = useMemo(() => {
    return getArtistLink(artist);
  }, [artist]);
  return /* @__PURE__ */ jsx(
    Link,
    {
      ...linkProps,
      className: clsx(
        "overflow-x-hidden overflow-ellipsis outline-none hover:underline focus-visible:underline",
        className
      ),
      to: finalUri,
      children: artist.name
    }
  );
}
function getArtistLink(artist, { absolute } = {}) {
  let link2 = `/artist/${artist.id}/${slugifyString(artist.name)}`;
  if (absolute) {
    link2 = `${getBootstrapData().settings.base_url}${link2}`;
  }
  return link2;
}
const NotificationsIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" }),
  "NotificationsOutlined"
);
function Badge({
  children,
  className,
  withBorder = true,
  top = "top-2",
  right = "right-4"
}) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: clsx(
        "absolute flex items-center justify-center whitespace-nowrap rounded-full bg-warning text-xs font-bold text-white shadow",
        withBorder && "border-2 border-white",
        children ? "h-18 w-18" : "h-12 w-12",
        className,
        top,
        right
      ),
      children
    }
  );
}
const DoneAllIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "m18 7-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41 6 19l1.41-1.41L1.83 12 .41 13.41z" }),
  "DoneAllOutlined"
);
const notifySvg = "/assets/notify-08766a3d.svg";
function NotificationEmptyStateMessage() {
  const { notif } = useSettings();
  return /* @__PURE__ */ jsx(
    IllustratedMessage,
    {
      size: "sm",
      image: /* @__PURE__ */ jsx(SvgImage, { src: notifySvg }),
      title: /* @__PURE__ */ jsx(Trans, { message: "Hang tight!" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Notifications will start showing up here soon." }),
      action: notif.subs.integrated && /* @__PURE__ */ jsx(
        Button,
        {
          elementType: Link,
          variant: "outline",
          to: "/notifications/settings",
          size: "xs",
          color: "primary",
          children: /* @__PURE__ */ jsx(Trans, { message: "Notification settings" })
        }
      )
    }
  );
}
const SettingsIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" }),
  "SettingsOutlined"
);
function NotificationDialogTrigger({
  className
}) {
  const { user } = useAuth();
  const { notif } = useSettings();
  const query = useUserNotifications();
  const markAsRead = useMarkNotificationsAsRead();
  const hasUnread = !!(user == null ? void 0 : user.unread_notifications_count);
  const handleMarkAsRead = () => {
    if (!query.data)
      return;
    markAsRead.mutate({
      markAllAsUnread: true
    });
  };
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "popover", children: [
    /* @__PURE__ */ jsx(
      IconButton,
      {
        size: "md",
        className,
        badge: hasUnread ? /* @__PURE__ */ jsx(Badge, { className: "max-md:hidden", children: user == null ? void 0 : user.unread_notifications_count }) : void 0,
        children: /* @__PURE__ */ jsx(NotificationsIcon, {})
      }
    ),
    /* @__PURE__ */ jsxs(Dialog, { children: [
      /* @__PURE__ */ jsx(
        DialogHeader,
        {
          showDivider: true,
          actions: !hasUnread && notif.subs.integrated && /* @__PURE__ */ jsx(
            IconButton,
            {
              className: "text-muted",
              size: "sm",
              elementType: Link,
              to: "/notifications/settings",
              target: "_blank",
              children: /* @__PURE__ */ jsx(SettingsIcon, {})
            }
          ),
          rightAdornment: hasUnread && /* @__PURE__ */ jsx(
            Button,
            {
              variant: "text",
              color: "primary",
              size: "xs",
              startIcon: /* @__PURE__ */ jsx(DoneAllIcon, {}),
              onClick: handleMarkAsRead,
              disabled: markAsRead.isPending,
              className: "max-md:hidden",
              children: /* @__PURE__ */ jsx(Trans, { message: "Mark all as read" })
            }
          ),
          children: /* @__PURE__ */ jsx(Trans, { message: "Notifications" })
        }
      ),
      /* @__PURE__ */ jsx(DialogBody, { padding: "p-0", children: /* @__PURE__ */ jsx(DialogContent, {}) })
    ] })
  ] });
}
function DialogContent() {
  const { data, isLoading } = useUserNotifications();
  if (isLoading) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center px-24 py-20", children: /* @__PURE__ */ jsx(ProgressCircle, { "aria-label": "Loading notifications...", isIndeterminate: true }) });
  }
  if (!(data == null ? void 0 : data.pagination.data.length)) {
    return /* @__PURE__ */ jsx("div", { className: "px-24 py-20", children: /* @__PURE__ */ jsx(NotificationEmptyStateMessage, {}) });
  }
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(NotificationList, { notifications: data.pagination.data }) });
}
const MenuIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" }),
  "MenuOutlined"
);
const PersonIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" }),
  "PersonOutlined"
);
const ArrowDropDownIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "m7 10 5 5 5-5H7z" }),
  "ArrowDropDownOutlined"
);
const PaymentsIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M19 14V6c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-2 0H3V6h14v8zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm13 0v11c0 1.1-.9 2-2 2H4v-2h17V7h2z" }),
  "PaymentsOutlined"
);
const AccountCircleIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z" }),
  "AccountCircleOutlined"
);
const LightModeIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M12 9c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3m0-2c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" }),
  "LightModeOutlined"
);
const ExitToAppIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M10.09 15.59 11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" }),
  "ExitToAppOutlined"
);
function NavbarAuthMenu({ children, items }) {
  const { auth } = useContext(SiteConfigContext);
  const logout2 = useLogout();
  const menu = useCustomMenu("auth-dropdown");
  const { notifications, themes } = useSettings();
  const { user, isSubscribed } = useAuth();
  const navigate = useNavigate();
  const { selectedTheme, selectTheme } = useThemeSelector();
  if (!selectedTheme || !user)
    return null;
  const hasUnreadNotif = !!user.unread_notifications_count;
  const notifMenuItem = /* @__PURE__ */ jsxs(
    Item$1,
    {
      className: "md:hidden",
      value: "notifications",
      startIcon: /* @__PURE__ */ jsx(NotificationsIcon, {}),
      onSelected: () => {
        navigate("/notifications");
      },
      children: [
        /* @__PURE__ */ jsx(Trans, { message: "Notifications" }),
        hasUnreadNotif ? ` (${user.unread_notifications_count})` : void 0
      ]
    }
  );
  const billingMenuItem = /* @__PURE__ */ jsx(
    Item$1,
    {
      value: "billing",
      startIcon: /* @__PURE__ */ jsx(PaymentsIcon, {}),
      onSelected: () => {
        navigate("/billing");
      },
      children: /* @__PURE__ */ jsx(Trans, { message: "Billing" })
    }
  );
  return /* @__PURE__ */ jsxs(MenuTrigger, { children: [
    children,
    /* @__PURE__ */ jsxs(Menu, { children: [
      menu && menu.items.map((item) => {
        const Icon = item.icon && createSvgIconFromTree(item.icon);
        return /* @__PURE__ */ jsx(
          Item$1,
          {
            value: item.id,
            startIcon: Icon && /* @__PURE__ */ jsx(Icon, {}),
            onSelected: () => {
              if (item.type === "link") {
                window.open(item.action, "_blank");
              } else {
                navigate(item.action);
              }
            },
            children: /* @__PURE__ */ jsx(Trans, { message: item.label })
          },
          item.id
        );
      }),
      auth.getUserProfileLink && /* @__PURE__ */ jsx(
        Item$1,
        {
          value: "profile",
          startIcon: /* @__PURE__ */ jsx(AccountCircleIcon, {}),
          onSelected: () => {
            navigate(auth.getUserProfileLink(user));
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Profile page" })
        }
      ),
      items == null ? void 0 : items.map((item) => item),
      (notifications == null ? void 0 : notifications.integrated) ? notifMenuItem : void 0,
      isSubscribed && billingMenuItem,
      (themes == null ? void 0 : themes.user_change) && !selectedTheme.is_dark && /* @__PURE__ */ jsx(
        Item$1,
        {
          value: "light",
          startIcon: /* @__PURE__ */ jsx(DarkModeIcon, {}),
          onSelected: () => {
            selectTheme("dark");
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Dark mode" })
        }
      ),
      (themes == null ? void 0 : themes.user_change) && selectedTheme.is_dark && /* @__PURE__ */ jsx(
        Item$1,
        {
          value: "dark",
          startIcon: /* @__PURE__ */ jsx(LightModeIcon, {}),
          onSelected: () => {
            selectTheme("light");
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Light mode" })
        }
      ),
      /* @__PURE__ */ jsx(
        Item$1,
        {
          value: "logout",
          startIcon: /* @__PURE__ */ jsx(ExitToAppIcon, {}),
          onSelected: () => {
            logout2.mutate();
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Log out" })
        }
      )
    ] })
  ] });
}
function NavbarAuthUser({ items = [] }) {
  const { user } = useAuth();
  const { selectedTheme } = useThemeSelector();
  if (!selectedTheme || !user)
    return null;
  const hasUnreadNotif = !!user.unread_notifications_count;
  const mobileButton = /* @__PURE__ */ jsx(
    IconButton,
    {
      size: "md",
      className: "md:hidden",
      role: "presentation",
      "aria-label": "toggle authentication menu",
      badge: hasUnreadNotif ? /* @__PURE__ */ jsx(Badge, { children: user.unread_notifications_count }) : void 0,
      children: /* @__PURE__ */ jsx(PersonIcon, {})
    }
  );
  const desktopButton = /* @__PURE__ */ jsxs(ButtonBase, { className: "flex items-center max-md:hidden", role: "presentation", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        className: "mr-12 h-32 w-32 flex-shrink-0 rounded object-cover",
        src: user.avatar,
        alt: ""
      }
    ),
    /* @__PURE__ */ jsx("span", { className: "mr-2 block max-w-124 overflow-x-hidden overflow-ellipsis text-sm", children: user.display_name }),
    /* @__PURE__ */ jsx(ArrowDropDownIcon, { className: "block icon-sm" })
  ] });
  return /* @__PURE__ */ jsx(NavbarAuthMenu, { items, children: /* @__PURE__ */ jsxs("span", { role: "button", children: [
    mobileButton,
    desktopButton
  ] }) });
}
function NavbarAuthButtons({
  primaryButtonColor,
  navbarColor
}) {
  if (!primaryButtonColor) {
    primaryButtonColor = navbarColor === "primary" ? "paper" : "primary";
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(MobileButtons, {}),
    /* @__PURE__ */ jsx(DesktopButtons, { primaryButtonColor })
  ] });
}
function DesktopButtons({ primaryButtonColor }) {
  const { registration } = useSettings();
  return /* @__PURE__ */ jsxs("div", { className: "text-sm max-md:hidden", children: [
    !registration.disable && /* @__PURE__ */ jsx(
      Button,
      {
        elementType: Link,
        to: "/register",
        variant: "text",
        className: "mr-10",
        children: /* @__PURE__ */ jsx(Trans, { message: "Register" })
      }
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        elementType: Link,
        to: "/login",
        variant: "raised",
        color: primaryButtonColor,
        children: /* @__PURE__ */ jsx(Trans, { message: "Login" })
      }
    )
  ] });
}
function MobileButtons() {
  const { registration } = useSettings();
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs(MenuTrigger, { children: [
    /* @__PURE__ */ jsx(IconButton, { size: "md", className: "md:hidden", children: /* @__PURE__ */ jsx(PersonIcon, {}) }),
    /* @__PURE__ */ jsxs(Menu, { children: [
      /* @__PURE__ */ jsx(Item$1, { value: "login", onSelected: () => navigate("/login"), children: /* @__PURE__ */ jsx(Trans, { message: "Login" }) }),
      !registration.disable && /* @__PURE__ */ jsx(Item$1, { value: "register", onSelected: () => navigate("/register"), children: /* @__PURE__ */ jsx(Trans, { message: "Register" }) })
    ] })
  ] });
}
function useDarkThemeVariables() {
  var _a2;
  const { data } = useBootstrapData();
  const isDarkMode = useIsDarkMode();
  if (isDarkMode) {
    return void 0;
  }
  return (_a2 = data.themes.all.find((theme) => theme.is_dark && theme.default_dark)) == null ? void 0 : _a2.values;
}
function Logo({ color, logoColor, isDarkMode, className }) {
  const { trans } = useTrans();
  const { branding } = useSettings();
  let desktopLogo;
  let mobileLogo;
  if (isDarkMode || !branding.logo_dark || logoColor !== "dark" && color !== "bg" && color !== "bg-alt") {
    desktopLogo = branding.logo_light;
    mobileLogo = branding.logo_light_mobile;
  } else {
    desktopLogo = branding.logo_dark;
    mobileLogo = branding.logo_dark_mobile;
  }
  if (!mobileLogo && !desktopLogo) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    Link,
    {
      to: "/",
      className: clsx(
        "mr-4 block h-full max-h-26 flex-shrink-0 md:mr-24 md:max-h-36",
        className
      ),
      "aria-label": trans({ message: "Go to homepage" }),
      children: /* @__PURE__ */ jsxs("picture", { children: [
        /* @__PURE__ */ jsx("source", { srcSet: mobileLogo || desktopLogo, media: "(max-width: 768px)" }),
        /* @__PURE__ */ jsx("source", { srcSet: desktopLogo, media: "(min-width: 768px)" }),
        /* @__PURE__ */ jsx(
          "img",
          {
            className: "block h-full max-h-26 w-auto md:max-h-36",
            alt: trans({ message: "Site logo" })
          }
        )
      ] })
    }
  );
}
function useLightThemeVariables() {
  var _a2;
  const { data } = useBootstrapData();
  return (_a2 = data.themes.all.find((theme) => !theme.is_dark && theme.default_light)) == null ? void 0 : _a2.values;
}
function Navbar(props) {
  let {
    hideLogo,
    toggleButton,
    children,
    className,
    border,
    size: size2 = "md",
    color,
    textColor: textColor2,
    darkModeColor,
    rightChildren,
    menuPosition,
    logoColor,
    primaryButtonColor,
    authMenuItems,
    alwaysDarkMode = false,
    wrapInContainer = false
  } = props;
  const isDarkMode = useIsDarkMode() || alwaysDarkMode;
  const { notifications } = useSettings();
  const { isLoggedIn } = useAuth();
  const darkThemeVars = useDarkThemeVariables();
  const lightThemeVars = useLightThemeVariables();
  const showNotifButton = isLoggedIn && (notifications == null ? void 0 : notifications.integrated);
  color = color ?? (lightThemeVars == null ? void 0 : lightThemeVars["--be-navbar-color"]) ?? "primary";
  darkModeColor = darkModeColor ?? (darkModeColor == null ? void 0 : darkModeColor["--be-navbar-color"]) ?? "bg-alt";
  if (isDarkMode) {
    color = darkModeColor;
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      style: alwaysDarkMode ? darkThemeVars : void 0,
      className: clsx(
        getColorStyle(color, textColor2),
        size2 === "md" && "h-64 py-8",
        size2 === "sm" && "h-54 py-4",
        size2 === "xs" && "h-48 py-4",
        border,
        className
      ),
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: clsx(
            "flex h-full items-center justify-end gap-10 pl-14 pr-8 md:pl-20 md:pr-20",
            wrapInContainer && "container mx-auto"
          ),
          children: [
            !hideLogo && /* @__PURE__ */ jsx(Logo, { isDarkMode, color, logoColor }),
            toggleButton,
            children,
            /* @__PURE__ */ jsx(MobileMenu, { position: menuPosition }),
            /* @__PURE__ */ jsx(DesktopMenu, { position: menuPosition }),
            /* @__PURE__ */ jsxs("div", { className: "ml-auto flex items-center gap-4 md:gap-14", children: [
              rightChildren,
              showNotifButton && /* @__PURE__ */ jsx(NotificationDialogTrigger, {}),
              isLoggedIn ? /* @__PURE__ */ jsx(NavbarAuthUser, { items: authMenuItems }) : /* @__PURE__ */ jsx(
                NavbarAuthButtons,
                {
                  navbarColor: color,
                  primaryButtonColor
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
function DesktopMenu({ position }) {
  return /* @__PURE__ */ jsx(
    CustomMenu,
    {
      className: "mx-14 text-sm max-md:hidden",
      itemClassName: (isActive) => clsx(
        "opacity-90 hover:underline hover:opacity-100",
        isActive && "opacity-100"
      ),
      menu: position
    }
  );
}
function MobileMenu({ position }) {
  const navigate = useNavigate();
  const menu = useCustomMenu(position);
  if (!(menu == null ? void 0 : menu.items.length)) {
    return null;
  }
  const handleItemClick = (item) => {
    var _a2;
    if (isAbsoluteUrl(item.action)) {
      (_a2 = window.open(item.action, item.target)) == null ? void 0 : _a2.focus();
    } else {
      navigate(item.action);
    }
  };
  return /* @__PURE__ */ jsxs(MenuTrigger, { children: [
    /* @__PURE__ */ jsx(IconButton, { className: "md:hidden", "aria-label": "Toggle menu", children: /* @__PURE__ */ jsx(MenuIcon, {}) }),
    /* @__PURE__ */ jsx(Menu, { children: menu.items.map((item) => {
      const Icon = item.icon && createSvgIconFromTree(item.icon);
      return /* @__PURE__ */ jsx(
        Item$1,
        {
          value: item.action,
          onSelected: () => handleItemClick(item),
          startIcon: Icon && /* @__PURE__ */ jsx(Icon, {}),
          children: /* @__PURE__ */ jsx(Trans, { message: item.label })
        },
        item.id
      );
    }) })
  ] });
}
function getColorStyle(color, textColor2) {
  switch (color) {
    case "primary":
      return `bg-primary ${textColor2 || "text-on-primary"} border-b-primary`;
    case "bg":
      return `bg ${textColor2 || "text-main"} border-b`;
    case "bg-alt":
      return `bg-alt ${textColor2 || "text-main"} border-b`;
    case "transparent":
      return `bg-transparent ${textColor2 || "text-white"}`;
    default:
      return `${color} ${textColor2}`;
  }
}
const DashboardLayoutContext = createContext(
  null
);
const MenuOpenIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M3 18h13v-2H3v2zm0-5h10v-2H3v2zm0-7v2h13V6H3zm18 9.59L17.42 12 21 8.41 19.59 7l-5 5 5 5L21 15.59z" }),
  "MenuOpenOutlined"
);
function PlayerNavbar({
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
  const navigate = useNavigate();
  const primaryArtist = usePrimaryArtistForCurrentUser();
  const { player } = useSettings();
  useMemo(() => {
    if (primaryArtist) {
      return [
        /* @__PURE__ */ jsx(
          Item$1,
          {
            value: "author",
            startIcon: /* @__PURE__ */ jsx(MicIcon, {}),
            onSelected: () => {
              navigate(getArtistLink(primaryArtist));
            },
            children: /* @__PURE__ */ jsx(Trans, { message: "Artist profile" })
          },
          "author"
        )
      ];
    }
    if (player == null ? void 0 : player.show_become_artist_btn) {
      return [
        /* @__PURE__ */ jsx(
          Item$1,
          {
            value: "author",
            startIcon: /* @__PURE__ */ jsx(MicIcon, {}),
            onSelected: () => {
              navigate("/backstage/requests");
            },
            children: /* @__PURE__ */ jsx(Trans, { message: "Become an author" })
          },
          "author"
        )
      ];
    }
    return [];
  }, [primaryArtist, navigate, player == null ? void 0 : player.show_become_artist_btn]);
  return /* @__PURE__ */ jsxs(
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
      children: [
        children,
        /* @__PURE__ */ jsx(ActionButtons, {})
      ]
    }
  );
}
function ActionButtons() {
  const { player, billing } = useSettings();
  const { isLoggedIn, hasPermission, isSubscribed } = useAuth();
  const showUploadButton = (player == null ? void 0 : player.show_upload_btn) && isLoggedIn && hasPermission("music.create");
  const showTryProButton = (billing == null ? void 0 : billing.enable) && hasPermission("plans.view") && !isSubscribed;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    showTryProButton ? /* @__PURE__ */ jsx(
      Button,
      {
        variant: "outline",
        size: "xs",
        color: "primary",
        elementType: Link,
        to: "/pricing",
        children: /* @__PURE__ */ jsx(Trans, { message: "Try Pro" })
      }
    ) : null,
    showUploadButton ? /* @__PURE__ */ jsx(
      Button,
      {
        variant: showTryProButton ? "text" : "outline",
        size: "xs",
        color: showTryProButton ? void 0 : "primary",
        elementType: Link,
        to: "/backstage/upload",
        children: /* @__PURE__ */ jsx(Trans, { message: "Upload" })
      }
    ) : null
  ] });
}
function ComboboxEndAdornment({ isLoading, icon }) {
  const timeout = useRef(null);
  const { trans } = useTrans();
  const [showLoading, setShowLoading] = useState(false);
  const {
    state: { isOpen, inputValue }
  } = useListboxContext();
  const lastInputValue = useRef(inputValue);
  useEffect(() => {
    if (isLoading && !showLoading) {
      if (timeout.current === null) {
        timeout.current = setTimeout(() => {
          setShowLoading(true);
        }, 500);
      }
      if (inputValue !== lastInputValue.current) {
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
          setShowLoading(true);
        }, 500);
      }
    } else if (!isLoading) {
      setShowLoading(false);
      clearTimeout(timeout.current);
      timeout.current = null;
    }
    lastInputValue.current = inputValue;
  }, [isLoading, showLoading, inputValue]);
  const showLoadingIndicator = showLoading && (isOpen || isLoading);
  if (showLoadingIndicator) {
    return /* @__PURE__ */ jsx(
      ProgressCircle,
      {
        "aria-label": trans({ message: "Loading" }),
        size: "sm",
        isIndeterminate: true
      }
    );
  }
  return icon || /* @__PURE__ */ jsx(KeyboardArrowDownIcon, {});
}
function ComboBox(props, ref) {
  var _a2;
  const {
    children,
    items,
    isAsync,
    isLoading,
    openMenuOnFocus = true,
    endAdornmentIcon,
    onItemSelected,
    maxItems,
    clearInputOnItemSelection,
    inputValue: userInputValue,
    selectedValue,
    onSelectionChange,
    allowCustomValue = false,
    onInputValueChange,
    defaultInputValue,
    selectionMode = "single",
    useOptionLabelAsInputValue,
    showEmptyMessage,
    floatingMaxHeight,
    hideEndAdornment = false,
    blurReferenceOnItemSelection,
    isOpen: propsIsOpen,
    onOpenChange: propsOnOpenChange,
    prependListbox,
    listboxClassName,
    onEndAdornmentClick,
    autoFocusFirstItem = true,
    ...textFieldProps
  } = props;
  const listbox = useListbox(
    {
      ...props,
      floatingMaxHeight,
      blurReferenceOnItemSelection,
      selectionMode,
      role: "listbox",
      virtualFocus: true,
      clearSelectionOnInputClear: true
    },
    ref
  );
  const {
    reference,
    listboxId,
    onInputChange,
    state: {
      isOpen,
      setIsOpen,
      inputValue,
      setInputValue,
      selectValues,
      selectedValues,
      setActiveCollection
    },
    collection
  } = listbox;
  const textLabel = selectedValues[0] ? (_a2 = collection.get(selectedValues[0])) == null ? void 0 : _a2.textLabel : void 0;
  const { handleListboxSearchFieldKeydown } = useListboxKeyboardNavigation(listbox);
  const handleFocusAndClick = createEventHandler(
    (e) => {
      if (openMenuOnFocus && !isOpen) {
        setIsOpen(true);
      }
      e.target.select();
    }
  );
  return /* @__PURE__ */ jsx(
    Listbox,
    {
      prepend: prependListbox,
      className: listboxClassName,
      listbox,
      mobileOverlay: Popover,
      isLoading,
      onPointerDown: (e) => {
        e.preventDefault();
      },
      children: /* @__PURE__ */ jsx(
        TextField,
        {
          inputRef: reference,
          ...textFieldProps,
          endAdornment: !hideEndAdornment ? /* @__PURE__ */ jsx(
            IconButton,
            {
              size: "md",
              tabIndex: -1,
              disabled: textFieldProps.disabled,
              className: "pointer-events-auto",
              onPointerDown: (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onEndAdornmentClick) {
                  onEndAdornmentClick();
                } else {
                  setActiveCollection("all");
                  setIsOpen(!isOpen);
                }
              },
              children: /* @__PURE__ */ jsx(
                ComboboxEndAdornment,
                {
                  isLoading,
                  icon: endAdornmentIcon
                }
              )
            }
          ) : null,
          "aria-expanded": isOpen ? "true" : "false",
          "aria-haspopup": "listbox",
          "aria-controls": isOpen ? listboxId : void 0,
          "aria-autocomplete": "list",
          autoComplete: "off",
          autoCorrect: "off",
          spellCheck: "false",
          onChange: onInputChange,
          value: useOptionLabelAsInputValue && textLabel ? textLabel : inputValue,
          onBlur: (e) => {
            if (allowCustomValue) {
              selectValues(e.target.value);
            } else if (!clearInputOnItemSelection) {
              const val = selectedValues[0];
              setInputValue(selectValues.length && val != null ? `${val}` : "");
            }
          },
          onFocus: handleFocusAndClick,
          onClick: handleFocusAndClick,
          onKeyDown: (e) => handleListboxSearchFieldKeydown(e)
        }
      )
    }
  );
}
const ComboBoxForwardRef = React.forwardRef(ComboBox);
function useSearchResults(params) {
  return useQuery({
    queryKey: ["search", params],
    queryFn: ({ signal }) => search(params, signal),
    enabled: !!params.query,
    placeholderData: !!params.query ? keepPreviousData : void 0,
    initialData: () => {
      var _a2;
      const data = (_a2 = getBootstrapData().loaders) == null ? void 0 : _a2[params.loader];
      if ((data == null ? void 0 : data.query) == params.query && (data == null ? void 0 : data.loader) === params.loader) {
        return data;
      }
      return void 0;
    }
  });
}
async function search(params, signal) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return apiClient.get(`search`, { params, signal }).then((response) => response.data);
}
const ARTIST_MODEL = "artist";
const ALBUM_MODEL = "album";
const TRACK_MODEL = "track";
const USER_MODEL = "user";
const PLAYLIST_MODEL = "playlist";
function SmallArtistImage({
  artist,
  className,
  wrapperClassName,
  size: size2,
  showVerifiedBadge = false
}) {
  const { trans } = useTrans();
  const src = getSmallArtistImage(artist);
  const imgClassName = clsx(
    size2,
    className,
    "bg-fg-base/4 object-cover",
    !src ? "flex items-center justify-center" : "block"
  );
  const image = src ? /* @__PURE__ */ jsx(
    "img",
    {
      className: imgClassName,
      draggable: false,
      loading: "lazy",
      src,
      alt: trans(message("Image for :name", { values: { name: artist.name } }))
    }
  ) : /* @__PURE__ */ jsx("span", { className: clsx(imgClassName, "overflow-hidden"), children: /* @__PURE__ */ jsx(MicIcon, { className: "max-w-[60%] text-divider", size: "text-9xl" }) });
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx("relative isolate flex-shrink-0", size2, wrapperClassName),
      children: [
        image,
        showVerifiedBadge && artist.verified && /* @__PURE__ */ jsxs(
          "div",
          {
            className: "absolute bottom-24 left-0 right-0 mx-auto flex w-max max-w-full items-center gap-6 rounded-full bg-black/60 px-8 py-4 text-sm text-white",
            color: "positive",
            children: [
              /* @__PURE__ */ jsx("div", { className: "rounded-full bg-primary p-1", children: /* @__PURE__ */ jsx(CheckIcon, { className: "text-white", size: "sm" }) }),
              /* @__PURE__ */ jsx(Trans, { message: "Verified artist" })
            ]
          }
        )
      ]
    }
  );
}
function getSmallArtistImage(artist) {
  var _a2, _b2;
  return artist.image_small || ((_b2 = (_a2 = artist.albums) == null ? void 0 : _a2[0]) == null ? void 0 : _b2.image);
}
function ArtistLinks({
  artists,
  className,
  target,
  linkClassName,
  onLinkClick
}) {
  if (!(artists == null ? void 0 : artists.length)) {
    return /* @__PURE__ */ jsx("div", { className, children: /* @__PURE__ */ jsx(Trans, { message: "Various artists" }) });
  }
  return /* @__PURE__ */ jsx("div", { className: clsx(className, "overflow-x-hidden overflow-ellipsis"), children: artists.map((artist, i) => /* @__PURE__ */ jsxs(Fragment, { children: [
    i > 0 && ", ",
    /* @__PURE__ */ jsx(
      ArtistLink,
      {
        artist,
        target,
        className: linkClassName,
        onClick: onLinkClick
      }
    )
  ] }, artist.id)) });
}
const MusicNoteIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "m12 3 .01 10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4.01 4S14 19.21 14 17V7h4V3h-6zm-1.99 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" }),
  "MusicNoteOutlined"
);
function TrackImage({
  track,
  className,
  size: size2,
  background = "bg-fg-base/4"
}) {
  const { trans } = useTrans();
  const src = getTrackImageSrc(track);
  const imgClassName = clsx(
    className,
    size2,
    background,
    "object-cover",
    !src ? "flex items-center justify-center" : "block"
  );
  return src ? /* @__PURE__ */ jsx(
    "img",
    {
      className: imgClassName,
      draggable: false,
      loading: "lazy",
      src,
      alt: trans(message("Image for :name", { values: { name: track.name } }))
    }
  ) : /* @__PURE__ */ jsx("span", { className: clsx(imgClassName, "overflow-hidden"), children: /* @__PURE__ */ jsx(MusicNoteIcon, { className: "max-w-[60%] text-divider", size: "text-9xl" }) });
}
function getTrackImageSrc(track) {
  var _a2;
  if (track.image) {
    return track.image;
  } else if ((_a2 = track.album) == null ? void 0 : _a2.image) {
    return track.album.image;
  }
}
function AlbumLink({ album, artist, className, target }) {
  if (!artist && album.artists) {
    artist = album.artists[0];
  }
  const uri = useMemo(() => {
    return getAlbumLink(album, { artist });
  }, [artist, album]);
  return /* @__PURE__ */ jsx(
    Link,
    {
      target,
      className: clsx(
        "hover:underline outline-none focus-visible:underline overflow-x-hidden overflow-ellipsis",
        className
      ),
      to: uri,
      children: album.name
    }
  );
}
function getAlbumLink(album, options = {}) {
  var _a2;
  const artist = options.artist || ((_a2 = album.artists) == null ? void 0 : _a2[0]);
  const artistName = slugifyString((artist == null ? void 0 : artist.name) || "Various Artists");
  const albumName = slugifyString(album.name);
  let link2 = `/album/${album.id}/${artistName}/${albumName}`;
  if (options.absolute) {
    link2 = `${getBootstrapData().settings.base_url}${link2}`;
  }
  return link2;
}
function TrackLink({ track, className, ...linkProps }) {
  const finalUri = useMemo(() => {
    return getTrackLink(track);
  }, [track]);
  return /* @__PURE__ */ jsx(
    Link,
    {
      ...linkProps,
      className: clsx(
        "hover:underline overflow-x-hidden overflow-ellipsis",
        className
      ),
      to: finalUri,
      children: track.name
    }
  );
}
function getTrackLink(track, { absolute } = {}) {
  let link2 = `/track/${track.id}/${slugifyString(track.name)}`;
  if (absolute) {
    link2 = `${getBootstrapData().settings.base_url}${link2}`;
  }
  return link2;
}
const StarIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" }),
  "StarOutlined"
);
const userDefaultImage = "/assets/user-default-4b239e07.svg";
function UserImage({
  user,
  className,
  size: size2,
  showProBadge
}) {
  var _a2;
  const { trans } = useTrans();
  const showBadge = showProBadge && ((_a2 = user.subscriptions) == null ? void 0 : _a2.find((s) => s.valid));
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "relative flex-shrink-0 isolate overflow-hidden",
        size2,
        className
      ),
      children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            className: "object-cover bg-fg-base/4 w-full h-full",
            draggable: false,
            src: getUserImage(user),
            alt: trans(
              message("Avatar for :name", { values: { name: user.display_name } })
            )
          }
        ),
        showBadge && /* @__PURE__ */ jsxs(
          "div",
          {
            className: "absolute bottom-12 text-sm left-0 right-0 w-max max-w-full mx-auto flex items-center gap-6 bg-black/60 text-white rounded-full py-4 px-8",
            color: "positive",
            children: [
              /* @__PURE__ */ jsx("div", { className: "bg-primary rounded-full p-1", children: /* @__PURE__ */ jsx(StarIcon, { className: "text-white", size: "sm" }) }),
              /* @__PURE__ */ jsx(Trans, { message: "PRO user" })
            ]
          }
        )
      ]
    }
  );
}
function getUserImage(user) {
  return user.avatar || userDefaultImage;
}
function shuffleArray(items, keepFirst = false) {
  let first = keepFirst ? items.shift() : null;
  let currentIndex = items.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = items[currentIndex];
    items[currentIndex] = items[randomIndex];
    items[randomIndex] = temporaryValue;
  }
  if (first) {
    items.unshift(first);
  }
  return [...items];
}
function getPlayerStateFromLocalStorage(id, options) {
  const defaultVolume = (options == null ? void 0 : options.defaultVolume) || 30;
  return {
    state: {
      muted: getFromLocalStorage(`player.${id}.muted`) ?? false,
      repeat: getFromLocalStorage(`player.${id}.repeat`) ?? "all",
      shuffling: getFromLocalStorage(`player.${id}.shuffling`) ?? false,
      volume: getFromLocalStorage(`player.${id}.volume`) ?? defaultVolume
    },
    queue: getFromLocalStorage(`player.${id}.queue`, []),
    cuedMediaId: getFromLocalStorage(`player.${id}.cuedMediaId`)
  };
}
function prependToArrayAtIndex(array, toAdd, index = 0) {
  const copyOfArray = [...array];
  const tail = copyOfArray.splice(index + 1);
  return [...copyOfArray, ...toAdd, ...tail];
}
function resetMediaSession() {
  if ("mediaSession" in navigator) {
    const actionHandlers = [
      "play",
      "pause",
      "previoustrack",
      "nexttrack",
      "stop",
      "seekbackward",
      "seekforward",
      "seekto"
    ];
    actionHandlers.forEach(
      (action) => navigator.mediaSession.setActionHandler(action, null)
    );
    navigator.mediaSession.metadata = null;
    navigator.mediaSession.playbackState = "none";
  }
}
function playerQueue(state) {
  const getPointer = () => {
    if (state().cuedMedia) {
      return state().shuffledQueue.findIndex(
        (item) => {
          var _a2;
          return item.id === ((_a2 = state().cuedMedia) == null ? void 0 : _a2.id);
        }
      ) || 0;
    }
    return 0;
  };
  const getCurrent = () => {
    return state().shuffledQueue[getPointer()];
  };
  const getFirst = () => {
    return state().shuffledQueue[0];
  };
  const getLast = () => {
    return state().shuffledQueue[state().shuffledQueue.length - 1];
  };
  const getNext = () => {
    return state().shuffledQueue[getPointer() + 1];
  };
  const getPrevious = () => {
    return state().shuffledQueue[getPointer() - 1];
  };
  const isLast = () => {
    return getPointer() === state().originalQueue.length - 1;
  };
  return {
    getPointer,
    getCurrent,
    getFirst,
    getLast,
    getNext,
    getPrevious,
    isLast
  };
}
function isCtrlKeyPressed(e) {
  if (isMac()) {
    return e.metaKey;
  }
  return e.ctrlKey;
}
function isCtrlOrShiftPressed(e) {
  return e.shiftKey || isCtrlKeyPressed(e);
}
function handlePlayerKeybinds(e, state) {
  var _a2;
  if (["input", "textarea"].includes(
    (_a2 = e.target) == null ? void 0 : _a2.tagName.toLowerCase()
  ))
    return;
  if (e.key === " " || e.key === "k") {
    e.preventDefault();
    if (state().isPlaying) {
      state().pause();
    } else {
      state().play();
    }
  }
  if (e.key === "ArrowRight" && isCtrlOrShiftPressed(e)) {
    e.preventDefault();
    state().playNext();
  }
  if (e.key === "ArrowLeft" && isCtrlOrShiftPressed(e)) {
    e.preventDefault();
    state().playPrevious();
  }
}
function initPlayerMediaSession(state, options) {
  var _a2;
  if ("mediaSession" in navigator) {
    const actionHandlers = {
      play: () => state().play(),
      pause: () => state().pause(),
      previoustrack: () => state().playPrevious(),
      nexttrack: () => state().playNext(),
      stop: () => state().stop(),
      seekbackward: () => state().seek(state().getCurrentTime() - 10),
      seekforward: () => state().seek(state().getCurrentTime() + 10),
      seekto: (details) => state().seek(details.seekTime || 0)
    };
    for (const key in actionHandlers) {
      try {
        navigator.mediaSession.setActionHandler(
          key,
          actionHandlers[key]
        );
      } catch (error) {
      }
    }
    const cuedMedia = state().cuedMedia;
    if (cuedMedia) {
      (_a2 = options.setMediaSessionMetadata) == null ? void 0 : _a2.call(options, cuedMedia);
    }
  }
}
function isSameMedia(a, b) {
  if (!a || !b)
    return false;
  return a.id === b.id && a.groupId === b.groupId;
}
class ScreenOrientation {
  constructor() {
    __publicField(this, "currentLock");
  }
  async lock(lockType = "landscape") {
    if (!this.canOrientScreen() || this.currentLock)
      return;
    try {
      await screen.orientation.lock(lockType);
      this.currentLock = lockType;
    } catch (e) {
    }
  }
  async unlock() {
    if (!this.canOrientScreen() || !this.currentLock)
      return;
    await screen.orientation.unlock();
  }
  canOrientScreen() {
    return screen.orientation != null && !!screen.orientation.lock && !!screen.orientation.unlock;
  }
}
const IS_CLIENT = typeof window !== "undefined";
const UA = IS_CLIENT ? (_a = window.navigator) == null ? void 0 : _a.userAgent.toLowerCase() : "";
const IS_IOS = /iphone|ipad|ipod|ios|CriOS|FxiOS/.test(UA);
const IS_IPHONE = IS_CLIENT && /(iPhone|iPod)/gi.test((_b = window.navigator) == null ? void 0 : _b.platform);
function createNativeFullscreenAdapter(host, onChange) {
  host = host.closest(".fullscreen-host") ?? host;
  return {
    isFullscreen: () => {
      if (fscreen.fullscreenElement === host)
        return true;
      try {
        return host.matches(
          // @ts-expect-error - `fullscreenPseudoClass` is missing from `@types/fscreen`.
          fscreen.fullscreenPseudoClass
        );
      } catch (error) {
        return false;
      }
    },
    canFullScreen: () => {
      return fscreen.fullscreenEnabled;
    },
    enter: () => {
      return fscreen.requestFullscreen(host);
    },
    exit: () => {
      return fscreen.exitFullscreen();
    },
    bindEvents: () => {
      fscreen.addEventListener("fullscreenchange", onChange);
      fscreen.addEventListener("fullscreenerror", onChange);
    },
    unbindEvents: () => {
      fscreen.removeEventListener("fullscreenchange", onChange);
      fscreen.removeEventListener("fullscreenerror", onChange);
    }
  };
}
function createIphoneFullscreenAdapter(host, onChange) {
  return {
    /**
     * @link https://developer.apple.com/documentation/webkitjs/htmlvideoelement/1631913-webkitpresentationmode
     */
    isFullscreen: () => {
      return host.webkitPresentationMode === "fullscreen";
    },
    /**
     * @link https://developer.apple.com/documentation/webkitjs/htmlvideoelement/1628805-webkitsupportsfullscreen
     */
    canFullScreen: () => {
      return IS_IPHONE && typeof host.webkitSetPresentationMode === "function" && (host.webkitSupportsFullscreen ?? false);
    },
    enter: () => {
      var _a2;
      return (_a2 = host.webkitSetPresentationMode) == null ? void 0 : _a2.call(host, "fullscreen");
    },
    exit: () => {
      var _a2;
      return (_a2 = host.webkitSetPresentationMode) == null ? void 0 : _a2.call(host, "inline");
    },
    bindEvents: () => {
      host.removeEventListener("webkitpresentationmodechanged", onChange);
    },
    unbindEvents: () => {
      host.addEventListener("webkitpresentationmodechanged", onChange);
    }
  };
}
const iPhoneProviderBlacklist = ["youtube"];
const createFullscreenSlice = (set, get) => {
  let subscription;
  const orientation = new ScreenOrientation();
  let adapter;
  const onFullscreenChange = async () => {
    const isFullscreen = adapter == null ? void 0 : adapter.isFullscreen();
    if (isFullscreen) {
      orientation.lock();
    } else {
      orientation.unlock();
    }
    set({ isFullscreen });
  };
  const isSupported = () => {
    if (IS_IPHONE && iPhoneProviderBlacklist.includes(get().providerName)) {
      return false;
    }
    return (adapter == null ? void 0 : adapter.canFullScreen()) ?? false;
  };
  return {
    isFullscreen: false,
    canFullscreen: false,
    enterFullscreen: () => {
      if (!isSupported() || (adapter == null ? void 0 : adapter.isFullscreen()))
        return;
      if (get().isPip) {
        get().exitPip();
      }
      return adapter == null ? void 0 : adapter.enter();
    },
    exitFullscreen: () => {
      if (!(adapter == null ? void 0 : adapter.isFullscreen()))
        return;
      return adapter.exit();
    },
    toggleFullscreen: () => {
      if (get().isFullscreen) {
        get().exitFullscreen();
      } else {
        get().enterFullscreen();
      }
    },
    initFullscreen: () => {
      subscription = get().subscribe({
        providerReady: ({ el }) => {
          adapter == null ? void 0 : adapter.unbindEvents();
          if (get().isFullscreen) {
            adapter == null ? void 0 : adapter.exit();
          }
          adapter = IS_IPHONE ? createIphoneFullscreenAdapter(
            el,
            onFullscreenChange
          ) : createNativeFullscreenAdapter(el, onFullscreenChange);
          const canFullscreen = isSupported();
          set({ canFullscreen });
          if (canFullscreen) {
            adapter.bindEvents();
          }
        }
      });
    },
    destroyFullscreen: () => {
      get().exitFullscreen();
      subscription == null ? void 0 : subscription();
    }
  };
};
const createChromePipAdapter = (host, onChange) => {
  return {
    isSupported: () => canUsePiPInChrome(),
    isPip: () => {
      return host === document.pictureInPictureElement;
    },
    enter: () => {
      if (canUsePiPInChrome()) {
        return host.requestPictureInPicture();
      }
    },
    exit: () => {
      if (canUsePiPInChrome()) {
        return document.exitPictureInPicture();
      }
    },
    bindEvents: () => {
      if (canUsePiPInChrome()) {
        host.addEventListener("enterpictureinpicture", onChange);
        host.addEventListener("leavepictureinpicture", onChange);
      }
    },
    unbindEvents: () => {
      if (canUsePiPInChrome()) {
        host.removeEventListener("enterpictureinpicture", onChange);
        host.removeEventListener("leavepictureinpicture", onChange);
      }
    }
  };
};
let _canUsePiPInChrome;
const canUsePiPInChrome = () => {
  if (!IS_CLIENT)
    return false;
  if (_canUsePiPInChrome == null) {
    const video = document.createElement("video");
    _canUsePiPInChrome = !!document.pictureInPictureEnabled && !video.disablePictureInPicture;
  }
  return _canUsePiPInChrome;
};
const createSafariPipAdapter = (host, onChange) => {
  return {
    isSupported: () => canUsePiPInSafari(),
    isPip: () => {
      return host.webkitPresentationMode === "picture-in-picture";
    },
    enter: () => {
      var _a2;
      if (canUsePiPInSafari()) {
        return (_a2 = host.webkitSetPresentationMode) == null ? void 0 : _a2.call(host, "picture-in-picture");
      }
    },
    exit: () => {
      var _a2;
      if (canUsePiPInSafari()) {
        return (_a2 = host.webkitSetPresentationMode) == null ? void 0 : _a2.call(host, "inline");
      }
    },
    bindEvents: () => {
      if (canUsePiPInSafari()) {
        host.addEventListener("webkitpresentationmodechanged", onChange);
      }
    },
    unbindEvents: () => {
      if (canUsePiPInSafari()) {
        host.removeEventListener("webkitpresentationmodechanged", onChange);
      }
    }
  };
};
let _canUsePiPInSafari;
const canUsePiPInSafari = () => {
  if (!IS_CLIENT)
    return false;
  const video = document.createElement("video");
  if (_canUsePiPInSafari == null) {
    _canUsePiPInSafari = // @ts-ignore
    !!video.webkitSupportsPresentationMode && // @ts-ignore
    !!video.webkitSetPresentationMode && !IS_IPHONE;
  }
  return _canUsePiPInSafari;
};
const adapterFactories = [createChromePipAdapter, createSafariPipAdapter];
const createPipSlice = (set, get) => {
  let subscription;
  let adapters = [];
  const onPipChange = () => {
    set({ isPip: adapters.some((a) => a.isPip()) });
  };
  const isSupported = () => {
    if (get().providerName !== "htmlVideo") {
      return false;
    }
    return adapters.some((adapter) => adapter.isSupported());
  };
  return {
    isPip: false,
    canPip: false,
    enterPip: async () => {
      var _a2;
      if (get().isPip || !isSupported())
        return;
      await ((_a2 = adapters.find((a) => a.isSupported())) == null ? void 0 : _a2.enter());
    },
    exitPip: async () => {
      var _a2;
      if (!get().isPip)
        return;
      await ((_a2 = adapters.find((a) => a.isSupported())) == null ? void 0 : _a2.exit());
    },
    togglePip: () => {
      if (get().isPip) {
        get().exitPip();
      } else {
        get().enterPip();
      }
    },
    initPip: () => {
      subscription = get().subscribe({
        providerReady: ({ el }) => {
          adapters.every((a) => a.unbindEvents());
          if (get().isPip) {
            adapters.every((a) => a.exit());
          }
          adapters = adapterFactories.map(
            (factory) => factory(el, onPipChange)
          );
          const canPip = isSupported();
          if (canPip) {
            adapters.every((a) => a.bindEvents());
          }
          set({ canPip });
        }
      });
    },
    destroyPip: () => {
      get().exitPip();
      subscription == null ? void 0 : subscription();
    }
  };
};
const createPlayerStore = (id, options) => {
  const initialData = deepMerge(
    getPlayerStateFromLocalStorage(id, options),
    options.initialData || {}
  );
  const setInLocalStorage$1 = (key, value) => {
    setInLocalStorage(`player.${id}.${key}`, value);
  };
  return createStore()(
    subscribeWithSelector(
      immer((set, get, store) => {
        var _a2, _b2, _c, _d, _e;
        const listeners = /* @__PURE__ */ new Set();
        const internalListeners = {
          play: () => {
            set((s) => {
              s.isPlaying = true;
              s.playbackStarted = true;
            });
          },
          pause: () => {
            set((s) => {
              s.isPlaying = false;
              s.controlsVisible = true;
            });
          },
          error: (e) => {
            set((s) => {
              if (e == null ? void 0 : e.fatal) {
                s.isPlaying = false;
              }
            });
          },
          durationChange: (payload) => {
            set({ mediaDuration: payload.duration });
          },
          streamTypeChange: (payload) => {
            set({ streamType: payload.streamType });
          },
          buffered: (payload) => {
          },
          playbackRateChange: (payload) => {
            set({ playbackRate: payload.rate });
          },
          playbackRates: ({ rates }) => {
            set({ playbackRates: rates });
          },
          playbackQualities: ({ qualities }) => {
            set({ playbackQualities: qualities });
          },
          audioTracks: ({ tracks }) => {
            set({ audioTracks: tracks });
          },
          currentAudioTrackChange: ({ trackId }) => {
            set({ currentAudioTrack: trackId });
          },
          playbackQualityChange: ({ quality }) => {
            set({ playbackQuality: quality });
          },
          textTracks: ({ tracks }) => {
            set({ textTracks: tracks });
          },
          currentTextTrackChange: ({ trackId }) => {
            set({ currentTextTrack: trackId });
          },
          textTrackVisibilityChange: ({ isVisible }) => {
            set({ textTrackIsVisible: isVisible });
          },
          buffering: ({ isBuffering }) => {
            set({ isBuffering });
          },
          playbackEnd: async () => {
            const media = get().cuedMedia;
            if (get().isSeeking)
              return;
            if (queue.isLast() && options.loadMoreMediaItems) {
              const items = await options.loadMoreMediaItems(media);
              if (items == null ? void 0 : items.length) {
                get().appendToQueue(items);
              }
            }
            get().playNext();
          },
          posterLoaded: ({ url }) => {
            set({ posterUrl: url });
          },
          providerReady: () => {
            const provider = get().providerApi;
            if (provider) {
              provider.setVolume(get().volume);
              provider.setMuted(get().muted);
              if (options.autoPlay) {
                provider.play();
              }
              set({ providerReady: true });
            }
          }
        };
        const queue = playerQueue(get);
        const keybindsHandler = (e) => {
          handlePlayerKeybinds(e, get);
        };
        const initialQueue = initialData.queue || [];
        return {
          options,
          ...createFullscreenSlice(set, get),
          ...createPipSlice(set, get),
          originalQueue: initialQueue,
          shuffledQueue: ((_a2 = initialData.state) == null ? void 0 : _a2.shuffling) ? shuffleArray(initialQueue) : initialQueue,
          isPlaying: false,
          isBuffering: false,
          streamType: null,
          playbackStarted: false,
          providerReady: false,
          pauseWhileSeeking: options.pauseWhileSeeking ?? true,
          isSeeking: false,
          setIsSeeking: (isSeeking) => {
            set({ isSeeking });
          },
          controlsVisible: true,
          setControlsVisible: (isVisible) => {
            set((s) => {
              s.controlsVisible = isVisible;
            });
          },
          volume: ((_b2 = initialData.state) == null ? void 0 : _b2.volume) ?? 30,
          setVolume: (value) => {
            var _a3;
            (_a3 = get().providerApi) == null ? void 0 : _a3.setVolume(value);
            set((s) => {
              s.volume = value;
            });
            setInLocalStorage$1("volume", value);
          },
          muted: ((_c = initialData.state) == null ? void 0 : _c.muted) ?? false,
          setMuted: (isMuted) => {
            var _a3;
            (_a3 = get().providerApi) == null ? void 0 : _a3.setMuted(isMuted);
            set((s) => {
              s.muted = isMuted;
            });
            setInLocalStorage$1("muted", isMuted);
          },
          playbackRates: [],
          playbackRate: 1,
          setPlaybackRate: (speed) => {
            var _a3;
            (_a3 = get().providerApi) == null ? void 0 : _a3.setPlaybackRate(speed);
          },
          playbackQuality: "auto",
          setPlaybackQuality: (quality) => {
            var _a3, _b3;
            (_b3 = (_a3 = get().providerApi) == null ? void 0 : _a3.setPlaybackQuality) == null ? void 0 : _b3.call(_a3, quality);
          },
          playbackQualities: [],
          repeat: ((_d = initialData.state) == null ? void 0 : _d.repeat) ?? "all",
          toggleRepeatMode: () => {
            let newRepeat = "all";
            const currentRepeat = get().repeat;
            if (currentRepeat === "all") {
              newRepeat = "one";
            } else if (currentRepeat === "one") {
              newRepeat = false;
            }
            set({ repeat: newRepeat });
            setInLocalStorage$1("repeat", newRepeat);
          },
          shuffling: ((_e = initialData.state) == null ? void 0 : _e.shuffling) ?? false,
          toggleShuffling: () => {
            let newQueue = [];
            if (get().shuffling) {
              newQueue = get().originalQueue;
            } else {
              newQueue = shuffleArray([...get().shuffledQueue]);
            }
            set((s) => {
              s.shuffling = !s.shuffling;
              s.shuffledQueue = newQueue;
            });
          },
          mediaDuration: 0,
          seek: (time) => {
            var _a3;
            const timeStr = `${time}`;
            if (timeStr.startsWith("+")) {
              time = get().getCurrentTime() + Number(time);
            } else if (timeStr.startsWith("-")) {
              time = get().getCurrentTime() - Number(timeStr.replace("-", ""));
            } else {
              time = Number(time);
            }
            (_a3 = get().providerApi) == null ? void 0 : _a3.seek(time);
            get().emit("seek", { time });
          },
          getCurrentTime: () => {
            var _a3;
            return ((_a3 = get().providerApi) == null ? void 0 : _a3.getCurrentTime()) || 0;
          },
          play: async (media) => {
            var _a3, _b3;
            if (media) {
              await get().cue(media);
            } else {
              media = get().cuedMedia || queue.getCurrent();
            }
            if (!media) {
              get().stop();
              return;
            }
            await ((_a3 = options.onBeforePlay) == null ? void 0 : _a3.call(options));
            await ((_b3 = get().providerApi) == null ? void 0 : _b3.play());
          },
          pause: () => {
            var _a3;
            (_a3 = get().providerApi) == null ? void 0 : _a3.pause();
          },
          stop: () => {
            if (!get().isPlaying)
              return;
            get().pause();
            get().seek(0);
          },
          playNext: async () => {
            var _a3;
            get().stop();
            let media = queue.getCurrent();
            if (get().repeat === "all" && queue.isLast()) {
              media = queue.getFirst();
            } else if (get().repeat !== "one") {
              media = queue.getNext();
            }
            if (get().repeat === "one" && get().providerName === "youtube") {
              await new Promise((resolve) => setTimeout(resolve, 50));
            }
            if ((_a3 = options.onBeforePlayNext) == null ? void 0 : _a3.call(options, media)) {
              return;
            }
            if (media) {
              await get().play(media);
            } else {
              get().seek(0);
              get().play();
            }
          },
          playPrevious: async () => {
            var _a3;
            get().stop();
            let media = queue.getCurrent();
            if (get().repeat === "all" && queue.getPointer() === 0) {
              media = queue.getLast();
            } else if (get().repeat !== "one") {
              media = queue.getPrevious();
            }
            if ((_a3 = options.onBeforePlayPrevious) == null ? void 0 : _a3.call(options, media)) {
              return;
            }
            if (media) {
              await get().play(media);
            } else {
              get().seek(0);
              get().play();
            }
          },
          cue: async (media) => {
            if (isSameMedia(media, get().cuedMedia))
              return;
            get().emit("beforeCued", { previous: get().cuedMedia });
            return new Promise((resolve, reject) => {
              var _a3;
              const previousProvider = get().providerName;
              const timeoutId = setTimeout(() => {
                unsubscribe();
                resolve();
              }, 3e3);
              const unsubscribe = get().subscribe({
                cued: () => {
                  clearTimeout(timeoutId);
                  unsubscribe();
                  resolve();
                },
                error: (e) => {
                  clearTimeout(timeoutId);
                  unsubscribe();
                  reject("Could not cue media");
                }
              });
              set({
                cuedMedia: media,
                posterUrl: media.poster,
                providerName: media.provider,
                providerReady: previousProvider === media.provider,
                streamType: "streamType" in media ? media.streamType : null
              });
              if (media) {
                (_a3 = options.setMediaSessionMetadata) == null ? void 0 : _a3.call(options, media);
              }
              if (options.persistQueueInLocalStorage) {
                setInLocalStorage$1("cuedMediaId", media.id);
              }
            });
          },
          async overrideQueue(mediaItems, queuePointer = 0) {
            if (!(mediaItems == null ? void 0 : mediaItems.length))
              return;
            const items = [...mediaItems];
            set((s) => {
              s.shuffledQueue = get().shuffling ? shuffleArray(items, true) : items;
              s.originalQueue = items;
            });
            if (options.persistQueueInLocalStorage) {
              setInLocalStorage$1("queue", get().originalQueue.slice(0, 15));
            }
            const media = queuePointer > -1 ? mediaItems[queuePointer] : queue.getCurrent();
            if (media) {
              return get().cue(media);
            }
          },
          appendToQueue: (mediaItems, afterCuedMedia = true) => {
            const shuffledNewItems = get().shuffling ? shuffleArray([...mediaItems]) : [...mediaItems];
            const index = afterCuedMedia ? queue.getPointer() : 0;
            set((s) => {
              s.shuffledQueue = prependToArrayAtIndex(
                s.shuffledQueue,
                shuffledNewItems,
                index
              );
              s.originalQueue = prependToArrayAtIndex(
                s.originalQueue,
                mediaItems,
                index
              );
            });
            if (options.persistQueueInLocalStorage) {
              setInLocalStorage$1("queue", get().originalQueue.slice(0, 15));
            }
          },
          removeFromQueue: (mediaItems) => {
            set((s) => {
              s.shuffledQueue = s.shuffledQueue.filter(
                (item) => !mediaItems.find((m2) => isSameMedia(m2, item))
              );
              s.originalQueue = s.originalQueue.filter(
                (item) => !mediaItems.find((m2) => isSameMedia(m2, item))
              );
            });
            if (options.persistQueueInLocalStorage) {
              setInLocalStorage$1("queue", get().originalQueue.slice(0, 15));
            }
          },
          textTracks: [],
          currentTextTrack: -1,
          setCurrentTextTrack: (trackId) => {
            var _a3, _b3;
            (_b3 = (_a3 = get().providerApi) == null ? void 0 : _a3.setCurrentTextTrack) == null ? void 0 : _b3.call(_a3, trackId);
          },
          textTrackIsVisible: false,
          setTextTrackVisibility: (isVisible) => {
            var _a3, _b3;
            (_b3 = (_a3 = get().providerApi) == null ? void 0 : _a3.setTextTrackVisibility) == null ? void 0 : _b3.call(_a3, isVisible);
          },
          audioTracks: [],
          currentAudioTrack: -1,
          setCurrentAudioTrack: (trackId) => {
            var _a3, _b3;
            (_b3 = (_a3 = get().providerApi) == null ? void 0 : _a3.setCurrentAudioTrack) == null ? void 0 : _b3.call(_a3, trackId);
          },
          destroy: () => {
            var _a3;
            get().destroyFullscreen();
            get().destroyPip();
            (_a3 = options == null ? void 0 : options.onDestroy) == null ? void 0 : _a3.call(options);
            resetMediaSession();
            listeners.clear();
            document.removeEventListener("keydown", keybindsHandler);
          },
          init: async () => {
            var _a3, _b3, _c2;
            get().initFullscreen();
            listeners.add(internalListeners);
            if (options.listeners) {
              listeners.add(options.listeners);
            }
            const mediaId = initialData.cuedMediaId || ((_b3 = (_a3 = initialData.queue) == null ? void 0 : _a3[0]) == null ? void 0 : _b3.id);
            const mediaToCue = (_c2 = initialData.queue) == null ? void 0 : _c2.find(
              (media) => media.id === mediaId
            );
            if (mediaToCue) {
              await get().cue(mediaToCue);
            }
            initPlayerMediaSession(get, options);
            document.addEventListener("keydown", keybindsHandler);
          },
          subscribe: (newListeners) => {
            listeners.add(newListeners);
            return () => listeners.delete(newListeners);
          },
          emit(event, payload) {
            listeners.forEach((l) => {
              var _a3;
              return (_a3 = l[event]) == null ? void 0 : _a3.call(l, { state: get(), ...payload });
            });
          }
        };
      })
    )
  );
};
const PlayerStoreContext = createContext(null);
function PlayerContext({ children, id, options }) {
  const [store] = useState(() => {
    return createPlayerStore(id, options);
  });
  return /* @__PURE__ */ jsx(PlayerStoreContext.Provider, { value: store, children });
}
const usePlayerStore = (selector, equalityFn) => {
  const store = useContext(PlayerStoreContext);
  return useStoreWithEqualityFn(store, selector, equalityFn);
};
function usePlayerActions() {
  const store = useContext(PlayerStoreContext);
  return useMemo(() => {
    const s = store.getState();
    const overrideQueueAndPlay = async (mediaItems, queuePointer) => {
      s.stop();
      await s.overrideQueue(mediaItems, queuePointer);
      return s.play();
    };
    return {
      play: s.play,
      playNext: s.playNext,
      playPrevious: s.playPrevious,
      pause: s.pause,
      subscribe: s.subscribe,
      emit: s.emit,
      getCurrentTime: s.getCurrentTime,
      seek: s.seek,
      toggleRepeatMode: s.toggleRepeatMode,
      toggleShuffling: s.toggleShuffling,
      getState: store.getState,
      setVolume: s.setVolume,
      setMuted: s.setMuted,
      appendToQueue: s.appendToQueue,
      removeFromQueue: s.removeFromQueue,
      enterFullscreen: s.enterFullscreen,
      exitFullscreen: s.exitFullscreen,
      toggleFullscreen: s.toggleFullscreen,
      enterPip: s.enterPip,
      exitPip: s.exitPip,
      setTextTrackVisibility: s.setTextTrackVisibility,
      setCurrentTextTrack: s.setCurrentTextTrack,
      setCurrentAudioTrack: s.setCurrentAudioTrack,
      setIsSeeking: s.setIsSeeking,
      setControlsVisible: s.setControlsVisible,
      cue: s.cue,
      overrideQueueAndPlay,
      overrideQueue: s.overrideQueue,
      setPlaybackRate: s.setPlaybackRate,
      setPlaybackQuality: s.setPlaybackQuality
    };
  }, [store]);
}
async function loadMediaItemTracks(queueId, lastTrack) {
  const query = {
    queryKey: ["player/tracks", { queueId, trackId: lastTrack == null ? void 0 : lastTrack.id }],
    queryFn: async () => loadTracks(queueId, lastTrack),
    staleTime: Infinity
  };
  try {
    const response = queryClient.getQueryData(query.queryKey) ?? await queryClient.fetchQuery(query);
    return (response == null ? void 0 : response.tracks) || [];
  } catch (e) {
    return [];
  }
}
function loadTracks(queueId, lastTrack) {
  return apiClient.post("player/tracks", { queueId, lastTrack }).then((response) => response.data);
}
const hlsRegex = /\.(m3u8)($|\?)/i;
const dashRegex = /\.(mpd)($|\?)/i;
const audioRegex = /\.(m4a|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx|flac)($|\?)/i;
const youtubeUrlRegex = /(?:youtu\.be|youtube|youtube\.com|youtube-nocookie\.com)\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|)((?:\w|-){11})/;
const youtubeIdRegex = /^((?:\w|-){11})$/;
function guessPlayerProvider(src) {
  if (youtubeUrlRegex.test(src) || youtubeIdRegex.test(src)) {
    return "youtube";
  } else if (audioRegex.test(src)) {
    return "htmlAudio";
  } else if (hlsRegex.test(src)) {
    if (IS_IOS) {
      return "htmlVideo";
    } else {
      return "hls";
    }
  } else if (dashRegex.test(src)) {
    return "dash";
  } else {
    return "htmlVideo";
  }
}
function trackToMediaItem(track, queueGroupId2) {
  const provider = track.src ? guessPlayerProvider(track.src) : "youtube";
  if (!track.src || provider === "youtube") {
    return {
      id: track.id,
      provider: "youtube",
      meta: track,
      src: track.src ? track.src : "resolve",
      groupId: queueGroupId2
    };
  }
  return {
    id: track.id,
    src: track.src,
    provider,
    meta: track,
    poster: getTrackImageSrc(track),
    groupId: queueGroupId2
  };
}
function tracksToMediaItems(tracks, queueGroupId2, album) {
  return tracks.map((track) => {
    if (album && !track.album) {
      track = {
        ...track,
        album: { ...album, tracks: void 0 }
      };
    }
    return trackToMediaItem(track);
  });
}
const PauseIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M6 19h4V5H6v14zm8-14v14h4V5h-4z" }),
  "PauseOutlined"
);
const white = "/assets/equalizer-white-29f31645.gif";
const black = "/assets/equalizer-black-498817c4.gif";
function EqualizerImage({ className, color }) {
  const isDarkMode = useIsDarkMode();
  if (!color) {
    color = isDarkMode ? "white" : "black";
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx("flex items-center justify-center w-20 h-20", className),
      children: /* @__PURE__ */ jsx(
        "img",
        {
          src: color === "white" ? white : black,
          alt: "",
          className: "w-12 h-12",
          "aria-hidden": true
        }
      )
    }
  );
}
const PlayArrowFilledIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M8 19V5l11 7Z" }),
  "PlayArrowFilled"
);
function PlaybackToggleButton({
  queueId,
  track,
  tracks,
  radius,
  variant,
  color,
  disabled,
  className,
  buttonType,
  equalizerColor = buttonType === "text" ? "white" : "black",
  size: size2
}) {
  const [isHover, setIsHover] = useState(false);
  const modelIsQueued = usePlayerStore((s) => {
    if (s.cuedMedia && queueId && s.cuedMedia.groupId === queueId) {
      return true;
    }
    if (s.cuedMedia && track && s.cuedMedia.meta.id === track.id) {
      return true;
    }
    return false;
  });
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const modelIsPlaying = isPlaying && modelIsQueued;
  const player = usePlayerActions();
  const statusIcon = modelIsPlaying ? isHover ? /* @__PURE__ */ jsx(PauseIcon, {}) : /* @__PURE__ */ jsx(EqualizerImage, { color: equalizerColor }) : /* @__PURE__ */ jsx(PlayArrowFilledIcon, {});
  const sharedProps = {
    disabled,
    onPointerEnter: () => {
      setIsHover(true);
    },
    onPointerLeave: () => {
      setIsHover(false);
    },
    onClick: async () => {
      if (modelIsPlaying) {
        player.pause();
      } else if (modelIsQueued) {
        await player.play();
      } else {
        let newQueue = [];
        let newIndex = 0;
        if (tracks) {
          newQueue = [...tracks];
          newIndex = track ? tracks.findIndex((t) => t.id === track.id) : 0;
        } else if (track) {
          newQueue = [track];
        } else {
          newQueue = await loadMediaItemTracks(queueId);
        }
        if (newQueue.length) {
          await player.overrideQueueAndPlay(
            newQueue.map((t) => trackToMediaItem(t, queueId)),
            newIndex
          );
        }
      }
    }
  };
  if (buttonType === "icon") {
    return /* @__PURE__ */ jsx(
      IconButton,
      {
        ...sharedProps,
        variant,
        color,
        radius,
        size: size2,
        className,
        children: statusIcon
      }
    );
  }
  return /* @__PURE__ */ jsx(
    Button,
    {
      ...sharedProps,
      variant: variant || "flat",
      color: color || "primary",
      radius: radius || "rounded-full",
      startIcon: statusIcon,
      size: size2,
      className,
      children: modelIsPlaying ? /* @__PURE__ */ jsx(Trans, { message: "Pause" }) : /* @__PURE__ */ jsx(Trans, { message: "Play" })
    }
  );
}
function queueGroupId(model, kind = "*", sortDescriptor) {
  let base = `${model.model_type}.${model.id}.${kind}`;
  if ((sortDescriptor == null ? void 0 : sortDescriptor.orderBy) && (sortDescriptor == null ? void 0 : sortDescriptor.orderDir)) {
    base += `.${sortDescriptor.orderBy.replace(".", "^")}|${sortDescriptor.orderDir}`;
  }
  return base;
}
const AlbumIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-12.5c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 5.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" }),
  "AlbumOutlined"
);
function AlbumImage({ album, className, size: size2 }) {
  const { trans } = useTrans();
  const src = album == null ? void 0 : album.image;
  const imgClassName = clsx(
    className,
    size2,
    "object-cover bg-fg-base/4",
    !src ? "flex items-center justify-center" : "block"
  );
  return src ? /* @__PURE__ */ jsx(
    "img",
    {
      className: imgClassName,
      draggable: false,
      loading: "lazy",
      src,
      alt: trans(message("Image for :name", { values: { name: album.name } }))
    }
  ) : /* @__PURE__ */ jsx("span", { className: clsx(imgClassName, "overflow-hidden"), children: /* @__PURE__ */ jsx(AlbumIcon, { className: "max-w-[60%] text-divider", size: "text-9xl" }) });
}
function PlaylistLink({ playlist, className }) {
  const uri = useMemo(() => {
    return getPlaylistLink(playlist);
  }, [playlist.id]);
  return /* @__PURE__ */ jsx(Link, { className: clsx("capitalize hover:underline", className), to: uri, children: playlist.name });
}
function getPlaylistLink(playlist, { absolute } = {}) {
  const playlistName = slugifyString(playlist.name);
  let link2 = `/playlist/${playlist.id}/${playlistName}`;
  if (absolute) {
    link2 = `${getBootstrapData().settings.base_url}${link2}`;
  }
  return link2;
}
const PlaylistPlayIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M3 10h11v2H3zm0-4h11v2H3zm0 8h7v2H3zm13-1v8l6-4z" }),
  "PlaylistPlayOutlined"
);
function PlaylistImage({ playlist, className, size: size2 }) {
  const { trans } = useTrans();
  const src = getPlaylistImageSrc(playlist);
  const imgClassName = clsx(
    className,
    size2,
    "object-cover bg-fg-base/4",
    !src ? "flex items-center justify-center" : "block"
  );
  return src ? /* @__PURE__ */ jsx(
    "img",
    {
      className: clsx(imgClassName, size2, "bg-fg-base/4 object-cover"),
      draggable: false,
      loading: "lazy",
      src,
      alt: trans(message("Image for :name", { values: { name: playlist.name } }))
    }
  ) : /* @__PURE__ */ jsx("span", { className: clsx(imgClassName, "overflow-hidden"), children: /* @__PURE__ */ jsx(PlaylistPlayIcon, { className: "max-w-[60%] text-divider", size: "text-9xl" }) });
}
function getPlaylistImageSrc(playlist) {
  var _a2;
  if (playlist.image) {
    return playlist.image;
  }
  const firstTrackImage = ((_a2 = playlist.tracks) == null ? void 0 : _a2[0]) ? getTrackImageSrc(playlist.tracks[0]) : null;
  if (firstTrackImage) {
    return firstTrackImage;
  }
}
const MoreHorizIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" }),
  "MoreHorizOutlined"
);
function PlayableGridItem({
  image,
  title,
  subtitle,
  model,
  newQueue,
  link: link2,
  likeButton,
  contextDialog,
  radius = "rounded-panel"
}) {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs("div", { className: "snap-start snap-normal", children: [
    /* @__PURE__ */ jsxs(
      DialogTrigger,
      {
        type: "popover",
        placement: "bottom-start",
        mobileType: "tray",
        triggerOnContextMenu: true,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "group relative isolate w-full", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "this aspect-square w-full",
                onClick: () => navigate(link2),
                children: cloneElement(image, {
                  size: "w-full h-full",
                  className: `${radius} shadow-md z-10`
                })
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent to-black/75 ${radius} pointer-events-none z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100`
              },
              "bg-overlay"
            ),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: clsx(
                  "absolute bottom-0 left-0 z-30 flex w-full items-center gap-14 p-12",
                  radius === "rounded-full" && "pointer-events-none right-0 top-0 justify-center"
                ),
                children: [
                  /* @__PURE__ */ jsx(
                    PlaybackToggleButton,
                    {
                      size: radius === "rounded-full" ? "lg" : "md",
                      radius: "rounded-full",
                      className: clsx(
                        "pointer-events-auto shadow-md",
                        radius === "rounded-full" && "invisible group-hover:visible"
                      ),
                      variant: "flat",
                      color: "white",
                      buttonType: "icon",
                      track: model.model_type === TRACK_MODEL ? model : void 0,
                      tracks: newQueue,
                      queueId: queueGroupId(model)
                    }
                  ),
                  radius !== "rounded-full" && /* @__PURE__ */ jsxs(DialogTrigger, { type: "popover", mobileType: "tray", children: [
                    /* @__PURE__ */ jsx(
                      IconButton,
                      {
                        className: "invisible md:group-hover:visible",
                        color: "white",
                        children: /* @__PURE__ */ jsx(MoreHorizIcon, {})
                      }
                    ),
                    contextDialog
                  ] }),
                  radius !== "rounded-full" && likeButton && // 3 buttons won't fit if item is fully rounded
                  cloneElement(likeButton, {
                    className: "invisible md:group-hover:visible ml-auto",
                    size: "md",
                    color: "white"
                  })
                ]
              }
            )
          ] }),
          contextDialog
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: clsx(
          radius === "rounded-full" && "text-center",
          "mt-12 text-sm"
        ),
        children: [
          /* @__PURE__ */ jsx("div", { className: "overflow-hidden overflow-ellipsis", children: title }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 overflow-hidden overflow-ellipsis whitespace-nowrap text-muted", children: subtitle })
        ]
      }
    )
  ] });
}
function useAuthUserPlaylists() {
  const { isLoggedIn, user } = useAuth();
  return useQuery({
    queryKey: ["playlists", "library", user == null ? void 0 : user.id, "compact"],
    queryFn: () => fetchPlaylists(),
    enabled: isLoggedIn,
    initialData: () => {
      return {
        playlists: getBootstrapData().playlists || []
      };
    }
  });
}
function fetchPlaylists() {
  return apiClient.get("users/me/playlists", {
    params: { perPage: 30, orderBy: "updated_at", orderDir: "desc" }
  }).then((response) => {
    return { playlists: response.data.pagination.data };
  });
}
const KeyboardBackspaceIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21v-2z" }),
  "KeyboardBackspaceOutlined"
);
const AddIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" }),
  "AddOutlined"
);
const KeyboardArrowRightIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" }),
  "KeyboardArrowRightOutlined"
);
function useAddTracksToPlaylist() {
  return useMutation({
    mutationFn: (payload) => addTracks(payload),
    onSuccess: (response, { tracks }) => {
      toast(
        message("Added [one 1 track|other :count tracks] to playlist", {
          values: { count: tracks.length }
        })
      );
      queryClient.invalidateQueries({
        queryKey: ["playlists", response.playlist.id]
      });
      queryClient.invalidateQueries({
        queryKey: ["tracks", "playlist", response.playlist.id]
      });
    },
    onError: (r) => showHttpErrorToast(r)
  });
}
function addTracks(payload) {
  const backendPayload = {
    ids: payload.tracks.map((track) => track.id)
  };
  return apiClient.post(`playlists/${payload.playlistId}/tracks/add`, backendPayload).then((r) => r.data);
}
const oneMB = 1024 * 1024;
const desiredChunkSize = 20 * oneMB;
const batchSize = 10;
const concurrency = 5;
class S3MultipartUpload {
  constructor(file, config) {
    __publicField(this, "abortController");
    __publicField(this, "chunks", []);
    __publicField(this, "uploadId");
    __publicField(this, "fileKey");
    __publicField(this, "chunkAxios");
    __publicField(this, "abortedByUser", false);
    __publicField(this, "uploadedParts");
    this.file = file;
    this.config = config;
    this.abortController = new AbortController();
    this.chunkAxios = axios.create();
    axiosRetry(this.chunkAxios, { retries: 3 });
  }
  get storageKey() {
    return `s3-multipart::${this.file.fingerprint}`;
  }
  async start() {
    var _a2, _b2, _c, _d, _e;
    const storedUrl = getFromLocalStorage(this.storageKey);
    if (storedUrl) {
      await this.getUploadedParts(storedUrl);
    }
    if (!((_a2 = this.uploadedParts) == null ? void 0 : _a2.length)) {
      await this.createMultipartUpload();
      if (!this.uploadId)
        return;
    }
    this.prepareChunks();
    const result = await this.uploadParts();
    if (result === "done") {
      const isCompleted = await this.completeMultipartUpload();
      if (!isCompleted)
        return;
      try {
        const response = await this.createFileEntry();
        if (response == null ? void 0 : response.fileEntry) {
          (_c = (_b2 = this.config).onSuccess) == null ? void 0 : _c.call(_b2, response == null ? void 0 : response.fileEntry, this.file);
          removeFromLocalStorage(this.storageKey);
          return;
        }
      } catch {
      }
    }
    if (!this.abortController.signal.aborted) {
      this.abortController.abort();
    }
    if (!this.abortedByUser) {
      (_e = (_d = this.config).onError) == null ? void 0 : _e.call(_d, null, this.file);
    }
  }
  async abort() {
    this.abortedByUser = true;
    this.abortController.abort();
    await this.abortUploadOnS3();
  }
  async uploadParts() {
    const pendingChunks = this.chunks.filter((c) => !c.done);
    if (!pendingChunks.length) {
      return Promise.resolve("done");
    }
    const signedUrls = await this.batchSignUrls(
      pendingChunks.slice(0, batchSize)
    );
    if (!signedUrls)
      return;
    while (signedUrls.length) {
      const batch = signedUrls.splice(0, concurrency);
      const pendingUploads = batch.map((item) => {
        return this.uploadPartToS3(item);
      });
      const result = await Promise.all(pendingUploads);
      if (!result.every((r) => r))
        return;
    }
    return await this.uploadParts();
  }
  async batchSignUrls(batch) {
    const response = await this.chunkAxios.post(
      "api/v1/s3/multipart/batch-sign-part-urls",
      {
        partNumbers: batch.map((i) => i.partNumber),
        uploadId: this.uploadId,
        key: this.fileKey
      },
      { signal: this.abortController.signal }
    ).then((r) => r.data).catch((err) => {
      if (!this.abortController.signal.aborted) {
        this.abortController.abort();
      }
    });
    return response == null ? void 0 : response.urls;
  }
  async uploadPartToS3({
    url,
    partNumber
  }) {
    const chunk = this.chunks.find((c) => c.partNumber === partNumber);
    if (!chunk)
      return;
    return this.chunkAxios.put(url, chunk.blob, {
      withCredentials: false,
      signal: this.abortController.signal,
      onUploadProgress: (e) => {
        var _a2, _b2;
        if (!e.event.lengthComputable)
          return;
        chunk.bytesUploaded = e.loaded;
        const totalUploaded = this.chunks.reduce(
          (n, c) => n + c.bytesUploaded,
          0
        );
        (_b2 = (_a2 = this.config).onProgress) == null ? void 0 : _b2.call(_a2, {
          bytesUploaded: totalUploaded,
          bytesTotal: this.file.size
        });
      }
    }).then((r) => {
      const etag = r.headers.etag;
      if (etag) {
        chunk.done = true;
        chunk.etag = etag;
        return true;
      }
    }).catch((err) => {
      if (!this.abortController.signal.aborted && err !== void 0) {
        this.abortController.abort();
      }
    });
  }
  async createMultipartUpload() {
    const response = await apiClient.post("s3/multipart/create", {
      filename: this.file.name,
      mime: this.file.mime,
      size: this.file.size,
      extension: this.file.extension,
      ...this.config.metadata
    }).then((r) => r.data).catch((err) => {
      var _a2, _b2;
      if (err.code !== "ERR_CANCELED") {
        (_b2 = (_a2 = this.config).onError) == null ? void 0 : _b2.call(_a2, getAxiosErrorMessage(err), this.file);
      }
    });
    if (response) {
      this.uploadId = response.uploadId;
      this.fileKey = response.key;
      setInLocalStorage(this.storageKey, {
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        fileKey: this.fileKey,
        uploadId: this.uploadId
      });
    }
  }
  async getUploadedParts({ fileKey, uploadId }) {
    var _a2;
    const response = await apiClient.post("s3/multipart/get-uploaded-parts", {
      key: fileKey,
      uploadId
    }).then((r) => r.data).catch(() => {
      removeFromLocalStorage(this.storageKey);
      return null;
    });
    if ((_a2 = response == null ? void 0 : response.parts) == null ? void 0 : _a2.length) {
      this.uploadedParts = response.parts;
      this.uploadId = uploadId;
      this.fileKey = fileKey;
    }
  }
  async completeMultipartUpload() {
    return apiClient.post("s3/multipart/complete", {
      key: this.fileKey,
      uploadId: this.uploadId,
      parts: this.chunks.map((c) => {
        return {
          ETag: c.etag,
          PartNumber: c.partNumber
        };
      })
    }).then((r) => r.data).catch(() => {
      var _a2, _b2;
      (_b2 = (_a2 = this.config).onError) == null ? void 0 : _b2.call(_a2, null, this.file);
      this.abortUploadOnS3();
    }).finally(() => {
      removeFromLocalStorage(this.storageKey);
    });
  }
  async createFileEntry() {
    return await apiClient.post("s3/entries", {
      ...this.config.metadata,
      clientMime: this.file.mime,
      clientName: this.file.name,
      filename: this.fileKey.split("/").pop(),
      size: this.file.size,
      clientExtension: this.file.extension
    }).then((r) => r.data).catch();
  }
  prepareChunks() {
    var _a2;
    this.chunks = [];
    const minChunkSize = Math.max(5 * oneMB, Math.ceil(this.file.size / 1e4));
    const chunkSize = Math.max(desiredChunkSize, minChunkSize);
    if (this.file.size === 0) {
      this.chunks.push({
        blob: this.file.native,
        done: false,
        partNumber: 1,
        bytesUploaded: 0
      });
    } else {
      let partNumber = 1;
      for (let i = 0; i < this.file.size; i += chunkSize) {
        const end = Math.min(this.file.size, i + chunkSize);
        const previouslyUploaded = (_a2 = this.uploadedParts) == null ? void 0 : _a2.find(
          (p) => p.PartNumber === partNumber
        );
        this.chunks.push({
          blob: this.file.native.slice(i, end),
          done: !!previouslyUploaded,
          partNumber,
          etag: previouslyUploaded ? previouslyUploaded.ETag : void 0,
          bytesUploaded: (previouslyUploaded == null ? void 0 : previouslyUploaded.Size) ? parseInt(previouslyUploaded == null ? void 0 : previouslyUploaded.Size) : 0
        });
        partNumber++;
      }
    }
  }
  abortUploadOnS3() {
    return apiClient.post("s3/multipart/abort", {
      key: this.fileKey,
      uploadId: this.uploadId
    });
  }
  static async create(file, config) {
    return new S3MultipartUpload(file, config);
  }
}
var dist = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = _default;
  exports.setCookie = exports.getCookie = void 0;
  exports.stringifyOptions = stringifyOptions;
  var _react = React;
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null)
      return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i)
          break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null)
          _i["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var isBrowser = typeof window !== "undefined";
  function stringifyOptions(options) {
    return Object.keys(options).reduce(function(acc, key) {
      if (key === "days") {
        return acc;
      } else {
        if (options[key] === false) {
          return acc;
        } else if (options[key] === true) {
          return "".concat(acc, "; ").concat(key);
        } else {
          return "".concat(acc, "; ").concat(key, "=").concat(options[key]);
        }
      }
    }, "");
  }
  var setCookie = function setCookie2(name, value, options) {
    if (!isBrowser)
      return;
    var optionsWithDefaults = _objectSpread({
      days: 7,
      path: "/"
    }, options);
    var expires = new Date(Date.now() + optionsWithDefaults.days * 864e5).toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + expires + stringifyOptions(optionsWithDefaults);
  };
  exports.setCookie = setCookie;
  var getCookie2 = function getCookie3(name) {
    var initialValue = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    return isBrowser && document.cookie.split("; ").reduce(function(r, v) {
      var parts = v.split("=");
      return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, "") || initialValue;
  };
  exports.getCookie = getCookie2;
  function _default(key, initialValue) {
    var _useState = (0, _react.useState)(function() {
      return getCookie2(key, initialValue);
    }), _useState2 = _slicedToArray(_useState, 2), item = _useState2[0], setItem = _useState2[1];
    var updateItem = (0, _react.useCallback)(function(value, options) {
      setItem(value);
      setCookie(key, value, options);
    }, [key]);
    return [item, updateItem];
  }
})(dist);
class TusUpload {
  constructor(upload) {
    this.upload = upload;
  }
  start() {
    this.upload.start();
  }
  abort() {
    return this.upload.abort(true);
  }
  static async create(file, {
    onProgress,
    onSuccess,
    onError,
    metadata,
    chunkSize,
    baseUrl
  }) {
    const tusFingerprint = ["tus", file.fingerprint, "drive"].join("-");
    const upload = new Upload(file.native, {
      fingerprint: () => Promise.resolve(tusFingerprint),
      removeFingerprintOnSuccess: true,
      endpoint: `${baseUrl}/api/v1/tus/upload`,
      chunkSize,
      retryDelays: [0, 3e3, 5e3, 1e4, 2e4],
      overridePatchMethod: true,
      metadata: {
        name: window.btoa(file.id),
        clientName: file.name,
        clientExtension: file.extension,
        clientMime: file.mime || "",
        clientSize: `${file.size}`,
        ...metadata
      },
      headers: {
        "X-XSRF-TOKEN": dist.getCookie("XSRF-TOKEN")
      },
      onError: (err) => {
        var _a2;
        if ("originalResponse" in err && err.originalResponse) {
          try {
            const message2 = (_a2 = JSON.parse(err.originalResponse.getBody())) == null ? void 0 : _a2.message;
            onError == null ? void 0 : onError(message2, file);
          } catch (e) {
            onError == null ? void 0 : onError(null, file);
          }
        } else {
          onError == null ? void 0 : onError(null, file);
        }
      },
      onProgress(bytesUploaded, bytesTotal) {
        onProgress == null ? void 0 : onProgress({ bytesUploaded, bytesTotal });
      },
      onSuccess: async () => {
        var _a2;
        const uploadKey = (_a2 = upload.url) == null ? void 0 : _a2.split("/").pop();
        try {
          if (uploadKey) {
            const response = await createFileEntry(uploadKey);
            onSuccess == null ? void 0 : onSuccess(response.fileEntry, file);
          }
        } catch (err) {
          localStorage.removeItem(tusFingerprint);
          onError == null ? void 0 : onError(getAxiosErrorMessage(err), file);
        }
      }
    });
    const previousUploads = await upload.findPreviousUploads();
    if (previousUploads.length) {
      upload.resumeFromPreviousUpload(previousUploads[0]);
    }
    return new TusUpload(upload);
  }
}
function createFileEntry(uploadKey) {
  return apiClient.post("tus/entries", { uploadKey }).then((r) => r.data);
}
var Disk = /* @__PURE__ */ ((Disk2) => {
  Disk2["public"] = "public";
  Disk2["uploads"] = "uploads";
  return Disk2;
})(Disk || {});
class S3Upload {
  constructor(file, config) {
    __publicField(this, "abortController");
    __publicField(this, "presignedRequest");
    this.file = file;
    this.config = config;
    this.abortController = new AbortController();
  }
  async start() {
    var _a2, _b2, _c, _d;
    this.presignedRequest = await this.presignPostUrl();
    if (!this.presignedRequest)
      return;
    const result = await this.uploadFileToS3();
    if (result !== "uploaded")
      return;
    const response = await this.createFileEntry();
    if (response == null ? void 0 : response.fileEntry) {
      (_b2 = (_a2 = this.config).onSuccess) == null ? void 0 : _b2.call(_a2, response.fileEntry, this.file);
    } else if (!this.abortController.signal) {
      (_d = (_c = this.config).onError) == null ? void 0 : _d.call(_c, null, this.file);
    }
  }
  abort() {
    this.abortController.abort();
    return Promise.resolve();
  }
  presignPostUrl() {
    var _a2;
    return apiClient.post(
      "s3/simple/presign",
      {
        filename: this.file.name,
        mime: this.file.mime,
        disk: (_a2 = this.config.metadata) == null ? void 0 : _a2.disk,
        size: this.file.size,
        extension: this.file.extension,
        ...this.config.metadata
      },
      { signal: this.abortController.signal }
    ).then((r) => r.data).catch((err) => {
      var _a3, _b2;
      if (err.code !== "ERR_CANCELED") {
        (_b2 = (_a3 = this.config).onError) == null ? void 0 : _b2.call(_a3, getAxiosErrorMessage(err), this.file);
      }
    });
  }
  uploadFileToS3() {
    const { url, acl } = this.presignedRequest;
    return axios.put(url, this.file.native, {
      signal: this.abortController.signal,
      withCredentials: false,
      headers: {
        "Content-Type": this.file.mime,
        "x-amz-acl": acl
      },
      onUploadProgress: (e) => {
        var _a2, _b2;
        if (e.event.lengthComputable) {
          (_b2 = (_a2 = this.config).onProgress) == null ? void 0 : _b2.call(_a2, {
            bytesUploaded: e.loaded,
            bytesTotal: e.total || 0
          });
        }
      }
    }).then(() => "uploaded").catch((err) => {
      var _a2, _b2;
      if (err.code !== "ERR_CANCELED") {
        (_b2 = (_a2 = this.config).onError) == null ? void 0 : _b2.call(_a2, getAxiosErrorMessage(err), this.file);
      }
    });
  }
  async createFileEntry() {
    return await apiClient.post("s3/entries", {
      ...this.config.metadata,
      clientMime: this.file.mime,
      clientName: this.file.name,
      filename: this.presignedRequest.key.split("/").pop(),
      size: this.file.size,
      clientExtension: this.file.extension
    }).then((r) => {
      return r.data;
    }).catch((err) => {
      var _a2, _b2;
      if (err.code !== "ERR_CANCELED") {
        (_b2 = (_a2 = this.config).onError) == null ? void 0 : _b2.call(_a2, getAxiosErrorMessage(err), this.file);
      }
    });
  }
  static async create(file, config) {
    return new S3Upload(file, config);
  }
}
class AxiosUpload {
  constructor(file, config) {
    __publicField(this, "abortController");
    this.file = file;
    this.config = config;
    this.abortController = new AbortController();
  }
  async start() {
    const formData = new FormData();
    const { onSuccess, onError, onProgress, metadata } = this.config;
    formData.set("file", this.file.native);
    formData.set("workspaceId", `12`);
    if (metadata) {
      Object.entries(metadata).forEach(([key, value]) => {
        formData.set(key, `${value}`);
      });
    }
    const response = await apiClient.post("file-entries", formData, {
      onUploadProgress: (e) => {
        if (e.event.lengthComputable) {
          onProgress == null ? void 0 : onProgress({
            bytesUploaded: e.loaded,
            bytesTotal: e.total || 0
          });
        }
      },
      signal: this.abortController.signal,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).catch((err) => {
      if (err.code !== "ERR_CANCELED") {
        onError == null ? void 0 : onError(getAxiosErrorMessage(err), this.file);
      }
    });
    if (this.abortController.signal.aborted) {
      return;
    }
    if (response && response.data.fileEntry) {
      onSuccess == null ? void 0 : onSuccess(response.data.fileEntry, this.file);
    }
  }
  abort() {
    this.abortController.abort();
    return Promise.resolve();
  }
  static async create(file, config) {
    return new AxiosUpload(file, config);
  }
}
function prettyBytes(num, fractionDigits = 1) {
  if (num == null || Number.isNaN(num))
    return "";
  const neg = num < 0;
  const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  if (neg) {
    num = -num;
  }
  if (num < 1) {
    return `${(neg ? "-" : "") + num} B`;
  }
  const exponent = Math.min(
    Math.floor(Math.log(num) / Math.log(1024)),
    units.length - 1
  );
  num = Number(num / Math.pow(1024, exponent));
  const unit = units[exponent];
  if (num >= 10 || num % 1 === 0) {
    return `${(neg ? "-" : "") + num.toFixed(0)} ${unit}`;
  }
  return `${(neg ? "-" : "") + num.toFixed(fractionDigits)} ${unit}`;
}
function validateUpload(file, restrictions) {
  if (!restrictions)
    return;
  const { maxFileSize, allowedFileTypes, blockedFileTypes } = restrictions;
  if (maxFileSize && file.size != null && file.size > maxFileSize) {
    return message("`:file` exceeds maximum allowed size of :size", {
      values: { file: file.name, size: prettyBytes(maxFileSize) }
    });
  }
  if (allowedFileTypes == null ? void 0 : allowedFileTypes.length) {
    if (!fileMatchesTypes(file, allowedFileTypes)) {
      return message("This file type is not allowed");
    }
  }
  if (blockedFileTypes == null ? void 0 : blockedFileTypes.length) {
    if (fileMatchesTypes(file, blockedFileTypes)) {
      return message("This file type is not allowed");
    }
  }
}
function fileMatchesTypes(file, types) {
  return types.map((type) => type.split(",")).flat().some((type) => {
    if (type.includes("/")) {
      if (!file.mime)
        return false;
      return match(file.mime.replace(/;.*?$/, ""), type);
    }
    const extension = type.replace(".", "").toLowerCase();
    if (extension && file.extension) {
      return file.extension.toLowerCase() === extension;
    }
    return false;
  });
}
class ProgressTimeout {
  constructor() {
    __publicField(this, "aliveTimer");
    __publicField(this, "isDone", false);
    __publicField(this, "timeout", 3e4);
    __publicField(this, "timeoutHandler", null);
  }
  progress() {
    if (this.isDone || !this.timeoutHandler)
      return;
    if (this.timeout > 0) {
      clearTimeout(this.aliveTimer);
      this.aliveTimer = setTimeout(this.timeoutHandler, this.timeout);
    }
  }
  done() {
    if (!this.isDone) {
      clearTimeout(this.aliveTimer);
      this.aliveTimer = null;
      this.isDone = true;
    }
  }
}
async function startUploading(upload, state) {
  var _a2, _b2;
  const settings = getBootstrapData().settings;
  const options = upload.options;
  const file = upload.file;
  if (options == null ? void 0 : options.restrictions) {
    const errorMessage = validateUpload(file, options.restrictions);
    if (errorMessage) {
      state.updateFileUpload(file.id, {
        errorMessage,
        status: "failed",
        request: void 0,
        timer: void 0
      });
      if (options.showToastOnRestrictionFail) {
        toast.danger(errorMessage);
      }
      state.runQueue();
      return null;
    }
  }
  const timer = new ProgressTimeout();
  const config = {
    metadata: {
      ...options == null ? void 0 : options.metadata,
      relativePath: file.relativePath,
      disk: ((_a2 = options == null ? void 0 : options.metadata) == null ? void 0 : _a2.disk) || Disk.uploads,
      parentId: ((_b2 = options == null ? void 0 : options.metadata) == null ? void 0 : _b2.parentId) || ""
    },
    chunkSize: settings.uploads.chunk_size,
    baseUrl: settings.base_url,
    onError: (errorMessage) => {
      var _a3;
      state.updateFileUpload(file.id, {
        errorMessage,
        status: "failed"
      });
      state.runQueue();
      timer.done();
      (_a3 = options == null ? void 0 : options.onError) == null ? void 0 : _a3.call(options, errorMessage, file);
    },
    onSuccess: (entry) => {
      var _a3;
      state.updateFileUpload(file.id, {
        status: "completed",
        entry
      });
      state.runQueue();
      timer.done();
      (_a3 = options == null ? void 0 : options.onSuccess) == null ? void 0 : _a3.call(options, entry, file);
    },
    onProgress: ({ bytesUploaded, bytesTotal }) => {
      var _a3;
      const percentage = bytesUploaded / bytesTotal * 100;
      state.updateFileUpload(file.id, {
        percentage,
        bytesUploaded
      });
      timer.progress();
      (_a3 = options == null ? void 0 : options.onProgress) == null ? void 0 : _a3.call(options, { bytesUploaded, bytesTotal });
    }
  };
  const strategy = chooseUploadStrategy(file, config);
  const request = await strategy.create(file, config);
  timer.timeoutHandler = () => {
    request.abort();
    state.updateFileUpload(file.id, {
      status: "failed",
      errorMessage: message("Upload timed out")
    });
    state.runQueue();
  };
  state.updateFileUpload(file.id, {
    status: "inProgress",
    request
  });
  request.start();
  return request;
}
const OneMB = 1024 * 1024;
const FourMB = 4 * OneMB;
const HundredMB = 100 * OneMB;
const chooseUploadStrategy = (file, config) => {
  var _a2;
  const settings = getBootstrapData().settings;
  const disk = ((_a2 = config.metadata) == null ? void 0 : _a2.disk) || Disk.uploads;
  const driver = disk === Disk.uploads ? settings.uploads.uploads_driver : settings.uploads.public_driver;
  if ((driver == null ? void 0 : driver.endsWith("s3")) && settings.uploads.s3_direct_upload) {
    return file.size >= HundredMB ? S3MultipartUpload : S3Upload;
  } else {
    return file.size >= FourMB && !settings.uploads.disable_tus ? TusUpload : AxiosUpload;
  }
};
function extensionFromFilename(fullFileName) {
  var _a2;
  const re = /(?:\.([^.]+))?$/;
  return ((_a2 = re.exec(fullFileName)) == null ? void 0 : _a2[1]) || "";
}
function getFileMime(file) {
  const extensionsToMime = {
    md: "text/markdown",
    markdown: "text/markdown",
    mp4: "video/mp4",
    mp3: "audio/mp3",
    svg: "image/svg+xml",
    jpg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    yaml: "text/yaml",
    yml: "text/yaml"
  };
  const fileExtension = file.name ? extensionFromFilename(file.name) : null;
  if (file.type) {
    return file.type;
  }
  if (fileExtension && fileExtension in extensionsToMime) {
    return extensionsToMime[fileExtension];
  }
  return "application/octet-stream";
}
class UploadedFile {
  constructor(file, relativePath) {
    __publicField(this, "id");
    __publicField(this, "fingerprint");
    __publicField(this, "name");
    __publicField(this, "relativePath", "");
    __publicField(this, "size");
    __publicField(this, "mime", "");
    __publicField(this, "extension", "");
    __publicField(this, "native");
    __publicField(this, "lastModified");
    __publicField(this, "cachedData");
    this.id = nanoid();
    this.name = file.name;
    this.size = file.size;
    this.mime = getFileMime(file);
    this.lastModified = file.lastModified;
    this.extension = extensionFromFilename(file.name) || "bin";
    this.native = file;
    relativePath = relativePath || file.webkitRelativePath || "";
    relativePath = relativePath.replace(/^\/+/g, "");
    if (relativePath && relativePath.split("/").length > 1) {
      this.relativePath = relativePath;
    }
    this.fingerprint = generateId({
      name: this.name,
      size: this.size,
      mime: this.mime,
      lastModified: this.lastModified
    });
  }
  get data() {
    return new Promise((resolve) => {
      if (this.cachedData) {
        resolve(this.cachedData);
      }
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        this.cachedData = reader.result;
        resolve(this.cachedData);
      });
      if (this.extension === "json") {
        reader.readAsText(this.native);
      } else {
        reader.readAsDataURL(this.native);
      }
    });
  }
}
function generateId({ name, mime, size: size2, relativePath, lastModified }) {
  let id = "be";
  if (typeof name === "string") {
    id += `-${encodeFilename(name.toLowerCase())}`;
  }
  if (mime) {
    id += `-${mime}`;
  }
  if (typeof relativePath === "string") {
    id += `-${encodeFilename(relativePath.toLowerCase())}`;
  }
  if (size2 !== void 0) {
    id += `-${size2}`;
  }
  if (lastModified !== void 0) {
    id += `-${lastModified}`;
  }
  id += `${getActiveWorkspaceId()}`;
  return `${id}-v1`;
}
function encodeCharacter(character) {
  return character.charCodeAt(0).toString(32);
}
function encodeFilename(name) {
  let suffix = "";
  return name.replace(/[^A-Z0-9]/gi, (character) => {
    suffix += `-${encodeCharacter(character)}`;
    return "/";
  }) + suffix;
}
function createUpload(file, options) {
  const uploadedFile = file instanceof UploadedFile ? file : new UploadedFile(file);
  return {
    file: uploadedFile,
    percentage: 0,
    bytesUploaded: 0,
    status: "pending",
    options: options || {}
  };
}
enableMapSet();
const initialState = {
  concurrency: 3,
  fileUploads: /* @__PURE__ */ new Map(),
  activeUploadsCount: 0,
  completedUploadsCount: 0
};
const createFileUploadStore = ({ settings }) => create()(
  immer((set, get) => {
    return {
      ...initialState,
      reset: () => {
        set(initialState);
      },
      getUpload: (uploadId) => {
        return get().fileUploads.get(uploadId);
      },
      clearInactive: () => {
        set((state) => {
          state.fileUploads.forEach((upload, key) => {
            if (upload.status !== "inProgress") {
              state.fileUploads.delete(key);
            }
          });
        });
        get().runQueue();
      },
      abortUpload: (id) => {
        var _a2;
        const upload = get().fileUploads.get(id);
        if (upload) {
          (_a2 = upload.request) == null ? void 0 : _a2.abort();
          get().updateFileUpload(id, { status: "aborted", percentage: 0 });
          get().runQueue();
        }
      },
      updateFileUpload: (id, newUploadState) => {
        set((state) => {
          const fileUpload = state.fileUploads.get(id);
          if (fileUpload) {
            state.fileUploads.set(id, {
              ...fileUpload,
              ...newUploadState
            });
            if ("status" in newUploadState) {
              updateTotals(state);
            }
          }
        });
      },
      uploadSingle: (file, userOptions) => {
        const upload = createUpload(file, userOptions);
        const fileUploads = new Map(get().fileUploads);
        fileUploads.set(upload.file.id, upload);
        set((state) => {
          updateTotals(state);
          state.fileUploads = fileUploads;
        });
        get().runQueue();
        return upload.file.id;
      },
      uploadMultiple: (files, options) => {
        const uploads = new Map(get().fileUploads);
        [...files].forEach((file) => {
          const upload = createUpload(file, options);
          uploads.set(upload.file.id, upload);
        });
        set((state) => {
          updateTotals(state);
          state.fileUploads = uploads;
        });
        get().runQueue();
        return [...uploads.keys()];
      },
      runQueue: async () => {
        const uploads = [...get().fileUploads.values()];
        const activeUploads = uploads.filter((u) => u.status === "inProgress");
        let concurrency2 = get().concurrency;
        if (activeUploads.filter(
          (activeUpload) => (
            // only upload one file from folder at a time to avoid creating duplicate folders
            activeUpload.file.relativePath || // only allow one s3 multipart upload at a time, it will already upload multiple parts in parallel
            activeUpload.request instanceof S3MultipartUpload || // only allow one tus upload if file is larger than chunk size, tus will have parallel uploads already in that case
            activeUpload.request instanceof TusUpload && settings.uploads.chunk_size && activeUpload.file.size > settings.uploads.chunk_size
          )
        ).length) {
          concurrency2 = 1;
        }
        if (activeUploads.length < concurrency2) {
          const next = uploads.find((u) => u.status === "pending");
          if (next) {
            await startUploading(next, get());
          }
        }
      }
    };
  })
);
const updateTotals = (state) => {
  state.completedUploadsCount = [...state.fileUploads.values()].filter(
    (u) => u.status === "completed"
  ).length;
  state.activeUploadsCount = [...state.fileUploads.values()].filter(
    (u) => u.status === "inProgress" || u.status === "pending"
  ).length;
};
const FileUploadContext = createContext(null);
const useFileUploadStore = (selector, equalityFn) => {
  const store = useContext(FileUploadContext);
  return useStore(store, selector, equalityFn);
};
function FileUploadProvider({ children }) {
  const settings = useSettings();
  const [store] = useState(() => {
    return createFileUploadStore({ settings });
  });
  return /* @__PURE__ */ jsx(FileUploadContext.Provider, { value: store, children });
}
const Switch = React.forwardRef(
  (props, ref) => {
    const {
      children,
      size: size2 = "sm",
      description,
      className,
      invalid,
      autoFocus,
      errorMessage,
      iconRight,
      ...domProps
    } = props;
    const inputRef = useObjectRef(ref);
    useAutoFocus({ autoFocus }, inputRef);
    const style = getSizeClassName(size2);
    const fieldClassNames = getInputFieldClassNames(props);
    const descriptionId = useId();
    return /* @__PURE__ */ jsxs("div", { className: clsx(className, "isolate"), children: [
      /* @__PURE__ */ jsxs("label", { className: "flex select-none items-center", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            ...domProps,
            type: "checkbox",
            role: "switch",
            "aria-invalid": invalid || void 0,
            "aria-describedby": description ? descriptionId : void 0,
            ref: inputRef,
            "aria-checked": domProps.checked,
            className: clsx(
              style,
              !invalid && "checked:border-primary checked:bg-primary dark:checked:border-primary-dark dark:checked:bg-primary-dark",
              invalid && "checked:border-danger checked:bg-danger",
              "relative flex flex-shrink-0 cursor-pointer appearance-none items-center overflow-hidden rounded-3xl border border-chip bg-chip p-0 outline-none transition-colors checked:border-primary checked:bg-primary",
              "before:z-10 before:block before:translate-x-2 before:rounded-3xl before:border before:bg-white before:transition-transform",
              "checked:before:border-white",
              "focus-visible:ring",
              props.disabled && "cursor-not-allowed opacity-80"
            )
          }
        ),
        children && /* @__PURE__ */ jsx(
          "span",
          {
            className: clsx(
              fieldClassNames.size.font,
              "ml-12",
              invalid && "text-danger",
              props.disabled && "text-disabled"
            ),
            children
          }
        ),
        iconRight
      ] }),
      description && !errorMessage && /* @__PURE__ */ jsx("div", { id: descriptionId, className: fieldClassNames.description, children: description }),
      errorMessage && /* @__PURE__ */ jsx("div", { id: descriptionId, className: fieldClassNames.error, children: errorMessage })
    ] });
  }
);
function FormSwitch(props) {
  const {
    field: { onChange, onBlur, value = false, ref },
    fieldState: { invalid, error }
  } = useController({
    name: props.name
  });
  const formProps = {
    onChange: (e) => {
      if (e.target.value && e.target.value !== "on") {
        onChange(e.target.checked ? e.target.value : false);
      } else {
        onChange(e);
      }
    },
    onBlur,
    checked: !!value,
    invalid,
    errorMessage: error == null ? void 0 : error.message,
    name: props.name
  };
  return /* @__PURE__ */ jsx(Switch, { ref, ...mergeProps(props, formProps) });
}
function getSizeClassName(size2) {
  switch (size2) {
    case "xl":
      return "w-68 h-36 before:w-28 before:h-28 checked:before:translate-x-36";
    case "lg":
      return "w-56 h-30 before:w-22 before:h-22 checked:before:translate-x-30";
    case "md":
      return "w-46 h-24 before:w-18 before:h-18 checked:before:translate-x-24";
    case "xs":
      return "w-30 h-18 before:w-12 before:h-12 checked:before:translate-x-14";
    default:
      return "w-38 h-20 before:w-14 before:h-14 checked:before:translate-x-20";
  }
}
function createUploadInput(config = {}) {
  const old = document.querySelector("#hidden-file-upload-input");
  if (old)
    old.remove();
  const input = document.createElement("input");
  input.type = "file";
  input.multiple = config.multiple ?? false;
  input.classList.add("hidden");
  input.style.display = "none";
  input.style.visibility = "hidden";
  input.id = "hidden-file-upload-input";
  input.accept = buildUploadInputAccept(config);
  if (config.directory) {
    input.webkitdirectory = true;
  }
  document.body.appendChild(input);
  return input;
}
function buildUploadInputAccept({
  extensions = [],
  types = []
}) {
  const accept = [];
  if (extensions == null ? void 0 : extensions.length) {
    extensions = extensions.map((e) => {
      return e.startsWith(".") ? e : `.${e}`;
    });
    accept.push(extensions.join(","));
  }
  if (types == null ? void 0 : types.length) {
    accept.push(types.join(","));
  }
  return accept.join(",");
}
function openUploadWindow(config = {}) {
  return new Promise((resolve) => {
    const input = createUploadInput(config);
    input.onchange = (e) => {
      const fileList = e.target.files;
      if (!fileList) {
        return resolve([]);
      }
      const uploads = Array.from(fileList).filter((f) => f.name !== ".DS_Store").map((file) => new UploadedFile(file));
      resolve(uploads);
      input.remove();
    };
    document.body.appendChild(input);
    input.click();
  });
}
function deleteFileEntries(payload) {
  return apiClient.post("file-entries/delete", payload).then((r) => r.data);
}
function useDeleteFileEntries() {
  return useMutation({
    mutationFn: (props) => deleteFileEntries(props),
    onError: (err) => showHttpErrorToast(err)
  });
}
function useActiveUpload() {
  const deleteFileEntries2 = useDeleteFileEntries();
  const uploadIdRef = useRef();
  const uploadSingle = useFileUploadStore((s) => s.uploadSingle);
  const _abortUpload = useFileUploadStore((s) => s.abortUpload);
  const updateFileUpload = useFileUploadStore((s) => s.updateFileUpload);
  const activeUpload = useFileUploadStore(
    (s) => uploadIdRef.current ? s.fileUploads.get(uploadIdRef.current) : null
  );
  const uploadFile = useCallback(
    (file, config) => {
      uploadIdRef.current = uploadSingle(file, config);
    },
    [uploadSingle]
  );
  const selectAndUploadFile = useCallback(
    async (config) => {
      var _a2;
      const files = await openUploadWindow({
        types: (_a2 = config == null ? void 0 : config.restrictions) == null ? void 0 : _a2.allowedFileTypes
      });
      uploadFile(files[0], config);
      return files[0];
    },
    [uploadFile]
  );
  const deleteEntry = useCallback(
    ({ onSuccess, entryPath }) => {
      var _a2, _b2, _c;
      const handleSuccess = () => {
        if (activeUpload) {
          updateFileUpload(activeUpload.file.id, {
            ...activeUpload,
            entry: void 0
          });
        }
        onSuccess();
      };
      if (!entryPath && !((_a2 = activeUpload == null ? void 0 : activeUpload.entry) == null ? void 0 : _a2.id)) {
        handleSuccess();
        return;
      }
      deleteFileEntries2.mutate(
        {
          paths: entryPath ? [entryPath] : void 0,
          entryIds: ((_b2 = activeUpload == null ? void 0 : activeUpload.entry) == null ? void 0 : _b2.id) ? [(_c = activeUpload == null ? void 0 : activeUpload.entry) == null ? void 0 : _c.id] : void 0,
          deleteForever: true
        },
        { onSuccess: handleSuccess }
      );
    },
    [deleteFileEntries2, activeUpload, updateFileUpload]
  );
  const abortUpload = useCallback(() => {
    if (activeUpload) {
      _abortUpload(activeUpload.file.id);
    }
  }, [activeUpload, _abortUpload]);
  return {
    uploadFile,
    selectAndUploadFile,
    percentage: (activeUpload == null ? void 0 : activeUpload.percentage) || 0,
    uploadStatus: activeUpload == null ? void 0 : activeUpload.status,
    entry: activeUpload == null ? void 0 : activeUpload.entry,
    deleteEntry,
    isDeletingEntry: deleteFileEntries2.isPending,
    activeUpload,
    abortUpload
  };
}
var UploadInputType = /* @__PURE__ */ ((UploadInputType2) => {
  UploadInputType2["image"] = "image/*";
  UploadInputType2["audio"] = "audio/*";
  UploadInputType2["text"] = "text/*";
  UploadInputType2["json"] = "application/json";
  UploadInputType2["video"] = "video/mp4,video/mpeg,video/x-m4v,video/*";
  return UploadInputType2;
})(UploadInputType || {});
function ProgressBarBase(props) {
  let {
    value = 0,
    minValue = 0,
    maxValue = 100,
    size: size2 = "md",
    label,
    showValueLabel = !!label,
    isIndeterminate = false,
    labelPosition = "top",
    className,
    role,
    formatOptions = {
      style: "percent"
    },
    radius = "rounded",
    trackColor = "bg-primary-light",
    progressColor = "bg-primary",
    trackHeight = getSize$1(size2)
  } = props;
  const id = useId();
  value = clamp(value, minValue, maxValue);
  const percentage = (value - minValue) / (maxValue - minValue);
  const formatter = useNumberFormatter(formatOptions);
  let valueLabel = "";
  if (!isIndeterminate && showValueLabel) {
    const valueToFormat = formatOptions.style === "percent" ? percentage : value;
    valueLabel = formatter.format(valueToFormat);
  }
  const barStyle = {};
  if (!isIndeterminate) {
    barStyle.width = `${Math.round(percentage * 100)}%`;
  }
  const style = getInputFieldClassNames({ size: size2 });
  const labelEl = (label || valueLabel) && /* @__PURE__ */ jsxs("div", { className: clsx("flex gap-10 justify-between my-4", style.label), children: [
    label && /* @__PURE__ */ jsx("span", { id, children: label }),
    valueLabel && /* @__PURE__ */ jsx("div", { children: valueLabel })
  ] });
  return /* @__PURE__ */ jsxs(
    "div",
    {
      "aria-valuenow": isIndeterminate ? void 0 : value,
      "aria-valuemin": minValue,
      "aria-valuemax": maxValue,
      "aria-valuetext": isIndeterminate ? void 0 : valueLabel,
      "aria-labelledby": label ? id : void 0,
      role: role || "progressbar",
      className: clsx(className, "min-w-42"),
      children: [
        labelPosition === "top" && labelEl,
        /* @__PURE__ */ jsx("div", { className: `${trackHeight} ${radius} ${trackColor} overflow-hidden`, children: /* @__PURE__ */ jsx(
          "div",
          {
            className: clsx(
              progressColor,
              "fill h-full transition-width duration-200 rounded-l",
              isIndeterminate && "progress-bar-indeterminate-animate"
            ),
            style: barStyle
          }
        ) }),
        labelPosition === "bottom" && labelEl
      ]
    }
  );
}
function getSize$1(size2) {
  switch (size2) {
    case "sm":
      return "h-6";
    case "xs":
      return "h-4";
    default:
      return "h-8";
  }
}
function ProgressBar(props) {
  return /* @__PURE__ */ jsx(ProgressBarBase, { ...props });
}
const AddAPhotoIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M21 6h-3.17L16 4h-6v2h5.12l1.83 2H21v12H5v-9H3v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM8 14c0 2.76 2.24 5 5 5s5-2.24 5-5-2.24-5-5-5-5 2.24-5 5zm5-3c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3zM5 6h3V4H5V1H3v3H0v2h3v3h2z" }),
  "AddAPhotoOutlined"
);
const AvatarPlaceholderIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M24,12 C28.418278,12 32,15.581722 32,20 L32,22 C32,26.418278 28.418278,30 24,30 C19.581722,30 16,26.418278 16,22 L16,20 C16,15.581722 19.581722,12 24,12 Z M24,32 C33.8734019,32 42.1092023,38.8710577 44,48 L4,48 C5.89079771,38.8710577 14.1265981,32 24,32 Z" })
);
const TwoMB = 2 * 1024 * 1024;
function ImageSelector({
  className,
  label,
  description,
  value,
  onChange,
  defaultValue,
  diskPrefix,
  showRemoveButton,
  showEditButtonOnHover = false,
  invalid,
  errorMessage,
  required,
  autoFocus,
  variant = "input",
  previewSize = "h-80",
  placeholderIcon,
  stretchPreview = false,
  previewRadius,
  disabled
}) {
  const {
    uploadFile,
    entry,
    uploadStatus,
    deleteEntry,
    isDeletingEntry,
    percentage
  } = useActiveUpload();
  const inputRef = useRef(null);
  useAutoFocus({ autoFocus }, inputRef);
  const fieldId = useId();
  const labelId = label ? `${fieldId}-label` : void 0;
  const descriptionId = description ? `${fieldId}-description` : void 0;
  const imageUrl = value || (entry == null ? void 0 : entry.url);
  const uploadOptions = {
    showToastOnRestrictionFail: true,
    restrictions: {
      allowedFileTypes: [UploadInputType.image],
      maxFileSize: TwoMB
    },
    metadata: {
      diskPrefix,
      disk: Disk.public
    },
    onSuccess: (entry2) => {
      onChange == null ? void 0 : onChange(entry2.url);
    },
    onError: (message2) => {
      if (message2) {
        toast.danger(message2);
      }
    }
  };
  const inputFieldClassNames = getInputFieldClassNames({
    description,
    descriptionPosition: "top",
    invalid
  });
  let VariantElement;
  if (variant === "avatar") {
    VariantElement = AvatarVariant;
  } else if (variant === "square") {
    VariantElement = SquareVariant;
  } else {
    VariantElement = InputVariant;
  }
  const removeButton = showRemoveButton ? /* @__PURE__ */ jsx(
    Button,
    {
      variant: "link",
      color: "danger",
      size: "xs",
      disabled: isDeletingEntry || !imageUrl || disabled,
      onClick: () => {
        deleteEntry({
          onSuccess: () => onChange == null ? void 0 : onChange("")
        });
      },
      children: /* @__PURE__ */ jsx(Trans, { message: "Remove image" })
    }
  ) : null;
  const useDefaultButton = defaultValue != null && value !== defaultValue ? /* @__PURE__ */ jsx(
    Button,
    {
      variant: "outline",
      color: "primary",
      size: "xs",
      disabled,
      onClick: () => {
        onChange == null ? void 0 : onChange(defaultValue);
      },
      children: /* @__PURE__ */ jsx(Trans, { message: "Use default" })
    }
  ) : null;
  const handleUpload = useCallback(() => {
    var _a2;
    (_a2 = inputRef.current) == null ? void 0 : _a2.click();
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: clsx("text-sm", className), children: [
    label && /* @__PURE__ */ jsx("div", { id: labelId, className: inputFieldClassNames.label, children: label }),
    description && /* @__PURE__ */ jsx("div", { className: inputFieldClassNames.description, children: description }),
    /* @__PURE__ */ jsx("div", { "aria-labelledby": labelId, "aria-describedby": descriptionId, children: /* @__PURE__ */ jsxs(
      Field,
      {
        fieldClassNames: inputFieldClassNames,
        errorMessage,
        invalid,
        children: [
          /* @__PURE__ */ jsx(
            VariantElement,
            {
              inputFieldClassNames,
              placeholderIcon,
              previewSize,
              isLoading: uploadStatus === "inProgress",
              imageUrl,
              removeButton,
              useDefaultButton,
              showEditButtonOnHover,
              stretchPreview,
              previewRadius,
              handleUpload,
              disabled,
              children: /* @__PURE__ */ jsx(
                "input",
                {
                  ref: inputRef,
                  "aria-labelledby": labelId,
                  "aria-describedby": descriptionId,
                  required: imageUrl ? false : required,
                  accept: UploadInputType.image,
                  type: "file",
                  disabled: uploadStatus === "inProgress",
                  className: "sr-only",
                  onChange: (e) => {
                    var _a2;
                    if ((_a2 = e.target.files) == null ? void 0 : _a2.length) {
                      uploadFile(e.target.files[0], uploadOptions);
                    }
                  }
                }
              )
            }
          ),
          uploadStatus === "inProgress" && /* @__PURE__ */ jsx(
            ProgressBar,
            {
              className: "absolute left-0 right-0 top-0",
              size: "xs",
              value: percentage
            }
          )
        ]
      }
    ) })
  ] });
}
function InputVariant({
  children,
  inputFieldClassNames,
  imageUrl,
  previewSize,
  stretchPreview,
  isLoading,
  handleUpload,
  removeButton,
  useDefaultButton,
  disabled
}) {
  if (imageUrl) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: `${previewSize} relative mb-10 overflow-hidden rounded border bg-fg-base/8 p-6`,
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                className: clsx(
                  "mx-auto h-full rounded",
                  stretchPreview ? "object-cover" : "object-contain"
                ),
                onClick: () => handleUpload(),
                src: imageUrl,
                alt: ""
              }
            ),
            children
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: () => handleUpload(),
          disabled: isLoading || disabled,
          className: "mr-10",
          variant: "outline",
          color: "primary",
          size: "xs",
          children: /* @__PURE__ */ jsx(Trans, { message: "Replace" })
        }
      ),
      removeButton && cloneElement(removeButton, { variant: "outline" }),
      useDefaultButton && cloneElement(useDefaultButton, { variant: "outline" })
    ] });
  }
  return cloneElement(children, {
    className: clsx(
      inputFieldClassNames.input,
      "py-8",
      "file:bg-primary file:text-on-primary file:border-none file:rounded file:text-sm file:font-semibold file:px-10 file:h-24 file:mr-10"
    )
  });
}
function SquareVariant({
  children,
  placeholderIcon,
  previewSize,
  imageUrl,
  stretchPreview,
  handleUpload,
  removeButton,
  useDefaultButton,
  previewRadius = "rounded",
  showEditButtonOnHover = false,
  disabled
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: clsx(
          previewSize,
          previewRadius,
          !imageUrl && "border",
          "group z-20 flex flex-col items-center justify-center gap-14 bg-fg-base/8 bg-center bg-no-repeat",
          stretchPreview ? "bg-cover" : "bg-contain p-6"
        ),
        style: imageUrl ? { backgroundImage: `url(${imageUrl})` } : void 0,
        onClick: () => handleUpload(),
        children: [
          placeholderIcon && !imageUrl && cloneElement(placeholderIcon, { size: "lg" }),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "raised",
              color: "white",
              size: "xs",
              className: clsx(
                showEditButtonOnHover && "invisible group-hover:visible"
              ),
              disabled,
              children: imageUrl ? /* @__PURE__ */ jsx(Trans, { message: "Replace image" }) : /* @__PURE__ */ jsx(Trans, { message: "Upload image" })
            }
          )
        ]
      }
    ),
    children,
    (removeButton || useDefaultButton) && /* @__PURE__ */ jsxs("div", { className: "mt-8", children: [
      removeButton && cloneElement(removeButton, { variant: "link" }),
      useDefaultButton && cloneElement(useDefaultButton, { variant: "link" })
    ] })
  ] });
}
function AvatarVariant({
  children,
  placeholderIcon,
  previewSize,
  isLoading,
  imageUrl,
  removeButton,
  useDefaultButton,
  handleUpload,
  previewRadius = "rounded-full",
  disabled
}) {
  if (!placeholderIcon) {
    placeholderIcon = /* @__PURE__ */ jsx(
      AvatarPlaceholderIcon,
      {
        viewBox: "0 0 48 48",
        className: clsx(
          "h-full w-full bg-primary-light/40 text-primary/40",
          previewRadius
        )
      }
    );
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: clsx("relative", previewSize),
        onClick: () => handleUpload(),
        children: [
          imageUrl ? /* @__PURE__ */ jsx(
            "img",
            {
              src: imageUrl,
              className: clsx("h-full w-full object-cover", previewRadius),
              alt: ""
            }
          ) : placeholderIcon,
          /* @__PURE__ */ jsx("div", { className: "absolute -bottom-6 -right-6 rounded-full bg-background shadow-xl", children: /* @__PURE__ */ jsx(
            IconButton,
            {
              disabled: isLoading || disabled,
              type: "button",
              variant: "outline",
              size: "sm",
              color: "primary",
              radius: "rounded-full",
              children: /* @__PURE__ */ jsx(AddAPhotoIcon, {})
            }
          ) })
        ]
      }
    ),
    children,
    (removeButton || useDefaultButton) && /* @__PURE__ */ jsxs("div", { className: "mt-14", children: [
      removeButton && cloneElement(removeButton, { variant: "link" }),
      useDefaultButton && cloneElement(useDefaultButton, { variant: "link" })
    ] })
  ] });
}
function FormImageSelector(props) {
  const {
    field: { onChange, value = null },
    fieldState: { error }
  } = useController({
    name: props.name
  });
  const formProps = {
    onChange,
    value,
    invalid: error != null,
    errorMessage: error ? /* @__PURE__ */ jsx(Trans, { message: "Please select an image." }) : null
  };
  return /* @__PURE__ */ jsx(ImageSelector, { ...mergeProps(formProps, props) });
}
const ImageIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86-3 3.87L9 13.14 6 17h12l-3.86-5.14z" }),
  "ImageOutlined"
);
function CrupdatePlaylistFields() {
  const { trans } = useTrans();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "md:flex gap-28", children: [
      /* @__PURE__ */ jsx(FileUploadProvider, { children: /* @__PURE__ */ jsx(
        FormImageSelector,
        {
          name: "image",
          diskPrefix: "playlist_media",
          variant: "square",
          previewSize: "w-160 h-160",
          className: "mb-24 md:mb-0",
          placeholderIcon: /* @__PURE__ */ jsx(ImageIcon, {}),
          showRemoveButton: true,
          stretchPreview: true
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-auto mb-34", children: [
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            autoFocus: true,
            name: "name",
            label: /* @__PURE__ */ jsx(Trans, { message: "Name" }),
            className: "mb-24"
          }
        ),
        /* @__PURE__ */ jsx(
          FormSwitch,
          {
            name: "collaborative",
            description: /* @__PURE__ */ jsx(Trans, { message: "Invite other users to add tracks." }),
            className: "mb-24",
            children: /* @__PURE__ */ jsx(Trans, { message: "Collaborative" })
          }
        ),
        /* @__PURE__ */ jsx(
          FormSwitch,
          {
            name: "public",
            description: /* @__PURE__ */ jsx(Trans, { message: "Everyone can see public playlists." }),
            children: /* @__PURE__ */ jsx(Trans, { message: "Public" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: "description",
        label: /* @__PURE__ */ jsx(Trans, { message: "Description" }),
        inputElementType: "textarea",
        rows: 4,
        placeholder: trans(message("Give your playlist a catchy description."))
      }
    )
  ] });
}
function useCreatePlaylist(form) {
  return useMutation({
    mutationFn: (props) => createPlaylist(props),
    onSuccess: () => {
      toast(message("Playlist created"));
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
    },
    onError: (r) => onFormQueryError(r, form)
  });
}
function createPlaylist(payload) {
  return apiClient.post("playlists", payload).then((r) => r.data);
}
function CreatePlaylistDialog() {
  const { close: close2, formId } = useDialogContext();
  const form = useForm();
  const createPlaylist2 = useCreatePlaylist(form);
  return /* @__PURE__ */ jsxs(Dialog, { size: "xl", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "New playlist" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      Form,
      {
        id: formId,
        form,
        onSubmit: (values) => {
          createPlaylist2.mutate(values, {
            onSuccess: (response) => {
              close2(response.playlist);
            }
          });
        },
        children: /* @__PURE__ */ jsx(CrupdatePlaylistFields, {})
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: () => close2(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          form: formId,
          type: "submit",
          variant: "flat",
          color: "primary",
          disabled: createPlaylist2.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Create" })
        }
      )
    ] })
  ] });
}
function useAuthClickCapture() {
  const dialogContext = useDialogContext();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  return useCallback(
    (e) => {
      if (!isLoggedIn) {
        e.preventDefault();
        e.stopPropagation();
        if (dialogContext) {
          dialogContext.close();
        }
        navigate("/login");
      }
    },
    [navigate, isLoggedIn, dialogContext]
  );
}
function PlaylistPanel() {
  const { data } = useAuthUserPlaylists();
  const { user } = useAuth();
  const { close: closeMenu } = useDialogContext();
  const { loadTracks: loadTracks2, setPlaylistPanelIsActive } = useContext(
    ContextMenuLayoutState
  );
  const addToPlaylist = useAddTracksToPlaylist();
  const playlists = useMemo(() => {
    return data.playlists.filter(
      (p) => p.owner_id === (user == null ? void 0 : user.id) || p.collaborative
    );
  }, [data, user]);
  return /* @__PURE__ */ jsxs(
    m.div,
    {
      initial: { x: "100%", opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: "-100%", opacity: 0 },
      transition: { type: "tween", duration: 0.14 },
      children: [
        /* @__PURE__ */ jsx("div", { className: "border-b pb-10 my-10 px-10", children: /* @__PURE__ */ jsx(
          Button,
          {
            startIcon: /* @__PURE__ */ jsx(KeyboardBackspaceIcon, {}),
            onClick: () => setPlaylistPanelIsActive(false),
            children: /* @__PURE__ */ jsx(Trans, { message: "Back" })
          }
        ) }),
        /* @__PURE__ */ jsxs("ul", { className: "overflow-y-auto overflow-x-hidden max-h-350", children: [
          /* @__PURE__ */ jsx(
            ContextMenuButton,
            {
              startIcon: /* @__PURE__ */ jsx(AddIcon, {}),
              onClick: async () => {
                closeMenu();
                const [playlist, tracks] = await Promise.all([
                  openDialog(CreatePlaylistDialog),
                  loadTracks2()
                ]);
                if (tracks.length && playlist) {
                  addToPlaylist.mutate({
                    playlistId: playlist.id,
                    tracks
                  });
                }
              },
              className: "text-primary",
              children: /* @__PURE__ */ jsx(Trans, { message: "New playlist" })
            }
          ),
          playlists.map((playlist) => /* @__PURE__ */ jsx(
            ContextMenuButton,
            {
              onClick: async () => {
                closeMenu();
                const tracks = await loadTracks2();
                if ((tracks == null ? void 0 : tracks.length) && !addToPlaylist.isPending) {
                  addToPlaylist.mutate({
                    playlistId: playlist.id,
                    tracks
                  });
                } else {
                  toast(message("This item does not have tracks yet"));
                }
              },
              children: playlist.name
            },
            playlist.id
          ))
        ] })
      ]
    }
  );
}
function PlaylistPanelButton() {
  const authHandler = useAuthClickCapture();
  const { playlistPanelIsActive, setPlaylistPanelIsActive } = useContext(
    ContextMenuLayoutState
  );
  return /* @__PURE__ */ jsx(
    ContextMenuButton,
    {
      endIcon: /* @__PURE__ */ jsx(KeyboardArrowRightIcon, {}),
      onClickCapture: authHandler,
      onClick: () => {
        setPlaylistPanelIsActive(!playlistPanelIsActive);
      },
      children: /* @__PURE__ */ jsx(Trans, { message: "Add to playlist" })
    }
  );
}
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
const ContextMenuLayoutState = createContext(null);
function ContextDialogLayout({
  image,
  title,
  description,
  children,
  loadTracks: loadTracks2
}) {
  const [playlistPanelIsActive, setPlaylistPanelIsActive] = useState(false);
  const { close: close2 } = useDialogContext();
  const contextValue = useMemo(() => {
    return {
      playlistPanelIsActive,
      setPlaylistPanelIsActive,
      loadTracks: loadTracks2
    };
  }, [playlistPanelIsActive, loadTracks2]);
  const { pathname } = useLocation();
  const previousPathname = usePrevious(pathname);
  useEffect(() => {
    if (previousPathname && previousPathname !== pathname) {
      close2();
    }
  }, [pathname, previousPathname, close2]);
  const header = image || title ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-14 border-b p-14 mb-10", children: [
    image && cloneElement(image, { className: "w-44 h-44 rounded" }),
    /* @__PURE__ */ jsxs("div", { className: "whitespace-nowrap overflow-hidden overflow-ellipsis", children: [
      title,
      description && /* @__PURE__ */ jsx("div", { className: "text-xs text-muted", children: description })
    ] })
  ] }) : null;
  return /* @__PURE__ */ jsx(ContextMenuLayoutState.Provider, { value: contextValue, children: /* @__PURE__ */ jsx(Dialog, { size: "xs", children: /* @__PURE__ */ jsx(
    DialogBody,
    {
      padding: "p-0",
      onContextMenu: (e) => {
        e.preventDefault();
        e.stopPropagation();
      },
      children: /* @__PURE__ */ jsxs("div", { className: "pb-10", children: [
        header,
        /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: playlistPanelIsActive ? /* @__PURE__ */ jsx(PlaylistPanel, {}, "playlist-panel") : /* @__PURE__ */ jsx("ul", { className: "text-base md:text-sm", children }, "menu") })
      ] })
    }
  ) }) });
}
const ContextMenuButton = forwardRef(
  ({
    children,
    endIcon,
    startIcon,
    className,
    type = "button",
    to,
    ...buttonProps
  }, ref) => {
    const Element = type === "button" ? "button" : Link;
    return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
      Element,
      {
        ...buttonProps,
        to,
        ref,
        className: clsx(
          "flex items-center gap-12 py-12 px-20 hover:bg-hover cursor-pointer outline-none focus-visible:ring focus-visible:ring-inset w-full text-left",
          className
        ),
        children: [
          startIcon,
          /* @__PURE__ */ jsx("span", { className: "mr-auto whitespace-nowrap overflow-hidden overflow-ellipsis min-w-0", children }),
          endIcon
        ]
      }
    ) });
  }
);
function usePlaylistPermissions(playlist) {
  const { user } = useAuth();
  const isCreator = !!((user == null ? void 0 : user.id) && user.id === playlist.owner_id);
  return { canEdit: isCreator, canDelete: isCreator, isCreator };
}
function useIsFollowingPlaylist(playlistId) {
  const { data } = useAuthUserPlaylists();
  const { user } = useAuth();
  const playlist = data.playlists.find((p) => p.id === +playlistId);
  if (playlist && user && user.id !== playlist.owner_id) {
    return true;
  }
  return false;
}
function useUpdatePlaylist({
  form,
  playlistId
} = {}) {
  const params = useParams();
  if (params.playlistId && !playlistId) {
    playlistId = params.playlistId;
  }
  return useMutation({
    mutationFn: (props) => updatePlaylist(playlistId, props),
    onSuccess: () => {
      toast(message("Playlist updated"));
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
    },
    onError: (r) => form ? onFormQueryError(r, form) : showHttpErrorToast(r)
  });
}
function updatePlaylist(playlistId, payload) {
  return apiClient.put(`playlists/${playlistId}`, payload).then((r) => r.data);
}
function UpdatePlaylistDialog({ playlist }) {
  const { close: close2, formId } = useDialogContext();
  const form = useForm({
    defaultValues: {
      name: playlist.name,
      public: playlist.public,
      collaborative: playlist.collaborative,
      image: playlist.image,
      description: playlist.description
    }
  });
  const updatePlaylist2 = useUpdatePlaylist({ form, playlistId: playlist.id });
  return /* @__PURE__ */ jsxs(Dialog, { size: "xl", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Update playlist" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      Form,
      {
        id: formId,
        form,
        onSubmit: (values) => {
          updatePlaylist2.mutate(values, {
            onSuccess: (response) => {
              close2(response.playlist);
            }
          });
        },
        children: /* @__PURE__ */ jsx(CrupdatePlaylistFields, {})
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: () => close2(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          form: formId,
          type: "submit",
          variant: "flat",
          color: "primary",
          disabled: updatePlaylist2.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Update" })
        }
      )
    ] })
  ] });
}
function ConfirmationDialog({
  className,
  title,
  body,
  confirm: confirm2,
  isDanger,
  isLoading,
  onConfirm
}) {
  const { close: close2 } = useDialogContext();
  return /* @__PURE__ */ jsxs(Dialog, { className, size: "sm", role: "alertdialog", children: [
    /* @__PURE__ */ jsx(
      DialogHeader,
      {
        color: isDanger ? "text-danger" : null,
        leftAdornment: /* @__PURE__ */ jsx(ErrorOutlineIcon, { className: "icon-sm" }),
        children: title
      }
    ),
    /* @__PURE__ */ jsx(DialogBody, { children: body }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "text",
          onClick: () => {
            close2(false);
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          disabled: isLoading,
          variant: "flat",
          color: isDanger ? "danger" : "primary",
          onClick: () => {
            onConfirm == null ? void 0 : onConfirm();
            if (!onConfirm) {
              close2(true);
            }
          },
          children: confirm2
        }
      )
    ] })
  ] });
}
function useDeletePlaylist(playlistId) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { getRedirectUri } = useAuth();
  return useMutation({
    mutationFn: () => deletePlaylist(playlistId),
    onSuccess: () => {
      toast(message("Playlist deleted"));
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      if (pathname.startsWith(`/playlist/${playlistId}`)) {
        navigate(getRedirectUri());
      }
    },
    onError: (r) => showHttpErrorToast(r)
  });
}
function deletePlaylist(playlistId) {
  return apiClient.delete(`playlists/${playlistId}`).then((r) => r.data);
}
function useFollowPlaylist(playlist) {
  return useMutation({
    mutationFn: () => followPlaylist(playlist.id),
    onSuccess: () => {
      toast(message("Following :name", { values: { name: playlist.name } }));
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
    },
    onError: (r) => showHttpErrorToast(r)
  });
}
function followPlaylist(playlistId) {
  return apiClient.post(`playlists/${playlistId}/follow`).then((r) => r.data);
}
function useUnfollowPlaylist(playlist) {
  return useMutation({
    mutationFn: () => unfollowPlaylist(playlist.id),
    onSuccess: () => {
      toast(
        message("Stopped following :name", { values: { name: playlist.name } })
      );
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
    },
    onError: (r) => showHttpErrorToast(r)
  });
}
function unfollowPlaylist(playlistId) {
  return apiClient.post(`playlists/${playlistId}/unfollow`).then((r) => r.data);
}
function AddToQueueButton({ item, loadTracks: loadTracks2 }) {
  const { close: closeMenu } = useDialogContext();
  const player = usePlayerActions();
  return /* @__PURE__ */ jsx(
    ContextMenuButton,
    {
      onClick: async () => {
        closeMenu();
        const tracks = await loadTracks2();
        player.appendToQueue(
          tracksToMediaItems(
            tracks,
            Array.isArray(item) ? void 0 : queueGroupId(item)
          )
        );
      },
      children: /* @__PURE__ */ jsx(Trans, { message: "Add to queue" })
    }
  );
}
const TabContext = React.createContext(null);
function Tabs(props) {
  const {
    size: size2 = "md",
    children,
    className,
    isLazy,
    overflow = "overflow-hidden"
  } = props;
  const tabsRef = useRef([]);
  const id = useId();
  const [selectedTab, setSelectedTab] = useControlledState(
    props.selectedTab,
    props.defaultSelectedTab || 0,
    props.onTabChange
  );
  const ContextValue = useMemo(() => {
    return {
      selectedTab,
      setSelectedTab,
      tabsRef,
      size: size2,
      isLazy,
      id
    };
  }, [selectedTab, id, isLazy, setSelectedTab, size2]);
  return /* @__PURE__ */ jsx(TabContext.Provider, { value: ContextValue, children: /* @__PURE__ */ jsx("div", { className: clsx(className, overflow, "max-w-full"), children }) });
}
function TabLine() {
  const { tabsRef, selectedTab } = useContext(TabContext);
  const [style, setStyle] = useState({
    width: void 0,
    transform: void 0,
    className: void 0
  });
  useLayoutEffect(() => {
    if (selectedTab != null && tabsRef.current) {
      const el = tabsRef.current[selectedTab];
      if (!el)
        return;
      setStyle((prevState) => {
        return {
          width: `${el.offsetWidth}px`,
          transform: `translateX(${el.offsetLeft}px)`,
          // disable initial transition for tabline
          className: prevState.width === void 0 ? "" : "transition-all"
        };
      });
    }
  }, [setStyle, selectedTab, tabsRef]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        "absolute bottom-0 left-0 h-2 bg-primary",
        style.className
      ),
      role: "presentation",
      style: { width: style.width, transform: style.transform }
    }
  );
}
function TabList({ children, center, expand, className }) {
  const childrenArray = Children.toArray(children);
  return /* @__PURE__ */ jsx(FocusScope, { children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        // hide scrollbar completely on mobile, show compact one on desktop
        "flex relative max-w-full overflow-auto border-b max-sm:hidden-scrollbar md:compact-scrollbar",
        className
      ),
      role: "tablist",
      "aria-orientation": "horizontal",
      children: [
        childrenArray.map((child, index) => {
          if (isValidElement(child)) {
            return cloneElement(child, {
              index,
              className: clsx(
                child.props.className,
                expand && "flex-auto",
                center && index === 0 && "ml-auto",
                center && index === childrenArray.length - 1 && "mr-auto"
              )
            });
          }
          return null;
        }),
        /* @__PURE__ */ jsx(TabLine, {})
      ]
    }
  ) });
}
function Tab({
  index,
  className,
  isDisabled,
  children,
  padding: paddingProp,
  elementType = "button",
  to,
  relative,
  width = "min-w-min"
}) {
  const {
    selectedTab,
    setSelectedTab,
    tabsRef,
    size: size2 = "md",
    id
  } = useContext(TabContext);
  const isSelected = index === selectedTab;
  const focusManager = useFocusManager();
  const padding = paddingProp || (size2 === "sm" ? "px-12" : "px-18");
  const mergedClassname = clsx(
    "tracking-wide overflow-hidden capitalize text-sm flex items-center justify-center outline-none transition-colors",
    "focus-visible:ring focus-visible:ring-2 ring-inset rounded whitespace-nowrap cursor-pointer",
    width,
    textColor({ isDisabled, isSelected }),
    className,
    size2 === "md" && `${padding} h-48`,
    size2 === "sm" && `${padding} h-32`,
    isDisabled && "pointer-events-none"
  );
  const onKeyDown = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        focusManager == null ? void 0 : focusManager.focusPrevious();
        break;
      case "ArrowRight":
        focusManager == null ? void 0 : focusManager.focusNext();
        break;
      case "Home":
        focusManager == null ? void 0 : focusManager.focusFirst();
        break;
      case "End":
        focusManager == null ? void 0 : focusManager.focusLast();
        break;
    }
  };
  const tabIndex = isSelected ? 0 : -1;
  const Element = elementType;
  return /* @__PURE__ */ jsx(
    Element,
    {
      disabled: isDisabled,
      id: `${id}-${index}-tab`,
      "aria-controls": `${id}-${index}-tabpanel`,
      type: "button",
      role: "tab",
      "aria-selected": isSelected,
      tabIndex: isDisabled ? void 0 : tabIndex,
      onKeyDown,
      onClick: () => {
        setSelectedTab(index);
      },
      to,
      relative,
      className: mergedClassname,
      ref: (el) => {
        if (tabsRef.current && el) {
          tabsRef.current[index] = el;
        }
      },
      children
    }
  );
}
function textColor({ isDisabled, isSelected }) {
  if (isDisabled) {
    return "text-disabled cursor-default";
  }
  if (isSelected) {
    return "text-primary";
  }
  return "text-muted hover:text-main";
}
function TabPanels({ children, className }) {
  const { selectedTab, isLazy } = useContext(TabContext);
  const panelArray = Children.toArray(children).filter((p) => !!p);
  let rendered;
  if (isLazy) {
    const el = panelArray[selectedTab];
    rendered = isValidElement(el) ? cloneElement(panelArray[selectedTab], {
      index: selectedTab
    }) : null;
  } else {
    rendered = panelArray.map((panel, index) => {
      if (isValidElement(panel)) {
        const isSelected = index === selectedTab;
        return cloneElement(panel, {
          index,
          "aria-hidden": !isSelected,
          className: !isSelected ? clsx(panel.props.className, "hidden") : panel.props.className
        });
      }
      return null;
    });
  }
  return /* @__PURE__ */ jsx("div", { className, children: rendered });
}
function TabPanel({
  className,
  children,
  index,
  ...domProps
}) {
  const { id } = useContext(TabContext);
  const [tabIndex, setTabIndex] = useState(0);
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (ref == null ? void 0 : ref.current) {
      const update = () => {
        const walker = getFocusableTreeWalker(ref.current, { tabbable: true });
        setTabIndex(walker.nextNode() ? void 0 : 0);
      };
      update();
      const observer = new MutationObserver(update);
      observer.observe(ref.current, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ["tabIndex", "disabled"]
      });
      return () => {
        observer.disconnect();
      };
    }
  }, [ref]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      tabIndex,
      ref,
      id: `${id}-${index}-tabpanel`,
      "aria-labelledby": `${id}-${index}-tab`,
      className: clsx(className, "focus-visible:outline-primary-light"),
      role: "tabpanel",
      ...domProps,
      children
    }
  );
}
function shareLinkSocially(network, link2, name, image) {
  const url = generateShareUrl(network, link2, name, image);
  if (network === "mail") {
    window.location.href = url;
  } else {
    openNewWindow(url);
  }
}
function openNewWindow(url) {
  const width = 575, height = 400, left = (window.innerWidth - width) / 2, top = (window.innerHeight - height) / 2, opts = "status=1, scrollbars=1,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left;
  window.open(url, "share", opts);
}
function generateShareUrl(type, link2, name, image) {
  switch (type) {
    case "facebook":
      return "https://www.facebook.com/sharer/sharer.php?u=" + link2;
    case "twitter":
      return `https://twitter.com/intent/tweet?text=${name}&url=${link2}`;
    case "pinterest":
      return "https://pinterest.com/pin/create/button/?url=" + link2 + "&media=" + image;
    case "tumblr":
      const base = "https://www.tumblr.com/widgets/share/tool?shareSource=legacy&canonicalUrl=&posttype=photo&title=&caption=";
      return base + name + "&content=" + image + "&url=" + link2;
    case "blogger":
      return "https://www.blogger.com/blog_this.pyra?t&u=" + link2 + "&n=" + name;
    case "mail":
      return `mailto:?subject=Check out this link.&body=${link2}`;
  }
}
const TumblrIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M390,32H120c-49.19,0-88,38.81-88,88V390c0,49.19,38.81,90,88,90H390c49.19,0,90-40.81,90-90V120C480,70.81,439.19,32,390,32ZM336,396H284c-42.51,0-72-23.68-72-76V240H176V192c42.51-11,57.95-48.32,60-80h44v72h52v56H280l-.39,70.51c0,21.87,11,29.43,28.62,29.43L336,340Z" })
);
const ShareIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" }),
  "ShareOutlined"
);
function ShareMediaButtons({
  link: link2,
  name,
  image,
  size: size2 = "lg"
}) {
  const share = (network) => {
    shareLinkSocially(network, link2, name, image);
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      IconButton,
      {
        size: size2,
        onClick: () => share("facebook"),
        className: "text-facebook",
        children: /* @__PURE__ */ jsx(FacebookIcon, {})
      }
    ),
    /* @__PURE__ */ jsx(
      IconButton,
      {
        size: size2,
        onClick: () => share("twitter"),
        className: "text-twitter",
        children: /* @__PURE__ */ jsx(TwitterIcon, {})
      }
    ),
    /* @__PURE__ */ jsx(
      IconButton,
      {
        size: size2,
        onClick: () => share("tumblr"),
        className: "text-tumblr",
        children: /* @__PURE__ */ jsx(TumblrIcon, { viewBox: "0 0 512 512" })
      }
    ),
    navigator.share && /* @__PURE__ */ jsx(
      IconButton,
      {
        size: size2,
        onClick: () => {
          try {
            navigator.share({
              title: name,
              url: link2
            });
          } catch (e) {
            if (e.name !== "AbortError") {
              toast(message("Could not share link"));
            }
          }
        },
        className: "text-muted",
        children: /* @__PURE__ */ jsx(ShareIcon, {})
      }
    )
  ] });
}
function ShareMediaDialog({ item }) {
  const { close: close2 } = useDialogContext();
  return /* @__PURE__ */ jsxs(Dialog, { size: "xl", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Share :name", values: { name: item.name } }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: item.model_type === "artist" || item.model_type === "playlist" ? /* @__PURE__ */ jsx(SharePanel, { item }) : /* @__PURE__ */ jsxs(Tabs, { children: [
      /* @__PURE__ */ jsxs(TabList, { children: [
        /* @__PURE__ */ jsx(Tab, { children: /* @__PURE__ */ jsx(Trans, { message: "Share" }) }),
        /* @__PURE__ */ jsx(Tab, { children: /* @__PURE__ */ jsx(Trans, { message: "Embed" }) })
      ] }),
      /* @__PURE__ */ jsxs(TabPanels, { className: "pt-20", children: [
        /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(SharePanel, { item }) }),
        /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(EmbedPanel, { item }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(Button, { onClick: () => close2(), children: /* @__PURE__ */ jsx(Trans, { message: "Close" }) }) })
  ] });
}
function EmbedPanel({ item }) {
  const isMobile = useIsMobileMediaQuery();
  const link2 = `${getLink(item)}/embed`;
  const height = item.model_type === "track" ? 174 : 384;
  const code = `<iframe width="100%" height="${height}" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" src="${link2}"></iframe>`;
  return /* @__PURE__ */ jsxs("div", { children: [
    !isMobile && /* @__PURE__ */ jsx(
      "iframe",
      {
        src: link2,
        width: "100%",
        height,
        allow: "autoplay; fullscreen; picture-in-picture",
        allowFullScreen: true
      }
    ),
    /* @__PURE__ */ jsx(
      TextField,
      {
        className: "mt-20",
        inputElementType: "textarea",
        readOnly: true,
        value: code,
        rows: 3,
        onClick: (e) => {
          e.currentTarget.focus();
          e.currentTarget.select();
        }
      }
    )
  ] });
}
function SharePanel({ item }) {
  const link2 = getLink(item);
  const inputRef = useRef(null);
  const [copied, copyLink] = useCopyClipboard(link2, { successDuration: 600 });
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-14", children: [
    /* @__PURE__ */ jsx(
      MediaImage,
      {
        item,
        size: "w-128 h-128",
        className: "rounded object-cover flex-shrink-0 max-md:hidden"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex-auto", children: [
      /* @__PURE__ */ jsx("div", { className: "text-xl mb-8", children: item.name }),
      /* @__PURE__ */ jsx(
        TextField,
        {
          className: "mb-8",
          inputRef,
          readOnly: true,
          onClick: (e) => {
            e.currentTarget.focus();
            e.currentTarget.select();
          },
          value: link2,
          endAppend: /* @__PURE__ */ jsx(
            Button,
            {
              variant: "flat",
              color: "primary",
              onClick: () => {
                var _a2;
                (_a2 = inputRef.current) == null ? void 0 : _a2.select();
                copyLink();
              },
              children: copied ? /* @__PURE__ */ jsx(Trans, { message: "Copied!" }) : /* @__PURE__ */ jsx(Trans, { message: "Copy" })
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        ShareMediaButtons,
        {
          link: link2,
          image: "image" in item ? item.image : item.image_small,
          name: item.name
        }
      )
    ] })
  ] });
}
function MediaImage({ item, className, size: size2 }) {
  switch (item.model_type) {
    case "artist":
      return /* @__PURE__ */ jsx(
        SmallArtistImage,
        {
          size: size2,
          className,
          wrapperClassName: "max-md:hidden",
          artist: item
        }
      );
    case "album":
      return /* @__PURE__ */ jsx(AlbumImage, { size: size2, className, album: item });
    case "track":
      return /* @__PURE__ */ jsx(TrackImage, { size: size2, className, track: item });
    case "playlist":
      return /* @__PURE__ */ jsx(PlaylistImage, { size: size2, className, playlist: item });
  }
}
function getLink(item) {
  switch (item.model_type) {
    case "artist":
      return getArtistLink(item, { absolute: true });
    case "album":
      return getAlbumLink(item, { absolute: true });
    case "track":
      return getTrackLink(item, { absolute: true });
    case "playlist":
      return getPlaylistLink(item, { absolute: true });
  }
}
function ShareMediaButton({ item }) {
  const { close: closeMenu } = useDialogContext();
  return /* @__PURE__ */ jsx(
    ContextMenuButton,
    {
      onClick: () => {
        closeMenu();
        openDialog(ShareMediaDialog, {
          item
        });
      },
      children: /* @__PURE__ */ jsx(Trans, { message: "Share" })
    }
  );
}
function PlaylistContextDialog({ playlist }) {
  const { close: closeMenu } = useDialogContext();
  const [, copyAlbumLink] = useCopyClipboard(
    getPlaylistLink(playlist, { absolute: true })
  );
  const { canEdit } = usePlaylistPermissions(playlist);
  const loadTracks2 = useCallback(() => {
    return loadPlaylistTracks(playlist);
  }, [playlist]);
  return /* @__PURE__ */ jsxs(
    ContextDialogLayout,
    {
      image: /* @__PURE__ */ jsx(PlaylistImage, { playlist }),
      title: /* @__PURE__ */ jsx(PlaylistLink, { playlist }),
      description: /* @__PURE__ */ jsx(PlaylistOwnerName, { playlist }),
      loadTracks: loadTracks2,
      children: [
        /* @__PURE__ */ jsx(AddToQueueButton, { item: playlist, loadTracks: loadTracks2 }),
        /* @__PURE__ */ jsx(TogglePublicButton, { playlist }),
        /* @__PURE__ */ jsx(ToggleCollaborativeButton, { playlist }),
        /* @__PURE__ */ jsx(FollowButtons, { playlist }),
        /* @__PURE__ */ jsx(
          ContextMenuButton,
          {
            onClick: () => {
              copyAlbumLink();
              closeMenu();
              toast(message("Copied link to clipboard"));
            },
            children: /* @__PURE__ */ jsx(Trans, { message: "Copy playlist link" })
          }
        ),
        playlist.public && /* @__PURE__ */ jsx(ShareMediaButton, { item: playlist }),
        canEdit && /* @__PURE__ */ jsx(
          ContextMenuButton,
          {
            onClick: () => {
              closeMenu();
              openDialog(UpdatePlaylistDialog, { playlist });
            },
            children: /* @__PURE__ */ jsx(Trans, { message: "Edit" })
          }
        ),
        /* @__PURE__ */ jsx(DeleteButton$3, { playlist })
      ]
    }
  );
}
function FollowButtons({ playlist }) {
  const isFollowing = useIsFollowingPlaylist(playlist.id);
  const { close: closeMenu } = useDialogContext();
  const followPlaylist2 = useFollowPlaylist(playlist);
  const unFollowPlaylist = useUnfollowPlaylist(playlist);
  const { isCreator } = usePlaylistPermissions(playlist);
  if (isCreator) {
    return null;
  }
  return /* @__PURE__ */ jsx(Fragment, { children: !isFollowing ? /* @__PURE__ */ jsx(
    ContextMenuButton,
    {
      onClick: () => {
        closeMenu();
        followPlaylist2.mutate();
      },
      children: /* @__PURE__ */ jsx(Trans, { message: "Follow" })
    }
  ) : /* @__PURE__ */ jsx(
    ContextMenuButton,
    {
      onClick: () => {
        closeMenu();
        unFollowPlaylist.mutate();
      },
      children: /* @__PURE__ */ jsx(Trans, { message: "Unfollow" })
    }
  ) });
}
function TogglePublicButton({ playlist }) {
  const { close: closeMenu } = useDialogContext();
  const updatePlaylist2 = useUpdatePlaylist({ playlistId: playlist.id });
  const { isCreator } = usePlaylistPermissions(playlist);
  if (!isCreator) {
    return null;
  }
  const togglePublic = () => {
    closeMenu();
    updatePlaylist2.mutate({ public: !playlist.public });
  };
  return /* @__PURE__ */ jsx(
    ContextMenuButton,
    {
      disabled: updatePlaylist2.isPending,
      onClick: () => togglePublic(),
      children: playlist.public ? /* @__PURE__ */ jsx(Trans, { message: "Make private" }) : /* @__PURE__ */ jsx(Trans, { message: "Make public" })
    }
  );
}
function ToggleCollaborativeButton({ playlist }) {
  const { close: closeMenu } = useDialogContext();
  const updatePlaylist2 = useUpdatePlaylist({ playlistId: playlist.id });
  const { isCreator } = usePlaylistPermissions(playlist);
  if (!isCreator) {
    return null;
  }
  const toggleCollaborative = () => {
    closeMenu();
    updatePlaylist2.mutate({ collaborative: !playlist.collaborative });
  };
  return /* @__PURE__ */ jsx(
    ContextMenuButton,
    {
      disabled: updatePlaylist2.isPending,
      startIcon: playlist.collaborative ? /* @__PURE__ */ jsx(CheckIcon, {}) : void 0,
      onClick: () => toggleCollaborative(),
      children: /* @__PURE__ */ jsx(Trans, { message: "Collaborative" })
    }
  );
}
function DeleteButton$3({ playlist }) {
  const { close: closeMenu } = useDialogContext();
  const deletePlaylist2 = useDeletePlaylist(playlist.id);
  const { canDelete } = usePlaylistPermissions(playlist);
  if (!canDelete) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    ContextMenuButton,
    {
      disabled: deletePlaylist2.isPending,
      onClick: () => {
        closeMenu();
        openDialog(ConfirmationDialog, {
          isDanger: true,
          title: /* @__PURE__ */ jsx(Trans, { message: "Delete playlist" }),
          body: /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to delete this playlist?" }),
          confirm: /* @__PURE__ */ jsx(Trans, { message: "Delete" }),
          onConfirm: () => {
            deletePlaylist2.mutate();
          }
        });
      },
      children: /* @__PURE__ */ jsx(Trans, { message: "Delete" })
    }
  );
}
async function loadPlaylistTracks(playlist) {
  if (typeof playlist.tracks === "undefined") {
    const tracks = await loadMediaItemTracks(queueGroupId(playlist));
    if (!tracks.length) {
      toast(message("This playlist has no tracks yet."));
    }
    return tracks;
  }
  return playlist.tracks;
}
const FavoriteIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" }),
  "FavoriteOutlined"
);
const FavoriteBorderIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" }),
  "FavoriteBorderOutlined"
);
function FollowPlaylistButton({
  playlist,
  size: size2 = "sm",
  className,
  buttonType = "text",
  radius
}) {
  const { isCreator } = usePlaylistPermissions(playlist);
  const follow = useFollowPlaylist(playlist);
  const unfollow = useUnfollowPlaylist(playlist);
  const isFollowing = useIsFollowingPlaylist(playlist.id);
  const isLoading = follow.isPending || unfollow.isPending;
  if (isCreator) {
    return null;
  }
  if (buttonType === "icon") {
    if (isFollowing) {
      return /* @__PURE__ */ jsx(
        IconButton,
        {
          size: size2,
          radius,
          color: "primary",
          className,
          disabled: isLoading,
          onClick: () => unfollow.mutate(),
          children: /* @__PURE__ */ jsx(FavoriteIcon, {})
        }
      );
    }
    return /* @__PURE__ */ jsx(
      IconButton,
      {
        size: size2,
        radius,
        disabled: isLoading,
        className,
        onClick: () => follow.mutate(),
        children: /* @__PURE__ */ jsx(FavoriteBorderIcon, {})
      }
    );
  }
  if (isFollowing) {
    return /* @__PURE__ */ jsx(
      Button,
      {
        size: size2,
        variant: "outline",
        radius: radius || "rounded-full",
        startIcon: /* @__PURE__ */ jsx(FavoriteIcon, { className: "text-primary" }),
        disabled: isLoading,
        className,
        onClick: () => unfollow.mutate(),
        children: /* @__PURE__ */ jsx(Trans, { message: "Following" })
      }
    );
  }
  return /* @__PURE__ */ jsx(
    Button,
    {
      size: size2,
      variant: "outline",
      radius: radius || "rounded-full",
      startIcon: /* @__PURE__ */ jsx(FavoriteBorderIcon, {}),
      disabled: isLoading,
      className,
      onClick: () => follow.mutate(),
      children: /* @__PURE__ */ jsx(Trans, { message: "Follow" })
    }
  );
}
function PlaylistGridItem({ playlist }) {
  return /* @__PURE__ */ jsx(
    PlayableGridItem,
    {
      image: /* @__PURE__ */ jsx(PlaylistImage, { playlist }),
      title: /* @__PURE__ */ jsx(PlaylistLink, { playlist }),
      subtitle: /* @__PURE__ */ jsx(PlaylistOwnerName, { playlist }),
      link: getPlaylistLink(playlist),
      likeButton: /* @__PURE__ */ jsx(FollowPlaylistButton, { buttonType: "icon", size: "md", playlist }),
      model: playlist,
      contextDialog: /* @__PURE__ */ jsx(PlaylistContextDialog, { playlist })
    }
  );
}
function PlaylistOwnerName({ playlist }) {
  var _a2;
  const owner = playlist.owner || ((_a2 = playlist.editors) == null ? void 0 : _a2[0]);
  if (!owner) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    Trans,
    {
      message: "By :name",
      values: {
        name: /* @__PURE__ */ jsx(UserProfileLink, { user: owner })
      }
    }
  );
}
function createCountableStore(key) {
  const items = getBootstrapData()[key];
  return create()(
    immer((set, get) => ({
      track: (items == null ? void 0 : items.track) || {},
      album: (items == null ? void 0 : items.album) || {},
      artist: items && "artist" in items && (items == null ? void 0 : items.artist) || {},
      has: (item) => {
        const items2 = Array.isArray(item) ? item : [item];
        return items2.every((item2) => {
          return get()[item2.model_type][item2.id];
        });
      },
      add: (items2) => {
        const type = items2[0].model_type;
        set((state) => {
          items2.forEach((item) => {
            state[type][item.id] = true;
          });
        });
      },
      remove: (items2) => {
        const type = items2[0].model_type;
        set((state) => {
          items2.forEach((item) => {
            delete state[type][item.id];
          });
        });
      }
    }))
  );
}
const useLibraryStore = createCountableStore("likes");
const userLibrary = useLibraryStore.getState;
function useAddItemsToLibrary() {
  return useMutation({
    mutationFn: (payload) => addToLibrary$1(payload),
    onSuccess: (response, payload) => {
      toast(getMessage$1(payload.likeables[0]));
      userLibrary().add(payload.likeables);
      queryClient.invalidateQueries({
        queryKey: [`${payload.likeables[0].model_type}s`, "library"]
      });
    },
    onError: (r) => showHttpErrorToast(r)
  });
}
function addToLibrary$1(payload) {
  const likeables = payload.likeables.filter((likeable) => {
    return !userLibrary().has(likeable);
  }).map((likeable) => {
    return {
      likeable_id: likeable.id,
      likeable_type: likeable.model_type
    };
  });
  return apiClient.post("users/me/add-to-library", { likeables }).then((r) => r.data);
}
function getMessage$1(likeable) {
  switch (likeable.model_type) {
    case "artist":
      return message("Added to your artists");
    case "album":
      return message("Added to your albums");
    case "track":
      return message("Added to your liked songs");
  }
}
function useRemoveItemsFromLibrary() {
  return useMutation({
    mutationFn: (payload) => addToLibrary(payload),
    onSuccess: (response, payload) => {
      toast(getMessage(payload.likeables[0]));
      userLibrary().remove(payload.likeables);
      queryClient.invalidateQueries({
        queryKey: [`${payload.likeables[0].model_type}s`, "library"]
      });
    },
    onError: (r) => showHttpErrorToast(r)
  });
}
function addToLibrary(payload) {
  const likeables = payload.likeables.filter((likeable) => {
    return userLibrary().has(likeable);
  }).map((likeable) => {
    return {
      likeable_id: likeable.id,
      likeable_type: likeable.model_type
    };
  });
  return apiClient.post("users/me/remove-from-library", { likeables }).then((r) => r.data);
}
function getMessage(likeable) {
  switch (likeable.model_type) {
    case "artist":
      return message("Removed from your artists");
    case "album":
      return message("Removed from your albums");
    case "track":
      return message("Removed from your liked songs");
  }
}
function ToggleInLibraryMenuButton({
  items,
  modelType
}) {
  const authHandler = useAuthClickCapture();
  const { close: closeMenu } = useDialogContext();
  const addToLibrary2 = useAddItemsToLibrary();
  const removeFromLibrary = useRemoveItemsFromLibrary();
  const allInLibrary = useLibraryStore((s) => s.has(items));
  if (allInLibrary) {
    const label2 = modelType === "artist" ? /* @__PURE__ */ jsx(Trans, { message: "Following" }) : /* @__PURE__ */ jsx(Trans, { message: "Remove from your music" });
    return /* @__PURE__ */ jsx(
      ContextMenuButton,
      {
        onClickCapture: authHandler,
        onClick: () => {
          closeMenu();
          removeFromLibrary.mutate({ likeables: items });
        },
        children: label2
      }
    );
  }
  const label = modelType === "artist" ? /* @__PURE__ */ jsx(Trans, { message: "Follow" }) : /* @__PURE__ */ jsx(Trans, { message: "Add to your music" });
  return /* @__PURE__ */ jsx(
    ContextMenuButton,
    {
      onClickCapture: authHandler,
      onClick: () => {
        closeMenu();
        addToLibrary2.mutate({ likeables: items });
      },
      children: label
    }
  );
}
function CopyLinkMenuButton({ link: link2, children }) {
  const { close: closeMenu } = useDialogContext();
  const [, copyLink] = useCopyClipboard(link2);
  return /* @__PURE__ */ jsx(
    ContextMenuButton,
    {
      onClick: () => {
        copyLink();
        closeMenu();
        toast(message("Copied link to clipboard"));
      },
      children
    }
  );
}
function useArtistPermissions(artist) {
  const { user, hasPermission } = useAuth();
  return useMemo(() => {
    var _a2;
    const permissions = {
      canEdit: false,
      canDelete: false
    };
    if (user == null ? void 0 : user.id) {
      const managesArtist = !!((_a2 = user.artists) == null ? void 0 : _a2.find((a) => a.id === artist.id));
      permissions.canEdit = hasPermission("artists.update") || hasPermission("music.update") || managesArtist;
      permissions.canDelete = hasPermission("artists.delete") || hasPermission("music.delete") || managesArtist;
    }
    return permissions;
  }, [user, artist, hasPermission]);
}
function useDeleteArtist(artistId) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { getRedirectUri } = useAuth();
  return useMutation({
    mutationFn: () => deleteArtist(artistId),
    onSuccess: () => {
      toast(message("Artist deleted"));
      if (pathname.startsWith(`/artist/${artistId}`)) {
        navigate(getRedirectUri());
      }
      queryClient.invalidateQueries({ queryKey: ["tracks"] });
      queryClient.invalidateQueries({ queryKey: ["albums"] });
      queryClient.invalidateQueries({ queryKey: ["artists"] });
    },
    onError: (r) => showHttpErrorToast(r)
  });
}
function deleteArtist(artistId) {
  return apiClient.delete(`artists/${artistId}`).then((r) => r.data);
}
function getRadioLink(seed, { absolute } = {}) {
  let link2 = `/radio/${seed.model_type}/${seed.id}/${slugifyString(seed.name)}`;
  if (absolute) {
    link2 = `${getBootstrapData().settings.base_url}${link2}`;
  }
  return link2;
}
function useShouldShowRadioButton() {
  const { player, artist_provider } = useSettings();
  return !(player == null ? void 0 : player.hide_radio_button) && artist_provider === "spotify";
}
function ArtistContextDialog({ artist }) {
  const showRadioButton = useShouldShowRadioButton();
  const { canEdit } = useArtistPermissions(artist);
  const loadTracks2 = useCallback(() => {
    return loadArtistTracks();
  }, [artist]);
  return /* @__PURE__ */ jsxs(
    ContextDialogLayout,
    {
      image: /* @__PURE__ */ jsx(SmallArtistImage, { artist }),
      title: /* @__PURE__ */ jsx(ArtistLink, { artist }),
      loadTracks: loadTracks2,
      children: [
        /* @__PURE__ */ jsx(ToggleInLibraryMenuButton, { items: [artist], modelType: "artist" }),
        showRadioButton && /* @__PURE__ */ jsx(ContextMenuButton, { type: "link", to: getRadioLink(artist), children: /* @__PURE__ */ jsx(Trans, { message: "Go to artist radio" }) }),
        /* @__PURE__ */ jsx(CopyLinkMenuButton, { link: getArtistLink(artist, { absolute: true }), children: /* @__PURE__ */ jsx(Trans, { message: "Copy artist link" }) }),
        /* @__PURE__ */ jsx(ShareMediaButton, { item: artist }),
        canEdit && /* @__PURE__ */ jsx(
          ContextMenuButton,
          {
            type: "link",
            to: `/backstage/artists/${artist.id}/insights`,
            children: /* @__PURE__ */ jsx(Trans, { message: "Insights" })
          }
        ),
        canEdit && /* @__PURE__ */ jsx(
          ContextMenuButton,
          {
            type: "link",
            to: `/backstage/artists/${artist.id}/edit`,
            children: /* @__PURE__ */ jsx(Trans, { message: "Edit" })
          }
        ),
        /* @__PURE__ */ jsx(DeleteButton$2, { artist })
      ]
    }
  );
}
function DeleteButton$2({ artist }) {
  const { close: closeMenu } = useDialogContext();
  const deleteArtist2 = useDeleteArtist(artist.id);
  const { canDelete } = useArtistPermissions(artist);
  if (!canDelete) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    ContextMenuButton,
    {
      disabled: deleteArtist2.isPending,
      onClick: () => {
        closeMenu();
        openDialog(ConfirmationDialog, {
          isDanger: true,
          title: /* @__PURE__ */ jsx(Trans, { message: "Delete artist" }),
          body: /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to delete this artist?" }),
          confirm: /* @__PURE__ */ jsx(Trans, { message: "Delete" }),
          onConfirm: () => {
            deleteArtist2.mutate();
          }
        });
      },
      children: /* @__PURE__ */ jsx(Trans, { message: "Delete" })
    }
  );
}
async function loadArtistTracks(artist) {
  return Promise.resolve([]);
}
function useAlbumPermissions(album) {
  const { user, hasPermission } = useAuth();
  return useMemo(() => {
    var _a2, _b2;
    const permissions = {
      canEdit: false,
      canDelete: false,
      managesAlbum: false
    };
    if ((user == null ? void 0 : user.id) && album) {
      const albumArtistIds = (_a2 = album.artists) == null ? void 0 : _a2.map((a) => a.id);
      const managesAlbum = album.owner_id === user.id || !!((_b2 = user.artists) == null ? void 0 : _b2.find((a) => albumArtistIds == null ? void 0 : albumArtistIds.includes(a.id)));
      permissions.canEdit = hasPermission("albums.update") || hasPermission("music.update") || managesAlbum;
      permissions.canDelete = hasPermission("albums.delete") || hasPermission("music.delete") || managesAlbum;
      permissions.managesAlbum = managesAlbum;
    }
    return permissions;
  }, [user, album, hasPermission]);
}
function useDeleteAlbum() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { getRedirectUri } = useAuth();
  return useMutation({
    mutationFn: (payload) => deleteAlbum(payload),
    onSuccess: (response, { albumId }) => {
      toast(message("Album deleted"));
      if (pathname.startsWith(`/album/${albumId}`)) {
        navigate(getRedirectUri());
      }
      queryClient.invalidateQueries({ queryKey: ["tracks"] });
      queryClient.invalidateQueries({ queryKey: ["albums"] });
      queryClient.invalidateQueries({ queryKey: ["artists"] });
    },
    onError: (r) => showHttpErrorToast(r)
  });
}
function deleteAlbum({ albumId }) {
  return apiClient.delete(`albums/${albumId}`).then((r) => r.data);
}
const useRepostsStore = createCountableStore("reposts");
const userReposts = useRepostsStore.getState;
function useToggleRepost() {
  return useMutation({
    mutationFn: (payload) => toggleRepost(payload),
    onSuccess: (response, { repostable }) => {
      if (response.action === "added") {
        userReposts().add([repostable]);
      } else {
        userReposts().remove([repostable]);
      }
      queryClient.invalidateQueries({ queryKey: ["reposts"] });
    },
    onError: (r) => showHttpErrorToast(r)
  });
}
function toggleRepost({ repostable }) {
  const payload = {
    repostable_id: repostable.id,
    repostable_type: repostable.model_type
  };
  return apiClient.post("reposts/toggle", payload).then((r) => r.data);
}
function ToggleRepostMenuButton({ item }) {
  const authHandler = useAuthClickCapture();
  const { close: closeMenu } = useDialogContext();
  const { player } = useSettings();
  const toggleRepost2 = useToggleRepost();
  const isReposted = useRepostsStore((s) => s.has(item));
  if (!(player == null ? void 0 : player.enable_repost))
    return null;
  return /* @__PURE__ */ jsx(
    ContextMenuButton,
    {
      onClickCapture: authHandler,
      onClick: () => {
        closeMenu();
        toggleRepost2.mutate({ repostable: item });
      },
      children: isReposted ? /* @__PURE__ */ jsx(Trans, { message: "Reposted" }) : /* @__PURE__ */ jsx(Trans, { message: "Repost" })
    }
  );
}
function AlbumContextDialog({ album }) {
  var _a2;
  const { canEdit } = useAlbumPermissions(album);
  const isMobile = useIsMobileMediaQuery();
  const loadTracks2 = useCallback(() => {
    return loadAlbumTracks(album);
  }, [album]);
  return /* @__PURE__ */ jsxs(
    ContextDialogLayout,
    {
      image: /* @__PURE__ */ jsx(AlbumImage, { album }),
      title: /* @__PURE__ */ jsx(AlbumLink, { album }),
      description: /* @__PURE__ */ jsx(ArtistLinks, { artists: album.artists }),
      loadTracks: loadTracks2,
      children: [
        /* @__PURE__ */ jsx(AddToQueueButton, { item: album, loadTracks: loadTracks2 }),
        /* @__PURE__ */ jsx(PlaylistPanelButton, {}),
        /* @__PURE__ */ jsx(ToggleInLibraryMenuButton, { items: [album] }),
        ((_a2 = album.artists) == null ? void 0 : _a2[0]) && /* @__PURE__ */ jsx(
          ContextMenuButton,
          {
            type: "link",
            to: getArtistLink(album.artists[0]),
            className: "md:hidden",
            children: /* @__PURE__ */ jsx(Trans, { message: "Go to artist" })
          }
        ),
        !isMobile && /* @__PURE__ */ jsx(CopyLinkMenuButton, { link: getAlbumLink(album, { absolute: true }), children: /* @__PURE__ */ jsx(Trans, { message: "Copy album link" }) }),
        /* @__PURE__ */ jsx(ShareMediaButton, { item: album }),
        /* @__PURE__ */ jsx(ToggleRepostMenuButton, { item: album }),
        canEdit && /* @__PURE__ */ jsx(
          ContextMenuButton,
          {
            type: "link",
            to: `/backstage/albums/${album.id}/insights`,
            children: /* @__PURE__ */ jsx(Trans, { message: "Insights" })
          }
        ),
        canEdit && /* @__PURE__ */ jsx(
          ContextMenuButton,
          {
            type: "link",
            to: `/backstage/albums/${album.id}/edit`,
            children: /* @__PURE__ */ jsx(Trans, { message: "Edit" })
          }
        ),
        /* @__PURE__ */ jsx(DeleteButton$1, { album })
      ]
    }
  );
}
function DeleteButton$1({ album }) {
  const { close: closeMenu } = useDialogContext();
  const deleteAlbum2 = useDeleteAlbum();
  const { canDelete } = useAlbumPermissions(album);
  if (!canDelete) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    ContextMenuButton,
    {
      disabled: deleteAlbum2.isPending,
      onClick: () => {
        closeMenu();
        openDialog(ConfirmationDialog, {
          isDanger: true,
          title: /* @__PURE__ */ jsx(Trans, { message: "Delete album" }),
          body: /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to delete this album?" }),
          confirm: /* @__PURE__ */ jsx(Trans, { message: "Delete" }),
          onConfirm: () => {
            deleteAlbum2.mutate({ albumId: album.id });
          }
        });
      },
      children: /* @__PURE__ */ jsx(Trans, { message: "Delete" })
    }
  );
}
async function loadAlbumTracks(album) {
  if (typeof album.tracks === "undefined") {
    const tracks = await loadMediaItemTracks(queueGroupId(album));
    if (!tracks.length) {
      toast(message("This album has no tracks yet."));
    }
    return tracks;
  }
  return album.tracks;
}
function useTrackPermissions(tracks) {
  const { user, hasPermission } = useAuth();
  return useMemo(() => {
    const permissions = {
      canEdit: true,
      canDelete: true,
      managesTrack: true
    };
    tracks.every((track) => {
      var _a2, _b2;
      if (!track) {
        permissions.canEdit = false;
        permissions.canDelete = false;
        permissions.managesTrack = false;
        return;
      }
      const trackArtistIds = (_a2 = track.artists) == null ? void 0 : _a2.map((a) => a.id);
      const managesTrack = track.owner_id === (user == null ? void 0 : user.id) || !!((_b2 = user == null ? void 0 : user.artists) == null ? void 0 : _b2.find((a) => trackArtistIds == null ? void 0 : trackArtistIds.includes(a.id)));
      if (!managesTrack) {
        permissions.managesTrack = false;
      }
      if (!hasPermission("tracks.update") && !hasPermission("music.update") && !managesTrack) {
        permissions.canEdit = false;
      }
      if (!hasPermission("tracks.delete") && !hasPermission("music.delete") && !managesTrack) {
        permissions.canDelete = false;
      }
    });
    return permissions;
  }, [user, tracks, hasPermission]);
}
function useDeleteTracks() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { getRedirectUri } = useAuth();
  return useMutation({
    mutationFn: (payload) => deleteTracks(payload),
    onSuccess: async (response, { trackIds }) => {
      await queryClient.invalidateQueries({ queryKey: ["tracks"] });
      await queryClient.invalidateQueries({ queryKey: ["channel"] });
      toast(
        message("[one Track|other :count Tracks] deleted", {
          values: { count: trackIds.length }
        })
      );
      if (trackIds.some((trackId) => pathname.startsWith(`/track/${trackId}`))) {
        navigate(getRedirectUri());
      }
    },
    onError: (r) => showHttpErrorToast(r)
  });
}
function deleteTracks({ trackIds }) {
  return apiClient.delete(`tracks/${trackIds.join(",")}`).then((r) => r.data);
}
function trackIsLocallyUploaded(track) {
  return (track == null ? void 0 : track.src) != null && (track.src.startsWith("storage") || track.src.includes("storage/track_media"));
}
function downloadFileFromUrl(url, name) {
  const link2 = document.createElement("a");
  link2.href = url;
  if (name)
    link2.download = name;
  document.body.appendChild(link2);
  link2.click();
  document.body.removeChild(link2);
}
function TrackContextDialog({
  children,
  tracks,
  showAddToQueueButton = true
}) {
  var _a2;
  const isMobile = useIsMobileMediaQuery();
  const firstTrack = tracks[0];
  const { canEdit, canDelete } = useTrackPermissions(tracks);
  const shouldShowRadio = useShouldShowRadioButton();
  const { player } = useSettings();
  const { close: close2 } = useDialogContext();
  const navigate = useNavigate();
  const cuedTrack = usePlayerStore((s) => {
    var _a3;
    return (_a3 = s.cuedMedia) == null ? void 0 : _a3.meta;
  });
  const { play } = usePlayerActions();
  const loadTracks2 = useCallback(() => {
    return Promise.resolve(tracks);
  }, [tracks]);
  const headerProps = tracks.length === 1 ? {
    image: /* @__PURE__ */ jsx(TrackImage, { track: firstTrack }),
    title: /* @__PURE__ */ jsx(TrackLink, { track: firstTrack }),
    description: /* @__PURE__ */ jsx(ArtistLinks, { artists: firstTrack.artists })
  } : {};
  return /* @__PURE__ */ jsxs(ContextDialogLayout, { ...headerProps, loadTracks: loadTracks2, children: [
    showAddToQueueButton && /* @__PURE__ */ jsx(AddToQueueButton, { item: tracks, loadTracks: loadTracks2 }),
    /* @__PURE__ */ jsx(ToggleInLibraryMenuButton, { items: tracks }),
    children == null ? void 0 : children(tracks),
    /* @__PURE__ */ jsx(PlaylistPanelButton, {}),
    tracks.length === 1 ? /* @__PURE__ */ jsxs(Fragment, { children: [
      shouldShowRadio && /* @__PURE__ */ jsx(ContextMenuButton, { type: "link", to: getRadioLink(firstTrack), children: /* @__PURE__ */ jsx(Trans, { message: "Go to song radio" }) }),
      isMobile && /* @__PURE__ */ jsxs(Fragment, { children: [
        ((_a2 = firstTrack.artists) == null ? void 0 : _a2[0]) && /* @__PURE__ */ jsx(
          ContextMenuButton,
          {
            type: "link",
            to: getArtistLink(firstTrack.artists[0]),
            children: /* @__PURE__ */ jsx(Trans, { message: "Go to artist" })
          }
        ),
        firstTrack.album && /* @__PURE__ */ jsx(
          ContextMenuButton,
          {
            type: "link",
            to: getAlbumLink(firstTrack.album),
            children: /* @__PURE__ */ jsx(Trans, { message: "Go to album" })
          }
        ),
        /* @__PURE__ */ jsx(ContextMenuButton, { type: "link", to: getTrackLink(firstTrack), children: /* @__PURE__ */ jsx(Trans, { message: "Go to track" }) })
      ] }),
      !(player == null ? void 0 : player.hide_lyrics) && tracks.length === 1 && /* @__PURE__ */ jsx(
        ContextMenuButton,
        {
          onClick: async () => {
            close2();
            if ((cuedTrack == null ? void 0 : cuedTrack.id) !== firstTrack.id) {
              await play(trackToMediaItem(firstTrack));
            }
            navigate("/lyrics");
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "View lyrics" })
        }
      ),
      !isMobile && /* @__PURE__ */ jsx(
        CopyLinkMenuButton,
        {
          link: getTrackLink(firstTrack, { absolute: true }),
          children: /* @__PURE__ */ jsx(Trans, { message: "Copy song link" })
        }
      ),
      tracks.length === 1 && /* @__PURE__ */ jsx(ShareMediaButton, { item: firstTrack }),
      tracks.length === 1 && /* @__PURE__ */ jsx(DownloadTrackButton, { track: firstTrack }),
      tracks.length === 1 ? /* @__PURE__ */ jsx(ToggleRepostMenuButton, { item: tracks[0] }) : null,
      tracks.length === 1 && canEdit && /* @__PURE__ */ jsx(
        ContextMenuButton,
        {
          type: "link",
          to: `/backstage/tracks/${firstTrack.id}/insights`,
          children: /* @__PURE__ */ jsx(Trans, { message: "Insights" })
        }
      ),
      tracks.length === 1 && canEdit && /* @__PURE__ */ jsx(
        ContextMenuButton,
        {
          type: "link",
          to: `/backstage/tracks/${firstTrack.id}/edit`,
          children: /* @__PURE__ */ jsx(Trans, { message: "Edit" })
        }
      )
    ] }) : null,
    canDelete && !isMobile && /* @__PURE__ */ jsx(DeleteButton, { tracks })
  ] });
}
function DownloadTrackButton({ track }) {
  const { player, base_url } = useSettings();
  const { close: closeMenu } = useDialogContext();
  const { hasPermission } = useAuth();
  if (!(player == null ? void 0 : player.enable_download) || !track || !trackIsLocallyUploaded(track) || !hasPermission("music.download")) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    ContextMenuButton,
    {
      onClick: () => {
        closeMenu();
        downloadFileFromUrl(`${base_url}/api/v1/tracks/${track.id}/download`);
      },
      children: /* @__PURE__ */ jsx(Trans, { message: "Download" })
    }
  );
}
function DeleteButton({ tracks }) {
  const { close: closeMenu } = useDialogContext();
  const { canDelete } = useTrackPermissions(tracks);
  if (!canDelete) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    ContextMenuButton,
    {
      onClick: () => {
        closeMenu();
        openDialog(DeleteTrackDialog, {
          tracks
        });
      },
      children: /* @__PURE__ */ jsx(Trans, { message: "Delete" })
    }
  );
}
function DeleteTrackDialog({ tracks }) {
  const deleteTracks2 = useDeleteTracks();
  const { close: close2 } = useDialogContext();
  return /* @__PURE__ */ jsx(
    ConfirmationDialog,
    {
      isDanger: true,
      title: /* @__PURE__ */ jsx(Trans, { message: "Delete tracks" }),
      body: /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to delete selected tracks?" }),
      isLoading: deleteTracks2.isPending,
      confirm: /* @__PURE__ */ jsx(Trans, { message: "Delete" }),
      onConfirm: () => {
        deleteTracks2.mutate(
          { trackIds: tracks.map((t) => t.id) },
          {
            onSuccess: () => close2()
          }
        );
      }
    }
  );
}
function SearchAutocomplete({ className }) {
  const { searchQuery } = useParams();
  const { trans } = useTrans();
  const navigate = useNavigate();
  const [query, setQuery] = useState(searchQuery || "");
  const [isOpen, setIsOpen] = useState(false);
  const { isFetching, data } = useSearchResults({
    loader: "search",
    query
  });
  return /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: (e) => {
        e.preventDefault();
        const encodedQuery = encodeURIComponent(query.trim());
        if (encodedQuery) {
          setIsOpen(false);
          navigate(`/search/${encodedQuery}`);
        }
      },
      className: clsx("flex flex-auto items-center gap-14", className),
      children: [
        /* @__PURE__ */ jsx("button", { type: "submit", "aria-label": trans(message("Search")), children: /* @__PURE__ */ jsx(SearchIcon, { className: "flex-shrink-0 text-muted" }) }),
        /* @__PURE__ */ jsx(
          ComboBoxForwardRef,
          {
            unstyled: true,
            className: "w-full max-w-780 flex-auto",
            offset: 12,
            inputClassName: "w-full outline-none bg-transparent h-42 placeholder:text-muted",
            hideEndAdornment: true,
            inputBorder: "border-none",
            isAsync: true,
            placeholder: trans(message("Search")),
            isLoading: isFetching,
            inputValue: query,
            onInputValueChange: setQuery,
            clearInputOnItemSelection: true,
            blurReferenceOnItemSelection: true,
            selectionMode: "none",
            openMenuOnFocus: true,
            floatingMaxHeight: 670,
            isOpen,
            onOpenChange: setIsOpen,
            autoFocusFirstItem: false,
            children: Object.entries((data == null ? void 0 : data.results) || {}).map(([groupName, results]) => /* @__PURE__ */ jsx(Section, { label: /* @__PURE__ */ jsx(Trans, { message: groupName }), children: results.data.map((result) => {
              const key = `${groupName}-${result.id}`;
              switch (result.model_type) {
                case ARTIST_MODEL:
                  return /* @__PURE__ */ jsx(
                    Item$1,
                    {
                      value: key,
                      onSelected: () => {
                        navigate(getArtistLink(result));
                      },
                      startIcon: /* @__PURE__ */ jsx(
                        PlayableImage,
                        {
                          model: result,
                          className: "rounded-full",
                          value: key,
                          children: /* @__PURE__ */ jsx(SmallArtistImage, { artist: result })
                        }
                      ),
                      description: /* @__PURE__ */ jsx(Trans, { message: "Artist" }),
                      textLabel: result.name,
                      children: /* @__PURE__ */ jsxs(
                        DialogTrigger,
                        {
                          type: "popover",
                          mobileType: "tray",
                          triggerOnContextMenu: true,
                          children: [
                            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(ArtistLink, { artist: result }) }),
                            /* @__PURE__ */ jsx(ArtistContextDialog, { artist: result })
                          ]
                        }
                      )
                    },
                    key
                  );
                case ALBUM_MODEL:
                  return /* @__PURE__ */ jsx(
                    Item$1,
                    {
                      value: key,
                      onSelected: () => {
                        navigate(getAlbumLink(result));
                      },
                      startIcon: /* @__PURE__ */ jsx(PlayableImage, { model: result, value: key, children: /* @__PURE__ */ jsx(AlbumImage, { album: result }) }),
                      description: /* @__PURE__ */ jsx(ArtistLinks, { artists: result.artists }),
                      textLabel: result.name,
                      children: /* @__PURE__ */ jsxs(
                        DialogTrigger,
                        {
                          type: "popover",
                          mobileType: "tray",
                          triggerOnContextMenu: true,
                          children: [
                            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(AlbumLink, { album: result }) }),
                            /* @__PURE__ */ jsx(AlbumContextDialog, { album: result })
                          ]
                        }
                      )
                    },
                    key
                  );
                case TRACK_MODEL:
                  return /* @__PURE__ */ jsx(
                    Item$1,
                    {
                      value: key,
                      onSelected: () => {
                        navigate(getTrackLink(result));
                      },
                      startIcon: /* @__PURE__ */ jsx(PlayableImage, { model: result, value: key, children: /* @__PURE__ */ jsx(TrackImage, { track: result }) }),
                      description: /* @__PURE__ */ jsx(ArtistLinks, { artists: result.artists }),
                      textLabel: result.name,
                      children: /* @__PURE__ */ jsxs(
                        DialogTrigger,
                        {
                          type: "popover",
                          mobileType: "tray",
                          triggerOnContextMenu: true,
                          children: [
                            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(TrackLink, { track: result }) }),
                            /* @__PURE__ */ jsx(TrackContextDialog, { tracks: [result] })
                          ]
                        }
                      )
                    },
                    key
                  );
                case USER_MODEL:
                  return /* @__PURE__ */ jsx(
                    Item$1,
                    {
                      value: key,
                      onSelected: () => {
                        navigate(getUserProfileLink(result));
                      },
                      startIcon: /* @__PURE__ */ jsx(UserImage, { className: "h-48 w-48", user: result }),
                      description: result.followers_count ? /* @__PURE__ */ jsx(
                        Trans,
                        {
                          message: ":count followers",
                          values: { count: result.followers_count }
                        }
                      ) : null,
                      textLabel: result.display_name,
                      children: /* @__PURE__ */ jsx(UserProfileLink, { user: result })
                    },
                    key
                  );
                case PLAYLIST_MODEL:
                  return /* @__PURE__ */ jsx(
                    Item$1,
                    {
                      value: key,
                      onSelected: () => {
                        navigate(getPlaylistLink(result));
                      },
                      startIcon: /* @__PURE__ */ jsx(PlayableImage, { model: result, value: key, children: /* @__PURE__ */ jsx(PlaylistImage, { playlist: result }) }),
                      description: /* @__PURE__ */ jsx(PlaylistOwnerName, { playlist: result }),
                      textLabel: result.name,
                      children: /* @__PURE__ */ jsxs(
                        DialogTrigger,
                        {
                          type: "popover",
                          mobileType: "tray",
                          triggerOnContextMenu: true,
                          children: [
                            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(PlaylistLink, { playlist: result }) }),
                            /* @__PURE__ */ jsx(PlaylistContextDialog, { playlist: result })
                          ]
                        }
                      )
                    },
                    key
                  );
              }
            }) }, groupName))
          }
        )
      ]
    }
  );
}
function PlayableImage({
  children,
  model,
  className,
  value
}) {
  var _a2;
  const {
    collection,
    state: { activeIndex }
  } = useListboxContext();
  const index = (_a2 = collection.get(value)) == null ? void 0 : _a2.index;
  const isActive = activeIndex === index;
  const queueId = queueGroupId(model);
  const isPlaying = usePlayerStore(
    (s) => {
      var _a3;
      return s.isPlaying && ((_a3 = s.originalQueue[0]) == null ? void 0 : _a3.groupId) === queueId;
    }
  );
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(className, "relative h-48 w-48 overflow-hidden"),
      onClick: (e) => {
        e.preventDefault();
        e.stopPropagation();
      },
      children: [
        cloneElement(children, {
          size: "w-full h-full"
        }),
        /* @__PURE__ */ jsx(AnimatePresence, { children: isActive || isPlaying ? /* @__PURE__ */ jsx(
          m.div,
          {
            ...opacityAnimation,
            transition: { duration: 0.24 },
            className: "absolute inset-0 m-auto flex h-full w-full items-center justify-center bg-black/60",
            children: /* @__PURE__ */ jsx(
              PlaybackToggleButton,
              {
                buttonType: "icon",
                color: "white",
                equalizerColor: "white",
                track: model.model_type === TRACK_MODEL ? model : void 0,
                queueId
              }
            )
          },
          "play-overlay"
        ) : null })
      ]
    }
  );
}
function PlayerNavbarLayout({
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
  const shouldShowToggle = !hideToggleButton;
  const handleToggle = () => {
    setLeftSidenavStatus(leftSidenavStatus === "closed" ? "open" : "closed");
  };
  const handleCompactModeToggle = () => {
    const newStatus = leftSidenavStatus === "compact" ? "open" : "compact";
    setInLocalStorage(`${name}.sidenav.compact`, newStatus === "compact");
    setLeftSidenavStatus(newStatus);
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    PlayerNavbar,
    {
      className: clsx("dashboard-grid-navbar w-full", className),
      border: "border-b",
      size: "sm",
      menuPosition: "landing-page-navbar",
      style: { position: "relative" },
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
      children: [
        /* @__PURE__ */ jsx(SearchAutocomplete, {}),
        children
      ]
    }
  ) });
}
function useBlockBodyOverflow(disable2 = false) {
  useEffect(() => {
    if (disable2) {
      document.documentElement.classList.remove("no-page-overflow");
    } else {
      document.documentElement.classList.add("no-page-overflow");
    }
    return () => {
      document.documentElement.classList.remove("no-page-overflow");
    };
  }, [disable2]);
}
function DashboardLayout({
  children,
  leftSidenavStatus: leftSidenav,
  onLeftSidenavChange,
  rightSidenavStatus: rightSidenav,
  initialRightSidenavStatus,
  onRightSidenavChange,
  name,
  leftSidenavCanBeCompact,
  height = "h-screen",
  className,
  gridClassName = "dashboard-grid",
  blockBodyOverflow = true,
  ...domProps
}) {
  useBlockBodyOverflow(!blockBodyOverflow);
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const isCompactModeInitially = useMemo(() => {
    return !name ? false : getFromLocalStorage(`${name}.sidenav.compact`);
  }, [name]);
  const defaultLeftSidenavStatus = isCompactModeInitially ? "compact" : "open";
  const [leftSidenavStatus, setLeftSidenavStatus] = useControlledState(
    leftSidenav,
    isMobile ? "closed" : defaultLeftSidenavStatus,
    onLeftSidenavChange
  );
  const rightSidenavStatusDefault = useMemo(() => {
    if (isMobile) {
      return "closed";
    }
    if (initialRightSidenavStatus != null) {
      return initialRightSidenavStatus;
    }
    const userSelected = getFromLocalStorage(
      `${name}.sidenav.right.position`,
      "open"
    );
    if (userSelected != null) {
      return userSelected;
    }
    return initialRightSidenavStatus || "closed";
  }, [isMobile, name, initialRightSidenavStatus]);
  const [rightSidenavStatus, _setRightSidenavStatus] = useControlledState(
    rightSidenav,
    rightSidenavStatusDefault,
    onRightSidenavChange
  );
  const setRightSidenavStatus = useCallback(
    (status) => {
      _setRightSidenavStatus(status);
      setInLocalStorage(`${name}.sidenav.right.position`, status);
    },
    [_setRightSidenavStatus, name]
  );
  const shouldShowUnderlay = isMobile && (leftSidenavStatus === "open" || rightSidenavStatus === "open");
  return /* @__PURE__ */ jsx(
    DashboardLayoutContext.Provider,
    {
      value: {
        leftSidenavStatus,
        setLeftSidenavStatus,
        rightSidenavStatus,
        setRightSidenavStatus,
        leftSidenavCanBeCompact,
        name,
        isMobileMode: isMobile
      },
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          ...domProps,
          className: clsx("relative isolate", gridClassName, className, height),
          children: [
            children,
            /* @__PURE__ */ jsx(AnimatePresence, { children: shouldShowUnderlay && /* @__PURE__ */ jsx(
              Underlay,
              {
                position: "fixed",
                onClick: () => {
                  setLeftSidenavStatus("closed");
                  setRightSidenavStatus("closed");
                }
              },
              "dashboard-underlay"
            ) })
          ]
        }
      )
    }
  );
}
function SidedavFrontend({
  className,
  position,
  children,
  size: size2 = "md",
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
  const sizeClassName = getSize(status === "compact" ? "compact" : size2);
  return /* @__PURE__ */ jsx(
    m.div,
    {
      variants,
      initial: false,
      animate: forceClosed ? "close" : status,
      transition: { type: "tween", duration: 0.1 },
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
        isOverlayMode && `${overlayPosition} h-full z-20 shadow-2xl`,
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
function getSize(size2) {
  switch (size2) {
    case "compact":
      return "w-240";
    case "sm":
      return "w-224";
    case "md":
      return "w-240";
    case "lg":
      return "w-288";
    default:
      return size2 || "";
  }
}
const PlaylistAddIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M14 10H3v2h11v-2zm0-4H3v2h11V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM3 16h7v-2H3v2z" }),
  "PlaylistAddOutlined"
);
const menuItemClassName = (isActive) => {
  return clsx(
    "h-44 px-12 mx-12 hover:bg-hover rounded-button",
    isActive && "text-primary"
  );
};
function Sidenav({ className }) {
  const { isLoggedIn, hasPermission } = useAuth();
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const { branding } = useSettings();
  return /* @__PURE__ */ jsxs("div", { className: clsx("overflow-y-auto border-r bg-alt py-12", className), style: { scrollbarWidth: "thin", scrollbarColor: "#5a5a5a #2a2a2a" }, children: [
    /* @__PURE__ */ jsx(
      CustomMenu,
      {
        className: "border-grey-900 mt-24 items-stretch border-b",
        menu: "home-on-sidebar",
        orientation: "vertical",
        gap: "gap-none",
        iconClassName: "text-muted",
        itemClassName: ({ isActive }) => menuItemClassName(isActive)
      }
    ),
    isLoggedIn && hasPermission("music.create") && /* @__PURE__ */ jsxs("div", { className: "mt-48", children: [
      /* @__PURE__ */ jsx(SectionTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Studio" }) }),
      /* @__PURE__ */ jsx(
        CustomMenu,
        {
          className: "border-grey-900 mt-12 items-stretch border-b text-sm",
          menu: "studio-on-sidebar",
          orientation: "vertical",
          gap: "gap-none",
          iconClassName: "text-muted",
          itemClassName: ({ isActive }) => menuItemClassName(isActive)
        }
      )
    ] }),
    isLoggedIn && hasPermission("music.view") && /* @__PURE__ */ jsxs("div", { className: "mt-48", children: [
      /* @__PURE__ */ jsx(SectionTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Account" }) }),
      /* @__PURE__ */ jsx(
        CustomMenu,
        {
          className: "border-grey-900 mt-12 items-stretch border-b text-sm",
          menu: "account-on-sidebar",
          orientation: "vertical",
          gap: "gap-none",
          iconClassName: "text-muted",
          itemClassName: ({ isActive }) => menuItemClassName(isActive)
        }
      ),
      /* @__PURE__ */ jsx(PlaylistSection, {})
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-48", children: [
      /* @__PURE__ */ jsx(SectionTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Settings" }) }),
      /* @__PURE__ */ jsx(
        CustomMenu,
        {
          className: "border-grey-900 mt-12 items-stretch border-b text-sm",
          orientation: "vertical",
          gap: "gap-none",
          iconClassName: "text-muted",
          itemClassName: ({ isActive }) => menuItemClassName(isActive)
        }
      ),
      /* @__PURE__ */ jsx(ThemeSwitcher, {})
    ] }),
    /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(
      CustomMenu,
      {
        className: "border-grey-900 mt-12 items-stretch border-b text-sm",
        menu: "settings-on-sidebar",
        orientation: "vertical",
        gap: "gap-none",
        iconClassName: "text-muted",
        itemClassName: ({ isActive }) => menuItemClassName(isActive)
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "mt-48", children: /* @__PURE__ */ jsx(
      CustomMenu,
      {
        className: "text-gray-700 text-8 border-grey-900 mt-12 items-stretch border-b text-center text-sm opacity-75",
        menu: "footer-on-sidebar",
        orientation: "vertical",
        gap: "gap-none",
        iconClassName: "text-muted",
        itemClassName: ({ isActive }) => menuItemClassName(isActive)
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "mb-70 ml-10 mt-20", children: [
      /* @__PURE__ */ jsx(
        CustomMenu,
        {
          className: "border-grey-900 mt-12 items-stretch border-b text-sm",
          orientation: "vertical",
          gap: "gap-none",
          iconClassName: "text-muted",
          itemClassName: ({ isActive }) => menuItemClassName(isActive)
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          style: {
            color: "rgb(255, 255, 255)",
            fontSize: "12px",
            opacity: 0.35,
            textAlign: "left",
            marginLeft: "15px",
            textTransform: "uppercase"
          },
          children: /* @__PURE__ */ jsx(
            Trans,
            {
              message: "© :year :name",
              values: { year, name: branding.site_name }
            }
          )
        }
      )
    ] })
  ] });
}
function SectionTitle({ children }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "mx-24 mb-8 text-xs font-extrabold uppercase text-muted",
      style: { color: "#FFFFFF84" },
      children: /* @__PURE__ */ jsx("span", { children })
    }
  );
}
function PlaylistSection() {
  var _a2;
  const { data } = useAuthUserPlaylists();
  const navigate = useNavigate();
  const authHandler = useAuthClickCapture();
  return /* @__PURE__ */ jsxs("div", { className: "border-grey-900 mt-40 border-b", children: [
    /* @__PURE__ */ jsxs("div", { className: "mr-24 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(SectionTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Playlists" }) }),
      /* @__PURE__ */ jsxs(
        DialogTrigger,
        {
          type: "modal",
          onClose: (newPlaylist) => {
            if (newPlaylist) {
              navigate(getPlaylistLink(newPlaylist));
            }
          },
          children: [
            /* @__PURE__ */ jsx(
              IconButton,
              {
                className: "flex-shrink-0 text-muted",
                onClickCapture: authHandler,
                children: /* @__PURE__ */ jsx(PlaylistAddIcon, {})
              }
            ),
            /* @__PURE__ */ jsx(CreatePlaylistDialog, {})
          ]
        }
      )
    ] }),
    (_a2 = data == null ? void 0 : data.playlists) == null ? void 0 : _a2.map((playlist) => /* @__PURE__ */ jsx(
      NavLink,
      {
        to: getPlaylistLink(playlist),
        className: ({ isActive }) => clsx(menuItemClassName(isActive), "flex items-center text-sm"),
        children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden overflow-ellipsis", children: playlist.name })
      },
      playlist.id
    ))
  ] });
}
function ThemeSwitcher() {
  const { themes } = useSettings();
  const { selectedTheme, selectTheme } = useThemeSelector();
  if (!selectedTheme || !(themes == null ? void 0 : themes.user_change))
    return null;
  return /* @__PURE__ */ jsxs("div", { className: "pl-10", children: [
    /* @__PURE__ */ jsx("div", { className: "mr-10 flex items-center justify-between", children: /* @__PURE__ */ jsx(
      Button,
      {
        variant: "text",
        startIcon: selectedTheme.is_dark ? /* @__PURE__ */ jsx(DarkModeIcon, {}) : /* @__PURE__ */ jsx(LightbulbIcon, {}),
        onClick: () => {
          selectTheme(selectedTheme.is_dark ? "light" : "dark");
        },
        children: selectedTheme.is_dark ? /* @__PURE__ */ jsx(Trans, { message: "Light mode" }) : /* @__PURE__ */ jsx(Trans, { message: "Dark mode" })
      }
    ) }),
    /* @__PURE__ */ jsx(LocaleSwitcher, {})
  ] });
}
function DashboardContent({
  children,
  isScrollable = true
}) {
  return cloneElement(children, {
    className: clsx(
      children.props.className,
      isScrollable && "overflow-y-auto stable-scrollbar",
      "dashboard-grid-content"
    )
  });
}
function CustomPageLayout({ slug }) {
  const { pageSlug } = useParams();
  const query = useCustomPage(slug || pageSlug);
  const { player } = useSettings();
  useIsMobileMediaQuery();
  useEffect(() => {
    var _a2;
    if ((_a2 = query.data) == null ? void 0 : _a2.page) {
      window.scrollTo(0, 0);
    }
  }, [query]);
  return /* @__PURE__ */ jsxs(
    DashboardLayout,
    {
      name: "web-player",
      initialRightSidenavStatus: (player == null ? void 0 : player.hide_queue) ? "closed" : "open",
      children: [
        /* @__PURE__ */ jsx(
          PlayerNavbarLayout,
          {
            size: "sm",
            menuPosition: "custom-page-navbar",
            className: "flex-shrink-0"
          }
        ),
        /* @__PURE__ */ jsx(SidedavFrontend, { position: "left", display: "block", children: /* @__PURE__ */ jsx(Sidenav, {}) }),
        /* @__PURE__ */ jsx(DashboardContent, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col bg-alt", children: [
          /* @__PURE__ */ jsx(PageMetaTags, { query }),
          query.data ? /* @__PURE__ */ jsx(CustomPageBody, { page: query.data.page }) : /* @__PURE__ */ jsx(PageStatus, { query, loaderClassName: "mt-80" }),
          /* @__PURE__ */ jsx(Footer, {})
        ] }) })
      ]
    }
  );
}
function useLogin(form) {
  const handleSuccess = useHandleLoginSuccess();
  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      if (!response.two_factor) {
        handleSuccess(response);
      }
    },
    onError: (r) => onFormQueryError(r, form)
  });
}
function useHandleLoginSuccess() {
  const navigate = useNavigate();
  const { getRedirectUri } = useAuth();
  const { setBootstrapData: setBootstrapData2 } = useBootstrapData();
  return useCallback(
    (response) => {
      setBootstrapData2(response.bootstrapData);
      navigate(getRedirectUri(), { replace: true });
    },
    [navigate, setBootstrapData2, getRedirectUri]
  );
}
function login(payload) {
  return apiClient.post("auth/login", payload).then((response) => response.data);
}
function useTwoFactorChallenge(form) {
  const handleSuccess = useHandleLoginSuccess();
  return useMutation({
    mutationFn: (payload) => completeChallenge(payload),
    onSuccess: (response) => {
      handleSuccess(response);
    },
    onError: (r) => onFormQueryError(r, form)
  });
}
function completeChallenge(payload) {
  return apiClient.post("auth/two-factor-challenge", payload).then((response) => response.data);
}
function TwoFactorChallengePage() {
  const [usingRecoveryCode, setUsingRecoveryCode] = useState(false);
  const form = useForm();
  const completeChallenge2 = useTwoFactorChallenge(form);
  return /* @__PURE__ */ jsxs(AuthLayout, { children: [
    /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Two factor authentication" }) }),
    /* @__PURE__ */ jsxs(
      Form,
      {
        form,
        onSubmit: (payload) => {
          completeChallenge2.mutate(payload);
        },
        children: [
          /* @__PURE__ */ jsx("div", { className: "mb-32 text-sm", children: /* @__PURE__ */ jsx(Trans, { message: "Confirm access to your account by entering the authentication code provided by your authenticator application." }) }),
          /* @__PURE__ */ jsx("div", { className: "mb-4", children: usingRecoveryCode ? /* @__PURE__ */ jsx(
            FormTextField,
            {
              name: "recovery_code",
              minLength: 21,
              maxLength: 21,
              autoComplete: "off",
              autoCorrect: "off",
              spellCheck: "false",
              label: /* @__PURE__ */ jsx(Trans, { message: "Recovery code" }),
              autoFocus: true,
              required: true
            }
          ) : /* @__PURE__ */ jsx(
            FormTextField,
            {
              name: "code",
              minLength: 6,
              maxLength: 6,
              autoComplete: "off",
              autoCorrect: "off",
              spellCheck: "false",
              label: /* @__PURE__ */ jsx(Trans, { message: "Code" }),
              autoFocus: true,
              required: true
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "mb-32", children: /* @__PURE__ */ jsx(
            Button,
            {
              variant: "link",
              color: "primary",
              size: "sm",
              onClick: () => setUsingRecoveryCode(!usingRecoveryCode),
              children: /* @__PURE__ */ jsx(Trans, { message: "Use recovery code instead" })
            }
          ) }),
          /* @__PURE__ */ jsx(
            Button,
            {
              className: "block w-full",
              type: "submit",
              variant: "flat",
              color: "primary",
              size: "md",
              disabled: completeChallenge2.isPending,
              children: /* @__PURE__ */ jsx(Trans, { message: "Continue" })
            }
          )
        ]
      }
    )
  ] });
}
function LoginPage({ onTwoFactorChallenge }) {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const isWorkspaceLogin = pathname.includes("workspace");
  const searchParamsEmail = searchParams.get("email") || void 0;
  const { branding, registration, site, social } = useSettings();
  const siteConfig = useContext(SiteConfigContext);
  const demoDefaults = site.demo && !searchParamsEmail ? getDemoFormDefaults(siteConfig) : {};
  const form = useForm({
    defaultValues: { remember: true, email: searchParamsEmail, ...demoDefaults }
  });
  const login2 = useLogin(form);
  const heading = isWorkspaceLogin ? /* @__PURE__ */ jsx(
    Trans,
    {
      values: { siteName: branding == null ? void 0 : branding.site_name },
      message: "To join your team on :siteName, login to your account"
    }
  ) : /* @__PURE__ */ jsx(Trans, { message: "Sign in to your account" });
  const message2 = !registration.disable && /* @__PURE__ */ jsx(
    Trans,
    {
      values: {
        a: (parts) => /* @__PURE__ */ jsx(Link, { className: LinkStyle, to: "/register", children: parts })
      },
      message: "Don't have an account? <a>Sign up.</a>"
    }
  );
  const isInvalid = !!Object.keys(form.formState.errors).length;
  return /* @__PURE__ */ jsxs(AuthLayout, { heading, message: message2, children: [
    /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Login" }) }),
    /* @__PURE__ */ jsxs(
      Form,
      {
        form,
        onSubmit: (payload) => {
          login2.mutate(payload, {
            onSuccess: (response) => {
              if (response.two_factor) {
                onTwoFactorChallenge();
              }
            }
          });
        },
        children: [
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              className: "mb-32",
              name: "email",
              type: "email",
              label: /* @__PURE__ */ jsx(Trans, { message: "Email" }),
              disabled: !!searchParamsEmail,
              invalid: isInvalid,
              required: true
            }
          ),
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              className: "mb-12",
              name: "password",
              type: "password",
              label: /* @__PURE__ */ jsx(Trans, { message: "Password" }),
              invalid: isInvalid,
              labelSuffix: /* @__PURE__ */ jsx(Link, { className: LinkStyle, to: "/forgot-password", tabIndex: -1, children: /* @__PURE__ */ jsx(Trans, { message: "Forgot your password?" }) }),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(FormCheckbox, { name: "remember", className: "mb-32 block", children: /* @__PURE__ */ jsx(Trans, { message: "Stay signed in for a month" }) }),
          /* @__PURE__ */ jsx(
            Button,
            {
              className: "block w-full",
              type: "submit",
              variant: "flat",
              color: "primary",
              size: "md",
              disabled: login2.isPending,
              children: /* @__PURE__ */ jsx(Trans, { message: "Continue" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      SocialAuthSection,
      {
        dividerMessage: social.compact_buttons ? /* @__PURE__ */ jsx(Trans, { message: "Or sign in with" }) : /* @__PURE__ */ jsx(Trans, { message: "OR" })
      }
    )
  ] });
}
function getDemoFormDefaults(siteConfig) {
  if (siteConfig.demo.loginPageDefaults === "randomAccount") {
    const number = Math.floor(Math.random() * 100) + 1;
    const paddedNumber = String(number).padStart(3, "0");
    return {
      email: `admin@demo${paddedNumber}.com`,
      password: "admin"
    };
  } else {
    return {
      email: siteConfig.demo.email ?? "admin@admin.com",
      password: siteConfig.demo.password ?? "admin"
    };
  }
}
function LoginPageWrapper() {
  const [isTwoFactor, setIsTwoFactor] = useState(false);
  if (isTwoFactor) {
    return /* @__PURE__ */ jsx(TwoFactorChallengePage, {});
  } else {
    return /* @__PURE__ */ jsx(LoginPage, { onTwoFactorChallenge: () => setIsTwoFactor(true) });
  }
}
function DynamicHomepage({ homepageResolver }) {
  const { homepage } = useSettings();
  if ((homepage == null ? void 0 : homepage.type) === "loginPage") {
    return /* @__PURE__ */ jsx(GuestRoute, { children: /* @__PURE__ */ jsx(LoginPageWrapper, {}) });
  }
  if ((homepage == null ? void 0 : homepage.type) === "registerPage") {
    return /* @__PURE__ */ jsx(GuestRoute, { children: /* @__PURE__ */ jsx(RegisterPage, {}) });
  }
  if ((homepage == null ? void 0 : homepage.type) === "customPage") {
    return /* @__PURE__ */ jsx(CustomPageLayout, { slug: homepage.value });
  }
  return (homepageResolver == null ? void 0 : homepageResolver(homepage == null ? void 0 : homepage.type)) || null;
}
function FooterLandingPage({ className, padding }) {
  (/* @__PURE__ */ new Date()).getFullYear();
  useSettings();
  return /* @__PURE__ */ jsxs(
    "footer",
    {
      className: clsx(
        "text-sm",
        padding ? padding : "pt-54",
        className
      ),
      children: [
        /* @__PURE__ */ jsx(Menus, {}),
        /* @__PURE__ */ jsxs("div", { className: "ml-60 mr-60 mb-54", children: [
          /* @__PURE__ */ jsx(FooterLinks, {}),
          /* @__PURE__ */ jsx(FooterCopyright, {})
        ] })
      ]
    }
  );
}
function Menus() {
  const settings = useSettings();
  const primaryMenu = settings.menus.find((m2) => {
    var _a2;
    return (_a2 = m2.positions) == null ? void 0 : _a2.includes("footer");
  });
  const secondaryMenu = settings.menus.find(
    (m2) => {
      var _a2;
      return (_a2 = m2.positions) == null ? void 0 : _a2.includes("footer-secondary");
    }
  );
  if (!primaryMenu && !secondaryMenu)
    return null;
  return /* @__PURE__ */ jsxs("div", { className: "mb-14 items-center justify-between gap-10 overflow-x-auto border-b pb-14 md:flex", children: [
    primaryMenu && /* @__PURE__ */ jsx(CustomMenu, { menu: primaryMenu, className: "text-primary" }),
    secondaryMenu && /* @__PURE__ */ jsx(CustomMenu, { menu: secondaryMenu, className: "mb:mt-0 mt-14 text-muted" })
  ] });
}
function Skeleton({
  variant = "text",
  animation = "wave",
  size: size2,
  className,
  display = "block",
  radius = "rounded",
  style
}) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      style,
      className: clsx(
        "skeleton relative overflow-hidden bg-fg-base/4 bg-no-repeat will-change-transform",
        radius,
        skeletonSize({ variant, size: size2 }),
        display,
        variant === "text" && "origin-[0_55%] scale-y-[0.6]",
        variant === "avatar" && "flex-shrink-0",
        variant === "icon" && "mx-8 flex-shrink-0",
        animation === "wave" && "skeleton-wave",
        animation === "pulsate" && "skeleton-pulsate",
        className
      ),
      "aria-busy": true,
      "aria-live": "polite"
    }
  );
}
function skeletonSize({ variant, size: size2 }) {
  if (size2) {
    return size2;
  }
  switch (variant) {
    case "avatar":
      return "h-40 w-40";
    case "icon":
      return "h-24 h-24";
    case "rect":
      return "h-full w-full";
    default:
      return "w-full";
  }
}
const endpoint = "billing/products";
function useProducts(loader) {
  return useQuery({
    queryKey: [endpoint],
    queryFn: () => fetchProducts(),
    initialData: () => {
      var _a2;
      if (loader) {
        return (_a2 = getBootstrapData().loaders) == null ? void 0 : _a2[loader];
      }
    }
  });
}
function fetchProducts() {
  return apiClient.get(endpoint).then((response) => {
    return { products: response.data.pagination.data };
  });
}
function findBestPrice(token, prices) {
  if (token === "monthly") {
    const match2 = findMonthlyPrice(prices);
    if (match2)
      return match2;
  }
  if (token === "yearly") {
    const match2 = findYearlyPrice(prices);
    if (match2)
      return match2;
  }
  return prices[0];
}
function findYearlyPrice(prices) {
  return prices.find((price) => {
    if (price.interval === "month" && price.interval_count >= 12) {
      return price;
    }
    if (price.interval === "year" && price.interval_count >= 1) {
      return price;
    }
  });
}
function findMonthlyPrice(prices) {
  return prices.find((price) => {
    if (price.interval === "day" && price.interval_count >= 30) {
      return price;
    }
    if (price.interval === "month" && price.interval_count >= 1) {
      return price;
    }
  });
}
const CancelFilledIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" })
);
const WarningIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" }),
  "WarningOutlined"
);
const TOOLTIP_COOLDOWN = 500;
const tooltips = {};
let globalWarmedUp = false;
let globalWarmUpTimeout = null;
let globalCooldownTimeout = null;
const closeOpenTooltips = (tooltipId) => {
  var _a2;
  for (const hideTooltipId in tooltips) {
    if (hideTooltipId !== tooltipId) {
      (_a2 = tooltips[hideTooltipId]) == null ? void 0 : _a2.call(tooltips, true);
      delete tooltips[hideTooltipId];
    }
  }
};
const Tooltip = forwardRef(
  ({
    children,
    label,
    placement = "top",
    offset: offset2 = 10,
    variant = "neutral",
    delay = 1500,
    isDisabled,
    usePortal = true,
    ...domProps
  }, ref) => {
    const { x, y, reference, strategy, arrowRef, arrowStyle, refs } = useFloatingPosition({
      placement,
      offset: offset2,
      ref,
      showArrow: true
    });
    const [isOpen, setIsOpen] = useState(false);
    const tooltipId = useId();
    const closeTimeout = useRef();
    const showTooltip = () => {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = void 0;
      closeOpenTooltips(tooltipId);
      tooltips[tooltipId] = hideTooltip;
      globalWarmedUp = true;
      setIsOpen(true);
      if (globalWarmUpTimeout) {
        clearTimeout(globalWarmUpTimeout);
        globalWarmUpTimeout = null;
      }
      if (globalCooldownTimeout) {
        clearTimeout(globalCooldownTimeout);
        globalCooldownTimeout = null;
      }
    };
    const hideTooltip = useCallback(
      (immediate) => {
        if (immediate) {
          clearTimeout(closeTimeout.current);
          closeTimeout.current = void 0;
          setIsOpen(false);
        } else if (!closeTimeout.current) {
          closeTimeout.current = setTimeout(() => {
            closeTimeout.current = void 0;
            setIsOpen(false);
          }, TOOLTIP_COOLDOWN);
        }
        if (globalWarmUpTimeout) {
          clearTimeout(globalWarmUpTimeout);
          globalWarmUpTimeout = null;
        }
        if (globalWarmedUp) {
          if (globalCooldownTimeout) {
            clearTimeout(globalCooldownTimeout);
          }
          globalCooldownTimeout = setTimeout(() => {
            delete tooltips[tooltipId];
            globalCooldownTimeout = null;
            globalWarmedUp = false;
          }, TOOLTIP_COOLDOWN);
        }
      },
      [tooltipId]
    );
    const warmupTooltip = () => {
      closeOpenTooltips(tooltipId);
      tooltips[tooltipId] = hideTooltip;
      if (!isOpen && !globalWarmUpTimeout && !globalWarmedUp) {
        globalWarmUpTimeout = setTimeout(() => {
          globalWarmUpTimeout = null;
          globalWarmedUp = true;
          showTooltip();
        }, delay);
      } else if (!isOpen) {
        showTooltip();
      }
    };
    const showTooltipWithWarmup = (immediate) => {
      if (!immediate && delay > 0 && !closeTimeout.current) {
        warmupTooltip();
      } else {
        showTooltip();
      }
    };
    useEffect(() => {
      return () => {
        clearTimeout(closeTimeout.current);
        const tooltip = tooltips[tooltipId];
        if (tooltip) {
          delete tooltips[tooltipId];
        }
      };
    }, [tooltipId]);
    useEffect(() => {
      const onKeyDown = (e) => {
        if (e.key === "Escape") {
          hideTooltip(true);
        }
      };
      if (isOpen) {
        document.addEventListener("keydown", onKeyDown, true);
        return () => {
          document.removeEventListener("keydown", onKeyDown, true);
        };
      }
    }, [isOpen, hideTooltip]);
    const tooltipContent = /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxs(
      m.div,
      {
        ...PopoverAnimation,
        ref: refs.setFloating,
        id: tooltipId,
        role: "tooltip",
        onPointerEnter: () => {
          showTooltipWithWarmup(true);
        },
        onPointerLeave: () => {
          hideTooltip();
        },
        className: clsx(
          "z-tooltip my-4 max-w-240 break-words rounded px-8 py-4 text-xs text-white shadow",
          variant === "positive" && "bg-positive",
          variant === "danger" && "bg-danger",
          variant === "neutral" && "bg-toast"
        ),
        style: {
          position: strategy,
          top: y ?? "",
          left: x ?? ""
        },
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              ref: arrowRef,
              className: "absolute h-8 w-8 rotate-45 bg-inherit",
              style: arrowStyle
            }
          ),
          label
        ]
      }
    ) });
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      cloneElement(
        children,
        // pass dom props down to child element, in case tooltip is wrapped in menu trigger
        mergeProps(
          {
            "aria-describedby": isOpen ? tooltipId : void 0,
            ref: reference,
            onPointerEnter: (e) => {
              if (e.pointerType === "mouse") {
                showTooltipWithWarmup();
              }
            },
            onFocus: (e) => {
              if (e.target.matches(":focus-visible")) {
                showTooltipWithWarmup(true);
              }
            },
            onPointerLeave: (e) => {
              if (e.pointerType === "mouse") {
                hideTooltip();
              }
            },
            onPointerDown: () => {
              hideTooltip(true);
            },
            onBlur: () => {
              hideTooltip();
            },
            "aria-label": typeof label === "string" ? label : label.props.message
          },
          domProps
        )
      ),
      usePortal ? rootEl && createPortal(tooltipContent, rootEl) : tooltipContent
    ] });
  }
);
function Chip(props) {
  const {
    onRemove,
    disabled,
    invalid,
    errorMessage,
    children,
    className,
    selectable = false,
    radius = "rounded-full",
    elementType = "div",
    to,
    onClick
  } = props;
  const chipRef = useRef(null);
  const deleteButtonRef = useRef(null);
  const focusManager = useFocusManager();
  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        focusManager == null ? void 0 : focusManager.focusNext({ tabbable: true });
        break;
      case "ArrowLeft":
      case "ArrowUp":
        focusManager == null ? void 0 : focusManager.focusPrevious({ tabbable: true });
        break;
      case "Backspace":
      case "Delete":
        if (chipRef.current === document.activeElement) {
          onRemove == null ? void 0 : onRemove();
        }
        break;
    }
  };
  const handleClick = (e) => {
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    } else {
      chipRef.current.focus();
    }
  };
  const sizeStyle2 = sizeClassNames(props);
  let adornment = invalid || errorMessage != null ? /* @__PURE__ */ jsx(WarningIcon, { className: "text-danger", size: "sm" }) : props.adornment && cloneElement(props.adornment, {
    size: sizeStyle2.adornment.size,
    circle: true,
    className: clsx(props.adornment.props, sizeStyle2.adornment.margin)
  });
  if (errorMessage && adornment) {
    adornment = /* @__PURE__ */ jsx(Tooltip, { label: errorMessage, variant: "danger", children: adornment });
  }
  const Element = elementType;
  return /* @__PURE__ */ jsxs(
    Element,
    {
      tabIndex: selectable ? 0 : void 0,
      ref: chipRef,
      to,
      onKeyDown: selectable ? handleKeyDown : void 0,
      onClick: selectable ? handleClick : void 0,
      className: clsx(
        "relative flex flex-shrink-0 items-center justify-center gap-10 overflow-hidden whitespace-nowrap outline-none",
        "min-w-0 max-w-full after:pointer-events-none after:absolute after:inset-0",
        onClick && "cursor-pointer",
        radius,
        colorClassName(props),
        sizeStyle2.chip,
        !disabled && selectable && "hover:after:bg-black/5 focus:after:bg-black/10",
        className
      ),
      children: [
        adornment,
        /* @__PURE__ */ jsx("div", { className: "flex-auto overflow-hidden overflow-ellipsis text-black uppercase font-black", children }),
        onRemove && /* @__PURE__ */ jsx(
          ButtonBase,
          {
            ref: deleteButtonRef,
            className: clsx(
              "text-black/30 dark:text-white/50",
              sizeStyle2.closeButton
            ),
            onClick: (e) => {
              e.stopPropagation();
              onRemove();
            },
            tabIndex: -1,
            children: /* @__PURE__ */ jsx(CancelFilledIcon, { className: "block", width: "100%", height: "100%" })
          }
        )
      ]
    }
  );
}
function sizeClassNames({ size: size2, onRemove }) {
  switch (size2) {
    case "xs":
      return {
        adornment: { size: "xs", margin: "-ml-3" },
        chip: clsx("pl-8 h-20 text-xs font-medium w-max", !onRemove && "pr-8"),
        closeButton: "mr-4 w-14 h-14"
      };
    case "sm":
      return {
        adornment: { size: "xs", margin: "-ml-3" },
        chip: clsx("pl-8 h-26 text-xs", !onRemove && "pr-8"),
        closeButton: "mr-4 w-18 h-18"
      };
    case "lg":
      return {
        adornment: { size: "md", margin: "-ml-12" },
        chip: clsx("pl-18 h-38 text-base", !onRemove && "pr-18"),
        closeButton: "mr-6 w-24 h-24"
      };
    default:
      return {
        adornment: { size: "sm", margin: "-ml-6" },
        chip: clsx("pl-12 h-32 text-sm", !onRemove && "pr-12"),
        closeButton: "mr-6 w-22 h-22"
      };
  }
}
function colorClassName({ color }) {
  switch (color) {
    case "primary":
      return `bg-primary text-on-primary`;
    case "positive":
      return `bg-positive-lighter text-positive-darker`;
    case "danger":
      return `bg-danger-lighter text-danger-darker`;
    default:
      return `bg-chip text-main`;
  }
}
const FormattedCurrency = memo(
  ({ value, currency, currency_position }) => {
    const formatter = useNumberFormatter({
      style: "currency",
      currency,
      currencyDisplay: "narrowSymbol",
      minimumFractionDigits: 0,
      // Set minimum fraction digits to 0 to remove decimals
      maximumFractionDigits: 0
      // Set maximum fraction digits to 0 to remove decimals
    });
    if (isNaN(value)) {
      value = 0;
    }
    const formatted = formatter.format(value);
    let result = formatted;
    if (currency_position) {
      const symbolMatch = formatted.match(/[^0-9.,\s]/g);
      const symbol = symbolMatch ? symbolMatch.join("") : "";
      const number = formatted.replace(/[^0-9.,]/g, "").trim();
      result = `${symbol} ${number}`.trim();
    } else {
      const symbolMatch = formatted.match(/[^0-9.,]/g);
      const symbol = symbolMatch ? symbolMatch.join("") : "";
      const number = formatted.replace(/[^0-9.,]/g, "").trim();
      result = `${number} ${symbol}`.trim();
    }
    return /* @__PURE__ */ jsx(Fragment, { children: result });
  }
);
function FormattedPrice({
  price,
  variant = "slash",
  className,
  priceClassName,
  periodClassName
}) {
  if (!price)
    return null;
  const translatedInterval = /* @__PURE__ */ jsx(Trans, { message: "month" });
  let monthlyAmount = price.amount / (price.interval_count ?? 1);
  if (price.interval === "year") {
    monthlyAmount /= 12;
  }
  return /* @__PURE__ */ jsxs("div", { className: clsx("flex gap-6 items-center", className), children: [
    /* @__PURE__ */ jsxs("div", { className: priceClassName, children: [
      /* @__PURE__ */ jsx(
        FormattedCurrency,
        {
          value: monthlyAmount,
          currency: price.currency,
          currency_position: price.currency_position
        }
      ),
      /* @__PURE__ */ jsxs("span", { className: "", style: { color: "#FFFFFF84" }, children: [
        " ",
        "/"
      ] })
    ] }),
    variant === "slash" ? /* @__PURE__ */ jsxs("div", { className: periodClassName, children: [
      " ",
      /* @__PURE__ */ jsx(Trans, { message: price.interval })
    ] }) : /* @__PURE__ */ jsxs("div", { className: periodClassName, children: [
      /* @__PURE__ */ jsx(Trans, { message: "per" }),
      " ",
      /* @__PURE__ */ jsx("br", {}),
      " ",
      translatedInterval
    ] })
  ] });
}
function ProductFeatureList({ product }) {
  if (!product.feature_list.length)
    return null;
  return /* @__PURE__ */ jsxs("div", { className: "mt-32 border-t pt-24", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-10 text-sm font-semibold", children: /* @__PURE__ */ jsx(Trans, { message: "What's included" }) }),
    product.feature_list.map((feature) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-10 py-6 text-sm", children: [
      /* @__PURE__ */ jsx(CheckIcon, { className: "text-primary", size: "sm" }),
      /* @__PURE__ */ jsx(Trans, { message: feature })
    ] }, feature))
  ] });
}
const UpsellLabel = memo(({ products }) => {
  const upsellPercentage = calcHighestUpsellPercentage(products);
  if (upsellPercentage <= 0) {
    return null;
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("span", { className: "text-primary font-medium", children: [
    " ",
    "(",
    /* @__PURE__ */ jsx(
      Trans,
      {
        message: ":percentage% OFF",
        values: { percentage: upsellPercentage }
      }
    ),
    ")"
  ] }) });
});
function calcHighestUpsellPercentage(products) {
  if (!(products == null ? void 0 : products.length))
    return 0;
  const decreases = products.map((product) => {
    const monthly = findBestPrice("monthly", product.prices);
    const yearly = findBestPrice("yearly", product.prices);
    if (!monthly || !yearly)
      return 0;
    const monthlyAmount = monthly.amount * 12;
    const yearlyAmount = yearly.amount;
    const savingsPercentage = Math.round(
      (monthlyAmount - yearlyAmount) / monthlyAmount * 100
    );
    if (savingsPercentage > 0 && savingsPercentage <= 200) {
      return savingsPercentage;
    }
    return 0;
  });
  return Math.max(Math.max(...decreases), 0);
}
function PricingTable({
  selectedCycle,
  className,
  productLoader
}) {
  const query = useProducts(productLoader);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        "flex flex-col items-stretch gap-24 overflow-x-auto overflow-y-visible pb-20 md:flex-row md:justify-center",
        className
      ),
      children: /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: query.data ? /* @__PURE__ */ jsx(
        PlanList,
        {
          plans: query.data.products,
          selectedPeriod: selectedCycle
        },
        "plan-list"
      ) : /* @__PURE__ */ jsx(SkeletonLoader, {}, "skeleton-loader") })
    }
  );
}
function PlanList({ plans, selectedPeriod }) {
  const { isLoggedIn, isSubscribed } = useAuth();
  const filteredPlans = plans.filter((plan) => !plan.hidden);
  return /* @__PURE__ */ jsx(Fragment, { children: filteredPlans.map((plan, index) => {
    const isFirst = index === 0;
    const isLast = index === filteredPlans.length - 1;
    const price = findBestPrice(selectedPeriod, plan.prices);
    let upgradeRoute;
    if (!isLoggedIn) {
      upgradeRoute = `/register?redirectFrom=pricing`;
    }
    if (isSubscribed) {
      upgradeRoute = `/change-plan/${plan.id}/${price == null ? void 0 : price.id}/confirm`;
    }
    if (isLoggedIn && !plan.free) {
      upgradeRoute = `/checkout/${plan.id}/${price == null ? void 0 : price.id}`;
    }
    return /* @__PURE__ */ jsxs(
      m.div,
      {
        ...opacityAnimation,
        className: clsx(
          "w-full rounded-panel border bg px-28 py-28 shadow-lg md:min-w-240 md:max-w-350",
          isFirst && "ml-auto",
          isLast && "mr-auto"
        ),
        children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-32", children: [
            /* @__PURE__ */ jsx(
              Chip,
              {
                radius: "rounded",
                size: "sm",
                className: clsx(
                  "mb-20 w-min",
                  !plan.recommended && "invisible"
                ),
                children: /* @__PURE__ */ jsx(Trans, { message: "Most popular" })
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "mb-12 text-xl font-semibold", children: /* @__PURE__ */ jsx(Trans, { message: plan.name }) }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-muted", children: /* @__PURE__ */ jsx(Trans, { message: plan.description }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            price ? /* @__PURE__ */ jsx(
              FormattedPrice,
              {
                priceClassName: "font-bold text-4xl",
                periodClassName: "text-muted text-xs",
                variant: "separateLine",
                price,
                className: "mt-32"
              }
            ) : /* @__PURE__ */ jsx("div", { className: "text-4xl font-bold", children: /* @__PURE__ */ jsx(Trans, { message: "Free" }) }),
            /* @__PURE__ */ jsx("br", {}),
            price ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: price.interval === "year" && /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted", children: [
              /* @__PURE__ */ jsx(Trans, { message: "Billed Annually" }),
              /* @__PURE__ */ jsx(UpsellLabel, { products: [plan] })
            ] }) }) : /* @__PURE__ */ jsx("div", { className: "text-4xl font-bold", children: /* @__PURE__ */ jsx(Trans, { message: "Free" }) }),
            price ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: price.interval === "month" && /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted", children: [
              /* @__PURE__ */ jsx(Trans, { message: "Get" }),
              /* @__PURE__ */ jsx(UpsellLabel, { products: [plan] }),
              /* @__PURE__ */ jsx(Trans, { message: " When Billed Annually" })
            ] }) }) : /* @__PURE__ */ jsx("div", { className: "text-4xl font-bold", children: /* @__PURE__ */ jsx(Trans, { message: "Free" }) }),
            /* @__PURE__ */ jsx("div", { className: "mt-60", children: /* @__PURE__ */ jsx(
              Button,
              {
                variant: plan.recommended ? "flat" : "outline",
                color: "primary",
                className: "w-full",
                size: "md",
                elementType: upgradeRoute ? Link : void 0,
                disabled: !upgradeRoute,
                onClick: () => {
                  if (isLoggedIn || !price || !plan)
                    return;
                  setInLocalStorage("be.onboarding.selected", {
                    productId: plan.id,
                    priceId: price.id
                  });
                },
                to: upgradeRoute,
                children: plan.free ? /* @__PURE__ */ jsx(Trans, { message: "Get started" }) : /* @__PURE__ */ jsx(Trans, { message: "Upgrade" })
              }
            ) }),
            /* @__PURE__ */ jsx(ProductFeatureList, { product: plan })
          ] })
        ]
      },
      plan.id
    );
  }) });
}
function SkeletonLoader() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PlanSkeleton, {}, "skeleton-1"),
    /* @__PURE__ */ jsx(PlanSkeleton, {}, "skeleton-2"),
    /* @__PURE__ */ jsx(PlanSkeleton, {}, "skeleton-3")
  ] });
}
function PlanSkeleton() {
  return /* @__PURE__ */ jsxs(
    m.div,
    {
      ...opacityAnimation,
      className: "w-full rounded-lg border px-28 py-90 shadow-lg md:max-w-350",
      children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "my-10" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "mb-40" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "mb-40 h-30" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "mb-40 h-40" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "mb-20" }),
        /* @__PURE__ */ jsx(Skeleton, {}),
        /* @__PURE__ */ jsx(Skeleton, {})
      ]
    }
  );
}
const Radio = forwardRef((props, ref) => {
  const { children, autoFocus, size: size2, invalid, isFirst, ...domProps } = props;
  const inputRef = useObjectRef(ref);
  useAutoFocus({ autoFocus }, inputRef);
  const sizeClassNames2 = getSizeClassNames(size2);
  return /* @__PURE__ */ jsxs(
    "label",
    {
      className: clsx(
        "inline-flex gap-8 select-none items-center whitespace-nowrap align-middle",
        sizeClassNames2.label,
        props.disabled && "text-disabled pointer-events-none",
        props.invalid && "text-danger"
      ),
      children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "radio",
            className: clsx(
              "focus-visible:ring outline-none",
              "rounded-full transition-button border-2 appearance-none",
              "border-text-muted disabled:border-disabled-fg checked:border-primary checked:hover:border-primary-dark",
              "before:bg-primary disabled:before:bg-disabled-fg before:hover:bg-primary-dark",
              "before:h-full before:w-full before:block before:rounded-full before:scale-10 before:opacity-0 before:transition before:duration-200",
              "checked:before:scale-[.65] checked:before:opacity-100",
              sizeClassNames2.circle
            ),
            ref: inputRef,
            ...domProps
          }
        ),
        children && /* @__PURE__ */ jsx("span", { children })
      ]
    }
  );
});
function FormRadio(props) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid }
  } = useController({
    name: props.name
  });
  const formProps = {
    onChange,
    onBlur,
    checked: props.value === value,
    invalid: props.invalid || invalid
  };
  return /* @__PURE__ */ jsx(Radio, { ref, ...mergeProps(formProps, props) });
}
function getSizeClassNames(size2) {
  switch (size2) {
    case "xs":
      return { circle: "h-12 w-12", label: "text-xs" };
    case "sm":
      return { circle: "h-16 w-16", label: "text-sm" };
    case "lg":
      return { circle: "h-24 w-24", label: "text-lg" };
    default:
      return { circle: "h-20 w-20", label: "text-base" };
  }
}
const RadioGroup = forwardRef(
  (props, ref) => {
    const style = getInputFieldClassNames(props);
    const {
      label,
      children,
      size: size2,
      className,
      orientation = "horizontal",
      disabled,
      required,
      invalid,
      errorMessage,
      description
    } = props;
    const labelProps = {};
    const id = useId();
    const name = props.name || id;
    return /* @__PURE__ */ jsxs(
      "fieldset",
      {
        "aria-describedby": description ? `${id}-description` : void 0,
        ref,
        className: clsx("text-left", className),
        children: [
          label && /* @__PURE__ */ jsx("legend", { className: style.label, ...labelProps, children: label }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: clsx(
                "flex",
                label ? "mt-6" : "mt-0",
                orientation === "vertical" ? "flex-col gap-10" : "flex-row gap-16"
              ),
              children: Children.map(children, (child) => {
                if (isValidElement(child)) {
                  return cloneElement(child, {
                    name,
                    size: size2,
                    invalid: child.props.invalid || invalid || void 0,
                    disabled: child.props.disabled || disabled,
                    required: child.props.required || required
                  });
                }
              })
            }
          ),
          description && !errorMessage && /* @__PURE__ */ jsx("div", { className: style.description, id: `${id}-description`, children: description }),
          errorMessage && /* @__PURE__ */ jsx("div", { className: style.error, children: errorMessage })
        ]
      }
    );
  }
);
function FormRadioGroup({ children, ...props }) {
  const {
    fieldState: { error }
  } = useController({
    name: props.name
  });
  return /* @__PURE__ */ jsx(RadioGroup, { errorMessage: error == null ? void 0 : error.message, ...props, children });
}
function BillingCycleRadio({
  selectedCycle,
  onChange,
  products,
  ...radioGroupProps
}) {
  return /* @__PURE__ */ jsxs(RadioGroup, { ...radioGroupProps, children: [
    /* @__PURE__ */ jsxs(
      Radio,
      {
        value: "yearly",
        checked: selectedCycle === "yearly",
        onChange: (e) => {
          onChange(e.target.value);
        },
        children: [
          /* @__PURE__ */ jsx(Trans, { message: "Annual" }),
          /* @__PURE__ */ jsx(UpsellLabel, { products })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      Radio,
      {
        value: "monthly",
        checked: selectedCycle === "monthly",
        onChange: (e) => {
          onChange(e.target.value);
        },
        children: /* @__PURE__ */ jsx(Trans, { message: "Monthly" })
      }
    )
  ] });
}
function useLandingPageTrendingArtists() {
  return useQuery({
    queryKey: ["landing", "trending-artists"],
    queryFn: () => fetchArtists(),
    initialData: () => {
      var _a2;
      const data = (_a2 = getBootstrapData().loaders) == null ? void 0 : _a2.landingPage;
      if (data == null ? void 0 : data.trendingArtists) {
        return { artists: data.trendingArtists };
      }
      return void 0;
    }
  });
}
function fetchArtists() {
  return apiClient.get("landing/artists").then((response) => response.data);
}
function ContentGrid({ children, className }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        "content-grid grid grid-cols-[repeat(var(--nVisibleItems),minmax(0,1fr))] gap-18",
        className
      ),
      children
    }
  );
}
function PlayableMediaGridSkeleton({
  itemCount,
  itemRadius,
  showDescription = true
}) {
  return /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, children: /* @__PURE__ */ jsx(ContentGrid, { children: [...new Array(Math.min(itemCount, 30)).keys()].map((key) => {
    return /* @__PURE__ */ jsxs("div", { className: "w-full relative", children: [
      /* @__PURE__ */ jsx("div", { className: "aspect-square w-full", children: /* @__PURE__ */ jsx(Skeleton, { variant: "rect", radius: itemRadius }) }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: clsx(
            "text-xs mt-12",
            !showDescription && "pt-[3px]"
          ),
          children: [
            /* @__PURE__ */ jsx(Skeleton, { variant: "text" }),
            showDescription && /* @__PURE__ */ jsx(Skeleton, { variant: "text", className: "mt-[7px]" })
          ]
        }
      )
    ] }, key);
  }) }) }, "skeletons");
}
function LandingPage() {
  var _a2, _b2;
  const settings = useSettings();
  const appearance = settings.homepage.appearance;
  const showPricing = ((_a2 = settings.homepage) == null ? void 0 : _a2.pricing) && settings.billing.enable;
  const showTrending = (_b2 = settings.homepage) == null ? void 0 : _b2.trending;
  const { player } = useSettings();
  useIsMobileMediaQuery();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(DefaultMetaTags, {}),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
      DashboardLayout,
      {
        name: "web-player",
        initialRightSidenavStatus: (player == null ? void 0 : player.hide_queue) ? "closed" : "open",
        children: [
          /* @__PURE__ */ jsx(
            PlayerNavbarLayout,
            {
              size: "sm",
              menuPosition: "landing-page-navbar",
              className: "flex-shrink-0"
            }
          ),
          /* @__PURE__ */ jsx(SidedavFrontend, { position: "left", display: "block", children: /* @__PURE__ */ jsx(Sidenav, {}) }),
          /* @__PURE__ */ jsx(DashboardContent, { children: /* @__PURE__ */ jsxs("div", { className: "relative h-screen overflow-auto", children: [
            /* @__PURE__ */ jsx(HeroHeader$1, { content: appearance }),
            /* @__PURE__ */ jsx(PrimaryFeatures, { content: appearance }),
            /* @__PURE__ */ jsx(SecondaryFeatures, { content: appearance }),
            showTrending && /* @__PURE__ */ jsx(TrendingArtistsSection, {}),
            /* @__PURE__ */ jsx(BottomCta, { content: appearance }),
            showPricing && /* @__PURE__ */ jsx(PricingSection, { content: appearance }),
            /* @__PURE__ */ jsx(FooterLandingPage, {})
          ] }) })
        ]
      }
    ) })
  ] });
}
function HeroHeader$1({ content }) {
  const lightThemeVars = useLightThemeVariables();
  const { trans } = useTrans();
  useSettings();
  useIsMobileMediaQuery();
  const navigate = useNavigate();
  const {
    headerTitle,
    headerSubtitle,
    headerImage,
    headerImageOpacity,
    actions,
    headerOverlayColor1,
    headerOverlayColor2
  } = content;
  let overlayBackground = void 0;
  if (headerOverlayColor1 && headerOverlayColor2) {
    overlayBackground = `linear-gradient(45deg, ${headerOverlayColor1} 0%, ${headerOverlayColor2} 100%)`;
  } else if (headerOverlayColor1) {
    overlayBackground = headerOverlayColor1;
  } else if (headerOverlayColor2) {
    overlayBackground = headerOverlayColor2;
  }
  return /* @__PURE__ */ jsxs("div", { className: "relative isolate mb-14 overflow-hidden md:mb-60", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        "data-testid": "headerImage",
        src: headerImage,
        style: {
          opacity: headerImageOpacity
        },
        alt: "",
        width: "2347",
        height: "1244",
        decoding: "async",
        loading: "lazy",
        className: "absolute left-1/2 top-1/2 z-20 max-w-none -translate-x-1/2 -translate-y-1/2"
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute z-10 h-full w-full bg-[rgb(37,99,235)]",
        style: { background: overlayBackground }
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "relative z-30 flex h-full flex-col", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-850 flex-auto flex-col items-center justify-center px-14 py-50 text-center text-white lg:py-90", children: [
      headerTitle && /* @__PURE__ */ jsx(
        "h1",
        {
          className: "text-3xl font-normal md:text-5xl",
          "data-testid": "headerTitle",
          children: /* @__PURE__ */ jsx(Trans, { message: headerTitle })
        }
      ),
      headerSubtitle && /* @__PURE__ */ jsx(
        "div",
        {
          className: "max-auto mt-24 max-w-640 text-lg tracking-tight md:text-xl",
          "data-testid": "headerSubtitle",
          children: /* @__PURE__ */ jsx(Trans, { message: headerSubtitle })
        }
      ),
      /* @__PURE__ */ jsx(
        "form",
        {
          style: lightThemeVars,
          className: "mt-60 w-full md:mt-80",
          onSubmit: (e) => {
            e.preventDefault();
            navigate(
              `search/${e.currentTarget[0].value}`
            );
          },
          children: /* @__PURE__ */ jsx(
            TextField,
            {
              background: "bg-white",
              inputRadius: "rounded-full",
              size: "lg",
              placeholder: trans(message(content.actions.inputText)),
              startAdornment: /* @__PURE__ */ jsx(SearchIcon, {}),
              adornmentPosition: "left-10"
            }
          )
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex min-h-50 gap-20 pb-30 pt-70 empty:min-h-0 md:pb-50 md:pt-90", children: [
        /* @__PURE__ */ jsx(
          CtaButton,
          {
            item: actions.cta1,
            variant: "raised",
            color: "white",
            size: "lg",
            radius: "rounded-full",
            "data-testid": "cta1",
            className: "min-w-180"
          }
        ),
        /* @__PURE__ */ jsx(
          CtaButton,
          {
            item: actions.cta2,
            variant: "text",
            color: "paper",
            size: "lg",
            radius: "rounded-full",
            "data-testid": "cta2"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 z-20 h-[6vw] w-full translate-y-1/2 -skew-y-3 transform bg" })
  ] });
}
function CtaButton({ item, ...buttonProps }) {
  if (!(item == null ? void 0 : item.label) || !(item == null ? void 0 : item.action))
    return null;
  const Icon = item.icon ? createSvgIconFromTree(item.icon) : void 0;
  return /* @__PURE__ */ jsx(
    Button,
    {
      elementType: item.type === "route" ? Link : "a",
      href: item.action,
      to: item.action,
      startIcon: Icon ? /* @__PURE__ */ jsx(Icon, {}) : void 0,
      ...buttonProps,
      children: /* @__PURE__ */ jsx(Trans, { message: item.label })
    }
  );
}
function PrimaryFeatures({ content }) {
  var _a2;
  if (!((_a2 = content.primaryFeatures) == null ? void 0 : _a2.length)) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "landing-container z-10 items-stretch gap-26 md:flex",
        id: "primary-features",
        children: content.primaryFeatures.map((feature, index) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "mb-14 flex-1 rounded-2xl px-24 py-36 text-center shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:bg-alt md:mb-0",
            "data-testid": `primary-root-${index}`,
            children: [
              /* @__PURE__ */ jsx(
                MixedImage,
                {
                  className: "mx-auto mb-30 h-128",
                  "data-testid": `primary-image-${index}`,
                  src: feature.image
                }
              ),
              /* @__PURE__ */ jsx(
                "h2",
                {
                  className: "my-16 text-lg font-medium",
                  "data-testid": `primary-title-${index}`,
                  children: /* @__PURE__ */ jsx(Trans, { message: feature.title })
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "text-md text-[0.938rem]",
                  "data-testid": `primary-subtitle-${index}`,
                  children: /* @__PURE__ */ jsx(Trans, { message: feature.subtitle })
                }
              )
            ]
          },
          index
        ))
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mt-100 h-1 bg-divider" })
  ] });
}
function SecondaryFeatures({ content }) {
  var _a2;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        "relative overflow-hidden",
        ((_a2 = content.primaryFeatures) == null ? void 0 : _a2.length) && "pt-100"
      ),
      children: /* @__PURE__ */ jsx("div", { className: "landing-container relative", id: "features", children: content.secondaryFeatures.map((feature, index) => {
        const isEven = index % 2 === 0;
        return /* @__PURE__ */ jsxs(
          "div",
          {
            "data-testid": `secondary-root-${index}`,
            className: clsx(
              "relative z-10 mb-14 py-16 md:mb-80 md:flex",
              isEven && "flex-row-reverse"
            ),
            children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: feature.image,
                  className: "mr-auto w-580 max-w-full rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)]",
                  "data-testid": `secondary-image-${index}`,
                  alt: ""
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "ml-30 mr-auto max-w-350 pt-30", children: [
                /* @__PURE__ */ jsx(
                  "small",
                  {
                    className: "mb-16 text-xs font-medium uppercase tracking-widest text-muted",
                    "data-testid": `secondary-subtitle-${index}`,
                    children: /* @__PURE__ */ jsx(Trans, { message: feature.subtitle })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "h3",
                  {
                    className: "py-16 text-3xl",
                    "data-testid": `secondary-title-${index}`,
                    children: /* @__PURE__ */ jsx(Trans, { message: feature.title })
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "h-2 w-50 bg-black/90 dark:bg-divider" }),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "my-20 text-[0.938rem]",
                    "data-testid": `secondary-description-${index}`,
                    children: /* @__PURE__ */ jsx(Trans, { message: feature.description })
                  }
                )
              ] })
            ]
          },
          index
        );
      }) })
    }
  );
}
function TrendingArtistsSection() {
  const { data, isLoading } = useLandingPageTrendingArtists();
  const { branding } = useSettings();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "h-1 bg-divider" }),
    /* @__PURE__ */ jsxs("div", { className: "landing-container pb-128 pt-80 @container", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-64 text-center text-3xl tracking-tight sm:text-4xl", children: /* @__PURE__ */ jsx(
        Trans,
        {
          message: "Currently trending artists on :site",
          values: { site: branding.site_name }
        }
      ) }),
      isLoading ? /* @__PURE__ */ jsx(
        PlayableMediaGridSkeleton,
        {
          itemCount: 8,
          itemRadius: "rounded-full",
          showDescription: false
        }
      ) : /* @__PURE__ */ jsx(ContentGrid, { children: data == null ? void 0 : data.artists.map((artist) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: getArtistLink(artist),
            className: "block aspect-square",
            children: /* @__PURE__ */ jsx(
              SmallArtistImage,
              {
                artist,
                size: "w-full h-full",
                className: "rounded-full"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "mt-12 overflow-hidden overflow-ellipsis text-center text-sm", children: /* @__PURE__ */ jsx(ArtistLink, { artist }) })
      ] }, artist.id)) })
    ] })
  ] });
}
function PricingSection({ content }) {
  var _a2;
  const query = useProducts();
  const [selectedCycle, setSelectedCycle] = useState("yearly");
  return /* @__PURE__ */ jsx("div", { className: "py-80 sm:py-128", id: "pricing", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-1280 px-24 lg:px-32", children: [
    /* @__PURE__ */ jsxs("div", { className: "md:text-center", children: [
      content.pricingTitle && /* @__PURE__ */ jsx(
        "h2",
        {
          className: "font-display text-3xl tracking-tight sm:text-4xl",
          "data-testid": "pricingTitle",
          children: /* @__PURE__ */ jsx(Trans, { message: content.pricingTitle })
        }
      ),
      content.pricingSubtitle && /* @__PURE__ */ jsx(
        "p",
        {
          className: "mt-16 text-lg text-muted",
          "data-testid": "pricingSubtitle",
          children: /* @__PURE__ */ jsx(Trans, { message: content.pricingSubtitle })
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      BillingCycleRadio,
      {
        products: (_a2 = query.data) == null ? void 0 : _a2.products,
        selectedCycle,
        onChange: setSelectedCycle,
        className: "my-50 flex justify-center",
        size: "lg"
      }
    ),
    /* @__PURE__ */ jsx(PricingTable, { selectedCycle })
  ] }) });
}
function BottomCta({ content }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "relative overflow-hidden bg-black py-90 text-white before:pointer-events-none before:absolute before:inset-0 before:z-10 before:bg-gradient-to-r before:from-black before:to-transparent md:py-128",
      "data-testid": "footerImage",
      children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            draggable: false,
            src: content.footerImage,
            alt: "",
            width: "2347",
            height: "1244",
            decoding: "async",
            loading: "lazy",
            className: "absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "relative z-10 mx-auto max-w-1280 px-24 text-center sm:px-16 lg:px-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-512 text-center", children: [
          /* @__PURE__ */ jsx(
            "h2",
            {
              className: " font-display text-3xl tracking-tight sm:text-4xl",
              "data-testid": "footerTitle",
              children: /* @__PURE__ */ jsx(Trans, { message: content.footerTitle })
            }
          ),
          content.footerSubtitle && /* @__PURE__ */ jsx(
            "p",
            {
              className: "mt-16 text-lg tracking-tight",
              "data-testid": "footerSubtitle",
              children: /* @__PURE__ */ jsx(Trans, { message: content.footerSubtitle })
            }
          ),
          /* @__PURE__ */ jsx(
            CtaButton,
            {
              item: content.actions.cta3,
              size: "lg",
              radius: "rounded-full",
              variant: "flat",
              color: "white",
              className: "mt-40 block",
              "data-testid": "cta3"
            }
          )
        ] }) })
      ]
    }
  );
}
function AccountSettingsPanel({
  id,
  title,
  titleSuffix,
  children,
  actions
}) {
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id,
      className: "mb-24 w-full rounded-panel border bg px-24 py-20",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-14 border-b pb-10", children: [
          /* @__PURE__ */ jsx("div", { className: "text-lg font-light", children: title }),
          titleSuffix && /* @__PURE__ */ jsx("div", { className: "ml-auto", children: titleSuffix })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "pt-24", children }),
        actions && /* @__PURE__ */ jsx("div", { className: "mt-36 flex justify-end border-t pt-10", children: actions })
      ]
    }
  );
}
function List({ children, className, padding, dataTestId }) {
  return /* @__PURE__ */ jsx(FocusScope, { children: /* @__PURE__ */ jsx(
    "ul",
    {
      "data-testid": dataTestId,
      className: clsx(
        "text-base outline-none sm:text-sm",
        className,
        padding ?? "py-4"
      ),
      children
    }
  ) });
}
const ListItem = forwardRef(
  ({
    children,
    onSelected,
    borderRadius = "rounded",
    className,
    ...listItemProps
  }, ref) => {
    const focusManager = useFocusManager();
    const isSelectable = !!onSelected;
    const [isActive, setIsActive] = useState(false);
    const onKeyDown = (e) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          focusManager == null ? void 0 : focusManager.focusNext();
          break;
        case "ArrowUp":
          e.preventDefault();
          focusManager == null ? void 0 : focusManager.focusPrevious();
          break;
        case "Home":
          e.preventDefault();
          focusManager == null ? void 0 : focusManager.focusFirst();
          break;
        case "End":
          e.preventDefault();
          focusManager == null ? void 0 : focusManager.focusLast();
          break;
        case "Enter":
        case "Space":
          e.preventDefault();
          onSelected == null ? void 0 : onSelected();
          break;
      }
    };
    return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
      ListItemBase,
      {
        className: clsx(className, borderRadius),
        isActive,
        isDisabled: listItemProps.isDisabled,
        ...listItemProps,
        onFocus: (e) => {
          setIsActive(e.target.matches(":focus-visible"));
        },
        onBlur: () => {
          setIsActive(false);
        },
        onClick: () => {
          onSelected == null ? void 0 : onSelected();
        },
        ref,
        role: isSelectable ? "button" : void 0,
        onKeyDown: isSelectable ? onKeyDown : void 0,
        tabIndex: isSelectable && !listItemProps.isDisabled ? 0 : void 0,
        children
      }
    ) });
  }
);
const LoginIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M11 7 9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z" }),
  "LoginOutlined"
);
const LockIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" }),
  "LockOutlined"
);
const PhonelinkLockIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M19 1H9c-1.1 0-2 .9-2 2v3h2V4h10v16H9v-2H7v3c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm-8.2 10V9.5C10.8 8.1 9.4 7 8 7S5.2 8.1 5.2 9.5V11c-.6 0-1.2.6-1.2 1.2v3.5c0 .7.6 1.3 1.2 1.3h5.5c.7 0 1.3-.6 1.3-1.2v-3.5c0-.7-.6-1.3-1.2-1.3zm-1.3 0h-3V9.5c0-.8.7-1.3 1.5-1.3s1.5.5 1.5 1.3V11z" }),
  "PhonelinkLockOutlined"
);
const ApiIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "m14 12-2 2-2-2 2-2 2 2zm-2-6 2.12 2.12 2.5-2.5L12 1 7.38 5.62l2.5 2.5L12 6zm-6 6 2.12-2.12-2.5-2.5L1 12l4.62 4.62 2.5-2.5L6 12zm12 0-2.12 2.12 2.5 2.5L23 12l-4.62-4.62-2.5 2.5L18 12zm-6 6-2.12-2.12-2.5 2.5L12 23l4.62-4.62-2.5-2.5L12 18z" }),
  "ApiOutlined"
);
const DangerousIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM19 14.9 14.9 19H9.1L5 14.9V9.1L9.1 5h5.8L19 9.1v5.8zm-4.17-7.14L12 10.59 9.17 7.76 7.76 9.17 10.59 12l-2.83 2.83 1.41 1.41L12 13.41l2.83 2.83 1.41-1.41L13.41 12l2.83-2.83-1.41-1.41z" }),
  "DangerousOutlined"
);
const DevicesIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z" }),
  "DevicesOutlined"
);
var AccountSettingsId = /* @__PURE__ */ ((AccountSettingsId2) => {
  AccountSettingsId2["AccountDetails"] = "account-details";
  AccountSettingsId2["SocialLogin"] = "social-login";
  AccountSettingsId2["Password"] = "password";
  AccountSettingsId2["TwoFactor"] = "two-factor";
  AccountSettingsId2["LocationAndLanguage"] = "location-and-language";
  AccountSettingsId2["Developers"] = "developers";
  AccountSettingsId2["DeleteAccount"] = "delete-account";
  AccountSettingsId2["Sessions"] = "sessions";
  return AccountSettingsId2;
})(AccountSettingsId || {});
function AccountSettingsSidenav() {
  var _a2;
  const p = AccountSettingsId;
  const { hasPermission } = useAuth();
  const { api, social } = useSettings();
  const { auth } = useContext(SiteConfigContext);
  const socialEnabled = (social == null ? void 0 : social.envato) || (social == null ? void 0 : social.google) || (social == null ? void 0 : social.facebook) || (social == null ? void 0 : social.twitter);
  return /* @__PURE__ */ jsx("aside", { className: "sticky top-10 hidden flex-shrink-0 lg:block", children: /* @__PURE__ */ jsxs(List, { padding: "p-0", children: [
    (_a2 = auth.accountSettingsPanels) == null ? void 0 : _a2.map((panel) => /* @__PURE__ */ jsx(
      Item,
      {
        icon: /* @__PURE__ */ jsx(panel.icon, { viewBox: "0 0 50 50" }),
        panel: panel.id,
        children: /* @__PURE__ */ jsx(Trans, { ...panel.label })
      },
      panel.id
    )),
    /* @__PURE__ */ jsx(Item, { icon: /* @__PURE__ */ jsx(PersonIcon, {}), panel: p.AccountDetails, children: /* @__PURE__ */ jsx(Trans, { message: "Account details" }) }),
    socialEnabled && /* @__PURE__ */ jsx(Item, { icon: /* @__PURE__ */ jsx(LoginIcon, {}), panel: p.SocialLogin, children: /* @__PURE__ */ jsx(Trans, { message: "Social login" }) }),
    /* @__PURE__ */ jsx(Item, { icon: /* @__PURE__ */ jsx(LockIcon, {}), panel: p.Password, children: /* @__PURE__ */ jsx(Trans, { message: "Password" }) }),
    /* @__PURE__ */ jsx(Item, { icon: /* @__PURE__ */ jsx(PhonelinkLockIcon, {}), panel: p.TwoFactor, children: /* @__PURE__ */ jsx(Trans, { message: "Two factor authentication" }) }),
    /* @__PURE__ */ jsx(Item, { icon: /* @__PURE__ */ jsx(DevicesIcon, {}), panel: p.Sessions, children: /* @__PURE__ */ jsx(Trans, { message: "Active sessions" }) }),
    /* @__PURE__ */ jsx(Item, { icon: /* @__PURE__ */ jsx(LanguageIcon, {}), panel: p.LocationAndLanguage, children: /* @__PURE__ */ jsx(Trans, { message: "Location and language" }) }),
    (api == null ? void 0 : api.integrated) && hasPermission("api.access") ? /* @__PURE__ */ jsx(Item, { icon: /* @__PURE__ */ jsx(ApiIcon, {}), panel: p.Developers, children: /* @__PURE__ */ jsx(Trans, { message: "Developers" }) }) : null,
    /* @__PURE__ */ jsx(Item, { icon: /* @__PURE__ */ jsx(DangerousIcon, {}), panel: p.DeleteAccount, children: /* @__PURE__ */ jsx(Trans, { message: "Delete account" }) })
  ] }) });
}
function Item({ children, icon, isLast, panel }) {
  return /* @__PURE__ */ jsx(
    ListItem,
    {
      startIcon: icon,
      className: isLast ? void 0 : "mb-10",
      onSelected: () => {
        const panelEl = document.querySelector(`#${panel}`);
        if (panelEl) {
          panelEl.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      },
      children
    }
  );
}
function SocialLoginPanel({ user }) {
  return /* @__PURE__ */ jsxs(
    AccountSettingsPanel,
    {
      id: AccountSettingsId.SocialLogin,
      title: /* @__PURE__ */ jsx(Trans, { message: "Manage social login" }),
      children: [
        /* @__PURE__ */ jsx(
          SocialLoginPanelRow,
          {
            icon: /* @__PURE__ */ jsx(
              EnvatoIcon,
              {
                viewBox: "0 0 50 50",
                className: "border-envato bg-envato text-white"
              }
            ),
            service: "envato",
            user
          }
        ),
        /* @__PURE__ */ jsx(
          SocialLoginPanelRow,
          {
            icon: /* @__PURE__ */ jsx(GoogleIcon, { viewBox: "0 0 48 48" }),
            service: "google",
            user
          }
        ),
        /* @__PURE__ */ jsx(
          SocialLoginPanelRow,
          {
            icon: /* @__PURE__ */ jsx(FacebookIcon, { className: "text-facebook" }),
            service: "facebook",
            user
          }
        ),
        /* @__PURE__ */ jsx(
          SocialLoginPanelRow,
          {
            icon: /* @__PURE__ */ jsx(TwitterIcon, { className: "text-twitter" }),
            service: "twitter",
            user
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "pb-6 pt-16 text-sm text-muted", children: /* @__PURE__ */ jsx(Trans, { message: "If you disable social logins, you'll still be able to log in using your email and password." }) })
      ]
    }
  );
}
function SocialLoginPanelRow({
  service,
  user,
  className,
  icon
}) {
  var _a2, _b2, _c;
  const { social } = useSettings();
  const { connectSocial, disconnectSocial } = useSocialLogin();
  const username = (_b2 = (_a2 = user == null ? void 0 : user.social_profiles) == null ? void 0 : _a2.find((s) => s.service_name === service)) == null ? void 0 : _b2.username;
  if (!((_c = social == null ? void 0 : social[service]) == null ? void 0 : _c.enable)) {
    return null;
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "flex items-center gap-14 border-b px-10 py-20",
        className
      ),
      children: [
        cloneElement(icon, {
          size: "xl",
          className: clsx(icon.props.className, "border p-8 rounded")
        }),
        /* @__PURE__ */ jsxs("div", { className: "mr-auto overflow-hidden text-ellipsis whitespace-nowrap", children: [
          /* @__PURE__ */ jsx("div", { className: "overflow-hidden text-ellipsis text-sm font-bold first-letter:capitalize", children: /* @__PURE__ */ jsx(Trans, { message: ":service account", values: { service } }) }),
          /* @__PURE__ */ jsx("div", { className: "mt-2 text-xs", children: username || /* @__PURE__ */ jsx(Trans, { message: "Disabled" }) })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            disabled: disconnectSocial.isPending,
            size: "xs",
            variant: "outline",
            color: username ? "danger" : "primary",
            onClick: async () => {
              if (username) {
                disconnectSocial.mutate(
                  { service },
                  {
                    onSuccess: () => {
                      queryClient.invalidateQueries({ queryKey: ["users"] });
                      toast(
                        message("Disabled :service account", { values: { service } })
                      );
                    }
                  }
                );
              } else {
                const e = await connectSocial(service);
                if ((e == null ? void 0 : e.status) === "SUCCESS") {
                  queryClient.invalidateQueries({ queryKey: ["users"] });
                  toast(message("Enabled :service account", { values: { service } }));
                }
              }
            },
            children: username ? /* @__PURE__ */ jsx(Trans, { message: "Disable" }) : /* @__PURE__ */ jsx(Trans, { message: "Enable" })
          }
        )
      ]
    }
  );
}
function useUpdateAccountDetails(form) {
  return useMutation({
    mutationFn: (props) => updateAccountDetails(props),
    onSuccess: () => {
      toast(message("Updated account details"));
    },
    onError: (r) => onFormQueryError(r, form)
  });
}
function updateAccountDetails(payload) {
  return apiClient.put("users/me", payload).then((r) => r.data);
}
function UploadAvatar({ file, url }, user) {
  const payload = new FormData();
  if (file) {
    payload.set("file", file.native);
  } else {
    payload.set("url", url);
  }
  return apiClient.post(`users/${user.id}/avatar`, payload, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }).then((r) => r.data);
}
function useUploadAvatar({ user }) {
  return useMutation({
    mutationFn: (payload) => UploadAvatar(payload, user),
    onSuccess: () => {
      toast(message("Uploaded avatar"));
    },
    onError: (err) => {
      const message2 = getAxiosErrorMessage(err, "file");
      if (message2) {
        toast.danger(message2);
      } else {
        showHttpErrorToast(err);
      }
    }
  });
}
function removeAvatar(user) {
  return apiClient.delete(`users/${user.id}/avatar`).then((r) => r.data);
}
function useRemoveAvatar({ user }) {
  return useMutation({
    mutationFn: () => removeAvatar(user),
    onSuccess: () => {
      toast(message("Removed avatar"));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function BasicInfoPanel({ user }) {
  const uploadAvatar = useUploadAvatar({ user });
  const removeAvatar2 = useRemoveAvatar({ user });
  const formId = useId();
  const form = useForm({
    defaultValues: {
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      avatar: user.avatar
    }
  });
  const updateDetails = useUpdateAccountDetails(form);
  return /* @__PURE__ */ jsx(
    AccountSettingsPanel,
    {
      id: AccountSettingsId.AccountDetails,
      title: /* @__PURE__ */ jsx(Trans, { message: "Update name and profile image" }),
      actions: /* @__PURE__ */ jsx(
        Button,
        {
          type: "submit",
          variant: "flat",
          color: "primary",
          form: formId,
          disabled: updateDetails.isPending || !form.formState.isValid,
          children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
        }
      ),
      children: /* @__PURE__ */ jsxs(
        Form,
        {
          form,
          className: "flex flex-col flex-col-reverse md:flex-row items-center gap-40 md:gap-80",
          onSubmit: (newDetails) => {
            updateDetails.mutate(newDetails);
          },
          id: formId,
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-auto w-full", children: [
              /* @__PURE__ */ jsx(
                FormTextField,
                {
                  className: "mb-24",
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
            ] }),
            /* @__PURE__ */ jsx(FileUploadProvider, { children: /* @__PURE__ */ jsx(
              FormImageSelector,
              {
                className: "md:mr-80",
                variant: "avatar",
                previewSize: "w-90 h-90",
                showRemoveButton: true,
                name: "avatar",
                diskPrefix: "avatars",
                label: /* @__PURE__ */ jsx(Trans, { message: "Profile image" }),
                onChange: (url) => {
                  if (url) {
                    uploadAvatar.mutate({ url });
                  } else {
                    removeAvatar2.mutate();
                  }
                }
              }
            ) })
          ]
        }
      )
    }
  );
}
function useUpdatePassword(form) {
  return useMutation({
    mutationFn: (props) => updatePassword(props),
    onSuccess: () => {
      toast(message("Password changed"));
    },
    onError: (r) => onFormQueryError(r, form)
  });
}
function updatePassword(payload) {
  return apiClient.put("auth/user/password", payload).then((r) => r.data);
}
function ChangePasswordPanel() {
  const form = useForm();
  const formId = useId();
  const updatePassword2 = useUpdatePassword(form);
  return /* @__PURE__ */ jsx(
    AccountSettingsPanel,
    {
      id: AccountSettingsId.Password,
      title: /* @__PURE__ */ jsx(Trans, { message: "Update password" }),
      actions: /* @__PURE__ */ jsx(
        Button,
        {
          type: "submit",
          form: formId,
          variant: "flat",
          color: "primary",
          disabled: !form.formState.isValid || updatePassword2.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Update password" })
        }
      ),
      children: /* @__PURE__ */ jsxs(
        Form,
        {
          form,
          id: formId,
          onSubmit: (newValues) => {
            updatePassword2.mutate(newValues, {
              onSuccess: () => {
                form.reset();
              }
            });
          },
          children: [
            /* @__PURE__ */ jsx(
              FormTextField,
              {
                className: "mb-24",
                name: "current_password",
                label: /* @__PURE__ */ jsx(Trans, { message: "Current password" }),
                type: "password",
                autoComplete: "current-password",
                required: true
              }
            ),
            /* @__PURE__ */ jsx(
              FormTextField,
              {
                className: "mb-24",
                name: "password",
                label: /* @__PURE__ */ jsx(Trans, { message: "New password" }),
                type: "password",
                autoComplete: "new-password",
                required: true
              }
            ),
            /* @__PURE__ */ jsx(
              FormTextField,
              {
                name: "password_confirmation",
                label: /* @__PURE__ */ jsx(Trans, { message: "Confirm password" }),
                type: "password",
                autoComplete: "new-password",
                required: true
              }
            )
          ]
        }
      )
    }
  );
}
function Select(props, ref) {
  const isMobile = useIsMobileMediaQuery();
  const {
    hideCaret,
    placeholder = /* @__PURE__ */ jsx(Trans, { message: "Select an option..." }),
    selectedValue,
    onItemSelected,
    onOpenChange,
    onInputValueChange,
    onSelectionChange,
    selectionMode,
    minWidth = "min-w-128",
    children,
    searchPlaceholder,
    showEmptyMessage,
    showSearchField,
    defaultInputValue,
    inputValue: userInputValue,
    isLoading,
    isAsync,
    valueClassName,
    floatingWidth = isMobile ? "auto" : "matchTrigger",
    ...inputFieldProps
  } = props;
  const listbox = useListbox(
    {
      ...props,
      clearInputOnItemSelection: true,
      showEmptyMessage: showEmptyMessage || showSearchField,
      floatingWidth,
      selectionMode: "single",
      role: "listbox",
      virtualFocus: showSearchField
    },
    ref
  );
  const {
    state: {
      selectedValues,
      isOpen,
      setIsOpen,
      activeIndex,
      setSelectedIndex,
      inputValue,
      setInputValue
    },
    collections,
    focusItem,
    listboxId,
    reference,
    refs,
    listContent,
    onInputChange
  } = listbox;
  const { fieldProps, inputProps } = useField({
    ...inputFieldProps,
    focusRef: refs.reference
  });
  const selectedOption = collections.collection.get(selectedValues[0]);
  const content = selectedOption ? /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-10", children: [
    selectedOption.element.props.startIcon,
    /* @__PURE__ */ jsx(
      "span",
      {
        className: clsx(
          "overflow-hidden overflow-ellipsis whitespace-nowrap",
          valueClassName
        ),
        children: selectedOption.element.props.children
      }
    )
  ] }) : /* @__PURE__ */ jsx("span", { className: "italic", children: placeholder });
  const fieldClassNames = getInputFieldClassNames({
    ...props,
    endAdornment: true
  });
  const {
    handleTriggerKeyDown,
    handleListboxKeyboardNavigation,
    handleListboxSearchFieldKeydown
  } = useListboxKeyboardNavigation(listbox);
  const { findMatchingItem } = useTypeSelect();
  const handleListboxTypeSelect = (e) => {
    if (!isOpen)
      return;
    const i = findMatchingItem(e, listContent, activeIndex);
    if (i != null) {
      focusItem("increment", i);
    }
  };
  const handleTriggerTypeSelect = (e) => {
    if (isOpen)
      return void 0;
    const i = findMatchingItem(e, listContent, activeIndex);
    if (i != null) {
      setSelectedIndex(i);
    }
  };
  return /* @__PURE__ */ jsx(
    Listbox,
    {
      listbox,
      onKeyDownCapture: !showSearchField ? handleListboxTypeSelect : void 0,
      onKeyDown: handleListboxKeyboardNavigation,
      onClose: showSearchField ? () => setInputValue("") : void 0,
      isLoading,
      searchField: showSearchField && /* @__PURE__ */ jsx(
        TextField,
        {
          size: props.size === "xs" || props.size === "sm" ? "xs" : "sm",
          placeholder: searchPlaceholder,
          startAdornment: /* @__PURE__ */ jsx(SearchIcon, {}),
          className: "flex-shrink-0 px-8 pb-8 pt-4",
          autoFocus: true,
          "aria-expanded": isOpen ? "true" : "false",
          "aria-haspopup": "listbox",
          "aria-controls": isOpen ? listboxId : void 0,
          "aria-autocomplete": "list",
          autoComplete: "off",
          autoCorrect: "off",
          spellCheck: "false",
          value: inputValue,
          onChange: onInputChange,
          onKeyDown: (e) => {
            handleListboxSearchFieldKeydown(e);
          }
        }
      ),
      children: /* @__PURE__ */ jsx(
        Field,
        {
          fieldClassNames,
          ...fieldProps,
          endAdornment: !hideCaret && /* @__PURE__ */ jsx(ComboboxEndAdornment, { isLoading }),
          children: /* @__PURE__ */ jsx(
            "button",
            {
              ...inputProps,
              type: "button",
              "data-selected-value": selectedOption == null ? void 0 : selectedOption.value,
              "aria-expanded": isOpen ? "true" : "false",
              "aria-haspopup": "listbox",
              "aria-controls": isOpen ? listboxId : void 0,
              ref: reference,
              onKeyDown: handleTriggerKeyDown,
              onKeyDownCapture: !showSearchField ? handleTriggerTypeSelect : void 0,
              disabled: inputFieldProps.disabled,
              onClick: () => {
                setIsOpen(!isOpen);
              },
              className: clsx(
                fieldClassNames.input,
                !fieldProps.unstyled && minWidth
              ),
              children: content
            }
          )
        }
      )
    }
  );
}
const SelectForwardRef = React.forwardRef(Select);
function FormSelect({
  children,
  ...props
}) {
  const {
    field: { onChange, onBlur, value = null, ref },
    fieldState: { invalid, error }
  } = useController({
    name: props.name
  });
  const formProps = {
    onSelectionChange: onChange,
    onBlur,
    selectedValue: value,
    invalid,
    errorMessage: error == null ? void 0 : error.message,
    name: props.name
  };
  const errorMessage = props.errorMessage || (error == null ? void 0 : error.message);
  return /* @__PURE__ */ jsx(
    SelectForwardRef,
    {
      ref,
      ...mergeProps(formProps, props, { errorMessage }),
      children
    }
  );
}
function TimezoneSelect({
  name,
  size: size2,
  timezones,
  label,
  ...selectProps
}) {
  const { trans } = useTrans();
  return /* @__PURE__ */ jsx(
    FormSelect,
    {
      selectionMode: "single",
      name,
      size: size2,
      label,
      showSearchField: true,
      searchPlaceholder: trans(message("Search timezones")),
      ...selectProps,
      children: Object.entries(timezones).map(([sectionName, sectionItems]) => /* @__PURE__ */ jsx(Section, { label: sectionName, children: sectionItems.map((timezone) => /* @__PURE__ */ jsx(Item$1, { value: timezone.value, children: timezone.text }, timezone.value)) }, sectionName))
    }
  );
}
function LocalizationPanel({ user }) {
  const formId = useId();
  const { trans } = useTrans();
  const form = useForm({
    defaultValues: {
      language: user.language || "",
      country: user.country || "",
      timezone: user.timezone || getLocalTimeZone()
    }
  });
  const updateDetails = useUpdateAccountDetails(form);
  const changeLocale2 = useChangeLocale();
  const { data } = useValueLists(["timezones", "countries", "localizations"]);
  const countries = (data == null ? void 0 : data.countries) || [];
  const localizations = (data == null ? void 0 : data.localizations) || [];
  const timezones = (data == null ? void 0 : data.timezones) || {};
  return /* @__PURE__ */ jsx(
    AccountSettingsPanel,
    {
      id: AccountSettingsId.LocationAndLanguage,
      title: /* @__PURE__ */ jsx(Trans, { message: "Date, time and language" }),
      actions: /* @__PURE__ */ jsx(
        Button,
        {
          type: "submit",
          variant: "flat",
          color: "primary",
          form: formId,
          disabled: updateDetails.isPending || !form.formState.isValid,
          children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
        }
      ),
      children: /* @__PURE__ */ jsxs(
        Form,
        {
          form,
          onSubmit: (newDetails) => {
            updateDetails.mutate(newDetails);
            changeLocale2.mutate({ locale: newDetails.language });
          },
          id: formId,
          children: [
            /* @__PURE__ */ jsx(
              FormSelect,
              {
                className: "mb-24",
                selectionMode: "single",
                name: "language",
                label: /* @__PURE__ */ jsx(Trans, { message: "Language" }),
                children: localizations.map((localization) => /* @__PURE__ */ jsx(Item$1, { value: localization.language, children: localization.name }, localization.language))
              }
            ),
            /* @__PURE__ */ jsx(
              FormSelect,
              {
                className: "mb-24",
                selectionMode: "single",
                name: "country",
                label: /* @__PURE__ */ jsx(Trans, { message: "Country" }),
                showSearchField: true,
                searchPlaceholder: trans(message("Search countries")),
                children: countries.map((country) => /* @__PURE__ */ jsx(Item$1, { value: country.code, children: country.name }, country.code))
              }
            ),
            /* @__PURE__ */ jsx(
              TimezoneSelect,
              {
                label: /* @__PURE__ */ jsx(Trans, { message: "Timezone" }),
                name: "timezone",
                timezones
              }
            )
          ]
        }
      )
    }
  );
}
function useDateFormatter(options) {
  const lastOptions = useRef(
    null
  );
  if (options && lastOptions.current && shallowEqual(options, lastOptions.current)) {
    options = lastOptions.current;
  }
  lastOptions.current = options;
  const { localeCode } = useSelectedLocale();
  return useMemo(
    () => new DateFormatter(localeCode, options),
    [localeCode, options]
  );
}
const DateFormatPresets = {
  numeric: { year: "numeric", month: "2-digit", day: "2-digit" },
  short: { year: "numeric", month: "short", day: "2-digit" },
  long: { month: "long", day: "2-digit", year: "numeric" }
};
const FormattedDate = memo(
  ({ date, options, preset }) => {
    const { dates } = useSettings();
    const timezone = useUserTimezone();
    const formatter = useDateFormatter(
      options || DateFormatPresets[preset || (dates == null ? void 0 : dates.format)]
    );
    if (!date) {
      return null;
    }
    try {
      if (typeof date === "string") {
        date = parseAbsoluteToLocal(date).toDate();
      } else if ("toDate" in date) {
        date = date.toDate(timezone);
      }
    } catch (e) {
      return null;
    }
    return /* @__PURE__ */ jsx(Fragment, { children: formatter.format(date) });
  },
  shallowEqual
);
function deleteAccessToken({ id }) {
  return apiClient.delete(`access-tokens/${id}`).then((r) => r.data);
}
function useDeleteAccessToken() {
  return useMutation({
    mutationFn: (props) => deleteAccessToken(props),
    onSuccess: () => {
      toast(message("Token deleted"));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function createAccessToken(payload) {
  return apiClient.post(`access-tokens`, payload).then((r) => r.data);
}
function useCreateAccessToken(form) {
  return useMutation({
    mutationFn: (props) => createAccessToken(props),
    onSuccess: () => {
      toast(message("Token create"));
    },
    onError: (r) => onFormQueryError(r, form)
  });
}
function CreateNewTokenDialog() {
  const form = useForm();
  const { formId, close: close2 } = useDialogContext();
  const createToken = useCreateAccessToken(form);
  const [plainTextToken, setPlainTextToken] = useState();
  const formNode = /* @__PURE__ */ jsx(
    Form,
    {
      form,
      id: formId,
      onSubmit: (values) => {
        createToken.mutate(values, {
          onSuccess: (response) => {
            setPlainTextToken(response.plainTextToken);
            queryClient.invalidateQueries({ queryKey: ["users"] });
          }
        });
      },
      children: /* @__PURE__ */ jsx(
        FormTextField,
        {
          name: "tokenName",
          label: /* @__PURE__ */ jsx(Trans, { message: "Token name" }),
          required: true,
          autoFocus: true
        }
      )
    }
  );
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Create new token" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: plainTextToken ? /* @__PURE__ */ jsx(PlainTextPreview, { plainTextToken }) : formNode }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { variant: "text", onClick: close2, children: /* @__PURE__ */ jsx(Trans, { message: "Done" }) }),
      !plainTextToken && /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          type: "submit",
          form: formId,
          disabled: createToken.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Create" })
        }
      )
    ] })
  ] });
}
function PlainTextPreview({ plainTextToken }) {
  const [isCopied, copyToClipboard] = useCopyClipboard(plainTextToken || "", {
    successDuration: 1e3
  });
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(
      TextField,
      {
        readOnly: true,
        value: plainTextToken,
        autoFocus: true,
        onClick: (e) => {
          e.currentTarget.focus();
          e.currentTarget.select();
        },
        endAppend: /* @__PURE__ */ jsx(Button, { variant: "flat", color: "primary", onClick: copyToClipboard, children: isCopied ? /* @__PURE__ */ jsx(Trans, { message: "Copied!" }) : /* @__PURE__ */ jsx(Trans, { message: "Copy" }) })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-10 mt-14 text-sm", children: [
      /* @__PURE__ */ jsx(ErrorIcon, { size: "sm", className: "text-danger" }),
      /* @__PURE__ */ jsx(Trans, { message: "Make sure to store the token in a safe place. After this dialog is closed, token will not be viewable anymore." })
    ] })
  ] });
}
const secureFilesSvg = "/assets/secure-files-cffa0260.svg";
function AccessTokenPanel({ user }) {
  const tokens = user.tokens || [];
  const { hasPermission } = useAuth();
  const { api } = useSettings();
  if (!(api == null ? void 0 : api.integrated) || !hasPermission("api.access"))
    return null;
  return /* @__PURE__ */ jsx(
    AccountSettingsPanel,
    {
      id: AccountSettingsId.Developers,
      title: /* @__PURE__ */ jsx(Trans, { message: "API access tokens" }),
      titleSuffix: /* @__PURE__ */ jsx(Link, { className: LinkStyle, to: "/api-docs", target: "_blank", children: /* @__PURE__ */ jsx(Trans, { message: "Documentation" }) }),
      actions: /* @__PURE__ */ jsx(CreateNewTokenButton, {}),
      children: !tokens.length ? /* @__PURE__ */ jsx(
        IllustratedMessage,
        {
          className: "py-40",
          image: /* @__PURE__ */ jsx(SvgImage, { src: secureFilesSvg }),
          title: /* @__PURE__ */ jsx(Trans, { message: "You have no personal access tokens yet" })
        }
      ) : tokens.map((token, index) => /* @__PURE__ */ jsx(
        TokenLine,
        {
          token,
          isLast: index === tokens.length - 1
        },
        token.id
      ))
    }
  );
}
function TokenLine({ token, isLast }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "flex items-center gap-24",
        !isLast && "mb-12 pb-12 border-b"
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
          /* @__PURE__ */ jsx("div", { className: "font-semibold", children: /* @__PURE__ */ jsx(Trans, { message: "Name" }) }),
          /* @__PURE__ */ jsx("div", { children: token.name }),
          /* @__PURE__ */ jsx("div", { className: "font-semibold mt-10", children: /* @__PURE__ */ jsx(Trans, { message: "Last used" }) }),
          /* @__PURE__ */ jsx("div", { children: token.last_used_at ? /* @__PURE__ */ jsx(FormattedDate, { date: token.last_used_at }) : /* @__PURE__ */ jsx(Trans, { message: "Never" }) })
        ] }),
        /* @__PURE__ */ jsx(DeleteTokenButton, { token })
      ]
    }
  );
}
function CreateNewTokenButton() {
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(Button, { variant: "flat", color: "primary", children: /* @__PURE__ */ jsx(Trans, { message: "Create token" }) }),
    /* @__PURE__ */ jsx(CreateNewTokenDialog, {})
  ] });
}
function DeleteTokenButton({ token }) {
  const deleteToken = useDeleteAccessToken();
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "modal",
      onClose: (isConfirmed) => {
        if (isConfirmed) {
          deleteToken.mutate(
            { id: token.id },
            {
              onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] })
            }
          );
        }
      },
      children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            size: "xs",
            variant: "outline",
            color: "danger",
            className: "flex-shrink-0 ml-auto",
            children: /* @__PURE__ */ jsx(Trans, { message: "Delete" })
          }
        ),
        /* @__PURE__ */ jsx(
          ConfirmationDialog,
          {
            isDanger: true,
            title: /* @__PURE__ */ jsx(Trans, { message: "Delete token?" }),
            body: /* @__PURE__ */ jsx(Trans, { message: "This token will be deleted immediately and permanently. Once deleted, it can no longer be used to make API requests." }),
            confirm: /* @__PURE__ */ jsx(Trans, { message: "Delete" })
          }
        )
      ]
    }
  );
}
function deleteAccount(userId) {
  return apiClient.delete(`users/${userId}`, { params: { deleteCurrentUser: true } }).then((r) => r.data);
}
function useDeleteAccount() {
  const { user } = useAuth();
  const logout2 = useLogout();
  return useMutation({
    mutationFn: () => deleteAccount(user.id),
    onSuccess: () => {
      toast("Account deleted");
      logout2.mutate();
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function DangerZonePanel() {
  const deleteAccount2 = useDeleteAccount();
  return /* @__PURE__ */ jsx(
    AccountSettingsPanel,
    {
      id: AccountSettingsId.DeleteAccount,
      title: /* @__PURE__ */ jsx(Trans, { message: "Danger zone" }),
      children: /* @__PURE__ */ jsxs(
        DialogTrigger,
        {
          type: "modal",
          onClose: (isConfirmed) => {
            if (isConfirmed) {
              deleteAccount2.mutate();
            }
          },
          children: [
            /* @__PURE__ */ jsx(Button, { variant: "flat", color: "danger", children: /* @__PURE__ */ jsx(Trans, { message: "Delete account" }) }),
            /* @__PURE__ */ jsx(
              ConfirmationDialog,
              {
                isDanger: true,
                title: /* @__PURE__ */ jsx(Trans, { message: "Delete account?" }),
                body: /* @__PURE__ */ jsx(Trans, { message: "Your account will be deleted immediately and permanently. Once deleted, accounts can not be restored." }),
                confirm: /* @__PURE__ */ jsx(Trans, { message: "Delete" })
              }
            )
          ]
        }
      )
    }
  );
}
function useEnableTwoFactor() {
  return useMutation({
    mutationFn: enable,
    onError: (r) => showHttpErrorToast(r)
  });
}
function enable() {
  return apiClient.post("auth/user/two-factor-authentication").then((response) => response.data);
}
function TwoFactorStepperLayout({
  title,
  subtitle,
  description,
  actions,
  children
}) {
  if (!subtitle) {
    subtitle = /* @__PURE__ */ jsx(Trans, { message: "When two factor authentication is enabled, you will be prompted for a secure, random token during authentication. You may retrieve this token from your phone's Google Authenticator application." });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "text-base font-medium mb-16", children: title }),
    /* @__PURE__ */ jsx("div", { className: "text-sm mb-24", children: subtitle }),
    /* @__PURE__ */ jsx("p", { className: "text-sm font-medium my-16", children: description }),
    children,
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-12", children: actions })
  ] });
}
function usePasswordConfirmationStatus() {
  return useQuery({
    queryKey: ["password-confirmation-status"],
    queryFn: () => fetchStatus()
  });
}
function fetchStatus() {
  return apiClient.get("auth/user/confirmed-password-status", { params: { seconds: 9e3 } }).then((response) => response.data);
}
function setPasswordConfirmationStatus(confirmed) {
  queryClient.setQueryData(["password-confirmation-status"], { confirmed });
}
function useConfirmPassword(form) {
  return useMutation({
    mutationFn: (payload) => confirm$1(payload),
    onError: (r) => onFormQueryError(r, form)
  });
}
function confirm$1(payload) {
  return apiClient.post("auth/user/confirm-password", payload).then((response) => response.data);
}
function ConfirmPasswordDialog() {
  const { close: close2, formId } = useDialogContext();
  const form = useForm();
  const confirmPassword = useConfirmPassword(form);
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Confirm password" }) }),
    /* @__PURE__ */ jsxs(DialogBody, { children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm mb-16", children: /* @__PURE__ */ jsx(Trans, { message: "For your security, please confirm your password to continue." }) }),
      /* @__PURE__ */ jsx(
        Form,
        {
          id: formId,
          form,
          onSubmit: (values) => confirmPassword.mutate(values, {
            onSuccess: () => close2(values.password)
          }),
          children: /* @__PURE__ */ jsx(
            FormTextField,
            {
              name: "password",
              label: /* @__PURE__ */ jsx(Trans, { message: "Password" }),
              type: "password",
              required: true,
              autoFocus: true
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: () => close2(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "submit",
          variant: "flat",
          color: "primary",
          form: formId,
          disabled: confirmPassword.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Confirm" })
        }
      )
    ] })
  ] });
}
function usePasswordConfirmedAction({ needsPassword } = {}) {
  const { data, isLoading } = usePasswordConfirmationStatus();
  const passwordRef = useRef();
  const withConfirmedPassword = useCallback(
    async (action) => {
      if ((data == null ? void 0 : data.confirmed) && (passwordRef.current || !needsPassword)) {
        action(passwordRef.current);
      } else {
        const password = await openDialog(ConfirmPasswordDialog);
        if (password) {
          passwordRef.current = password;
          setPasswordConfirmationStatus(true);
          action(passwordRef.current);
        }
      }
    },
    [data == null ? void 0 : data.confirmed, needsPassword]
  );
  return {
    isLoading,
    withConfirmedPassword
  };
}
function TwoFactorDisabledStep({ onEnabled }) {
  const enableTwoFactor = useEnableTwoFactor();
  const { withConfirmedPassword, isLoading: confirmPasswordIsLoading } = usePasswordConfirmedAction();
  const isLoading = enableTwoFactor.isPending || confirmPasswordIsLoading;
  return /* @__PURE__ */ jsx(
    TwoFactorStepperLayout,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "You have not enabled two factor authentication." }),
      actions: /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          disabled: isLoading,
          onClick: () => {
            withConfirmedPassword(() => {
              enableTwoFactor.mutate(void 0, {
                onSuccess: onEnabled
              });
            });
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Enable" })
        }
      )
    }
  );
}
function useTwoFactorQrCode() {
  return useQuery({
    queryKey: ["two-factor-qr-code"],
    queryFn: () => fetchCode()
  });
}
function fetchCode() {
  return apiClient.get("auth/user/two-factor/qr-code").then((response) => response.data);
}
function useConfirmTwoFactor(form) {
  return useMutation({
    mutationFn: (payload) => confirm(payload),
    onError: (r) => onFormQueryError(r, form)
  });
}
function confirm(payload) {
  return apiClient.post("auth/user/confirmed-two-factor-authentication", payload).then((response) => response.data);
}
function useDisableTwoFactor() {
  return useMutation({
    mutationFn: disable,
    onError: (r) => showHttpErrorToast(r)
  });
}
function disable() {
  return apiClient.delete("auth/user/two-factor-authentication").then((response) => response.data);
}
function TwoFactorConfirmationStep(props) {
  const { data } = useTwoFactorQrCode();
  return /* @__PURE__ */ jsxs(
    TwoFactorStepperLayout,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Finish enabling two factor authentication." }),
      description: /* @__PURE__ */ jsx(Trans, { message: "To finish enabling two factor authentication, scan the following QR code using your phone's authenticator application or enter the setup key and provide the generated OTP code." }),
      children: [
        /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: !data ? /* @__PURE__ */ jsx(
          QrCodeLayout,
          {
            animationKey: "svg-skeleton",
            svg: /* @__PURE__ */ jsx(Skeleton, { variant: "rect", size: "w-full h-full" }),
            secret: /* @__PURE__ */ jsx(Skeleton, { variant: "text", className: "max-w-224" })
          }
        ) : /* @__PURE__ */ jsx(
          QrCodeLayout,
          {
            animationKey: "real-svg",
            svg: /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: data.svg } }),
            secret: /* @__PURE__ */ jsx(Trans, { message: "Setup key: :key", values: { key: data.secret } })
          }
        ) }),
        /* @__PURE__ */ jsx(CodeForm, { ...props })
      ]
    }
  );
}
function CodeForm({ onCancel, onConfirmed }) {
  const form = useForm();
  const confirmTwoFactor = useConfirmTwoFactor(form);
  const disableTwoFactor = useDisableTwoFactor();
  const { withConfirmedPassword, isLoading: confirmPasswordIsLoading } = usePasswordConfirmedAction();
  const isLoading = confirmTwoFactor.isPending || disableTwoFactor.isPending || confirmPasswordIsLoading;
  return /* @__PURE__ */ jsxs(
    Form,
    {
      form,
      onSubmit: (values) => withConfirmedPassword(() => {
        confirmTwoFactor.mutate(values, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            onConfirmed();
          }
        });
      }),
      children: [
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            required: true,
            name: "code",
            label: /* @__PURE__ */ jsx(Trans, { message: "Code" }),
            autoFocus: true
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-12 mt-24", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              disabled: isLoading,
              onClick: () => {
                withConfirmedPassword(() => {
                  disableTwoFactor.mutate(void 0, { onSuccess: onCancel });
                });
              },
              children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" })
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "submit",
              variant: "flat",
              color: "primary",
              disabled: isLoading,
              children: /* @__PURE__ */ jsx(Trans, { message: "Confirm" })
            }
          )
        ] })
      ]
    }
  );
}
function QrCodeLayout({ animationKey, svg, secret }) {
  return /* @__PURE__ */ jsxs(m.div, { ...opacityAnimation, children: [
    /* @__PURE__ */ jsx("div", { className: "w-192 h-192 mb-16", children: svg }),
    /* @__PURE__ */ jsx("div", { className: "text-sm font-medium mb-16", children: secret })
  ] }, animationKey);
}
function useRegenerateTwoFactorCodes() {
  return useMutation({
    mutationFn: () => regenerate(),
    onError: (r) => showHttpErrorToast(r)
  });
}
function regenerate() {
  return apiClient.post("auth/user/two-factor-recovery-codes").then((response) => response.data);
}
function TwoFactorEnabledStep({ user, onDisabled }) {
  var _a2;
  const disableTwoFactor = useDisableTwoFactor();
  const regenerateCodes = useRegenerateTwoFactorCodes();
  const { withConfirmedPassword, isLoading: confirmPasswordIsLoading } = usePasswordConfirmedAction();
  const isLoading = disableTwoFactor.isPending || regenerateCodes.isPending || confirmPasswordIsLoading;
  const actions = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        type: "button",
        onClick: () => withConfirmedPassword(() => {
          regenerateCodes.mutate(void 0, {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["users"] });
            }
          });
        }),
        variant: "outline",
        disabled: isLoading,
        className: "mr-12",
        children: /* @__PURE__ */ jsx(Trans, { message: "Regenerate recovery codes" })
      }
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        type: "submit",
        variant: "flat",
        color: "danger",
        disabled: isLoading,
        onClick: () => {
          withConfirmedPassword(() => {
            disableTwoFactor.mutate(void 0, {
              onSuccess: () => {
                toast(message("Two factor authentication has been disabled."));
                onDisabled();
              }
            });
          });
        },
        children: /* @__PURE__ */ jsx(Trans, { message: "Disable" })
      }
    )
  ] });
  return /* @__PURE__ */ jsx(
    TwoFactorStepperLayout,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "You have enabled two factor authentication." }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Store these recovery codes in a secure password manager. They can be used to recover access to your account if your two factor authentication device is lost." }),
      actions,
      children: /* @__PURE__ */ jsx("div", { className: "bg-alt p-14 font-mono text-sm mb-16 rounded", children: (_a2 = user.two_factor_recovery_codes) == null ? void 0 : _a2.map((code) => /* @__PURE__ */ jsx("div", { className: "mb-4", children: code }, code)) })
    }
  );
}
function TwoFactorStepper({ user }) {
  const [status, setStatus] = useState(getStatus(user));
  switch (status) {
    case 0:
      return /* @__PURE__ */ jsx(
        TwoFactorDisabledStep,
        {
          onEnabled: () => setStatus(
            1
            /* WaitingForConfirmation */
          )
        }
      );
    case 1:
      return /* @__PURE__ */ jsx(
        TwoFactorConfirmationStep,
        {
          onCancel: () => {
            setStatus(
              0
              /* Disabled */
            );
          },
          onConfirmed: () => {
            setStatus(
              2
              /* Enabled */
            );
          }
        }
      );
    case 2:
      return /* @__PURE__ */ jsx(
        TwoFactorEnabledStep,
        {
          user,
          onDisabled: () => setStatus(
            0
            /* Disabled */
          )
        }
      );
  }
}
function getStatus(user) {
  if (user.two_factor_confirmed_at) {
    return 2;
  } else if (user.two_factor_recovery_codes) {
    return 1;
  }
  return 0;
}
function useUserSessions() {
  return useQuery({
    queryKey: ["user-sessions"],
    queryFn: () => fetchUserSessions()
  });
}
function fetchUserSessions() {
  return apiClient.get(`user-sessions`).then((response) => response.data);
}
const ComputerIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" }),
  "ComputerOutlined"
);
const SmartphoneIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M17 1.01 7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" }),
  "SmartphoneOutlined"
);
const TabletIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 1.99-.9 1.99-2L23 6c0-1.1-.9-2-2-2zm-2 14H5V6h14v12z" }),
  "TabletOutlined"
);
function useLogoutOtherSessions() {
  return useMutation({
    mutationFn: (payload) => logoutOther(payload),
    onError: (r) => showHttpErrorToast(r)
  });
}
function logoutOther(payload) {
  return apiClient.post("user-sessions/logout-other", payload).then((response) => response.data);
}
function SessionsPanel({ user }) {
  var _a2;
  const { data, isLoading } = useUserSessions();
  const logoutOther2 = useLogoutOtherSessions();
  const { withConfirmedPassword, isLoading: checkingPasswordStatus } = usePasswordConfirmedAction({ needsPassword: true });
  const sessionList = /* @__PURE__ */ jsx("div", { className: "max-h-400 overflow-y-auto", children: (_a2 = data == null ? void 0 : data.sessions) == null ? void 0 : _a2.map((session) => /* @__PURE__ */ jsx(SessionItem, { session }, session.id)) });
  return /* @__PURE__ */ jsxs(
    AccountSettingsPanel,
    {
      id: AccountSettingsId.Sessions,
      title: /* @__PURE__ */ jsx(Trans, { message: "Active sessions" }),
      children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm", children: /* @__PURE__ */ jsx(Trans, { message: "If necessary, you may log out of all of your other browser sessions across all of your devices. Your recent sessions are listed below. If you feel your account has been compromised, you should also update your password." }) }),
        /* @__PURE__ */ jsx("div", { className: "my-30", children: isLoading ? /* @__PURE__ */ jsx("div", { className: "min-h-60", children: /* @__PURE__ */ jsx(ProgressCircle, { isIndeterminate: true }) }) : sessionList }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            color: "primary",
            disabled: checkingPasswordStatus || logoutOther2.isPending,
            onClick: () => {
              withConfirmedPassword((password) => {
                logoutOther2.mutate(
                  { password },
                  {
                    onSuccess: () => {
                      toast(message("Logged out other sessions."));
                    }
                  }
                );
              });
            },
            children: /* @__PURE__ */ jsx(Trans, { message: "Logout other sessions" })
          }
        )
      ]
    }
  );
}
function SessionItem({ session }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-14 text-sm mb-14", children: [
    /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 text-muted", children: /* @__PURE__ */ jsx(DeviceIcon, { device: session.device_type, size: "lg" }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-auto", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(ValueOrUnknown, { children: session.platform }),
        " -",
        " ",
        /* @__PURE__ */ jsx(ValueOrUnknown, { children: session.browser })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-xs my-4", children: [
        session.city,
        ", ",
        session.country
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-xs", children: [
        /* @__PURE__ */ jsx(IpAddress, { session }),
        " - ",
        /* @__PURE__ */ jsx(LastActive, { session })
      ] })
    ] })
  ] });
}
function DeviceIcon({ device, size: size2 }) {
  switch (device) {
    case "mobile":
      return /* @__PURE__ */ jsx(SmartphoneIcon, { size: size2 });
    case "tablet":
      return /* @__PURE__ */ jsx(TabletIcon, { size: size2 });
    default:
      return /* @__PURE__ */ jsx(ComputerIcon, { size: size2 });
  }
}
function LastActive({ session }) {
  if (session.is_current_device) {
    return /* @__PURE__ */ jsx("span", { className: "text-positive", children: /* @__PURE__ */ jsx(Trans, { message: "This device" }) });
  }
  return /* @__PURE__ */ jsx(FormattedRelativeTime, { date: session.last_active });
}
function IpAddress({ session }) {
  if (session.ip_address) {
    return /* @__PURE__ */ jsx("span", { children: session.ip_address });
  } else if (session.token) {
    return /* @__PURE__ */ jsx(Trans, { message: "API Token" });
  }
  return /* @__PURE__ */ jsx(Trans, { message: "Unknown IP" });
}
function ValueOrUnknown({ children }) {
  return children ? /* @__PURE__ */ jsx(Fragment, { children }) : /* @__PURE__ */ jsx(Trans, { message: "Unknown" });
}
function AccountSettingsPage() {
  var _a2;
  const { auth } = useContext(SiteConfigContext);
  const { data, isLoading } = useUser("me", {
    with: ["roles", "social_profiles", "tokens"]
  });
  const { player } = useSettings();
  useIsMobileMediaQuery();
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-alt", children: [
    /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Account Settings" }) }),
    /* @__PURE__ */ jsxs(
      DashboardLayout,
      {
        name: "web-player",
        initialRightSidenavStatus: (player == null ? void 0 : player.hide_queue) ? "closed" : "open",
        children: [
          /* @__PURE__ */ jsx(
            PlayerNavbarLayout,
            {
              size: "sm",
              menuPosition: "account-settings-page",
              className: "flex-shrink-0"
            }
          ),
          /* @__PURE__ */ jsx(SidedavFrontend, { position: "left", display: "block", children: /* @__PURE__ */ jsx(Sidenav, {}) }),
          /* @__PURE__ */ jsx(DashboardContent, { children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-24 py-24", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-3xl", children: /* @__PURE__ */ jsx(Trans, { message: "Account settings" }) }),
            /* @__PURE__ */ jsx("div", { className: "mb-40 text-base text-muted", children: /* @__PURE__ */ jsx(Trans, { message: "View and update your account details, profile and more." }) }),
            isLoading || !data ? /* @__PURE__ */ jsx(
              ProgressCircle,
              {
                className: "my-80",
                "aria-label": "Loading user..",
                isIndeterminate: true
              }
            ) : /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-24", children: [
              /* @__PURE__ */ jsx(AccountSettingsSidenav, {}),
              /* @__PURE__ */ jsxs("main", { className: "flex-auto", children: [
                (_a2 = auth.accountSettingsPanels) == null ? void 0 : _a2.map((panel) => /* @__PURE__ */ jsx(panel.component, { user: data.user }, panel.id)),
                /* @__PURE__ */ jsx(BasicInfoPanel, { user: data.user }),
                /* @__PURE__ */ jsx(SocialLoginPanel, { user: data.user }),
                /* @__PURE__ */ jsx(ChangePasswordPanel, {}),
                /* @__PURE__ */ jsx(
                  AccountSettingsPanel,
                  {
                    id: AccountSettingsId.TwoFactor,
                    title: /* @__PURE__ */ jsx(Trans, { message: "Two factor authentication" }),
                    children: /* @__PURE__ */ jsx("div", { className: "max-w-580", children: /* @__PURE__ */ jsx(TwoFactorStepper, { user: data.user }) })
                  }
                ),
                /* @__PURE__ */ jsx(SessionsPanel, { user: data.user }),
                /* @__PURE__ */ jsx(LocalizationPanel, { user: data.user }),
                /* @__PURE__ */ jsx(AccessTokenPanel, { user: data.user }),
                /* @__PURE__ */ jsx(DangerZonePanel, {})
              ] })
            ] })
          ] }) }) })
        ]
      }
    )
  ] });
}
function useSendPasswordResetEmail(form) {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: sendResetPasswordEmail,
    onSuccess: (response) => {
      toast(response.message);
      navigate("/login");
    },
    onError: (r) => onFormQueryError(r, form)
  });
}
function sendResetPasswordEmail(payload) {
  return apiClient.post("auth/forgot-password", payload).then((response) => response.data);
}
function ForgotPasswordPage() {
  const { registration } = useSettings();
  const [searchParams] = useSearchParams();
  const searchParamsEmail = searchParams.get("email") || void 0;
  const form = useForm({
    defaultValues: { email: searchParamsEmail }
  });
  const sendEmail = useSendPasswordResetEmail(form);
  const message2 = !registration.disable && /* @__PURE__ */ jsx(
    Trans,
    {
      values: {
        a: (parts) => /* @__PURE__ */ jsx(Link, { className: LinkStyle, to: "/register", children: parts })
      },
      message: "Don't have an account? <a>Sign up.</a>"
    }
  );
  return /* @__PURE__ */ jsxs(AuthLayout, { message: message2, children: [
    /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Forgot Password" }) }),
    /* @__PURE__ */ jsxs(
      Form,
      {
        form,
        onSubmit: (payload) => {
          sendEmail.mutate(payload);
        },
        children: [
          /* @__PURE__ */ jsx("div", { className: "mb-32 text-sm", children: /* @__PURE__ */ jsx(Trans, { message: "Enter your email address below and we will send you a link to reset or create your password." }) }),
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              disabled: !!searchParamsEmail,
              className: "mb-32",
              name: "email",
              type: "email",
              autoComplete: "off",
              autoCorrect: "off",
              spellCheck: "false",
              label: /* @__PURE__ */ jsx(Trans, { message: "Email" }),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              className: "block w-full",
              type: "submit",
              variant: "flat",
              color: "primary",
              size: "md",
              disabled: sendEmail.isPending,
              children: /* @__PURE__ */ jsx(Trans, { message: "Continue" })
            }
          )
        ]
      }
    )
  ] });
}
function reset(payload) {
  return apiClient.post("auth/reset-password", payload).then((response) => response.data);
}
function useResetPassword(form) {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: reset,
    onSuccess: () => {
      navigate("/login", { replace: true });
      toast(message("Your password has been reset!"));
    },
    onError: (r) => onFormQueryError(r, form)
  });
}
function ResetPasswordPage() {
  const { token } = useParams();
  const form = useForm({ defaultValues: { token } });
  const resetPassword = useResetPassword(form);
  const heading = /* @__PURE__ */ jsx(Trans, { message: "Reset your account password" });
  const message2 = /* @__PURE__ */ jsx(
    Trans,
    {
      values: {
        a: (parts) => /* @__PURE__ */ jsx(Link, { className: LinkStyle, to: "/register", children: parts })
      },
      message: "Don't have an account? <a>Sign up.</a>"
    }
  );
  return /* @__PURE__ */ jsxs(AuthLayout, { heading, message: message2, children: [
    /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Reset Password" }) }),
    /* @__PURE__ */ jsxs(
      Form,
      {
        form,
        onSubmit: (payload) => {
          resetPassword.mutate(payload);
        },
        children: [
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              className: "mb-32",
              name: "email",
              type: "email",
              label: /* @__PURE__ */ jsx(Trans, { message: "Email" }),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              className: "mb-32",
              name: "password",
              type: "password",
              label: /* @__PURE__ */ jsx(Trans, { message: "New password" }),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              className: "mb-32",
              name: "password_confirmation",
              type: "password",
              label: /* @__PURE__ */ jsx(Trans, { message: "Confirm password" }),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              className: "block w-full",
              type: "submit",
              variant: "flat",
              color: "primary",
              size: "md",
              disabled: resetPassword.isPending,
              children: /* @__PURE__ */ jsx(Trans, { message: "Reset password" })
            }
          )
        ]
      }
    )
  ] });
}
const AuthRoutes = /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx(Route, { path: "/register", element: /* @__PURE__ */ jsx(RegisterPage, {}) }),
  /* @__PURE__ */ jsx(
    Route,
    {
      path: "/account-settings",
      element: /* @__PURE__ */ jsx(AuthRoute, { children: /* @__PURE__ */ jsx(AccountSettingsPage, {}) })
    }
  ),
  /* @__PURE__ */ jsx(
    Route,
    {
      path: "login",
      element: /* @__PURE__ */ jsx(GuestRoute, { children: /* @__PURE__ */ jsx(LoginPageWrapper, {}) })
    }
  ),
  /* @__PURE__ */ jsx(
    Route,
    {
      path: "/workspace/join/register",
      element: /* @__PURE__ */ jsx(GuestRoute, { children: /* @__PURE__ */ jsx(RegisterPage, {}) })
    }
  ),
  /* @__PURE__ */ jsx(
    Route,
    {
      path: "/workspace/join/login",
      element: /* @__PURE__ */ jsx(GuestRoute, { children: /* @__PURE__ */ jsx(LoginPageWrapper, {}) })
    }
  ),
  /* @__PURE__ */ jsx(
    Route,
    {
      path: "forgot-password",
      element: /* @__PURE__ */ jsx(GuestRoute, { children: /* @__PURE__ */ jsx(ForgotPasswordPage, {}) })
    }
  ),
  /* @__PURE__ */ jsx(
    Route,
    {
      path: "/password/reset/:token",
      element: /* @__PURE__ */ jsx(GuestRoute, { children: /* @__PURE__ */ jsx(ResetPasswordPage, {}) })
    }
  )
] });
const ForumIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M15 4v7H5.17L4 12.17V4h11m1-2H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm5 4h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1z" }),
  "ForumOutlined"
);
function PricingPage() {
  var _a2;
  const query = useProducts("pricingPage");
  const { player } = useSettings();
  useIsMobileMediaQuery();
  const [selectedCycle, setSelectedCycle] = useState("yearly");
  return /* @__PURE__ */ jsxs(
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
        /* @__PURE__ */ jsx(DashboardContent, { children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-24", children: [
            /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Pricing" }) }),
            /* @__PURE__ */ jsx("h1", { className: "mb-30 mt-30 text-center text-3xl font-normal md:mt-60 md:text-4xl md:font-medium", children: /* @__PURE__ */ jsx(Trans, { message: "Choose the right plan for you" }) }),
            /* @__PURE__ */ jsx(
              BillingCycleRadio,
              {
                products: (_a2 = query.data) == null ? void 0 : _a2.products,
                selectedCycle,
                onChange: setSelectedCycle,
                className: "mb-40 flex justify-center md:mb-70",
                size: "lg"
              }
            ),
            /* @__PURE__ */ jsx(
              PricingTable,
              {
                selectedCycle,
                productLoader: "pricingPage"
              }
            ),
            /* @__PURE__ */ jsx(ContactSection, {})
          ] }),
          /* @__PURE__ */ jsx(Footer, {})
        ] }) })
      ]
    }
  );
}
function ContactSection() {
  return /* @__PURE__ */ jsxs("div", { className: "my-20 p-24 text-center md:my-80", children: [
    /* @__PURE__ */ jsx(ForumIcon, { size: "xl", className: "text-muted" }),
    /* @__PURE__ */ jsx("div", { className: "my-8 md:text-lg", children: /* @__PURE__ */ jsx(Trans, { message: "Do you have any questions about PRO accounts?" }) }),
    /* @__PURE__ */ jsx("div", { className: "mb-24 mt-20 text-sm md:mt-0 md:text-base", children: /* @__PURE__ */ jsx(Trans, { message: "Our support team will be happy to assist you." }) }),
    /* @__PURE__ */ jsx(Button, { variant: "flat", color: "primary", elementType: Link, to: "/contact", children: /* @__PURE__ */ jsx(Trans, { message: "Contact us" }) })
  ] });
}
const BillingPageRoutes = React.lazy(
  () => import("./assets/billing-page-routes-26421875.mjs")
);
const CheckoutRoutes = React.lazy(() => import("./assets/checkout-routes-3d0c9422.mjs"));
const BillingRoutes = /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx(Route, { path: "/pricing", element: /* @__PURE__ */ jsx(PricingPage, {}) }),
  /* @__PURE__ */ jsx(
    Route,
    {
      path: "checkout/*",
      element: /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(FullPageLoader, { screen: true }), children: /* @__PURE__ */ jsx(CheckoutRoutes, {}) })
    }
  ),
  /* @__PURE__ */ jsx(
    Route,
    {
      path: "billing/*",
      element: /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(FullPageLoader, { screen: true }), children: /* @__PURE__ */ jsx(BillingPageRoutes, {}) })
    }
  )
] });
function NotificationsPage() {
  const { user } = useAuth();
  const { data, isLoading } = useUserNotifications({ perPage: 30 });
  const hasUnread = !!(user == null ? void 0 : user.unread_notifications_count);
  const markAsRead = useMarkNotificationsAsRead();
  const { notif } = useSettings();
  const { player } = useSettings();
  useIsMobileMediaQuery();
  const handleMarkAsRead = () => {
    if (!data)
      return;
    markAsRead.mutate({
      markAllAsUnread: true
    });
  };
  const markAsReadButton = /* @__PURE__ */ jsx(
    Button,
    {
      variant: "outline",
      color: "primary",
      size: "xs",
      startIcon: /* @__PURE__ */ jsx(DoneAllIcon, {}),
      onClick: handleMarkAsRead,
      disabled: markAsRead.isPending || isLoading,
      className: "ml-auto",
      children: /* @__PURE__ */ jsx(Trans, { message: "Mark all as read" })
    }
  );
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Notifications" }) }),
    /* @__PURE__ */ jsxs(
      DashboardLayout,
      {
        name: "web-player",
        initialRightSidenavStatus: (player == null ? void 0 : player.hide_queue) ? "closed" : "open",
        children: [
          /* @__PURE__ */ jsx(
            PlayerNavbarLayout,
            {
              size: "sm",
              menuPosition: "notifications-page",
              className: "flex-shrink-0"
            }
          ),
          /* @__PURE__ */ jsx(SidedavFrontend, { position: "left", display: "block", children: /* @__PURE__ */ jsx(Sidenav, {}) }),
          /* @__PURE__ */ jsx(DashboardContent, { children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto min-h-[1000px] p-16 md:p-24", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-30 flex items-center gap-24", children: [
              /* @__PURE__ */ jsx("h1", { className: "text-3xl", children: /* @__PURE__ */ jsx(Trans, { message: "Notifications" }) }),
              hasUnread && markAsReadButton,
              notif.subs.integrated && /* @__PURE__ */ jsx(
                IconButton,
                {
                  className: "ml-auto text-muted",
                  elementType: Link,
                  to: "/notifications/settings",
                  target: "_blank",
                  children: /* @__PURE__ */ jsx(SettingsIcon, {})
                }
              )
            ] }),
            /* @__PURE__ */ jsx(PageContent, {})
          ] }) })
        ]
      }
    )
  ] });
}
function PageContent() {
  const { data, isLoading } = useUserNotifications({ perPage: 30 });
  if (isLoading) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-10", children: /* @__PURE__ */ jsx(ProgressCircle, { "aria-label": "Loading notifications...", isIndeterminate: true }) });
  }
  if (!(data == null ? void 0 : data.pagination.data.length)) {
    return /* @__PURE__ */ jsx(NotificationEmptyStateMessage, {});
  }
  return /* @__PURE__ */ jsx(
    NotificationList,
    {
      className: "rounded border",
      notifications: data.pagination.data
    }
  );
}
function fetchNotificationSubscriptions() {
  return apiClient.get("notifications/me/subscriptions").then((response) => response.data);
}
function useNotificationSubscriptions() {
  return useQuery({
    queryKey: ["notification-subscriptions"],
    queryFn: () => fetchNotificationSubscriptions(),
    staleTime: Infinity
  });
}
function UpdateNotificationSettings(payload) {
  return apiClient.put("notifications/me/subscriptions", { selections: payload }).then((r) => r.data);
}
function useUpdateNotificationSettings() {
  return useMutation({
    mutationFn: (payload) => UpdateNotificationSettings(payload),
    onSuccess: () => {
      toast(message("Updated preferences"));
      queryClient.invalidateQueries({ queryKey: ["notification-subscriptions"] });
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function NotificationSettingsPage() {
  const { notif } = useSettings();
  const updateSettings = useUpdateNotificationSettings();
  const { data, isFetched } = useNotificationSubscriptions();
  const [selection, setSelection] = useState();
  const { player } = useSettings();
  useIsMobileMediaQuery();
  useEffect(() => {
    if (data && !selection) {
      const initialSelection = {};
      const initialValue = {};
      data.available_channels.forEach((channel) => {
        initialValue[channel] = false;
      });
      data.subscriptions.forEach((group) => {
        group.subscriptions.forEach((subscription) => {
          const backendValue = data.user_selections.find(
            (s) => s.notif_id === subscription.notif_id
          );
          initialSelection[subscription.notif_id] = (backendValue == null ? void 0 : backendValue.channels) || {
            ...initialValue
          };
        });
      });
      setSelection(initialSelection);
    }
  }, [data, selection]);
  if (!notif.subs.integrated || data && data.subscriptions.length === 0) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/", replace: true });
  }
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-alt", children: /* @__PURE__ */ jsxs(
    DashboardLayout,
    {
      name: "web-player",
      initialRightSidenavStatus: (player == null ? void 0 : player.hide_queue) ? "closed" : "open",
      children: [
        /* @__PURE__ */ jsx(
          PlayerNavbarLayout,
          {
            size: "sm",
            menuPosition: "notifications-page",
            className: "flex-shrink-0"
          }
        ),
        /* @__PURE__ */ jsx(SidedavFrontend, { position: "left", display: "block", children: /* @__PURE__ */ jsx(Sidenav, {}) }),
        /* @__PURE__ */ jsx(DashboardContent, { children: !isFetched || !data || !selection ? /* @__PURE__ */ jsx("div", { className: "container mx-auto my-100 flex justify-center", children: /* @__PURE__ */ jsx(
          ProgressCircle,
          {
            size: "md",
            isIndeterminate: true,
            "aria-label": "Loading subscriptions..."
          }
        ) }) : /* @__PURE__ */ jsx("div", { className: "container mx-auto my-20 px-10 md:my-40 md:px-20", children: /* @__PURE__ */ jsxs("div", { className: "rounded border bg-background px-20 pb-30 pt-20", children: [
          data.subscriptions.map((group) => /* @__PURE__ */ jsxs("div", { className: "mb-10 text-sm", children: [
            /* @__PURE__ */ jsx(
              GroupRow,
              {
                group,
                allChannels: data == null ? void 0 : data.available_channels,
                selection,
                setSelection
              },
              group.group_name
            ),
            group.subscriptions.map((subscription) => /* @__PURE__ */ jsx(
              SubscriptionRow,
              {
                subscription,
                selection,
                setSelection,
                allChannels: data == null ? void 0 : data.available_channels
              },
              subscription.notif_id
            ))
          ] }, group.group_name)),
          /* @__PURE__ */ jsx(
            Button,
            {
              className: "ml-10 mt-20",
              variant: "flat",
              color: "primary",
              disabled: updateSettings.isPending,
              onClick: () => {
                updateSettings.mutate(
                  Object.entries(selection).map(([notifId, channels]) => {
                    return { notif_id: notifId, channels };
                  })
                );
              },
              children: /* @__PURE__ */ jsx(Trans, { message: "Update preferences" })
            }
          )
        ] }) }) })
      ]
    }
  ) });
}
function GroupRow({
  group,
  allChannels,
  selection,
  setSelection
}) {
  const toggleAll = (channelName, value) => {
    const nextState = produce(selection, (draftState) => {
      Object.keys(selection).forEach((notifId) => {
        draftState[notifId][channelName] = value;
      });
    });
    setSelection(nextState);
  };
  const checkboxes = /* @__PURE__ */ jsx("div", { className: "ml-auto flex items-center gap-40 max-md:hidden", children: allChannels.map((channelName) => {
    const allSelected = Object.values(selection).every((s) => s[channelName]);
    const someSelected = !allSelected && Object.values(selection).some((s) => s[channelName]);
    return /* @__PURE__ */ jsx(
      Checkbox,
      {
        orientation: "vertical",
        isIndeterminate: someSelected,
        checked: allSelected,
        onChange: async (e) => {
          if (channelName === "browser") {
            const granted = await requestBrowserPermission();
            toggleAll(channelName, !granted ? false : !allSelected);
          } else {
            toggleAll(channelName, !allSelected);
          }
        },
        children: /* @__PURE__ */ jsx(Trans, { message: channelName })
      },
      channelName
    );
  }) });
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center border-b p-10", children: [
    /* @__PURE__ */ jsx("div", { className: "font-medium", children: /* @__PURE__ */ jsx(Trans, { message: group.group_name }) }),
    checkboxes
  ] });
}
function SubscriptionRow({
  subscription,
  allChannels,
  selection,
  setSelection
}) {
  const notifId = subscription.notif_id;
  const toggleChannel = (channelName, value) => {
    const nextState = produce(selection, (draftState) => {
      draftState[subscription.notif_id][channelName] = value;
    });
    setSelection(nextState);
  };
  return /* @__PURE__ */ jsxs("div", { className: "items-center border-b py-10 pl-8 pr-10 md:flex md:pl-20", children: [
    /* @__PURE__ */ jsx("div", { className: "pb-14 font-semibold md:pb-0 md:font-normal", children: /* @__PURE__ */ jsx(Trans, { message: subscription.name }) }),
    /* @__PURE__ */ jsx("div", { className: "ml-auto flex items-center gap-40", children: allChannels.map((channelName) => /* @__PURE__ */ jsx(
      Checkbox,
      {
        orientation: "vertical",
        checked: selection[notifId][channelName],
        onChange: async (e) => {
          const newValue = !selection[notifId][channelName];
          if (channelName === "browser") {
            const granted = await requestBrowserPermission();
            toggleChannel(channelName, !granted ? false : newValue);
          } else {
            toggleChannel(channelName, newValue);
          }
        },
        "aria-label": channelName,
        children: /* @__PURE__ */ jsx("div", { className: "md:invisible md:h-0", children: /* @__PURE__ */ jsx(Trans, { message: channelName }) })
      },
      channelName
    )) })
  ] });
}
function requestBrowserPermission() {
  if (Notification.permission === "granted") {
    return Promise.resolve(true);
  }
  if (Notification.permission === "denied") {
    toast.danger(
      message(
        "Notifications blocked. Please enable them for this site from browser settings."
      )
    );
    return Promise.resolve(false);
  }
  return Notification.requestPermission().then((permission) => {
    return permission === "granted";
  });
}
const NotificationRoutes = /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx(
    Route,
    {
      path: "/notifications",
      element: /* @__PURE__ */ jsx(AuthRoute, { children: /* @__PURE__ */ jsx(ActiveWorkspaceProvider, { children: /* @__PURE__ */ jsx(NotificationsPage, {}) }) })
    }
  ),
  /* @__PURE__ */ jsx(
    Route,
    {
      path: "/notifications/settings",
      element: /* @__PURE__ */ jsx(AuthRoute, { children: /* @__PURE__ */ jsx(NotificationSettingsPage, {}) })
    }
  )
] });
function useSubmitContactForm(form) {
  const { trans } = useTrans();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (props) => submitContactForm(props),
    onSuccess: () => {
      toast(trans(message("Your message has been submitted.")));
      navigate("/");
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function submitContactForm(payload) {
  return apiClient.post("contact-page", payload).then((r) => r.data);
}
function ContactUsPage() {
  const form = useForm();
  const submitForm = useSubmitContactForm(form);
  const { verify, isVerifying } = useRecaptcha("contact");
  const { player } = useSettings();
  useIsMobileMediaQuery();
  return /* @__PURE__ */ jsx(Fragment$1, { children: /* @__PURE__ */ jsxs(
    DashboardLayout,
    {
      name: "web-player",
      initialRightSidenavStatus: (player == null ? void 0 : player.hide_queue) ? "closed" : "open",
      children: [
        /* @__PURE__ */ jsx(
          PlayerNavbarLayout,
          {
            size: "sm",
            menuPosition: "custom-us-page",
            className: "flex-shrink-0"
          }
        ),
        /* @__PURE__ */ jsx(SidedavFrontend, { position: "left", display: "block", children: /* @__PURE__ */ jsx(Sidenav, {}) }),
        /* @__PURE__ */ jsx(DashboardContent, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col bg-alt", children: [
          /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Contact us" }) }),
          /* @__PURE__ */ jsx("div", { className: "container mx-auto flex flex-auto items-center justify-center p-24 md:p-40", children: /* @__PURE__ */ jsxs("div", { className: "max-w-620 rounded border bg-background p-24", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-2xl", children: /* @__PURE__ */ jsx(Trans, { message: "Contact us" }) }),
            /* @__PURE__ */ jsx("p", { className: "mb-30 mt-4 text-sm", children: /* @__PURE__ */ jsx(Trans, { message: "Please use the form below to send us a message and we'll get back to you as soon as possible." }) }),
            /* @__PURE__ */ jsxs(
              Form,
              {
                form,
                onSubmit: async (value) => {
                  const isValid = await verify();
                  if (isValid) {
                    submitForm.mutate(value);
                  }
                },
                children: [
                  /* @__PURE__ */ jsx(
                    FormTextField,
                    {
                      label: /* @__PURE__ */ jsx(Trans, { message: "Name" }),
                      name: "name",
                      required: true,
                      className: "mb-20"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    FormTextField,
                    {
                      label: /* @__PURE__ */ jsx(Trans, { message: "Email" }),
                      name: "email",
                      required: true,
                      type: "email",
                      className: "mb-20"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    FormTextField,
                    {
                      label: /* @__PURE__ */ jsx(Trans, { message: "Message" }),
                      name: "message",
                      required: true,
                      inputElementType: "textarea",
                      className: "mb-20",
                      rows: 8
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      type: "submit",
                      variant: "flat",
                      color: "primary",
                      disabled: submitForm.isPending || isVerifying,
                      children: /* @__PURE__ */ jsx(Trans, { message: "Send" })
                    }
                  )
                ]
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx(Footer, {})
        ] }) })
      ]
    }
  ) });
}
function MaintenancePage() {
  var _a2, _b2;
  const settings = useSettings();
  const appearance = settings.homepage.appearance;
  ((_a2 = settings.homepage) == null ? void 0 : _a2.pricing) && settings.billing.enable;
  (_b2 = settings.homepage) == null ? void 0 : _b2.trending;
  const { player } = useSettings();
  useIsMobileMediaQuery();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(DefaultMetaTags, {}),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
      DashboardLayout,
      {
        name: "web-player",
        initialRightSidenavStatus: (player == null ? void 0 : player.hide_queue) ? "closed" : "open",
        children: [
          /* @__PURE__ */ jsx(
            PlayerNavbarLayout,
            {
              size: "sm",
              menuPosition: "landing-page-navbar",
              className: "flex-shrink-0"
            }
          ),
          /* @__PURE__ */ jsx(SidedavFrontend, { position: "left", display: "block", children: /* @__PURE__ */ jsx(Sidenav, {}) }),
          /* @__PURE__ */ jsx(DashboardContent, { children: /* @__PURE__ */ jsxs("div", { className: "relative h-screen overflow-auto", children: [
            /* @__PURE__ */ jsx(HeroHeader, { content: appearance }),
            /* @__PURE__ */ jsx(Footer, {})
          ] }) })
        ]
      }
    ) })
  ] });
}
function HeroHeader({ content, primaryButtonColor }) {
  useLightThemeVariables();
  const {
    headerTitle,
    headerSubtitle,
    headerImage,
    headerImageOpacity,
    actions,
    headerOverlayColor1,
    headerOverlayColor2
  } = content;
  let overlayBackground = void 0;
  if (headerOverlayColor1 && headerOverlayColor2) {
    overlayBackground = `linear-gradient(45deg, ${headerOverlayColor1} 0%, ${headerOverlayColor2} 100%)`;
  } else if (headerOverlayColor1) {
    overlayBackground = headerOverlayColor1;
  } else if (headerOverlayColor2) {
    overlayBackground = headerOverlayColor2;
  }
  return /* @__PURE__ */ jsxs("header", { className: "relative mb-14 md:mb-20 overflow-hidden isolate", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        "data-testid": "headerImage",
        src: headerImage,
        style: {
          opacity: headerImageOpacity
        },
        alt: "",
        width: "2347",
        height: "1244",
        decoding: "async",
        loading: "lazy",
        className: "absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 z-20"
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute w-full h-full z-10 bg-[rgb(37,99,235)]",
        style: { background: overlayBackground }
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col relative h-full z-30", children: /* @__PURE__ */ jsxs("div", { className: "flex-auto flex flex-col items-center justify-center text-white max-w-850 mx-auto text-center px-14 lg:py-70", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-grow flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-5xl font-normal", children: /* @__PURE__ */ jsx(Trans, { message: "Maintenance Mode" }) }),
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsxs("p", { className: "text-lg mb-8", children: [
          /* @__PURE__ */ jsx(Trans, { message: "Our site is currently under maintenance. Please check back later." }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx(Trans, { message: "If you have any question, let us know." }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx(Trans, { message: "Thanks for understanding." })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-20 pt-70 md:pt-90 pb-30 md:pb-50 min-h-50 empty:min-h-0", children: /* @__PURE__ */ jsx(
        Button,
        {
          elementType: Link,
          to: "/contact",
          variant: "raised",
          color: primaryButtonColor,
          children: /* @__PURE__ */ jsx(Trans, { message: "Contact" })
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "w-full absolute bottom-0 transform translate-y-1/2 -skew-y-3 h-[6vw] z-20 bg" })
  ] });
}
const AdminRoutes = React.lazy(() => import("./assets/admin-routes-6a77e340.mjs").then((n) => n.Y));
const WebPlayerRoutes = React.lazy(
  () => import("./assets/web-player-routes-2e14812d.mjs").then((n) => n.w)
);
const BackstageRoutes = React.lazy(
  () => import("./assets/backstage-routes-67e7bf53.mjs")
);
const SwaggerApiDocs = React.lazy(
  () => import("./assets/swagger-api-docs-page-6916a6d6.mjs")
);
function AppRoutes() {
  const { billing, notifications, require_email_confirmation, api, homepage } = useSettings();
  const { isAppearanceEditorActive } = useAppearanceEditorMode();
  const { user, hasPermission } = useAuth();
  const { maintenance } = useSettings();
  const [isMaintenanceMode, setIsMaintenanceMode] = React.useState(maintenance.enable);
  const [redirected, setRedirected] = React.useState(false);
  React.useEffect(() => {
    setIsMaintenanceMode(maintenance.enable);
  }, [maintenance.enable]);
  React.useEffect(() => {
    if (user && !isMaintenanceMode && redirected) {
      setRedirected(false);
    }
    if (!user && isMaintenanceMode && window.location.pathname !== "/maintenance") {
      window.location.replace("/maintenance");
      setRedirected(true);
    } else if (!isMaintenanceMode && window.location.pathname === "/maintenance") {
      window.location.replace("/");
      setRedirected(true);
    }
  }, [isMaintenanceMode, redirected, user]);
  if (isMaintenanceMode && !user) {
    return /* @__PURE__ */ jsxs(Routes, { children: [
      /* @__PURE__ */ jsx(Route, { path: "/login", element: /* @__PURE__ */ jsx(LoginPageWrapper, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/forgot-password", element: /* @__PURE__ */ jsx(ForgotPasswordPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/password/reset/:token", element: /* @__PURE__ */ jsx(ResetPasswordPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "contact", element: /* @__PURE__ */ jsx(ContactUsPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(MaintenancePage, {}) })
    ] });
  }
  if (user != null && require_email_confirmation && !user.email_verified_at) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(ToastContainer, {}),
      /* @__PURE__ */ jsx(Routes, { children: /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(EmailVerificationPage, {}) }) }),
      /* @__PURE__ */ jsx(DialogStoreOutlet, {})
    ] });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(AppearanceListener, {}),
    /* @__PURE__ */ jsx(CookieNotice, {}),
    /* @__PURE__ */ jsx(ToastContainer, {}),
    /* @__PURE__ */ jsxs(Routes, { children: [
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "/*",
          element: /* @__PURE__ */ jsx(AuthRoute, { requireLogin: false, permission: "music.view", children: /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(FullPageLoader, { screen: true }), children: /* @__PURE__ */ jsx(WebPlayerRoutes, {}) }) })
        }
      ),
      /* @__PURE__ */ jsx(Route, { path: "/maintenance", element: /* @__PURE__ */ jsx(MaintenancePage, {}) }),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "backstage/*",
          element: /* @__PURE__ */ jsx(AuthRoute, { children: /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(FullPageLoader, { screen: true }), children: /* @__PURE__ */ jsx(BackstageRoutes, {}) }) })
        }
      ),
      !(homepage == null ? void 0 : homepage.type.startsWith("channel")) && (user == null || isAppearanceEditorActive) && /* @__PURE__ */ jsx(
        Route,
        {
          path: "/",
          element: /* @__PURE__ */ jsx(DynamicHomepage, { homepageResolver: () => /* @__PURE__ */ jsx(LandingPage, {}) })
        }
      ),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "/admin/*",
          element: /* @__PURE__ */ jsx(AuthRoute, { permission: "admin.access", children: /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(FullPageLoader, { screen: true }), children: /* @__PURE__ */ jsx(AdminRoutes, {}) }) })
        }
      ),
      AuthRoutes,
      billing.enable && BillingRoutes,
      notifications.integrated && NotificationRoutes,
      (api == null ? void 0 : api.integrated) && hasPermission("api.access") && /* @__PURE__ */ jsx(
        Route,
        {
          path: "api-docs",
          element: /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(FullPageLoader, { screen: true }), children: /* @__PURE__ */ jsx(SwaggerApiDocs, {}) })
        }
      ),
      /* @__PURE__ */ jsx(Route, { path: "contact", element: /* @__PURE__ */ jsx(ContactUsPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "pages/:pageSlug", element: /* @__PURE__ */ jsx(CustomPageLayout, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "pages/:pageId/:pageSlug", element: /* @__PURE__ */ jsx(CustomPageLayout, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFoundPage, {}) })
    ] }),
    /* @__PURE__ */ jsx(DialogStoreOutlet, {})
  ] });
}
let port = 13714;
process$1.argv.forEach((value) => {
  if (value.startsWith("port=")) {
    port = parseInt(value.substring("port=".length));
  }
});
const readableToString = (readable) => {
  return new Promise((resolve, reject) => {
    let data = "";
    readable.on("data", (chunk) => data += chunk);
    readable.on("end", () => resolve(data));
    readable.on("error", (err) => reject(err));
  });
};
const getPayload = async (request) => {
  const payload = await readableToString(request);
  return payload ? JSON.parse(payload) : {};
};
createServer(async (request, response) => {
  if (request.url === "/render") {
    return render(request, response);
  } else {
    return handleOtherRoutes(request, response);
  }
}).listen(port, () => console.log("SSR server started."));
async function render(request, response) {
  const data = await getPayload(request);
  setBootstrapData(data.bootstrapData);
  const { pipe, abort } = renderToPipeableStream(
    /* @__PURE__ */ jsx(StaticRouter, { location: data.url, children: /* @__PURE__ */ jsx(CommonProvider, { children: /* @__PURE__ */ jsx(AppRoutes, {}) }) }),
    {
      onAllReady() {
        response.setHeader("content-type", "text/html");
        pipe(response);
        queryClient.clear();
        response.end();
      }
    }
  );
  setTimeout(() => {
    abort();
  }, 2e3);
}
async function handleOtherRoutes(request, response) {
  if (request.url === "/screenshot") {
    takeScreenshot(request, response);
  } else if (request.url === "/health") {
    writeJsonResponse(response, { status: "OK", timestamp: Date.now() });
  } else if (request.url === "/shutdown") {
    response.end();
    process$1.exit();
  } else {
    writeJsonResponse(response, { status: "NOT_FOUND", timestamp: Date.now() });
  }
}
function writeJsonResponse(response, data) {
  try {
    response.writeHead(200, {
      "Content-Type": "application/json"
    });
    response.write(JSON.stringify(data));
  } catch (e) {
    console.error(e);
  }
  response.end();
}
async function takeScreenshot(request, response) {
  try {
    const payload = await getPayload(request);
    const puppeteer = await import("puppeteer");
    const browser = await puppeteer.launch({
      executablePath: "/snap/bin/chromium",
      headless: "new",
      defaultViewport: {
        width: 800,
        height: 600
      }
    });
    const page = await browser.newPage();
    await page.goto(payload.url);
    const image = await page.screenshot({
      type: "jpeg",
      optimizeForSpeed: true,
      quality: 40,
      encoding: "binary"
    });
    await browser.close();
    response.writeHead(200, {
      "Content-Type": "image/jpeg"
    });
    response.write(image);
    response.end();
  } catch (e) {
    console.error(e);
  }
  setTimeout(() => {
    response.end();
  }, 3e3);
}
console.log(`Starting SSR server on port ${port}...`);
export {
  LoginIcon as $,
  ArrowDropDownIcon as A,
  Button as B,
  CustomMenu as C,
  DashboardLayoutContext as D,
  queryClient as E,
  FormSelect as F,
  toast as G,
  showHttpErrorToast as H,
  IconButton as I,
  apiClient as J,
  KeyboardArrowRightIcon as K,
  ConfirmationDialog as L,
  MenuOpenIcon as M,
  Navbar as N,
  IllustratedMessage as O,
  ProgressBar as P,
  SvgImage as Q,
  AddIcon as R,
  SelectForwardRef as S,
  Trans as T,
  downloadFileFromUrl as U,
  onFormQueryError as V,
  FormSwitch as W,
  CheckIcon as X,
  Chip as Y,
  FormattedDate as Z,
  Tooltip as _,
  DashboardLayout as a,
  UpdatePlaylistDialog as a$,
  FormImageSelector as a0,
  useValueLists as a1,
  DoneAllIcon as a2,
  List as a3,
  ListItem as a4,
  Switch as a5,
  createSvgIconFromTree as a6,
  usePrevious as a7,
  Section as a8,
  ButtonBase as a9,
  Field as aA,
  useResendVerificationEmail as aB,
  useUser as aC,
  useUploadAvatar as aD,
  useRemoveAvatar as aE,
  slugifyString as aF,
  isAbsoluteUrl as aG,
  useMediaQuery as aH,
  useProducts as aI,
  FormattedPrice as aJ,
  PauseIcon as aK,
  TrackImage as aL,
  TrackLink as aM,
  SmallArtistImage as aN,
  ArtistLink as aO,
  ARTIST_MODEL as aP,
  TRACK_MODEL as aQ,
  AlbumImage as aR,
  AlbumLink as aS,
  ALBUM_MODEL as aT,
  PageStatus as aU,
  TwitterIcon as aV,
  FacebookIcon as aW,
  PLAYLIST_MODEL as aX,
  CreatePlaylistDialog as aY,
  PlaylistLink as aZ,
  UserProfileLink as a_,
  getInputFieldClassNames as aa,
  MixedText as ab,
  FileUploadProvider as ac,
  useAppearanceEditorMode as ad,
  ProgressCircle as ae,
  useNavigate as af,
  useBootstrapData as ag,
  FullPageLoader as ah,
  USER_MODEL as ai,
  LinkStyle as aj,
  SiteConfigContext as ak,
  getBootstrapData as al,
  ExternalLink as am,
  MenuTrigger as an,
  Menu as ao,
  Tabs as ap,
  TabList as aq,
  Tab as ar,
  TabPanels as as,
  TabPanel as at,
  FormRadioGroup as au,
  FormRadio as av,
  DateFormatPresets as aw,
  prettyBytes as ax,
  useSocialLogin as ay,
  useField as az,
  DashboardContent as b,
  NavbarAuthMenu as b$,
  FormattedRelativeTime as b0,
  useSelectedLocale as b1,
  ComboBoxForwardRef as b2,
  ImageIcon as b3,
  WarningIcon as b4,
  useActiveUpload as b5,
  UploadInputType as b6,
  Disk as b7,
  useCustomPage as b8,
  PageMetaTags as b9,
  EqualizerImage as bA,
  trackToMediaItem as bB,
  PlayArrowFilledIcon as bC,
  getTrackImageSrc as bD,
  useAuth as bE,
  ContextMenuButton as bF,
  MoreHorizIcon as bG,
  useIsMobileDevice as bH,
  tracksToMediaItems as bI,
  getUserImage as bJ,
  useThemeSelector as bK,
  useToggleRepost as bL,
  useRepostsStore as bM,
  ShareIcon as bN,
  ShareMediaDialog as bO,
  useTrackPermissions as bP,
  trackIsLocallyUploaded as bQ,
  PlaybackToggleButton as bR,
  lazyLoader as bS,
  loadMediaItemTracks as bT,
  PlayerStoreContext as bU,
  useCustomMenu as bV,
  CustomMenuItem as bW,
  usePrimaryArtistForCurrentUser as bX,
  MicIcon as bY,
  PersonIcon as bZ,
  Badge as b_,
  useCollator as ba,
  loadFonts as bb,
  AuthRoute as bc,
  NotFoundPage as bd,
  useAuthClickCapture as be,
  useAddItemsToLibrary as bf,
  useRemoveItemsFromLibrary as bg,
  useLibraryStore as bh,
  FavoriteIcon as bi,
  FavoriteBorderIcon as bj,
  PlayableGridItem as bk,
  getArtistLink as bl,
  ArtistContextDialog as bm,
  ArtistLinks as bn,
  getAlbumLink as bo,
  AlbumContextDialog as bp,
  getTrackLink as bq,
  TrackContextDialog as br,
  getUserProfileLink as bs,
  UserImage as bt,
  PlaylistGridItem as bu,
  useShouldShowRadioButton as bv,
  getRadioLink as bw,
  ContentGrid as bx,
  usePlayerStore as by,
  usePlayerActions as bz,
  useIsMobileMediaQuery as c,
  DarkModeIcon as c$,
  PlayerNavbarLayout as c0,
  SidedavFrontend as c1,
  Sidenav as c2,
  PlayerContext as c3,
  queueGroupId as c4,
  AlbumIcon as c5,
  useCookie as c6,
  useAlbumPermissions as c7,
  useUpdatePlaylist as c8,
  usePlaylistPermissions as c9,
  validateUpload as cA,
  openUploadWindow as cB,
  ShareMediaButtons as cC,
  useIsDarkMode as cD,
  useDeleteAlbum as cE,
  useArtistPermissions as cF,
  isCtrlKeyPressed as cG,
  isCtrlOrShiftPressed as cH,
  AvatarPlaceholderIcon as cI,
  UploadedFile as cJ,
  rootEl as cK,
  Footer as cL,
  BillingCycleRadio as cM,
  findBestPrice as cN,
  UpsellLabel as cO,
  FormattedCurrency as cP,
  removeFromLocalStorage as cQ,
  LocaleSwitcher as cR,
  ProductFeatureList as cS,
  useCallbackRef as cT,
  AccountCircleIcon as cU,
  AddAPhotoIcon as cV,
  ApiIcon as cW,
  CheckBoxOutlineBlankIcon as cX,
  ComputerIcon as cY,
  CookieIcon as cZ,
  DangerousIcon as c_,
  PlaylistImage as ca,
  ImageSelector as cb,
  getPlaylistImageSrc as cc,
  FollowPlaylistButton as cd,
  PlaylistContextDialog as ce,
  getSmallArtistImage as cf,
  PageErrorMessage as cg,
  PlayableMediaGridSkeleton as ch,
  useSearchResults as ci,
  getPlaylistLink as cj,
  PlaylistAddIcon as ck,
  PlaylistPlayIcon as cl,
  useAuthUserPlaylists as cm,
  MusicNoteIcon as cn,
  clamp as co,
  createEventHandler as cp,
  useUserTimezone as cq,
  useDateFormatter as cr,
  shallowEqual as cs,
  useListbox as ct,
  Listbox as cu,
  Popover as cv,
  useListboxKeyboardNavigation as cw,
  useFileUploadStore as cx,
  ErrorIcon as cy,
  CheckCircleIcon as cz,
  DialogTrigger as d,
  DevicesIcon as d0,
  ErrorOutlineIcon as d1,
  ExitToAppIcon as d2,
  FileDownloadDoneIcon as d3,
  ForumIcon as d4,
  GroupAddIcon as d5,
  KeyboardBackspaceIcon as d6,
  LanguageIcon as d7,
  LightModeIcon as d8,
  LightbulbIcon as d9,
  LockIcon as da,
  MailIcon as db,
  MenuIcon as dc,
  NotificationsIcon as dd,
  PaymentsIcon as de,
  PeopleIcon as df,
  PhonelinkLockIcon as dg,
  SettingsIcon as dh,
  SmartphoneIcon as di,
  StarIcon as dj,
  TabletIcon as dk,
  elementToTree as dl,
  EnvatoIcon as dm,
  useNumberFormatter as e,
  Item$1 as f,
  createSvgIcon as g,
  useTrans as h,
  FormTextField as i,
  useDialogContext as j,
  Dialog as k,
  DialogHeader as l,
  message as m,
  DialogBody as n,
  Form as o,
  Checkbox as p,
  TextField as q,
  SearchIcon as r,
  setInLocalStorage as s,
  KeyboardArrowDownIcon as t,
  useSettings as u,
  DialogFooter as v,
  Skeleton as w,
  CloseIcon as x,
  opacityAnimation as y,
  StaticPageTitle as z
};
//# sourceMappingURL=server-entry.mjs.map
