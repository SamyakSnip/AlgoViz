import { VisualizerProvider } from "@/context/VisualizerContext";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { VisualizerCanvas } from "@/components/VisualizerCanvas";
import { PseudocodeViewer } from "@/components/PseudocodeViewer";

export default function Home() {
  return (
    <VisualizerProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <VisualizerCanvas />
          <PseudocodeViewer />
        </div>
      </div>
    </VisualizerProvider>
  );
}
