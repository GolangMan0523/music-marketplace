import {useInfiniteData} from '@common/ui/infinite-scroll/use-infinite-data';
import {Track} from '@app/web-player/tracks/track';
import {FullPageLoader} from '@common/ui/progress/full-page-loader';
import {IllustratedMessage} from '@common/ui/images/illustrated-message';
import {AudiotrackIcon} from '@common/icons/material/Audiotrack';
import {Trans} from '@common/i18n/trans';
import React, {useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Album} from '@app/web-player/albums/album';
import {AlbumIcon} from '@common/icons/material/Album';
import {Tabs} from '@common/ui/tabs/tabs';
import {TabList} from '@common/ui/tabs/tab-list';
import {Tab} from '@common/ui/tabs/tab';
import {TabPanel, TabPanels} from '@common/ui/tabs/tab-panels';
import {TrackList} from '@app/web-player/tracks/track-list/track-list';
import {AlbumList} from '@app/web-player/albums/album-list/album-list';

const tagTabNames = {
  tracks: 0,
  albums: 1,
};

export function TagMediaPage() {
  const params = useParams();
  const tagName = params.tagName!;
  const tabName = params['*']?.split('/').pop() || tagTabNames.tracks;
  const [selectedTab, setSelectedTab] = useState(
    tagTabNames[tabName as keyof typeof tagTabNames] || 0,
  );

  return (
    <div>
      <h1 className="text-3xl mb-40">
        {tabName === 'albums' ? (
          <Trans
            message="Most popular albums for #:tag"
            values={{tag: tagName}}
          />
        ) : (
          <Trans
            message="Most popular tracks for #:tag"
            values={{tag: tagName}}
          />
        )}
      </h1>
      <Tabs selectedTab={selectedTab} onTabChange={setSelectedTab}>
        <TabList>
          <Tab elementType={Link} to={`/tag/${tagName}`}>
            <Trans message="Tracks" />
          </Tab>
          <Tab elementType={Link} to={`/tag/${tagName}/albums`}>
            <Trans message="Albums" />
          </Tab>
        </TabList>
        <TabPanels className="pt-24">
          <TabPanel>
            <TracksPanel tagName={tagName!} />
          </TabPanel>
          <TabPanel>
            <AlbumsPanel tagName={tagName!} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

interface TracksPanelProps {
  tagName: string;
}
function AlbumsPanel({tagName}: TracksPanelProps) {
  const query = useInfiniteData<Album>({
    queryKey: ['albums', 'tags', tagName],
    endpoint: `tags/${tagName}/albums`,
  });

  if (query.isLoading) {
    return <FullPageLoader className="min-h-100" screen={false} />;
  }

  if (!query.items.length) {
    return (
      <IllustratedMessage
        imageHeight="h-auto"
        imageMargin="mb-14"
        image={<AlbumIcon size="lg" className="text-muted" />}
        title={<Trans message="No albums yet" />}
        description={
          <Trans message="This tag is not attached to any albums yet, check back later." />
        }
      />
    );
  }

  return <AlbumList query={query} />;
}

function TracksPanel({tagName}: TracksPanelProps) {
  const query = useInfiniteData<Track>({
    queryKey: ['tracks', 'tags', tagName],
    endpoint: `tags/${tagName}/tracks`,
  });

  if (query.isLoading) {
    return <FullPageLoader className="min-h-100" screen={false} />;
  }

  if (!query.items.length) {
    return (
      <IllustratedMessage
        imageHeight="h-auto"
        imageMargin="mb-14"
        image={<AudiotrackIcon size="lg" className="text-muted" />}
        title={<Trans message="No tracks yet" />}
        description={
          <Trans message="This tag is not attached to any tracks yet, check back later." />
        }
      />
    );
  }

  return <TrackList query={query} />;
}
