import { OrganizationRole } from '@/types/models';

export const EARLIEST_TERM = 'Fall 2020';
export const LOGO_URL = '/logo.svg';
export const DARK_MODE_LOGO_URL = '/logo_dark.svg';
export const DEFAULT_END_TERM = 'Spring 2049';
export const MONGODB_URI = process.env.MONGODB_URI;

export const tables = <const>{
  members: {
    defaultSort: 'name',
    defaultOrder: 'asc',
    defaultLimit: 10,
  },
};

export type Route<TAppBarContentImport> = {
  path: string;
  accessLevel?: OrganizationRole;
  appbarContent?: TAppBarContentImport;
};
