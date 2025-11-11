// Uncomment the code below and write your tests
import { BankAccount, getBankAccount, InsufficientFundsError, SynchronizationFailedError, TransferFailedError } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 10000;
    const account = getBankAccount(initialBalance);
    
    expect(account).toBeInstanceOf(BankAccount);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 500;
    const account = getBankAccount(initialBalance);
    const withdrawAmount = 600;

    expect(() => account.withdraw(withdrawAmount)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = getBankAccount(500);
    const account2 = getBankAccount(200);
    const transferAmount = 600;

    expect(() => account1.transfer(transferAmount, account2)).toThrow(InsufficientFundsError);
    expect(account1.getBalance()).toBe(500);
    expect(account2.getBalance()).toBe(200)
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(1000);

    expect(() => account.transfer(100, account)).toThrow(TransferFailedError);
    expect(() => account.transfer(100, account)).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const initialBalance = 1000;
    const depositCount = 500;
    const account = getBankAccount(initialBalance);

    account.deposit(depositCount);
    expect(account.getBalance()).toBe(initialBalance + depositCount);
  });

  test('should withdraw money', () => {
   const initialBalance = 1000;
   const withdrawCount = 500;

   const account = getBankAccount(initialBalance);
   account.withdraw(withdrawCount)
   expect(account.getBalance()).toBe(initialBalance-withdrawCount)
  });

  test('should transfer money', () => {
    const initialBalance1 = 1000;
    const initialBalance2 = 500;
    const transferAmount = 300;
    const account1 = getBankAccount(initialBalance1);
    const account2 = getBankAccount(initialBalance2);

    account1.transfer(transferAmount, account2);

    expect(account1.getBalance()).toBe(initialBalance1 - transferAmount);
    expect(account2.getBalance()).toBe(initialBalance2 + transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(1000);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(750);
    const balance = await account.fetchBalance();
    
    expect(typeof balance).toBe('number');
    expect(balance).toBe(750);
    
    jest.restoreAllMocks();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 1000;
    const newBalance = 500;
    const account = getBankAccount(initialBalance);
    
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(newBalance);
    
    await account.synchronizeBalance();
    
    expect(account.getBalance()).toBe(newBalance);
    expect(account.fetchBalance).toHaveBeenCalledTimes(1);
    
    jest.restoreAllMocks();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(1000);
    
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    
    await expect(account.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);
    
    expect(account.getBalance()).toBe(1000);
    
    jest.restoreAllMocks();
  });
});
