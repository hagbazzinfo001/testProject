# Department Management System

A modern React application for creating and managing departments with a multi-step wizard interface. Built with React, TypeScript, and Tailwind CSS.

## Features

- **Multi-step Wizard**: Guided 3-step process for department creation
- **Form Validation**: Comprehensive validation with helpful error messages
- **Role Management**: Search, filter, and assign roles to departments
- **Mock API Integration**: Simulated backend with realistic loading states and error handling
- **Responsive Design**: Works seamlessly across all device sizes
- **Modern UI**: Clean, professional interface with smooth animations

## Tech Stack

- **React 18** - Latest React with functional components and hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **Vite** - Fast development server and build tool

## Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── ProgressIndicator.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorMessage.tsx
│   ├── steps/                 # Wizard step components
│   │   ├── NameDescriptionStep.tsx
│   │   ├── AddRolesStep.tsx
│   │   └── ConfirmationStep.tsx
│   ├── CreateDepartmentWizard.tsx
│   └── SuccessNotification.tsx
├── hooks/
│   └── useApi.ts             # Custom hook for API calls
├── services/
│   └── api.ts                # Mock API service
├── types/
│   └── index.ts              # TypeScript type definitions
├── App.tsx
└── main.tsx
```

## Setup Instructions

### Prerequisites

- Node.js 16+ and npm/yarn
- Modern browser with ES6+ support

### Installation

1. **Clone the repository** (or download the project files):

   ```bash
   git clone <repository-url>
   cd department-management-system
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## Usage

1. **Launch the Application**: Click "Create Department" to start the wizard

2. **Step 1 - Name & Description**:

   - Enter a department name (required)
   - Add a detailed description (required, max 500 characters)
   - Form validation ensures all fields are completed

3. **Step 2 - Add Roles**:

   - Browse available roles from the mock database
   - Use search functionality to find specific roles
   - Filter by department to narrow down options
   - Add roles to your department (at least one required)
   - Remove roles if needed

4. **Step 3 - Confirmation**:
   - Review all entered information
   - Submit to create the department
   - Success notification confirms completion

## Mock API

The application includes a comprehensive mock API that simulates real backend behavior:

### Endpoints

- `getRoles()` - Fetch all available roles
- `createDepartment(data)` - Create a new department
- `getDepartments()` - Get all departments

### Features

- **Realistic Delays**: Simulates network latency (600-1200ms)
- **Error Simulation**: Random failures to test error handling
- **Data Validation**: Server-side validation with error messages
- **Loading States**: Proper loading indicators during API calls

## Form Validation

Comprehensive validation includes:

- **Required Field Validation**: Ensures all mandatory fields are completed
- **Character Limits**: Enforces maximum lengths with counters
- **Role Selection**: Validates at least one role is selected
- **Real-time Feedback**: Immediate error clearing when users correct issues
- **Server-side Validation**: Additional validation from mock API

## Error Handling

Robust error handling throughout the application:

- **API Errors**: Network failures and server errors
- **Validation Errors**: Form field validation with helpful messages
- **Retry Mechanisms**: Ability to retry failed operations
- **User Feedback**: Clear error messages and loading states

## Responsive Design

The application is fully responsive with:

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: Tailored layouts for mobile, tablet, and desktop
- **Flexible Grid**: Adaptive layouts that work on any screen size
- **Touch Friendly**: Appropriate touch targets for mobile users

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Future Enhancements

- **Data Persistence**: Connect to a real database
- **User Authentication**: Add login/logout functionality
- **Department Management**: Edit and delete existing departments
- **Role Creation**: Allow creating custom roles
- **Bulk Operations**: Handle multiple departments at once
- **Export Functionality**: Export department data to CSV/PDF

## License

This project is open source and available under the [MIT License](LICENSE).
