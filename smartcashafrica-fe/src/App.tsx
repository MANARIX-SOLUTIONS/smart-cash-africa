import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PublicRoute } from "@/components/auth/PublicRoute";
import { HomeRoute } from "@/components/routing/HomeRoute";
import { PageSkeleton } from "@/components/ui/Skeleton";

const Login = lazy(() =>
  import("@/pages/auth/Login").then((m) => ({ default: m.Login })),
);
const Signup = lazy(() =>
  import("@/pages/auth/Signup").then((m) => ({ default: m.Signup })),
);
const ForgotPassword = lazy(() =>
  import("@/pages/auth/ForgotPassword").then((m) => ({
    default: m.ForgotPassword,
  })),
);
const Terms = lazy(() =>
  import("@/pages/legal/Terms").then((m) => ({ default: m.Terms })),
);
const Privacy = lazy(() =>
  import("@/pages/legal/Privacy").then((m) => ({ default: m.Privacy })),
);
const Onboarding = lazy(() =>
  import("@/pages/onboarding/Onboarding").then((m) => ({
    default: m.Onboarding,
  })),
);
const Dashboard = lazy(() =>
  import("@/pages/Dashboard").then((m) => ({ default: m.Dashboard })),
);
const Accounts = lazy(() =>
  import("@/pages/Accounts").then((m) => ({ default: m.Accounts })),
);
const AccountDetail = lazy(() =>
  import("@/pages/AccountDetail").then((m) => ({
    default: m.AccountDetail,
  })),
);
const ConnectAccount = lazy(() =>
  import("@/pages/ConnectAccount").then((m) => ({
    default: m.ConnectAccount,
  })),
);
const Transactions = lazy(() =>
  import("@/pages/Transactions").then((m) => ({ default: m.Transactions })),
);
const TransactionDetail = lazy(() =>
  import("@/pages/TransactionDetail").then((m) => ({
    default: m.TransactionDetail,
  })),
);
const Budgets = lazy(() =>
  import("@/pages/Budgets").then((m) => ({ default: m.Budgets })),
);
const BudgetDetail = lazy(() =>
  import("@/pages/BudgetDetail").then((m) => ({ default: m.BudgetDetail })),
);
const SavingsGoals = lazy(() =>
  import("@/pages/SavingsGoals").then((m) => ({ default: m.SavingsGoals })),
);
const SavingsGoalDetail = lazy(() =>
  import("@/pages/SavingsGoalDetail").then((m) => ({
    default: m.SavingsGoalDetail,
  })),
);
const NewSavingsGoal = lazy(() =>
  import("@/pages/NewSavingsGoal").then((m) => ({
    default: m.NewSavingsGoal,
  })),
);
const FinancialHealth = lazy(() =>
  import("@/pages/FinancialHealth").then((m) => ({
    default: m.FinancialHealth,
  })),
);
const AIAdvisor = lazy(() =>
  import("@/pages/AIAdvisor").then((m) => ({ default: m.AIAdvisor })),
);
const Reports = lazy(() =>
  import("@/pages/Reports").then((m) => ({ default: m.Reports })),
);
const ReportDetail = lazy(() =>
  import("@/pages/ReportDetail").then((m) => ({ default: m.ReportDetail })),
);
const Notifications = lazy(() =>
  import("@/pages/Notifications").then((m) => ({
    default: m.Notifications,
  })),
);
const Help = lazy(() =>
  import("@/pages/Help").then((m) => ({ default: m.Help })),
);
const Settings = lazy(() =>
  import("@/pages/Settings").then((m) => ({ default: m.Settings })),
);
const NotFound = lazy(() =>
  import("@/pages/NotFound").then((m) => ({ default: m.NotFound })),
);

function PageLoader({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageSkeleton />}>{children}</Suspense>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route
          path="/terms"
          element={
            <PageLoader>
              <Terms />
            </PageLoader>
          }
        />
        <Route
          path="/privacy"
          element={
            <PageLoader>
              <Privacy />
            </PageLoader>
          }
        />

        <Route element={<PublicRoute />}>
          <Route
            path="/login"
            element={
              <PageLoader>
                <Login />
              </PageLoader>
            }
          />
          <Route
            path="/signup"
            element={
              <PageLoader>
                <Signup />
              </PageLoader>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PageLoader>
                <ForgotPassword />
              </PageLoader>
            }
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            path="/onboarding"
            element={
              <PageLoader>
                <Onboarding />
              </PageLoader>
            }
          />

          <Route element={<AppLayout />}>
            <Route
              path="dashboard"
              element={
                <PageLoader>
                  <Dashboard />
                </PageLoader>
              }
            />
            <Route
              path="accounts"
              element={
                <PageLoader>
                  <Accounts />
                </PageLoader>
              }
            />
            <Route
              path="accounts/connect"
              element={
                <PageLoader>
                  <ConnectAccount />
                </PageLoader>
              }
            />
            <Route
              path="accounts/:id"
              element={
                <PageLoader>
                  <AccountDetail />
                </PageLoader>
              }
            />
            <Route
              path="transactions"
              element={
                <PageLoader>
                  <Transactions />
                </PageLoader>
              }
            />
            <Route
              path="transactions/:id"
              element={
                <PageLoader>
                  <TransactionDetail />
                </PageLoader>
              }
            />
            <Route
              path="budgets"
              element={
                <PageLoader>
                  <Budgets />
                </PageLoader>
              }
            />
            <Route
              path="budgets/:id"
              element={
                <PageLoader>
                  <BudgetDetail />
                </PageLoader>
              }
            />
            <Route
              path="savings"
              element={
                <PageLoader>
                  <SavingsGoals />
                </PageLoader>
              }
            />
            <Route
              path="savings/new"
              element={
                <PageLoader>
                  <NewSavingsGoal />
                </PageLoader>
              }
            />
            <Route
              path="savings/:id"
              element={
                <PageLoader>
                  <SavingsGoalDetail />
                </PageLoader>
              }
            />
            <Route
              path="health"
              element={
                <PageLoader>
                  <FinancialHealth />
                </PageLoader>
              }
            />
            <Route
              path="advisor"
              element={
                <PageLoader>
                  <AIAdvisor />
                </PageLoader>
              }
            />
            <Route
              path="reports"
              element={
                <PageLoader>
                  <Reports />
                </PageLoader>
              }
            />
            <Route
              path="reports/:id"
              element={
                <PageLoader>
                  <ReportDetail />
                </PageLoader>
              }
            />
            <Route
              path="notifications"
              element={
                <PageLoader>
                  <Notifications />
                </PageLoader>
              }
            />
            <Route
              path="help"
              element={
                <PageLoader>
                  <Help />
                </PageLoader>
              }
            />
            <Route
              path="settings"
              element={<Navigate to="/settings/profile" replace />}
            />
            <Route
              path="settings/:section"
              element={
                <PageLoader>
                  <Settings />
                </PageLoader>
              }
            />
            <Route
              path="*"
              element={
                <PageLoader>
                  <NotFound />
                </PageLoader>
              }
            />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
