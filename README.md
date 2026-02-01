# Password Generator 🔐

A professional, modern password generator built with React. Features a clean UI, real-time strength indicator, and fully customizable password options.

## Features

- 🎯 **Length Control**: Adjustable from 4 to 64 characters
- 🔤 **Character Options**: Toggle uppercase, lowercase, numbers, and symbols
- 📊 **Strength Indicator**: Real-time visual feedback on password strength
- 📋 **Copy to Clipboard**: One-click copy functionality
- 🎨 **Modern UI**: Sleek, responsive design with animations
- ⚡ **Fast & Lightweight**: Built with performance in mind

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Vitest** - Testing

## Project Structure

```
password-generator/
├── src/
│   ├── components/
│   │   ├── PasswordGenerator.jsx    # Main component
│   │   ├── StrengthIndicator.jsx    # Strength display
│   │   └── PasswordOptions.jsx      # Option toggles
│   ├── hooks/
│   │   └── usePasswordGenerator.js  # Password generation logic
│   ├── utils/
│   │   └── passwordUtils.js         # Helper functions
│   ├── App.jsx                      # App entry point
│   └── main.jsx                     # ReactDOM render
├── public/                          # Static assets
├── tests/                           # Test files
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Lint code
npm run lint
```

## Usage

1. Adjust the password length using the slider (4-64 characters)
2. Toggle character types (uppercase, lowercase, numbers, symbols)
3. Click the refresh icon to generate a new password
4. Click the copy icon to copy the password to clipboard
5. Monitor the strength indicator for password quality

## Password Strength Calculation

The strength indicator evaluates passwords based on:
- Length (12+ characters recommended)
- Character variety (uppercase, lowercase, numbers, symbols)
- Overall complexity

**Strength Levels:**
- 🔴 **Weak** (0-40 points): Basic password, easily guessable
- 🟡 **Fair** (41-65 points): Moderate security
- 🟢 **Good** (66-85 points): Strong security
- 🔵 **Strong** (86-100 points): Excellent security

## Key Features Explained

### Secure Generation
- Uses cryptographically secure random generation
- Guarantees at least one character from each selected type
- Shuffles password to randomize character positions

### User Experience
- Instant visual feedback on password strength
- Smooth animations and transitions
- Responsive design for all screen sizes
- Accessible UI with keyboard navigation

### Code Quality
- Modular component architecture
- Custom hooks for logic separation
- Utility functions for reusability
- Well-documented code

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Security Notes

- All passwords are generated client-side
- No passwords are stored or transmitted
- Uses Math.random() (consider crypto.getRandomValues() for production)
- Clipboard API requires HTTPS in production

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using React and modern web technologies