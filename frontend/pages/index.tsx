import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Pool from "../components/Pool";

export default function AppDashboard() {
  return (
    <Layout>
      <Pool />
    </Layout>
  );
}
