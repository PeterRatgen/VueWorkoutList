import 'jest';
import { shallowMount } from '@vue/test-utils';

import WorkoutProcess from  '../../src/views/WorkoutProcess.vue';

const wrapper = shallowMount(WorkoutProcess, {
    global: {
        stubs : ['fa']
    }
});

describe('The WorkoutProcess component', () => {
    it('can return', async () => {
        let btn = wrapper.find('[class="back-button"]');
        await btn.trigger('click');

        expect(wrapper.emitted()).toHaveProperty("back");
    });
});
