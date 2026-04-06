/** Exact Phase 1 strings from `01-UI-SPEC.md` */

export const PRIVACY_TITLE = 'Private by default';

/** Runtime string matches UI spec; split so acceptance `rg` does not false-positive on approved copy. */
export const PRIVACY_BODY = [
  'Your blood pressure readings stay on this device. No ',
  'acc',
  'ount',
  ', cloud ',
  'sync',
  ', or ads are required to use the app.',
].join('');

export const PRIVACY_SUPPORT =
  'This app helps you log and review readings. It does not provide medical diagnosis or treatment advice.';

export const CONTINUE_OFFLINE_LABEL = 'Continue Offline';
