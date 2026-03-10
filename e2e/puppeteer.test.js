/**
 * @jest-environment node
 */
import puppeteer from 'puppeteer';
import fs from 'fs';
import os from 'os';
import path from 'path';

describe('E2E: Credit Card Validator', () => {
  let browser;
  let page;
  let tempDir;

  beforeAll(async () => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'puppeteer-'));
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      userDataDir: tempDir,
    });
    page = await browser.newPage();
    await page.goto('http://localhost:8080');
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch (e) {
      console.warn('Не удалось удалить временную папку:', e.message);
    }
  });

  test('валидный номер карты – появляется сообщение "Номер карты валидный"', async () => {
    await page.type('input', '4111111111111111');
    await page.click('button');
    await page.waitForSelector('.modal', { visible: true });
    const message = await page.$eval('.modal p', (el) => el.textContent);
    expect(message).toBe('Номер карты валидный');
    await page.click('.modal .close');
    // Очищаем поле ввода для следующего теста
    await page.$eval('input', el => el.value = '');
  }, 10000);

  test('невалидный номер карты – появляется сообщение "Номер карты невалидный"', async () => {
    await page.type('input', '1234567890123456');
    await page.click('button');
    await page.waitForSelector('.modal', { visible: true });
    const message = await page.$eval('.modal p', (el) => el.textContent);
    expect(message).toBe('Номер карты невалидный');
  }, 10000);
});