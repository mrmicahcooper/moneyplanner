import Ember from 'ember';

const { computed, computed: { alias } } = Ember;

export default Ember.Component.extend({
  model: null,
  account: null,
  tagName: 'tr',
  classNameBindings: ['incomeExpense'],

  incomeExpense: computed('amount', function() {
    const amount = this.get('amount');
    if (amount === 0) { return null; }
    return amount > 0 ? 'income' : 'expense';
  }),

  amount: computed('account', 'model.amount', function() {
    let amount;
    if (this.get('model.transferAccount.id') === this.get('account.id') ) {
      console.log("transfer");
      amount = this.get('model.transferAmount');
    } else {
      console.log("notransfer");
      amount = this.get('model.amount');
    }

    return amount;
  }),

  doubleClick() {
    this.get('model').destroyRecord();
  },

});
