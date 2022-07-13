import { transferCurrency } from '../helpers';
import request from 'supertest';
import app from '../app';

describe('unit tests', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('transferCurrency test', () => {
    // twd
    expect(transferCurrency(1, 'TWD', 'TWD')).toBe('1.00');
    expect(transferCurrency(1, 'TWD', 'USD')).toBe('0.03');
    expect(transferCurrency(1, 'TWD', 'JPY')).toBe('3.67');
    expect(transferCurrency(12345, 'TWD', 'USD')).toBe('405.04');
    expect(transferCurrency(1234567, 'TWD', 'JPY')).toBe('4,529,626.32');
    expect(transferCurrency(321.4567, 'TWD', 'JPY')).toBe('1,179.42');
    // usd
    expect(transferCurrency(1, 'USD', 'USD')).toBe('1.00');
    expect(transferCurrency(1, 'USD', 'TWD')).toBe('30.44');
    expect(transferCurrency(1, 'USD', 'JPY')).toBe('111.80');
    expect(transferCurrency(12345, 'USD', 'TWD')).toBe('375,831.18');
    expect(transferCurrency(12345, 'USD', 'JPY')).toBe('1,380,183.34');
    expect(transferCurrency(321.4567, 'USD', 'JPY')).toBe('35,939.18');
    // jpy
    expect(transferCurrency(1, 'JPY', 'JPY')).toBe('1.00');
    expect(transferCurrency(1, 'JPY', 'TWD')).toBe('0.27');
    expect(transferCurrency(1, 'JPY', 'USD')).toBe('0.01');
    expect(transferCurrency(12345, 'JPY', 'TWD')).toBe('3,327.72');
    expect(transferCurrency(1234567, 'JPY', 'USD')).toBe('10,925.92');
    expect(transferCurrency(321.4567, 'JPY', 'USD')).toBe('2.84');
  });
});

describe('feature tests', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  let path = '/api/currency-transfer';
  let validationDataset = [
    [-100, 'twd', 'usd'],
    ['1,00', 'twd', 'usd'],
    [100, 'hkd', 'usd'],
  ];
  it.each(validationDataset)(
    'invalid price format',
    async (price, from, to) => {
      const response = await request(app.callback()).get(
        `${path}/${price}/${from}/${to}`
      );
      expect(response.statusCode).toBe(422);
    }
  );
  let successDataset = [
    [666, 'twd', 'USD', '21.85'],
    [337.46, 'USD', 'twd', '10,273.63'],
    [295286, 'jpy', 'usd', '2,613.28'],
  ];
  it.each(successDataset)(
    'transfer success',
    async (price, from, to, result) => {
      const response = await request(app.callback()).get(
        `${path}/${price}/${from}/${to}`
      );
      expect(response.statusCode).toBe(200);
      expect(response.body.data.value).toBe(result);
    }
  );
});
