Please design a modern, festive countdown web component with the following specifications:

Core Features:
- Two countdown timers: one for Christmas 2024 and one for New Year 2025
- Timezone selector defaulting to EAT (Africa/Nairobi)
- Confetti animation when either countdown reaches zero

Visual Design:
- Clean, minimalist interface with festive accents
- Each countdown should display days, hours, minutes, and seconds
- Responsive layout that works well on both mobile and desktop
- Christmas timer should include a gift icon
- New Year timer should include a fireworks icon

Technical Requirements:
- Built using React
- Use Ant Design (antd) for the timezone selector
- Use react-icons for icons if need be
- Include canvas-confetti and react-confetti I need to see the differences of these two
- All timezones should be dynamically loaded using Intl.supportedValuesOf('timeZone') or any other better one you know of

Component Structure:
- Main container with a festive title
- Timezone selector dropdown below the title with search since time zones might be many
- Two countdown cards arranged horizontally on desktop, stacking on mobile
- Each countdown card should have:
  * Icon and title at the top
  * Time units displayed in a grid (days, hours, minutes, seconds)
  * Each unit should show the number and label
  * Numbers should have leading zeros for single digits and make it look nice and visually aealing

Styling Guidelines:
- Use a light, clean background
- Festive colors (reds and greens) as accents
- Subtle shadows for depth
- Comfortable padding and spacing
- Clear typography hierarchy

Please provide the complete React component code with proper styling and full functionality.