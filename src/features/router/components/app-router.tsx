import { HashRouter, Route, Routes } from "react-router-dom";

import { Error404 } from "../../../shared/errors/ui";
import { AdaptersProvider } from "../../../shared/adapters/core/ui";
import { MainLayout } from "../../../shared/layout";
import { RepositoriesProvider } from "../../../shared/repositories/ui";
import { ChallengeByIdView, HomeView } from "../../../shared/views";

export function AppRouter() {
  return (
    <HashRouter>
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
    </HashRouter>
  );
}
