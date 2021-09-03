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

describe('Repetition editing', () => {
    it('can toggle editing mode', async() => {
        let editWeight = wrapper.find('[data-test="expanded-weight"]');
        expect(editWeight.exists()).toBeFalsy();
        const repContainer = wrapper.find('[data-test="repetition-clicker"]');
        
        await repContainer.trigger('click');

        editWeight = wrapper.find('[data-test="expanded-weight"]');
        expect(editWeight.exists()).toBeTruthy();
    });

    it('can increase weight', async() => {
        let repCount = wrapper.find('[data-test="weight-count"]');
        let count : number = parseFloat(repCount.text());

        const minusweight = wrapper.find('[data-test="weight-plus"]');
        await minusweight.trigger('click');

        repCount = wrapper.find('[data-test="weight-count"]');
        let countPost  : number = parseFloat(repCount.text());
        
        expect(count).toBeLessThan(countPost);
    });

    it('can reduce weight', async() => {
        let repCount = wrapper.find('[data-test="weight-count"]');
        let count : number = parseFloat(repCount.text());

        const minusweight = wrapper.find('[data-test="weight-minus"]');
        await minusweight.trigger('click');

        
        let newRepCount = wrapper.find('[data-test="weight-count"]');
        let innerText = newRepCount.text();
        let countPost  : number = parseFloat(innerText);
        
        expect(count).toBeGreaterThan(countPost);
    });
});
