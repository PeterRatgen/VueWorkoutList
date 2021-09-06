import 'jest';
import { shallowMount } from '@vue/test-utils';

import NewRepetition from '../../src/components/NewRepetition.vue';

const items = ["Slet øvelse", "nyt navn"];
const wrapper = shallowMount(NewRepetition);

describe("NewRepetition component", () => {
    it("emits on click", async () => {
        const btn = wrapper.find('[class="add-exercise-button"]');
        await btn.trigger('click');
        
        expect(wrapper.emitted()).toHaveProperty("new-repetition");
    });
});
