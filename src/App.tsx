import Routing from "@/routes";
import { Analytics } from "@vercel/analytics/react";

import SnowfallBackground from "@/components/common/SnowfallBackground";

function App() {
  return (
    <>
      <SnowfallBackground />
      <Routing />
      <Analytics />
    </>
  );
}

export default App;
