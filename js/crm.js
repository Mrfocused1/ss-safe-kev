// Sickle Safe CRM - Outreach & Partnership Tracking

// Check authentication
if (sessionStorage.getItem('admin_authenticated') !== 'true') {
  window.location.href = '/admin';
}

// Outreach Data
const OUTREACH_DATA = [
  // FUNDING & GRANT SOURCES
  {
    id: 1,
    category: 'funding',
    name: 'BBC Children in Need',
    website: 'bbcchildreninneed.co.uk',
    description: 'UK-wide children\'s charity funding projects for disadvantaged young people.',
    programs: 'Main Grants & Small Grants (supporting children\'s health and well-being)',
    contact: {
      team: 'Grants Team',
      email: 'pudseygrants@bbc.co.uk',
      phone: '0345 609 0015 opt.2'
    },
    opportunity: 'Apply for a Children in Need Project Grant to support Safe Kev\'s work with young sickle cell patients (aligning with CiN\'s focus on vulnerable children).',
    status: 'not-contacted',
    notes: ''
  },
  {
    id: 2,
    category: 'funding',
    name: 'Google.org',
    website: 'google.org',
    description: 'Philanthropic arm of Google supporting tech-driven social impact globally.',
    programs: 'Google.org Impact Challenges (competitive grants for nonprofits using technology; past UK awards £200K–£500K)',
    contact: {
      team: 'No direct public contact',
      email: 'Applications via online calls',
      phone: 'N/A'
    },
    opportunity: 'Watch for Google.org Impact Challenge calls (e.g. on AI for Social Good) – propose Safe Kev as a tech innovation improving health equity for young people.',
    status: 'not-contacted',
    notes: ''
  },
  {
    id: 3,
    category: 'funding',
    name: 'Nesta (Innovation Foundation)',
    website: 'nesta.org.uk',
    description: 'Major funder of social innovation in health, education, and communities.',
    programs: 'Grants for charitable tech innovations and challenge prizes addressing societal issues',
    contact: {
      team: 'Information Team',
      email: 'information@nesta.org.uk',
      phone: '020 7438 2500'
    },
    opportunity: 'Seek Nesta seed funding or partnership in a relevant innovation program – e.g. a pilot of Safe Kev\'s digital education tool for young patients.',
    status: 'not-contacted',
    notes: ''
  },
  {
    id: 4,
    category: 'funding',
    name: 'National Lottery Community Fund',
    website: 'tnlcommunityfund.org.uk',
    description: 'Largest UK community grant-maker supporting health, youth & community projects.',
    programs: 'Awards for All (£300–£10,000 small grants) and Reaching Communities (£10,000+ for long-term projects) focusing on youth well-being and tackling health inequalities',
    contact: {
      team: 'General Enquiries',
      email: 'general.enquiries@tnlcommunityfund.org.uk',
      phone: '0345 410 2030'
    },
    opportunity: 'Apply for a Reaching Communities grant to scale Safe Kev\'s outreach – it aligns with missions to help young people thrive and address health inequalities.',
    status: 'not-contacted',
    notes: ''
  },
  {
    id: 5,
    category: 'funding',
    name: 'Comic Relief (Tech for Good)',
    website: 'comicrelief.com',
    description: 'Charity funding innovative projects tackling poverty and health issues in the UK.',
    programs: 'Comic Relief Community Fund (small grants up to £5k) and themed funding calls (e.g. Tech for Good digital innovation)',
    contact: {
      team: 'Funding Team',
      email: 'fundinginfo@comicrelief.com',
      phone: '020 7820 2000'
    },
    opportunity: 'Pitch Safe Kev under Comic Relief\'s Tech for Good initiative – highlighting how the project empowers vulnerable BAME youth through technology (matching Comic Relief\'s focus on innovative solutions to health injustices).',
    status: 'not-contacted',
    notes: ''
  },
  {
    id: 6,
    category: 'funding',
    name: 'Social Tech Trust',
    website: 'socialtechtrust.org',
    description: 'UK charity investing in early-stage tech ventures for social impact.',
    programs: 'Grants and accelerator support for tech addressing health & inclusion (e.g. previous £30m+ to 300+ UK social tech projects)',
    contact: {
      team: 'Enquiries',
      email: 'hello@socialtechtrust.org',
      phone: '01865 334000'
    },
    opportunity: 'Secure support through Social Tech Trust\'s next grant call or incubator – positioning Safe Kev as a scalable digital solution improving health outcomes for young sickle cell patients.',
    status: 'not-contacted',
    notes: ''
  },

  // SICKLE CELL ORGANIZATIONS
  {
    id: 7,
    category: 'sickle-cell',
    name: 'Sickle Cell Society (SCS)',
    website: 'sicklecellsociety.org',
    description: 'The UK\'s only national charity for people living with sickle cell. Provides advocacy, patient support, and youth programs for SCD.',
    programs: 'National advocacy, patient support services, youth programs',
    contact: {
      team: 'John James OBE (Chief Executive)',
      email: 'info@sicklecellsociety.org',
      phone: '020 8961 7795'
    },
    opportunity: 'Co-create educational content – e.g. embed Safe Kev\'s safety tips into SCS\'s children\'s activities or helpline resources, leveraging SCS\'s reach and clinical expertise to ensure accuracy and national uptake.',
    status: 'not-contacted',
    notes: ''
  },
  {
    id: 8,
    category: 'sickle-cell',
    name: 'OSCAR Birmingham',
    website: 'oscarbirmingham.org.uk',
    description: 'Community-based charity in Birmingham raising awareness and supporting local SCD/Thalassaemia patients.',
    programs: 'Organisation for Sickle Cell Anaemia Support',
    contact: {
      team: 'Hobby Rahman (Head of Service & Development)',
      email: 'admin@oscarbirmingham.org.uk',
      phone: '0121 212 9209'
    },
    opportunity: 'Joint workshops for youth – collaborate to run Safe Kev "Living Safely with Sickle Cell" workshops for children and parents in Birmingham, combining OSCAR\'s on-the-ground support with Safe Kev\'s safety curriculum.',
    status: 'not-contacted',
    notes: ''
  },
  {
    id: 9,
    category: 'sickle-cell',
    name: 'Sickle Cell Care Manchester (SCCM)',
    website: 'sicklecellcaremanchester.co.uk',
    description: 'Community-led charity offering advocacy, education and peer support to those affected by SCD in Greater Manchester.',
    programs: 'Education & Outreach program, peer support',
    contact: {
      team: 'Anthony Mason (Chief Executive Officer)',
      email: 'admin@sicklecellcaremanchester.co.uk',
      phone: '0161 277 7648'
    },
    opportunity: 'School outreach in Manchester – team up with SCCM\'s Education & Outreach program to integrate Safe Kev\'s content into school workshops and community events, expanding Safe Kev\'s reach through their networks and NHS partnerships.',
    status: 'not-contacted',
    notes: ''
  },
  {
    id: 10,
    category: 'sickle-cell',
    name: 'ACLT (African Caribbean Leukaemia Trust)',
    website: 'aclt.org',
    description: 'An inspiring charity giving hope to patients with blood disorders by recruiting stem cell, blood, and organ donors, especially from Black communities.',
    programs: 'Donor recruitment, awareness campaigns',
    contact: {
      team: 'Orin Lewis OBE & Beverley De-Gale OBE (Co-Founders)',
      email: 'info@aclt.org',
      phone: '020 3757 7700'
    },
    opportunity: 'Awareness + Donor Drives – partner on campaigns to educate Safe Kev\'s young audience about blood donation and bone marrow registers. Create a youth-friendly "Safe Blood, Safe Lives" module with ACLT, encouraging teens (and their families) to become donors – boosting donor numbers for sickle cell patients.',
    status: 'not-contacted',
    notes: ''
  },

  // YOUTH HEALTH & COMMUNITY ORGANIZATIONS
  {
    id: 11,
    category: 'youth',
    name: 'Association for Young People\'s Health (AYPH)',
    website: 'ayph.org.uk',
    description: 'UK charity dedicated to the health and wellbeing of 10–25 year-olds. Provides research, youth participation, and health resources for professionals.',
    programs: 'Young People\'s Health Partnership forums, research, training',
    contact: {
      team: 'Emma Rigby (Chief Executive)',
      email: 'info@ayph.org.uk',
      phone: '020 7922 7715'
    },
    opportunity: 'Youth Health Policy & Training – collaborate to include Safe Kev\'s sickle cell safety insights in AYPH\'s guidance for schools or in the Young People\'s Health Partnership forums. This elevates Safe Kev\'s profile in national discussions and ensures young voices with sickle cell are heard in health strategy.',
    status: 'not-contacted',
    notes: ''
  },
  {
    id: 12,
    category: 'youth',
    name: 'YoungMinds',
    website: 'youngminds.org.uk',
    description: 'The UK\'s leading mental health charity for young people, supporting youth and parents on emotional well-being.',
    programs: 'Mental health support, crisis intervention, parent helpline',
    contact: {
      team: 'Abigail Ampofo (Interim CEO)',
      email: 'ymenquiries@youngminds.org.uk',
      phone: '020 7089 5050'
    },
    opportunity: 'Mental Health Support for Sickle Cell – partner to develop resources on coping with chronic illness, stress and identity (Safe Kev\'s character could front a campaign on resilience). YoungMinds\' expertise in youth mental health plus Safe Kev\'s niche knowledge can produce tailored guides for sickle cell warriors dealing with anxiety or school pressures.',
    status: 'not-contacted',
    notes: ''
  },
  {
    id: 13,
    category: 'youth',
    name: 'The Mix',
    website: 'themix.org.uk',
    description: 'The UK\'s leading support service for young people, offering free confidential help on mental health, relationships, body, money, etc. (Aimed at under-25s via web, helpline and chat.)',
    programs: 'Online advice library, helpline, crisis support',
    contact: {
      team: 'Media/Partnerships Team',
      email: 'partnerships@themix.org.uk',
      phone: '020 7009 2500'
    },
    opportunity: 'Digital Content & Signposting – integrate Safe Kev\'s safety tips into The Mix\'s online advice library (e.g. create co-branded articles or videos on managing sickle cell at school, seeking help during a pain crisis). The Mix can also signpost young users with SCD to Safe Kev\'s tools, enhancing both platforms\' reach.',
    status: 'not-contacted',
    notes: ''
  },
  {
    id: 14,
    category: 'youth',
    name: 'UK Youth',
    website: 'ukyouth.org',
    description: 'One of the UK\'s largest youth charities, networking 9,000+ youth organizations and reaching over 4 million young people across the country. Focuses on skills, leadership and youth.',
    programs: 'Award schemes, Youth Achievement Awards, national network',
    contact: {
      team: 'Ndidi Okezie OBE (CEO) or Partnerships Team',
      email: 'partnerships@ukyouth.org',
      phone: '020 4526 8371'
    },
    opportunity: 'National Outreach & Accreditation – work with UK Youth to incorporate Safe Kev\'s program into their member clubs\' activities. Safe Kev could become a module in UK Youth\'s Award schemes or a feature at the annual Youth Achievement Awards – scaling impact through UK Youth\'s vast network while empowering young leaders to champion sickle cell safety in their communities.',
    status: 'not-contacted',
    notes: ''
  },
  {
    id: 15,
    category: 'youth',
    name: 'Youth Health Champions (RSPH Initiative)',
    website: 'rsph.org.uk',
    description: 'A peer-education training programme by the Royal Society for Public Health that equips teens as certified health champions in schools.',
    programs: 'Young Health Champion certification program',
    contact: {
      team: 'General Enquiries',
      email: 'enquiries@rsph.org.uk',
      phone: '020 7265 7300'
    },
    opportunity: 'Peer Education in Schools – collaborate with RSPH to develop a sickle cell safety module within the Young Health Champion program. Trained youth champions could use Safe Kev materials to educate peers about sickle cell (reducing stigma, improving emergency responses in schools). RSPH\'s accreditation would lend credibility and embed Safe Kev into school health curricula nationwide.',
    status: 'not-contacted',
    notes: ''
  },

  // EDUCATIONAL INSTITUTIONS / CURRICULUM ORGANIZATIONS
  {
    id: 16,
    category: 'education',
    name: 'PSHE Association',
    website: 'pshe-association.org.uk',
    description: 'The national body for Personal, Social, Health & Economic education, guiding schools on health and wellbeing curriculum.',
    programs: 'PSHE curriculum development, teacher training',
    contact: {
      team: 'Info Desk',
      email: 'info@pshe-association.org.uk',
      phone: '020 4571 6239'
    },
    opportunity: 'Curriculum Integration – work with the PSHE Association to create age-appropriate lesson plans about sickle cell (e.g. understanding genetics, living with a health condition, empathy for classmates with SCD). A Safe Kev PSHE lesson pack – quality-assured by the Association – could be distributed to member schools, embedding the project into classrooms nationwide.',
    status: 'not-contacted',
    notes: ''
  },
  {
    id: 17,
    category: 'education',
    name: 'NHS Blood and Transplant (NHSBT) - Education & Partnerships',
    website: 'nhsbt.nhs.uk',
    description: 'NHS agency responsible for blood, organ, and stem cell donation services, which runs education initiatives to encourage young donors.',
    programs: 'School outreach, donor education programs',
    contact: {
      team: 'Partnerships Team',
      email: 'partnerships@nhsbt.nhs.uk',
      phone: '0300 123 23 23'
    },
    opportunity: 'School Blood Donation Awareness – partner with NHSBT to deliver joint sessions in secondary schools: Safe Kev can introduce why blood donation matters for sickle cell patients (in an age-friendly way), while NHSBT provides the medical context and a call-to-action for older students. This collaboration could fit into NHSBT\'s community outreach and help build a future generation of diverse blood donors.',
    status: 'not-contacted',
    notes: ''
  },
  {
    id: 18,
    category: 'education',
    name: 'Science Museum / STEM Education Programs',
    website: 'sciencemuseum.org.uk',
    description: 'Institutions create resources linking science curriculum to real-life health topics.',
    programs: 'Interactive workshops, British Science Week events',
    contact: {
      team: 'Learning Department',
      email: 'Via website contact form',
      phone: '020 7942 4777'
    },
    opportunity: 'Interactive Learning – collaborate to feature Safe Kev in a science engagement context – e.g. a "Sickle Cell Science" interactive workshop or an exhibit during British Science Week. This would contextualize Safe Kev\'s safety messages within biology (genetics, blood health), making the learning both fun and scientifically enriching for school groups.',
    status: 'not-contacted',
    notes: ''
  },

  // CORPORATE & TECH PARTNERS
  {
    id: 19,
    category: 'corporate',
    name: 'Novartis UK (Pharmaceutical)',
    website: 'novartis.co.uk',
    description: 'Global pharma company with a strong focus on sickle cell disease; Novartis has supported SCD patient programs and launched the "Code Red" awareness campaign in the UK.',
    programs: 'Code Red awareness campaign, patient advocacy',
    contact: {
      team: 'Patient Advocacy Team (via Novartis UK Public Affairs)',
      email: 'Via website',
      phone: '+44 1276 698370'
    },
    opportunity: 'Sickle Cell Advocacy Campaign – partner on expanding "Code Red", using Safe Kev as a youth-friendly ambassador. Novartis could provide funding and medical expertise to develop multimedia content (animations, apps) teaching young patients about treatments and empowering them to manage pain safely. This aligns with Novartis\' aim of "improving lives and tackling health inequalities in partnership with patient communities".',
    status: 'not-contacted',
    notes: ''
  },
  {
    id: 20,
    category: 'corporate',
    name: 'Vodafone Foundation UK',
    website: 'vodafonefoundation.org',
    description: 'The charitable arm of Vodafone Group, leveraging mobile technology for social good (health, education, disaster relief). Runs programs connecting underserved communities via digital tools.',
    programs: 'Digital access programs, tech for social good',
    contact: {
      team: 'Group Foundation Team',
      email: 'groupfoundation@vodafone.com',
      phone: '+44 7500 9592'
    },
    opportunity: 'Digital Access & Scale – collaborate to scale Safe Kev through mobile technology. Develop a Safe Kev mobile app or SMS service for managing sickle cell emergencies, supported by Vodafone\'s tech expertise and funding. Vodafone Foundation\'s focus on connectivity could help bring Safe Kev\'s life-saving guidance to families in hard-to-reach or low-income UK communities.',
    status: 'not-contacted',
    notes: ''
  },
  {
    id: 21,
    category: 'corporate',
    name: 'GlaxoSmithKline (GSK) - Community Programs',
    website: 'gsk.com',
    description: 'London-based pharma company with UK community health investments (e.g. the GSK IMPACT Awards for small health charities).',
    programs: 'GSK IMPACT Awards, capacity building support',
    contact: {
      team: 'GSK UK Charitable Programs',
      email: 'Via website',
      phone: '020 8047 5000'
    },
    opportunity: 'Capacity Building & Recognition – seek support via GSK\'s charitable grants or mentorship. Safe Kev could apply for a GSK IMPACT Award, which offers unrestricted funding and training for health charities. GSK\'s backing would not only fund expansion but also provide credibility and expert mentoring, enhancing Safe Kev\'s long-term sustainability.',
    status: 'not-contacted',
    notes: ''
  },
  {
    id: 22,
    category: 'corporate',
    name: 'Microsoft UK (Tech for Social Impact)',
    website: 'microsoft.com/nonprofits',
    description: 'Microsoft\'s philanthropies division assists nonprofits with technology, skills, and AI tools. (E.g. the AI for Accessibility program, and discounts for nonprofits via Tech for Social Impact.)',
    programs: 'AI for Accessibility, Azure cloud services for nonprofits',
    contact: {
      team: 'Microsoft Tech for Social Impact team',
      email: 'Via online form',
      phone: 'N/A'
    },
    opportunity: 'Technology Enhancement – partner to improve Safe Kev\'s digital delivery. Microsoft could support development of an AI-powered chatbot that answers questions from kids with sickle cell (using Azure AI services), or offer free Azure cloud services for hosting Safe Kev\'s platform. This partnership would amplify Safe Kev\'s technical capabilities, aligning with Microsoft\'s mission to "empower nonprofits to do more good" through technology.',
    status: 'not-contacted',
    notes: ''
  },
  {
    id: 23,
    category: 'corporate',
    name: 'National Grid / Utility Companies',
    website: 'nationalgrid.com',
    description: 'Corporate foundations often fund projects aiding vulnerable customers or promoting STEM education.',
    programs: 'National Grid Community Grant Programme',
    contact: {
      team: 'Community Grants',
      email: 'Via website',
      phone: 'N/A'
    },
    opportunity: 'Energy Safety Angle – If Safe Kev covers home safety (e.g. avoiding temperature extremes which can trigger sickle crises), an energy company could partner to distribute Safe Kev\'s tips to families (through newsletters or school programs). It\'s a creative angle linking health and energy usage (like ensuring warmth in winter for sickle cell patients). This demonstrates corporate social responsibility by caring for medically vulnerable customers.',
    status: 'not-contacted',
    notes: ''
  }
];

