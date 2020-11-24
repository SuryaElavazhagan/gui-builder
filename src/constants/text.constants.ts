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

export { FONT_SIZES, FONT_FAMILIES };