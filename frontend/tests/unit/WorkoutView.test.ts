import { mount } from '@vue/test-utils';
import WorkoutView from '../../src/views/WorkoutView.vue';

describe('WorkoutView', () => {
    it('has-data', () => {
        expect(typeof WorkoutView.data).toBe('function');
    });
});

describe('Mounted App', () => {
  const wrapper = mount(WorkoutView);

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