// CRM State
let filteredData = [...OUTREACH_DATA];
let currentFilters = {
  category: 'all',
  status: 'all',
  search: '',
  sort: 'name'
};

// Initialize CRM
document.addEventListener('DOMContentLoaded', () => {
  loadStatuses();
  setupEventListeners();
  renderOutreachList();
  updateStats();
});

// Load statuses from localStorage
function loadStatuses() {
  const savedStatuses = localStorage.getItem('crm_statuses');
  if (savedStatuses) {
    const statuses = JSON.parse(savedStatuses);
    OUTREACH_DATA.forEach(org => {
      if (statuses[org.id]) {
        org.status = statuses[org.id].status;
        org.notes = statuses[org.id].notes || '';
      }
    });
  }
}

// Save statuses to localStorage
function saveStatuses() {
  const statuses = {};
  OUTREACH_DATA.forEach(org => {
    statuses[org.id] = {
      status: org.status,
      notes: org.notes
    };
  });
  localStorage.setItem('crm_statuses', JSON.stringify(statuses));
}

// Setup event listeners
function setupEventListeners() {
  // Search input
  document.getElementById('search-input').addEventListener('input', (e) => {
    currentFilters.search = e.target.value.toLowerCase();
    filterAndRender();
  });

  // Category filters
  document.querySelectorAll('#category-filters .filter-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      document.querySelectorAll('#category-filters .filter-chip').forEach(c => c.classList.remove('active'));
      e.target.classList.add('active');
      currentFilters.category = e.target.dataset.category;
      filterAndRender();
    });
  });

  // Status filters
  document.querySelectorAll('#status-filters .filter-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      document.querySelectorAll('#status-filters .filter-chip').forEach(c => c.classList.remove('active'));
      e.target.classList.add('active');
      currentFilters.status = e.target.dataset.status;
      filterAndRender();
    });
  });

  // Sort select
  document.getElementById('sort-select').addEventListener('change', (e) => {
    currentFilters.sort = e.target.value;
    filterAndRender();
  });

  // Export button
  document.getElementById('export-btn').addEventListener('click', exportToCSV);
}

