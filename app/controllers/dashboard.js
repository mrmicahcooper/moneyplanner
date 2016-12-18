import Ember from 'ember';

export default Ember.Controller.extend({
  accounts: Ember.computed.readOnly('model.accounts'),
  accountId: Ember.computed('accounts', function() {
    return this.get('accounts.firstObject.id');
  }),
  itemAmount: null,
  itemName: null,

  actions: {
    addAccount() {
      const accountParams = {
        name: this.get('accountName')
      };
      this.store.createRecord('account', accountParams);
      this.setProperties({accountName: null});
    },

    addItem() {
      const accountId =  this.get('accountId');
      const account = this.store.peekRecord('account', accountId);
      const itemParams = {
        account,
        amount: parseInt(this.get('itemAmount')),
        name: this.get('itemName'),
      };

      this.store.createRecord('item', itemParams);

      this.setProperties({
        itemAmount: null,
        itemName: null,
      });
    }
  }

});
