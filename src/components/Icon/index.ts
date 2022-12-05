import { withInstall } from '@/utils';

import icon from './src/Icon.vue';
import iconPicker from './src/IconPicker.vue';

const Icon = withInstall(icon);
export const IconPicker = withInstall(iconPicker);

export default Icon;
