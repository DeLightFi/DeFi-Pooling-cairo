import Pool from "../components/Pool";

export default function AppDashboard({ connection, setConnection }) {
  return (
    <Pool connection={connection} setConnection={setConnection} />
  );
}
