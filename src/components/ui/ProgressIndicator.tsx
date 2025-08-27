import React from "react";
import { Check } from "lucide-react";

interface Step {
  id: number;
  title: string;
  completed: boolean;
  current: boolean;
}

interface ProgressIndicatorProps {
  steps: Step[];
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
}) => {
  return (
    // <div className=" flex items-center justify-between mb-8">
    //   {steps.map((step, index) => (
    //     <div key={step.id} className="flex items-center">
    //       {/* Step Circle */}
    //       <div
    //         className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
    //           step.completed
    //             ? "bg-blue-600 border-blue-600 text-white"
    //             : step.current
    //             ? "bg-blue-600 border-blue-600 text-white"
    //             : "bg-white border-gray-300 text-gray-500"
    //         }`}
    //       >
    //         {step.completed ? (
    //           <Check className="w-4 h-4" />
    //         ) : (
    //           <span className="text-sm font-medium">{step.id}</span>
    //         )}
    //       </div>

    //       {/* Step Title */}
    //       <span
    //         className={`ml-3 text-sm font-medium ${
    //           step.current
    //             ? "text-blue-600"
    //             : step.completed
    //             ? "text-gray-900"
    //             : "text-gray-500"
    //         }`}
    //       >
    //         {step.title}
    //       </span>

    //       {/* Connector Line */}
    //       {/* {index < steps.length - 1 && (
    //         <div
    //           className={`ml-6 w-16 h-0.5 ${
    //              steps[index + 1].completed || steps[index + 1].current
    //               ? "bg-blue-600"
    //               : "bg-gray-300"
    //           }`}
    //         />
    //       )} */}
    //       {/* Connector Line */}
    //       {index < steps.length - 1 && (
    //         <div
    //           className={`flex-1 h-1 mx-4 ${
    //             steps[index + 1].completed || steps[index + 1].current
    //               ? "bg-blue-600"
    //               : "bg-gray-300"
    //           }`}
    //         />
    //       )}
    //     </div>
    //   ))}
    // </div>
    // <div className="flex items-center justify-between mb-8 w-full">
    //   {steps.map((step, index) => (
    //     <React.Fragment key={step.id}>
    //       {/* Step Circle + Title */}
    //       <div className="flex items-center">
    //         <div
    //           className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
    //             step.completed
    //               ? "bg-blue-600 border-blue-600 text-white"
    //               : step.current
    //               ? "bg-blue-600 border-blue-600 text-white"
    //               : "bg-white border-gray-300 text-gray-500"
    //           }`}
    //         >
    //           {step.completed ? (
    //             <Check className="w-4 h-4" />
    //           ) : (
    //             <span className="text-sm font-medium">{step.id}</span>
    //           )}
    //         </div>

    //         <span
    //           className={`ml-3 text-sm font-medium ${
    //             step.current
    //               ? "text-blue-600"
    //               : step.completed
    //               ? "text-gray-900"
    //               : "text-gray-500"
    //           }`}
    //         >
    //           {step.title}
    //         </span>
    //       </div>

    //       {/* Connector Line */}
    //       {index < steps.length - 1 && (
    //         <div
    //           className={`flex-1 h-1 mx-4 ${
    //             steps[index + 1].completed || steps[index + 1].current
    //               ? "bg-blue-600"
    //               : "bg-gray-300"
    //           }`}
    //         />
    //       )}
    //     </React.Fragment>
    //   ))}
    // </div>

    <div className="flex items-center mb-8 w-full">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          {/* Step Circle + Title stacked */}
          <div className="flex flex-col items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
                step.completed || step.current
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-white border-gray-300 text-gray-500"
              }`}
            >
              {step.completed ? (
                <Check className="w-4 h-4" />
              ) : (
                <span className="text-sm font-medium">{step.id}</span>
              )}
            </div>

            <span
              className={`mt-2 text-sm font-medium ${
                step.current
                  ? "text-blue-600"
                  : step.completed
                  ? "text-gray-900"
                  : "text-gray-500"
              }`}
            >
              {step.title}
            </span>
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-1 mx-2 ${
                steps[index + 1].completed || steps[index + 1].current
                  ? "bg-blue-600"
                  : "bg-gray-300"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
