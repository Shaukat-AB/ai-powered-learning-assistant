import { useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { SendHorizonalIcon } from 'lucide-react';

const ChatTextArea = ({
  onSubmit,
  isLoading = false,
}: {
  onSubmit: (_text: string) => void;
  isLoading?: boolean;
}) => {
  const [text, setText] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(text);
        setText('');
      }}
      className="w-full flex items-center justify-center gap-2"
    >
      <Textarea
        name="prompt"
        className="flex-1 max-w-full resize-none break-all min-h-0"
        placeholder="Ask here."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        type="submit"
        size={'lg'}
        disabled={!text || isLoading}
        variant={'accent-alt'}
      >
        <SendHorizonalIcon />
      </Button>
    </form>
  );
};

export default ChatTextArea;
