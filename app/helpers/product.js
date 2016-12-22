import Ember from 'ember';

export function product(params/*, hash*/) {
  const [a, b] = params;
  return a * b;
}

export default Ember.Helper.helper(product);
