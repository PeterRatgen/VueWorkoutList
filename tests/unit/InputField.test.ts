import 'jest'
import { shallowMount } from '@vue/test-utils'

import InputField from '../../src/components/InputField.vue'

const wrapper = shallowMount(InputField, {
  props: {
    initialValue: 'Hej, Peter'
  }
})

it('displays the value', async () => {
  const input = wrapper.find('[class="header-input"]')
  expect((input.element as any).value).toBe('Hej, Peter')
})

it('can set the value of the input field', async () => {
  let input = wrapper.find('[class="header-input"]')
  await input.setValue('Hej, untitled')

  input = wrapper.find('[class="header-input"]')
  expect((input.element as any).value).toBe('Hej, untitled')
})

it('emits on blur', async () => {
  const input = wrapper.find('[class="header-input"]')

  await input.trigger('blur')

  expect(wrapper.emitted()).toHaveProperty('result')
})
