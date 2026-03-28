import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

const TotalCard = ({ title = 'Total', count = 0 }) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{count}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default TotalCard;
