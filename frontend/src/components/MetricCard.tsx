
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

const MetricCard = ({ title, value, icon: Icon, description, variant = 'default' }: MetricCardProps) => {
  const getVariantColors = () => {
    switch (variant) {
      case 'success':
        return 'border-[#238636] bg-[#238636]/10';
      case 'warning':
        return 'border-[#d29922] bg-[#d29922]/10';
      case 'danger':
        return 'border-[#f85149] bg-[#f85149]/10';
      default:
        return 'border-[#30363d] bg-[#161b22]';
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case 'success':
        return 'text-[#238636]';
      case 'warning':
        return 'text-[#d29922]';
      case 'danger':
        return 'text-[#f85149]';
      default:
        return 'text-[#58a6ff]';
    }
  };

  return (
    <Card className={`${getVariantColors()} transition-all duration-300 hover:scale-105`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-[#c9d1d9]">
          {title}
        </CardTitle>
        <Icon className={`h-4 w-4 ${getIconColor()}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-[#c9d1d9]">{value}</div>
        {description && (
          <p className="text-xs text-[#7d8590] mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
