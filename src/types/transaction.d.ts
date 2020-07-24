/**
 * Transactions
 * Description: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/inventory/stock-transactions.html
 * DOCS:
 */
import { CrudQueryableResource } from './core';

/**
 * Core Transaction Base Interface
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/inventory/stock-transactions.html
 */
export interface TransactionBase {
  id?: string
  type: string
  action: string
  product_id: string
  quantity: number
}

/**
 * Transaction Endpoints
 */
export interface TransactionEndpoint extends CrudQueryableResource<TransactionBase, null, null, null> {
  endpoint: 'transaction'

  Capture<T = any>(options: {
    order: string
    transaction: string
  }): Promise<T>

  Refund<T = any>(options: { order: string; transaction: string }): Promise<T>
}