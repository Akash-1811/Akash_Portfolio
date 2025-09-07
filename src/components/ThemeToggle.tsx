import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative">
      {/* Reduced glow container */}
      <div className="absolute inset-0 rounded-full animate-glow-subtle blur-sm scale-110 bg-primary/20"></div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="w-9 h-9 rounded-full transition-all duration-300 bg-primary/5 hover:bg-primary/15 hover:scale-105 relative z-10 flex items-center justify-center"
      >
        {/* Subtle inner glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-secondary/15 to-primary/15 rounded-full animate-pulse opacity-40"></div>

        <div className="relative flex items-center justify-center">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 text-primary absolute" />
          <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 text-primary absolute" />
        </div>
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
};