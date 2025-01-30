# 🏋️‍♂️ Health Challenge Tracker

> A **single-page Angular 19+ application** to track user workouts, including search, filter, pagination, and workout progress charts.

#Deployed Link: https://healthtracker123.netlify.app/

## 🚀 Features

✅ Add user workouts with:
- **User Name**
- **Workout Type (Running, Cycling, Yoga)**
- **Workout Minutes**

✅ Display workout list with:
- **Search by user name**
- **Filter by workout type**
- **Pagination for more than 5 users**
- **Total workout minutes**
- **Number of workouts per user**
- **View workout progress using charts**

✅ Store workout data using **`localStorage`**.

---

## 🛠️ Tech Stack

- **Angular 19+**
- **TypeScript**
- **Tailwind CSS**
- **ECharts (`ngx-echarts`)** for charts
- **LocalStorage** for data persistence

---

### **1️⃣ Clone Repository**
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/health-challenge-tracker.git
cd health-challenge-tracker
2️⃣ Install Dependencies
bash
Copy
Edit
npm install
3️⃣ Start Development Server
bash
Copy
Edit
ng serve
Open http://localhost:4200/ in your browser.

📁 Folder Structure
css
Copy
Edit
health-challenge-tracker/
│── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── workout-form/       ➝ User input form
│   │   │   ├── workout-list/       ➝ List with search, filter, pagination
│   │   │   ├── workout-chart/      ➝ Workout progress charts
│   │   ├── services/
│   │   │   ├── workout.service.ts  ➝ Manages LocalStorage data
│   │   ├── app.module.ts
│   │   ├── app.component.ts
│── angular.json
│── package.json
│── README.md
🔬 Unit Testing & Code Coverage
🧪 Unit Testing
We have included unit tests for:

WorkoutListComponent (Component)
WorkoutService (Service)
Run Unit Tests
bash
Copy
Edit
ng test
📊 Code Coverage Report
To ensure high-quality code, we maintain 100% test coverage.

Generate Code Coverage
bash
Copy
Edit
ng test --code-coverage
View Code Coverage
Open the report:
bash
Copy
Edit
open coverage/index.html  # macOS
xdg-open coverage/index.html  # Linux
start coverage/index.html  # Windows
Navigate inside the coverage/ folder to view detailed breakdowns.
✅ Our project maintains 100% test coverage for these modules.

🔧 Configuration
ECharts Configuration (main.ts)
Ensure ECharts is properly configured:

typescript
Copy
Edit
import { provideEchartsCore } from 'ngx-echarts';

bootstrapApplication(AppComponent, {
  providers: [
    provideEchartsCore({ echarts: () => import('echarts') })
  ]
});

