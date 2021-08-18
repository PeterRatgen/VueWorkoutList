import 'jest';
import { mount } from '@vue/test-utils';
import WorkoutView from '../../src/views/WorkoutView.vue';

describe('WorkoutView', () => {
    it('has-data', () => {
        expect(typeof WorkoutView.data).toBe('function');
    });
});


describe('Mount the WorkoutView', () => {
  const wrapper = mount(WorkoutView);

  test('Has wokrout', () => {
    expect(wrapper.getComponent("Workout")).toBeTruthy();
  });
});
