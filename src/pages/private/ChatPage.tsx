import ChatEmpty from '@/components/documents/ChatEmpty';
import ChatTextArea from '@/components/documents/ChatTextArea';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const ChatPage = () => {
  return (
    <CardContent className="w-full min-h-(--main-h)">
      <Card className="w-full h-full flex flex-col items-center justify-center">
        <ChatEmpty />

        <CardFooter className="w-full bg-background border-0">
          <ChatTextArea />
        </CardFooter>
      </Card>
    </CardContent>
  );
};

export default ChatPage;
