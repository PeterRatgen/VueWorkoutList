import 'jest';
import { mount } from '@vue/test-utils';
import { testData, current} from '../testData';

import WorkoutView from '../../src/views/WorkoutView.vue';

import Workout from '../../src/components/Workout.vue';
import HelloHeader from '../../src/components/HelloHeader.vue';
import AddWorkout from '../../src/components/AddWorkout.vue';
import BeginWorkout from '../../src/components/BeginWorkout.vue';
import WorkoutProcess from '../../src/views/WorkoutProcess.vue';

import mitt from 'mitt';


describe('WorkoutView', () => {
    it('has-data', () => {
        expect(typeof WorkoutView.data).toBe('function');
    });
});



describe('Test WorkoutView components', () => {
    const wrapper = mount(WorkoutView, {
        data () {
            return {
                workouts : testData
            };
        },
        global: {
            provide :  {
                emitter: mitt()
            },
            stubs : ['fa']
        }
    });
    test('Header component', () => {
        expect(wrapper.getComponent(HelloHeader)).toBeTruthy();
    });

    test('Workout component', () => {
        expect(wrapper.getComponent(Workout)).toBeTruthy();
    });

    test('AddWorkout component', () => {
        expect(wrapper.getComponent(AddWorkout)).toBeTruthy();
    });

    test('BeginWorkout component', () => {
        expect(wrapper.getComponent(BeginWorkout)).toBeTruthy();
    });
});

describe('WorkoutView interactivity', () => {
    const wrapper = mount(WorkoutView, {
        data () {
            return {
                workouts : testData,
                workingOut : true
            };
        },
        global: {
            provide :  {
                emitter: mitt()
            },
            stubs : ['fa']
        }
    });

    wrapper.setData({"currentWorkout" : current});

    test('WorkoutProcess component', () => {
        expect(wrapper.getComponent(WorkoutProcess)).toBeTruthy();
    });
});

