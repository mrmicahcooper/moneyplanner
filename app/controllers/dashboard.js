import Ember from 'ember';

const { computed, computed: { readOnly } } = Ember;

export default Ember.Controller.extend({
  months: [ 1,2,3,4,5,6,7,8,9,11,12],
  accounts: readOnly('model.accounts'),
  account: computed('accountId', function() {
    return this.store.peekRecord('account', this.get('accountId'));
  }),

  itemAccountId: computed('accounts', function() {
    return this.get('accounts.firstObject.id');
  }),
  transferAccountId: null,
  itemAmount: null,
  itemName: null,

  actions: {

    addAccount() {
      const accountParams = { name: this.get('accountName') };

      this.store.createRecord('account', accountParams).save();
      this.setProperties({accountName: null});
    },

    add() {
      const itemParams = {
        name: this.get('itemName'),
        amount: parseInt(this.get('itemAmount')),
        account: this.store.peekRecord('account', this.get('itemAccountId')),
        transferAccount: this.store.peekRecord('account', this.get('transferAccountId'))
      };

      this.store.createRecord('item', itemParams).save();
      this.setProperties({ itemAmount: null, itemName: null });
    },

    addItem(account) {
      const itemParams = {
        account,
        accountId: account.get('id'),
        amount: parseInt(account.get('itemAmount')),
        name: account.get('itemName'),
      };

      this.store.createRecord('item', itemParams).save();
      account.setProperties({ itemAmount: null, itemName: null });
    },

    deleteItem(item) {
      item.destroyRecord();
    }

  }
});
