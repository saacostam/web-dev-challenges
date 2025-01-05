import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChallengeByIdView, HomeView } from "../../views";
import { MainLayout } from "../../layout";
import { Error404 } from "../../error-handling";

export function AppRouter() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/:id" element={<ChallengeByIdView />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
