import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerProvider, {
    DocumentTitleHandler,
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "./App.css";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import {
    BookOpen,
    Building2,
    ClipboardCheck,
    GraduationCap,
    Home,
    Users,
} from "lucide-react";
import SubjectsList from "./pages/subjects/list";
import { Layout } from "./components/refine-ui/layout/layout";
import SubjectsCreate from "./pages/subjects/create";
import Dashboard from "./pages/dashboard";

import { dataProvider } from "./providers/data";


function App() {
    return (
        <BrowserRouter>
            <RefineKbarProvider>
                <ThemeProvider>
                    <DevtoolsProvider>
                        <Refine
                            dataProvider={dataProvider}
                            notificationProvider={useNotificationProvider()}
                            routerProvider={routerProvider}
                            options={{
                                syncWithLocation: true,
                                warnWhenUnsavedChanges: true,
                                projectId: "kkWuv7-GgBIfw-P8CGy0",
                            }}
                            resources={[
                                {
                                    name: "dashboard",
                                    list: "/",
                                    meta: {
                                        label: "Home",
                                        icon: <Home />,
                                    },
                                },
                                {
                                    name: "subjects",
                                    list: "/subjects",
                                    create: "/subjects/create",
                                    show: "/subjects/show/:id",
                                    meta: {
                                        label: "Subjects",
                                        icon: <BookOpen />,
                                    },
                                },
                                {
                                    name: "departments",
                                    list: "/departments",
                                    show: "/departments/show/:id",
                                    create: "/departments/create",
                                    meta: {
                                        label: "Departments",
                                        icon: <Building2 />,
                                    },
                                },
                                {
                                    name: "users",
                                    list: "/faculty",
                                    show: "/faculty/show/:id",
                                    meta: {
                                        label: "Faculty",
                                        icon: <Users />,
                                    },
                                },
                                {
                                    name: "enrollments",
                                    list: "/enrollments/create",
                                    create: "/enrollments/create",
                                    meta: {
                                        label: "Enrollments",
                                        icon: <ClipboardCheck />,
                                    },
                                },
                                {
                                    name: "classes",
                                    list: "/classes",
                                    create: "/classes/create",
                                    show: "/classes/show/:id",
                                    meta: {
                                        label: "Classes",
                                        icon: <GraduationCap />,
                                    },
                                },
                            ]}
                        >
                            <Routes>
                                <Route
                                    element={
                                        <Authenticated key="public-routes" fallback={<Outlet />}>
                                            <NavigateToResource fallbackTo="/" />
                                        </Authenticated>
                                    }
                                >
                                </Route>

                                <Route
                                    element={
                                        <Layout>
                                            <Outlet />
                                        </Layout>
                                    }
                                >
                                    <Route path="/" element={<Dashboard />} />

                                    <Route path="subjects">
                                        <Route index element={<SubjectsList />} />
                                        <Route path="create" element={<SubjectsCreate />} />
                                    </Route>


                                </Route>
                            </Routes>

                            <Toaster />
                            <RefineKbar />
                            <UnsavedChangesNotifier />
                            <DocumentTitleHandler />
                        </Refine>
                    </DevtoolsProvider>
                </ThemeProvider>
            </RefineKbarProvider>
        </BrowserRouter>
    );
}

export default App;
