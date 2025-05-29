
import { useState } from 'react';
import { Search, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchFormProps {
  onSearch: (username: string) => void;
  isLoading?: boolean;
}

const SearchForm = ({ onSearch, isLoading }: SearchFormProps) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Github className="absolute left-3 top-3 h-5 w-5 text-[#7d8590]" />
          <Input
            type="text"
            placeholder="Digite o username do GitHub"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="pl-10 bg-[#161b22] border-[#30363d] text-[#c9d1d9] placeholder-[#7d8590] focus:border-[#58a6ff] focus:ring-[#58a6ff]"
            disabled={isLoading}
          />
        </div>
        
        <Button
          type="submit"
          disabled={!username.trim() || isLoading}
          className="w-full bg-[#238636] hover:bg-[#2ea043] text-white disabled:opacity-50"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <span>Analisando...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4" />
              <span>Analisar Desenvolvedor</span>
            </div>
          )}
        </Button>
      </form>
    </div>
  );
};

export default SearchForm;
