import {useSettings} from '@common/core/settings/use-settings';

export function useShouldShowRadioButton(): boolean {
  const {player, artist_provider} = useSettings();
  return !player?.hide_radio_button && artist_provider === 'spotify';
}
