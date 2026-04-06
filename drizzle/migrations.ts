// Expo: migration SQL is imported from .ts strings — see *.inline.ts (Metro cannot bundle raw .sql).
// https://orm.drizzle.team/docs/get-started/expo-new

import journal from './meta/_journal.json';
import m0000 from './0000_public_black_bolt.inline';

export default {
  journal,
  migrations: {
    m0000,
  },
};
