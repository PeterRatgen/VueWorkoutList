import 'jest'
import { shallowMount } from '@vue/test-utils'

import ExerciseItem from '../../src/components/ExerciseItem.vue'
import Repetition from '../../src/components/Repetition.vue'
import NewRepetition from '../../src/components/repetitions/NewRepetition.vue'
import InputField from '../../src/components/InputField.vue'

import { exercise } from '../testData'
import { store } from '../../src/store/index'

const wrapper = shallowMount(ExerciseItem, {
  data () {
    return {
      contracted: true
    }
  },
  global: {
    stubs: ['fa'],
    plugins: [store]
  }
})

function delEx () {
  it('displays trashcan when hovering', async () => {
    const nameHover = wrapper.find('[class="name"]')
    await nameHover.trigger('mouseover')
    const iconContainer = wrapper.find('[class="icon-container"]')
    expect(iconContainer.exists()).toBeTruthy()
  })

  it('emits delete-exercise on click of trashcan', async () => {
    const iconContainer = wrapper.find('[class="icon-container"]')
    await iconContainer.trigger('click')
  })

  it('has a set counter', async () => {
    const iconContainer = wrapper.find('[test-data="set-counter"]')
    const correctText = '3 sæt'
    expect(iconContainer.text()).toBe(correctText)
  })
}

describe('The closed exerciseItem', () => {
  const header = wrapper.find('[class="clickable-header"]')
  it('has a header with contents', () => {
    expect(header.exists()).toBeTruthy()
    expect(header.text()).toBe(exercise.name)
  })

  it('does not display when not hovering', () => {
    const iconContainer = wrapper.find('[class="icon-container"]')
    expect(iconContainer.exists()).toBeFalsy()
  })

  delEx()

  it('does not have an input field', async () => {
    const input = wrapper.findComponent(InputField)
    expect(input.exists()).toBeFalsy()
  })

  it('has no Repetition component', () => {
    expect(wrapper.findComponent(Repetition).exists()).toBeFalsy()
  })
})

describe('The expanded Exercise component', () => {
  it('expands when clicked upon', async () => {
    const nameHover = wrapper.find('[class="name"]')
    await nameHover.trigger('click')

    expect((wrapper.vm.$data as {contracted : boolean}).contracted).toBeFalsy()
  })

  delEx()

  it('has an input field', async () => {
    const input = wrapper.findComponent(InputField)
    expect(input.exists()).toBeTruthy()
  })

  it('has repetition component', async () => {
    expect(wrapper.getComponent(Repetition)).toBeTruthy()
  })

  it('has the NewRepetition', async () => {
    expect(wrapper.getComponent(NewRepetition)).toBeTruthy()
  })
})
