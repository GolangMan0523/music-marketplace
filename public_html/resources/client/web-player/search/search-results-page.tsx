import {
  SearchResponse,
  useSearchResults,
} from '@app/web-player/search/requests/use-search-results';
import {Link, useParams} from 'react-router-dom';
import {PageStatus} from '@common/http/page-status';
import React, {
  Fragment,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {Tabs} from '@common/ui/tabs/tabs';
import {TabList} from '@common/ui/tabs/tab-list';
import {Tab} from '@common/ui/tabs/tab';
import {Trans} from '@common/i18n/trans';
import {TabPanel, TabPanels} from '@common/ui/tabs/tab-panels';
import {Track, TRACK_MODEL} from '@app/web-player/tracks/track';
import {TrackTable} from '@app/web-player/tracks/track-table/track-table';
import {KeyboardArrowRightIcon} from '@common/icons/material/KeyboardArrowRight';
import {ContentGrid} from '@app/web-player/playable-item/content-grid';
import {ArtistGridItem} from '@app/web-player/artists/artist-grid-item';
import {AlbumGridItem} from '@app/web-player/albums/album-grid-item';
import {PlaylistGridItem} from '@app/web-player/playlists/playlist-grid-item';
import {UserGridItem} from '@app/web-player/users/user-grid-item';
import {Artist, ARTIST_MODEL} from '@app/web-player/artists/artist';
import {Album, ALBUM_MODEL} from '@app/web-player/albums/album';
import {Playlist, PLAYLIST_MODEL} from '@app/web-player/playlists/playlist';
import {User, USER_MODEL} from '@common/auth/user';
import {IllustratedMessage} from '@common/ui/images/illustrated-message';
import {SearchIcon} from '@common/icons/material/Search';
import {useSettings} from '@common/core/settings/use-settings';
import {UseQueryResult} from '@tanstack/react-query';
import {TextField} from '@common/ui/forms/input-field/text-field/text-field';
import {useTrans} from '@common/i18n/use-trans';
import {message} from '@common/i18n/message';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {useIsMobileMediaQuery} from '@common/utils/hooks/is-mobile-media-query';
import {SimplePaginationResponse} from '@common/http/backend-response/pagination-response';
import {InfiniteScrollSentinel} from '@common/ui/infinite-scroll/infinite-scroll-sentinel';
import {useInfiniteSearchResults} from '@app/web-player/search/requests/use-infinite-search-results';
import {getScrollParent} from '@react-aria/utils';

export function SearchResultsPage() {
  const {searchQuery} = useParams();
  const query = useSearchResults({
    loader: 'searchPage',
    query: searchQuery,
  });

  return (
    <Fragment>
      <MobileSearchBar />
      <PageContent query={query} />
    </Fragment>
  );
}

function MobileSearchBar() {
  const {searchQuery = ''} = useParams();
  const navigate = useNavigate();
  const {trans} = useTrans();
  const isMobile = useIsMobileMediaQuery();

  if (!isMobile) {
    return null;
  }

  return (
    <TextField
      defaultValue={searchQuery}
      onChange={e => {
        navigate(`/search/${e.target.value}`, {replace: true});
      }}
      autoFocus
      className="w-full"
      size="lg"
      placeholder={trans(message('Search...'))}
    />
  );
}

interface PageContentProps {
  query: UseQueryResult<SearchResponse>;
}
function PageContent({query}: PageContentProps) {
  const {branding} = useSettings();

  if (query.data) {
    return <SearchResults results={query.data?.results} />;
  }

  if (query.fetchStatus === 'idle') {
    return (
      <IllustratedMessage
        className="mt-40"
        image={<SearchIcon size="xl" />}
        imageHeight="h-auto"
        imageMargin="mb-12"
        title={
          <Trans
            message="Search :siteName"
            values={{siteName: branding.site_name}}
          />
        }
        description={
          <Trans message="Find songs, artists, albums, playlists and more." />
        }
      />
    );
  }

  return (
    <PageStatus
      query={query}
      loaderIsScreen={false}
      loaderClassName="absolute inset-0 m-auto"
    />
  );
}

interface SearchResultsProps {
  results: SearchResponse['results'];
}
function SearchResults({results}: SearchResultsProps) {
  const {tabName = 'all', searchQuery} = useParams();
  const tabNames = useMemo(() => {
    const names = ['tracks', 'artists', 'albums', 'playlists', 'users'].filter(
      tabName =>
        results[tabName as keyof SearchResponse['results']]?.data.length,
    );
    return ['all', ...names];
  }, [results]);

  const tabIndex = tabNames.indexOf(tabName as any);

  const [selectedTab, setSelectedTab] = useState(tabIndex > -1 ? tabIndex : 0);

  // change tab when url changes
  useEffect(() => {
    if (tabIndex !== selectedTab) {
      setSelectedTab(tabIndex);
    }
  }, [tabIndex, selectedTab]);

  const tabLink = (tabName?: string) => {
    let base = `/search/${searchQuery}`;
    if (tabName) {
      base += `/${tabName}`;
    }
    return base;
  };

  const haveResults = Object.entries(results).some(([, r]) => r?.data.length);

  if (!haveResults) {
    return (
      <IllustratedMessage
        className="mt-40"
        image={<SearchIcon size="xl" />}
        imageHeight="h-auto"
        title={
          <Trans
            message="Not results for “:query“"
            values={{query: searchQuery}}
          />
        }
        description={<Trans message="Please try a different search query" />}
      />
    );
  }

  return (
    <Tabs selectedTab={selectedTab} onTabChange={setSelectedTab}>
      <TabList>
        <Tab elementType={Link} to={tabLink()}>
          <Trans message="Top results" />
        </Tab>
        {results.tracks?.data.length ? (
          <Tab elementType={Link} to={tabLink('tracks')}>
            <Trans message="Tracks" />
          </Tab>
        ) : null}
        {results.artists?.data.length ? (
          <Tab elementType={Link} to={tabLink('artists')}>
            <Trans message="Artists" />
          </Tab>
        ) : null}
        {results.albums?.data.length ? (
          <Tab elementType={Link} to={tabLink('albums')}>
            <Trans message="Albums" />
          </Tab>
        ) : null}
        {results.playlists?.data.length ? (
          <Tab elementType={Link} to={tabLink('playlists')}>
            <Trans message="Playlists" />
          </Tab>
        ) : null}
        {results.users?.data.length ? (
          <Tab elementType={Link} to={tabLink('users')}>
            <Trans message="Profiles" />
          </Tab>
        ) : null}
      </TabList>
      <TabPanels className="pt-8">
        <TabPanel>
          <TopResultsPanel results={results} />
        </TabPanel>
        {results.tracks?.data.length ? (
          <TabPanel>
            <PaginatedTrackResults data={results.tracks!} />
          </TabPanel>
        ) : null}
        {results.artists?.data.length ? (
          <TabPanel>
            <PaginatedArtistResults data={results.artists!} />
          </TabPanel>
        ) : null}
        {results.albums?.data.length ? (
          <TabPanel>
            <PaginatedAlbumResults data={results.albums!} />
          </TabPanel>
        ) : null}
        {results.playlists?.data.length ? (
          <TabPanel>
            <PaginatedPlaylistResults data={results.playlists!} />
          </TabPanel>
        ) : null}
        {results.users?.data.length ? (
          <TabPanel>
            <PaginatedProfileResults data={results.users!} />
          </TabPanel>
        ) : null}
      </TabPanels>
    </Tabs>
  );
}

function TopResultsPanel({
  results: {artists, albums, tracks, playlists, users},
}: SearchResultsProps) {
  return (
    <Fragment>
      {tracks?.data.length ? (
        <TrackResults data={tracks.data.slice(0, 5)} showMore />
      ) : null}
      {artists?.data.length ? (
        <ArtistResults data={artists.data.slice(0, 5)} showMore />
      ) : null}
      {albums?.data.length ? (
        <AlbumResults data={albums.data.slice(0, 5)} showMore />
      ) : null}
      {playlists?.data.length ? (
        <PlaylistResults data={playlists.data.slice(0, 5)} showMore />
      ) : null}
      {users?.data.length ? (
        <ProfileResults data={users.data.slice(0, 5)} showMore />
      ) : null}
    </Fragment>
  );
}

interface ResultPanelProps<T> {
  data: T[];
  showMore?: boolean;
  children?: ReactNode;
}

interface PaginatedResultPanelProps<T> {
  data: SimplePaginationResponse<T>;
  showMore?: boolean;
}

function TrackResults({data, showMore, children}: ResultPanelProps<Track>) {
  return (
    <div className="py-24">
      <PanelTitle to={showMore ? 'tracks' : undefined}>
        <Trans message="Tracks" />
      </PanelTitle>
      <TrackTable tracks={data} />
      {children}
    </div>
  );
}

function PaginatedTrackResults({
  data,
  showMore,
}: PaginatedResultPanelProps<Track>) {
  const query = useInfiniteSearchResults<Track>(TRACK_MODEL, data);
  return (
    <TrackResults data={query.items} showMore={showMore}>
      <InfiniteScrollSentinel query={query} />
    </TrackResults>
  );
}

function PaginatedArtistResults({
  data,
  showMore,
}: PaginatedResultPanelProps<Artist>) {
  const query = useInfiniteSearchResults<Artist>(ARTIST_MODEL, data);
  return (
    <ArtistResults data={query.items} showMore={showMore}>
      <InfiniteScrollSentinel query={query} />
    </ArtistResults>
  );
}

function ArtistResults({data, showMore, children}: ResultPanelProps<Artist>) {
  return (
    <div className="py-24">
      <PanelTitle to={showMore ? 'artists' : undefined}>
        <Trans message="Artists" />
      </PanelTitle>
      <ContentGrid>
        {data.map(artist => (
          <ArtistGridItem key={artist.id} artist={artist} />
        ))}
      </ContentGrid>
      {children}
    </div>
  );
}

function AlbumResults({data, showMore, children}: ResultPanelProps<Album>) {
  return (
    <div className="py-24">
      <PanelTitle to={showMore ? 'albums' : undefined}>
        <Trans message="Albums" />
      </PanelTitle>
      <ContentGrid>
        {data.map(album => (
          <AlbumGridItem key={album.id} album={album} />
        ))}
      </ContentGrid>
      {children}
    </div>
  );
}

function PaginatedAlbumResults({
  data,
  showMore,
}: PaginatedResultPanelProps<Album>) {
  const query = useInfiniteSearchResults<Album>(ALBUM_MODEL, data);
  return (
    <AlbumResults data={query.items} showMore={showMore}>
      <InfiniteScrollSentinel query={query} />
    </AlbumResults>
  );
}

function PlaylistResults({
  data,
  showMore,
  children,
}: ResultPanelProps<Playlist>) {
  return (
    <div className="py-24">
      <PanelTitle to={showMore ? 'playlists' : undefined}>
        <Trans message="Playlists" />
      </PanelTitle>
      <ContentGrid>
        {data.map(playlist => (
          <PlaylistGridItem key={playlist.id} playlist={playlist} />
        ))}
      </ContentGrid>
      {children}
    </div>
  );
}

function PaginatedPlaylistResults({
  data,
  showMore,
}: PaginatedResultPanelProps<Playlist>) {
  const query = useInfiniteSearchResults<Playlist>(PLAYLIST_MODEL, data);
  return (
    <PlaylistResults data={query.items} showMore={showMore}>
      <InfiniteScrollSentinel query={query} />
    </PlaylistResults>
  );
}

function ProfileResults({data, showMore, children}: ResultPanelProps<User>) {
  return (
    <div className="py-24">
      <PanelTitle to={showMore ? 'users' : undefined}>
        <Trans message="Profiles" />
      </PanelTitle>
      <ContentGrid>
        {data.map(user => (
          <UserGridItem key={user.id} user={user} />
        ))}
      </ContentGrid>
      {children}
    </div>
  );
}

function PaginatedProfileResults({
  data,
  showMore,
}: PaginatedResultPanelProps<User>) {
  const query = useInfiniteSearchResults<User>(USER_MODEL, data);
  return (
    <ProfileResults data={query.items} showMore={showMore}>
      <InfiniteScrollSentinel query={query} />
    </ProfileResults>
  );
}

interface PanelTitleProps {
  children: ReactNode;
  to?: string;
}
function PanelTitle({children, to}: PanelTitleProps) {
  const ref = useRef<HTMLHeadingElement>(null!);
  return (
    <h2 className="mb-24 w-max text-2xl font-medium" ref={ref}>
      {to ? (
        <Link
          to={to}
          className="flex items-center gap-2 hover:text-primary"
          onClick={() => {
            const scrollParent = getScrollParent(ref.current);
            if (scrollParent) {
              scrollParent.scrollTo({top: 0});
            }
          }}
        >
          {children}
          <KeyboardArrowRightIcon className="mt-4" />
        </Link>
      ) : (
        children
      )}
    </h2>
  );
}
