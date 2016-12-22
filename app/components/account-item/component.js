import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  item: null,
  tagName: 'tr',
  classNameBindings: ['incomeExpense'],

  incomeExpense: computed('item.amount', function() {
    const amount = this.get('item.amount');
    if (amount == 0) { return null; }
    return amount > 0 ? 'income' : 'expense';
  }),

  doubleClick() {
    this.get('item').destroyRecord();
  },

});
