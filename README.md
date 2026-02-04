# Radiology Patient Management Interface

## 📝 Project Objective

This project is a basic patient management interface designed for a radiology diagnostics platformThe primary goal is to interact with a mock FHIR server to retrieve and display patient information using React, TypeScript, and FHIR standards5.

## 🚀 Features

-**Patient List View**: Fetches and displays a comprehensive list of patients from the mock FHIR server. -**Patient Detail View**: Allows users to select a patient to view detailed information, including name, gender, birth date, and address. -**FHIR Integration**: Connects to the HAPI FHIR or SmartHealth IT R4 server using a dedicated FHIR client. -**Navigation**: Seamless transition between the list view and specific patient details using React Router. -**Error Handling**: Basic implementation of network request error handling with UI notifications.

## 🛠️ Technical Stack

-**Framework**: React. -**Language**: TypeScript for strong typing and interface definitions.

- **UI Library**: Material UI (MUI) with a centralized theme to avoid hardcoded colors. -**FHIR Client**: `fhirclient` for standardized data fetching.
- **Routing**: `react-router-dom` for application navigation.

## ⚙️ Installation & Setup

1.  **Clone the Repository**:

    ```bash
    git clone <your-repo-url>
    cd radiology-interface
    ```

2.  **Install Dependencies**:

    ```bash
    npm install
    ```

3.  **Start the Application**:
    ```bash
    npm start
    ```
    The application will run on `http://localhost:3000`.

## 🏗️ Implementation Approach

### Data Fetching & FHIR

The application uses the `fhirclient` to connect to a public R4 endpoint.It maps FHIR-specific resources (like `Patient`) to TypeScript interfaces to ensure data integrity.

### Centralized Styling

To maintain code quality and avoid hardcoded values like #fff, a global theme is implemented via MUI's `ThemeProvider`. This allows for consistent branding (e.g., using primary colors for headers) and easy updates to the UI's look and feel.

### Component Structure

- `App.tsx`: The main entry point containing the router and theme provider. -`PatientList.tsx`: Handles the "List View" requirement, including pagination logic. -`PatientDetail.tsx`: Handles the "Detail View" for specific patient IDs. -`NotificationContext.tsx`: Manages error messaging and UI feedback.
