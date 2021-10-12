import 'jest'
import { shallowMount } from '@vue/test-utils'

import HelloHeader from '../../src/components/HelloHeader.vue'
import store from '../../src/store/index'

const wrapper = shallowMount(HelloHeader, {
  props: {
    header: 'Peter Heilbo Ratgen'
  },
  global: {
    plugins: [store]
  }
})

describe('Contents for the rendered header', () => {
  test('Contents of header', () => {
    const domWrapper = wrapper.find('h1')
    expect(domWrapper.text()).toEqual('Hej, Peter')
  })
})
