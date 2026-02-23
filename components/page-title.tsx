import React from "react";

function PageTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div>
        <h1 className="text-xl font-bold text-slate-800 dark:text-gray-200">
          {title}
        </h1>
        <p className="text-slate-800/60 text-base dark:text-gray-300">
          {description}
        </p>
      </div>
    </div>
  );
}

export default PageTitle;
