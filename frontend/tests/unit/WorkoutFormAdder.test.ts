import 'jest';
import { shallowMount } from '@vue/test-utils';

import WorkoutFormAdder from '../../src/components/WorkoutFormAdder.vue';

import { testData } from '../testData';

const wrapper = shallowMount(WorkoutFormAdder);

describe("The WorkoutFormAdder component", () => {
    it('can set input value', async() =>{
        let input = wrapper.find('[class="header-input"]');
        await input.setValue("Exercise title");

        expect((input.element as any).value).toBe("Exercise title");
    });
});
