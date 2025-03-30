export type ChatDto = {
  id: string;
  group_id: string;
  user_id: string;
  name: string;
  total_caps: number;
  highlight: string;
  model_id: string;
  created_at: string;
  model: ModelDto;
};

export type MessageDto = {
  id: string;
  role: "assistant" | "user";
  type: string;
  status: string;
  tokens: number;
  action_type: string;
  user_id: string;
  chat_id: string;
  additional_content: string;
  tg_bot_message_id: string;
  disabled: boolean;
  content: string;
  request_id: string;
  transaction_id: string;
  model_id: string;
  created_at: string;
  model: { parent: ModelDto };

  transaction: {
    id: string;
    provider: string;
    currency: string;
    meta: Record<string, unknown>;
    amount: number;
    status: string;
    type: string;
    plan_id: string;
    user_id: string;
    referral_id: string;
    external_id: string;
    created_at: string;
  };
};

export type ModelDto = {
  id: string;
  label: string;
  owned_by: string;
  created_at: string;
  modelId: string;
};
