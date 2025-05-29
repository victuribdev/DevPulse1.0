
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, XCircle, Lightbulb } from 'lucide-react';

interface RecommendationCardProps {
  score: number;
  advice: string;
  suspectWords: string[];
}

const RecommendationCard = ({ score, advice, suspectWords }: RecommendationCardProps) => {
  const getScoreVariant = () => {
    if (score >= 7) return { color: 'text-[#238636]', icon: CheckCircle, label: 'Excelente' };
    if (score >= 5) return { color: 'text-[#d29922]', icon: AlertTriangle, label: 'Atenção' };
    return { color: 'text-[#f85149]', icon: XCircle, label: 'Crítico' };
  };

  const { color, icon: ScoreIcon, label } = getScoreVariant();

  return (
    <Card className="border-[#30363d] bg-[#161b22]">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-[#c9d1d9]">
          <Lightbulb className="h-5 w-5 text-[#58a6ff]" />
          <span>Recomendações</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#7d8590]">Score de Bem-estar</span>
          <div className="flex items-center space-x-2">
            <ScoreIcon className={`h-4 w-4 ${color}`} />
            <span className={`font-bold ${color}`}>{score.toFixed(1)}/10</span>
            <span className={`text-xs ${color}`}>({label})</span>
          </div>
        </div>

        <div className="p-3 bg-[#0d1117] rounded-md border border-[#21262d]">
          <p className="text-sm text-[#c9d1d9]">{advice}</p>
        </div>

        {suspectWords.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-[#c9d1d9] mb-2">Palavras de Alerta Detectadas:</h4>
            <div className="flex flex-wrap gap-2">
              {suspectWords.map((word, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-[#f85149]/20 text-[#f85149] text-xs rounded-md border border-[#f85149]/30"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;
