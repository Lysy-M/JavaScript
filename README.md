# JavaScriptZADANIE
1. Wykonaj scenariusz testu automatycznego umawiania konsultacji z receptą z
użyciem narzędzia Playwright.
Skrypt testowy powinien kolejno realizować następujące kroki testowe:
- Przejście na adres: https://******.com/pl/
- Logowanie z użyciem:
loginu: *****test@gmail.com
hasła: *****test12!
- Przejście do sekcji ‘Umów się’ -> ‘Recepta’
- Wyszukanie i wybranie leku *****ural’
- Wybranie opcji ‘1 sasz. 8 g’ jako wielkość opakowania
- Akceptacja checkbox’a
- Kliknięcie przycisku ‘Wybierz’
- Odznaczenie checkbox’a ‘Korzystam z pakietu ******GO…’
- Zaznaczenie checkbox’a ‘Zaznacz wszystkie’
- Kliknięcie przycisku ‘Umów za…’
Test zakańczamy uzyskaniem widoku przejścia do płatności.
a) 1 pytanie dodatkowe:
Ostatnią instrukcją potwierdzającą uzyskanie żądanego widoku powinna być
asercja expect. W pseudokodzie ma ona na przykład formułę:
expect(element).toHaveSomething('Something');
Czym moglibyśmy zastąpić element, toHaveSomething oraz ‘Something’ w
przypadku naszego testu w ostatnim widoku?
b) 2 pytanie dodatkowe:
Na podstawie dokumentacji Playwright wyjaśnij w jakim celu stosowana jest
poniższa instrukcja (łącznie z await):
await page.waitForTimeout(time);
Czy jest ona konieczna do poprawnego działania skryptu umawiania wizyty z
receptą? Odpowiedź uzasadnij.
Oczekiwane rezultaty to zrzuty z ekranu poprawnie skonfigurowanego środowiska
testowego, wykonywalny plik w formacie nazwa_pliku.spec.ts oraz ewentualnie odpowiedzi
na pytania dodatkowe.
