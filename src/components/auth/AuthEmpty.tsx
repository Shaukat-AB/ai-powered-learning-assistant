import { Empty, EmptyContent } from '../ui/empty';
import { Spinner } from '../ui/spinner';

const AuthEmpty = () => {
  return (
    <Empty>
      <EmptyContent>
        <Spinner className="size-12" />
      </EmptyContent>
    </Empty>
  );
};

export default AuthEmpty;
