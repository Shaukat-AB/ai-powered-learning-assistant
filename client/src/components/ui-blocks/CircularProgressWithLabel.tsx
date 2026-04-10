type CircularProgressProps = {
  value: number;
  strokeWidth?: number;
  circleStrokeWidth?: number;
  progressStrokeWidth?: number;
  shape?: 'square' | 'round';
  className?: string;
  backgroundProgressClassName?: string;
  progressClassName?: string;

  showLabel?: boolean;
  labelClassName?: string;
  modifyValue?: (progress: number) => number | string;
  statusLabelText?: string;
};

const radius = 85;
const circumference = Math.ceil(3.14 * radius * 2);

const CircularProgressWithLabel = ({
  value,
  modifyValue = undefined,
  className = '',
  backgroundProgressClassName = '',
  progressClassName = '',
  labelClassName,
  showLabel = false,
  statusLabelText = '',
  shape = 'round',
  strokeWidth = undefined,
  circleStrokeWidth = 10,
  progressStrokeWidth = 10,
}: CircularProgressProps) => {
  const percentage = Math.ceil(circumference * ((100 - value) / 100));

  return (
    <div
      className={`relative w-fit overflow-hidden pointer-events-none ${className}`}
    >
      <svg
        className="relative w-full h-full"
        style={{ transform: 'rotate(-90deg)' }}
        viewBox={'-100 -100 200 200'}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Base Circle */}
        <circle
          className={`stroke-primary/25 ${backgroundProgressClassName}`}
          fill="transparent"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset="0"
          strokeWidth={strokeWidth ?? circleStrokeWidth}
        />

        {/* Progress */}
        <circle
          className={`stroke-primary ${progressClassName}`}
          fill="transparent"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={percentage}
          strokeLinecap={shape}
          strokeWidth={strokeWidth ?? progressStrokeWidth}
        />
      </svg>

      {showLabel && (
        <div
          className={`absolute inset-0 flex gap-1 flex-col items-center justify-center text-md
            ${labelClassName}`}
        >
          <span> {modifyValue ? modifyValue(value) : value}</span>
          {statusLabelText && (
            <span className="text-sm text-muted-foreground font-normal">
              {statusLabelText}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default CircularProgressWithLabel;
