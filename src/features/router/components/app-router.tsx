import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Error404 } from "../../error-handling";
import { MainLayout } from "../../../shared/layout";
import { ChallengeByIdView, HomeView } from "../../../shared/views";
import { RepositoriesProvider } from "../../../shared/repositories/ui";

export function AppRouter() {
  return (
    <BrowserRouter>
      <RepositoriesProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/:id" element={<ChallengeByIdView />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </MainLayout>
      </RepositoriesProvider>
    </BrowserRouter>
  );
}
