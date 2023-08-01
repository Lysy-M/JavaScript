const { test, expect } = require("@playwright/test");
const { firefox } = require("@playwright/test");

let browser;
let context;
let page;

// TypeScript - różnica
// let browser: Browser | undefined;
// let context: BrowserContext | undefined;
// let page: Page | undefined;


test.use(firefox);

test.beforeAll(async () => {
  // Uruchomienie przeglądarki Firefox przed rozpoczęciem testów
  browser = await firefox.launch();
});

test.afterAll(async () => {
  // Zamknięcie przeglądarki po zakończeniu wszystkich testów
  if (browser) {
    await browser.close();
  }
});

test("Test umawiania konsultacji na stronie *****", async () => {
  // Ustawienie limitu czasu na 200s dla całego testu
  test.setTimeout(200000);
  // Tworzenie nowego kontekstu i strony dla każdego testu
  context = await browser.newContext();
  page = await context.newPage();

  // Krok 1: Przejście na stronę *****
  await page.goto("https://*******.com/pl/");

  try {
    // Oczekiwanie na stan "domcontentloaded"
    await page.waitForLoadState("domcontentloaded");

    // Akceptuj pliki cookie
    const acceptButton = await page.waitForSelector(
      "#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll",
      { visible: true }
    );
    await acceptButton.click();

    // Kliknij przycisk "Zaloguj się"
    const loginButton = await page.waitForSelector(
      'a[href="https://panel.telemedi.com/pl/login"].theme-light',
      { visible: true }
    );
    console.log('Kliknięto na element "Zaloguj się".');
    await loginButton.click();

    // Krok 2: Logowanie z użyciem danych
    const loginInput = await page.waitForSelector("#username", {
      state: "visible",
    });
    await loginInput.fill("*******test@gmail.com");

    const passwordInput = await page.waitForSelector("#password", {
      state: "visible",
    });
    await passwordInput.fill("*******test12!");

    // Kliknij przycisk "Zaloguj się"
    const submitButton = await page.waitForSelector(".MuiButton-containedPrimary");
    await Promise.all([
      submitButton.click(),
      page.waitForNavigation({ waitUntil: "load" }),
    ]);

    // Krok 3: Przejście do sekcji "Umów się" -> "Recepta"

    // Kliknięcie w ciacha
    await page.click(
      "#root > div > div.MuiPaper-root.jss62.MuiPaper-elevation1.MuiPaper-rounded > div.MuiBox-root.jss225.jss64 > div.MuiBox-root.jss228.jss67 > button > span"
    );

    // Kliknij przycisk "Umów się"
    const umowSieButton = await page.waitForSelector(".MuiButton-containedPrimary", {
      visible: true,
    });
    await umowSieButton.click();

    // Kliknij przycisk "Recepta"
    const receptaButton = await page.waitForSelector(
      '//*[@id="consultationNestedMenu:prescriptionHeader"]',
      { visible: true }
    );
    await receptaButton.click();

    // Krok 4: Wyszukiwanie i wybranie leku "******ural"
    const searchInput = await page.waitForSelector("#react-select-2-input", {
      visible: true,
    });
    await searchInput.fill("*****ural");

    // Kliknięcie w pole na liście wyników wyszukiwania
    const indicator = await page.waitForSelector(".indicators-container svg", {
      visible: true,
    });
    await indicator.click();

    // Krok 5: Wybranie opcji "1 saszetka 8g"
    const option = await page.waitForSelector(".fk-select-v2__option", {
      visible: true,
    });
    await option.click();

    // Krok 6: Akceptacja checkbox'a "Akceptuję..."
    const checkbox = await page.waitForSelector('label[for="prescription"]', {
      visible: true,
    });
    await checkbox.click();

    // Wybór opakowania
    const label = await page.waitForSelector(".fk-input__label", {
      visible: true,
    });
    await label.click();

    const packagingOption = await page.waitForSelector(
      '[id="react-select-3-option-0"]',
      {
        visible: true,
      }
    );
    await packagingOption.click();

    // Krok 7: Kliknięcie przycisku "Wybierz"
    const buttons = await page.$$("button.fk-button");
    if (buttons.length >= 2) {
      await buttons[1].click(); // Kliknij drugi przycisk z listy
    } else {
      console.error("Drugiego przycisku nie znaleziono.");
    }

    // Oczekiwanie na załadowanie strony w stanie "load"
    await page.waitForLoadState("load");

    // Krok 8: Zaznacz checkbox "Zaznacz wszystkie"

    // Zaznaczamy checkbox "Zaznacz wszystkie"
    const selectAllCheckbox = await page.waitForSelector('.fk-checkbox__label[for="checkAll"]');
    await selectAllCheckbox.click();

    // Krok 9: Kliknięcie checkbox "*****Go"

    // Odznaczamy checkbox "pakiet *****Go"
    const telemediGoCheckbox = await page.waitForSelector('.fk-checkbox__label[for="*****"]');
    await telemediGoCheckbox.click();

    // Krok 10: Kliknięcie przycisku "Umów za..."
    const umowZaButton = await page.waitForSelector(
      'button.fk-button:has-text("Umów za 59.00 PLN")',
      { visible: true }
    );
    try {
      // Oczekiwanie na widoczność elementu
      await umowZaButton.click();

      console.log('Kliknięto na przycisk "Umów za 59.00 PLN".');
    } catch (error) {
      console.error("Nie udało się znaleźć i kliknąć przycisku:", error);
    }

    // Oczekiwanie na pełne przeładowanie strony
    await page.waitForNavigation({ waitUntil: "load" });

    // Sprawdzenie, czy element o klasie "button-like" z tytułem "Przelew" istnieje na stronie
    const buttonElement = await page.waitForSelector(
      '.button-like[title="Przelew"]',
      {
        state: "visible",
      }
    );

    // Wykonaj asercję, czy element istnieje
    expect(buttonElement).toBeTruthy();

    // Wykonaj zrzut ekranu
    await page.screenshot({
      path: "playwright-screenshot/screenshot.png",
    });

    console.log(
      "Element with class 'button-like' and title 'Przelew' is present on the page."
    );

  } catch (error) {
    console.error("Wystąpił błąd podczas wykonywania testu:", error);
  } finally {
    // // Zakończ test zamknięciem przeglądarki
    // if (context) {
    //   await context.close();
    // }
  }
});











    
