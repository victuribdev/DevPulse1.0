
import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  username?: string;
  onNewAnalysis?: () => void;
}

const Header = ({ username, onNewAnalysis }: HeaderProps) => {
  return (
    <header className="bg-[#0d1117] border-b border-[#21262d] px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Github className="h-8 w-8 text-[#58a6ff]" />
          <div>
            <h1 className="text-xl font-bold text-[#c9d1d9]">DevPulse</h1>
            {username && (
              <p className="text-sm text-[#7d8590]">Análise para @{username}</p>
            )}
          </div>
        </div>
        
        {onNewAnalysis && (
          <Button 
            onClick={onNewAnalysis}
            className="bg-[#238636] hover:bg-[#2ea043] text-white"
          >
            Nova Análise
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
