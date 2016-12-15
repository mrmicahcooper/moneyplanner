import Ember from 'ember';
export default Ember.Route.extend({

  model() {
    return Ember.RSVP.hash({
      accounts: this.store.peekAll('account')
    });
  },

  beforeModel() {
    this.store.createRecord('account', {
      name: "Checking Account",
      items: [
        this.store.createRecord('item', {
          name: 'item',
          amount: 99
        }),
        this.store.createRecord('item', {
          name: 'item',
          amount: 99
        })
      ]
    });
    this.store.createRecord('account', {
      name: "Savings Account",
      items: [
        this.store.createRecord('item', {
          name: 'item',
          amount: -99
        }),
        this.store.createRecord('item', {
          name: 'item',
          amount: 99
        })
      ]
    });
  }

});
