#include <bits/stdc++.h>
using namespace std;

vector<int> solution(vector<string> genres, vector<int> plays) {
    int n = (int)genres.size();

    unordered_map<string, int> total;
    total.reserve(n * 2);
    for (int i = 0; i < n; i++) {
        total[genres[i]] += plays[i];
    }

    unordered_map<string, vector<pair<int,int>>> songs;
    songs.reserve(n * 2);
    for (int i = 0; i < n; i++) {
        songs[genres[i]].push_back({plays[i], i});
    }

    for (auto &kv : songs) {
        auto &v = kv.second;
        sort(v.begin(), v.end(), [](const auto& a, const auto& b) {
            if (a.first != b.first) return a.first > b.first;
            return a.second < b.second;
        });
    }

    vector<pair<string,int>> order;
    order.reserve(total.size());
    for (auto &kv : total) order.push_back({kv.first, kv.second});
    sort(order.begin(), order.end(), [](const auto& a, const auto& b) {
        return a.second > b.second;
    });

    vector<int> answer;
    for (auto &g : order) {
        auto &v = songs[g.first];
        for (int i = 0; i < (int)v.size() && i < 2; i++) {
            answer.push_back(v[i].second);
        }
    }

    return answer;
}