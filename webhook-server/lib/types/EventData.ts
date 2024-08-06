export interface WebhookEvent {
  op: "INSERT";
  data_source: string;
  data: WebhookData;
  webhook_name: string;
  webhook_id: string;
  id: string;
  delivery_info: DeliveryInfo;
  entity: string;
}

interface WebhookData {
  old: null;
  new: WebhookDataNew;
}

interface WebhookDataNew {
  dest_chain: string;
  amount: string;
  source_chain: string;
  block$: number;
  transaction_hash: string;
  transfer_id: string;
  user: string;
  dest_token: string;
  id: string;
  block_number: string;
  contract_id: string;
  vid: string;
  timestamp: string;
  source_token: string;
  target_price: string;
}

interface DeliveryInfo {
  max_retries: number;
  current_retry: number;
}
