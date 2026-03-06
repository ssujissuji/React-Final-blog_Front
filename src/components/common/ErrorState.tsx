import { AlertCircle } from "lucide-react";
import { useRouteError } from "react-router";

type ErrorStateProps = {
  title?: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
};

export default function ErrorState({
  title = "Something went wrong",
  message = "An error occurred while loading the content. \nPlease try again later.",
  action,
}: ErrorStateProps) {
  const error = useRouteError();
  if (error instanceof Response) {
    message = `Error ${error.status}: ${error.statusText}`;
  }

  if (error instanceof Error) {
    message = `${error.name}: ${error.message}`;
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900">
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="bg-red-100 dark:bg-red-900/20 rounded-full p-6 mb-6">
          <AlertCircle className="w-12 h-12 text-red-500 dark:text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-6 max-w-md whitespace-pre-wrap">
          {message}
        </p>
        {action && (
          <button
            onClick={action.onClick}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
}
