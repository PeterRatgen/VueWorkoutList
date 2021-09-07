import 'jest';
import { shallowMount } from '@vue/test-utils';

import { workout } from '../testData';

import WorkoutDisplay from '../../src/components/WorkoutDisplay.vue';
import HoverMenu from '../../src/components/HoverMenu.vue';

const wrapper = shallowMount(WorkoutDisplay, {
    props : {
        exercise : workout.exerciseList[0]
    },
    global: {
        stubs : ['fa']
    }
});

describe("The WorkoutDisplay component", () => {
    it("has the correct title", async () => {
        const title = wrapper.find('h3');
        expect(title.text()).toBe(workout.exerciseList[0].name);
    });

    it("contains the Hover Menu component", async () => {
        expect(wrapper.findComponent(HoverMenu).exists()).toBeTruthy();
    });

    let repRows = wrapper.findAll('[class="repetition-row"]');

    it("has the reps expanded", async () => {
        expect(wrapper.vm.$data.contracted).toBeFalsy();

        //show all the reps
        expect(repRows.length).toBe(3);
    });

    it("has the correct index", async () => {
        for (let i in repRows) {
            let index = repRows[i].find('[data-test="index"]');
            let num : number = parseInt(i) + 1;
            expect(index.text()).toBe(num.toString());
        }
    });

    it('has the correct weight', async () => {
        for (let i in repRows) {
            let index = repRows[i].find('[data-test="weight"]');
            expect(index.text()).toBe(workout.exerciseList[0].set[i].weight.toString());
        }
    });

    it('has the correct repetitions', async () => {
        for (let i in repRows) {
            let index = repRows[i].find('[data-test="repetitions"]');
            expect(index.text()).toBe(workout.exerciseList[0].set[i].repetitions.toString());
        }
    });

    it('can approve workout', async () => {
        for (let i in repRows) {
            let btn = repRows[i].find('[data-test="checkmark"]');
            await btn.trigger('click');
            let num : number = parseInt(i) + 1;
            expect(wrapper.emitted()["send-rep"].length).toBe(num);
        }
    });

    it('can display, when all workouts are approved', async () => {
        let done = wrapper.find('[data-test="done-exercise"]');
        expect(done.text()).toBe("Øvelse færdig, 0 kg x 3 sæt");
    });

    it('can skip an exercise', async () => {
        let work = workout.exerciseList[0];
        for (let ele of work.set) {
            delete(ele.completed);
        }
        work.skipped = true;

        await wrapper.setProps({ exercise : work });
        await wrapper.setData({ allApproved : false });

        let skippedEx = wrapper.find('[data-test="skipped-exercise"]');
        expect(skippedEx.text()).toBe("Øvelse sprunget over.");
    });

    it('can display a contracted workout', async () => {
        let work = workout.exerciseList[0];
        for (let ele of work.set) {
            delete(ele.completed);
        }
        delete(work.skipped);

        
        await wrapper.setProps({ exercise : work, expand : false});

        let notEx = wrapper.find('[data-test="minimize-exercise"]');
        expect(notEx.text()).toBe("0 kg x 3 sæt");
    });
});
