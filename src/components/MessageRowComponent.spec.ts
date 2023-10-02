
import { mount } from "@vue/test-utils";
import MessageRowComponent from "./MessageRowComponent.vue";
import { describe, it, expect } from "vitest";

describe("Message Row Component", () => {
  it("Check message content.", () => {
    const isReceiveMessage = true;
    const message = "Test Message";
    const wrapper = mount(MessageRowComponent, {
      props: { isReceiveMessage, message },
    });

    expect(wrapper.text()).toBe(message)
  });

  it("It should be green when it is a received message.", () => {
    const isReceiveMessage = true;
    const message = "Test Message";
    const wrapper = mount(MessageRowComponent, {
      props: { isReceiveMessage, message },
    });

    expect(wrapper.find('.bg-green-200').exists()).toBe(true);
    expect(wrapper.find('.bg-white').exists()).toBe(false);
  });

  it("It should be white when it is a received message.", () => {
    const isReceiveMessage = false;
    const message = "Test Message";
    const wrapper = mount(MessageRowComponent, {
      props: { isReceiveMessage, message },
    });

    expect(wrapper.find('.bg-white').exists()).toBe(true);
    expect(wrapper.find('.bg-green-200').exists()).toBe(false);
  });
});

