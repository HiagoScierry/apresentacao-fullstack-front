// script.js

// Seleção de Elementos (Conceito: DOM)
const inputUser = document.getElementById('input-user');
const btnSearch = document.getElementById('btn-search');
const profileSection = document.getElementById('profile-section');
const reposList = document.getElementById('repos-list');
const historyList = document.getElementById('history-list');

// Event Listener
btnSearch.addEventListener('click', () => {
    const username = inputUser.value;
    if (username) {
        fetchData(username);
    }
});

// Função Principal (Conceito: Assincronismo)
async function fetchData(username) {
    try {
        // Buscando Usuário
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userResponse.json();

        if (!userResponse.ok) throw new Error('Usuário não encontrado');

        // Buscando Repositórios
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
        const reposData = await reposResponse.json();

        renderProfile(userData);
        renderRepos(reposData);
        saveToHistory(username);
        
    } catch (error) {
        alert(error.message);
    }
}

// Renderização do Perfil (Conceito: Template Strings)
function renderProfile(user) {
    profileSection.classList.remove('hidden');
    profileSection.innerHTML = `
        <div class="card">
            <img src="${user.avatar_url}" width="100" style="border-radius:50%">
            <h2>${user.name || user.login}</h2>
            <p>${user.bio || 'Sem bio'}</p>
            <p><strong>Seguidores:</strong> ${user.followers} | <strong>Seguindo:</strong> ${user.following}</p>
        </div>
    `;
}

// Renderização dos Repos (Conceito: Loops e Condicionais)
function renderRepos(repos) {
    document.getElementById('repos-section').classList.remove('hidden');
    reposList.innerHTML = ''; // Limpa lista anterior
    
    repos.forEach(repo => {
        const isFork = repo.fork;
        const li = document.createElement('li');
        li.className = 'repo-item';
        
        li.innerHTML = `
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            <span class="badge ${isFork ? 'badge-fork' : 'badge-source'}">
                ${isFork ? 'Fork' : 'Original'}
            </span>
        `;
        reposList.appendChild(li);
    });
}

// Histórico (Conceito: LocalStorage)
function saveToHistory(username) {
    let history = JSON.parse(localStorage.getItem('github_history')) || [];
    
    // Evita duplicados e mantém apenas os últimos 5
    if (!history.includes(username)) {
        history.unshift(username);
        if (history.length > 5) history.pop();
        
        localStorage.setItem('github_history', JSON.stringify(history));
        renderHistory();
    }
}

function renderHistory() {
    const history = JSON.parse(localStorage.getItem('github_history')) || [];
    historyList.innerHTML = '';
    
    history.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user;
        li.style.cursor = 'pointer';
        // Funcionalidade extra: clicar no histórico refaz a busca
        li.onclick = () => fetchData(user);
        historyList.appendChild(li);
    });
}

// Carregar histórico ao iniciar
renderHistory();