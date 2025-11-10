import { Tab } from "@headlessui/react";

const HistoryPage = () => {
  const userHistory = {
    easy: [
      { score: 13, timeTaken: "12s", date: "2025-11-10 14:21" },
      { score: 15, timeTaken: "10s", date: "2025-11-09 19:03" },
    ],
    medium: [{ score: 9, timeTaken: "8s", date: "2025-11-10 13:10" }],
    hard: [{ score: 4, timeTaken: "5s", date: "2025-11-09 18:44" }],
  };

  const levels = ["easy", "medium", "hard"] as const;

  const renderTable = (data: { score: number; timeTaken: string; date: string }[]) => (
    <div className="grid gap-3 mt-4">
      {data.map((item, idx) => (
        <div
          key={idx}
          className="p-4 border-l-4 border-blue-500 hover:shadow-md transition"
        >
          <div className="text-lg font-semibold">
            Score: <span className="text-green-600">{item.score}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>⏱ {item.timeTaken}</span>
            <span>📅 {item.date}</span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">🎮 Game History</h1>

      <Tab.Group>
        <Tab.List className="flex justify-center space-x-4 mb-6">
          {levels.map((level) => (
            <Tab
              key={level}
              className={({ selected }) =>
                `px-4 py-2 rounded-lg font-semibold ${selected ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`
              }
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {levels.map((level) => (
            <Tab.Panel key={level}>{renderTable(userHistory[level])}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default HistoryPage;
