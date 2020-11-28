import { SelectOptions } from "../interfaces/Select";

export const IMAGE_FIT: SelectOptions[] = [
  {
    label: 'None',
    value: 'none'
  },
  {
    label: 'Contain',
    value: 'contain'
  },
  {
    label: 'Cover',
    value: 'cover'
  },
  {
    label: 'Fill',
    value: 'fill'
  }
];

export const IMAGE_CLIP: SelectOptions[] = [
  {
    label: 'None',
    value: 'none'
  },
  {
    label: 'Circle',
    value: 'circle(50% at 50% 50%)'
  },
  {
    label: 'Diamond',
    value: 'polygon(50% 0px, 100% 50%, 50% 100%, 0px 50%)'
  }
];