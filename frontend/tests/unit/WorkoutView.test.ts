import 'jest';
import { mount } from '@vue/test-utils';
import { workout } from '../testData';

import WorkoutView from '../../src/views/WorkoutView.vue';
import Workout from '../../src/components/Workout.vue';
import HelloHeader from '../../src/components/HelloHeader.vue';
import AddWorkout from '../../src/components/AddWorkout.vue';
import BeginWorkout from '../../src/components/BeginWorkout.vue';
import WorkoutProcess from '../../src/views/WorkoutProcess.vue';

import mitt from 'mitt';

import { server } from '../../src/mocks/server';


beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

describe('WorkoutView', () => {
    it('has-data', () => {
        expect(typeof WorkoutView.data).toBe('function');
    });
});


const wrapper = mount(WorkoutView, {
    data () {
        return {
            currentWorkout : workout
        };
    },
    global: {
        provide :  {
            emitter: mitt()
        },
        stubs : ['fa']
    }
});

describe('For login token', () => {
    test('User login token exists', async () => {
        expect(wrapper.vm.$data.token.length).toBeGreaterThan(0);
    });

    test('Workout data exists', () => {
        expect(typeof wrapper.vm.$data.workouts).toBe("object");
    });

    test('Workout has correct size', () => {
        expect(wrapper.vm.$data.workouts.length).toBe(3);
    });

    test('CurrentWorkout data exists', () => {
        expect(typeof wrapper.vm.$data.currentWorkout).toBe("object");
    });
});

describe('Test for existence of components', () => {
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


describe('When starting a workout', () => {

    it('should display workoutProcess component', async () => {



        await wrapper.setData({workingOut : true});
        expect(wrapper.getComponent(WorkoutProcess)).toBeTruthy();
    });

    test('workoutProcess component removed on setting "workingOut" to false', async () => {
        await wrapper.setData({workingOut : false});

        let errorWrapper = wrapper.findComponent(WorkoutProcess);
        expect(errorWrapper.exists()).toBeFalsy();
    });
});

