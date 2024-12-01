import Link from "next/link";
import { LuClipboard, LuTrophy, LuUser } from "react-icons/lu";
import { LogoutButton } from "@/components/LogoutButton";
import { currentUser } from "@/lib/auth";
import { getUserScores } from "@/lib/actions/get-scores";

export default async function Profile() {
  const user = await currentUser();
  const scores = user ? await getUserScores() : [];

  const bestScore =
    scores.length > 0 ? Math.max(...scores.map((score) => score.score)) : null;
  const bestWpm =
    scores.length > 0 ? Math.max(...scores.map((score) => score.wpm)) : null;

  const recentScores = scores
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  // If user is not authenticated, show the login option
  if (!user) {
    return (
      <div className="bg-[url('../public/new-bg.png')] bg-cover bg-center h-screen w-full flex items-center justify-center">
        <div className="min-w-[40rem] flex flex-col gap-8 max-w-2xl rounded-lg p-12 py-18 border border-white border-opacity-40 shadow-lg bg-light-beige bg-opacity-80 backdrop-blur">
          <div className="flex flex-col items-center">
            <LuUser className="w-16 h-16 text-light-brown mb-4" />
            <h2 className="text-2xl font-bold text-dark-brown mb-2">
              Welcome, Guest!
            </h2>
            <p className="text-gray-500 mb-6">
              Please log in to access your profile and scores.
            </p>
            <Link
              href="/login"
              className="bg-dark-brown border border-white border-opacity-40 shadow hover:bg-light-brown hover:text-dark-brown transition-colors duration-300 text-lighter-brown py-3 px-6 rounded"
            >
              <div className="text-xl font-semibold">Login</div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If user is authenticated, show the profile
  return (
    <div className="bg-[url('../public/new-bg.png')] bg-cover bg-center h-screen w-full">
      <div className="flex justify-start p-20 h-screen items-center text-dark-brown lowercase">
        <div className="min-w-[40rem] flex flex-col gap-8 max-w-2xl rounded-lg p-12 py-18 border border-white border-opacity-40 shadow-lg bg-light-beige bg-opacity-80 backdrop-blur">
          {/* Profile Section */}
          <div className="border border-white border-opacity-40 shadow flex justify-between items-center bg-light-beige p-4 rounded-lg">
            <div id="profile" className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full border border-lighter-brown flex items-center justify-center bg-light-brown">
                <LuUser className="w-8 h-8 text-light-beige" />
              </div>
              <div className="flex flex-col">
                <div className="text-xl">
                  {user.email ? user.email : "No Email Provided"}
                </div>
              </div>
            </div>
            <LogoutButton>Log Out</LogoutButton>
          </div>

          {/* Best Score and WPM Section */}
          <div className="border border-white border-opacity-40 shadow rounded-lg p-4 bg-light-beige">
            <div className="text-lg font-bold flex gap-2 items-center mb-2">
              <LuTrophy />
              Records
            </div>
            <div className="flex justify-between">
              <div>Best Score: {bestScore !== null ? bestScore : "N/A"}</div>
              <div>Best WPM: {bestWpm !== null ? bestWpm : "N/A"}</div>
            </div>
          </div>

          {/* History Section */}
          <div className="border border-white border-opacity-40 shadow bg-light-beige rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-lg font-bold flex gap-2 items-center">
                <LuClipboard />
                Recent Attempts
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {recentScores.length > 0 ? (
                recentScores.map((score) => (
                  <div
                    key={score.id}
                    className="flex justify-between items-center py-2 border-b border-light-brown"
                  >
                    <div>
                      {score.challenge.region}: {score.score} - {score.wpm} WPM
                    </div>
                    <div>
                      {score.createdAt
                        ? new Date(score.createdAt).toLocaleDateString()
                        : "N/A"}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-500">No recent attempts found.</div>
              )}
            </div>
          </div>

          {/* Back Button */}
          <Link
            href="/region"
            className="bg-dark-brown border border-white border-opacity-40 shadow hover:bg-light-brown hover:text-dark-brown transition-colors duration-300 text-lighter-brown py-3 rounded"
          >
            <div className="text-3xl flex justify-center font-bold">Begin!</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
