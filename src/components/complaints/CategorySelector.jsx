import React from 'react';

// 9 Official Campus Complaint Categories
export const COMPLAINT_CATEGORIES = [
  {
    id: 'hostel',
    name: 'Hostel',
    icon: '🏢',
    code: 'HSTL',
    color: '#6B1E2D',
    description:
      'Room maintenance, plumbing, furniture, water coolers, electrical issues in hostel blocks',
    suggestedLocations: [
      'Block A (Boys)',
      'Block B (Girls)',
      'Block C',
      'Mess Hall Annex',
      'Common Room',
    ],
  },
  {
    id: 'mess',
    name: 'Mess & Canteen',
    icon: '🍽️',
    code: 'MESS',
    color: '#B8A08A',
    description:
      'Food quality, hygiene, menu compliance, dining hall cleanliness, drinking water',
    suggestedLocations: [
      'Central Mess 1',
      'North Canteen',
      'South Food Court',
      'Night Canteen',
    ],
  },
  {
    id: 'wifi',
    name: 'Wi-Fi & Network',
    icon: '📶',
    code: 'NETW',
    color: '#48121E',
    description:
      'Internet outages, captive portal login errors, low signal strength, speed throttling',
    suggestedLocations: [
      'Library 2nd Floor',
      'Hostel Block B Wing 3',
      'Computer Center Lab 4',
      'Academic Block A',
    ],
  },
  {
    id: 'classroom',
    name: 'Classroom & Labs',
    icon: '🏫',
    code: 'CLAS',
    color: '#6B1E2D',
    description:
      'Broken desks, projector/AV failures, air conditioning, whiteboards, microphone issues',
    suggestedLocations: [
      'JAO 201',
      'LH-3 Auditorium',
      'Mechanical Lab 102',
      'CS Lab 4',
      'Seminar Hall B',
    ],
  },
  {
    id: 'transportation',
    name: 'Transportation',
    icon: '🚌',
    code: 'TRAN',
    color: '#6B1E2D',
    description:
      'Campus bus delays, route irregularities, shuttle overcrowding, electric golf carts',
    suggestedLocations: [
      'Main Gate Bus Stop',
      'Hostel Shuttle Point',
      'City Route Bus #4',
      'Metro Connector',
    ],
  },
  {
    id: 'cleanliness',
    name: 'Cleanliness & Sanitation',
    icon: '🧹',
    code: 'CLEN',
    color: '#14b8a6',
    description:
      'Restroom sanitation, overflowing trash bins, corridor cleanliness, pest control',
    suggestedLocations: [
      'Academic Block Restroom 2F',
      'Hostel Quadrangle',
      'Sports Complex',
      'Library Washrooms',
    ],
  },
  {
    id: 'faculty',
    name: 'Faculty & Academic',
    icon: '📚',
    code: 'ACAD',
    color: '#ec4899',
    description:
      'Curriculum scheduling conflicts, lab session access, grading queries, attendance discrepancies',
    suggestedLocations: [
      'Dean Academics Office',
      'Department Office CSE',
      'Exam Cell Wing A',
      'Student Affairs',
    ],
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure & Safety',
    icon: '🏗️',
    code: 'INFR',
    color: '#f97316',
    description:
      'Elevator breakdown, stairwell lighting, pathway repairs, gym equipment, fire safety',
    suggestedLocations: [
      'Academic Elevator #2',
      'North Gate Pathway',
      'Central Gymnasium',
      'Sports Complex Courts',
    ],
  },
  {
    id: 'other',
    name: 'Other Grievances',
    icon: '📝',
    code: 'OTHR',
    color: '#75666A',
    description:
      'Security desk issues, library fine queries, parking disputes, miscellaneous inquiries',
    suggestedLocations: [
      'Security Control Room',
      'Central Library Circulation',
      'Student Center',
      'Main Gate',
    ],
  },
];

