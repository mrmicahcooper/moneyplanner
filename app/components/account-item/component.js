import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  model: null,
  account: null,
  tagName: 'tr',
  classNameBindings: ['incomeExpense', 'isTransfer'],

  incomeExpense: computed('amount', function() {
    const amount = this.get('amount');
    if (amount === 0) { return null; }
    if (this.get('model.deleted')) { return 'deleted'; }
    return amount > 0 ? 'income' : 'expense';
  }),

  isTransfer: computed('account', 'model.account', function() {
    return (this.get('model.transferAccount.id') === this.get('account.id'));
  }),

  amount: computed('isTransfer', function() {
    let amount;
    if (this.get('isTransfer')) {
      amount = this.get('model.transferAmount');
    } else {
      amount = this.get('model.amount');
    }
    return amount;
  }),

  doubleClick() {
    const model = this.get('model');
    model.toggleProperty('deleted');
    model.save();
  }

});
