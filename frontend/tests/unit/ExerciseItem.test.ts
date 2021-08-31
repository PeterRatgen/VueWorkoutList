import 'jest';
import { shallowMount } from '@vue/test-utils';

import ExerciseItem from '../../src/components/ExerciseItem.vue';
import Repetition from '../../src/components/Repetition.vue';

import { exercise } from '../testData';

import mitt from 'mitt';

const wrapper = shallowMount(ExerciseItem, {
    data() {
        return {
            contracted : false
        };
    },
    props : {
        exerciseItem : exercise 
    },
    global: {
        provide :  {
            emitter: mitt()
        },
        stubs : ['fa']
    }
});

describe('Test for existence of components', () => {
    test('Repetition component', () => {
        expect(wrapper.getComponent(Repetition)).toBeTruthy();
    });
});
