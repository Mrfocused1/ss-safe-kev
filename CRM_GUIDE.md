# Outreach CRM User Guide

## Overview

The Sickle Safe Outreach CRM is a comprehensive system for tracking partnership opportunities and managing outreach efforts. It includes 23 pre-loaded organizations across 5 categories:

- **Funding & Grants** (6 organizations)
- **Sickle Cell Organizations** (4 organizations)
- **Youth & Health** (5 organizations)
- **Education** (3 organizations)
- **Corporate & Tech** (5 organizations)

## Accessing the CRM

1. Log in to the admin dashboard at `/admin`
2. Click the "Outreach CRM" button in the header
3. You'll be taken to `/crm`

Note: The CRM requires admin authentication. If you're not logged in, you'll be redirected to the admin login page.

## Features

### 1. Organization Cards

Each organization is displayed as a card with:
- **Organization Name** - The primary contact/organization name
- **Category Tag** - Color-coded category identifier
- **Description** - Brief overview of the organization
- **Website Link** - Clickable link to their website
- **Status Dropdown** - Current outreach status

### 2. Expandable Details

Click "View Details" on any card to expand and see:
- **Contact Information** - Team name, email, phone
- **Relevant Programs** - Specific programs or initiatives
- **Partnership Opportunity** - Detailed opportunity description
- **Notes Field** - Your custom notes about this lead

### 3. Status Tracking

Each lead can be in one of four statuses:

- **Not Contacted** (Gray) - Initial state, no outreach yet
- **Contacted** (Blue) - Initial contact has been made
- **In Discussion** (Yellow) - Active conversations happening
- **Partnership** (Green) - Partnership established

Change status by selecting from the dropdown on each card. Statuses are automatically saved to your browser's local storage.

### 4. Filters

**Category Filter:**
- All
- Funding & Grants
- Sickle Cell Orgs
- Youth & Health
- Education
- Corporate & Tech

**Status Filter:**
- All
- Not Contacted
- Contacted
- In Discussion
- Partnership

**Search:**
Type keywords to search across:
- Organization names
- Descriptions
- Contact names
- Email addresses
- Partnership opportunities

### 5. Sorting

Sort the list by:
- **Name (A-Z)** - Alphabetical by organization name
- **Category** - Group by category type
- **Status** - Group by outreach status

### 6. Statistics Dashboard

At the top of the page, see real-time counts:
- Total leads shown (based on filters)
- Not Contacted count
- Contacted count
- In Discussion count
- Partnership count

### 7. Export to CSV

Click "Export to CSV" to download a spreadsheet with:
- All filtered organizations
- Full contact details
- Programs and opportunities
- Current status
- Your notes

Perfect for sharing with team members or importing to other systems.

## Best Practices

### Workflow Recommendations

1. **Initial Research Phase**
   - Review all organizations in a category
   - Expand details to understand each opportunity
   - Add notes about priority level or next steps

2. **Outreach Phase**
   - Filter by "Not Contacted"
   - Prepare personalized outreach emails
   - Update status to "Contacted" after sending
   - Add notes with date and key points from email

3. **Follow-up Phase**
   - Filter by "Contacted"
   - Add notes about responses received
   - Move to "In Discussion" when dialogue begins
   - Track meeting dates and action items in notes

4. **Partnership Phase**
   - Update to "Partnership" when formalized
   - Document partnership details in notes
   - Export regularly to backup your progress

### Note-Taking Tips

Use the notes field to track:
- **Dates** - When you contacted them
- **Contact Person** - Specific name if you have it
- **Key Points** - What you discussed
- **Next Steps** - Follow-up actions needed
- **Deadlines** - Application deadlines, grant cycles
- **Requirements** - What they need from you

Example note format:
```
[2026-02-03] Sent initial email to pudseygrants@bbc.co.uk
[2026-02-10] Response received - interested in pilot program
Next step: Submit full grant application by March 15
Requirements: Budget breakdown, impact metrics
```

## Data Persistence

Your progress is automatically saved to your browser's local storage:
- **Statuses** - Automatically saved when changed
- **Notes** - Automatically saved when you stop typing
- **Filters** - Reset on page reload (not saved)

### Important Notes

- Data is stored **locally** in your browser
- If you clear browser data, you'll lose your progress
- Use CSV export regularly to backup your data
- Data is **not** synced across different browsers or devices

## Mobile Optimization

The CRM is fully responsive and works great on mobile:
- Cards stack vertically on small screens
- Filters adapt to mobile layout
- Status dropdowns remain accessible
- Notes fields resize appropriately

## Keyboard Shortcuts

- **Tab** - Navigate between fields
- **Enter** - Submit search
- **Escape** - Clear search (when focused)

## Pre-loaded Organizations

### Funding & Grant Sources (6)
1. BBC Children in Need
2. Google.org
3. Nesta (Innovation Foundation)
4. National Lottery Community Fund
5. Comic Relief (Tech for Good)
6. Social Tech Trust

### Sickle Cell Organizations (4)
7. Sickle Cell Society (SCS)
8. OSCAR Birmingham
9. Sickle Cell Care Manchester (SCCM)
10. ACLT (African Caribbean Leukaemia Trust)

### Youth Health & Community (5)
11. Association for Young People's Health (AYPH)
12. YoungMinds
13. The Mix
14. UK Youth
15. Youth Health Champions (RSPH)

### Educational Institutions (3)
16. PSHE Association
17. NHS Blood and Transplant - Education
18. Science Museum / STEM Programs

### Corporate & Tech Partners (5)
19. Novartis UK
20. Vodafone Foundation UK
21. GlaxoSmithKline (GSK)
22. Microsoft UK (Tech for Social Impact)
23. National Grid / Utility Companies

## Troubleshooting

**Problem:** Changes aren't saving
- **Solution:** Check browser privacy settings - local storage must be enabled

**Problem:** Can't access CRM
- **Solution:** Log in to admin dashboard first

**Problem:** Lost all my data
- **Solution:** Check if you cleared browser data. Restore from CSV export if available.

**Problem:** Search not working
- **Solution:** Try refreshing the page. Check for JavaScript errors in browser console.

**Problem:** Mobile view looks broken
- **Solution:** Ensure you're using a modern browser (Chrome, Safari, Firefox)

## Future Enhancements

Potential features for future versions:
- Cloud sync across devices
- Team collaboration (multiple users)
- Email integration
- Calendar reminders
- Automated follow-up tracking
- Document attachment storage
- Integration with admin dashboard analytics

## Support

For questions or issues with the CRM:
1. Check this guide first
2. Review browser console for errors
3. Export data regularly as backup
4. Contact your technical administrator

## Privacy & Security

- CRM data is stored locally in browser
- No data is transmitted to external servers
- Requires admin authentication to access
- Export files contain sensitive contact information - handle securely
- Clear browser data will remove all CRM records

---

**Last Updated:** February 2026
**Version:** 1.0