export function CategorySelector({
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <div className="category-selector-wrapper">
      <style>{`
        .category-selector-wrapper {
          width: 100%;
          margin-bottom: 32px;
          font-family: inherit;
        }

        .category-selector__heading-box {
          margin-bottom: 24px;
        }

        .category-selector__eyebrow {
          font-size: 0.72rem;
          font-weight: 800;
          color: #6B1E2D;
          letter-spacing: 0.08em;
          background-color: #F8F3EA;
          padding: 4px 10px;
          border-radius: 9999px;
          display: inline-block;
          margin-bottom: 10px;
        }

        .category-selector__question {
          font-size: 1.65rem;
          font-weight: 800;
          color: var(--text-primary, #241A1C);
          line-height: 1.25;
          margin: 0 0 6px 0;
          letter-spacing: -0.01em;
        }

        .category-selector__instruction {
          font-size: 0.9rem;
          color: var(--text-secondary, #75666A);
          margin: 0;
          line-height: 1.5;
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(
            auto-fill,
            minmax(260px, 1fr)
          );
          gap: 18px;
        }

        .category-card {
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
          appearance: none;
          -webkit-appearance: none;

          text-align: left;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          border: 1.5px solid var(--border-color, #E5DCD4);
          border-radius: 18px;

          transition:
            transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
            border-color 0.2s ease,
            box-shadow 0.2s ease,
            background-color 0.2s ease;

          background-color: var(--bg-card, #FFFDF8);
          padding: 20px;

          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);

          font-family: inherit;
          font-size: inherit;
          color: inherit;
        }

        .category-card:hover {
          transform: translateY(-3px);
          border-color: #6B1E2D;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        }

        .category-card:focus-visible {
          outline: 3px solid rgba(107, 30, 45, 0.25);
          outline-offset: 3px;
        }

        .category-card:active {
          transform: translateY(-1px);
        }

        .category-card--selected {
          border-color: #6B1E2D !important;
          background-color: #F8F3EA;
          box-shadow: 0 0 0 3px rgba(107, 30, 45, 0.15);
        }

        .category-card--selected:hover {
          border-color: #6B1E2D;
          box-shadow: 0 0 0 3px rgba(107, 30, 45, 0.15),
            0 10px 25px rgba(0, 0, 0, 0.08);
        }

        .category-card__top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
        }

        .category-card__icon-box {
          width: 44px;
          height: 44px;
          min-width: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.35rem;
        }

        .category-card__code {
          font-size: 0.72rem;
          font-weight: 700;
          font-family: monospace;
          color: var(--text-muted, #9C8E92);
          background-color: var(--bg-card-subtle, #FAF6F0);
          border: 1px solid var(--border-color, #E5DCD4);
          padding: 2px 7px;
          border-radius: 6px;
          white-space: nowrap;
        }

        .category-card__content {
          flex: 1;
          margin-bottom: 16px;
        }

        .category-card__name {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary, #241A1C);
          margin: 0 0 6px 0;
          line-height: 1.3;
        }

        .category-card__desc {
          font-size: 0.8rem;
          color: var(--text-secondary, #75666A);
          line-height: 1.45;
          margin: 0;
        }

        .category-card__footer {
          border-top: 1px solid var(--border-color, #E5DCD4);
          padding-top: 12px;
        }

        .category-card__action-text {
          font-size: 0.8rem;
          font-weight: 600;
          color: #6B1E2D;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        @media (max-width: 640px) {
          .category-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .category-selector__question {
            font-size: 1.4rem;
          }

          .category-card {
            padding: 16px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .category-card {
            transition: none;
          }

          .category-card:hover,
          .category-card:active {
            transform: none;
          }
        }
      `}</style>

      <div className="category-selector__heading-box">
        <span className="category-selector__eyebrow">
          STEP 1 OF 2
        </span>

        <h2 className="category-selector__question">
          What type of complaint are you here for?
        </h2>

        <p className="category-selector__instruction">
          Select an official campus department to load its
          specialized grievance intake form.
        </p>
      </div>

      <div className="category-grid">
        {COMPLAINT_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory?.id === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              className={`category-card ${
                isSelected ? 'category-card--selected' : ''
              }`}
              onClick={() => onSelectCategory(cat)}
              aria-pressed={isSelected}
              aria-label={`Select ${cat.name} complaint category`}
            >
              <div className="category-card__top">
                <div
                  className="category-card__icon-box"
                  style={{
                    backgroundColor: `${cat.color}15`,
                    color: cat.color,
                  }}
                  aria-hidden="true"
                >
                  <span>{cat.icon}</span>
                </div>

                <span className="category-card__code">
                  {cat.code}
                </span>
              </div>

              <div className="category-card__content">
                <h3 className="category-card__name">
                  {cat.name}
                </h3>

                <p className="category-card__desc">
                  {cat.description}
                </p>
              </div>

              <div className="category-card__footer">
                <span className="category-card__action-text">
                  {isSelected
                    ? 'Selected ✓'
                    : 'Select Category →'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
