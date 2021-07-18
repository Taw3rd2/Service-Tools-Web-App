import React, { useEffect, lazy, Suspense } from "react";

import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import { checkUserSession } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { createStructuredSelector } from "reselect";

import Navbar from './components/navbar/Navbar'
import SignInPage from "./pages/Sign-In/SignIn.page";

const HomePage = lazy(() => import("./pages/homepage/HomePage.page"));
const PartsCatalog = lazy(() => import("./pages/parts-catalog/PartsCatalog"))
const PartsQuote = lazy(() => import("./pages/parts-quote/PartsQuote.page"))
const PrintDailySlips = lazy(() => import("./pages/schedule/print/PrintDailySlips"))
const PrintOneSlip = lazy(() => import("./pages/schedule/print/PrintOneSlip"))
const Schedule = lazy(() => import("./pages/schedule/Schedule.page"));
const Settings = lazy(() => import("./pages/settings/Settings.page"));
const SignUp = lazy(() => import("./pages/sign-up/SignUp.page"));

function App({ currentUser, checkUserSession }) {

  useEffect(() => {
    checkUserSession()
  }, [checkUserSession]);

  return (
    <div>
      <Navbar />
      <Switch>
        <Route 
          exact
          path="/signin"
          render={() => (currentUser ? <Redirect to="/" /> : <SignInPage />)}
        />

        <Route 
          exact
          path="/"
          render={() => (
            <Suspense fallback={<p>Loading...</p>}>
              <HomePage />
            </Suspense>
          )}
        />

        <Route 
          path="/schedule"
          render={() => (
            <Suspense fallback={<p>Loading...</p>}>
              <Schedule />
            </Suspense>
          )}
        />

        <Route
          path="/settings"
          render={() => (
            <Suspense fallback={<p>Loading...</p>}>
              <Settings />
            </Suspense>
          )}
        />

        <Route
          path="/PartsCatalog"
          render={() => (
            <Suspense fallback={<p>Loading...</p>}>
              <PartsCatalog />
            </Suspense>
          )}
        />

        <Route 
          path="/signup"
          render={() => (
            <Suspense fallback={<p>Loading...</p>}>
              <SignUp />
            </Suspense>
          )}
        />

        <Route
          exact 
          path="/PartsQuote"
          component={PartsQuote}
        />

        <Route
          path="/PrintDailySlips"
          render={(props) => (
            <Suspense fallback={<p>Loading...</p>}>
              <PrintDailySlips props={props} />
            </Suspense>
          )}
        />

        <Route
          path="/PrintOneSlip"
          render={(props) => (
            <Suspense fallback={<p>Loading...</p>}>
              <PrintOneSlip props={props} />
            </Suspense>
          )}
        />
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
