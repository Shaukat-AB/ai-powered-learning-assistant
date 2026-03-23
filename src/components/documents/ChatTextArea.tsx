import { useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { SendHorizonalIcon } from 'lucide-react';

const ChatTextArea = () => {
  const [text, setText] = useState('');

  return (
    <div className="w-full flex items-center justify-center gap-2">
      <Textarea
        className="flex-1 max-w-full resize-none break-all min-h-0"
        placeholder="Ask here."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button size={'lg'} disabled={!text} variant={'accent-alt'}>
        <SendHorizonalIcon />
      </Button>
    </div>
  );
};

export default ChatTextArea;
