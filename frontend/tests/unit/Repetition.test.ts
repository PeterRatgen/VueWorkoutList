import 'jest';
import { shallowMount } from '@vue/test-utils';

import Repetition from '../../src/components/Repetition.vue';

import { repetition } from '../testData';
import mitt from 'mitt';

const wrapper = shallowMount(Repetition, {
    props : {
        repetition : repetition 
    },
    global: {
        provide :  {
            emitter: mitt()
        },
        stubs : ['fa']
    }
});

describe('Repetition when not editing', () => {
    it('has weight and reps', () => {
        const text = wrapper.find('[data-test="no-edit-weight"]');
        expect(text.text()).toBe("10 kg x 12");
    });

    it('has reps only, when weight is 0', async() => {
        const newRep = repetition;
        newRep.weight = 0;

        await wrapper.setData({repItem : newRep});

        const text = wrapper.find('[data-test="no-edit-rep"]');

        expect(text.text()).toBe("12 reps");
    });
});
