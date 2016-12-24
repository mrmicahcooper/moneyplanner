import DS from 'ember-data';
import Ember from 'ember';

const { attr, hasMany } = DS;
const { computed, computed: { filterBy, sum, mapBy, sort } } = Ember;

export default DS.Model.extend({

  name: attr(),

  items: hasMany('item', { dependent: 'destroy', inverse: 'account' }),

  transferItems: hasMany('item', { inverse: 'transferAccount' }),

  allItems: computed('items', 'transferItems', function() {
    return this.get('items').toArray().concat(
      this.get('transferItems').toArray()
    );
  }),

  orderedItems: sort('allItems', function(a, b) {
    return a.get('amount') < b.get('amount');
  }),

  expenseItems: filterBy('items', 'expense'),
  expenseItemAmounts: mapBy('expenseItems', 'amount'),
  totalExpenses: sum('expenseItemAmounts'),

  expenseTransferItems: filterBy('transferItems', 'transferExpense'),
  expenseTransferItemAmounts: mapBy('expenseTransferItems', 'transferAmount'),
  totalTransferExpenses: sum('expenseTransferItemAmounts'),

  incomeItems: filterBy('items', 'income'),
  incomeItemAmounts: mapBy('incomeItems', 'amount'),
  totalIncome: sum('incomeItemAmounts'),

  incomeTransferItems: filterBy('transferItems', 'transferIncome'),
  incomeTransferItemAmounts: mapBy('incomeTransferItems', 'transferAmount'),
  totalTransferIncome: sum('incomeTransferItemAmounts'),

  allIncome: computed('totalIncome', 'totalTransferIncome', function(){
    return this.get('totalIncome') + this.get('totalTransferIncome');
  }),

  allExpenses: computed('totalExpenses', 'totalTransferExpenses', function() {
    return this.get('totalExpenses') + this.get('totalTransferExpenses');
  }),

  total: computed('allIncome', 'allExpenses', function() {
    return this.get('allIncome') + this.get('allExpenses');
  }),

});
