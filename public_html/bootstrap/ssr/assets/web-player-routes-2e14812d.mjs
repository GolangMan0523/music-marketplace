var _a, _b;
import { jsxs, jsx } from "react/jsx-runtime";
import { Link, useParams, useMatch, useLocation, Outlet, useSearchParams, Navigate, useRoutes } from "react-router-dom";
import { B as Button, T as Trans, y as opacityAnimation, ae as ProgressCircle, be as useAuthClickCapture, bf as useAddItemsToLibrary, bg as useRemoveItemsFromLibrary, bh as useLibraryStore, I as IconButton, bi as FavoriteIcon, bj as FavoriteBorderIcon, bk as PlayableGridItem, aN as SmallArtistImage, aO as ArtistLink, bl as getArtistLink, bm as ArtistContextDialog, aR as AlbumImage, aS as AlbumLink, bn as ArtistLinks, bo as getAlbumLink, bp as AlbumContextDialog, h as useTrans, m as message, aL as TrackImage, aM as TrackLink, bq as getTrackLink, br as TrackContextDialog, bs as getUserProfileLink, bt as UserImage, ai as USER_MODEL, aX as PLAYLIST_MODEL, bu as PlaylistGridItem, aQ as TRACK_MODEL, aT as ALBUM_MODEL, aP as ARTIST_MODEL, g as createSvgIcon, bv as useShouldShowRadioButton, _ as Tooltip, bw as getRadioLink, K as KeyboardArrowRightIcon, J as apiClient, bx as ContentGrid, by as usePlayerStore, bz as usePlayerActions, aK as PauseIcon, bA as EqualizerImage, bB as trackToMediaItem, bC as PlayArrowFilledIcon, bD as getTrackImageSrc, G as toast, E as queryClient, H as showHttpErrorToast, bE as useAuth, j as useDialogContext, bF as ContextMenuButton, c as useIsMobileMediaQuery, d as DialogTrigger, bG as MoreHorizIcon, bH as useIsMobileDevice, w as Skeleton, b0 as FormattedRelativeTime, bI as tracksToMediaItems, bJ as getUserImage, k as Dialog, n as DialogBody, bK as useThemeSelector, q as TextField, u as useSettings, bL as useToggleRepost, bM as useRepostsStore, bN as ShareIcon, bO as ShareMediaDialog, bP as useTrackPermissions, bQ as trackIsLocallyUploaded, bR as PlaybackToggleButton, a_ as UserProfileLink, Y as Chip, bS as lazyLoader, b9 as PageMetaTags, aU as PageStatus, al as getBootstrapData, bT as loadMediaItemTracks, bU as PlayerStoreContext, P as ProgressBar, bV as useCustomMenu, bW as CustomMenuItem, af as useNavigate, bX as usePrimaryArtistForCurrentUser, f as Item, bY as MicIcon, bZ as PersonIcon, b_ as Badge, an as MenuTrigger, ao as Menu, b$ as NavbarAuthMenu, U as downloadFileFromUrl, D as DashboardLayoutContext, t as KeyboardArrowDownIcon, aH as useMediaQuery, a7 as usePrevious, a as DashboardLayout, c0 as PlayerNavbarLayout, c1 as SidedavFrontend, c2 as Sidenav, b as DashboardContent, c3 as PlayerContext, aG as isAbsoluteUrl, c4 as queueGroupId, A as ArrowDropDownIcon, O as IllustratedMessage, c5 as AlbumIcon, Z as FormattedDate, c6 as useCookie, ah as FullPageLoader, c7 as useAlbumPermissions, ap as Tabs, aq as TabList, ar as Tab, as as TabPanels, at as TabPanel, c8 as useUpdatePlaylist, c9 as usePlaylistPermissions, ca as PlaylistImage, ac as FileUploadProvider, cb as ImageSelector, cc as getPlaylistImageSrc, b3 as ImageIcon, cd as FollowPlaylistButton, ce as PlaylistContextDialog, r as SearchIcon, L as ConfirmationDialog, ak as SiteConfigContext, aj as LinkStyle, cf as getSmallArtistImage, cg as PageErrorMessage, z as StaticPageTitle, ch as PlayableMediaGridSkeleton, V as onFormQueryError, b2 as ComboBoxForwardRef, a1 as useValueLists, l as DialogHeader, o as Form, a0 as FormImageSelector, i as FormTextField, v as DialogFooter, bd as NotFoundPage, ci as useSearchResults, cj as getPlaylistLink, ck as PlaylistAddIcon, aY as CreatePlaylistDialog, cl as PlaylistPlayIcon, cm as useAuthUserPlaylists, cn as MusicNoteIcon, bc as AuthRoute } from "../server-entry.mjs";
import React, { useRef, useState, useEffect, useMemo, Fragment, useContext, createContext, memo, useCallback, useLayoutEffect, useId, Suspense, cloneElement, Children } from "react";
import clsx from "clsx";
import { AnimatePresence, m } from "framer-motion";
import { G as GENRE_MODEL, b as TableContext, T as Table, a as FormattedDuration, c as TableRow, A as Avatar, t as themeValueToHex, W as WAVE_WIDTH, d as WAVE_HEIGHT, F as FormattedNumber, K as KeyboardArrowLeftIcon, e as assignAlbumToTracks, f as useSortableTableData, g as albumLayoutKey, h as useArtist, D as DragPreview, u as useSortable, U as UserAvatar, i as useAlbum, C as ChipList, j as useTrack, P as ProfileLinksForm, k as useIsTabletMediaQuery } from "./theme-value-to-hex-ee0bd15b.mjs";
import { L as LabelIcon, S as ScheduleIcon, R as RepeatIcon, D as DownloadIcon, K as KeyboardArrowUpIcon, V as ViewAgendaIcon, A as AudiotrackIcon, B as BookmarkBorderIcon, T as ThumbUpIcon, a as ThumbDownIcon, b as ReplyIcon, C as CommentIcon, c as SortIcon, Q as QueueMusicIcon, H as HistoryIcon } from "./History-99015955.mjs";
import { g as getGenreLink, h as hasNextPage, f as useChannelQueryParams, i as channelQueryKey, j as channelEndpoint, N as NameWithAvatar, M as MoreVertIcon, k as NameWithAvatarPlaceholder, T as TrendingUpIcon, l as useSlider, S as Slider, G as GenreLink, C as CHANNEL_MODEL, e as useChannel, c as GridViewIcon, I as ImageZoomDialog, a as artistPageTabs, d as useIsTouchDevice, b as useDeleteComments } from "./use-channel-9a9adc56.mjs";
import { hashKey, useInfiniteQuery, keepPreviousData, useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useVirtualizer, observeElementOffset } from "@tanstack/react-virtual";
import { getScrollParent, useObjectRef, useGlobalListeners, mergeProps, useLayoutEffect as useLayoutEffect$1 } from "@react-aria/utils";
import { flushSync } from "react-dom";
import { useInteractOutside } from "@react-aria/interactions";
import debounce from "just-debounce-it";
import dot from "dot-object";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import fscreen from "fscreen";
import memoize from "nano-memoize";
import linkifyStr from "linkify-string";
import { FocusScope } from "@react-aria/focus";
import { E as EditIcon } from "./Edit-f0b99a84.mjs";
import { useController, useForm } from "react-hook-form";
function InfiniteScrollSentinel({
  query: { isInitialLoading, fetchNextPage, isFetchingNextPage, hasNextPage: hasNextPage2 },
  children,
  loaderMarginTop = "mt-24",
  style,
  className,
  variant: _variant = "infiniteScroll",
  loadMoreExtraContent,
  size = "md"
}) {
  const sentinelRef = useRef(null);
  const isLoading = isFetchingNextPage || isInitialLoading;
  const [loadMoreClickCount, setLoadMoreClickCount] = useState(0);
  const innerVariant = _variant === "loadMore" && loadMoreClickCount < 3 ? "loadMore" : "infiniteScroll";
  useEffect(() => {
    const sentinelEl = sentinelRef.current;
    if (!sentinelEl || innerVariant === "loadMore")
      return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage2 && !isLoading) {
        fetchNextPage();
      }
    });
    observer.observe(sentinelEl);
    return () => {
      observer.unobserve(sentinelEl);
    };
  }, [fetchNextPage, hasNextPage2, isLoading, innerVariant]);
  let content;
  if (children) {
    content = isFetchingNextPage ? children : null;
  } else if (innerVariant === "loadMore") {
    content = !isInitialLoading && hasNextPage2 && /* @__PURE__ */ jsxs("div", { className: clsx("flex items-center gap-8", loaderMarginTop), children: [
      loadMoreExtraContent,
      /* @__PURE__ */ jsx(
        Button,
        {
          size: size === "md" ? "sm" : "xs",
          className: clsx(
            size === "sm" ? "min-h-24 min-w-96" : "min-h-36 min-w-112"
          ),
          variant: "outline",
          color: "primary",
          onClick: () => {
            fetchNextPage();
            setLoadMoreClickCount(loadMoreClickCount + 1);
          },
          disabled: isLoading,
          children: loadMoreClickCount >= 2 && !isFetchingNextPage ? /* @__PURE__ */ jsx(Trans, { message: "Load all" }) : /* @__PURE__ */ jsx(Trans, { message: "Show more" })
        }
      )
    ] });
  } else {
    content = /* @__PURE__ */ jsx(AnimatePresence, { children: isFetchingNextPage && /* @__PURE__ */ jsx(
      m.div,
      {
        className: clsx("flex justify-center w-full", loaderMarginTop),
        ...opacityAnimation,
        children: /* @__PURE__ */ jsx(ProgressCircle, { size, isIndeterminate: true, "aria-label": "loading" })
      }
    ) });
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style,
      className: clsx("w-full", className, hasNextPage2 && "min-h-36"),
      role: "presentation",
      children: [
        /* @__PURE__ */ jsx("div", { ref: sentinelRef, "aria-hidden": true }),
        content
      ]
    }
  );
}
function LikeIconButton({
  likeable,
  size = "sm",
  ...buttonProps
}) {
  const authHandler = useAuthClickCapture();
  const addToLibrary = useAddItemsToLibrary();
  const removeFromLibrary = useRemoveItemsFromLibrary();
  const isLiked = useLibraryStore((s) => s.has(likeable));
  const isLoading = addToLibrary.isPending || removeFromLibrary.isPending;
  if (isLiked) {
    return /* @__PURE__ */ jsx(
      IconButton,
      {
        ...buttonProps,
        size,
        color: "primary",
        disabled: isLoading,
        onClickCapture: authHandler,
        onClick: (e) => {
          e.stopPropagation();
          removeFromLibrary.mutate({ likeables: [likeable] });
        },
        children: /* @__PURE__ */ jsx(FavoriteIcon, {})
      }
    );
  }
  return /* @__PURE__ */ jsx(
    IconButton,
    {
      ...buttonProps,
      size,
      disabled: isLoading,
      onClickCapture: authHandler,
      onClick: (e) => {
        e.stopPropagation();
        addToLibrary.mutate({ likeables: [likeable] });
      },
      children: /* @__PURE__ */ jsx(FavoriteBorderIcon, {})
    }
  );
}
function ArtistGridItem({
  artist,
  radius = "rounded-full"
}) {
  return /* @__PURE__ */ jsx(
    PlayableGridItem,
    {
      image: /* @__PURE__ */ jsx(SmallArtistImage, { artist }),
      title: /* @__PURE__ */ jsx(ArtistLink, { artist }),
      model: artist,
      link: getArtistLink(artist),
      likeButton: /* @__PURE__ */ jsx(LikeIconButton, { likeable: artist }),
      contextDialog: /* @__PURE__ */ jsx(ArtistContextDialog, { artist }),
      radius
    }
  );
}
function AlbumGridItem({ album }) {
  return /* @__PURE__ */ jsx(
    PlayableGridItem,
    {
      image: /* @__PURE__ */ jsx(AlbumImage, { album }),
      title: /* @__PURE__ */ jsx(AlbumLink, { album }),
      subtitle: /* @__PURE__ */ jsx(ArtistLinks, { artists: album.artists }),
      link: getAlbumLink(album),
      likeButton: /* @__PURE__ */ jsx(LikeIconButton, { likeable: album }),
      model: album,
      contextDialog: /* @__PURE__ */ jsx(AlbumContextDialog, { album })
    }
  );
}
function GenreImage({ genre, className, size }) {
  const { trans } = useTrans();
  const src = genre.image;
  const imgClassName = clsx(
    className,
    size,
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
      alt: trans(message("Image for :name", { values: { name: genre.name } }))
    }
  ) : /* @__PURE__ */ jsx("span", { className: clsx(imgClassName, "overflow-hidden"), children: /* @__PURE__ */ jsx(LabelIcon, { className: "max-w-[60%] text-divider", size: "text-9xl" }) });
}
function GenreGridItem({ genre }) {
  return /* @__PURE__ */ jsxs(
    Link,
    {
      to: getGenreLink(genre),
      className: "relative isolate block h-max cursor-pointer overflow-hidden rounded-panel after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-black/50",
      children: [
        /* @__PURE__ */ jsx(GenreImage, { genre, className: "aspect-square w-full shadow-md" }),
        /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-1/2 z-20 max-w-[86%] -translate-x-1/2 -translate-y-1/2 overflow-hidden overflow-ellipsis whitespace-nowrap text-xl font-semibold capitalize text-white", children: /* @__PURE__ */ jsx(Trans, { message: genre.display_name || genre.name }) })
      ]
    }
  );
}
function TrackGridItem({ track, newQueue }) {
  return /* @__PURE__ */ jsx(
    PlayableGridItem,
    {
      image: /* @__PURE__ */ jsx(TrackImage, { track }),
      title: /* @__PURE__ */ jsx(TrackLink, { track }),
      subtitle: /* @__PURE__ */ jsx(ArtistLinks, { artists: track.artists }),
      link: getTrackLink(track),
      likeButton: /* @__PURE__ */ jsx(LikeIconButton, { likeable: track }),
      model: track,
      newQueue,
      contextDialog: /* @__PURE__ */ jsx(TrackContextDialog, { tracks: [track] })
    }
  );
}
function UserGridItem({ user }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Link, { to: getUserProfileLink(user), children: /* @__PURE__ */ jsx(
      UserImage,
      {
        user,
        className: "shadow-md w-full aspect-square rounded"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "text-sm mt-12", children: [
      /* @__PURE__ */ jsx("div", { className: "overflow-hidden overflow-ellipsis", children: /* @__PURE__ */ jsx(Link, { to: getUserProfileLink(user), children: user.display_name }) }),
      user.followers_count ? /* @__PURE__ */ jsx("div", { className: "text-muted mt-4 whitespace-nowrap overflow-hidden overflow-ellipsis", children: /* @__PURE__ */ jsx(
        Trans,
        {
          message: ":count followers",
          values: { count: user.followers_count }
        }
      ) }) : null
    ] })
  ] });
}
function ChannelContentGridItem({ item, items }) {
  switch (item.model_type) {
    case ARTIST_MODEL:
      return /* @__PURE__ */ jsx(ArtistGridItem, { artist: item });
    case ALBUM_MODEL:
      return /* @__PURE__ */ jsx(AlbumGridItem, { album: item });
    case GENRE_MODEL:
      return /* @__PURE__ */ jsx(GenreGridItem, { genre: item });
    case TRACK_MODEL:
      return /* @__PURE__ */ jsx(TrackGridItem, { track: item, newQueue: items });
    case PLAYLIST_MODEL:
      return /* @__PURE__ */ jsx(PlaylistGridItem, { playlist: item });
    case USER_MODEL:
      return /* @__PURE__ */ jsx(UserGridItem, { user: item });
    default:
      return null;
  }
}
const AntennaIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M12 7.5c.69 0 1.27.23 1.76.7s.74 1.07.74 1.8c0 1.05-.5 1.81-1.5 2.28V21h-2v-8.72c-1-.47-1.5-1.23-1.5-2.28 0-.73.26-1.33.74-1.8s1.07-.7 1.76-.7m4.69-2.2c1.25 1.25 1.92 2.81 2.01 4.7 0 1.8-.67 3.38-2.01 4.72L15.5 13.5c1-.91 1.5-2.08 1.5-3.5 0-1.33-.5-2.5-1.5-3.5l1.19-1.2M6.09 4.08C4.5 5.67 3.7 7.64 3.7 10s.8 4.3 2.39 5.89l-1.17 1.22C3 15.08 2 12.7 2 10s1-5.06 2.92-7.09l1.17 1.17m12.99-1.17C21 4.94 22 7.3 22 10c0 2.8-1 5.17-2.92 7.11l-1.17-1.22C19.5 14.3 20.3 12.33 20.3 10s-.8-4.33-2.39-5.92l1.17-1.17M7.31 5.3L8.5 6.5C7.5 7.42 7 8.58 7 10c0 1.33.5 2.5 1.5 3.5l-1.19 1.22C5.97 13.38 5.3 11.8 5.3 10c0-1.8.67-3.36 2.01-4.7z" }),
  "Radio"
);
function ChannelHeading({
  channel,
  isNested,
  margin = isNested ? "mb-16 md:mb-20" : "mb-20 md:mb-40"
}) {
  var _a2;
  const shouldShowRadio = useShouldShowRadioButton();
  if (channel.config.hideTitle) {
    return null;
  }
  if (!isNested) {
    if (shouldShowRadio && ((_a2 = channel.restriction) == null ? void 0 : _a2.model_type) === "genre") {
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: clsx("flex items-center justify-between gap-24", margin),
          children: [
            /* @__PURE__ */ jsx("h1", { className: "flex-auto text-3xl", children: /* @__PURE__ */ jsx(Trans, { message: channel.name }) }),
            /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Genre radio" }), children: /* @__PURE__ */ jsx(
              IconButton,
              {
                className: "flex-shrink-0",
                elementType: Link,
                to: getRadioLink(channel.restriction),
                children: /* @__PURE__ */ jsx(AntennaIcon, {})
              }
            ) })
          ]
        }
      );
    }
    return /* @__PURE__ */ jsx("h1", { className: clsx("text-3xl", margin), children: /* @__PURE__ */ jsx(Trans, { message: channel.name }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: clsx("flex items-center gap-4 text-xl", margin), children: [
    /* @__PURE__ */ jsx(NestedChannelLink, { channel }),
    /* @__PURE__ */ jsx(KeyboardArrowRightIcon, { className: "mt-4" })
  ] });
}
function NestedChannelLink({ channel }) {
  const { restriction: genreName } = useParams();
  return /* @__PURE__ */ jsx(
    Link,
    {
      className: "outline-none hover:underline focus-visible:underline",
      to: channel.config.restriction === "genre" && genreName ? `/${channel.slug}/${genreName}` : `/${channel.slug}`,
      children: /* @__PURE__ */ jsx(Trans, { message: channel.name })
    }
  );
}
function buildQueryKey({
  queryKey: queryKey2,
  defaultOrderDir,
  defaultOrderBy,
  queryParams
}, sortDescriptor, searchQuery = "") {
  if (!sortDescriptor.orderBy) {
    sortDescriptor.orderBy = defaultOrderBy;
  }
  if (!sortDescriptor.orderDir) {
    sortDescriptor.orderDir = defaultOrderDir;
  }
  return [...queryKey2, sortDescriptor, searchQuery, queryParams];
}
function useInfiniteData(props) {
  var _a2, _b2, _c, _d;
  const {
    initialPage,
    endpoint: endpoint2,
    defaultOrderBy,
    defaultOrderDir,
    queryParams,
    paginate,
    transformResponse,
    willSortOrFilter = false
  } = props;
  const [searchQuery, setSearchQuery] = useState("");
  const [sortDescriptor, setSortDescriptor] = useState({
    orderBy: defaultOrderBy,
    orderDir: defaultOrderDir
  });
  const queryKey2 = buildQueryKey(props, sortDescriptor, searchQuery);
  const initialQueryKey = useRef(hashKey(queryKey2)).current;
  const query = useInfiniteQuery({
    placeholderData: willSortOrFilter ? keepPreviousData : void 0,
    queryKey: queryKey2,
    queryFn: ({ pageParam, signal }) => {
      const params = {
        ...queryParams,
        perPage: (initialPage == null ? void 0 : initialPage.per_page) || (queryParams == null ? void 0 : queryParams.perPage),
        query: (queryParams == null ? void 0 : queryParams.query) ?? searchQuery,
        paginate,
        ...sortDescriptor
      };
      if (paginate === "cursor") {
        params.cursor = pageParam;
      } else {
        params.page = pageParam || 1;
      }
      return fetchData(endpoint2, params, transformResponse, signal);
    },
    initialPageParam: paginate === "cursor" ? "" : 1,
    getNextPageParam: (lastResponse) => {
      if (!hasNextPage(lastResponse.pagination)) {
        return null;
      }
      if ("next_cursor" in lastResponse.pagination) {
        return lastResponse.pagination.next_cursor;
      }
      return lastResponse.pagination.current_page + 1;
    },
    initialData: () => {
      if (!initialPage || hashKey(queryKey2) !== initialQueryKey) {
        return void 0;
      }
      return {
        pageParams: [void 0, 1],
        pages: [{ pagination: initialPage }]
      };
    }
  });
  const items = useMemo(() => {
    var _a3;
    return ((_a3 = query.data) == null ? void 0 : _a3.pages.flatMap((p) => p.pagination.data)) || [];
  }, [(_a2 = query.data) == null ? void 0 : _a2.pages]);
  const firstPage = (_b2 = query.data) == null ? void 0 : _b2.pages[0].pagination;
  const totalItems = firstPage && "total" in firstPage && firstPage.total ? firstPage.total : null;
  return {
    ...query,
    items,
    totalItems,
    noResults: ((_d = (_c = query.data) == null ? void 0 : _c.pages) == null ? void 0 : _d[0].pagination.data.length) === 0,
    // can't use "isRefetching", it's true for some reason when changing sorting or filters
    isReloading: query.isFetching && !query.isFetchingNextPage && query.isPlaceholderData,
    sortDescriptor,
    setSortDescriptor,
    searchQuery,
    setSearchQuery
  };
}
async function fetchData(endpoint2, params, transformResponse, signal) {
  if (params.query) {
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  return apiClient.get(endpoint2, { params, signal: params.query ? signal : void 0 }).then((r) => {
    if (transformResponse) {
      return transformResponse(r.data);
    }
    return r.data;
  });
}
function usePaginatedChannelContent(channel) {
  const queryParams = useChannelQueryParams(channel);
  return useInfiniteData({
    willSortOrFilter: true,
    initialPage: channel.content,
    queryKey: channelQueryKey(channel.id),
    endpoint: channelEndpoint(channel.id),
    paginate: "simple",
    queryParams: {
      returnContentOnly: "true",
      ...queryParams
    }
  });
}
function useChannelContent(channel) {
  const queryParams = useChannelQueryParams(channel);
  const queryKey2 = channelQueryKey(channel.id, queryParams);
  const initialQueryKey = useRef(hashKey(queryKey2)).current;
  return useQuery({
    queryKey: channelQueryKey(channel.id, queryParams),
    queryFn: () => fetchChannelContent(channel.id, queryParams),
    placeholderData: keepPreviousData,
    initialData: () => {
      var _a2;
      if (hashKey(queryKey2) === initialQueryKey) {
        return (_a2 = channel.content) == null ? void 0 : _a2.data;
      }
      return void 0;
    }
  });
}
function fetchChannelContent(slugOrId, params) {
  return apiClient.get(channelEndpoint(slugOrId), {
    params: {
      ...params,
      paginate: "simple",
      returnContentOnly: "true"
    }
  }).then((response) => response.data.pagination.data);
}
function ChannelContentGrid(props) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ChannelHeading, { ...props }),
    props.isNested ? /* @__PURE__ */ jsx(SimpleGrid, { ...props }) : /* @__PURE__ */ jsx(PaginatedGrid, { ...props })
  ] });
}
function SimpleGrid({ channel }) {
  const { data } = useChannelContent(channel);
  return /* @__PURE__ */ jsx(ContentGrid, { children: data == null ? void 0 : data.map((item) => /* @__PURE__ */ jsx(
    ChannelContentGridItem,
    {
      item,
      items: data
    },
    `${item.id}-${item.model_type}`
  )) });
}
function PaginatedGrid({ channel }) {
  const query = usePaginatedChannelContent(channel);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(ContentGrid, { children: query.items.map((item) => /* @__PURE__ */ jsx(
      ChannelContentGridItem,
      {
        item,
        items: query.items
      },
      `${item.id}-${item.model_type}`
    )) }),
    /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query })
  ] });
}
const stableObj = {};
function useTrackTableMeta() {
  const { meta } = useContext(TableContext);
  return meta || stableObj;
}
function useIsTrackCued(trackId, groupId) {
  return usePlayerStore((s) => {
    var _a2, _b2;
    if (!((_a2 = s.cuedMedia) == null ? void 0 : _a2.meta.id) || s.cuedMedia.meta.id !== trackId) {
      return false;
    }
    if (!((_b2 = s.cuedMedia) == null ? void 0 : _b2.groupId) && !groupId) {
      return true;
    }
    if (groupId && s.cuedMedia.groupId === groupId) {
      return true;
    }
    return false;
  });
}
function useIsTrackPlaying(trackId, groupId) {
  const isCued = useIsTrackCued(trackId, groupId);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  return isCued && isPlaying;
}
function TogglePlaybackColumn({
  track,
  rowIndex,
  isHovered
}) {
  const { queueGroupId: queueGroupId2 } = useTrackTableMeta();
  const isPlaying = useIsTrackPlaying(track.id, queueGroupId2);
  const isCued = useIsTrackCued(track.id, queueGroupId2);
  return /* @__PURE__ */ jsx("div", { className: "w-24 h-24 text-center", children: isHovered || isPlaying ? /* @__PURE__ */ jsx(
    TogglePlaybackButton,
    {
      track,
      trackIndex: rowIndex,
      isPlaying
    }
  ) : /* @__PURE__ */ jsx("span", { className: clsx(isCued ? "text-primary" : "text-muted"), children: rowIndex + 1 }) });
}
function TogglePlaybackButton({
  track,
  trackIndex,
  isPlaying
}) {
  const { trans } = useTrans();
  const player = usePlayerActions();
  const { data } = useContext(TableContext);
  const { queueGroupId: queueGroupId2 } = useTrackTableMeta();
  const [isHover, setHover] = useState(false);
  if (isPlaying) {
    return /* @__PURE__ */ jsx(
      "button",
      {
        onPointerEnter: () => setHover(true),
        onPointerLeave: () => setHover(false),
        "aria-label": trans(message("Pause :name", { values: { name: track.name } })),
        tabIndex: 0,
        onClick: (e) => {
          e.stopPropagation();
          player.pause();
        },
        children: isHover ? /* @__PURE__ */ jsx(PauseIcon, {}) : /* @__PURE__ */ jsx(EqualizerImage, {})
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "button",
    {
      "aria-label": trans(message("Play :name", { values: { name: track.name } })),
      tabIndex: 0,
      onClick: async (e) => {
        e.stopPropagation();
        const newQueue = data.map(
          (d) => trackToMediaItem(d, queueGroupId2)
        );
        player.overrideQueueAndPlay(newQueue, trackIndex);
      },
      children: /* @__PURE__ */ jsx(PlayArrowFilledIcon, {})
    }
  );
}
function TrackNameColumn({ track }) {
  var _a2;
  const { hideTrackImage, queueGroupId: queueGroupId2 } = useTrackTableMeta();
  const isCued = useIsTrackCued(track.id, queueGroupId2);
  return /* @__PURE__ */ jsx(
    NameWithAvatar,
    {
      image: !hideTrackImage ? getTrackImageSrc(track) : void 0,
      label: track.name,
      avatarSize: "w-40 h-40 md:w-32 md:h-32",
      description: /* @__PURE__ */ jsx("span", { className: "md:hidden", children: (_a2 = track.artists) == null ? void 0 : _a2.map((a) => a.name).join(", ") }),
      labelClassName: clsx(
        isCued && "text-primary",
        "max-md:text-[15px] max-md:leading-6"
      )
    }
  );
}
function TableTrackContextDialog({
  children,
  ...props
}) {
  const { selectedRows, data } = useContext(TableContext);
  const tracks = useMemo(() => {
    return selectedRows.map((trackId) => data.find((track) => track.id === trackId)).filter((t) => !!t);
  }, [selectedRows, data]);
  return /* @__PURE__ */ jsx(TrackContextDialog, { ...props, tracks, children });
}
function useRemoveTracksFromPlaylist() {
  return useMutation({
    mutationFn: (payload) => removeTracks(payload),
    onSuccess: (response, { tracks }) => {
      toast(
        message("Removed [one 1 track|other :count tracks] from playlist", {
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
function removeTracks(payload) {
  const backendPayload = {
    ids: payload.tracks.map((track) => track.id)
  };
  return apiClient.post(`playlists/${payload.playlistId}/tracks/remove`, backendPayload).then((r) => r.data);
}
function PlaylistTrackContextDialog({
  playlist,
  ...props
}) {
  return /* @__PURE__ */ jsx(TableTrackContextDialog, { ...props, children: (tracks) => /* @__PURE__ */ jsx(RemoveFromPlaylistMenuItem, { playlist, tracks }) });
}
function RemoveFromPlaylistMenuItem({
  playlist,
  tracks
}) {
  const { user } = useAuth();
  const removeTracks2 = useRemoveTracksFromPlaylist();
  const { close: closeMenu } = useDialogContext();
  const canRemove = playlist.owner_id === (user == null ? void 0 : user.id) || playlist.collaborative;
  if (!canRemove) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    ContextMenuButton,
    {
      onClick: () => {
        if (!removeTracks2.isPending) {
          removeTracks2.mutate({ playlistId: playlist.id, tracks });
          closeMenu();
        }
      },
      children: /* @__PURE__ */ jsx(Trans, { message: "Remove from this playlist" })
    }
  );
}
function TrackOptionsColumn({ track, isHovered }) {
  const isMobile = useIsMobileMediaQuery();
  const { meta } = useContext(TableContext);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(DialogTrigger, { type: "popover", mobileType: "tray", children: [
      /* @__PURE__ */ jsx(
        IconButton,
        {
          size: isMobile ? "sm" : "md",
          className: clsx(
            isMobile ? "text-muted" : "mr-8",
            !isMobile && !isHovered && "invisible"
          ),
          children: isMobile ? /* @__PURE__ */ jsx(MoreVertIcon, {}) : /* @__PURE__ */ jsx(MoreHorizIcon, {})
        }
      ),
      /* @__PURE__ */ jsx(TrackContextDialog, { tracks: [track], children: (tracks) => meta.playlist ? /* @__PURE__ */ jsx(
        RemoveFromPlaylistMenuItem,
        {
          playlist: meta.playlist,
          tracks
        }
      ) : null })
    ] }),
    !isMobile && /* @__PURE__ */ jsx(LikeIconButton, { size: "xs", likeable: track })
  ] });
}
const columnConfig = [
  {
    key: "index",
    header: () => /* @__PURE__ */ jsx("span", { children: "#" }),
    align: "center",
    width: "w-24 flex-shrink-0",
    body: (track, row) => {
      if (row.isPlaceholder) {
        return /* @__PURE__ */ jsx(Skeleton, { size: "w-20 h-20", variant: "rect" });
      }
      return /* @__PURE__ */ jsx(
        TogglePlaybackColumn,
        {
          track,
          rowIndex: row.index,
          isHovered: row.isHovered
        }
      );
    }
  },
  {
    key: "name",
    allowsSorting: true,
    width: "flex-3 min-w-224",
    visibleInMode: "all",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Title" }),
    body: (track, row) => {
      if (row.isPlaceholder) {
        return /* @__PURE__ */ jsx(NameWithAvatarPlaceholder, { showDescription: false });
      }
      return /* @__PURE__ */ jsx(TrackNameColumn, { track });
    }
  },
  {
    key: "artist",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Artist" }),
    width: "flex-2",
    body: (track, row) => {
      if (row.isPlaceholder) {
        return /* @__PURE__ */ jsx(Skeleton, { className: "max-w-4/5 leading-3" });
      }
      return /* @__PURE__ */ jsx(ArtistLinks, { artists: track.artists });
    }
  },
  {
    key: "album_name",
    allowsSorting: true,
    width: "flex-2",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Album" }),
    body: (track, row) => {
      if (row.isPlaceholder) {
        return /* @__PURE__ */ jsx(Skeleton, { className: "max-w-4/5 leading-3" });
      }
      return track.album ? /* @__PURE__ */ jsx(AlbumLink, { album: track.album }) : null;
    }
  },
  {
    key: "added_at",
    sortingKey: "likes.created_at",
    allowsSorting: true,
    maxWidth: "max-w-112",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Date added" }),
    body: (track, row) => {
      if (row.isPlaceholder) {
        return /* @__PURE__ */ jsx(Skeleton, { className: "max-w-4/5 leading-3" });
      }
      return /* @__PURE__ */ jsx(FormattedRelativeTime, { date: track.added_at });
    }
  },
  {
    key: "options",
    align: "end",
    width: "w-36 md:w-84",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Options" }),
    hideHeader: true,
    visibleInMode: "all",
    body: (track, row) => {
      if (row.isPlaceholder) {
        return /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(Skeleton, { size: "w-20 h-20", variant: "rect" }) });
      }
      return /* @__PURE__ */ jsx(TrackOptionsColumn, { track, isHovered: row.isHovered });
    }
  },
  {
    key: "duration",
    allowsSorting: true,
    className: "text-muted",
    maxWidth: "max-w-48",
    align: "end",
    header: () => /* @__PURE__ */ jsx(ScheduleIcon, {}),
    body: (track, row) => {
      if (row.isPlaceholder) {
        return /* @__PURE__ */ jsx(Skeleton, { className: "leading-3" });
      }
      return track.duration ? /* @__PURE__ */ jsx(FormattedDuration, { ms: track.duration }) : null;
    }
  },
  {
    key: "popularity",
    allowsSorting: true,
    className: "text-muted",
    maxWidth: "max-w-54",
    header: () => /* @__PURE__ */ jsx(TrendingUpIcon, {}),
    body: (track, row) => {
      if (row.isPlaceholder) {
        return /* @__PURE__ */ jsx(Skeleton, { className: "leading-3" });
      }
      return /* @__PURE__ */ jsx("div", { className: "relative h-6 w-full bg-chip", children: /* @__PURE__ */ jsx(
        "div",
        {
          style: { width: `${track.popularity || 50}%` },
          className: "absolute left-0 top-0 h-full w-0 bg-black/30 dark:bg-white/30"
        }
      ) });
    }
  }
];
function TrackTable({
  tracks,
  hideArtist = false,
  hideAlbum = false,
  hideHeaderRow = false,
  hideTrackImage = false,
  hidePopularity = true,
  hideAddedAtColumn = true,
  queueGroupId: queueGroupId2,
  renderRowAs,
  playlist,
  ...tableProps
}) {
  const player = usePlayerActions();
  const isMobile = useIsMobileDevice();
  hideHeaderRow = hideHeaderRow || isMobile;
  const filteredColumns = useMemo(() => {
    return columnConfig.filter((col) => {
      if (col.key === "artist" && hideArtist) {
        return false;
      }
      if (col.key === "album_name" && hideAlbum) {
        return false;
      }
      if (col.key === "popularity" && hidePopularity) {
        return false;
      }
      if (col.key === "added_at" && hideAddedAtColumn) {
        return false;
      }
      return true;
    });
  }, [hideArtist, hideAlbum, hidePopularity, hideAddedAtColumn]);
  const meta = useMemo(() => {
    return { queueGroupId: queueGroupId2, hideTrackImage, playlist };
  }, [queueGroupId2, hideTrackImage, playlist]);
  return /* @__PURE__ */ jsx(
    Table,
    {
      closeOnInteractOutside: true,
      hideHeaderRow,
      selectionStyle: "highlight",
      selectRowOnContextMenu: true,
      renderRowAs: renderRowAs || TrackTableRowWithContextMenu,
      columns: filteredColumns,
      data: tracks,
      meta,
      hideBorder: isMobile,
      onAction: (track, index) => {
        const newQueue = tracks.map(
          (d) => trackToMediaItem(d, queueGroupId2)
        );
        player.overrideQueueAndPlay(newQueue, index);
      },
      ...tableProps
    }
  );
}
function TrackTableRowWithContextMenu({
  item,
  children,
  ...domProps
}) {
  const row = /* @__PURE__ */ jsx("div", { ...domProps, children });
  if (item.isPlaceholder) {
    return row;
  }
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "popover",
      mobileType: "tray",
      triggerOnContextMenu: true,
      placement: "bottom-start",
      children: [
        row,
        /* @__PURE__ */ jsx(TableTrackContextDialog, {})
      ]
    }
  );
}
function VirtualTableBody({
  renderRowAs,
  totalItems = 0,
  query
}) {
  const { data } = useContext(TableContext);
  const placeholderRowCount = totalItems <= 0 ? 10 : Math.min(totalItems - data.length, 10);
  return totalItems < 91 ? /* @__PURE__ */ jsx(
    Body,
    {
      placeholderRowCount,
      renderRowAs,
      query
    }
  ) : /* @__PURE__ */ jsx(
    VirtualizedBody,
    {
      placeholderRowCount,
      renderRowAs,
      query
    }
  );
}
function Body({ renderRowAs, placeholderRowCount, query }) {
  const { data } = useContext(TableContext);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    data.map((track, index) => /* @__PURE__ */ jsx(
      TableRow,
      {
        item: track,
        index,
        renderAs: renderRowAs
      },
      track.id
    )),
    /* @__PURE__ */ jsx(
      Sentinel,
      {
        dataCount: data.length,
        placeholderRowCount,
        query
      }
    )
  ] });
}
function VirtualizedBody({ renderRowAs, placeholderRowCount, query }) {
  var _a2;
  const { data } = useContext(TableContext);
  const bodyRef = useRef(null);
  const scrollableRef = useRef(null);
  const scrollOffset = useRef(0);
  const getScrollElement = () => {
    if (scrollableRef.current) {
      return scrollableRef.current;
    }
    if (bodyRef.current) {
      scrollableRef.current = getScrollParent(bodyRef.current);
    }
    return scrollableRef.current;
  };
  useEffect(() => {
    if (bodyRef.current) {
      scrollOffset.current = bodyRef.current.getBoundingClientRect().top + getScrollElement().scrollTop;
    }
  }, [bodyRef]);
  const virtualizer = useVirtualizer({
    overscan: 10,
    count: data.length,
    getScrollElement,
    estimateSize: () => 48,
    // getScrollElement: () => scrollableRef.current,
    observeElementOffset: (instance, cb) => {
      return observeElementOffset(instance, (offset, isScrolling) => {
        cb(offset, isScrolling);
      });
    }
  });
  const virtualRows = virtualizer.getVirtualItems();
  const virtualHeight = `${virtualizer.getTotalSize() + // if showing placeholder rows, extended height of virtual list to show them
  (query.isFetchingNextPage ? placeholderRowCount * 48 : 0)}px`;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: bodyRef,
      role: "presentation",
      className: "relative w-full",
      style: {
        height: virtualHeight
      },
      children: [
        virtualRows.map((virtualItem) => {
          const item = data[virtualItem.index];
          return /* @__PURE__ */ jsx(
            TableRow,
            {
              item,
              index: virtualItem.index,
              renderAs: renderRowAs,
              className: "absolute left-0 top-0 w-full",
              style: {
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`
              }
            },
            item.id
          );
        }),
        /* @__PURE__ */ jsx(
          Sentinel,
          {
            dataCount: ((_a2 = virtualizer.range) == null ? void 0 : _a2.endIndex) ?? 0,
            placeholderRowCount,
            query,
            style: {
              top: `${virtualizer.getTotalSize()}px`
            }
          }
        )
      ]
    }
  );
}
function Sentinel({
  dataCount,
  placeholderRowCount,
  renderRowAs,
  query,
  style
}) {
  return /* @__PURE__ */ jsx(
    InfiniteScrollSentinel,
    {
      query,
      style,
      loaderMarginTop: "mt-0",
      className: "absolute left-0",
      children: [...new Array(Math.max(placeholderRowCount, 1)).keys()].map(
        (key, index) => {
          const id = `placeholder-${key}`;
          return /* @__PURE__ */ jsx(
            TableRow,
            {
              item: { id, isPlaceholder: true },
              index: dataCount + index,
              renderAs: renderRowAs
            },
            id
          );
        }
      )
    }
  );
}
function ChannelTrackTable(props) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ChannelHeading, { ...props }),
    props.isNested ? /* @__PURE__ */ jsx(SimpleTable, { ...props }) : /* @__PURE__ */ jsx(PaginatedTable, { ...props })
  ] });
}
function SimpleTable({ channel }) {
  var _a2;
  return /* @__PURE__ */ jsx(TrackTable, { tracks: ((_a2 = channel.content) == null ? void 0 : _a2.data) || [], enableSorting: false });
}
function PaginatedTable({ channel }) {
  const query = usePaginatedChannelContent(channel);
  const totalItems = channel.content && "total" in channel.content ? channel.content.total : void 0;
  return /* @__PURE__ */ jsx(
    TrackTable,
    {
      enableSorting: false,
      tracks: query.items,
      tableBody: /* @__PURE__ */ jsx(VirtualTableBody, { query, totalItems })
    }
  );
}
function drawAnimation(waveData, canvas, color, barWidth, barSpacing) {
  const context = canvas.getContext("2d");
  if (!context)
    return;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = color;
  waveData.forEach((lineData, index) => {
    const x = lineData[0] + (barWidth + barSpacing) * index;
    const barHeight = lineData[1];
    const barTopX = x + barWidth / 2;
    const barTopY = canvas.height - barHeight;
    context.beginPath();
    context.moveTo(x, canvas.height);
    context.lineTo(x, barTopY);
    context.arc(barTopX, barTopY, barWidth / 2, Math.PI, 0, false);
    context.lineTo(x + barWidth, canvas.height);
    context.closePath();
    context.fill();
  });
}
function queryKey(trackId) {
  return ["tracks", +trackId, "wave-data"];
}
function invalidateWaveData(trackId) {
  queryClient.invalidateQueries({ queryKey: queryKey(trackId) });
}
function useTrackWaveData(trackId, { enabled } = {}) {
  return useQuery({
    queryKey: queryKey(trackId),
    queryFn: () => fetchWaveData(trackId),
    enabled
  });
}
function fetchWaveData(trackId) {
  return apiClient.get(`tracks/${trackId}/wave`).then((response) => response.data);
}
function drawWaveform(waveData, canvas, color, barWidth, barSpacing, audioUrl, analyzerData) {
  var _a2;
  const context = canvas.getContext("2d");
  if (!context)
    return;
  let source = null;
  let animationFrame = null;
  if (analyzerData && analyzerData.audioCtx) {
    source = analyzerData.audioCtx.createBufferSource() || null;
  }
  function draw() {
    if (!context)
      return;
    if (analyzerData) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = color;
      context.globalAlpha = 1;
      waveData.forEach((lineData, index) => {
        const x = lineData[0] + (barWidth + barSpacing) * index;
        const barHeight = analyzerData.dataArray[index] / 256 * canvas.height;
        context.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      });
      animationFrame = requestAnimationFrame(draw);
    }
  }
  function updateAnimationTime() {
    var _a3;
    if (analyzerData && analyzerData.audioCtx) {
      const currentTime = (_a3 = analyzerData.audioCtx) == null ? void 0 : _a3.currentTime;
      const animationTime = currentTime % source.buffer.duration / source.buffer.duration;
      const animationFrameTime = animationTime * 1e3;
      animationFrame = requestAnimationFrame(draw);
      setTimeout(
        () => cancelAnimationFrame(animationFrame),
        animationFrameTime
      );
    }
  }
  draw();
  (_a2 = analyzerData == null ? void 0 : analyzerData.audioCtx) == null ? void 0 : _a2.addEventListener("timeupdate", updateAnimationTime);
  return {};
}
function useTrackSeekbar(track, queue) {
  var _a2;
  const player = usePlayerActions();
  const cuedMedia = usePlayerStore((s) => s.cuedMedia);
  const playerDuration = usePlayerStore((s) => s.mediaDuration);
  const duration = (cuedMedia == null ? void 0 : cuedMedia.id) === track.id && playerDuration ? playerDuration : (track.duration || 0) / 1e3;
  const [currentTime, setCurrentTime] = useState(
    track.id === ((_a2 = player.getState().cuedMedia) == null ? void 0 : _a2.id) ? player.getCurrentTime() : 0
  );
  useEffect(() => {
    return player.subscribe({
      progress: ({ currentTime: currentTime2 }) => {
        var _a3;
        setCurrentTime(
          track.id === ((_a3 = player.getState().cuedMedia) == null ? void 0 : _a3.id) ? currentTime2 : 0
        );
      }
    });
  }, [player, track]);
  return {
    duration,
    minValue: 0,
    maxValue: duration,
    value: currentTime,
    onPointerDown: () => {
      var _a3;
      player.setIsSeeking(true);
      player.pause();
      if (((_a3 = player.getState().cuedMedia) == null ? void 0 : _a3.id) !== track.id) {
        flushSync(() => {
          if (queue == null ? void 0 : queue.length) {
            const pointer = queue == null ? void 0 : queue.findIndex((t) => t.id === track.id);
            player.overrideQueue(tracksToMediaItems(queue), pointer);
          } else {
            player.cue(trackToMediaItem(track));
          }
        });
      }
    },
    onChange: (value) => {
      player.getState().emit("progress", { currentTime: value });
      player.seek(value);
    },
    onChangeEnd: () => {
      player.setIsSeeking(false);
      player.play();
    }
  };
}
const CommentBarContext = createContext(null);
function CommentBarContextProvider({
  children,
  disableCommenting = false
}) {
  const [markerIsVisible, setMarkerIsVisible] = useState(false);
  const newCommentInputRef = useRef(null);
  const newCommentPositionRef = useRef(0);
  const value = useMemo(() => {
    return {
      newCommentInputRef,
      newCommentPositionRef,
      markerIsVisible,
      setMarkerIsVisible,
      disableCommenting
    };
  }, [markerIsVisible, disableCommenting]);
  return /* @__PURE__ */ jsx(CommentBarContext.Provider, { value, children });
}
function CommentBar({ comments, track }) {
  const { user, hasPermission } = useAuth();
  const {
    newCommentInputRef,
    newCommentPositionRef,
    markerIsVisible,
    setMarkerIsVisible,
    ...commentBarContext
  } = useContext(CommentBarContext);
  const disableCommenting = commentBarContext.disableCommenting || !hasPermission("comments.create");
  const { domProps, groupId, trackRef, getThumbPercent } = useSlider({
    onChange: () => {
      setMarkerIsVisible(true);
      newCommentPositionRef.current = getThumbPercent(0) * 100;
    },
    onChangeEnd: () => {
      var _a2;
      (_a2 = newCommentInputRef.current) == null ? void 0 : _a2.focus();
    }
  });
  useInteractOutside({
    ref: trackRef,
    onInteractOutside: (e) => {
      var _a2;
      if (!((_a2 = newCommentInputRef.current) == null ? void 0 : _a2.contains(e.target))) {
        setMarkerIsVisible(false);
      }
    }
  });
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "absolute top-48 left-0 h-26 w-full isolate",
        !disableCommenting && "cursor-pointer"
      ),
      ref: trackRef,
      ...disableCommenting ? {} : domProps,
      id: groupId,
      children: [
        markerIsVisible ? /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute top-0 left-0 z-20 overflow-hidden w-26 h-26 shadow-md -translate-x-1/2 cursor-move",
            style: { left: `${getThumbPercent(0) * 100}%` },
            children: /* @__PURE__ */ jsx(Avatar, { src: user == null ? void 0 : user.avatar, size: "w-full h-full" })
          }
        ) : null,
        comments.map((comment) => {
          if (!comment.user)
            return null;
          return /* @__PURE__ */ jsxs(DialogTrigger, { type: "popover", triggerOnHover: true, children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                style: { left: `${Math.min(99, comment.position || 0)}%` },
                className: clsx(
                  "transition-opacity duration-300 ease-in-out absolute top-0 -translate-x-1/2 cursor-pointer",
                  markerIsVisible ? "opacity-40" : "opacity-100"
                ),
                children: /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "bg-cover w-16 h-16 rounded shadow bg-chip",
                    style: { backgroundImage: `url(${getUserImage(comment.user)})` }
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(CommentDialog, { comment })
          ] }, comment.id);
        })
      ]
    }
  );
}
function CommentDialog({ comment }) {
  return /* @__PURE__ */ jsx(Dialog, { size: "w-auto", children: /* @__PURE__ */ jsx(DialogBody, { padding: "p-8", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-10", children: [
    comment.user && /* @__PURE__ */ jsx("div", { className: "text-primary", children: comment.user.display_name }),
    /* @__PURE__ */ jsx("div", { children: comment.content })
  ] }) }) });
}
const GlobalContext = createContext(void 0);
const useMyContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
};
function generateFakeWaveData(length, amplitude, segments) {
  const waveData = [];
  for (let i = 0; i < segments; i++) {
    const start = i * (length / segments);
    const end = (i + 1) * (length / segments);
    const startAmplitude = (Math.random() * 0.5 + 0.5) * amplitude;
    const endAmplitude = (Math.random() * 0.5 + 0.5) * amplitude;
    waveData.push([start, startAmplitude, end - start, endAmplitude]);
  }
  return waveData;
}
const durationClassName = "text-[11px] absolute bottom-32 p-3 rounded text-white font-semibold z-30 pointer-events-none bg-black/80";
function Waveform({ track, className }) {
  const ref = useRef(null);
  const canvasRef = useRef(null);
  const progressCanvasRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { data } = useTrackWaveData(track.id, { enabled: isInView });
  const themeSelector = useThemeSelector();
  const { analyzerData, setAnalyzerData } = useMyContext();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target === ref.current) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { root: document.body }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const fakeWaveData = generateFakeWaveData(500, 50, 550);
    if (canvasRef.current && progressCanvasRef.current && analyzerData.analyzer) {
      drawWaveform(
        fakeWaveData,
        canvasRef.current,
        "#424242",
        5,
        3,
        track.src,
        analyzerData
      );
      drawWaveform(
        fakeWaveData,
        progressCanvasRef.current,
        themeValueToHex("#fff"),
        5,
        3,
        track.src,
        analyzerData
      );
      setIsVisible(true);
    }
  }, [data == null ? void 0 : data.waveData, themeSelector.selectedTheme, track.src, analyzerData]);
  const { value, onChange, onChangeEnd, duration, ...sliderProps } = useTrackSeekbar(track);
  const { domProps, groupId, thumbIds, trackRef, getThumbPercent } = useSlider({
    ...sliderProps,
    value: [value],
    onChange: ([newValue]) => onChange(newValue),
    onChangeEnd: () => onChangeEnd()
  });
  useEffect(() => {
    const fakeWaveData = generateFakeWaveData(500, 50, 550);
    if (canvasRef.current && !analyzerData.analyzer) {
      drawAnimation(fakeWaveData, canvasRef.current, "#424242", 5, 3);
    }
  }, []);
  return /* @__PURE__ */ jsxs("section", { className: "relative max-w-full", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        id: groupId,
        role: "group",
        ref,
        className: clsx(
          "relative isolate h-70 cursor-pointer overflow-hidden transition-opacity duration-200 ease-in",
          isVisible ? "opacity-100" : "opacity-0",
          className
        ),
        children: [
          /* @__PURE__ */ jsx(
            "output",
            {
              className: clsx(durationClassName, "left-0"),
              htmlFor: thumbIds[0],
              "aria-live": "off",
              children: value ? /* @__PURE__ */ jsx(FormattedDuration, { seconds: value }) : "0:00"
            }
          ),
          /* @__PURE__ */ jsxs("div", { ...domProps, ref: trackRef, children: [
            /* @__PURE__ */ jsx(
              "canvas",
              {
                ref: canvasRef,
                width: WAVE_WIDTH,
                height: WAVE_HEIGHT / 2 + 25
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "absolute left-0 top-0 z-20 w-5 overflow-hidden",
                style: { width: `${getThumbPercent(0) * 100}%` },
                children: /* @__PURE__ */ jsx(
                  "canvas",
                  {
                    ref: progressCanvasRef,
                    width: WAVE_WIDTH,
                    height: WAVE_HEIGHT / 2 + 25,
                    className: "wave-canvas"
                  }
                )
              }
            )
          ] }, "wave"),
          /* @__PURE__ */ jsx("div", { className: clsx(durationClassName, "right-0"), children: /* @__PURE__ */ jsx(FormattedDuration, { seconds: duration }) })
        ]
      }
    ),
    (data == null ? void 0 : data.comments) && /* @__PURE__ */ jsx(CommentBar, { comments: data.comments, track })
  ] });
}
function TrackSeekbar({ track, queue, className }) {
  const { duration, ...sliderProps } = useTrackSeekbar(track, queue);
  return /* @__PURE__ */ jsxs("div", { className: clsx("flex items-center gap-12", className), children: [
    /* @__PURE__ */ jsx("div", { className: "text-xs text-muted flex-shrink-0 min-w-40 text-right", children: sliderProps.value ? /* @__PURE__ */ jsx(FormattedDuration, { seconds: sliderProps.value }) : "0:00" }),
    /* @__PURE__ */ jsx(
      Slider,
      {
        trackColor: "neutral",
        thumbSize: "w-14 h-14",
        showThumbOnHoverOnly: true,
        className: "flex-auto",
        width: "w-auto",
        ...sliderProps
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "text-xs text-muted flex-shrink-0 min-w-40", children: /* @__PURE__ */ jsx(FormattedDuration, { seconds: duration }) })
  ] });
}
function useCreateComment() {
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: (props) => createComment(props),
    onSuccess: async (response, props) => {
      await queryClient2.invalidateQueries({
        queryKey: [
          "comment",
          `${props.commentable.id}-${props.commentable.model_type}`
        ]
      });
      toast(message("Comment posted"));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function createComment({
  commentable,
  content,
  inReplyTo,
  ...other
}) {
  const payload = {
    commentable_id: commentable.id,
    commentable_type: commentable.model_type,
    content,
    inReplyTo,
    ...other
  };
  return apiClient.post("comment", payload).then((r) => r.data);
}
function NewCommentForm({
  commentable,
  inReplyTo,
  onSuccess,
  className,
  autoFocus,
  payload,
  ...props
}) {
  const { trans } = useTrans();
  const { user } = useAuth();
  const createComment2 = useCreateComment();
  const inputRef = useObjectRef(props.inputRef);
  const [inputIsExpanded, setInputIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const clearInput = () => {
    setInputIsExpanded(false);
    if (inputRef.current) {
      inputRef.current.blur();
      setInputValue("");
    }
  };
  return /* @__PURE__ */ jsxs(
    "form",
    {
      className: clsx("py-6 flex gap-24", className),
      onSubmit: (e) => {
        e.preventDefault();
        if (inputValue && !createComment2.isPending) {
          createComment2.mutate(
            {
              ...payload,
              commentable,
              content: inputValue,
              inReplyTo
            },
            {
              onSuccess: () => {
                clearInput();
                onSuccess == null ? void 0 : onSuccess();
              }
            }
          );
        }
      },
      children: [
        /* @__PURE__ */ jsx(Avatar, { size: "xl", circle: true, src: user == null ? void 0 : user.avatar, label: user == null ? void 0 : user.display_name }),
        /* @__PURE__ */ jsxs("div", { className: "flex-auto", children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted mb-10", children: /* @__PURE__ */ jsx(
            Trans,
            {
              message: "Comment as :name",
              values: {
                name: /* @__PURE__ */ jsx("span", { className: "font-medium text", children: user == null ? void 0 : user.display_name })
              }
            }
          ) }),
          /* @__PURE__ */ jsx(
            TextField,
            {
              inputRef,
              autoFocus,
              inputElementType: "textarea",
              inputClassName: "resize-none",
              value: inputValue,
              onChange: (e) => setInputValue(e.target.value),
              onFocus: () => setInputIsExpanded(true),
              onBlur: () => {
                if (!inputValue) {
                  setInputIsExpanded(false);
                }
              },
              minLength: 3,
              rows: inputIsExpanded ? 3 : 1,
              placeholder: inReplyTo ? trans(message("Write a reply")) : trans(message("Leave a comment"))
            }
          ),
          inputIsExpanded && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-12 justify-end mt-12", children: [
            /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => clearInput(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                color: "primary",
                type: "submit",
                disabled: createComment2.isPending || inputValue.length < 3,
                children: /* @__PURE__ */ jsx(Trans, { message: "Comment" })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function CommentBarNewCommentForm({
  commentable,
  className
}) {
  const { isLoggedIn } = useAuth();
  const { newCommentInputRef, newCommentPositionRef, setMarkerIsVisible } = useContext(CommentBarContext);
  if (!isLoggedIn)
    return null;
  return /* @__PURE__ */ jsx(
    NewCommentForm,
    {
      inputRef: newCommentInputRef,
      className,
      commentable,
      payload: { position: newCommentPositionRef.current },
      onSuccess: () => {
        setMarkerIsVisible(false);
        invalidateWaveData(commentable.id);
      }
    }
  );
}
function LikeButton({
  likeable,
  radius = "rounded-full",
  disabled,
  ...buttonProps
}) {
  const authHandler = useAuthClickCapture();
  const addToLibrary = useAddItemsToLibrary();
  const removeFromLibrary = useRemoveItemsFromLibrary();
  const isLiked = useLibraryStore((s) => s.has(likeable));
  const isLoading = addToLibrary.isPending || removeFromLibrary.isPending;
  const labels = getLabels(likeable);
  if (isLiked) {
    return /* @__PURE__ */ jsx(
      Button,
      {
        ...buttonProps,
        variant: "outline",
        radius,
        startIcon: /* @__PURE__ */ jsx(FavoriteIcon, { className: "text-primary" }),
        disabled: disabled || isLoading,
        onClickCapture: authHandler,
        onClick: () => {
          removeFromLibrary.mutate({ likeables: [likeable] });
        },
        children: /* @__PURE__ */ jsx(Trans, { ...labels.removeLike })
      }
    );
  }
  return /* @__PURE__ */ jsx(
    Button,
    {
      ...buttonProps,
      variant: "outline",
      radius,
      startIcon: /* @__PURE__ */ jsx(FavoriteBorderIcon, {}),
      disabled: disabled || isLoading,
      onClickCapture: authHandler,
      onClick: () => {
        addToLibrary.mutate({ likeables: [likeable] });
      },
      children: /* @__PURE__ */ jsx(Trans, { ...labels.like })
    }
  );
}
function getLabels(likeable) {
  switch (likeable.model_type) {
    case "artist":
      return { like: message("Follow"), removeLike: message("Following") };
    default:
      return { like: message("Like"), removeLike: message("Liked") };
  }
}
function RepostButton({
  item,
  className,
  size = "xs",
  radius,
  disabled
}) {
  const authHandler = useAuthClickCapture();
  const { player } = useSettings();
  const toggleRepost = useToggleRepost();
  const isReposted = useRepostsStore((s) => s.has(item));
  if (!(player == null ? void 0 : player.enable_repost))
    return null;
  return /* @__PURE__ */ jsx(
    Button,
    {
      className,
      variant: "outline",
      size,
      radius,
      startIcon: /* @__PURE__ */ jsx(RepeatIcon, { className: clsx(isReposted && "text-primary") }),
      disabled: disabled || toggleRepost.isPending,
      onClickCapture: authHandler,
      onClick: () => toggleRepost.mutate({ repostable: item }),
      children: isReposted ? /* @__PURE__ */ jsx(Trans, { message: "Reposted" }) : /* @__PURE__ */ jsx(Trans, { message: "Repost" })
    }
  );
}
function MediaItemStats({ item, className, showPlays = true }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx("flex items-center gap-20 text-sm text-muted", className),
      children: [
        showPlays && /* @__PURE__ */ jsx(PlayCount, { item }),
        /* @__PURE__ */ jsx(LikesCount, { item }),
        item.model_type !== "artist" && /* @__PURE__ */ jsx(RepostsCount, { item })
      ]
    }
  );
}
function PlayCount({ item }) {
  if (!item.plays)
    return null;
  const count = /* @__PURE__ */ jsx(
    FormattedNumber,
    {
      compactDisplay: "short",
      notation: "compact",
      value: item.plays
    }
  );
  return /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: ":count plays", values: { count } }), children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(PlayArrowFilledIcon, { size: "xs", className: "mr-4" }),
    count
  ] }) });
}
function LikesCount({ item }) {
  if (!item.likes_count)
    return null;
  const count = /* @__PURE__ */ jsx(FormattedNumber, { value: item.likes_count });
  return /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: ":count likes", values: { count } }), children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(FavoriteIcon, { size: "xs", className: "mr-4" }),
    count
  ] }) });
}
function RepostsCount({ item }) {
  if (!item.reposts_count)
    return null;
  const count = /* @__PURE__ */ jsx(FormattedNumber, { value: item.reposts_count });
  return /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: ":count reposts", values: { count } }), children: /* @__PURE__ */ jsxs("div", { className: "hidden @[566px]:block", children: [
    /* @__PURE__ */ jsx(RepeatIcon, { size: "xs", className: "mr-4" }),
    count
  ] }) });
}
function TrackActionsBar({
  item,
  managesItem,
  buttonClassName,
  buttonGap = "mr-8",
  buttonSize = "xs",
  buttonRadius = "rounded",
  children,
  className
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "flex items-center justify-center gap-24 overflow-hidden @container md:justify-between",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { children: [
          children,
          /* @__PURE__ */ jsx(
            LikeButton,
            {
              size: buttonSize,
              likeable: item,
              className: clsx(buttonGap, buttonClassName, "max-md:hidden"),
              radius: buttonRadius,
              disabled: managesItem
            }
          ),
          /* @__PURE__ */ jsx(
            RepostButton,
            {
              item,
              size: buttonSize,
              radius: buttonRadius,
              disabled: managesItem,
              className: clsx(
                buttonGap,
                buttonClassName,
                "hidden @[840px]:inline-flex"
              )
            }
          ),
          /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                size: buttonSize,
                variant: "outline",
                startIcon: /* @__PURE__ */ jsx(ShareIcon, {}),
                className: clsx(
                  buttonGap,
                  buttonClassName,
                  "hidden @[660px]:inline-flex"
                ),
                radius: buttonRadius,
                children: /* @__PURE__ */ jsx(Trans, { message: "Share" })
              }
            ),
            /* @__PURE__ */ jsx(ShareMediaDialog, { item })
          ] }),
          /* @__PURE__ */ jsxs(DialogTrigger, { type: "popover", mobileType: "tray", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                size: buttonSize,
                startIcon: /* @__PURE__ */ jsx(MoreHorizIcon, {}),
                className: clsx(buttonGap, buttonClassName),
                radius: buttonRadius,
                children: /* @__PURE__ */ jsx(Trans, { message: "More" })
              }
            ),
            /* @__PURE__ */ jsx(MoreDialog, { item })
          ] })
        ] }),
        /* @__PURE__ */ jsx(MediaItemStats, { item, className: "max-xl:hidden" })
      ]
    }
  );
}
function MoreDialog({ item }) {
  if (item.model_type === "track") {
    return /* @__PURE__ */ jsx(TrackContextDialog, { tracks: [item] });
  }
  return /* @__PURE__ */ jsx(AlbumContextDialog, { album: item });
}
const TrackListItem = memo(
  ({
    track,
    queue,
    reposter,
    className,
    hideArtwork = false,
    hideActions = false,
    linksInNewTab = false
  }) => {
    var _a2;
    const { player } = useSettings();
    const { managesTrack } = useTrackPermissions([track]);
    const showWave = (player == null ? void 0 : player.seekbar_type) === "waveform" && trackIsLocallyUploaded(track);
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: clsx(
          "overflow-hidden",
          !hideArtwork && "md:flex md:gap-24",
          className
        ),
        children: [
          !hideArtwork && /* @__PURE__ */ jsx(
            TrackImage,
            {
              track,
              className: "flex-shrink-0 rounded max-md:hidden",
              size: "w-184 h-184"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-auto", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-14", children: [
              /* @__PURE__ */ jsx(
                PlaybackToggleButton,
                {
                  track,
                  tracks: queue,
                  buttonType: "icon",
                  color: "primary",
                  variant: "flat",
                  radius: "rounded-full",
                  equalizerColor: "white"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 text-sm text-muted", children: [
                  /* @__PURE__ */ jsx(
                    ArtistLinks,
                    {
                      artists: track.artists,
                      target: linksInNewTab ? "_blank" : void 0
                    }
                  ),
                  reposter && /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(RepeatIcon, { size: "xs" }),
                    /* @__PURE__ */ jsx(
                      UserProfileLink,
                      {
                        user: reposter,
                        target: linksInNewTab ? "_blank" : void 0
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
                  TrackLink,
                  {
                    track,
                    target: linksInNewTab ? "_blank" : void 0
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "ml-auto text-sm", children: [
                /* @__PURE__ */ jsx(FormattedRelativeTime, { date: track.created_at }),
                ((_a2 = track.genres) == null ? void 0 : _a2.length) ? /* @__PURE__ */ jsx(Chip, { className: "mt-6 w-max", size: "xs", children: /* @__PURE__ */ jsx(
                  GenreLink,
                  {
                    genre: track.genres[0],
                    target: linksInNewTab ? "_blank" : void 0
                  }
                ) }) : null
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-20", children: showWave ? /* @__PURE__ */ jsx(CommentBarContextProvider, { disableCommenting: hideActions, children: /* @__PURE__ */ jsx(WaveformWithComments, { track, queue }) }) : /* @__PURE__ */ jsx(TrackSeekbar, { track, queue }) }),
            !hideActions && /* @__PURE__ */ jsx(
              TrackActionsBar,
              {
                item: track,
                managesItem: managesTrack,
                className: "mt-20"
              }
            )
          ] })
        ]
      }
    );
  }
);
function WaveformWithComments({
  track,
  queue
}) {
  const { markerIsVisible } = useContext(CommentBarContext);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Waveform, { track, queue }),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: markerIsVisible && /* @__PURE__ */ jsx(
      CommentBarNewCommentForm,
      {
        className: "mb-8 mt-28",
        commentable: track
      }
    ) })
  ] });
}
function TrackList({ tracks, query }) {
  const isMobile = useIsMobileMediaQuery();
  if (!tracks) {
    tracks = query ? query.items : [];
  }
  if (isMobile) {
    if (!query) {
      return /* @__PURE__ */ jsx(TrackTable, { tracks });
    }
    return /* @__PURE__ */ jsx(
      TrackTable,
      {
        tracks,
        tableBody: /* @__PURE__ */ jsx(VirtualTableBody, { query })
      }
    );
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    tracks.map((track) => /* @__PURE__ */ jsx(
      TrackListItem,
      {
        queue: tracks,
        track,
        className: "mb-40"
      },
      track.id
    )),
    query && /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query })
  ] });
}
function ChannelTrackList(props) {
  var _a2;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ChannelHeading, { ...props }),
    props.isNested ? /* @__PURE__ */ jsx(TrackList, { tracks: (_a2 = props.channel.content) == null ? void 0 : _a2.data }) : /* @__PURE__ */ jsx(PaginatedList, { ...props })
  ] });
}
function PaginatedList({ channel }) {
  const query = usePaginatedChannelContent(channel);
  return /* @__PURE__ */ jsx(TrackList, { query });
}
function ChannelContentCarousel(props) {
  var _a2;
  const { channel } = props;
  const ref = useRef(null);
  const itemWidth = useRef(0);
  const [enablePrev, setEnablePrev] = useState(false);
  const [enableNext, setEnableNext] = useState(true);
  const updateNavStatus = useCallback(() => {
    const el = ref.current;
    if (el && itemWidth.current) {
      setEnablePrev(el.scrollLeft > 0);
      setEnableNext(el.scrollWidth - el.scrollLeft !== el.clientWidth);
    }
  }, []);
  useEffect(() => {
    const el = ref.current;
    const handleScroll = debounce(() => updateNavStatus(), 100);
    if (el) {
      el.addEventListener("scroll", handleScroll);
    }
    return () => el == null ? void 0 : el.removeEventListener("scroll", handleScroll);
  }, [updateNavStatus]);
  useLayoutEffect(() => {
    const el = ref.current;
    if (el) {
      const firstGridItem = el.children.item(0);
      const observer = new ResizeObserver((entries) => {
        itemWidth.current = entries[0].contentRect.width;
        updateNavStatus();
      });
      if (firstGridItem) {
        observer.observe(firstGridItem);
      }
      return () => observer.unobserve(el);
    }
  }, [updateNavStatus]);
  const scrollAmount = () => {
    return itemWidth.current * (3 - 1);
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-24 mb-14", children: [
      /* @__PURE__ */ jsx(ChannelHeading, { ...props, margin: "mb-4" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          IconButton,
          {
            disabled: !enablePrev,
            onClick: () => {
              if (ref.current) {
                ref.current.scrollBy({ left: -scrollAmount() });
              }
            },
            children: /* @__PURE__ */ jsx(KeyboardArrowLeftIcon, {})
          }
        ),
        /* @__PURE__ */ jsx(
          IconButton,
          {
            disabled: !enableNext,
            onClick: () => {
              if (ref.current) {
                ref.current.scrollBy({ left: scrollAmount() });
              }
            },
            children: /* @__PURE__ */ jsx(KeyboardArrowRightIcon, {})
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: "content-carousel content-grid relative w-full grid grid-flow-col grid-rows-[auto] overflow-x-auto overflow-y-hidden gap-24 snap-always snap-x snap-mandatory hidden-scrollbar scroll-smooth",
        children: (_a2 = channel.content) == null ? void 0 : _a2.data.map((item) => {
          var _a3;
          return /* @__PURE__ */ jsx(
            ChannelContentGridItem,
            {
              item,
              items: (_a3 = channel.content) == null ? void 0 : _a3.data
            },
            `${item.id}-${item.model_type}`
          );
        })
      }
    )
  ] });
}
function ChannelContent(props) {
  const { channel, isNested } = props;
  const contentModel = channel.config.contentModel;
  const layout = isNested ? channel.config.nestedLayout : channel.config.layout;
  if (!channel.content) {
    return null;
  }
  if (contentModel === TRACK_MODEL && layout === "list") {
    return /* @__PURE__ */ jsx(ChannelTrackList, { ...props });
  } else if (contentModel === TRACK_MODEL && layout === "trackTable") {
    return /* @__PURE__ */ jsx(ChannelTrackTable, { ...props });
  } else if (contentModel === CHANNEL_MODEL) {
    return /* @__PURE__ */ jsx(NestedChannels, { ...props });
  } else if (layout === "carousel") {
    return /* @__PURE__ */ jsx(ChannelContentCarousel, { ...props });
  } else {
    return /* @__PURE__ */ jsx(ChannelContentGrid, { ...props });
  }
}
function NestedChannels({ channel }) {
  var _a2;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ChannelHeading, { channel }),
    (_a2 = channel.content) == null ? void 0 : _a2.data.map((nestedChannel) => /* @__PURE__ */ jsx("div", { className: "mb-50", children: /* @__PURE__ */ jsx(
      ChannelContent,
      {
        channel: nestedChannel,
        isNested: true
      }
    ) }, nestedChannel.id))
  ] });
}
function AdHost({ slot, className }) {
  var _a2;
  const settings = useSettings();
  const { isSubscribed } = useAuth();
  const adCode = useMemo(() => {
    return dot.pick(`ads.${slot}`, settings);
  }, [slot, settings]);
  if (((_a2 = settings.ads) == null ? void 0 : _a2.disable) || isSubscribed || !adCode)
    return null;
  return /* @__PURE__ */ jsx(InvariantAd, { className, slot, adCode });
}
const InvariantAd = memo(
  ({ slot, adCode, className }) => {
    const ref = useRef(null);
    const id = useId();
    useEffect(() => {
      if (ref.current) {
        loadAdScripts(adCode, ref.current).then(() => {
          executeAdJavascript(adCode, id);
        });
      }
      return () => {
        delete window["google_ad_modifications"];
      };
    }, [adCode, id]);
    useEffect(() => {
      if (ref.current) {
        const scrollParent = getScrollParent(ref.current);
        if (scrollParent) {
          const observer = new MutationObserver(function() {
            scrollParent.style.height = "";
            scrollParent.style.minHeight = "";
          });
          observer.observe(scrollParent, {
            attributes: true,
            attributeFilter: ["style"]
          });
          return () => observer.disconnect();
        }
      }
    }, []);
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        id,
        className: clsx(
          "ad-host flex max-h-[600px] min-h-90 w-full max-w-full items-center justify-center overflow-hidden",
          `${slot.replace(/\./g, "-")}-host`,
          className
        ),
        dangerouslySetInnerHTML: { __html: getAdHtml(adCode) }
      }
    );
  },
  () => {
    return false;
  }
);
function getAdHtml(adCode) {
  return adCode == null ? void 0 : adCode.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "").trim();
}
function loadAdScripts(adCode, parentEl) {
  const promises = [];
  const pattern = /<script.*?src=['"](.*?)['"]/g;
  let match;
  while (match = pattern.exec(adCode)) {
    if (match[1]) {
      promises.push(lazyLoader.loadAsset(match[1], { type: "js", parentEl }));
    }
  }
  return Promise.all(promises);
}
function executeAdJavascript(adCode, id) {
  const pattern = /<script\b[^>]*>([\s\S]*?)<\/script>/g;
  let content;
  while (content = pattern.exec(adCode)) {
    if (content[1]) {
      const r = `var d = document.createElement('div'); d.innerHTML = $1; document.getElementById('${id}').appendChild(d.firstChild);`;
      const toEval = `(function() {${r}})();`;
      new Function(toEval)();
    }
  }
}
function ChannelPage({ slugOrId }) {
  const query = useChannel(slugOrId, "channelPage");
  if (query.data) {
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(PageMetaTags, { query }),
      /* @__PURE__ */ jsxs("div", { className: "pb-24", children: [
        /* @__PURE__ */ jsx(AdHost, { slot: "general_top", className: "mb-34" }),
        /* @__PURE__ */ jsx(
          ChannelContent,
          {
            channel: query.data.channel
          },
          query.data.channel.id
        ),
        /* @__PURE__ */ jsx(AdHost, { slot: "general_bottom", className: "mt-34" })
      ] })
    ] });
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
const endpoint = (track) => {
  var _a2, _b2, _c, _d, _e;
  const artistName = ((_b2 = (_a2 = track.artists) == null ? void 0 : _a2[0]) == null ? void 0 : _b2.name) || ((_e = (_d = (_c = track.album) == null ? void 0 : _c.artists) == null ? void 0 : _d[0]) == null ? void 0 : _e.name);
  return `search/audio/${track.id}/${doubleEncode(artistName)}/${doubleEncode(
    track.name
  )}`;
};
let isSearchingForYoutubeVideo = false;
async function findYoutubeVideosForTrack(track, cancelToken) {
  const query = {
    queryKey: [endpoint(track)],
    queryFn: async () => findMatch(track, cancelToken),
    staleTime: Infinity
  };
  const response = queryClient.getQueryData(query.queryKey) ?? await queryClient.fetchQuery(query);
  isSearchingForYoutubeVideo = false;
  return (response == null ? void 0 : response.results) || [];
}
function findMatch(track, cancelToken) {
  isSearchingForYoutubeVideo = true;
  return apiClient.get(endpoint(track), { cancelToken: cancelToken == null ? void 0 : cancelToken.token }).then((response) => response.data);
}
function doubleEncode(value) {
  return encodeURIComponent(encodeURIComponent(value));
}
const usePlayerOverlayStore = create()(
  immer((set, get) => ({
    isMaximized: false,
    isQueueOpen: false,
    open: () => {
      set((state) => {
        state.isMaximized = true;
        state.isQueueOpen = false;
      });
    },
    toggle: () => {
      set((state) => {
        state.isMaximized = !state.isMaximized;
        state.isQueueOpen = false;
      });
    },
    toggleQueue: () => {
      set((state) => {
        state.isQueueOpen = !state.isQueueOpen;
      });
    }
  }))
);
const playerOverlayState = usePlayerOverlayStore.getState();
var YoutubeCommand = /* @__PURE__ */ ((YoutubeCommand2) => {
  YoutubeCommand2["Play"] = "playVideo";
  YoutubeCommand2["Pause"] = "pauseVideo";
  YoutubeCommand2["Stop"] = "stopVideo";
  YoutubeCommand2["Seek"] = "seekTo";
  YoutubeCommand2["Cue"] = "cueVideoById";
  YoutubeCommand2["CueAndPlay"] = "loadVideoById";
  YoutubeCommand2["Mute"] = "mute";
  YoutubeCommand2["Unmute"] = "unMute";
  YoutubeCommand2["SetVolume"] = "setVolume";
  YoutubeCommand2["SetPlaybackRate"] = "setPlaybackRate";
  YoutubeCommand2["SetPlaybackQuality"] = "setPlaybackQuality";
  return YoutubeCommand2;
})(YoutubeCommand || {});
var YouTubePlayerState = /* @__PURE__ */ ((YouTubePlayerState2) => {
  YouTubePlayerState2[YouTubePlayerState2["Unstarted"] = -1] = "Unstarted";
  YouTubePlayerState2[YouTubePlayerState2["Ended"] = 0] = "Ended";
  YouTubePlayerState2[YouTubePlayerState2["Playing"] = 1] = "Playing";
  YouTubePlayerState2[YouTubePlayerState2["Paused"] = 2] = "Paused";
  YouTubePlayerState2[YouTubePlayerState2["Buffering"] = 3] = "Buffering";
  YouTubePlayerState2[YouTubePlayerState2["Cued"] = 5] = "Cued";
  return YouTubePlayerState2;
})(YouTubePlayerState || {});
const trackPlays = /* @__PURE__ */ new Set();
const failedVideoId = " ";
const failedVideoIds = /* @__PURE__ */ new Set();
let tracksSkippedDueToError = 0;
async function resolveSrc(media) {
  var _a2;
  const results = await findYoutubeVideosForTrack(media.meta);
  const match = (_a2 = results == null ? void 0 : results.find((r) => !failedVideoIds.has(`${r.id}`))) == null ? void 0 : _a2.id;
  return {
    ...media,
    src: match || failedVideoId
  };
}
function setMediaSessionMetadata(media) {
  var _a2, _b2, _c, _d;
  if ("mediaSession" in navigator) {
    const track = media.meta;
    if (!track)
      return;
    const image = track.image || ((_a2 = track.album) == null ? void 0 : _a2.image);
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.name,
      artist: (_c = (_b2 = track.artists) == null ? void 0 : _b2[0]) == null ? void 0 : _c.name,
      album: (_d = track.album) == null ? void 0 : _d.name,
      artwork: image ? [
        {
          src: image,
          sizes: "300x300",
          type: "image/jpg"
        }
      ] : void 0
    });
  }
}
const playerStoreOptions = {
  persistQueueInLocalStorage: true,
  defaultVolume: (_a = getBootstrapData().settings.player) == null ? void 0 : _a.default_volume,
  setMediaSessionMetadata,
  youtube: {
    srcResolver: resolveSrc,
    onStateChange: (state) => {
      if (state === YouTubePlayerState.Playing) {
        tracksSkippedDueToError = 0;
      }
    }
  },
  onBeforePlay: () => {
    var _a2;
    const player = getBootstrapData().settings.player;
    if (((_a2 = player == null ? void 0 : player.mobile) == null ? void 0 : _a2.auto_open_overlay) && // check if mobile
    window.matchMedia("(max-width: 768px)").matches) {
      playerOverlayState.open();
      return new Promise((resolve) => setTimeout(() => resolve(), 151));
    }
  },
  loadMoreMediaItems: async (media) => {
    if (media == null ? void 0 : media.groupId) {
      const tracks = await loadMediaItemTracks(
        media.groupId,
        media.meta
      );
      return tracksToMediaItems(tracks);
    }
  },
  listeners: {
    // change document title to currently cued track name
    cued: ({ state: { cuedMedia } }) => {
      var _a2;
      if (!cuedMedia)
        return;
      const site_name = getBootstrapData().settings.branding.site_name;
      let title = `${cuedMedia.meta.name}`;
      const artistName = (_a2 = cuedMedia.meta.artists) == null ? void 0 : _a2[0].name;
      if (artistName) {
        title = `${title} - ${artistName} - ${site_name}`;
      } else {
        title = `${title} - ${site_name}`;
      }
      document.title = title;
    },
    play: ({ state: { cuedMedia, pause } }) => {
      const hasPermission = userHasPlayPermission();
      if (!hasPermission) {
        toast.danger(
          message("Your current plan does not allow music playback.")
        );
        pause();
        return;
      }
      if (cuedMedia && !trackPlays.has(cuedMedia.meta.id)) {
        trackPlays.add(cuedMedia.meta.id);
        apiClient.post(`tracks/plays/${cuedMedia.meta.id}/log`, {
          queueId: cuedMedia.groupId
        });
      }
    },
    playbackEnd: ({ state: { cuedMedia } }) => {
      if (cuedMedia) {
        trackPlays.delete(cuedMedia.meta.id);
      }
    },
    error: async ({
      sourceEvent,
      state: { cuedMedia, providerApi, providerName, emit }
    }) => {
      const e = sourceEvent;
      if (providerName === "youtube" && providerApi) {
        logYoutubeError(e);
        if (e.videoId) {
          failedVideoIds.add(`${e.videoId}`);
        }
        const media = cuedMedia ? await resolveSrc(cuedMedia) : null;
        if ((media == null ? void 0 : media.src) && (media == null ? void 0 : media.src) !== failedVideoId) {
          await providerApi.internalProviderApi.loadVideoById(media.src);
          providerApi.play();
        } else {
          tracksSkippedDueToError++;
          if (tracksSkippedDueToError <= 2) {
            emit("playbackEnd");
          }
        }
      } else {
        tracksSkippedDueToError = 0;
      }
    }
  },
  onDestroy: () => {
    tracksSkippedDueToError = 0;
  }
};
function logYoutubeError(e) {
  const code = e == null ? void 0 : e.code;
  if (!e || !e.videoId)
    return;
  apiClient.post("youtube/log-client-error", {
    code,
    videoUrl: e.videoId
  });
}
function userHasPlayPermission() {
  const user = getBootstrapData().user;
  const guest_role = getBootstrapData().guest_role;
  const permissions = (user == null ? void 0 : user.permissions) || (guest_role == null ? void 0 : guest_role.permissions);
  return (permissions == null ? void 0 : permissions.find((p) => p.name === "music.play" || p.name === "admin")) != null;
}
function useIsMediaPlaying(mediaId, groupId) {
  return usePlayerStore((s) => {
    var _a2;
    return s.isPlaying && ((_a2 = s.cuedMedia) == null ? void 0 : _a2.id) === mediaId && (!groupId || groupId === s.cuedMedia.groupId);
  });
}
function useMiniPlayerIsHidden() {
  const { player } = useSettings();
  const mediaIsCued = usePlayerStore((s) => s.cuedMedia != null);
  const isAudioProvider = usePlayerStore((s) => s.providerName === "htmlAudio");
  const isMobile = useIsMobileMediaQuery();
  return (player == null ? void 0 : player.hide_video) || !mediaIsCued || isMobile || isAudioProvider;
}
function QueueTrackContextDialog({ queueItems }) {
  return /* @__PURE__ */ jsx(
    TrackContextDialog,
    {
      tracks: queueItems.map((item) => item.meta),
      showAddToQueueButton: false,
      children: () => /* @__PURE__ */ jsx(RemoveFromQueueContextButton, { queueItems })
    }
  );
}
function RemoveFromQueueContextButton({
  queueItems
}) {
  const { close: closeMenu } = useDialogContext();
  const player = usePlayerActions();
  return /* @__PURE__ */ jsx(
    ContextMenuButton,
    {
      onClick: async () => {
        closeMenu();
        player.removeFromQueue(queueItems);
      },
      children: /* @__PURE__ */ jsx(Trans, { message: "Remove from queue" })
    }
  );
}
function QueueSidenav() {
  const queue = usePlayerStore((s) => s.shuffledQueue);
  const miniPlayerIsHidden = useMiniPlayerIsHidden();
  return /* @__PURE__ */ jsx("div", { className: "border-l bg h-full", children: /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        "overflow-y-auto overflow-x-hidden",
        miniPlayerIsHidden ? "h-full" : "h-[calc(100%-213px)]"
      ),
      children: queue.map((media, index) => (
        // same media.id might be multiple times in the queue, use index as well to avoid errors
        /* @__PURE__ */ jsx(QueueItem, { media }, `${media.id}-${index}`)
      ))
    }
  ) });
}
function QueueItem({ media }) {
  const isCued = usePlayerStore((s) => {
    var _a2;
    return ((_a2 = s.cuedMedia) == null ? void 0 : _a2.id) === media.id;
  });
  const isPlaying = useIsMediaPlaying(media.id);
  const [isHover, setHover] = useState(false);
  if (!media.meta) {
    return null;
  }
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "popover", triggerOnContextMenu: true, placement: "bottom-start", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        onPointerEnter: () => setHover(true),
        onPointerLeave: () => setHover(false),
        className: clsx(
          "flex items-center gap-10 p-8 border-b",
          isCued && "bg-primary/80 text-white"
        ),
        children: [
          /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden", children: [
            /* @__PURE__ */ jsx(
              TrackImage,
              {
                className: "w-34 h-34 flex-shrink-0 rounded object-cover",
                track: media.meta
              }
            ),
            (isHover || isPlaying) && /* @__PURE__ */ jsx(TogglePlaybackOverlay, { media, isHover })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-auto max-w-180 whitespace-nowrap", children: [
            /* @__PURE__ */ jsx("div", { className: "text-sm overflow-hidden overflow-ellipsis", children: media.meta.name }),
            /* @__PURE__ */ jsx(
              ArtistLinks,
              {
                className: "text-xs overflow-hidden overflow-ellipsis",
                linkClassName: isCued ? "text-inherit" : "text-muted",
                artists: media.meta.artists
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(QueueTrackContextDialog, { queueItems: [media] })
  ] });
}
function TogglePlaybackOverlay({ media, isHover }) {
  const isPlaying = useIsMediaPlaying(media.id);
  const { trans } = useTrans();
  const player = usePlayerActions();
  if (!media.meta) {
    return null;
  }
  let button;
  if (isPlaying) {
    button = /* @__PURE__ */ jsx(
      "button",
      {
        "aria-label": trans(
          message("Pause :name", { values: { name: media.meta.name } })
        ),
        tabIndex: 0,
        onClick: () => player.pause(),
        children: isHover ? /* @__PURE__ */ jsx(PauseIcon, {}) : /* @__PURE__ */ jsx(EqualizerImage, { color: "white" })
      }
    );
  } else {
    button = /* @__PURE__ */ jsx(
      "button",
      {
        "aria-label": trans(
          message("Play :name", { values: { name: media.meta.name } })
        ),
        tabIndex: 0,
        onClick: () => player.play(media),
        children: /* @__PURE__ */ jsx(PlayArrowFilledIcon, {})
      }
    );
  }
  return /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-full bg-black/50 rounded flex items-center justify-center text-white", children: button });
}
function useCuedTrack() {
  const media = usePlayerStore((s) => s.cuedMedia);
  if (!media)
    return;
  return media.meta;
}
function useCurrentTime({ precision, disabled } = { precision: "ms", disabled: false }) {
  const timeRef = useRef(0);
  const { subscribe, getCurrentTime } = usePlayerActions();
  const providerKey = usePlayerStore(
    (s) => {
      var _a2;
      return s.providerName && ((_a2 = s.cuedMedia) == null ? void 0 : _a2.id) ? `${s.providerName}+${s.cuedMedia.id}` : null;
    }
  );
  const [currentTime, setCurrentTime] = useState(() => getCurrentTime());
  useEffect(() => {
    let unsubscribe;
    if (!disabled) {
      unsubscribe = subscribe({
        progress: ({ currentTime: currentTime2 }) => {
          const time = precision === "ms" ? currentTime2 : Math.floor(currentTime2);
          if (timeRef.current !== time) {
            setCurrentTime(time);
            timeRef.current = time;
          }
        }
      });
    }
    return () => unsubscribe == null ? void 0 : unsubscribe();
  }, [precision, subscribe, disabled]);
  useEffect(() => {
    if (providerKey) {
      setCurrentTime(getCurrentTime());
    }
  }, [providerKey, getCurrentTime]);
  return currentTime;
}
const MediaPlayIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M10.6667 6.6548C10.6667 6.10764 11.2894 5.79346 11.7295 6.11862L24.377 15.4634C24.7377 15.7298 24.7377 16.2692 24.3771 16.5357L11.7295 25.8813C11.2895 26.2065 10.6667 25.8923 10.6667 25.3451L10.6667 6.6548Z" }),
  "MediaPlay",
  "0 0 32 32"
);
const MediaPauseIcon = createSvgIcon(
  [/* @__PURE__ */ jsx("path", { d: "M8.66667 6.66667C8.29848 6.66667 8 6.96514 8 7.33333V24.6667C8 25.0349 8.29848 25.3333 8.66667 25.3333H12.6667C13.0349 25.3333 13.3333 25.0349 13.3333 24.6667V7.33333C13.3333 6.96514 13.0349 6.66667 12.6667 6.66667H8.66667Z" }, "0"), /* @__PURE__ */ jsx("path", { d: "M19.3333 6.66667C18.9651 6.66667 18.6667 6.96514 18.6667 7.33333V24.6667C18.6667 25.0349 18.9651 25.3333 19.3333 25.3333H23.3333C23.7015 25.3333 24 25.0349 24 24.6667V7.33333C24 6.96514 23.7015 6.66667 23.3333 6.66667H19.3333Z" }, "1")],
  "MediaPause",
  "0 0 32 32"
);
function PlayButton({
  size = "md",
  iconSize = "xl",
  color,
  stopPropagation
}) {
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const playerReady = usePlayerStore((s) => s.providerReady);
  const player = usePlayerActions();
  const label = isPlaying ? /* @__PURE__ */ jsx(Trans, { message: "Pause (k)" }) : /* @__PURE__ */ jsx(Trans, { message: "Play (k)" });
  return /* @__PURE__ */ jsx(Tooltip, { label, usePortal: false, children: /* @__PURE__ */ jsx(
    IconButton,
    {
      color,
      size,
      iconSize,
      disabled: !playerReady,
      onClick: (e) => {
        if (stopPropagation) {
          e.stopPropagation();
        }
        if (isPlaying) {
          player.pause();
        } else {
          player.play();
        }
      },
      children: isPlaying ? /* @__PURE__ */ jsx(MediaPauseIcon, {}) : /* @__PURE__ */ jsx(MediaPlayIcon, {})
    }
  ) });
}
const MediaPreviousIcon = createSvgIcon(
  [/* @__PURE__ */ jsx("path", { d: "M25.1377 6.78532C25.5778 6.46017 26.2005 6.77434 26.2005 7.32151V24.6785C26.2005 25.2257 25.5777 25.5398 25.1377 25.2147L13.3924 16.5358C13.0317 16.2693 13.0317 15.7299 13.3924 15.4634L25.1377 6.78532Z" }, "0"), /* @__PURE__ */ jsx("path", { d: "M8 6.6667C8.36819 6.6667 8.66667 6.96518 8.66667 7.33337V24.6667C8.66667 25.0349 8.36819 25.3334 8 25.3334H6C5.63181 25.3334 5.33333 25.0349 5.33333 24.6667V7.33337C5.33333 6.96518 5.63181 6.6667 6 6.6667H8Z" }, "1")],
  "MediaPrevious",
  "0 0 32 32"
);
function PreviousButton({
  size = "md",
  iconSize,
  color,
  className,
  stopPropagation
}) {
  const player = usePlayerActions();
  const playerReady = usePlayerStore((s) => s.providerReady);
  return /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Previous" }), children: /* @__PURE__ */ jsx(
    IconButton,
    {
      disabled: !playerReady,
      size,
      color,
      iconSize,
      className,
      onClick: (e) => {
        if (stopPropagation) {
          e.stopPropagation();
        }
        player.playPrevious();
      },
      children: /* @__PURE__ */ jsx(MediaPreviousIcon, {})
    }
  ) });
}
const MediaNextIcon = createSvgIcon(
  [/* @__PURE__ */ jsx("path", { d: "M6.39617 6.78532C5.9561 6.46017 5.33334 6.77434 5.33334 7.32151V24.6785C5.33334 25.2257 5.95612 25.5398 6.39619 25.2147L18.1415 16.5358C18.5021 16.2693 18.5021 15.7299 18.1415 15.4634L6.39617 6.78532Z" }, "0"), /* @__PURE__ */ jsx("path", { d: "M23.5339 6.6667C23.1657 6.6667 22.8672 6.96518 22.8672 7.33337V24.6667C22.8672 25.0349 23.1657 25.3334 23.5339 25.3334H25.5339C25.902 25.3334 26.2005 25.0349 26.2005 24.6667V7.33337C26.2005 6.96518 25.902 6.6667 25.5339 6.6667H23.5339Z" }, "1")],
  "MediaNext",
  "0 0 32 32"
);
function NextButton({
  size = "md",
  iconSize,
  color,
  className,
  stopPropagation
}) {
  const player = usePlayerActions();
  const playerReady = usePlayerStore((s) => s.providerReady);
  return /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Next" }), usePortal: false, children: /* @__PURE__ */ jsx(
    IconButton,
    {
      disabled: !playerReady,
      size,
      color,
      iconSize,
      className,
      onClick: (e) => {
        if (stopPropagation) {
          e.stopPropagation();
        }
        player.playNext();
      },
      children: /* @__PURE__ */ jsx(MediaNextIcon, {})
    }
  ) });
}
function BufferingIndicator() {
  const store = useContext(PlayerStoreContext);
  const [isVisible, setIsVisible] = useState(false);
  const [animationActive, setAnimationActive] = useState(false);
  useEffect(() => {
    return store.subscribe(
      (s) => s.isBuffering,
      (isBuffering) => {
        const isLoading = isBuffering || isSearchingForYoutubeVideo;
        if (isLoading) {
          setAnimationActive(true);
          setTimeout(() => {
            setIsVisible(true);
          });
        } else {
          setIsVisible(false);
        }
      }
    );
  }, [store]);
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "48",
      height: "48",
      fill: "none",
      className: clsx(
        "absolute -top-3 -left-3 z-10 transition-opacity duration-300 pointer-events-none",
        isVisible ? "opacity-100" : "opacity-0",
        animationActive && "animate-spin"
      ),
      onTransitionEnd: () => {
        if (!isVisible) {
          setAnimationActive(false);
        }
      },
      children: [
        /* @__PURE__ */ jsx("g", { clipPath: "url(#a)", children: /* @__PURE__ */ jsx(
          "path",
          {
            stroke: "url(#b)",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeMiterlimit: "10",
            d: "M45.72 31.644c-1.016 3.036-2.777 5.84-5.116 8.301-8.846 9.161-23.386 9.5-32.547.654-9.16-8.845-9.416-23.44-.654-32.546"
          }
        ) }),
        /* @__PURE__ */ jsxs("defs", { children: [
          /* @__PURE__ */ jsxs(
            "linearGradient",
            {
              id: "b",
              x1: "7.863",
              x2: "45.527",
              y1: "7.178",
              y2: "31.53",
              gradientUnits: "userSpaceOnUse",
              children: [
                /* @__PURE__ */ jsx("stop", { stopColor: "currentColor" }),
                /* @__PURE__ */ jsx("stop", { offset: "1", stopColor: "currentColor", stopOpacity: "0" })
              ]
            }
          ),
          /* @__PURE__ */ jsx("clipPath", { children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M0 0h48v48H0z" }) })
        ] })
      ]
    }
  );
}
function MobilePlayerControls() {
  return /* @__PURE__ */ jsxs("div", { className: "fixed bottom-0 left-0 right-0 w-[calc(100%-20px)] mx-auto bg-background/95", children: [
    /* @__PURE__ */ jsx(PlayerControls, {}),
    /* @__PURE__ */ jsx(MobileNavbar, {})
  ] });
}
function PlayerControls() {
  const mediaIsCued = usePlayerStore((s) => s.cuedMedia != null);
  if (!mediaIsCued)
    return null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "bg-chip rounded p-6 flex items-center gap-24 justify-between shadow relative",
      onClick: () => {
        playerOverlayState.toggle();
      },
      children: [
        /* @__PURE__ */ jsx(QueuedTrack$2, {}),
        /* @__PURE__ */ jsx(PlaybackButtons$1, {}),
        /* @__PURE__ */ jsx(PlayerProgressBar, {})
      ]
    }
  );
}
function QueuedTrack$2() {
  var _a2;
  const track = useCuedTrack();
  if (!track) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-10 min-w-0 flex-auto", children: [
    /* @__PURE__ */ jsx(TrackImage, { className: "rounded w-36 h-36 object-cover", track }),
    /* @__PURE__ */ jsxs("div", { className: "flex-auto whitespace-nowrap overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "text-sm font-medium overflow-hidden overflow-ellipsis", children: track.name }),
      /* @__PURE__ */ jsx("div", { className: "text-xs text-muted overflow-hidden overflow-ellipsis", children: (_a2 = track.artists) == null ? void 0 : _a2.map((a) => a.name).join(", ") })
    ] })
  ] });
}
function PlaybackButtons$1() {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center", children: [
    /* @__PURE__ */ jsx(PreviousButton, { stopPropagation: true }),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(BufferingIndicator, {}),
      /* @__PURE__ */ jsx(PlayButton, { size: "md", iconSize: "lg", stopPropagation: true })
    ] }),
    /* @__PURE__ */ jsx(NextButton, { stopPropagation: true })
  ] });
}
function PlayerProgressBar() {
  const duration = usePlayerStore((s) => s.mediaDuration);
  const currentTime = useCurrentTime();
  return /* @__PURE__ */ jsx(
    ProgressBar,
    {
      size: "xs",
      className: "absolute left-0 right-0 bottom-0",
      progressColor: "bg-white",
      trackColor: "bg-white/10",
      trackHeight: "h-2",
      radius: "rounded-none",
      minValue: 0,
      maxValue: duration,
      value: currentTime
    }
  );
}
function MobileNavbar() {
  const menu = useCustomMenu("mobile-bottom");
  if (!menu)
    return null;
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-30 my-12", children: [
    menu.items.map((item) => /* @__PURE__ */ jsx(
      CustomMenuItem,
      {
        unstyled: true,
        iconClassName: "block mx-auto mb-6",
        iconSize: "md",
        className: ({ isActive }) => clsx(
          "text-xs whitespace-nowrap overflow-hidden",
          isActive && "font-bold"
        ),
        item
      },
      item.id
    )),
    /* @__PURE__ */ jsx(AccountButton, {})
  ] });
}
function AccountButton() {
  const { user } = useAuth();
  const hasUnreadNotif = !!(user == null ? void 0 : user.unread_notifications_count);
  const navigate = useNavigate();
  const { registration } = useSettings();
  const primaryArtist = usePrimaryArtistForCurrentUser();
  const { player } = useSettings();
  const menuItems = useMemo(() => {
    if (primaryArtist) {
      return [
        /* @__PURE__ */ jsx(
          Item,
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
          Item,
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
  const button = /* @__PURE__ */ jsxs("button", { className: "text-xs relative", children: [
    /* @__PURE__ */ jsx(PersonIcon, { size: "md" }),
    hasUnreadNotif ? /* @__PURE__ */ jsx(Badge, { className: "-top-6", right: "right-4", children: user == null ? void 0 : user.unread_notifications_count }) : null,
    /* @__PURE__ */ jsx("div", { className: "text-xs", children: /* @__PURE__ */ jsx(Trans, { message: "Account" }) })
  ] });
  if (!user) {
    return /* @__PURE__ */ jsxs(MenuTrigger, { children: [
      button,
      /* @__PURE__ */ jsxs(Menu, { children: [
        /* @__PURE__ */ jsx(Item, { value: "login", onSelected: () => navigate("/login"), children: /* @__PURE__ */ jsx(Trans, { message: "Login" }) }),
        !registration.disable && /* @__PURE__ */ jsx(Item, { value: "register", onSelected: () => navigate("/register"), children: /* @__PURE__ */ jsx(Trans, { message: "Register" }) })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsx(NavbarAuthMenu, { items: menuItems, children: button });
}
function Seekbar({
  trackColor,
  fillColor,
  className,
  onPointerMove
}) {
  const { pause, seek, setIsSeeking, play, getState } = usePlayerActions();
  const duration = usePlayerStore((s) => s.mediaDuration);
  const playerReady = usePlayerStore((s) => s.providerReady);
  const pauseWhileSeeking = usePlayerStore((s) => s.pauseWhileSeeking);
  const currentTime = useCurrentTime();
  const wasPlayingBeforeDragging = useRef(false);
  return /* @__PURE__ */ jsx(
    Slider,
    {
      fillColor,
      trackColor,
      thumbSize: "w-14 h-14",
      showThumbOnHoverOnly: true,
      className,
      width: "w-auto",
      isDisabled: !playerReady,
      value: currentTime,
      minValue: 0,
      maxValue: duration,
      onPointerMove,
      onPointerDown: () => {
        setIsSeeking(true);
        if (pauseWhileSeeking) {
          wasPlayingBeforeDragging.current = getState().isPlaying || getState().isBuffering;
          pause();
        }
      },
      onChange: (value) => {
        getState().emit("progress", { currentTime: value });
        seek(value);
      },
      onChangeEnd: () => {
        setIsSeeking(false);
        if (pauseWhileSeeking && wasPlayingBeforeDragging.current) {
          play();
          wasPlayingBeforeDragging.current = false;
        }
      }
    }
  );
}
function FormattedCurrentTime({ className }) {
  const duration = usePlayerStore((s) => s.mediaDuration);
  const currentTime = useCurrentTime();
  return /* @__PURE__ */ jsx("span", { className, children: /* @__PURE__ */ jsx(
    FormattedDuration,
    {
      seconds: currentTime,
      addZeroToFirstUnit: duration >= 600
    }
  ) });
}
function FormattedPlayerDuration({ className }) {
  const duration = usePlayerStore((s) => s.mediaDuration);
  return /* @__PURE__ */ jsx("span", { className, children: /* @__PURE__ */ jsx(
    FormattedDuration,
    {
      seconds: duration,
      addZeroToFirstUnit: duration >= 600
    }
  ) });
}
function MainSeekbar() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-12", children: [
    /* @__PURE__ */ jsx("div", { className: "text-xs text-muted flex-shrink-0 min-w-40 text-right", children: /* @__PURE__ */ jsx(FormattedCurrentTime, {}) }),
    /* @__PURE__ */ jsx(Seekbar, { className: "flex-auto", trackColor: "neutral" }),
    /* @__PURE__ */ jsx("div", { className: "text-xs text-muted flex-shrink-0 min-w-40", children: /* @__PURE__ */ jsx(FormattedPlayerDuration, {}) })
  ] }) });
}
const MediaShuffleIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M23.7295 5.65252C23.2894 5.32737 22.6667 5.64155 22.6667 6.18871V7.86672C22.6667 7.94036 22.607 8.00005 22.5333 8.00005H21.3333C18.6228 8.00005 16.2268 9.34843 14.7798 11.411C14.7251 11.489 14.6083 11.489 14.5536 11.411C13.1065 9.34843 10.7106 8.00005 8.00001 8.00005H6.00001C5.63182 8.00005 5.33334 8.29853 5.33334 8.66672V10.3998C5.33334 10.768 5.63182 11.0665 6.00001 11.0665H8.00001C10.724 11.0665 12.9336 13.2748 12.9336 16.0001C12.9336 18.7253 10.724 20.9336 8.00001 20.9336H6.00001C5.63182 20.9336 5.33334 21.2321 5.33334 21.6003V23.3334C5.33334 23.7016 5.63182 24.0001 6.00001 24.0001H8.00001C10.7106 24.0001 13.1065 22.6517 14.5536 20.5891C14.6083 20.5111 14.7251 20.5111 14.7798 20.5891C16.2268 22.6517 18.6228 24.0001 21.3333 24.0001H22.5333C22.607 24.0001 22.6667 24.0597 22.6667 24.1334V25.8113C22.6667 26.3585 23.2895 26.6727 23.7295 26.3475L28.2568 23.0022C28.6175 22.7357 28.6174 22.1963 28.2568 21.9298L23.7295 18.5848C23.2894 18.2597 22.6667 18.5738 22.6667 19.121V20.8003C22.6667 20.874 22.607 20.9336 22.5333 20.9336H21.3333C18.6094 20.9336 16.3997 18.7253 16.3997 16.0001C16.3997 13.2748 18.6094 11.0665 21.3333 11.0665H22.5333C22.607 11.0665 22.6667 11.1262 22.6667 11.1998V12.879C22.6667 13.4262 23.2895 13.7404 23.7295 13.4152L28.2568 10.0699C28.6175 9.8034 28.6174 9.26401 28.2568 8.99753L23.7295 5.65252Z" }),
  "MediaShuffle",
  "0 0 32 32"
);
const MediaShuffleOnIcon = createSvgIcon(
  [/* @__PURE__ */ jsx("path", { d: "M22.6666 6.18871C22.6666 5.64155 23.2894 5.32737 23.7295 5.65252L28.2567 8.99753C28.6174 9.26401 28.6174 9.8034 28.2568 10.0699L23.7295 13.4152C23.2894 13.7404 22.6666 13.4262 22.6666 12.879V11.1998C22.6666 11.1262 22.607 11.0665 22.5333 11.0665H21.3333C18.6094 11.0665 16.3997 13.2748 16.3997 16.0001C16.3997 18.7253 18.6094 20.9336 21.3333 20.9336H22.5333C22.607 20.9336 22.6666 20.874 22.6666 20.8003V19.121C22.6666 18.5738 23.2894 18.2597 23.7295 18.5848L28.2567 21.9298C28.6174 22.1963 28.6174 22.7357 28.2568 23.0022L23.7295 26.3475C23.2894 26.6727 22.6666 26.3585 22.6666 25.8113V24.1334C22.6666 24.0597 22.607 24.0001 22.5333 24.0001H21.3333C18.6227 24.0001 16.2268 22.6517 14.7798 20.5891C14.725 20.5111 14.6082 20.5111 14.5535 20.5891C13.1065 22.6517 10.7106 24.0001 7.99998 24.0001H5.99998C5.63179 24.0001 5.33331 23.7016 5.33331 23.3334V21.6003C5.33331 21.2321 5.63179 20.9336 5.99998 20.9336H7.99998C10.7239 20.9336 12.9336 18.7253 12.9336 16.0001C12.9336 13.2748 10.7239 11.0665 7.99998 11.0665H5.99998C5.63179 11.0665 5.33331 10.768 5.33331 10.3998V8.66672C5.33331 8.29853 5.63179 8.00005 5.99998 8.00005H7.99998C10.7106 8.00005 13.1065 9.34843 14.5535 11.411C14.6082 11.489 14.725 11.489 14.7798 11.411C16.2268 9.34843 18.6227 8.00005 21.3333 8.00005H22.5333C22.607 8.00005 22.6666 7.94036 22.6666 7.86672V6.18871Z" }, "0"), /* @__PURE__ */ jsx("path", { d: "M28.6666 18.0001C29.7712 18.0001 30.6666 17.1046 30.6666 16.0001C30.6666 14.8955 29.7712 14.0001 28.6666 14.0001C27.5621 14.0001 26.6666 14.8955 26.6666 16.0001C26.6666 17.1046 27.5621 18.0001 28.6666 18.0001Z" }, "1")],
  "MediaShuffleOn",
  "0 0 32 32"
);
function ShuffleButton({
  size = "md",
  iconSize,
  color,
  activeColor = "primary",
  className
}) {
  const playerReady = usePlayerStore((s) => s.providerReady);
  const isShuffling = usePlayerStore((s) => s.shuffling);
  const player = usePlayerActions();
  const label = isShuffling ? /* @__PURE__ */ jsx(Trans, { message: "Disable shuffle" }) : /* @__PURE__ */ jsx(Trans, { message: "Enable shuffle" });
  return /* @__PURE__ */ jsx(Tooltip, { label, children: /* @__PURE__ */ jsx(
    IconButton,
    {
      disabled: !playerReady,
      size,
      color: isShuffling ? activeColor : color,
      iconSize,
      className,
      onClick: () => {
        player.toggleShuffling();
      },
      children: isShuffling ? /* @__PURE__ */ jsx(MediaShuffleOnIcon, {}) : /* @__PURE__ */ jsx(MediaShuffleIcon, {})
    }
  ) });
}
const MediaRepeatIcon = createSvgIcon(
  [/* @__PURE__ */ jsx("path", { d: "M22.1969 4.98846C21.7569 4.66331 21.1341 4.97748 21.1341 5.52465V7.20266C21.1341 7.27629 21.0744 7.33599 21.0008 7.33599H11.1341C8.18859 7.33599 5.80078 9.72381 5.80078 12.6693V14.6693C5.80078 15.0375 6.09925 15.336 6.46744 15.336H8.20078C8.56897 15.336 8.86744 15.0375 8.86744 14.6693V13.0691C8.86744 11.5963 10.0613 10.4024 11.5341 10.4024H21.0008C21.0744 10.4024 21.1341 10.4621 21.1341 10.5357V12.215C21.1341 12.7621 21.7569 13.0763 22.197 12.7511L26.7242 9.40583C27.0849 9.13934 27.0849 8.59995 26.7242 8.33347L22.1969 4.98846Z" }, "0"), /* @__PURE__ */ jsx("path", { d: "M10.8652 24.7975C10.8652 24.7238 10.9249 24.6641 10.9986 24.6641H20.8652C23.8108 24.6641 26.1986 22.2763 26.1986 19.3308V17.3308C26.1986 16.9626 25.9001 16.6641 25.5319 16.6641H23.7986C23.4304 16.6641 23.1319 16.9626 23.1319 17.3308V18.931C23.1319 20.4038 21.938 21.5977 20.4652 21.5977H10.9986C10.9249 21.5977 10.8652 21.538 10.8652 21.4644V19.7851C10.8652 19.238 10.2425 18.9238 9.80239 19.249L5.27512 22.5943C4.91447 22.8608 4.91448 23.4002 5.27514 23.6666L9.80241 27.0116C10.2425 27.3368 10.8652 27.0226 10.8652 26.4755V24.7975Z" }, "1")],
  "MediaRepeat",
  "0 0 32 32"
);
const MediaRepeatOnIcon = createSvgIcon(
  [/* @__PURE__ */ jsx("path", { d: "M22.1969 4.98846C21.7569 4.66331 21.1341 4.97748 21.1341 5.52465V7.20266C21.1341 7.27629 21.0744 7.33599 21.0008 7.33599H11.1341C8.18859 7.33599 5.80078 9.72381 5.80078 12.6693V14.6693C5.80078 15.0375 6.09925 15.336 6.46744 15.336H8.20078C8.56897 15.336 8.86744 15.0375 8.86744 14.6693V13.0691C8.86744 11.5963 10.0613 10.4024 11.5341 10.4024H21.0008C21.0744 10.4024 21.1341 10.4621 21.1341 10.5357V12.215C21.1341 12.7621 21.7569 13.0763 22.197 12.7511L26.7242 9.40583C27.0849 9.13934 27.0849 8.59995 26.7242 8.33347L22.1969 4.98846Z" }, "0"), /* @__PURE__ */ jsx("path", { d: "M16 18.0001C17.1046 18.0001 18 17.1046 18 16.0001C18 14.8955 17.1046 14.0001 16 14.0001C14.8954 14.0001 14 14.8955 14 16.0001C14 17.1046 14.8954 18.0001 16 18.0001Z" }, "1"), /* @__PURE__ */ jsx("path", { d: "M20.8652 24.6641H10.9986C10.9249 24.6641 10.8652 24.7238 10.8652 24.7975V26.4755C10.8652 27.0226 10.2425 27.3368 9.80241 27.0116L5.27514 23.6666C4.91448 23.4002 4.91447 22.8608 5.27512 22.5943L9.80239 19.249C10.2425 18.9238 10.8652 19.238 10.8652 19.7851V21.4644C10.8652 21.538 10.9249 21.5977 10.9986 21.5977H20.4652C21.938 21.5977 23.1319 20.4038 23.1319 18.931V17.3308C23.1319 16.9626 23.4304 16.6641 23.7986 16.6641H25.5319C25.9001 16.6641 26.1986 16.9626 26.1986 17.3308V19.3308C26.1986 22.2763 23.8108 24.6641 20.8652 24.6641Z" }, "2")],
  "MediaRepeatOn",
  "0 0 32 32"
);
function RepeatButton({
  size = "md",
  iconSize,
  color,
  activeColor = "primary",
  className
}) {
  const playerReady = usePlayerStore((s) => s.providerReady);
  const repeating = usePlayerStore((s) => s.repeat);
  const player = usePlayerActions();
  let label;
  if (repeating === "all") {
    label = /* @__PURE__ */ jsx(Trans, { message: "Enable repeat one" });
  } else if (repeating === "one") {
    label = /* @__PURE__ */ jsx(Trans, { message: "Disable repeat" });
  } else {
    label = /* @__PURE__ */ jsx(Trans, { message: "Enable repeat" });
  }
  return /* @__PURE__ */ jsx(Tooltip, { label, children: /* @__PURE__ */ jsx(
    IconButton,
    {
      disabled: !playerReady,
      size,
      color: repeating ? activeColor : color,
      iconSize,
      className,
      onClick: () => {
        player.toggleRepeatMode();
      },
      children: repeating === "one" ? /* @__PURE__ */ jsx(MediaRepeatOnIcon, {}) : /* @__PURE__ */ jsx(MediaRepeatIcon, {})
    }
  ) });
}
function PlaybackControls({ className }) {
  return /* @__PURE__ */ jsxs("div", { className, children: [
    /* @__PURE__ */ jsx(PlaybackButtons, {}),
    /* @__PURE__ */ jsx(MainSeekbar, {})
  ] });
}
function PlaybackButtons() {
  const isMobile = useIsMobileMediaQuery();
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "flex items-center justify-center gap-6",
        isMobile && "mb-20"
      ),
      children: [
        /* @__PURE__ */ jsx(ShuffleButton, { iconSize: isMobile ? "md" : "sm" }),
        /* @__PURE__ */ jsx(PreviousButton, { size: "md" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(BufferingIndicator, {}),
          /* @__PURE__ */ jsx(PlayButton, { size: "md", iconSize: "xl" })
        ] }),
        /* @__PURE__ */ jsx(NextButton, { size: "md" }),
        /* @__PURE__ */ jsx(RepeatButton, { iconSize: isMobile ? "md" : "sm" })
      ]
    }
  );
}
const MediaMicrophoneIcon = createSvgIcon(
  [/* @__PURE__ */ jsx("path", { d: "M22.3257 15.8354C22.1263 15.8695 21.9256 15.7966 21.7826 15.6536L16.347 10.218C16.2039 10.0749 16.1311 9.87422 16.1652 9.67483C16.3448 8.62476 16.84 7.61813 17.6506 6.80752C19.7334 4.72472 23.1103 4.72472 25.193 6.80752C27.2758 8.89032 27.2758 12.2672 25.193 14.35C24.3824 15.1606 23.3758 15.6557 22.3257 15.8354Z" }, "0"), /* @__PURE__ */ jsx("path", { d: "M15.3386 12.9809C15.0613 12.7036 14.6058 12.7244 14.3549 13.0257L5.78725 23.3142C5.56666 23.5791 5.58439 23.9685 5.82814 24.2122L7.79205 26.1761C8.03586 26.42 8.42536 26.4376 8.69024 26.2169L18.9754 17.6459C19.2766 17.3949 19.2972 16.9395 19.02 16.6623L15.3386 12.9809Z" }, "1")],
  "MediaMicrophone",
  "0 0 32 32"
);
function LyricsButton() {
  const { player } = useSettings();
  const track = useCuedTrack();
  const navigate = useNavigate();
  const isOnLyricsPage = !!useMatch("/lyrics");
  const { key } = useLocation();
  const hasPreviousUrl = key !== "default";
  if (!track || (player == null ? void 0 : player.hide_lyrics)) {
    return null;
  }
  return /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Lyrics" }), children: /* @__PURE__ */ jsx(
    IconButton,
    {
      onClick: () => {
        if (isOnLyricsPage) {
          if (hasPreviousUrl) {
            navigate(-1);
          }
        } else {
          navigate(`/lyrics`);
        }
      },
      color: isOnLyricsPage ? "primary" : void 0,
      children: /* @__PURE__ */ jsx(MediaMicrophoneIcon, {})
    }
  ) });
}
function DownloadTrackButton() {
  const { player, base_url } = useSettings();
  const track = useCuedTrack();
  const { hasPermission } = useAuth();
  if (!(player == null ? void 0 : player.enable_download) || !track || !trackIsLocallyUploaded(track) || !hasPermission("music.download")) {
    return null;
  }
  return /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Download" }), children: /* @__PURE__ */ jsx(
    IconButton,
    {
      onClick: () => {
        downloadFileFromUrl(`${base_url}/api/v1/tracks/${track.id}/download`);
      },
      children: /* @__PURE__ */ jsx(DownloadIcon, {})
    }
  ) });
}
const MediaQueueListIcon = createSvgIcon(
  [/* @__PURE__ */ jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M7.33335 6C6.96516 6 6.66669 6.29848 6.66669 6.66667V13.3333C6.66669 13.7015 6.96516 14 7.33335 14H24.6667C25.0349 14 25.3334 13.7015 25.3334 13.3333V6.66667C25.3334 6.29848 25.0349 6 24.6667 6H7.33335ZM9.46669 8.66667C9.39305 8.66667 9.33335 8.72636 9.33335 8.8V11.2C9.33335 11.2736 9.39305 11.3333 9.46669 11.3333H22.5334C22.607 11.3333 22.6667 11.2736 22.6667 11.2V8.8C22.6667 8.72636 22.607 8.66667 22.5334 8.66667H9.46669Z" }, "0"), /* @__PURE__ */ jsx("path", { d: "M6.66669 18C6.66669 17.6318 6.96516 17.3333 7.33335 17.3333H24.6667C25.0349 17.3333 25.3334 17.6318 25.3334 18V19.3333C25.3334 19.7015 25.0349 20 24.6667 20H7.33335C6.96516 20 6.66669 19.7015 6.66669 19.3333V18Z" }, "1"), /* @__PURE__ */ jsx("path", { d: "M6.66669 24C6.66669 23.6318 6.96516 23.3333 7.33335 23.3333H24.6667C25.0349 23.3333 25.3334 23.6318 25.3334 24V25.3333C25.3334 25.7015 25.0349 26 24.6667 26H7.33335C6.96516 26 6.66669 25.7015 6.66669 25.3333V24Z" }, "2")],
  "MediaQueueList",
  "0 0 32 32"
);
const MediaMuteIcon = createSvgIcon(
  [/* @__PURE__ */ jsx("path", { d: "M17.5091 24.6594C17.5091 25.2066 16.8864 25.5208 16.4463 25.1956L9.44847 20.0252C9.42553 20.0083 9.39776 19.9991 9.36923 19.9991H4.66667C4.29848 19.9991 4 19.7006 4 19.3325V12.6658C4 12.2976 4.29848 11.9991 4.66667 11.9991H9.37115C9.39967 11.9991 9.42745 11.99 9.45039 11.973L16.4463 6.8036C16.8863 6.47842 17.5091 6.79259 17.5091 7.33977L17.5091 24.6594Z" }, "0"), /* @__PURE__ */ jsx("path", { d: "M28.8621 13.6422C29.1225 13.3818 29.1225 12.9597 28.8621 12.6994L27.9193 11.7566C27.659 11.4962 27.2368 11.4962 26.9765 11.7566L24.7134 14.0197C24.6613 14.0717 24.5769 14.0717 24.5248 14.0197L22.262 11.7568C22.0016 11.4964 21.5795 11.4964 21.3191 11.7568L20.3763 12.6996C20.116 12.9599 20.116 13.382 20.3763 13.6424L22.6392 15.9053C22.6913 15.9573 22.6913 16.0418 22.6392 16.0938L20.3768 18.3562C20.1165 18.6166 20.1165 19.0387 20.3768 19.299L21.3196 20.2419C21.58 20.5022 22.0021 20.5022 22.2624 20.2418L24.5248 17.9795C24.5769 17.9274 24.6613 17.9274 24.7134 17.9795L26.976 20.2421C27.2363 20.5024 27.6585 20.5024 27.9188 20.2421L28.8616 19.2992C29.122 19.0389 29.122 18.6168 28.8616 18.3564L26.599 16.0938C26.547 16.0418 26.547 15.9573 26.599 15.9053L28.8621 13.6422Z" }, "1")],
  "MediaMute",
  "0 0 32 32"
);
const MediaVolumeLowIcon = createSvgIcon(
  [/* @__PURE__ */ jsx("path", { d: "M17.5091 24.6594C17.5091 25.2066 16.8864 25.5207 16.4463 25.1956L9.44847 20.0252C9.42553 20.0083 9.39776 19.9991 9.36923 19.9991H4.66667C4.29848 19.9991 4 19.7006 4 19.3324V12.6658C4 12.2976 4.29848 11.9991 4.66667 11.9991H9.37115C9.39967 11.9991 9.42745 11.99 9.45039 11.973L16.4463 6.80358C16.8863 6.4784 17.5091 6.79258 17.5091 7.33975L17.5091 24.6594Z" }, "0"), /* @__PURE__ */ jsx("path", { d: "M22.8424 12.6667C22.8424 12.2985 22.544 12 22.1758 12H20.8424C20.4743 12 20.1758 12.2985 20.1758 12.6667V19.3333C20.1758 19.7015 20.4743 20 20.8424 20H22.1758C22.544 20 22.8424 19.7015 22.8424 19.3333V12.6667Z" }, "1")],
  "MediaVolumeLow",
  "0 0 32 32"
);
const MediaVolumeHighIcon = createSvgIcon(
  [/* @__PURE__ */ jsx("path", { d: "M17.5091 24.6595C17.5091 25.2066 16.8864 25.5208 16.4463 25.1956L9.44847 20.0252C9.42553 20.0083 9.39776 19.9992 9.36923 19.9992H4.66667C4.29848 19.9992 4 19.7007 4 19.3325V12.6658C4 12.2976 4.29848 11.9992 4.66667 11.9992H9.37115C9.39967 11.9992 9.42745 11.99 9.45039 11.9731L16.4463 6.80363C16.8863 6.47845 17.5091 6.79262 17.5091 7.3398L17.5091 24.6595Z" }, "0"), /* @__PURE__ */ jsx("path", { d: "M27.5091 9.33336C27.8773 9.33336 28.1758 9.63184 28.1758 10V22C28.1758 22.3682 27.8773 22.6667 27.5091 22.6667H26.1758C25.8076 22.6667 25.5091 22.3682 25.5091 22V10C25.5091 9.63184 25.8076 9.33336 26.1758 9.33336L27.5091 9.33336Z" }, "1"), /* @__PURE__ */ jsx("path", { d: "M22.1758 12C22.544 12 22.8424 12.2985 22.8424 12.6667V19.3334C22.8424 19.7016 22.544 20 22.1758 20H20.8424C20.4743 20 20.1758 19.7016 20.1758 19.3334V12.6667C20.1758 12.2985 20.4743 12 20.8424 12H22.1758Z" }, "2")],
  "MediaVolumeHigh",
  "0 0 32 32"
);
function VolumeControls({
  trackColor,
  fillColor,
  buttonColor,
  className
}) {
  const volume = usePlayerStore((s) => s.volume);
  const player = usePlayerActions();
  const playerReady = usePlayerStore((s) => s.providerReady);
  return /* @__PURE__ */ jsxs("div", { className: clsx("flex w-min items-center gap-4", className), children: [
    /* @__PURE__ */ jsx(ToggleMuteButton, { color: buttonColor }),
    /* @__PURE__ */ jsx(
      Slider,
      {
        isDisabled: !playerReady,
        showThumbOnHoverOnly: true,
        thumbSize: "w-14 h-14",
        trackColor,
        fillColor,
        minValue: 0,
        maxValue: 100,
        className: "flex-auto",
        width: "w-96",
        value: volume,
        onChange: (value) => {
          player.setVolume(value);
        }
      }
    )
  ] });
}
function ToggleMuteButton({
  color,
  size = "sm",
  iconSize = "md"
}) {
  const isMuted = usePlayerStore((s) => s.muted);
  const volume = usePlayerStore((s) => s.volume);
  const player = usePlayerActions();
  const playerReady = usePlayerStore((s) => s.providerReady);
  if (isMuted) {
    return /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Unmute" }), usePortal: false, children: /* @__PURE__ */ jsx(
      IconButton,
      {
        disabled: !playerReady,
        color,
        size,
        iconSize,
        onClick: () => player.setMuted(false),
        children: /* @__PURE__ */ jsx(MediaMuteIcon, {})
      }
    ) });
  }
  return /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Mute" }), children: /* @__PURE__ */ jsx(
    IconButton,
    {
      disabled: !playerReady,
      color,
      size,
      iconSize,
      onClick: () => player.setMuted(true),
      children: volume < 40 ? /* @__PURE__ */ jsx(MediaVolumeLowIcon, {}) : /* @__PURE__ */ jsx(MediaVolumeHighIcon, {})
    }
  ) });
}
function DesktopPlayerControls() {
  const mediaIsCued = usePlayerStore((s) => s.cuedMedia != null);
  if (!mediaIsCued)
    return null;
  return /* @__PURE__ */ jsxs("div", { className: "dashboard-grid-footer z-30 flex h-96 items-center justify-between border-t bg px-16", children: [
    /* @__PURE__ */ jsx(QueuedTrack$1, {}),
    /* @__PURE__ */ jsx(PlaybackControls, { className: "w-2/5 max-w-[722px]" }),
    /* @__PURE__ */ jsx(SecondaryControls, {})
  ] });
}
function QueuedTrack$1() {
  var _a2;
  const track = useCuedTrack();
  let content;
  if (track) {
    content = /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-14", children: [
      /* @__PURE__ */ jsxs(DialogTrigger, { type: "popover", triggerOnContextMenu: true, placement: "top", children: [
        /* @__PURE__ */ jsx(Link, { to: getTrackLink(track), className: "flex-shrink-0", children: /* @__PURE__ */ jsx(
          TrackImage,
          {
            className: "h-56 w-56 rounded object-cover",
            track
          }
        ) }),
        /* @__PURE__ */ jsx(TrackContextDialog, { tracks: [track] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0 overflow-hidden overflow-ellipsis", children: [
        /* @__PURE__ */ jsxs(DialogTrigger, { type: "popover", triggerOnContextMenu: true, placement: "top", children: [
          /* @__PURE__ */ jsx(
            TrackLink,
            {
              track,
              className: "min-w-0 max-w-full whitespace-nowrap text-sm"
            }
          ),
          /* @__PURE__ */ jsx(TrackContextDialog, { tracks: [track] })
        ] }),
        ((_a2 = track.artists) == null ? void 0 : _a2.length) ? /* @__PURE__ */ jsxs(DialogTrigger, { type: "popover", triggerOnContextMenu: true, placement: "top", children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted", children: /* @__PURE__ */ jsx(
            ArtistLinks,
            {
              artists: track.artists,
              className: "whitespace-nowrap"
            }
          ) }),
          /* @__PURE__ */ jsx(ArtistContextDialog, { artist: track.artists[0] })
        ] }) : null
      ] }),
      /* @__PURE__ */ jsx(LikeIconButton, { likeable: track })
    ] });
  } else {
    content = null;
  }
  return /* @__PURE__ */ jsx("div", { className: "w-[30%] min-w-180", children: content });
}
function SecondaryControls() {
  const { rightSidenavStatus, setRightSidenavStatus } = useContext(
    DashboardLayoutContext
  );
  return /* @__PURE__ */ jsxs("div", { className: "flex w-[30%] min-w-180 items-center justify-end", children: [
    /* @__PURE__ */ jsx(LyricsButton, {}),
    /* @__PURE__ */ jsx(DownloadTrackButton, {}),
    /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Queue" }), children: /* @__PURE__ */ jsx(
      IconButton,
      {
        className: "flex-shrink-0",
        onClick: () => {
          setRightSidenavStatus(
            rightSidenavStatus === "closed" ? "open" : "closed"
          );
        },
        children: /* @__PURE__ */ jsx(MediaQueueListIcon, {})
      }
    ) }),
    /* @__PURE__ */ jsx(VolumeControls, { trackColor: "neutral" }),
    /* @__PURE__ */ jsx(OverlayButton, {})
  ] });
}
function OverlayButton() {
  const isActive = usePlayerOverlayStore((s) => s.isMaximized);
  const playerReady = usePlayerStore((s) => s.providerReady);
  const { player } = useSettings();
  if (player == null ? void 0 : player.hide_video_button) {
    return null;
  }
  return /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Expand" }), children: /* @__PURE__ */ jsx(
    IconButton,
    {
      className: "ml-26 flex-shrink-0",
      color: "chip",
      variant: "flat",
      size: "xs",
      iconSize: "sm",
      disabled: !playerReady,
      onClick: () => {
        playerOverlayState.toggle();
      },
      children: isActive ? /* @__PURE__ */ jsx(KeyboardArrowDownIcon, {}) : /* @__PURE__ */ jsx(KeyboardArrowUpIcon, {})
    }
  ) });
}
function isNumber$1(value) {
  return typeof value === "number" && !Number.isNaN(value);
}
const loadImage = (src, minWidth = 1) => new Promise((resolve, reject) => {
  const image = new Image();
  const handler = () => {
    delete image.onload;
    delete image.onerror;
    if (image.naturalWidth >= minWidth) {
      resolve(image);
    } else {
      reject("Could not load youtube image");
    }
  };
  Object.assign(image, { onload: handler, onerror: handler, src });
});
const posterCache = /* @__PURE__ */ new Map();
async function loadYoutubePoster(videoId) {
  if (!videoId)
    return;
  if (posterCache.has(videoId)) {
    return posterCache.get(videoId);
  }
  const posterURL = (quality) => `https://i.ytimg.com/vi/${videoId}/${quality}.jpg`;
  return loadImage(posterURL("maxresdefault"), 121).catch(() => loadImage(posterURL("sddefault"), 121)).catch(() => loadImage(posterURL("hqdefault"), 121)).catch(() => {
  }).then((img) => {
    if (!img)
      return;
    const poster = img.src;
    posterCache.set(videoId, poster);
    return poster;
  });
}
function handleYoutubeEmbedMessage(e, internalStateRef, iframeRef, store) {
  var _a2, _b2;
  const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
  const info = data.info;
  const internalState = internalStateRef.current;
  const emit = store.getState().emit;
  if (!info)
    return;
  if ((_a2 = info.videoData) == null ? void 0 : _a2.video_id) {
    internalState.videoId = info.videoData.video_id;
  }
  if ((_b2 = info.videoData) == null ? void 0 : _b2.errorCode) {
    const event = {
      code: info.videoData.errorCode,
      videoId: internalState.videoId
    };
    emit("error", { sourceEvent: event });
  }
  if (isNumber$1(info.duration) && info.duration !== internalState.duration) {
    internalState.duration = info.duration;
    emit("durationChange", { duration: internalState.duration });
  }
  if (isNumber$1(info.currentTime) && info.currentTime !== internalState.currentTime) {
    internalState.currentTime = info.currentTime;
    if (!store.getState().isSeeking) {
      emit("progress", { currentTime: internalState.currentTime });
    }
  }
  if (isNumber$1(info.currentTimeLastUpdated)) {
    internalState.lastTimeUpdate = info.currentTimeLastUpdated;
  }
  if (isNumber$1(info.playbackRate)) {
    if (internalState.playbackRate !== info.playbackRate) {
      emit("playbackRateChange", { rate: info.playbackRate });
    }
    internalState.playbackRate = info.playbackRate;
  }
  if (isNumber$1(info.videoLoadedFraction)) {
    const buffered = info.videoLoadedFraction * internalState.duration;
    if (internalState.buffered !== buffered) {
      emit("buffered", {
        seconds: info.videoLoadedFraction * internalState.duration
      });
    }
    internalState.buffered = buffered;
  }
  if (Array.isArray(info.availablePlaybackRates)) {
    emit("playbackRates", { rates: info.availablePlaybackRates });
  }
  if (isNumber$1(info.playerState)) {
    onYoutubeStateChange(info, internalStateRef, iframeRef, store);
    internalState.state = info.playerState;
  }
}
function onYoutubeStateChange(info, internalStateRef, iframeRef, store) {
  const emit = store.getState().emit;
  const state = info.playerState;
  const onCued = async () => {
    var _a2, _b2;
    if (((_a2 = info.videoData) == null ? void 0 : _a2.video_id) && !((_b2 = store.getState().cuedMedia) == null ? void 0 : _b2.poster)) {
      const url = await loadYoutubePoster(info.videoData.video_id);
      if (url) {
        store.getState().emit("posterLoaded", { url });
      }
    }
    if (!internalStateRef.current.playbackReady) {
      emit("providerReady", { el: iframeRef.current });
      internalStateRef.current.playbackReady = true;
    }
    emit("cued");
  };
  emit("youtubeStateChange", { state });
  emit("buffering", { isBuffering: state === YouTubePlayerState.Buffering });
  if (state !== YouTubePlayerState.Ended) {
    internalStateRef.current.firedPlaybackEnd = false;
  }
  switch (state) {
    case YouTubePlayerState.Unstarted:
      onCued();
      break;
    case YouTubePlayerState.Ended:
      if (!internalStateRef.current.firedPlaybackEnd) {
        emit("playbackEnd");
        internalStateRef.current.firedPlaybackEnd = true;
      }
      break;
    case YouTubePlayerState.Playing:
      onCued();
      emit("play");
      break;
    case YouTubePlayerState.Paused:
      emit("pause");
      break;
    case YouTubePlayerState.Cued:
      onCued();
      break;
  }
}
function youtubeIdFromSrc(src) {
  var _a2;
  return (_a2 = src.match(/((?:\w|-){11})/)) == null ? void 0 : _a2[0];
}
const queryString = "&controls=0&disablekb=1&enablejsapi=1&iv_load_policy=3&modestbranding=1&playsinline=1&rel=0&showinfo=0";
function useYoutubeProviderSrc(loadVideoById) {
  var _a2;
  const { getState, emit } = usePlayerActions();
  const options = usePlayerStore((s) => s.options);
  const media = usePlayerStore((s) => s.cuedMedia);
  const origin = ((_a2 = options.youtube) == null ? void 0 : _a2.useCookies) ? "https://www.youtube.com" : "https://www.youtube-nocookie.com";
  const [initialVideoId, setInitialVideoId] = useState(() => {
    if ((media == null ? void 0 : media.src) && media.src !== "resolve") {
      return youtubeIdFromSrc(media.src);
    }
  });
  const updateVideoIds = useCallback(
    (src) => {
      const videoId = youtubeIdFromSrc(src);
      if (!videoId)
        return;
      setInitialVideoId((prevId) => {
        if (!prevId) {
          return videoId;
        } else {
          loadVideoById(videoId);
          return prevId;
        }
      });
    },
    [loadVideoById]
  );
  useEffect(() => {
    var _a3, _b2;
    if ((media == null ? void 0 : media.src) && media.src !== "resolve") {
      updateVideoIds(media.src);
    } else if (media) {
      emit("buffering", { isBuffering: true });
      (_b2 = (_a3 = options.youtube) == null ? void 0 : _a3.srcResolver) == null ? void 0 : _b2.call(_a3, media).then((item) => {
        var _a4;
        if ((item == null ? void 0 : item.src) && ((_a4 = getState().cuedMedia) == null ? void 0 : _a4.id) === item.id) {
          updateVideoIds(item.src);
        }
      });
    }
  }, [options, updateVideoIds, media == null ? void 0 : media.id]);
  return {
    initialVideoUrl: initialVideoId ? `${origin}/embed/${initialVideoId}?${queryString}&autoplay=${options.autoPlay ? "1" : "0"}&mute=${getState().muted ? "1" : "0"}&start=${(media == null ? void 0 : media.initialTime) ?? 0}` : void 0,
    origin
  };
}
function YoutubeProvider() {
  const { addGlobalListener, removeAllGlobalListeners } = useGlobalListeners();
  const iframeRef = useRef(null);
  const youtubeApi = useCallback(
    (command, arg) => {
      var _a2, _b2;
      return (_b2 = (_a2 = iframeRef.current) == null ? void 0 : _a2.contentWindow) == null ? void 0 : _b2.postMessage(
        JSON.stringify({
          event: "command",
          func: command,
          args: arg ? [arg] : void 0
        }),
        "*"
      );
    },
    []
  );
  const loadVideoById = useCallback(
    (videoId) => {
      youtubeApi(YoutubeCommand.CueAndPlay, videoId);
    },
    [youtubeApi]
  );
  const { initialVideoUrl, origin } = useYoutubeProviderSrc(loadVideoById);
  const store = useContext(PlayerStoreContext);
  const internalStateRef = useRef({
    duration: 0,
    currentTime: 0,
    lastTimeUpdate: 0,
    playbackRate: 1,
    state: -1,
    playbackReady: false,
    buffered: 0,
    firedPlaybackEnd: false
  });
  const registerApi = useCallback(() => {
    const internalProviderApi = {
      loadVideoById
    };
    store.setState({
      providerApi: {
        play: () => {
          youtubeApi(YoutubeCommand.Play);
        },
        pause: () => {
          youtubeApi(YoutubeCommand.Pause);
        },
        stop: () => {
          youtubeApi(YoutubeCommand.Stop);
        },
        seek: (time) => {
          if (time !== internalStateRef.current.currentTime) {
            youtubeApi(YoutubeCommand.Seek, time);
          }
        },
        setVolume: (volume) => {
          youtubeApi(YoutubeCommand.SetVolume, volume);
        },
        setMuted: (muted) => {
          if (muted) {
            youtubeApi(YoutubeCommand.Mute);
          } else {
            youtubeApi(YoutubeCommand.Unmute);
          }
        },
        setPlaybackRate: (value) => {
          youtubeApi(YoutubeCommand.SetPlaybackRate, value);
        },
        setPlaybackQuality: (value) => {
          youtubeApi(YoutubeCommand.SetPlaybackQuality, value);
        },
        getCurrentTime: () => {
          return internalStateRef.current.currentTime;
        },
        getSrc: () => {
          return internalStateRef.current.videoId;
        },
        internalProviderApi
      }
    });
  }, [store, loadVideoById, youtubeApi]);
  useEffect(() => {
    addGlobalListener(window, "message", (event) => {
      var _a2;
      const e = event;
      if (e.origin === origin && e.source === ((_a2 = iframeRef.current) == null ? void 0 : _a2.contentWindow)) {
        handleYoutubeEmbedMessage(e, internalStateRef, iframeRef, store);
      }
    });
    registerApi();
    return () => {
      removeAllGlobalListeners();
    };
  }, [addGlobalListener, removeAllGlobalListeners, store, origin, registerApi]);
  if (!initialVideoUrl) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "iframe",
    {
      className: "w-full h-full",
      ref: iframeRef,
      src: initialVideoUrl,
      allowFullScreen: true,
      allow: "autoplay; encrypted-media; picture-in-picture;",
      onLoad: () => {
        setTimeout(() => {
          var _a2, _b2;
          (_b2 = (_a2 = iframeRef.current) == null ? void 0 : _a2.contentWindow) == null ? void 0 : _b2.postMessage(
            JSON.stringify({ event: "listening" }),
            "*"
          );
          registerApi();
        });
      }
    }
  );
}
function createRafLoop(callback) {
  let id;
  function start() {
    if (!isUndefined(id))
      return;
    loop();
  }
  function loop() {
    id = window.requestAnimationFrame(function rafLoop() {
      if (isUndefined(id))
        return;
      callback();
      loop();
    });
  }
  function stop() {
    if (isNumber(id))
      window.cancelAnimationFrame(id);
    id = void 0;
  }
  return {
    start,
    stop
  };
}
function isUndefined(value) {
  return typeof value === "undefined";
}
function isNumber(value) {
  return typeof value === "number" && !Number.isNaN(value);
}
function useHtmlMediaInternalState(ref) {
  const store = useContext(PlayerStoreContext);
  const cuedMedia = usePlayerStore((s) => s.cuedMedia);
  const internalState = useRef({
    currentTime: 0,
    buffered: 0,
    isMediaWaiting: false,
    playbackReady: false,
    /**
     * The `timeupdate` event fires surprisingly infrequently during playback, meaning your progress
     * bar (or whatever else is synced to the currentTime) moves in a choppy fashion. This helps
     * resolve that by retrieving time updates in a request animation frame loop.
     */
    timeRafLoop: createRafLoop(() => {
      updateCurrentTime();
      updateBuffered();
    })
  });
  const updateBuffered = useCallback(() => {
    var _a2;
    const timeRange = (_a2 = ref.current) == null ? void 0 : _a2.buffered;
    const seconds = !timeRange || timeRange.length === 0 ? 0 : timeRange.end(timeRange.length - 1);
    if (internalState.current.buffered !== seconds) {
      store.getState().emit("buffered", { seconds });
      internalState.current.buffered = seconds;
    }
  }, [ref, store]);
  const updateCurrentTime = useCallback(() => {
    var _a2;
    const newTime = ((_a2 = ref.current) == null ? void 0 : _a2.currentTime) || 0;
    if (internalState.current.currentTime !== newTime && !store.getState().isSeeking) {
      store.getState().emit("progress", { currentTime: newTime });
      internalState.current.currentTime = newTime;
    }
  }, [internalState, store, ref]);
  const toggleTextTrackModes = useCallback(
    (newTrackId, isVisible) => {
      if (!ref.current)
        return;
      const { textTracks } = ref.current;
      if (newTrackId === -1) {
        Array.from(textTracks).forEach((track) => {
          track.mode = "disabled";
        });
      } else {
        const oldTrack = textTracks[store.getState().currentTextTrack];
        if (oldTrack)
          oldTrack.mode = "disabled";
      }
      const nextTrack = textTracks[newTrackId];
      if (nextTrack) {
        nextTrack.mode = isVisible ? "showing" : "hidden";
      }
      store.getState().emit("currentTextTrackChange", {
        trackId: !isVisible ? -1 : newTrackId
      });
      store.getState().emit("textTrackVisibilityChange", { isVisible });
    },
    [ref, store]
  );
  useEffect(() => {
    const timeRafLoop = internalState.current.timeRafLoop;
    return () => {
      timeRafLoop.stop();
    };
  }, []);
  useEffect(() => {
    var _a2;
    (_a2 = ref.current) == null ? void 0 : _a2.load();
  }, [cuedMedia == null ? void 0 : cuedMedia.src, ref]);
  return {
    ref,
    internalState,
    updateCurrentTime,
    toggleTextTrackModes,
    updateBuffered
  };
}
const defaultPlaybackRates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
function useHtmlMediaEvents({
  ref,
  updateCurrentTime,
  updateBuffered,
  internalState
}) {
  const store = useContext(PlayerStoreContext);
  const onTextTracksChange = useCallback(() => {
    if (!ref.current)
      return;
    const tracks = Array.from(ref.current.textTracks).filter(
      (t) => t.label && (t.kind === "subtitles" || t.kind === "captions")
    );
    let trackId = -1;
    for (let id = 0; id < tracks.length; id += 1) {
      if (tracks[id].mode === "hidden") {
        trackId = id;
      } else if (tracks[id].mode === "showing") {
        trackId = id;
        break;
      }
    }
    const isVisible = trackId !== -1 && tracks[trackId].mode === "showing";
    store.getState().emit("currentTextTrackChange", { trackId });
    store.getState().emit("textTrackVisibilityChange", { isVisible });
    store.getState().emit("textTracks", { tracks });
  }, [ref, store]);
  useEffect(() => {
    const el = ref.current;
    return () => {
      el == null ? void 0 : el.textTracks.removeEventListener("change", onTextTracksChange);
    };
  }, [ref, onTextTracksChange]);
  return useMemo(() => {
    const emit = store.getState().emit;
    return {
      // set some common props used on audio/video/hls/dash providers
      autoPlay: false,
      onContextMenu: (e) => e.preventDefault(),
      controlsList: "nodownload",
      preload: "metadata",
      "x-webkit-airplay": "allow",
      onEnded: () => {
        emit("playbackEnd");
        updateCurrentTime();
        internalState.current.timeRafLoop.stop();
      },
      onStalled: (e) => {
        if (e.currentTarget.readyState < 3) {
          emit("buffering", { isBuffering: true });
        }
      },
      onWaiting: () => {
        emit("buffering", { isBuffering: true });
      },
      onPlaying: () => {
        emit("play");
        emit("buffering", { isBuffering: false });
      },
      onPause: (e) => {
        emit("pause");
        emit("buffering", { isBuffering: false });
        internalState.current.timeRafLoop.stop();
      },
      onSuspend: () => {
        emit("buffering", { isBuffering: false });
      },
      onSeeking: () => {
        updateCurrentTime();
      },
      onSeeked: () => {
        updateCurrentTime();
      },
      onTimeUpdate: () => {
        updateCurrentTime();
      },
      onError: (e) => {
        emit("error", { sourceEvent: e });
      },
      onDurationChange: (e) => {
        updateCurrentTime();
        emit("durationChange", { duration: e.currentTarget.duration });
      },
      onRateChange: (e) => {
        emit("playbackRateChange", { rate: e.currentTarget.playbackRate });
      },
      onLoadedMetadata: (e) => {
        if (!internalState.current.playbackReady) {
          emit("providerReady", { el: e.currentTarget });
          internalState.current.playbackReady = true;
          updateBuffered();
          onTextTracksChange();
          e.currentTarget.textTracks.addEventListener("change", () => {
            onTextTracksChange();
          });
        }
        emit("cued");
        emit("playbackRates", { rates: defaultPlaybackRates });
      }
    };
  }, [
    internalState,
    store,
    updateCurrentTime,
    onTextTracksChange,
    updateBuffered
  ]);
}
function useHtmlMediaApi({
  ref,
  internalState,
  toggleTextTrackModes
}) {
  const store = useContext(PlayerStoreContext);
  return useMemo(
    () => ({
      play: async () => {
        var _a2;
        try {
          await ((_a2 = ref.current) == null ? void 0 : _a2.play());
        } catch (e) {
          store.getState().emit("error", { sourceEvent: e });
        }
        internalState.current.timeRafLoop.start();
      },
      pause: () => {
        var _a2;
        (_a2 = ref.current) == null ? void 0 : _a2.pause();
        internalState.current.timeRafLoop.stop();
      },
      stop: () => {
        if (ref.current) {
          ref.current.pause();
          ref.current.currentTime = 0;
        }
      },
      seek: (time) => {
        if (time !== internalState.current.currentTime && ref.current) {
          ref.current.currentTime = time;
        }
      },
      setVolume: (volume) => {
        if (ref.current) {
          ref.current.volume = volume / 100;
        }
      },
      setMuted: (muted) => {
        if (ref.current) {
          ref.current.muted = muted;
        }
      },
      setPlaybackRate: (value) => {
        if (ref.current) {
          ref.current.playbackRate = value;
        }
      },
      setTextTrackVisibility: (isVisible) => {
        toggleTextTrackModes(store.getState().currentTextTrack, isVisible);
      },
      setCurrentTextTrack: (newTrackId) => {
        toggleTextTrackModes(newTrackId, store.getState().textTrackIsVisible);
      },
      getCurrentTime: () => {
        return internalState.current.currentTime;
      },
      getSrc: () => {
        var _a2;
        return (_a2 = ref.current) == null ? void 0 : _a2.src;
      }
    }),
    [ref, store, internalState, toggleTextTrackModes]
  );
}
function HtmlVideoProvider() {
  var _a2;
  const ref = useRef(null);
  const autoPlay = usePlayerStore((s) => s.options.autoPlay);
  const muted = usePlayerStore((s) => s.muted);
  const cuedMedia = usePlayerStore((s) => s.cuedMedia);
  const store = useContext(PlayerStoreContext);
  const state = useHtmlMediaInternalState(ref);
  const events = useHtmlMediaEvents(state);
  const providerApi = useHtmlMediaApi(state);
  useEffect(() => {
    store.setState({
      providerApi
    });
  }, [store, providerApi]);
  let src = cuedMedia == null ? void 0 : cuedMedia.src;
  if (src && (cuedMedia == null ? void 0 : cuedMedia.initialTime)) {
    src = `${src}#t=${cuedMedia.initialTime}`;
  }
  return /* @__PURE__ */ jsx(
    "video",
    {
      className: "w-full h-full",
      ref,
      src,
      playsInline: true,
      poster: cuedMedia == null ? void 0 : cuedMedia.poster,
      autoPlay,
      muted,
      ...events,
      children: (_a2 = cuedMedia == null ? void 0 : cuedMedia.captions) == null ? void 0 : _a2.map((caption, index) => /* @__PURE__ */ jsx(
        "track",
        {
          label: caption.label,
          kind: "subtitles",
          srcLang: caption.language || "en",
          src: caption.src,
          default: index === 0
        },
        caption.id
      ))
    }
  );
}
function HtmlAudioProvider() {
  const ref = useRef(null);
  useRef(null);
  let previousSrc = null;
  const { analyzerData, setAnalyzerData } = useMyContext();
  const autoPlay = usePlayerStore((s) => s.options.autoPlay);
  const muted = usePlayerStore((s) => s.muted);
  const cuedMedia = usePlayerStore((s) => s.cuedMedia);
  const store = useContext(PlayerStoreContext);
  const state = useHtmlMediaInternalState(ref);
  const events = useHtmlMediaEvents(state);
  const providerApi = useHtmlMediaApi(state);
  const audioAnalyzer = async () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyzer = audioCtx.createAnalyser();
    analyzer.fftSize = 2048;
    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    if (ref.current && ref.current.src) {
      const source = audioCtx.createMediaElementSource(ref.current);
      source.connect(analyzer);
      source.connect(audioCtx.destination);
    }
    if (ref.current && !ref.current.paused) {
      setAnalyzerData({ analyzer, bufferLength, dataArray, audioCtx });
    }
    const logAudioData = () => {
      if (ref.current && !ref.current.paused) {
        analyzer.getByteFrequencyData(dataArray);
      }
      requestAnimationFrame(logAudioData);
    };
    logAudioData();
  };
  useEffect(() => {
    store.setState({
      providerApi
    });
  }, [store, providerApi]);
  useEffect(() => {
    if (ref.current) {
      if ((cuedMedia == null ? void 0 : cuedMedia.src) !== previousSrc) {
        previousSrc = cuedMedia == null ? void 0 : cuedMedia.src;
        ref.current.onplay = audioAnalyzer;
      }
    }
  }, [cuedMedia == null ? void 0 : cuedMedia.src]);
  let src = cuedMedia == null ? void 0 : cuedMedia.src;
  if (src && (cuedMedia == null ? void 0 : cuedMedia.initialTime)) {
    src = `${src}#t=${cuedMedia.initialTime}`;
  }
  return /* @__PURE__ */ jsx(
    "audio",
    {
      className: "h-full w-full",
      ref,
      src,
      autoPlay,
      muted,
      ...events
    }
  );
}
const HlsProvider = React.lazy(
  () => import("./hls-provider-ebcb6c6a.mjs")
);
const DashProvider = React.lazy(
  () => import("./dash-provider-2da83639.mjs")
);
const PlayerOutlet = memo(({ className }) => {
  const { getState } = useContext(PlayerStoreContext);
  useEffect(() => {
    getState().init();
    return getState().destroy;
  }, [getState]);
  return /* @__PURE__ */ jsx("div", { className, children: /* @__PURE__ */ jsx(Provider, {}) });
});
function Provider() {
  const provider = usePlayerStore((s) => s.providerName);
  switch (provider) {
    case "youtube":
      return /* @__PURE__ */ jsx(YoutubeProvider, {});
    case "htmlVideo":
      return /* @__PURE__ */ jsx(HtmlVideoProvider, {});
    case "htmlAudio":
      return /* @__PURE__ */ jsx(HtmlAudioProvider, {});
    case "hls":
      return /* @__PURE__ */ jsx(Suspense, { children: /* @__PURE__ */ jsx(HlsProvider, {}) });
    case "dash":
      return /* @__PURE__ */ jsx(Suspense, { children: /* @__PURE__ */ jsx(DashProvider, {}) });
    default:
      return null;
  }
}
function PlayerPoster({
  className,
  hideDuringPlayback = true,
  fallback,
  ...domProps
}) {
  const posterUrl = usePlayerStore((s) => s.posterUrl);
  const shouldHidePoster = usePlayerStore(
    (s) => hideDuringPlayback && s.playbackStarted && s.providerName !== "htmlAudio"
  );
  if (!posterUrl && !fallback)
    return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...domProps,
      className: clsx(
        "pointer-events-none flex max-h-full w-full items-center justify-center bg-black transition-opacity",
        shouldHidePoster ? "opacity-0" : "opacity-100",
        className
      ),
      children: posterUrl ? /* @__PURE__ */ jsx(
        "img",
        {
          loading: "lazy",
          src: posterUrl,
          alt: "",
          className: "max-h-full w-full flex-shrink-0 object-cover"
        }
      ) : fallback
    }
  );
}
const MediaFullscreenIcon = createSvgIcon(
  [/* @__PURE__ */ jsx("path", { d: "M25.3299 7.26517C25.2958 6.929 25.0119 6.66666 24.6667 6.66666H19.3334C18.9652 6.66666 18.6667 6.96514 18.6667 7.33333V9.33333C18.6667 9.70152 18.9652 10 19.3334 10L21.8667 10C21.9403 10 22 10.0597 22 10.1333V12.6667C22 13.0349 22.2985 13.3333 22.6667 13.3333H24.6667C25.0349 13.3333 25.3334 13.0349 25.3334 12.6667V7.33333C25.3334 7.31032 25.3322 7.28758 25.3299 7.26517Z" }, "0"), /* @__PURE__ */ jsx("path", { d: "M22 21.8667C22 21.9403 21.9403 22 21.8667 22L19.3334 22C18.9652 22 18.6667 22.2985 18.6667 22.6667V24.6667C18.6667 25.0349 18.9652 25.3333 19.3334 25.3333L24.6667 25.3333C25.0349 25.3333 25.3334 25.0349 25.3334 24.6667V19.3333C25.3334 18.9651 25.0349 18.6667 24.6667 18.6667H22.6667C22.2985 18.6667 22 18.9651 22 19.3333V21.8667Z" }, "1"), /* @__PURE__ */ jsx("path", { d: "M12.6667 22H10.1334C10.0597 22 10 21.9403 10 21.8667V19.3333C10 18.9651 9.70154 18.6667 9.33335 18.6667H7.33335C6.96516 18.6667 6.66669 18.9651 6.66669 19.3333V24.6667C6.66669 25.0349 6.96516 25.3333 7.33335 25.3333H12.6667C13.0349 25.3333 13.3334 25.0349 13.3334 24.6667V22.6667C13.3334 22.2985 13.0349 22 12.6667 22Z" }, "2"), /* @__PURE__ */ jsx("path", { d: "M10 12.6667V10.1333C10 10.0597 10.0597 10 10.1334 10L12.6667 10C13.0349 10 13.3334 9.70152 13.3334 9.33333V7.33333C13.3334 6.96514 13.0349 6.66666 12.6667 6.66666H7.33335C6.96516 6.66666 6.66669 6.96514 6.66669 7.33333V12.6667C6.66669 13.0349 6.96516 13.3333 7.33335 13.3333H9.33335C9.70154 13.3333 10 13.0349 10 12.6667Z" }, "3")],
  "MediaFullscreen",
  "0 0 32 32"
);
function usePlayerClickHandler() {
  const clickRef = useRef(0);
  const player = usePlayerActions();
  const togglePlay = useCallback(() => {
    if (player.getState().isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  }, [player]);
  return useCallback(() => {
    if (!player.getState().providerReady)
      return;
    clickRef.current += 1;
    togglePlay();
    if (clickRef.current === 1) {
      setTimeout(() => {
        if (clickRef.current > 1) {
          player.toggleFullscreen();
        }
        clickRef.current = 0;
      }, 300);
    }
  }, [player, togglePlay]);
}
function PlayerOverlay() {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const isMaximized = usePlayerOverlayStore((s) => s.isMaximized);
  const isQueueOpen = usePlayerOverlayStore((s) => s.isQueueOpen);
  const isFullscreen = usePlayerStore((s) => s.isFullscreen);
  const miniPlayerIsHidden = useMiniPlayerIsHidden();
  const overlayRef = useRef(null);
  const { pathname } = useLocation();
  const playerClickHandler = usePlayerClickHandler();
  const haveVideo = usePlayerStore(
    (s) => s.providerApi != null && s.providerName !== "htmlAudio"
  );
  const previousPathname = usePrevious(pathname);
  const cuedTrack = useCuedTrack();
  useEffect(() => {
    if (isMaximized && previousPathname && pathname !== previousPathname) {
      playerOverlayState.toggle();
    }
  }, [pathname, previousPathname, isMaximized]);
  useEffect(() => {
    if (!isMaximized)
      return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        playerOverlayState.toggle();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMaximized]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: overlayRef,
      className: clsx(
        "fixed right-0 bg outline-none transition-all",
        miniPlayerIsHidden && !isMaximized && "hidden",
        isMaximized ? "player-overlay-bg bottom-0 flex h-full w-full flex-col pb-50" : "bottom-96 right-0 h-[213px] w-256"
      ),
      children: [
        isMaximized && /* @__PURE__ */ jsxs("div", { className: "mb-10 flex flex-shrink-0 items-center p-10", children: [
          /* @__PURE__ */ jsx(
            IconButton,
            {
              iconSize: "lg",
              className: "mr-auto",
              onClick: () => playerOverlayState.toggle(),
              children: /* @__PURE__ */ jsx(KeyboardArrowDownIcon, {})
            }
          ),
          isMobile && /* @__PURE__ */ jsx(LyricsButton, {}),
          isMobile && /* @__PURE__ */ jsx(DownloadTrackButton, {}),
          /* @__PURE__ */ jsx(
            IconButton,
            {
              onClick: () => playerOverlayState.toggleQueue(),
              color: isQueueOpen ? "primary" : void 0,
              children: /* @__PURE__ */ jsx(MediaQueueListIcon, {})
            }
          ),
          /* @__PURE__ */ jsx(FullscreenButton, { overlayRef })
        ] }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            onClick: () => {
              if (!isFullscreen) {
                playerClickHandler();
              }
            },
            className: clsx(
              "relative min-h-0 max-w-full flex-auto",
              isMaximized ? "mx-auto mt-auto px-14" : "h-full w-full",
              isMaximized && haveVideo ? "aspect-video" : "aspect-square max-h-400"
            ),
            children: [
              /* @__PURE__ */ jsx(
                PlayerPoster,
                {
                  className: "absolute inset-0",
                  fallback: cuedTrack ? /* @__PURE__ */ jsx(
                    TrackImage,
                    {
                      className: "h-full w-full",
                      background: "bg-[#f5f5f5] dark:bg-[#2c2c35]",
                      track: cuedTrack
                    }
                  ) : void 0
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: haveVideo ? "h-full w-full flex-auto bg-black" : void 0,
                  children: /* @__PURE__ */ jsx(PlayerOutlet, { className: "h-full w-full" })
                }
              )
            ]
          }
        ),
        isMaximized && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(QueuedTrack, {}),
          /* @__PURE__ */ jsx(PlaybackControls, { className: "container mx-auto mb-auto flex-shrink-0 px-14" })
        ] }),
        isMaximized && isQueueOpen && /* @__PURE__ */ jsx(PlayerQueue, {})
      ]
    }
  );
}
function FullscreenButton({ overlayRef }) {
  const playerReady = usePlayerStore((s) => s.providerReady);
  return /* @__PURE__ */ jsx(
    IconButton,
    {
      className: clsx(
        "ml-12 flex-shrink-0 max-md:hidden",
        !fscreen.fullscreenEnabled && "hidden"
      ),
      disabled: !playerReady,
      onClick: () => {
        if (!overlayRef.current)
          return;
        if (fscreen.fullscreenElement) {
          fscreen.exitFullscreen();
        } else {
          fscreen.requestFullscreen(overlayRef.current);
        }
      },
      children: /* @__PURE__ */ jsx(MediaFullscreenIcon, {})
    }
  );
}
function QueuedTrack() {
  const track = useCuedTrack();
  if (!track) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto my-40 flex flex-shrink-0 items-center justify-center gap-34 px-14 md:my-60", children: [
    /* @__PURE__ */ jsx(LikeIconButton, { likeable: track }),
    /* @__PURE__ */ jsxs("div", { className: "min-w-0 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "overflow-hidden overflow-ellipsis whitespace-nowrap text-base", children: /* @__PURE__ */ jsx(TrackLink, { track }) }),
      /* @__PURE__ */ jsx("div", { className: "text-sm text-muted", children: /* @__PURE__ */ jsx(ArtistLinks, { artists: track.artists }) })
    ] }),
    /* @__PURE__ */ jsxs(DialogTrigger, { type: "popover", mobileType: "tray", children: [
      /* @__PURE__ */ jsx(IconButton, { children: /* @__PURE__ */ jsx(MoreVertIcon, {}) }),
      /* @__PURE__ */ jsx(TrackContextDialog, { tracks: [track] })
    ] })
  ] });
}
function PlayerQueue() {
  var _a2;
  const queue = usePlayerStore((s) => s.shuffledQueue);
  const tracks = queue.map((item) => item.meta);
  return /* @__PURE__ */ jsx("div", { className: "fixed bottom-0 left-0 right-0 top-70 overflow-y-auto bg-inherit px-14 md:px-50", children: /* @__PURE__ */ jsx(
    TrackTable,
    {
      tracks,
      queueGroupId: (_a2 = queue[0]) == null ? void 0 : _a2.groupId,
      renderRowAs: PlayerQueueRow
    }
  ) });
}
function PlayerQueueRow({ item, children, ...domProps }) {
  const queue = usePlayerStore((s) => s.shuffledQueue);
  const { selectedRows } = useContext(TableContext);
  const queueItems = useMemo(() => {
    return selectedRows.map((trackId) => queue.find((item2) => item2.meta.id === trackId)).filter((t) => !!t);
  }, [queue, selectedRows]);
  const row = /* @__PURE__ */ jsx("div", { ...domProps, children });
  if (item.isPlaceholder) {
    return row;
  }
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "popover",
      mobileType: "tray",
      triggerOnContextMenu: true,
      placement: "bottom-start",
      children: [
        row,
        /* @__PURE__ */ jsx(QueueTrackContextDialog, { queueItems })
      ]
    }
  );
}
function WebPlayerLayout() {
  const { player } = useSettings();
  const isMobile = useIsMobileMediaQuery();
  const content = isMobile ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Main, { className: "h-screen" }),
    /* @__PURE__ */ jsx(MobilePlayerControls, {})
  ] }) : /* @__PURE__ */ jsxs(
    DashboardLayout,
    {
      name: "web-player",
      initialRightSidenavStatus: (player == null ? void 0 : player.hide_queue) ? "closed" : "open",
      children: [
        /* @__PURE__ */ jsx(
          PlayerNavbarLayout,
          {
            size: "sm",
            menuPosition: "web-player",
            className: "flex-shrink-0"
          }
        ),
        /* @__PURE__ */ jsx(SidedavFrontend, { position: "left", display: "block", children: /* @__PURE__ */ jsx(Sidenav, {}) }),
        /* @__PURE__ */ jsx(DashboardContent, { children: /* @__PURE__ */ jsx(Main, {}) }),
        /* @__PURE__ */ jsx(RightSidenav, {}),
        /* @__PURE__ */ jsx(DesktopPlayerControls, {})
      ]
    }
  );
  return /* @__PURE__ */ jsxs(PlayerContext, { id: "web-player", options: playerStoreOptions, children: [
    content,
    /* @__PURE__ */ jsx(PlayerOverlay, {})
  ] });
}
function Main({ className }) {
  return /* @__PURE__ */ jsx(
    "main",
    {
      className: clsx(
        "stable-scrollbar relative overflow-x-hidden",
        className,
        // mobile player controls are fixed to bottom of screen,
        // make sure we can scroll to the bottom of the page
        "pb-124 md:pb-0"
      ),
      children: /* @__PURE__ */ jsx("div", { className: "web-player-container mx-auto min-h-full p-16 @container md:p-30", children: /* @__PURE__ */ jsx(Outlet, {}) })
    }
  );
}
function RightSidenav() {
  const isOverlay = useMediaQuery("(max-width: 1280px)");
  const hideQueue = usePlayerStore((s) => !s.shuffledQueue.length);
  return /* @__PURE__ */ jsx(
    SidedavFrontend,
    {
      position: "right",
      size: "w-256",
      mode: isOverlay ? "overlay" : void 0,
      overlayPosition: "absolute",
      display: "block",
      forceClosed: hideQueue,
      children: /* @__PURE__ */ jsx(QueueSidenav, {})
    }
  );
}
function MediaPageHeaderLayout({
  className,
  image,
  title,
  subtitle,
  description,
  actionButtons,
  footer,
  centerItems = false
}) {
  return /* @__PURE__ */ jsxs(
    "header",
    {
      className: clsx(
        "flex flex-col md:flex-row gap-24 md:gap-34",
        centerItems && "items-center",
        className
      ),
      children: [
        cloneElement(image, {
          size: image.props.size || "w-256 h-256",
          className: clsx(image.props.className, "mx-auto flex-shrink-0")
        }),
        /* @__PURE__ */ jsxs("div", { className: "flex-auto min-w-0", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl md:text-4xl font-semibold mb-14 text-center md:text-start", children: title }),
          subtitle && /* @__PURE__ */ jsx("div", { className: "w-max mx-auto md:mx-0", children: subtitle }),
          description ? /* @__PURE__ */ jsx("div", { className: "text-muted mt-18 md:mt-26 text-sm w-max mx-auto md:mx-0", children: description }) : null,
          /* @__PURE__ */ jsx("div", { className: "mt-30", children: actionButtons }),
          footer ? /* @__PURE__ */ jsx("div", { className: "mt-30", children: footer }) : null
        ] })
      ]
    }
  );
}
function actionButtonClassName({
  isFirst
} = {}) {
  return clsx("min-h-40", isFirst ? "min-w-128 mr-20" : "mr-10 min-w-100");
}
function RemoteFavicon({
  url,
  className,
  size = "w-16 h-16",
  alt
}) {
  if (!url) {
    return null;
  }
  const src = getFaviconSrc(url);
  return /* @__PURE__ */ jsx(
    "img",
    {
      className: clsx(size, className),
      src: getFaviconSrc(url),
      alt: alt || `${src} favicon`
    }
  );
}
const getFaviconSrc = memoize((url) => {
  if (url.includes("youtube")) {
    return "https://www.youtube.com/s/desktop/ca54e1bd/img/favicon.ico";
  }
  if (!isAbsoluteUrl(url)) {
    url = `${window.location.protocol}//${window.location.host}`;
  }
  const domain = new URL(url).origin;
  return "https://www.google.com/s2/favicons?domain=" + domain;
});
function ProfileLinks({ links }) {
  if (!(links == null ? void 0 : links.length))
    return null;
  return /* @__PURE__ */ jsx("div", { className: "flex items-center", children: links.map((link) => /* @__PURE__ */ jsx(Tooltip, { label: link.title, children: /* @__PURE__ */ jsx(
    IconButton,
    {
      size: "xs",
      elementType: "a",
      href: link.url,
      target: "_blank",
      rel: "noreferrer",
      children: /* @__PURE__ */ jsx(RemoteFavicon, { url: link.url, alt: link.title })
    }
  ) }, link.url)) });
}
function useLinkifiedString(text) {
  return useMemo(() => {
    if (!text) {
      return text;
    }
    return linkifyStr(text, {
      nl2br: true,
      attributes: { rel: "nofollow" }
    });
  }, [text]);
}
function ProfileDescription({ profile, links, shortDescription }) {
  const description = useLinkifiedString(profile == null ? void 0 : profile.description) || "";
  if (!profile)
    return null;
  return /* @__PURE__ */ jsxs("div", { className: "min-w-0 text-sm", children: [
    profile.description && /* @__PURE__ */ jsx(
      "div",
      {
        className: "text-secondary max-w-720 rounded bg-alt/80 p-10 dark:bg",
        dangerouslySetInnerHTML: {
          __html: shortDescription ? description == null ? void 0 : description.slice(0, 300) : description
        }
      }
    ),
    profile.city || profile.country || (links == null ? void 0 : links.length) ? /* @__PURE__ */ jsxs("div", { className: "mt-20 flex items-center justify-between gap-24", children: [
      (profile.city || profile.country) && /* @__PURE__ */ jsxs("div", { className: "text-secondary rounded bg-alt/80 p-10 dark:bg md:w-max", children: [
        profile.city,
        profile.city && ",",
        " ",
        profile.country
      ] }),
      /* @__PURE__ */ jsx(ProfileLinks, { links })
    ] }) : null
  ] });
}
function ArtistPageHeader({ artist }) {
  const { artistPage } = useSettings();
  return /* @__PURE__ */ jsx(
    MediaPageHeaderLayout,
    {
      centerItems: true,
      image: /* @__PURE__ */ jsx(
        SmallArtistImage,
        {
          showVerifiedBadge: true,
          artist,
          className: "rounded-full object-cover shadow-lg"
        }
      ),
      title: artist.name,
      subtitle: /* @__PURE__ */ jsx(GenreList, { genres: artist.genres }),
      actionButtons: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-24 md:justify-between", children: [
        /* @__PURE__ */ jsx(ActionButtons$1, { artist }),
        /* @__PURE__ */ jsx(MediaItemStats, { className: "max-md:hidden", item: artist })
      ] }),
      footer: artistPage.showDescription && /* @__PURE__ */ jsx(
        ProfileDescription,
        {
          profile: artist.profile,
          links: artist.links,
          shortDescription: true
        }
      )
    }
  );
}
function GenreList({ genres }) {
  return /* @__PURE__ */ jsx("ul", { className: "flex max-w-620 items-center justify-start gap-14 overflow-hidden overflow-ellipsis whitespace-nowrap text-sm text-muted max-md:hidden", children: genres == null ? void 0 : genres.slice(0, 5).map((genre) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(GenreLink, { genre }) }, genre.id)) });
}
function ActionButtons$1({ artist }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      PlaybackToggleButton,
      {
        queueId: queueGroupId(artist),
        buttonType: "text",
        className: actionButtonClassName({ isFirst: true })
      }
    ),
    /* @__PURE__ */ jsx(
      LikeButton,
      {
        likeable: artist,
        className: clsx(actionButtonClassName(), "max-md:hidden")
      }
    ),
    /* @__PURE__ */ jsxs(DialogTrigger, { type: "popover", mobileType: "tray", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          radius: "rounded-full",
          endIcon: /* @__PURE__ */ jsx(ArrowDropDownIcon, {}),
          className: actionButtonClassName(),
          children: /* @__PURE__ */ jsx(Trans, { message: "More" })
        }
      ),
      /* @__PURE__ */ jsx(ArtistContextDialog, { artist })
    ] })
  ] });
}
function TopTracksTable({ tracks: initialTracks }) {
  const [showingAll, setShowingAll] = useState(false);
  const topTracks = useMemo(() => {
    return {
      all: initialTracks || [],
      sliced: (initialTracks == null ? void 0 : initialTracks.slice(0, 5)) || []
    };
  }, [initialTracks]);
  return /* @__PURE__ */ jsxs("div", { className: "flex-auto", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-muted text-base my-16", children: /* @__PURE__ */ jsx(Trans, { message: "Popular songs" }) }),
    /* @__PURE__ */ jsx(
      TrackTable,
      {
        tracks: showingAll ? topTracks.all : topTracks.sliced,
        hideArtist: true,
        hideAlbum: true,
        hideHeaderRow: true
      }
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        radius: "rounded-full",
        className: "mt-20",
        variant: "outline",
        onClick: () => {
          setShowingAll(!showingAll);
        },
        children: showingAll ? /* @__PURE__ */ jsx(Trans, { message: "Show less" }) : /* @__PURE__ */ jsx(Trans, { message: "Show more" })
      }
    )
  ] });
}
const albumListViewPerPage = 5;
const albumGridViewPerPage = 25;
function useArtistAlbums(initialPage, viewMode) {
  const { artistId } = useParams();
  return useInfiniteData({
    endpoint: `artists/${artistId}/albums`,
    queryKey: ["artists", +artistId, "albums", viewMode],
    paginate: "simple",
    initialPage,
    transformResponse: (response) => {
      response.pagination.data = response.pagination.data.map(
        (album) => assignAlbumToTracks(album)
      );
      return response;
    }
  });
}
function NoDiscographyMessage() {
  return /* @__PURE__ */ jsx(
    IllustratedMessage,
    {
      className: "my-80",
      imageHeight: "h-auto",
      image: /* @__PURE__ */ jsx(AlbumIcon, { size: "xl", className: "text-muted" }),
      title: /* @__PURE__ */ jsx(Trans, { message: "We do not have discography for this artist yet" })
    }
  );
}
function ArtistAlbumsList({ initialAlbums }) {
  const query = useArtistAlbums(initialAlbums, "list");
  const { isLoading, items } = query;
  if (!isLoading && !items.length) {
    return /* @__PURE__ */ jsx(NoDiscographyMessage, {});
  }
  return /* @__PURE__ */ jsxs("section", { children: [
    items.map((album) => /* @__PURE__ */ jsxs("div", { className: "mb-40", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-20 items-center gap-14 md:flex", children: [
        /* @__PURE__ */ jsx(
          AlbumImage,
          {
            album,
            size: "w-110 h-110",
            className: "flex-shrink-0 rounded object-cover"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex-auto", children: [
          /* @__PURE__ */ jsx("h4", { className: "min-w-0 overflow-hidden overflow-ellipsis whitespace-nowrap text-lg font-semibold max-md:mt-12", children: /* @__PURE__ */ jsx(AlbumLink, { album }) }),
          album.release_date && /* @__PURE__ */ jsx("div", { className: "mb-18 mt-2 text-sm text-muted", children: /* @__PURE__ */ jsx(FormattedDate, { date: album.release_date }) }),
          /* @__PURE__ */ jsxs(DialogTrigger, { type: "popover", mobileType: "tray", offset: 10, children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                size: "xs",
                radius: "rounded-full",
                endIcon: /* @__PURE__ */ jsx(ArrowDropDownIcon, {}),
                children: /* @__PURE__ */ jsx(Trans, { message: "More" })
              }
            ),
            /* @__PURE__ */ jsx(AlbumContextDialog, { album })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(AlbumTrackTable$2, { album })
    ] }, album.id)),
    /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query })
  ] });
}
function AlbumTrackTable$2({ album }) {
  const { data, sortDescriptor, onSortChange } = useSortableTableData(
    album.tracks
  );
  return /* @__PURE__ */ jsx(
    TrackTable,
    {
      tracks: data,
      hideArtist: true,
      hideAlbum: true,
      hideTrackImage: true,
      sortDescriptor,
      onSortChange,
      queueGroupId: queueGroupId(album, "*", sortDescriptor)
    }
  );
}
function ArtistAlbumsGrid({ initialAlbums }) {
  const query = useArtistAlbums(initialAlbums, "grid");
  if (!query.isLoading && !query.items.length) {
    return /* @__PURE__ */ jsx(NoDiscographyMessage, {});
  }
  return /* @__PURE__ */ jsxs(ContentGrid, { children: [
    query.items.map((album) => /* @__PURE__ */ jsx(AlbumGridItem, { album }, album.id)),
    /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query })
  ] });
}
function DiscographyTab({
  data: { artist, albums, selectedAlbumLayout }
}) {
  const { player } = useSettings();
  const [viewMode, setViewMode] = useCookie(
    albumLayoutKey,
    selectedAlbumLayout || (player == null ? void 0 : player.default_artist_view) || "list"
  );
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Header, { artist }),
    /* @__PURE__ */ jsx(AdHost, { slot: "artist_bottom", className: "mt-34" }),
    /* @__PURE__ */ jsxs("div", { className: "mt-44", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-30 flex items-center border-b pb-4 text-muted", children: [
        /* @__PURE__ */ jsx("h2", { className: "mr-auto text-base", children: /* @__PURE__ */ jsx(Trans, { message: "Albums" }) }),
        /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "List view" }), children: /* @__PURE__ */ jsx(
          IconButton,
          {
            className: "ml-24 flex-shrink-0",
            color: viewMode === "list" ? "primary" : void 0,
            onClick: () => setViewMode("list"),
            children: /* @__PURE__ */ jsx(ViewAgendaIcon, {})
          }
        ) }),
        /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Grid view" }), children: /* @__PURE__ */ jsx(
          IconButton,
          {
            className: "flex-shrink-0",
            color: viewMode === "grid" ? "primary" : void 0,
            onClick: () => setViewMode("grid"),
            children: /* @__PURE__ */ jsx(GridViewIcon, {})
          }
        ) })
      ] }),
      viewMode === "list" ? /* @__PURE__ */ jsx(
        ArtistAlbumsList,
        {
          artist,
          initialAlbums: (albums == null ? void 0 : albums.per_page) === albumListViewPerPage ? albums : null
        }
      ) : /* @__PURE__ */ jsx(
        ArtistAlbumsGrid,
        {
          artist,
          initialAlbums: (albums == null ? void 0 : albums.per_page) === albumGridViewPerPage ? albums : null
        }
      )
    ] })
  ] });
}
function Header({ artist }) {
  var _a2, _b2;
  if (!((_a2 = artist.top_tracks) == null ? void 0 : _a2.length))
    return null;
  const similarArtists = ((_b2 = artist.similar) == null ? void 0 : _b2.slice(0, 4)) || [];
  return /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-30", children: [
    /* @__PURE__ */ jsx(TopTracksTable, { tracks: artist.top_tracks }),
    similarArtists.length ? /* @__PURE__ */ jsxs("div", { className: "w-1/3 max-w-320 max-md:hidden", children: [
      /* @__PURE__ */ jsx("h2", { className: "my-16 text-base text-muted", children: /* @__PURE__ */ jsx(Trans, { message: "Similar artists" }) }),
      /* @__PURE__ */ jsx("div", { children: similarArtists.map((similar) => /* @__PURE__ */ jsxs(
        Link,
        {
          to: getArtistLink(similar),
          className: "mb-4 flex cursor-pointer items-center gap-14 rounded p-4 hover:bg-hover",
          children: [
            /* @__PURE__ */ jsx(
              SmallArtistImage,
              {
                artist: similar,
                className: "h-44 w-44 rounded-full object-cover"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "text-sm", children: similar.name })
          ]
        },
        similar.id
      )) })
    ] }) : null
  ] });
}
function SimilarArtistsPanel({ artist }) {
  var _a2;
  return /* @__PURE__ */ jsx(ContentGrid, { children: (_a2 = artist.similar) == null ? void 0 : _a2.map((similar) => /* @__PURE__ */ jsx(ArtistGridItem, { artist: similar }, similar.id)) });
}
function ArtistAboutPanel({ artist }) {
  var _a2;
  const description = useLinkifiedString((_a2 = artist.profile) == null ? void 0 : _a2.description);
  const images = useMemo(() => {
    var _a3;
    return ((_a3 = artist.profile_images) == null ? void 0 : _a3.map((img) => img.url)) || [];
  }, [artist.profile_images]);
  return /* @__PURE__ */ jsxs("div", { className: "", children: [
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 lg:grid-cols-4 gap-24", children: images.map((src, index) => /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "outline-none focus-visible:ring cursor-zoom-in rounded overflow-hidden hover:scale-105 transition",
          children: /* @__PURE__ */ jsx(
            "img",
            {
              className: "aspect-video object-cover rounded shadow cursor-zoom-in",
              src,
              alt: ""
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(ImageZoomDialog, { images, defaultActiveIndex: index })
    ] }, src)) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "py-24 text-sm whitespace-pre-wrap",
        dangerouslySetInnerHTML: { __html: description || "" }
      }
    )
  ] });
}
function ArtistTracksPanel({ artist, initialTracks }) {
  const query = useInfiniteData({
    queryKey: ["tracks", artist.id],
    endpoint: `artists/${artist.id}/tracks`,
    initialPage: initialTracks
  });
  if (query.isLoading) {
    return /* @__PURE__ */ jsx(FullPageLoader, { className: "min-h-100", screen: false });
  }
  if (!query.items.length) {
    return /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        imageHeight: "h-auto",
        imageMargin: "mb-14",
        image: /* @__PURE__ */ jsx(AudiotrackIcon, { size: "lg", className: "text-muted" }),
        title: /* @__PURE__ */ jsx(Trans, { message: "No tracks yet" }),
        description: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Follow :artist for updates on their latest releases.",
            values: { artist: artist.name }
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsx(TrackList, { query });
}
const AlbumListItem = memo(
  ({
    album,
    reposter,
    className,
    hideArtwork,
    hideActions,
    linksInNewTab,
    maxHeight
  }) => {
    var _a2;
    const queueId = queueGroupId(album);
    const { player } = useSettings();
    const { managesAlbum } = useAlbumPermissions(album);
    const tracks = (album == null ? void 0 : album.tracks) || [];
    const media = usePlayerStore((s) => s.cuedMedia);
    const activeTrack = tracks.find((t) => t.id === (media == null ? void 0 : media.meta.id)) || tracks[0];
    const showWave = (player == null ? void 0 : player.seekbar_type) === "waveform" && trackIsLocallyUploaded(activeTrack);
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: clsx(
          "overflow-hidden",
          !hideArtwork && "md:flex md:gap-24",
          className,
          maxHeight
        ),
        children: [
          !hideArtwork && /* @__PURE__ */ jsx(
            AlbumImage,
            {
              album,
              className: "flex-shrink-0 rounded max-md:hidden",
              size: "w-184 h-184"
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: clsx(
                "min-w-0 flex-auto",
                maxHeight && "flex h-full flex-col"
              ),
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex-shrink-0", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-14", children: [
                    /* @__PURE__ */ jsx(
                      PlaybackToggleButton,
                      {
                        queueId,
                        track: activeTrack,
                        tracks: album.tracks,
                        buttonType: "icon",
                        color: "primary",
                        variant: "flat",
                        radius: "rounded-full",
                        equalizerColor: "white"
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 text-sm text-muted", children: [
                        /* @__PURE__ */ jsx(
                          ArtistLinks,
                          {
                            artists: album.artists,
                            target: linksInNewTab ? "_blank" : void 0
                          }
                        ),
                        reposter && /* @__PURE__ */ jsxs(Fragment, { children: [
                          /* @__PURE__ */ jsx(RepeatIcon, { size: "xs" }),
                          /* @__PURE__ */ jsx(
                            UserProfileLink,
                            {
                              user: reposter,
                              target: linksInNewTab ? "_blank" : void 0
                            }
                          )
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
                        AlbumLink,
                        {
                          album,
                          target: linksInNewTab ? "_blank" : void 0
                        }
                      ) })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "ml-auto text-sm", children: [
                      /* @__PURE__ */ jsx(FormattedRelativeTime, { date: album.created_at }),
                      ((_a2 = album.genres) == null ? void 0 : _a2.length) ? /* @__PURE__ */ jsx(Chip, { className: "mt-6 w-max", size: "xs", children: /* @__PURE__ */ jsx(
                        GenreLink,
                        {
                          genre: album.genres[0],
                          target: linksInNewTab ? "_blank" : void 0
                        }
                      ) }) : null
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "my-20", children: showWave ? /* @__PURE__ */ jsx(CommentBarContextProvider, { disableCommenting: hideActions, children: /* @__PURE__ */ jsx(
                    WaveformWithComments,
                    {
                      track: activeTrack,
                      queue: album.tracks
                    }
                  ) }) : /* @__PURE__ */ jsx(TrackSeekbar, { track: activeTrack, queue: album.tracks }) })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "flex-auto overflow-y-auto", children: tracks.map((track, index) => {
                  var _a3;
                  const isLast = index - 1 === ((_a3 = album.tracks) == null ? void 0 : _a3.length);
                  const isActive = (activeTrack == null ? void 0 : activeTrack.id) === track.id;
                  return /* @__PURE__ */ jsx(
                    TrackItem,
                    {
                      track,
                      album,
                      index,
                      isLast,
                      isActive
                    },
                    track.id
                  );
                }) }),
                !hideActions && /* @__PURE__ */ jsx(
                  TrackActionsBar,
                  {
                    className: "mt-20",
                    item: album,
                    managesItem: managesAlbum
                  }
                )
              ]
            }
          )
        ]
      },
      album.id
    );
  }
);
function TrackItem({ track, index, isLast, isActive, album }) {
  const playerActions = usePlayerActions();
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "flex cursor-pointer items-center gap-8 p-8 text-[13px] hover:bg-hover",
        !isLast && "border-b",
        isActive && "text-primary"
      ),
      onClick: () => {
        var _a2;
        if ((_a2 = album.tracks) == null ? void 0 : _a2.length) {
          playerActions.overrideQueueAndPlay(
            tracksToMediaItems(album.tracks),
            index
          );
        }
      },
      children: [
        /* @__PURE__ */ jsx(TrackImage, { track, size: "w-20 h-20", className: "rounded" }),
        /* @__PURE__ */ jsx("div", { children: index + 1 }),
        /* @__PURE__ */ jsx("div", { className: "mx-10 flex-auto", children: track.name }),
        track.plays && track.plays > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(PlayArrowFilledIcon, { size: "xs", className: "ml-auto text-muted" }),
          /* @__PURE__ */ jsx("div", { className: "text-muted", children: /* @__PURE__ */ jsx(FormattedNumber, { value: track.plays }) })
        ] }) : null
      ]
    },
    track.id
  );
}
function AlbumList({ albums, query }) {
  const isMobile = useIsMobileMediaQuery();
  if (!albums && query) {
    albums = query.items;
  } else {
    albums = [];
  }
  if (isMobile) {
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(ContentGrid, { children: albums.map((album) => /* @__PURE__ */ jsx(AlbumGridItem, { album }, album.id)) }),
      query && /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    albums.map((album) => /* @__PURE__ */ jsx(AlbumListItem, { album, className: "mb-40" }, album.id)),
    query && /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query })
  ] });
}
function ArtistAlbumsPanel({ artist }) {
  const query = useInfiniteData({
    queryKey: ["albums", artist.id],
    endpoint: `artists/${artist.id}/albums`
  });
  if (query.isInitialLoading) {
    return /* @__PURE__ */ jsx(FullPageLoader, { className: "min-h-100" });
  }
  if (!query.items.length) {
    return /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        imageHeight: "h-auto",
        imageMargin: "mb-14",
        image: /* @__PURE__ */ jsx(AlbumIcon, { size: "lg", className: "text-muted" }),
        title: /* @__PURE__ */ jsx(Trans, { message: "No albums yet" }),
        description: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Follow :artist for updates on their latest releases.",
            values: { artist: artist.name }
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsx(AlbumList, { query });
}
function useArtistPageTabs(artist) {
  const [searchParams] = useSearchParams();
  const { artistPage } = useSettings();
  return useMemo(() => {
    var _a2, _b2, _c, _d;
    const haveSimilar = (_a2 = artist.similar) == null ? void 0 : _a2.length;
    const haveBio = ((_b2 = artist.profile_images) == null ? void 0 : _b2.length) || ((_c = artist.profile) == null ? void 0 : _c.description);
    const activeTabs = (_d = artistPage == null ? void 0 : artistPage.tabs) == null ? void 0 : _d.filter((tab) => {
      if (!tab.active) {
        return false;
      }
      if (tab.id === artistPageTabs.similar && !haveSimilar) {
        return false;
      }
      if (tab.id === artistPageTabs.about && !haveBio) {
        return false;
      }
      return true;
    });
    const selectedTabId = artistPageTabs[searchParams.get("tab")];
    const i = activeTabs == null ? void 0 : activeTabs.findIndex((t) => t.id === selectedTabId);
    const selectedIndex = i > -1 ? i : 0;
    return {
      selectedIndex,
      activeTabs
    };
  }, [artist, artistPage.tabs, searchParams]);
}
function useFollowedUsers() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["users", "followed", "ids"],
    queryFn: () => fetchIds(),
    enabled: !!user
  });
}
function useIsUserFollowing(user) {
  const { data, isLoading } = useFollowedUsers();
  return {
    isLoading,
    isFollowing: !!(data == null ? void 0 : data.ids.includes(user.id))
  };
}
function fetchIds() {
  return apiClient.get(`users/me/followed-users/ids`).then((response) => response.data);
}
function useFollowUser() {
  return useMutation({
    mutationFn: (payload) => followUser(payload),
    onSuccess: async (response, { user }) => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      toast(message("Following :name", { values: { name: user.display_name } }));
    },
    onError: (r) => showHttpErrorToast(r)
  });
}
function followUser({ user }) {
  return apiClient.post(`users/${user.id}/follow`).then((r) => r.data);
}
function useUnfollowUser() {
  return useMutation({
    mutationFn: (payload) => unfollowUser(payload),
    onSuccess: async (response, { user }) => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      toast(
        message("Stopped following :name", { values: { name: user.display_name } })
      );
    },
    onError: (r) => showHttpErrorToast(r)
  });
}
function unfollowUser({ user }) {
  return apiClient.post(`users/${user.id}/unfollow`).then((r) => r.data);
}
function FollowButton({
  user,
  className,
  minWidth = "min-w-82",
  ...buttonProps
}) {
  const { user: currentUser } = useAuth();
  const { isFollowing, isLoading } = useIsUserFollowing(user);
  const followUser2 = useFollowUser();
  const unfollowUser2 = useUnfollowUser();
  const mergedClassName = clsx(className, minWidth);
  if (isFollowing) {
    return /* @__PURE__ */ jsx(
      Button,
      {
        ...buttonProps,
        className: mergedClassName,
        onClick: () => unfollowUser2.mutate({ user }),
        disabled: !currentUser || (currentUser == null ? void 0 : currentUser.id) === user.id || unfollowUser2.isPending || isLoading,
        children: /* @__PURE__ */ jsx(Trans, { message: "Unfollow" })
      }
    );
  }
  return /* @__PURE__ */ jsx(
    Button,
    {
      ...buttonProps,
      className: mergedClassName,
      onClick: () => followUser2.mutate({ user }),
      disabled: !currentUser || (currentUser == null ? void 0 : currentUser.id) === user.id || followUser2.isPending || isLoading,
      children: /* @__PURE__ */ jsx(Trans, { message: "Follow" })
    }
  );
}
function FollowerListItem({ follower }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "mb-16 flex items-center gap-16 border-b pb-16",
      children: [
        /* @__PURE__ */ jsx(UserImage, { user: follower, className: "h-64 w-64 rounded" }),
        /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
          /* @__PURE__ */ jsx(UserProfileLink, { user: follower }),
          follower.followers_count && follower.followers_count > 0 ? /* @__PURE__ */ jsx("div", { className: "text-xs text-muted", children: /* @__PURE__ */ jsx(
            Trans,
            {
              message: "[one 1 followers|other :count followers]",
              values: { count: follower.followers_count }
            }
          ) }) : null
        ] }),
        /* @__PURE__ */ jsx(
          FollowButton,
          {
            user: follower,
            variant: "outline",
            radius: "rounded-full",
            className: "ml-auto flex-shrink-0"
          }
        )
      ]
    },
    follower.id
  );
}
function ArtistFollowersPanel({ artist }) {
  const query = useInfiniteData({
    queryKey: ["artists", artist.id, "followers"],
    endpoint: `artists/${artist.id}/followers`
  });
  if (query.isInitialLoading) {
    return /* @__PURE__ */ jsx(FullPageLoader, { className: "min-h-100" });
  }
  if (!query.items.length) {
    return /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        imageHeight: "h-auto",
        imageMargin: "mb-14",
        image: /* @__PURE__ */ jsx(BookmarkBorderIcon, { size: "lg", className: "text-muted" }),
        description: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Seems like no one is following :name yet.",
            values: { name: artist.name }
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    query.items.map((follower) => /* @__PURE__ */ jsx(FollowerListItem, { follower }, follower.id)),
    /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query })
  ] });
}
function ArtistPageTabs({ data }) {
  const { selectedIndex, activeTabs } = useArtistPageTabs(data.artist);
  return /* @__PURE__ */ jsxs(Tabs, { className: "mt-24 md:mt-48", selectedTab: selectedIndex, isLazy: true, children: [
    /* @__PURE__ */ jsx(TabList, { children: activeTabs.map((tab) => {
      switch (tab.id) {
        case artistPageTabs.discography:
          return /* @__PURE__ */ jsx(Tab, { elementType: Link, children: /* @__PURE__ */ jsx(Trans, { message: "Discography" }) }, artistPageTabs.discography);
        case artistPageTabs.similar:
          return /* @__PURE__ */ jsx(
            Tab,
            {
              elementType: Link,
              to: { search: "?tab=similar" },
              children: /* @__PURE__ */ jsx(Trans, { message: "Similar artists" })
            },
            artistPageTabs.similar
          );
        case artistPageTabs.about:
          return /* @__PURE__ */ jsx(
            Tab,
            {
              elementType: Link,
              to: { search: "?tab=about" },
              children: /* @__PURE__ */ jsx(Trans, { message: "About" })
            },
            artistPageTabs.about
          );
        case artistPageTabs.tracks:
          return /* @__PURE__ */ jsx(
            Tab,
            {
              elementType: Link,
              to: { search: "?tab=tracks" },
              children: /* @__PURE__ */ jsx(Trans, { message: "Tracks" })
            },
            artistPageTabs.tracks
          );
        case artistPageTabs.albums:
          return /* @__PURE__ */ jsx(
            Tab,
            {
              elementType: Link,
              to: { search: "?tab=albums" },
              children: /* @__PURE__ */ jsx(Trans, { message: "Albums" })
            },
            artistPageTabs.albums
          );
        case artistPageTabs.followers:
          return /* @__PURE__ */ jsx(
            Tab,
            {
              elementType: Link,
              to: { search: "?tab=followers" },
              children: /* @__PURE__ */ jsx(Trans, { message: "Followers" })
            },
            artistPageTabs.followers
          );
      }
    }) }),
    /* @__PURE__ */ jsx(TabPanels, { className: "mt-12 md:mt-24", children: activeTabs.map((tab) => {
      switch (tab.id) {
        case artistPageTabs.discography:
          return /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(DiscographyTab, { data }) }, artistPageTabs.discography);
        case artistPageTabs.similar:
          return /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(SimilarArtistsPanel, { artist: data.artist }) }, artistPageTabs.similar);
        case artistPageTabs.about:
          return /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(ArtistAboutPanel, { artist: data.artist }) }, artistPageTabs.about);
        case artistPageTabs.tracks:
          return /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(
            ArtistTracksPanel,
            {
              artist: data.artist,
              initialTracks: data.tracks
            }
          ) }, artistPageTabs.tracks);
        case artistPageTabs.albums:
          return /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(ArtistAlbumsPanel, { artist: data.artist }) }, artistPageTabs.albums);
        case artistPageTabs.followers:
          return /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(ArtistFollowersPanel, { artist: data.artist }) }, artistPageTabs.followers);
      }
    }) })
  ] });
}
function ArtistPage() {
  const query = useArtist({
    loader: "artistPage"
  });
  if (query.data) {
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(PageMetaTags, { query }),
      /* @__PURE__ */ jsx(AdHost, { slot: "general_top", className: "mb-34" }),
      /* @__PURE__ */ jsx(ArtistPageHeader, { artist: query.data.artist }),
      /* @__PURE__ */ jsx(AdHost, { slot: "artist_top", className: "mt-14" }),
      /* @__PURE__ */ jsx(ArtistPageTabs, { data: query.data }),
      /* @__PURE__ */ jsx(AdHost, { slot: "general_bottom", className: "mt-34" })
    ] });
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
function usePlaylist(params) {
  const { playlistId } = useParams();
  return useQuery({
    queryKey: ["playlists", +playlistId],
    queryFn: () => fetchPlaylist(playlistId),
    initialData: () => {
      var _a2, _b2;
      const data = (_a2 = getBootstrapData().loaders) == null ? void 0 : _a2[params.loader];
      if (((_b2 = data == null ? void 0 : data.playlist) == null ? void 0 : _b2.id) == playlistId && (data == null ? void 0 : data.loader) === params.loader) {
        return data;
      }
      return void 0;
    }
  });
}
function fetchPlaylist(playlistId) {
  return apiClient.get(`playlists/${playlistId}`).then((response) => response.data);
}
function AvatarGroup(props) {
  const children = Children.toArray(
    props.children
  );
  if (!children.length)
    return null;
  const firstLink = children[0].props.link;
  const label = children[0].props.label;
  return /* @__PURE__ */ jsxs("div", { className: clsx("pl-10 flex isolate items-center", props.className), children: [
    /* @__PURE__ */ jsx(Fragment, { children: children.map((avatar, index) => /* @__PURE__ */ jsx(
      "div",
      {
        style: { zIndex: 5 - index },
        className: clsx(
          "relative border-2 border-bg-alt bg-alt rounded-full -ml-10 overflow-hidden flex-shrink-0"
        ),
        children: avatar
      },
      index
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "text-sm whitespace-nowrap ml-10", children: [
      firstLink && label ? /* @__PURE__ */ jsx(Link, { to: firstLink, className: "hover:underline", children: label }) : null,
      children.length > 1 && /* @__PURE__ */ jsxs("span", { children: [
        " ",
        /* @__PURE__ */ jsx(
          Trans,
          {
            message: "+ :count more",
            values: { count: children.length - 1 }
          }
        )
      ] })
    ] })
  ] });
}
function BulletSeparatedItems({
  children,
  className
}) {
  const items = Children.toArray(children);
  return /* @__PURE__ */ jsx("div", { className: clsx("flex items-center gap-4", className), children: items.map((child, index) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { children: child }),
    index < items.length - 1 ? /* @__PURE__ */ jsx("div", { children: "•" }) : null
  ] }, index)) });
}
function PlaylistPageHeader({
  playlist,
  totalDuration,
  queueId
}) {
  var _a2;
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    MediaPageHeaderLayout,
    {
      image: /* @__PURE__ */ jsx(EditableImage, { playlist }),
      title: playlist.name,
      subtitle: /* @__PURE__ */ jsx(AvatarGroup, { children: (_a2 = playlist.editors) == null ? void 0 : _a2.map((editor) => /* @__PURE__ */ jsx(
        Avatar,
        {
          circle: true,
          src: editor.avatar,
          label: editor.display_name,
          link: getUserProfileLink(editor)
        },
        editor.id
      )) }),
      description: /* @__PURE__ */ jsxs(Fragment, { children: [
        playlist.description,
        playlist.tracks_count ? /* @__PURE__ */ jsxs(BulletSeparatedItems, { className: "mt-14 text-sm text-muted", children: [
          /* @__PURE__ */ jsx(
            Trans,
            {
              message: "[one 1 track|other :count tracks]",
              values: { count: playlist.tracks_count }
            }
          ),
          /* @__PURE__ */ jsx(FormattedDuration, { ms: totalDuration, verbose: true }),
          playlist.collaborative && /* @__PURE__ */ jsx(Trans, { message: "Collaborative" })
        ] }) : null
      ] }),
      actionButtons: /* @__PURE__ */ jsx(
        ActionButtons,
        {
          playlist,
          hasTracks: totalDuration > 0,
          queueId
        }
      )
    }
  ) });
}
function EditableImage({ playlist, size, className }) {
  const updatePlaylist = useUpdatePlaylist();
  const { canEdit } = usePlaylistPermissions(playlist);
  if (!canEdit) {
    return /* @__PURE__ */ jsx(
      PlaylistImage,
      {
        className: `${size} ${className} rounded object-cover`,
        playlist
      }
    );
  }
  return /* @__PURE__ */ jsx(FileUploadProvider, { children: /* @__PURE__ */ jsx(
    ImageSelector,
    {
      showEditButtonOnHover: true,
      diskPrefix: "playlist_media",
      variant: "square",
      previewSize: size,
      className,
      value: getPlaylistImageSrc(playlist),
      onChange: (newValue) => {
        updatePlaylist.mutate({ image: newValue });
      },
      placeholderIcon: /* @__PURE__ */ jsx(ImageIcon, {}),
      stretchPreview: true
    }
  ) });
}
function ActionButtons({ playlist, hasTracks, queueId }) {
  return /* @__PURE__ */ jsxs("div", { className: "text-center md:text-start", children: [
    /* @__PURE__ */ jsx(
      PlaybackToggleButton,
      {
        disabled: !hasTracks,
        buttonType: "text",
        queueId,
        className: actionButtonClassName({ isFirst: true })
      }
    ),
    /* @__PURE__ */ jsx(
      FollowPlaylistButton,
      {
        buttonType: "text",
        playlist,
        className: actionButtonClassName()
      }
    ),
    /* @__PURE__ */ jsxs(DialogTrigger, { type: "popover", mobileType: "tray", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          radius: "rounded-full",
          endIcon: /* @__PURE__ */ jsx(ArrowDropDownIcon, {}),
          className: actionButtonClassName(),
          children: /* @__PURE__ */ jsx(Trans, { message: "More" })
        }
      ),
      /* @__PURE__ */ jsx(PlaylistContextDialog, { playlist })
    ] })
  ] });
}
function moveMultipleItemsInArray(array, indexOrIndexes, newIndex) {
  const indexes = Array.isArray(indexOrIndexes) ? indexOrIndexes : [indexOrIndexes];
  const insertBefore = array[newIndex + (newIndex < indexes[0] ? 0 : 1)];
  const itemsToBeMoved = indexes.map((i) => array[i]);
  const moved = [];
  for (let i = 0; i < array.length; ) {
    const value = array[i];
    if (itemsToBeMoved.indexOf(value) >= 0) {
      moved.push(value);
      array.splice(i, 1);
    } else {
      ++i;
    }
  }
  let insertionIndex = array.indexOf(insertBefore);
  if (insertionIndex < 0) {
    insertionIndex = array.length;
  }
  array.splice(insertionIndex, 0, ...moved);
  return array;
}
function useReorderPlaylistTracks() {
  const { playlistId } = useParams();
  return useMutation({
    mutationFn: (payload) => reorderTracks(playlistId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tracks", "playlist", +playlistId]
      });
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function reorderTracks(playlistId, { tracks, oldIndexes, newIndex }) {
  const ids = tracks.map((t) => t.id);
  moveMultipleItemsInArray(ids, oldIndexes, newIndex);
  return apiClient.post(`playlists/${playlistId}/tracks/order`, { ids }).then((r) => r.data);
}
function PlaylistTableRow({
  item,
  children,
  className,
  ...domProps
}) {
  const isTouchDevice = useIsTouchDevice();
  const {
    data: tracks,
    selectRow,
    selectedRows,
    sortDescriptor
  } = useContext(TableContext);
  const domRef = useRef(null);
  const previewRef = useRef(null);
  const reorderTracks2 = useReorderPlaylistTracks();
  const { data } = usePlaylist({ loader: "playlistPage" });
  const { sortableProps } = useSortable({
    ref: domRef,
    disabled: (isTouchDevice ?? false) || reorderTracks2.isPending || // disable drag and drop if table is sorted via header
    (sortDescriptor == null ? void 0 : sortDescriptor.orderBy) !== "position",
    item,
    items: tracks,
    type: "playlistTrack",
    preview: previewRef,
    strategy: "line",
    onDragEnd: () => {
      selectRow(null);
    },
    onSortStart: () => {
      if (!selectedRows.includes(item.id)) {
        selectRow(item);
      }
    },
    onSortEnd: (oldIndex, newIndex) => {
      reorderTracks2.mutate({
        tracks,
        oldIndexes: selectedRows.length > 1 ? selectedRows.map((id) => tracks.findIndex((t) => t.id === id)) : oldIndex,
        newIndex
      });
    }
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      DialogTrigger,
      {
        type: "popover",
        triggerOnContextMenu: true,
        placement: "bottom-start",
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className,
              ref: domRef,
              ...mergeProps(sortableProps, domProps),
              children
            }
          ),
          /* @__PURE__ */ jsx(PlaylistTrackContextDialog, { playlist: data.playlist })
        ]
      }
    ),
    !item.isPlaceholder && /* @__PURE__ */ jsx(RowDragPreview, { track: item, ref: previewRef })
  ] });
}
const RowDragPreview = React.forwardRef(({ track }, ref) => {
  var _a2, _b2;
  const { selectedRows } = useContext(TableContext);
  const content = selectedRows.length > 1 ? /* @__PURE__ */ jsx(Trans, { message: ":count tracks", values: { count: selectedRows.length } }) : `${track.name} - ${(_b2 = (_a2 = track.artists) == null ? void 0 : _a2[0]) == null ? void 0 : _b2.name}`;
  return /* @__PURE__ */ jsx(DragPreview, { ref, children: () => /* @__PURE__ */ jsx(
    "div",
    {
      className: "rounded bg-chip p-8 text-base shadow",
      role: "presentation",
      children: content
    }
  ) });
});
function MediaPageNoResultsMessage({
  description,
  searchQuery,
  className
}) {
  if (searchQuery) {
    return /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        className,
        title: /* @__PURE__ */ jsx(Trans, { message: "No results found" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Try another search query or different filters" })
      }
    );
  }
  return /* @__PURE__ */ jsx(
    IllustratedMessage,
    {
      className,
      title: /* @__PURE__ */ jsx(Trans, { message: "Nothing to display" }),
      description
    }
  );
}
function PlaylistPage() {
  const query = usePlaylist({ loader: "playlistPage" });
  if (query.data) {
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(PageMetaTags, { query }),
      /* @__PURE__ */ jsx(
        PageContent$2,
        {
          initialTracks: query.data.tracks,
          playlist: query.data.playlist,
          totalDuration: query.data.totalDuration
        }
      )
    ] });
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
function PageContent$2({
  initialTracks,
  playlist,
  totalDuration
}) {
  const { trans } = useTrans();
  const query = useInfiniteData({
    initialPage: initialTracks,
    queryKey: ["tracks", "playlist", playlist.id],
    endpoint: `playlists/${playlist.id}/tracks`,
    defaultOrderBy: "position",
    defaultOrderDir: "asc",
    paginate: "simple",
    willSortOrFilter: true
  });
  const {
    isLoading,
    sortDescriptor,
    setSortDescriptor,
    searchQuery,
    setSearchQuery,
    items
  } = query;
  const totalItems = playlist.tracks_count || 0;
  const queueId = queueGroupId(playlist, "*", sortDescriptor);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(AdHost, { slot: "general_top", className: "mb-44" }),
    /* @__PURE__ */ jsx(
      PlaylistPageHeader,
      {
        playlist,
        totalDuration,
        queueId
      }
    ),
    /* @__PURE__ */ jsx(
      TextField,
      {
        value: searchQuery,
        onChange: (e) => setSearchQuery(e.target.value),
        className: "mb-44 mt-28 max-w-512 md:mb-24",
        size: "sm",
        startAdornment: /* @__PURE__ */ jsx(SearchIcon, {}),
        placeholder: trans(message("Search within playlist"))
      }
    ),
    /* @__PURE__ */ jsx(
      TrackTable,
      {
        queueGroupId: queueId,
        tracks: items,
        sortDescriptor,
        onSortChange: setSortDescriptor,
        renderRowAs: PlaylistTableRow,
        playlist,
        tableBody: /* @__PURE__ */ jsx(VirtualTableBody, { query, totalItems })
      }
    ),
    !items.length && !isLoading && /* @__PURE__ */ jsx(
      MediaPageNoResultsMessage,
      {
        className: "mt-34",
        searchQuery,
        description: /* @__PURE__ */ jsx(Trans, { message: "This playlist does not have any tracks yet" })
      }
    ),
    /* @__PURE__ */ jsx(AdHost, { slot: "general_bottom", className: "mt-44" })
  ] });
}
function commentsQueryKey(commentable, params = {}) {
  return ["comment", `${commentable.id}-${commentable.model_type}`, params];
}
function useComments(commentable, params = {}) {
  return useInfiniteData({
    queryKey: commentsQueryKey(commentable, params),
    endpoint: "commentable/comments",
    //paginate: 'cursor',
    queryParams: {
      commentable_type: commentable.model_type,
      commentable_id: commentable.id,
      ...params
    }
  });
}
function useStoreVote(model) {
  return useMutation({
    mutationFn: (payload) => changeVote(model, payload),
    onSuccess: (response) => {
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function changeVote(model, payload) {
  return apiClient.post("vote", {
    vote_type: payload.voteType,
    model_id: model.id,
    model_type: model.model_type
  }).then((r) => r.data);
}
function ThumbButtons({ model, className, showUpvotesOnly }) {
  const changeVote2 = useStoreVote(model);
  const [upvotes, setUpvotes] = useState(model.upvotes || 0);
  const [downvotes, setDownvotes] = useState(model.downvotes || 0);
  const [currentVote, setCurrentVote] = useState(model.current_vote);
  const syncLocalState = (model2) => {
    setUpvotes(model2.upvotes);
    setDownvotes(model2.downvotes);
    setCurrentVote(model2.current_vote);
  };
  return /* @__PURE__ */ jsxs("div", { className: clsx(className, "whitespace-nowrap"), children: [
    /* @__PURE__ */ jsxs(
      Button,
      {
        className: "gap-6",
        sizeClassName: "px-8 py-4",
        color: currentVote === "upvote" ? "primary" : void 0,
        disabled: changeVote2.isPending,
        "aria-label": "Upvote",
        onClick: () => {
          changeVote2.mutate(
            { voteType: "upvote" },
            {
              onSuccess: (response) => syncLocalState(response.model)
            }
          );
        },
        children: [
          /* @__PURE__ */ jsx(ThumbUpIcon, {}),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(FormattedNumber, { value: upvotes }) })
        ]
      }
    ),
    !showUpvotesOnly && /* @__PURE__ */ jsxs(
      Button,
      {
        className: "gap-6",
        sizeClassName: "px-8 py-4",
        color: currentVote === "downvote" ? "primary" : void 0,
        disabled: changeVote2.isPending,
        "aria-label": "Downvote",
        onClick: () => {
          changeVote2.mutate(
            { voteType: "downvote" },
            {
              onSuccess: (response) => syncLocalState(response.model)
            }
          );
        },
        children: [
          /* @__PURE__ */ jsx(ThumbDownIcon, {}),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(FormattedNumber, { value: downvotes }) })
        ]
      }
    )
  ] });
}
function useSubmitReport(model) {
  return useMutation({
    mutationFn: (payload) => submitReport(model, payload),
    onSuccess: () => {
      toast(message("Thanks for reporting. We will review this content."));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function submitReport(model, payload) {
  return apiClient.post("report", {
    reason: payload.reason,
    model_id: model.id,
    model_type: model.model_type
  }).then((r) => r.data);
}
function CommentListItem({
  comment,
  commentable,
  // user can delete comment if they have created it, or they have relevant permissions on commentable
  canDelete
}) {
  const isMobile = useIsMobileMediaQuery();
  const { user, hasPermission } = useAuth();
  const [replyFormVisible, setReplyFormVisible] = useState(false);
  const showReplyButton = user != null && !comment.deleted && !isMobile && comment.depth < 5 && hasPermission("comments.create");
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style: { paddingLeft: `${comment.depth * 20}px` },
      onClick: () => {
        if (isMobile) {
          setReplyFormVisible(!replyFormVisible);
        }
      },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "group flex min-h-70 items-start gap-24 py-18", children: [
          /* @__PURE__ */ jsx(UserAvatar, { user: comment.user, size: isMobile ? "lg" : "xl", circle: true }),
          /* @__PURE__ */ jsxs("div", { className: "flex-auto text-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-8", children: [
              comment.user && /* @__PURE__ */ jsx(UserDisplayName, { user: comment.user }),
              /* @__PURE__ */ jsx("time", { className: "text-xs text-muted", children: /* @__PURE__ */ jsx(FormattedRelativeTime, { date: comment.created_at }) }),
              comment.position ? /* @__PURE__ */ jsx(Position, { commentable, position: comment.position }) : null
            ] }),
            /* @__PURE__ */ jsx("div", { className: "whitespace-pre-line", children: comment.deleted ? /* @__PURE__ */ jsx("span", { className: "italic text-muted", children: /* @__PURE__ */ jsx(Trans, { message: "[COMMENT DELETED]" }) }) : comment.content }),
            !comment.deleted && /* @__PURE__ */ jsxs("div", { className: "-ml-8 mt-10 flex items-center gap-8", children: [
              showReplyButton && /* @__PURE__ */ jsx(
                Button,
                {
                  sizeClassName: "text-sm px-8 py-4",
                  startIcon: /* @__PURE__ */ jsx(ReplyIcon, {}),
                  onClick: () => setReplyFormVisible(!replyFormVisible),
                  children: /* @__PURE__ */ jsx(Trans, { message: "Reply" })
                }
              ),
              /* @__PURE__ */ jsx(ThumbButtons, { model: comment, showUpvotesOnly: true }),
              /* @__PURE__ */ jsx(
                CommentOptionsTrigger,
                {
                  comment,
                  canDelete,
                  user
                }
              )
            ] })
          ] })
        ] }),
        replyFormVisible ? /* @__PURE__ */ jsx(
          NewCommentForm,
          {
            className: !(comment == null ? void 0 : comment.depth) ? "pl-20" : void 0,
            commentable,
            inReplyTo: comment,
            autoFocus: true,
            onSuccess: () => {
              setReplyFormVisible(false);
            }
          }
        ) : null
      ]
    }
  );
}
const Position = memo(({ commentable, position }) => {
  if (!commentable.duration)
    return null;
  const seconds = position / 100 * (commentable.duration / 1e3);
  return /* @__PURE__ */ jsx("span", { className: "text-xs text-muted", children: /* @__PURE__ */ jsx(
    Trans,
    {
      message: "at :position",
      values: {
        position: /* @__PURE__ */ jsx(FormattedDuration, { seconds })
      }
    }
  ) });
});
function CommentOptionsTrigger({
  comment,
  canDelete,
  user
}) {
  const deleteComments = useDeleteComments();
  const reportComment = useSubmitReport(comment);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const showDeleteButton = (comment.user_id === (user == null ? void 0 : user.id) || canDelete) && !comment.deleted;
  const handleReport = () => {
    reportComment.mutate({});
  };
  const handleDelete = (isConfirmed) => {
    setIsDeleteDialogOpen(false);
    if (isConfirmed) {
      deleteComments.mutate(
        { commentIds: [comment.id] },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comment"] });
          }
        }
      );
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(MenuTrigger, { children: [
      /* @__PURE__ */ jsx(Button, { startIcon: /* @__PURE__ */ jsx(MoreVertIcon, {}), sizeClassName: "text-sm px-8 py-4", children: /* @__PURE__ */ jsx(Trans, { message: "More" }) }),
      /* @__PURE__ */ jsxs(Menu, { children: [
        /* @__PURE__ */ jsx(Item, { value: "report", onSelected: () => handleReport(), children: /* @__PURE__ */ jsx(Trans, { message: "Report comment" }) }),
        showDeleteButton && /* @__PURE__ */ jsx(
          Item,
          {
            value: "delete",
            onSelected: () => setIsDeleteDialogOpen(true),
            children: /* @__PURE__ */ jsx(Trans, { message: "Delete" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      DialogTrigger,
      {
        type: "modal",
        isOpen: isDeleteDialogOpen,
        onClose: (isConfirmed) => handleDelete(isConfirmed),
        children: /* @__PURE__ */ jsx(
          ConfirmationDialog,
          {
            isDanger: true,
            title: /* @__PURE__ */ jsx(Trans, { message: "Delete comment?" }),
            body: /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to delete this comment?" }),
            confirm: /* @__PURE__ */ jsx(Trans, { message: "Delete" })
          }
        )
      }
    )
  ] });
}
function UserDisplayName({ user }) {
  const { auth } = useContext(SiteConfigContext);
  if (auth.getUserProfileLink) {
    return /* @__PURE__ */ jsx(
      Link,
      {
        to: auth.getUserProfileLink(user),
        className: "text-base font-medium hover:underline",
        children: user.display_name
      }
    );
  }
  return /* @__PURE__ */ jsx("div", { className: "text-base font-medium", children: user.display_name });
}
function AccountRequiredCard({ message: message2 }) {
  const { user } = useAuth();
  if (user)
    return null;
  return /* @__PURE__ */ jsxs("div", { className: "border border-dashed py-30 px-20 my-40 mx-auto text-center max-w-850 rounded", children: [
    /* @__PURE__ */ jsx("div", { className: "text-xl font-semibold mb-8", children: /* @__PURE__ */ jsx(Trans, { message: "Account required" }) }),
    /* @__PURE__ */ jsx("div", { className: "text-muted text-base", children: /* @__PURE__ */ jsx(
      Trans,
      {
        ...message2,
        values: {
          l: (parts) => /* @__PURE__ */ jsx(Link, { className: LinkStyle, to: "/login", children: parts }),
          r: (parts) => /* @__PURE__ */ jsx(Link, { className: LinkStyle, to: "/register", children: parts })
        }
      }
    ) })
  ] });
}
const accountRequiredMessage = message(
  "Please <l>login</l> or <r>create account</r> to comment"
);
function CommentList({
  className,
  commentable,
  canDeleteAllComments = false,
  children,
  perPage = 25
}) {
  const { items, totalItems, ...query } = useComments(commentable, { perPage });
  if (query.isError) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className, children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8 pb-8 border-b flex items-center gap-8", children: [
      /* @__PURE__ */ jsx(CommentIcon, { size: "sm", className: "text-muted" }),
      query.isInitialLoading ? /* @__PURE__ */ jsx(Trans, { message: "Loading comments..." }) : /* @__PURE__ */ jsx(
        Trans,
        {
          message: ":count comments",
          values: { count: /* @__PURE__ */ jsx(FormattedNumber, { value: totalItems || 0 }) }
        }
      )
    ] }),
    children,
    /* @__PURE__ */ jsx(AccountRequiredCard, { message: accountRequiredMessage }),
    /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: query.isInitialLoading ? /* @__PURE__ */ jsx(CommentSkeletons, { count: 4 }) : /* @__PURE__ */ jsx(
      CommentListItems,
      {
        comments: items,
        canDeleteAllComments,
        commentable
      }
    ) }),
    /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query, variant: "loadMore" })
  ] });
}
function CommentListItems({
  comments,
  commentable,
  canDeleteAllComments
}) {
  if (!comments.length) {
    return /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        className: "mt-24",
        size: "sm",
        title: /* @__PURE__ */ jsx(Trans, { message: "Seems a little quiet over here" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Be the first to comment" })
      }
    );
  }
  return /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, children: comments.map((comment) => /* @__PURE__ */ jsx(
    CommentListItem,
    {
      comment,
      commentable,
      canDelete: canDeleteAllComments
    },
    comment.id
  )) }, "comments");
}
function CommentSkeletons({ count }) {
  return /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, children: [...new Array(count).keys()].map((index) => /* @__PURE__ */ jsxs(
    "div",
    {
      className: "flex items-start gap-24 py-18 min-h-70 group",
      children: [
        /* @__PURE__ */ jsx(Skeleton, { variant: "avatar", radius: "rounded-full", size: "w-60 h-60" }),
        /* @__PURE__ */ jsxs("div", { className: "text-sm flex-auto", children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "text-base max-w-184 mb-4" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "text-sm" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-8 mt-10", children: [
            /* @__PURE__ */ jsx(Skeleton, { className: "text-sm max-w-70" }),
            /* @__PURE__ */ jsx(Skeleton, { className: "text-sm max-w-40" }),
            /* @__PURE__ */ jsx(Skeleton, { className: "text-sm max-w-60" })
          ] })
        ] })
      ]
    },
    index
  )) }, "loading-skeleton");
}
function TruncatedDescription({
  description,
  className
}) {
  const linkifiedDescription = useLinkifiedString(description);
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isShowingAll, setIsShowingAll] = useState(false);
  useLayoutEffect$1(() => {
    var _a2, _b2;
    const wrapperHeight = ((_a2 = wrapperRef.current) == null ? void 0 : _a2.getBoundingClientRect().height) || 0;
    const contentHeight = ((_b2 = wrapperRef.current) == null ? void 0 : _b2.scrollHeight) || 0;
    if (contentHeight > wrapperHeight) {
      setIsOverflowing(true);
    }
  }, []);
  if (!linkifiedDescription)
    return null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: wrapperRef,
        className: clsx(
          "relative",
          className,
          !isShowingAll && "max-h-160 overflow-hidden",
          !isShowingAll && isOverflowing && "after:absolute after:bottom-0 after:left-0 after:h-20 after:w-full after:bg-gradient-to-b after:from-transparent after:to-background"
        ),
        children: /* @__PURE__ */ jsx(
          "div",
          {
            ref: contentRef,
            dangerouslySetInnerHTML: { __html: linkifiedDescription }
          }
        )
      }
    ),
    isOverflowing && /* @__PURE__ */ jsx(
      Button,
      {
        size: "xs",
        className: "mt-20",
        variant: "outline",
        onClick: () => setIsShowingAll(!isShowingAll),
        children: isShowingAll ? /* @__PURE__ */ jsx(Trans, { message: "Show less" }) : /* @__PURE__ */ jsx(Trans, { message: "Show more" })
      }
    )
  ] });
}
function useCommentPermissions() {
  const { player } = useSettings();
  const { hasPermission } = useAuth();
  const canView = (player == null ? void 0 : player.track_comments) && hasPermission("comments.view");
  return { canView, canCreate: canView && hasPermission("comments.create") };
}
function AlbumPage() {
  var _a2, _b2;
  const { canView: showComments, canCreate: allowCommenting } = useCommentPermissions();
  const query = useAlbum({ loader: "albumPage" });
  const { canEdit } = useAlbumPermissions((_a2 = query.data) == null ? void 0 : _a2.album);
  if (query.data) {
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs(CommentBarContextProvider, { children: [
        /* @__PURE__ */ jsx(PageMetaTags, { query }),
        /* @__PURE__ */ jsx(AdHost, { slot: "general_top", className: "mb-44" }),
        /* @__PURE__ */ jsx(AlbumPageHeader, { album: query.data.album }),
        allowCommenting ? /* @__PURE__ */ jsx(
          CommentBarNewCommentForm,
          {
            className: "mb-16",
            commentable: query.data.album
          }
        ) : null
      ] }),
      ((_b2 = query.data.album.tags) == null ? void 0 : _b2.length) ? /* @__PURE__ */ jsx(FocusScope, { children: /* @__PURE__ */ jsx(ChipList, { className: "mb-16", selectable: true, children: query.data.album.tags.map((tag) => /* @__PURE__ */ jsxs(Chip, { elementType: Link, to: `/tag/${tag.name}`, children: [
        "#",
        tag.display_name || tag.name
      ] }, tag.id)) }) }) : null,
      /* @__PURE__ */ jsx(
        TruncatedDescription,
        {
          description: query.data.album.description,
          className: "mt-24 text-sm"
        }
      ),
      /* @__PURE__ */ jsx(AdHost, { slot: "album_above", className: "mt-34" }),
      /* @__PURE__ */ jsx(AlbumTrackTable$1, { album: query.data.album }),
      showComments && /* @__PURE__ */ jsx(
        CommentList,
        {
          className: "mt-34",
          commentable: query.data.album,
          canDeleteAllComments: canEdit
        }
      ),
      /* @__PURE__ */ jsx(AdHost, { slot: "general_bottom", className: "mt-44" })
    ] });
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
function AlbumTrackTable$1({ album }) {
  var _a2;
  const { data, sortDescriptor, onSortChange } = useSortableTableData(
    album.tracks
  );
  return /* @__PURE__ */ jsxs("div", { className: "mt-44", children: [
    /* @__PURE__ */ jsx(
      TrackTable,
      {
        queueGroupId: queueGroupId(album),
        tracks: data,
        sortDescriptor,
        onSortChange,
        hideTrackImage: true,
        hideArtist: true,
        hideAlbum: true,
        hidePopularity: false
      }
    ),
    !((_a2 = album.tracks) == null ? void 0 : _a2.length) ? /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        className: "mt-34",
        title: /* @__PURE__ */ jsx(Trans, { message: "Nothing to display" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "This album does not have any tracks yet" })
      }
    ) : null
  ] });
}
function AlbumPageHeader({ album }) {
  var _a2, _b2, _c, _d, _e;
  const totalDuration = (_a2 = album.tracks) == null ? void 0 : _a2.reduce(
    (t, track) => t + (track.duration || 0),
    0
  );
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    MediaPageHeaderLayout,
    {
      className: "mb-28",
      image: /* @__PURE__ */ jsx(AlbumImage, { album, className: "rounded" }),
      title: album.name,
      subtitle: /* @__PURE__ */ jsx(AvatarGroup, { children: (_b2 = album.artists) == null ? void 0 : _b2.map((artist) => /* @__PURE__ */ jsx(
        Avatar,
        {
          circle: true,
          src: getSmallArtistImage(artist),
          label: artist.name,
          link: getArtistLink(artist)
        },
        artist.id
      )) }),
      description: /* @__PURE__ */ jsxs(BulletSeparatedItems, { className: "text-sm text-muted", children: [
        ((_c = album.tracks) == null ? void 0 : _c.length) ? /* @__PURE__ */ jsx(
          Trans,
          {
            message: "[one 1 track|other :count tracks]",
            values: { count: album.tracks.length }
          }
        ) : null,
        ((_d = album.tracks) == null ? void 0 : _d.length) ? /* @__PURE__ */ jsx(FormattedDuration, { ms: totalDuration, verbose: true }) : null,
        /* @__PURE__ */ jsx(FormattedDate, { date: album.release_date })
      ] }),
      actionButtons: /* @__PURE__ */ jsx(
        TrackActionsBar,
        {
          item: album,
          managesItem: false,
          buttonGap: void 0,
          buttonSize: "sm",
          buttonRadius: "rounded-full",
          buttonClassName: actionButtonClassName(),
          children: /* @__PURE__ */ jsx(
            PlaybackToggleButton,
            {
              disabled: !((_e = album.tracks) == null ? void 0 : _e.length),
              buttonType: "text",
              queueId: queueGroupId(album),
              className: actionButtonClassName({ isFirst: true })
            }
          )
        }
      )
    }
  ) });
}
const libraryTracksQueryKey = (userId) => {
  const user = getBootstrapData().user;
  if (userId === (user == null ? void 0 : user.id)) {
    userId = "me";
  }
  return ["tracks", "library", userId];
};
function useUserLikedTracks(userId, options) {
  return useInfiniteData({
    queryKey: libraryTracksQueryKey(userId),
    endpoint: `users/${userId}/liked-tracks`,
    defaultOrderBy: "likes.created_at",
    defaultOrderDir: "desc",
    ...options
  });
}
function LibraryTracksPage() {
  const trackCount = useLibraryStore((s) => Object.keys(s.track).length);
  const query = useUserLikedTracks("me", { willSortOrFilter: true });
  const {
    isInitialLoading,
    sortDescriptor,
    setSortDescriptor,
    searchQuery,
    setSearchQuery,
    items,
    isError
  } = query;
  const { user } = useAuth();
  const { trans } = useTrans();
  const queueId = queueGroupId(user, "libraryTracks", sortDescriptor);
  if (isError) {
    return /* @__PURE__ */ jsx(PageErrorMessage, {});
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Your tracks" }) }),
    /* @__PURE__ */ jsx(AdHost, { slot: "general_top", className: "mb-34" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-24 justify-between mb-34", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold w-max md:w-full whitespace-nowrap", children: trackCount ? /* @__PURE__ */ jsx(
        Trans,
        {
          message: "[one 1 liked song|other :count liked songs]",
          values: { count: trackCount }
        }
      ) : /* @__PURE__ */ jsx(Trans, { message: "My songs" }) }),
      /* @__PURE__ */ jsx(
        PlaybackToggleButton,
        {
          queueId,
          buttonType: "text",
          className: "min-w-128 flex-shrink-0"
        }
      ),
      /* @__PURE__ */ jsx(
        TextField,
        {
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          className: "max-w-512 flex-auto",
          size: "sm",
          startAdornment: /* @__PURE__ */ jsx(SearchIcon, {}),
          placeholder: trans(message("Search within tracks"))
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      TrackTable,
      {
        queueGroupId: queueId,
        tracks: isInitialLoading ? getPlaceholderItems$1(trackCount) : items,
        sortDescriptor,
        onSortChange: setSortDescriptor,
        hideAddedAtColumn: false,
        tableBody: /* @__PURE__ */ jsx(VirtualTableBody, { query, totalItems: trackCount })
      }
    ),
    !items.length && !isInitialLoading && /* @__PURE__ */ jsx(
      MediaPageNoResultsMessage,
      {
        className: "mt-34",
        searchQuery,
        description: /* @__PURE__ */ jsx(Trans, { message: "You have not added any songs to your library yet." })
      }
    ),
    /* @__PURE__ */ jsx(AdHost, { slot: "general_bottom", className: "mt-34" })
  ] });
}
function getPlaceholderItems$1(totalTracks) {
  return [...new Array(Math.min(totalTracks, 30)).keys()].map((key, index) => {
    return {
      isPlaceholder: true,
      id: `placeholder-${key}`
    };
  });
}
function LibraryPageSortDropdown({
  items,
  sortDescriptor,
  setSortDescriptor
}) {
  const isMobile = useIsMobileMediaQuery();
  const selectedValue = `${sortDescriptor.orderBy}:${sortDescriptor.orderDir}`;
  return /* @__PURE__ */ jsxs(
    MenuTrigger,
    {
      selectionMode: "single",
      selectedValue,
      onSelectionChange: (newValue) => {
        const [orderBy, orderDir] = newValue.split(":");
        setSortDescriptor({
          orderBy,
          orderDir
        });
      },
      children: [
        isMobile ? /* @__PURE__ */ jsx(IconButton, { children: /* @__PURE__ */ jsx(SortIcon, {}) }) : /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            className: "flex-shrink-0",
            endIcon: /* @__PURE__ */ jsx(ArrowDropDownIcon, {}),
            children: /* @__PURE__ */ jsx(Trans, { ...items[selectedValue] })
          }
        ),
        /* @__PURE__ */ jsx(Menu, { children: Object.entries(items).map(([value, label]) => /* @__PURE__ */ jsx(Item, { value, children: /* @__PURE__ */ jsx(Trans, { ...label }) }, value)) })
      ]
    }
  );
}
const libraryAlbumsQueryKey = (userId, queryParams) => {
  const user = getBootstrapData().user;
  if (userId === (user == null ? void 0 : user.id)) {
    userId = "me";
  }
  const key = ["albums", "library", userId];
  if (queryParams) {
    key.push(queryParams);
  }
  return key;
};
function useUserLikedAlbums(userId, options) {
  return useInfiniteData({
    queryKey: libraryAlbumsQueryKey(userId),
    endpoint: `users/${userId}/liked-albums`,
    defaultOrderBy: "likes.created_at",
    defaultOrderDir: "desc",
    ...options
  });
}
const sortItems$2 = {
  "likes.created_at:desc": message("Recently added"),
  "name:asc": message("A-Z"),
  "release_date:desc": message("Release date")
};
function LibraryAlbumsPage() {
  const { trans } = useTrans();
  const totalItems = useLibraryStore((s) => Object.keys(s.album).length);
  const query = useUserLikedAlbums("me", { willSortOrFilter: true });
  const {
    isLoading,
    sortDescriptor,
    setSortDescriptor,
    searchQuery,
    setSearchQuery,
    items,
    isError
  } = query;
  if (isError) {
    return /* @__PURE__ */ jsx(PageErrorMessage, {});
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Your albums" }) }),
    /* @__PURE__ */ jsx(AdHost, { slot: "general_top", className: "mb-34" }),
    /* @__PURE__ */ jsx("h1", { className: "mb-20 text-2xl font-semibold", children: totalItems ? /* @__PURE__ */ jsx(
      Trans,
      {
        message: "[one 1 liked album|other :count liked albums]",
        values: { count: totalItems }
      }
    ) : /* @__PURE__ */ jsx(Trans, { message: "My albums" }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-24", children: [
      /* @__PURE__ */ jsx(
        TextField,
        {
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          className: "max-w-512 flex-auto",
          size: "sm",
          startAdornment: /* @__PURE__ */ jsx(SearchIcon, {}),
          placeholder: trans(message("Search within albums"))
        }
      ),
      /* @__PURE__ */ jsx(
        LibraryPageSortDropdown,
        {
          items: sortItems$2,
          sortDescriptor,
          setSortDescriptor
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-34", children: /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: isLoading ? /* @__PURE__ */ jsx(PlayableMediaGridSkeleton, { itemCount: totalItems }) : /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, children: /* @__PURE__ */ jsxs(ContentGrid, { children: [
      items.map((album) => /* @__PURE__ */ jsx(AlbumGridItem, { album }, album.id)),
      /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query })
    ] }) }, "media-grid") }) }),
    !items.length && !isLoading && /* @__PURE__ */ jsx(
      MediaPageNoResultsMessage,
      {
        className: "mt-34",
        searchQuery,
        description: /* @__PURE__ */ jsx(Trans, { message: "You have not added any albums to your library yet." })
      }
    ),
    /* @__PURE__ */ jsx(AdHost, { slot: "general_bottom", className: "mt-34" })
  ] });
}
const libraryArtistsQueryKey = (userId) => {
  const user = getBootstrapData().user;
  if (userId === (user == null ? void 0 : user.id)) {
    userId = "me";
  }
  return ["artists", "library", userId];
};
function useUserLikedArtists(userId, options) {
  return useInfiniteData({
    queryKey: libraryArtistsQueryKey(userId),
    endpoint: `users/${userId}/liked-artists`,
    defaultOrderBy: "likes.created_at",
    defaultOrderDir: "desc",
    ...options
  });
}
const sortItems$1 = {
  "likes.created_at:desc": message("Recently added"),
  "name:asc": message("A-Z")
};
function LibraryArtistsPage() {
  const { trans } = useTrans();
  const totalItems = useLibraryStore((s) => Object.keys(s.artist).length);
  const query = useUserLikedArtists("me", { willSortOrFilter: true });
  const {
    isInitialLoading,
    sortDescriptor,
    setSortDescriptor,
    searchQuery,
    setSearchQuery,
    items,
    isError
  } = query;
  if (isError) {
    return /* @__PURE__ */ jsx(PageErrorMessage, {});
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Your artists" }) }),
    /* @__PURE__ */ jsx(AdHost, { slot: "general_top", className: "mb-34" }),
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold mb-20", children: totalItems ? /* @__PURE__ */ jsx(
      Trans,
      {
        message: "[one 1 liked artist|other :count liked artists]",
        values: { count: totalItems }
      }
    ) : /* @__PURE__ */ jsx(Trans, { message: "My artists" }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-24 justify-between", children: [
      /* @__PURE__ */ jsx(
        TextField,
        {
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          className: "max-w-512 flex-auto",
          size: "sm",
          startAdornment: /* @__PURE__ */ jsx(SearchIcon, {}),
          placeholder: trans(message("Search within artists"))
        }
      ),
      /* @__PURE__ */ jsx(
        LibraryPageSortDropdown,
        {
          items: sortItems$1,
          sortDescriptor,
          setSortDescriptor
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-34", children: /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: isInitialLoading ? /* @__PURE__ */ jsx(
      PlayableMediaGridSkeleton,
      {
        itemCount: totalItems,
        itemRadius: "rounded-full",
        showDescription: false
      }
    ) : /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, children: /* @__PURE__ */ jsxs(ContentGrid, { children: [
      items.map((artist) => /* @__PURE__ */ jsx(ArtistGridItem, { artist }, artist.id)),
      /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query })
    ] }) }, "media-grid") }) }),
    !items.length && !isInitialLoading && /* @__PURE__ */ jsx(
      MediaPageNoResultsMessage,
      {
        className: "mt-34",
        searchQuery,
        description: /* @__PURE__ */ jsx(Trans, { message: "You have not added any artists to your library yet." })
      }
    ),
    /* @__PURE__ */ jsx(AdHost, { slot: "general_bottom", className: "mt-34" })
  ] });
}
const libraryHistoryQueryKey = ["tracks", "history", "me"];
function LibraryHistoryPage() {
  const { user } = useAuth();
  const query = useInfiniteData({
    queryKey: libraryHistoryQueryKey,
    endpoint: `tracks/plays/${user.id}`,
    defaultOrderBy: "track_plays.created_at",
    defaultOrderDir: "desc",
    paginate: "simple",
    willSortOrFilter: false
  });
  const { isInitialLoading, searchQuery, setSearchQuery, items, isError } = query;
  const { trans } = useTrans();
  const queueId = queueGroupId(user, "playHistory");
  if (isError) {
    return /* @__PURE__ */ jsx(PageErrorMessage, {});
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Listening history" }) }),
    /* @__PURE__ */ jsx(AdHost, { slot: "general_top", className: "mb-34" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-24 justify-between mb-34", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold w-max md:w-full whitespace-nowrap", children: /* @__PURE__ */ jsx(Trans, { message: "Listening history" }) }),
      /* @__PURE__ */ jsx(
        PlaybackToggleButton,
        {
          queueId,
          buttonType: "text",
          className: "min-w-128 flex-shrink-0"
        }
      ),
      /* @__PURE__ */ jsx(
        TextField,
        {
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          className: "max-w-512 flex-auto",
          size: "sm",
          startAdornment: /* @__PURE__ */ jsx(SearchIcon, {}),
          placeholder: trans(message("Search within history"))
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      TrackTable,
      {
        enableSorting: false,
        queueGroupId: queueId,
        tracks: isInitialLoading ? getPlaceholderItems() : items,
        hideAddedAtColumn: false,
        tableBody: /* @__PURE__ */ jsx(VirtualTableBody, { query })
      }
    ),
    !items.length && !isInitialLoading && /* @__PURE__ */ jsx(
      MediaPageNoResultsMessage,
      {
        className: "mt-34",
        searchQuery,
        description: /* @__PURE__ */ jsx(Trans, { message: "You have not played any songs yet." })
      }
    ),
    /* @__PURE__ */ jsx(AdHost, { slot: "general_bottom", className: "mt-34" })
  ] });
}
function getPlaceholderItems() {
  return [...new Array(10).keys()].map((key) => {
    return {
      isPlaceholder: true,
      id: `placeholder-${key}`
    };
  });
}
function TrackPage() {
  var _a2;
  const { canView: showComments, canCreate: allowCommenting } = useCommentPermissions();
  const query = useTrack({ loader: "trackPage" });
  const { canEdit } = useTrackPermissions([(_a2 = query.data) == null ? void 0 : _a2.track]);
  if (query.data) {
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs(CommentBarContextProvider, { children: [
        /* @__PURE__ */ jsx(PageMetaTags, { query }),
        /* @__PURE__ */ jsx(AdHost, { slot: "general_top", className: "mb-44" }),
        /* @__PURE__ */ jsx(TrackPageHeader, { track: query.data.track }),
        allowCommenting ? /* @__PURE__ */ jsx(
          CommentBarNewCommentForm,
          {
            className: "mb-16",
            commentable: query.data.track
          }
        ) : null
      ] }),
      query.data.track.tags.length ? /* @__PURE__ */ jsx(FocusScope, { children: /* @__PURE__ */ jsx(ChipList, { className: "mb-16", selectable: true, children: query.data.track.tags.map((tag) => /* @__PURE__ */ jsxs(Chip, { elementType: Link, to: `/tag/${tag.name}`, children: [
        "#",
        tag.display_name || tag.name
      ] }, tag.id)) }) }) : null,
      /* @__PURE__ */ jsx(
        TruncatedDescription,
        {
          description: query.data.track.description,
          className: "mt-24 text-sm"
        }
      ),
      showComments ? /* @__PURE__ */ jsx(
        CommentList,
        {
          className: "mt-34",
          commentable: query.data.track,
          canDeleteAllComments: canEdit
        }
      ) : null,
      query.data.track.album && /* @__PURE__ */ jsx(AlbumTrackTable, { album: query.data.track.album }),
      /* @__PURE__ */ jsx(AdHost, { slot: "general_bottom", className: "mt-44" })
    ] });
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
function AlbumTrackTable({ album }) {
  var _a2;
  const { data, sortDescriptor, onSortChange } = useSortableTableData(
    album.tracks
  );
  return /* @__PURE__ */ jsxs("div", { className: "mt-44", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-14 flex items-center gap-16 overflow-hidden rounded bg-hover", children: [
      /* @__PURE__ */ jsx(
        AlbumImage,
        {
          album,
          className: "flex-shrink-0 rounded",
          size: "w-70 h-70"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex-auto", children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm", children: /* @__PURE__ */ jsx(Trans, { message: "From the album" }) }),
        /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold", children: album.name })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      TrackTable,
      {
        queueGroupId: queueGroupId(album),
        tracks: data,
        sortDescriptor,
        onSortChange,
        hideTrackImage: true,
        hideArtist: true,
        hideAlbum: true,
        hidePopularity: false
      }
    ),
    !((_a2 = album.tracks) == null ? void 0 : _a2.length) ? /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        className: "mt-34",
        title: /* @__PURE__ */ jsx(Trans, { message: "Nothing to display" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "This album does not have any tracks yet" })
      }
    ) : null
  ] });
}
function TrackPageHeader({ track }) {
  var _a2, _b2, _c, _d, _e;
  const isMobile = useIsMobileMediaQuery();
  const { player } = useSettings();
  const releaseDate = ((_a2 = track.album) == null ? void 0 : _a2.release_date) || track.created_at;
  const genre = (_b2 = track.genres) == null ? void 0 : _b2[0];
  const showWave = !isMobile && (player == null ? void 0 : player.seekbar_type) === "waveform" && trackIsLocallyUploaded(track);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    MediaPageHeaderLayout,
    {
      className: "mb-28",
      image: /* @__PURE__ */ jsx(TrackImage, { track }),
      title: track.name,
      subtitle: /* @__PURE__ */ jsx(AvatarGroup, { children: (_c = track.artists) == null ? void 0 : _c.map((artist) => /* @__PURE__ */ jsx(
        Avatar,
        {
          circle: true,
          src: getSmallArtistImage(artist),
          label: artist.name,
          link: getArtistLink(artist)
        },
        artist.id
      )) }),
      description: /* @__PURE__ */ jsxs(BulletSeparatedItems, { className: "text-sm text-muted", children: [
        track.duration ? /* @__PURE__ */ jsx(FormattedDuration, { ms: track.duration, verbose: true }) : null,
        releaseDate && /* @__PURE__ */ jsx(FormattedDate, { date: releaseDate }),
        genre && /* @__PURE__ */ jsx(GenreLink, { genre }),
        track.plays && !(player == null ? void 0 : player.enable_repost) ? /* @__PURE__ */ jsx(
          Trans,
          {
            message: ":count plays",
            values: { count: /* @__PURE__ */ jsx(FormattedNumber, { value: track.plays }) }
          }
        ) : null
      ] }),
      actionButtons: /* @__PURE__ */ jsx(
        TrackActionsBar,
        {
          item: track,
          managesItem: false,
          buttonGap: void 0,
          buttonSize: "sm",
          buttonRadius: "rounded-full",
          buttonClassName: actionButtonClassName(),
          children: /* @__PURE__ */ jsx(
            PlaybackToggleButton,
            {
              buttonType: "text",
              track,
              tracks: ((_e = (_d = track.album) == null ? void 0 : _d.tracks) == null ? void 0 : _e.length) ? track.album.tracks : void 0,
              className: actionButtonClassName({ isFirst: true }),
              queueId: queueGroupId(track.album || track)
            }
          )
        }
      ),
      footer: showWave ? /* @__PURE__ */ jsx(Waveform, { track, className: "max-md:hidden" }) : void 0
    }
  ) });
}
function useUserProfile(params) {
  const { userId } = useParams();
  return useQuery({
    queryKey: userProfileQueryKey(userId),
    queryFn: () => fetchUser(userId, params),
    initialData: () => {
      var _a2, _b2;
      const data = (_a2 = getBootstrapData().loaders) == null ? void 0 : _a2[params.loader];
      if (((_b2 = data == null ? void 0 : data.user) == null ? void 0 : _b2.id) == userId && (data == null ? void 0 : data.loader) === params.loader) {
        return data;
      }
      return void 0;
    }
  });
}
function fetchUser(userId, params) {
  return apiClient.get(`user-profile/${userId}`, { params }).then((response) => response.data);
}
function userProfileQueryKey(userId) {
  return ["users", +userId, "profile"];
}
function ProfileRepostsPanel({ user }) {
  const isMobile = useIsMobileMediaQuery();
  const query = useInfiniteData({
    queryKey: ["reposts", user.id],
    endpoint: `users/${user.id}/reposts`
  });
  if (query.isLoading) {
    return /* @__PURE__ */ jsx(FullPageLoader, { className: "min-h-100" });
  }
  if (!query.items.length) {
    return /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        imageHeight: "h-auto",
        imageMargin: "mb-14",
        image: /* @__PURE__ */ jsx(AudiotrackIcon, { size: "lg", className: "text-muted" }),
        title: /* @__PURE__ */ jsx(Trans, { message: "No reposts yet" }),
        description: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Follow :user for updates on tracks and albums they repost in the future.",
            values: { user: user.display_name }
          }
        )
      }
    );
  }
  if (isMobile) {
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(ContentGrid, { children: query.items.map((repost) => {
        var _a2, _b2;
        if (((_a2 = repost.repostable) == null ? void 0 : _a2.model_type) === "track") {
          return /* @__PURE__ */ jsx(TrackGridItem, { track: repost.repostable }, repost.id);
        } else if (((_b2 = repost.repostable) == null ? void 0 : _b2.model_type) === "album") {
          return /* @__PURE__ */ jsx(AlbumGridItem, { album: repost.repostable }, repost.id);
        }
        return null;
      }) }),
      /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    query.items.map((repost) => {
      var _a2, _b2;
      if (((_a2 = repost.repostable) == null ? void 0 : _a2.model_type) === "track") {
        return /* @__PURE__ */ jsx(
          TrackListItem,
          {
            className: "mb-40",
            track: repost.repostable,
            reposter: user
          },
          repost.id
        );
      } else if (((_b2 = repost.repostable) == null ? void 0 : _b2.model_type) === "album") {
        return /* @__PURE__ */ jsx(
          AlbumListItem,
          {
            album: repost.repostable,
            className: "mb-40"
          },
          repost.id
        );
      }
      return null;
    }),
    /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query })
  ] });
}
function ProfileTracksPanel({ user }) {
  const query = useUserLikedTracks(user.id);
  if (query.isLoading) {
    return /* @__PURE__ */ jsx(FullPageLoader, { className: "min-h-100", screen: false });
  }
  if (!query.items.length) {
    return /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        imageHeight: "h-auto",
        imageMargin: "mb-14",
        image: /* @__PURE__ */ jsx(AudiotrackIcon, { size: "lg", className: "text-muted" }),
        title: /* @__PURE__ */ jsx(Trans, { message: "No tracks yet" }),
        description: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Follow :user for updates on tracks they like in the future.",
            values: { user: user.display_name }
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsx(TrackList, { query });
}
const libraryPlaylistsQueryKey = (userId, queryParams) => {
  const user = getBootstrapData().user;
  if (userId === (user == null ? void 0 : user.id)) {
    userId = "me";
  }
  const key = ["playlists", "library", userId];
  if (queryParams) {
    key.push(queryParams);
  }
  return key;
};
function useUserPlaylists(userId, options) {
  return useInfiniteData({
    queryKey: libraryPlaylistsQueryKey(userId),
    endpoint: `users/${userId}/playlists`,
    defaultOrderBy: "updated_at",
    defaultOrderDir: "desc",
    ...options
  });
}
function ProfilePlaylistsPanel({ user }) {
  const query = useUserPlaylists(user.id);
  if (query.isInitialLoading) {
    return /* @__PURE__ */ jsx(FullPageLoader, { className: "min-h-100" });
  }
  if (!query.items.length) {
    return /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        imageHeight: "h-auto",
        imageMargin: "mb-14",
        image: /* @__PURE__ */ jsx(QueueMusicIcon, { size: "lg", className: "text-muted" }),
        title: /* @__PURE__ */ jsx(Trans, { message: "No playlists yet" }),
        description: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Follow :user for updates on playlists they create in the future.",
            values: { user: user.display_name }
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(ContentGrid, { children: query.items.map((playlist) => /* @__PURE__ */ jsx(PlaylistGridItem, { playlist }, playlist.id)) }),
    /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query })
  ] });
}
function ProfileAlbumsPanel({ user }) {
  const query = useUserLikedAlbums(user.id, {
    queryParams: {
      with: "tracks"
    }
  });
  if (query.isInitialLoading) {
    return /* @__PURE__ */ jsx(FullPageLoader, { className: "min-h-100" });
  }
  if (!query.items.length) {
    return /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        imageHeight: "h-auto",
        imageMargin: "mb-14",
        image: /* @__PURE__ */ jsx(AlbumIcon, { size: "lg", className: "text-muted" }),
        title: /* @__PURE__ */ jsx(Trans, { message: "No albums yet" }),
        description: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Follow :user for updates on albums they like in the future.",
            values: { user: user.display_name }
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsx(AlbumList, { query });
}
function ProfileArtistsPanel({ user }) {
  const query = useUserLikedArtists(user.id);
  if (query.isInitialLoading) {
    return /* @__PURE__ */ jsx(FullPageLoader, { className: "min-h-100" });
  }
  if (!query.items.length) {
    return /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        imageHeight: "h-auto",
        imageMargin: "mb-14",
        image: /* @__PURE__ */ jsx(MicIcon, { size: "lg", className: "text-muted" }),
        title: /* @__PURE__ */ jsx(Trans, { message: "No artists yet" }),
        description: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Follow :user for updates on artists they like in the future.",
            values: { user: user.display_name }
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(ContentGrid, { children: query.items.map((artist) => /* @__PURE__ */ jsx(ArtistGridItem, { artist }, artist.id)) }),
    /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query })
  ] });
}
function ProfileFollowersPanel({ user }) {
  const query = useInfiniteData({
    queryKey: ["users", user.id, "followers"],
    endpoint: `users/${user.id}/followers`
  });
  if (query.isLoading) {
    return /* @__PURE__ */ jsx(FullPageLoader, { className: "min-h-100" });
  }
  if (!query.items.length) {
    return /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        imageHeight: "h-auto",
        imageMargin: "mb-14",
        image: /* @__PURE__ */ jsx(BookmarkBorderIcon, { size: "lg", className: "text-muted" }),
        description: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Seems like no one is following :name yet.",
            values: { name: user.display_name }
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    query.items.map((follower) => /* @__PURE__ */ jsx(FollowerListItem, { follower }, follower.id)),
    /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query })
  ] });
}
function ProfileFollowedUsersPanel({ user }) {
  const query = useInfiniteData({
    queryKey: ["users", user.id, "followed-users"],
    endpoint: `users/${user.id}/followed-users`
  });
  if (query.isInitialLoading) {
    return /* @__PURE__ */ jsx(FullPageLoader, { className: "min-h-100" });
  }
  if (!query.items.length) {
    return /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        imageHeight: "h-auto",
        imageMargin: "mb-14",
        image: /* @__PURE__ */ jsx(BookmarkBorderIcon, { size: "lg", className: "text-muted" }),
        description: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Seems like :name is not following anyone yet.",
            values: { name: user.display_name }
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    query.items.map((follower) => /* @__PURE__ */ jsx(FollowerListItem, { follower }, follower.id)),
    /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query })
  ] });
}
function useUpdateUserProfile(form) {
  const { user } = useAuth();
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (payload) => updateProfile(payload),
    onSuccess: () => {
      toast(trans(message("Profile updated")));
      if (user) {
        queryClient.invalidateQueries({ queryKey: userProfileQueryKey(user.id) });
      }
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function updateProfile(payload) {
  return apiClient.put("users/profile/update", payload).then((r) => r.data);
}
function FormComboBox({ children, ...props }) {
  const {
    field: { onChange, onBlur, value = "", ref },
    fieldState: { invalid, error }
  } = useController({
    name: props.name
  });
  const formProps = {
    onSelectionChange: onChange,
    onBlur,
    selectedValue: value,
    defaultInputValue: value,
    invalid,
    errorMessage: error == null ? void 0 : error.message
  };
  return /* @__PURE__ */ jsx(ComboBoxForwardRef, { ref, ...mergeProps(formProps, props), children });
}
function EditProfileDialog({ user }) {
  var _a2, _b2, _c, _d;
  const { close, formId } = useDialogContext();
  const { data } = useValueLists(["countries"]);
  const form = useForm({
    defaultValues: {
      user: {
        username: user.username,
        avatar: user.avatar,
        first_name: user.first_name,
        last_name: user.last_name
      },
      profile: {
        city: (_a2 = user.profile) == null ? void 0 : _a2.city,
        country: (_b2 = user.profile) == null ? void 0 : _b2.country,
        description: (_c = user.profile) == null ? void 0 : _c.description
      },
      links: user.links
    }
  });
  const updateProfile2 = useUpdateUserProfile(form);
  return /* @__PURE__ */ jsxs(Dialog, { size: "xl", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Edit your profile" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      Form,
      {
        id: formId,
        form,
        onSubmit: (values) => updateProfile2.mutate(values, { onSuccess: () => close() }),
        children: /* @__PURE__ */ jsxs(FileUploadProvider, { children: [
          /* @__PURE__ */ jsxs("div", { className: "md:flex items-start gap-30", children: [
            /* @__PURE__ */ jsx(
              FormImageSelector,
              {
                label: /* @__PURE__ */ jsx(Trans, { message: "Avatar" }),
                name: "user.avatar",
                diskPrefix: "avatars",
                variant: "square",
                previewSize: "w-200 h-200",
                className: "max-md:mb-20"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex-auto", children: [
              /* @__PURE__ */ jsx(
                FormTextField,
                {
                  name: "user.username",
                  label: /* @__PURE__ */ jsx(Trans, { message: "Username" }),
                  className: "mb-24"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-24", children: [
                /* @__PURE__ */ jsx(
                  FormTextField,
                  {
                    name: "user.first_name",
                    label: /* @__PURE__ */ jsx(Trans, { message: "First name" }),
                    className: "flex-1 mb-24"
                  }
                ),
                /* @__PURE__ */ jsx(
                  FormTextField,
                  {
                    name: "user.last_name",
                    label: /* @__PURE__ */ jsx(Trans, { message: "Last name" }),
                    className: "flex-1 mb-24"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-24", children: [
                /* @__PURE__ */ jsx(
                  FormTextField,
                  {
                    name: "profile.city",
                    label: /* @__PURE__ */ jsx(Trans, { message: "City" }),
                    className: "flex-1 mb-24"
                  }
                ),
                /* @__PURE__ */ jsx(
                  FormComboBox,
                  {
                    className: "flex-1 mb-24",
                    selectionMode: "single",
                    name: "profile.country",
                    label: /* @__PURE__ */ jsx(Trans, { message: "Country" }),
                    children: (_d = data == null ? void 0 : data.countries) == null ? void 0 : _d.map((country) => /* @__PURE__ */ jsx(Item, { value: country.name, children: country.name }, country.code))
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                FormTextField,
                {
                  name: "profile.description",
                  label: /* @__PURE__ */ jsx(Trans, { message: "Description" }),
                  inputElementType: "textarea",
                  rows: 4
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-24", children: [
            /* @__PURE__ */ jsx("div", { className: "mb-16 pb-16 border-b", children: /* @__PURE__ */ jsx(Trans, { message: "Your links" }) }),
            /* @__PURE__ */ jsx(ProfileLinksForm, {})
          ] })
        ] })
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
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
          type: "submit",
          variant: "flat",
          color: "primary",
          disabled: updateProfile2.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
        }
      )
    ] })
  ] });
}
function ProfileHeader({ user, tabLink }) {
  const { user: currentUser } = useAuth();
  return /* @__PURE__ */ jsx(
    MediaPageHeaderLayout,
    {
      image: /* @__PURE__ */ jsx(
        UserImage,
        {
          user,
          size: "w-240 h-240",
          className: "rounded",
          showProBadge: true
        }
      ),
      title: user.display_name,
      subtitle: /* @__PURE__ */ jsxs(BulletSeparatedItems, { className: "z-20 mx-auto w-max text-sm text-muted", children: [
        user.followers_count && user.followers_count > 0 ? /* @__PURE__ */ jsx(Link, { to: tabLink("followers"), className: "hover:underline", children: /* @__PURE__ */ jsx(
          Trans,
          {
            message: ":count followers",
            values: { count: user.followers_count }
          }
        ) }) : null,
        user.followed_users_count && user.followed_users_count > 0 ? /* @__PURE__ */ jsx(Link, { to: tabLink("following"), className: "hover:underline", children: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Following :count",
            values: { count: user.followed_users_count }
          }
        ) }) : null
      ] }),
      actionButtons: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center md:justify-start", children: [
        /* @__PURE__ */ jsx(
          FollowButton,
          {
            user,
            variant: "flat",
            color: "primary",
            minWidth: null,
            className: actionButtonClassName({ isFirst: true }),
            radius: "rounded-full"
          }
        ),
        (currentUser == null ? void 0 : currentUser.id) === user.id && /* @__PURE__ */ jsx(EditButton, { user })
      ] }),
      footer: /* @__PURE__ */ jsx(ProfileDescription, { profile: user.profile, links: user.links })
    }
  );
}
function EditButton({ user }) {
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "outline",
        radius: "rounded-full",
        startIcon: /* @__PURE__ */ jsx(EditIcon, {}),
        className: actionButtonClassName(),
        children: /* @__PURE__ */ jsx(Trans, { message: "Edit" })
      }
    ),
    /* @__PURE__ */ jsx(EditProfileDialog, { user })
  ] });
}
const profileTabs = [
  "tracks",
  "playlists",
  "reposts",
  "albums",
  "artists",
  "followers",
  "following"
];
if (!((_b = getBootstrapData().settings.player) == null ? void 0 : _b.enable_repost)) {
  profileTabs.splice(2, 1);
}
function UserProfilePage() {
  const query = useUserProfile({ loader: "userProfilePage" });
  if (query.data) {
    return /* @__PURE__ */ jsx(PageContent$1, { user: query.data.user });
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
function PageContent$1({ user }) {
  const { player } = useSettings();
  const { tabName = "tracks" } = useParams();
  const selectedTab = profileTabs.indexOf(tabName) || 0;
  const tabLink = useCallback(
    (tabName2) => {
      return `/user/${user.id}/${user.display_name}/${tabName2}`;
    },
    [user]
  );
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ProfileHeader, { user, tabLink }),
    /* @__PURE__ */ jsxs(Tabs, { className: "mt-48", isLazy: true, selectedTab, children: [
      /* @__PURE__ */ jsxs(TabList, { children: [
        /* @__PURE__ */ jsx(Tab, { elementType: Link, to: tabLink("tracks"), children: /* @__PURE__ */ jsx(Trans, { message: "Liked tracks" }) }),
        /* @__PURE__ */ jsx(Tab, { elementType: Link, to: tabLink("playlists"), children: /* @__PURE__ */ jsx(Trans, { message: "Public playlists" }) }),
        (player == null ? void 0 : player.enable_repost) && /* @__PURE__ */ jsx(Tab, { elementType: Link, to: tabLink("reposts"), children: /* @__PURE__ */ jsx(Trans, { message: "Reposts" }) }),
        /* @__PURE__ */ jsx(Tab, { elementType: Link, to: tabLink("albums"), children: /* @__PURE__ */ jsx(Trans, { message: "Liked albums" }) }),
        /* @__PURE__ */ jsx(Tab, { elementType: Link, to: tabLink("artists"), children: /* @__PURE__ */ jsx(Trans, { message: "Liked artists" }) }),
        /* @__PURE__ */ jsx(Tab, { elementType: Link, to: tabLink("followers"), children: /* @__PURE__ */ jsx(Trans, { message: "Followers" }) }),
        /* @__PURE__ */ jsx(Tab, { elementType: Link, to: tabLink("following"), children: /* @__PURE__ */ jsx(Trans, { message: "Following" }) })
      ] }),
      /* @__PURE__ */ jsxs(TabPanels, { className: "mt-24", children: [
        /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(ProfileTracksPanel, { user }) }),
        /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(ProfilePlaylistsPanel, { user }) }),
        (player == null ? void 0 : player.enable_repost) && /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(ProfileRepostsPanel, { user }) }),
        /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(ProfileAlbumsPanel, { user }) }),
        /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(ProfileArtistsPanel, { user }) }),
        /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(ProfileFollowersPanel, { user }) }),
        /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(ProfileFollowedUsersPanel, { user }) })
      ] })
    ] })
  ] });
}
const tagTabNames = {
  tracks: 0,
  albums: 1
};
function TagMediaPage() {
  var _a2;
  const params = useParams();
  const tagName = params.tagName;
  const tabName = ((_a2 = params["*"]) == null ? void 0 : _a2.split("/").pop()) || tagTabNames.tracks;
  const [selectedTab, setSelectedTab] = useState(
    tagTabNames[tabName] || 0
  );
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl mb-40", children: tabName === "albums" ? /* @__PURE__ */ jsx(
      Trans,
      {
        message: "Most popular albums for #:tag",
        values: { tag: tagName }
      }
    ) : /* @__PURE__ */ jsx(
      Trans,
      {
        message: "Most popular tracks for #:tag",
        values: { tag: tagName }
      }
    ) }),
    /* @__PURE__ */ jsxs(Tabs, { selectedTab, onTabChange: setSelectedTab, children: [
      /* @__PURE__ */ jsxs(TabList, { children: [
        /* @__PURE__ */ jsx(Tab, { elementType: Link, to: `/tag/${tagName}`, children: /* @__PURE__ */ jsx(Trans, { message: "Tracks" }) }),
        /* @__PURE__ */ jsx(Tab, { elementType: Link, to: `/tag/${tagName}/albums`, children: /* @__PURE__ */ jsx(Trans, { message: "Albums" }) })
      ] }),
      /* @__PURE__ */ jsxs(TabPanels, { className: "pt-24", children: [
        /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(TracksPanel, { tagName }) }),
        /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(AlbumsPanel, { tagName }) })
      ] })
    ] })
  ] });
}
function AlbumsPanel({ tagName }) {
  const query = useInfiniteData({
    queryKey: ["albums", "tags", tagName],
    endpoint: `tags/${tagName}/albums`
  });
  if (query.isLoading) {
    return /* @__PURE__ */ jsx(FullPageLoader, { className: "min-h-100", screen: false });
  }
  if (!query.items.length) {
    return /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        imageHeight: "h-auto",
        imageMargin: "mb-14",
        image: /* @__PURE__ */ jsx(AlbumIcon, { size: "lg", className: "text-muted" }),
        title: /* @__PURE__ */ jsx(Trans, { message: "No albums yet" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "This tag is not attached to any albums yet, check back later." })
      }
    );
  }
  return /* @__PURE__ */ jsx(AlbumList, { query });
}
function TracksPanel({ tagName }) {
  const query = useInfiniteData({
    queryKey: ["tracks", "tags", tagName],
    endpoint: `tags/${tagName}/tracks`
  });
  if (query.isLoading) {
    return /* @__PURE__ */ jsx(FullPageLoader, { className: "min-h-100", screen: false });
  }
  if (!query.items.length) {
    return /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        imageHeight: "h-auto",
        imageMargin: "mb-14",
        image: /* @__PURE__ */ jsx(AudiotrackIcon, { size: "lg", className: "text-muted" }),
        title: /* @__PURE__ */ jsx(Trans, { message: "No tracks yet" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "This tag is not attached to any tracks yet, check back later." })
      }
    );
  }
  return /* @__PURE__ */ jsx(TrackList, { query });
}
function useRadioRecommendations() {
  const { seedType, seedId } = useParams();
  return useQuery({
    queryKey: ["radio", seedType, +seedId],
    queryFn: () => fetchRecommendations(seedType, seedId),
    // different suggestions are returned every time, don't reload in background
    staleTime: Infinity
  });
}
function fetchRecommendations(seedType, seedId) {
  return apiClient.get(`radio/${seedType}/${seedId}`).then((response) => response.data);
}
const validSeeds = ["artist", "track", "genre"];
function RadioPage() {
  var _a2;
  const { seedType } = useParams();
  const query = useRadioRecommendations();
  const { data, onSortChange, sortDescriptor } = useSortableTableData(
    (_a2 = query.data) == null ? void 0 : _a2.recommendations
  );
  const totalDuration = useMemo(() => {
    return data.reduce((total, track) => {
      return total + (track.duration || 0);
    }, 0);
  }, [data]);
  if (!validSeeds.includes(seedType)) {
    return /* @__PURE__ */ jsx(NotFoundPage, {});
  }
  if (query.data) {
    const seed = query.data.seed;
    const queueId = queueGroupId(seed, "radio");
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(PageMetaTags, { query }),
      /* @__PURE__ */ jsx(AdHost, { slot: "general_top", className: "mb-44" }),
      /* @__PURE__ */ jsx(
        MediaPageHeaderLayout,
        {
          image: /* @__PURE__ */ jsx(Image$1, { seed }),
          title: /* @__PURE__ */ jsx(
            Trans,
            {
              message: ":name radio",
              values: {
                name: "display_name" in seed && seed.display_name ? seed.display_name : seed.name
              }
            }
          ),
          subtitle: /* @__PURE__ */ jsxs(BulletSeparatedItems, { className: "justify-center text-sm text-muted md:justify-start", children: [
            /* @__PURE__ */ jsx(RadioType, { seed }),
            /* @__PURE__ */ jsx(
              Trans,
              {
                message: "[one 1 song|other :count songs]",
                values: { count: data.length }
              }
            ),
            /* @__PURE__ */ jsx(FormattedDuration, { ms: totalDuration, verbose: true })
          ] }),
          actionButtons: /* @__PURE__ */ jsx("div", { className: "text-center md:text-start", children: /* @__PURE__ */ jsx(
            PlaybackToggleButton,
            {
              tracks: data,
              disabled: !data.length,
              buttonType: "text",
              queueId,
              className: actionButtonClassName({ isFirst: true })
            }
          ) })
        }
      ),
      /* @__PURE__ */ jsx(
        TrackTable,
        {
          className: "mt-34",
          tracks: data,
          queueGroupId: queueId,
          onSortChange,
          sortDescriptor
        }
      ),
      /* @__PURE__ */ jsx(AdHost, { slot: "general_bottom", className: "mt-44" })
    ] });
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
function Image$1({ seed }) {
  switch (seed.model_type) {
    case "artist":
      return /* @__PURE__ */ jsx(
        SmallArtistImage,
        {
          artist: seed,
          size: "w-240 h-240",
          wrapperClassName: "mx-auto",
          className: "rounded"
        }
      );
    case "genre":
      return /* @__PURE__ */ jsx(
        GenreImage,
        {
          genre: seed,
          size: "w-240 h-240",
          className: "mx-auto rounded"
        }
      );
    default:
      return /* @__PURE__ */ jsx(
        TrackImage,
        {
          track: seed,
          size: "w-240 h-240",
          className: "mx-auto rounded"
        }
      );
  }
}
function RadioType({ seed }) {
  switch (seed.model_type) {
    case "artist":
      return /* @__PURE__ */ jsx(Trans, { message: "Artist radio" });
    case "genre":
      return /* @__PURE__ */ jsx(Trans, { message: "Genre radio" });
    default:
      return /* @__PURE__ */ jsx(Trans, { message: "Track radio" });
  }
}
function useInfiniteSearchResults(modelType, initialPage) {
  const { searchQuery } = useParams();
  return useInfiniteData({
    endpoint: `search/model/${modelType}`,
    queryParams: { query: searchQuery || "" },
    initialPage,
    queryKey: ["search", modelType],
    paginate: "simple"
  });
}
function SearchResultsPage() {
  const { searchQuery } = useParams();
  const query = useSearchResults({
    loader: "searchPage",
    query: searchQuery
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(MobileSearchBar, {}),
    /* @__PURE__ */ jsx(PageContent, { query })
  ] });
}
function MobileSearchBar() {
  const { searchQuery = "" } = useParams();
  const navigate = useNavigate();
  const { trans } = useTrans();
  const isMobile = useIsMobileMediaQuery();
  if (!isMobile) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    TextField,
    {
      defaultValue: searchQuery,
      onChange: (e) => {
        navigate(`/search/${e.target.value}`, { replace: true });
      },
      autoFocus: true,
      className: "w-full",
      size: "lg",
      placeholder: trans(message("Search..."))
    }
  );
}
function PageContent({ query }) {
  var _a2;
  const { branding } = useSettings();
  if (query.data) {
    return /* @__PURE__ */ jsx(SearchResults, { results: (_a2 = query.data) == null ? void 0 : _a2.results });
  }
  if (query.fetchStatus === "idle") {
    return /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        className: "mt-40",
        image: /* @__PURE__ */ jsx(SearchIcon, { size: "xl" }),
        imageHeight: "h-auto",
        imageMargin: "mb-12",
        title: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Search :siteName",
            values: { siteName: branding.site_name }
          }
        ),
        description: /* @__PURE__ */ jsx(Trans, { message: "Find songs, artists, albums, playlists and more." })
      }
    );
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
function SearchResults({ results }) {
  var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j;
  const { tabName = "all", searchQuery } = useParams();
  const tabNames = useMemo(() => {
    const names = ["tracks", "artists", "albums", "playlists", "users"].filter(
      (tabName2) => {
        var _a3;
        return (_a3 = results[tabName2]) == null ? void 0 : _a3.data.length;
      }
    );
    return ["all", ...names];
  }, [results]);
  const tabIndex = tabNames.indexOf(tabName);
  const [selectedTab, setSelectedTab] = useState(tabIndex > -1 ? tabIndex : 0);
  useEffect(() => {
    if (tabIndex !== selectedTab) {
      setSelectedTab(tabIndex);
    }
  }, [tabIndex, selectedTab]);
  const tabLink = (tabName2) => {
    let base = `/search/${searchQuery}`;
    if (tabName2) {
      base += `/${tabName2}`;
    }
    return base;
  };
  const haveResults = Object.entries(results).some(([, r]) => r == null ? void 0 : r.data.length);
  if (!haveResults) {
    return /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        className: "mt-40",
        image: /* @__PURE__ */ jsx(SearchIcon, { size: "xl" }),
        imageHeight: "h-auto",
        title: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Not results for “:query“",
            values: { query: searchQuery }
          }
        ),
        description: /* @__PURE__ */ jsx(Trans, { message: "Please try a different search query" })
      }
    );
  }
  return /* @__PURE__ */ jsxs(Tabs, { selectedTab, onTabChange: setSelectedTab, children: [
    /* @__PURE__ */ jsxs(TabList, { children: [
      /* @__PURE__ */ jsx(Tab, { elementType: Link, to: tabLink(), children: /* @__PURE__ */ jsx(Trans, { message: "Top results" }) }),
      ((_a2 = results.tracks) == null ? void 0 : _a2.data.length) ? /* @__PURE__ */ jsx(Tab, { elementType: Link, to: tabLink("tracks"), children: /* @__PURE__ */ jsx(Trans, { message: "Tracks" }) }) : null,
      ((_b2 = results.artists) == null ? void 0 : _b2.data.length) ? /* @__PURE__ */ jsx(Tab, { elementType: Link, to: tabLink("artists"), children: /* @__PURE__ */ jsx(Trans, { message: "Artists" }) }) : null,
      ((_c = results.albums) == null ? void 0 : _c.data.length) ? /* @__PURE__ */ jsx(Tab, { elementType: Link, to: tabLink("albums"), children: /* @__PURE__ */ jsx(Trans, { message: "Albums" }) }) : null,
      ((_d = results.playlists) == null ? void 0 : _d.data.length) ? /* @__PURE__ */ jsx(Tab, { elementType: Link, to: tabLink("playlists"), children: /* @__PURE__ */ jsx(Trans, { message: "Playlists" }) }) : null,
      ((_e = results.users) == null ? void 0 : _e.data.length) ? /* @__PURE__ */ jsx(Tab, { elementType: Link, to: tabLink("users"), children: /* @__PURE__ */ jsx(Trans, { message: "Profiles" }) }) : null
    ] }),
    /* @__PURE__ */ jsxs(TabPanels, { className: "pt-8", children: [
      /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(TopResultsPanel, { results }) }),
      ((_f = results.tracks) == null ? void 0 : _f.data.length) ? /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(PaginatedTrackResults, { data: results.tracks }) }) : null,
      ((_g = results.artists) == null ? void 0 : _g.data.length) ? /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(PaginatedArtistResults, { data: results.artists }) }) : null,
      ((_h = results.albums) == null ? void 0 : _h.data.length) ? /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(PaginatedAlbumResults, { data: results.albums }) }) : null,
      ((_i = results.playlists) == null ? void 0 : _i.data.length) ? /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(PaginatedPlaylistResults, { data: results.playlists }) }) : null,
      ((_j = results.users) == null ? void 0 : _j.data.length) ? /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(PaginatedProfileResults, { data: results.users }) }) : null
    ] })
  ] });
}
function TopResultsPanel({
  results: { artists, albums, tracks, playlists, users }
}) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    (tracks == null ? void 0 : tracks.data.length) ? /* @__PURE__ */ jsx(TrackResults, { data: tracks.data.slice(0, 5), showMore: true }) : null,
    (artists == null ? void 0 : artists.data.length) ? /* @__PURE__ */ jsx(ArtistResults, { data: artists.data.slice(0, 5), showMore: true }) : null,
    (albums == null ? void 0 : albums.data.length) ? /* @__PURE__ */ jsx(AlbumResults, { data: albums.data.slice(0, 5), showMore: true }) : null,
    (playlists == null ? void 0 : playlists.data.length) ? /* @__PURE__ */ jsx(PlaylistResults, { data: playlists.data.slice(0, 5), showMore: true }) : null,
    (users == null ? void 0 : users.data.length) ? /* @__PURE__ */ jsx(ProfileResults, { data: users.data.slice(0, 5), showMore: true }) : null
  ] });
}
function TrackResults({ data, showMore, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "py-24", children: [
    /* @__PURE__ */ jsx(PanelTitle, { to: showMore ? "tracks" : void 0, children: /* @__PURE__ */ jsx(Trans, { message: "Tracks" }) }),
    /* @__PURE__ */ jsx(TrackTable, { tracks: data }),
    children
  ] });
}
function PaginatedTrackResults({
  data,
  showMore
}) {
  const query = useInfiniteSearchResults(TRACK_MODEL, data);
  return /* @__PURE__ */ jsx(TrackResults, { data: query.items, showMore, children: /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query }) });
}
function PaginatedArtistResults({
  data,
  showMore
}) {
  const query = useInfiniteSearchResults(ARTIST_MODEL, data);
  return /* @__PURE__ */ jsx(ArtistResults, { data: query.items, showMore, children: /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query }) });
}
function ArtistResults({ data, showMore, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "py-24", children: [
    /* @__PURE__ */ jsx(PanelTitle, { to: showMore ? "artists" : void 0, children: /* @__PURE__ */ jsx(Trans, { message: "Artists" }) }),
    /* @__PURE__ */ jsx(ContentGrid, { children: data.map((artist) => /* @__PURE__ */ jsx(ArtistGridItem, { artist }, artist.id)) }),
    children
  ] });
}
function AlbumResults({ data, showMore, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "py-24", children: [
    /* @__PURE__ */ jsx(PanelTitle, { to: showMore ? "albums" : void 0, children: /* @__PURE__ */ jsx(Trans, { message: "Albums" }) }),
    /* @__PURE__ */ jsx(ContentGrid, { children: data.map((album) => /* @__PURE__ */ jsx(AlbumGridItem, { album }, album.id)) }),
    children
  ] });
}
function PaginatedAlbumResults({
  data,
  showMore
}) {
  const query = useInfiniteSearchResults(ALBUM_MODEL, data);
  return /* @__PURE__ */ jsx(AlbumResults, { data: query.items, showMore, children: /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query }) });
}
function PlaylistResults({
  data,
  showMore,
  children
}) {
  return /* @__PURE__ */ jsxs("div", { className: "py-24", children: [
    /* @__PURE__ */ jsx(PanelTitle, { to: showMore ? "playlists" : void 0, children: /* @__PURE__ */ jsx(Trans, { message: "Playlists" }) }),
    /* @__PURE__ */ jsx(ContentGrid, { children: data.map((playlist) => /* @__PURE__ */ jsx(PlaylistGridItem, { playlist }, playlist.id)) }),
    children
  ] });
}
function PaginatedPlaylistResults({
  data,
  showMore
}) {
  const query = useInfiniteSearchResults(PLAYLIST_MODEL, data);
  return /* @__PURE__ */ jsx(PlaylistResults, { data: query.items, showMore, children: /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query }) });
}
function ProfileResults({ data, showMore, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "py-24", children: [
    /* @__PURE__ */ jsx(PanelTitle, { to: showMore ? "users" : void 0, children: /* @__PURE__ */ jsx(Trans, { message: "Profiles" }) }),
    /* @__PURE__ */ jsx(ContentGrid, { children: data.map((user) => /* @__PURE__ */ jsx(UserGridItem, { user }, user.id)) }),
    children
  ] });
}
function PaginatedProfileResults({
  data,
  showMore
}) {
  const query = useInfiniteSearchResults(USER_MODEL, data);
  return /* @__PURE__ */ jsx(ProfileResults, { data: query.items, showMore, children: /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query }) });
}
function PanelTitle({ children, to }) {
  const ref = useRef(null);
  return /* @__PURE__ */ jsx("h2", { className: "mb-24 w-max text-2xl font-medium", ref, children: to ? /* @__PURE__ */ jsxs(
    Link,
    {
      to,
      className: "flex items-center gap-2 hover:text-primary",
      onClick: () => {
        const scrollParent = getScrollParent(ref.current);
        if (scrollParent) {
          scrollParent.scrollTo({ top: 0 });
        }
      },
      children: [
        children,
        /* @__PURE__ */ jsx(KeyboardArrowRightIcon, { className: "mt-4" })
      ]
    }
  ) : children });
}
function LibraryPage() {
  const navigate = useNavigate();
  const authHandler = useAuthClickCapture();
  const query = useUserPlaylists("me");
  const isSmallScreen = useIsTabletMediaQuery();
  if (!isSmallScreen) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/library/songs", replace: true });
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Your tracks" }) }),
    /* @__PURE__ */ jsx(AdHost, { slot: "general_top", className: "mb-34" }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-24 mb-20", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold whitespace-nowrap", children: /* @__PURE__ */ jsx(Trans, { message: "Your library" }) }),
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
            /* @__PURE__ */ jsx(IconButton, { className: "flex-shrink-0", onClickCapture: authHandler, children: /* @__PURE__ */ jsx(PlaylistAddIcon, {}) }),
            /* @__PURE__ */ jsx(CreatePlaylistDialog, {})
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        MenuItem,
        {
          icon: /* @__PURE__ */ jsx(AudiotrackIcon, { className: "text-main" }),
          to: "/library/songs",
          children: /* @__PURE__ */ jsx(Trans, { message: "Songs" })
        }
      ),
      /* @__PURE__ */ jsx(MenuItem, { icon: /* @__PURE__ */ jsx(PlaylistPlayIcon, {}), to: "/library/playlists", children: /* @__PURE__ */ jsx(Trans, { message: "Playlists" }) }),
      /* @__PURE__ */ jsx(MenuItem, { icon: /* @__PURE__ */ jsx(AlbumIcon, {}), to: "/library/albums", children: /* @__PURE__ */ jsx(Trans, { message: "Albums" }) }),
      /* @__PURE__ */ jsx(MenuItem, { icon: /* @__PURE__ */ jsx(MicIcon, {}), to: "/library/artists", children: /* @__PURE__ */ jsx(Trans, { message: "Artists" }) }),
      /* @__PURE__ */ jsx(MenuItem, { icon: /* @__PURE__ */ jsx(HistoryIcon, {}), to: "/library/history", children: /* @__PURE__ */ jsx(Trans, { message: "Play history" }) }),
      query.items.map((playlist) => /* @__PURE__ */ jsx(
        MenuItem,
        {
          wrapIcon: false,
          icon: /* @__PURE__ */ jsx(
            PlaylistImage,
            {
              size: "w-42 h-42",
              className: "rounded",
              playlist
            }
          ),
          to: getPlaylistLink(playlist),
          children: playlist.name
        },
        playlist.id
      )),
      /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query })
    ] })
  ] });
}
function MenuItem({ icon, children, to, wrapIcon = true }) {
  return /* @__PURE__ */ jsxs(Link, { className: "flex items-center gap-14 mb-18 text-sm", to, children: [
    wrapIcon ? /* @__PURE__ */ jsx("div", { className: "rounded bg-chip p-8 w-42 h-42", children: icon }) : icon,
    children
  ] });
}
const sortItems = {
  "updated_at:desc": message("Recently updated"),
  "name:asc": message("A-Z"),
  "views:desc": message("Most viewed"),
  "plays:desc": message("Most played")
};
function LibraryPlaylistsPage() {
  const navigate = useNavigate();
  const authHandler = useAuthClickCapture();
  const { trans } = useTrans();
  const { data } = useAuthUserPlaylists();
  const totalItems = data.playlists.length;
  const query = useUserPlaylists("me", { willSortOrFilter: true });
  const {
    isInitialLoading,
    sortDescriptor,
    setSortDescriptor,
    searchQuery,
    setSearchQuery,
    items,
    isError
  } = query;
  if (isError) {
    return /* @__PURE__ */ jsx(PageErrorMessage, {});
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Your playlists" }) }),
    /* @__PURE__ */ jsx(AdHost, { slot: "general_top", className: "mb-34" }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-24 mb-20", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold whitespace-nowrap", children: totalItems ? /* @__PURE__ */ jsx(
        Trans,
        {
          message: "[one 1 playlist|other :count playlists]",
          values: { count: totalItems }
        }
      ) : /* @__PURE__ */ jsx(Trans, { message: "My playlists" }) }),
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
            /* @__PURE__ */ jsx(IconButton, { className: "flex-shrink-0", onClickCapture: authHandler, children: /* @__PURE__ */ jsx(PlaylistAddIcon, {}) }),
            /* @__PURE__ */ jsx(CreatePlaylistDialog, {})
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-24 justify-between", children: [
      /* @__PURE__ */ jsx(
        TextField,
        {
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          className: "max-w-512 flex-auto",
          size: "sm",
          startAdornment: /* @__PURE__ */ jsx(SearchIcon, {}),
          placeholder: trans(message("Search within playlists"))
        }
      ),
      /* @__PURE__ */ jsx(
        LibraryPageSortDropdown,
        {
          items: sortItems,
          sortDescriptor,
          setSortDescriptor
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-34", children: /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: isInitialLoading ? /* @__PURE__ */ jsx(PlayableMediaGridSkeleton, { itemCount: totalItems }) : /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, children: /* @__PURE__ */ jsxs(ContentGrid, { children: [
      items.map((playlist) => /* @__PURE__ */ jsx(PlaylistGridItem, { playlist }, playlist.id)),
      /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query })
    ] }) }, "media-grid") }) }),
    !items.length && !isInitialLoading && /* @__PURE__ */ jsx(
      MediaPageNoResultsMessage,
      {
        className: "mt-34",
        searchQuery,
        description: /* @__PURE__ */ jsx(Trans, { message: "You have not added any playlists to your library yet." })
      }
    )
  ] });
}
function TrackEmbed() {
  const { data } = useTrack({ loader: "trackPage" });
  return /* @__PURE__ */ jsx("div", { className: "h-[174px] rounded border bg-alt p-14", children: !(data == null ? void 0 : data.track) ? /* @__PURE__ */ jsx(FullPageLoader, { screen: false }) : /* @__PURE__ */ jsx(EmbedContent$1, { track: data.track }) });
}
function EmbedContent$1({ track }) {
  const options = useMemo(() => {
    const mediaItem = trackToMediaItem(track);
    return {
      ...playerStoreOptions,
      initialData: {
        queue: [mediaItem],
        cuedMediaId: mediaItem.id,
        state: {
          repeat: false
        }
      }
    };
  }, [track]);
  return /* @__PURE__ */ jsx(PlayerContext, { id: "web-player", options, children: /* @__PURE__ */ jsxs("div", { className: "flex gap-24", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative h-144 w-144 flex-shrink-0 overflow-hidden rounded bg-black", children: [
      /* @__PURE__ */ jsx(PlayerPoster, { className: "absolute inset-0" }),
      /* @__PURE__ */ jsx(PlayerOutlet, { className: "h-full w-full" })
    ] }),
    /* @__PURE__ */ jsx(
      TrackListItem,
      {
        track,
        hideArtwork: true,
        hideActions: true,
        linksInNewTab: true,
        className: "flex-auto"
      }
    )
  ] }) });
}
function AlbumEmbed() {
  const { data } = useAlbum({ loader: "albumEmbed" });
  return /* @__PURE__ */ jsx("div", { className: "h-384 rounded border bg-alt p-14", children: !(data == null ? void 0 : data.album) ? /* @__PURE__ */ jsx(FullPageLoader, { screen: false }) : /* @__PURE__ */ jsx(EmbedContent, { album: data.album }) });
}
function EmbedContent({ album }) {
  const options = useMemo(() => {
    var _a2, _b2;
    return {
      ...playerStoreOptions,
      initialData: {
        queue: ((_a2 = album.tracks) == null ? void 0 : _a2.length) ? tracksToMediaItems(album.tracks) : [],
        cuedMediaId: ((_b2 = album.tracks) == null ? void 0 : _b2.length) ? trackToMediaItem(album.tracks[0]).id : void 0,
        state: {
          repeat: false
        }
      }
    };
  }, [album]);
  return /* @__PURE__ */ jsx(PlayerContext, { id: "web-player", options, children: /* @__PURE__ */ jsxs("div", { className: "flex h-full items-start gap-24", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative h-144 w-144 flex-shrink-0 overflow-hidden rounded bg-black", children: [
      /* @__PURE__ */ jsx(PlayerPoster, { className: "absolute inset-0" }),
      /* @__PURE__ */ jsx(PlayerOutlet, { className: "h-full w-full" })
    ] }),
    /* @__PURE__ */ jsx(
      AlbumListItem,
      {
        album,
        maxHeight: "h-full",
        className: "flex-auto",
        hideArtwork: true,
        hideActions: true,
        linksInNewTab: true
      }
    )
  ] }) });
}
function HomepageChannelPage() {
  const { homepage } = useSettings();
  let slugOrId = "discover";
  if (homepage.type.startsWith("channel") && homepage.value) {
    slugOrId = homepage.value;
  }
  return /* @__PURE__ */ jsx(ChannelPage, { slugOrId });
}
function useLyrics(trackId, queryParams) {
  return useQuery({
    queryKey: ["lyrics", trackId],
    queryFn: () => fetchLyrics(trackId, queryParams)
  });
}
function fetchLyrics(trackId, queryParams) {
  return apiClient.get(`tracks/${trackId}/lyrics`, { params: queryParams }).then((response) => response.data);
}
function LyricsPage() {
  const track = useCuedTrack();
  return /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: /* @__PURE__ */ jsx("div", { children: track ? /* @__PURE__ */ jsx(Lyrics, { track }) : /* @__PURE__ */ jsx(
    NoLyricsMessage,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Play a song in order to view lyrics." })
    }
  ) }) });
}
function Lyrics({ track }) {
  const duration = usePlayerStore((s) => s.mediaDuration);
  const { data, isLoading } = useLyrics(track.id, { duration });
  if (data) {
    return /* @__PURE__ */ jsx(SyncedLyrics, { data });
  }
  if (isLoading) {
    return /* @__PURE__ */ jsx(LyricSkeleton, {});
  }
  return /* @__PURE__ */ jsx(
    NoLyricsMessage,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "We do not have lyrics for this song yet" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Please try again later" })
    }
  );
}
const calcActiveIndex = (data, time) => {
  var _a2;
  for (let i = 0; i < data.lines.length; i++) {
    if (data.lines[i].time <= time && ((_a2 = data.lines[i + 1]) == null ? void 0 : _a2.time) > time) {
      return i;
    }
  }
  return null;
};
function SyncedLyrics({ data }) {
  const duration = usePlayerStore((s) => s.mediaDuration);
  const lyricDuration = data.duration;
  const shouldSync = data.is_synced && (!lyricDuration || Math.abs(lyricDuration - duration) <= 12);
  const currentTime = useCurrentTime({
    precision: "seconds",
    disabled: !shouldSync
  });
  const activeIndex = useMemo(
    () => shouldSync ? calcActiveIndex(data, currentTime) : null,
    [data, currentTime, shouldSync]
  );
  useEffect(() => {
    setTimeout(() => {
      var _a2;
      (_a2 = document.querySelector(`[data-line-index="${0}"]`)) == null ? void 0 : _a2.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    });
  }, [data]);
  useEffect(() => {
    var _a2;
    if (activeIndex != null) {
      (_a2 = document.querySelector(`[data-line-index="${activeIndex}"]`)) == null ? void 0 : _a2.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }, [activeIndex]);
  return /* @__PURE__ */ jsx(LyricsWrapper, { animationKey: "synced-lyrics", children: data.lines.map((line, index) => {
    const isPast = activeIndex && index < activeIndex;
    const isActive = activeIndex === index;
    return /* @__PURE__ */ jsx(
      "div",
      {
        "data-line-index": index,
        className: clsx(
          "max-md:mb-18 md:leading-[48px]",
          isPast && "opacity-40",
          isActive && "text-primary"
        ),
        children: line.text || /* @__PURE__ */ jsx(MusicNoteIcon, {})
      },
      line.time || index
    );
  }) });
}
const widths = [40, 55, 70, 80, 90, 100];
function LyricSkeleton() {
  return /* @__PURE__ */ jsx(LyricsWrapper, { animationKey: "skeletons", width: "min-w-[70%]", children: [...new Array(12).keys()].map((key) => /* @__PURE__ */ jsx(
    Skeleton,
    {
      variant: "rect",
      className: "mb-14",
      size: "h-48 w-full",
      style: { maxWidth: `${widths[key % widths.length]}%` }
    },
    key
  )) });
}
function LyricsWrapper({
  children,
  animationKey,
  width = "w-max"
}) {
  return /* @__PURE__ */ jsx(
    m.div,
    {
      ...opacityAnimation,
      className: "flex-col items-center justify-start md:flex",
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: clsx(
            "max-w-full flex-auto text-2xl md:mx-64 md:text-3xl",
            width
          ),
          children
        }
      )
    },
    animationKey
  );
}
function NoLyricsMessage({ title, description }) {
  return /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, children: /* @__PURE__ */ jsx(
    IllustratedMessage,
    {
      image: /* @__PURE__ */ jsx(MediaMicrophoneIcon, { size: "xl" }),
      imageHeight: "h-auto",
      title,
      description
    }
  ) }, "no-lyrics-message");
}
const RouteConfig = [
  {
    path: "track/:trackId/:trackName/embed",
    element: /* @__PURE__ */ jsx(TrackEmbed, {})
  },
  {
    path: "album/:albumId/:artistName/:albumName/embed",
    element: /* @__PURE__ */ jsx(AlbumEmbed, {})
  },
  {
    path: "/",
    element: /* @__PURE__ */ jsx(WebPlayerLayout, {}),
    children: [
      {
        index: true,
        element: /* @__PURE__ */ jsx(HomepageChannelPage, {})
      },
      {
        path: "lyrics",
        element: /* @__PURE__ */ jsx(LyricsPage, {})
      },
      // artists
      {
        path: "artist/:artistId/:artistName",
        element: /* @__PURE__ */ jsx(ArtistPage, {})
      },
      {
        path: "artist/:artistId",
        element: /* @__PURE__ */ jsx(ArtistPage, {})
      },
      // playlists
      {
        path: "playlist/:playlistId/:playlistName",
        element: /* @__PURE__ */ jsx(PlaylistPage, {})
      },
      // albums
      {
        path: "album/:albumId/:artistName/:albumName",
        element: /* @__PURE__ */ jsx(AlbumPage, {})
      },
      // tracks
      {
        path: "track/:trackId/:trackName",
        element: /* @__PURE__ */ jsx(TrackPage, {})
      },
      // tags
      {
        path: "tag/:tagName",
        element: /* @__PURE__ */ jsx(TagMediaPage, {})
      },
      {
        path: "tag/:tagName/tracks",
        element: /* @__PURE__ */ jsx(TagMediaPage, {})
      },
      {
        path: "tag/:tagName/albums",
        element: /* @__PURE__ */ jsx(TagMediaPage, {})
      },
      // user profile
      {
        path: "user/:userId/:userName",
        element: /* @__PURE__ */ jsx(UserProfilePage, {})
      },
      {
        path: "user/:userId/:userName/:tabName",
        element: /* @__PURE__ */ jsx(UserProfilePage, {})
      },
      // radio
      {
        path: "radio/:seedType/:seedId/:seeName",
        element: /* @__PURE__ */ jsx(RadioPage, {})
      },
      // search
      {
        path: "search",
        element: /* @__PURE__ */ jsx(SearchResultsPage, {})
      },
      {
        path: "search/:searchQuery",
        element: /* @__PURE__ */ jsx(SearchResultsPage, {})
      },
      {
        path: "search/:searchQuery/:tabName",
        element: /* @__PURE__ */ jsx(SearchResultsPage, {})
      },
      // library
      {
        path: "/library",
        element: /* @__PURE__ */ jsx(AuthRoute, { children: /* @__PURE__ */ jsx(LibraryPage, {}) })
      },
      {
        path: "/library/songs",
        element: /* @__PURE__ */ jsx(AuthRoute, { children: /* @__PURE__ */ jsx(LibraryTracksPage, {}) })
      },
      {
        path: "/library/playlists",
        element: /* @__PURE__ */ jsx(AuthRoute, { children: /* @__PURE__ */ jsx(LibraryPlaylistsPage, {}) })
      },
      {
        path: "/library/albums",
        element: /* @__PURE__ */ jsx(AuthRoute, { children: /* @__PURE__ */ jsx(LibraryAlbumsPage, {}) })
      },
      {
        path: "/library/artists",
        element: /* @__PURE__ */ jsx(AuthRoute, { children: /* @__PURE__ */ jsx(LibraryArtistsPage, {}) })
      },
      {
        path: "/library/history",
        element: /* @__PURE__ */ jsx(AuthRoute, { children: /* @__PURE__ */ jsx(LibraryHistoryPage, {}) })
      },
      // Channels
      {
        path: ":slugOrId",
        element: /* @__PURE__ */ jsx(ChannelPage, {})
      },
      {
        path: "channel/:slugOrId",
        element: /* @__PURE__ */ jsx(ChannelPage, {})
      },
      {
        path: ":slugOrId/:restriction",
        element: /* @__PURE__ */ jsx(ChannelPage, {})
      },
      {
        path: "channel/:slugOrId/:restriction",
        element: /* @__PURE__ */ jsx(ChannelPage, {})
      },
      {
        path: "*",
        element: /* @__PURE__ */ jsx(NotFoundPage, {})
      }
    ]
  }
];
function WebPlayerRoutes() {
  return useRoutes(RouteConfig);
}
const webPlayerRoutes = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: WebPlayerRoutes
}, Symbol.toStringTag, { value: "Module" }));
export {
  useHtmlMediaEvents as a,
  useHtmlMediaApi as b,
  useHtmlMediaInternalState as u,
  webPlayerRoutes as w
};
//# sourceMappingURL=web-player-routes-2e14812d.mjs.map
