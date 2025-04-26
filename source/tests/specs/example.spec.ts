import { test, expect } from '@playwright/test';
import { BASE_ENVIRONMENT } from '../../envHandler/manager';

test('Automate Full ORM Application', async ({ page }) => {
    await page.goto(BASE_ENVIRONMENT.ApplicationURL);
});