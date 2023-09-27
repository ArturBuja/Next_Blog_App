export const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[ąćęłńóśźż]/g, match => {
      const diacriticMap: { [key: string]: string } = {
        ą: 'a',
        ć: 'c',
        ę: 'e',
        ł: 'l',
        ń: 'n',
        ó: 'o',
        ś: 's',
        ź: 'z',
        ż: 'z',
      };
      return diacriticMap[match] || match;
    })
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
