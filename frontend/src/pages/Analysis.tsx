import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import MetricCard from '@/components/MetricCard';
import RecommendationCard from '@/components/RecommendationCard';
import ActivityChart from '@/components/ActivityChart';
import CommitPatterns from '@/components/CommitPatterns';
import { devPulseService } from '@/services/devpulse';
import { 
  GitCommit, 
  Moon, 
  Calendar, 
  Target, 
  Coffee, 
  TrendingUp,
  User,
  FolderGit2,
  Clock,
  Activity,
  Scale
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Analysis = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();

  const { data: analysis, isLoading, error } = useQuery({
    queryKey: ['analysis', username],
    queryFn: () => devPulseService.analyzeUser(username!),
    enabled: !!username,
    retry: 2,
  });

  const { data: report } = useQuery({
    queryKey: ['report', username],
    queryFn: () => devPulseService.getUserReport(username!),
    enabled: !!username,
  });

  useEffect(() => {
    if (error) {
      console.log('Analysis error:', error);
      toast({
        title: "Erro na análise",
        description: "Não foi possível carregar os dados do usuário. Verifique se o username existe no GitHub.",
        variant: "destructive",
      });
    }
  }, [error]);

  useEffect(() => {
    if (analysis) {
      console.log('Analysis data received:', analysis);
    }
    if (report) {
      console.log('Report data received:', report);
    }
  }, [analysis, report]);

  const handleNewAnalysis = () => {
    navigate('/');
  };

  if (!username) {
    navigate('/');
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0d1117]">
        <Header username={username} onNewAnalysis={handleNewAnalysis} />
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#58a6ff] border-t-transparent"></div>
            <span className="ml-3 text-[#c9d1d9]">Analisando dados do GitHub...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="min-h-screen bg-[#0d1117]">
        <Header username={username} onNewAnalysis={handleNewAnalysis} />
        <div className="max-w-6xl mx-auto px-6 py-12 text-center">
          <div className="text-[#f85149] mb-4">
            <User className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold">Usuário não encontrado</h2>
            <p className="text-[#7d8590] mt-2">
              Verifique se o username "{username}" existe no GitHub.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Safe access with fallback values
  const avgCommitsPerDay = analysis.averageCommitsPerDay ?? 0;
  const weekendRatio = analysis.weekendCommitRatio ?? 0;
  const consecutiveDays = analysis.consecutiveDays ?? 0;
  const lateNightCommits = analysis.lateNightCommits ?? 0;
  const idleDays = analysis.idleDays ?? 0;
  const recommendationScore = analysis.recommendationScore ?? 0;
  const advice = analysis.advice ?? "Análise em andamento...";
  const suspectWords = analysis.suspectWords ?? [];
  const trend = analysis.trend ?? "indeterminado";

  // Safe access for new metrics
  const commitFrequency = analysis.commitFrequency ?? { daily: 0, weekly: 0, monthly: 0 };
  const workLifeBalance = analysis.workLifeBalance ?? 0;
  const productivityScore = analysis.productivityScore ?? 0;
  const commitPatterns = analysis.commitPatterns ?? { morning: 0, afternoon: 0, evening: 0, night: 0 };
  const activityHours = analysis.activityHours ?? {};

  // Safe access for report data
  const totalCommits = report?.totalCommits ?? 0;
  const totalRepositories = report?.totalRepositories ?? 0;
  const avgCommitsPerRepo = report?.averageCommitsPerRepo ?? 0;

  const getStreakVariant = () => {
    if (consecutiveDays >= 10) return 'success';
    if (consecutiveDays >= 5) return 'warning';
    return 'danger';
  };

  const getCommitVariant = () => {
    if (avgCommitsPerDay >= 3) return 'success';
    if (avgCommitsPerDay >= 1) return 'warning';
    return 'danger';
  };

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <Header username={username} onNewAnalysis={handleNewAnalysis} />
      
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#c9d1d9] mb-2">
            Análise de Bem-estar - @{username}
          </h2>
          <div className="flex justify-center">
            <div className="bg-[#161b22] border-l-4 border-[#58a6ff] text-[#7d8590] rounded-md px-4 py-3 mb-4 max-w-2xl text-center text-sm shadow-sm">
              Esta análise é meramente ilustrativa e não deve ser usada para diagnósticos reais de saúde mental. A saúde mental é complexa e não pode ser determinada apenas por dados de commit.
            </div>
          </div>
          <p className="text-[#7d8590]">
            Insights baseados nos seus padrões de commit no GitHub
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Commits por Dia"
            value={avgCommitsPerDay.toFixed(1)}
            icon={GitCommit}
            description="Média diária"
            variant={getCommitVariant()}
          />
          
          <MetricCard
            title="Commits Noturnos"
            value={lateNightCommits}
            icon={Moon}
            description="Após 22h"
            variant={lateNightCommits > 20 ? 'danger' : 'default'}
          />
          
          <MetricCard
            title="Commits de Fim de Semana"
            value={`${weekendRatio.toFixed(1)}%`}
            icon={Calendar}
            description="Sábado e domingo"
            variant={weekendRatio > 30 ? 'warning' : 'default'}
          />
          
          <MetricCard
            title="Sequência Ativa"
            value={`${consecutiveDays} dias`}
            icon={Target}
            description="Dias consecutivos"
            variant={getStreakVariant()}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total de Commits"
            value={totalCommits}
            icon={GitCommit}
            description="Histórico completo"
          />
          
          <MetricCard
            title="Repositórios"
            value={totalRepositories}
            icon={FolderGit2}
            description="Total de repos"
          />
          
          <MetricCard
            title="Commits por Repo"
            value={avgCommitsPerRepo.toFixed(1)}
            icon={TrendingUp}
            description="Média por repositório"
          />
          
          <MetricCard
            title="Dias Inativos"
            value={idleDays}
            icon={Coffee}
            description="Sem commits"
            variant={idleDays > 7 ? 'warning' : 'default'}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <RecommendationCard
            score={recommendationScore}
            advice={advice}
            suspectWords={suspectWords}
          />
          
          <div className="space-y-4">
            <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#c9d1d9] mb-4">Tendência Atual</h3>
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-8 w-8 text-[#58a6ff]" />
                <div>
                  <p className="text-[#c9d1d9] font-medium capitalize">{trend}</p>
                  <p className="text-sm text-[#7d8590]">Baseado nos últimos 30 dias</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analysis;
