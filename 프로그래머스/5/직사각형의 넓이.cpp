#include <bits/stdc++.h>
using namespace std;

class SegTree {
public:
    int n;
    vector<int> cover;
    vector<long long> len;
    vector<long long> ys;

    SegTree(const vector<long long>& y) : ys(y) {
        n = (int)ys.size() - 1;
        cover.assign(4 * max(1, n), 0);
        len.assign(4 * max(1, n), 0);
    }

    void pull(int node, int l, int r) {
        if (cover[node] > 0) {
            len[node] = ys[r + 1] - ys[l];
        } else {
            if (l == r) len[node] = 0;
            else len[node] = len[node * 2] + len[node * 2 + 1];
        }
    }

    void update(int node, int l, int r, int ql, int qr, int val) {
        if (qr < l || r < ql) return;
        if (ql <= l && r <= qr) {
            cover[node] += val;
            pull(node, l, r);
            return;
        }
        int mid = (l + r) >> 1;
        update(node * 2, l, mid, ql, qr, val);
        update(node * 2 + 1, mid + 1, r, ql, qr, val);
        pull(node, l, r);
    }

    long long coveredLen() const {
        if (n <= 0) return 0;
        return len[1];
    }
};

long long solution(vector<vector<int>> rectangles) {
    struct Event {
        long long x;
        long long y1;
        long long y2;
        int type;
        bool operator<(const Event& other) const {
            return x < other.x;
        }
    };

    if (rectangles.empty()) return 0;

    vector<long long> ys;
    ys.reserve(rectangles.size() * 2);
    vector<Event> events;
    events.reserve(rectangles.size() * 2);

    for (auto &r : rectangles) {
        long long x1 = r[0], y1 = r[1], x2 = r[2], y2 = r[3];
        ys.push_back(y1);
        ys.push_back(y2);
        events.push_back({x1, y1, y2, +1});
        events.push_back({x2, y1, y2, -1});
    }

    sort(ys.begin(), ys.end());
    ys.erase(unique(ys.begin(), ys.end()), ys.end());
    if (ys.size() <= 1) return 0;

    sort(events.begin(), events.end());
    if (events.empty()) return 0;

    SegTree st(ys);

    auto idx = [&](long long y) {
        return (int)(lower_bound(ys.begin(), ys.end(), y) - ys.begin());
    };

    long long ans = 0;
    long long prevX = events[0].x;

    int i = 0;
    while (i < (int)events.size()) {
        long long x = events[i].x;
        long long dx = x - prevX;
        if (dx != 0) {
            ans += st.coveredLen() * dx;
            prevX = x;
        }

        while (i < (int)events.size() && events[i].x == x) {
            int l = idx(events[i].y1);
            int r = idx(events[i].y2) - 1;
            if (l <= r) st.update(1, 0, st.n - 1, l, r, events[i].type);
            i++;
        }
    }
    return ans;
}
