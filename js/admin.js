// Sickle Safe Admin Dashboard JavaScript

// SHA-256 hash for password "password"
const ADMIN_PASSWORD_HASH = '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8';

let currentPeriod = '7d';
let trafficChart = null;
let pageviewsChart = null;
let statsInterval = null;
let liveCountInterval = null;

// Check password with SHA-256
async function checkPassword(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hash === ADMIN_PASSWORD_HASH;
}

// Handle password form submission
document.getElementById('password-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const passwordInput = document.getElementById('password-input');
  const passwordError = document.getElementById('password-error');

  const isValid = await checkPassword(passwordInput.value);

  if (isValid) {
    // Store authentication in sessionStorage
    sessionStorage.setItem('admin_authenticated', 'true');

    // Hide modal and show dashboard
    document.getElementById('password-modal').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');

    // Initialize dashboard
    initDashboard();
  } else {
    passwordError.classList.remove('hidden');
    passwordInput.value = '';
    passwordInput.focus();
  }
});

// Handle logout
document.getElementById('logout-btn').addEventListener('click', () => {
  sessionStorage.removeItem('admin_authenticated');
  location.reload();
});

// Check if already authenticated on page load
if (sessionStorage.getItem('admin_authenticated') === 'true') {
  document.getElementById('password-modal').classList.add('hidden');
  document.getElementById('dashboard').classList.remove('hidden');
  initDashboard();
}

// Initialize dashboard
function initDashboard() {
  console.log('[Admin] Dashboard initialized');

  // Load initial data
  loadStats();
  loadLiveCount();

  // Setup periodic updates
  statsInterval = setInterval(loadStats, 30000); // Every 30 seconds
  liveCountInterval = setInterval(loadLiveCount, 10000); // Every 10 seconds

  // Setup event listeners
  setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
  // Period filter
  document.getElementById('period-filter').addEventListener('change', (e) => {
    currentPeriod = e.target.value;
    loadStats();
  });

  // Export CSV button
  document.getElementById('export-csv').addEventListener('click', () => {
    const formType = document.getElementById('signup-filter').value;
    window.location.href = `/api/admin/signups?formType=${formType}`;
  });
}

// Load stats from API
async function loadStats() {
  try {
    const response = await fetch(`/api/admin/stats?period=${currentPeriod}`);
    const data = await response.json();

    console.log('[Admin] Stats loaded:', data);

    // Update KPI cards
    document.getElementById('total-page-views').textContent = data.metrics.totalPageViews.toLocaleString();
    document.getElementById('unique-visitors').textContent = data.metrics.uniqueVisitors.toLocaleString();
    document.getElementById('avg-time').textContent = data.metrics.avgTimeOnSite;
    document.getElementById('bounce-rate').textContent = data.metrics.bounceRate + '%';
    document.getElementById('total-signups').textContent = data.metrics.totalSignups.toLocaleString();

    // Update form breakdown
    document.getElementById('hero-signups').textContent = (data.formSubmissions.hero_signup || 0).toLocaleString();
    document.getElementById('contact-signups').textContent = (data.formSubmissions.contact_form || 0).toLocaleString();
    document.getElementById('gala-signups').textContent = (data.formSubmissions.gala_mailing || 0).toLocaleString();

    // Update charts
    updateTrafficChart(data.trafficSources);
    updatePageViewsChart(data.pageViewsOverTime);

    // Update top pages
    updateTopPages(data.topPages);

    // Update signups table
    updateSignupsTable(data.recentSignups);
  } catch (error) {
    console.error('[Admin] Error loading stats:', error);
  }
}

// Load live count
async function loadLiveCount() {
  try {
    const response = await fetch('/api/admin/realtime');
    const data = await response.json();

    document.getElementById('live-count').textContent = data.liveCount;
  } catch (error) {
    console.error('[Admin] Error loading live count:', error);
  }
}

// Update traffic sources chart
function updateTrafficChart(trafficSources) {
  const ctx = document.getElementById('traffic-chart').getContext('2d');

  // Destroy existing chart if it exists
  if (trafficChart) {
    trafficChart.destroy();
  }

  const labels = trafficSources.map(s => s.source);
  const data = trafficSources.map(s => s.count);

  trafficChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: [
          '#8B0000', // Luxury accent
          '#B22222',
          '#DC143C',
          '#CD5C5C',
          '#F08080',
          '#FFA07A'
        ],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: {
              family: 'Montserrat'
            }
          }
        }
      }
    }
  });
}

// Update page views chart
function updatePageViewsChart(pageViewsOverTime) {
  const ctx = document.getElementById('pageviews-chart').getContext('2d');

  // Destroy existing chart if it exists
  if (pageviewsChart) {
    pageviewsChart.destroy();
  }

  const labels = pageViewsOverTime.map(p => {
    const date = new Date(p.date);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });
  const data = pageViewsOverTime.map(p => p.views);

  pageviewsChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Page Views',
        data: data,
        borderColor: '#8B0000',
        backgroundColor: 'rgba(139, 0, 0, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: '#8B0000'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            font: {
              family: 'Montserrat'
            }
          }
        },
        x: {
          ticks: {
            font: {
              family: 'Montserrat'
            }
          }
        }
      }
    }
  });
}

// Update top pages list
function updateTopPages(topPages) {
  const container = document.getElementById('top-pages-list');

  if (topPages.length === 0) {
    container.innerHTML = '<p class="text-gray-500 text-sm">No data available</p>';
    return;
  }

  const maxViews = Math.max(...topPages.map(p => p.views));

  container.innerHTML = topPages.map(page => {
    const percentage = (page.views / maxViews) * 100;

    return `
      <div class="flex items-center justify-between py-2">
        <div class="flex-1">
          <div class="flex items-center justify-between mb-1">
            <span class="text-sm font-medium text-gray-700">${page.path}</span>
            <span class="text-sm font-semibold luxury-accent">${page.views.toLocaleString()}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="bg-luxury-accent h-2 rounded-full" style="width: ${percentage}%"></div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Update signups table
function updateSignupsTable(signups) {
  const tbody = document.getElementById('signups-table');

  if (signups.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" class="px-4 py-8 text-center text-gray-500">
          No signups yet
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = signups.map(signup => {
    const date = new Date(signup.createdAt);
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const formTypeDisplay = {
      'hero_signup': 'Hero Signup',
      'contact_form': 'Contact Form',
      'gala_mailing': 'Gala Mailing'
    };

    return `
      <tr class="hover:bg-gray-50">
        <td class="px-4 py-3 text-sm text-gray-900">${signup.email}</td>
        <td class="px-4 py-3 text-sm text-gray-600">${signup.name || '-'}</td>
        <td class="px-4 py-3 text-sm">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            ${formTypeDisplay[signup.formType] || signup.formType}
          </span>
        </td>
        <td class="px-4 py-3 text-sm text-gray-600">${formattedDate}</td>
      </tr>
    `;
  }).join('');
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (statsInterval) clearInterval(statsInterval);
  if (liveCountInterval) clearInterval(liveCountInterval);
  if (trafficChart) trafficChart.destroy();
  if (pageviewsChart) pageviewsChart.destroy();
});
