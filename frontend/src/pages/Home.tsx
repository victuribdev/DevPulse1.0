import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import SearchForm from '@/components/SearchForm';
import { Github, BarChart3, TrendingUp, Shield } from 'lucide-react';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (username: string) => {
    setIsLoading(true);
    try {
      // Simula um delay de requisição
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate(`/analyze/${username}`);
    } catch (error) {
      console.error('Erro na busca:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#c9d1d9] mb-4">
            Analise o Bem-estar do seu Desenvolvimento
          </h2>
          <div className="flex justify-center">
            <div className="bg-[#161b22] border-l-4 border-[#58a6ff] text-[#7d8590] rounded-md px-4 py-3 mb-6 max-w-2xl text-center text-sm shadow-sm">
              Esta análise é meramente ilustrativa e não deve ser usada para diagnósticos reais de saúde mental. A saúde mental é complexa e não pode ser determinada apenas por dados de commit.
            </div>
          </div>
          <p className="text-lg text-[#7d8590] max-w-2xl mx-auto mb-8">
            DevPulse analisa seus dados do GitHub para identificar padrões de trabalho 
            e fornecer insights sobre seu bem-estar como desenvolvedor.
          </p>
          
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center p-6">
            <BarChart3 className="h-12 w-12 text-[#58a6ff] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#c9d1d9] mb-2">
              Métricas Detalhadas
            </h3>
            <p className="text-[#7d8590]">
              Analise commits, horários de trabalho e padrões de atividade
            </p>
          </div>

          <div className="text-center p-6">
            <TrendingUp className="h-12 w-12 text-[#238636] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#c9d1d9] mb-2">
              Tendências
            </h3>
            <p className="text-[#7d8590]">
              Identifique tendências de crescimento e produtividade
            </p>
          </div>

          <div className="text-center p-6">
            <Shield className="h-12 w-12 text-[#f85149] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#c9d1d9] mb-2">
              Recomendações
            </h3>
            <p className="text-[#7d8590]">
              Receba conselhos personalizados para melhorar seu bem-estar
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#21262d] mt-16 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Github className="h-5 w-5 text-[#58a6ff]" />
            <span className="text-[#c9d1d9] font-medium">DevPulse</span>
          </div>
          <p className="text-[#7d8590] text-sm">
            Desenvolvido para promover o bem-estar de desenvolvedores
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
