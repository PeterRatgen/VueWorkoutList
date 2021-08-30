import 'jest';
import { mount } from '@vue/test-utils';

import { workout } from '../testData';

import Workout from '../../src/components/Workout.vue';
import ExerciseItem from '../../src/components/ExerciseItem.vue';
import InputField from '../../src/components/input_field/InputField.vue';
import NewExercise from '../../src/components/NewExercise.vue';

import mitt from 'mitt';


const wrapper = mount(Workout, {
    props : {
        workout : workout
    },
    data() {
        return {
            contracted : true
        };
    },
    global: {
        provide :  {
            emitter: mitt()
        },
        stubs : ['fa']
    }
});

describe('Testing the contracted card', () => {
    test('Exercise component not showing', async () => {
        expect(wrapper.findComponent(ExerciseItem).exists()).toBeFalsy();
    });

    test('Workout description showing', () => {
        expect(wrapper.find('[data-test="description-paragraph"]')
               .exists())
               .toBeTruthy();
    });


    test('Contents of description summary', async () => {
        let desc = wrapper.find('[data-test="description-paragraph"]');
        let html = "Armstrækkere, Squats, Pull-ups";
        expect(desc.text()).toBe(html);
    });
});


describe('Contents of expanding the workout card', () => {
    it('workout description removed on click of card', async () => {

        let workoutItem = wrapper.find('[class="workout-item"]');
        await workoutItem.trigger('click');

        expect(wrapper.find('[data-test="description-paragraph"]')
               .exists())
               .toBeFalsy();
    });


    test('InputField component showing', () => {
        expect(wrapper.findComponent(InputField).exists()).toBeTruthy();
    });

    test('Exercise component showing', () => {
        expect(wrapper.findComponent(ExerciseItem).exists()).toBeTruthy();
    });

    test('Divider before NewExercise ', () => {
        expect(wrapper.find('[class="divder"]').exists()).toBeTruthy();
    });

    test('NewExercise component', () => {
        expect(wrapper.findComponent(NewExercise).exists()).toBeTruthy();
    });
});
