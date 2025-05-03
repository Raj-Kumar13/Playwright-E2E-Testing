import { test as base } from '@playwright/test';
import LoginPage from '@pages/loginPage';
import HomePage from '@pages/homePage';
import SecurityInterestPage from '@pages/led/securityInterestPage';
import RealEstateAssetPage from '@pages/asset/realEstatePage';
import BasePage from '@pages/basePage';
import LinkPage from '@pages/linkPage';
import FacilityPage from '@pages/facilityPage';
import MenuPage from '@pages/menuPage';
import ApplicationPage from '@pages/applicationPage';
import PersonalPage from '@pages/legalEntities/personalPage';
import JuristicPage from '@pages/legalEntities/juristicPage';

interface CollatePages {
    loginPage: LoginPage;
    homePage: HomePage;
    securityInterestPage: SecurityInterestPage;
    realEstateAssetPage: RealEstateAssetPage;
    facilityPage: FacilityPage;
    basePage: BasePage;
    linkPage: LinkPage;
    menuPage: MenuPage;
    applicationPage: ApplicationPage;
    legalEntityPersonalPage: PersonalPage;
    legalEntityJuristicPage: JuristicPage;
}

export const test = base.extend<CollatePages>({
    loginPage: async ({ page }, use) => await use(new LoginPage(page)),
    homePage: async ({ page }, use) => await use(new HomePage(page)),
    securityInterestPage: async ({ page }, use) => await use(new SecurityInterestPage(page)),
    realEstateAssetPage: async ({ page }, use) => await use(new RealEstateAssetPage(page)),
    facilityPage: async ({ page }, use) => await use(new FacilityPage(page)),
    basePage: async ({ page }, use) => await use(new BasePage(page)),
    linkPage: async ({ page }, use) => await use(new LinkPage(page)),
    menuPage: async ({ page }, use) => await use(new MenuPage(page)),
    applicationPage: async ({ page }, use) => await use(new ApplicationPage(page)),
    legalEntityPersonalPage: async ({ page }, use) => await use(new PersonalPage(page)),
    legalEntityJuristicPage: async ({ page }, use) => await use(new JuristicPage(page))
});

export { expect } from '@playwright/test';

export function step(stepName?: string) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function decorator(target: Function, context: ClassMethodDecoratorContext) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return function replacementMethod(...args: any) {
            const name = stepName || `${this.constructor.name}.${context.name as string}`;
            return test.step(name, async () => {
                return await target.call(this, ...args);
            });
        };
    };
}

export function method() {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function decorator(target: Function, context: ClassMethodDecoratorContext) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return function replacementMethod(...args: any) {
            return test.step(context.name as string, async () => {
                return await target.call(this, ...args);
            });
        };
    };
}