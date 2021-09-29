import 'jest'
import { shallowMount, flushPromises, VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'

import WorkoutView from '../../src/views/WorkoutView.vue'
import Workout from '../../src/components/Workout.vue'
import HelloHeader from '../../src/components/HelloHeader.vue'
import AddWorkout from '../../src/components/AddWorkout.vue'
import BeginWorkout from '../../src/components/BeginWorkout.vue'
import WorkoutProcess from '../../src/views/WorkoutProcess.vue'
import store from '../../src/store/index'

import mitt from 'mitt'

import { workout } from '../../tests/testData'

const wrapper = shallowMount(WorkoutView, {
  data () {
    return {
      currentWorkout: workout
    }
  },
  global: {
    provide: {
      emitter: mitt()
    },
    stubs: ['fa'],
    plugins: [store]
  }
})

describe('WorkoutView', () => {
  it('has-data', () => {
    expect(typeof WorkoutView.data).toBe('undefined')
  })
})

/*
describe('WorkoutView data', () => {
    test('token exists', async () => {
        //We need to await for two promises.
        await flushPromises();
        await flushPromises();
        expect(wrapper.vm.$data.token.length).toBeGreaterThan(0);
    });

    test('workouts have correct type', async () => {
        expect(typeof wrapper.vm.$data.workouts).toBe("object");
    });

    test('has correct number of workouts', async () => {
        expect(wrapper.vm.$data.workouts.length).toBe(3);
    });
});

describe('WorkoutView contains', () => {
    test('header component', async () => {
        expect(wrapper.getComponent(HelloHeader)).toBeTruthy();
    });

    test('workout component', async () => {
        //We need to make sure the DOM has updated.
        await nextTick();
        expect(wrapper.getComponent(Workout)).toBeTruthy();
    });

    test('AddWorkout component', async () => {
        expect(wrapper.getComponent(AddWorkout)).toBeTruthy();
    });

    test('BeginWorkout component', async () => {
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

*/
