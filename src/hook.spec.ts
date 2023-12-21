import { it, describe, expect, jest } from "bun:test";
import storeHook from "./hook";

/** The Hooks API basically tests the same thing as the store,
 *  but instead of `.get` it calls the hook.
 **/
describe("Store hook API", () => {
  it("has undefined state", () => {
    const store = storeHook<string | undefined>(undefined);

    expect(store()).toBeUndefined();
  });

  it("has the initial state", () => {
    const store = storeHook("initial state");

    expect(store()).toEqual("initial state");
  });

  it("updates the state", () => {
    const store = storeHook<string>("initial state");

    store.set("updated state");

    expect(store()).toEqual("updated state");
  });

  it("notifies subscribers of state changes", () => {
    const store = storeHook<string>("initial state");

    const subscriber = jest.fn();

    store.subscribe(subscriber);

    store.set("updated state");

    expect(subscriber).toHaveBeenCalledTimes(1);
  });

  it("unsubscribes subscribers", () => {
    const store = storeHook<string>("initial state");

    const subscriber = jest.fn().mockReset();

    const unsubscribe = store.subscribe(subscriber);

    unsubscribe();

    store.set("updated state");

    expect(subscriber).not.toHaveBeenCalled();
  });
});
