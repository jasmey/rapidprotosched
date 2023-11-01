import React, { useState } from "react";
import "./App.css";
import Banner from "./components/banner.jsx";
import TermPage from "./components/TermPage.jsx";
import EditForm from "./components/EditForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useJsonQuery } from "./utilities/fetch";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthState, useDbData } from "./utilities/firebase";
import { useProfile } from "./utilities/profile";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Main = () => {
  const [data, isLoading, error] = useDbData("/");
  const user = useAuthState();
  const [profile, profileLoading, profileError] = useProfile();

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!data) return <h1>No user data found</h1>;

  if (profileError) return <h1>Error loading profile: {`${profileError}`}</h1>;
  if (profileLoading) return <h1>Loading user profile</h1>;
  if (!profile) return <h1>No profile data</h1>;

  console.log(data);

  return (
    <div>
      <Banner title={data.title} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<TermPage courses={data.courses} profile={profile} />}
          />
          {user ? (
            <Route
              path="/editform/:courseid"
              element={<EditForm courses={data.courses} />}
            />
          ) : null}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div className="container">
      <Main />
    </div>
  </QueryClientProvider>
);

export default App;
