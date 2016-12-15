import Ember from 'ember';


export default Ember.Controller.extend({

  accounts: Ember.computed.readOnly('model.accounts'),
  accountName: null,
  itemAmount: null,
  itemName: null,
  transferAccountName: null,
  transferAccount: Ember.computed('transferAccountName', function() {
    return this.get('accounts').findBy('name', this.get('transferAccountName'));
  }),
  fromAccountName: Ember.computed('accounts', function() {
    return this.get('accounts.firstObject.name');
  }),
  fromAccount: Ember.computed('fromAccountName', function() {
    return this.get('accounts').findBy('name', this.get('fromAccountName'));
  }),

  actions: {
    addAccount() {
      const accountParams = {
        name: this.get('accountName')
      };
      this.store.createRecord('account', accountParams);
      this.setProperties({accountName: null});
    },

    addItem() {
      const itemParams = {
        account: this.get('fromAccount'),
        amount: parseInt(this.get('itemAmount')),
        name: this.get('itemName'),
        transferAccount: this.get('transferAccount'),
      };

      this.store.createRecord('item', itemParams);

      this.setProperties({
        itemAmount: null,
        itemName: null,
      });
    }
  }

});
