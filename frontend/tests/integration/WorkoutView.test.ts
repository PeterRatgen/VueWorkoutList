import 'jest';
import { mount, flushPromises } from '@vue/test-utils';

import WorkoutView from '../../src/views/WorkoutView.vue';

const wrapper = mount(WorkoutView, {
    global: {
        stubs : ['fa']
    }
});

describe('Editing workout',() => {
    it('editing title', async() => {
        flushPromises();
        flushPromises();
        let dotBtn = wrapper.find('icon-container');
    });
});
