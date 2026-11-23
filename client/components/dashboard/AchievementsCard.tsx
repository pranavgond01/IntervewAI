"use client";

import { motion } from "framer-motion";
import {
Trophy,
Flame,
Star,
Medal,
Crown,
Sparkles,
} from "lucide-react";

type Interview = {
overallScore: number;
};

type Props = {
interviews: Interview[];
streak: number;
};

export default function AchievementsCard({
interviews,
streak,
}: Props) {
const interviewCount = interviews.length;

const xp = interviews.reduce(
(total, interview) => total + interview.overallScore,
0,
);

const level = Math.max(1, Math.floor(xp / 500) + 1);
const currentLevelXp = xp % 500;
const progress = (currentLevelXp / 500) * 100;

const levelName =
level >= 10
? "Interview Master"
: level >= 7
? "Expert"
: level >= 5
? "Advanced"
: level >= 3
? "Intermediate"
: "Beginner";

const achievements = [
{
title: "First Interview",
icon: Star,
unlocked: interviewCount >= 1,
color: "text-yellow-300",
},
{
title: "Interview Explorer",
icon: Medal,
unlocked: interviewCount >= 5,
color: "text-cyan-300",
},
{
title: "90+ Club",
icon: Trophy,
unlocked: interviews.some((i) => i.overallScore >= 90),
color: "text-amber-300",
},
{
title: "7-Day Streak",
icon: Flame,
unlocked: streak >= 7,
color: "text-orange-300",
},
{
title: "Interview Legend",
icon: Crown,
unlocked: interviewCount >= 20,
color: "text-purple-300",
},
{
title: "AI Master",
icon: Sparkles,
unlocked: level >= 5,
color: "text-green-300",
},
];

return ( <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl"> <div className="mb-6 flex items-center justify-between"> <div> <h2 className="text-2xl font-bold">Achievements & XP</h2> <p className="mt-1 text-zinc-400">
Level up by completing interviews and improving your scores. </p> </div>

 
    <div className="rounded-2xl bg-cyan-400/10 px-4 py-2 text-cyan-300">
      {levelName}
    </div>
  </div>

  <div className="mb-8 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-6">
    <div className="mb-2 flex items-center justify-between">
      <div>
        <div className="text-sm text-cyan-300">Current Level</div>
        <div className="text-4xl font-black">Level {level}</div>
      </div>

      <div className="text-right">
        <div className="text-2xl font-black text-cyan-300">
          {xp} XP
        </div>
        <div className="text-sm text-zinc-400">
          {500 - currentLevelXp} XP to next level
        </div>
      </div>
    </div>

    <div className="mt-4 h-3 rounded-full bg-white/10">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${progress}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500"
      />
    </div>
  </div>

  <div className="mb-6 grid gap-4 md:grid-cols-3">
    <div className="rounded-3xl border border-white/10 bg-[#0b1220] p-5 text-center">
      <Flame className="mx-auto mb-2 text-orange-300" />
      <div className="text-3xl font-black">{streak}</div>
      <div className="text-sm text-zinc-400">Day Streak</div>
    </div>

    <div className="rounded-3xl border border-white/10 bg-[#0b1220] p-5 text-center">
      <Trophy className="mx-auto mb-2 text-amber-300" />
      <div className="text-3xl font-black">{interviewCount}</div>
      <div className="text-sm text-zinc-400">Interviews</div>
    </div>

    <div className="rounded-3xl border border-white/10 bg-[#0b1220] p-5 text-center">
      <Sparkles className="mx-auto mb-2 text-cyan-300" />
      <div className="text-3xl font-black">
        {achievements.filter((a) => a.unlocked).length}
      </div>
      <div className="text-sm text-zinc-400">Badges Unlocked</div>
    </div>
  </div>

  <div>
    <h3 className="mb-4 text-lg font-semibold">Achievement Badges</h3>

    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {achievements.map((achievement, index) => (
        <motion.div
          key={achievement.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          className={`rounded-3xl border p-5 transition ${
            achievement.unlocked
              ? "border-cyan-400/20 bg-cyan-400/10"
              : "border-white/10 bg-[#0b1220] opacity-60"
          }`}
        >
          <div className="mb-3 flex items-center gap-3">
            <achievement.icon
              className={`h-8 w-8 ${
                achievement.unlocked
                  ? achievement.color
                  : "text-zinc-600"
              }`}
            />

            <div>
              <div className="font-semibold">{achievement.title}</div>
              <div className="text-xs text-zinc-400">
                {achievement.unlocked ? "Unlocked" : "Locked"}
              </div>
            </div>
          </div>

          {achievement.unlocked ? (
            <div className="text-sm text-cyan-300">
              Achievement earned
            </div>
          ) : (
            <div className="text-sm text-zinc-500">
              Keep practicing to unlock
            </div>
          )}
        </motion.div>
      ))}
    </div>
  </div>
</div>
 

);
}
