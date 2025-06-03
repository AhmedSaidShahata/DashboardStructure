import { mountComponent, deepClone,checkInput, mockingApiCreate, mockingApiUpdate, mockingApiGet } from "@/utils/testUtils";
import { describe, it, expect, beforeEach, vi } from 'vitest';
import component from './index.vue';

import { form, post, get, router, resetData, formData, isEdit } from './index.js';

let wrapper = mountComponent(component);

describe(`test component inputs`, () => {
    it("test validations", () => {
        checkInput(wrapper, '[name="name"]', "required");

    });
});


describe('test moking api create', () => {
    isEdit.value = false;
    form.value = {
        name: "Topic",

    },
        describe('called api create data', () => {
            return mockingApiCreate(wrapper, '/topics', form, 'submited', post, formData(), true, resetData, router)
        });
});


describe('test moking api update', () => {
    isEdit.value = true;
    form.value = {
        name: "Topic Update",
    },
        describe('called api update data', () => {
            return mockingApiUpdate(wrapper, '/topics/1', form, 'submited', post, formData(), true, resetData, router)
        });
});


describe('test moking api show', () => {
    describe('called api show data', () => {
        return mockingApiGet(wrapper, '/topics/1', 'handleShow', get)
    });
});

