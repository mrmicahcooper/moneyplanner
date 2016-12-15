import Ember from 'ember';

export function incomeExpense(number/*, hash*/) {
  return number > 0 ? 'income' : 'expense';
}

export default Ember.Helper.helper(incomeExpense);
