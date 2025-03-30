import { ChatDto, MessageDto, ModelDto } from "@/pages/chats/api/dto";
import { Chat, Message, Model } from "@/pages/chats/model/chats-slice";

export const mapChatDtoToChat = (chat: ChatDto): Chat => ({
  id: chat.id,
  name: chat.name,
  modelId: chat.model_id,
  createdAt: chat.created_at,
});

export const mapMessageDtoToMessage = (message: MessageDto): Message => ({
  id: message.id,
  role: message.role,
  content: message.content,
  tokens: message.tokens,
  createdAt: message.created_at,
  modelId: message.model_id,
  parentModel: message.model?.parent ?? null,
});

export const mapModelDtoToModel = (model: ModelDto): Model => ({
  id: model.id,
  label: model.label,
});
