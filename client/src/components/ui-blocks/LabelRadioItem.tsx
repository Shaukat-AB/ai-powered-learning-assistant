import { CircleCheck, CircleX } from 'lucide-react';

import { Label } from '../ui/label';
import { RadioGroupItem } from '../ui/radio-group';

import { Activity } from 'react';

type LabelRadioItemProps = {
  id: string;
  value: string;
  label?: string;
  variant?: keyof typeof variants;
  forcecheck?: boolean;
};

const variants = {
  default:
    'has-data-checked:text-primary hover:bg-accent has-data-checked:bg-accent [&_span:not([data-slot])]:bg-primary!',
  correct:
    'has-data-checked:text-teal-500 has-data-checked:border-teal-500 data-checked:border-teal-500! [&_span:not([data-slot])]:bg-teal-500! focus-visible:border-teal-500 focus-visible:ring-teal-500/20',
  incorrect:
    'has-data-checked:text-destructive has-data-checked:border-destructive data-checked:border-destructive! [&_span:not([data-slot])]:bg-destructive! focus-visible:ring-destructive/20 focus-visible:border-destructive',
};

const LabelRadioItem = ({
  id,
  value,
  variant = 'default',
  label = '',
  forcecheck = false,
}: LabelRadioItemProps) => {
  return (
    <Label
      htmlFor={id}
      className={`relative group rounded-lg border p-4 shadow-xs transition-all cursor-pointer ${variants[variant]}`}
    >
      <RadioGroupItem
        className={`data-checked:bg-transparent! [&_span[data-slot]]:bg-transparent! ${variants[variant]}`}
        id={id}
        value={value}
        {...(forcecheck ? { checked: forcecheck } : {})}
      />

      <Activity mode={variant !== 'incorrect' ? 'visible' : 'hidden'}>
        <CircleCheck className="absolute top-0 right-0 h-6 w-6 translate-x-1/2 -translate-y-1/2 fill-current stroke-white peer-data-[state=unchecked]:hidden" />
      </Activity>

      <Activity mode={variant === 'incorrect' ? 'visible' : 'hidden'}>
        <CircleX className="absolute top-0 right-0 h-6 w-6 translate-x-1/2 -translate-y-1/2 fill-current stroke-white peer-data-[state=unchecked]:hidden" />
      </Activity>

      {label || value}
    </Label>
  );
};

export default LabelRadioItem;
