/**
 * Copyright (c) 2025 jmenichole
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { GuidelineSection } from '../types';

export const GUIDELINE_SECTIONS: GuidelineSection[] = [
  {
    title: 'General Requirements',
    items: [
      { id: 'gen-1', text: 'Game is reviewed for functionality, clarity, communication, and technical performance.' },
      { id: 'gen-2', text: 'Submissions include a publicly accessible Google Drive or Dropbox link with high-resolution game assets (characters, symbols, backgrounds, etc.).' },
      { id: 'gen-3', text: 'Approval requests are accompanied by a short blurb describing game theme and mechanics.' },
    ],
  },
  {
    title: 'Key Restrictions',
    items: [
      { id: 'restr-1', text: 'Games are strictly stateless: each bet must be independent of previous outcomes.' },
      { id: 'restr-2', text: 'Games do not include jackpots, gamble features, continuation, or early cashout options.' },
      { id: 'restr-3', text: 'Team names, game titles, and assets comply with intellectual property/copyright law.' },
      { id: 'restr-4', text: 'Games are original designs (no pre-purchased or licensed games from other sites).' },
      { id: 'restr-5', text: 'Game assets do not include material with Stake™ branding or themes.' },
      { id: 'restr-6', text: 'Games are not offensive, explicit, in poor taste, or of insufficient quality.' },
      { id: 'restr-7', text: 'If targeting stake.us, games abide by strict language requirements.' },
    ],
  },
  {
    title: 'Remote Game Server (RGS) Communication',
    items: [
      { id: 'rgs-1', text: 'The game uses the `rgs_url` query parameter to determine the server to call.' },
      { id: 'rgs-2', text: 'Frontend respects bet levels (default, min/max) from the `authenticate` HTTP response.' },
      { id: 'rgs-3', text: 'Bet increments reflect allowed values within `authenticate/config/minStep`.' },
      { id: 'rgs-4', text: 'The game build consists only of static files and cannot reach external sources (Strict XSS policy).' },
      { id: 'rgs-5', text: 'No downloading fonts from external servers.' },
    ],
  },
  {
    title: 'Frontend and Communication',
    items: [
      { id: 'fe-1', text: 'Game uses unique audio and visual assets (no assets from web-sdk sample games).' },
      { id: 'fe-2', text: 'Game is free of visual bugs, including broken or missing assets or animations.' },
      { id: 'fe-3', text: 'Game supports popout view (`mini-player`) without visual distortion.' },
      { id: 'fe-4', text: 'Game supports mobile view with all UI functionality remaining usable during screen scaling.' },
      { id: 'fe-5', text: 'All images and fonts are loaded from the Stake Engine CDN.' },
      { id: 'fe-6', text: 'Game information and rules are accessible from the UI.' },
      { id: 'fe-7', text: 'RTP of the game (and each mode) is clearly communicated to the player.' },
      { id: 'fe-8', text: 'The maximum win amount for each mode is clearly displayed.' },
      { id: 'fe-9', text: 'Payout amounts for all symbol combinations are presented.' },
      { id: 'fe-10', text: 'If the game has special symbols, all obtainable values are listed.' },
      { id: 'fe-11', text: 'For feature modes, a description of how to access them is provided.' },
    ],
  },
  {
    title: 'UI Components',
    items: [
      { id: 'ui-1', text: 'The game allows players to change the bet size.' },
      { id: 'ui-2', text: 'Player can use all bet-levels returned within RGS auth/response.' },
      { id: 'ui-3', text: 'The player\'s current balance is displayed.' },
      { id: 'ui-4', text: 'Final win amounts are clearly shown for non-zero payout results.' },
      { id: 'ui-5', text: 'If an outcome has multiple winning actions, payout amount incrementally updates.' },
      { id: 'ui-6', text: 'The UI includes an option to disable sounds.' },
      { id: 'ui-7', text: 'The spacebar is mapped to the bet button.' },
      { id: 'ui-8', text: 'If autoplay is present, the player must confirm the action (no automatic consecutive bets with one click).' },
    ],
  },
   {
    title: 'Other Checks',
    items: [
      { id: 'other-1', text: 'The game includes the Stake Engine animation loader.' },
      { id: 'other-2', text: 'Network tab shows no errors or logged game information.' },
      { id: 'other-3', text: 'Game is playtested to verify it behaves as described in the rules.' },
      { id: 'other-4', text: 'Game is tested with various combinations of currencies and languages.' },
      { id: 'other-5', text: 'If a `fastplay` option exists, win amounts, symbols, and pop-ups are still legible.' },
    ],
  },
  {
    title: 'Math Verification',
    items: [
      { id: 'math-1', text: 'Calculated Return to Player (RTP) is within 90.0%–99.0%.' },
      { id: 'math-2', text: 'For multiple modes, all RTPs fall within a 0.5% variation.' },
      { id: 'math-3', text: 'Maximum win amount is realistically obtainable (e.g., more frequent than 1 in 10,000,000).' },
      { id: 'math-4', text: 'Slot games run 100,000–1,000,000 simulations for outcome diversity.' },
      { id: 'math-5', text: 'Hit-rate of non-zero wins aligns with industry standards (<1 in 20 bets, or more frequent).' },
    ],
  },
  {
    title: 'Game Tile Visual Asset Requirements',
    items: [
      { id: 'asset-1', text: 'Background Image: An environmental background showing the game world.' , details: 'Format: PNG or JPG, Min Size: 1200px x 1200px @ 72dpi, Naming: GameTitle-BG.format'},
      { id: 'asset-2', text: 'Foreground Image: A feature character or key item.' , details: 'Format: PNG with transparent background, Min Size: 1200px x 1200px @ 72dpi, Naming: GameTitle-FG.png'},
      { id: 'asset-3', text: 'Publisher Logo: The official logo of the publisher or studio.', details: 'Format: PNG with transparent background, Naming: PublisherName-Logo.png, Legible at small sizes.' },
    ],
  },
];
