const membershipAmount = {
  silver: 300,
  gold: 500,
};

const COOKIE_EXPIRY_DAYS = 7;

const COOKIE_EXPIRY_MS = COOKIE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;

const MAX_FEED_PAGE_SIZE = 10;

module.exports = { membershipAmount, COOKIE_EXPIRY_DAYS, COOKIE_EXPIRY_MS, MAX_FEED_PAGE_SIZE };
