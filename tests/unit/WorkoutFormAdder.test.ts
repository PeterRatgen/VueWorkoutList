import 'jest'
import { shallowMount } from '@vue/test-utils'

import WorkoutFormAdder from '../../src/components/WorkoutFormAdder.vue'
import NewExercise from '../../src/components/NewExercise.vue'
import ExerciseItem from '../../src/components/ExerciseItem.vue'

import { workout } from '../testData'

const wrapper = shallowMount(WorkoutFormAdder, {
  props: {
    exerciseList: workout.exerciseList
  }
})

describe('The WorkoutFormAdder component', () => {
  it('can set input value', async () => {
    const input = wrapper.find('[class="header-input"]')
    await input.setValue('Exercise title')

    expect((input.element as any).value).toBe('Exercise title')
  })

  it('can trigger input, and emits event', async () => {
    const input = wrapper.find('[class="header-input"]')
    await input.trigger('input')

    expect(wrapper.emitted()).toHaveProperty('workout-header')
  })

  it('displays all the exercises in prop', async () => {
    const exercises = wrapper.findAllComponents(ExerciseItem)
    expect(exercises.length).toBe(workout.exerciseList.length)
  })

  it('contains the NewExercise component', async () => {
    expect(wrapper.findComponent(NewExercise).exists()).toBeTruthy()
  })
})
