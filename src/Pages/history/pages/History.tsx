// src/pages/heart-game/HistoryPage.tsx
import { Tab } from "@headlessui/react";
import { useGetHistory } from "../hooks/useGetHistory";
import { format } from "date-fns";
import { motion } from "framer-motion";
import type { GameHistoryModel } from "../model/HistoryModel";

type Level = "easy" | "medium" | "hard";

const levelConfig = {
  easy: { color: "emerald", icon: "Easy", badge: "bg-emerald-100 text-emerald-700" },
  medium: { color: "amber", icon: "Medium", badge: "bg-amber-100 text-amber-700" },
  hard: { color: "rose", icon: "Hard", badge: "bg-rose-100 text-rose-700" },
};

const HistoryPage = () => {
  const { data: histories = [], isLoading } = useGetHistory();

  // Group by level with proper typing
  const grouped: Record<Level, GameHistoryModel[]> = histories.reduce(
    (acc, h) => {
      acc[h.level].push(h);
      return acc;
    },
    { easy: [], medium: [], hard: [] } as Record<Level, GameHistoryModel[]>
  );

  const levels: Level[] = ["easy", "medium", "hard"];

  const formatDate = (date?: string) =>
    date ? format(new Date(date), "MMM dd, yyyy • h:mm a") : "-";

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Game History
          </h1>
          <p className="mt-3 text-lg text-gray-600">Track your progress across all levels</p>
        </div>

        {/* Tabs */}
        <Tab.Group>
          <Tab.List className="flex justify-center gap-3 mb-10 p-2 bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30">
            {levels.map((level) => {
              const cfg = levelConfig[level];
              return (
                <Tab
                  key={level}
                  className={({ selected }) =>
                    `relative px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-2
                    ${selected
                      ? `text-white bg-gradient-to-r from-${cfg.color}-500 to-${cfg.color}-600 shadow-lg scale-105`
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      {cfg.icon} {level.charAt(0).toUpperCase() + level.slice(1)}
                      {selected && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl -z-10"
                        />
                      )}
                    </>
                  )}
                </Tab>
              );
            })}
          </Tab.List>

          <Tab.Panels>
            {levels.map((level) => {
              const data = grouped[level];
              const cfg = levelConfig[level];

              return (
                <Tab.Panel key={level}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {isLoading ? (
                      <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
                      </div>
                    ) : data.length === 0 ? (
                      <div className="text-center py-20 bg-white/60 backdrop-blur rounded-2xl">
                        <div className="text-6xl mb-4">No games</div>
                        <p className="text-gray-500">Play your first {level} game to see it here!</p>
                      </div>
                    ) : (
                      data
                        .sort((a, b) => new Date(b.date_played || "").getTime() - new Date(a.date_played || "").getTime())
                        .map((item, idx) => (
                          <motion.div
                            key={item.id || idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="group relative overflow-hidden bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/40"
                          >
                            {/* Glass overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative flex justify-between items-center">
                              {/* Left */}
                              <div>
                                <div className="flex items-center gap-3">
                                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${cfg.badge}`}>
                                    {cfg.icon} {level.toUpperCase()}
                                  </span>
                                  <span className="text-3xl font-black text-gray-800">
                                    {item.score}
                                  </span>
                                  <span className="text-lg text-gray-500">points</span>
                                </div>
                                <div className="flex gap-6 mt-3 text-sm text-gray-600">
                                  <span className="flex items-center gap-1">
                                    Time: {formatTime(item.time_taken)}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    Date: {formatDate(item.date_played)}
                                  </span>
                                </div>
                              </div>

                              {/* Right - Trophy */}
                              <div className="text-5xl opacity-20 group-hover:opacity-40 transition-opacity">
                                {item.score >= 100 ? "🏆" : item.score >= 50 ? "🥈" : "🎯"}
                              </div>
                            </div>
                          </motion.div>
                        ))
                    )}
                  </motion.div>
                </Tab.Panel>
              );
            })}
          </Tab.Panels>
        </Tab.Group>
      </motion.div>
    </div>
  );
};

export default HistoryPage;
