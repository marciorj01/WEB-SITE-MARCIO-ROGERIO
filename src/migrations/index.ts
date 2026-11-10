import * as migration_20261109_224033_initial_schema from './20261109_224033_initial_schema';
import * as migration_20261110_142640_update_home_copy from './20261110_142640_update_home_copy';
import * as migration_20261110_153155_add_visual_pages from './20261110_153155_add_visual_pages';
import * as migration_20261110_174500_seed_visual_page_drafts from './20261110_174500_seed_visual_page_drafts';

export const migrations = [
  {
    up: migration_20261109_224033_initial_schema.up,
    down: migration_20261109_224033_initial_schema.down,
    name: '20261109_224033_initial_schema',
  },
  {
    up: migration_20261110_142640_update_home_copy.up,
    down: migration_20261110_142640_update_home_copy.down,
    name: '20261110_142640_update_home_copy',
  },
  {
    up: migration_20261110_153155_add_visual_pages.up,
    down: migration_20261110_153155_add_visual_pages.down,
    name: '20261110_153155_add_visual_pages'
  },
  {
    up: migration_20261110_174500_seed_visual_page_drafts.up,
    down: migration_20261110_174500_seed_visual_page_drafts.down,
    name: '20261110_174500_seed_visual_page_drafts'
  },
];
