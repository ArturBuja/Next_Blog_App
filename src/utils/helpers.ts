export const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
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
    .replace(/^-+|-+$/g, '')
    .replace(/[^\w\s-]/g, '');
export const isEmailOrEmpty = (value: string) =>
  /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(value);
