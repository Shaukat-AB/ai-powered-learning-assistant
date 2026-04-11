import { Card, CardHeader, CardTitle } from '../ui/card';
import { Check } from 'lucide-react';

import { strPadZeros } from '@/lib/utils';

const TotalCard = ({
  title = 'Total Data',
  count = 0,
  iconProps = {
    Component: Check,
    className: '',
  },
}) => {
  return (
    <Card className="w-full group document-card-w">
      <CardHeader className="flex gap-6 items-center">
        <iconProps.Component
          className={`text-primary ring-2 p-2 size-12 rounded-full ${iconProps.className}`}
        />

        <div className="space-y-2">
          <p className="text-xl">
            <strong>{strPadZeros(count)}</strong>
          </p>
          <CardTitle className="text-sm text-muted-foreground">
            <h2>{title}</h2>
          </CardTitle>
        </div>
      </CardHeader>
    </Card>
  );
};

export default TotalCard;
