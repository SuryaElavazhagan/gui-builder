import { SelectOptions } from '../interfaces/Select';

const FONT_FAMILIES: SelectOptions[] = [
  {
    label: 'Select font',
    value: 'none'
  },
  {
    label: 'Arial',
    value: 'Arial'
  },
  {
    label: 'Arial Black',
    value: 'Arial Black'
  },
  {
    label: 'Courier New',
    value: 'Courier New'
  },
  {
    label: 'Times New Roman',
    value: 'Times New Roman'
  }
];

const FONT_SIZES: SelectOptions[] = (() => {
  const sizes: SelectOptions[] = [
    {
      label: 'Select Size',
      value: 'none'
    }
  ];
  for (let i = 2; i < 72; i += 2) {
    sizes.push({ label: `${i}`, value: `${i}` });
  }
  return sizes;
})();

const HEADINGS: SelectOptions[] = (() => {
  const headings: SelectOptions[] = [
    {
      label: 'Select Heading',
      value: 'none'
    }
  ];
  for (let i = 1; i < 7; i++) {
    headings.push({ label: `Heading ${i}`, value: `h${i}` });
  }
  return headings;
})();

export { FONT_SIZES, FONT_FAMILIES, HEADINGS };