import puppeteer from 'puppeteer';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { execSync } from 'child_process';

describe('E2E: Credit Card Validator', () => {
  let browser;
  let page;
  let tempDir;

  beforeAll(async () => {
    // Принудительно убиваем все возможные процессы Chrome
    try {
      execSync('taskkill /F /IM chrome.exe', { stdio: 'ignore' });
    } catch {
      // Процесс не найден – игнорируем
    }
    try {
      execSync('taskkill /F /IM "Google Chrome for Testing.exe"', {
        stdio: 'ignore',
      });
    } catch {
      // Процесс не найден – игнорируем
    }
    // Даём время на завершение процессов
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Создаём уникальную временную папку
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
      const proc = browser.process();
      if (proc) proc.kill('SIGKILL');
    }
    // Удаляем временную папку (если получится)
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
  });

  test('невалидный номер карты – появляется сообщение "Номер карты невалидный"', async () => {
    await page.type('input', '1234567890123456');
    await page.click('button');
    await page.waitForSelector('.modal', { visible: true });
    const message = await page.$eval('.modal p', (el) => el.textContent);
    expect(message).toBe('Номер карты невалидный');
  });
});
