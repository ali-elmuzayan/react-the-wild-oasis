// Context for managing sidebar visibility state across the application
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Type definition for the sidebar context
interface SidebarContextType {
  isSidebarOpen: boolean; // Current state of sidebar visibility
  toggleSidebar: () => void; // Function to toggle sidebar visibility
}

// Create the context with undefined as default value
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Provider component that wraps the app and provides sidebar state
export function SidebarProvider({ children }: { children: ReactNode }) {
  // State to track if sidebar is open (default: open)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Set up keyboard shortcut (Ctrl+B) to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Ctrl+B key combination (language-independent)
      if (event.ctrlKey && event.code === "KeyB") {
        event.preventDefault(); // Prevent default browser behavior
        setIsSidebarOpen((prev) => !prev);
      }
    };

    // Add event listener for keyboard events
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup: remove event listener when component unmounts
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Provide the context value to all child components
  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

// Custom hook to use the sidebar context
export function useSidebar() {
  const context = useContext(SidebarContext);

  // Throw error if hook is used outside of SidebarProvider
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }

  return context;
}
