import {Artist} from '@app/web-player/artists/artist';
import {useSearchParams} from 'react-router-dom';
import {useSettings} from '@common/core/settings/use-settings';
import {useMemo} from 'react';
import {artistPageTabs} from '@app/web-player/artists/artist-page-tabs';

export function useArtistPageTabs(artist: Artist) {
  const [searchParams] = useSearchParams();
  const {artistPage} = useSettings();

  return useMemo(() => {
    const haveSimilar = artist.similar?.length;
    const haveBio =
      artist.profile_images?.length || artist.profile?.description;
    const activeTabs = artistPage?.tabs?.filter(tab => {
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
    const selectedTabId =
      artistPageTabs[searchParams.get('tab') as keyof typeof artistPageTabs];
    const i = activeTabs?.findIndex(t => t.id === selectedTabId);
    const selectedIndex = i > -1 ? i : 0;
    return {
      selectedIndex,
      activeTabs,
    };
  }, [artist, artistPage.tabs, searchParams]);
}
