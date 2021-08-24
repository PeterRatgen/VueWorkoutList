import 'jest';
import { mount } from '@vue/test-utils';

import { workout } from '../testData';

import Workout from '../../src/components/Workout.vue';
import ExerciseItem from '../../src/components/ExerciseItem.vue';

import mitt from 'mitt';

const wrapper = mount(Workout, {
    props : {
        workout : workout
    },
    data() {
        return {
            contracted : true
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
    test('Exercise component not showing', async () => {
        expect(wrapper.findComponent(ExerciseItem).exists()).toBeFalsy();
    });

    test('Workout description showing', () => {
        expect(wrapper.find('p').exists()).toBeTruthy();
    });

    test('Workout description removed', async () => {
        await wrapper.setData({ contracted : false });

        expect(wrapper.find('p').exists()).toBeTruthy();
    });

    test('Exercise component showing', async () => {
        expect(wrapper.findComponent(ExerciseItem).exists()).toBeTruthy();
    });
});
