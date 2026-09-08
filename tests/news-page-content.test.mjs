import assert from 'node:assert/strict';
import test from 'node:test';
import { getNewsPageContent } from '../lib/news-page-content.ts';

test('returns the approved news image sequence for every locale', () => {
  for (const locale of ['th', 'en', 'ja']) {
    const content = getNewsPageContent(locale);
    assert.equal(content.image, '/images/news-yarn-detail.png');
    assert.deepEqual(content.visuals.map(({ src }) => src), [
      '/images/news-factory-aerial.png',
      '/images/news-spindle-detail.png',
    ]);
  }
});

test('returns localized navigation and headings for Thai, English, and Japanese', () => {
  assert.deepEqual(
    ['th', 'en', 'ja'].map((locale) => {
      const content = getNewsPageContent(locale);
      return [content.title, content.breadcrumbHome, content.breadcrumbCurrent];
    }),
    [
      ['ข่าวสารจากไทยคูราโบ', 'หน้าแรก', 'ข่าวสาร'],
      ['News from Thai Kurabo', 'Home', 'News'],
      ['タイ・クラボからのお知らせ', 'ホーム', 'ニュース'],
    ],
  );
});
