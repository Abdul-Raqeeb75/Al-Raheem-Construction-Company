/**
 * STYLE: Editorial Works Ledger — a deliberately thin application shell so the
 * content-led construction site remains the primary experience and payload stays lean.
 */
import { Toaster } from "@/components/ui/sonner";
import Home from "@/pages/Home";

export default function App() {
  return (
    <>
      <Home />
      <Toaster />
    </>
  );
}
