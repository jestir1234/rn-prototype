import { Price } from '../entities/Price.js'

Price.prototype.format = function() {
  switch(this.currency) {
    case "GBP": return '\u00A3' + this.amount;
    case "USD": return '$' + this.amount;
    case "EUR": return this.amount + ' \u20AC';
    default: return this.amount;
  }
};
