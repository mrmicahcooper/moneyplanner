import Ember from 'ember';

export function incomeExpense(number/*, hash*/) {
  if (number == 0) { return null; }
  return number > 0 ? 'income' : 'expense';
}

export default Ember.Helper.helper(incomeExpense);
