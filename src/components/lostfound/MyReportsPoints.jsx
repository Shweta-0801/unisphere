import { Gift, Star } from "lucide-react";
import ItemCard from "./ItemCard";

const POINTS_FOR_REWARD = 1000;
const REWARD_VALID_HOURS = 24;

/**
 * Shows:
 * - the user's point total + progress bar toward the reward
 * - a "redeem" button once they cross 1000 points
 * - their own submitted reports
 *
 * points / reward state and myReports both live in the parent
 * (LostFoundPage) since they need to be shared with the map/points logic.
 */
function MyReportsPoints({ points, myReports, onResolve, reward, onRedeem }) {
  const progress = Math.min(100, (points / POINTS_FOR_REWARD) * 100);
  const canRedeem = points >= POINTS_FOR_REWARD && !reward;

  const rewardExpired = reward && Date.now() > reward.expiresAt;
  const rewardHoursLeft = reward && !rewardExpired
    ? Math.max(0, Math.ceil((reward.expiresAt - Date.now()) / (60 * 60 * 1000)))
    : 0;

  return (
    <div className="space-y-6">
      {/* Points card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Your points</p>
            <p className="text-3xl font-bold text-gray-800">{points}</p>
          </div>
          <Star className="text-yellow-400" size={32} />
        </div>

        <div className="mt-4 h-2 rounded-full bg-gray-100 overflow-hidden">
          <div className="h-full bg-blue-500 transition-all" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-xs text-gray-400 mt-1">
          {points >= POINTS_FOR_REWARD
            ? "You've unlocked a reward!"
            : `${POINTS_FOR_REWARD - points} more points to unlock a food outlet discount`}
        </p>

        {canRedeem && (
          <button
            onClick={onRedeem}
            className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-yellow-400 text-yellow-900 font-semibold hover:bg-yellow-300 transition"
          >
            <Gift size={18} /> Redeem 1000 points for a food outlet discount
          </button>
        )}

        {reward && !rewardExpired && (
          <div className="mt-4 rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-700">
            🎁 Discount active at <span className="font-semibold">{reward.outlet}</span> — valid for{" "}
            {rewardHoursLeft}h more.
          </div>
        )}

        {reward && rewardExpired && (
          <div className="mt-4 rounded-lg bg-gray-50 border border-gray-200 p-3 text-sm text-gray-500">
            Your last reward expired. Keep earning points for the next one!
          </div>
        )}
      </div>

      {/* My reports */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">My reports ({myReports.length})</h3>
        {myReports.length === 0 ? (
          <p className="text-sm text-gray-400">You haven't reported any items yet.</p>
        ) : (
          <div className="space-y-3">
            {myReports.map((item) => (
              <ItemCard key={item.id} item={item} onResolve={onResolve} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export { POINTS_FOR_REWARD, REWARD_VALID_HOURS };
export default MyReportsPoints;
