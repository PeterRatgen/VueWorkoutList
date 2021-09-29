import 'jest'
import { shallowMount } from '@vue/test-utils'

import WorkoutResult from '../../src/components/WorkoutResult.vue'

import mitt from 'mitt'

const wrapper = shallowMount(WorkoutResult, {
  global: {
    provide: {
      emitter: mitt()
    },
    stubs: ['fa']
  }
})

describe('WorkoutResult component', () => {
  it('emits remove on click', async () => {
    const cross = wrapper.find('[class="cross"]')
    await cross.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('ended')
  })
})
