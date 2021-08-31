import 'jest';
import { shallowMount } from '@vue/test-utils';

import ExerciseItem from '../../src/components/ExerciseItem.vue';
import Repetition from '../../src/components/Repetition.vue';

import { exercise } from '../testData';
import mitt from 'mitt';

const wrapper = shallowMount(ExerciseItem, {
    data() {
        return {
            contracted : true
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

describe('The closed exerciseItem', () => {
    const header =  wrapper.find('[class="clickable-header"]');
    it('has a header with contents', () => {
        expect(header.exists()).toBeTruthy();
        expect(header.text()).toBe(exercise.name);
    });  

    it('does not display when not hovering', () => {
        const iconContainer =  wrapper.find('[class="icon-container"]');
        expect(iconContainer.exists()).toBeFalsy();
    });

    it('displays trashcan when hovering', async () => {
        const nameHover =  wrapper.find('[class="name"]');
        await nameHover.trigger('mouseover');
        const iconContainer =  wrapper.find('[class="icon-container"]');
        expect(iconContainer.exists()).toBeTruthy();
    });

    it('emits delete-exercise on click of trashcan', async() => {
        const iconContainer =  wrapper.find('[class="icon-container"]');
        await iconContainer.trigger('click');

        const deleteEvent = wrapper.emitted('delete-exercise');
        expect(deleteEvent).toHaveLength(1);
    });


    it('has no Repetition component', () => {
        expect(wrapper.findComponent(Repetition).exists()).toBeFalsy();
    });
});

describe('Contain components', () => {

    test('repetition component', async () => {
        const nameHover =  wrapper.find('[class="name"]');
        await nameHover.trigger('click');

        expect(wrapper.getComponent(Repetition)).toBeTruthy();
    });
});
