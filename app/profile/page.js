// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import Link from "next/link";
import { LuUser } from "react-icons/lu";
import { getScoreByUser } from "@/lib/actions/get-scores";
import { LogoutButton } from "@/components/LogoutButton";
import { HomeButton } from "@/components/HomeButton";
import { currentUser } from "@/lib/auth";

export default async function Profile() {
  const user = await currentUser();
  const scores = user.scores;
  // const [username, setUsername] = useState("");
  // const [scores, setScores] = useState([]);
  // const [bestScore, setBestScore] = useState(null);
  // const [bestWpm, setBestWpm] = useState(null);
  // const router = useRouter();

  // useEffect(() => {
  //   setUsername(localStorage.getItem("username") || "Guest");

  //   // Fetch user's scores
  //   getScoreByUser(1).then((fetchedScores) => {
  //     setScores(fetchedScores);

  // Find best score and WPM
  // if (scores.length > 0) {
  //   const maxScore = Math.max(...scores.map((score) => score.score));
  //   const maxWpm = Math.max(...scores.map((score) => score.wpm));
  //   setBestScore(maxScore);
  //   setBestWpm(maxWpm);
  // }

  // const handleLogout = () => {
  //   localStorage.removeItem("username");
  //   localStorage.removeItem("userId");
  //   router.push("/login");
  // };

  const bestScore =
    scores.length > 0 ? Math.max(...scores.map((score) => score.score)) : null;
  const bestWpm =
    scores.length > 0 ? Math.max(...scores.map((score) => score.wpm)) : null;

  const recentScores = scores
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <>
      <HomeButton />
      <div className="flex justify-start p-20 h-screen items-center text-dark-brown">
        <div className="flex flex-col gap-4 w-full max-w-2xl rounded-lg p-12 py-10 border border-white border-opacity-40 shadow-lg">
          {/* Profile Section */}
          <div className="flex justify-between items-center bg-light-beige p-4 rounded-lg">
            <div id="profile" className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full border border-light-brown flex items-center justify-center bg-dark-brown ">
                <LuUser className="w-8 h-8 text-lighter-brown" />
              </div>
              <div className="flex flex-col">
                <div className="text-xl">{user.email}</div>
                <div className="text-sm text-gray-600">
                  Last login: {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
            <div>
              <LogoutButton>Log Out</LogoutButton>
            </div>
          </div>

          {/* Logout Button
        <button
          onClick={handleLogout}
          className="self-end bg-red-500 text-white py-1 px-4 rounded"
        >
          Logout
        </button> */}
          {/* Best Score and WPM Section */}
          <div className="rounded-lg p-4 bg-light-beige">
            <div className="text-lg font-bold">All-Time Best</div>
            <div className="flex justify-between">
              <div>Best Score: {bestScore !== null ? bestScore : "N/A"}</div>
              <div>Best WPM: {bestWpm !== null ? bestWpm : "N/A"}</div>
            </div>
          </div>
          {/* History Section */}
          <div className="bg-light-beige rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-bold">Recent Attempts</div>
            </div>

            <div className="flex flex-col gap-2">
              {recentScores &&
                recentScores.map((score) => (
                  <div
                    key={score.id}
                    className="flex justify-between items-center py-2 border-b border-gray-200"
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
                ))}
            </div>
          </div>
          {/* Back Button */}
          <Link
            href="/region"
            className="bg-my-blue border border-white border-opacity-40 shadow-md hover:bg-my-pink transition-colors duration-300 text-dark-brown py-3 rounded"
          >
            <div className="text-3xl flex justify-center font-bold">begin!</div>
          </Link>
        </div>
      </div>
    </>
  );
}
