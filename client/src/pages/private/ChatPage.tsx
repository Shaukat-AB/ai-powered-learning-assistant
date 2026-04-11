import type { DocumentContext, TChat } from '@/components/documents/types';

import { Card, CardContent, CardFooter } from '@/components/ui/card';

import ChatEmpty from '@/components/documents/chat/ChatEmpty';
import ChatTextArea from '@/components/documents/chat/ChatTextArea';
import { ChatPrompt, ChatResponse } from '@/components/documents/chat/chat-box';

import useScrollToEnd from '@/hooks/useScrollToEnd';
import { useChatMutation } from '@/hooks/ai';

import { useState } from 'react';
import { useOutletContext } from 'react-router';

const ChatPage = () => {
  const { doc } = useOutletContext<DocumentContext>();

  const { mutateAsync, isPending, error } = useChatMutation(doc?.name);

  const [chats, setChats] = useState<TChat[]>([]);
  const cardRef = useScrollToEnd([chats]);

  const handlePromptSubmit = async (text = '') => {
    setChats([...chats, { prompt: text, response: '' }]);
    const response = await mutateAsync({
      prompt: text,
    });

    const filtered = chats.filter((chat) => chat.prompt != text);
    if (typeof response == 'string') {
      setChats([...filtered, { prompt: text, response: response }]);
    }
  };

  return (
    <CardContent className="relative w-full h-(--tab-page-h) max-h-(--tab-page-h) pb-16">
      <Card
        ref={cardRef}
        className="w-full h-full py-0 flex items-center justify-end-safe overflow-y-auto"
      >
        {chats.length == 0 ? (
          <ChatEmpty />
        ) : (
          chats.map((chat, i) => (
            <CardContent
              key={chat.prompt}
              className="w-full p-4 flex flex-col gap-5"
            >
              <ChatPrompt text={chat.prompt} />
              <ChatResponse
                text={chat.response}
                error={chats.length - 1 == i ? error : null}
                isLoading={chats.length - 1 == i && isPending}
              />
            </CardContent>
          ))
        )}
      </Card>

      <Card className="ring-0 p-0 w-full h-0">
        <CardFooter className="bg-transparent py-0 w-full flex absolute bottom-0 left-0 border-0">
          <CardContent className="w-full bg-background py-2">
            <ChatTextArea onSubmit={handlePromptSubmit} isLoading={isPending} />
          </CardContent>
        </CardFooter>
      </Card>
    </CardContent>
  );
};

export default ChatPage;
