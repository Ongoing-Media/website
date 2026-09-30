import { build } from 'astro';

// Bouwt de site één keer vóór alle tests, zodat tests/build.test.ts altijd een verse dist/ controleert.
export default async function setup() {
  await build({ logLevel: 'error' });
}
