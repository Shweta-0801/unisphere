/* eslint-disable react-refresh/only-export-components */
// 9 Official Campus Complaint Categories
export const COMPLAINT_CATEGORIES = [
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

export function CategorySelector({ selectedCategory, onSelectCategory }) {
  return (
    <div className="category-selector-wrapper">
      <div className="category-selector__heading-box">
        <span className="category-selector__eyebrow">STEP 1 OF 2</span>
        <h2 className="category-selector__question">What type of complaint are you here for?</h2>
        <p className="category-selector__instruction">Select an official campus department to load its specialized grievance intake form.</p>
      </div>

      <div className="category-grid">
        {COMPLAINT_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory?.id === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              className={`category-card ${isSelected ? 'category-card--selected' : ''}`}
              onClick={() => onSelectCategory(cat)}
              aria-pressed={isSelected}
              aria-label={`Select ${cat.name} complaint category`}
            >
              <div className="category-card__top">
                <div className={`category-card__icon-box complaint-category-color--${cat.id}`}>
                  <span>{cat.icon}</span>
                </div>
                <span className="category-card__code">{cat.code}</span>
              </div>

              <div className="category-card__content">
                <h3 className="category-card__name">{cat.name}</h3>
                <p className="category-card__desc">{cat.description}</p>
              </div>

              <div className="category-card__footer">
                <span className="category-card__action-text">
                  {isSelected ? 'Selected ✓' : 'Select Category →'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CategorySelector;
