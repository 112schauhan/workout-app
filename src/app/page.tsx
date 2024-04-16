"use client";
import CalendarPage from "@/components/CustomCalendar/CustomCalendar";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export default function Home() {

  return (
    <Provider store={store}>
      <CalendarPage />
    </Provider >
  );
}
