document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const signinPage = document.getElementById('signin-page');
    const dashboardPage = document.getElementById('dashboard-page');
    const signinForm = document.getElementById('signin-form');
    const signoutBtn = document.getElementById('signout-btn');
    const showSignup = document.getElementById('show-signup');
    const searchForm = document.getElementById('search-form');
    const resultsList = document.getElementById('results-list');
    const resultsCount = document.getElementById('results-count');
    const usernameDisplay = document.getElementById('username-display');
    
    // Mock user data (in a real app, this would come from your auth system)
    const currentUser = {
        email: 'admin@company.com',
        name: 'Admin User'
    };
    
    // Check if user is signed in (in a real app, check auth token)
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    if (isAuthenticated) {
        showDashboard();
    } else {
        showSignin();
    }
    
    // Event Listeners
    signinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // In a real app, you would validate credentials with your backend
        if (email && password) {
            localStorage.setItem('isAuthenticated', 'true');
            usernameDisplay.textContent = email;
            showDashboard();
        }
    });
    
    signoutBtn.addEventListener('click', function() {
        localStorage.removeItem('isAuthenticated');
        showSignin();
        signinForm.reset();
    });
    
    showSignup.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Please contact your administrator to request access.');
    });
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const keywords = document.getElementById('keywords').value;
        const exactMatch = document.getElementById('exact-match').checked;
        const monitorContinuously = document.getElementById('monitor-continuously').checked;
        
        if (keywords.trim() === '') {
            alert('Please enter at least one keyword');
            return;
        }
        
        // In a real app, you would send this to your backend
        // For now, we'll simulate results
        simulateSearch(keywords, exactMatch, monitorContinuously);
    });
    
    // Functions
    function showDashboard() {
        signinPage.classList.add('hidden');
        dashboardPage.classList.remove('hidden');
    }
    
    function showSignin() {
        dashboardPage.classList.add('hidden');
        signinPage.classList.remove('hidden');
    }
    
    function simulateSearch(keywords, exactMatch, monitorContinuously) {
        // Show loading state
        resultsList.innerHTML = '<div class="empty-state"><p>Searching Telegram channels...</p></div>';
        resultsCount.textContent = '0';
        
        // Simulate API delay
        setTimeout(() => {
            // Generate mock results
            const keywordList = keywords.split(',').map(k => k.trim());
            const mockResults = generateMockResults(keywordList);
            
            // Display results
            displayResults(mockResults);
            
            // If continuous monitoring is enabled, simulate new results periodically
            if (monitorContinuously) {
                alert('Continuous monitoring enabled. In a real app, this would use WebSockets or polling to get new results.');
            }
        }, 1500);
    }
    
    function generateMockResults(keywords) {
        const channels = [
            'Leaked Data Hub',
            'Dark Web Market',
            'Confidential Breaches',
            'Hacker News',
            'Data Dump Central'
        ];
        
        const results = [];
        const resultCount = Math.floor(Math.random() * 15) + 3;
        
        for (let i = 0; i < resultCount; i++) {
            const randomChannel = channels[Math.floor(Math.random() * channels.length)];
            const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
            const daysAgo = Math.floor(Math.random() * 30);
            
            results.push({
                channel: randomChannel,
                date: `${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago`,
                content: `Found potential data leak containing "${randomKeyword}". This appears to be sensitive company information that may have been stolen.`,
                keywords: [randomKeyword]
            });
        }
        
        return results;
    }
    
    function displayResults(results) {
        if (results.length === 0) {
            resultsList.innerHTML = '<div class="empty-state"><p>No matches found for your keywords</p></div>';
            resultsCount.textContent = '0';
            return;
        }
        
        resultsCount.textContent = results.length.toString();
        
        let html = '';
        results.forEach(result => {
            const keywordTags = result.keywords.map(keyword => 
                `<span class="keyword-match">${keyword}</span>`
            ).join(', ');
            
            html += `
                <div class="result-item">
                    <div class="result-item-header">
                        <span class="result-channel">${result.channel}</span>
                        <span class="result-date">${result.date}</span>
                    </div>
                    <div class="result-content">${result.content}</div>
                    <div class="result-keywords">Keywords matched: ${keywordTags}</div>
                </div>
            `;
        });
        
        resultsList.innerHTML = html;
    }
});