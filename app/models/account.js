import DS from 'ember-data';
import Ember from 'ember';

const { attr, hasMany } = DS;
const { computed, computed: { filterBy, sum, mapBy, sort } } = Ember;

export default DS.Model.extend({
  name: attr(),
  items: hasMany('item'),

  orderedItems: sort('items', function(a, b) {
    return a.get('amount') < b.get('amount');
  }),

  expenseItems: filterBy('items', 'expense'),
  expenseItemAmounts: mapBy('expenseItems', 'amount'),
  totalExpenses: sum('expenseItemAmounts'),

  incomeItems: filterBy('items', 'income'),
  incomeItemAmounts: mapBy('incomeItems', 'amount'),
  totalIncome: sum('incomeItemAmounts'),

  total: computed('totalIncome', 'totalExpenses', function() {
    return this.get('totalIncome') + this.get('totalExpenses');
  }),
});
