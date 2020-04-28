import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransacrion {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((total, transaction) => {
      return (total += transaction.type === 'income' ? transaction.value : 0);
    }, 0);

    const outcome = this.transactions.reduce((total, transaction) => {
      return (total += transaction.type === 'outcome' ? transaction.value : 0);
    }, 0);

    const total = income - outcome;
    return { income, outcome, total };
  }

  public create({ title, type, value }: CreateTransacrion): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
