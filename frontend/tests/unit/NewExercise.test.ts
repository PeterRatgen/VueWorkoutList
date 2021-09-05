import 'jest';
import { shallowMount } from '@vue/test-utils';

import NewExercise from '../../src/components/NewExercise.vue';


const wrapper = shallowMount(NewExercise, {
    global: {
        stubs : ['fa']
    }
});

describe("NewExercise component", () => {
    it("has the plus icon", async() => {
        let plus = wrapper.find('[class="plus-icon"]');
        expect(plus.exists()).toBeTruthy();
    });

    it("emits the add-exercise", async() => {
        let btn = wrapper.find('[class=add-exercise-button]');
        await btn.trigger("click");

        expect(wrapper.emitted()).toHaveProperty("add-exercise");
    });
});
