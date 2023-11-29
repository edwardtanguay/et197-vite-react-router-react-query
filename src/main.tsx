import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import "./index.scss";
import {
	PageReactRouter,
	loader as pageReactRouterLoader,
} from "./pages/PageReactRouter.tsx";
import { PageReactQuery } from "./pages/PageReactQuery.tsx";
import { Page404 } from "./pages/Page404.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PageSkills } from "./pages/PageSkills.tsx";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			retry: 2,
		},
	},
});

const router = createBrowserRouter([
	{
		path: "/",
		errorElement: <Page404 />,
		element: <App />,
		children: [
			{
				path: "/react-router",
				element: <PageReactRouter />,
				loader: pageReactRouterLoader,
			},
			{
				path: "react-query",
				element: <PageReactQuery />,
			},
			{
				path: "skills",
				element: <PageSkills />,
			},
			{
				path: "error",
				element: <Page404 />,
			},
			{
				path: "/",
				element: <Navigate to="/react-router" replace />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<QueryClientProvider client={queryClient}>
		<ReactQueryDevtools />
		<RouterProvider router={router} />
	</QueryClientProvider>
);
