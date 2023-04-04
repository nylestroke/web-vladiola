import { Card, Accordion, AccordionGroup } from './accordion-data';

const card1: Card = {
  title: 'Czy zakup w naszym sklepie wymaga rejestracji?',
  body: 'Nie, w naszym sklepie nie trzeba się rejestrować. Zakupu można dokonać bez potrzeby logowania, wystarczy dodać zegarek do koszyka, następnie kliknąć „przejdź do kasy” gdzie należy podać dane do wysyłki oraz wybrać sposób płatności.',
};

const card2: Card = {
  title: 'Czy zegarki w naszym sklepie są oryginalne?\n',
  body: 'Tak,  wszystkie  marki oferowanych w naszym sklepie są oryginalne. Z zakupionym zegarkiem otrzymujesz dokument sprzedaży (paragon lub fakturę), pudełko producenta, instrukcję i gwarancję.',
};

const card3: Card = {
  title: 'Jaki jest termin realizacji zamówienia?',
  body:
    'Czas realizacji zamówienia wynosi 1-2 dni roboczy. \n' +
    'Zamówienia złożone do godziny 12:00 w dni robocze, wysyłamy tego samego dnia.',
};

const card4: Card = {
  title: 'Jak mogę zapłacić za zakupiony towar?',
  body: 'Za zakupiony zegarek możesz zapłacić „za pobraniem” tzn gotówką kurierowi, przelewem tradycyjnym, szybkimi przelewami poprzez usługi oferowane przez Przelewy24, BLIK.',
};

const card5: Card = {
  title: 'Czy zakupiony zegarek ma gwarancję?\n',
  body:
    'Tak, każdy zegarek zakupiony w naszym sklepie posiada gwarancję dystrybutora lub producenta, która w zależności od marki wynosi 1 lub 2 lata.\n' +
    '\n',
};

const card6: Card = {
  title: 'Czy mogę zwrócić zegarek?\n',
  body:
    'Tak, według Polskiego prawa towar zakupiony na odległość można zwrócić w ciągu 14 dni od daty otrzymania przesyłki bez podania przyczyny.\n' +
    '\n',
};

const card7: Card = {
  title: 'How can I return an item?',
  body: 'Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. ',
};

const card8: Card = {
  title: 'Jak dokonać reklamacji?\n',
  body:
    'Klient ma prawo składać reklamacje w przypadkach wskazanych w obowiązujących przepisach prawa lub udzielonej gwarancji. \n' +
    '\n',
};

const faq: Accordion = {
  adClass: 'accordion-rounded',
  cardAclass: 'card-box card-sm bg-light',
  cards: [card1, card2, card3, card4, card5, card6, card7, card8],
};

export const faqGroups: AccordionGroup[] = [
  {
    title: 'Często zadawane pytania',
    items: [faq],
  },
];
