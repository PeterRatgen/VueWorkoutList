import 'jest'
import { shallowMount } from '@vue/test-utils'

import HoverMenu from '../../src/components/HoverMenu.vue'

const items = ['Slet øvelse', 'nyt navn']
const wrapper = shallowMount(HoverMenu, {
  props: {
    menuItems: items
  }
})

describe('HoverMenu component', () => {
  it('can display the menuItems', () => {
    const paragraphs = wrapper.findAll('p')
    expect(paragraphs.length).toBe(2)
  })

  it('can emit on click of the menu-item', async () => {
    const buttons = wrapper.findAll('[class="menu-item"]')
    for (const i in buttons) {
      await buttons[i].trigger('click')
      expect(wrapper.emitted().option[i]).toStrictEqual([items[i]])
    }
  })
})
