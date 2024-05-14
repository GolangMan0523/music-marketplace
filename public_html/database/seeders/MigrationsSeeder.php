<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MigrationsSeeder extends Seeder
{
    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        DB::table('migrations')->delete();
        DB::table('migrations')->insert([
            0 => array(
                'id' => 1,
                'migration' => '2014_10_12_000000_create_users_table',
                'batch' => 1,
            ),
            1 => array(
                'id' => 2,
                'migration' => '2014_10_12_100000_create_password_resets_table',
                'batch' => 1,
            ),
            2 => array(
                'id' => 3,
                'migration' => '2015_04_127_156842_create_social_profiles_table',
                'batch' => 1,
            ),
            3 => array(
                'id' => 4,
                'migration' => '2015_04_127_156842_create_users_oauth_table',
                'batch' => 1,
            ),
            4 => array(
                'id' => 5,
                'migration' => '2015_05_29_131549_create_settings_table',
                'batch' => 1,
            ),
            5 => array(
                'id' => 6,
                'migration' => '2015_09_04_155015_create_artists_table',
                'batch' => 1,
            ),
            6 => array(
                'id' => 7,
                'migration' => '2015_09_06_161342_create_albums_table',
                'batch' => 1,
            ),
            7 => array(
                'id' => 8,
                'migration' => '2015_09_06_161348_create_tracks_table',
                'batch' => 1,
            ),
            8 => array(
                'id' => 9,
                'migration' => '2015_09_11_145318_create_similar_artists_table',
                'batch' => 1,
            ),
            9 => array(
                'id' => 10,
                'migration' => '2015_09_17_135717_create_track_user_table',
                'batch' => 1,
            ),
            10 => array(
                'id' => 11,
                'migration' => '2015_09_26_124652_create_playlists_table',
                'batch' => 1,
            ),
            11 => array(
                'id' => 12,
                'migration' => '2015_09_26_131215_create_playlist_track_table',
                'batch' => 1,
            ),
            12 => array(
                'id' => 13,
                'migration' => '2015_09_26_135719_create_playlist_user_table',
                'batch' => 1,
            ),
            13 => array(
                'id' => 14,
                'migration' => '2015_10_16_135253_create_genres_table',
                'batch' => 1,
            ),
            14 => array(
                'id' => 15,
                'migration' => '2015_10_16_135754_create_genre_artist',
                'batch' => 1,
            ),
            15 => array(
                'id' => 16,
                'migration' => '2015_10_23_164355_create_follows_table',
                'batch' => 1,
            ),
            16 => array(
                'id' => 17,
                'migration' => '2015_11_18_134303_add_temp_id_to_albums',
                'batch' => 1,
            ),
            17 => array(
                'id' => 18,
                'migration' => '2015_11_18_134303_add_temp_id_to_tracks',
                'batch' => 1,
            ),
            18 => array(
                'id' => 19,
                'migration' => '2015_11_19_134203_change_fully_scraped_default',
                'batch' => 1,
            ),
            19 => array(
                'id' => 20,
                'migration' => '2016_03_03_143235_add_position_to_playlist_track_table',
                'batch' => 1,
            ),
            20 => array(
                'id' => 21,
                'migration' => '2016_03_14_143858_add_url_to_tracks_table',
                'batch' => 1,
            ),
            21 => array(
                'id' => 22,
                'migration' => '2016_03_24_148503_add_fully_scraped_index_to_albums_table',
                'batch' => 1,
            ),
            22 => array(
                'id' => 23,
                'migration' => '2016_03_24_148503_add_fully_scraped_index_to_artists_table',
                'batch' => 1,
            ),
            23 => array(
                'id' => 24,
                'migration' => '2016_03_24_148503_add_public_index_to_playlists_table',
                'batch' => 1,
            ),
            24 => array(
                'id' => 25,
                'migration' => '2016_03_28_150334_add_image_and_description_to_playlists_table',
                'batch' => 1,
            ),
            25 => array(
                'id' => 26,
                'migration' => '2016_05_02_150429_change_artists_fully_scraped_default',
                'batch' => 1,
            ),
            26 => array(
                'id' => 27,
                'migration' => '2016_05_12_190852_create_tags_table',
                'batch' => 1,
            ),
            27 => array(
                'id' => 28,
                'migration' => '2016_05_12_190958_create_taggables_table',
                'batch' => 1,
            ),
            28 => array(
                'id' => 29,
                'migration' => '2016_05_26_170044_create_uploads_table',
                'batch' => 1,
            ),
            29 => array(
                'id' => 30,
                'migration' => '2016_05_27_143158_create_uploadables_table',
                'batch' => 1,
            ),
            30 => array(
                'id' => 31,
                'migration' => '2016_07_14_153703_create_groups_table',
                'batch' => 1,
            ),
            31 => array(
                'id' => 32,
                'migration' => '2016_07_14_153921_create_user_group_table',
                'batch' => 1,
            ),
            32 => array(
                'id' => 33,
                'migration' => '2017_07_02_120142_create_pages_table',
                'batch' => 1,
            ),
            33 => array(
                'id' => 34,
                'migration' => '2017_07_11_122825_create_localizations_table',
                'batch' => 1,
            ),
            34 => array(
                'id' => 35,
                'migration' => '2017_08_26_131330_add_private_field_to_settings_table',
                'batch' => 1,
            ),
            35 => array(
                'id' => 36,
                'migration' => '2017_08_26_155115_add_timestamps_to_artists_table',
                'batch' => 1,
            ),
            36 => array(
                'id' => 37,
                'migration' => '2017_09_12_134214_set_playlist_user_owner_column_default_to_zero',
                'batch' => 1,
            ),
            37 => array(
                'id' => 38,
                'migration' => '2017_09_16_155557_create_lyrics_table',
                'batch' => 1,
            ),
            38 => array(
                'id' => 39,
                'migration' => '2017_09_17_144728_add_columns_to_users_table',
                'batch' => 1,
            ),
            39 => array(
                'id' => 40,
                'migration' => '2017_09_17_152854_make_password_column_nullable',
                'batch' => 1,
            ),
            40 => array(
                'id' => 41,
                'migration' => '2017_09_30_152855_make_settings_value_column_nullable',
                'batch' => 1,
            ),
            41 => array(
                'id' => 42,
                'migration' => '2017_10_01_152856_add_views_column_to_artists_table',
                'batch' => 1,
            ),
            42 => array(
                'id' => 43,
                'migration' => '2017_10_01_152857_add_views_column_to_albums_table',
                'batch' => 1,
            ),
            43 => array(
                'id' => 44,
                'migration' => '2017_10_01_152858_add_plays_column_to_tracks_table',
                'batch' => 1,
            ),
            44 => array(
                'id' => 45,
                'migration' => '2017_10_01_152859_add_views_column_to_playlists_table',
                'batch' => 1,
            ),
            45 => array(
                'id' => 46,
                'migration' => '2017_10_01_152897_add_public_column_to_uploads_table',
                'batch' => 1,
            ),
            46 => array(
                'id' => 47,
                'migration' => '2017_12_04_132911_add_avatar_column_to_users_table',
                'batch' => 1,
            ),
            47 => array(
                'id' => 48,
                'migration' => '2018_01_10_140732_create_subscriptions_table',
                'batch' => 1,
            ),
            48 => array(
                'id' => 49,
                'migration' => '2018_01_10_140746_add_billing_to_users_table',
                'batch' => 1,
            ),
            49 => array(
                'id' => 50,
                'migration' => '2018_01_10_161706_create_billing_plans_table',
                'batch' => 1,
            ),
            50 => array(
                'id' => 51,
                'migration' => '2018_07_24_113757_add_available_space_to_billing_plans_table',
                'batch' => 1,
            ),
            51 => array(
                'id' => 52,
                'migration' => '2018_07_24_124254_add_available_space_to_users_table',
                'batch' => 1,
            ),
            52 => array(
                'id' => 53,
                'migration' => '2018_07_26_142339_rename_groups_to_roles',
                'batch' => 1,
            ),
            53 => array(
                'id' => 54,
                'migration' => '2018_07_26_142842_rename_user_role_table_columns_to_roles',
                'batch' => 1,
            ),
            54 => array(
                'id' => 55,
                'migration' => '2018_08_07_124200_rename_uploads_to_file_entries',
                'batch' => 1,
            ),
            55 => array(
                'id' => 56,
                'migration' => '2018_08_07_124327_refactor_file_entries_columns',
                'batch' => 1,
            ),
            56 => array(
                'id' => 57,
                'migration' => '2018_08_07_130653_add_folder_path_column_to_file_entries_table',
                'batch' => 1,
            ),
            57 => array(
                'id' => 58,
                'migration' => '2018_08_07_140440_migrate_file_entry_users_to_many_to_many',
                'batch' => 1,
            ),
            58 => array(
                'id' => 59,
                'migration' => '2018_08_15_132225_move_uploads_into_subfolders',
                'batch' => 1,
            ),
            59 => array(
                'id' => 60,
                'migration' => '2018_08_31_104145_rename_uploadables_table',
                'batch' => 1,
            ),
            60 => array(
                'id' => 61,
                'migration' => '2018_08_31_104325_rename_file_entry_models_table_columns',
                'batch' => 1,
            ),
            61 => array(
                'id' => 62,
                'migration' => '2018_10_01_090754_add_image_and_popularity_columns_to_genres_table',
                'batch' => 1,
            ),
            62 => array(
                'id' => 63,
                'migration' => '2018_11_26_171703_add_type_and_title_columns_to_pages_table',
                'batch' => 1,
            ),
            63 => array(
                'id' => 64,
                'migration' => '2018_12_01_144233_change_unique_index_on_tags_table',
                'batch' => 1,
            ),
            64 => array(
                'id' => 65,
                'migration' => '2019_02_16_150049_delete_old_seo_settings',
                'batch' => 1,
            ),
            65 => array(
                'id' => 66,
                'migration' => '2019_02_24_141457_create_jobs_table',
                'batch' => 1,
            ),
            66 => array(
                'id' => 67,
                'migration' => '2019_03_11_162627_add_preview_token_to_file_entries_table',
                'batch' => 1,
            ),
            67 => array(
                'id' => 68,
                'migration' => '2019_03_12_160803_add_thumbnail_column_to_file_entries_table',
                'batch' => 1,
            ),
            68 => array(
                'id' => 69,
                'migration' => '2019_03_16_161836_add_paypal_id_column_to_billing_plans_table',
                'batch' => 1,
            ),
            69 => array(
                'id' => 70,
                'migration' => '2019_05_14_120930_index_description_column_in_file_entries_table',
                'batch' => 1,
            ),
            70 => array(
                'id' => 71,
                'migration' => '2019_06_08_120504_create_custom_domains_table',
                'batch' => 1,
            ),
            71 => array(
                'id' => 72,
                'migration' => '2019_06_13_140318_add_user_id_column_to_pages_table',
                'batch' => 1,
            ),
            72 => array(
                'id' => 73,
                'migration' => '2019_06_15_114320_rename_pages_table_to_custom_pages',
                'batch' => 1,
            ),
            73 => array(
                'id' => 74,
                'migration' => '2019_06_18_133933_create_permissions_table',
                'batch' => 1,
            ),
            74 => array(
                'id' => 75,
                'migration' => '2019_06_18_134203_create_permissionables_table',
                'batch' => 1,
            ),
            75 => array(
                'id' => 76,
                'migration' => '2019_06_18_135822_rename_permissions_columns',
                'batch' => 1,
            ),
            76 => array(
                'id' => 77,
                'migration' => '2019_07_08_122001_create_css_themes_table',
                'batch' => 1,
            ),
            77 => array(
                'id' => 78,
                'migration' => '2019_07_20_141752_create_invoices_table',
                'batch' => 1,
            ),
            78 => array(
                'id' => 79,
                'migration' => '2019_08_19_121112_add_global_column_to_custom_domains_table',
                'batch' => 1,
            ),
            79 => array(
                'id' => 80,
                'migration' => '2019_09_13_141123_change_plan_amount_to_float',
                'batch' => 1,
            ),
            80 => array(
                'id' => 81,
                'migration' => '2019_09_17_134818_rename_track_artists_legacy_column',
                'batch' => 1,
            ),
            81 => array(
                'id' => 82,
                'migration' => '2019_09_18_131640_create_artist_track_table',
                'batch' => 1,
            ),
            82 => array(
                'id' => 83,
                'migration' => '2019_09_18_131837_migrate_inline_artists_to_pivot',
                'batch' => 1,
            ),
            83 => array(
                'id' => 84,
                'migration' => '2019_09_19_123359_add_spotify_id_to_tracks_table',
                'batch' => 1,
            ),
            84 => array(
                'id' => 85,
                'migration' => '2019_09_19_161230_add_spotify_id_to_artists_table',
                'batch' => 1,
            ),
            85 => array(
                'id' => 86,
                'migration' => '2019_09_19_161305_add_spotify_id_to_albums_table',
                'batch' => 1,
            ),
            86 => array(
                'id' => 87,
                'migration' => '2019_09_21_134409_add_timestamps_to_artists_albums_tracks',
                'batch' => 1,
            ),
            87 => array(
                'id' => 88,
                'migration' => '2019_09_22_131629_add_user_id_columns_to_tracks_table',
                'batch' => 1,
            ),
            88 => array(
                'id' => 89,
                'migration' => '2019_09_22_131758_rename_track_user_table_to_liked_tracks',
                'batch' => 1,
            ),
            89 => array(
                'id' => 90,
                'migration' => '2019_09_26_144547_update_albums_to_v2',
                'batch' => 1,
            ),
            90 => array(
                'id' => 91,
                'migration' => '2019_09_30_152608_update_genre_artist_table_to_v2',
                'batch' => 1,
            ),
            91 => array(
                'id' => 92,
                'migration' => '2019_10_02_192908_create_reposts_table',
                'batch' => 1,
            ),
            92 => array(
                'id' => 93,
                'migration' => '2019_10_04_140608_create_user_profiles_table',
                'batch' => 1,
            ),
            93 => array(
                'id' => 94,
                'migration' => '2019_10_04_140907_create_user_links_table',
                'batch' => 1,
            ),
            94 => array(
                'id' => 95,
                'migration' => '2019_10_06_122651_create_channels_table',
                'batch' => 1,
            ),
            95 => array(
                'id' => 96,
                'migration' => '2019_10_06_132717_create_channelables_table',
                'batch' => 1,
            ),
            96 => array(
                'id' => 97,
                'migration' => '2019_10_14_171943_add_index_to_username_column',
                'batch' => 1,
            ),
            97 => array(
                'id' => 98,
                'migration' => '2019_10_15_171019_create_plays_table',
                'batch' => 1,
            ),
            98 => array(
                'id' => 99,
                'migration' => '2019_10_20_143522_create_comments_table',
                'batch' => 1,
            ),
            99 => array(
                'id' => 100,
                'migration' => '2019_10_20_150654_add_columns_to_comments_table',
                'batch' => 1,
            ),
            100 => array(
                'id' => 101,
                'migration' => '2019_10_23_134520_create_notifications_table',
                'batch' => 1,
            ),
            101 => array(
                'id' => 102,
                'migration' => '2019_10_31_154623_artist_bios',
                'batch' => 1,
            ),
            102 => array(
                'id' => 103,
                'migration' => '2019_10_31_154730_create_bio_images_table',
                'batch' => 1,
            ),
            103 => array(
                'id' => 104,
                'migration' => '2019_11_02_151404_move_inline_artist_bios_to_separate_tables',
                'batch' => 1,
            ),
            104 => array(
                'id' => 105,
                'migration' => '2019_11_14_195518_add_name_index_to_artists_table',
                'batch' => 1,
            ),
            105 => array(
                'id' => 106,
                'migration' => '2019_11_15_183635_add_display_name_column_to_genres_table',
                'batch' => 1,
            ),
            106 => array(
                'id' => 107,
                'migration' => '2019_11_16_150409_add_indexes_to_genreables_table',
                'batch' => 1,
            ),
            107 => array(
                'id' => 108,
                'migration' => '2019_11_21_144956_add_resource_id_and_type_to_custom_domains_table',
                'batch' => 1,
            ),
            108 => array(
                'id' => 109,
                'migration' => '2019_12_14_000001_create_personal_access_tokens_table',
                'batch' => 1,
            ),
            109 => array(
                'id' => 110,
                'migration' => '2019_12_14_194512_rename_public_path_column_to_disk_prefix',
                'batch' => 1,
            ),
            110 => array(
                'id' => 111,
                'migration' => '2019_12_24_165237_change_file_size_column_default_value_to_0',
                'batch' => 1,
            ),
            111 => array(
                'id' => 112,
                'migration' => '2019_12_28_190836_update_file_entry_models_table_to_v2',
                'batch' => 1,
            ),
            112 => array(
                'id' => 113,
                'migration' => '2019_12_28_191105_move_user_file_entry_table_records_to_file_entry_models',
                'batch' => 1,
            ),
            113 => array(
                'id' => 114,
                'migration' => '2020_01_26_143733_create_notification_subscriptions_table',
                'batch' => 1,
            ),
            114 => array(
                'id' => 115,
                'migration' => '2020_03_03_140720_add_language_col_to_localizations_table',
                'batch' => 1,
            ),
            115 => array(
                'id' => 116,
                'migration' => '2020_03_03_143142_add_lang_code_to_existing_localizations',
                'batch' => 1,
            ),
            116 => array(
                'id' => 117,
                'migration' => '2020_03_30_150052_index_created_at_in_tracks_table',
                'batch' => 1,
            ),
            117 => array(
                'id' => 118,
                'migration' => '2020_04_09_154139_delete_old_notifications',
                'batch' => 1,
            ),
            118 => array(
                'id' => 119,
                'migration' => '2020_04_14_163347_add_hidden_column_to_plans_table',
                'batch' => 1,
            ),
            119 => array(
                'id' => 120,
                'migration' => '2020_06_27_180040_add_verified_at_column_to_users_table',
                'batch' => 1,
            ),
            120 => array(
                'id' => 121,
                'migration' => '2020_06_27_180253_move_confirmed_column_to_email_verified_at',
                'batch' => 1,
            ),
            121 => array(
                'id' => 122,
                'migration' => '2020_07_15_144024_fix_issues_with_migration_to_laravel_7',
                'batch' => 1,
            ),
            122 => array(
                'id' => 123,
                'migration' => '2020_07_22_165126_create_workspaces_table',
                'batch' => 1,
            ),
            123 => array(
                'id' => 124,
                'migration' => '2020_07_23_145652_create_workspace_invites_table',
                'batch' => 1,
            ),
            124 => array(
                'id' => 125,
                'migration' => '2020_07_23_164502_create_workspace_user_table',
                'batch' => 1,
            ),
            125 => array(
                'id' => 126,
                'migration' => '2020_07_26_165349_add_columns_to_roles_table',
                'batch' => 1,
            ),
            126 => array(
                'id' => 127,
                'migration' => '2020_07_29_141418_add_workspace_id_column_to_workspaceable_models',
                'batch' => 1,
            ),
            127 => array(
                'id' => 128,
                'migration' => '2020_07_30_152330_add_type_column_to_permissions_table',
                'batch' => 1,
            ),
            128 => array(
                'id' => 129,
                'migration' => '2020_08_29_165057_add_hide_nav_column_to_custom_pages_table',
                'batch' => 1,
            ),
            129 => array(
                'id' => 130,
                'migration' => '2021_04_16_184910_add_artist_id_column_to_user_profiles_table',
                'batch' => 1,
            ),
            130 => array(
                'id' => 131,
                'migration' => '2021_04_16_185035_move_artist_bios_to_user_profiles',
                'batch' => 1,
            ),
            131 => array(
                'id' => 132,
                'migration' => '2021_04_17_175627_rename_bio_images_table_to_profile_images',
                'batch' => 1,
            ),
            132 => array(
                'id' => 133,
                'migration' => '2021_04_22_163240_create_backStage_requests_table',
                'batch' => 1,
            ),
            133 => array(
                'id' => 134,
                'migration' => '2021_04_22_172459_add_internal_columm_to_roles_table',
                'batch' => 1,
            ),
            134 => array(
                'id' => 135,
                'migration' => '2021_04_22_174550_add_artists_column_to_roles_table',
                'batch' => 1,
            ),
            135 => array(
                'id' => 136,
                'migration' => '2021_04_24_164138_create_user_artist_table',
                'batch' => 1,
            ),
            136 => array(
                'id' => 137,
                'migration' => '2021_04_25_173110_add_verified_column_to_artists_table',
                'batch' => 1,
            ),
            137 => array(
                'id' => 138,
                'migration' => '2021_04_28_153802_create_artist_album_table',
                'batch' => 1,
            ),
            138 => array(
                'id' => 139,
                'migration' => '2021_04_28_153950_migrate_albums_to_many_to_many_artist_relation',
                'batch' => 1,
            ),
            139 => array(
                'id' => 140,
                'migration' => '2021_05_01_174819_add_collaborative_column_to_playlists_table',
                'batch' => 1,
            ),
            140 => array(
                'id' => 141,
                'migration' => '2021_05_02_172541_add_added_by_column_to_playlist_track_table',
                'batch' => 1,
            ),
            141 => array(
                'id' => 142,
                'migration' => '2021_05_02_174158_add_owner_id_column_to_playlists_table',
                'batch' => 1,
            ),
            142 => array(
                'id' => 143,
                'migration' => '2021_05_02_174256_hydrate_empty_owner_id_column_in_playlist_table',
                'batch' => 1,
            ),
            143 => array(
                'id' => 144,
                'migration' => '2021_05_02_194925_rename_owner_column_to_editor_in_playlist_user_table',
                'batch' => 1,
            ),
            144 => array(
                'id' => 145,
                'migration' => '2021_05_03_173446_add_deleted_column_to_comments_table',
                'batch' => 1,
            ),
            145 => array(
                'id' => 146,
                'migration' => '2021_05_03_174006_hydrate_added_by_column_in_playlist_track_table',
                'batch' => 1,
            ),
            146 => array(
                'id' => 147,
                'migration' => '2021_05_05_195829_add_spotify_id_column_to_playlists_table',
                'batch' => 1,
            ),
            147 => array(
                'id' => 148,
                'migration' => '2021_05_07_165545_add_config_column_to_channels_table',
                'batch' => 1,
            ),
            148 => array(
                'id' => 149,
                'migration' => '2021_05_07_165903_move_channel_settings_into_config_column',
                'batch' => 1,
            ),
            149 => array(
                'id' => 150,
                'migration' => '2021_05_09_180332_rename_user_links_table_to_profile_links',
                'batch' => 1,
            ),
            150 => array(
                'id' => 151,
                'migration' => '2021_05_09_180652_add_columns_to_profile_links_table',
                'batch' => 1,
            ),
            151 => array(
                'id' => 152,
                'migration' => '2021_05_10_162145_migrate_user_artist_type_albums',
                'batch' => 1,
            ),
            152 => array(
                'id' => 153,
                'migration' => '2021_05_10_164700_migrate_user_artist_type_tracks',
                'batch' => 1,
            ),
            153 => array(
                'id' => 154,
                'migration' => '2021_05_12_164940_add_advanced_column_to_permissions_table',
                'batch' => 1,
            ),
            154 => array(
                'id' => 155,
                'migration' => '2021_05_12_170639_replace_album_artist_track_permission_with_music_one',
                'batch' => 1,
            ),
            155 => array(
                'id' => 156,
                'migration' => '2021_05_18_163931_add_plays_column_to_albums_table',
                'batch' => 1,
            ),
            156 => array(
                'id' => 157,
                'migration' => '2021_05_20_190631_create_failed_jobs_table',
                'batch' => 1,
            ),
            157 => array(
                'id' => 158,
                'migration' => '2021_05_22_143750_add_owner_id_column_to_tracks_and_albums_table',
                'batch' => 1,
            ),
            158 => array(
                'id' => 159,
                'migration' => '2021_06_04_143405_add_workspace_id_col_to_custom_domains_table',
                'batch' => 1,
            ),
            159 => array(
                'id' => 160,
                'migration' => '2021_06_04_143406_add_workspace_id_col_to_custom_pages_table',
                'batch' => 1,
            ),
            160 => array(
                'id' => 161,
                'migration' => '2021_06_04_143406_add_workspace_id_col_to_file_entries_table',
                'batch' => 1,
            ),
            161 => array(
                'id' => 162,
                'migration' => '2021_06_05_182202_create_csv_exports_table',
                'batch' => 1,
            ),
            162 => array(
                'id' => 163,
                'migration' => '2021_06_18_161030_rename_gateway_col_in_subscriptions_table',
                'batch' => 1,
            ),
            163 => array(
                'id' => 164,
                'migration' => '2021_06_19_111939_add_owner_id_column_to_file_entries_table',
                'batch' => 1,
            ),
            164 => array(
                'id' => 165,
                'migration' => '2021_06_19_112035_materialize_owner_id_in_file_entries_table',
                'batch' => 1,
            ),
            165 => array(
                'id' => 166,
                'migration' => '2021_07_17_093454_add_created_at_col_to_user_role_table',
                'batch' => 1,
            ),
            166 => array(
                'id' => 167,
                'migration' => '2021_09_30_123758_slugify_tag_name_column',
                'batch' => 1,
            ),
            167 => array(
                'id' => 168,
                'migration' => '2021_10_13_132915_add_token_cols_to_social_profiles_table',
                'batch' => 1,
            ),
            168 => array(
                'id' => 169,
                'migration' => '2022_04_08_122553_change_default_workspace_id_from_null_to_zero',
                'batch' => 1,
            ),
            169 => array(
                'id' => 170,
                'migration' => '2022_04_23_115027_add_id_to_all_menus',
                'batch' => 1,
            ),
            170 => array(
                'id' => 171,
                'migration' => '2022_08_10_200344_add_produce_id_column_to_subscriptions_table',
                'batch' => 1,
            ),
            171 => array(
                'id' => 172,
                'migration' => '2022_08_11_160401_create_prices_table',
                'batch' => 1,
            ),
            172 => array(
                'id' => 173,
                'migration' => '2022_08_11_170041_create_products_table',
                'batch' => 1,
            ),
            173 => array(
                'id' => 174,
                'migration' => '2022_08_11_170117_move_billing_plans_to_products_and_prices_tables',
                'batch' => 1,
            ),
            174 => array(
                'id' => 175,
                'migration' => '2022_08_17_184337_add_card_expires_column_to_users_table',
                'batch' => 1,
            ),
            175 => array(
                'id' => 176,
                'migration' => '2022_08_24_192127_migrate_common_settings_to_v3',
                'batch' => 1,
            ),
            176 => array(
                'id' => 177,
                'migration' => '2022_09_03_164633_add_expires_at_column_to_personal_access_tokens_table',
                'batch' => 1,
            ),
            177 => array(
                'id' => 178,
                'migration' => '2022_09_27_124344_change_available_space_column_to_big_int',
                'batch' => 1,
            ),
            178 => array(
                'id' => 179,
                'migration' => '2022_09_28_121423_migrate_notif_settings_from_array_to_obj',
                'batch' => 1,
            ),
            179 => array(
                'id' => 180,
                'migration' => '2022_11_06_115107_increase_file_name_column_length',
                'batch' => 1,
            ),
            180 => array(
                'id' => 181,
                'migration' => '2023_02_01_172721_add_admin_sorting_indexes',
                'batch' => 1,
            ),
            181 => array(
                'id' => 182,
                'migration' => '2023_03_10_165309_index_created_at_column_in_artists_table',
                'batch' => 1,
            ),
            182 => array(
                'id' => 183,
                'migration' => '2023_03_17_175502_add_user_id_to_tags_table',
                'batch' => 1,
            ),
            183 => array(
                'id' => 184,
                'migration' => '2023_03_17_180355_change_name_index_to_name_user_id_in_tags_table',
                'batch' => 1,
            ),
            184 => array(
                'id' => 185,
                'migration' => '2023_03_27_124108_slugify_genre_name_column',
                'batch' => 1,
            ),
            185 => array(
                'id' => 186,
                'migration' => '2023_04_23_103944_rename_url_field_to_src_in_tracks_table',
                'batch' => 1,
            ),
            186 => array(
                'id' => 187,
                'migration' => '2023_04_23_104050_move_youtube_id_column_to_src',
                'batch' => 1,
            ),
            187 => array(
                'id' => 188,
                'migration' => '2023_05_09_124348_create_bans_table',
                'batch' => 1,
            ),
            188 => array(
                'id' => 189,
                'migration' => '2023_05_09_133514_add_banned_at_column_to_users_table',
                'batch' => 1,
            ),
            189 => array(
                'id' => 190,
                'migration' => '2023_05_11_200001_add_two_factor_columns_to_users_table',
                'batch' => 1,
            ),
            190 => array(
                'id' => 191,
                'migration' => '2023_05_13_132948_active_sessions_table',
                'batch' => 1,
            ),
            191 => array(
                'id' => 192,
                'migration' => '2023_05_16_150805_change_social_profiles_token_length',
                'batch' => 1,
            ),
            192 => array(
                'id' => 193,
                'migration' => '2023_06_10_131615_add_pos_and_neg_votes_to_comments_table',
                'batch' => 1,
            ),
            193 => array(
                'id' => 194,
                'migration' => '2023_06_10_132135_add_comment_ratings_table',
                'batch' => 1,
            ),
            194 => array(
                'id' => 195,
                'migration' => '2023_06_11_124655_create_comment_reports_table',
                'batch' => 1,
            ),
            195 => array(
                'id' => 196,
                'migration' => '2023_08_08_103123_add_timestamp_indexes_to_comments_table',
                'batch' => 1,
            ),
            196 => array(
                'id' => 197,
                'migration' => '2023_08_31_124910_update_model_types_from_namespace_to_string',
                'batch' => 1,
            ),
            197 => array(
                'id' => 198,
                'migration' => '2023_11_04_110555_add_type_column_to_channels_table',
                'batch' => 1,
            ),
            198 => array(
                'id' => 199,
                'migration' => '2023_11_04_125528_add_created_at_column_to_channelables_tables',
                'batch' => 1,
            ),
            199 => array(
                'id' => 200,
                'migration' => '2023_11_04_132126_migrate_channel_config_to_common',
                'batch' => 1,
            ),
            200 => array(
                'id' => 201,
                'migration' => '2023_12_10_124446_upgrade_css_themes_table_to_v3',
                'batch' => 1,
            ),
            201 => array(
                'id' => 202,
                'migration' => '2023_12_18_141540_add_search_indices_to_users_table',
                'batch' => 1,
            ),
            202 => array(
                'id' => 203,
                'migration' => '2023_12_19_122804_add_uuid_column_to_failed_jobs_table',
                'batch' => 1,
            ),
            203 => array(
                'id' => 204,
                'migration' => '2023_12_23_121618_encrypt_secret_settings',
                'batch' => 1,
            ),
            204 => array(
                'id' => 205,
                'migration' => '2024_02_05_103042_change_avatar_column_to_text',
                'batch' => 1,
            ),
            205 => array(
                'id' => 206,
                'migration' => '2024_03_21_140247_add_is_synced_field_to_lyrics_table',
                'batch' => 1,
            ),
            206 => array(
                'id' => 207,
                'migration' => '2024_03_25_134922_add_duration_to_lyrics_table',
                'batch' => 1,
            ),
        ]);
    }
}