import { Provider } from "react-redux";
import { store } from "../store/store";
import { Header } from "./Header/Header";
import { Outlet, Route, Routes } from "react-router-dom";
import { Content } from "./Content/Content";
import { TimerBlock } from "../pages/TimerBlock/TimerBlock";
import { Statistic } from "../pages/Statistic/Statistic";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useEffect } from "react";
import { setCurrentDateEmpty } from "../store/slice/statSlice";
import { CurrentContextProvider } from "../context/currentContext";


export function AppWrapper() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setCurrentDateEmpty())
  }, [])
  return (
    <Content>
      <Header />
      <Routes>
        <Route path="/" element={<TimerBlock />} />
        <Route path="/statistic" element={<Statistic />} />
      </Routes>
    </Content>

  );
};

export const App = () => {
  return (
    <Provider store={store}>
      <CurrentContextProvider>
        <AppWrapper />
      </CurrentContextProvider>
    </Provider>
  )

}
