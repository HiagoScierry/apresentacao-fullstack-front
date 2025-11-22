import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from '../styles/modal.styles';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  fork: boolean;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
  updated_at: string;
}

interface SearchHistory {
  username: string;
  timestamp: string;
}

export default function ModalScreen() {
  const [searchUsername, setSearchUsername] = useState('');
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    loadSearchHistory();
  }, []);

  const loadSearchHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('github_search_history');
      if (history) {
        setSearchHistory(JSON.parse(history));
      }
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    }
  };

  const saveToHistory = async (username: string) => {
    try {
      const newSearch: SearchHistory = {
        username,
        timestamp: new Date().toISOString(),
      };

      const updatedHistory = [newSearch, ...searchHistory.filter(item => item.username !== username)].slice(0, 10);

      setSearchHistory(updatedHistory);
      await AsyncStorage.setItem('github_search_history', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Erro ao salvar no histórico:', error);
    }
  };

  const fetchGitHubData = async (username: string) => {
    if (!username.trim()) {
      Alert.alert('Erro', 'Por favor, digite um nome de usuário válido.');
      return;
    }

    setLoading(true);
    try {
      // Buscar dados do usuário
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!userResponse.ok) {
        throw new Error('Usuário não encontrado');
      }
      const userData = await userResponse.json();

      // Buscar repositórios do usuário
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
      if (!reposResponse.ok) {
        throw new Error('Erro ao buscar repositórios');
      }
      const reposData = await reposResponse.json();

      setUser(userData);
      setRepos(reposData);
      await saveToHistory(username);

    } catch (error) {
      Alert.alert('Erro', error instanceof Error ? error.message : 'Erro desconhecido');
      setUser(null);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchGitHubData(searchUsername);
    setShowHistory(false);
  };

  const handleHistorySelect = (username: string) => {
    setSearchUsername(username);
    setShowHistory(false);
    fetchGitHubData(username);
  };

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem('github_search_history');
      setSearchHistory([]);
    } catch (error) {
      console.error('Erro ao limpar histórico:', error);
    }
  };

  const renderRepo = ({ item }: { item: GitHubRepo }) => (
    <View style={styles.repoCard}>
      <View style={styles.repoHeader}>
        <ThemedText style={styles.repoName}>{item.name}</ThemedText>
        {item.fork && (
          <View style={styles.forkBadge}>
            <ThemedText style={styles.forkText}>FORK</ThemedText>
          </View>
        )}
      </View>

      {item.description && (
        <ThemedText style={styles.repoDescription}>{item.description}</ThemedText>
      )}

      <View style={styles.repoStats}>
        <View style={styles.statItem}>
          <ThemedText style={styles.statText}>⭐ {item.stargazers_count}</ThemedText>
        </View>
        <View style={styles.statItem}>
          <ThemedText style={styles.statText}>🍴 {item.forks_count}</ThemedText>
        </View>
        {item.language && (
          <View style={styles.statItem}>
            <ThemedText style={styles.statText}>💻 {item.language}</ThemedText>
          </View>
        )}
      </View>

      <ThemedText style={styles.updatedAt}>
        Atualizado em: {new Date(item.updated_at).toLocaleDateString('pt-BR')}
      </ThemedText>
    </View>
  );

  const renderHistoryItem = ({ item }: { item: SearchHistory }) => (
    <TouchableOpacity
      style={styles.historyItem}
      onPress={() => handleHistorySelect(item.username)}
    >
      <ThemedText style={styles.historyUsername}>@{item.username}</ThemedText>
      <ThemedText style={styles.historyDate}>
        {new Date(item.timestamp).toLocaleDateString('pt-BR')}
      </ThemedText>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>GitHub Explorer</ThemedText>
        </View>

        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Digite o nome do usuário GitHub..."
              placeholderTextColor="#666"
              value={searchUsername}
              onChangeText={setSearchUsername}
              onSubmitEditing={handleSearch}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.historyButton}
              onPress={() => setShowHistory(!showHistory)}
            >
              <ThemedText style={styles.historyButtonText}>📚</ThemedText>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearch}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <ThemedText style={styles.searchButtonText}>Buscar</ThemedText>
            )}
          </TouchableOpacity>
        </View>

        {/* Search History */}
        {showHistory && searchHistory.length > 0 && (
          <View style={styles.historySection}>
            <View style={styles.historyHeader}>
              <ThemedText style={styles.historyTitle}>Histórico de Buscas</ThemedText>
              <TouchableOpacity onPress={clearHistory}>
                <ThemedText style={styles.clearHistoryText}>Limpar</ThemedText>
              </TouchableOpacity>
            </View>

            <FlatList
              data={searchHistory}
              keyExtractor={(item) => `${item.username}-${item.timestamp}`}
              renderItem={renderHistoryItem}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* User Profile */}
        {user && (
          <View style={styles.userSection}>
            <View style={styles.userProfile}>
              <Image source={{ uri: user.avatar_url }} style={styles.avatar} />
              <View style={styles.userInfo}>
                <ThemedText style={styles.username}>{user.name || user.login}</ThemedText>
                <ThemedText style={styles.userLogin}>@{user.login}</ThemedText>
                {user.bio && (
                  <ThemedText style={styles.userBio}>{user.bio}</ThemedText>
                )}
              </View>
            </View>

            <View style={styles.userStats}>
              <View style={styles.userStatItem}>
                <ThemedText style={styles.statNumber}>{user.public_repos}</ThemedText>
                <ThemedText style={styles.statLabel}>Repositórios</ThemedText>
              </View>
              <View style={styles.userStatItem}>
                <ThemedText style={styles.statNumber}>{user.followers}</ThemedText>
                <ThemedText style={styles.statLabel}>Seguidores</ThemedText>
              </View>
              <View style={styles.userStatItem}>
                <ThemedText style={styles.statNumber}>{user.following}</ThemedText>
                <ThemedText style={styles.statLabel}>Seguindo</ThemedText>
              </View>
            </View>
          </View>
        )}

        {/* Repositories List */}
        {repos.length > 0 && (
          <View style={styles.reposSection}>
            <ThemedText style={styles.sectionTitle}>Repositórios Recentes</ThemedText>
            <FlatList
              data={repos}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderRepo}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* Empty State */}
        {!user && !loading && (
          <View style={styles.emptyState}>
            <ThemedText style={styles.emptyStateText}>
              Digite um nome de usuário do GitHub para começar a explorar!
            </ThemedText>
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
}


