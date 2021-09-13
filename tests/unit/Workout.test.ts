import 'jest';
import { shallowMount } from '@vue/test-utils';

import { workout } from '../testData';

import Workout from '../../src/components/Workout.vue';
import ExerciseItem from '../../src/components/ExerciseItem.vue';
import InputField from '../../src/components/InputField.vue';
import NewExercise from '../../src/components/NewExercise.vue';

import mitt from 'mitt';

const wrapper = shallowMount(Workout, {
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
    it('has not got the exercise component showing', async () => {
        expect(wrapper.findComponent(ExerciseItem).exists()).toBeFalsy();
    });

    it('has header containing the correct title', async () =>{
        const header = wrapper.find('#title');

        expect(header.exists()).toBeTruthy();
        expect(header.text()).toBe(workout.title);
    });

    it('has workout description showing', () => {
        expect(wrapper.find('[data-test="description-paragraph"]')
               .exists())
               .toBeTruthy();
    });


    it('has correct contents of description summary', async () => {
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

import HoverMenu from '../../src/components/HoverMenu.vue';

describe('Dots on workout card', () => {
    const dotBtn = wrapper.find('[class="icon-container"]');
    it('can show HoverMenu on click', async () => {
        expect(wrapper.findComponent(HoverMenu).exists()).toBeFalsy();
        await dotBtn.trigger('click');
        expect(wrapper.findComponent(HoverMenu).exists()).toBeTruthy();
    });

    it('removes HoverMenu on second click on dots', async() => {
        expect(wrapper.findComponent(HoverMenu).exists()).toBeTruthy();
    
        await dotBtn.trigger('click');

        expect(wrapper.findComponent(HoverMenu).exists()).toBeFalsy();
    });

    it('removes HoverMenu on clicking outside', async() => {
        await dotBtn.trigger('click');
        expect(wrapper.findComponent(HoverMenu).exists()).toBeTruthy();
    
        const outside = wrapper.find('[class="outside"]');
        await outside.trigger('click');

        expect(wrapper.findComponent(HoverMenu).exists()).toBeFalsy();
    });
});
