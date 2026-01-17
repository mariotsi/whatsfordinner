declare const tags: unique symbol;

// Utility to create branded types easily
export type Branded<BaseType, Brand extends PropertyKey> = BaseType & {
  [tags]: { [K in Brand]: void };
};
