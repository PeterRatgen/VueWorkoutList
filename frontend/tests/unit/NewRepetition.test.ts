import 'jest';
import { shallowMount } from '@vue/test-utils';

import NewRepetition from '../../src/components/repetitions/NewRepetition.vue';

const wrapper = shallowMount(NewRepetition, {
    global: {
        stubs : ['fa']
    }
});

describe("NewRepetition component", () => {
    it("emits on click", async () => {
        const btn = wrapper.find('[class="add-exercise-button"]');
        await btn.trigger('click');
        
        expect(wrapper.emitted()).toHaveProperty("new-repetition");
    });
});
