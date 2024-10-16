# Team Schedule - Project Management Application

This is a Next.js-based project management application that helps solo developers organize their project tasks, calendar, and other project management tools.

## Features

- Task Management (with sub-tasks and descriptions)
- Calendar (with event descriptions and modal view)
- Project Planning
- Time Tracking
- Bug Tracking
- Dark, Light, and Neutral Color Modes: Users can switch between these themes using a dropdown menu.
- Goal Setting and Progress Tracking: Users can set long-term goals and break them down into smaller, manageable tasks. Progress towards these goals is visualized with progress bars.
- Idea Management: A dedicated space for brainstorming and capturing ideas, ensuring everything is kept in one place, from initial idea to project completion.
- Distraction Blocking (Focus Mode): A "Focus Mode" that helps users stay on track and boost productivity by blocking distracting websites and notifications during work sessions.
- Reporting and Analytics: Detailed reports on time spent on tasks, project progress, and overall productivity, helping users identify areas for workflow and time management improvement.
- Collaboration Features: Features for sharing parts of the project or getting feedback, including generating shareable links for specific tasks or milestones and inviting collaborators on a per-project basis with controlled permissions.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3002](http://localhost:3002) with your browser to see the application.

## Usage

1. **Tasks**: Add, edit, and remove tasks and sub-tasks. Each task and sub-task can have a description.
2. **Calendar**: Add events with titles, start and end times, and descriptions. Click on an event to view full details.
3. **Project Planning**: Add milestones with due dates.
4. **Time Tracking**: Log time entries for tasks and view a chart of your time usage.
5. **Bug Tracking**: Log and manage bugs with titles, descriptions, and statuses.
6. **Theme Switching:** Use the dropdown menu to switch between light, dark, and neutral color modes.
7. **Goal Setting:** Set long-term goals and break them down into smaller tasks. Track your progress using the progress bars.
8. **Idea Management:** Use the dedicated space to brainstorm and capture your ideas.
9. **Focus Mode:** Enable Focus Mode to block distractions and boost productivity.
10. **Collaboration:** Generate shareable links or invite collaborators to your projects.

All data is stored locally in your browser and will persist between sessions.

## Data Privacy

This application uses local storage to save your data. We've configured the `.gitignore` file to prevent any personal data from being committed to the repository. This ensures that your tasks, events, and other information remain private on your local machine.

## Project Structure

- `src/app/page.tsx`: Main application component
- `src/app/layout.tsx`: Layout component
- `src/app/globals.css`: Global styles
- `next.config.mjs`: Next.js configuration
- `tailwind.config.ts`: Tailwind CSS configuration
- `.gitignore`: Specifies files and folders that should not be tracked by Git

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Headless UI](https://headlessui.com/)
- [Heroicons](https://heroicons.com/)
- [React Big Calendar](https://github.com/jquense/react-big-calendar)
- [Recharts](https://recharts.org/)

## Learn More

To learn more about Next.js, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

## Deployment

For deployment options, refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Contributing

Feel free to fork this project and make your own changes. If you have any improvements or bug fixes, pull requests are welcome!

## License

This project is open source and available under the [MIT License](LICENSE).
