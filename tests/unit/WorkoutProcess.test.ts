import 'jest'
import { shallowMount } from '@vue/test-utils'

import WorkoutProcess from '../../src/views/WorkoutProcess.vue'
import WorkoutDisplay from '../../src/components/WorkoutDisplay.vue'
import Picker from '../../src/components/Picker.vue'
import WorkoutResult from '../../src/components/WorkoutResult.vue'

import { workout } from '../testData'
import store from '../../src/store/index'

const wrapper = shallowMount(WorkoutProcess, {
  global: {
    stubs: ['fa'],
    plugins: [store]
  }
})

describe('The WorkoutProcess component', () => {
  it('contains WorkoutDisplay', () => {
    expect(wrapper.findComponent(WorkoutDisplay).exists()).toBeTruthy()
  })

  it('contains Picker', () => {
    expect(wrapper.findComponent(Picker)).toBeTruthy()
  })

  it('contains WorkoutResult', () => {
    expect(wrapper.findComponent(WorkoutResult)).toBeTruthy()
  })

  it('can return', async () => {
    const btn = wrapper.find('[class="back-button"]')
    await btn.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('back')
  })

  it('displays the correct title', async () => {
    const title = wrapper.find('[class="header"]')
    expect(title.text()).toBe(workout.title)
  })
})
