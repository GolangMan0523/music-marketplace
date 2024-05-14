import { jsx, jsxs } from "react/jsx-runtime";
import { Link, useLocation, useRoutes } from "react-router-dom";
import { O as BackstageLayout, i as DatatableDataQueryKey, q as DocumentScannerIcon, F as FormNormalizedModelField, p as useBackstageRequest, K as UploadPage, w as CreateTrackPage, U as UpdateTrackPage, x as BackstageTrackInsights, y as CreateAlbumPage, z as UpdateAlbumPage, E as BackstageAlbumInsights, H as UpdateArtistPage, J as BackstageArtistInsights } from "./backstage-track-insights-b8d60490.mjs";
import { u as useSettings, bX as usePrimaryArtistForCurrentUser, T as Trans, E as queryClient, V as onFormQueryError, J as apiClient, bE as useAuth, F as FormSelect, f as Item, ay as useSocialLogin, B as Button, aV as TwitterIcon, G as toast, m as message, aW as FacebookIcon, ax as prettyBytes, aC as useUser, I as IconButton, x as CloseIcon, b5 as useActiveUpload, b6 as UploadInputType, b7 as Disk, af as useNavigate, ac as FileUploadProvider, o as Form, a0 as FormImageSelector, i as FormTextField, ah as FullPageLoader, X as CheckIcon, bc as AuthRoute } from "../server-entry.mjs";
import clsx from "clsx";
import { useMutation } from "@tanstack/react-query";
import { useForm, useFormContext } from "react-hook-form";
import { cloneElement } from "react";
import "./theme-value-to-hex-ee0bd15b.mjs";
import "@react-stately/utils";
import "@react-aria/focus";
import "@react-aria/utils";
import "@react-aria/interactions";
import "framer-motion";
import "react-dom";
import "dot-object";
import "@react-stately/color";
import "@internationalized/date";
import "./Edit-f0b99a84.mjs";
import "@internationalized/number";
import "nano-memoize";
import "react-dom/server";
import "process";
import "http";
import "axios";
import "react-router-dom/server.mjs";
import "slugify";
import "deepmerge";
import "zustand";
import "zustand/middleware/immer";
import "nanoid";
import "@floating-ui/react-dom";
import "react-merge-refs";
import "@react-aria/ssr";
import "fscreen";
import "zustand/middleware";
import "zustand/traditional";
import "immer";
import "axios-retry";
import "tus-js-client";
import "mime-match";
import "react-use-clipboard";
const claimLabelImage = "/assets/claim-label-9a476d72.jpg";
const claimArtistImage = "/assets/claim-artist-c781927a.jpg";
function BackstageTypeSelector() {
  const { branding } = useSettings();
  const isArtist = usePrimaryArtistForCurrentUser() != null;
  return /* @__PURE__ */ jsx(BackstageLayout, { children: /* @__PURE__ */ jsxs("div", { className: "max-w-780 my:20 md:my-40 mx-auto", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-5xl text-center font-medium mb-10", children: /* @__PURE__ */ jsx(
      Trans,
      {
        message: "Get access to :siteName for artists",
        values: { siteName: branding.site_name }
      }
    ) }),
    /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium mb-54 text-center", children: /* @__PURE__ */ jsx(Trans, { message: "First, select the type of your request" }) }),
    /* @__PURE__ */ jsxs("div", { className: "md:flex items-center gap-54", children: [
      /* @__PURE__ */ jsx(
        ClaimPanelLayout,
        {
          className: "mb-14 md:mb-0",
          title: isArtist ? /* @__PURE__ */ jsx(Trans, { message: "Get verified" }) : /* @__PURE__ */ jsx(Trans, { message: "Become an artist" }),
          link: isArtist ? "verify-artist" : "become-artist",
          image: claimArtistImage
        }
      ),
      /* @__PURE__ */ jsx(
        ClaimPanelLayout,
        {
          title: /* @__PURE__ */ jsx(Trans, { message: "Claim existing artist" }),
          link: "claim-artist",
          image: claimLabelImage
        }
      )
    ] })
  ] }) });
}
function ClaimPanelLayout({
  title,
  image,
  link,
  className
}) {
  return /* @__PURE__ */ jsxs(
    Link,
    {
      to: link,
      className: clsx(
        "block flex-auto flex flex-col items-center justify-center p-34 border border-2 rounded-md bg-background transition-shadow hover:shadow-xl hover:bg-primary/4 cursor-pointer",
        className
      ),
      children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg mb-10 font-medium", children: title }),
        /* @__PURE__ */ jsx(
          "img",
          {
            className: "w-132 h-132 object-cover rounded-full",
            src: image,
            alt: ""
          }
        )
      ]
    }
  );
}
const endpoint = "backstage-request";
function useCreateBackstageRequest(form) {
  return useMutation({
    mutationFn: (payload) => createRequest(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey(endpoint)
      });
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function createRequest(payload) {
  var _a;
  return apiClient.post(endpoint, {
    artist_name: payload.artist_name,
    artist_id: payload.artist_id,
    type: payload.type,
    data: {
      first_name: payload.first_name,
      last_name: payload.last_name,
      image: payload.image,
      role: payload.role,
      company: payload.company,
      passport_scan_id: (_a = payload.passportScan) == null ? void 0 : _a.id
    }
  }).then((r) => r.data);
}
function useBackstageRequestForm(requestType) {
  const { user } = useAuth();
  const primaryArtist = usePrimaryArtistForCurrentUser();
  let artistId;
  if (requestType === "verify-artist") {
    artistId = primaryArtist == null ? void 0 : primaryArtist.id;
  } else if (requestType === "become-artist") {
    artistId = "CURRENT_USER";
  }
  return useForm({
    defaultValues: {
      artist_id: artistId,
      artist_name: user == null ? void 0 : user.display_name,
      first_name: user == null ? void 0 : user.first_name,
      last_name: user == null ? void 0 : user.last_name,
      image: (primaryArtist == null ? void 0 : primaryArtist.image) || (user == null ? void 0 : user.avatar),
      type: requestType,
      role: requestType === "claim-artist" ? "artist" : void 0
    }
  });
}
function BackstageRoleSelect() {
  return /* @__PURE__ */ jsxs(
    FormSelect,
    {
      name: "role",
      label: /* @__PURE__ */ jsx(Trans, { message: "Role" }),
      selectionMode: "single",
      className: "mb-24",
      children: [
        /* @__PURE__ */ jsx(Item, { value: "artist", children: /* @__PURE__ */ jsx(Trans, { message: "Artist" }) }),
        /* @__PURE__ */ jsx(Item, { value: "agent", children: /* @__PURE__ */ jsx(Trans, { message: "Agent" }) }),
        /* @__PURE__ */ jsx(Item, { value: "composer", children: /* @__PURE__ */ jsx(Trans, { message: "Composer" }) }),
        /* @__PURE__ */ jsx(Item, { value: "label", children: /* @__PURE__ */ jsx(Trans, { message: "Label" }) }),
        /* @__PURE__ */ jsx(Item, { value: "manager", children: /* @__PURE__ */ jsx(Trans, { message: "Manager" }) }),
        /* @__PURE__ */ jsx(Item, { value: "musician", children: /* @__PURE__ */ jsx(Trans, { message: "Musician" }) }),
        /* @__PURE__ */ jsx(Item, { value: "producer", children: /* @__PURE__ */ jsx(Trans, { message: "Producer" }) }),
        /* @__PURE__ */ jsx(Item, { value: "publisher", children: /* @__PURE__ */ jsx(Trans, { message: "Publisher" }) }),
        /* @__PURE__ */ jsx(Item, { value: "songwriter", children: /* @__PURE__ */ jsx(Trans, { message: "Songwriter" }) })
      ]
    }
  );
}
function BackstageFormAttachments() {
  var _a, _b;
  const { social } = useSettings();
  const { watch, setValue } = useFormContext();
  const { connectSocial } = useSocialLogin();
  const passportScan = watch("passportScan");
  return /* @__PURE__ */ jsxs("div", { className: "py-20", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-14 text-sm", children: /* @__PURE__ */ jsx(Trans, { message: "Speed up the process by connecting artist social media accounts or uploading your passport scan." }) }),
    ((_a = social == null ? void 0 : social.twitter) == null ? void 0 : _a.enable) && /* @__PURE__ */ jsx(
      Button,
      {
        variant: "outline",
        startIcon: /* @__PURE__ */ jsx(TwitterIcon, { className: "text-twitter" }),
        className: "mr-10 mb-10 md:mb-0",
        onClick: async () => {
          const e = await connectSocial("twitter");
          if ((e == null ? void 0 : e.status) === "SUCCESS") {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast(message("Connected twitter account"));
          }
        },
        children: /* @__PURE__ */ jsx(Trans, { message: "Connect to twitter" })
      }
    ),
    ((_b = social == null ? void 0 : social.facebook) == null ? void 0 : _b.enable) && /* @__PURE__ */ jsx(
      Button,
      {
        variant: "outline",
        startIcon: /* @__PURE__ */ jsx(FacebookIcon, { className: "text-facebook" }),
        className: "mr-10 mb-10 md:mb-0",
        onClick: async () => {
          const e = await connectSocial("facebook");
          if ((e == null ? void 0 : e.status) === "SUCCESS") {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast(message("Connected facebook account"));
          }
        },
        children: /* @__PURE__ */ jsx(Trans, { message: "Connect to facebook" })
      }
    ),
    /* @__PURE__ */ jsx(PassportScanButton, {}),
    /* @__PURE__ */ jsxs("div", { className: "mt-20", children: [
      passportScan && /* @__PURE__ */ jsx(
        AttachmentLayout,
        {
          icon: /* @__PURE__ */ jsx(DocumentScannerIcon, {}),
          title: /* @__PURE__ */ jsx(Trans, { message: "Passport scan" }),
          description: `${passportScan.name} (${prettyBytes(
            passportScan.file_size
          )})`,
          onRemove: () => {
            setValue("passportScan", void 0);
          }
        }
      ),
      /* @__PURE__ */ jsx(SocialServiceAttachment, { service: "twitter" }),
      /* @__PURE__ */ jsx(SocialServiceAttachment, { service: "facebook" })
    ] })
  ] });
}
function SocialServiceAttachment({ service }) {
  const { disconnectSocial } = useSocialLogin();
  const { data } = useUser("me", {
    with: ["social_profiles"]
  });
  const account = data == null ? void 0 : data.user.social_profiles.find(
    (s) => s.service_name === service
  );
  if (!account)
    return null;
  return /* @__PURE__ */ jsx(
    AttachmentLayout,
    {
      icon: service === "twitter" ? /* @__PURE__ */ jsx(TwitterIcon, { className: "text-twitter" }) : /* @__PURE__ */ jsx(FacebookIcon, { className: "text-facebook" }),
      title: /* @__PURE__ */ jsx("span", { className: "capitalize", children: /* @__PURE__ */ jsx(Trans, { message: ":service account", values: { service } }) }),
      description: account.username,
      isDisabled: disconnectSocial.isPending,
      onRemove: () => {
        disconnectSocial.mutate(
          { service: "twitter" },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["users"] });
            }
          }
        );
      }
    }
  );
}
function AttachmentLayout({
  icon,
  title,
  description,
  onRemove,
  isDisabled
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-8 border rounded px-14 py-8 mb-8", children: [
    /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 text-muted", children: cloneElement(icon, { size: "lg" }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "text-xs text-muted", children: title }),
      /* @__PURE__ */ jsx("div", { className: "text-sm", children: description })
    ] }),
    /* @__PURE__ */ jsx(
      IconButton,
      {
        className: "flex-shrink-0 ml-auto",
        onClick: () => onRemove(),
        disabled: isDisabled,
        children: /* @__PURE__ */ jsx(CloseIcon, {})
      }
    )
  ] });
}
const FiveMB = 5 * 1024 * 1024;
function PassportScanButton() {
  const { setValue } = useFormContext();
  const { selectAndUploadFile } = useActiveUpload();
  const handleUpload = () => {
    selectAndUploadFile({
      showToastOnRestrictionFail: true,
      restrictions: {
        allowedFileTypes: [UploadInputType.image],
        maxFileSize: FiveMB
      },
      metadata: {
        disk: Disk.uploads
      },
      onSuccess: (entry) => {
        setValue("passportScan", entry);
      }
    });
  };
  return /* @__PURE__ */ jsx(
    Button,
    {
      variant: "outline",
      startIcon: /* @__PURE__ */ jsx(DocumentScannerIcon, { className: "text-primary" }),
      onClick: () => handleUpload(),
      children: /* @__PURE__ */ jsx(Trans, { message: "Upload passport scan" })
    }
  );
}
function BackstageRequestFormPage() {
  const { pathname } = useLocation();
  const requestType = pathname.split("/").pop();
  return /* @__PURE__ */ jsx(BackstageLayout, { children: /* @__PURE__ */ jsxs("div", { className: "mx-auto my-40 max-w-780", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-center text-3xl font-medium md:text-5xl", children: /* @__PURE__ */ jsx(Trans, { message: "Tell us about yourself" }) }),
    /* @__PURE__ */ jsx(ClaimForm, { requestType })
  ] }) });
}
function ClaimForm({ requestType }) {
  const navigate = useNavigate();
  const form = useBackstageRequestForm(requestType);
  const submitRequest = useCreateBackstageRequest(form);
  return /* @__PURE__ */ jsx(FileUploadProvider, { children: /* @__PURE__ */ jsxs(
    Form,
    {
      form,
      onSubmit: (values) => {
        submitRequest.mutate(values, {
          onSuccess: (response) => {
            navigate(
              `/backstage/requests/${response.request.id}/request-submitted`,
              { replace: true }
            );
          }
        });
      },
      children: [
        /* @__PURE__ */ jsx(
          FormImageSelector,
          {
            name: "image",
            diskPrefix: "artist_media",
            variant: "avatar",
            previewSize: "w-160 h-160",
            className: "mx-auto my-30 max-w-max",
            disabled: requestType === "become-artist"
          }
        ),
        requestType !== "become-artist" && /* @__PURE__ */ jsx(
          FormNormalizedModelField,
          {
            className: "mb-24",
            label: /* @__PURE__ */ jsx(Trans, { message: "Select artist" }),
            name: "artist_id",
            endpoint: "search/suggestions/artist",
            queryParams: {
              listAll: "true",
              excludeSelf: "true"
            },
            disabled: requestType === "verify-artist"
          }
        ),
        requestType === "become-artist" && /* @__PURE__ */ jsx(
          FormTextField,
          {
            required: true,
            name: "artist_name",
            label: /* @__PURE__ */ jsx(Trans, { message: "Your artist name" }),
            className: "mb-24"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "mb-24 items-center gap-24 md:flex", children: [
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              required: true,
              name: "first_name",
              label: /* @__PURE__ */ jsx(Trans, { message: "First name" }),
              className: "mb-24 flex-auto md:mb-0"
            }
          ),
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              required: true,
              name: "last_name",
              label: /* @__PURE__ */ jsx(Trans, { message: "Last name" }),
              className: "flex-auto"
            }
          )
        ] }),
        requestType === "claim-artist" && /* @__PURE__ */ jsx(BackstageRoleSelect, {}),
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            name: "company",
            label: /* @__PURE__ */ jsx(Trans, { message: "Company (optional)" }),
            className: "mb-24"
          }
        ),
        /* @__PURE__ */ jsx(BackstageFormAttachments, {}),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-24 border-t pt-34", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "raised",
              color: "white",
              elementType: Link,
              to: "..",
              relative: "path",
              className: "min-w-140",
              radius: "rounded-full",
              children: /* @__PURE__ */ jsx(Trans, { message: "Go back" })
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "raised",
              color: "primary",
              type: "submit",
              className: "min-w-140",
              radius: "rounded-full",
              disabled: submitRequest.isPending,
              children: /* @__PURE__ */ jsx(Trans, { message: "Submit request" })
            }
          )
        ] })
      ]
    }
  ) });
}
function BackstageRequestSubmittedPage() {
  const { isLoading } = useBackstageRequest();
  return /* @__PURE__ */ jsx(BackstageLayout, { children: /* @__PURE__ */ jsx("div", { className: "mx-auto my-40 max-w-[590px]", children: isLoading ? /* @__PURE__ */ jsx(FullPageLoader, { className: "my-40" }) : /* @__PURE__ */ jsx(SuccessMessage, {}) }) });
}
function SuccessMessage() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx(CheckIcon, { size: "text-6xl" }) }),
    /* @__PURE__ */ jsx("h1", { className: "mb-48 mt-24 text-center text-5xl font-medium", children: /* @__PURE__ */ jsx(Trans, { message: "We've got your request" }) }),
    /* @__PURE__ */ jsxs("ul", { className: "mb-60 list-inside list-disc px-20", children: [
      /* @__PURE__ */ jsx("li", { className: "pb-10", children: /* @__PURE__ */ jsx(Trans, { message: "Our support team will review it and send you an email within 3 days!" }) }),
      /* @__PURE__ */ jsx("li", { className: "pb-10", children: /* @__PURE__ */ jsx(Trans, { message: "Don't submit another request until you hear from us." }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Trans, { message: "If this artist profile is already claimed, ask an admin on your team to invite you." }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx(
      Button,
      {
        variant: "raised",
        color: "primary",
        elementType: Link,
        to: "/",
        className: "min-w-140",
        radius: "rounded-full",
        children: /* @__PURE__ */ jsx(Trans, { message: "Got It" })
      }
    ) })
  ] });
}
const RouteConfig = [
  {
    path: "upload",
    element: /* @__PURE__ */ jsx(AuthRoute, { permission: "music.create", children: /* @__PURE__ */ jsx(UploadPage, {}) })
  },
  // Backstage request form
  {
    path: "requests",
    element: /* @__PURE__ */ jsx(AuthRoute, { permission: "backstageRequests.create", children: /* @__PURE__ */ jsx(BackstageTypeSelector, {}) })
  },
  {
    path: "requests/verify-artist",
    element: /* @__PURE__ */ jsx(AuthRoute, { permission: "backstageRequests.create", children: /* @__PURE__ */ jsx(BackstageRequestFormPage, {}) })
  },
  {
    path: "requests/become-artist",
    element: /* @__PURE__ */ jsx(AuthRoute, { permission: "backstageRequests.create", children: /* @__PURE__ */ jsx(BackstageRequestFormPage, {}) })
  },
  {
    path: "requests/claim-artist",
    element: /* @__PURE__ */ jsx(AuthRoute, { permission: "backstageRequests.create", children: /* @__PURE__ */ jsx(BackstageRequestFormPage, {}) })
  },
  {
    path: "requests/:requestId/request-submitted",
    element: /* @__PURE__ */ jsx(AuthRoute, { permission: "backstageRequests.create", children: /* @__PURE__ */ jsx(BackstageRequestSubmittedPage, {}) })
  },
  // Tracks
  {
    path: "tracks/new",
    element: /* @__PURE__ */ jsx(AuthRoute, { permission: "music.create", children: /* @__PURE__ */ jsx(BackstageLayout, { children: /* @__PURE__ */ jsx(CreateTrackPage, {}) }) })
  },
  {
    path: "tracks/:trackId/edit",
    element: /* @__PURE__ */ jsx(BackstageLayout, { children: /* @__PURE__ */ jsx(UpdateTrackPage, {}) })
  },
  {
    path: "tracks/:trackId/insights",
    element: /* @__PURE__ */ jsx(BackstageTrackInsights, {})
  },
  // Albums
  {
    path: "albums/new",
    element: /* @__PURE__ */ jsx(AuthRoute, { permission: "music.create", children: /* @__PURE__ */ jsx(BackstageLayout, { children: /* @__PURE__ */ jsx(CreateAlbumPage, { wrapInContainer: false }) }) })
  },
  {
    path: "albums/:albumId/edit",
    element: /* @__PURE__ */ jsx(BackstageLayout, { children: /* @__PURE__ */ jsx(UpdateAlbumPage, { wrapInContainer: false }) })
  },
  {
    path: "albums/:albumId/insights",
    element: /* @__PURE__ */ jsx(BackstageAlbumInsights, {})
  },
  // Artists
  {
    path: "artists/:artistId/edit",
    element: /* @__PURE__ */ jsx(BackstageLayout, { children: /* @__PURE__ */ jsx(UpdateArtistPage, { wrapInContainer: false, showExternalFields: false }) })
  },
  {
    path: "artists/:artistId/insights",
    element: /* @__PURE__ */ jsx(BackstageArtistInsights, {})
  }
];
function BackstageRoutes() {
  return useRoutes(RouteConfig);
}
export {
  BackstageRoutes as default
};
//# sourceMappingURL=backstage-routes-67e7bf53.mjs.map
