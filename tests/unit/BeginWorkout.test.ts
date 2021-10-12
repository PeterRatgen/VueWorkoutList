import 'jest'
import { shallowMount } from '@vue/test-utils'

import { testData } from '../testData'

import BeginWorkout from '../../src/components/BeginWorkout.vue'

const wrapper = shallowMount(BeginWorkout, {
  props: {
    workouts: testData
  },
  global: {
    stubs: ['fa']
  }
})

describe('BeginWorkout component', () => {
  it('has start training visible', async () => {
    const startBtn = wrapper.find('[class="start-workout"]')
    expect(startBtn.exists()).toBeTruthy()
  })

  it('displays picker on click', async () => {
    const startBtn = wrapper.find('[class="start-workout"]')
    await startBtn.trigger('click')

    const selector = wrapper.find('[class="workout-selector-container"]')
    expect(selector.exists()).toBeTruthy()
  })

  it('shows all the titles the workouts ', async () => {
    const titles = wrapper.findAll('[data-test="workoutTitle"]')

    for (const i in titles) {
      expect(titles[i].text()).toBe(testData[i].title)
    }
  })

  it('emits the correct workouts on press of the workout title', async () => {
    const titles = wrapper.findAll('[data-test="workoutTitle"]')

    for (const i in titles) {
      await titles[i].trigger('click')
      expect(wrapper.emitted()['select-workout'][i]).toStrictEqual([testData[i]])
    }
  })
})
