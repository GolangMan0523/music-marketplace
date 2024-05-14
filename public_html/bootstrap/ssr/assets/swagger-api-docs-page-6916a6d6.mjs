import { jsx, jsxs } from "react/jsx-runtime";
import SwaggerUI from "swagger-ui-react";
import { useMemo } from "react";
import { u as useSettings, c as useIsMobileMediaQuery, a as DashboardLayout, c0 as PlayerNavbarLayout, c1 as SidedavFrontend, c2 as Sidenav, b as DashboardContent } from "../server-entry.mjs";
import "react-dom/server";
import "process";
import "http";
import "@tanstack/react-query";
import "axios";
import "react-router-dom/server.mjs";
import "framer-motion";
import "react-router-dom";
import "clsx";
import "slugify";
import "deepmerge";
import "@internationalized/date";
import "nano-memoize";
import "zustand";
import "zustand/middleware/immer";
import "nanoid";
import "@internationalized/number";
import "@react-stately/utils";
import "@react-aria/utils";
import "@floating-ui/react-dom";
import "react-merge-refs";
import "@react-aria/focus";
import "react-dom";
import "@react-aria/ssr";
import "react-hook-form";
import "fscreen";
import "zustand/middleware";
import "zustand/traditional";
import "immer";
import "axios-retry";
import "tus-js-client";
import "mime-match";
import "react-use-clipboard";
const swaggerUi = "";
function SwaggerApiDocsPage() {
  const settings = useSettings();
  const { player } = useSettings();
  useIsMobileMediaQuery();
  const plugins = useMemo(() => {
    return getPluginsConfig(settings);
  }, [settings]);
  return /* @__PURE__ */ jsx("div", { className: "h-full overflow-y-auto bg-alt", children: /* @__PURE__ */ jsxs(
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
        /* @__PURE__ */ jsx(DashboardContent, { children: /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsx(
          SwaggerUI,
          {
            url: `${settings.base_url}/swagger.yaml`,
            plugins,
            onComplete: (system) => {
              var _a;
              const hash = location.hash.slice(1);
              if (hash) {
                const el = document.querySelector(
                  `#operations-${hash.replace(/\//g, "-")}`
                );
                if (el) {
                  el.scrollIntoView();
                  (_a = el.querySelector("button")) == null ? void 0 : _a.click();
                }
              }
            }
          }
        ) }) }) })
      ]
    }
  ) });
}
function getPluginsConfig(settings) {
  return [
    {
      statePlugins: {
        spec: {
          wrapActions: {
            updateSpec: (oriAction) => {
              return (spec) => {
                spec = spec.replaceAll(
                  "SITE_NAME",
                  settings.branding.site_name.replace(":", "")
                );
                spec = spec.replaceAll("SITE_URL", settings.base_url);
                return oriAction(spec);
              };
            },
            // Add current server url to docs
            updateJsonSpec: (oriAction) => {
              return (spec) => {
                spec.servers = [{ url: `${settings.base_url}/api/v1` }];
                return oriAction(spec);
              };
            }
          }
        }
      }
    }
  ];
}
export {
  SwaggerApiDocsPage as default
};
//# sourceMappingURL=swagger-api-docs-page-6916a6d6.mjs.map