// Filter and render
function filterAndRender() {
  filteredData = OUTREACH_DATA.filter(org => {
    // Category filter
    if (currentFilters.category !== 'all' && org.category !== currentFilters.category) {
      return false;
    }

    // Status filter
    if (currentFilters.status !== 'all' && org.status !== currentFilters.status) {
      return false;
    }

    // Search filter
    if (currentFilters.search) {
      const searchText = currentFilters.search;
      return (
        org.name.toLowerCase().includes(searchText) ||
        org.description.toLowerCase().includes(searchText) ||
        org.contact.team.toLowerCase().includes(searchText) ||
        org.contact.email.toLowerCase().includes(searchText) ||
        org.opportunity.toLowerCase().includes(searchText)
      );
    }

    return true;
  });

  // Sort
  filteredData.sort((a, b) => {
    if (currentFilters.sort === 'name') {
      return a.name.localeCompare(b.name);
    } else if (currentFilters.sort === 'category') {
      return a.category.localeCompare(b.category);
    } else if (currentFilters.sort === 'status') {
      const statusOrder = { 'not-contacted': 0, 'contacted': 1, 'in-discussion': 2, 'partnership': 3 };
      return statusOrder[a.status] - statusOrder[b.status];
    }
    return 0;
  });

  renderOutreachList();
  updateStats();
}

