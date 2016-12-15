import DS from 'ember-data';
import Ember from 'ember';

const { attr, belongsTo } = DS;
const { computed, computed: { gt, lt }} = Ember;

export default DS.Model.extend({
  name: attr(),
  amount: attr('number'),
  transferAmount: computed('amount', function() {
    const amount = this.get('amount');
    return amount * -1;
  }),
  account: belongsTo('account', { inverse: 'items' }),
  transferAccount: belongsTo('account', { inverse: 'transferItems' }),
  income: gt('amount', 0),
  expense: lt('amount', 0),
});
