import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// Bewaakt de projectafspraken: geen video's, geen deck en geen geheimen in de (publieke) repo.
const files = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard'], { encoding: 'utf8' })
  .split('\n')
  .filter(Boolean);

describe('repo', () => {
  it('bevat geen videobestanden', () => {
    expect(files.filter((file) => /\.(mp4|mov|webm|m4v|avi|mkv)$/i.test(file))).toEqual([]);
  });

  it('bevat geen PDF’s (zoals het introductiedeck)', () => {
    expect(files.filter((file) => /\.pdf$/i.test(file))).toEqual([]);
  });

  it('heeft alleen webveilige bestandsnamen in public/', () => {
    for (const file of files.filter((f) => f.startsWith('public/'))) {
      expect(file).toMatch(/^public\/[a-z0-9/._-]+$/);
    }
  });

  it('bevat geen sleutels of wachtwoorden', () => {
    const text = files
      .filter((file) => /\.(ts|astro|mjs|js|json|toml|md|css)$/.test(file) && !file.endsWith('package-lock.json'))
      .map((file) => readFileSync(file, 'utf8'))
      .join('\n');
    expect(text).not.toMatch(/-----BEGIN [A-Z ]*PRIVATE KEY-----/);
    expect(text).not.toMatch(/\b(?:api[_-]?key|secret|password|token)\s*[:=]\s*['"][^'"]{8,}/i);
  });
});
