import { Monday1_1 } from './content/Monday1_1.jsx';
import { Monday1_2 } from './content/Monday1_2.jsx';
import { Monday1_3 } from './content/Monday1_3.jsx';
import { MondayDemo } from './content/MondayDemo.jsx';
import { Tuesday2_1 } from './content/Tuesday2_1.jsx';
import { Tuesday2_2 } from './content/Tuesday2_2.jsx';
import { Tuesday2_3 } from './content/Tuesday2_3.jsx';
import { TuesdayDemo } from './content/TuesdayDemo.jsx';
import { Wednesday3_1 } from './content/Wednesday3_1.jsx';
import { Wednesday3_2 } from './content/Wednesday3_2.jsx';
import { Wednesday3_3 } from './content/Wednesday3_3.jsx';
import { WednesdayDemo } from './content/WednesdayDemo.jsx';
import { Thursday4_1 } from './content/Thursday4_1.jsx';
import { Thursday4_2 } from './content/Thursday4_2.jsx';
import { Thursday4_3 } from './content/Thursday4_3.jsx';
import { ThursdayDemo } from './content/ThursdayDemo.jsx';
import { Friday5_1 } from './content/Friday5_1.jsx';
import { Friday5_2 } from './content/Friday5_2.jsx';
import { Friday5_3 } from './content/Friday5_3.jsx';
import { Friday5_4 } from './content/Friday5_4.jsx';
import { FridayDemo } from './content/FridayDemo.jsx';
import { FridayChecklists } from './content/FridayChecklists.jsx';

// Maps a practice id (from days.js) to the component that renders its
// write-up. A practice with no entry here just falls back to an empty state.
export const practiceContent = {
  'monday-1': Monday1_1,
  'monday-2': Monday1_2,
  'monday-3': Monday1_3,
  'monday-demo': MondayDemo,
  'tuesday-1': Tuesday2_1,
  'tuesday-2': Tuesday2_2,
  'tuesday-3': Tuesday2_3,
  'tuesday-demo': TuesdayDemo,
  'wednesday-1': Wednesday3_1,
  'wednesday-2': Wednesday3_2,
  'wednesday-3': Wednesday3_3,
  'wednesday-demo': WednesdayDemo,
  'thursday-1': Thursday4_1,
  'thursday-2': Thursday4_2,
  'thursday-3': Thursday4_3,
  'thursday-demo': ThursdayDemo,
  'friday-1': Friday5_1,
  'friday-2': Friday5_2,
  'friday-3': Friday5_3,
  'friday-4': Friday5_4,
  'friday-demo': FridayDemo,
  'friday-checklists': FridayChecklists,
};
