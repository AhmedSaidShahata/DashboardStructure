import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import { createPinia } from 'pinia'


vi.mock('@/composables/useApi', () => ({
  default: vi.fn(() => ({
    post: vi.fn(),
    get: vi.fn(),
    errorsResponse: ref(null),
    loading: ref(false),
  })),
}));

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
  useRoute: vi.fn(() => ({
    params: { id: '1' },
  })),
}));

// Mock $t function
const mockI18n = {
  install(app) {
    app.config.globalProperties.$t = (key) => key;
  },
};

export function mountComponent(wrapper) {
  const pinia = createPinia();
  return mount(wrapper, {
    global: {
      plugins: [pinia, mockI18n],
    },
  });
}
export function checkValidation(wrapper, selector, expectedValidation) {
  const formGroup = wrapper.find(selector);
  expect(formGroup.exists()).toBe(true);
  expect(formGroup.attributes("validation")).toBe(expectedValidation);
}


export const mockingApiCreate = async (wrapper, endPoint, form, method, post, expected, reset = false, resetData, router, redirect = null) => {

  post.mockResolvedValueOnce(form);
  await wrapper.vm[method]();
  it("expected mocking call api with expected url and data ", () => {
    expect(post).toHaveBeenCalledWith(endPoint, expected);
  });

  if (redirect) {
    it("expected call route with expected route ", () => {
      expect(router.push).toHaveBeenCalledWith(redirect);
    });
  }

  if (reset) {
    await wrapper.vm[resetData];
  }
};


export const mockingApiUpdate = async (wrapper, endPoint, form, method, post, expected, reset = false, resetData, router, redirect = null) => {

  post.mockResolvedValueOnce(form);
  await wrapper.vm[method]();
  it("expected mocking call api with expected url and data ", () => {
    expect(post).toHaveBeenCalledWith(endPoint, expected);
  });

  if (redirect) {
    it("expected call route with expected route ", () => {
      expect(router.push).toHaveBeenCalledWith(redirect);
    });
  }

  if (reset) {
    await wrapper.vm[resetData];
  }
};



export const mockingApiGet = async (wrapper, endPoint,method, get) => {

  get.mockResolvedValueOnce();
  await wrapper.vm[method]();
  it("expected mocking call api with expected url ", () => {
    expect(get).toHaveBeenCalledWith(endPoint)
  });

};

export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(deepClone);
  }

  const clonedObj = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }

  return clonedObj;
}