#include <bits/stdc++.h>
using namespace std;

vector<int> solution(vector<int> progresses, vector<int> speeds) {
    int n = (int)progresses.size();
    vector<int> days;
    days.reserve(n);

    for (int i = 0; i < n; i++) {
        int remain = 100 - progresses[i];
        int d = (remain + speeds[i] - 1) / speeds[i];
        days.push_back(d);
    }

    vector<int> ans;
    int cur = days[0];
    int cnt = 1;

    for (int i = 1; i < n; i++) {
        if (days[i] <= cur) {
            cnt++;
        } else {
            ans.push_back(cnt);
            cur = days[i];
            cnt = 1;
        }
    }
    ans.push_back(cnt);

    return ans;
}