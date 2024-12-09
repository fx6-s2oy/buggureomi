import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";

import { MockRouteList } from "@/routes/_mock";

import Main from "@/pages/main";

import MemberJoin from "@/pages/member-join";
import MemberLogin from "@/pages/member-login";

import QuestionCreate from "@/pages/question-create";
import QuestionCreateDetail from "@/pages/question-create-detail";
import QuestionCreateComplete from "@/pages/question-create-complete";

import AnswerCreate from "@/pages/answer-create";
import AnswerResult from "@/pages/answer-result";
import SelfReflection from "@/pages/self-reflection";
import Settings from "@/pages/settings";
import QuestionComplete from "@/pages/question-complete";
import PrivateRoute from "@/routes/PrivateRoute";
import RootLayout from "@/components/RootLayout";

export default function Routing() {
  return (
    <>
      <BrowserRouter>
        <RootLayout>
          <Switch>
            {/* Route 확인용 (작업 시 꼭 추가 부탁드립니다!!) */}
            <Route exact path="/" render={() => <Redirect to={"/main"} />} />

            <Route exact path="/member-login" render={() => <MemberLogin />} />
            <Route exact path="/member-join" render={() => <MemberJoin />} />

            <Route
              exact
              path="/main"
              render={() => (
                <PrivateRoute>
                  <Main />
                </PrivateRoute>
              )}
            />

            <Route
              exact
              path="/question-create"
              render={() => (
                <PrivateRoute>
                  <QuestionCreate />
                </PrivateRoute>
              )}
            />
            <Route
              exact
              path="/question-create-detail"
              render={() => (
                <PrivateRoute>
                  <QuestionCreateDetail />
                </PrivateRoute>
              )}
            />
            <Route
              exact
              path="/question-create-complete"
              render={() => (
                <PrivateRoute>
                  <QuestionCreateComplete />
                </PrivateRoute>
              )}
            />
            <Route
              exact
              path="/question-complete"
              render={() => (
                <PrivateRoute>
                  <QuestionComplete />
                </PrivateRoute>
              )}
            />

            <Route
              exact
              path="/self-reflection"
              render={() => (
                <PrivateRoute>
                  <SelfReflection />
                </PrivateRoute>
              )}
            />

            <Route
              exact
              path="/answer-create"
              render={() => (
                <PrivateRoute>
                  <AnswerCreate />
                </PrivateRoute>
              )}
            />
            <Route
              exact
              path="/answer-result"
              render={() => (
                <PrivateRoute>
                  <AnswerResult />
                </PrivateRoute>
              )}
            />
            <Route
              exact
              path="/settings"
              render={() => (
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              )}
            />

            <Redirect to="/" />
          </Switch>
        </RootLayout>
      </BrowserRouter>
    </>
  );
}
