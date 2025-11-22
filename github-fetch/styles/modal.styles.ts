import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#24292e',
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  closeText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  // Search Section Styles
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  
  searchInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#e1e4e8',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#ffffff',
    marginRight: 10,
  },
  
  historyButton: {
    width: 50,
    height: 50,
    backgroundColor: '#0366d6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  historyButtonText: {
    fontSize: 20,
  },
  
  searchButton: {
    height: 50,
    backgroundColor: '#28a745',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  searchButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // History Section Styles
  historySection: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 8,
    padding: 15,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#24292e',
  },
  
  clearHistoryText: {
    color: '#dc3545',
    fontSize: 14,
  },
  
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f6f8fa',
    borderRadius: 6,
    marginBottom: 5,
  },
  
  historyUsername: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0366d6',
  },
  
  historyDate: {
    fontSize: 12,
    color: '#586069',
  },
  
  // User Profile Styles
  userSection: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  
  userProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  
  userInfo: {
    flex: 1,
  },
  
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#24292e',
    marginBottom: 2,
  },
  
  userLogin: {
    fontSize: 16,
    color: '#586069',
    marginBottom: 8,
  },
  
  userBio: {
    fontSize: 14,
    color: '#586069',
    lineHeight: 20,
  },
  
  userStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e1e4e8',
  },
  
  userStatItem: {
    alignItems: 'center',
  },
  
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#24292e',
  },
  
  statLabel: {
    fontSize: 12,
    color: '#586069',
    marginTop: 2,
  },
  
  // Repositories Section Styles
  reposSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#24292e',
    marginBottom: 15,
  },
  
  repoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e1e4e8',
  },
  
  repoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  
  repoName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0366d6',
    flex: 1,
  },
  
  forkBadge: {
    backgroundColor: '#ffeaa7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  
  forkText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#d63031',
  },
  
  repoDescription: {
    fontSize: 14,
    color: '#586069',
    lineHeight: 20,
    marginBottom: 12,
  },
  
  repoStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  statItem: {
    marginRight: 15,
  },
  
  statText: {
    fontSize: 12,
    color: '#586069',
  },
  
  updatedAt: {
    fontSize: 11,
    color: '#959da5',
    fontStyle: 'italic',
  },
  
  // Empty State Styles
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  
  emptyStateText: {
    fontSize: 16,
    color: '#586069',
    textAlign: 'center',
    lineHeight: 24,
  },
});