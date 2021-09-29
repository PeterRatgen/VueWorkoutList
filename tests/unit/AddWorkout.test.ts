import 'jest'
import { shallowMount } from '@vue/test-utils'

import AddWorkout from '../../src/components/AddWorkout.vue'

import { workout } from '../testData'
import mitt from 'mitt'

const wrapper = shallowMount(AddWorkout, {
  data () {
    return {
      exerciseList: workout.exerciseList,
      title: 'title'
    }
  },
  global: {
    provide: {
      emitter: mitt()
    },
    stubs: ['fa']
  }
})

describe('AddWorkout component', () => {
  it('can display WorkoutForm', async () => {
    let form = wrapper.find('[class="add-form"]')
    expect(form.exists()).toBeFalsy()

    const btn = wrapper.find('[class="add-card"]')
    await btn.trigger('click')

    form = wrapper.find('[class="add-form"]')
    expect(form.exists()).toBeTruthy()
  })

  it('can collapse on button', async () => {
    const btn = wrapper.find('[data-test="collapseBtn"]')
    await btn.trigger('click')

    const form = wrapper.find('[class="add-form"]')
    expect(form.exists()).toBeFalsy()
    expect(wrapper.vm.$data.createButton).toBeTruthy()
  })

  it('can submit data on save press', async () => {
    await wrapper.setData({ createButton: false })

    const btn = wrapper.find('[data-test="saveBtn"]')
    await btn.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('new-workout')

    expect(wrapper.emitted()['new-workout'][0]).toStrictEqual([{
      title: 'title',
      exerciseList: workout.exerciseList
    }])
  })
})
