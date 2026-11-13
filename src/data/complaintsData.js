/**
 * Sample Complaints and Grievance Data for UniSphere
 * Includes 9 required categories, ticket lifecycle, and +1/-1 metric logic
 */

export const complaintCategories = [
  {
    id: 'hostel',
    name: 'Hostel',
    icon: '🏢',
    code: 'HSTL',
    color: '#6B1E2D',
    description: 'Room maintenance, plumbing, furniture, water coolers, electrical issues in hostel blocks',
    suggestedLocations: ['Block A (Boys)', 'Block B (Girls)', 'Block C', 'Mess Hall Annex', 'Common Room']
  },
  {
    id: 'mess',
    name: 'Mess & Canteen',
    icon: '🍽️',
    code: 'MESS',
    color: '#B8A08A',
    description: 'Food quality, hygiene, menu compliance, dining hall cleanliness, drinking water',
    suggestedLocations: ['Central Mess 1', 'North Canteen', 'South Food Court', 'Night Canteen']
  },
  {
    id: 'wifi',
    name: 'Wi-Fi & Network',
    icon: '📶',
    code: 'NETW',
    color: '#48121E',
    description: 'Internet outages, captive portal login errors, low signal strength, speed throttling',
    suggestedLocations: ['Library 2nd Floor', 'Hostel Block B Wing 3', 'Computer Center Lab 4', 'Academic Block A']
  },
  {
    id: 'classroom',
    name: 'Classroom & Labs',
    icon: '🏫',
    code: 'CLAS',
    color: '#6B1E2D',
    description: 'Broken desks, projector/AV failures, air conditioning, whiteboards, microphone issues',
    suggestedLocations: ['JAO 201', 'LH-3 Auditorium', 'Mechanical Lab 102', 'CS Lab 4', 'Seminar Hall B']
  },
  {
    id: 'transportation',
    name: 'Transportation',
    icon: '🚌',
    code: 'TRAN',
    color: '#6B1E2D',
    description: 'Campus bus delays, route irregularities, shuttle overcrowding, electric golf carts',
    suggestedLocations: ['Main Gate Bus Stop', 'Hostel Shuttle Point', 'City Route Bus #4', 'Metro Connector']
  },
  {
    id: 'cleanliness',
    name: 'Cleanliness & Sanitation',
    icon: '🧹',
    code: 'CLEN',
    color: '#14b8a6',
    description: 'Restroom sanitation, overflowing trash bins, corridor cleanliness, pest control',
    suggestedLocations: ['Academic Block Restroom 2F', 'Hostel Quadrangle', 'Sports Complex', 'Library Washrooms']
  },
  {
    id: 'faculty',
    name: 'Faculty & Academic',
    icon: '📚',
    code: 'ACAD',
    color: '#ec4899',
    description: 'Curriculum scheduling conflicts, lab session access, grading queries, attendance discrepancies',
    suggestedLocations: ['Dean Academics Office', 'Department Office CSE', 'Exam Cell Wing A', 'Student Affairs']
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure & Safety',
    icon: '🏗️',
    code: 'INFR',
    color: '#f97316',
    description: 'Elevator breakdown, stairwell lighting, pathway repairs, gym equipment, fire safety',
    suggestedLocations: ['Academic Elevator #2', 'North Gate Pathway', 'Central Gymnasium', 'Sports Complex Courts']
  },
  {
    id: 'other',
    name: 'Other Grievances',
    icon: '📝',
    code: 'OTHR',
    color: '#75666A',
    description: 'Security desk issues, library fine queries, parking disputes, miscellaneous inquiries',
    suggestedLocations: ['Security Control Room', 'Central Library Circulation', 'Student Center', 'Main Gate']
  }
];

export const initialComplaintsList = [
  {
    id: 'CMP-2026-081',
    category: 'Wi-Fi & Network',
    categoryId: 'wifi',
    categoryName: 'Wi-Fi & Network',
    categoryIcon: '📶',
    categoryColor: '#48121E',
    subject: 'Persistent 5GHz Wi-Fi Dropouts in Hostel Block B',
    location: 'Hostel Block B Wing 3',
    date: '2026-10-14',
    status: 'Resolved',
    priority: 'High',
    description: 'Wi-Fi routers consistently fail after 9:00 PM when student traffic peaks. Access point requires firmware reset or channel upgrade.',
    resolutionNote: 'Network Operations team replaced AP-304 and configured load balancing. Verified on Oct 16.',
    reportedBy: 'Alex Sharma'
  },
  {
    id: 'CMP-2026-094',
    category: 'Classroom & Labs',
    categoryId: 'classroom',
    categoryName: 'Classroom & Labs',
    categoryIcon: '🏫',
    categoryColor: '#6B1E2D',
    subject: 'Overhead Projector HDMI Port Faulty in Hall 302',
    location: 'Academic Block A Room 201',
    date: '2026-10-16',
    status: 'In Progress',
    priority: 'Urgent',
    description: 'The ceiling projector produces heavy green tint and flickers during CS-301 lectures. Faculty laptop connections disconnect intermittently.',
    resolutionNote: 'Work order assigned to AV Services. Replacement cable en route.',
    reportedBy: 'Alex Sharma'
  },
  {
    id: 'CMP-2026-102',
    category: 'Mess & Canteen',
    categoryId: 'mess',
    categoryName: 'Mess & Canteen',
    categoryIcon: '🍽️',
    categoryColor: '#B8A08A',
    subject: 'Evening Tea Snacks Hygiene & Drinking Water Dispenser Check',
    location: 'Central Mess 1',
    date: '2026-10-17',
    status: 'Pending',
    priority: 'High',
    description: 'The reverse osmosis filter on dispenser #2 displayed a service filter alarm yesterday. Water temperature control is also fluctuating.',
    resolutionNote: 'Pending review by Mess Sanitation Warden.',
    reportedBy: 'Sneha Reddy'
  },
  {
    id: 'CMP-2026-108',
    category: 'Infrastructure & Safety',
    categoryId: 'infrastructure',
    categoryName: 'Infrastructure & Safety',
    categoryIcon: '🏗️',
    categoryColor: '#f97316',
    subject: 'Digital Multimeter Terminals Corroded in Hardware Lab 2',
    location: 'Central Gymnasium',
    date: '2026-10-18',
    status: 'Submitted',
    priority: 'Medium',
    description: 'Benches 5 and 6 have damaged test probes, causing erratic resistance readings in the afternoon lab experiment.',
    resolutionNote: 'Ticket logged; awaiting lab superintendent assignment.',
    reportedBy: 'Alex Sharma'
  }
];

export const COMPLAINT_CATEGORIES = complaintCategories;
export const INITIAL_COMPLAINTS = initialComplaintsList;

export default {
  complaintCategories,
  initialComplaintsList,
  COMPLAINT_CATEGORIES,
  INITIAL_COMPLAINTS
};
