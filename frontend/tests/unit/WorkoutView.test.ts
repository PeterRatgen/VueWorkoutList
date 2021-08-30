import 'jest';
import { mount, flushPromises, VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';

import WorkoutView from '../../src/views/WorkoutView.vue';
import Workout from '../../src/components/Workout.vue';
import HelloHeader from '../../src/components/HelloHeader.vue';
import AddWorkout from '../../src/components/AddWorkout.vue';
import BeginWorkout from '../../src/components/BeginWorkout.vue';
import WorkoutProcess from '../../src/views/WorkoutProcess.vue';

import mitt from 'mitt';

import { workout} from '../../tests/testData';

const wrapper : VueWrapper<any> = mount(WorkoutView, {
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



describe('WorkoutView', () => {
    it('has-data', () => {
        expect(typeof WorkoutView.data).toBe('function');
    });
});


describe('For login token', () => {
     
    test('User login token exists', async () => {
        //We need to await for two promises.
        await flushPromises();
        await flushPromises();
        expect(wrapper.vm.$data.token.length).toBeGreaterThan(0);
    });

    test('Workout data exists', async () => {
        expect(typeof wrapper.vm.$data.workouts).toBe("object");
    });

    test('Workout has correct size', async () => {
        expect(wrapper.vm.$data.workouts.length).toBe(3);
    });

    test('CurrentWorkout data exists', async () => {
        expect(typeof wrapper.vm.$data.currentWorkout).toBe("object");
    });
});

describe('Test for existence of components', () => {
    test('Header component', async () => {
        expect(wrapper.getComponent(HelloHeader)).toBeTruthy();
    });

    test('Workout component', async () => {
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

