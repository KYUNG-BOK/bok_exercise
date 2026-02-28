#include <bits/stdc++.h>
using namespace std;

int solution(int n, vector<vector<int>> wires) {
    vector<vector<int>> adj(n + 1);
    for (auto &e : wires) {
        adj[e[0]].push_back(e[1]);
        adj[e[1]].push_back(e[0]);
    }

    int ans = n;

    for (auto &cut : wires) {
        int a = cut[0], b = cut[1];

        vector<int> vis(n + 1, 0);
        queue<int> q;
        q.push(a);
        vis[a] = 1;

        int cnt = 0;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            cnt++;

            for (int v : adj[u]) {
                if ((u == a && v == b) || (u == b && v == a)) continue;
                if (vis[v]) continue;
                vis[v] = 1;
                q.push(v);
            }
        }

        int other = n - cnt;
        ans = min(ans, abs(cnt - other));
    }

    return ans;
}