import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <section>
      <CardContent className="flex flex-col gap-1 items-center">
        <CardTitle className="text-6xl">404</CardTitle>
        <CardDescription className="text-xl">
          Page is not found!
        </CardDescription>
        <Button className="text-md mt-2" size={'lg'} asChild>
          <Link to="/">Back to home page</Link>
        </Button>
      </CardContent>
    </section>
  );
};

export default NotFoundPage;
