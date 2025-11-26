import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AdaptersProvider } from "../../../shared/adapters/core/ui";
import { MainLayout } from "../../../shared/layout";
import { RepositoriesProvider } from "../../../shared/repositories/ui";
import { ChallengeByIdView, HomeView } from "../../../shared/views";
import { Error404 } from "../../error-handling";

export function AppRouter() {
  return (
    <BrowserRouter>
      <AdaptersProvider>
        <RepositoriesProvider>
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomeView />} />
              <Route path="/:id" element={<ChallengeByIdView />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
          </MainLayout>
        </RepositoriesProvider>
      </AdaptersProvider>
    </BrowserRouter>
  );
}
