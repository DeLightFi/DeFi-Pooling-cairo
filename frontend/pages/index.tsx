import { useEffect, useState } from "react";
import { MainSection } from "../components/AppElements"
import IntroDash from "../components/IntroDash";

export default function AppDashboard() {
  return (
    <MainSection>
      < IntroDash />
    </MainSection>
  );
}
