#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> t1, t2;
int dp[101][101];

int hungarian(vector<vector<int>>& w) {
    int n = w.size();
    int m = w[0].size();
    int N = max(n, m);

    vector<vector<int>> cost(N, vector<int>(N, 0));

    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cost[i][j] = -w[i][j];

    vector<int> u(N+1), v(N+1), p(N+1), way(N+1);

    for (int i = 1; i <= N; i++) {
        p[0] = i;
        vector<int> minv(N+1, INT_MAX);
        vector<bool> used(N+1, false);
        int j0 = 0;

        do {
            used[j0] = true;
            int i0 = p[j0], delta = INT_MAX, j1 = 0;

            for (int j = 1; j <= N; j++) {
                if (used[j]) continue;
                int cur = cost[i0-1][j-1] - u[i0] - v[j];
                if (cur < minv[j]) {
                    minv[j] = cur;
                    way[j] = j0;
                }
                if (minv[j] < delta) {
                    delta = minv[j];
                    j1 = j;
                }
            }

            for (int j = 0; j <= N; j++) {
                if (used[j]) {
                    u[p[j]] += delta;
                    v[j] -= delta;
                } else {
                    minv[j] -= delta;
                }
            }

            j0 = j1;
        } while (p[j0] != 0);

        do {
            int j1 = way[j0];
            p[j0] = p[j1];
            j0 = j1;
        } while (j0);
    }

    int res = 0;
    for (int j = 1; j <= N; j++) {
        if (p[j] != 0 && p[j]-1 < n && j-1 < m) {
            res += w[p[j]-1][j-1];
        }
    }
    return res;
}

int dfs(int u, int v) {
    int &ret = dp[u][v];
    if (ret != -1) return ret;

    auto &c1 = t1[u];
    auto &c2 = t2[v];

    if (c1.empty() || c2.empty()) return ret = 1;

    int m = c1.size();
    int n = c2.size();

    vector<vector<int>> w(m, vector<int>(n));

    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            w[i][j] = dfs(c1[i], c2[j]);

    return ret = 1 + hungarian(w);
}

void buildTree(int n, vector<vector<int>>& g, vector<vector<int>>& tree) {
    vector<vector<int>> adj(n + 1);

    for (auto &e : g) {
        adj[e[0]].push_back(e[1]);
        adj[e[1]].push_back(e[0]);
    }

    vector<bool> visited(n + 1, false);
    queue<int> q;
    q.push(1);
    visited[1] = true;

    while (!q.empty()) {
        int u = q.front(); q.pop();

        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                tree[u].push_back(v);
                q.push(v);
            }
        }
    }
}

int solution(int n1, vector<vector<int>> g1, int n2, vector<vector<int>> g2) {
    t1.assign(n1 + 1, {});
    t2.assign(n2 + 1, {});

    buildTree(n1, g1, t1);
    buildTree(n2, g2, t2);

    memset(dp, -1, sizeof(dp));

    return dfs(1, 1);
}