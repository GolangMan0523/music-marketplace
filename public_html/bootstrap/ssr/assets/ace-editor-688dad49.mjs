import { jsx } from "react/jsx-runtime";
import ace from "ace-builds/src-noconflict/ace.js";
import { useRef, useEffect } from "react";
import AceEditorRender from "react-ace";
import "ace-builds/src-noconflict/mode-css.js";
import "ace-builds/src-noconflict/mode-html.js";
import "ace-builds/src-noconflict/mode-javascript.js";
import "ace-builds/src-noconflict/mode-php_laravel_blade.js";
import "ace-builds/src-noconflict/theme-chrome.js";
import "ace-builds/src-noconflict/theme-tomorrow_night.js";
import "ace-builds/src-noconflict/ext-language_tools.js";
import Beautify from "ace-builds/src-noconflict/ext-beautify.js";
import { cD as useIsDarkMode } from "../server-entry.mjs";
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
const cssWorkerUrl = "/assets/worker-css-ca12fbb3.js";
const htmlWorkerUrl = "/assets/worker-html-a0682eba.js";
const phpWorkerUrl = "/assets/worker-php-75723c37.js";
const javascriptWorkerUrl = "/assets/worker-javascript-e3ad1990.js";
ace.config.setModuleUrl("ace/mode/css_worker", cssWorkerUrl);
ace.config.setModuleUrl("ace/mode/html_worker", htmlWorkerUrl);
ace.config.setModuleUrl("ace/mode/php_worker", phpWorkerUrl);
ace.config.setModuleUrl("ace/mode/javascript_worker", javascriptWorkerUrl);
function AceEditor({
  mode,
  onChange,
  onIsValidChange,
  defaultValue,
  beautify = true,
  editorRef: propsEditorRef
}) {
  const isDarkMode = useIsDarkMode();
  const defaultRef = useRef(null);
  const editorRef = propsEditorRef || defaultRef;
  useEffect(() => {
    if (beautify && editorRef.current) {
      Beautify.beautify(editorRef.current.editor.session);
    }
  }, [beautify, editorRef]);
  return /* @__PURE__ */ jsx(
    AceEditorRender,
    {
      ref: editorRef,
      width: "auto",
      height: "auto",
      wrapEnabled: true,
      className: "absolute inset-0",
      focus: true,
      mode,
      theme: isDarkMode ? "tomorrow_night" : "chrome",
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      defaultValue,
      onChange,
      editorProps: { $blockScrolling: true },
      commands: Beautify.commands,
      onValidate: (annotations) => {
        const isValid = annotations.filter((a) => a.type === "error").length === 0;
        onIsValidChange(isValid);
      }
    }
  );
}
export {
  AceEditor as default
};
//# sourceMappingURL=ace-editor-688dad49.mjs.map
