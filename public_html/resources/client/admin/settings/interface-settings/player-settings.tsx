import {Trans} from '@common/i18n/trans';
import React, {Fragment} from 'react';
import {SettingsPanel} from '@common/admin/settings/settings-panel';
import {FormSwitch} from '@common/ui/forms/toggle/switch';
import {TabList} from '@common/ui/tabs/tab-list';
import {Tab} from '@common/ui/tabs/tab';
import {TabPanel, TabPanels} from '@common/ui/tabs/tab-panels';
import {Tabs} from '@common/ui/tabs/tabs';
import {ArtistPagePanel} from '@app/admin/settings/interface-settings/artist-page-panel';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {FormSelect} from '@common/ui/forms/select/select';
import {Item} from '@common/ui/forms/listbox/item';
import {useSettings} from '@common/core/settings/use-settings';

export function PlayerSettings() {
  return (
    <SettingsPanel
      title={<Trans message="Player" />}
      description={
        <Trans message="Configure web player interface and functionality." />
      }
    >
      <Tabs isLazy>
        <TabList>
          <Tab>
            <Trans message="General" />
          </Tab>
          <Tab>
            <Trans message="Controls" />
          </Tab>
          <Tab>
            <Trans message="Artist page" />
          </Tab>
        </TabList>
        <TabPanels className="pt-20">
          <TabPanel>
            <GeneralPanel />
          </TabPanel>
          <TabPanel>
            <ControlsPanel />
          </TabPanel>
          <TabPanel>
            <ArtistPagePanel />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </SettingsPanel>
  );
}

function GeneralPanel() {
  const {spotify_is_setup} = useSettings();
  return (
    <Fragment>
      {spotify_is_setup && (
        <FormSelect
          className="mb-24"
          name="client.player.sort_method"
          selectionMode="single"
          label={<Trans message="Content popularity" />}
          description={
            <Trans message="When content is sorted by popularity (eg. In track table), should it be sorted based on how popular that content is on spotify or by number of plays on the site." />
          }
        >
          <Item value="external">
            <Trans message="Spotify popularity" />
          </Item>
          <Item value="local">
            <Trans message="Local plays" />
          </Item>
        </FormSelect>
      )}
      <FormSelect
        className="mb-24"
        name="client.player.seekbar_type"
        selectionMode="single"
        label={<Trans message="Track seekbar type" />}
        description={
          <Trans message="Waveform is generated when uploading audio or video file and will default to 'simple' for auto-imported tracks." />
        }
      >
        <Item value="waveform">
          <Trans message="Waveform" />
        </Item>
        <Item value="line">
          <Trans message="Simple" />
        </Item>
      </FormSelect>
      <FormSwitch
        className="mb-24"
        name="client.player.hide_queue"
        description={
          <Trans message="Whether player queue (right sidebar) should be shown by default. It can still be toggled via queue button, even if this is disabled." />
        }
      >
        <Trans message="Hide queue sidebar" />
      </FormSwitch>
      <FormSwitch
        className="mb-24"
        name="client.player.hide_radio_button"
        description={
          <Trans message="Whether 'Go to radio' buttons should be shown." />
        }
      >
        <Trans message="Hide radio buttons" />
      </FormSwitch>
      <FormSwitch
        className="mb-24"
        name="client.player.enable_repost"
        description={
          <Trans message="Enable reposting functionality for albums and tracks." />
        }
      >
        <Trans message="Enable reposts" />
      </FormSwitch>
      <FormSwitch
        className="mb-24"
        name="client.player.track_comments"
        description={
          <Trans message="Enable commenting functionality for albums and tracks." />
        }
      >
        <Trans message="Enable commenting" />
      </FormSwitch>
      <FormSwitch
        className="mb-24"
        name="client.player.show_upload_btn"
        description={
          <Trans message="Whether upload button should be shown in left sidebar (if user has permissions to upload tracks)." />
        }
      >
        <Trans message="Upload button" />
      </FormSwitch>
      <FormSwitch
        className="mb-24"
        name="client.player.show_become_artist_btn"
        description={
          <Trans message="Whether become artist menu item should be shown (if user is not yet an artist)." />
        }
      >
        <Trans message="Become artist menu item" />
      </FormSwitch>
      <FormSwitch
        name="client.uploads.autoMatch"
        description={
          <Trans message="When uploading audio or video file, this will autofill track and album form with existing album and artist based on file metadata, or create a new album and artist if they do not yet exist." />
        }
      >
        <Trans message="Metadata matching" />
      </FormSwitch>
    </Fragment>
  );
}

function ControlsPanel() {
  return (
    <Fragment>
      <FormTextField
        className="mb-24"
        name="client.player.default_volume"
        label={<Trans message="Default player volume" />}
        type="number"
        min={1}
        max={100}
      />
      <FormSwitch
        className="mb-24"
        name="client.player.hide_lyrics"
        description={
          <Trans message="Whether lyrics button should be shown in player controls." />
        }
      >
        <Trans message="Hide lyrics button" />
      </FormSwitch>
      <FormSwitch
        className="mb-24"
        name="client.player.enable_download"
        description={
          <Trans message="Whether download track button should be shown in player controls. It will only appear if track has an audio or video file uploaded." />
        }
      >
        <Trans message="Download button" />
      </FormSwitch>
      <FormSwitch
        className="mb-24"
        name="client.player.hide_video_button"
        description={
          <Trans message="Whether toggle video button should be shown in player controls." />
        }
      >
        <Trans message="Hide video button" />
      </FormSwitch>
      <FormSwitch
        className="mb-24"
        name="client.player.hide_video"
        description={
          <Trans message="Should small video in the bottom right corner be hidden by default. Note that this might cause issues with background playback for youtube embed, especially on mobile." />
        }
      >
        <Trans message="Hide video" />
      </FormSwitch>
      <FormSwitch
        name="client.player.mobile.auto_open_overlay"
        description={
          <Trans message="Should fullscreen video overlay be opened automatically on mobile when user starts playback. This will only apply when streaming from youtube." />
        }
      >
        <Trans message="Automatically open overlay on mobile" />
      </FormSwitch>
    </Fragment>
  );
}
