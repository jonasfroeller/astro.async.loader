import { test, expect } from '@playwright/test';

test.describe('AsyncIframe Component', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should render the wrapper structure correctly', async ({ page }) => {
        const wrapper = page.locator('.async-iframe__wrapper');
        await expect(wrapper).toBeVisible();

        const loaderContainer = page.locator('.async-iframe__loader-container');
        await expect(loaderContainer).toBeAttached();

        const loader = page.locator('.async-iframe__loader');
        await expect(loader).toBeAttached();

        const container = page.locator('.async-iframe__container');
        await expect(container).toBeVisible();
    });

    test('should contain an iframe inside the container', async ({ page }) => {
        const iframe = page.locator('.async-iframe__container iframe');
        await expect(iframe).toBeAttached();
    });

    test('loader container should have correct positioning styles', async ({ page }) => {
        const loaderContainer = page.locator('.async-iframe__loader-container');

        const styles = await loaderContainer.evaluate((el) => {
            const computed = window.getComputedStyle(el);
            return {
                position: computed.position,
                zIndex: computed.zIndex,
            };
        });

        expect(styles.position).toBe('absolute');
        expect(parseInt(styles.zIndex)).toBeGreaterThan(0);
    });

    test('loader should have spinning animation', async ({ page }) => {
        const loader = page.locator('.async-iframe__loader');

        const animation = await loader.evaluate((el) => {
            const computed = window.getComputedStyle(el);
            return computed.animation || computed.animationName;
        });

        expect(animation).toContain('async-iframe__spin');
    });

    test('wrapper should have correct aspect ratio styling', async ({ page }) => {
        const wrapper = page.locator('.async-iframe__wrapper');

        const styles = await wrapper.evaluate((el) => {
            const computed = window.getComputedStyle(el);
            return {
                position: computed.position,
                paddingTop: computed.paddingTop,
                overflow: computed.overflow,
            };
        });

        expect(styles.position).toBe('relative');
        expect(styles.overflow).toBe('hidden');
    });

    test('iframe should have correct dimensions', async ({ page }) => {
        const iframe = page.locator('.async-iframe__container iframe');

        const styles = await iframe.evaluate((el) => {
            const computed = window.getComputedStyle(el);
            return {
                position: computed.position,
                width: computed.width,
                height: computed.height,
                border: computed.border,
            };
        });

        expect(styles.position).toBe('absolute');
    });

    test('loader should hide after iframe loads', async ({ page }) => {
        const loaderContainer = page.locator('.async-iframe__loader-container');
        const iframe = page.locator('.async-iframe__container iframe');

        await iframe.waitFor({ state: 'attached' });

        await expect(loaderContainer).toHaveClass(/async-iframe__hidden/, { timeout: 30000 });
    });

    test('iframe should become visible after loading', async ({ page }) => {
        const loaderContainer = page.locator('.async-iframe__loader-container');
        const iframe = page.locator('.async-iframe__container iframe');

        await expect(loaderContainer).toHaveClass(/async-iframe__hidden/, { timeout: 30000 });

        await expect(async () => {
            const opacity = await iframe.evaluate((el) => {
                return parseFloat(window.getComputedStyle(el).opacity);
            });
            expect(opacity).toBe(1);
        }).toPass({ timeout: 5000 });
    });

    test('loader container hidden class should have correct styles', async ({ page }) => {
        const loaderContainer = page.locator('.async-iframe__loader-container');

        await expect(loaderContainer).toHaveClass(/async-iframe__hidden/, { timeout: 30000 });

        const display = await loaderContainer.evaluate((el) => {
            return window.getComputedStyle(el).display;
        });

        expect(display).toBe('none');
    });

    test('iframe should have transition for smooth opacity change', async ({ page }) => {
        const iframe = page.locator('.async-iframe__container iframe');

        const transition = await iframe.evaluate((el) => {
            return window.getComputedStyle(el).transition;
        });

        expect(transition).toContain('opacity');
    });
});

test.describe('AsyncIframe - Multiple Instances', () => {
    test('all instances should work independently', async ({ page }) => {
        await page.goto('/');

        const wrappers = page.locator('.async-iframe__wrapper');
        const count = await wrappers.count();

        for (let i = 0; i < count; i++) {
            const wrapper = wrappers.nth(i);
            const loaderContainer = wrapper.locator('.async-iframe__loader-container');
            const container = wrapper.locator('.async-iframe__container');

            await expect(container).toBeVisible();
            await expect(loaderContainer).toBeAttached();
        }
    });
});

test.describe('AsyncIframe - Accessibility', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('iframe should have allowfullscreen attribute when set', async ({ page }) => {
        const iframe = page.locator('.async-iframe__container iframe');
        await expect(iframe).toHaveAttribute('allowfullscreen', /.*/);
    });
});

test.describe('AsyncIframe - Page Load Handling', () => {
    test('should setup iframes when DOM is already loaded', async ({ page }) => {
        await page.goto('/');

        const wrapper = page.locator('.async-iframe__wrapper');
        await expect(wrapper).toBeVisible();

        const loaderContainer = page.locator('.async-iframe__loader-container');
        const iframe = page.locator('.async-iframe__container iframe');

        await expect(iframe).toBeAttached();
        await expect(loaderContainer).toBeAttached();
    });

    test('should handle page reload correctly', async ({ page }) => {
        await page.goto('/');

        const loaderContainer = page.locator('.async-iframe__loader-container');
        await expect(loaderContainer).toHaveClass(/async-iframe__hidden/, { timeout: 30000 });

        await page.reload();

        await expect(page.locator('.async-iframe__wrapper')).toBeVisible();
        await expect(page.locator('.async-iframe__loader-container')).toBeAttached();
    });
});
