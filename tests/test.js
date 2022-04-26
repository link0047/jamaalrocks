import { expect, test } from '@playwright/test';

test('script tags have env attrib', async ({ page }) => {
  page.on('console', msg => console.error(msg));
	await page.goto('https://www.spencersonline.com/', { waitUntil: 'networkidle' });
  const hasEnvAttrib = await page.locator('script').evaluateAll(scripts => {
    for (let script of scripts) {
      if (script.hasAttribute('env')) {
        return true;
      }
    }  
    return false;
  });

	await expect(hasEnvAttrib).toBeFalsy();
});

