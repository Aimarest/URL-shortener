const shortUrl = require('./shortUrl');
const navigateUrl = require('./navigateUrl');
const fs = require('fs');

const longUrl = 'https://www.google.es/maps/place/Jer%C3%B3nimos,+28009+Madrid/@40.4209194,-3.6853898,17z/data=!3m1!4b1!4m5!3m4!1s0xd422898f3bbc07b:0x6717c1ab5edc94ce!8m2!3d40.4209043!4d-3.6832357?hl=es';
const expectedUrl = { url: 'http://localhost/s/1', counter: 0 };
const secondExpectedUrl = { url: 'http://localhost/s/2', counter: 0 };

beforeEach(() => {
  fs.writeFileSync('./urls.json', JSON.stringify({}), 'utf8')
});

test('should short the url', () => {
  expect(shortUrl(longUrl)).toEqual(expectedUrl);
});

test('should fail when url is previously shorted', () => {
  expect(shortUrl(longUrl)).toEqual(expectedUrl);
  expect(() => shortUrl(longUrl)).toThrow(Error);
});

test('should return the long url', () => {
  const url = 'http://localhost/s/1';
  expect(shortUrl(longUrl)).toEqual(expectedUrl);
  expect(navigateUrl(url)).toEqual(longUrl);
});

test('should not return a long url', () => {
  const url = 'http://localhost/adalab';
  expect(shortUrl(longUrl)).toEqual(expectedUrl);
  expect(navigateUrl(url)).toEqual(undefined);
});

test('should short a different url from the primary one', () => {
  const secondUrl = 'https://www.amazon.es/Aqu%C3%AD-quien-viva-Serie-Completa/dp/B076JQDRG5/ref=sr_1_1?keywords=aqu%C3%AD+no+hay+quien+viva&qid=1662457767&sr=8-1';
  expect(shortUrl(longUrl)).toEqual(expectedUrl);
  expect(shortUrl(secondUrl)).toEqual(secondExpectedUrl);
});