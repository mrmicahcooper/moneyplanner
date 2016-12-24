import DS from 'ember-data';
import Ember from 'ember';

const { attr, belongsTo } = DS;
const { computed, computed: { gt, lt }} = Ember;

export default DS.Model.extend({
  name: attr(),
  amount: attr('number'),
  account: belongsTo('account'),
  transferAccount: belongsTo('account', { inverse: 'transferItems' }),
  income: gt('amount', 0),
  expense: lt('amount', 0),
});
