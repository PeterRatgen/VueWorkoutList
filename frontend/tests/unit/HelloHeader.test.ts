import 'jest';
import { mount } from '@vue/test-utils';

import HelloHeader from '../../src/components/HelloHeader.vue';

const wrapper = mount(HelloHeader, {
    props : {
        header : "Peter Heilbo Ratgen"
    }
});

describe("Contents for the rendered header", () => {
    test('Contents of header', () => {
        let domWrapper = wrapper.find('h1');
        expect(domWrapper.text()).toEqual("Hej, Peter");
    });
});
