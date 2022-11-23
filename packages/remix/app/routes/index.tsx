import { json, LoaderFunction } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";
import { Octokit } from "octokit";

export const loader: LoaderFunction = async () => {
  // Octokit.js
  // https://github.com/octokit/core.js#readme
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  return json({
    "battery-dashboard": await octokit
      .request("GET /repos/{owner}/{repo}/branches{?protected,per_page,page}", {
        owner: "xuatz",
        repo: "battery-dashboard",
      })
      .then((res) => res.data),
    xbo: await octokit
      .request("GET /repos/{owner}/{repo}/branches{?protected,per_page,page}", {
        owner: "xuatz",
        repo: "xbo",
      })
      .then((res) => res.data),
  });
};

export default function Index() {
  const data = useLoaderData();

  console.log("xz:data", data);

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
