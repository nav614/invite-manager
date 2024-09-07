import { Link, useRouter } from "@tanstack/react-router";
import { Button } from "react-aria-components";

export function NotFound({ children }: { children?: React.ReactNode }) {
  const { history } = useRouter();

  const handleGoBack = () => {
    history.back();
  };

  return (
    <div className="space-y-2 p-10">
      <div className="text-gray-600 dark:text-gray-400">
        {children || <p>The page you are looking for does not exist.</p>}
      </div>
      <p className="flex items-center gap-2 flex-wrap">
        <Button
          aria-label="Go back"
          onPress={handleGoBack}
          className="bg-emerald-500 text-white px-2 py-1 rounded uppercase font-black text-sm">
          Go back
        </Button>
        <Link
          to="/"
          className="bg-cyan-600 text-white px-2 py-1 rounded uppercase font-black text-sm">
          Start Over
        </Link>
      </p>
    </div>
  );
}
