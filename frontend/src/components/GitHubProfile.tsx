import React, { useEffect, useState } from 'react';
import { githubService, GitHubProfile, GitHubRepo } from '../services/github';

export const GitHubProfile: React.FC = () => {
    const [profile, setProfile] = useState<GitHubProfile | null>(null);
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileData, reposData] = await Promise.all([
                    githubService.getProfile(),
                    githubService.getRepositories()
                ]);
                setProfile(profileData);
                setRepos(reposData);
            } catch (err) {
                setError('Erro ao carregar dados do GitHub');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!profile) return <div>Nenhum dado encontrado</div>;

    return (
        <div className="p-4">
            <div className="flex items-center space-x-4 mb-6">
                <img 
                    src={profile.avatar_url} 
                    alt={profile.name} 
                    className="w-24 h-24 rounded-full"
                />
                <div>
                    <h1 className="text-2xl font-bold">{profile.name}</h1>
                    <p className="text-gray-600">{profile.bio}</p>
                    <div className="flex space-x-4 mt-2">
                        <span>Repos: {profile.public_repos}</span>
                        <span>Seguidores: {profile.followers}</span>
                        <span>Seguindo: {profile.following}</span>
                    </div>
                </div>
            </div>

            <h2 className="text-xl font-bold mb-4">Repositórios</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {repos.map(repo => (
                    <div key={repo.id} className="border p-4 rounded-lg">
                        <h3 className="font-bold">{repo.name}</h3>
                        <p className="text-sm text-gray-600">{repo.description}</p>
                        <div className="flex justify-between mt-2">
                            <span className="text-sm">{repo.language}</span>
                            <span className="text-sm">⭐ {repo.stargazers_count}</span>
                        </div>
                        <a 
                            href={repo.html_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline text-sm mt-2 inline-block"
                        >
                            Ver no GitHub
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}; 