// Render outreach list
function renderOutreachList() {
  const container = document.getElementById('outreach-list');
  const emptyState = document.getElementById('empty-state');

  if (filteredData.length === 0) {
    container.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  container.innerHTML = filteredData.map(org => {
    const categoryLabels = {
      'funding': 'Funding & Grants',
      'sickle-cell': 'Sickle Cell Orgs',
      'youth': 'Youth & Health',
      'education': 'Education',
      'corporate': 'Corporate & Tech'
    };

    const statusLabels = {
      'not-contacted': 'Not Contacted',
      'contacted': 'Contacted',
      'in-discussion': 'In Discussion',
      'partnership': 'Partnership'
    };

    return `
      <div class="outreach-card p-4 sm:p-6">
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div class="flex-1">
            <div class="flex flex-wrap items-center gap-2 mb-2">
              <h3 class="text-lg sm:text-xl font-bold text-gray-900">${org.name}</h3>
              <span class="category-tag">${categoryLabels[org.category]}</span>
            </div>
            <p class="text-sm text-gray-600 mb-2">${org.description}</p>
            <div class="flex flex-wrap items-center gap-3 text-sm">
              <a href="https://${org.website}" target="_blank" class="text-luxury-accent hover:underline flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
                ${org.website}
              </a>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <select
              class="status-select px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold focus:outline-none focus:border-luxury-accent"
              data-id="${org.id}"
              onchange="updateStatus(${org.id}, this.value)"
            >
              <option value="not-contacted" ${org.status === 'not-contacted' ? 'selected' : ''}>Not Contacted</option>
              <option value="contacted" ${org.status === 'contacted' ? 'selected' : ''}>Contacted</option>
              <option value="in-discussion" ${org.status === 'in-discussion' ? 'selected' : ''}>In Discussion</option>
              <option value="partnership" ${org.status === 'partnership' ? 'selected' : ''}>Partnership</option>
            </select>
          </div>
        </div>

        <!-- Expandable Details -->
        <button
          class="flex items-center gap-2 text-sm font-semibold luxury-accent hover:underline mb-2"
          onclick="toggleDetails(${org.id})"
        >
          <span>View Details</span>
          <svg id="expand-icon-${org.id}" class="w-4 h-4 expand-btn" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>

        <div id="details-${org.id}" class="details-content">
          <div class="border-t border-gray-200 pt-4 space-y-3">
            <!-- Contact Info -->
            <div>
              <h4 class="text-sm font-bold text-gray-700 mb-1">Contact Information</h4>
              <div class="text-sm space-y-1 text-gray-600">
                <p><strong>Team:</strong> ${org.contact.team}</p>
                <p><strong>Email:</strong> <a href="mailto:${org.contact.email}" class="text-luxury-accent hover:underline">${org.contact.email}</a></p>
                <p><strong>Phone:</strong> ${org.contact.phone}</p>
              </div>
            </div>

            <!-- Programs -->
            <div>
              <h4 class="text-sm font-bold text-gray-700 mb-1">Relevant Programs</h4>
              <p class="text-sm text-gray-600">${org.programs}</p>
            </div>

            <!-- Opportunity -->
            <div>
              <h4 class="text-sm font-bold text-gray-700 mb-1">Partnership Opportunity</h4>
              <p class="text-sm text-gray-600">${org.opportunity}</p>
            </div>

            <!-- Notes -->
            <div>
              <h4 class="text-sm font-bold text-gray-700 mb-1">Notes</h4>
              <textarea
                id="notes-${org.id}"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-luxury-accent"
                rows="3"
                placeholder="Add notes about this lead..."
                onchange="updateNotes(${org.id}, this.value)"
              >${org.notes}</textarea>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('total-count').textContent = filteredData.length;
}

// Toggle details
function toggleDetails(id) {
  const details = document.getElementById(`details-${id}`);
  const icon = document.getElementById(`expand-icon-${id}`);

  details.classList.toggle('expanded');
  icon.classList.toggle('rotated');
}

// Update status
function updateStatus(id, status) {
  const org = OUTREACH_DATA.find(o => o.id === id);
  if (org) {
    org.status = status;
    saveStatuses();
    updateStats();
  }
}

// Update notes
function updateNotes(id, notes) {
  const org = OUTREACH_DATA.find(o => o.id === id);
  if (org) {
    org.notes = notes;
    saveStatuses();
  }
}

// Update stats
function updateStats() {
  const stats = {
    'not-contacted': 0,
    'contacted': 0,
    'in-discussion': 0,
    'partnership': 0
  };

  OUTREACH_DATA.forEach(org => {
    stats[org.status]++;
  });

  document.getElementById('stat-not-contacted').textContent = stats['not-contacted'];
  document.getElementById('stat-contacted').textContent = stats['contacted'];
  document.getElementById('stat-in-discussion').textContent = stats['in-discussion'];
  document.getElementById('stat-partnership').textContent = stats['partnership'];
}

// Export to CSV
function exportToCSV() {
  const headers = ['Name', 'Category', 'Website', 'Contact Team', 'Email', 'Phone', 'Status', 'Programs', 'Opportunity', 'Notes'];

  const rows = filteredData.map(org => [
    org.name,
    org.category,
    org.website,
    org.contact.team,
    org.contact.email,
    org.contact.phone,
    org.status,
    `"${org.programs}"`,
    `"${org.opportunity}"`,
    `"${org.notes}"`
  ]);

  const csv = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sickle-safe-outreach-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
}

// Make functions globally accessible
window.toggleDetails = toggleDetails;
window.updateStatus = updateStatus;
window.updateNotes = updateNotes;
