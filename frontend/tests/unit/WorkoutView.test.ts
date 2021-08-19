import 'jest';
import { mount } from '@vue/test-utils';
import WorkoutView from '../../src/views/WorkoutView.vue';
import { testData} from '../testData';

import mitt from 'mitt';

describe('WorkoutView', () => {
    it('has-data', () => {
        expect(typeof WorkoutView.data).toBe('function');
    });
});



describe('Mount the Workout View', () => {
    const wrapper = mount(WorkoutView, {
        data () {
            return {
                workouts : testData
            };
        },
        global: {
            provide :  {
                emitter: mitt()
            }
        }
    });

    test('Has wokrout', () => {
        expect(wrapper.getComponent({name : 'addWorkout'})).toBeTruthy();
    });
});

