// Projects that ship a playable in-page mini-game (ProjectGameModal).
// Shared so the project page, homepage cards, and FX all agree.
export const GAME_SLUGS = ['ecovision', 'joblink', 'documind', 'smartpay', 'medihub', 'drishti'];

export const hasGame = (slug) => GAME_SLUGS.includes(slug);
