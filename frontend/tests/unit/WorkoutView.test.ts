import 'jest';
import expect from 'expect';
import { mount } from '@vue/test-utils';
import { testData, current, token } from '../testData';

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

const wrapper = mount(WorkoutView, {
    data () {
        return {
            workouts : testData,
            currentWorkout : current,
            token : token
        };
    },
    global: {
        provide :  {
            emitter: mitt()
        },
        stubs : ['fa']
    }
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

describe("Comptents for the rendered header", () => {
    test('contents of header', () => {
        let domWrapper = wrapper.find('h1');
        expect(domWrapper.text()).toEqual("Hej, Peter");
    });
});

describe('WorkoutView starting and removing a workout', () => {

    test('user login token exists', async () => {
        expect(wrapper.vm.$data.token.length).toBeGreaterThan(0);
    });

    test('workoutProcess component exists on setting "workingOut"', async () => {

        await wrapper.setData({workingOut : true});
        expect(wrapper.getComponent(WorkoutProcess)).toBeTruthy();
    });

    test('workoutProcess component removed on setting "workingOut" to false', async () => {
        await wrapper.setData({workingOut : false});

        let errorWrapper = wrapper.findComponent(WorkoutProcess);
        expect(errorWrapper.exists()).toBeFalsy();
    });
});

