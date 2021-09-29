import 'jest'
import { shallowMount } from '@vue/test-utils'

import Picker from '../../src/components/Picker.vue'

import mitt from 'mitt'

const wrapper = shallowMount(Picker, {
  data () {
    return {
      data: 10,
      unit: 'kg',
      steps: 2.5
    }
  },
  global: {
    provide: {
      emitter: mitt()
    },
    stubs: ['fa']
  }
})

describe('The Picker component: ', () => {
  it('has the data', async () => {
    const data = wrapper.find('[data-test="data"]')
    expect(data.text()).toBe('10')
  })

  it('has the unit', async () => {
    const unit = wrapper.find('[data-test="unit"]')
    expect(unit.text()).toBe('kg')
  })

  it('can decrease and increase on press', async () => {
    const minus = wrapper.find('[data-test="decrease"]')

    await minus.trigger('click')

    let data = wrapper.find('[data-test="data"]')
    expect(data.text()).toBe('7.5')

    const plus = wrapper.find('[data-test="increase"]')
    await plus.trigger('click')

    data = wrapper.find('[data-test="data"]')
    expect(data.text()).toBe('10')
  })
})
