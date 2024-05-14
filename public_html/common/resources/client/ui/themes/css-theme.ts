import {FontConfig} from '@common/http/value-lists';

export interface CssTheme {
  id: number | string;
  name: string;
  is_dark?: boolean;
  default_dark?: boolean;
  default_light?: boolean;
  values: CssThemeColors;
  font?: FontConfig;
  created_at?: string;
  updated_at?: string;
}

export interface CssThemeColors {
  [key: string]: string;
}
