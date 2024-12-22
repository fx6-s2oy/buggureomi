import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";

import Main from "@/pages/main";

import MemberJoin from "@/pages/member-join";
import MemberLogin from "@/pages/login-sso";
import OAuth from "@/pages/oauth";

import QuestionCreate from "@/pages/question-create";
import QuestionCreateDetail from "@/pages/question-create-detail";
import QuestionCreateComplete from "@/pages/question-create-complete";

import AnswerCreate from "@/pages/answer-create";
import AnswerResult from "@/pages/answer-result";
import SelfReflection from "@/pages/self-reflection";
import QuestionComplete from "@/pages/question-complete";
import PrivateRoute from "@/routes/PrivateRoute";
import RootLayout from "@/components/RootLayout";
import { DialogProvider } from "@/contexts/DialogContext";

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

            <Route exact path="/oauth/kakao/pending" render={() => <OAuth />} />

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
                  <DialogProvider>
                    <QuestionCreateComplete />
                  </DialogProvider>
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

            <Redirect to="/" />
          </Switch>
        </RootLayout>
      </BrowserRouter>
    </>
  );
}
