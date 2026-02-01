// c++복습하기

#include <iostream>
#include <vector>

using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N;
    cin >> N;

    vector<int> a(N + 1), nxt(N + 1), prv(N + 1);

    for (int i = 1; i <= N; i++) cin >> a[i];
    for (int i = 1; i <= N; i++) {
        nxt[i] = (i == N ? 1 : i + 1);
        prv[i] = (i == 1 ? N : i - 1);
    }

    int cur = 1, len = N;
    bool first = true;

    while (len) {
        if (!first) cout << ' ';
        first = false;
        cout << cur;

        int step = a[cur];
        int L = prv[cur], R = nxt[cur];

        nxt[L] = R;
        prv[R] = L;

        len--;
        if (!len) break;

        if (step > 0) {
            int mv = (step - 1) % len;
            cur = R;
            while (mv--) cur = nxt[cur];
        } else {
            int mv = (-step - 1) % len;
            cur = L;
            while (mv--) cur = prv[cur];
        }
    }

    return 0;
}